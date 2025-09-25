import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../../lib/database/connection';

export async function POST(request: NextRequest) {
  try {
    const { of: cod_of, fecha_desde, fecha_hasta } = await request.json();

    if (!cod_of || !fecha_desde || !fecha_hasta) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetros obrigatórios: of, fecha_desde, fecha_hasta'
      }, { status: 400 });
    }

    console.log(`🔍 [DEBUG] Testando consultas para OF ${cod_of} (${fecha_desde} a ${fecha_hasta})...`);

    const results: any = {};

    // 1. Teste básico - verificar se OF existe
    try {
      const sqlTesteOF = `SELECT TOP 5 * FROM his_of WHERE Rt_Cod_of = '${cod_of.replace(/'/g, "''")}'`;
      results.teste_of = await executeQuery(sqlTesteOF, undefined, 'mapex');
    } catch (error) {
      results.teste_of_error = error instanceof Error ? error.message : String(error);
    }

    // 2. Verificar máquinas ativas
    try {
      const sqlMaquinas = `
        SELECT DISTINCT Cod_maquina, Rt_Cod_of 
        FROM cfg_maquina 
        WHERE Rt_Cod_of = '${cod_of.replace(/'/g, "''")}' 
          AND activo = 1
      `;
      results.maquinas_ativas = await executeQuery(sqlMaquinas, undefined, 'mapex');
    } catch (error) {
      results.maquinas_ativas_error = error instanceof Error ? error.message : String(error);
    }

    // 3. Teste da função F_his_ct
    try {
      const sqlFhisCt = `
        SELECT TOP 3 * 
        FROM cfg_maquina cm
        CROSS APPLY [F_his_ct]('WORKCENTER', 'DAY', 'TURNO', '${fecha_desde}', '${fecha_hasta}', 0) fhc
        WHERE cm.Rt_Cod_of = '${cod_of.replace(/'/g, "''")}' 
          AND cm.activo = 1
      `;
      results.f_his_ct = await executeQuery(sqlFhisCt, undefined, 'mapex');
    } catch (error) {
      results.f_his_ct_error = error instanceof Error ? error.message : String(error);
    }

    // 4. Teste com his_prod
    try {
      const sqlHisProd = `
        SELECT TOP 5 hp.*, hf.id_his_fase, cm.Cod_maquina
        FROM cfg_maquina cm
        LEFT JOIN his_fase hf ON cm.rt_id_his_fase = hf.id_his_fase
        LEFT JOIN his_prod hp ON hf.id_his_fase = hp.id_his_fase
        WHERE cm.Rt_Cod_of = '${cod_of.replace(/'/g, "''")}' 
          AND cm.activo = 1
          AND hp.fecha_ini >= '${fecha_desde} 00:00:00'
          AND hp.fecha_fin <= '${fecha_hasta} 23:59:59'
      `;
      results.his_prod_data = await executeQuery(sqlHisProd, undefined, 'mapex');
    } catch (error) {
      results.his_prod_error = error instanceof Error ? error.message : String(error);
    }

    return NextResponse.json({
      success: true,
      debug: {
        parametros: { cod_of, fecha_desde, fecha_hasta },
        resultados: results
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erro no debug:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro no debug',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
