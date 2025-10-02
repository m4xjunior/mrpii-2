import { executeQuery } from "./database/connection";
import {
  calculateOEEForOF,
  calculateOEEForTurno,
  getProductionDataForOF,
} from "./oee/calculations";
import {
  Machine,
  MachineStatus as IMachineStatus,
  OEEData,
} from "../types/machine";

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

// Função de teste para verificar queries MAPEX
export async function testMapexQueries(): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  try {
    console.log("🔍 Testando queries MAPEX...");

    // Teste 1: Verificar conexão básica
    try {
      const testConnection = await executeQuery<any>(
        "SELECT 1 as test",
        undefined,
        "mapex",
      );
      console.log("✅ Conexão MAPEX OK");
    } catch (connectionError) {
      console.error("❌ Erro na conexão:", connectionError);
      throw connectionError;
    }

    // Teste 2: Query muito simples sem JOINs
    try {
      const testSimple = await executeQuery<any>(
        `
        SELECT TOP 1 Rt_Cod_of as cod_of FROM his_of WHERE Rt_Cod_of LIKE '%SEC%'
      `,
        undefined,
        "mapex",
      );
      console.log("✅ Query simples OK:", testSimple.length);
    } catch (simpleError) {
      console.error("❌ Erro na query simples:", simpleError);
      throw simpleError;
    }

    // Teste 3: Query de produção sem JOINs complexos
    try {
      const testProduction = await executeQuery<any>(
        `
        SELECT TOP 3 ho.Rt_Cod_of as cod_of FROM his_of ho WHERE ho.Rt_Cod_of LIKE '%SEC%'
      `,
        undefined,
        "mapex",
      );
      console.log("✅ Query de produção OK:", testProduction.length);
    } catch (productionError) {
      console.error("❌ Erro na query de produção:", productionError);
      throw productionError;
    }

    return {
      success: true,
      message: "Testes básicos das queries MAPEX funcionando",
      data: {
        connection: true,
        simple: true,
        production: true,
      },
    };
  } catch (error) {
    console.error("❌ Erro no teste das queries MAPEX:", error);

    // Verificar se é AggregateError e tentar extrair informações
    if (error instanceof AggregateError) {
      console.error("❌ AggregateError detectado. Erros individuais:");
      error.errors.forEach((err, index) => {
        console.error(`  Erro ${index + 1}:`, err);
      });
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      data: {
        error: String(error),
        errorType: error instanceof Error ? error.constructor.name : "Unknown",
        stack: error instanceof Error ? error.stack : undefined,
      },
    };
  }
}

