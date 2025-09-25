'use client';

import { useEffect, useState } from 'react';
import { MachineStatus } from '../../types/machine';
import MachineDetailModal from '../../components/MachineDetailModal';

// Custom hook para manejar el tema
function useThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    console.log('🎨 useThemeSwitcher: Inicializando...');

    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem('scada-theme') || 'light';
    setCurrentTheme(savedTheme);

    // Event listener para cambios de tema desde el script global
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail.theme;
      setCurrentTheme(newTheme);
      console.log('🔄 useThemeSwitcher: Tema cambiado a:', newTheme);
    };

    document.addEventListener('themeChange' as any, handleThemeChange);

    return () => {
      document.removeEventListener('themeChange' as any, handleThemeChange);
    };
  }, []);

  return { currentTheme };
}

export default function Dashboard() {
  const [machines, setMachines] = useState<MachineStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [selectedMachine, setSelectedMachine] = useState<MachineStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usar el hook del theme switcher
  const { currentTheme } = useThemeSwitcher();

  // Mostrar información del tema actual en consola
  useEffect(() => {
    console.log('🏠 Dashboard: Tema actual:', currentTheme);
    console.log('💡 Theme Customizer: Haz clic en el botón ⚙️ en la esquina inferior derecha para cambiar el tema');
  }, [currentTheme]);

  const [monthly, setMonthly] = useState<{ ok: number; nok: number; rw: number; total: number; eficiencia: number; perdidas_eur: number } | null>(null);
  const [daily, setDaily] = useState<{ ok: number; nok: number; rw: number; total: number; eficiencia: number; perdidas_eur: number; fecha: string } | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<'month' | 'day' | 'hour'>('day'); // Por defecto mostrar día

  // Función para cargar datos del período seleccionado
  const loadPeriodData = async (period: 'month' | 'day' | 'hour') => {
    try {
      let response;
      if (period === 'month') {
        response = await fetch('/api/analytics/monthly');
      } else if (period === 'day') {
        response = await fetch('/api/analytics/daily');
      } else {
        // Para hora, por ahora usar datos del día
        response = await fetch('/api/analytics/daily');
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data.success) {
          if (period === 'month') {
            setMonthly(data.data);
          } else {
            setDaily(data.data);
          }
          console.log(`📊 Datos cargados para período: ${period}`, data.data);
        }
      }
    } catch (error) {
      console.error(`❌ Error cargando datos para período ${period}:`, error);
    }
  };

  // Cargar datos iniciales del día
  useEffect(() => {
    loadPeriodData('day');
    loadPeriodData('month'); // También cargar datos mensuales
  }, []);

  // Manejar cambio de período
  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPeriod = event.target.id.replace('period', '').toLowerCase() as 'month' | 'day' | 'hour';
    setCurrentPeriod(newPeriod);
    loadPeriodData(newPeriod);
  };

  // Datos del período actual
  const currentData = currentPeriod === 'month' ? monthly : daily;
  const alerts = machines
    .map(m => {
      if (m.status === 'PARADA') {
        return {
          type: 'PARADA',
          machine: `${m.machine.desc_maquina} -${m.machine.Cod_maquina}`,
          code: m.machine.Cod_maquina,
          message: m.downtime || 'Parada detectada',
          time: new Date().toLocaleTimeString('es-ES')
        };
      }
      if ((m.production?.nok || 0) > 0) {
        return {
          type: 'CALIDAD',
          machine: `${m.machine.desc_maquina} -${m.machine.Cod_maquina}`,
          code: m.machine.Cod_maquina,
          message: `Piezas NOK: ${m.production.nok}`,
          time: new Date().toLocaleTimeString('es-ES')
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{ type: string; machine: string; code: string; message: string; time: string }>;

  const openMachineByCode = (code: string) => {
    const found = machines.find(m => m.machine.Cod_maquina === code);
    if (found) {
      setSelectedMachine(found);
      setIsModalOpen(true);
    }
  };

  const fetchMachines = async () => {
    try {
      console.log('🔄 Buscando datos de las máquinas...');
      const response = await fetch('/api/scada/machines');
      const data = await response.json();

      if (data.success) {
        setMachines(data.data);
        setLastUpdate(new Date().toLocaleTimeString('es-ES'));
        setError(null);
        console.log(`✅ ${data.count} máquinas cargadas`);
      } else {
        setError(data.message || 'Error al cargar datos');
        console.error('❌ Error en la API:', data.message);
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('❌ Error de fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    fetch('/api/analytics/monthly')
      .then(r => r.json())
      .then(res => {
        if (res?.success) setMonthly(res.data);
      })
      .catch(() => {});
    const interval = setInterval(() => {
      fetchMachines();
      fetch('/api/analytics/monthly')
        .then(r => r.json())
        .then(res => {
          if (res?.success) setMonthly(res.data);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMachineClick = (machine: MachineStatus) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const getStatusIcon = (status: MachineStatus['status']) => {
    switch (status) {
      case 'PRODUCIENDO': return 'fas fa-play-circle';
      case 'ACTIVA': return 'fas fa-power-off';
      case 'PARADA': return 'fas fa-pause-circle';
      case 'MANTENIMIENTO': return 'fas fa-tools';
      case 'INACTIVA': return 'fas fa-stop-circle';
      default: return 'fas fa-question-circle';
    }
  };

  const getStatusClass = (status: MachineStatus['status']) => {
    switch (status) {
      case 'PRODUCIENDO': return 'text-success';
      case 'ACTIVA': return 'text-primary';
      case 'PARADA': return 'text-danger';
      case 'MANTENIMIENTO': return 'text-warning';
      case 'INACTIVA': return 'text-secondary';
      default: return 'text-secondary';
    }
  };

  const getStatusText = (status: MachineStatus['status']) => {
    switch (status) {
      case 'PRODUCIENDO': return 'PRODUCIENDO';
      case 'ACTIVA': return 'ACTIVA';
      case 'PARADA': return 'PARADA';
      case 'MANTENIMIENTO': return 'MANTENIMIENTO';
      case 'INACTIVA': return 'INACTIVA';
      default: return 'DESCONOCIDO';
    }
  };

  const getMachineTypeIcon = (machineCode: string) => {
    if (machineCode.includes('DOBL')) return 'fas fa-industry';
    if (machineCode.includes('SOLD')) return 'fas fa-fire';
    if (machineCode.includes('TROQ')) return 'fas fa-cut';
    if (machineCode.includes('TERM')) return 'fas fa-compress-arrows-alt';
    return 'fas fa-cog';
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
                <h5>Cargando datos de las máquinas...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="text-danger mb-3">{error}</h5>
                <button className="btn btn-primary" onClick={fetchMachines}>
                  <i className="fas fa-redo me-2"></i>Intentar de Nuevo
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
      {/* Sidebar */}
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <div className="">
            <img src="/images/logo_transparent.png" className="logo-icon-2" alt="KH Know How" />
          </div>
          <div>
            <h4 className="logo-text">Sistema SCADA</h4>
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
            <a href="/informes" onClick={(e) => {
              e.preventDefault();
              window.open('/informes', '_blank');
            }}>
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
              <li className="nav-item search-btn-mobile">
                <a className="nav-link position-relative" href="javascript:;">
                  <i className="bx bx-search vertical-align-middle"></i>
                </a>
              </li>
              <li className="nav-item dropdown dropdown-lg">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="javascript:;" data-bs-toggle="dropdown">
                  <span className="msg-count">{alerts.length}</span>
                  <i className="bx bx-bell vertical-align-middle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="javascript:;">
                    <div className="msg-header">
                      <h6 className="msg-header-title">{alerts.length} Nuevas</h6>
                      <p className="msg-header-subtitle">Alertas de Máquinas</p>
                    </div>
                  </a>
                  <div className="header-notifications-list">
                    {alerts.length === 0 && (
                      <div className="dropdown-item text-center text-muted">Sin alertas</div>
                    )}
                    {alerts.slice(0, 8).map((a, idx) => (
                      <a key={idx} className="dropdown-item" href="javascript:;" onClick={(e) => { e.preventDefault(); openMachineByCode(a.code); }}>
                        <div className="d-flex align-items-center">
                          <div className={`notify ${a.type === 'PARADA' ? 'bg-light-danger text-danger' : 'bg-light-warning text-warning'}`}>
                            <i className={`${a.type === 'PARADA' ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle'}`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="msg-name">
                              {a.machine}
                              <span className="msg-time float-end">{a.time}</span>
                            </h6>
                            <p className="msg-info">{a.type}: {a.message}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <a href="javascript:;">
                    <div className="text-center msg-footer">Ver Todas las Alertas</div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-user-profile">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                  <div className="d-flex user-box align-items-center">
                    <div className="user-info">
                      <p className="user-name mb-0">Operador SCADA</p>
                      <p className="designattion mb-0">En línea</p>
                    </div>
                    <img src="assets/images/avatars/avatar-1.png" className="user-img" alt="user avatar" />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="javascript:;">
                    <i className="bx bx-user"></i><span>Perfil</span>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <i className="bx bx-cog"></i><span>Configuración</span>
                  </a>
                  <a className="dropdown-item" href="javascript:;">
                    <i className="bx bx-tachometer"></i><span>Panel</span>
                  </a>
                  <div className="dropdown-divider mb-0"></div>
                  <a className="dropdown-item" href="javascript:;">
                    <i className="bx bx-power-off"></i><span>Cerrar Sesión</span>
                  </a>
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
              <div className="breadcrumb-title pe-3">Panel de Control</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="javascript:;"><i className="bx bx-home-alt"></i></a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sincronizado
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <small className="text-muted">
                <i className="fas fa-clock me-1"></i>
                Última Actualización: {lastUpdate}
              </small>
            </div>
          </div>

          {/* Statistics Cards */}
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-success">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                        <h2 className="mb-0 text-white">
                        {machines.filter(m => m.status === 'PRODUCIENDO').length}
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-play-circle"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Produciendo</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        +{Math.round((machines.filter(m => m.status === 'PRODUCIENDO').length / machines.length) * 100) || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-primary">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                        <h2 className="mb-0 text-white">
                        {machines.filter(m => m.status === 'ACTIVA').length}
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-power-off"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Activas</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        +{Math.round((machines.filter(m => m.status === 'ACTIVA').length / machines.length) * 100) || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-danger">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                        <h2 className="mb-0 text-white">
                        {machines.filter(m => m.status === 'PARADA').length}
                          <i className="bx bxs-down-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-pause-circle"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Paradas</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        -{Math.round((machines.filter(m => m.status === 'PARADA').length / machines.length) * 100) || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-info">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                        <h2 className="mb-0 text-white">
                          {monthly?.total ?? machines.length}
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-box"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Producción Mes</p>
                    </div>
                      <div className="ms-auto font-14 text-white">{monthly ? `${monthly.eficiencia}% ef.` : ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Machines Status Grid */}
          <div className="row">
            <div className="col-12">
                <div className="card radius-15">
                  <div className="card-header border-bottom-0">
                    <div className="d-lg-flex align-items-center">
                    <div>
                        <h5 className="mb-2 mb-lg-0">Estado de Máquinas en Tiempo Real</h5>
                      </div>
                      <div className="ms-lg-auto mb-2 mb-lg-0">
                        <div className="btn-group-round">
                          <div className="btn-group">
                            <button type="button" className="btn btn-white">Todas</button>
                            <button type="button" className="btn btn-white">Produciendo</button>
                            <button type="button" className="btn btn-white">Paradas</button>
                          </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    {machines.map((machineStatus) => (
                      <div key={machineStatus.machine.id_maquina} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <div
                            className="card radius-15 machine-card cursor-pointer border shadow-none"
                          onClick={() => handleMachineClick(machineStatus)}
                          style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '';
                          }}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                              <div className="machine-icon me-3">
                                <i className={`${getMachineTypeIcon(machineStatus.machine.Cod_maquina)} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="mb-0 fw-bold">{machineStatus.machine.desc_maquina}</h6>
                                <small className="text-muted">{machineStatus.machine.Cod_maquina}</small>
                              </div>
                              <div>
                                <span className={`badge rounded-pill ${getStatusClass(machineStatus.status).replace('text-', 'bg-')}`}>
                                  <i className={`${getStatusIcon(machineStatus.status)} me-1`}></i>
                                  {getStatusText(machineStatus.status)}
                                </span>
                              </div>
                            </div>

                            <div className="machine-details">
                              {machineStatus.currentOF && machineStatus.currentOF !== '--' && (
                                <div className="detail-row mb-2">
                                  <small className="text-muted">
                                    <i className="fas fa-clipboard-list me-1"></i>OF:
                                  </small>
                                  <span className="ms-1">{machineStatus.currentOF}</span>
                                </div>
                              )}

                              {machineStatus.operator && (
                                <div className="detail-row mb-2">
                                  <small className="text-muted">
                                    <i className="fas fa-user me-1"></i>Operador:
                                  </small>
                                  <span className="ms-1">{machineStatus.operator}</span>
                                </div>
                              )}

                              {machineStatus.production.total > 0 && (
                                <div className="detail-row mb-2">
                                  <small className="text-muted">
                                    <i className="fas fa-chart-bar me-1"></i>Producción:
                                  </small>
                                  <span className="text-success ms-1">{machineStatus.production.ok}</span>
                                  <span className="text-muted mx-1">/</span>
                                  <span className="text-danger">{machineStatus.production.nok}</span>
                                </div>
                              )}

                              {machineStatus.efficiency > 0 && (
                                <div className="detail-row mb-2">
                                  <small className="text-muted">
                                    <i className="fas fa-percentage me-1"></i>Eficiencia:
                                  </small>
                                  <span className={`ms-1 ${machineStatus.efficiency >= 80 ? 'text-success' : machineStatus.efficiency >= 60 ? 'text-warning' : 'text-danger'}`}>
                                    {machineStatus.efficiency}%
                                  </span>
                                </div>
                              )}

                              {machineStatus.downtime && machineStatus.status === 'PARADA' && (
                                <div className="detail-row">
                                  <small className="text-muted">
                                    <i className="fas fa-exclamation-triangle me-1"></i>Motivo:
                                  </small>
                                  <small className="text-danger ms-1">{machineStatus.downtime}</small>
                                </div>
                              )}

                              {/* Novas informações da OF */}
                              {machineStatus.ofInfo && (
                                <>
                                  {/* Fecha de inicio da OF */}
                                  {machineStatus.ofInfo.startDate && (
                                    <div className="detail-row mb-2">
                                      <small className="text-muted">
                                        <i className="fas fa-calendar-plus me-1"></i>Inicio OF:
                                      </small>
                                      <small className="ms-1">{machineStatus.ofInfo.startDate}</small>
                                    </div>
                                  )}

                                  {/* Tempo de duração da OF */}
                                  {machineStatus.ofInfo.durationMinutes > 0 && (
                                    <div className="detail-row mb-2">
                                      <small className="text-muted">
                                        <i className="fas fa-clock me-1"></i>Duración OF:
                                      </small>
                                      <small className="ms-1">{machineStatus.ofInfo.durationMinutes} min</small>
                                    </div>
                                  )}

                                  {/* Tempo de paros */}
                                  {machineStatus.ofInfo.parosMinutes > 0 && (
                                    <div className="detail-row mb-2">
                                      <small className="text-muted">
                                        <i className="fas fa-pause-circle me-1"></i>Paros:
                                      </small>
                                      <small className="text-warning ms-1">{machineStatus.ofInfo.parosMinutes} min</small>
                                    </div>
                                  )}

                                  {/* Fecha fin estimada */}
                                  {machineStatus.ofInfo.estimatedFinishDate && (
                                    <div className="detail-row mb-2">
                                      <small className="text-muted">
                                        <i className="fas fa-calendar-check me-1"></i>Fin Estimado:
                                      </small>
                                      <small className="ms-1">{machineStatus.ofInfo.estimatedFinishDate}</small>
                                    </div>
                                  )}

                                  {/* Barra de progresso do tempo restante */}
                                  {machineStatus.productionOF.remainingPieces > 0 && (
                                    <div className="detail-row mb-2">
                                      <small className="text-muted">
                                        <i className="fas fa-hourglass-half me-1"></i>Tiempo Restante:
                                      </small>
                                      <div className="progress mt-1" style={{ height: '4px', width: '100%' }}>
                                        <div
                                          className="progress-bar bg-info"
                                          style={{
                                            width: `${Math.min(100, (machineStatus.productionOF.remainingPieces / (machineStatus.productionOF.remainingPieces + machineStatus.production.ok)) * 100)}%`
                                          }}
                                        />
                                      </div>
                                      <small className="ms-2">{machineStatus.productionOF.remainingTime}</small>
                                    </div>
                                  )}
                                </>
                              )}

                              {/* Novos campos conforme contrato de dados */}
                              <div className="mt-2 small text-muted d-grid gap-1">
                                {/* Velocidad */}
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">Velocidad</span>
                                  <span>
                                    {/* u/h = (3600 / seg/peça) se seg/peça > 0 */}
                                    {machineStatus.rt_tiempo_pieza > 0
                                      ? `${Math.round(3600 / machineStatus.rt_tiempo_pieza)} u/h`
                                      : '— u/h'}{" "}
                                    · {machineStatus.rt_tiempo_pieza?.toFixed(2) ?? '—'} seg/pza
                                  </span>
                                </div>

                                {/* Rendimiento */}
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">Rendimiento</span>
                                  <span>
                                    Turno: {(machineStatus.rendimiento ?? 0).toFixed(1)}% · OF: {(machineStatus.rendimiento_of ?? 0).toFixed(1)}%
                                  </span>
                                </div>

                                {/* OEE Turno */}
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">OEE Turno</span>
                                  <span className={Number(machineStatus.oee_turno) >= 65 ? 'text-success' : 'text-warning'}>
                                    {(machineStatus.oee_turno ?? 0).toFixed(1)}%
                                  </span>
                                </div>

                                {/* Planif./Prod. */}
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">Planif./Prod.</span>
                                  <span>
                                    Plan: {machineStatus.Rt_Unidades_planning?.toLocaleString('es-ES') ?? 0} ·{" "}
                                    {machineStatus.rt_Unidades_ok?.toLocaleString('es-ES') ?? 0}
                                    {" / "}
                                    <span className="text-danger">{machineStatus.rt_Unidades_nok?.toLocaleString('es-ES') ?? 0}</span>
                                    {" / "}
                                    <span className="text-warning">{machineStatus.rt_Unidades_rw?.toLocaleString('es-ES') ?? 0}</span>
                                  </span>
                                </div>

                                {/* Fechas */}
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">Inicio</span>
                                  <span>{machineStatus.rt_fecha_inicio ? new Date(machineStatus.rt_fecha_inicio).toLocaleString('es-ES') : '—'}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span className="fw-semibold">Fin estimado</span>
                                  <span>{machineStatus.rt_fecha_fin_estimada ? new Date(machineStatus.rt_fecha_fin_estimada).toLocaleString('es-ES') : '—'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {machines.length === 0 && (
                    <div className="text-center py-5">
                      <i className="fas fa-industry text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                      <h5 className="text-muted">Ninguna máquina encontrada</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

            {/* Efficiency Summary */}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card radius-15">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="mb-0">Eficiencia por Tipo de Máquina</h5>
                      </div>
                      <div className="dropdown ms-auto">
                        <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="javascript:;">Acción</a>
                          <a className="dropdown-item" href="javascript:;">Otra acción</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="javascript:;">Algo más aquí</a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">Dobladora <span className="float-end">
                          {machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).length > 0 ?
                            Math.round(machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).length) : 0}%
                        </span></p>
                        <div className="progress radius-15" style={{ height: '5px' }}>
                          <div className="progress-bar" role="progressbar" style={{ width: `${machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).length > 0 ? Math.round(machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('DOBL')).length) : 0}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">Soldadura <span className="float-end">
                          {machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).length > 0 ?
                            Math.round(machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).length) : 0}%
                        </span></p>
                        <div className="progress radius-15" style={{ height: '5px' }}>
                          <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).length > 0 ? Math.round(machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('SOLD')).length) : 0}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">Troqueladora <span className="float-end">
                          {machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).length > 0 ?
                            Math.round(machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).length) : 0}%
                        </span></p>
                        <div className="progress radius-15" style={{ height: '5px' }}>
                          <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).length > 0 ? Math.round(machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('TROQ')).length) : 0}%` }}></div>
                        </div>
                      </div>
                      <div className="progress-wrapper">
                        <p className="mb-1">Terminación <span className="float-end">
                          {machines.filter(m => m.machine.Cod_maquina.includes('TERM')).length > 0 ?
                            Math.round(machines.filter(m => m.machine.Cod_maquina.includes('TERM')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('TERM')).length) : 0}%
                        </span></p>
                        <div className="progress radius-15" style={{ height: '5px' }}>
                          <div className="progress-bar bg-info" role="progressbar" style={{ width: `${machines.filter(m => m.machine.Cod_maquina.includes('TERM')).length > 0 ? Math.round(machines.filter(m => m.machine.Cod_maquina.includes('TERM')).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter(m => m.machine.Cod_maquina.includes('TERM')).length) : 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card radius-15">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0 me-3">Estado de Producción</h5>
                        <div className="btn-group" role="group" aria-label="Período de tiempo">
                          <input type="radio" className="btn-check" name="periodBtn" id="periodMonth" defaultChecked onChange={handlePeriodChange} />
                          <label className="btn btn-outline-primary btn-sm" htmlFor="periodMonth">Mes</label>

                          <input type="radio" className="btn-check" name="periodBtn" id="periodDay" onChange={handlePeriodChange} />
                          <label className="btn btn-outline-primary btn-sm" htmlFor="periodDay">Día</label>

                          <input type="radio" className="btn-check" name="periodBtn" id="periodHour" onChange={handlePeriodChange} />
                          <label className="btn btn-outline-primary btn-sm" htmlFor="periodHour">Hora</label>
                        </div>
                      </div>
                      <div className="dropdown ms-auto">
                        <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="javascript:;">Acción</a>
                          <a className="dropdown-item" href="javascript:;">Otra acción</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="javascript:;">Algo más aquí</a>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 g-3">
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Piezas OK (Día)</p>
                              </div>
                              <div className="ms-auto text-success">
                                <span>+{currentData?.ok ?? 0}</span>
                              </div>
                            </div>
                            <h4 className="mb-0">
                              {currentData?.ok ?? 0}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Piezas NOK (Día)</p>
                              </div>
                              <div className="ms-auto text-danger">
                                <span>+{currentData?.nok ?? 0}</span>
                              </div>
                            </div>
                            <h4 className="mb-0">
                              {currentData?.nok ?? 0}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Retrabajo (Día)</p>
                              </div>
                              <div className="ms-auto text-warning">
                                <span>+{currentData?.rw ?? 0}</span>
                              </div>
                            </div>
                            <h4 className="mb-0">{currentData?.rw ?? 0}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Pérdidas Día (€)</p>
                              </div>
                              <div className="ms-auto text-danger">
                                <span>{currentData ? currentData.perdidas_eur.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '—'}</span>
                              </div>
                            </div>
                            <h4 className="mb-0">{currentData ? currentData.perdidas_eur.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '—'}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Detail Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <div className="footer">
        <p className="mb-0">Sistema SCADA MRPII - © 2024 Grupo KH</p>
      </div>

      {/* Theme Customizer */}
      <div className="switcher-body">
        <button className="btn btn-primary btn-switcher shadow-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
          <i className="bx bx-cog bx-spin"></i>
        </button>
        <div className="offcanvas offcanvas-end shadow border-start-0 p-2" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling">
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Personalizador de Tema</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body">
            <h6 className="mb-0">Variación de Tema</h6>
            <hr />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lightmode" value="option1" defaultChecked />
              <label className="form-check-label" htmlFor="lightmode">Claro</label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darkmode" value="option2" />
              <label className="form-check-label" htmlFor="darkmode">Oscuro</label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darksidebar" value="option3" />
              <label className="form-check-label" htmlFor="darksidebar">Barra Lateral Oscura</label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ColorLessIcons" value="option4" />
              <label className="form-check-label" htmlFor="ColorLessIcons">Iconos sin Color</label>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
