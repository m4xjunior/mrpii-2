'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Dados mockados
const mockKPIs = {
  oeeGlobal: 85.2,
  perdidasEstimadas: 12500,
  piezasOK: { dia: 15420, mes: 452300 },
  porcentajeNOK: 3.8
};

const mockOEEData = [
  { hora: '08:00', oee: 82 },
  { hora: '09:00', oee: 85 },
  { hora: '10:00', oee: 88 },
  { hora: '11:00', oee: 86 },
  { hora: '12:00', oee: 84 },
  { hora: '13:00', oee: 87 },
  { hora: '14:00', oee: 89 },
  { hora: '15:00', oee: 91 },
  { hora: '16:00', oee: 88 },
  { hora: '17:00', oee: 85 }
];

const mockLossesData = [
  { maquina: 'DOBL001', paradas: 2500, scrap: 800, oportunidad: 1200 },
  { maquina: 'SOLD002', paradas: 1800, scrap: 600, oportunidad: 900 },
  { maquina: 'TROQ003', paradas: 3200, scrap: 1000, oportunidad: 1500 },
  { maquina: 'TERM004', paradas: 1500, scrap: 400, oportunidad: 700 }
];

const mockParetoData = [
  { causa: 'Falta de material', cantidad: 45 },
  { causa: 'Falla mecánica', cantidad: 32 },
  { causa: 'Problema calidad', cantidad: 28 },
  { causa: 'Mantenimiento', cantidad: 22 },
  { causa: 'Cambio herramienta', cantidad: 18 },
  { causa: 'Otro', cantidad: 15 }
];

const mockStoppedMachines = [
  { id: 'DOBL001', nombre: 'Dobladora 1', tiempoParada: '2h 30m', causa: 'Falta material' },
  { id: 'SOLD002', nombre: 'Soldadura 2', tiempoParada: '1h 15m', causa: 'Mantenimiento' },
  { id: 'TROQ003', nombre: 'Troqueladora 3', tiempoParada: '45m', causa: 'Cambio herramienta' }
];

const mockActiveOFs = [
  { id: 'OF001', descripcion: 'Producto A - Lote 123', progreso: 75 },
  { id: 'OF002', descripcion: 'Producto B - Lote 456', progreso: 45 },
  { id: 'OF003', descripcion: 'Producto C - Lote 789', progreso: 90 }
];