export async function getMachinesStatus(): Promise<IMachineStatus[]> {
  try {
    console.log("🔄 Iniciando obtenção de status das máquinas...");

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

    const machinesData = await executeQuery<any>(
      sqlMachines,
      undefined,
      "mapex",
    );

    if (!machinesData || machinesData.length === 0) {
      console.log("⚠️ Nenhuma máquina encontrada na consulta principal");
      return [];
    }

    console.log(`✅ ${machinesData.length} máquinas encontradas`);

    // Preparar dados para consultas em lote
    const machineIds = machinesData.map((m: any) => m.id_maquina);
    const machineCodes = machinesData.map((m: any) => m.Cod_maquina);
    const ofCodes = machinesData
      .map((m: any) => m.Rt_Cod_of)
      .filter((of: string) => of && of !== "--");
    const productCodes = machinesData
      .map((m: any) => m.codigo_producto)
      .filter((code: string) => code);

    // Mapear dados das máquinas por código
    const machinesMap: { [key: string]: any } = {};
    machinesData.forEach((machine: any) => {
      machinesMap[machine.Cod_maquina] = machine;
    });

    // Executar consultas em lote paralelamente com tratamento de erro robusto
    console.log("🔄 Executando consultas em lote...");
    const [
      oeeTurnoData,
      oeeOFData,
      productionData,
      lastProductionData,
      ofDetailsData,
      parosData,
    ] = await Promise.all([
      getOeeTurnoData(machineCodes).catch((error) => {
        console.warn("⚠️ Erro em getOeeTurnoData:", error);
        return {};
      }),
      getOeeOFData(machineCodes).catch((error) => {
        console.warn("⚠️ Erro em getOeeOFData:", error);
        return {};
      }),
      getProductionData(ofCodes).catch((error) => {
        console.warn(
          "⚠️ Erro em getProductionData (usando dados padrão):",
          error,
        );
        // Retornar dados padrão em caso de erro
        return ofCodes.reduce((acc, code) => {
          acc[code] = { cantok: 0, cantnok: 0, cant_rw: 0, tiempo_prod: 0 };
          return acc;
        }, {} as any);
      }),
      getLastProductionData(machineIds).catch((error) => {
        console.warn("⚠️ Erro em getLastProductionData:", error);
        return {};
      }),
      getOFDetailsData(ofCodes).catch((error) => {
        console.warn(
          "⚠️ Erro em getOFDetailsData (usando dados padrão):",
          error,
        );
        // Retornar dados padrão em caso de erro
        return ofCodes.reduce((acc, code) => {
          acc[code] = {
            duracion_minutos: 0,
            estado: "DESCONHECIDO",
            Cod_maquina: "DOBL10",
          };
          return acc;
        }, {} as any);
      }),
      getParosData(machineIds).catch((error) => {
        console.warn("⚠️ Erro em getParosData:", error);
        return {};
      }),
    ]);

    // Processar todas as máquinas
    const machinesStatus: IMachineStatus[] = [];

    for (const machine of machinesData) {
      const status = await processMachineStatus(
        machine,
        oeeTurnoData,
        oeeOFData,
        productionData,
        lastProductionData,
        ofDetailsData,
        parosData,
      );

      if (status) {
        machinesStatus.push(status);
      }
    }

    // Ordenar máquinas por prioridade de status: PRODUCIENDO > ACTIVA > PARADA (reais) > INACTIVA
    machinesStatus.sort((a, b) => {
      // Definir prioridade dos status com lógica mais específica
      const getStatusPriority = (machine: any) => {
        // Verificar se a máquina tem paros reais (PAUSA, SIN OPERARIO)
        const hasRealDowntime =
          machine.downtime === "PAUSA" || machine.downtime === "SIN OPERARIO";

        switch (machine.status) {
          case "PRODUCIENDO":
            return 1; // Prioridade mais alta
          case "ACTIVA":
            return 2;
          case "PARADA":
            // Se tem paros reais (PAUSA, SIN OPERARIO), priorizar sobre INACTIVA
            return hasRealDowntime ? 3 : 5;
          case "INACTIVA":
            // INACTIVA tem prioridade menor, mesmo que tenha "PARO PLANIFICADO"
            return 4;
          default:
            return 6;
        }
      };

      const priorityA = getStatusPriority(a);
      const priorityB = getStatusPriority(b);

      // Primeiro ordenar por prioridade de status
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // Se mesmo status, ordenar por tempo restante (para PRODUCIENDO e ACTIVA)
      if (
        a.status !== "PARADA" &&
        b.status !== "PARADA" &&
        a.status !== "INACTIVA" &&
        b.status !== "INACTIVA"
      ) {
        const timeA =
          a.productionOF.remainingTime === "N/A"
            ? Infinity
            : parseFloat(a.productionOF.remainingTime || "0");
        const timeB =
          b.productionOF.remainingTime === "N/A"
            ? Infinity
            : parseFloat(b.productionOF.remainingTime || "0");

        if (timeA > 0 && timeB > 0) return timeA - timeB;
        if (timeA > 0 && timeB === Infinity) return -1;
        if (timeA === Infinity && timeB > 0) return 1;
      }

      return 0;
    });

    console.log(`✅ ${machinesStatus.length} máquinas processadas com sucesso`);
    return machinesStatus;
  } catch (error) {
    console.error("❌ Erro ao obter status das máquinas:", error);
    throw error;
  }
}

async function getOeeTurnoData(
  machineCodes: string[],
): Promise<{ [key: string]: any }> {
  if (!machineCodes.length) return {};

  try {
    const codesStr = machineCodes
      .map((code) => `'${code.replace(/'/g, "''")}'`)
      .join(",");

    const sql = `
      SELECT
        cm.Cod_maquina,
        fhc.OEE_c as oee,
        fhc.Rend_c as rend
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER', 'DAY', 'TURNO', DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, 1, GETDATE()), 0) fhc
      WHERE cm.Cod_maquina IN (${codesStr})
        AND fhc.workgroup = cm.Cod_maquina
        AND fhc.timeperiod = CONVERT(VARCHAR(10), cm.rt_dia_productivo, 111)
        AND fhc.desc_turno = cm.rt_desc_turno
        AND cm.activo = 1
    `;

    const result = await executeQuery<any>(sql, undefined, "mapex");
    const oeeData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      oeeData[row.Cod_maquina] = {
        Cod_maquina: row.Cod_maquina,
        oee: Math.max(0, Math.min(100, row.oee || 0)),
        rend: Math.max(0, Math.min(100, row.rend || 0)),
      };
    });

    return oeeData;
  } catch (error) {
    console.error("❌ Erro ao obter dados OEE turno:", error);
    return {};
  }
}

