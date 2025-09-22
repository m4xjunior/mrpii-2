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
    connectTimeout: 30000,
    requestTimeout: 30000,
    enableArithAbort: true,
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
      password: '87cc88bb89.',
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

export async function executeQuery<T = any>(
  sql: string,
  parameters?: { [key: string]: any },
  database: 'mapex' | 'sage' | 'whales' = 'mapex'
): Promise<T[]> {
  const conn = await getDbConnection(database);

  return new Promise((resolve, reject) => {
    const results: T[] = [];

    const request = new Request(sql, (err) => {
      // Sempre fechar a conexão após completar a query
      try {
        conn.close();
      } catch (closeErr) {
        console.warn('⚠️ Erro ao fechar conexão:', closeErr);
      }

      if (err) {
        console.error(`❌ Erro na query ${database.toUpperCase()}:`, err);
        console.error('SQL:', sql.substring(0, 200) + '...');
        reject(err);
      } else {
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

    try {
      conn.execSql(request);
    } catch (execErr) {
      // Se houver erro na execução, fechar conexão e rejeitar
      try {
        conn.close();
      } catch (closeErr) {
        console.warn('⚠️ Erro ao fechar conexão após falha:', closeErr);
      }
      reject(execErr);
    }
  });
}

export async function closeDbConnection(database?: 'mapex' | 'sage' | 'whales'): Promise<void> {
  // Como agora criamos uma nova conexão para cada query e fechamos automaticamente,
  // esta função é mantida por compatibilidade mas não faz mais sentido
  console.log('ℹ️ Conexões agora são gerenciadas automaticamente por query');
}

// Função para testar conectividade
export async function testConnections(): Promise<{ [key: string]: boolean }> {
  const results: { [key: string]: boolean } = {};

  for (const db of ['mapex', 'sage', 'whales'] as const) {
    try {
      await executeQuery('SELECT 1 as test', undefined, db);
      results[db] = true;
      console.log(`✅ Teste de conectividade ${db.toUpperCase()}: OK`);
    } catch (error) {
      results[db] = false;
      console.error(`❌ Teste de conectividade ${db.toUpperCase()}: FALHOU`, error);
    }
  }

  return results;
}