import { Connection, Request, TYPES } from 'tedious';

// Configuraciones para múltiples bases de datos como en el PHP original
const baseConfig: any = {
  server: process.env.DB_SERVER || '10.0.0.45',
  authentication: {
    type: 'default' as const,
    options: {
      userName: process.env.DB_USER || 'sa',
      password: process.env.DB_PASSWORD || 'Mapexdd2017',
    },
  },
  options: {
    port: parseInt(process.env.DB_PORT || '1433'),
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 15000, // Reduzido para detectar problemas mais rápido
    requestTimeout: 45000, // Aumentado para consultas complexas
    enableArithAbort: true,
    useUTC: false,
    datefirst: 1,
    dateFormat: 'dmy',
    abortTransactionOnError: true,
    // Configurações adicionais para melhorar estabilidade
    cancelTimeout: 5000,
    maxRetriesOnTransientErrors: 3,
    retryDelayMs: 1000,
  },
};

// Configuraciones específicas para cada base de datos
const mapexConfig: any = {
  ...baseConfig,
  options: {
    ...baseConfig.options,
    database: process.env.DB_NAME || 'mapexbp_Test',
  },
};

const sageConfig: any = {
  ...baseConfig,
  authentication: {
    type: 'default' as const,
    options: {
      userName: 'sa',
      password: 'admin000',
    },
  },
  options: {
    ...baseConfig.options,
    database: 'SAGE',
  },
};

const whalesConfig: any = {
  ...baseConfig,
  authentication: {
    type: 'default' as const,
    options: {
      userName: 'sa',
      password: 'Mapexdd2017',
    },
  },
  options: {
    ...baseConfig.options,
    database: 'WHALES',
  },
};

// Função para criar uma nova conexão para cada query (evita conflitos de estado)
export async function getDbConnection(database: 'mapex' | 'sage' | 'whales' = 'mapex'): Promise<Connection> {
  let config: any;
  switch (database) {
    case 'mapex':
      config = mapexConfig;
      break;
    case 'sage':
      config = sageConfig;
      break;
    case 'whales':
      config = whalesConfig;
      break;
    default:
      config = mapexConfig;
  }

  const connection = new Connection(config);

  return new Promise((resolve, reject) => {
    connection.on('connect', (err) => {
      if (err) {
        console.error(`❌ Erro ao conectar à base ${database.toUpperCase()}:`, err);
        reject(err);
      } else {
        console.log(`✅ Nova conexão criada para ${database.toUpperCase()}`);
        resolve(connection);
      }
    });

    connection.on('error', (err) => {
      console.error(`❌ Erro na conexão ${database.toUpperCase()}:`, err);
      reject(err);
    });

    // Não definir on('end') aqui pois vamos fechar manualmente

    connection.connect();
  });
}

// Função para validar se a conexão está em estado válido
export function isConnectionValid(connection: Connection): boolean {
  return connection && !connection.closed && connection.state?.name === 'LoggedIn';
}

// Cache de conexões para reutilização (pool simples)
const connectionPool = new Map<string, Connection>();

