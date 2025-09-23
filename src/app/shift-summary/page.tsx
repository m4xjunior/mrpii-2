'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
  ArcElement
);

// Tipos de dados baseados no contrato do backend
interface ShiftSummary {
  cod_of: string;
  maquina: string;
  operador: string;
  turno: string;
  inicio: string;
  fin_previsto: string;
  fin_estimado: string;
  setup_min: number;
  kpi: {
    oee: number;
    disp: number;
    rdto: number;
    cal: number;
  };
  produccion: {
    ok: number;
    nok: number;
    rwk: number;
    total: number;
  };
  pp_min: number;
  pnp_min: number;
}

interface ShiftSeries {
  oee: Array<{ t: string; v: number }>;
  disp: Array<{ t: string; v: number }>;
  rdto: Array<{ t: string; v: number }>;
  cal: Array<{ t: string; v: number }>;
  produccion_tramos: Array<{
    t: string;
    ok: number;
    nok: number;
    rwk: number;
  }>;
}

interface ShiftIncident {
  ini: string;
  fin: string;
  tipo: 'PP' | 'PNP';
  causa_l1: string;
  causa_l2: string;
  operario: string;
  seg: number;
  obs: string;
}

export default function ShiftSummaryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState<'noche' | 'mañana' | 'tarde'>('tarde');
  const [excludePreparation, setExcludePreparation] = useState(false);

  const [summary, setSummary] = useState<ShiftSummary | null>(null);
  const [series, setSeries] = useState<ShiftSeries | null>(null);
  const [incidents, setIncidents] = useState<ShiftIncident[]>([]);

  const { user } = useUser();

  // Hook para carregar resumo do turno
  const loadShiftSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados reais do backend
      const response = await fetch(`/api/shift-summary?date=${selectedDate}&shift=${selectedShift}&excludeSetup=${excludePreparation}`);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do turno');
      }

      const data = await response.json();

      if (data.success) {
        setSummary(data.summary);
        setSeries(data.series);
        setIncidents(data.incidents);
      } else {
        throw new Error(data.message || 'Erro na API');
      }
    } catch (err) {
      console.error('Erro ao carregar resumo do turno:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShiftSummary();
  }, [selectedDate, selectedShift, excludePreparation]);

  // Estados de carregamento e erro
  if (loading) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <h5>Carregando dados do turno...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="text-danger mb-3">{error || 'Dados não encontrados'}</h5>
                <button className="btn btn-primary" onClick={loadShiftSummary}>
                  <i className="fas fa-redo me-2"></i>Tentar Novamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="page-content-wrapper">
        <div className="page-content">
          {/* Header com informações do turno */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Resumo por Turno</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/"><i className="bx bx-home-alt"></i></a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {summary.maquina} · Operario: {summary.operador} · Turno {summary.turno}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <span className="badge bg-success">EN CURSO</span>
            </div>
          </div>

          {/* Selector Superior */}
          <div className="card radius-15 mb-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">Turno</label>
                  <select
                    className="form-select"
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value as 'noche' | 'mañana' | 'tarde')}
                  >
                    <option value="noche">Noche</option>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="excludePreparation"
                      checked={excludePreparation}
                      onChange={(e) => setExcludePreparation(e.target.checked)}
                    />
                    <label className="form-check-label fw-bold" htmlFor="excludePreparation">
                      Excluir preparação
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="row mb-4">
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-2">OEE Turno</h6>
                  <h3 className="text-primary mb-0">{(summary.kpi.oee * 100).toFixed(1)}%</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-2">DISP Turno</h6>
                  <h3 className="text-success mb-0">{(summary.kpi.disp * 100).toFixed(1)}%</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-2">RDTO Turno</h6>
                  <h3 className="text-info mb-0">{(summary.kpi.rdto * 100).toFixed(1)}%</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-2">CAL Turno</h6>
                  <h3 className="text-warning mb-0">{(summary.kpi.cal * 100).toFixed(1)}%</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Tempo parado e Produção */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-3">Tiempo parado (PP / PNP)</h6>
                  <div className="row">
                    <div className="col-6">
                      <span className="badge" style={{ backgroundColor: 'rgba(255, 193, 7, 0.12)', color: '#d69e2e' }}>
                        PP: {summary.pp_min}min
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="badge" style={{ backgroundColor: 'rgba(220, 53, 69, 0.12)', color: '#dc3545' }}>
                        PNP: {summary.pnp_min}min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card radius-15 h-100" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-body text-center">
                  <h6 className="text-muted mb-3">Piezas OK / NOK / RWK</h6>
                  <div className="row">
                    <div className="col-4">
                      <span className="badge" style={{ backgroundColor: 'rgba(25, 135, 84, 0.12)', color: '#198754' }}>
                        OK: {summary.produccion.ok}
                      </span>
                    </div>
                    <div className="col-4">
                      <span className="badge" style={{ backgroundColor: 'rgba(220, 53, 69, 0.12)', color: '#dc3545' }}>
                        NOK: {summary.produccion.nok}
                      </span>
                    </div>
                    <div className="col-4">
                      <span className="badge" style={{ backgroundColor: 'rgba(255, 193, 7, 0.12)', color: '#d69e2e' }}>
                        RWK: {summary.produccion.rwk}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="row mb-4">
            {/* Barras apiladas por hora */}
            <div className="col-lg-8 mb-4">
              <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-header">
                  <h6 className="mb-0">Producción por Hora (OK/NOK/RWK)</h6>
                </div>
                <div className="card-body">
                  {series?.produccion_tramos ? (
                    <HourlyProductionChart data={series.produccion_tramos} />
                  ) : (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando gráfico...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Donut PP vs PNP */}
            <div className="col-lg-4 mb-4">
              <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-header">
                  <h6 className="mb-0">Reparto PP vs PNP</h6>
                </div>
                <div className="card-body">
                  <DowntimeChart pp={summary.pp_min} pnp={summary.pnp_min} />
                </div>
              </div>
            </div>
          </div>

          {/* Mini-líneas (Sparklines) */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-header">
                  <h6 className="mb-0">OEE/Disp/Rdto/Cal por Hora</h6>
                </div>
                <div className="card-body">
                  {series ? (
                    <SparklinesChart
                      oee={series.oee}
                      disp={series.disp}
                      rdto={series.rdto}
                      cal={series.cal}
                    />
                  ) : (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Carregando sparklines...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de incidências */}
          <div className="row">
            <div className="col-12">
              <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                <div className="card-header">
                  <h6 className="mb-0">Lista de Incidências</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>Máquina</th>
                          <th>Causa</th>
                          <th>Segundos</th>
                          <th>Operario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incidents.map((incident, index) => (
                          <tr key={index}>
                            <td>
                              <small>{incident.ini} - {incident.fin}</small>
                            </td>
                            <td>{summary.maquina}</td>
                            <td>
                              <div>
                                <strong>{incident.causa_l1}</strong>
                                {incident.causa_l2 && <div><small className="text-muted">{incident.causa_l2}</small></div>}
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${incident.tipo === 'PP' ? 'bg-warning' : 'bg-danger'}`}>
                                {incident.seg}s
                              </span>
                            </td>
                            <td>{incident.operario}</td>
                          </tr>
                        ))}
                        {incidents.length === 0 && (
                          <tr>
                            <td colSpan={5} className="text-center text-muted py-4">
                              Nenhuma incidência registrada
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para gráfico de produção por hora
function HourlyProductionChart({ data }: { data: Array<{ t: string; ok: number; nok: number; rwk: number }> }) {
  const chartData = {
    labels: data.map(item => new Date(item.t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'OK',
        data: data.map(item => item.ok),
        backgroundColor: 'rgba(25, 135, 84, 0.8)',
        borderColor: '#198754',
        borderWidth: 1,
      },
      {
        label: 'NOK',
        data: data.map(item => item.nok),
        backgroundColor: 'rgba(220, 53, 69, 0.8)',
        borderColor: '#dc3545',
        borderWidth: 1,
      },
      {
        label: 'RWK',
        data: data.map(item => item.rwk),
        backgroundColor: 'rgba(255, 193, 7, 0.8)',
        borderColor: '#ffc107',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} height={300} />;
}

// Componente para gráfico donut PP vs PNP
function DowntimeChart({ pp, pnp }: { pp: number; pnp: number }) {
  const chartData = {
    labels: ['PP (Planeada)', 'PNP (No Planeada)'],
    datasets: [
      {
        data: [pp, pnp],
        backgroundColor: [
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)',
        ],
        borderColor: [
          '#ffc107',
          '#dc3545',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed} minutos`,
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} height={250} />;
}

// Componente para sparklines
function SparklinesChart({
  oee,
  disp,
  rdto,
  cal,
}: {
  oee: Array<{ t: string; v: number }>;
  disp: Array<{ t: string; v: number }>;
  rdto: Array<{ t: string; v: number }>;
  cal: Array<{ t: string; v: number }>;
}) {
  const createSparklineData = (data: Array<{ t: string; v: number }>, label: string, color: string) => ({
    labels: data.map(item => new Date(item.t).toLocaleTimeString('es-ES', { hour: '2-digit' })),
    datasets: [
      {
        label,
        data: data.map(item => item.v * 100),
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  });

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="row">
      <div className="col-md-3 mb-3">
        <div className="text-center mb-2">
          <small className="text-muted">OEE</small>
        </div>
        <div style={{ height: '60px' }}>
          <Line data={createSparklineData(oee, 'OEE', '#007bff')} options={sparklineOptions} />
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="text-center mb-2">
          <small className="text-muted">Disponibilidad</small>
        </div>
        <div style={{ height: '60px' }}>
          <Line data={createSparklineData(disp, 'Disp', '#28a745')} options={sparklineOptions} />
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="text-center mb-2">
          <small className="text-muted">Rendimiento</small>
        </div>
        <div style={{ height: '60px' }}>
          <Line data={createSparklineData(rdto, 'Rdto', '#17a2b8')} options={sparklineOptions} />
        </div>
      </div>
      <div className="col-md-3 mb-3">
        <div className="text-center mb-2">
          <small className="text-muted">Calidad</small>
        </div>
        <div style={{ height: '60px' }}>
          <Line data={createSparklineData(cal, 'Cal', '#ffc107')} options={sparklineOptions} />
        </div>
      </div>
    </div>
  );
}