export default function ScadaHomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMachineClick = (machineId: string) => {
    router.push(`/machine-detail/${machineId}`);
  };

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
                <h5>Cargando datos del SCADA...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <div className="">
            <img src="/images/Logo-KH-sin-fondo.png" className="logo-icon-2" alt="KH" />
          </div>
          <div>
            <h4 className="logo-text">SCADA</h4>
          </div>
          <a href="javascript:;" className="toggle-btn ms-auto">
            <i className="bx bx-menu"></i>
          </a>
        </div>
        <ul className="metismenu" id="menu">
          <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt"></i>
              </div>
              <div className="menu-title">Panel de Control</div>
            </a>
            <ul>
              <li><a href="#"><i className="bx bx-right-arrow-alt"></i>Máquinas</a></li>
              <li><a href="#"><i className="bx bx-right-arrow-alt"></i>Producción</a></li>
              <li><a href="#"><i className="bx bx-right-arrow-alt"></i>OEE</a></li>
            </ul>
          </li>
          <li className="menu-label">Monitoreo</li>
          <li>
            <a href="javascript:;">
              <div className="parent-icon icon-color-2">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="menu-title">Informes</div>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <div className="parent-icon icon-color-3">
                <i className="fas fa-cogs"></i>
              </div>
              <div className="menu-title">Configuración</div>
            </a>
          </li>
        </ul>
      </div>

      {/* Header */}
      <header className="top-header">
        <nav className="navbar navbar-expand">
          <div className="left-topbar d-flex align-items-center">
            <a href="javascript:;" className="toggle-btn">
              <i className="bx bx-menu"></i>
            </a>
          </div>
          <div className="flex-grow-1 search-bar">
            <div className="input-group">
              <button className="btn btn-search-back search-arrow-back" type="button">
                <i className="bx bx-arrow-back"></i>
              </button>
              <input type="text" className="form-control" placeholder="buscar" />
              <button className="btn btn-search" type="button">
                <i className="lni lni-search-alt"></i>
              </button>
            </div>
          </div>
          <div className="right-topbar ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item dropdown dropdown-lg">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="javascript:;" data-bs-toggle="dropdown">
                  <span className="msg-count">3</span>
                  <i className="bx bx-bell vertical-align-middle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="javascript:;">
                    <div className="msg-header">
                      <h6 className="msg-header-title">3 Alertas</h6>
                      <p className="msg-header-subtitle">Máquinas en parada</p>
                    </div>
                  </a>
                  <div className="header-notifications-list">
                    <a className="dropdown-item" href="javascript:;">
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-danger text-danger">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">DOBL001 - Parada</h6>
                          <p className="msg-info">Falta de material</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">SCADA Home</div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Início Executiva
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* KPIs */}
            <div className="row mb-4">
              <div className="col-12 col-md-3 mb-3">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">OEE Global Día</h6>
                        <h4 className="mb-0 text-success">{mockKPIs.oeeGlobal}%</h4>
                      </div>
                      <div className="font-35 text-success">
                        <i className="fas fa-chart-line"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Pérdidas (€) Estimadas</h6>
                        <h4 className="mb-0 text-danger">€{mockKPIs.perdidasEstimadas.toLocaleString('es-ES')}</h4>
                      </div>
                      <div className="font-35 text-danger">
                        <i className="fas fa-euro-sign"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Piezas OK (Día/Mes)</h6>
                        <h4 className="mb-0 text-primary">{mockKPIs.piezasOK.dia.toLocaleString('es-ES')}</h4>
                        <small className="text-muted">/ {mockKPIs.piezasOK.mes.toLocaleString('es-ES')}</small>
                      </div>
                      <div className="font-35 text-primary">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">% NOK</h6>
                        <h4 className="mb-0 text-warning">{mockKPIs.porcentajeNOK}%</h4>
                      </div>
                      <div className="font-35 text-warning">
                        <i className="fas fa-exclamation-triangle"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="row mb-4">
              <div className="col-12 col-lg-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header">
                    <h6 className="mb-0">OEE Día (por hora) + Meta</h6>
                  </div>
                  <div className="card-body">
                    {/* Placeholder para gráfico de linha OEE */}
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', backgroundColor: 'rgba(0,123,255,0.1)', border: '2px dashed #007bff', borderRadius: '10px' }}>
                      <div className="text-center">
                        <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
                        <h5>Gráfico OEE por Hora</h5>
                        <p className="text-muted">Implementação pendente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header">
                    <h6 className="mb-0">Pérdidas (€) por Máquina</h6>
                  </div>
                  <div className="card-body">
                    {/* Placeholder para gráfico de barras perdas */}
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', backgroundColor: 'rgba(220,53,69,0.1)', border: '2px dashed #dc3545', borderRadius: '10px' }}>
                      <div className="text-center">
                        <i className="fas fa-chart-bar fa-3x text-danger mb-3"></i>
                        <h5>Gráfico Barras Pérdidas</h5>
                        <p className="text-muted">Implementação pendente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header">
                    <h6 className="mb-0">Pareto Causas PNP (Top 10)</h6>
                  </div>
                  <div className="card-body">
                    {/* Placeholder para gráfico Pareto */}
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', backgroundColor: 'rgba(255,193,7,0.1)', border: '2px dashed #ffc107', borderRadius: '10px' }}>
                      <div className="text-center">
                        <i className="fas fa-chart-pie fa-3x text-warning mb-3"></i>
                        <h5>Gráfico Pareto Causas</h5>
                        <p className="text-muted">Implementação pendente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widgets */}
            <div className="row">
              <div className="col-12 col-lg-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header">
                    <h6 className="mb-0">Máquinas en PARADA ahora</h6>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      {mockStoppedMachines.map((machine) => (
                        <a
                          key={machine.id}
                          href="#"
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          onClick={(e) => {
                            e.preventDefault();
                            handleMachineClick(machine.id);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <strong>{machine.nombre}</strong>
                            <br />
                            <small className="text-muted">{machine.causa} - {machine.tiempoParada}</small>
                          </div>
                          <i className="fas fa-chevron-right text-muted"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header">
                    <h6 className="mb-0">Últimas OF activas</h6>
                  </div>
                  <div className="card-body">
                    {mockActiveOFs.map((of) => (
                      <div key={of.id} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong>{of.descripcion}</strong>
                          <span className="badge" style={{ backgroundColor: 'rgba(0,123,255,0.12)', color: '#007bff' }}>
                            {of.progreso}%
                          </span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${of.progreso}%`, backgroundColor: '#007bff' }}
                            aria-valuenow={of.progreso}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="mb-0">Sistema SCADA MRPII - © 2024 Grupo KH</p>
      </div>
    </div>
  );
}