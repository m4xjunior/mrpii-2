import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../lib/database/connection';
import { calculateCalidad, calculateDisponibilidad, calculateRendimiento, calculateOEE } from '../../../lib/informes-metrics';
import { roundToDecimal } from '../../../lib/shared';

/**
 * API Endpoint específico para dados OEE
 * Calcula OEE a partir de dados de produção e paradas do MAPEX/SCADA
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
    const productionData = await getProductionDataFromSCADA(machineId, days);

    // Obter dados de paradas
    const downtimeData = await getDowntimeDataFromSCADA(machineId, days);

    // Combinar dados e calcular OEE
    const oeeResults = [];
    const maxDays = Math.max(productionData.length, downtimeData.length);

    for (let i = 0; i < maxDays; i++) {
      const prodDay = productionData[i];
      const downDay = downtimeData[i];
      const fecha = prodDay?.fecha || downDay?.fecha;

      if (fecha) {
        // Usar as funções de cálculo atualizadas
        const calidad = calculateCalidad(
          prodDay?.total_ok || 0,
          prodDay?.total_nok || 0,
          prodDay?.total_rw || 0,
          0 // cal_cnt não disponível nos dados atuais
        ) || 0;

        const disponibilidad = calculateDisponibilidad(
          prodDay?.horas_produccion || 0,
          downDay?.horas_parado || 0
        ) || 0;

        const rendimiento = calculateRendimiento(
          prodDay?.total_ok || 0,
          null, // nominal_uxh não disponível nos dados atuais
          prodDay?.tiempo_trabajado_min || 0
        );

        const oee = calculateOEE(
          disponibilidad,
          rendimiento,
          calidad
        ) || 0;

        oeeResults.push({
          fecha: fecha,
          turno: 'General',
          disponibilidad: roundToDecimal(disponibilidad, 1) || 0,
          rendimiento: roundToDecimal(rendimiento, 1),
          calidad: roundToDecimal(calidad, 1) || 0,
          oee: roundToDecimal(oee, 1),
          tiempo_planificado: (prodDay?.tiempo_trabajado_min || 0) + (downDay?.tiempo_parado_min || 0),
          tiempo_operativo: prodDay?.tiempo_trabajado_min || 0,
          piezas_objetivo: Math.floor(((prodDay?.total_ok || 0) + (prodDay?.total_nok || 0) + (prodDay?.total_rw || 0)) * 1.1),
          total_ok: prodDay?.total_ok || 0,
          total_nok: prodDay?.total_nok || 0,
          total_rw: prodDay?.total_rw || 0,
          num_paros: downDay?.num_paros || 0,
          tiempo_parado: downDay?.tiempo_parado_min || 0,
          tiempo_parado_planificado: downDay?.tiempo_parado_planificado_min || 0
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
 * Obtém dados de produção da API SCADA com fallback para MAPEX
 */
async function getProductionDataFromSCADA(machineId: string, days: number) {
  try {
    // Tentar API SCADA primeiro
    const scadaResponse = await fetch(
      `${process.env.SCADA_API_URL}/api/scada/production?machineId=${machineId}&days=${days}`
    );
    
    if (scadaResponse.ok) {
      const productionData = await scadaResponse.json();
      console.log(`✅ Dados SCADA obtidos: ${productionData.length} registros`);
      
      // Mapear campos da SCADA
      return productionData.map((entry: any) => ({
        fecha: entry.date,
        registros_produccion: entry.production_records,
        total_ok: entry.ok_units,
        total_nok: entry.nok_units,
        total_rw: entry.rw_units,
        horas_produccion: entry.production_time,
        velocidad_promedio: entry.actual_speed,
        tiempo_trabajado_min: entry.production_time * 60 // Converter horas para minutos
      }));
    }
  } catch (scadaError) {
    console.warn('⚠️ Fallback to MAPEX data:', scadaError);
  }

  // Fallback para dados MAPEX
  const productionSql = `
    SELECT
      CAST(hp.fecha AS DATE) as fecha,
      COUNT(*) as registros_produccion,
      SUM(hp.unidades_ok) as total_ok,
      SUM(hp.unidades_nok) as total_nok,
      SUM(hp.unidades_rw) as total_rw,
      SUM(hp.tiempo_trabajado_min)/60 as horas_produccion,
      AVG(hp.velocidad_real) as velocidad_promedio,
      SUM(hp.tiempo_trabajado_min) as tiempo_trabajado_min
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${machineId}'
      AND hp.fecha >= DATEADD(day, -${days}, GETDATE())
    GROUP BY CAST(hp.fecha AS DATE)
    ORDER BY fecha DESC
  `;

  return await executeQuery(productionSql, undefined, 'mapex');
}

