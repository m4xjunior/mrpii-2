import { NextResponse } from "next/server";
import { executeQuery } from "lib/database/connection";

// Mapeo de estados (según MAPEX, para referencia en el código)
const ID_ACTIVIDAD_PRODUCCION = 2;
const ID_ACTIVIDAD_PREPARACION = 3;
const ID_ACTIVIDAD_PAROS = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const METRICAS_POR_TURNO_QUERY = `
-- Parámetros esperados: @cod_maquina, @fecha_inicio, @fecha_fin, @cod_of (opcional)
WITH parametros AS (
    SELECT
        @cod_maquina AS cod_maquina,
        CAST(@fecha_inicio AS DATE) AS fecha_inicio,
        CAST(@fecha_fin AS DATE) AS fecha_fin,
        @cod_of AS cod_of
),
rango_dias AS (
    SELECT fecha_inicio AS dia FROM parametros
    UNION ALL
    SELECT DATEADD(DAY, 1, rd.dia) FROM rango_dias rd JOIN parametros p ON 1 = 1 WHERE rd.dia < p.fecha_fin
),
turnos AS (
    SELECT d.dia, 1 AS turno_id, 'MAÑANA' AS turno, DATEADD(HOUR, 6, CAST(d.dia AS DATETIME)) AS turno_inicio, DATEADD(HOUR, 14, CAST(d.dia AS DATETIME)) AS turno_fin FROM rango_dias d
    UNION ALL
    SELECT d.dia, 2 AS turno_id, 'TARDE' AS turno, DATEADD(MINUTE, 15, DATEADD(HOUR, 14, CAST(d.dia AS DATETIME))) AS turno_inicio, DATEADD(MINUTE, 30, DATEADD(HOUR, 22, CAST(d.dia AS DATETIME))) AS turno_fin FROM rango_dias d
    UNION ALL
    SELECT d.dia, 3 AS turno_id, 'NOCHE' AS turno, DATEADD(MINUTE, 30, DATEADD(HOUR, 22, CAST(d.dia AS DATETIME))) AS turno_inicio, DATEADD(HOUR, 30, CAST(d.dia AS DATETIME)) AS turno_fin FROM rango_dias d
),
base AS (
    SELECT
        hp.Id_his_prod, hp.Id_maquina, hp.Id_his_fase, hp.Id_actividad, hp.Fecha_ini, hp.Fecha_fin,
        hp.Unidades_ok, hp.Unidades_nok, hp.Unidades_repro, hp.PP, hp.PNP, hp.PCALIDAD,
        hf.Id_his_of, ho.Cod_of,
        hf.Unidades_planning AS unidades_plan_fase,
        ho.Unidades_planning AS unidades_plan_of,
        COALESCE(NULLIF(hf.SegCicloNominal, 0), NULLIF(cm.SegCicloNominal, 0), NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0), NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh,
        cm.Cod_maquina, cm.Ag_Rt_Disp_Turno, cm.Ag_Rt_Rend_Turno, cm.Ag_Rt_OEE_Turno, cm.Ag_Rt_Cal_Turno,
        cm.ObjetivoOEEVerde, cm.ObjetivoOEENaranja, cm.Rt_Dia_productivo, cm.Rt_Id_turno, cm.Rt_Fecha_ini, cm.Rt_Fecha_fin
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1 = 1
    WHERE cm.Cod_maquina = p.cod_maquina AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME) AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
split AS (
    SELECT
        t.turno, t.turno_id, t.turno_inicio, t.turno_fin,
        b.*,
        CASE
            WHEN b.Fecha_ini < t.turno_fin AND b.Fecha_fin > t.turno_inicio
            THEN DATEDIFF(SECOND,
                CASE WHEN b.Fecha_ini > t.turno_inicio THEN b.Fecha_ini ELSE t.turno_inicio END,
                CASE WHEN b.Fecha_fin < t.turno_fin THEN b.Fecha_fin ELSE t.turno_fin END)
            ELSE 0
        END AS segundos_turno,
        DATEDIFF(SECOND, b.Fecha_ini, b.Fecha_fin) AS segundos_total
    FROM base b
    INNER JOIN turnos t ON b.Fecha_ini < t.turno_fin AND b.Fecha_fin > t.turno_inicio
),
split_valid AS (
    SELECT
        *,
        ratio = CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_ok_parcial = ISNULL(Unidades_ok, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_nok_parcial = ISNULL(Unidades_nok, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_repro_parcial = ISNULL(Unidades_repro, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_total_parcial = (ISNULL(Unidades_ok, 0) + ISNULL(Unidades_nok, 0) + ISNULL(Unidades_repro, 0)) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_prod_parcial = CASE WHEN Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN segundos_turno ELSE 0 END,
        segundos_prep_parcial = CASE WHEN Id_actividad = ${ID_ACTIVIDAD_PREPARACION} THEN segundos_turno ELSE 0 END,
        segundos_pp_parcial = ISNULL(PP, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pnp_parcial = ISNULL(PNP, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pcalidad_parcial = ISNULL(PCALIDAD, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END
    FROM split
    WHERE segundos_turno > 0
),
agregado AS (
    SELECT
        turno,
        MIN(turno_inicio) AS ventana_inicio, MAX(turno_fin) AS ventana_fin,
        SUM(unidades_ok_parcial) AS unidades_ok, SUM(unidades_nok_parcial) AS unidades_nok, SUM(unidades_repro_parcial) AS unidades_repro,
        SUM(unidades_total_parcial) AS unidades_total,
        SUM(segundos_prod_parcial) AS segundos_prod, SUM(segundos_prep_parcial) AS segundos_prep,
        SUM(segundos_pp_parcial) AS segundos_pp, SUM(segundos_pnp_parcial) AS segundos_pnp, SUM(segundos_pcalidad_parcial) AS segundos_pcalidad,
        SUM(segundos_prod_parcial + segundos_pp_parcial + segundos_pnp_parcial + segundos_pcalidad_parcial) AS segundos_disponibles,
        SUM(CASE
            WHEN Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN
                CASE
                    WHEN ciclo_nominal_seg > 0 THEN segundos_turno * 1.0 / ciclo_nominal_seg
                    WHEN rendimiento_nominal_uh > 0 THEN (segundos_turno / 3600.0) * rendimiento_nominal_uh
                    ELSE 0
                END
            ELSE 0
        END) AS produccion_teorica,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE) THEN Ag_Rt_Disp_Turno END) AS disponibilidad_consolidada,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE) THEN Ag_Rt_Rend_Turno END) AS rendimiento_consolidado,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE) THEN Ag_Rt_OEE_Turno END) AS oee_consolidado,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE) THEN Ag_Rt_Cal_Turno END) AS calidad_consolidada,
        MAX(ObjetivoOEEVerde) AS objetivo_verde,
        MAX(ObjetivoOEENaranja) AS objetivo_amarillo
    FROM split_valid
    GROUP BY turno
),
calculos AS (
    SELECT
        a.*,
        disponibilidad_calc = CASE WHEN a.segundos_disponibles > 0 THEN CAST((a.segundos_prod * 100.0) / a.segundos_disponibles AS DECIMAL(8,2)) ELSE 0 END,
        rendimiento_calc = CASE WHEN a.produccion_teorica > 0 THEN CAST((a.unidades_total * 100.0) / a.produccion_teorica AS DECIMAL(8,2)) ELSE 0 END,
        calidad_calc = CASE WHEN (a.unidades_ok + a.unidades_nok) > 0 THEN CAST((a.unidades_ok * 100.0) / (a.unidades_ok + a.unidades_nok) AS DECIMAL(8,2)) ELSE 0 END,
        velocidad_uh_calc = CASE WHEN a.segundos_prod > 0 THEN CAST((a.unidades_total * 3600.0) / a.segundos_prod AS DECIMAL(10,2)) ELSE 0 END,
        seg_por_pza_calc = CASE WHEN a.unidades_total > 0 THEN CAST(a.segundos_prod / a.unidades_total AS DECIMAL(10,2)) ELSE 0 END
    FROM agregado a
)
SELECT
    turno, ventana_inicio, ventana_fin,
    CAST(unidades_ok AS DECIMAL(18,2)) AS unidades_ok,
    CAST(unidades_nok AS DECIMAL(18,2)) AS unidades_nok,
    CAST(unidades_repro AS DECIMAL(18,2)) AS unidades_repro,
    CAST(unidades_total AS DECIMAL(18,2)) AS unidades_total,
    CAST(segundos_prod AS DECIMAL(18,2)) AS segundos_prod,
    CAST(segundos_prep AS DECIMAL(18,2)) AS segundos_prep,
    CAST(segundos_pp AS DECIMAL(18,2)) AS segundos_pp,
    CAST(segundos_pnp AS DECIMAL(18,2)) AS segundos_pnp,
    CAST(segundos_pcalidad AS DECIMAL(18,2)) AS segundos_pcalidad,
    velocidad_uh = velocidad_uh_calc,
    seg_por_pza = seg_por_pza_calc,
    disponibilidad_turno = COALESCE(disponibilidad_consolidada, disponibilidad_calc),
    rendimiento_turno = COALESCE(rendimiento_consolidado, rendimiento_calc),
    calidad_turno = COALESCE(calidad_consolidada, calidad_calc),
    oee_turno = COALESCE(oee_consolidado,
        CAST(ROUND(
            (COALESCE(disponibilidad_consolidada, disponibilidad_calc) / 100.0) *
            (COALESCE(rendimiento_consolidado, rendimiento_calc) / 100.0) *
            (COALESCE(calidad_consolidada, calidad_calc) / 100.0) * 100.0, 2) AS DECIMAL(8,2))
    ),
    fuente_disponibilidad = CASE WHEN disponibilidad_consolidada IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_rendimiento = CASE WHEN rendimiento_consolidado IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_calidad = CASE WHEN calidad_consolidada IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_oee = CASE WHEN oee_consolidado IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    objetivo_verde = COALESCE(objetivo_verde, 80),
    objetivo_amarillo = COALESCE(objetivo_amarillo, 65)
FROM calculos
ORDER BY CASE turno WHEN 'MAÑANA' THEN 1 WHEN 'TARDE' THEN 2 WHEN 'NOCHE' THEN 3 ELSE 4 END
OPTION (MAXRECURSION 0);
`;

