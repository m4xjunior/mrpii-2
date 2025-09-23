import { useState, useEffect } from 'react';

interface OEEData {
  oee_history: Array<{
    periodo: string;
    oee: number;
    disponibilidad: number;
    rendimiento: number;
    calidad: number;
    total_ok: number;
    total_nok: number;
    total_rw: number;
    num_paros: number;
    tiempo_parado: number;
    tiempo_parado_planificado: number;
  }>;
  production: Array<{
    periodo: string;
    piezas_ok: number;
    piezas_nok: number;
    piezas_rw: number;
    eficiencia: number;
    velocidad_promedio: number;
  }>;
  downtime: Array<{
    periodo: string;
    num_paros: number;
    tiempo_parado_horas: number;
    tiempo_parado_planificado_horas: number;
    causas: string;
    es_planificado: boolean;
  }>;
  summary: {
    avg_oee: number;
    avg_disponibilidad: number;
    avg_rendimiento: number;
    avg_calidad: number;
    total_production: number;
    total_downtime_hours: number;
    total_records: number;
    period_days: number;
    eficiencia: number;
  };
}

export function useOEEData(machineId: string | null, days: number = 7) {
  const [data, setData] = useState<OEEData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (machineId) {
      fetchOEEData();
      
      // Configurar atualização automática a cada 30 segundos
      const interval = setInterval(() => {
        if (machineId) {
          fetchOEEData(true); // silent update
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [machineId, days]);

  const fetchOEEData = async (silent: boolean = false) => {
    if (!machineId) return;

    if (!silent) {
      setLoading(true);
      setError(null);
    }

    try {
      console.log(`📊 ${silent ? 'Actualizando' : 'Buscando'} datos OEE para ${machineId} - ${days} días`);

      const response = await fetch(`/api/oee-simple?machineId=${machineId}&days=${days}&type=all&timestamp=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Datos OEE ${silent ? 'actualizados' : 'recibidos'}:`, result.data);
        setData(result.data);
        setLastUpdate(new Date());
        
        // Calcular insights em tempo real
        calculateRealTimeInsights(result.data);
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (err) {
      console.error(`❌ Error ${silent ? 'actualizando' : 'cargando'} datos OEE:`, err);
      if (!silent) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const calculateRealTimeInsights = (oeeData: OEEData) => {
    if (!oeeData || !oeeData.oee_history || oeeData.oee_history.length === 0) return;

    const insights = {
      tendencia_oee: calculateTrend(oeeData.oee_history.map(item => item.oee)),
      tendencia_disponibilidad: calculateTrend(oeeData.oee_history.map(item => item.disponibilidad)),
      tendencia_rendimiento: calculateTrend(oeeData.oee_history.map(item => item.rendimiento)),
      tendencia_calidad: calculateTrend(oeeData.oee_history.map(item => item.calidad)),
      alertas: generateAlerts(oeeData),
      recomendaciones: generateRecommendations(oeeData)
    };

    // Enviar insights para o componente principal (via evento ou callback)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oee-insights-updated', {
        detail: { machineId, insights, timestamp: new Date() }
      }));
    }
  };

  const refreshData = () => {
    fetchOEEData();
  };

  return {
    data,
    loading,
    error,
    refreshData,
    lastUpdate
  };
}

// Funções auxiliares para cálculos em tempo real
function calculateTrend(data: number[]): 'ascendente' | 'descendente' | 'estable' {
  if (data.length < 2) return 'estable';
  
  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const difference = avgSecond - avgFirst;
  
  if (difference > 2) return 'ascendente';
  if (difference < -2) return 'descendente';
  return 'estable';
}

function generateAlerts(oeeData: OEEData): any[] {
  const alerts = [];
  
  if (oeeData.summary?.avg_oee < 60) {
    alerts.push({
      tipo: 'OEE_BAJO',
      severidad: 'ALTA',
      mensaje: `OEE promedio (${oeeData.summary.avg_oee}%) está por debajo del objetivo (60%)`,
      accion: 'Revisar causas de baja eficiencia'
    });
  }
  
  if (oeeData.summary?.avg_disponibilidad < 70) {
    alerts.push({
      tipo: 'DISPONIBILIDAD_BAJA',
      severidad: 'MEDIA',
      mensaje: `Disponibilidad (${oeeData.summary.avg_disponibilidad}%) afecta el OEE general`,
      accion: 'Analizar tiempos de parada'
    });
  }
  
  if (oeeData.downtime && oeeData.downtime.length > 0) {
    const totalDowntime = oeeData.downtime.reduce((sum, item) => sum + (item.tiempo_parado_horas || 0), 0);
    if (totalDowntime > 24) { // Más de 24 horas de parada
      alerts.push({
        tipo: 'PARADAS_EXCESIVAS',
        severidad: 'CRITICA',
        mensaje: `Total de ${totalDowntime.toFixed(1)} horas de parada en el período`,
        accion: 'Priorizar mantenimiento preventivo'
      });
    }
  }
  
  return alerts;
}

function generateRecommendations(oeeData: OEEData): any[] {
  const recommendations = [];
  
  if (oeeData.summary?.avg_calidad < 95) {
    recommendations.push({
      accion: 'MEJORAR_CALIDAD',
      descripcion: 'Implementar controles de calidad más estrictos',
      impacto: 'Alto',
      roi_estimado: 15000
    });
  }
  
  if (oeeData.summary?.avg_rendimiento < 80) {
    recommendations.push({
      accion: 'OPTIMIZAR_VELOCIDAD',
      descripcion: 'Ajustar parámetros de velocidad de producción',
      impacto: 'Medio',
      roi_estimado: 8000
    });
  }
  
  if (oeeData.downtime && oeeData.downtime.length > 5) {
    recommendations.push({
      accion: 'REDUCIR_PARADAS',
      descripcion: 'Implementar programa de mantenimiento predictivo',
      impacto: 'Alto',
      roi_estimado: 25000
    });
  }
  
  return recommendations;
}

