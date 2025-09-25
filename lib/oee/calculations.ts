import { executeQuery } from '../database/connection';

export interface OEECalculation {
  oee: number;
  rendimiento: number;
  disponibilidad: number;
  calidad: number;
}

export interface ProductionData {
  total_ok: number;
  total_nok: number;
  total_rw: number;
  tiempo_produccion_segundos: number;
  fecha_inicio_real: string | null;
  fecha_fin_real: string | null;
}

/**
 * Calcula OEE usando a função F_his_ct() do MAPEX
 * Esta função usa a função F_his_ct('WORKCENTER','','OF',...) do MAPEX
 */
export async function calculateOEEForOF(
  machineCode: string,
  codOF: string,
  daysBack: number = 10
): Promise<OEECalculation | null> {
  try {
    // Usar a função F_his_ct() do MAPEX para calcular OEE da OF
    const sql = `
      SELECT
        fhc.OEE_c as oee,
        fhc.Rend_c as rendimiento,
        fhc.Disp_c as disponibilidad,
        fhc.Cal_c as calidad
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER', '', 'OF', DATEADD(DAY, -${daysBack}, GETDATE()), DATEADD(DAY, 1, GETDATE()), 0) fhc
      WHERE cm.Cod_maquina = '${machineCode.replace(/'/g, "''")}'
        AND cm.Rt_Cod_of = '${codOF.replace(/'/g, "''")}'
        AND fhc.workgroup = cm.Cod_maquina
        AND cm.activo = 1
        AND cm.Rt_Cod_of IS NOT NULL
        AND cm.Rt_Cod_of <> '--'
    `;

    const result = await executeQuery(sql, undefined, 'mapex');

    if (result.length === 0 || !result[0]) {
      return null;
    }

    const row = result[0];
    const disponibilidad = Math.max(0, Math.min(100, row.disponibilidad || 0));
    const rendimiento = Math.max(0, Math.min(100, row.rendimiento || 0));
    const calidad = Math.max(0, Math.min(100, row.calidad || 0));

    // OEE = Disponibilidad × Rendimiento × Calidad
    const oee = Math.round((disponibilidad * rendimiento * calidad) / 10000);

    return {
      oee,
      rendimiento,
      disponibilidad,
      calidad
    };
  } catch (error) {
    console.error('❌ Erro ao calcular OEE para OF:', error);
    return null;
  }
}

/**
 * Calcula OEE por turno usando a função F_his_ct('WORKCENTER','DAY','TURNO',...)
 */
export async function calculateOEEForTurno(
  machineCode: string,
  diaProductivo: string
): Promise<OEECalculation | null> {
  try {
    // Usar a função F_his_ct() do MAPEX para calcular OEE do turno
    const sql = `
      SELECT
        fhc.OEE_c as oee,
        fhc.Rend_c as rendimiento,
        fhc.Disp_c as disponibilidad,
        fhc.Cal_c as calidad
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER', 'DAY', 'TURNO', DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, 1, GETDATE()), 0) fhc
      WHERE cm.Cod_maquina = '${machineCode.replace(/'/g, "''")}'
        AND CONVERT(VARCHAR(10), cm.rt_dia_productivo, 111) = '${diaProductivo.replace(/'/g, "''")}'
        AND fhc.workgroup = cm.Cod_maquina
        AND fhc.timeperiod = CONVERT(VARCHAR(10), cm.rt_dia_productivo, 111)
        AND fhc.desc_turno = cm.rt_desc_turno
        AND cm.activo = 1
    `;

    const result = await executeQuery(sql, undefined, 'mapex');

    if (result.length === 0 || !result[0]) {
      return null;
    }

    const row = result[0];
    const disponibilidad = Math.max(0, Math.min(100, row.disponibilidad || 0));
    const rendimiento = Math.max(0, Math.min(100, row.rendimiento || 0));
    const calidad = Math.max(0, Math.min(100, row.calidad || 0));

    const oee = Math.round((disponibilidad * rendimiento * calidad) / 10000);

    return {
      oee,
      rendimiento,
      disponibilidad,
      calidad
    };
  } catch (error) {
    console.error('❌ Erro ao calcular OEE para turno:', error);
    return null;
  }
}

/**
 * Obtém dados de produção detalhados para uma OF
 */
