import fs from 'fs/promises';
import path from 'path';
import { executeQuery } from './lib/database/connection.js';

async function downloadHistoricalData() {
  console.log('🚀 Iniciando descarga de datos históricos de 30 días...');

  try {
    // Calcular fechas (30 días atrás hasta hoy)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    console.log(`📅 Periodo: ${startDate.toISOString().split('T')[0]} a ${endDate.toISOString().split('T')[0]}`);

    // 1. DESCARGAR DATOS DE MÁQUINAS
    console.log('📊 Descargando datos de máquinas...');
    const machinesQuery = `
      SELECT
        id_maquina, Cod_maquina, desc_maquina, activo,
        rt_id_turno, Rt_Seg_produccion, rt_num_operario, rt_id_operario,
        Rt_Seg_preparacion, Rt_Seg_paro, Rt_Unidades_repro,
        rt_id_fase, Rt_Desc_fase, rt_id_producto,
        rt_id_actividad, rt_id_paro, Rt_Desc_actividad, Rt_Desc_operario,
        rt_desc_paro, rt_dia_productivo, rt_desc_turno,
        Rt_Unidades_ok, Rt_Unidades_nok, f_velocidad, Rt_Rendimientonominal1,
        Rt_Cod_of, rt_Cod_producto, Rt_Desc_producto, Rt_Unidades_planning,
        COALESCE((SELECT cod_producto FROM cfg_producto WHERE id_producto = rt_id_producto), '') as codigo_producto
      FROM cfg_maquina
      WHERE activo = 1 AND Cod_maquina <> '--'
      ORDER BY Cod_maquina
    `;

    const machines = await executeQuery(machinesQuery);
    console.log(`✅ Máquinas descargadas: ${machines.length}`);

    // 2. DESCARGAR DATOS HISTÓRICOS DE PRODUCCIÓN
    console.log('📈 Descargando datos históricos de producción...');
    const productionQuery = `
      SELECT
        cm.Cod_maquina,
        hp.fecha_ini,
        hp.fecha_fin,
        hp.unidades_ok,
        hp.unidades_nok,
        hp.unidades_repro,
        hp.id_actividad,
        hp.id_paro,
        hp.id_operario,
        hf.cod_of,
        cm.rt_desc_turno as turno,
        CONVERT(VARCHAR(10), hp.fecha_fin, 111) as fecha_dia,
        DATEPART(HOUR, hp.fecha_fin) as hora,
        DATEPART(MINUTE, hp.fecha_fin) as minuto
      FROM his_prod hp WITH (NOLOCK)
      INNER JOIN cfg_maquina cm WITH (NOLOCK) ON hp.Id_maquina = cm.id_maquina
      INNER JOIN his_fase hf WITH (NOLOCK) ON hp.id_his_fase = hf.id_his_fase
      WHERE hp.fecha_fin >= '${startDate.toISOString().split('T')[0]}'
        AND hp.fecha_fin <= '${endDate.toISOString().split('T')[0]}'
        AND cm.activo = 1
      ORDER BY hp.fecha_fin DESC
    `;

    const productionData = await executeQuery(productionQuery);
    console.log(`✅ Registros de producción: ${productionData.length}`);

    // 3. DESCARGAR DATOS DE PAROS
    console.log('🔧 Descargando datos de paros...');
    const downtimeQuery = `
      SELECT
        cm.Cod_maquina,
        hpp.fecha_ini,
        hpp.fecha_fin,
        hpp.id_paro,
        cp.desc_paro,
        cp.tipo_paro,
        hpp.Seg_paro_max as duracion_segundos,
        CONVERT(VARCHAR(10), hpp.fecha_fin, 111) as fecha_dia,
        DATEPART(HOUR, hpp.fecha_ini) as hora_inicio,
        DATEPART(MINUTE, hpp.fecha_ini) as minuto_inicio
      FROM his_prod_paro hpp WITH (NOLOCK)
      INNER JOIN his_prod hp WITH (NOLOCK) ON hpp.id_his_prod = hp.id_his_prod
      INNER JOIN cfg_maquina cm WITH (NOLOCK) ON hp.Id_maquina = cm.id_maquina
      INNER JOIN cfg_paro cp WITH (NOLOCK) ON hpp.id_paro = cp.id_paro
      WHERE hpp.fecha_fin >= '${startDate.toISOString().split('T')[0]}'
        AND hpp.fecha_fin <= '${endDate.toISOString().split('T')[0]}'
        AND cm.activo = 1
      ORDER BY hpp.fecha_fin DESC
    `;

    const downtimeData = await executeQuery(downtimeQuery);
    console.log(`✅ Registros de paros: ${downtimeData.length}`);

    // 4. ORGANIZAR DATOS POR TIEMPO
    console.log('📁 Organizando datos por tiempo...');

    const dataByTime = {
      machines: machines,
      by_minute: {},
      by_hour: {},
      by_day: {},
      production: productionData,
      downtime: downtimeData,
      metadata: {
        downloaded_at: new Date().toISOString(),
        period_start: startDate.toISOString(),
        period_end: endDate.toISOString(),
        total_machines: machines.length,
        total_production_records: productionData.length,
        total_downtime_records: downtimeData.length
      }
    };

    // Organizar producción por minutos
    productionData.forEach(record => {
      if (!record.fecha_dia || !record.hora || record.minuto === null) return;

      const minuteKey = `${record.fecha_dia}_${record.hora.toString().padStart(2, '0')}_${record.minuto.toString().padStart(2, '0')}`;
      if (!dataByTime.by_minute[minuteKey]) {
        dataByTime.by_minute[minuteKey] = {
          date: record.fecha_dia,
          hour: record.hora,
          minute: record.minuto,
          machines: {}
        };
      }

      if (!dataByTime.by_minute[minuteKey].machines[record.Cod_maquina]) {
        dataByTime.by_minute[minuteKey].machines[record.Cod_maquina] = {
          production: [],
          downtime: []
        };
      }

      dataByTime.by_minute[minuteKey].machines[record.Cod_maquina].production.push({
        fecha_ini: record.fecha_ini,
        fecha_fin: record.fecha_fin,
        unidades_ok: record.unidades_ok,
        unidades_nok: record.unidades_nok,
        unidades_repro: record.unidades_repro,
        id_actividad: record.id_actividad,
        id_paro: record.id_paro,
        id_operario: record.id_operario,
        cod_of: record.cod_of,
        turno: record.turno
      });
    });

    // Organizar paros por minutos
    downtimeData.forEach(record => {
      if (!record.fecha_dia || !record.hora_inicio || record.minuto_inicio === null) return;

      const minuteKey = `${record.fecha_dia}_${record.hora_inicio.toString().padStart(2, '0')}_${record.minuto_inicio.toString().padStart(2, '0')}`;
      if (!dataByTime.by_minute[minuteKey]) {
        dataByTime.by_minute[minuteKey] = {
          date: record.fecha_dia,
          hour: record.hora_inicio,
          minute: record.minuto_inicio,
          machines: {}
        };
      }

      if (!dataByTime.by_minute[minuteKey].machines[record.Cod_maquina]) {
        dataByTime.by_minute[minuteKey].machines[record.Cod_maquina] = {
          production: [],
          downtime: []
        };
      }

      dataByTime.by_minute[minuteKey].machines[record.Cod_maquina].downtime.push({
        fecha_ini: record.fecha_ini,
        fecha_fin: record.fecha_fin,
        id_paro: record.id_paro,
        desc_paro: record.desc_paro,
        tipo_paro: record.tipo_paro,
        duracion_segundos: record.duracion_segundos
      });
    });

    // Crear archivos por día
    const days = {};
    Object.keys(dataByTime.by_minute).forEach(minuteKey => {
      const [date] = minuteKey.split('_');
      if (!days[date]) days[date] = {};
      days[date][minuteKey] = dataByTime.by_minute[minuteKey];
    });

    // 5. GUARDAR ARCHIVOS JSON
    const dataDir = path.join(__dirname, 'scada-web-app', 'data', 'historical');

    // Archivo principal
    await fs.writeFile(
      path.join(dataDir, 'historical_data_30_days.json'),
      JSON.stringify(dataByTime, null, 2)
    );
    console.log('💾 Archivo principal guardado');

    // Archivos por día
    for (const [date, dayData] of Object.entries(days)) {
      await fs.writeFile(
        path.join(dataDir, `day_${date}.json`),
        JSON.stringify({
          date: date,
          data: dayData,
          metadata: {
            total_minutes: Object.keys(dayData).length,
            date: date
          }
        }, null, 2)
      );
    }
    console.log(`💾 Archivos por día guardados: ${Object.keys(days).length} archivos`);

    // Archivo de resumen
    const summary = {
      period: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
        days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      },
      totals: {
        machines: machines.length,
        production_records: productionData.length,
        downtime_records: downtimeData.length,
        days_with_data: Object.keys(days).length
      },
      files_created: [
        'historical_data_30_days.json',
        ...Object.keys(days).map(date => `day_${date}.json`)
      ],
      downloaded_at: new Date().toISOString()
    };

    await fs.writeFile(
      path.join(dataDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    console.log('💾 Resumen guardado');

    console.log('🎉 ¡Descarga completada exitosamente!');
    console.log('📊 Resumen:');
    console.log(`   • Máquinas: ${machines.length}`);
    console.log(`   • Registros de producción: ${productionData.length}`);
    console.log(`   • Registros de paros: ${downtimeData.length}`);
    console.log(`   • Días con datos: ${Object.keys(days).length}`);
    console.log(`   • Archivos creados: ${summary.files_created.length}`);

  } catch (error) {
    console.error('❌ Error en descarga:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  downloadHistoricalData();
}

module.exports = { downloadHistoricalData };
