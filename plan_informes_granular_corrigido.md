# 🚨 PLANO DE CORREÇÃO: Página Informes com Dados Reais por Máquina/OF

## ❌ **Problemas Identificados**

1. **Página não filtra por máquina/OF específica** - mostra dados genéricos
2. **Dados não variam com datas** - sempre mostra os mesmos valores
3. **Uso de dados hardcoded/mock** - não consome dados reais do banco
4. **Falta granularidade por turno** - dados agregados, não separados

## ✅ **Correções Necessárias**

### **1. Filtragem Correta por Máquina/OF**
```sql
-- CORRETO: Filtrar por máquina específica da OF
SELECT * FROM cfg_maquina cm
WHERE cm.Rt_Cod_of = ?  -- OF específica
  AND cm.Activo = 1     -- Máquina ativa
```

### **2. Join Correto das Tabelas**
```sql
-- cfg_maquina → his_fase → his_prod
FROM cfg_maquina cm
INNER JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
INNER JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ?  -- Filtrar por OF específica
  AND hp.Fecha_ini >= ? -- Data início
  AND hp.Fecha_fin <= ? -- Data fim
```

### **3. Separação por Turno Real**
```sql
-- Usar his_prod.Id_turno ou determinar por hora
CASE
  WHEN hp.Id_turno = 1 THEN 'MAÑANA'
  WHEN hp.Id_turno = 2 THEN 'TARDE'
  WHEN hp.Id_turno = 3 THEN 'NOCHE'
  -- OU por horário se Id_turno não estiver preenchido
  WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
  WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
  ELSE 'NOCHE'
END as turno
```

### **4. Cálculos Reais por Turno**
- **OEE**: Ag_Rt_OEE_Turno da máquina OU calcular (Disponibilidad × Rendimiento × Calidad)
- **Rendimiento**: Ag_Rt_Rend_Turno da máquina
- **Disponibilidad**: Ag_Rt_Disp_Turno da máquina
- **Calidad**: Ag_Rt_Cal_Turno da máquina
- **Unidades**: SUM(hp.Unidades_ok), SUM(hp.Unidades_nok), SUM(hp.Unidades_repro)
- **Velocidad**: Calcular baseado em tempo e unidades produzidas

## 🏗️ **Nova Implementação**

### **Layout: 3 Colunas Lado a Lado**
```
┌─────────────────┬─────────────────┬─────────────────┐
│   MAÑANA        │    TARDE        │    NOCHE        │
│   (06:00-14:00) │  (14:00-22:00) │  (22:00-06:00) │
├─────────────────┼─────────────────┼─────────────────┤
│ OEE: XX.X%      │ OEE: XX.X%      │ OEE: XX.X%      │
│ Rend: XX.X%     │ Rend: XX.X%     │ Rend: XX.X%     │
│ Disp: XX.X%     │ Disp: XX.X%     │ Disp: XX.X%     │
│ Cal: XX.X%      │ Cal: XX.X%      │ Cal: XX.X%      │
│                 │                 │                 │
│ OK: XXX         │ OK: XXX         │ OK: XXX         │
│ NOK: XX         │ NOK: XX         │ NOK: XX         │
│ RWK: X          │ RWK: X          │ RWK: X          │
│                 │                 │                 │
│ Vel: XX.X u/h   │ Vel: XX.X u/h   │ Vel: XX.X u/h   │
│ XX.X seg/pza    │ XX.X seg/pza    │ XX.X seg/pza    │
└─────────────────┴─────────────────┴─────────────────┘
```

### **API Response Structure**
```json
{
  "filtros": {
    "of": "2025-SEC09-2725-2025-5478",
    "desde": "2025-09-25",
    "hasta": "2025-09-25"
  },
  "turnos": [
    {
      "turno": "MAÑANA",
      "oee": 85.5,
      "rendimiento": 88.2,
      "disponibilidad": 92.1,
      "calidad": 94.3,
      "piezas_ok": 245,
      "piezas_nok": 12,
      "piezas_rwk": 5,
      "tiempo_prod_s": 7200,
      "velocidad_uh": 122.5,
      "velocidad_seg_pza": 29.4,
      "operadores": 2
    },
    {
      "turno": "TARDE",
      "oee": 78.8,
      "rendimiento": 85.5,
      "disponibilidad": 89.2,
      "calidad": 91.7,
      "piezas_ok": 198,
      "piezas_nok": 8,
      "piezas_rwk": 3,
      "tiempo_prod_s": 6800,
      "velocidad_uh": 118.2,
      "velocidad_seg_pza": 30.4,
      "operadores": 2
    },
    {
      "turno": "NOCHE",
      "oee": 82.1,
      "rendimiento": 87.3,
      "disponibilidad": 90.8,
      "calidad": 93.2,
      "piezas_ok": 167,
      "piezas_nok": 5,
      "piezas_rwk": 2,
      "tiempo_prod_s": 6500,
      "velocidad_uh": 115.8,
      "velocidad_seg_pza": 31.1,
      "operadores": 2
    }
  ],
  "of_data": {
    "cod_of": "2025-SEC09-2725-2025-5478",
    "desc_producto": "TURBOBENDER",
    "unidades_planning": 1000,
    "unidades_ok": 610,
    "unidades_nok": 25,
    "unidades_rw": 10,
    "fecha_ini": "2025-09-25T08:15:00Z",
    "fecha_fin_estimada": "2025-09-26T16:30:00Z",
    "oee_of": 82.3,
    "rendimiento_of": 87.1
  },
  "maquina_info": {
    "cod_maquina": "TB001",
    "desc_maquina": "TURBOBENDER",
    "id_maquina": 42
  },
  "hasRealData": true,
  "debugInfo": {
    "totalRegistros": 145,
    "máquinaEncontrada": true,
    "ofEncontrada": true
  }
}
```

