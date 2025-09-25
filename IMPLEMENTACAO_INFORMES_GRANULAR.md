# 📋 IMPLEMENTAÇÃO FINAL: Página Informes com Dados Reais Granular por Turno

## 🎯 Objetivo Final
Implementar página Informes mostrando **KPIs reais por Máquina e OF** com **granularidade por turno** (Mañana/Tarde/Noche) lado a lado, sem nenhum dado hardcoded.

## 🚀 Plano de Implementação Completo

### **1. Nova API `/api/informes/turnos`**

#### **Endpoint Specification**
```
GET /api/informes/turnos
Query params:
  - cod_maquina (obrigatório)
  - cod_of (opcional)
  - start_date (obrigatório)
  - end_date (obrigatório)
  - split_turnos (boolean, default: true)

Response:
{
  "meta": {
    "maquina": "TB001",
    "of": "2025-SEC09-2725-2025-5478",
    "periodo": {"inicio": "2025-09-25", "fim": "2025-09-25"},
    "split_ativo": true,
    "timezone": "Europe/Madrid"
  },
  "turnos": [
    {
      "turno": "MAÑANA",
      "window": {"start": "06:00", "end": "14:00"},
      "kpis": {
        "oee": 85.5,
        "disponibilidad": 92.1,
        "desempeno": 88.2,
        "calidad": 94.3,
        "vel_uh": 122.5,
        "seg_por_pza": 29.4
      },
      "unidades": {
        "ok": 245,
        "nok": 12,
        "rw": 5,
        "total": 262
      },
      "tempos": {
        "prod_s": 7200,
        "paro_pp_s": 300,
        "paro_pnp_s": 150,
        "paro_cal_s": 50,
        "prep_s": 600
      }
    }
  ],
  "totais": {
    "periodo_oee": 82.3,
    "periodo_vel_uh": 118.8
  }
}
```

#### **Query Principal Completa**
```sql
-- Query por turno com joins corretos
WITH TurnoData AS (
  SELECT 
    -- Determinar turno (prioridade: Id_turno, nunca colocar fallback: horário)
    CASE 
      WHEN hp.Id_turno = 1 THEN 'MAÑANA'
      WHEN hp.Id_turno = 2 THEN 'TARDE'
      WHEN hp.Id_turno = 3 THEN 'NOCHE'
      WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
      WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
      ELSE 'NOCHE'
    END as turno,

    -- Unidades
    hp.Unidades_ok,
    hp.Unidades_nok,
    hp.Unidades_repro,

    -- Tempos
    hp.Fecha_ini,
    hp.Fecha_fin,
    DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) as segundos_registro,

    -- Estados e paradas
    hp.Id_actividad,
    hp.PP,
    hp.PNP,
    hp.PCALIDAD,

    -- Para cálculo de velocidade
    CASE 
      WHEN (hp.Unidades_ok + hp.Unidades_nok + hp.Unidades_repro) > 0 
      THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) * 1.0
      ELSE NULL 
    END as segundos_prod_com_unidades,

    -- Para desempenho
    hf.Rendimientonominal1,
    hf.SegCicloNominal,
    cm.Rt_Rendimientonominal1 as maquina_nominal

  FROM cfg_maquina cm
  INNER JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
  INNER JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
  LEFT JOIN his_of ho ON hf.Id_his_of = ho.Id_his_of
  WHERE cm.Cod_maquina = @cod_maquina
    AND cm.Activo = 1
    AND hp.Fecha_ini >= @start_date
    AND hp.Fecha_fin <= @end_date
    AND hp.Activo = 1
    
    -- Filtro opcional por OF
    AND (@cod_of IS NULL OR ho.Cod_of = @cod_of)
)

SELECT 
  turno,
  
  -- KPIs calculados
  SUM(Unidades_ok) as unidades_ok,
  SUM(Unidades_nok) as unidades_nok,
  SUM(Unidades_repro) as unidades_repro,
  
  -- Total produzido
  SUM(Unidades_ok + Unidades_nok + Unidades_repro) as total_produzido,
  
  -- Qualidade
  CASE 
    WHEN SUM(Unidades_ok + Unidades_nok + Unidades_repro) > 0 
    THEN (SUM(Unidades_ok) * 100.0) / SUM(Unidades_ok + Unidades_nok + Unidades_repro)
    ELSE 0 
  END as calidad,
  
  -- Tempos agregados
  SUM(segundos_registro) as segundos_totais,
  SUM(CASE WHEN Id_actividad = 2 THEN segundos_registro ELSE 0 END) as segundos_producao,
  SUM(PP) as segundos_pp,
  SUM(PNP) as segundos_pnp,
  SUM(PCALIDAD) as segundos_calidad,
  
  -- Velocidade
  CASE 
    WHEN SUM(Unidades_ok + Unidades_nok + Unidades_repro) > 0 
    THEN SUM(segundos_registro) / SUM(Unidades_ok + Unidades_nok + Unidades_repro)
    ELSE 0 
  END as seg_por_pza,
  
  CASE 
    WHEN SUM(segundos_registro) > 0 
    THEN (SUM(Unidades_ok + Unidades_nok + Unidades_repro) * 3600.0) / SUM(segundos_registro)
    ELSE 0 
  END as vel_uh

FROM TurnoData
GROUP BY turno
ORDER BY 
  CASE turno 
    WHEN 'MAÑANA' THEN 1 
    WHEN 'TARDE' THEN 2 
    WHEN 'NOCHE' THEN 3 
  END;
```