/**
 * Obtém dados de paradas da API SCADA com fallback para MAPEX
 */
async function getDowntimeDataFromSCADA(machineId: string, days: number) {
  try {
    // Tentar API SCADA primeiro
    const scadaResponse = await fetch(
      `${process.env.SCADA_API_URL}/api/scada/downtime?machineId=${machineId}&days=${days}`
    );
    
    if (scadaResponse.ok) {
      const downtimeData = await scadaResponse.json();
      console.log(`✅ Dados downtime SCADA obtidos: ${downtimeData.length} registros`);
      
      // Mapear campos da SCADA
      return downtimeData.map((entry: any) => ({
        fecha: entry.date,
        num_paros: entry.downtime_events,
        horas_parado: entry.downtime,
        tiempo_parado_min: entry.downtime * 60, // Converter horas para minutos
        tiempo_parado_planificado_min: entry.planned_downtime * 60
      }));
    }
  } catch (scadaError) {
    console.warn('⚠️ Fallback to MAPEX downtime data:', scadaError);
  }

  // Fallback para dados MAPEX
  const downtimeSql = `
    SELECT
      CAST(hpp.fecha_inicio AS DATE) as fecha,
      COUNT(*) as num_paros,
      SUM(hpp.duracion_minutos)/60 as horas_parado,
      SUM(CASE WHEN cpp.es_planificado = 1 THEN hpp.duracion_minutos ELSE 0 END) as tiempo_parado_planificado_min,
      SUM(hpp.duracion_minutos) as tiempo_parado_min
    FROM his_prod_paro hpp
    INNER JOIN cfg_maquina cm ON hpp.id_maquina = cm.id_maquina
    LEFT JOIN cfg_paro cpp ON hpp.id_paro = cpp.id_paro
    WHERE cm.Cod_maquina = '${machineId}'
      AND hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
    GROUP BY CAST(hpp.fecha_inicio AS DATE)
    ORDER BY fecha DESC
  `;

  return await executeQuery(downtimeSql, undefined, 'mapex');
}

/**
 * Obtém dados de produção detalhados
 */
async function getProductionData(machineId: string, days: number) {
  try {
    const data = await getProductionDataFromSCADA(machineId, days);

    // Calcular percentuais
    return data.map((row: any) => ({
      ...row,
      fecha: row.fecha,
      eficiencia: (row.total_ok + row.total_nok + row.total_rw) > 0 ?
        roundToDecimal((row.total_ok / (row.total_ok + row.total_nok + row.total_rw)) * 100, 1) : 0
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
    const data = await getDowntimeDataFromSCADA(machineId, days);

    return data.map((row: any) => ({
      ...row,
      fecha: row.fecha,
      tiempo_parado_horas: row.horas_parado || 0,
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
      oeeData.reduce((sum, item) => sum + (item.oee || 0), 0) / oeeData.length : 0;

    // Calcular produção total
    const prodData = await getProductionData(machineId, days);
    const totalProduction = prodData.reduce((sum: number, item: any) => sum + (item.total_ok + item.total_nok + item.total_rw || 0), 0);

    // Calcular tempo parado total
    const downData = await getDowntimeData(machineId, days);
    const totalDowntime = downData.reduce((sum: number, item: any) => sum + (item.tiempo_parado_min || 0), 0);

    return {
      avg_oee: roundToDecimal(avgOEE, 1),
      total_production: totalProduction,
      total_downtime_hours: roundToDecimal(totalDowntime / 60, 1),
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