export async function executeQuery<T = any>(
  sql: string,
  parameters?: { [key: string]: any },
  database: 'mapex' | 'sage' | 'whales' = 'mapex',
  retryCount = 0
): Promise<T[]> {
  const maxRetries = 3;
  const startTime = Date.now();

  console.log(`🔍 Executando query ${database.toUpperCase()}...`);
  console.log('SQL:', sql.substring(0, 200) + (sql.length > 200 ? '...' : ''));
  if (parameters) console.log('Parameters:', Object.keys(parameters));

  try {
    // Sempre criar uma nova conexão para evitar conflitos de estado
    // O problema relatado indica que conexões reutilizadas podem estar em estado inválido
    let conn: Connection;

    // Verificar se há uma conexão válida no pool
    const existingConn = connectionPool.get(database);
    if (existingConn && isConnectionValid(existingConn)) {
      // Usar conexão existente se estiver em estado válido
      conn = existingConn;
      console.log(`♻️ Reutilizando conexão válida para ${database.toUpperCase()}`);
    } else {
      // Criar nova conexão se não houver uma válida
      if (existingConn) {
        // Fechar conexão inválida antes de criar nova
        try {
          existingConn.close();
        } catch (closeError) {
          console.warn(`⚠️ Erro ao fechar conexão inválida:`, closeError);
        }
        connectionPool.delete(database);
      }

      conn = await getDbConnection(database);
      connectionPool.set(database, conn);
      console.log(`✅ Nova conexão criada para ${database.toUpperCase()}`);
    }

    return new Promise((resolve, reject) => {
      const results: T[] = [];

      const request = new Request(sql, (err) => {
        if (err) {
          console.error(`❌ Erro na query ${database.toUpperCase()}:`, err.message);
          console.error('Código de erro:', (err as any).code);
          console.error('Estado:', (err as any).state);
          console.error('Classe:', (err as any).class);
          console.error('Número:', (err as any).number);

          // Limpar conexão do pool se houver erro de estado
          if (connectionPool.has(database)) {
            connectionPool.delete(database);
          }

          // Tentar novamente em caso de erro transitório
          if (retryCount < maxRetries && isRetryableError(err)) {
            console.log(`🔄 Tentando novamente (${retryCount + 1}/${maxRetries})...`);
            setTimeout(() => {
              executeQuery(sql, parameters, database, retryCount + 1)
                .then(resolve)
                .catch(reject);
            }, 1000 * (retryCount + 1));
            return;
          }

          reject(err);
        } else {
          const duration = Date.now() - startTime;
          console.log(`✅ Query ${database.toUpperCase()} executada com sucesso. ${results.length} registros retornados em ${duration}ms.`);

          // Manter a conexão no pool apenas se estiver em estado válido
          if (!isConnectionValid(conn)) {
            console.log(`⚠️ Removendo conexão inválida do pool após query bem-sucedida`);
            connectionPool.delete(database);
          }

          resolve(results);
        }
      });

      // Adicionar parâmetros se fornecidos
      if (parameters) {
        Object.entries(parameters).forEach(([key, value]) => {
          let type: any = TYPES.NVarChar;
          if (typeof value === 'number') {
            type = Number.isInteger(value) ? TYPES.Int : TYPES.Float;
          } else if (typeof value === 'boolean') {
            type = TYPES.Bit;
          } else if (value instanceof Date) {
            type = TYPES.DateTime;
          }
          request.addParameter(key, type, value);
        });
      }

      request.on('row', (columns: any) => {
        const row: any = {};
        columns.forEach((column: any) => {
          row[column.metadata.colName] = column.value;
        });
        results.push(row);
      });

      // Adicionar tratamento para erros durante a execução
      request.on('error', (err) => {
        console.error(`❌ Erro durante execução da query ${database.toUpperCase()}:`, err);
        console.error(`Estado da conexão: ${conn.state?.name}`);
        connectionPool.delete(database);
        reject(err);
      });

      try {
        console.log(`🚀 Executando SQL em ${database.toUpperCase()}...`);
        console.log(`Estado da conexão antes da execução: ${conn.state?.name}`);

        // Verificar se a conexão ainda está em estado válido antes de executar
        if (!isConnectionValid(conn)) {
          console.error(`❌ Conexão inválida detectada antes da execução. Estado: ${conn.state?.name}`);
          connectionPool.delete(database);
          throw new Error(`Conexão inválida para ${database.toUpperCase()}. Estado: ${conn.state?.name}`);
        }

        conn.execSql(request);
      } catch (execErr) {
        console.error(`❌ Erro ao executar SQL em ${database.toUpperCase()}:`, execErr);
        console.error(`Estado da conexão no erro: ${conn.state?.name}`);
        connectionPool.delete(database);
        reject(execErr);
      }
    });
  } catch (error) {
    console.error(`❌ Erro ao criar conexão para ${database.toUpperCase()}:`, error);

    // Tentar novamente em caso de erro de conexão
    if (retryCount < maxRetries && isConnectionError(error)) {
      console.log(`🔄 Tentando reconectar (${retryCount + 1}/${maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return executeQuery(sql, parameters, database, retryCount + 1);
    }

    throw error;
  }
}

// Função auxiliar para identificar erros que podem ser resolvidos com retry
function isRetryableError(error: any): boolean {
  const retryableCodes = ['ETIMEOUT', 'ECONNRESET', 'ENOTFOUND', 'EAI_AGAIN', '08001', '08003', '08004'];
  const retryableMessages = [
    'timeout',
    'connection',
    'loggedin state',
    'sentclientrequest state',
    'socket hang up',
    'connection lost',
    'connection closed'
  ];

  const isRetryableCode = retryableCodes.includes(error.code);
  const isRetryableMessage = retryableMessages.some(msg => error.message?.toLowerCase().includes(msg));

  return isRetryableCode || isRetryableMessage;
}

// Função auxiliar para identificar erros de conexão
function isConnectionError(error: any): boolean {
  const connectionErrors = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', '08001', '08003'];
  return connectionErrors.includes(error.code) || error.message?.includes('connect') || error.message?.includes('socket');
}

// Função para executar múltiplas consultas em lote (batch queries)
export async function executeBatchQuery(
  queries: Array<{ sql: string; parameters?: { [key: string]: any } }>,
  database: 'mapex' | 'sage' | 'whales' = 'mapex'
): Promise<any[][]> {
  const results: any[][] = [];

  for (const query of queries) {
    try {
      const result = await executeQuery(query.sql, query.parameters, database);
      results.push(result);
    } catch (error) {
      console.error(`❌ Erro na consulta em lote ${database.toUpperCase()}:`, error);
      results.push([]); // Adicionar array vazio para manter o índice
      throw error;
    }
  }

  return results;
}

// Função para consultar dados de produção de múltiplas máquinas em uma única consulta
export async function getMachinesProductionData(
  machineIds: string[],
  database: 'mapex' | 'sage' | 'whales' = 'mapex'
): Promise<any[]> {
  if (machineIds.length === 0) return [];

  const placeholders = machineIds.map((_, index) => `@machineId${index}`).join(',');
  const parameters: { [key: string]: any } = {};

  machineIds.forEach((id, index) => {
    parameters[`machineId${index}`] = id;
  });

  const sql = `
    SELECT
      cm.Cod_maquina,
      cm.Desc_maquina,
      cm.Rt_Unidades_ok_of as ok,
      cm.Rt_Unidades_nok_of as nok,
      cm.Rt_Unidades_repro_of as rw,
      cm.Rt_Desc_operario as operator,
      cm.rt_desc_turno as shift,
      cm.activo as active,
      cm.rt_id_actividad as activity_id,
      cm.rt_desc_actividad as activity_desc
    FROM cfg_maquina cm
    WHERE cm.Cod_maquina IN (${placeholders})
      AND cm.activo = 1
  `;

  try {
    return await executeQuery(sql, parameters, database);
  } catch (error) {
    console.error(`❌ Erro ao consultar dados de produção em lote:`, error);
    // Fallback: tentar consultas individuais se a consulta em lote falhar
    console.log(`🔄 Tentando consultas individuais para ${machineIds.length} máquinas...`);

    const individualResults: any[] = [];
    for (const machineId of machineIds) {
      try {
        const individualSql = `
          SELECT TOP 1
            Cod_maquina,
            Desc_maquina,
            Rt_Unidades_ok_of as ok,
            Rt_Unidades_nok_of as nok,
            Rt_Unidades_repro_of as rw,
            Rt_Desc_operario as operator,
            rt_desc_turno as shift,
            activo as active,
            rt_id_actividad as activity_id,
            rt_desc_actividad as activity_desc
          FROM cfg_maquina
          WHERE Cod_maquina = @machineId
            AND activo = 1
        `;

        const result = await executeQuery(individualSql, { machineId }, database);
        if (result.length > 0) {
          individualResults.push(result[0]);
        }
      } catch (individualError) {
        console.warn(`⚠️ Erro na consulta individual para máquina ${machineId}:`, individualError);
      }
    }

    return individualResults;
  }
}

// Função para limpar conexões do pool periodicamente
export async function cleanupConnectionPool(): Promise<void> {
  const now = Date.now();
  for (const [key, conn] of connectionPool.entries()) {
    if (conn.closed) {
      connectionPool.delete(key);
    }
  }

  if (connectionPool.size > 0) {
    console.log(`🧹 Pool de conexões limpo. ${connectionPool.size} conexões ativas.`);
  }
}

// Limpar pool a cada 5 minutos
setInterval(cleanupConnectionPool, 5 * 60 * 1000);

export async function closeDbConnection(database?: 'mapex' | 'sage' | 'whales'): Promise<void> {
  // Fechar todas as conexões do pool
  console.log(`🔒 Fechando conexões do pool para ${database || 'todas as bases'}...`);

  if (database) {
    const conn = connectionPool.get(database);
    if (conn && !conn.closed) {
      conn.close();
      connectionPool.delete(database);
    }
  } else {
    for (const [key, conn] of connectionPool.entries()) {
      if (!conn.closed) {
        conn.close();
      }
    }
    connectionPool.clear();
  }

  console.log('✅ Conexões fechadas');
}

// Cache para métricas de performance
const performanceMetrics = new Map<string, { count: number; totalTime: number; errors: number; lastError?: string }>();

// Função para registrar métricas de performance
function recordMetrics(database: string, duration: number, success: boolean, error?: string) {
  const key = `${database}_${success ? 'success' : 'error'}`;
  const existing = performanceMetrics.get(key) || { count: 0, totalTime: 0, errors: 0 };

  existing.count++;
  existing.totalTime += duration;

  if (!success) {
    existing.errors++;
    existing.lastError = error;
  }

  performanceMetrics.set(key, existing);
}

// Função para obter métricas de performance
export function getPerformanceMetrics(): { [key: string]: any } {
  const metrics: { [key: string]: any } = {};

  for (const [key, data] of performanceMetrics.entries()) {
    metrics[key] = {
      count: data.count,
      averageTime: data.count > 0 ? Math.round(data.totalTime / data.count) : 0,
      errorRate: data.count > 0 ? Math.round((data.errors / data.count) * 100) : 0,
      lastError: data.lastError
    };
  }

  return metrics;
}

// Função para testar conectividade com métricas detalhadas
export async function testConnections(): Promise<{ [key: string]: { connected: boolean; responseTime: number; error?: string } }> {
  const results: { [key: string]: { connected: boolean; responseTime: number; error?: string } } = {};

  for (const db of ['mapex', 'sage', 'whales'] as const) {
    const startTime = Date.now();

    try {
      await executeQuery('SELECT 1 as test', undefined, db);
      const responseTime = Date.now() - startTime;

      results[db] = { connected: true, responseTime };
      recordMetrics(db, responseTime, true);

      console.log(`✅ Teste de conectividade ${db.toUpperCase()}: OK (${responseTime}ms)`);
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

      results[db] = { connected: false, responseTime, error: errorMessage };
      recordMetrics(db, responseTime, false, errorMessage);

      console.error(`❌ Teste de conectividade ${db.toUpperCase()}: FALHOU (${responseTime}ms)`, error);
    }
  }

  return results;
}

// Função para obter status de saúde do banco de dados
export async function getDatabaseHealth(): Promise<{
  connections: { [key: string]: boolean };
  performance: { [key: string]: any };
  pool: { size: number; databases: string[] };
  recommendations: string[];
}> {
  const connections = await testConnections();
  const performance = getPerformanceMetrics();
  const recommendations: string[] = [];

  // Analisar conexões
  const connectedDbs = Object.entries(connections).filter(([_, status]) => status.connected);
  const failedDbs = Object.entries(connections).filter(([_, status]) => !status.connected);

  if (failedDbs.length > 0) {
    recommendations.push(`❌ ${failedDbs.length} banco(s) com problemas de conexão: ${failedDbs.map(([db]) => db.toUpperCase()).join(', ')}`);
  }

  if (connectedDbs.length === 0) {
    recommendations.push('🚨 Nenhum banco de dados conectado! Sistema pode estar inoperante.');
  }

  // Analisar performance
  for (const [key, metrics] of Object.entries(performance)) {
    if (key.includes('error') && metrics.count > 0) {
      const errorRate = metrics.errorRate;
      if (errorRate > 20) {
        recommendations.push(`⚠️ Alta taxa de erro (${errorRate}%) em ${key.split('_')[0].toUpperCase()}`);
      }
    }

    if (key.includes('success') && metrics.averageTime > 5000) {
      recommendations.push(`🐌 Performance lenta (${metrics.averageTime}ms) em ${key.split('_')[0].toUpperCase()}`);
    }
  }

  // Pool de conexões
  const poolSize = connectionPool.size;
  const poolDbs = Array.from(connectionPool.keys());

  if (poolSize > 10) {
    recommendations.push(`🔧 Pool de conexões muito grande (${poolSize}). Considere otimizar.`);
  }

  return {
    connections: Object.fromEntries(Object.entries(connections).map(([db, status]) => [db, status.connected])),
    performance,
    pool: { size: poolSize, databases: poolDbs },
    recommendations: recommendations.length > 0 ? recommendations : ['✅ Sistema operando normalmente']
  };
}