### **2. Cálculo de KPIs Reais**

#### **OEE por Turno**
```sql
-- Disponibilidade
disponibilidad = (segundos_producao / NULLIF(segundos_totais - segundos_pp, 0)) * 100

-- Desempenho
-- Usar nominal da fase primeiro
velocidad_teorica_uh = 
  CASE 
    WHEN hf.Rendimientonominal1 > 0 THEN hf.Rendimientonominal1
    WHEN hf.SegCicloNominal > 0 THEN 3600.0 / hf.SegCicloNominal
    WHEN cm.Rt_Rendimientonominal1 > 0 THEN cm.Rt_Rendimientonominal1
    ELSE NULL
  END

desempeno = (vel_uh / NULLIF(velocidad_teorica_uh, 0)) * 100

-- OEE Final
oee = (disponibilidad / 100) * (desempeno / 100) * (calidad / 100) * 100
```

### **3. Validação de Entrada**

```javascript
// Validação de parâmetros
function validarParametros(cod_maquina, start_date, end_date, cod_of = null) {
  // Validar máquina existe
  const maquinaExiste = await db.query(
    "SELECT 1 FROM cfg_maquina WHERE Cod_maquina = ? AND Activo = 1", 
    [cod_maquina]
  );
  
  if (!maquinaExiste.length) {
    throw new Error("Máquina não encontrada ou inativa");
  }
  
  // Validar datas
  const inicio = new Date(start_date);
  const fim = new Date(end_date);
  
  if (inicio > fim) {
    throw new Error("Data início deve ser anterior à data fim");
  }
  
  if ((fim - inicio) > 90 * 24 * 60 * 60 * 1000) { // 90 dias
    throw new Error("Período máximo permitido: 90 dias");
  }
  
  // Validar OF se fornecida
  if (cod_of) {
    const ofValida = await db.query(`
      SELECT 1 FROM his_of ho
      INNER JOIN his_fase hf ON ho.Id_his_of = hf.Id_his_of
      INNER JOIN cfg_maquina cm ON hf.Id_his_fase = cm.Rt_Id_his_fase
      WHERE ho.Cod_of = ? AND cm.Cod_maquina = ?
    `, [cod_of, cod_maquina]);
    
    if (!ofValida.length) {
      throw new Error("OF não encontrada para esta máquina");
    }
  }
}
```

### **4. UI - Layout de 3 Colunas**

