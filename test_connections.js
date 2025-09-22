const { testConnections } = require('./scada-web-app/lib/database/connection.ts');

async function testAllConnections() {
  console.log('🔍 Testando conectividade com todas as bases de dados...');
  try {
    const results = await testConnections();
    console.log('📊 Resultados do teste:', results);

    const successful = Object.values(results).filter(r => r).length;
    const total = Object.keys(results).length;

    console.log(`✅ ${successful}/${total} conexões bem-sucedidas`);

    if (successful === total) {
      console.log('🎉 Todas as conexões estão funcionando!');
    } else {
      console.log('⚠️ Algumas conexões falharam. Verifique a configuração.');
    }
  } catch (error) {
    console.error('❌ Erro ao testar conexões:', error);
  }
}

testAllConnections();
