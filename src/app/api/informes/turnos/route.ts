import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from 'lib/database/connection';

type TurnoClave = 'MAÑANA' | 'TARDE' | 'NOCHE';

type FuenteDato = 'fase' | 'of' | 'sin_dato';

type InformesTurnosParams = {
  cod_maquina: string;
  cod_of?: string;
  start_date: string;
  end_date: string;
  split_turnos?: boolean;
};

type TurnoDetalle = {
  turno: TurnoClave;
  window: {
    start: string;
    end: string;
  };
  kpis: {
    oee: number;
    disponibilidad: number;
    rendimiento: number;
    calidad: number;
    velocidad_uh: number;
    seg_por_pza: number;
  };
  unidades: {
    ok: number;
    nok: number;
    rw: number;
    total: number;
  };
  tiempos: {
    prod_s: number;
    prep_s: number;
    paro_pp_s: number;
    paro_pnp_s: number;
    paro_calidad_s: number;
  };
};

type ResumenProduccion = {
  cod_maquina: string;
  cod_of?: string;
  desc_maquina?: string;
  desc_of?: string;
  planificado: number;
  fuente_planificado: FuenteDato;
  unidades_ok: number;
  unidades_nok: number;
  unidades_rw: number;
  unidades_total: number;
  velocidad_uh: number;
  velocidad_seg_por_pza: number;
  rendimiento_turno_prom: number;
  rendimiento_of: number;
  disponibilidad_of: number;
  calidad_of: number;
  oee_of: number;
  fecha_inicio?: string;
  fecha_fin_real?: string;
  fecha_fin_estimada?: string;
};

type InformesTurnosResponse = {
  meta: {
    maquina: string;
    desc_maquina?: string;
    of?: string;
    periodo: {
      inicio: string;
      fin: string;
    };
    split_ativo: boolean;
    timezone: string;
    objetivo_verde: number;
    objetivo_amarillo: number;
    fuente_planificado: FuenteDato;
  };
  turnos: TurnoDetalle[];
  resumen: ResumenProduccion;
  totais: {
    periodo_oee: number;
    periodo_vel_uh: number;
  };
};

const TURNOS_ORDEN: TurnoClave[] = ['MAÑANA', 'TARDE', 'NOCHE'];

const ventanaPorTurno: Record<TurnoClave, { start: string; end: string }> = {
  MAÑANA: { start: '06:00', end: '14:00' },
  TARDE: { start: '14:00', end: '22:00' },
  NOCHE: { start: '22:00', end: '06:00' },
};

const sqlMaquina = `
  SELECT TOP (1)
    cm.Id_maquina,
    cm.Cod_maquina,
    cm.Desc_maquina,
    cm.ObjetivoOEEVerde,
    cm.ObjetivoOEENaranja
  FROM cfg_maquina cm
  WHERE cm.Cod_maquina = @cod_maquina
    AND cm.Activo = 1;
`;

const sqlValidarOF = `
  SELECT TOP (1) 1
  FROM his_of ho
  INNER JOIN his_fase hf ON ho.Id_his_of = hf.Id_his_of
  INNER JOIN cfg_maquina cm ON hf.Id_his_fase = cm.Rt_Id_his_fase
  WHERE ho.Cod_of = @cod_of
    AND cm.Cod_maquina = @cod_maquina;
`;

