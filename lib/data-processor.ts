import { executeQuery } from './database/connection';
import { calculateOEEForOF, calculateOEEForTurno, getProductionDataForOF } from './oee/calculations';
import { Machine, MachineStatus as IMachineStatus, OEEData } from '../types/machine';

// Interface para dados de produção por OF
interface ProductionOFData {
  ok: number;
  nok: number;
  rw: number;
  total: number;
  progress: number;
  remainingPieces: number;
  remainingTime: string;
  startDate?: string;
  estimatedFinish?: string;
}

// Interface para dados de velocidade
interface VelocityData {
  current: number;
  nominal: number;
  ratio: number;
}

// Interface para dados do produto
interface ProductData {
  code: string;
  description: string;
}

// Interface para dados da ordem
interface OrderData {
  code: string;
  date?: string;
  shift: string;
}

export async function getMachinesStatus(): Promise<IMachineStatus[]> {
  try {
    console.log('🔄 Iniciando obtenção de status das máquinas...');

    // Consulta principal para obter dados das máquinas (equivalente ao PHP)
    const sqlMachines = `
      SELECT 
        Cod_maquina, desc_maquina, Rt_Cod_of, rt_Cod_producto, rt_id_actividad, 
        rt_id_paro, id_maquina, Rt_Desc_producto, Rt_Unidades_planning, 
        Rt_Desc_actividad, Rt_Desc_operario, Rt_Unidades_ok, Rt_Unidades_nok, 
        f_velocidad, Rt_Rendimientonominal1, rt_desc_paro,
        COALESCE((SELECT cod_producto FROM cfg_producto WHERE id_producto = rt_id_producto), '') as codigo_producto,
        rt_dia_productivo, rt_desc_turno
      FROM cfg_maquina
      WHERE activo = 1 AND Cod_maquina <> '--'
    `;

    const machinesData = await executeQuery<any>(sqlMachines, undefined, 'mapex');
    
    if (!machinesData || machinesData.length === 0) {
      console.log('⚠️ Nenhuma máquina encontrada na consulta principal');
      return [];
    }

    console.log(`✅ ${machinesData.length} máquinas encontradas`);

    // Preparar dados para consultas em lote
    const machineIds = machinesData.map((m: any) => m.id_maquina);
    const machineCodes = machinesData.map((m: any) => m.Cod_maquina);
    const ofCodes = machinesData.map((m: any) => m.Rt_Cod_of).filter((of: string) => of && of !== '--');
    const productCodes = machinesData.map((m: any) => m.codigo_producto).filter((code: string) => code);

    // Mapear dados das máquinas por código
    const machinesMap: { [key: string]: any } = {};
    machinesData.forEach((machine: any) => {
      machinesMap[machine.Cod_maquina] = machine;
    });

    // Executar consultas em lote paralelamente
    const [
      oeeTurnoData,
      oeeOFData,
      productionData,
      lastProductionData
    ] = await Promise.all([
      getOeeTurnoData(machineCodes),
      getOeeOFData(machineCodes),
      getProductionData(ofCodes),
      getLastProductionData(machineIds)
    ]);

    // Processar todas as máquinas
    const machinesStatus: IMachineStatus[] = [];

    for (const machine of machinesData) {
      const status = await processMachineStatus(
        machine,
        oeeTurnoData,
        oeeOFData,
        productionData,
        lastProductionData
      );
      
      if (status) {
        machinesStatus.push(status);
      }
    }

    // Ordenar máquinas por tempo restante (similar ao PHP)
    machinesStatus.sort((a, b) => {
      const timeA = a.productionOF.remainingTime === 'N/A' ? Infinity : parseFloat(a.productionOF.remainingTime || '0');
      const timeB = b.productionOF.remainingTime === 'N/A' ? Infinity : parseFloat(b.productionOF.remainingTime || '0');
      
      if (timeA > 0 && timeB > 0) return timeA - timeB;
      if (timeA > 0 && timeB === Infinity) return -1;
      if (timeA === Infinity && timeB > 0) return 1;
      return 0;
    });

    console.log(`✅ ${machinesStatus.length} máquinas processadas com sucesso`);
    return machinesStatus;

  } catch (error) {
    console.error('❌ Erro ao obter status das máquinas:', error);
    throw error;
  }
}

async function getOeeTurnoData(machineCodes: string[]): Promise<{ [key: string]: any }> {
  if (!machineCodes.length) return {};

  try {
    const codesStr = machineCodes.map(code => `'${code.replace(/'/g, "''")}'`).join(',');
    
    const sql = `
      SELECT 
        cm.Cod_maquina,
        IIF(fhc.OEE_c < 0, 0, fhc.OEE_c) as oee,
        IIF(fhc.Rend_c < 0, 0, fhc.Rend_c) as rend
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER','DAY','TURNO',GETDATE() - 1, GETDATE() + 1, 0) fhc
      WHERE cm.id_maquina = id_maquina 
      AND fhc.workgroup IN (${codesStr})
      AND workgroup = Cod_maquina
      AND fhc.timeperiod = CONVERT(VARCHAR(10), cm.rt_dia_productivo, 111) 
      AND fhc.desc_turno = cm.rt_desc_turno
    `;

    const result = await executeQuery<any>(sql, undefined, 'mapex');
    const oeeData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      oeeData[row.Cod_maquina] = row;
    });

    return oeeData;
  } catch (error) {
    console.error('❌ Erro ao obter dados OEE turno:', error);
    return {};
  }
}

