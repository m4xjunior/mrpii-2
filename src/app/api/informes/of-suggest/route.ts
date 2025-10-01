import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "lib/database/connection";
import { ensureInformesViews } from "lib/database/views";

export async function GET(request: NextRequest) {
  try {
    await ensureInformesViews();

    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get("query") || "").trim();
    const maquinaIds = searchParams.get("maquinaId");
    const desde = searchParams.get("desde");
    const hasta = searchParams.get("hasta");

    if (!query) {
      return NextResponse.json([]);
    }

    const conditions: string[] = ["num_of LIKE @pattern"];
    const sqlParams: Record<string, any> = { pattern: `${query}%` };

    if (maquinaIds) {
      conditions.push(
        "maquina_id IN (SELECT TRY_CAST(value AS int) FROM STRING_SPLIT(@maquinaIds, ',') WHERE TRY_CAST(value AS int) IS NOT NULL)"
      );
      sqlParams.maquinaIds = maquinaIds;
    }

    if (desde) {
      conditions.push("dia_hasta >= @desde");
      sqlParams.desde = desde;
    }
    if (hasta) {
      conditions.push("dia_desde <= @hasta");
      sqlParams.hasta = hasta;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const sql = `
      SELECT DISTINCT TOP 10 num_of
      FROM dbo.vw_informes_of
      ${whereClause}
      ORDER BY num_of ASC;
    `;

    const rows = await executeQuery<{ num_of: string }>(sql, sqlParams);
    return NextResponse.json(rows.map((row) => row.num_of).filter(Boolean));
  } catch (error) {
    console.error("Error en /api/informes/of-suggest:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