const sqlTurnos = `
WITH parametros AS (
    SELECT
        @cod_maquina AS cod_maquina,
        CAST(@fecha_inicio AS DATE) AS fecha_inicio,
        CAST(@fecha_fin AS DATE) AS fecha_fin,
        @cod_of AS cod_of
),
/* Genera un registro por turno/día dentro del rango solicitado */
rango_dias AS (
    SELECT fecha_inicio AS dia
    FROM parametros
    UNION ALL
    SELECT DATEADD(DAY, 1, rd.dia)
    FROM rango_dias rd
    JOIN parametros p ON 1 = 1
    WHERE rd.dia < p.fecha_fin
),
turnos AS (
    SELECT d.dia, 1 AS turno_id, 'MAÑANA' AS turno,
           DATEADD(HOUR, 6, CAST(d.dia AS DATETIME)) AS turno_inicio,
           DATEADD(HOUR, 14, CAST(d.dia AS DATETIME)) AS turno_fin
    FROM rango_dias d
    UNION ALL
    SELECT d.dia, 2, 'TARDE',
           DATEADD(HOUR, 14, CAST(d.dia AS DATETIME)),
           DATEADD(HOUR, 22, CAST(d.dia AS DATETIME))
    FROM rango_dias d
    UNION ALL
    SELECT d.dia, 3, 'NOCHE',
           DATEADD(HOUR, 22, CAST(d.dia AS DATETIME)),
           DATEADD(HOUR, 30, CAST(d.dia AS DATETIME))
    FROM rango_dias d
),
/* Registros base de producción */
base AS (
    SELECT
        hp.Id_his_prod,
        hp.Id_maquina,
        hp.Id_his_fase,
        hp.Id_actividad,
        hp.Fecha_ini,
        hp.Fecha_fin,
        hp.Unidades_ok,
        hp.Unidades_nok,
        hp.Unidades_repro,
        hp.PP,
        hp.PNP,
        hp.PCALIDAD,
        hf.Id_his_of,
        ho.Cod_of,
        hf.Unidades_planning            AS unidades_plan_fase,
        ho.Unidades_planning            AS unidades_plan_of,
        COALESCE(NULLIF(hf.SegCicloNominal, 0),
                 NULLIF(cm.SegCicloNominal, 0),
                 NULLIF(cm.rt_SegCicloNominal, 0))            AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0),
                 NULLIF(cm.Rt_Rendimientonominal1, 0))        AS rendimiento_nominal_uh,
        cm.Cod_maquina,
        cm.Ag_Rt_Disp_Turno,
        cm.Ag_Rt_Rend_Turno,
        cm.Ag_Rt_OEE_Turno,
        cm.Ag_Rt_Cal_Turno,
        cm.ObjetivoOEEVerde,
        cm.ObjetivoOEENaranja,
        cm.Rt_Dia_productivo,
        cm.Rt_Id_turno,
        cm.Rt_Fecha_ini,
        cm.Rt_Fecha_fin
    FROM his_prod hp
    INNER JOIN cfg_maquina cm
        ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf
        ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho
        ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1 = 1
    WHERE cm.Cod_maquina = p.cod_maquina
      AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME)
      AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin
      AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
/* Fragmenta registros que cruzam limites de turno */
split AS (
    SELECT
        t.turno,
        t.turno_id,
        t.turno_inicio,
        t.turno_fin,
        b.Cod_maquina,
        b.Cod_of,
        b.unidades_plan_fase,
        b.unidades_plan_of,
        b.Ag_Rt_Disp_Turno,
        b.Ag_Rt_Rend_Turno,
        b.Ag_Rt_OEE_Turno,
        b.Ag_Rt_Cal_Turno,
        b.ObjetivoOEEVerde,
        b.ObjetivoOEENaranja,
        b.Rt_Dia_productivo,
        b.Rt_Id_turno,
        b.Rt_Fecha_ini,
        b.Rt_Fecha_fin,
        b.ciclo_nominal_seg,
        b.rendimiento_nominal_uh,
        b.Id_actividad,
        CASE
            WHEN b.Fecha_ini < t.turno_fin AND b.Fecha_fin > t.turno_inicio
            THEN DATEDIFF(SECOND,
                          CASE WHEN b.Fecha_ini > t.turno_inicio THEN b.Fecha_ini ELSE t.turno_inicio END,
                          CASE WHEN b.Fecha_fin < t.turno_fin   THEN b.Fecha_fin ELSE t.turno_fin   END)
            ELSE 0
        END AS segundos_turno,
        DATEDIFF(SECOND, b.Fecha_ini, b.Fecha_fin) AS segundos_total,
        b.Unidades_ok,
        b.Unidades_nok,
        b.Unidades_repro,
        b.PP,
        b.PNP,
        b.PCALIDAD
    FROM base b
    INNER JOIN turnos t
        ON b.Fecha_ini < t.turno_fin
       AND b.Fecha_fin > t.turno_inicio
),
split_valid AS (
    SELECT
        turno,
        turno_id,
        turno_inicio,
        turno_fin,
        Cod_maquina,
        Cod_of,
        unidades_plan_fase,
        unidades_plan_of,
        Ag_Rt_Disp_Turno,
        Ag_Rt_Rend_Turno,
        Ag_Rt_OEE_Turno,
        Ag_Rt_Cal_Turno,
        ObjetivoOEEVerde,
        ObjetivoOEENaranja,
        Rt_Dia_productivo,
        Rt_Id_turno,
        Rt_Fecha_ini,
        Rt_Fecha_fin,
        ciclo_nominal_seg,
        rendimiento_nominal_uh,
        Id_actividad,
        segundos_turno,
        segundos_total,
        ratio = CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_ok_parcial    = ISNULL(Unidades_ok, 0)    * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_nok_parcial   = ISNULL(Unidades_nok, 0)   * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_repro_parcial = ISNULL(Unidades_repro, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        unidades_total_parcial = (ISNULL(Unidades_ok, 0) + ISNULL(Unidades_nok, 0) + ISNULL(Unidades_repro, 0))
                                 * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_prod_parcial  = CASE
            WHEN (ISNULL(Unidades_ok, 0) + ISNULL(Unidades_nok, 0) + ISNULL(Unidades_repro, 0)) > 0
            THEN segundos_turno
            ELSE 0
        END,
        segundos_pp_parcial    = ISNULL(PP, 0)      * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pnp_parcial   = ISNULL(PNP, 0)     * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END,
        segundos_pcalidad_parcial = ISNULL(PCALIDAD, 0) * CASE WHEN segundos_total > 0 THEN segundos_turno * 1.0 / segundos_total ELSE 0 END
    FROM split
    WHERE segundos_turno > 0
),
/* Agrega métricas por turno */
agregado AS (
    SELECT
        turno,
        MIN(turno_inicio) AS ventana_inicio,
        MAX(turno_fin)    AS ventana_fin,
        SUM(unidades_ok_parcial)    AS unidades_ok,
        SUM(unidades_nok_parcial)   AS unidades_nok,
        SUM(unidades_repro_parcial) AS unidades_repro,
        SUM(unidades_total_parcial) AS unidades_total,
        SUM(segundos_prod_parcial)  AS segundos_prod,
        SUM(segundos_pp_parcial)    AS segundos_pp,
        SUM(segundos_pnp_parcial)   AS segundos_pnp,
        SUM(segundos_pcalidad_parcial) AS segundos_pcalidad,
        SUM(segundos_prod_parcial + segundos_pp_parcial + segundos_pnp_parcial + segundos_pcalidad_parcial) AS segundos_disponibles,
        SUM(segundos_turno) AS segundos_total,
        SUM(CASE
                WHEN Id_actividad = 2 THEN
                    CASE
                        WHEN ciclo_nominal_seg > 0 THEN segundos_turno * 1.0 / ciclo_nominal_seg
                        WHEN rendimiento_nominal_uh > 0 THEN (segundos_turno / 3600.0) * rendimiento_nominal_uh
                        ELSE 0
                    END
                ELSE 0
            END) AS produccion_teorica,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE)
                 THEN Ag_Rt_Disp_Turno END) AS disponibilidad_consolidada,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE)
                 THEN Ag_Rt_Rend_Turno END) AS rendimiento_consolidado,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE)
                 THEN Ag_Rt_OEE_Turno END)  AS oee_consolidado,
        MAX(CASE WHEN turno_id = Rt_Id_turno AND CAST(Rt_Dia_productivo AS DATE) = CAST(turno_inicio AS DATE)
                 THEN Ag_Rt_Cal_Turno END)  AS calidad_consolidada,
        MAX(ObjetivoOEEVerde)   AS objetivo_verde,
        MAX(ObjetivoOEENaranja) AS objetivo_amarillo
    FROM split_valid
    GROUP BY turno
),
calculos AS (
    SELECT
        a.turno,
        a.ventana_inicio,
        a.ventana_fin,
        CAST(a.unidades_ok AS DECIMAL(18,2))    AS unidades_ok,
        CAST(a.unidades_nok AS DECIMAL(18,2))   AS unidades_nok,
        CAST(a.unidades_repro AS DECIMAL(18,2)) AS unidades_repro,
        CAST(a.unidades_total AS DECIMAL(18,2)) AS unidades_total,
        CAST(a.segundos_prod AS DECIMAL(18,2))  AS segundos_prod,
        CAST(a.segundos_pp AS DECIMAL(18,2))    AS segundos_pp,
        CAST(a.segundos_pnp AS DECIMAL(18,2))   AS segundos_pnp,
        CAST(a.segundos_pcalidad AS DECIMAL(18,2)) AS segundos_pcalidad,
        segundos_prep_calc = CASE
            WHEN a.segundos_total > (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad)
            THEN CAST(a.segundos_total - (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad) AS DECIMAL(18,2))
            ELSE CAST(0 AS DECIMAL(18,2))
        END,
        CAST(a.produccion_teorica AS DECIMAL(18,4)) AS produccion_teorica,
        a.objetivo_verde,
        a.objetivo_amarillo,
        disponibilidad_calc = CASE
            WHEN (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad +
                  CASE WHEN a.segundos_total > (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad)
                       THEN a.segundos_total - (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad)
                       ELSE 0 END) > 0
            THEN CAST(
                (a.segundos_prod * 100.0) /
                (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad +
                 CASE WHEN a.segundos_total > (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad)
                      THEN a.segundos_total - (a.segundos_prod + a.segundos_pp + a.segundos_pnp + a.segundos_pcalidad)
                      ELSE 0 END)
            AS DECIMAL(8,2))
            ELSE 0
        END,
        rendimiento_calc = CASE
            WHEN a.produccion_teorica > 0
            THEN CAST((a.unidades_total * 100.0) / a.produccion_teorica AS DECIMAL(8,2))
            ELSE 0
        END,
        calidad_calc = CASE
            WHEN (a.unidades_ok + a.unidades_nok) > 0
            THEN CAST((a.unidades_ok * 100.0) / (a.unidades_ok + a.unidades_nok) AS DECIMAL(8,2))
            ELSE 0
        END,
        velocidad_uh_calc = CASE
            WHEN a.segundos_prod > 0
            THEN CAST((a.unidades_total * 3600.0) / a.segundos_prod AS DECIMAL(10,2))
            ELSE 0
        END,
        seg_por_pza_calc = CASE
            WHEN a.unidades_total > 0
            THEN CAST(a.segundos_prod / a.unidades_total AS DECIMAL(10,2))
            ELSE 0
        END,
        oee_calc = CAST(ROUND(
            (CASE WHEN a.segundos_disponibles > 0 THEN (a.segundos_prod * 100.0) / a.segundos_disponibles ELSE 0 END / 100.0) *
            (CASE WHEN a.produccion_teorica > 0 THEN (a.unidades_total * 100.0) / a.produccion_teorica ELSE 0 END / 100.0) *
            (CASE WHEN (a.unidades_ok + a.unidades_nok) > 0 THEN (a.unidades_ok * 100.0) / (a.unidades_ok + a.unidades_nok) ELSE 0 END / 100.0) * 100.0
        , 2) AS DECIMAL(8,2)),
        a.disponibilidad_consolidada,
        a.rendimiento_consolidado,
        a.calidad_consolidada,
        a.oee_consolidado
    FROM agregado a
)
SELECT
    turno,
    ventana_inicio,
    ventana_fin,
    unidades_ok,
    unidades_nok,
    unidades_repro,
    unidades_total,
    segundos_prod,
    segundos_prep,
    segundos_pp,
    segundos_pnp,
    segundos_pcalidad,
    velocidad_uh = velocidad_uh_calc,
    seg_por_pza = seg_por_pza_calc,
    disponibilidad_turno = COALESCE(disponibilidad_consolidada, disponibilidad_calc),
    rendimiento_turno    = COALESCE(rendimiento_consolidado, rendimiento_calc),
    calidad_turno        = COALESCE(calidad_consolidada, calidad_calc),
    oee_turno            = COALESCE(oee_consolidado,
                                    CAST(ROUND(
                                        (COALESCE(disponibilidad_consolidada, disponibilidad_calc) / 100.0) *
                                        (COALESCE(rendimiento_consolidado, rendimiento_calc) / 100.0) *
                                        (COALESCE(calidad_consolidada, calidad_calc) / 100.0) * 100.0, 2) AS DECIMAL(8,2))),
    fuente_disponibilidad = CASE WHEN disponibilidad_consolidada IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_rendimiento    = CASE WHEN rendimiento_consolidado IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_calidad        = CASE WHEN calidad_consolidada IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    fuente_oee            = CASE WHEN oee_consolidado IS NOT NULL THEN 'consolidado' ELSE 'calculado' END,
    objetivo_verde   = COALESCE(objetivo_verde, 80),
    objetivo_amarillo = COALESCE(objetivo_amarillo, 65)
FROM calculos
ORDER BY
    CASE turno
        WHEN 'MAÑANA' THEN 1
        WHEN 'TARDE'  THEN 2
        WHEN 'NOCHE'  THEN 3
        ELSE 4
    END
OPTION (MAXRECURSION 0);
`;