async function getOeeOFData(machineCodes: string[]): Promise<{ [key: string]: any }> {
  if (!machineCodes.length) return {};

  try {
    const codesStr = machineCodes.map(code => `'${code.replace(/'/g, "''")}'`).join(',');
    
    const sql = `
      SELECT 
        cm.Cod_maquina,
        IIF(fhc.OEE_c < 0, 0, fhc.OEE_c) as oee_of,
        IIF(fhc.Rend_c < 0, 0, fhc.Rend_c) as rend_of
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER','','OF',GETDATE() - 10, GETDATE() + 1, '') fhc
      WHERE cm.id_maquina = id_maquina 
      AND fhc.workgroup IN (${codesStr})
      AND fhc.Cod_of = cm.rt_cod_of 
      AND cm.rt_id_his_fase > 1
    `;

    const result = await executeQuery<any>(sql, undefined, 'mapex');
    const oeeData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      oeeData[row.Cod_maquina] = row;
    });

    return oeeData;
  } catch (error) {
    console.error('❌ Erro ao obter dados OEE OF:', error);
    return {};
  }
}

async function getProductionData(ofCodes: string[]): Promise<{ [key: string]: any }> {
  if (!ofCodes.length) return {};

  try {
    const codesStr = ofCodes.map(code => `'${code.replace(/'/g, "''")}'`).join(',');
    
    const sql = `
      SELECT 
        ho.cod_of,
        SUM(hp.unidades_ok) as cantok,
        SUM(hp.unidades_nok) as cantnok,
        SUM(hp.unidades_repro) as cant_rw,
        MIN(hp.Fecha_ini) as inicio,
        SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) as tiempo_prod
      FROM his_prod hp
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of ho ON hf.id_his_of = ho.id_his_of
      INNER JOIN cfg_maquina cm ON hp.Id_maquina = cm.id_maquina
      WHERE ho.cod_of IN (${codesStr}) 
      AND ho.cod_of LIKE '%SEC%'
      AND (hp.unidades_ok + hp.unidades_nok + hp.unidades_repro) > 0
      GROUP BY ho.cod_of
    `;

    const result = await executeQuery<any>(sql, undefined, 'mapex');
    const productionData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      productionData[row.cod_of] = row;
    });

    return productionData;
  } catch (error) {
    console.error('❌ Erro ao obter dados de produção:', error);
    return {};
  }
}

async function getLastProductionData(machineIds: number[]): Promise<{ [key: string]: string }> {
  if (!machineIds.length) return {};

  try {
    const idsStr = machineIds.map(id => `'${id}'`).join(',');
    
    const sql = `
      SELECT 
        Id_maquina,
        MAX(Fecha_fin) as ult_fecha
      FROM his_prod
      WHERE id_actividad = 2 
      AND Id_maquina IN (${idsStr})
      GROUP BY Id_maquina
    `;

    const result = await executeQuery<any>(sql, undefined, 'mapex');
    const lastProductionData: { [key: string]: string } = {};

    result.forEach((row: any) => {
      lastProductionData[row.Id_maquina] = row.ult_fecha;
    });

    return lastProductionData;
  } catch (error) {
    console.error('❌ Erro ao obter última data de produção:', error);
    return {};
  }
}

