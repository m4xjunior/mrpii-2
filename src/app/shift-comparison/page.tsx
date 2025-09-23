'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

// Tipos de dados
interface ShiftData {
  turno: string;
  oee: number;
  disp: number;
  rdto: number;
  cal: number;
  horas_pp: number;
  horas_pnp: number;
  top_causa_pnp: string;
  piezas_ok: number;
  piezas_nok: number;
  piezas_rwk: number;
}

export default function ShiftComparisonPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shiftData, setShiftData] = useState<ShiftData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Hook para carregar dados da comparação de turnos
  const loadShiftComparison = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados reais do backend
      const response = await fetch(`/api/shift-comparison?date=${selectedDate}`);

      if (!response.ok) {
        throw new Error('Error al cargar datos de comparación de turnos');
      }

      const data = await response.json();

      if (data.success) {
        setShiftData(data.data);
      } else {
        throw new Error(data.message || 'Error en la API');
      }
    } catch (err) {
      console.error('Error al cargar comparación de turnos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShiftComparison();
  }, [selectedDate]);

  // Componente de carregamento
  if (loading) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <h5>Cargando datos de comparación de turnos...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !shiftData.length) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="text-danger mb-3">{error || 'Datos no encontrados'}</h5>
                <button className="btn btn-primary" onClick={loadShiftComparison}>
                  <i className="fas fa-redo me-2"></i>Intentar Nuevamente
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
          {/* Header */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Comparativo de Turnos</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/"><i className="bx bx-home-alt"></i></a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Comparativo de Turnos
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Selector Superior */}
          <div className="card radius-15 mb-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-md-8">
                  <div className="d-flex align-items-center h-100">
                    <small className="text-muted">
                      Comparación de eficiencia OEE entre turnos del día seleccionado
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas por turno */}
          <div className="row mb-4">
            {shiftData.map((shift) => (
              <div key={shift.turno} className="col-md-4 mb-3">
                <div className="card radius-15 h-100" style={{
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)'
                }}>
                  <div className="card-body text-center">
                    <h6 className="text-muted mb-3">{shift.turno}</h6>

                    {/* Círculo OEE */}
                    <div className="mb-3">
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: `conic-gradient(#007bff 0% ${shift.oee}%, #e9ecef ${shift.oee}% 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '50%',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span className="fw-bold fs-4 text-primary">{shift.oee.toFixed(1)}%</span>
                        </div>
                      </div>
                      <small className="text-muted">OEE</small>
                    </div>

                    {/* Chips KPIs */}
                    <div className="row mb-3">
                      <div className="col-4">
                        <span className="badge d-block" style={{
                          backgroundColor: 'rgba(25, 135, 84, 0.12)',
                          color: '#198754'
                        }}>
                          {shift.disp.toFixed(1)}%<br/>Disp
                        </span>
                      </div>
                      <div className="col-4">
                        <span className="badge d-block" style={{
                          backgroundColor: 'rgba(255, 193, 7, 0.12)',
                          color: '#d69e2e'
                        }}>
                          {shift.rdto.toFixed(1)}%<br/>Rdto
                        </span>
                      </div>
                      <div className="col-4">
                        <span className="badge d-block" style={{
                          backgroundColor: 'rgba(13, 110, 253, 0.12)',
                          color: '#0d6efd'
                        }}>
                          {shift.cal.toFixed(1)}%<br/>Cal
                        </span>
                      </div>
                    </div>

                    {/* Horas de parada */}
                    <div className="mb-3">
                      <h6 className="text-muted mb-2">Horas de parada</h6>
                      <div className="row">
                        <div className="col-6">
                          <span className="badge" style={{
                            backgroundColor: 'rgba(255, 193, 7, 0.12)',
                            color: '#d69e2e'
                          }}>
                            PP: {shift.horas_pp}h
                          </span>
                        </div>
                        <div className="col-6">
                          <span className="badge" style={{
                            backgroundColor: 'rgba(220, 53, 69, 0.12)',
                            color: '#dc3545'
                          }}>
                            PNP: {shift.horas_pnp}h
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top causa PNP */}
                    <div>
                      <small className="text-muted">Top 1 causa PNP</small>
                      <p className="mb-0 fw-bold text-danger small">{shift.top_causa_pnp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico principal */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card radius-15" style={{
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div className="card-header">
                  <h6 className="mb-0">OEE por Turno vs Meta (65%)</h6>
                </div>
                <div className="card-body">
                  <ShiftOEEChart data={shiftData} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabla compacta */}
          <div className="row">
            <div className="col-12">
              <div className="card radius-15" style={{
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <div className="card-header">
                  <h6 className="mb-0">Resumen por Turno</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Turno</th>
                          <th>OEE</th>
                          <th>Disp</th>
                          <th>Rdto</th>
                          <th>Cal</th>
                          <th>Horas PP</th>
                          <th>Horas PNP</th>
                          <th>Piezas OK/NOK/RWK</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shiftData.map((shift) => (
                          <tr key={shift.turno}>
                            <td className="fw-bold">{shift.turno}</td>
                            <td>
                              <span className={`badge ${shift.oee >= 65 ? 'bg-success' : 'bg-warning'}`}>
                                {shift.oee.toFixed(1)}%
                              </span>
                            </td>
                            <td>{shift.disp.toFixed(1)}%</td>
                            <td>{shift.rdto.toFixed(1)}%</td>
                            <td>{shift.cal.toFixed(1)}%</td>
                            <td>{shift.horas_pp}h</td>
                            <td>{shift.horas_pnp}h</td>
                            <td>
                              <span className="badge" style={{
                                backgroundColor: 'rgba(25, 135, 84, 0.12)',
                                color: '#198754'
                              }}>
                                {shift.piezas_ok}
                              </span>
                              <span className="badge ms-1" style={{
                                backgroundColor: 'rgba(220, 53, 69, 0.12)',
                                color: '#dc3545'
                              }}>
                                {shift.piezas_nok}
                              </span>
                              <span className="badge ms-1" style={{
                                backgroundColor: 'rgba(255, 193, 7, 0.12)',
                                color: '#d69e2e'
                              }}>
                                {shift.piezas_rwk}
                              </span>
                            </td>
                          </tr>
                        ))}
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

// Componente para gráfico OEE por turno
function ShiftOEEChart({ data }: { data: ShiftData[] }) {
  const chartData = {
    labels: data.map(item => item.turno),
    datasets: [
      {
        label: 'OEE (%)',
        data: data.map(item => item.oee),
        backgroundColor: data.map(item =>
          item.oee >= 65 ? 'rgba(25, 135, 84, 0.8)' : 'rgba(255, 193, 7, 0.8)'
        ),
        borderColor: data.map(item =>
          item.oee >= 65 ? '#198754' : '#ffc107'
        ),
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Meta (65%)',
        data: data.map(() => 65),
        type: 'line' as const,
        borderColor: '#dc3545',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
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
        callbacks: {
          label: (context: any) => {
            if (context.datasetIndex === 0) {
              return `OEE: ${context.parsed.y.toFixed(1)}%`;
            } else {
              return `Meta: ${context.parsed.y}%`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje (%)',
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Turno',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}