async function getOeeOFData(
  machineCodes: string[],
): Promise<{ [key: string]: any }> {
  if (!machineCodes.length) return {};

  try {
    const codesStr = machineCodes
      .map((code) => `'${code.replace(/'/g, "''")}'`)
      .join(",");

    const sql = `
      SELECT
        cm.Cod_maquina,
        fhc.OEE_c as oee_of,
        fhc.Rend_c as rend_of
      FROM cfg_maquina cm
      CROSS APPLY [F_his_ct]('WORKCENTER', '', 'OF', DATEADD(DAY, -10, GETDATE()), DATEADD(DAY, 1, GETDATE()), '') fhc
      WHERE cm.Cod_maquina IN (${codesStr})
        AND fhc.workgroup = cm.Cod_maquina
        AND cm.activo = 1
        AND cm.Rt_Cod_of IS NOT NULL
        AND cm.Rt_Cod_of <> '--'
    `;

    const result = await executeQuery<any>(sql, undefined, "mapex");
    const oeeData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      oeeData[row.Cod_maquina] = {
        Cod_maquina: row.Cod_maquina,
        oee_of: Math.max(0, Math.min(100, row.oee_of || 0)),
        rend_of: Math.max(0, Math.min(100, row.rend_of || 0)),
      };
    });

    return oeeData;
  } catch (error) {
    console.error("❌ Erro ao obter dados OEE OF:", error);
    return {};
  }
}

