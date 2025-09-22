import { useState, useEffect, useCallback } from 'react';

interface ProductionData {
  machineId: string;
  machineName: string;
  ok: number;
  nok: number;
  rw: number;
  total: number;
  efficiency: number;
  timestamp: string;
  operator?: string;
  shift?: string;
}

interface ProductionSummary {
  totalOk: number;
  totalNok: number;
  totalRw: number;
  totalProduction: number;
  averageEfficiency: number;
  machines: ProductionData[];
  timestamp: string;
}

interface UseProductionDataReturn {
  data: ProductionData[];
  summary: ProductionSummary | null;
  isLoading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refreshData: () => Promise<void>;
}

export function useProductionData(
  refreshInterval: number = 60000, // 1 minuto por defecto
  autoRefresh: boolean = true
): UseProductionDataReturn {
  const [data, setData] = useState<ProductionData[]>([]);
  const [summary, setSummary] = useState<ProductionSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/scada/production');

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
        setSummary(result.summary);
        setLastUpdate(new Date());
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('❌ Error al obtener datos de producción:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Cargar datos iniciales
    fetchData();

    // Configurar actualización automática si está habilitada
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [fetchData, autoRefresh, refreshInterval]);

  return {
    data,
    summary,
    isLoading,
    error,
    lastUpdate,
    refreshData
  };
}

// Hook específico para datos históricos
export function useHistoricalProductionData(
  days: number = 7,
  machineId?: string
) {
  const [data, setData] = useState<ProductionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = `/api/scada/production/historical?days=${days}${machineId ? `&machineId=${machineId}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('❌ Error al obtener datos históricos:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [days, machineId]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  return {
    data,
    isLoading,
    error,
    refreshData: fetchHistoricalData
  };
}
