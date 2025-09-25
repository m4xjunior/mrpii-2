-- Queries SQL para Página Informes - Dados reais do banco
-- Substituindo valores hardcoded por cálculos baseados em cfg_maquina, his_prod, his_fase, his_of

-- 1. OEE POR TURNO (Disponibilidad × Rendimiento × Calidad)
-- Fórmula: OEE = Disponibilidad × Desempeño × Calidad
-- Disponibilidad: segundos produtivos / (produtivos + paros)
-- Desempeño: preferir cfg_maquina.Ag_Rt_Rend_Turno
-- Calidad: SUM(OK) / (SUM(OK) + SUM(NOK))

SELECT
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END as turno,

  -- Disponibilidad: segundos produtivos / (produtivos + paros)
  CASE
    WHEN (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) +
          SUM(CASE WHEN hp.Id_actividad IN (1,4,5,6,7,8,9,10,11,12,13,14,15) THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END)) > 0
    THEN CAST(
      (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) * 1.0) /
      (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) +
       SUM(CASE WHEN hp.Id_actividad IN (1,4,5,6,7,8,9,10,11,12,13,14,15) THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END))
      AS DECIMAL(8,2))
    ELSE 0
  END as disponibilidad,

  -- Desempeño (Rendimiento): preferir consolidado do turno
  ISNULL(AVG(cm.Ag_Rt_Rend_Turno), 0) as rendimiento,

  -- Calidad: SUM(OK) / (SUM(OK) + SUM(NOK))
  CASE
    WHEN (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok)) > 0
    THEN CAST(
      (SUM(hp.Unidades_ok) * 1.0) / (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok))
      AS DECIMAL(8,2))
    ELSE 0
  END as calidad,

  -- OEE calculado
  CASE
    WHEN ISNULL(AVG(cm.Ag_Rt_Rend_Turno), 0) > 0
    THEN CAST(
      (CASE
        WHEN (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) +
              SUM(CASE WHEN hp.Id_actividad IN (1,4,5,6,7,8,9,10,11,12,13,14,15) THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END)) > 0
        THEN (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) * 1.0) /
             (SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) +
              SUM(CASE WHEN hp.Id_actividad IN (1,4,5,6,7,8,9,10,11,12,13,14,15) THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END))
        ELSE 0
      END) *
      ISNULL(AVG(cm.Ag_Rt_Rend_Turno), 0) *
      (CASE
        WHEN (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok)) > 0
        THEN (SUM(hp.Unidades_ok) * 1.0) / (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok))
        ELSE 0
      END)
      AS DECIMAL(8,2))
    ELSE 0
  END as oee

FROM cfg_maquina cm
LEFT JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
LEFT JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ? -- Parâmetro OF
  AND cm.Activo = 1
  AND hp.Fecha_ini >= ? -- Parâmetro fecha_desde
  AND hp.Fecha_fin <= ? -- Parâmetro fecha_hasta
  AND hp.Fecha_ini < hp.Fecha_fin
GROUP BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END
ORDER BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 1
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 2
    ELSE 3
  END;

-- 3. PLANIFICADO POR FASE/OF (preferir his_fase.Unidades_planning)
-- Prioridade: his_fase.Unidades_planning (mais granular) > his_of.Unidades_planning

SELECT
  'OF' as fuente,
  ho.Unidades_planning as planificado,
  ho.Fecha_ini as fecha_ini,
  ho.Fecha_fin as fecha_fin,
  cm.Cod_maquina as maquina
FROM his_of ho
LEFT JOIN his_fase hf ON ho.Id_his_of = hf.Id_his_of
LEFT JOIN cfg_maquina cm ON hf.Id_fase = cm.Rt_Id_fase
WHERE ho.Cod_of = ?
  AND cm.Activo = 1
UNION ALL
SELECT
  'FASE' as fuente,
  hf.Unidades_planning as planificado,
  hf.Fecha_ini as fecha_ini,
  hf.Fecha_fin as fecha_fin,
  cm.Cod_maquina as maquina