const GLOBALES_OF_QUERY = `
-- Parámetros: @cod_maquina, @fecha_inicio, @fecha_fin, @cod_of (opcional)
WITH parametros AS (
    SELECT @cod_maquina AS cod_maquina, CAST(@fecha_inicio AS DATE) AS fecha_inicio, CAST(@fecha_fin AS DATE) AS fecha_fin, @cod_of AS cod_of
),
base AS (
    SELECT
        hp.Id_actividad,
        DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) AS segundos_registro,
        CASE WHEN hp.Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END AS segundos_prod,
        ISNULL(hp.PP, 0) AS segundos_pp, ISNULL(hp.PNP, 0) AS segundos_pnp, ISNULL(hp.PCALIDAD, 0) AS segundos_pcalidad,
        ISNULL(hp.Unidades_ok, 0) AS unidades_ok, ISNULL(hp.Unidades_nok, 0) AS unidades_nok, ISNULL(hp.Unidades_repro, 0) AS unidades_repro,
        COALESCE(NULLIF(hf.SegCicloNominal, 0), NULLIF(cm.SegCicloNominal, 0), NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0), NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh,
        cm.Cod_maquina, ho.Cod_of
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1=1
    WHERE cm.Cod_maquina = p.cod_maquina AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME) AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
totales AS (
    SELECT
        SUM(unidades_ok) AS unidades_ok, SUM(unidades_nok) AS unidades_nok, SUM(unidades_repro) AS unidades_repro,
        SUM(unidades_ok + unidades_nok + unidades_repro) AS unidades_total,
        SUM(segundos_prod) AS segundos_prod, SUM(segundos_pp) AS segundos_pp, SUM(segundos_pnp) AS segundos_pnp, SUM(segundos_pcalidad) AS segundos_pcalidad,
        SUM(CASE
            WHEN Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN
                CASE
                    WHEN ciclo_nominal_seg > 0 THEN segundos_registro * 1.0 / ciclo_nominal_seg
                    WHEN rendimiento_nominal_uh > 0 THEN (segundos_registro / 3600.0) * rendimiento_nominal_uh
                    ELSE 0
                END
            ELSE 0
        END) AS produccion_teorica,
        MAX(Cod_maquina) AS cod_maquina, MAX(Cod_of) AS cod_of
    FROM base
)
SELECT
    cod_maquina, cod_of, unidades_ok, unidades_nok, unidades_repro, unidades_total,
    segundos_prod, segundos_pp, segundos_pnp, segundos_pcalidad, produccion_teorica,
    velocidad_uh_of = CASE WHEN segundos_prod > 0 THEN CAST((unidades_total * 3600.0) / segundos_prod AS DECIMAL(10,2)) ELSE 0 END,
    velocidad_seg_por_pza_of = CASE WHEN unidades_total > 0 THEN CAST(segundos_prod * 1.0 / unidades_total AS DECIMAL(10,2)) ELSE 0 END,
    rendimiento_of = CASE WHEN produccion_teorica > 0 THEN CAST((unidades_total * 100.0) / produccion_teorica AS DECIMAL(8,2)) ELSE 0 END,
    calidad_of = CASE WHEN (unidades_ok + unidades_nok) > 0 THEN CAST((unidades_ok * 100.0) / (unidades_ok + unidades_nok) AS DECIMAL(8,2)) ELSE 0 END,
    disponibilidad_of = CASE WHEN (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) > 0 THEN CAST((segundos_prod * 100.0) / (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) AS DECIMAL(8,2)) ELSE 0 END,
    oee_of = CAST(ROUND(
        (CASE WHEN (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) > 0 THEN (segundos_prod * 100.0) / (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) ELSE 0 END / 100.0) *
        (CASE WHEN produccion_teorica > 0 THEN (unidades_total * 100.0) / produccion_teorica ELSE 0 END / 100.0) *
        (CASE WHEN (unidades_ok + unidades_nok) > 0 THEN (unidades_ok * 100.0) / (unidades_ok + unidades_nok) ELSE 0 END / 100.0) * 100.0
    , 2) AS DECIMAL(8,2))
FROM totales;
`;

