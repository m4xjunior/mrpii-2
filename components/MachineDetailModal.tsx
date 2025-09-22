'use client';

import { useState, useEffect } from 'react';
import { MachineStatus } from '../types/machine';
import HistoricalCharts from './HistoricalCharts';
import FinancialDashboard from './FinancialDashboard';
import ProductionCounter from './ProductionCounter';
import MachineProductionChart from './MachineProductionChart';
import HistoricalProductionChart from './HistoricalProductionChart';
import { useTheme } from '../hooks/useTheme';
import useResponsiveLayout from '../hooks/useResponsiveLayout';

interface MachineDetailModalProps {
  machine: MachineStatus | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineDetailModal({ machine, isOpen, onClose }: MachineDetailModalProps) {
  const { isDark, themeColors } = useTheme();
  const { isMobile, isTablet, getSpacing, getFontSize, getBreakpointStyles, getGridCols } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('graficos');
  const [tabData, setTabData] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [financialData, setFinancialData] = useState<any>(null);
  const [insightsData, setInsightsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [financialLoading, setFinancialLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'stats'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('fecha');
  const [selectedMachineForChart, setSelectedMachineForChart] = useState<string>(machine?.machine?.Cod_maquina || '');


  useEffect(() => {
    if (isOpen && machine) {
      fetchTabData(activeTab);
      if (!historicalData) {
        fetchHistoricalData();
      }
      if (!financialData) {
        fetchFinancialData();
      }
      if (!insightsData) {
        fetchInsightsData();
      }
    }
  }, [isOpen, machine, activeTab]);

  const fetchTabData = async (tab: string) => {
    if (!machine) return;

    setLoading(true);
    try {
      const response = await fetch('/api/scada/machine-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          machineId: machine.machine.Cod_maquina,
          tab
        })
      });

      const result = await response.json();
      if (result.success) {
        setTabData(result.data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da tab:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    if (!machine) return;

    setHistoricalLoading(true);
    try {
      // Use same parameters as machine-details API for consistency
      const response = await fetch(`/api/analytics/historical?machineId=${machine.machine.Cod_maquina}&days=30&aggregation=day&tab=historico`);
      const result = await response.json();
      if (result.success) {
        setHistoricalData(result.data);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setHistoricalLoading(false);
    }
  };

  const fetchFinancialData = async () => {
    if (!machine) return;

    setFinancialLoading(true);
    try {
      // Synchronize with machine-details API pattern - use same machineId parameter
      const [historicalResponse, insightsResponse] = await Promise.all([
        fetch(`/api/analytics/historical?machineId=${machine.machine.Cod_maquina}&days=30&tab=financiero`),
        fetch(`/api/analytics/insights?machineId=${machine.machine.Cod_maquina}&tab=insights`)
      ]);

      const [historicalResult, insightsResult] = await Promise.all([
        historicalResponse.json(),
        insightsResponse.json()
      ]);

      if (historicalResult.success && insightsResult.success) {
        setFinancialData({
          historical: historicalResult.data,
          insights: insightsResult.data
        });
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setFinancialLoading(false);
    }
  };

  const fetchInsightsData = async () => {
    if (!machine) return;

    try {
      // Use consistent parameter pattern with machine-details API
      const response = await fetch(`/api/analytics/insights?machineId=${machine.machine.Cod_maquina}&tab=insights`);
      const result = await response.json();
      if (result.success) {
        setInsightsData(result.data);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  if (!isOpen || !machine) return null;

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: 'fas fa-dashboard' },
    { id: 'of', label: 'OF Actual', icon: 'fas fa-clipboard-list' },
    { id: 'paros', label: 'Paradas', icon: 'fas fa-pause-circle' },
    { id: 'produccion', label: 'Producción', icon: 'fas fa-chart-line' },
    { id: 'oee', label: 'OEE', icon: 'fas fa-tachometer-alt' },
    { id: 'historico', label: 'Histórico', icon: 'fas fa-history' },
    { id: 'graficos', label: 'Gráficos', icon: 'fas fa-chart-area' },
    { id: 'financiero', label: 'Análisis €', icon: 'fas fa-euro-sign' },
    { id: 'insights', label: 'Insights IA', icon: 'fas fa-lightbulb' },
    { id: 'gestion', label: 'Gestión', icon: 'fas fa-cogs' },
    { id: 'pedidos', label: 'Pedidos', icon: 'fas fa-shopping-cart' },
    { id: 'ventas', label: 'Ventas', icon: 'fas fa-dollar-sign' }
  ];

  const modalBackdrop = isDark
    ? 'rgba(0, 0, 0, 0.85)'
    : 'rgba(0, 0, 0, 0.4)';

  return (
    <div
      className="modal fade show"
      style={{
        display: 'block',
        backgroundColor: modalBackdrop,
        zIndex: 1060
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{
          ...getBreakpointStyles({
            mobile: { maxWidth: '95vw', margin: '1rem auto' },
            tablet: { maxWidth: '85vw', margin: '1.5rem auto' },
            desktop: { maxWidth: '80vw', margin: '2rem auto' }
          }),
          width: '100%'
        }}
      >
        <div
          className="modal-content border-0"
          style={{
            borderRadius: isMobile ? '15px' : isTablet ? '18px' : '20px',
            overflow: 'hidden',
            backgroundColor: themeColors.background,
            color: themeColors.text,
            boxShadow: `0 25px 50px ${themeColors.shadow}`,
            maxHeight: isMobile ? '90vh' : isTablet ? '88vh' : '85vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div
            className="modal-header border-0"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              color: 'white',
              padding: getSpacing(0.8, 1, 1.5),
              flexShrink: 0
            }}
          >
            <div className="d-flex align-items-center w-100">
              <div className={isMobile ? "me-2" : "me-3"}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: isMobile ? '50px' : '60px',
                    height: isMobile ? '50px' : '60px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <i
                    className="fas fa-cog"
                    style={{
                      fontSize: isMobile ? '1.4rem' : '1.8rem',
                      color: 'white'
                    }}
                  ></i>
                </div>
              </div>
              <div className="flex-grow-1">
                <h3
                  className="modal-title mb-1"
                  style={{
                    fontWeight: '600',
                    fontSize: getFontSize(1.2, 1.3, 1.5),
                    lineHeight: '1.2'
                  }}
                >
                  {machine.machine.Cod_maquina}
                </h3>
                {!isMobile && (
                  <>
                    <p className="mb-1" style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                      {machine.machine.desc_maquina}
                    </p>
                    <small style={{ opacity: '0.8', fontSize: '0.9rem' }}>
                      <i className="fas fa-info-circle me-1"></i>
                      Panel de control y análisis completo
                    </small>
                  </>
                )}
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                style={{
                  filter: 'invert(1)',
                  opacity: '0.8',
                  fontSize: '1.2rem',
                  padding: '0.8rem'
                }}
              ></button>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body p-0" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Machine Status Header */}
            <div
              className="machine-status-header"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)'
                  : 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                padding: getSpacing(0.8, 1, 1.2),
                borderBottom: `1px solid ${themeColors.border}`,
                flexShrink: 0
              }}
            >
              <div className="row g-2 g-md-4">
                {[
                  {
                    icon: 'fas fa-info-circle',
                    value: getStatusText(machine.status),
                    label: 'Estado Actual',
                    color: machine.status === 'PRODUCIENDO' ? themeColors.success :
                           machine.status === 'ACTIVA' ? themeColors.info :
                           machine.status === 'MANTENIMIENTO' ? themeColors.warning : themeColors.error
                  },
                  {
                    icon: 'fas fa-check-circle',
                    value: machine.production.ok.toLocaleString(),
                    label: 'Piezas OK',
                    color: themeColors.success
                  },
                  {
                    icon: 'fas fa-times-circle',
                    value: machine.production.nok.toLocaleString(),
                    label: 'Piezas NOK',
                    color: themeColors.error
                  },
                  {
                    icon: 'fas fa-tachometer-alt',
                    value: `${machine.efficiency}%`,
                    label: 'Eficiencia',
                    color: machine.efficiency >= 80 ? themeColors.success :
                           machine.efficiency >= 60 ? themeColors.warning : themeColors.error
                  }
                ].map((metric, index) => (
                  <div key={index} className={`col-${getGridCols(6, 4, 3)}`}>
                    <div
                      className="card border-0 h-100"
                      style={{
                        borderRadius: isMobile ? '15px' : isTablet ? '18px' : '20px',
                        background: themeColors.surface,
                        border: `1px solid ${themeColors.border}`,
                        boxShadow: `0 8px 25px ${themeColors.shadow}`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div
                        className="card-body text-center"
                        style={{ padding: `${getSpacing(0.7, 0.8, 1)} ${getSpacing(0.3, 0.6, 1)}` }}
                      >
                        <div className="mb-3">
                          <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                            style={{
                              width: '50px',
                              height: '50px',
                              backgroundColor: `${metric.color}20`,
                              color: metric.color
                            }}
                          >
                            <i className={metric.icon} style={{ fontSize: '1.2rem' }}></i>
                          </div>
                        </div>
                        <h6 className="fw-bold mb-1" style={{ color: metric.color }}>
                          {metric.value}
                        </h6>
                        <small style={{ color: themeColors.textSecondary }}>{metric.label}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div
              className="tabs-navigation"
              style={{
                background: themeColors.background,
                padding: `${getSpacing(0.4, 0.6, 0.8)} ${getSpacing(0.8, 1, 1.2)} 0`,
                borderBottom: `1px solid ${themeColors.border}`,
                flexShrink: 0,
                overflowX: 'auto'
              }}
            >
              <div className="d-flex gap-1" style={{ minWidth: 'max-content' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className="btn border-0 position-relative"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      borderRadius: '12px 12px 0 0',
                      background: activeTab === tab.id
                        ? `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`
                        : 'transparent',
                      transition: 'all 0.3s ease',
                      fontWeight: activeTab === tab.id ? '600' : '500',
                      boxShadow: activeTab === tab.id ? `0 -4px 20px ${themeColors.primary}40` : 'none',
                      transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)',
                      minWidth: isMobile ? '80px' : isTablet ? '110px' : '140px',
                      padding: `${getSpacing(0.5, 0.6, 0.75)} ${getSpacing(0.75, 0.85, 1)}`,
                      fontSize: getFontSize(0.8, 0.85, 0.9),
                      color: activeTab === tab.id ? 'white' : themeColors.textSecondary
                    }}
                  >
                    <i
                      className={`${tab.icon} ${isMobile ? 'd-block' : 'me-2'}`}
                      style={{
                        opacity: activeTab === tab.id ? '1' : '0.7',
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}
                    ></i>
                    <span className="d-none d-md-inline">{tab.label}</span>
                    <span className="d-md-none d-none d-sm-inline" style={{ fontSize: '0.8rem' }}>
                      {tab.label.split(' ')[0]}
                    </span>
                    {activeTab === tab.id && (
                      <div
                        className="position-absolute bottom-0 start-0 w-100"
                        style={{
                          height: '3px',
                          background: 'rgba(255,255,255,0.8)',
                          borderRadius: '2px 2px 0 0'
                        }}
                      ></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div
              className="tab-content"
              style={{
                height: 'auto',
                maxHeight: isMobile ? 'calc(80vh - 280px)' : isTablet ? 'calc(82vh - 300px)' : 'calc(85vh - 320px)',
                padding: getSpacing(0.6, 0.8, 1),
                background: isDark
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)'
                  : 'linear-gradient(135deg, #fafbff 0%, #f0f7ff 100%)',
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {loading && ['of', 'paros', 'produccion', 'oee', 'pedidos', 'ventas'].includes(activeTab) ? (
                <div className="text-center py-5">
                  <div className="spinner-border mb-3" style={{ color: themeColors.primary }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <h6 style={{ color: themeColors.primary }}>Cargando datos...</h6>
                  <small style={{ color: themeColors.textSecondary }}>Procesando información de la máquina</small>
                </div>
              ) : (
                <div className="tab-content-container" style={{
                  flex: 1,
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${themeColors.primary} transparent`
                }}>
                  {renderTabContent(activeTab, tabData, historicalData, financialData, insightsData, historicalLoading, financialLoading, machine, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, selectedMachineForChart, setSelectedMachineForChart, isDark, themeColors, isMobile, isTablet, getGridCols)}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className="modal-footer border-0"
            style={{
              background: themeColors.background,
              padding: `${getSpacing(0.8, 0.9, 1)} ${getSpacing(0.8, 1, 1.2)}`,
              borderTop: `1px solid ${themeColors.border}`,
              flexShrink: 0
            }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center w-100 gap-2">
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                {[
                  { icon: 'fas fa-download', label: 'Exportar' },
                  { icon: 'fas fa-print', label: 'Imprimir' },
                  { icon: 'fas fa-share', label: 'Compartir' }
                ].map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="btn border-0"
                    style={{
                      borderRadius: '12px',
                      background: isDark
                        ? 'linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%)'
                        : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      boxShadow: `0 4px 15px ${themeColors.shadow}`,
                      transition: 'all 0.3s ease',
                      fontWeight: '500',
                      color: themeColors.text,
                      fontSize: getFontSize(0.8, 0.85, 0.9),
                      padding: `${getSpacing(0.5, 0.6, 0.75)} ${getSpacing(1, 1.1, 1.25)}`
                    }}
                  >
                    <i className={`${action.icon} me-2`}></i>
                    {action.label}
                  </button>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-end">
                <button
                  type="button"
                  className="btn border-0"
                  style={{
                    borderRadius: '12px',
                    background: isDark
                      ? 'linear-gradient(135deg, #4a4a00 0%, #6a6a00 100%)'
                      : 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                    boxShadow: `0 4px 15px ${themeColors.warning}40`,
                    transition: 'all 0.3s ease',
                    fontWeight: '500',
                    color: isDark ? '#ffeb3b' : '#856404',
                    fontSize: getFontSize(0.8, 0.85, 0.9),
                    padding: `${getSpacing(0.5, 0.6, 0.75)} ${getSpacing(1, 1.1, 1.25)}`
                  }}
                >
                  <i className="fas fa-cog me-2"></i>
                  Configurar
                </button>
                <button
                  type="button"
                  className="btn text-white border-0"
                  onClick={onClose}
                  style={{
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                    boxShadow: `0 4px 15px ${themeColors.primary}60`,
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    fontSize: getFontSize(0.8, 0.85, 0.9),
                    padding: `${getSpacing(0.5, 0.6, 0.75)} ${getSpacing(1, 1.1, 1.25)}`
                  }}
                >
                  <i className="fas fa-times me-2"></i>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusText(status: string) {
  switch (status) {
    case 'PRODUCIENDO': return 'PRODUCCIÓN';
    case 'ACTIVA': return 'ACTIVA';
    case 'PARADA': return 'PARADA';
    case 'MANTENIMIENTO': return 'MANTENIMIENTO';
    default: return 'INACTIVA';
  }
}

function renderTabContent(tab: string, data: any, historicalData: any, financialData: any, insightsData: any, historicalLoading: boolean, financialLoading: boolean, machine: any, viewMode: string, setViewMode: Function, filterType: string, setFilterType: Function, filterDuration: string, setFilterDuration: Function, sortBy: string, setSortBy: Function, selectedMachineForChart: string, setSelectedMachineForChart: Function, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function) {
  switch (tab) {
    case 'resumen':
      return renderResumenContent(machine, historicalData, insightsData, isDark, themeColors, isMobile, isTablet, getGridCols);
    case 'of':
      return data ? renderOFContent(data, themeColors) : renderNoData(themeColors);
    case 'paros':
      return data ? renderParosContent(data, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, themeColors) : renderNoData(themeColors);
    case 'produccion':
      return data ? <ProduccionContent data={data} themeColors={themeColors} /> : renderNoData(themeColors);
    case 'oee':
      return data ? renderOEEContent(data, themeColors) : renderNoData(themeColors);
    case 'historico':
      return data ? renderHistoricoContent(data, themeColors) : renderNoData(themeColors);
    case 'graficos':
      return (
        <div>
          {/* Machine Selector for Charts */}
          <div className="mb-4 p-3 rounded" style={{
            background: themeColors.surface,
            border: `1px solid ${themeColors.border}`
          }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <label className="form-label fw-bold mb-2" style={{ color: themeColors.text }}>
                  <i className="fas fa-industry me-2" style={{ color: themeColors.primary }}></i>
                  Seleccionar Máquina para Análisis:
                </label>
                <select
                  className="form-select"
                  value={selectedMachineForChart}
                  onChange={(e) => setSelectedMachineForChart(e.target.value)}
                  style={{
                    background: themeColors.background,
                    border: `1px solid ${themeColors.border}`,
                    color: themeColors.text,
                    borderRadius: '10px'
                  }}
                >
                  <option value={machine?.machine?.Cod_maquina}>
                    {machine?.machine?.Cod_maquina} - {machine?.machine?.desc_maquina} (Actual)
                  </option>
                  <option value="ALL">Todas las Máquinas (Comparativo)</option>
                  <option value="M001">M001 - Torno CNC Principal</option>
                  <option value="M002">M002 - Fresadora Universal</option>
                  <option value="M003">M003 - Centro Mecanizado</option>
                  <option value="M004">M004 - Rectificadora</option>
                </select>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-wrap gap-2 mt-2 mt-md-4">
                  <span className="badge" style={{
                    background: `${themeColors.success}20`,
                    color: themeColors.success,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>
                    <i className="fas fa-chart-line me-1"></i>
                    Análisis en Tiempo Real
                  </span>
                  <span className="badge" style={{
                    background: `${themeColors.info}20`,
                    color: themeColors.info,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                  }}>
                    <i className="fas fa-sync me-1"></i>
                    Auto-actualización
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <HistoricalCharts
              machineId={selectedMachineForChart === 'ALL' ? undefined : selectedMachineForChart}
              data={historicalData}
              isLoading={historicalLoading}
              isDark={isDark}
              themeColors={themeColors}
            />
          </div>
        </div>
      );
    case 'financiero':
      return <FinancialDashboard data={financialData} isLoading={financialLoading} machineId={machine?.machine?.Cod_maquina} isDark={isDark} themeColors={themeColors} />;
    case 'insights':
      return renderInsightsContent(insightsData, themeColors);
    case 'gestion':
      return renderGestionContent(machine, themeColors);
    case 'pedidos':
      return data ? renderPedidosContent(data, themeColors) : renderNoData(themeColors);
    case 'ventas':
      return data ? renderVentasContent(data, themeColors) : renderNoData(themeColors);
    default:
      return <div style={{ color: themeColors.text }}>Sección no implementada</div>;
  }
}

function renderNoData(themeColors: any) {
  return (
    <div className="text-center py-4">
      <i className="fas fa-info-circle mb-2" style={{ fontSize: '2rem', color: themeColors.textSecondary }}></i>
      <p style={{ color: themeColors.textSecondary }}>No hay datos disponibles para esta sección</p>
    </div>
  );
}

function renderOFContent(data: any, themeColors: any) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card" style={{ background: themeColors.surface, border: `1px solid ${themeColors.border}` }}>
          <div className="card-header" style={{ background: themeColors.primary, color: 'white' }}>
            <h6><i className="fas fa-clipboard-list me-2"></i>Información de la OF</h6>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: themeColors.text }}>Código OF:</label>
              <span className="ms-2" style={{ color: themeColors.textSecondary }}>{data.Rt_Cod_of || '--'}</span>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: themeColors.text }}>Producto:</label>
              <span className="ms-2" style={{ color: themeColors.textSecondary }}>{data.Rt_Desc_producto || data.Rt_Desc_produto || '--'}</span>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: themeColors.text }}>Planificadas:</label>
              <span className="ms-2" style={{ color: themeColors.textSecondary }}>{data.Rt_Unidades_planning || 0} unidades</span>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: themeColors.text }}>Producidas:</label>
              <span className="ms-2" style={{ color: themeColors.textSecondary }}>{data.total_produced || 0} unidades</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderParosContent(data: any, viewMode: string, setViewMode: Function, filterType: string, setFilterType: Function, filterDuration: string, setFilterDuration: Function, sortBy: string, setSortBy: Function, themeColors: any) {
  const paros: any[] = Array.isArray(data) ? data : (data?.paros || []);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <select className="form-select form-select-sm me-2 d-inline-block w-auto" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ background: themeColors.background, border: `1px solid ${themeColors.border}`, color: themeColors.text }}>
            <option value="all">Todos los tipos</option>
          </select>
          <select className="form-select form-select-sm me-2 d-inline-block w-auto" value={filterDuration} onChange={(e) => setFilterDuration(e.target.value)} style={{ background: themeColors.background, border: `1px solid ${themeColors.border}`, color: themeColors.text }}>
            <option value="all">Cualquier duración</option>
          </select>
          <select className="form-select form-select-sm d-inline-block w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ background: themeColors.background, border: `1px solid ${themeColors.border}`, color: themeColors.text }}>
            <option value="fecha">Fecha</option>
          </select>
        </div>
        <div>
          <button className={`btn btn-sm btn-outline-primary ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><i className="fas fa-list"></i></button>
          <button className={`btn btn-sm btn-outline-primary ${viewMode === 'cards' ? 'active' : ''}`} onClick={() => setViewMode('cards')}><i className="fas fa-th"></i></button>
          <button className={`btn btn-sm btn-outline-primary ${viewMode === 'stats' ? 'active' : ''}`} onClick={() => setViewMode('stats')}><i className="fas fa-chart-pie"></i></button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped" style={{ background: themeColors.surface }}>
          <thead style={{ background: themeColors.primary, color: 'white' }}>
            <tr>
              <th><i className="fas fa-calendar me-2"></i>Hora Inicio</th>
              <th><i className="fas fa-calendar me-2"></i>Hora Fin</th>
              <th><i className="fas fa-clock me-2"></i>Duración</th>
              <th><i className="fas fa-clipboard-list me-2"></i>OF</th>
              <th><i className="fas fa-barcode me-2"></i>Referencia</th>
              <th><i className="fas fa-list me-2"></i>Tipo</th>
              <th><i className="fas fa-exclamation-triangle me-2"></i>Descripción</th>
              <th><i className="fas fa-user me-2"></i>Operario / OP Obs</th>
              <th><i className="fas fa-sticky-note me-2"></i>Observaciones</th>
              <th><i className="fas fa-hourglass-half me-2"></i>Segundos</th>
            </tr>
          </thead>
          <tbody style={{ color: themeColors.text }}>
            {paros.map((paro: any, index: number) => (
              <tr key={index}>
                <td>{new Date(paro.fecha_ini || paro.fecha_inicio).toLocaleString('es-ES')}</td>
                <td>{paro.fecha_fin ? new Date(paro.fecha_fin).toLocaleString('es-ES') : 'En curso'}</td>
                <td>{(paro.duracion_minutos ?? paro.duracion_calculada ?? 0)} min</td>
                <td>{paro.cod_of || '--'}</td>
                <td>{paro.referencia || '--'}</td>
                <td>{paro.id_paro || ''}</td>
                <td>{paro.desc_paro || ''}</td>
                <td>{paro.Id_operario ? `${paro.Id_operario}` : '0 / 0'}</td>
                <td>{paro.observaciones || ''}</td>
                <td>{((paro.duracion_minutos ?? 0) * 60)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente separado para el contenido de producción
function ProduccionContent({ data, themeColors }: { data: any[]; themeColors: any }) {
  const [productionData, setProductionData] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductionData();
    const interval = setInterval(fetchProductionData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchProductionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scada/production');
      if (response.ok) {
        const data = await response.json();
        setProductionData(data.data || []);
      }
    } catch (error) {
      console.error('Error al obtener datos de producción:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMachineClick = (machineId: string) => {
    setSelectedMachine(machineId);
  };

  const handleHistoricalChartClose = () => {
    setSelectedMachine(null);
  };

  if (isLoading && productionData.length === 0) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" style={{ color: themeColors.primary }} role="status">
          <span className="visually-hidden">Cargando datos de producción...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="production-content">
      {/* Contador Principal */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0" style={{ background: themeColors.surface, boxShadow: `0 8px 25px ${themeColors.shadow}` }}>
            <div className="card-body text-center">
              <h4 className="card-title mb-3" style={{ color: themeColors.text }}>
                <i className="fas fa-chart-line me-2" style={{ color: themeColors.primary }}></i>
                Estado de Producción
              </h4>
              <div className="row g-3 justify-content-center">
                <div className="col-md-4 col-sm-6">
                  <ProductionCounter
                    targetValue={productionData.reduce((sum, machine) => sum + machine.ok, 0)}
                    label="Piezas OK (Mes)"
                    showIncrement={true}
                  />
                </div>
                <div className="col-md-4 col-sm-6">
                  <ProductionCounter
                    targetValue={productionData.reduce((sum, machine) => sum + machine.nok, 0)}
                    label="Piezas NOK (Mes)"
                    showIncrement={false}
                  />
                </div>
                <div className="col-md-4 col-sm-6">
                  <ProductionCounter
                    targetValue={productionData.reduce((sum, machine) => sum + machine.rw, 0)}
                    label="Rechazos (Mes)"
                    showIncrement={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Desglose por Máquina */}
      <div className="row mb-4">
        <div className="col-12">
          <MachineProductionChart
            data={productionData}
            onMachineClick={handleMachineClick}
          />
        </div>
      </div>
    </div>
  );
}

function renderOEEContent(data: any[], themeColors: any) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" style={{ background: themeColors.surface }}>
        <thead style={{ background: themeColors.primary, color: 'white' }}>
          <tr>
            <th><i className="fas fa-calendar me-2"></i>Data</th>
            <th><i className="fas fa-sun me-2"></i>Turno</th>
            <th><i className="fas fa-clock me-2"></i>Disponibilidade</th>
            <th><i className="fas fa-chart-line me-2"></i>Rendimento</th>
            <th><i className="fas fa-check-circle me-2"></i>Qualidade</th>
            <th><i className="fas fa-trophy me-2"></i>OEE</th>
          </tr>
        </thead>
        <tbody style={{ color: themeColors.text }}>
          {data.map((oee: any, index: number) => (
            <tr key={index}>
              <td>{new Date(oee.fecha).toLocaleDateString('pt-BR')}</td>
              <td>{oee.turno}</td>
              <td className={getOEEColorClass(oee.disponibilidad)}>{oee.disponibilidad}%</td>
              <td className={getOEEColorClass(oee.rendimiento)}>{oee.rendimiento}%</td>
              <td className={getOEEColorClass(oee.calidad)}>{oee.calidad}%</td>
              <td className={getOEEColorClass(oee.oee)}><strong>{oee.oee}%</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderPedidosContent(data: any[], themeColors: any) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" style={{ background: themeColors.surface }}>
        <thead style={{ background: themeColors.primary, color: 'white' }}>
          <tr>
            <th><i className="fas fa-hashtag me-2"></i>Código</th>
            <th><i className="fas fa-box me-2"></i>Produto</th>
            <th><i className="fas fa-sort-numeric-up me-2"></i>Quantidade</th>
            <th><i className="fas fa-check-double me-2"></i>Entregue</th>
            <th><i className="fas fa-calendar me-2"></i>Data Pedido</th>
            <th><i className="fas fa-flag me-2"></i>Status</th>
          </tr>
        </thead>
        <tbody style={{ color: themeColors.text }}>
          {data.map((pedido: any, index: number) => (
            <tr key={index}>
              <td>{pedido.cod_pedido}</td>
              <td>{pedido.desc_produto}</td>
              <td>{pedido.cantidad_pedido}</td>
              <td>{pedido.cantidad_entregada}</td>
              <td>{new Date(pedido.fecha_pedido).toLocaleDateString('pt-BR')}</td>
              <td>
                <span className={`badge ${getPedidoStatusClass(pedido.estado_pedido)}`}>
                  {pedido.estado_pedido}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderHistoricoContent(data: any[], themeColors: any) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" style={{ background: themeColors.surface }}>
        <thead style={{ background: themeColors.primary, color: 'white' }}>
          <tr>
            <th><i className="fas fa-calendar me-2"></i>Data</th>
            <th><i className="fas fa-check me-2 text-success"></i>Total OK</th>
            <th><i className="fas fa-times me-2 text-danger"></i>Total NOK</th>
            <th><i className="fas fa-redo me-2 text-warning"></i>Total RW</th>
            <th><i className="fas fa-percentage me-2"></i>Eficiência</th>
          </tr>
        </thead>
        <tbody style={{ color: themeColors.text }}>
          {data.map((hist: any, index: number) => (
            <tr key={index}>
              <td>{new Date(hist.fecha).toLocaleDateString('pt-BR')}</td>
              <td className="text-success">{hist.total_ok}</td>
              <td className="text-danger">{hist.total_nok}</td>
              <td className="text-warning">{hist.total_rw}</td>
              <td className={getOEEColorClass(hist.eficiencia_diaria)}>
                {Math.round(hist.eficiencia_diaria)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderVentasContent(data: any[], themeColors: any) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" style={{ background: themeColors.surface }}>
        <thead style={{ background: themeColors.primary, color: 'white' }}>
          <tr>
            <th><i className="fas fa-hashtag me-2"></i>Código</th>
            <th><i className="fas fa-user me-2"></i>Cliente</th>
            <th><i className="fas fa-box me-2"></i>Produto</th>
            <th><i className="fas fa-sort-numeric-up me-2"></i>Quantidade</th>
            <th><i className="fas fa-dollar-sign me-2"></i>Valor</th>
            <th><i className="fas fa-calendar me-2"></i>Data</th>
            <th><i className="fas fa-truck me-2"></i>Entrega</th>
          </tr>
        </thead>
        <tbody style={{ color: themeColors.text }}>
          {data.map((venta: any, index: number) => (
            <tr key={index}>
              <td>{venta.cod_venta}</td>
              <td>{venta.cliente}</td>
              <td>{venta.produto}</td>
              <td>{venta.cantidad}</td>
              <td>€{venta.valor_venta}</td>
              <td>{new Date(venta.fecha_venta).toLocaleDateString('pt-BR')}</td>
              <td>
                <span className={`badge ${getEntregaStatusClass(venta.estado_entrega)}`}>
                  {venta.estado_entrega}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getOEEColorClass(value: number) {
  if (value >= 80) return 'text-success';
  if (value >= 60) return 'text-warning';
  return 'text-danger';
}

function getPedidoStatusClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'completado': return 'bg-success';
    case 'en produccion': return 'bg-primary';
    case 'pendiente': return 'bg-warning';
    default: return 'bg-secondary';
  }
}

function getEntregaStatusClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'entregado': return 'bg-success';
    case 'en transito': return 'bg-primary';
    case 'pendiente': return 'bg-warning';
    default: return 'bg-secondary';
  }
}

// Nuevo tab de resumen con métricas principales
function renderResumenContent(machine: any, historicalData: any, insightsData: any, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function) {
  return (
    <div className="resumen-content">
      {/* Métricas principales en cards */}
      <div className="row mb-4">
        {[
          { icon: 'fas fa-tachometer-alt', value: `${machine?.efficiency || 0}%`, label: 'OEE Actual', color: themeColors.primary },
          { icon: 'fas fa-check-circle', value: machine?.production?.ok || 0, label: 'Piezas OK', color: themeColors.success },
          { icon: 'fas fa-times-circle', value: machine?.production?.nok || 0, label: 'Piezas NOK', color: themeColors.error },
          { icon: 'fas fa-clock', value: `${historicalData?.summary?.total_downtime_hours?.toFixed(1) || 0}h`, label: 'Paradas Mes', color: themeColors.warning },
          { icon: 'fas fa-euro-sign', value: `€${((historicalData?.cost_analysis?.[0]?.costo_total_perdidas_euros || 0)).toLocaleString('es-ES')}`, label: 'Pérdidas Mes', color: themeColors.info },
          { icon: 'fas fa-chart-line', value: historicalData?.summary?.total_production?.toLocaleString() || 0, label: 'Prod. Total', color: themeColors.secondary }
        ].map((metric, index) => (
          <div key={index} className={`col-${getGridCols(6, 4, 2)}`}>
            <div className="card text-center" style={{
              background: themeColors.surface,
              border: `1px solid ${themeColors.border}`,
              borderRadius: isMobile ? '12px' : isTablet ? '15px' : '18px'
            }}>
              <div className="card-body">
                <i className={`${metric.icon} mb-2`} style={{ fontSize: '2rem', color: metric.color }}></i>
                <h5 style={{ color: metric.color }}>{metric.value}</h5>
                <small style={{ color: themeColors.textSecondary }}>{metric.label}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alertas y insights rápidos */}
      <div className="row">
        <div className="col-md-6">
          <div className="card" style={{ background: themeColors.surface, border: `1px solid ${themeColors.border}` }}>
            <div className="card-header" style={{ background: themeColors.warning, color: 'white' }}>
              <h6 className="mb-0"><i className="fas fa-exclamation-triangle me-2"></i>Alertas Activas</h6>
            </div>
            <div className="card-body">
              {insightsData?.alertas?.length > 0 ? (
                <div className="list-group list-group-flush">
                  {insightsData.alertas.slice(0, 3).map((alerta: any, index: number) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong style={{ color: alerta.severidad === 'CRITICA' ? themeColors.error : alerta.severidad === 'ALTA' ? themeColors.warning : themeColors.info }}>
                          {alerta.tipo.replace('_', ' ')}
                        </strong>
                        <br />
                        <small style={{ color: themeColors.textSecondary }}>{alerta.mensaje}</small>
                      </div>
                      <span className={`badge bg-${alerta.severidad === 'CRITICA' ? 'danger' : alerta.severidad === 'ALTA' ? 'warning' : 'info'}`}>
                        {alerta.severidad}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <i className="fas fa-check-circle mb-2" style={{ fontSize: '2rem', color: themeColors.success }}></i>
                  <p style={{ color: themeColors.success }} className="mb-0">Sin alertas activas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card" style={{ background: themeColors.surface, border: `1px solid ${themeColors.border}` }}>
            <div className="card-header" style={{ background: themeColors.info, color: 'white' }}>
              <h6 className="mb-0"><i className="fas fa-lightbulb me-2"></i>Recomendaciones IA</h6>
            </div>
            <div className="card-body">
              {insightsData?.recomendaciones?.length > 0 ? (
                <div className="list-group list-group-flush">
                  {insightsData.recomendaciones.slice(0, 3).map((rec: any, index: number) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1" style={{ color: themeColors.text }}>{rec.accion}</h6>
                        <small style={{ color: themeColors.textSecondary }}>{rec.prioridad}</small>
                      </div>
                      <p className="mb-1" style={{ color: themeColors.textSecondary }}>{rec.descripcion}</p>
                      <small style={{ color: themeColors.success }}>ROI estimado: €{rec.roi_estimado}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <i className="fas fa-robot mb-2" style={{ fontSize: '2rem', color: themeColors.textSecondary }}></i>
                  <p style={{ color: themeColors.textSecondary }} className="mb-0">Generando recomendaciones...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab de insights avanzados con IA
function renderInsightsContent(insightsData: any, themeColors: any) {
  if (!insightsData) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border mb-3" style={{ color: themeColors.primary }}></div>
        <p style={{ color: themeColors.text }}>Analizando datos con IA...</p>
      </div>
    );
  }

  return (
    <div className="insights-content">
      {/* Análisis principal */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card" style={{ background: themeColors.surface, border: `1px solid ${themeColors.border}` }}>
            <div className="card-header" style={{ background: themeColors.primary, color: 'white' }}>
              <h6 className="mb-0"><i className="fas fa-brain me-2"></i>Análisis Inteligente de Rendimiento</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h6 style={{ color: themeColors.primary }}>Estado General</h6>
                  <div className={`alert alert-${insightsData.estado_general === 'OPTIMAL' ? 'success' : insightsData.estado_general === 'WARNING' ? 'warning' : 'danger'}`}>
                    <i className={`fas fa-${insightsData.estado_general === 'OPTIMAL' ? 'check' : insightsData.estado_general === 'WARNING' ? 'exclamation-triangle' : 'times'} me-2`}></i>
                    {insightsData.estado_general || 'EVALUANDO'}
                  </div>
                  <p className="small" style={{ color: themeColors.textSecondary }}>{insightsData.diagnostico_general}</p>
                </div>
                <div className="col-md-4">
                  <h6 style={{ color: themeColors.success }}>Puntos Fuertes</h6>
                  <ul className="list-unstyled">
                    {insightsData.puntos_fuertes?.map((punto: string, index: number) => (
                      <li key={index} style={{ color: themeColors.text }}>
                        <i className="fas fa-plus-circle me-2" style={{ color: themeColors.success }}></i>
                        {punto}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6 style={{ color: themeColors.error }}>Áreas de Mejora</h6>
                  <ul className="list-unstyled">
                    {insightsData.areas_mejora?.map((area: string, index: number) => (
                      <li key={index} style={{ color: themeColors.text }}>
                        <i className="fas fa-exclamation-circle me-2" style={{ color: themeColors.error }}></i>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab de gestión con funcionalidades avanzadas
function renderGestionContent(machine: any, themeColors: any) {
  const handleManagementAction = async (action: string, data: any = {}) => {
    try {
      console.log(`🔧 Ejecutando acción: ${action}`);

      const response = await fetch('/api/management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          machineId: machine?.machine?.Cod_maquina,
          data
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error ejecutando acción:', error);
      alert('❌ Error ejecutando acción');
    }
  };

  return (
    <div className="gestion-content">
      {/* Acciones de gestión */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card" style={{ background: themeColors.surface, border: `1px solid ${themeColors.border}` }}>
            <div className="card-header" style={{ background: themeColors.primary, color: 'white' }}>
              <h6 className="mb-0"><i className="fas fa-tools me-2"></i>Gestión de Paradas</h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button
                  className="btn"
                  style={{ background: themeColors.info, color: 'white', borderRadius: '10px' }}
                  onClick={() => alert('🚧 Función en desarrollo - Reclasificar paradas seleccionadas')}
                >
                  <i className="fas fa-edit me-2"></i>Reclasificar Paradas
                </button>
                <button
                  className="btn"
                  style={{ background: themeColors.warning, color: 'white', borderRadius: '10px' }}
                  onClick={() => handleManagementAction('merge_microstops', {
                    threshold: 120,
                    mergeWindow: 300
                  })}
                >
                  <i className="fas fa-compress-arrows-alt me-2"></i>Mergear Micro-paradas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}