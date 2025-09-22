# Sistema SCADA - Grupo KH

## Status do Sistema ✅

O servidor SCADA foi iniciado com sucesso e está funcionando corretamente!

### 🚀 Servidor Ativo
- **URL Principal:** http://localhost:8000
- **Status:** Online e operacional
- **Modo:** PHP embutido com router personalizado

### 📊 Dados das Máquinas
Como não foi possível conectar aos bancos de dados externos (SQL Server), o sistema está utilizando **dados mock/simulados** que fornecem:

- ✅ 6 máquinas industriais ativas
- ✅ Dados em tempo real de produção (OK, NOK, RW)
- ✅ Cálculos de OEE e rendimento
- ✅ Status de atividade das máquinas
- ✅ Informações de produtos e ordens de fabricação

### 🎯 Funcionalidades Disponíveis

#### 1. **Sistema Principal SCADA**
- **Arquivo:** `scadaPlanta.php`
- **URL:** http://localhost:8000/scadaPlanta.php
- **Funcionalidade:** Monitoramento completo das máquinas com dados mock

#### 2. **Demonstração Interativa**
- **Arquivo:** `demo_scada.html`
- **URL:** http://localhost:8000/demo_scada.html
- **Funcionalidade:** Interface moderna com atualização automática dos dados

#### 3. **Dados Mock Puros**
- **Arquivo:** `scadaPlanta_mock.php`
- **URL:** http://localhost:8000/scadaPlanta_mock.php
- **Funcionalidade:** Dados simulados sem interface complexa

#### 4. **Teste de Conexão**
- **Arquivo:** `test_db.php`
- **URL:** http://localhost:8000/test_db.php
- **Funcionalidade:** Verificação do status de conexão com bancos de dados

### 🔧 Arquitetura Técnica

```
SCADA System Architecture
├── Frontend (HTML/CSS/JavaScript)
│   ├── index.html - Interface principal touchscreen
│   ├── scadaPlantav2.html - Versão moderna
│   └── demo_scada.html - Demonstração criada
├── Backend (PHP)
│   ├── scadaPlanta.php - Sistema principal
│   ├── scadaPlanta_mock.php - Dados simulados
│   └── router.php - Roteamento personalizado
├── Database Layer
│   ├── MAPEX (SQL Server) - ❌ Não conectado
│   ├── SAGE (SQL Server) - ❌ Não conectado
│   └── WHALES (SQL Server) - ❌ Não conectado
└── Mock Data Layer ✅
    └── Dados simulados funcionando perfeitamente
```

### 📈 Métricas Monitoradas

O sistema está monitorando as seguintes métricas para cada máquina:

- **Produção:** Unidades OK, NOK e Reprocessamento (RW)
- **OEE (Overall Equipment Effectiveness):** Eficiência geral do equipamento
- **Rendimento:** Percentual de produção vs planejamento
- **Status:** Ativa/Inativa com códigos de atividade
- **Produtos:** Código do produto e descrição
- **Ordens:** Código da ordem de fabricação (OF)
- **Tempo:** Cálculos de tempo de produção e estimativas

### 🎨 Interface

- **Design Responsivo:** Funciona em desktop e dispositivos móveis
- **Tema Industrial:** Cores adequadas para ambiente fabril
- **Indicadores Visuais:** Status coloridos (verde=ativo, vermelho=inativo)
- **Barras de Progresso:** Visualização do percentual completado
- **Ícones Modernos:** FontAwesome para melhor UX

### 🔄 Funcionamento em Tempo Real

- **Atualização Automática:** Dados são atualizados a cada 30 segundos
- **Persistência:** Servidor mantém dados mock consistentes
- **Simulação:** Pequenas variações nos dados para simular produção real

### 🚨 Próximos Passos (quando bancos reais ficarem disponíveis)

1. **Configurar ODBC:** Verificar configurações de conexão
2. **Testar Credenciais:** Validar usuário/senha dos bancos
3. **Verificar Rede:** Confirmar conectividade com servidores SQL
4. **Migrar para Dados Reais:** Substituir dados mock por dados reais
5. **Otimizar Consultas:** Melhorar performance das queries SQL

### 📞 Acesso ao Sistema

Abra seu navegador e acesse:
- **Demonstração Principal:** http://localhost:8000/demo_scada.html
- **Sistema Original:** http://localhost:8000/scadaPlanta.php
- **Interface Touch:** http://localhost:8000/index.html

---

**✅ Sistema totalmente funcional com dados mock!**