const sqlResumen = `
WITH parametros AS (
    SELECT
        @cod_maquina AS cod_maquina,
        CAST(@fecha_inicio AS DATE) AS fecha_inicio,
        CAST(@fecha_fin AS DATE) AS fecha_fin,
        @cod_of AS cod_of
),
base AS (
    SELECT
        hp.Id_actividad,
        DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) AS segundos_registro,
        CASE WHEN hp.Id_actividad = 2 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) ELSE 0 END AS segundos_prod,
        ISNULL(hp.PP, 0)  AS segundos_pp,
        ISNULL(hp.PNP, 0) AS segundos_pnp,
        ISNULL(hp.PCALIDAD, 0) AS segundos_pcalidad,
        ISNULL(hp.Unidades_ok, 0)  AS unidades_ok,
        ISNULL(hp.Unidades_nok, 0) AS unidades_nok,
        ISNULL(hp.Unidades_repro, 0) AS unidades_repro,
        COALESCE(NULLIF(hf.SegCicloNominal, 0),
                 NULLIF(cm.SegCicloNominal, 0),
                 NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
        COALESCE(NULLIF(hf.Rendimientonominal1, 0),
                 NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh,
        cm.Cod_maquina,
        cm.Desc_maquina,
        ho.Cod_of,
        ho.Desc_of,
        cm.Rt_Fecha_ini,
        cm.Rt_Fecha_fin,
        cm.ObjetivoOEEVerde,
        cm.ObjetivoOEENaranja
    FROM his_prod hp
    INNER JOIN cfg_maquina cm
        ON cm.Id_maquina = hp.Id_maquina
    INNER JOIN his_fase hf
        ON hp.Id_his_fase = hf.Id_his_fase
    INNER JOIN his_of ho
        ON hf.Id_his_of = ho.Id_his_of
    JOIN parametros p ON 1 = 1
    WHERE cm.Cod_maquina = p.cod_maquina
      AND cm.Activo = 1
      AND hp.Fecha_fin > CAST(p.fecha_inicio AS DATETIME)
      AND hp.Fecha_ini < DATEADD(DAY, 1, CAST(p.fecha_fin AS DATETIME))
      AND hp.Fecha_ini < hp.Fecha_fin
      AND (hp.Activo = 1 OR hp.Activo IS NULL)
      AND (p.cod_of IS NULL OR ho.Cod_of = p.cod_of)
),
/* Totales globales */
totales AS (
    SELECT
        SUM(unidades_ok)  AS unidades_ok,
        SUM(unidades_nok) AS unidades_nok,
        SUM(unidades_repro) AS unidades_repro,
        SUM(unidades_ok + unidades_nok + unidades_repro) AS unidades_total,
        SUM(segundos_prod) AS segundos_prod,
        SUM(segundos_pp)   AS segundos_pp,
        SUM(segundos_pnp)  AS segundos_pnp,
        SUM(segundos_pcalidad) AS segundos_pcalidad,
        SUM(CASE
                WHEN Id_actividad = 2 THEN
                    CASE
                        WHEN ciclo_nominal_seg > 0 THEN segundos_registro * 1.0 / ciclo_nominal_seg
                        WHEN rendimiento_nominal_uh > 0 THEN (segundos_registro / 3600.0) * rendimiento_nominal_uh
                        ELSE 0
                    END
                ELSE 0
            END) AS produccion_teorica,
        MAX(Cod_maquina) AS cod_maquina,
        MAX(Desc_maquina) AS desc_maquina,
        MAX(Cod_of) AS cod_of,
        MAX(Desc_of) AS desc_of,
        MAX(Rt_Fecha_ini) AS fecha_inicio_rt,
        MAX(Rt_Fecha_fin) AS fecha_fin_rt,
        MAX(ObjetivoOEEVerde) AS objetivo_verde,
        MAX(ObjetivoOEENaranja) AS objetivo_amarillo
    FROM base
)
SELECT
    cod_maquina,
    desc_maquina,
    cod_of,
    desc_of,
    unidades_ok,
    unidades_nok,
    unidades_repro,
    unidades_total,
    segundos_prod,
    segundos_pp,
    segundos_pnp,
    segundos_pcalidad,
    produccion_teorica,
    objetivo_verde,
    objetivo_amarillo,
    fecha_inicio_rt,
    fecha_fin_rt,
    velocidad_uh = CASE
        WHEN segundos_prod > 0 THEN CAST((unidades_total * 3600.0) / segundos_prod AS DECIMAL(10,2))
        ELSE 0
    END,
    velocidad_seg_por_pza = CASE
        WHEN unidades_total > 0 THEN CAST(segundos_prod * 1.0 / unidades_total AS DECIMAL(10,2))
        ELSE 0
    END,
    rendimiento_of = CASE
        WHEN produccion_teorica > 0 THEN CAST((unidades_total * 100.0) / produccion_teorica AS DECIMAL(8,2))
        ELSE 0
    END,
    calidad_of = CASE
        WHEN (unidades_ok + unidades_nok) > 0 THEN CAST((unidades_ok * 100.0) / (unidades_ok + unidades_nok) AS DECIMAL(8,2))
        ELSE 0
    END,
    disponibilidad_of = CASE
        WHEN (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) > 0
        THEN CAST((segundos_prod * 100.0) / (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) AS DECIMAL(8,2))
        ELSE 0
    END,
    oee_of = CAST(ROUND(
        (CASE WHEN (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad) > 0
              THEN (segundos_prod * 100.0) / (segundos_prod + segundos_pp + segundos_pnp + segundos_pcalidad)
              ELSE 0 END / 100.0) *
        (CASE WHEN produccion_teorica > 0
              THEN (unidades_total * 100.0) / produccion_teorica
              ELSE 0 END / 100.0) *
        (CASE WHEN (unidades_ok + unidades_nok) > 0
              THEN (unidades_ok * 100.0) / (unidades_ok + unidades_nok)
              ELSE 0 END / 100.0) * 100.0
    , 2) AS DECIMAL(8,2))
FROM totales;
`;

