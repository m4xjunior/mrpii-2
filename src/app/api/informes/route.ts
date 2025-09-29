import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "lib/database/connection";
import { ensureInformesViews } from "lib/database/views";

type AggregationConfig = {
  ctes: string;
  select: string;
  orderBy: string;
};

type QueryParams = {
  of?: string | null;
  maquinaIds?: string | null;
  desde?: string | null;
  hasta?: string | null;
  agruparPor: "of_fase_maquina" | "of" | "maquina" | "dia";
  page: number;
  pageSize: number;
};

function buildWhereClause(params: QueryParams): { where: string; sqlParams: Record<string, any> } {
  const filters: string[] = [];
  const sqlParams: Record<string, any> = {};

  if (params.of) {
    filters.push("num_of = @of");
    sqlParams.of = params.of;
  }

  if (params.desde && params.hasta) {
    filters.push("dia_desde <= @hasta AND dia_hasta >= @desde");
    sqlParams.desde = params.desde;
    sqlParams.hasta = params.hasta;
  } else if (params.desde) {
    filters.push("dia_hasta >= @desde");
    sqlParams.desde = params.desde;
  } else if (params.hasta) {
    filters.push("dia_desde <= @hasta");
    sqlParams.hasta = params.hasta;
  }

  if (params.maquinaIds) {
    filters.push(
      "maquina_id IN (SELECT TRY_CAST(value AS int) FROM STRING_SPLIT(@maquinaIds, ',') WHERE TRY_CAST(value AS int) IS NOT NULL)"
    );
    sqlParams.maquinaIds = params.maquinaIds;
  }

  const where = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";
  return { where, sqlParams };
}

