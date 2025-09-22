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

  useEffect(() => {
    if (machineId) {
      fetchOEEData();
    }
  }, [machineId, days]);

  const fetchOEEData = async () => {
    if (!machineId) return;

    setLoading(true);
    setError(null);

    try {
      console.log(`📊 Buscando datos OEE para ${machineId} - ${days} días`);

      const response = await fetch(`/api/oee-simple?machineId=${machineId}&days=${days}&type=all`);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Datos OEE recibidos:`, result.data);
        setData(result.data);
      } else {
        throw new Error(result.error || 'Error desconocido');
      }
    } catch (err) {
      console.error('❌ Error cargando datos OEE:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchOEEData();
  };

  return {
    data,
    loading,
    error,
    refreshData
  };
}

