import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../../../../lib/database/connection";
import { construirRespuestaTurnos } from "../turnos/route";

type InformesOfParams = {
  cod_of: string;
  cod_maquina?: string;
  start_date: string;
  end_date: string;
  split_turnos?: boolean;
};

type InformesOfResponse = {
  meta: {
    cod_of: string;
    cod_maquina?: string;
    desc_of?: string;
    periodo: {
      inicio: string;
      fin: string;
    };
    split_ativo: boolean;
    timezone: string;
    fuente_planificado: string;
  };
  breakdown_turnos: any[];
  resumen_of: {
    cod_of: string;
    desc_of?: string;
    planificado: number;
    unidades_ok: number;
    unidades_nok: number;
    unidades_rw: number;
    unidades_total: number;
    velocidad_uh: number;
    rendimiento_turno_prom: number;
    rendimiento_of: number;
    disponibilidad_of: number;
    calidad_of: number;
    oee_of: number;
    fecha_inicio?: string;
    fecha_fin_real?: string;
    fecha_fin_estimada?: string;
  };
  comparacion: {
    planificado_vs_real: {
      planificado: number;
      real: number;
      diferencia: number;
      porcentaje_completado: number;
    };
    calidad_detalle: {
      ok_porcentaje: number;
      nok_porcentaje: number;
      rw_porcentaje: number;
    };
  };
};

function parseDateParam(dateStr: string): Date {
  const date = new Date(dateStr + "T00:00:00.000Z");
  return date;
}

