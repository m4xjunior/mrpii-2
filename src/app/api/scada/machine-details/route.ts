import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../../../lib/database/connection';
import { calculateOEEForOF, calculateRemainingTime } from '../../../../../lib/oee/calculations';

export async function POST(request: NextRequest) {
  try {
    const { machineId, tab } = await request.json();

    if (!machineId || !tab) {
      return NextResponse.json({
        success: false,
        error: 'Parâmetros machineId e tab são obrigatórios'
      }, { status: 400 });
    }

    let data;

    switch (tab) {
      case 'resumen':
        data = await getProduccionData(machineId); // Usar os mesmos dados de produção para consistência
        break;
      case 'of':
        data = await getOFData(machineId);
        break;
      case 'paros':
        data = await getParosData(machineId);
        break;
      case 'produccion':
        data = await getProduccionData(machineId);
        break;
      case 'oee':
        data = await getOEEData(machineId);
        break;
      case 'pedidos':
        data = await getPedidosData(machineId);
        break;
      case 'historico':
        data = await getHistoricoData(machineId);
        break;
      case 'ventas':
        data = await getVentasData(machineId);
        break;
      default:
        return NextResponse.json({
          success: false,
          error: 'Tab não válida'
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data,
      tab,
      machineId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erro ao buscar detalhes da máquina:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

async function getOFData(machineId: string) {
  try {
    // Obtener información básica de la máquina y OF
    const sql = `
      SELECT
        cm.Rt_Cod_of, cm.rt_Cod_producto, cm.Rt_Desc_producto,
        cm.Rt_Unidades_planning, cm.rt_dia_productivo, cm.rt_desc_turno,
        cm.Rt_Unidades_ok_of as Unidades_ok, cm.Rt_Unidades_nok_of as Rt_Unidades_nok, cm.Rt_Unidades_repro_of as Unidades_rw,
        cm.f_velocidad, cm.rt_id_his_fase, cm.rt_Desc_operario,
        ho.fecha_ini, ho.fecha_fin as fecha_fin_prevista, ho.id_his_of
      FROM cfg_maquina cm
      LEFT JOIN his_of ho ON cm.Rt_Cod_of = ho.cod_of
      WHERE cm.Cod_maquina = '${machineId}'
    `;

    const result = await executeQuery(sql, undefined, 'mapex');
    if (result.length === 0) return null;

    const row = result[0];
    const cod_of = row.Rt_Cod_of;
    const id_his_of = row.id_his_of;

    // Obtener datos OEE para la OF usando nossa função simulada
    let oee_data = null;
    try {
      oee_data = await calculateOEEForOF(machineId, cod_of);
    } catch (error) {
      console.warn('⚠️ Erro ao calcular OEE para OF:', error);
    }

    // Obtener datos de producción detallados
    let produccion_data = null;
    if (id_his_of) {
      const sql_produccion = `
        SELECT
          SUM(hp.unidades_ok) as total_ok,
          SUM(hp.unidades_nok) as total_nok,
          SUM(hp.unidades_repro) as total_rw,
          SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) as tiempo_produccion_segundos,
          MIN(hp.fecha_ini) as fecha_inicio_real,
          MAX(hp.fecha_fin) as fecha_fin_real
        FROM his_prod hp
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${id_his_of}'
        AND hp.id_actividad = 2
      `;

      const produccion_result = await executeQuery(sql_produccion, undefined, 'mapex');
      produccion_data = produccion_result[0] || null;
    }

    // Obtener datos de paros para esta OF
    let paros_data = null;
    if (id_his_of) {
      const sql_paros = `
        SELECT
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_paros_segundos,
          COUNT(DISTINCT hpp.Id_operario) as num_operarios
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${id_his_of}'
      `;

      const paros_result = await executeQuery(sql_paros, undefined, 'mapex');
      paros_data = paros_result[0] || null;
    }

    // Obtener los principales paros
    let principales_paros = [];
    if (id_his_of) {
      const sql_principales_paros = `
        SELECT
          cp.desc_paro,
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_segundos
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${id_his_of}'
        GROUP BY cp.desc_paro
        ORDER BY tiempo_segundos DESC
      `;

      principales_paros = await executeQuery(sql_principales_paros, undefined, 'mapex');
    }

    // Obtener datos para gráfico de producción por turno
    let produccion_turno = [];
    if (id_his_of) {
      const sql_produccion_turno = `
        SELECT
          cm.rt_desc_turno as turno,
          CONVERT(VARCHAR(10), hp.fecha_fin, 111) as fecha,
          SUM(hp.unidades_ok) as unidades_ok,
          SUM(hp.unidades_nok) as unidades_nok,
          SUM(hp.unidades_repro) as unidades_rw
        FROM his_prod hp
        INNER JOIN cfg_maquina cm ON hp.Id_maquina = cm.id_maquina
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${id_his_of}'
        AND cm.Cod_maquina = '${machineId}'
        GROUP BY cm.rt_desc_turno, CONVERT(VARCHAR(10), hp.fecha_fin, 111)
        ORDER BY fecha, turno
      `;

      produccion_turno = await executeQuery(sql_produccion_turno, undefined, 'mapex');
    }

    // Calcular métricas derivadas
    const total_produced = produccion_data ?
      (produccion_data.total_ok || 0) + (produccion_data.total_nok || 0) + (produccion_data.total_rw || 0) :
      (row.Unidades_ok || 0) + (row.Rt_Unidades_nok || 0) + (row.Unidades_rw || 0);

    const avance = row.Rt_Unidades_planning > 0 ?
      Math.round((total_produced / row.Rt_Unidades_planning) * 10000) / 100 : 0;

    const remaining_pieces = row.Rt_Unidades_planning - total_produced;
    const remaining_time = calculateRemainingTime(remaining_pieces, row.f_velocidad || 0);

    // Calcular desviación (calidad)
    const desviacion = total_produced > 0 ?
      Math.round(((row.Rt_Unidades_nok || 0) / total_produced) * 10000) / 100 : 0;

    return {
      // Información básica
      ...row,
      cod_of,
      id_his_of,

      // Métricas calculadas
      total_produced,
      avance_porcentaje: avance,
      remaining_pieces,
      remaining_time,
      desviacion_porcentaje: desviacion,

      // Datos OEE
      oee_data,

      // Datos de producción detallados
      produccion_data,

      // Datos de paros
      paros_data,
      principales_paros,

      // Datos para gráficos
      produccion_turno,

      // Información adicional para UI
      status: {
        avance_class: avance >= 90 ? 'success' : (avance >= 70 ? 'warning' : 'danger'),
        tiempo_class: remaining_pieces > 0 && row.f_velocidad > 0 ?
          (remaining_pieces / row.f_velocidad > 24 ? 'warning' : 'success') : 'info',
        desviacion_class: desviacion > 5 ? 'danger' : 'success'
      }
    };
  } catch (error) {
    console.error('❌ Erro ao obter dados OF:', error);
    return null;
  }
}

async function getParosData(machineId: string) {
  try {
    // Obtener la OF actual de la máquina
    const sql_of_actual = `SELECT Rt_Cod_of FROM cfg_maquina WHERE Cod_maquina = '${machineId}'`;
    const result_of_actual = await executeQuery(sql_of_actual, undefined, 'mapex');
    const of_actual = result_of_actual[0]?.Rt_Cod_of || '';

    // Obtener tipos de paro para el filtro
    const sql_tipos_paro = `SELECT DISTINCT id_paro, desc_paro FROM cfg_paro ORDER BY desc_paro`;
    const tipos_paro = await executeQuery(sql_tipos_paro, undefined, 'mapex');

    // Obtener lista de OFs para el filtro (últimos 7 días por defecto)
    const sql_ofs = `
      SELECT DISTINCT substring(hof.cod_of, 1, 15) as cod_of, hof.fecha_ini
      FROM his_prod hp
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of hof ON hf.id_his_of = hof.id_his_of
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
      AND hof.fecha_ini >= DATEADD(day, -7, GETDATE())
      ORDER BY hof.fecha_ini DESC
    `;
    const ofs = await executeQuery(sql_ofs, undefined, 'mapex');

    // Obtener paros con filtros (últimos 7 días por defecto)
    const sql_paros = `
      SELECT TOP 50
        hpp.fecha_ini,
        hpp.fecha_fin,
        DATEDIFF(MINUTE, hpp.fecha_ini, hpp.fecha_fin) as duracion_minutos,
        cp.id_paro,
        cp.desc_paro,
        substring(hof.cod_of, 1, 15) as cod_of,
        hpp.Id_operario,
        COALESCE(hpo.observaciones, '') as observaciones
      FROM his_prod hp
      INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
      INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of hof ON hf.id_his_of = hof.id_his_of
      LEFT JOIN his_paro_obs hpo ON hpo.his_paro = hpp.his_paro
      WHERE cm.Cod_maquina = '${machineId}'
      AND hpp.fecha_ini >= DATEADD(day, -7, GETDATE())
      ORDER BY hpp.fecha_ini DESC
    `;

    const paros = await executeQuery(sql_paros, undefined, 'mapex');

    // Calcular estadísticas de paros
    const total_paros = paros.length;
    const total_minutos = paros.reduce((sum, p) => sum + (p.duracion_minutos || 0), 0);

    // Agrupar paros por tipo
    const paros_por_tipo: { [key: string]: { count: number; minutos: number } } = {};
    paros.forEach(paro => {
      const tipo = paro.desc_paro || 'Sin tipo';
      if (!paros_por_tipo[tipo]) {
        paros_por_tipo[tipo] = { count: 0, minutos: 0 };
      }
      paros_por_tipo[tipo].count++;
      paros_por_tipo[tipo].minutos += paro.duracion_minutos || 0;
    });

    return {
      paros,
      estadisticas: {
        total_paros,
        total_minutos,
        promedio_minutos: total_paros > 0 ? Math.round(total_minutos / total_paros) : 0
      },
      paros_por_tipo: Object.entries(paros_por_tipo).map(([tipo, data]) => ({
        tipo,
        count: data.count,
        minutos: data.minutos,
        porcentaje: total_paros > 0 ? Math.round((data.count / total_paros) * 100) : 0
      })),
      filtros: {
        of_actual,
        tipos_paro,
        ofs,
        fecha_desde: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        fecha_hasta: new Date().toISOString().split('T')[0]
      }
    };
  } catch (error) {
    console.error('❌ Erro ao obter dados de paros:', error);
    return {
      paros: [],
      estadisticas: { total_paros: 0, total_minutos: 0, promedio_minutos: 0 },
      paros_por_tipo: [],
      filtros: { of_actual: '', tipos_paro: [], ofs: [], fecha_desde: '', fecha_hasta: '' }
    };
  }
}

async function getProduccionData(machineId: string) {
  try {
    // Obtener información actual de la máquina (similar a getOFData)
    const sql_machine = `
      SELECT
        cm.Rt_Cod_of, cm.rt_Cod_producto, cm.Rt_Desc_producto, cm.Desc_maquina,
        cm.Rt_Unidades_planning, cm.rt_dia_productivo, cm.rt_desc_turno,
        cm.Rt_Unidades_ok_of as ok, cm.Rt_Unidades_nok_of as nok, cm.Rt_Unidades_repro_of as rw,
        cm.f_velocidad, cm.rt_id_his_fase, cm.Rt_Desc_operario,
        cm.rt_id_actividad, cm.Rt_Desc_actividad
      FROM cfg_maquina cm
      WHERE cm.Cod_maquina = '${machineId}'
    `;

    const machineResult = await executeQuery(sql_machine, undefined, 'mapex');
    if (machineResult.length === 0) {
      return {
        machine: null,
        production: { ok: 0, nok: 0, rw: 0, total: 0 },
        efficiency: 0,
        of: null,
        operator: null,
        shift: null,
        historical: []
      };
    }

    const machineData = machineResult[0];
    const total = (machineData.ok || 0) + (machineData.nok || 0) + (machineData.rw || 0);

    // Calcular eficiencia básica (OK / Total)
    const efficiency = total > 0 ? Math.round(((machineData.ok || 0) / total) * 100) : 0;

    // Buscar dados reais da produção atual da máquina (sem histórico)
    let realOk = machineData.ok || 0;
    let realNok = machineData.nok || 0;
    let realRw = machineData.rw || 0;
    let realOperator = machineData.Rt_Desc_operario || '';
    let realShift = machineData.rt_desc_turno || '';

    try {
      const sql_current = `
        SELECT TOP 1
          Rt_Unidades_ok_of as ok,
          Rt_Unidades_nok_of as nok,
          Rt_Unidades_repro_of as rw,
          Rt_Desc_operario as operator,
          rt_desc_turno as shift
        FROM cfg_maquina
        WHERE Cod_maquina = '${machineId}'
      `;

      const currentResult = await executeQuery(sql_current, undefined, 'mapex');
      if (currentResult.length > 0) {
        const currentData = currentResult[0];
        realOk = currentData.ok || 0;
        realNok = currentData.nok || 0;
        realRw = currentData.rw || 0;
        realOperator = currentData.operator || '';
        realShift = currentData.shift || '';
      }
    } catch (error) {
      console.warn('⚠️ Erro ao buscar dados atuais, usando dados da query principal:', error);
    }

    // Obtener histórico reciente para gráficos
    const sql_historical = `
      SELECT TOP 20
        hp.fecha, hp.turno, hp.unidades_ok, hp.unidades_nok, hp.unidades_rw,
        hp.tiempo_produccion, hp.velocidad_media, hp.nom_operario
      FROM his_prod hp
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
        AND hp.fecha >= DATEADD(day, -7, GETDATE())
      ORDER BY hp.fecha DESC, hp.turno DESC
    `;

    // Desabilitar consulta histórica problemática por enquanto
    const historicalResult: any[] = [];

    // Calcular eficiencia com dados reais
    const realTotal = realOk + realNok + realRw;
    const realEfficiency = realTotal > 0 ? Math.round((realOk / realTotal) * 100) : 0;

    // Estrutura com dados reais do servidor
    return {
      machine: {
        Cod_maquina: machineId,
        Desc_maquina: machineData.Desc_maquina,
        production: {
          ok: realOk,
          nok: realNok,
          rw: realRw,
          total: realTotal
        },
        efficiency: realEfficiency,
        Rt_Desc_actividad: machineData.Rt_Desc_actividad
      },
      production: {
        ok: realOk,
        nok: realNok,
        rw: realRw,
        total: realTotal
      },
      efficiency: realEfficiency,
      of: {
        Rt_Cod_of: machineData.Rt_Cod_of,
        Rt_Desc_producto: machineData.Rt_Desc_producto,
        rt_Cod_producto: machineData.rt_Cod_producto,
        Rt_Unidades_planning: machineData.Rt_Unidades_planning
      },
      operator: realOperator,
      shift: realShift,
      velocity: machineData.f_velocidad,
      historical: historicalResult || []
    };

  } catch (error) {
    console.error('❌ Error al obtener datos de producción:', error);
    return {
      machine: null,
      production: { ok: 0, nok: 0, rw: 0, total: 0 },
      efficiency: 0,
      of: null,
      operator: null,
      shift: null,
      historical: []
    };
  }
}

async function getOEEData(machineId: string) {
  const sql = `
    SELECT TOP 10
      fecha, turno,
      disponibilidad, rendimiento, calidad, oee,
      tiempo_planificado, tiempo_operativo, piezas_objetivo
    FROM F_his_ct
    WHERE id_maquina = (SELECT id_maquina FROM cfg_maquina WHERE Cod_maquina = '${machineId}')
      AND fecha >= DATEADD(day, -30, GETDATE())
    ORDER BY fecha DESC, turno DESC
  `;

  try {
    return await executeQuery(sql, undefined, 'mapex');
  } catch (error) {
    console.warn('⚠️ Error al obtener datos - retornando datos vacíos');
    return [];
  }
}

async function getPedidosData(machineId: string) {
  try {
    const sql = `
      SELECT TOP 20
        p.cod_pedido, p.desc_producto, p.cantidad_pedido, p.cantidad_entregada,
        p.fecha_pedido, p.fecha_entrega_prevista, p.estado_pedido
      FROM pedidos p
      INNER JOIN cfg_maquina cm ON p.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
        AND p.fecha_pedido >= DATEADD(day, -60, GETDATE())
      ORDER BY p.fecha_pedido DESC
    `;

    return await executeQuery(sql, undefined, 'sage');
  } catch (error) {
    console.warn('⚠️ Banco SAGE não disponível para pedidos - retornando dados vazios');
    return [];
  }
}

async function getHistoricoData(machineId: string) {
  const sql = `
    SELECT
      CAST(hp.fecha AS DATE) as fecha,
      SUM(hp.unidades_ok) as total_ok,
      SUM(hp.unidades_nok) as total_nok,
      SUM(hp.unidades_rw) as total_rw,
      AVG(CASE WHEN hp.unidades_ok + hp.unidades_nok + hp.unidades_rw > 0
               THEN (hp.unidades_ok * 100.0) / (hp.unidades_ok + hp.unidades_nok + hp.unidades_rw)
               ELSE 0 END) as eficiencia_diaria
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${machineId}'
      AND hp.fecha >= DATEADD(day, -90, GETDATE())
    GROUP BY CAST(hp.fecha AS DATE)
    ORDER BY fecha DESC
  `;

  try {
    return await executeQuery(sql, undefined, 'mapex');
  } catch (error) {
    console.warn('⚠️ Error al obtener datos - retornando datos vacíos');
    return [];
  }
}

async function getVentasData(machineId: string) {
  try {
    const sql = `
      SELECT TOP 20
        v.cod_venta, v.cliente, v.producto, v.cantidad, v.valor_venta,
        v.fecha_venta, v.estado_entrega
      FROM ventas v
      INNER JOIN cfg_maquina cm ON v.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineId}'
        AND v.fecha_venta >= DATEADD(day, -90, GETDATE())
      ORDER BY v.fecha_venta DESC
    `;

    return await executeQuery(sql, undefined, 'sage');
  } catch (error) {
    console.warn('⚠️ Banco SAGE não disponível para vendas - retornando dados vazios');
    return [];
  }
}