export async function getProductionDataForOF(
  machineCode: string,
  codOF: string
): Promise<ProductionData | null> {
  try {
    const sql = `
      SELECT
        SUM(hp.unidades_ok) as total_ok,
        SUM(hp.unidades_nok) as total_nok,
        SUM(hp.unidades_repro) as total_rw,
        SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) as tiempo_produccion_segundos,
        MIN(hp.fecha_ini) as fecha_inicio_real,
        MAX(hp.fecha_fin) as fecha_fin_real
      FROM his_prod hp
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of ho ON hf.id_his_of = ho.id_his_of
      WHERE ho.Rt_Cod_of = '${codOF}'
      AND hp.id_actividad = 2 -- Producción
    `;

    const result = await executeQuery(sql, undefined, 'mapex');

    if (result.length === 0 || !result[0]) {
      return null;
    }

    return result[0] as ProductionData;
  } catch (error) {
    console.error('❌ Erro ao obter dados de produção:', error);
    return null;
  }
}

/**
 * Calcula tempo restante para completar uma OF
 */
export function calculateRemainingTime(
  remainingPieces: number,
  velocity: number
): string {
  if (velocity > 0 && remainingPieces > 0) {
    const remainingHours = remainingPieces / velocity;
    if (remainingHours >= 24) {
      return `${Math.round(remainingHours / 24)}d`;
    } else {
      return `${remainingHours.toFixed(1)}h`;
    }
  }
  return 'N/A';
}

/**
 * Calcula percentual de avanço de uma OF
 */
export function calculateProgress(
  totalProduced: number,
  plannedUnits: number
): number {
  if (plannedUnits > 0) {
    return Math.round((totalProduced / plannedUnits) * 100);
  }
  return 0;
}

/**
 * Calcula OEE (função de compatibilidade)
 */
export async function calcularOEE(
  machineCode: string,
  startDate: Date,
  endDate: Date
): Promise<OEECalculation | null> {
  return calculateOEEForOF(machineCode, '', 30); // Simplificado
}

/**
 * Calcula OEE ponderado (função de compatibilidade)
 */
export async function calcularOEEPonderado(
  machineCode: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  const oee = await calculateOEEForOF(machineCode, '', 30);
  return oee?.oee || 0;
}

/**
 * Gera alertas baseado em dados OEE (função de compatibilidade)
 */
export async function generarAlertas(
  machineCode: string
): Promise<any[]> {
  try {
    const oee = await calculateOEEForOF(machineCode, '', 1);
    const alerts = [];

    if (oee) {
      if (oee.oee < 60) {
        alerts.push({
          type: 'danger',
          message: 'OEE crítico: abaixo de 60%',
          value: oee.oee
        });
      } else if (oee.oee < 75) {
        alerts.push({
          type: 'warning',
          message: 'OEE baixo: abaixo de 75%',
          value: oee.oee
        });
      }

      if (oee.disponibilidad < 80) {
        alerts.push({
          type: 'warning',
          message: 'Disponibilidade baixa',
          value: oee.disponibilidad
        });
      }

      if (oee.calidad < 95) {
        alerts.push({
          type: 'warning',
          message: 'Qualidade baixa',
          value: oee.calidad
        });
      }
    }

    return alerts;
  } catch (error) {
    console.error('Erro ao gerar alertas:', error);
    return [];
  }
}

/**
 * Análise Pareto de causas de paros
 */
export async function analizarParetoCausas(
  machineCode: string,
  startDate: Date,
  endDate: Date
): Promise<any[]> {
  try {
    const sql = `
      SELECT
        cp.desc_paro as causa,
        SUM(DATEDIFF(MINUTE, hpp.fecha_ini, hpp.fecha_fin)) as tiempo_total_minutos,
        COUNT(*) as cantidad_paros
      FROM his_prod hp
      INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
      INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${machineCode}'
      AND hpp.fecha_ini >= '${startDate.toISOString()}'
      AND hpp.fecha_ini <= '${endDate.toISOString()}'
      GROUP BY cp.desc_paro
      ORDER BY tiempo_total_minutos DESC
    `;

    const result = await executeQuery(sql, undefined, 'mapex');

    // Calcular percentual cumulativo (Pareto 80/20)
    const totalTiempo = result.reduce((sum, item) => sum + (item.tiempo_total_minutos || 0), 0);
    let tiempoAcumulado = 0;

    return result.map(item => {
      tiempoAcumulado += item.tiempo_total_minutos || 0;
      return {
        causa: item.causa || 'Sin causa',
        tiempo_total_minutos: item.tiempo_total_minutos || 0,
        cantidad_paros: item.cantidad_paros || 0,
        porcentaje: totalTiempo > 0 ? Math.round((item.tiempo_total_minutos / totalTiempo) * 100) : 0,
        porcentaje_acumulado: totalTiempo > 0 ? Math.round((tiempoAcumulado / totalTiempo) * 100) : 0
      };
    });
  } catch (error) {
    console.error('Erro ao analisar Pareto de causas:', error);
    return [];
  }
}