async function processMachineStatus(
  machine: any,
  oeeTurnoData: { [key: string]: any },
  oeeOFData: { [key: string]: any },
  productionData: { [key: string]: any },
  lastProductionData: { [key: string]: string }
): Promise<IMachineStatus | null> {
  try {
    // Obter dados das consultas em lote
    const oeeTurno = oeeTurnoData[machine.Cod_maquina] || { oee: 0, rend: 0 };
    const oeeOF = oeeOFData[machine.Cod_maquina] || { oee_of: 0, rend_of: 0 };
    const production = productionData[machine.Rt_Cod_of] || { cantok: 0, cantnok: 0, cant_rw: 0, tiempo_prod: 0 };
    const startDate = production?.inicio || null;
    const lastProduction = lastProductionData[machine.id_maquina];

    // Calcular tempo desde última produção
    let hoursSinceLastProduction = 0;
    if (lastProduction) {
      const lastDate = new Date(lastProduction);
      const now = new Date();
      const diffMs = now.getTime() - lastDate.getTime();
      hoursSinceLastProduction = diffMs / (1000 * 60 * 60);
    }

    // Calcular tempo restante
    const totalProduced = production.cantok;
    const remainingPieces = machine.Rt_Unidades_planning - totalProduced;
    let remainingTime = 'N/A';
    let estimatedFinish: string | undefined;

    if (production.cantok + production.cantnok + production.cant_rw > 0 && remainingPieces > 0) {
      const timePerPiece = production.tiempo_prod / (production.cantok + production.cantnok + production.cant_rw);
      const remainingSeconds = remainingPieces * timePerPiece;
      const remainingHours = remainingSeconds / 3600;
      remainingTime = remainingHours.toFixed(1) + 'h';
      estimatedFinish = new Date(Date.now() + remainingSeconds * 1000).toISOString().slice(0, 19).replace('T', ' ');
    }

    // Determinar status da máquina
    let status: IMachineStatus['status'] = 'INACTIVA';
    let downtime: string | undefined;

    if (machine.rt_desc_paro === "PAUSA") {
      status = 'PARADA';
      downtime = "PAUSA";
    } else if (machine.rt_desc_paro === "SIN OPERARIO") {
      status = 'PARADA';
      downtime = "SIN OPERARIO";
    } else {
      switch (machine.rt_id_actividad) {
        case 2:
          status = 'PRODUCIENDO';
          break;
        case 1:
          status = 'INACTIVA';
          break;
        case 3:
        case 5:
        case 11:
        case 20:
        case 21:
          status = 'ACTIVA';
          break;
        default:
          status = 'INACTIVA';
      }
    }

    // Calcular eficiência (progresso)
    const progress = machine.Rt_Unidades_planning > 0
      ? Math.round((totalProduced / machine.Rt_Unidades_planning) * 100)
      : 0;

    // Formatar dados do operador
    let operator = machine.Rt_Desc_operario;
    let operatorFull = machine.Rt_Desc_operario;
    if (operator && operator.includes(',')) {
      operator = operator.split(',')[0] + " + " + (operator.split(',').length - 1);
    }

    // Calcular dados de produção OF
    const productionOF: ProductionOFData = {
      ok: production.cantok,
      nok: production.cantnok,
      rw: production.cant_rw,
      total: production.cantok + production.cantnok + production.cant_rw,
      progress,
      remainingPieces: remainingPieces,
      remainingTime: remainingTime || 'N/A',
      startDate: startDate ? String(startDate).slice(0, 19).replace('T', ' ') : undefined,
      estimatedFinish
    };

    // Calcular dados de velocidade
    const velocity: VelocityData = {
      current: machine.f_velocidad,
      nominal: machine.Rt_Rendimientonominal1,
      ratio: machine.Rt_Rendimientonominal1 > 0 ? machine.f_velocidad / machine.Rt_Rendimientonominal1 : 0
    };

    // Dados do produto
    const product: ProductData = {
      code: machine.codigo_producto || '',
      description: machine.Rt_Desc_producto || ''
    };

    // Dados da ordem
    const order: OrderData = {
      code: machine.Rt_Cod_of,
      shift: machine.rt_desc_turno || ''
    };

    return {
      machine: {
        Cod_maquina: machine.Cod_maquina,
        desc_maquina: machine.desc_maquina,
        id_maquina: machine.id_maquina,
        Rt_Cod_of: machine.Rt_Cod_of,
        rt_Cod_producto: machine.rt_Cod_producto,
        rt_id_actividad: machine.rt_id_actividad,
        rt_id_paro: machine.rt_id_paro,
        Rt_Desc_producto: machine.Rt_Desc_producto,
        Rt_Unidades_planning: machine.Rt_Unidades_planning,
        Rt_Desc_actividad: machine.Rt_Desc_actividad,
        Rt_Desc_operario: machine.Rt_Desc_operario,
        Rt_Unidades_ok: machine.Rt_Unidades_ok,
        Rt_Unidades_nok: machine.Rt_Unidades_nok,
        f_velocidad: machine.f_velocidad,
        Rt_Rendimientonominal1: machine.Rt_Rendimientonominal1,
        rt_desc_paro: machine.rt_desc_paro,
        codigo_producto: machine.codigo_producto,
        rt_dia_productivo: machine.rt_dia_productivo,
        rt_desc_turno: machine.rt_desc_turno,
        activo: true
      } as Machine,
      status,
      efficiency: oeeTurno.rend || oeeOF.rend_of || 0,
      oee: oeeTurno.oee || oeeOF.oee_of || 0,
      oeeBreakdown: null,
      production: {
        ok: production.cantok,
        nok: production.cantnok,
        rw: production.cant_rw,
        total: production.cantok + production.cantnok + production.cant_rw
      },
      productionOF,
      velocity,
      currentOF: machine.Rt_Cod_of !== '--' ? machine.Rt_Cod_of : undefined,
      operator: operator || undefined,
      operatorFull: operatorFull || undefined,
      downtime,
      product,
      order
    };

  } catch (error) {
    console.error(`❌ Erro ao processar máquina ${machine.Cod_maquina}:`, error);
    return null;
  }
}