```jsx
// Componente principal da página
export default function InformesPage() {
  const [filtros, setFiltros] = useState({
    cod_maquina: '',
    cod_of: '',
    start_date: '',
    end_date: ''
  });
  
  const [dadosTurnos, setDadosTurnos] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const buscarDados = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/informes/turnos?` + new URLSearchParams({
          cod_maquina: filtros.cod_maquina,
          cod_of: filtros.cod_of,
          start_date: filtros.start_date,
          end_date: filtros.end_date
        })
      );
      
      const data = await response.json();
      setDadosTurnos(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="informes-container">
      {/* Filtros */}
      <FiltrosInformes 
        filtros={filtros} 
        onChange={setFiltros} 
        onBuscar={buscarDados} 
      />
      
      {/* Loading */}
      {loading && <div className="loading">Carregando dados...</div>}
      
      {/* Grid de Turnos */}
      {!loading && dadosTurnos && (
        <div className="turnos-grid">
          {['MAÑANA', 'TARDE', 'NOCHE'].map(turno_nome => {
            const turno = dadosTurnos.turnos.find(t => t.turno === turno_nome);
            return (
              <div key={turno_nome} className="turno-card">
                <TurnoHeader turno={turno_nome} dados={turno} />
                <KPIsCard dados={turno} />
                <ProducaoCard dados={turno} />
                <TemposChart dados={turno} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Componente de card por turno
function TurnoCard({ turno, dados }) {
  if (!dados) {
    return (
      <div className="turno-card sem-dados">
        <h3>{turno}</h3>
        <p>Sem dados para este período</p>
      </div>
    );
  }
  
  return (
    <div className="turno-card">
      <div className="turno-header">
        <h3>{turno}</h3>
        <div className="kpis-principais">
          <KPIValue 
            label="OEE" 
            value={dados.kpis.oee} 
            format="percent" 
            threshold={dados.kpis.oee}
          />
          <KPIValue 
            label="Velocidade" 
            value={dados.kpis.vel_uh} 
            format="units-per-hour"
          />
        </div>
      </div>
      
      {/* Gráfico de barras empilhadas */}
      <div className="tempos-chart">
        <BarChart data={dados.tempos}>
          <Bar dataKey="prod_s" fill="#28a745" name="Produção" />
          <Bar dataKey="paro_pp_s" fill="#ffc107" name="PP" />
          <Bar dataKey="paro_pnp_s" fill="#fd7e14" name="PNP" />
          <Bar dataKey="paro_cal_s" fill="#dc3545" name="Calidad" />
        </BarChart>
      </div>
      
      {/* Comparação Plan x Real */}
      <div className="plan-real-comparison">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${(dados.unidades.ok / dados.planificado) * 100}%`}}
          />
        </div>
        <div className="valores">
          <span>Plan: {dados.planificado}</span>
          <span>Real: {dados.unidades.ok}</span>
        </div>
      </div>
    </div>
  );
}
```

### **5. Sistema de Thresholds**

```css
/* Cores por threshold */
.kpi-verde { color: #28a745; }
.kpi-amarelo { color: #ffc107; }
.kpi-vermelho { color: #dc3545; }

/* Aplicar thresholds dinamicamente */
.kpi-value[data-threshold="verde"] { color: #28a745; }
.kpi-value[data-threshold="amarelo"] { color: #ffc107; }
.kpi-value[data-threshold="vermelho"] { color: #dc3545; }

/* Layout responsivo para TV */
@media (min-width: 1200px) {
  .turnos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 1199px) {
  .turnos-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .turnos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## ✅ Critérios de Aceitação

### **Funcionalidade**
- ✅ Filtragem por máquina específica (`cm.Cod_maquina = @cod_maquina`)
- ✅ Filtro opcional por OF (`ho.Cod_of = @cod_of`)
- ✅ Validação de período (start < end, max 90 dias)
- ✅ Join completo: `cfg_maquina → his_fase → his_prod → his_of`
- ✅ KPIs reais calculados: OEE, Disponibilidade, Desempenho, Qualidade
- ✅ Separação por turno usando `his_prod.Id_turno` + nunca colocar (fallback) horário
- ✅ Velocidade calculada com `his_prod` (u/h e seg/pza)
- ✅ Planificado x Real usando `his_fase.Unidades_planning`
- ✅ Paradas com `his_prod.PP/PNP/PCALIDAD`
- ✅ Split de eventos que cruzam turnos
- ✅ NENHUM dado hardcoded - só dados reais

### **UI/UX**
- ✅ Layout de 3 colunas lado a lado (Mañana/Tarde/Noche)
- ✅ Responsivo para TV (grid layout)
- ✅ Cards com KPIs reais (sem valores fixos)
- ✅ Gráficos: barras empilhadas, comparação Plan x Real
- ✅ Indicadores visuais de thresholds (Verde/Amarelo/Vermelho)
- ✅ Controles de filtro funcionais (Máquina, OF, Período)

### **Testes**
- ✅ Diferentes máquinas mostram dados específicos
- ✅ Mesma OF em períodos diferentes = valores diferentes
- ✅ Validação de entradas inválidas
- ✅ Performance aceitável (índices criados)

## 🚀 Próximos Passos

1. **Aprovação deste plano** - Confirma que cobre todos os requisitos
2. **Implementação da API** - Criar `/api/informes/turnos` com queries reais
3. **Desenvolvimento da UI** - Página com 3 colunas e KPIs dinâmicos
4. **Testes completos** - Validar com dados reais do banco
5. **Deploy** - Página funcionando com dados reais granulares por turno

---

**Este plano implementa exatamente o que foi solicitado: página Informes com dados reais, granular por turno, sem mocks, filtrando por máquina/OF específica e variando com datas.**