const sqlPlan = `
SELECT TOP (1)
    cm.Cod_maquina,
    cm.Desc_maquina,
    ho.Cod_of,
    ho.Desc_of,
    hf.Unidades_planning AS unidades_plan_fase,
    ho.Unidades_planning AS unidades_plan_of,
    cm.Rt_Fecha_ini,
    cm.Rt_Fecha_fin,
    ho.Fecha_ini AS fecha_ini_of,
    ho.Fecha_fin AS fecha_fin_of,
    COALESCE(NULLIF(hf.SegCicloNominal, 0),
             NULLIF(cm.SegCicloNominal, 0),
             NULLIF(cm.rt_SegCicloNominal, 0)) AS ciclo_nominal_seg,
    COALESCE(NULLIF(hf.Rendimientonominal1, 0),
             NULLIF(cm.Rt_Rendimientonominal1, 0)) AS rendimiento_nominal_uh
FROM cfg_maquina cm
LEFT JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
LEFT JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
WHERE cm.Cod_maquina = @cod_maquina
  AND cm.Activo = 1
  AND (@cod_of IS NULL OR ho.Cod_of = @cod_of)
ORDER BY CASE WHEN hf.Unidades_planning IS NOT NULL THEN 0 ELSE 1 END;
`;

function parseDateParam(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function toNumber(value: unknown, precision = 2): number {
  const parsed = Number(value ?? 0);
  if (!Number.isFinite(parsed)) {
    return 0;
  }
  return Number(parsed.toFixed(precision));
}

function sum<T>(collection: T[], selector: (item: T) => number): number {
  return collection.reduce((acc, item) => acc + selector(item), 0);
}

function crearTurnoVacio(turno: TurnoClave): TurnoDetalle {
  return {
    turno,
    window: ventanaPorTurno[turno],
    kpis: {
      oee: 0,
      disponibilidad: 0,
      rendimiento: 0,
      calidad: 0,
      velocidad_uh: 0,
      seg_por_pza: 0,
    },
    unidades: {
      ok: 0,
      nok: 0,
      rw: 0,
      total: 0,
    },
    tiempos: {
      prod_s: 0,
      prep_s: 0,
      paro_pp_s: 0,
      paro_pnp_s: 0,
      paro_calidad_s: 0,
    },
  };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const params: InformesTurnosParams = {
      cod_maquina: (searchParams.get('cod_maquina') || '').trim(),
      cod_of: (searchParams.get('cod_of') || undefined)?.trim() || undefined,
      start_date: (searchParams.get('start_date') || '').trim(),
      end_date: (searchParams.get('end_date') || '').trim(),
      split_turnos: searchParams.get('split_turnos') !== 'false',
    };

    if (!params.cod_maquina) {
      return NextResponse.json({ error: 'El parámetro cod_maquina es obligatorio.' }, { status: 400 });
    }

    if (!params.start_date || !params.end_date) {
      return NextResponse.json({ error: 'Debe indicar start_date y end_date.' }, { status: 400 });
    }

    const fechaInicio = parseDateParam(params.start_date);
    const fechaFin = parseDateParam(params.end_date);

    if (Number.isNaN(fechaInicio.getTime()) || Number.isNaN(fechaFin.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas.' }, { status: 400 });
    }

    if (fechaInicio > fechaFin) {
      return NextResponse.json({ error: 'La fecha inicial debe ser anterior a la final.' }, { status: 400 });
    }

    const diffMs = fechaFin.getTime() - fechaInicio.getTime();
    const rangoMaximoMs = 90 * 24 * 60 * 60 * 1000;
    if (diffMs > rangoMaximoMs) {
      return NextResponse.json({ error: 'El rango máximo permitido es de 90 días.' }, { status: 400 });
    }

    const maquinaInfo = await executeQuery(sqlMaquina, { cod_maquina: params.cod_maquina }, 'mapex');
    if (!maquinaInfo.length) {
      return NextResponse.json({ error: 'Máquina no encontrada o inactiva.' }, { status: 404 });
    }

    if (params.cod_of) {
      const ofRespuesta = await executeQuery(sqlValidarOF, {
        cod_of: params.cod_of,
        cod_maquina: params.cod_maquina,
      }, 'mapex');

      if (!ofRespuesta.length) {
        return NextResponse.json({ error: 'La OF indicada no está asociada a la máquina.' }, { status: 404 });
      }
    }

    const parametrosComunes = {
      cod_maquina: params.cod_maquina,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      cod_of: params.cod_of ?? null,
    } as const;

    const [turnosRaw, resumenRaw, planRaw] = await Promise.all([
      executeQuery<any>(sqlTurnos, parametrosComunes, 'mapex'),
      executeQuery<any>(sqlResumen, parametrosComunes, 'mapex'),
      executeQuery<any>(sqlPlan, {
        cod_maquina: params.cod_maquina,
        cod_of: params.cod_of ?? null,
      }, 'mapex'),
    ]);

    const turnosMap = TURNOS_ORDEN.reduce<Record<TurnoClave, TurnoDetalle>>((acc, turno) => {
      acc[turno] = crearTurnoVacio(turno);
      return acc;
    }, {} as Record<TurnoClave, TurnoDetalle>);

    let objetivoVerde = toNumber(maquinaInfo[0]?.ObjetivoOEEVerde, 0);
    let objetivoAmarillo = toNumber(maquinaInfo[0]?.ObjetivoOEENaranja, 0);

    for (const fila of turnosRaw) {
      const clave = fila.turno as TurnoClave | undefined;
      if (!clave || !turnosMap[clave]) continue;

      objetivoVerde = objetivoVerde || toNumber(fila.objetivo_verde, 0);
      objetivoAmarillo = objetivoAmarillo || toNumber(fila.objetivo_amarillo, 0);

      turnosMap[clave] = {
        turno: clave,
        window: ventanaPorTurno[clave],
        kpis: {
          oee: toNumber(fila.oee_turno, 1),
          disponibilidad: toNumber(fila.disponibilidad_turno, 1),
          rendimiento: toNumber(fila.rendimiento_turno, 1),
          calidad: toNumber(fila.calidad_turno, 1),
          velocidad_uh: toNumber(fila.velocidad_uh, 1),
          seg_por_pza: toNumber(fila.seg_por_pza, 1),
        },
        unidades: {
          ok: Math.round(Number(fila.unidades_ok) || 0),
          nok: Math.round(Number(fila.unidades_nok) || 0),
          rw: Math.round(Number(fila.unidades_repro) || 0),
          total: Math.round(Number(fila.unidades_total) || 0),
        },
        tiempos: {
          prod_s: Math.round(Number(fila.segundos_prod) || 0),
          prep_s: Math.round(Number(fila.segundos_prep) || 0),
          paro_pp_s: Math.round(Number(fila.segundos_pp) || 0),
          paro_pnp_s: Math.round(Number(fila.segundos_pnp) || 0),
          paro_calidad_s: Math.round(Number(fila.segundos_pcalidad) || 0),
        },
      };
    }

    const turnos = TURNOS_ORDEN.map((turno) => turnosMap[turno]);

    const resumenRow = resumenRaw[0];
    const resumen: ResumenProduccion = {
      cod_maquina: params.cod_maquina,
      cod_of: resumenRow?.cod_of || params.cod_of,
      desc_maquina: resumenRow?.desc_maquina,
      desc_of: resumenRow?.desc_of,
      planificado: 0,
      fuente_planificado: 'sin_dato',
      unidades_ok: Math.round(Number(resumenRow?.unidades_ok) || 0),
      unidades_nok: Math.round(Number(resumenRow?.unidades_nok) || 0),
      unidades_rw: Math.round(Number(resumenRow?.unidades_repro) || 0),
      unidades_total: Math.round(Number(resumenRow?.unidades_total) || 0),
      velocidad_uh: toNumber(resumenRow?.velocidad_uh, 1),
      velocidad_seg_por_pza: toNumber(resumenRow?.velocidad_seg_por_pza, 1),
      rendimiento_turno_prom: turnos.length
        ? toNumber(sum(turnos, (t) => t.kpis.rendimiento) / turnos.length, 1)
        : 0,
      rendimiento_of: toNumber(resumenRow?.rendimiento_of, 1),
      disponibilidad_of: toNumber(resumenRow?.disponibilidad_of, 1),
      calidad_of: toNumber(resumenRow?.calidad_of, 1),
      oee_of: toNumber(resumenRow?.oee_of, 1),
      fecha_inicio: resumenRow?.fecha_inicio_rt ? new Date(resumenRow.fecha_inicio_rt).toISOString() : undefined,
      fecha_fin_real: resumenRow?.fecha_fin_rt ? new Date(resumenRow.fecha_fin_rt).toISOString() : undefined,
      fecha_fin_estimada: undefined,
    };

    const planRow = planRaw[0];
    let planificado = 0;
    let fuentePlan: FuenteDato = 'sin_dato';

    if (planRow?.unidades_plan_fase != null) {
      planificado = Number(planRow.unidades_plan_fase) || 0;
      fuentePlan = 'fase';
    } else if (planRow?.unidades_plan_of != null) {
      planificado = Number(planRow.unidades_plan_of) || 0;
      fuentePlan = 'of';
    }

    resumen.planificado = planificado;
    resumen.fuente_planificado = fuentePlan;

    if (!resumen.desc_maquina && planRow?.Desc_maquina) {
      resumen.desc_maquina = planRow.Desc_maquina;
    }
    if (!resumen.desc_of && planRow?.Desc_of) {
      resumen.desc_of = planRow.Desc_of;
    }
    if (!resumen.cod_of && planRow?.Cod_of) {
      resumen.cod_of = planRow.Cod_of;
    }

    if (!resumen.fecha_inicio) {
      if (planRow?.Rt_Fecha_ini) resumen.fecha_inicio = new Date(planRow.Rt_Fecha_ini).toISOString();
      else if (planRow?.fecha_ini_of) resumen.fecha_inicio = new Date(planRow.fecha_ini_of).toISOString();
    }

    const cicloNominalSeg = Number(planRow?.ciclo_nominal_seg) || 0;
    const rendimientoNominalUH = Number(planRow?.rendimiento_nominal_uh) || 0;
    const tiempoPorPiezaSeg = cicloNominalSeg > 0
      ? cicloNominalSeg
      : rendimientoNominalUH > 0
        ? 3600 / rendimientoNominalUH
        : 0;

    const piezasRestantes = Math.max(planificado - resumen.unidades_total, 0);
    if (tiempoPorPiezaSeg > 0 && piezasRestantes > 0) {
      const segundosRestantes = piezasRestantes * tiempoPorPiezaSeg;
      resumen.fecha_fin_estimada = new Date(Date.now() + segundosRestantes * 1000).toISOString();
    } else if (!resumen.fecha_fin_estimada) {
      if (planRow?.Rt_Fecha_fin) resumen.fecha_fin_estimada = new Date(planRow.Rt_Fecha_fin).toISOString();
      else if (planRow?.fecha_fin_of) resumen.fecha_fin_estimada = new Date(planRow.fecha_fin_of).toISOString();
    }

    const totalUnidades = sum(turnos, (t) => t.unidades.total);
    const totalOeePonderado = sum(turnos, (t) => t.kpis.oee * t.unidades.total);
    const periodoOee = totalUnidades > 0
      ? totalOeePonderado / totalUnidades
      : sum(turnos, (t) => t.kpis.oee) / (turnos.length || 1);

    const periodoVelocidad = resumen.velocidad_uh || toNumber(sum(turnos, (t) => t.kpis.velocidad_uh) / (turnos.length || 1), 1);

    if (!objetivoVerde) objetivoVerde = 80;
    if (!objetivoAmarillo) objetivoAmarillo = 65;

    const response: InformesTurnosResponse = {
      meta: {
        maquina: params.cod_maquina,
        desc_maquina: resumen.desc_maquina,
        of: resumen.cod_of,
        periodo: {
          inicio: params.start_date,
          fin: params.end_date,
        },
        split_ativo: params.split_turnos ?? true,
        timezone: 'Europe/Madrid',
        objetivo_verde: objetivoVerde,
        objetivo_amarillo: objetivoAmarillo,
        fuente_planificado: resumen.fuente_planificado,
      },
      turnos,
      resumen,
      totais: {
        periodo_oee: toNumber(periodoOee, 1),
        periodo_vel_uh: toNumber(periodoVelocidad, 1),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error en /api/informes/turnos:', error);
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        detalle: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    );
  }
}
