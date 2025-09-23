import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from 'lib/database/connection';

interface ProductionData {
  machineId: string;
  machineName: string;
  ok: number;
  nok: number;
  rw: number;
  total: number;
  efficiency: number;
  timestamp: string;
  operator?: string;
  shift?: string;
  of_actual?: string;
  producto_actual?: string;
}

interface ProductionSummary {
  totalOk: number;
  totalNok: number;
  totalRw: number;
  totalProduction: number;
  averageEfficiency: number;
  machines: ProductionData[];
  timestamp: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Buscando datos de producción reales...');

    // Obtener datos reales del banco MAPEX
    const productionData = await getRealProductionData();

    return NextResponse.json({
      success: true,
      data: productionData,
      summary: calculateSummary(productionData),
      timestamp: new Date().toISOString(),
      source: 'mapex-database'
    });

  } catch (error) {
    console.error('❌ Error al buscar datos de producción:', error);

    return NextResponse.json({
      success: false,
      error: 'Error al conectar con banco de datos',
      message: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

async function getRealProductionData(): Promise<ProductionData[]> {
  try {
    // Consulta SQL melhorada para obter dados de produção reais
    const sql = `
      SELECT
        cm.Cod_maquina as machineId,
        cm.desc_maquina as machineName,
        -- Produção total da máquina (últimos 30 dias)
        COALESCE(SUM(CASE WHEN hp.id_actividad = 2 THEN hp.unidades_ok ELSE 0 END), 0) as ok,
        COALESCE(SUM(CASE WHEN hp.id_actividad = 2 THEN hp.unidades_nok ELSE 0 END), 0) as nok,
        COALESCE(SUM(CASE WHEN hp.id_actividad = 2 THEN hp.unidades_repro ELSE 0 END), 0) as rw,
        -- Informações atuais da máquina
        cm.Rt_Cod_of as of_actual,
        cm.Rt_Desc_producto as producto_actual,
        cm.Rt_Desc_operario as operario,
        cm.rt_desc_turno as turno,
        -- Data da última atualização
        MAX(hp.fecha_fin) as ultima_actualizacion,
        -- Produção do último turno para dados mais recentes
        COALESCE(SUM(CASE WHEN hp.id_actividad = 2 AND hp.fecha_fin >= DATEADD(hour, -8, GETDATE())
                   THEN hp.unidades_ok ELSE 0 END), 0) as ok_ultimo_turno
      FROM cfg_maquina cm
      LEFT JOIN his_prod hp ON cm.id_maquina = hp.id_maquina
        AND hp.fecha_fin >= DATEADD(day, -30, GETDATE())  -- Últimos 30 dias
        AND hp.id_actividad = 2  -- Produção
      WHERE cm.Cod_maquina IS NOT NULL
        AND cm.Cod_maquina != ''
        AND cm.Cod_maquina NOT LIKE '%AUX%'  -- Excluir máquinas auxiliares
        AND cm.Cod_maquina NOT LIKE '%TEST%' -- Excluir máquinas de teste
      GROUP BY cm.Cod_maquina, cm.desc_maquina, cm.Rt_Cod_of, cm.Rt_Desc_producto,
               cm.Rt_Desc_operario, cm.rt_desc_turno
      HAVING COALESCE(SUM(CASE WHEN hp.id_actividad = 2 THEN hp.unidades_ok ELSE 0 END), 0) > 0
      ORDER BY ok DESC
    `;

    const result = await executeQuery(sql, undefined, 'mapex');
    
    const now = new Date();
    
    return result.map((row: any) => {
      // Usar produção do último turno se disponível, senão usar produção total
      const okDisplay = row.ok_ultimo_turno > 0 ? row.ok_ultimo_turno : row.ok;
      const nokDisplay = row.nok;
      const rwDisplay = row.rw;
      const totalDisplay = okDisplay + nokDisplay + rwDisplay;
      const efficiency = totalDisplay > 0 ? Math.round((okDisplay / totalDisplay) * 100) : 0;
      
      return {
        machineId: row.machineId || 'N/A',
        machineName: row.machineName || 'Máquina sin nombre',
        ok: okDisplay,
        nok: nokDisplay,
        rw: rwDisplay,
        total: totalDisplay,
        efficiency: Math.max(0, Math.min(100, efficiency)),
        timestamp: row.ultima_actualizacion || now.toISOString(),
        operator: row.operario || 'N/A',
        shift: row.turno || 'N/A',
        of_actual: row.of_actual || 'N/A',
        producto_actual: row.producto_actual || 'N/A'
      };
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo datos de producción reales:', error);
    // Fallback: retornar array vazio em caso de erro
    return [];
  }
}

function calculateSummary(data: ProductionData[]): ProductionSummary {
  const totalOk = data.reduce((sum, item) => sum + item.ok, 0);
  const totalNok = data.reduce((sum, item) => sum + item.nok, 0);
  const totalRw = data.reduce((sum, item) => sum + item.rw, 0);
  const totalProduction = totalOk + totalNok + totalRw;
  const averageEfficiency = data.length > 0
    ? data.reduce((sum, item) => sum + item.efficiency, 0) / data.length
    : 0;

  return {
    totalOk,
    totalNok,
    totalRw,
    totalProduction,
    averageEfficiency: Math.round(averageEfficiency * 100) / 100,
    machines: data,
    timestamp: new Date().toISOString()
  };
}