function buildAggregationConfig(whereClause: string, agruparPor: QueryParams["agruparPor"]): AggregationConfig {
  const baseCte = `filtrado AS (SELECT * FROM dbo.vw_informes_of ${whereClause})`;

  if (agruparPor === "of") {
    const agrupado = `agrupado AS (
      SELECT
        MIN(maquina_id) AS maquina_id,
        CASE WHEN COUNT(DISTINCT maquina_id) > 1 THEN N'Varias máquinas' ELSE MAX(maquina) END AS maquina,
        CASE WHEN COUNT(DISTINCT maquina_id) > 1 THEN N'VARIAS' ELSE MAX(cod_maquina) END AS cod_maquina,
        MAX(id_his_fase) AS id_his_fase,
        MAX(cod_fase) AS cod_fase,
        MAX(desc_fase) AS desc_fase,
        MAX(id_his_of) AS id_his_of,
        num_of,
        MAX(desc_of) AS desc_of,
        MAX(producto_ref) AS producto_ref,
        MAX(pieza_interna) AS pieza_interna,
        MIN(fecha_ini_of) AS fecha_ini_of,
        MAX(fecha_fin_of) AS fecha_fin_of,
        MIN(dia_desde) AS dia_desde,
        MAX(dia_hasta) AS dia_hasta,
        SUM(planificadas) AS planificadas,
        SUM(ok) AS ok,
        SUM(nok) AS nok,
        SUM(rwk) AS rwk,
        SUM(cal_cnt) AS cal_cnt,
        SUM(total_unidades) AS total_unidades,
        SUM(seg_produccion) AS seg_produccion,
        SUM(horas_preparacion) AS horas_preparacion,
        SUM(horas_produccion) AS horas_produccion,
        SUM(horas_paro) AS horas_paro
      FROM filtrado
      GROUP BY num_of
    )`;

    const select = `SELECT
        maquina_id,
        cod_maquina,
        maquina,
        id_his_fase,
        cod_fase,
        desc_fase,
        id_his_of,
        num_of,
        desc_of,
        producto_ref,
        pieza_interna,
        fecha_ini_of,
        fecha_fin_of,
        dia_desde,
        dia_hasta,
        planificadas,
        ok,
        nok,
        rwk,
        cal_cnt,
        total_unidades,
        seg_produccion,
        CASE WHEN total_unidades > 0 THEN CAST(seg_produccion AS decimal(18,4)) / NULLIF(total_unidades, 0) ELSE NULL END AS seg_por_pieza,
        CASE WHEN seg_produccion > 0 THEN CAST(total_unidades * 3600.0 / NULLIF(seg_produccion, 0) AS decimal(18,4)) ELSE NULL END AS pzas_hora,
        horas_preparacion,
        horas_produccion,
        horas_paro,
        CASE WHEN (ok + nok + rwk + cal_cnt) > 0 THEN CAST(ok * 1.0 / (ok + nok + rwk + cal_cnt) AS decimal(18,4)) ELSE NULL END AS calidad,
        CASE WHEN planificadas > 0 THEN CAST(ok * 1.0 / planificadas AS decimal(18,4)) ELSE NULL END AS plan_attainment,
        CAST(NULL AS decimal(18,4)) AS disponibilidad,
        CAST(NULL AS decimal(18,4)) AS rendimiento,
        CAST(NULL AS decimal(18,4)) AS oee
      FROM agrupado`;

    return {
      ctes: `${baseCte}, ${agrupado}`,
      select,
      orderBy: "ORDER BY fecha_ini_of DESC, num_of ASC"
    };
  }

  if (agruparPor === "maquina") {
    const agrupado = `agrupado AS (
      SELECT
        maquina_id,
        MAX(maquina) AS maquina,
        MAX(cod_maquina) AS cod_maquina,
        MAX(id_his_fase) AS id_his_fase,
        MAX(cod_fase) AS cod_fase,
        MAX(desc_fase) AS desc_fase,
        MAX(id_his_of) AS id_his_of,
        N'Todas' AS num_of,
        N'Acumulado por máquina' AS desc_of,
        MAX(producto_ref) AS producto_ref,
        MAX(pieza_interna) AS pieza_interna,
        MIN(fecha_ini_of) AS fecha_ini_of,
        MAX(fecha_fin_of) AS fecha_fin_of,
        MIN(dia_desde) AS dia_desde,
        MAX(dia_hasta) AS dia_hasta,
        SUM(planificadas) AS planificadas,
        SUM(ok) AS ok,
        SUM(nok) AS nok,
        SUM(rwk) AS rwk,
        SUM(cal_cnt) AS cal_cnt,
        SUM(total_unidades) AS total_unidades,
        SUM(seg_produccion) AS seg_produccion,
        SUM(horas_preparacion) AS horas_preparacion,
        SUM(horas_produccion) AS horas_produccion,
        SUM(horas_paro) AS horas_paro
      FROM filtrado
      GROUP BY maquina_id
    )`;

    const select = `SELECT
        maquina_id,
        cod_maquina,
        maquina,
        id_his_fase,
        cod_fase,
        desc_fase,
        id_his_of,
        num_of,
        desc_of,
        producto_ref,
        pieza_interna,
        fecha_ini_of,
        fecha_fin_of,
        dia_desde,
        dia_hasta,
        planificadas,
        ok,
        nok,
        rwk,
        cal_cnt,
        total_unidades,
        seg_produccion,
        CASE WHEN total_unidades > 0 THEN CAST(seg_produccion AS decimal(18,4)) / NULLIF(total_unidades, 0) ELSE NULL END AS seg_por_pieza,
        CASE WHEN seg_produccion > 0 THEN CAST(total_unidades * 3600.0 / NULLIF(seg_produccion, 0) AS decimal(18,4)) ELSE NULL END AS pzas_hora,
        horas_preparacion,
        horas_produccion,
        horas_paro,
        CASE WHEN (ok + nok + rwk + cal_cnt) > 0 THEN CAST(ok * 1.0 / (ok + nok + rwk + cal_cnt) AS decimal(18,4)) ELSE NULL END AS calidad,
        CASE WHEN planificadas > 0 THEN CAST(ok * 1.0 / planificadas AS decimal(18,4)) ELSE NULL END AS plan_attainment,
        CAST(NULL AS decimal(18,4)) AS disponibilidad,
        CAST(NULL AS decimal(18,4)) AS rendimiento,
        CAST(NULL AS decimal(18,4)) AS oee
      FROM agrupado`;

    return {
      ctes: `${baseCte}, ${agrupado}`,
      select,
      orderBy: "ORDER BY maquina ASC"
    };
  }

  const agrupado = `agrupado AS (
    SELECT * FROM filtrado
  )`;

  const select = `SELECT
      maquina_id,
      cod_maquina,
      maquina,
      id_his_fase,
      cod_fase,
      desc_fase,
      id_his_of,
      num_of,
      desc_of,
      producto_ref,
      pieza_interna,
      fecha_ini_of,
      fecha_fin_of,
      dia_desde,
      dia_hasta,
      planificadas,
      ok,
      nok,
      rwk,
      cal_cnt,
      total_unidades,
      seg_produccion,
      seg_por_pieza,
      pzas_hora,
      horas_preparacion,
      horas_produccion,
      horas_paro,
      calidad,
      plan_attainment,
      disponibilidad,
      rendimiento,
      oee
    FROM agrupado`;

  return {
    ctes: `${baseCte}, ${agrupado}`,
    select,
    orderBy: "ORDER BY fecha_ini_of DESC, num_of ASC, cod_maquina ASC"
  };
}