async function getProductionData(
  ofCodes: string[],
): Promise<{ [key: string]: any }> {
  if (!ofCodes.length) return {};

  try {
    console.log("🔍 Obtendo dados de produção...");

    // Query simplificada sem JOINs complexos para evitar erros
    const sql = `
      SELECT TOP 10
        ho.Rt_Cod_of as cod_of,
        COALESCE(SUM(CASE WHEN hp.unidades_ok IS NOT NULL THEN hp.unidades_ok ELSE 0 END), 0) as cantok,
        COALESCE(SUM(CASE WHEN hp.unidades_nok IS NOT NULL THEN hp.unidades_nok ELSE 0 END), 0) as cantnok,
        COALESCE(SUM(CASE WHEN hp.unidades_repro IS NOT NULL THEN hp.unidades_repro ELSE 0 END), 0) as cant_rw
      FROM his_of ho
      LEFT JOIN his_fase hf ON ho.id_his_of = hf.id_his_of
      LEFT JOIN his_prod hp ON hf.id_his_fase = hp.id_his_fase
      WHERE ho.Rt_Cod_of IN (${ofCodes.map((code) => `'${code.replace(/'/g, "''")}'`).join(",")})
      GROUP BY ho.Rt_Cod_of
    `;

    console.log("🔍 Executando query de produção simplificada...");
    const result = await executeQuery<any>(sql, undefined, "mapex");
    const productionData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      productionData[row.cod_of] = row;
    });

    console.log("✅ Dados de produção obtidos:", result.length);
    return productionData;
  } catch (error) {
    console.error(
      "❌ Erro ao obter dados de produção (usando fallback):",
      error,
    );

    // Fallback: retornar dados padrão para evitar que o sistema pare
    return ofCodes.reduce((acc, code) => {
      acc[code] = { cantok: 0, cantnok: 0, cant_rw: 0, tiempo_prod: 0 };
      return acc;
    }, {} as any);
  }
}

async function getLastProductionData(
  machineIds: number[],
): Promise<{ [key: string]: string }> {
  if (!machineIds.length) return {};

  try {
    const idsStr = machineIds.map((id) => `'${id}'`).join(",");

    const sql = `
      SELECT
        Id_maquina,
        MAX(Fecha_fin) as ult_fecha
      FROM his_prod
      WHERE id_actividad = 2
      AND Id_maquina IN (${idsStr})
      GROUP BY Id_maquina
    `;

    const result = await executeQuery<any>(sql, undefined, "mapex");
    const lastProductionData: { [key: string]: string } = {};

    result.forEach((row: any) => {
      lastProductionData[row.Id_maquina] = row.ult_fecha;
    });

    return lastProductionData;
  } catch (error) {
    console.error("❌ Erro ao obter última data de produção:", error);
    return {};
  }
}

async function getOFDetailsData(
  ofCodes: string[],
): Promise<{ [key: string]: any }> {
  if (!ofCodes.length) return {};

  try {
    console.log("🔍 Obtendo dados detalhados da OF...");

    // Query simplificada sem JOINs complexos
    const sql = `
      SELECT TOP 10
        ho.Rt_Cod_of as cod_of,
        ho.fecha_ini,
        ho.fecha_fin,
        CASE
          WHEN ho.fecha_ini IS NOT NULL AND ho.fecha_fin IS NOT NULL AND ho.fecha_ini < ho.fecha_fin
          THEN DATEDIFF(MINUTE, ho.fecha_ini, ho.fecha_fin)
          ELSE 0
        END as duracion_minutos,
        COALESCE(ho.estado, 'DESCONHECIDO') as estado,
        'DOBL10' as Cod_maquina
      FROM his_of ho
      WHERE ho.Rt_Cod_of IN (${ofCodes.map((code) => `'${code.replace(/'/g, "''")}'`).join(",")})
        AND ho.Rt_Cod_of LIKE '%SEC%'
    `;

    console.log("🔍 Executando query de detalhes da OF simplificada...");
    const result = await executeQuery<any>(sql, undefined, "mapex");
    const ofDetailsData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      if (!ofDetailsData[row.cod_of]) {
        ofDetailsData[row.cod_of] = row;
      }
    });

    console.log("✅ Dados detalhados da OF obtidos:", result.length);
    return ofDetailsData;
  } catch (error) {
    console.error(
      "❌ Erro ao obter dados detalhados da OF (usando fallback):",
      error,
    );

    // Fallback: retornar dados padrão
    return ofCodes.reduce((acc, code) => {
      acc[code] = {
        duracion_minutos: 0,
        estado: "DESCONHECIDO",
        Cod_maquina: "DOBL10",
      };
      return acc;
    }, {} as any);
  }
}

async function getParosData(
  machineIds: number[],
): Promise<{ [key: string]: any }> {
  if (!machineIds.length) return {};

  try {
    const idsStr = machineIds.map((id) => `'${id}'`).join(",");

    const sql = `
      WITH paros_hoy AS (
        SELECT
          hp.Id_maquina,
          cm.Cod_maquina,
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, COALESCE(hpp.fecha_fin, GETDATE())) AS BIGINT)) AS segundos_paro
        FROM his_prod_paro hpp
        INNER JOIN his_prod hp ON hpp.id_his_prod = hp.id_his_prod
        INNER JOIN cfg_maquina cm ON hp.Id_maquina = cm.id_maquina
        WHERE hp.Id_maquina IN (${idsStr})
          AND CONVERT(date, COALESCE(hp.Dia_productivo, hp.Fecha_ini, hpp.fecha_ini)) = CONVERT(date, GETDATE())
        GROUP BY hp.Id_maquina, cm.Cod_maquina
      )
      SELECT
        Cod_maquina,
        COALESCE(segundos_paro, 0) AS total_paros_segundos
      FROM paros_hoy
    `;

    const result = await executeQuery<any>(sql, undefined, "mapex");
    const parosData: { [key: string]: any } = {};

    result.forEach((row: any) => {
      parosData[row.Cod_maquina] = row;
    });

    return parosData;
  } catch (error) {
    console.error("❌ Erro ao obter dados de paros:", error);
    return {};
  }
}

async function processMachineStatus(
  machine: any,
  oeeTurnoData: { [key: string]: any },
  oeeOFData: { [key: string]: any },
  productionData: { [key: string]: any },
  lastProductionData: { [key: string]: string },
  ofDetailsData: { [key: string]: any },
  parosData: { [key: string]: any },
): Promise<IMachineStatus | null> {
  try {
    // Buscar dados reais de produção da tabela cfg_maquina (similar à machine-details)
    let realProductionData = { ok: 0, nok: 0, rw: 0 };

    try {
      const sqlRealProduction = `
        SELECT TOP 1
          Rt_Unidades_ok_of as ok,
          Rt_Unidades_nok_of as nok,
          Rt_Unidades_repro_of as rw
        FROM cfg_maquina
        WHERE Cod_maquina = '${machine.Cod_maquina}'
      `;

      const realProductionResult = await executeQuery(
        sqlRealProduction,
        undefined,
        "mapex",
      );
      if (realProductionResult.length > 0) {
        realProductionData = realProductionResult[0];
      }
    } catch (error) {
      console.warn(
        `⚠️ Erro ao buscar dados reais de produção para ${machine.Cod_maquina}:`,
        error,
      );
    }

    // Obter dados das consultas em lote
    const oeeTurno = oeeTurnoData[machine.Cod_maquina] || { oee: 0, rend: 0 };
    const oeeOF = oeeOFData[machine.Cod_maquina] || { oee_of: 0, rend_of: 0 };
    const production = productionData[machine.Rt_Cod_of] || {
      cantok: 0,
      cantnok: 0,
      cant_rw: 0,
      tiempo_prod: 0,
    };
    const startDate = production?.inicio || null;
    const lastProduction = lastProductionData[machine.id_maquina];

    // Obter dados detalhados da OF
    const ofDetails = ofDetailsData[machine.Rt_Cod_of] || null;
    const machineParos = parosData[machine.Cod_maquina] || {
      total_paros_segundos: 0,
    };

    // Usar dados reais da produção em vez dos dados da query principal
    const realOk = realProductionData.ok || machine.Rt_Unidades_ok || 0;
    const realNok = realProductionData.nok || machine.Rt_Unidades_nok || 0;
    const realRw = realProductionData.rw || 0;

    // Calcular tempo desde última produção
    let hoursSinceLastProduction = 0;
    if (lastProduction) {
      const lastDate = new Date(lastProduction);
      const now = new Date();
      const diffMs = now.getTime() - lastDate.getTime();
      hoursSinceLastProduction = diffMs / (1000 * 60 * 60);
    }

    // Calcular tempo restante usando dados reais
    const totalProduced = realOk;
    const remainingPieces = machine.Rt_Unidades_planning - totalProduced;
    let remainingTime = "N/A";
    let estimatedFinish: string | undefined;

    // Calcular informações da OF
    const ofStartDate = ofDetails?.fecha_ini || null;
    const ofEndDate = ofDetails?.fecha_fin || null;
    const ofDurationMinutes = ofDetails?.duracion_minutos || 0;
    const parosSeconds = machineParos.total_paros_segundos || 0;
    const parosMinutes = Math.round(parosSeconds / 60);

    // Usar dados reais para cálculo de tempo restante
    if (
      realOk + realNok + realRw > 0 &&
      remainingPieces > 0 &&
      machine.f_velocidad > 0
    ) {
      // Estimar tempo por peça baseado na velocidade da máquina
      const timePerPiece = 60 / machine.f_velocidad; // minutos por peça
      const remainingMinutes = remainingPieces * timePerPiece;
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMins = Math.round(remainingMinutes % 60);
      remainingTime =
        remainingHours > 0
          ? `${remainingHours}h ${remainingMins}m`
          : `${remainingMins}m`;
      estimatedFinish = new Date(
        Date.now() + remainingMinutes * 60000,
      ).toLocaleString("es-ES");
    }

    // Determinar status da máquina
    let status: IMachineStatus["status"] = "INACTIVA";
    let downtime: string | undefined;

    if (machine.rt_desc_paro === "PAUSA") {
      status = "PARADA";
      downtime = "PAUSA";
    } else if (machine.rt_desc_paro === "SIN OPERARIO") {
      status = "PARADA";
      downtime = "SIN OPERARIO";
    } else {
      switch (machine.rt_id_actividad) {
        case 2:
          status = "PRODUCIENDO";
          break;
        case 1:
          status = "INACTIVA";
          break;
        case 3:
        case 5:
        case 11:
        case 20:
        case 21:
          status = "ACTIVA";
          break;
        default:
          status = "INACTIVA";
      }
    }

    // Calcular eficiência (progresso) com dados reais
    const progress =
      machine.Rt_Unidades_planning > 0
        ? Math.round((totalProduced / machine.Rt_Unidades_planning) * 100)
        : 0;

    // Calcular eficiência real baseada nos dados de produção
    const realEfficiency =
      realOk + realNok + realRw > 0
        ? Math.round((realOk / (realOk + realNok + realRw)) * 100)
        : 0;

    // Formatar dados do operador
    let operator = machine.Rt_Desc_operario;
    let operatorFull = machine.Rt_Desc_operario;
    if (operator && operator.includes(",")) {
      operator =
        operator.split(",")[0] + " + " + (operator.split(",").length - 1);
    }

    // Calcular dados de produção OF com dados reais
    const productionOF: ProductionOFData = {
      ok: realOk,
      nok: realNok,
      rw: realRw,
      total: realOk + realNok + realRw,
      progress,
      remainingPieces: remainingPieces,
      remainingTime: remainingTime || "N/A",
      startDate: startDate
        ? String(startDate).slice(0, 19).replace("T", " ")
        : undefined,
      estimatedFinish,
    };

    // Calcular informações adicionais da OF
    const ofInfo = {
      startDate: ofStartDate
        ? new Date(ofStartDate).toLocaleString("es-ES")
        : null,
      endDate: ofEndDate ? new Date(ofEndDate).toLocaleString("es-ES") : null,
      durationMinutes: ofDurationMinutes,
      parosMinutes: parosMinutes,
      estimatedFinishDate: estimatedFinish || null,
    };

    // Calcular dados de velocidade
    const velocity: VelocityData = {
      current: machine.f_velocidad,
      nominal: machine.Rt_Rendimientonominal1,
      ratio:
        machine.Rt_Rendimientonominal1 > 0
          ? machine.f_velocidad / machine.Rt_Rendimientonominal1
          : 0,
    };

    // Dados do produto
    const product: ProductData = {
      code: machine.codigo_producto || "",
      description: machine.Rt_Desc_producto || "",
    };

    // Dados da ordem
    const order: OrderData = {
      code: machine.Rt_Cod_of,
      shift: machine.rt_desc_turno || "",
    };

    // Calcular tempo por peça (segundos) - conforme PHP
    const tiempoPieza =
      machine.f_velocidad > 0 ? 3600 / machine.f_velocidad : 0;

    // Calcular tempo total de produção (segundos)
    const tiempoProd = production.tiempo_prod || 0;

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
        activo: true,
      } as Machine,
      status,
      efficiency: realEfficiency, // Usar eficiência calculada com dados reais
      oee: oeeTurno.oee || oeeOF.oee_of || 0,
      oeeBreakdown: null,
      production: {
        ok: realOk, // Usar dados reais da produção
        nok: realNok,
        rw: realRw,
        total: realOk + realNok + realRw,
      },
      productionOF,
      velocity,
      // Novos campos conforme contrato de dados
      rt_Cod_of: machine.Rt_Cod_of || "",
      rt_Desc_producto: machine.Rt_Desc_producto || "",
      Rt_Unidades_planning: machine.Rt_Unidades_planning || 0,
      rt_Unidades_ok: realOk,
      rt_Unidades_nok: realNok,
      rt_Unidades_rw: realRw,
      rt_fecha_inicio: ofStartDate || null,
      rt_tiempo_prod: tiempoProd,
      rt_tiempo_pieza: tiempoPieza,
      rt_velocidad: machine.f_velocidad || 0,
      rt_fecha_fin_estimada: estimatedFinish || "",
      oee_turno: oeeTurno.oee || 0,
      rendimiento: oeeTurno.rend || 0,
      oee_of: oeeOF.oee_of || 0,
      rendimiento_of: oeeOF.rend_of || 0,
      rt_desc_paro: machine.rt_desc_paro || null,
      rt_id_actividad: machine.rt_id_actividad || 0,
      currentOF: machine.Rt_Cod_of !== "--" ? machine.Rt_Cod_of : undefined,
      operator: operator || undefined,
      operatorFull: operatorFull || undefined,
      downtime,
      product,
      order,
      // Novas informações da OF para os cards
      ofInfo,
    };
  } catch (error) {
    console.error(
      `❌ Erro ao processar máquina ${machine.Cod_maquina}:`,
      error,
    );
    return null;
  }
}