const PLANIFICACION_QUERY = `
-- Parámetros: @cod_maquina, @fecha_inicio, @fecha_fin, @cod_of (opcional)
WITH parametros AS (
    SELECT @cod_maquina AS cod_maquina, CAST(@fecha_inicio AS DATE) AS fecha_inicio, CAST(@fecha_fin AS DATE) AS fecha_fin, @cod_of AS cod_of
),
base AS (
    SELECT
        hp.Fecha_ini, hp.Fecha_fin,
        ISNULL(hp.Unidades_ok, 0) AS unidades_ok, ISNULL(hp.Unidades_nok, 0) AS unidades_nok, ISNULL(hp.Unidades_repro, 0) AS unidades_repro,
        hf.Unidades_planning AS unidades_plan_fase, ho.Unidades_planning AS unidades_plan_of,
        COALESCE(NULLIF(hf.SegCicloNominal, 0), NULLIF(cm.SegCicloNominal, 0), NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0), NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh,
        cm.Cod_maquina, ho.Cod_of, cm.Rt_Fecha_ini, cm.Rt_Fecha_fin,
        cm.ObjetivoOEEVerde, cm.ObjetivoOEENaranja
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1=1
    WHERE cm.Cod_maquina = p.cod_maquina AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME) AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
produccion AS (
    SELECT
        SUM(unidades_ok) AS unidades_ok, SUM(unidades_nok) AS unidades_nok, SUM(unidades_repro) AS unidades_repro,
        SUM(unidades_ok + unidades_nok + unidades_repro) AS unidades_total,
        MIN(Fecha_ini) AS fecha_ini_registro, MAX(Fecha_fin) AS fecha_fin_registro,
        MAX(Rt_Fecha_ini) AS rt_fecha_ini, MAX(Rt_Fecha_fin) AS rt_fecha_fin,
        MAX(ObjetivoOEEVerde) AS objetivo_verde, MAX(ObjetivoOEENaranja) AS objetivo_amarillo,
        MAX(Cod_maquina) AS cod_maquina, MAX(Cod_of) AS cod_of
    FROM base
),
plan_fase AS ( SELECT TOP (1) unidades_plan_fase FROM base WHERE unidades_plan_fase IS NOT NULL ORDER BY Fecha_ini DESC ),
plan_of AS ( SELECT TOP (1) unidades_plan_of FROM base WHERE unidades_plan_of IS NOT NULL ORDER BY Fecha_ini DESC ),
ciclos AS ( SELECT MAX(ciclo_nominal_seg) AS ciclo_nominal_seg, MAX(rendimiento_nominal_uh) AS rendimiento_nominal_uh FROM base )
SELECT
    p.cod_maquina, p.cod_of,
    planificado = COALESCE((SELECT unidades_plan_fase FROM plan_fase), (SELECT unidades_plan_of FROM plan_of), 0),
    fuente_planificado = CASE
        WHEN (SELECT unidades_plan_fase FROM plan_fase) IS NOT NULL THEN 'fase'
        WHEN (SELECT unidades_plan_of FROM plan_of) IS NOT NULL THEN 'of'
        ELSE 'sin_dato'
    END,
    unidades_ok_total = p.unidades_ok,
    unidades_nok_total = p.unidades_nok,
    unidades_rw_total = p.unidades_repro,
    unidades_total = p.unidades_total,
    piezas_restantes = CASE
        WHEN COALESCE((SELECT unidades_plan_fase FROM plan_fase), (SELECT unidades_plan_of FROM plan_of), 0) > p.unidades_total
        THEN COALESCE((SELECT unidades_plan_fase FROM plan_fase), (SELECT unidades_plan_of FROM plan_of), 0) - p.unidades_total
        ELSE 0
    END,
    tiempo_por_pieza_seg = COALESCE((SELECT ciclo_nominal_seg FROM ciclos),
        CASE WHEN (SELECT rendimiento_nominal_uh FROM ciclos) > 0 THEN 3600.0 / (SELECT rendimiento_nominal_uh FROM ciclos) ELSE NULL END
    ),
    fecha_inicio_real = COALESCE(p.rt_fecha_ini, p.fecha_ini_registro),
    fecha_fin_real = COALESCE(p.rt_fecha_fin, p.fecha_fin_registro),
    fecha_fin_estimada = CASE
        WHEN COALESCE((SELECT unidades_plan_fase FROM plan_fase), (SELECT unidades_plan_of FROM plan_of), 0) > p.unidades_total
             AND COALESCE((SELECT ciclo_nominal_seg FROM ciclos), CASE WHEN (SELECT rendimiento_nominal_uh FROM ciclos) > 0 THEN 3600.0 / (SELECT rendimiento_nominal_uh FROM ciclos) ELSE NULL END) > 0
        THEN DATEADD(
            SECOND,
            (
                (COALESCE((SELECT unidades_plan_fase FROM plan_fase), (SELECT unidades_plan_of FROM plan_of), 0) - p.unidades_total)
                *
                COALESCE((SELECT ciclo_nominal_seg FROM ciclos), CASE WHEN (SELECT rendimiento_nominal_uh FROM ciclos) > 0 THEN 3600.0 / (SELECT rendimiento_nominal_uh FROM ciclos) ELSE 0 END)
            ),
            GETDATE()
        )
        ELSE COALESCE(p.rt_fecha_fin, p.fecha_fin_registro)
    END,
    objetivo_oee_verde = COALESCE(p.objetivo_verde, 80),
    objetivo_oee_naranja = COALESCE(p.objetivo_amarillo, 65)
FROM produccion p;
`;

