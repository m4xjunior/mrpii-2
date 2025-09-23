import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/database/connection';

/**
 * API Endpoint específico para dados OEE
 * Calcula OEE a partir de dados de produção e paradas do MAPEX
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const machineId = searchParams.get('machineId');
    const days = parseInt(searchParams.get('days') || '30');
    const type = searchParams.get('type') || 'all'; // 'all', 'oee', 'production', 'downtime'

    console.log(`📊 Solicitud OEE - Máquina: ${machineId}, Días: ${days}, Tipo: ${type}`);

    if (!machineId) {
      return NextResponse.json({
        success: false,
        error: 'ID de máquina es requerido'
      }, { status: 400 });
    }

    // Verificar se a máquina existe
    const machineCheckSql = `SELECT id_maquina, Cod_maquina, desc_maquina FROM cfg_maquina WHERE Cod_maquina = '${machineId}'`;
    const machineCheck = await executeQuery(machineCheckSql, undefined, 'mapex');

    if (machineCheck.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Máquina no encontrada'
      }, { status: 404 });
    }

    const machine = machineCheck[0];
    console.log(`🔧 Máquina encontrada: ${machine.Cod_maquina} - ${machine.desc_maquina}`);

    // Calcular período de consulta
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let responseData: any = {
      machine: machine,
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        days: days
      }
    };

    // Obter dados baseados no tipo solicitado
    switch (type) {
      case 'oee':
        responseData.oeeData = await getOEEData(machineId, days);
        break;
      case 'production':
        responseData.productionData = await getProductionData(machineId, days);
        break;
      case 'downtime':
        responseData.downtimeData = await getDowntimeData(machineId, days);
        break;
      default:
        // Obter todos os dados
        responseData.oeeData = await getOEEData(machineId, days);
        responseData.productionData = await getProductionData(machineId, days);
        responseData.downtimeData = await getDowntimeData(machineId, days);
        responseData.summary = await getSummaryData(machineId, days);
        break;
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString(),
      source: 'calculated-from-mapex'
    });

  } catch (error) {
    console.error('❌ Error en API OEE:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

/**
 * Calcula dados OEE a partir de produção e paradas
 */
async function getOEEData(machineId: string, days: number) {
  try {
    console.log(`📈 Calculando OEE para ${machineId}...`);

    // Obter dados de produção dos últimos dias
    const productionSql = `
      SELECT
        CAST(hp.fecha AS DATE) as fecha,
        COUNT(*) as registros_produccion,
        SUM(hp.unidades_ok) as total_ok,
        SUM(hp.unidades_nok) as total_nok,
        SUM(hp.unidades_rw) as total_rw,
        SUM(hp.tiempo_trabajado_min) as tiempo_trabajado_min,
        AVG(hp.velocidad_real) as velocidad_promedio
      FROM his_prod hp
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
        AND hp.fecha >= DATEADD(day, -${days}, GETDATE())
      GROUP BY CAST(hp.fecha AS DATE)
      ORDER BY fecha DESC
    `;

    const productionData = await executeQuery(productionSql, undefined, 'mapex');

    // Obter dados de paradas
    const downtimeSql = `
      SELECT
        CAST(hpp.fecha_inicio AS DATE) as fecha,
        COUNT(*) as num_paros,
        SUM(hpp.duracion_minutos) as tiempo_parado_min,
        SUM(CASE WHEN cpp.es_planificado = 1 THEN hpp.duracion_minutos ELSE 0 END) as tiempo_parado_planificado_min
      FROM his_prod_paro hpp
      INNER JOIN cfg_maquina cm ON hpp.id_maquina = cm.id_maquina
      LEFT JOIN cfg_paro cpp ON hpp.id_paro = cpp.id_paro
      WHERE cm.Cod_maquina = '${machineId}'
        AND hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
      GROUP BY CAST(hpp.fecha_inicio AS DATE)
      ORDER BY fecha DESC
    `;

    const downtimeData = await executeQuery(downtimeSql, undefined, 'mapex');

    // Combinar dados e calcular OEE
    const oeeResults = [];
    const maxDays = Math.max(productionData.length, downtimeData.length);

    for (let i = 0; i < maxDays; i++) {
      const prodDay = productionData[i];
      const downDay = downtimeData[i];
      const fecha = prodDay?.fecha || downDay?.fecha;

      if (fecha) {
        // Calcular métricas OEE
        const totalPiezas = (prodDay?.total_ok || 0) + (prodDay?.total_nok || 0) + (prodDay?.total_rw || 0);
        const tiempoOperativo = prodDay?.tiempo_trabajado_min || 0;
        const tiempoParado = downDay?.tiempo_parado_min || 0;
        const tiempoParadoPlanificado = downDay?.tiempo_parado_planificado_min || 0;

        // Disponibilidade: Tempo operativo / Tempo total
        const tiempoTotal = tiempoOperativo + tiempoParado;
        const disponibilidad = tiempoTotal > 0 ? (tiempoOperativo / tiempoTotal) * 100 : 0;

        // Rendimiento: Peças produzidas vs velocidade esperada
        const rendimiento = 85; // Valor simulado - ajustar baseado em dados reais

        // Calidade: Peças OK / Total de peças
        const calidad = totalPiezas > 0 ? ((prodDay?.total_ok || 0) / totalPiezas) * 100 : 0;

        // OEE = Disponibilidade × Rendimiento × Calidade
        const oee = Math.round((disponibilidad * rendimiento * calidad) / 10000);

        oeeResults.push({
          fecha: fecha,
          turno: 'General',
          disponibilidad: Math.round(disponibilidad * 100) / 100,
          rendimiento: Math.round(rendimiento * 100) / 100,
          calidad: Math.round(calidad * 100) / 100,
          oee: Math.round(oee * 100) / 100,
          tiempo_planificado: tiempoTotal,
          tiempo_operativo: tiempoOperativo,
          piezas_objetivo: Math.floor(totalPiezas * 1.1), // Meta 10% acima
          total_ok: prodDay?.total_ok || 0,
          total_nok: prodDay?.total_nok || 0,
          total_rw: prodDay?.total_rw || 0,
          num_paros: downDay?.num_paros || 0,
          tiempo_parado: tiempoParado,
          tiempo_parado_planificado: tiempoParadoPlanificado
        });
      }
    }

    console.log(`✅ OEE calculado: ${oeeResults.length} días de datos`);
    return oeeResults;

  } catch (error) {
    console.error('❌ Error calculando OEE:', error);
    return [];
  }
}

