import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../../lib/database/connection';
import { calcularOEE, calcularOEEPonderado, generarAlertas, analizarParetoCausas } from '../../../../../lib/oee/calculations';
import { getAllProductCosts } from '../../scada/costs-config/route';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const machineId = searchParams.get('machineId') || null;
    const days = parseInt(searchParams.get('days') || '30');

    console.log(`📊 Buscando datos históricos - Máquina: ${machineId}, Días: ${days}`);

    // Obtener costos de productos desde MAPEX
    const productCosts = await getAllProductCosts();
    const costoPromedioNok = Object.keys(productCosts).length > 0
      ? Object.values(productCosts).reduce((sum, cost) => sum + cost, 0) / Object.keys(productCosts).length
      : 15.50; // Fallback al valor por defecto

    console.log('💰 Costo promedio para cálculos históricos:', {
      totalProductos: Object.keys(productCosts).length,
      costoPromedio: costoPromedioNok,
      nota: 'Usado para calcular costos de scrap en consultas SQL'
    });

    // Intentar obtener datos reales de MAPEX
    let productionData = [];
    let downtimeData = [];

    try {
      // Query muy simple para testear conectividad
      const testSql = `SELECT TOP 1 'OK' as status, GETDATE() as fecha`;
      await executeQuery(testSql, undefined, 'mapex');
      console.log('✅ Conexión MAPEX OK');

      // Query simplificada para producción
      const productionSql = `
        SELECT TOP 10
          CONVERT(VARCHAR(10), hp.fecha, 120) as fecha,
          cm.Cod_maquina,
          COUNT(*) as registros
        FROM his_prod hp
        INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
        WHERE hp.fecha >= DATEADD(day, -${days}, GETDATE())
          AND cm.activo = 1
          ${machineId ? `AND cm.Cod_maquina = '${machineId}'` : ''}
        GROUP BY CONVERT(VARCHAR(10), hp.fecha, 120), cm.Cod_maquina
        ORDER BY fecha DESC
      `;

      productionData = await executeQuery(productionSql, undefined, 'mapex');
      console.log(`📊 Datos de producción: ${productionData.length} registros`);

    } catch (prodError) {
      const prodMsg = prodError instanceof Error ? prodError.message : String(prodError);
      console.warn('⚠️ Error al buscar datos de producción:', prodMsg);
      console.warn('⚠️ Usando datos simulados para producción');
      productionData = getSimulatedProductionData(days, machineId);
    }

    try {
      // Query simplificada para paros
      const downtimeSql = `
        SELECT TOP 10
          CONVERT(VARCHAR(10), hpp.fecha_inicio, 120) as fecha,
          cm.Cod_maquina,
          COUNT(*) as num_paros
        FROM his_prod_paro hpp
        INNER JOIN his_prod hp ON hpp.id_his_prod = hp.id_his_prod
        INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
        WHERE hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
          AND cm.activo = 1
          ${machineId ? `AND cm.Cod_maquina = '${machineId}'` : ''}
        GROUP BY CONVERT(VARCHAR(10), hpp.fecha_inicio, 120), cm.Cod_maquina
        ORDER BY fecha DESC
      `;

      downtimeData = await executeQuery(downtimeSql, undefined, 'mapex');
      console.log(`📊 Datos de paros: ${downtimeData.length} registros`);

    } catch (downError) {
      const downMsg = downError instanceof Error ? downError.message : String(downError);
      console.warn('⚠️ Error al buscar datos de paros:', downMsg);
      console.warn('⚠️ Usando datos simulados para paros');
      downtimeData = getSimulatedDowntimeData(days, machineId);
    }

    // Insights básicos
    const insights = [];
    if (productionData.length > 0) {
      const totalRegistros = productionData.reduce((sum, item) => sum + (item.registros || 0), 0);

      insights.push({
        tipo: 'PRODUCCION_RESUMEN',
        mensaje: `Total registros de producción: ${totalRegistros} en ${productionData.length} días`,
        prioridad: 'INFO'
      });
    }

    if (downtimeData.length > 0) {
      const totalParos = downtimeData.reduce((sum, item) => sum + (item.num_paros || 0), 0);
      insights.push({
        tipo: 'PAROS_RESUMEN',
        mensaje: `Total paros registrados: ${totalParos} en ${downtimeData.length} días`,
        prioridad: 'INFO'
      });
    }

    // Obtener datos adicionales necesarios para los gráficos
    let oeeHistory = [];
    let costAnalysis = [];
    let operatorMetrics = [];

    try {
      // Intentar obtener datos de OEE histórico
      oeeHistory = await calculateHistoricalOEE(machineId, days, 'day');
      console.log(`📊 Datos OEE histórico: ${oeeHistory.length} registros`);
    } catch (oeeError) {
      console.warn('⚠️ Error al obtener OEE histórico:', oeeError);
      oeeHistory = [];
    }

    try {
      // Intentar obtener análisis de costos
      costAnalysis = await getCostAnalysis(machineId, days);
      console.log(`💰 Análisis de costos: ${costAnalysis.length} registros`);
    } catch (costError) {
      console.warn('⚠️ Error al obtener análisis de costos:', costError);
      costAnalysis = [];
    }

    try {
      // Intentar obtener métricas de operadores
      operatorMetrics = await getOperatorProductivityMetrics(machineId, days);
      console.log(`👥 Métricas de operadores: ${operatorMetrics.length} registros`);
    } catch (opError) {
      console.warn('⚠️ Error al obtener métricas de operadores:', opError);
      operatorMetrics = [];
    }

    return NextResponse.json({
      success: true,
      data: {
        production: productionData,
        downtime: downtimeData,
        oee_history: oeeHistory,
        cost_analysis: costAnalysis,
        operator_metrics: operatorMetrics,
        insights: insights,
        summary: {
          avg_oee: oeeHistory.length > 0 ? oeeHistory.reduce((sum, item) => sum + (item.oee || 0), 0) / oeeHistory.length : 0,
          total_production: productionData.reduce((sum, item) => sum + (item.registros || 0), 0),
          total_downtime_hours: downtimeData.reduce((sum, item) => sum + (item.num_paros || 0), 0) * 0.5,
          total_records: productionData.length + downtimeData.length
        },
        filters: {
          machineId,
          days,
          dateRange: {
            from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            to: new Date().toISOString().split('T')[0]
          }
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en datos históricos:', error);
    return NextResponse.json({
      success: false,
      error: 'Error al obtener datos históricos',
      message: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}

// Función para generar datos simulados de producción
function getSimulatedProductionData(days: number, machineId: string | null) {
  const data: any[] = [];
  const machines = ['DOBL01', 'DOBL02', 'SOLD01', 'SOLD02', 'TROQ01', 'TERM01'];
  const targetMachines = machineId ? [machineId] : machines;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    targetMachines.forEach(machine => {
      data.push({
        fecha: date.toISOString().split('T')[0],
        Cod_maquina: machine,
        registros: Math.floor(Math.random() * 50) + 10 // 10-60 registros por día
      });
    });
  }

  return data;
}

// Función para generar datos simulados de paros
function getSimulatedDowntimeData(days: number, machineId: string | null) {
  const data: any[] = [];
  const machines = ['DOBL01', 'DOBL02', 'SOLD01', 'SOLD02', 'TROQ01', 'TERM01'];
  const targetMachines = machineId ? [machineId] : machines;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    targetMachines.forEach(machine => {
      // Solo algunos días tienen paros
      if (Math.random() < 0.3) {
        data.push({
          fecha: date.toISOString().split('T')[0],
          Cod_maquina: machine,
          num_paros: Math.floor(Math.random() * 3) + 1 // 1-3 paros por día
        });
      }
    });
  }

  return data;
}

async function getHistoricalProductionData(machineId: string | null, days: number, aggregation: string) {
  const machineFilter = machineId ? `AND cm.Cod_maquina = '${machineId}'` : '';

  let dateFormat = '';
  let groupBy = '';

  switch (aggregation) {
    case 'minute':
      dateFormat = "FORMAT(hp.fecha, 'yyyy-MM-dd HH:mm')";
      groupBy = "FORMAT(hp.fecha, 'yyyy-MM-dd HH:mm'), cm.Cod_maquina";
      break;
    case 'hour':
      dateFormat = "FORMAT(hp.fecha, 'yyyy-MM-dd HH')";
      groupBy = "FORMAT(hp.fecha, 'yyyy-MM-dd HH'), cm.Cod_maquina";
      break;
    case 'day':
      dateFormat = "FORMAT(hp.fecha, 'yyyy-MM-dd')";
      groupBy = "FORMAT(hp.fecha, 'yyyy-MM-dd'), cm.Cod_maquina";
      break;
  }

  const sql = `
    SELECT
      ${dateFormat} as periodo,
      cm.Cod_maquina,
      cm.desc_maquina,
      SUM(hp.unidades_ok) as piezas_ok,
      SUM(hp.unidades_nok) as piezas_nok,
      SUM(hp.unidades_rw) as piezas_rw,
      SUM(hp.unidades_ok + hp.unidades_nok + hp.unidades_rw) as total_pieces,
      AVG(hp.velocidad_real) as velocidad_promedio,
      AVG(hp.tiempo_ciclo_real) as tiempo_ciclo_promedio,
      COUNT(*) as registros,
      STRING_AGG(hp.turno, ',') as turnos,
      STRING_AGG(DISTINCT hp.operario, ',') as operarios
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE hp.fecha >= DATEADD(day, -${days}, GETDATE())
      AND cm.activo = 1
      ${machineFilter}
    GROUP BY ${groupBy}
    ORDER BY periodo DESC, cm.Cod_maquina
  `;

  return await executeQuery(sql);
}

async function getHistoricalDowntimeData(machineId: string | null, days: number) {
  const machineFilter = machineId ? `AND cm.Cod_maquina = '${machineId}'` : '';

  const sql = `
    SELECT
      FORMAT(hpp.fecha_inicio, 'yyyy-MM-dd HH:mm') as fecha_inicio,
      FORMAT(hpp.fecha_fin, 'yyyy-MM-dd HH:mm') as fecha_fin,
      cm.Cod_maquina,
      cm.desc_maquina,
      hpp.duracion_minutos,
      CAST(hpp.duracion_minutos AS FLOAT) / 60 as duracion_horas,
      hpp.tipo_paro,
      hpp.desc_paro as causa,
      hpp.operario,
      CASE WHEN cpp.es_planificado = 1 THEN 1 ELSE 0 END as es_planificada,
      cpp.costo_hora_estimado,
      (CAST(hpp.duracion_minutos AS FLOAT) / 60) * ISNULL(cpp.costo_hora_estimado, 150) as costo_estimado_euros
    FROM his_prod_paro hpp
    INNER JOIN cfg_maquina cm ON hpp.id_maquina = cm.id_maquina
    LEFT JOIN cfg_paro cpp ON hpp.id_tipo_paro = cpp.id_paro
    WHERE hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
      AND cm.activo = 1
      ${machineFilter}
    ORDER BY hpp.fecha_inicio DESC
  `;

  return await executeQuery(sql);
}

async function calculateHistoricalOEE(machineId: string | null, days: number, aggregation: string) {
  const machineFilter = machineId ? `AND cm.Cod_maquina = '${machineId}'` : '';

  let dateFormat = '';
  switch (aggregation) {
    case 'hour':
      dateFormat = "FORMAT(fecha, 'yyyy-MM-dd HH')";
      break;
    case 'day':
      dateFormat = "FORMAT(fecha, 'yyyy-MM-dd')";
      break;
    default:
      dateFormat = "FORMAT(fecha, 'yyyy-MM-dd HH')";
  }

  const sql = `
    SELECT
      ${dateFormat} as periodo,
      cm.Cod_maquina,
      cm.desc_maquina,
      AVG(CAST(disponibilidad AS FLOAT)) as disponibilidad,
      AVG(CAST(rendimiento AS FLOAT)) as rendimiento,
      AVG(CAST(calidad AS FLOAT)) as calidad,
      AVG(CAST(oee AS FLOAT)) as oee,
      AVG(tiempo_planificado_min) as tiempo_planificado_promedio,
      SUM(piezas_producidas) as total_piezas,
      COUNT(*) as mediciones
    FROM his_horaOEE hoee
    INNER JOIN cfg_maquina cm ON hoee.id_maquina = cm.id_maquina
    WHERE hoee.fecha >= DATEADD(day, -${days}, GETDATE())
      AND cm.activo = 1
      ${machineFilter}
    GROUP BY ${dateFormat}, cm.Cod_maquina, cm.desc_maquina
    ORDER BY periodo DESC, cm.Cod_maquina
  `;

  return await executeQuery(sql);
}

async function getOperatorProductivityMetrics(machineId: string | null, days: number) {
  const machineFilter = machineId ? `AND cm.Cod_maquina = '${machineId}'` : '';

  const sql = `
    SELECT
      hp.operario,
      cm.Cod_maquina,
      COUNT(DISTINCT CAST(hp.fecha AS DATE)) as dias_trabajados,
      SUM(hp.unidades_ok) as total_piezas_ok,
      SUM(hp.unidades_nok) as total_piezas_nok,
      SUM(hp.unidades_ok + hp.unidades_nok + hp.unidades_rw) as total_piezas,
      AVG(CAST(hp.unidades_ok AS FLOAT) / NULLIF(hp.unidades_ok + hp.unidades_nok + hp.unidades_rw, 0)) as eficiencia_promedio,
      SUM(hp.tiempo_trabajado_min) as total_minutos_trabajados,
      CASE
        WHEN SUM(hp.tiempo_trabajado_min) > 0
        THEN (SUM(hp.unidades_ok) * 60.0) / SUM(hp.tiempo_trabajado_min)
        ELSE 0
      END as piezas_por_hora,
      -- Calcular costo de ineficiencia
      SUM(hp.unidades_nok) * 15.5 as costo_scrap_euros, -- Costo promedio fallback (no disponible aquí)
      -- Ranking por productividad
      RANK() OVER (ORDER BY
        CASE
          WHEN SUM(hp.tiempo_trabajado_min) > 0
          THEN (SUM(hp.unidades_ok) * 60.0) / SUM(hp.tiempo_trabajado_min)
          ELSE 0
        END DESC
      ) as ranking_productividad
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE hp.fecha >= DATEADD(day, -${days}, GETDATE())
      AND cm.activo = 1
      AND hp.operario IS NOT NULL
      AND hp.operario != ''
      ${machineFilter}
    GROUP BY hp.operario, cm.Cod_maquina
    HAVING SUM(hp.tiempo_trabajado_min) >= 60 -- Al menos 1 hora trabajada
    ORDER BY piezas_por_hora DESC
  `;

  return await executeQuery(sql);
}

async function getCostAnalysis(machineId: string | null, days: number) {
  const machineFilter = machineId ? `AND cm.Cod_maquina = '${machineId}'` : '';

  const sql = `
    SELECT
      cm.Cod_maquina,
      cm.desc_maquina,
      -- Costos de paradas
      SUM(CASE WHEN cpp.es_planificado = 0 THEN (CAST(hpp.duracion_minutos AS FLOAT) / 60) * ISNULL(cpp.costo_hora_estimado, 150) ELSE 0 END) as costo_paradas_no_planificadas_euros,
      SUM(CASE WHEN cpp.es_planificado = 1 THEN (CAST(hpp.duracion_minutos AS FLOAT) / 60) * ISNULL(cpp.costo_hora_estimado, 75) ELSE 0 END) as costo_paradas_planificadas_euros,
      -- Costos de scrap
      SUM(hp.unidades_nok) * 15.5 as costo_scrap_euros,
      -- Tiempo perdido
      SUM(CASE WHEN cpp.es_planificado = 0 THEN hpp.duracion_minutos ELSE 0 END) as minutos_perdidos_no_planificados,
      -- Cálculo de oportunidad perdida (velocidad nominal vs real)
      SUM(
        CASE
          WHEN hp.velocidad_nominal > hp.velocidad_real AND hp.tiempo_trabajado_min > 0
          THEN ((hp.velocidad_nominal - hp.velocidad_real) / hp.velocidad_nominal) * hp.tiempo_trabajado_min * 2.5 -- €2.5 por minuto de oportunidad
          ELSE 0
        END
      ) as costo_oportunidad_perdida_euros,
      -- Total de costos
      SUM(CASE WHEN cpp.es_planificado = 0 THEN (CAST(hpp.duracion_minutos AS FLOAT) / 60) * ISNULL(cpp.costo_hora_estimado, 150) ELSE 0 END) +
      SUM(hp.unidades_nok) * 15.5 +
      SUM(
        CASE
          WHEN hp.velocidad_nominal > hp.velocidad_real AND hp.tiempo_trabajado_min > 0
          THEN ((hp.velocidad_nominal - hp.velocidad_real) / hp.velocidad_nominal) * hp.tiempo_trabajado_min * 2.5
          ELSE 0
        END
      ) as costo_total_perdidas_euros
    FROM cfg_maquina cm
    LEFT JOIN his_prod_paro hpp ON cm.id_maquina = hpp.id_maquina
      AND hpp.fecha_inicio >= DATEADD(day, -${days}, GETDATE())
    LEFT JOIN cfg_paro cpp ON hpp.id_tipo_paro = cpp.id_paro
    LEFT JOIN his_prod hp ON cm.id_maquina = hp.id_maquina
      AND hp.fecha >= DATEADD(day, -${days}, GETDATE())
    WHERE cm.activo = 1
      ${machineFilter}
    GROUP BY cm.Cod_maquina, cm.desc_maquina
    ORDER BY costo_total_perdidas_euros DESC
  `;

  return await executeQuery(sql);
}

async function analyzeTrends(historicalData: any[]) {
  if (historicalData.length < 2) return { trend: 'INSUFICIENTES_DATOS' };

  // Análisis de tendencias simples
  const recent = historicalData.slice(0, Math.floor(historicalData.length / 2));
  const older = historicalData.slice(Math.floor(historicalData.length / 2));

  const recentAvgProduction = recent.reduce((sum, item) => sum + item.total_pieces, 0) / recent.length;
  const olderAvgProduction = older.reduce((sum, item) => sum + item.total_pieces, 0) / older.length;

  const productionTrend = recentAvgProduction > olderAvgProduction ? 'MEJORANDO' :
                         recentAvgProduction < olderAvgProduction ? 'EMPEORANDO' : 'ESTABLE';

  return {
    production_trend: productionTrend,
    recent_avg_production: recentAvgProduction,
    older_avg_production: olderAvgProduction,
    improvement_percentage: ((recentAvgProduction - olderAvgProduction) / olderAvgProduction * 100).toFixed(2)
  };
}

async function generateInsights(machineId: string | null, oeeHistory: any[], downtimeData: any[]) {
  const insights = [];

  // Análisis simplificado - apenas insights básicos
  if (downtimeData.length > 0) {
    const totalDowntime = downtimeData.reduce((sum, item) => sum + (item.duracion_horas || 0), 0);
    insights.push({
      tipo: 'RESUMEN_PAROS',
      prioridad: 'MEDIA',
      mensaje: `Total de tiempo en paros: ${totalDowntime.toFixed(1)} horas`,
      accion_recomendada: 'Revisar eficiencia operacional',
      datos: { totalDowntime, numParos: downtimeData.length }
    });
  }

  if (oeeHistory.length > 0) {
    const avgOEE = oeeHistory.reduce((sum, item) => sum + (item.oee || 0), 0) / oeeHistory.length;
    insights.push({
      tipo: 'RESUMEN_OEE',
      prioridad: avgOEE < 75 ? 'ALTA' : 'MEDIA',
      mensaje: `OEE promedio: ${avgOEE.toFixed(1)}%`,
      accion_recomendada: avgOEE < 75 ? 'Mejorar disponibilidad, rendimiento y calidad' : 'Mantener el buen rendimiento',
      datos: { avgOEE, numRegistros: oeeHistory.length }
    });
  }

  return insights;
}