const OPERADORES_POR_TURNO_QUERY = `
WITH parametros AS (
    SELECT
        @cod_maquina AS cod_maquina,
        CAST(@fecha_inicio AS DATE) AS fecha_inicio,
        CAST(@fecha_fin AS DATE) AS fecha_fin,
        @cod_of AS cod_of
),
rango_dias AS (
    SELECT fecha_inicio AS dia FROM parametros
    UNION ALL
    SELECT DATEADD(DAY, 1, rd.dia) FROM rango_dias rd JOIN parametros p ON 1 = 1 WHERE rd.dia < p.fecha_fin
),
turnos AS (
    SELECT d.dia, 1 AS turno_id, 'MAÑANA' AS turno, DATEADD(HOUR, 6, CAST(d.dia AS DATETIME)) AS turno_inicio, DATEADD(HOUR, 14, CAST(d.dia AS DATETIME)) AS turno_fin FROM rango_dias d
    UNION ALL
    SELECT d.dia, 2 AS turno_id, 'TARDE' AS turno, DATEADD(MINUTE, 15, DATEADD(HOUR, 14, CAST(d.dia AS DATETIME))) AS turno_inicio, DATEADD(MINUTE, 30, DATEADD(HOUR, 22, CAST(d.dia AS DATETIME))) AS turno_fin FROM rango_dias d
    UNION ALL
    SELECT d.dia, 3 AS turno_id, 'NOCHE' AS turno, DATEADD(MINUTE, 30, DATEADD(HOUR, 22, CAST(d.dia AS DATETIME))) AS turno_inicio, DATEADD(HOUR, 30, CAST(d.dia AS DATETIME)) AS turno_fin FROM rango_dias d
),
base AS (
    SELECT
        hp.Id_his_prod, hp.Id_maquina, hp.Id_his_fase, hp.Id_actividad, hp.Id_operario, hp.OperFinal, hp.OPER, hp.NumOper,
        hp.Fecha_ini, hp.Fecha_fin,
        hp.Unidades_ok, hp.Unidades_nok, hp.Unidades_repro,
        hp.PP, hp.PNP, hp.PCALIDAD,
        hf.Id_his_of, ho.Cod_of,
        hf.Unidades_planning AS unidades_plan_fase,
        ho.Unidades_planning AS unidades_plan_of,
        COALESCE(NULLIF(hf.SegCicloNominal, 0), NULLIF(cm.SegCicloNominal, 0), NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0), NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh,
        cm.Cod_maquina, cm.Ag_Rt_Disp_Turno, cm.Ag_Rt_Rend_Turno, cm.Ag_Rt_OEE_Turno, cm.Ag_Rt_Cal_Turno,
        cm.ObjetivoOEEVerde, cm.ObjetivoOEENaranja, cm.Rt_Dia_productivo, cm.Rt_Id_turno
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1 = 1
    WHERE cm.Cod_maquina = p.cod_maquina AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME) AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
split AS (
    SELECT
        t.turno, t.turno_id, t.turno_inicio, t.turno_fin,
        b.*,
        CASE
            WHEN b.Fecha_ini < t.turno_fin AND b.Fecha_fin > t.turno_inicio
            THEN DATEDIFF(SECOND,
                CASE WHEN b.Fecha_ini > t.turno_inicio THEN b.Fecha_ini ELSE t.turno_inicio END,
                CASE WHEN b.Fecha_fin < t.turno_fin THEN b.Fecha_fin ELSE t.turno_fin END)
            ELSE 0
        END AS segundos_turno,
        DATEDIFF(SECOND, b.Fecha_ini, b.Fecha_fin) AS segundos_total
    FROM base b
    INNER JOIN turnos t ON b.Fecha_ini < t.turno_fin AND b.Fecha_fin > t.turno_inicio
),
split_valid AS (
    SELECT
        *,
        ratio = CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_ok_parcial = ISNULL(Unidades_ok, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_nok_parcial = ISNULL(Unidades_nok, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_repro_parcial = ISNULL(Unidades_repro, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_total_parcial = (ISNULL(Unidades_ok, 0) + ISNULL(Unidades_nok, 0) + ISNULL(Unidades_repro, 0)) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_prod_parcial = CASE WHEN Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN segundos_turno ELSE 0 END,
        segundos_prep_parcial = CASE WHEN Id_actividad = ${ID_ACTIVIDAD_PREPARACION} THEN segundos_turno ELSE 0 END,
        segundos_pp_parcial = ISNULL(PP, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pnp_parcial = ISNULL(PNP, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pcalidad_parcial = ISNULL(PCALIDAD, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END
    FROM split
    WHERE segundos_turno > 0
),
operadores AS (
    SELECT
        turno,
        Id_operario,
        operador_nombre,
        legajo,
        SUM(unidades_ok_parcial) AS unidades_ok,
        SUM(unidades_nok_parcial) AS unidades_nok,
        SUM(unidades_repro_parcial) AS unidades_repro,
        SUM(unidades_total_parcial) AS unidades_total,
        SUM(segundos_prod_parcial) AS segundos_prod,
        SUM(segundos_prep_parcial) AS segundos_prep,
        SUM(segundos_pp_parcial) AS segundos_pp,
        SUM(segundos_pnp_parcial) AS segundos_pnp,
        SUM(segundos_pcalidad_parcial) AS segundos_pcalidad,
        SUM(segundos_prod_parcial + segundos_pp_parcial + segundos_pnp_parcial + segundos_pcalidad_parcial) AS segundos_disponibles,
        SUM(CASE
            WHEN Id_actividad = ${ID_ACTIVIDAD_PRODUCCION} THEN
                CASE
                    WHEN ciclo_nominal_seg > 0 THEN segundos_turno * 1.0 / ciclo_nominal_seg
                    WHEN rendimiento_nominal_uh > 0 THEN (segundos_turno / 3600.0) * rendimiento_nominal_uh
                    ELSE 0
                END
            ELSE 0
        END) AS produccion_teorica
    FROM (
        SELECT
            sv.*,
            operador_nombre = COALESCE(
                NULLIF(LTRIM(RTRIM(CAST(sv.OperFinal AS NVARCHAR(200)))), ''),
                NULLIF(LTRIM(RTRIM(CAST(sv.OPER AS NVARCHAR(200)))), ''),
                CONCAT('Operario ', COALESCE(CAST(sv.Id_operario AS NVARCHAR(50)), 'S/D'))
            ),
            legajo = COALESCE(
                NULLIF(LTRIM(RTRIM(CAST(sv.NumOper AS NVARCHAR(50)))), ''),
                NULLIF(LTRIM(RTRIM(CAST(sv.Id_operario AS NVARCHAR(50)))), '')
            )
        FROM split_valid sv
    ) datos
    GROUP BY turno, Id_operario, operador_nombre, legajo
)
SELECT
    turno,
    id_operario = Id_operario,
    operario_nombre = CASE WHEN operador_nombre IS NULL OR LTRIM(RTRIM(operador_nombre)) = '' THEN 'Sin operador' ELSE operador_nombre END,
    legajo,
    unidades_ok = CAST(unidades_ok AS DECIMAL(18,2)),
    unidades_nok = CAST(unidades_nok AS DECIMAL(18,2)),
    unidades_repro = CAST(unidades_repro AS DECIMAL(18,2)),
    unidades_total = CAST(unidades_total AS DECIMAL(18,2)),
    segundos_prod = CAST(segundos_prod AS DECIMAL(18,2)),
    segundos_prep = CAST(segundos_prep AS DECIMAL(18,2)),
    segundos_pp = CAST(segundos_pp AS DECIMAL(18,2)),
    segundos_pnp = CAST(segundos_pnp AS DECIMAL(18,2)),
    segundos_pcalidad = CAST(segundos_pcalidad AS DECIMAL(18,2)),
    segundos_paro = CAST(segundos_pp + segundos_pnp + segundos_pcalidad AS DECIMAL(18,2)),
    disponibilidad = CASE WHEN segundos_disponibles > 0 THEN CAST((segundos_prod * 100.0) / segundos_disponibles AS DECIMAL(8,2)) ELSE 0 END,
    rendimiento = CASE WHEN produccion_teorica > 0 THEN CAST((unidades_total * 100.0) / produccion_teorica AS DECIMAL(8,2)) ELSE 0 END,
    calidad = CASE WHEN (unidades_ok + unidades_nok) > 0 THEN CAST((unidades_ok * 100.0) / (unidades_ok + unidades_nok) AS DECIMAL(8,2)) ELSE 0 END,
    oee = CAST(ROUND(
        (CASE WHEN segundos_disponibles > 0 THEN (segundos_prod * 100.0) / segundos_disponibles ELSE 0 END / 100.0) *
        (CASE WHEN produccion_teorica > 0 THEN (unidades_total * 100.0) / produccion_teorica ELSE 0 END / 100.0) *
        (CASE WHEN (unidades_ok + unidades_nok) > 0 THEN (unidades_ok * 100.0) / (unidades_ok + unidades_nok) ELSE 0 END / 100.0) * 100.0,
        2
    ) AS DECIMAL(8,2)),
    velocidad_uh = CASE WHEN segundos_prod > 0 THEN CAST((unidades_total * 3600.0) / segundos_prod AS DECIMAL(10,2)) ELSE 0 END,
    seg_por_pza = CASE WHEN unidades_total > 0 THEN CAST(segundos_prod / unidades_total AS DECIMAL(10,2)) ELSE 0 END
FROM operadores
WHERE (unidades_total > 0 OR segundos_prod > 0 OR segundos_prep > 0 OR segundos_pp > 0 OR segundos_pnp > 0 OR segundos_pcalidad > 0)
ORDER BY CASE turno WHEN 'MAÑANA' THEN 1 WHEN 'TARDE' THEN 2 WHEN 'NOCHE' THEN 3 ELSE 4 END,
         unidades_total DESC
OPTION (MAXRECURSION 0);
`;