FROM his_fase hf
LEFT JOIN cfg_maquina cm ON hf.Id_fase = cm.Rt_Id_fase
WHERE hf.Id_his_of IN (SELECT Id_his_of FROM his_of WHERE Cod_of = ?)
  AND cm.Activo = 1
ORDER BY fuente DESC; -- FASE primeiro (prioridade)

-- 4. PARADAS POR TURNO (PP, PNP, PCALIDAD)
-- Agregação: SUM(PP), SUM(PNP), SUM(PCALIDAD) por turno

SELECT
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END as turno,

  SUM(hp.PP) as pp,
  SUM(hp.PNP) as pnp,
  SUM(hp.PCALIDAD) as pcalidad,

  -- Tempo total de paradas
  SUM(CASE WHEN hp.Id_actividad IN (1,4,5,6,7,8,9,10,11,12,13,14,15)
           THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) as tiempo_paro_s

FROM cfg_maquina cm
LEFT JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
LEFT JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ?
  AND cm.Activo = 1
  AND hp.Fecha_ini >= ?
  AND hp.Fecha_fin <= ?
  AND hp.Fecha_ini < hp.Fecha_fin
GROUP BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END
ORDER BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 1
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 2
    ELSE 3
  END;

-- 5. DATAS DE INÍCIO E FIM ESTIMADA
-- Usar cfg_maquina.Rt_Fecha_ini/fin quando disponíveis
-- Para estimada: tempo_por_peca × pecas_restantes + now

SELECT
  cm.Cod_maquina as maquina,
  cm.Rt_Fecha_ini as fecha_ini_real,
  cm.Rt_Fecha_fin as fecha_fin_real,

  -- Calcular fim estimado baseado em ciclo nominal e peças restantes
  CASE
    WHEN cm.SegCicloNominal > 0 AND
         (hf.Unidades_planning - (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro))) > 0
    THEN DATEADD(SECOND,
                 (hf.Unidades_planning - (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro))) * cm.SegCicloNominal,
                 GETDATE())
    ELSE cm.Rt_Fecha_fin
  END as fecha_fin_estimada,

  -- Peças restantes
  (hf.Unidades_planning - (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro))) as piezas_restantes,

  -- Ciclo nominal
  cm.SegCicloNominal as ciclo_nominal_seg

FROM cfg_maquina cm
LEFT JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
LEFT JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ?
  AND cm.Activo = 1
GROUP BY cm.Cod_maquina, cm.Rt_Fecha_ini, cm.Rt_Fecha_fin, hf.Unidades_planning, cm.SegCicloNominal;

-- 2. VELOCIDAD POR TURNO (u/h e seg/pza)
-- Fórmula: Velocidad (u/h) = (SUM(OK+NOK+RW) / (SUM segundos prod)) × 3600
-- Velocidad (seg/pza) = (SUM segundos prod) / SUM(OK+NOK+RW)

SELECT
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END as turno,

  -- Velocidad u/h: (SUM unidades) / (SUM segundos) × 3600
  CASE
    WHEN SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) > 0
    THEN CAST(
      ((SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro)) * 3600.0) /
      SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END)
      AS DECIMAL(8,2))
    ELSE 0
  END as velocidad_uh,

  -- Velocidad seg/pza: (SUM segundos) / SUM unidades
  CASE
    WHEN (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro)) > 0
    THEN CAST(
      SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) * 1.0 /
      (SUM(hp.Unidades_ok) + SUM(hp.Unidades_nok) + SUM(hp.Unidades_repro))
      AS DECIMAL(8,2))
    ELSE 0
  END as velocidad_seg_por_pza,

  -- Total de unidades por tipo
  SUM(hp.Unidades_ok) as ok,
  SUM(hp.Unidades_nok) as nok,
  SUM(hp.Unidades_repro) as rw,

  -- Tempo total de produção
  SUM(CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END) as tiempo_prod_s

FROM cfg_maquina cm
LEFT JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
LEFT JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ?
  AND cm.Activo = 1
  AND hp.Fecha_ini >= ?
  AND hp.Fecha_fin <= ?
  AND hp.Fecha_ini < hp.Fecha_fin
GROUP BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END
ORDER BY
  CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 1
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 2
    ELSE 3
  END;