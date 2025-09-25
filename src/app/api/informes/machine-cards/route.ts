import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../../../../lib/database/connection";

type MachineCardsParams = {
  cod_maquina: string[];
  start_date: string;
  end_date: string;
};

type MachineCardData = {
  cod_maquina: string;
  desc_maquina: string;
  cod_of?: string;
  desc_of?: string;
  planificado: number;
  unidades_ok: number;
  unidades_nok: number;
  unidades_rw: number;
  unidades_total: number;
  velocidad_uh: number;
  velocidad_seg_por_pza: number;
  oee_turno: number;
  rendimiento_turno: number;
  rendimiento_of: number;
  calidad: number;
  disponibilidad: number;
  fecha_inicio?: string;
  fecha_fin_estimada?: string;
  estado_actual: string;
  fuente_planificado: "fase" | "of" | "rt" | "sin_dato";
};

type MachineCardsResponse = {
  meta: {
    periodo: {
      inicio: string;
      fin: string;
    };
    total_maquinas: number;
    timezone: string;
  };
  cards: MachineCardData[];
};

function parseDateParam(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00.000Z");
}

function toNumber(value: any, decimals = 1): number {
  const num = Number(value) || 0;
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

const sqlMachineCards = `
  WITH MaquinasActivas AS (
    SELECT cm.Id_maquina, cm.Cod_maquina, cm.Desc_maquina
    FROM cfg_maquina cm
    WHERE cm.Activo = 1
      AND cm.Cod_maquina IN (${Array.from({ length: 50 }, (_, i) => `@cod_maquina_${i}`).join(",")})
  ),
  DatosPeriodo AS (
    SELECT
      ma.Cod_maquina,
      ma.Desc_maquina,
      ho.Cod_of,
      ho.Desc_of,
      -- Unidades agregadas del período
      SUM(ISNULL(hp.Unidades_ok, 0)) AS unidades_ok,
      SUM(ISNULL(hp.Unidades_nok, 0)) AS unidades_nok,
      SUM(ISNULL(hp.Unidades_repro, 0)) AS unidades_rw,
      SUM(ISNULL(hp.Unidades_ok, 0) + ISNULL(hp.Unidades_nok, 0) + ISNULL(hp.Unidades_repro, 0)) AS unidades_total,
      -- Tiempo de producción real
      SUM(CASE
        WHEN (ISNULL(hp.Unidades_ok, 0) + ISNULL(hp.Unidades_nok, 0) + ISNULL(hp.Unidades_repro, 0)) > 0
        THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin)
        ELSE 0
      END) AS segundos_prod,
      -- Planificado desde fase (preferencial)
      MAX(hf.Unidades_planning) AS planificado_fase,
      -- Fechas
      MIN(hp.Fecha_ini) AS fecha_inicio,
      MAX(hp.Fecha_fin) AS fecha_fin_real,
      -- Producción teórica
      SUM(CASE
        WHEN (ISNULL(hp.Unidades_ok, 0) + ISNULL(hp.Unidades_nok, 0) + ISNULL(hp.Unidades_repro, 0)) > 0 THEN
          CASE
            WHEN hf.SegCicloNominal > 0 THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) * 1.0 / hf.SegCicloNominal
            WHEN hf.Rendimientonominal1 > 0 THEN (DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) / 3600.0) * hf.Rendimientonominal1
            ELSE 0
          END
        ELSE 0
      END) AS produccion_teorica
    FROM MaquinasActivas ma
    LEFT JOIN his_prod hp ON ma.Id_maquina = hp.Id_maquina
      AND hp.Activo = 1
      AND hp.Fecha_ini >= @fecha_inicio
      AND hp.Fecha_ini <= @fecha_fin
    LEFT JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
    LEFT JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
    GROUP BY ma.Cod_maquina, ma.Desc_maquina, ho.Cod_of, ho.Desc_of
  ),
  EstadoActual AS (
    SELECT
      cm.Cod_maquina,
      cm.Rt_Cod_of,
      cm.Rt_Unidades_planning,
      cm.Rt_Fecha_ini,
      cm.Rt_Fecha_fin,
      cm.F_Velocidad,
      cm.Ag_Rt_OEE_Turno,
      cm.Ag_Rt_Disp_Turno,
      cm.Ag_Rt_Rend_Turno,
      cm.Ag_Rt_Cal_Turno,
      cm.Rt_Id_actividad,
      ca.Desc_actividad AS estado_actual
    FROM cfg_maquina cm
    LEFT JOIN cfg_actividad ca ON cm.Rt_Id_actividad = ca.Id_actividad
    WHERE cm.Activo = 1
      AND cm.Cod_maquina IN (${Array.from({ length: 50 }, (_, i) => `@cod_maquina_${i}`).join(",")})
  )
  SELECT
    dp.Cod_maquina,
    dp.Desc_maquina,
    dp.Cod_of,
    dp.Desc_of,
    dp.unidades_ok,
    dp.unidades_nok,
    dp.unidades_rw,
    dp.unidades_total,
    dp.segundos_prod,
    dp.planificado_fase,
    dp.fecha_inicio,
    dp.fecha_fin_real,
    dp.produccion_teorica,
    ea.Rt_Cod_of,
    ea.Rt_Unidades_planning,
    ea.Rt_Fecha_ini,
    ea.Rt_Fecha_fin,
    ea.F_Velocidad,
    ea.Ag_Rt_OEE_Turno,
    ea.Ag_Rt_Disp_Turno,
    ea.Ag_Rt_Rend_Turno,
    ea.Ag_Rt_Cal_Turno,
    ea.estado_actual
  FROM DatosPeriodo dp
  LEFT JOIN EstadoActual ea ON dp.Cod_maquina = ea.Cod_maquina
  ORDER BY dp.Cod_maquina;
`;

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    // Procesar cod_maquina como array
    const codMaquinaParam = searchParams.get("cod_maquina");
    const codMaquinas = codMaquinaParam
      ? codMaquinaParam
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean)
      : [];

    const params: MachineCardsParams = {
      cod_maquina: codMaquinas,
      start_date: (searchParams.get("start_date") || "").trim(),
      end_date: (searchParams.get("end_date") || "").trim(),
    };

    if (params.cod_maquina.length === 0) {
      return NextResponse.json(
        { error: "Debe indicar al menos una máquina en cod_maquina." },
        { status: 400 },
      );
    }

    if (params.cod_maquina.length > 50) {
      return NextResponse.json(
        { error: "Máximo 50 máquinas por consulta." },
        { status: 400 },
      );
    }

    if (!params.start_date || !params.end_date) {
      return NextResponse.json(
        { error: "Debe indicar start_date y end_date." },
        { status: 400 },
      );
    }

    const fechaInicio = parseDateParam(params.start_date);
    const fechaFin = parseDateParam(params.end_date);

    if (
      Number.isNaN(fechaInicio.getTime()) ||
      Number.isNaN(fechaFin.getTime())
    ) {
      return NextResponse.json({ error: "Fechas inválidas." }, { status: 400 });
    }

    if (fechaInicio > fechaFin) {
      return NextResponse.json(
        { error: "La fecha inicial debe ser anterior a la final." },
        { status: 400 },
      );
    }

    // Preparar parámetros para la consulta (hasta 50 máquinas)
    const parametros: any = {
      fecha_inicio: fechaInicio,
      fecha_fin: new Date(fechaFin.getTime() + 24 * 60 * 60 * 1000 - 1),
    };

    // Llenar los parámetros de máquinas (hasta 50)
    for (let i = 0; i < 50; i++) {
      parametros[`cod_maquina_${i}`] =
        i < params.cod_maquina.length ? params.cod_maquina[i] : "";
    }

    const resultados = await executeQuery(sqlMachineCards, parametros, "mapex");

    const cards: MachineCardData[] = resultados.map((row: any) => {
      // Determinar planificado y fuente
      let planificado = 0;
      let fuentePlanificado: "fase" | "of" | "rt" | "sin_dato" = "sin_dato";

      if (row.planificado_fase && row.planificado_fase > 0) {
        planificado = Number(row.planificado_fase);
        fuentePlanificado = "fase";
      } else if (row.Rt_Unidades_planning && row.Rt_Unidades_planning > 0) {
        planificado = Number(row.Rt_Unidades_planning);
        fuentePlanificado = "rt";
      }

      // Calcular velocidades
      const segundosProd = Number(row.segundos_prod) || 0;
      const unidadesTotal = Number(row.unidades_total) || 0;

      let velocidadUh = 0;
      let velocidadSegPorPza = 0;

      if (segundosProd > 0 && unidadesTotal > 0) {
        velocidadUh = (unidadesTotal * 3600) / segundosProd;
        velocidadSegPorPza = segundosProd / unidadesTotal;
      } else if (row.F_Velocidad && row.F_Velocidad > 0) {
        // Usar velocidad en tiempo real como fallback
        velocidadUh = Number(row.F_Velocidad);
        velocidadSegPorPza = velocidadUh > 0 ? 3600 / velocidadUh : 0;
      }

      // Calcular rendimiento OF
      const produccionTeorica = Number(row.produccion_teorica) || 0;
      const rendimientoOf =
        produccionTeorica > 0 ? (unidadesTotal * 100) / produccionTeorica : 0;

      // Calcular calidad
      const unidadesOk = Number(row.unidades_ok) || 0;
      const unidadesNok = Number(row.unidades_nok) || 0;
      const totalProduccion = unidadesOk + unidadesNok;
      const calidad =
        totalProduccion > 0 ? (unidadesOk * 100) / totalProduccion : 0;

      // Calcular fecha fin estimada
      let fechaFinEstimada: string | undefined;
      if (planificado > 0 && unidadesOk < planificado && velocidadUh > 0) {
        const unidadesRestantes = planificado - unidadesOk;
        const horasRestantes = unidadesRestantes / velocidadUh;
        const fechaBase = row.fecha_fin_real
          ? new Date(row.fecha_fin_real)
          : new Date();
        fechaFinEstimada = new Date(
          fechaBase.getTime() + horasRestantes * 60 * 60 * 1000,
        ).toISOString();
      } else if (row.Rt_Fecha_fin) {
        fechaFinEstimada = new Date(row.Rt_Fecha_fin).toISOString();
      }

      return {
        cod_maquina: row.Cod_maquina,
        desc_maquina: row.Desc_maquina,
        cod_of: row.Cod_of || row.Rt_Cod_of || undefined,
        desc_of: row.Desc_of,
        planificado,
        unidades_ok: unidadesOk,
        unidades_nok: unidadesNok,
        unidades_rw: Number(row.unidades_rw) || 0,
        unidades_total: unidadesTotal,
        velocidad_uh: toNumber(velocidadUh, 1),
        velocidad_seg_por_pza: toNumber(velocidadSegPorPza, 2),
        oee_turno: toNumber(row.Ag_Rt_OEE_Turno, 1),
        rendimiento_turno: toNumber(row.Ag_Rt_Rend_Turno, 1),
        rendimiento_of: toNumber(rendimientoOf, 1),
        calidad: toNumber(calidad, 1),
        disponibilidad: toNumber(row.Ag_Rt_Disp_Turno, 1),
        fecha_inicio: row.fecha_inicio
          ? new Date(row.fecha_inicio).toISOString()
          : undefined,
        fecha_fin_estimada: fechaFinEstimada,
        estado_actual: row.estado_actual || "Desconocido",
        fuente_planificado: fuentePlanificado,
      };
    });

    const response: MachineCardsResponse = {
      meta: {
        periodo: {
          inicio: params.start_date,
          fin: params.end_date,
        },
        total_maquinas: cards.length,
        timezone: "Europe/Madrid",
      },
      cards,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Error en /api/informes/machine-cards:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detalle: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    );
  }
}