const SHIFT_DEFINITIONS = [
  { turno: "MAÑANA", startHour: 6, startMinute: 0, endHour: 14, endMinute: 0, crossesMidnight: false },
  { turno: "TARDE", startHour: 14, startMinute: 15, endHour: 22, endMinute: 30, crossesMidnight: false },
  { turno: "NOCHE", startHour: 22, startMinute: 30, endHour: 6, endMinute: 0, crossesMidnight: true },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cod_maquina = searchParams.get("cod_maquina");
  const fecha_inicio = searchParams.get("fecha_inicio");
  const fecha_fin = searchParams.get("fecha_fin");
  const cod_of = searchParams.get("cod_of");

  if (!cod_maquina || !fecha_inicio || !fecha_fin) {
    return NextResponse.json(
      {
        error:
          "Faltan parámetros requeridos: cod_maquina, fecha_inicio, fecha_fin",
      },
      { status: 400 },
    );
  }

  try {
    const parametros = {
      cod_maquina,
      fecha_inicio: new Date(`${fecha_inicio}T00:00:00`),
      fecha_fin: new Date(`${fecha_fin}T23:59:59`),
      cod_of: cod_of ?? null,
    } as const;

    const [turnosResult, operadoresResult, globalesResult, planificacionResult] =
      await Promise.all([
        executeQuery(METRICAS_POR_TURNO_QUERY, parametros, "mapex"),
        executeQuery(OPERADORES_POR_TURNO_QUERY, parametros, "mapex"),
        executeQuery(GLOBALES_OF_QUERY, parametros, "mapex"),
        executeQuery(PLANIFICACION_QUERY, parametros, "mapex"),
      ]);

    const operadoresPorTurno = (operadoresResult as any[]).reduce(
      (acc, item) => {
        const turnoKey = item.turno as string;
        if (!acc[turnoKey]) acc[turnoKey] = [];
        acc[turnoKey].push(item);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    const turnosConOperarios = (turnosResult as any[]).map((turno) => ({
      ...turno,
      operarios: operadoresPorTurno[turno.turno] ?? [],
    }));

    const planificacionInfo = planificacionResult[0] || {};
    const objetivoVerdeBase = turnosConOperarios.find((t) => t.objetivo_verde != null)?.objetivo_verde
      ?? planificacionInfo.objetivo_oee_verde
      ?? 80;
    const objetivoAmarilloBase = turnosConOperarios.find((t) => t.objetivo_amarillo != null)?.objetivo_amarillo
      ?? planificacionInfo.objetivo_oee_naranja
      ?? 65;

    const ensureNumber = (value: unknown, fallback = 0) => {
      if (value === null || value === undefined) return fallback;
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : fallback;
    };

    const fechaBase = new Date(`${fecha_inicio}T00:00:00`);
    const ahora = new Date();

    const filledTurnos = SHIFT_DEFINITIONS.map((def) => {
      const baseStart = new Date(fechaBase);
      baseStart.setHours(def.startHour, def.startMinute, 0, 0);
      const baseEnd = new Date(fechaBase);
      if (def.crossesMidnight || (def.endHour < def.startHour)) {
        baseEnd.setDate(baseEnd.getDate() + 1);
      }
      baseEnd.setHours(def.endHour, def.endMinute, 0, 0);

      const existingIndex = turnosConOperarios.findIndex((t) => t.turno === def.turno);
      const existing = existingIndex >= 0 ? turnosConOperarios[existingIndex] : null;

      const baseTurno = existing
        ? { ...existing }
        : {
            turno: def.turno,
            ventana_inicio: baseStart.toISOString(),
            ventana_fin: baseEnd.toISOString(),
            unidades_ok: 0,
            unidades_nok: 0,
            unidades_repro: 0,
            unidades_total: 0,
            segundos_prod: 0,
            segundos_prep: 0,
            segundos_pp: 0,
            segundos_pnp: 0,
            segundos_pcalidad: 0,
            velocidad_uh: 0,
            seg_por_pza: 0,
            oee_turno: 0,
            disponibilidad_turno: 0,
            rendimiento_turno: 0,
            calidad_turno: 0,
            objetivo_verde: objetivoVerdeBase,
            objetivo_amarillo: objetivoAmarilloBase,
            operarios: [] as any[],
          };

      baseTurno.ventana_inicio = baseTurno.ventana_inicio ?? baseStart.toISOString();
      baseTurno.ventana_fin = baseTurno.ventana_fin ?? baseEnd.toISOString();
      baseTurno.objetivo_verde = ensureNumber(baseTurno.objetivo_verde, objetivoVerdeBase);
      baseTurno.objetivo_amarillo = ensureNumber(baseTurno.objetivo_amarillo, objetivoAmarilloBase);
      baseTurno.operarios = baseTurno.operarios ?? [];

      baseTurno.unidades_ok = ensureNumber(baseTurno.unidades_ok);
      baseTurno.unidades_nok = ensureNumber(baseTurno.unidades_nok);
      baseTurno.unidades_repro = ensureNumber(baseTurno.unidades_repro);
      baseTurno.unidades_total = ensureNumber(baseTurno.unidades_total);
      baseTurno.segundos_prod = ensureNumber(baseTurno.segundos_prod);
      baseTurno.segundos_prep = ensureNumber(baseTurno.segundos_prep);
      baseTurno.segundos_pp = ensureNumber(baseTurno.segundos_pp);
      baseTurno.segundos_pnp = ensureNumber(baseTurno.segundos_pnp);
      baseTurno.segundos_pcalidad = ensureNumber(baseTurno.segundos_pcalidad);
      baseTurno.velocidad_uh = ensureNumber(baseTurno.velocidad_uh);
      baseTurno.seg_por_pza = ensureNumber(baseTurno.seg_por_pza);
      baseTurno.oee_turno = ensureNumber(baseTurno.oee_turno);
      baseTurno.disponibilidad_turno = ensureNumber(baseTurno.disponibilidad_turno);
      baseTurno.rendimiento_turno = ensureNumber(baseTurno.rendimiento_turno);
      baseTurno.calidad_turno = ensureNumber(baseTurno.calidad_turno);

      const estado_turno = ahora < baseStart ? 'no_iniciado' : ahora >= baseStart && ahora < baseEnd ? 'en_curso' : 'finalizado';
      const ultima_actualizacion = estado_turno === 'en_curso' ? new Date().toISOString() : baseTurno.ventana_fin;

      return {
        ...baseTurno,
        estado_turno,
        ventana_inicio: baseTurno.ventana_inicio,
        ventana_fin: baseTurno.ventana_fin,
        ultima_actualizacion,
      };
    });

    const responseData = {
      turnos: filledTurnos,
      globales_of: globalesResult[0] || {},
      planificacion: planificacionInfo,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error al obtener los datos de informes:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido en el servidor";
    return NextResponse.json(
      { error: "Error al procesar la solicitud.", details: errorMessage },
      { status: 500 },
    );
  }
}