function parseNumber(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function toIsoDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function maxDate(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}

function minDate(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a < b ? a : b;
}

function computeSummary(rows: any[]) {
  const totals = rows.reduce(
    (acc, row) => {
      acc.ok += Number(row.ok ?? 0);
      acc.nok += Number(row.nok ?? 0);
      acc.rwk += Number(row.rwk ?? 0);
      acc.cal_cnt += Number(row.cal_cnt ?? 0);
      acc.planificadas += Number(row.planificadas ?? 0);
      acc.seg_produccion += Number(row.seg_produccion ?? 0);
      acc.total_unidades += Number(row.total_unidades ?? 0);
      return acc;
    },
    { ok: 0, nok: 0, rwk: 0, cal_cnt: 0, planificadas: 0, seg_produccion: 0, total_unidades: 0 }
  );

  const denominadorCal = totals.ok + totals.nok + totals.rwk + totals.cal_cnt;
  const cal = denominadorCal > 0 ? totals.ok / denominadorCal : null;
  const segPorPza = totals.total_unidades > 0 && totals.seg_produccion > 0 ? totals.seg_produccion / totals.total_unidades : null;
  const pzasHora = totals.seg_produccion > 0 && totals.total_unidades > 0 ? (totals.total_unidades * 3600) / totals.seg_produccion : null;
  const planAtt = totals.planificadas > 0 ? totals.ok / totals.planificadas : null;

  return {
    oee: null,
    disp: null,
    rend: null,
    cal,
    planAttainment: planAtt,
    pzasHora,
    segPorPza,
    ok: totals.ok,
    nok: totals.nok,
    rwk: totals.rwk
  };
}

export async function GET(request: NextRequest) {
  try {
    await ensureInformesViews();

    const searchParams = request.nextUrl.searchParams;

    const agruparPorParam = (searchParams.get("agruparPor") as QueryParams["agruparPor"]) || "of_fase_maquina";
    const page = parseNumber(searchParams.get("page"), 1);
    const pageSize = parseNumber(searchParams.get("pageSize"), 50);

    const params: QueryParams = {
      of: searchParams.get("of"),
      maquinaIds: searchParams.get("maquinaId"),
      desde: null,
      hasta: null,
      agruparPor: agruparPorParam,
      page,
      pageSize
    };

    const userDesde = toIsoDate(searchParams.get("desde"));
    const userHasta = toIsoDate(searchParams.get("hasta"));

    let ofDesde: string | null = null;
    let ofHasta: string | null = null;

    if (params.of) {
      const rango = await executeQuery<{ dia_desde: string | null; dia_hasta: string | null }>(
        `SELECT MIN(dia_desde) AS dia_desde, MAX(dia_hasta) AS dia_hasta FROM dbo.vw_informes_of WHERE num_of = @of`,
        { of: params.of }
      );
      if (rango.length > 0) {
        ofDesde = rango[0].dia_desde ? rango[0].dia_desde.toString().slice(0, 10) : null;
        ofHasta = rango[0].dia_hasta ? rango[0].dia_hasta.toString().slice(0, 10) : null;
      }
    }

    params.desde = maxDate(userDesde, ofDesde);
    params.hasta = minDate(userHasta, ofHasta);

    if (!params.desde && userDesde) {
      params.desde = userDesde;
    }
    if (!params.hasta && userHasta) {
      params.hasta = userHasta;
    }
    if (!params.desde && ofDesde) {
      params.desde = ofDesde;
    }
    if (!params.hasta && ofHasta) {
      params.hasta = ofHasta;
    }

    if (params.desde && params.hasta && params.desde > params.hasta) {
      return NextResponse.json(
        {
          summary: {
            oee: null,
            disp: null,
            rend: null,
            cal: null,
            planAttainment: null,
            pzasHora: null,
            segPorPza: null,
            ok: 0,
            nok: 0,
            rwk: 0
          },
          generales: [],
          turnos: [],
          pagination: { page, pageSize, total: 0 }
        },
        { status: 200 }
      );
    }

    const { where, sqlParams } = buildWhereClause(params);
    const aggregation = buildAggregationConfig(where, params.agruparPor);

    const offset = (page - 1) * pageSize;

    const dataQuery = `
      WITH ${aggregation.ctes}
      SELECT *
      FROM (
        ${aggregation.select}
      ) AS datos
      ${aggregation.orderBy}
      OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY;
    `;

    const countQuery = `
      WITH ${aggregation.ctes}
      SELECT COUNT(1) AS total FROM (
        ${aggregation.select}
      ) AS datos;
    `;

    const summaryQuery = `
      WITH ${aggregation.ctes}
      SELECT
        SUM(ok) AS ok,
        SUM(nok) AS nok,
        SUM(rwk) AS rwk,
        SUM(cal_cnt) AS cal_cnt,
        SUM(planificadas) AS planificadas,
        SUM(seg_produccion) AS seg_produccion,
        SUM(total_unidades) AS total_unidades
      FROM (
        ${aggregation.select}
      ) AS datos;
    `;

    const queryParams = {
      ...sqlParams,
      offset,
      pageSize
    };

    const [rows, totalRows, summaryRows] = await Promise.all([
      executeQuery<any>(dataQuery, queryParams),
      executeQuery<{ total: number }>(countQuery, sqlParams),
      executeQuery<any>(summaryQuery, sqlParams)
    ]);

    const summaryRaw = summaryRows[0] ?? { ok: 0, nok: 0, rwk: 0, cal_cnt: 0, planificadas: 0, seg_produccion: 0, total_unidades: 0 };
    const summary = computeSummary([
      {
        ok: Number(summaryRaw.ok ?? 0),
        nok: Number(summaryRaw.nok ?? 0),
        rwk: Number(summaryRaw.rwk ?? 0),
        cal_cnt: Number(summaryRaw.cal_cnt ?? 0),
        planificadas: Number(summaryRaw.planificadas ?? 0),
        seg_produccion: Number(summaryRaw.seg_produccion ?? 0),
        total_unidades: Number(summaryRaw.total_unidades ?? 0)
      }
    ]);

    const generales = rows.map((row: any) => ({
      maquinaId: row.maquina_id,
      maquina: row.maquina,
      codMaquina: row.cod_maquina,
      numOF: row.num_of,
      productoRef: row.producto_ref,
      piezaInterna: row.pieza_interna,
      fechaIniOF: row.fecha_ini_of,
      fechaFinOF: row.fecha_fin_of,
      segPorPieza: row.seg_por_pieza !== null ? Number(row.seg_por_pieza) : null,
      pzasHora: row.pzas_hora !== null ? Number(row.pzas_hora) : null,
      oee: row.oee !== null ? Number(row.oee) : null,
      disp: row.disponibilidad !== null ? Number(row.disponibilidad) : null,
      rend: row.rendimiento !== null ? Number(row.rendimiento) : null,
      cal: row.calidad !== null ? Number(row.calidad) : null,
      planificadas: Number(row.planificadas ?? 0),
      ok: Number(row.ok ?? 0),
      nok: Number(row.nok ?? 0),
      rwk: Number(row.rwk ?? 0),
      planAttainment: row.plan_attainment !== null ? Number(row.plan_attainment) : null,
      horasPrep: row.horas_preparacion !== null ? Number(row.horas_preparacion) : null,
      horasProd: row.horas_produccion !== null ? Number(row.horas_produccion) : null,
      horasParo: row.horas_paro !== null ? Number(row.horas_paro) : null
    }));

    const turnosWhere: string[] = [];
    const turnosParams: Record<string, any> = {};

    if (params.of) {
      turnosWhere.push("num_of = @of");
      turnosParams.of = params.of;
    }
    if (params.desde) {
      turnosWhere.push("dia_productivo >= @desde");
      turnosParams.desde = params.desde;
    }
    if (params.hasta) {
      turnosWhere.push("dia_productivo <= @hasta");
      turnosParams.hasta = params.hasta;
    }
    if (params.maquinaIds) {
      turnosWhere.push(
        "maquina_id IN (SELECT TRY_CAST(value AS int) FROM STRING_SPLIT(@maquinaIds, ',') WHERE TRY_CAST(value AS int) IS NOT NULL)"
      );
      turnosParams.maquinaIds = params.maquinaIds;
    }

    const turnosQuery = `
      SELECT
        dia_productivo,
        id_turno,
        turno_nombre,
        operarios_lista,
        num_operarios,
        ok,
        nok,
        rwk,
        cal_cnt,
        seg_produccion,
        horas_preparacion,
        horas_produccion,
        horas_paro,
        calidad,
        disponibilidad,
        rendimiento,
        oee,
        num_of,
        maquina_id
      FROM dbo.vw_informes_turnos
      ${turnosWhere.length ? `WHERE ${turnosWhere.join(" AND ")}` : ""}
      ORDER BY dia_productivo ASC, id_turno ASC;
    `;

    const turnosRaw = await executeQuery<any>(turnosQuery, turnosParams);

    const turnos = turnosRaw.map((row) => ({
      diaProductivo: row.dia_productivo,
      idTurno: row.id_turno,
      turno: row.turno_nombre,
      operarios: row.operarios_lista ? row.operarios_lista.split(",").filter((v: string) => v && v.trim()) : [],
      numOperarios: Number(row.num_operarios ?? 0),
      oee: row.oee !== null ? Number(row.oee) : null,
      disp: row.disponibilidad !== null ? Number(row.disponibilidad) : null,
      rend: row.rendimiento !== null ? Number(row.rendimiento) : null,
      cal: row.calidad !== null ? Number(row.calidad) : null,
      ok: Number(row.ok ?? 0),
      nok: Number(row.nok ?? 0),
      rwk: Number(row.rwk ?? 0),
      horasPreparacion: row.horas_preparacion !== null ? Number(row.horas_preparacion) : null,
      horasProduccion: row.horas_produccion !== null ? Number(row.horas_produccion) : null,
      horasParos: row.horas_paro !== null ? Number(row.horas_paro) : null,
      numOF: row.num_of,
      maquinaId: row.maquina_id
    }));

    return NextResponse.json({
      summary,
      generales,
      turnos,
      pagination: {
        page,
        pageSize,
        total: totalRows[0]?.total ?? 0
      }
    });
  } catch (error) {
    console.error("Error en /api/informes:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