## 🔧 **Implementação Técnica**

### **Queries Corretas por Turno**
```sql
-- Query principal por turno
SELECT
  CASE
    WHEN hp.Id_turno = 1 THEN 'MAÑANA'
    WHEN hp.Id_turno = 2 THEN 'TARDE'
    WHEN hp.Id_turno = 3 THEN 'NOCHE'
    ELSE CASE
      WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
      WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
      ELSE 'NOCHE'
    END
  END as turno,

  -- KPIs consolidados da máquina (usar valores reais do banco)
  AVG(cm.Ag_Rt_OEE_Turno) as oee,
  AVG(cm.Ag_Rt_Rend_Turno) as rendimiento,
  AVG(cm.Ag_Rt_Disp_Turno) as disponibilidad,
  AVG(cm.Ag_Rt_Cal_Turno) as calidad,

  -- Unidades produzidas
  SUM(hp.Unidades_ok) as piezas_ok,
  SUM(hp.Unidades_nok) as piezas_nok,
  SUM(hp.Unidades_repro) as piezas_rwk,

  -- Tempos
  SUM(DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin)) as tiempo_prod_s,

  -- Velocidades calculadas
  AVG(CASE WHEN (hp.Unidades_ok + hp.Unidades_nok + hp.Unidades_repro) > 0
           THEN 3600.0 / (DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) * 1.0 /
                          (hp.Unidades_ok + hp.Unidades_nok + hp.Unidades_repro))
           ELSE 0 END) as velocidad_uh,

  AVG(CASE WHEN (hp.Unidades_ok + hp.Unidades_nok + hp.Unidades_repro) > 0
           THEN DATEDIFF(SECOND, hp.Fecha_ini, hp.Fecha_fin) * 1.0 /
                (hp.Unidades_ok + hp.Unidades_nok + hp.Unidades_repro)
           ELSE 0 END) as velocidad_seg_pza,

  -- Operadores
  COUNT(DISTINCT hp.Id_operario) as operadores

FROM cfg_maquina cm
INNER JOIN his_fase hf ON cm.Rt_Id_his_fase = hf.Id_his_fase
INNER JOIN his_prod hp ON hf.Id_his_fase = hp.Id_his_fase
WHERE cm.Rt_Cod_of = ?                    -- FILTRAR POR OF ESPECÍFICA
  AND cm.Activo = 1                       -- Máquina ativa
  AND hp.Fecha_ini >= ?                   -- Data início
  AND hp.Fecha_fin <= ?                   -- Data fim
  AND hp.Activo = 1                       -- Registro ativo
GROUP BY CASE
  WHEN hp.Id_turno = 1 THEN 'MAÑANA'
  WHEN hp.Id_turno = 2 THEN 'TARDE'
  WHEN hp.Id_turno = 3 THEN 'NOCHE'
  ELSE CASE
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14 THEN 'MAÑANA'
    WHEN DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22 THEN 'TARDE'
    ELSE 'NOCHE'
  END
END
ORDER BY CASE
  WHEN hp.Id_turno = 1 OR (DATEPART(HOUR, hp.Fecha_ini) >= 6 AND DATEPART(HOUR, hp.Fecha_ini) < 14) THEN 1
  WHEN hp.Id_turno = 2 OR (DATEPART(HOUR, hp.Fecha_ini) >= 14 AND DATEPART(HOUR, hp.Fecha_ini) < 22) THEN 2
  ELSE 3
END;
```

### **Informações da Máquina**
```sql
-- Buscar informações da máquina específica da OF
SELECT TOP 1
  cm.Id_maquina,
  cm.Cod_maquina,
  cm.Desc_maquina,
  cm.Rt_Cod_of,
  cm.Activo
FROM cfg_maquina cm
WHERE cm.Rt_Cod_of = ?  -- OF específica
  AND cm.Activo = 1
ORDER BY cm.Id_maquina;
```

## ✅ **Validação**

### **Cenários de Teste**
1. **OF com dados reais**: Deve mostrar valores específicos da máquina/OF
2. **OF sem dados**: Deve mostrar mensagem "No hay datos para esta OF en el período seleccionado"
3. **Datas diferentes**: Valores devem variar conforme período selecionado
4. **Máquina diferente**: Cada OF deve mostrar dados da sua máquina específica

### **Critérios de Aceitação**
- ✅ Dados filtrados por máquina/OF específica via `cfg_maquina.Rt_Cod_of`
- ✅ Queries usam datas para filtrar período real
- ✅ NENHUM dado hardcoded/mock - só dados do banco
- ✅ 3 colunas por turno com dados específicos
- ✅ Validação se OF existe e tem máquina vinculada
- ✅ Fallback elegante quando não há dados

## 🚀 **Implementação**

Este plano corrige todos os problemas identificados, garantindo que a página Informes mostre dados reais, específicos por máquina/OF e com granularidade por turno.