const sqlMaquinasOf = `
  SELECT DISTINCT cm.Cod_maquina, cm.Desc_maquina
  FROM cfg_maquina cm
  WHERE cm.Activo = 1
    AND EXISTS (
      SELECT 1 FROM his_prod hp
      JOIN his_fase hf ON hp.Id_his_fase = hf.Id_his_fase
      JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
      WHERE hp.Id_maquina = cm.Id_maquina
        AND ho.Cod_of = @cod_of
        AND hp.Fecha_ini >= @fecha_inicio
        AND hp.Fecha_ini <= @fecha_fin
    )
  ORDER BY cm.Cod_maquina;
`;

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const params: InformesOfParams = {
      cod_of: (searchParams.get("cod_of") || "").trim(),
      cod_maquina:
        (searchParams.get("cod_maquina") || undefined)?.trim() || undefined,
      start_date: (searchParams.get("start_date") || "").trim(),
      end_date: (searchParams.get("end_date") || "").trim(),
      split_turnos: searchParams.get("split_turnos") !== "false",
    };

    if (!params.cod_of) {
      return NextResponse.json(
        { error: "El parámetro cod_of es obligatorio." },
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
    const fechaFinInclusive = new Date(
      fechaFin.getTime() + 24 * 60 * 60 * 1000 - 1,
    );

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

    const diffMs = fechaFin.getTime() - fechaInicio.getTime();
    const rangoMaximoMs = 90 * 24 * 60 * 60 * 1000;
    if (diffMs > rangoMaximoMs) {
      return NextResponse.json(
        { error: "El rango máximo permitido es de 90 días." },
        { status: 400 },
      );
    }

    // Obtener máquinas asociadas a la OF
    let maquinas: any[];
    if (params.cod_maquina) {
      // Verificar que la máquina específica tenga datos para esta OF
      maquinas = await executeQuery(
        sqlMaquinasOf,
        {
          cod_of: params.cod_of,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFinInclusive,
        },
        "mapex",
      );

      maquinas = maquinas.filter((m) => m.Cod_maquina === params.cod_maquina);

      if (maquinas.length === 0) {
        return NextResponse.json(
          {
            error:
              "La máquina indicada no tiene datos para esta OF en el período especificado.",
          },
          { status: 404 },
        );
      }
    } else {
      maquinas = await executeQuery(
        sqlMaquinasOf,
        {
          cod_of: params.cod_of,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFinInclusive,
        },
        "mapex",
      );
    }

    if (maquinas.length === 0) {
      return NextResponse.json(
        {
          error:
            "No se encontraron máquinas con datos para esta OF en el período especificado.",
        },
        { status: 404 },
      );
    }

    // Obtener datos por máquina usando la función helper existente
    const breakdownTurnos = [];
    let resumenCombinado = {
      planificado: 0,
      unidades_ok: 0,
      unidades_nok: 0,
      unidades_rw: 0,
      unidades_total: 0,
      segundos_prod: 0,
      produccion_teorica: 0,
      desc_of: "",
      fecha_inicio: undefined as string | undefined,
      fecha_fin_real: undefined as string | undefined,
      fecha_fin_estimada: undefined as string | undefined,
    };

    for (const maquina of maquinas) {
      try {
        const maquinaInfo = { Desc_maquina: maquina.Desc_maquina };

        const response = await construirRespuestaTurnos({
          params: {
            ...params,
            cod_maquina: maquina.Cod_maquina,
          },
          maquinaInfo,
          fechaInicio,
          fechaFin,
          fechaFinInclusive,
        });

        breakdownTurnos.push({
          cod_maquina: maquina.Cod_maquina,
          desc_maquina: maquina.Desc_maquina,
          turnos: response.turnos,
        });

        // Acumular datos para resumen combinado
        resumenCombinado.planificado += response.resumen.planificado;
        resumenCombinado.unidades_ok += response.resumen.unidades_ok;
        resumenCombinado.unidades_nok += response.resumen.unidades_nok;
        resumenCombinado.unidades_rw += response.resumen.unidades_rw;
        resumenCombinado.unidades_total += response.resumen.unidades_total;
        resumenCombinado.segundos_prod += response.turnos.reduce(
          (sum, t) => sum + t.tiempos.prod_s,
          0,
        );
        resumenCombinado.produccion_teorica += response.turnos.reduce(
          (sum, t) => sum + (t.produccion_teorica || 0),
          0,
        );

        // Tomar datos descriptivos del primer registro válido
        if (!resumenCombinado.desc_of && response.resumen.desc_of) {
          resumenCombinado.desc_of = response.resumen.desc_of;
        }
        if (!resumenCombinado.fecha_inicio && response.resumen.fecha_inicio) {
          resumenCombinado.fecha_inicio = response.resumen.fecha_inicio;
        }
        if (
          !resumenCombinado.fecha_fin_real &&
          response.resumen.fecha_fin_real
        ) {
          resumenCombinado.fecha_fin_real = response.resumen.fecha_fin_real;
        }
        if (
          !resumenCombinado.fecha_fin_estimada &&
          response.resumen.fecha_fin_estimada
        ) {
          resumenCombinado.fecha_fin_estimada =
            response.resumen.fecha_fin_estimada;
        }
      } catch (error) {
        console.error(
          `Error obteniendo datos para máquina ${maquina.Cod_maquina}:`,
          error,
        );
        // Continuar con las siguientes máquinas
      }
    }

    // Calcular métricas del resumen combinado
    const velocidadUh =
      resumenCombinado.segundos_prod > 0
        ? (resumenCombinado.unidades_total * 3600) /
          resumenCombinado.segundos_prod
        : 0;

    const rendimientoOf =
      resumenCombinado.produccion_teorica > 0
        ? (resumenCombinado.unidades_total * 100) /
          resumenCombinado.produccion_teorica
        : 0;

    const rendimientoTurnoProm =
      breakdownTurnos.length > 0
        ? breakdownTurnos.reduce(
            (sum, m) =>
              sum +
              m.turnos.reduce((tSum, t) => tSum + t.kpis.rendimiento, 0) /
                m.turnos.length,
            0,
          ) / breakdownTurnos.length
        : 0;

    const totalProduccion =
      resumenCombinado.unidades_ok + resumenCombinado.unidades_nok;
    const calidadOf =
      totalProduccion > 0
        ? (resumenCombinado.unidades_ok * 100) / totalProduccion
        : 0;

    const disponibilidadOf =
      breakdownTurnos.length > 0
        ? breakdownTurnos.reduce(
            (sum, m) =>
              sum +
              m.turnos.reduce((tSum, t) => tSum + t.kpis.disponibilidad, 0) /
                m.turnos.length,
            0,
          ) / breakdownTurnos.length
        : 0;

    const oeeOf =
      (disponibilidadOf / 100) *
      (rendimientoOf / 100) *
      (calidadOf / 100) *
      100;

    const response: InformesOfResponse = {
      meta: {
        cod_of: params.cod_of,
        cod_maquina: params.cod_maquina,
        desc_of: resumenCombinado.desc_of,
        periodo: {
          inicio: params.start_date,
          fin: params.end_date,
        },
        split_ativo: params.split_turnos ?? true,
        timezone: "Europe/Madrid",
        fuente_planificado: "of",
      },
      breakdown_turnos: breakdownTurnos,
      resumen_of: {
        cod_of: params.cod_of,
        desc_of: resumenCombinado.desc_of,
        planificado: resumenCombinado.planificado,
        unidades_ok: resumenCombinado.unidades_ok,
        unidades_nok: resumenCombinado.unidades_nok,
        unidades_rw: resumenCombinado.unidades_rw,
        unidades_total: resumenCombinado.unidades_total,
        velocidad_uh: Math.round(velocidadUh * 10) / 10,
        rendimiento_turno_prom: Math.round(rendimientoTurnoProm * 10) / 10,
        rendimiento_of: Math.round(rendimientoOf * 10) / 10,
        disponibilidad_of: Math.round(disponibilidadOf * 10) / 10,
        calidad_of: Math.round(calidadOf * 10) / 10,
        oee_of: Math.round(oeeOf * 10) / 10,
        fecha_inicio: resumenCombinado.fecha_inicio,
        fecha_fin_real: resumenCombinado.fecha_fin_real,
        fecha_fin_estimada: resumenCombinado.fecha_fin_estimada,
      },
      comparacion: {
        planificado_vs_real: {
          planificado: resumenCombinado.planificado,
          real: resumenCombinado.unidades_ok,
          diferencia:
            resumenCombinado.unidades_ok - resumenCombinado.planificado,
          porcentaje_completado:
            resumenCombinado.planificado > 0
              ? Math.round(
                  ((resumenCombinado.unidades_ok * 100) /
                    resumenCombinado.planificado) *
                    10,
                ) / 10
              : 0,
        },
        calidad_detalle: {
          ok_porcentaje:
            totalProduccion > 0
              ? Math.round(
                  ((resumenCombinado.unidades_ok * 100) / totalProduccion) * 10,
                ) / 10
              : 0,
          nok_porcentaje:
            totalProduccion > 0
              ? Math.round(
                  ((resumenCombinado.unidades_nok * 100) / totalProduccion) *
                    10,
                ) / 10
              : 0,
          rw_porcentaje:
            totalProduccion > 0
              ? Math.round(
                  ((resumenCombinado.unidades_rw * 100) / totalProduccion) * 10,
                ) / 10
              : 0,
        },
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Error en /api/informes/of:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detalle: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    );
  }
}
