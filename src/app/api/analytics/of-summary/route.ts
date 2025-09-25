import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../../lib/database/connection';

export async function POST(request: NextRequest) {
  try {
    const { of: cod_of, fecha_desde, fecha_hasta } = await request.json();

    if (!cod_of) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetro obrigatório: of'
      }, { status: 400 });
    }

    console.log(`🔍 Buscando dados consolidados da OF ${cod_of}...`);

    // 1. Obter dados básicos da OF
    const sqlOF = `
      SELECT TOP 1
        ho.Rt_Cod_of as cod_of,
        ho.Rt_Desc_producto as desc_producto,
        ho.Rt_Unidades_planning as unidades_planning,
        ho.Rt_Unidades_ok as unidades_ok,
        ho.Rt_Unidades_nok as unidades_nok,
        ho.Rt_Unidades_rw as unidades_rw,
        ho.Rt_Fecha_ini as fecha_ini,
        ho.Rt_Fecha_fin_estimada as fecha_fin_estimada,
        -- OEE e Rendimiento da OF usando F_his_ct
        fhc.OEE_c as oee_of,
        fhc.Rend_c as rendimiento_of
      FROM his_of ho
      CROSS APPLY [F_his_ct]('ORDER','','OF', '${fecha_desde || '2025-01-01'}', '${fecha_hasta || '2025-12-31'}', 0) fhc
      WHERE ho.Rt_Cod_of = '${cod_of.replace(/'/g, "''")}'
    `;

    console.log('🔍 Buscando dados básicos da OF...');
    const ofData = await executeQuery<any>(sqlOF, undefined, 'mapex');

    if (!ofData || ofData.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          cod_of: cod_of,
          desc_producto: '—',
          unidades_planning: 0,
          unidades_ok: 0,
          unidades_nok: 0,
          unidades_rw: 0,
          fecha_ini: null,
          fecha_fin_estimada: null,
          oee_of: 0,
          rendimiento_of: 0,
          tiempo_prod_s: 0,
          velocidad: 0,
          tiempo_pieza: 0
        },
        message: 'OF encontrada mas sem dados no período'
      });
    }

    // 2. Calcular tempos de produção e velocidade
    const sqlProduction = `
      SELECT
        ISNULL(SUM(CASE WHEN hp.id_actividad = 2 THEN DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) ELSE 0 END), 0) as tiempo_prod_s,
        ISNULL(SUM(hp.unidades_ok + hp.unidades_nok + hp.unidades_repro), 0) as total_piezas
      FROM cfg_maquina cm
      LEFT JOIN his_fase hf ON cm.rt_id_his_fase = hf.id_his_fase
      LEFT JOIN his_prod hp ON hf.id_his_fase = hp.id_his_fase
      WHERE cm.Rt_Cod_of = '${cod_of.replace(/'/g, "''")}' 
        AND cm.activo = 1
        AND hp.fecha_ini >= '${fecha_desde || '2025-01-01'} 00:00:00'
        AND hp.fecha_fin <= '${fecha_hasta || '2025-12-31'} 23:59:59'
        AND hp.fecha_ini < hp.fecha_fin
    `;

    console.log('🔍 Calculando tempos e velocidade...');
    const productionData = await executeQuery<any>(sqlProduction, undefined, 'mapex');

    const tiempo_prod_s = productionData[0]?.tiempo_prod_s || 0;
    const total_piezas = productionData[0]?.total_piezas || 0;
    const velocidad = total_piezas > 0 ? tiempo_prod_s / total_piezas : 0;
    const tiempo_pieza = total_piezas > 0 ? tiempo_prod_s / total_piezas : 0;

    // 3. Retornar dados estruturados
    return NextResponse.json({
      success: true,
      data: {
        cod_of: cod_of,
        desc_producto: ofData[0].desc_producto || '—',
        unidades_planning: ofData[0].unidades_planning || 0,
        unidades_ok: ofData[0].unidades_ok || 0,
        unidades_nok: ofData[0].unidades_nok || 0,
        unidades_rw: ofData[0].unidades_rw || 0,
        fecha_ini: ofData[0].fecha_ini,
        fecha_fin_estimada: ofData[0].fecha_fin_estimada,
        oee_of: Math.max(0, Math.min(100, ofData[0].oee_of || 0)),
        rendimiento_of: Math.max(0, Math.min(100, ofData[0].rendimiento_of || 0)),
        tiempo_prod_s: tiempo_prod_s,
        velocidad: velocidad,
        tiempo_pieza: tiempo_pieza
      },
      filtros: { of: cod_of, desde: fecha_desde, hasta: fecha_hasta },
      message: 'Dados consolidados da OF obtidos com sucesso',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erro ao buscar dados da OF:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro ao conectar com banco de dados',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