/**
 * Obtém dados de produção detalhados
 */
async function getProductionData(machineId: string, days: number) {
  try {
    const sql = `
      SELECT
        CAST(hp.fecha AS DATE) as fecha,
        COUNT(*) as registros,
        SUM(hp.unidades_ok) as piezas_ok,
        SUM(hp.unidades_nok) as piezas_nok,
        SUM(hp.unidades_rw) as piezas_rw,
        SUM(hp.unidades_ok + hp.unidades_nok + hp.unidades_rw) as total_piezas,
        AVG(hp.velocidad_real) as velocidad_promedio,
        SUM(hp.tiempo_trabajado_min) as tiempo_trabajado_min
      FROM his_prod hp
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
        AND hp.fecha >= DATEADD(day, -${days}, GETDATE())
      GROUP BY CAST(hp.fecha AS DATE)
      ORDER BY fecha DESC
    `;

    const data = await executeQuery(sql, undefined, 'mapex');

    // Calcular percentuais
    return data.map(row => ({
      ...row,
      fecha: row.fecha,
      eficiencia: row.total_piezas > 0 ? Math.round((row.piezas_ok / row.total_piezas) * 100) : 0
    }));

  } catch (error) {
    console.error('❌ Error obteniendo datos de producción:', error);
    return [];
  }
}

/**
 * Obtém dados de paradas (downtime)
 */
async function getDowntimeData(machineId: string, days: number) {
  try {
    const sql = `
      SELECT
        CAST(hpp.fecha_inicio AS DATE) as fecha,
        COUNT(*) as num_paros,
        SUM(hpp.duracion_minutos) as tiempo_parado_min,
        SUM(CASE WHEN cpp.es_planificado = 1 THEN hpp.duracion_minutos ELSE 0 END) as tiempo_parado_planificado_min,
        STRING_AGG(cpp.desc_paro, '; ') as causas_paro
      FROM his_prod_paro hpp
      INNER JOIN cfg_maquina cm ON hpp.id_maquina = cm.id_maquina
      LEFT JOIN cfg_paro cpp ON hpp.id_paro = cpp.id_paro
      WHERE cm.Cod_maquina = '${machineId}'
        AND hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
      GROUP BY CAST(hpp.fecha_inicio AS DATE)
      ORDER BY fecha DESC
    `;

    const data = await executeQuery(sql, undefined, 'mapex');

    return data.map(row => ({
      ...row,
      fecha: row.fecha,
      tiempo_parado_horas: Math.round((row.tiempo_parado_min / 60) * 100) / 100,
      porcentaje_parado: 0, // Calcular baseado no tempo total do dia
      es_planificado: row.tiempo_parado_planificado_min > 0
    }));

  } catch (error) {
    console.error('❌ Error obteniendo datos de paradas:', error);
    return [];
  }
}

/**
 * Obtém resumo dos dados
 */
async function getSummaryData(machineId: string, days: number) {
  try {
    // Calcular OEE promedio
    const oeeData = await getOEEData(machineId, days);
    const avgOEE = oeeData.length > 0 ?
      oeeData.reduce((sum, item) => sum + item.oee, 0) / oeeData.length : 0;

    // Calcular produção total
    const prodData = await getProductionData(machineId, days);
    const totalProduction = prodData.reduce((sum, item) => sum + (item.total_piezas || 0), 0);

    // Calcular tempo parado total
    const downData = await getDowntimeData(machineId, days);
    const totalDowntime = downData.reduce((sum, item) => sum + (item.tiempo_parado_min || 0), 0);

    return {
      avg_oee: Math.round(avgOEE * 100) / 100,
      total_production: totalProduction,
      total_downtime_hours: Math.round(totalDowntime / 60 * 100) / 100,
      total_records: prodData.length,
      period_days: days
    };

  } catch (error) {
    console.error('❌ Error obteniendo resumen:', error);
    return {
      avg_oee: 0,
      total_production: 0,
      total_downtime_hours: 0,
      total_records: 0,
      period_days: days
    };
  }
}
