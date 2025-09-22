'use client';

import { useState, useEffect } from 'react';
import { MachineStatus } from '../types/machine';
import HistoricalCharts from './HistoricalCharts';
import FinancialDashboard from './FinancialDashboard';
import ProductionCounter from './ProductionCounter';
import MachineProductionChart from './MachineProductionChart';
import HistoricalProductionChart from './HistoricalProductionChart';
import OEECharts from './OEECharts';
import { useTheme } from '../hooks/useTheme';
import { useOEEData } from '../hooks/useOEEData';
import useResponsiveLayout from '../hooks/useResponsiveLayout';
import MiniLineChart from './MiniLineChart';

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
  const [oeeData, setOeeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [financialLoading, setFinancialLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'stats'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('fecha');
  const [selectedMachineForChart, setSelectedMachineForChart] = useState<string>(machine?.machine?.Cod_maquina || '');

  // Hook para dados OEE - deve estar no nível superior
  const { data: oeeHookData, loading: oeeHookLoading, error: oeeHookError } = useOEEData(
    machine?.machine?.Cod_maquina || null,
    7
  );


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
      if (!oeeData) {
        fetchOeeData();
      }
    }
  }, [isOpen, machine]);

  useEffect(() => {
    if (isOpen && machine && activeTab === 'oee' && !oeeData) {
      fetchOeeData();
    }
  }, [activeTab, oeeData]);

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
      console.error('Error al obtener datos de la pestaña:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    if (!machine) return;

    setHistoricalLoading(true);
    try {
      const response = await fetch(`/api/oee/historical?machineId=${machine.machine.Cod_maquina}&days=30&aggregation=day&tab=historico`);
      const result = await response.json();
      if (result.success) {
        setHistoricalData(result.data);
      }
    } catch (error) {
      console.error('Error obteniendo datos históricos:', error);
    } finally {
      setHistoricalLoading(false);
    }
  };

  const fetchFinancialData = async () => {
    if (!machine) return;

    setFinancialLoading(true);
    try {
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
      console.error('Error obteniendo datos financieros:', error);
    } finally {
      setFinancialLoading(false);
    }
  };

  const fetchInsightsData = async () => {
    if (!machine) return;

    try {
      const response = await fetch(`/api/analytics/insights?machineId=${machine.machine.Cod_maquina}&tab=insights`);
      const result = await response.json();
      if (result.success) {
        setInsightsData(result.data);
      }
    } catch (error) {
      console.error('Error obteniendo insights:', error);
    }
  };

  const fetchOeeData = async () => {
    if (!machine) return;

    try {
      const response = await fetch(`/api/oee-simple?machineId=${machine.machine.Cod_maquina}&days=7&type=all`);
      const result = await response.json();
      if (result.success) {
        setOeeData(result.data);
      }
    } catch (error) {
      console.error('Error obteniendo datos OEE:', error);
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

  const modalBackdrop = 'rgba(0, 0, 0, 0.75)';

  const modalStyles = {
    backdrop: {
      display: 'block',
      backgroundColor: modalBackdrop,
      zIndex: 1060
    },
    dialog: {
      ...getBreakpointStyles({
        mobile: { maxWidth: '95vw', margin: '16px auto' },
        tablet: { maxWidth: '85vw', margin: '24px auto' },
        desktop: { maxWidth: '80vw', margin: '32px auto' }
      }),
      width: '100%'
    },
    content: {
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#f0f0f0' : '#2c2c2c',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      maxHeight: isMobile ? '90vh' : '88vh',
      display: 'flex',
      flexDirection: 'column' as const,
      border: `1px solid ${isDark ? '#2d2d2d' : '#e0e0e0'}`
    },
    header: {
      background: isDark ? '#2a2a2a' : themeColors.primary,
      color: '#ffffff',
      padding: '16px 24px',
      flexShrink: 0,
      borderBottom: 'none'
    },
    iconBox: {
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '8px',
      color: '#ffffff',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    statusHeader: {
      background: isDark ? '#2a2a2a' : '#fafafa',
      padding: '16px 24px',
      borderBottom: `1px solid ${isDark ? '#333333' : '#e8e8e8'}`,
      flexShrink: 0
    },
    metricCard: {
      borderRadius: '12px',
      background: isDark ? '#242424' : '#ffffff',
      border: `1px solid ${isDark ? '#333333' : '#e8e8e8'}`,
      transition: 'transform 0.2s ease',
      overflow: 'hidden',
      padding: '12px'
    },
    metricIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      marginBottom: '8px'
    },
    tabsNav: {
      background: isDark ? '#1a1a1a' : '#ffffff',
      padding: '8px 24px 0',
      borderBottom: `1px solid ${isDark ? '#333333' : '#e8e8e8'}`,
      flexShrink: 0,
      overflowX: 'auto' as const,
      scrollbarWidth: 'thin' as const,
      scrollbarColor: `${themeColors.primary}30 transparent`
    },
    tabButton: (isActive: boolean) => ({
      background: 'transparent',
      border: 'none',
      borderBottom: isActive ? `2px solid ${themeColors.primary}` : '2px solid transparent',
      borderRadius: 0,
      color: isActive ? themeColors.primary : isDark ? '#999999' : '#666666',
      transition: 'all 0.2s ease',
      fontWeight: isActive ? 600 : 400,
      padding: '12px 16px',
      fontSize: '14px',
      minWidth: isMobile ? '72px' : '100px',
      cursor: 'pointer'
    }),
    tabContent: {
      flex: 1,
      padding: '24px',
      background: isDark ? '#1a1a1a' : '#fafafa',
      overflowY: 'auto' as const,
      scrollbarWidth: 'thin' as const,
      scrollbarColor: `${isDark ? '#444444' : '#cccccc'} transparent`
    },
    footer: {
      background: isDark ? '#2a2a2a' : '#ffffff',
      padding: '16px 24px',
      borderTop: `1px solid ${isDark ? '#333333' : '#e8e8e8'}`,
      flexShrink: 0
    },
    footerButton: {
      borderRadius: '8px',
      border: '1px solid transparent',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    primaryButton: {
      background: themeColors.primary,
      color: '#ffffff',
      border: 'none'
    },
    secondaryButton: {
      background: 'transparent',
      color: isDark ? '#b0b0b0' : '#666666',
      border: `1px solid ${isDark ? '#404040' : '#d0d0d0'}`
    }
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div style={{ height: '20px', background: isDark ? '#333' : '#e0e0e0', borderRadius: '4px', marginBottom: '12px' }}></div>
      <div style={{ height: '20px', background: isDark ? '#333' : '#e0e0e0', borderRadius: '4px', marginBottom: '12px', width: '80%' }}></div>
      <div style={{ height: '20px', background: isDark ? '#333' : '#e0e0e0', borderRadius: '4px', width: '60%' }}></div>
    </div>
  );

  return (
    <div
      className="modal fade show"
      style={modalStyles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={modalStyles.dialog}
      >
        <div className="modal-content" style={modalStyles.content}>
          {/* Header - Sticky */}
          <div className="modal-header" style={modalStyles.header}>
            <div className="d-flex align-items-center w-100">
              <div style={modalStyles.iconBox}>
                <i className="fas fa-cog" style={{ fontSize: '24px', color: '#ffffff' }}></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <h3 id="modal-title" className="modal-title mb-0" style={{ fontWeight: 600, fontSize: '20px', lineHeight: '1.2' }}>
                  {machine.machine.Cod_maquina}
                </h3>
                {!isMobile && (
                  <p className="mb-0 mt-1" style={{ fontSize: '14px', opacity: 0.9 }}>
                    {machine.machine.desc_maquina}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                style={modalStyles.closeButton}
                aria-label="Cerrar"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Status Header - Sticky */}
          <div style={modalStyles.statusHeader}>
            <div className="row g-3">
              {[
                {
                  icon: 'fas fa-circle',
                  value: getStatusText(machine.status),
                  label: 'Estado',
                  color: machine.status === 'PRODUCIENDO' ? themeColors.success :
                         machine.status === 'ACTIVA' ? themeColors.info :
                         machine.status === 'MANTENIMIENTO' ? themeColors.warning : themeColors.error,
                  chartData: generateTrendData(7, 65, 95)
                },
                {
                  icon: 'fas fa-check',
                  value: machine.production.ok.toLocaleString('es-ES'),
                  label: 'Piezas OK',
                  color: themeColors.success,
                  chartData: generateTrendData(7, machine.production.ok - 50, machine.production.ok + 50)
                },
                {
                  icon: 'fas fa-times',
                  value: machine.production.nok.toLocaleString('es-ES'),
                  label: 'Piezas NOK',
                  color: themeColors.error,
                  chartData: generateTrendData(7, Math.max(0, machine.production.nok - 20), machine.production.nok + 30)
                },
                {
                  icon: 'fas fa-percentage',
                  value: `${machine.efficiency}%`,
                  label: 'Eficiencia',
                  color: machine.efficiency >= 80 ? themeColors.success :
                         machine.efficiency >= 60 ? themeColors.warning : themeColors.error,
                  chartData: generateTrendData(7, Math.max(0, machine.efficiency - 15), Math.min(100, machine.efficiency + 10))
                }
              ].map((metric, index) => (
                <div key={index} className={`col-${getGridCols(6, 6, 3)}`}>
                  <div style={modalStyles.metricCard}>
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="flex-grow-1">
                        <div style={{ ...modalStyles.metricIcon, backgroundColor: `${metric.color}15` }}>
                          <i className={metric.icon} style={{ color: metric.color }}></i>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: metric.color, marginBottom: '4px' }}>
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '12px', color: isDark ? '#999' : '#666', fontWeight: 400 }}>
                          {metric.label}
                        </div>
                      </div>
                      <div style={{ width: '80px', height: '40px', opacity: 0.7 }}>
                        <MiniLineChart
                          data={metric.chartData}
                          color={metric.color}
                          height={40}
                          isDark={isDark}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Navigation - Sticky */}
          <div style={modalStyles.tabsNav}>
            <div className="d-flex" style={{ gap: '4px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={modalStyles.tabButton(activeTab === tab.id)}
                >
                  <i className={`${tab.icon} ${isMobile ? '' : 'me-2'}`} style={{ fontSize: '14px' }}></i>
                  {!isMobile && <span>{tab.label}</span>}
                  {isMobile && <span className="d-block" style={{ fontSize: '10px', marginTop: '4px' }}>
                    {tab.label.split(' ')[0].substring(0, 4)}
                  </span>}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content - Scrollable */}
          <div style={modalStyles.tabContent}>
            {loading && ['of', 'paros', 'produccion', 'oee', 'pedidos', 'ventas'].includes(activeTab) ? (
              <div className="py-5">
                <SkeletonLoader />
              </div>
            ) : (
              renderTabContent(activeTab, tabData, historicalData, financialData, insightsData, oeeData, historicalLoading, financialLoading, machine, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, selectedMachineForChart, setSelectedMachineForChart, isDark, themeColors, isMobile, isTablet, getGridCols, oeeHookData, oeeHookLoading)
            )}
          </div>

          {/* Footer - Sticky */}
          <div style={modalStyles.footer}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex" style={{ gap: '8px' }}>
                <button style={{ ...modalStyles.footerButton, ...modalStyles.secondaryButton }}>
                  <i className="fas fa-download me-2"></i>
                  Exportar
                </button>
                <button style={{ ...modalStyles.footerButton, ...modalStyles.secondaryButton }}>
                  <i className="fas fa-print me-2"></i>
                  Imprimir
                </button>
              </div>
              <div className="d-flex" style={{ gap: '8px' }}>
                <button style={{ ...modalStyles.footerButton, ...modalStyles.secondaryButton }}>
                  <i className="fas fa-cog me-2"></i>
                  Configurar
                </button>
                <button onClick={onClose} style={{ ...modalStyles.footerButton, ...modalStyles.primaryButton }}>
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

// Función para generar datos de tendencia simulados
function generateTrendData(days: number, minValue: number, maxValue: number): { date: string; value: number }[] {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const range = maxValue - minValue;
    const trend = (i / days) * range;
    const value = Math.max(minValue, Math.min(maxValue, minValue + trend + (Math.random() - 0.5) * range * 0.3));
    
    data.push({
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      value: Math.round(value)
    });
  }
  
  return data;
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

function renderTabContent(tab: string, data: any, historicalData: any, financialData: any, insightsData: any, oeeData: any, historicalLoading: boolean, financialLoading: boolean, machine: any, viewMode: string, setViewMode: Function, filterType: string, setFilterType: Function, filterDuration: string, setFilterDuration: Function, sortBy: string, setSortBy: Function, selectedMachineForChart: string, setSelectedMachineForChart: Function, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function, oeeHookData?: any, oeeHookLoading?: boolean) {
  
  const tableStyles = {
    wrapper: {
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`
    },
    table: {
      background: isDark ? '#242424' : '#ffffff',
      marginBottom: 0
    },
    thead: {
      background: isDark ? '#2a2a2a' : '#f5f5f5',
      position: 'sticky' as const,
      top: 0,
      zIndex: 10
    },
    th: {
      fontWeight: 600,
      fontSize: '13px',
      color: isDark ? '#b0b0b0' : '#555555',
      borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
      padding: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    td: {
      padding: '12px',
      fontSize: '14px',
      color: isDark ? '#e0e0e0' : '#333333',
      borderBottom: `1px solid ${isDark ? '#2a2a2a' : '#f0f0f0'}`
    },
    badge: {
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '11px',
      fontWeight: 500
    }
  };

  const cardStyles = {
    card: {
      borderRadius: '12px',
      background: isDark ? '#242424' : '#ffffff',
      border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
      marginBottom: '16px',
      overflow: 'hidden'
    },
    cardHeader: {
      background: isDark ? '#2a2a2a' : '#f8f8f8',
      padding: '16px',
      borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
      fontSize: '14px',
      fontWeight: 600
    },
    cardBody: {
      padding: '16px'
    }
  };

  switch (tab) {
    case 'resumen':
      return renderResumenContent(machine, historicalData, insightsData, isDark, themeColors, isMobile, isTablet, getGridCols, cardStyles);
    case 'of':
      return data ? renderOFContent(data, themeColors, cardStyles) : renderNoData(themeColors);
    case 'paros':
      return data ? renderParosContent(data, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, themeColors, tableStyles, isDark) : renderNoData(themeColors);
    case 'produccion':
      return <ProduccionContent data={data} themeColors={themeColors} isDark={isDark} machineId={machine?.machine?.Cod_maquina || ''} />;
    case 'oee':
      return renderOEEContent(data, themeColors, tableStyles, isDark, machine?.machine, oeeHookData, oeeHookLoading);
    case 'historico':
      return data ? renderHistoricoContent(data, themeColors, tableStyles, isDark) : renderNoData(themeColors);
    case 'graficos':
      return (
        <div>
          <div style={{ ...cardStyles.card, padding: '16px', marginBottom: '24px' }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <label className="form-label mb-2" style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#b0b0b0' : '#555' }}>
                  <i className="fas fa-industry me-2" style={{ color: themeColors.primary }}></i>
                  Seleccionar Máquina para Análisis:
                </label>
                <select
                  className="form-select"
                  value={selectedMachineForChart}
                  onChange={(e) => setSelectedMachineForChart(e.target.value)}
                  style={{
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    border: `1px solid ${isDark ? '#404040' : '#d0d0d0'}`,
                    color: isDark ? '#e0e0e0' : '#333',
                    borderRadius: '8px',
                    fontSize: '14px'
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
                  <span style={{
                    background: `${themeColors.success}15`,
                    color: themeColors.success,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    <i className="fas fa-sync-alt me-1"></i>
                    Auto-actualización
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
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
      return renderInsightsContent(insightsData, themeColors, cardStyles, isDark);
    case 'gestion':
      return renderGestionContent(machine, themeColors, cardStyles, isDark);
    case 'pedidos':
      return data ? renderPedidosContent(data, themeColors, tableStyles, isDark) : renderNoData(themeColors);
    case 'ventas':
      return data ? renderVentasContent(data, themeColors, tableStyles, isDark) : renderNoData(themeColors);
    default:
      return <div style={{ color: themeColors.text }}>Sección no implementada</div>;
  }
}

function renderNoData(themeColors: any) {
  return (
    <div className="text-center py-5">
      <i className="fas fa-inbox mb-3" style={{ fontSize: '48px', color: themeColors.textSecondary, opacity: 0.3 }}></i>
      <p style={{ color: themeColors.textSecondary, fontSize: '14px' }}>Sin datos disponibles</p>
    </div>
  );
}

function renderOFContent(data: any, themeColors: any, cardStyles: any) {
  return (
    <div className="row">
      <div className="col-md-6">
        <div style={cardStyles.card}>
          <div style={cardStyles.cardHeader}>
            <i className="fas fa-clipboard-list me-2"></i>
            Información de la OF
          </div>
          <div style={cardStyles.cardBody}>
            {[
              { label: 'Código OF', value: data.Rt_Cod_of || '--' },
              { label: 'Producto', value: data.Rt_Desc_producto || data.Rt_Desc_produto || '--' },
              { label: 'Planificadas', value: `${data.Rt_Unidades_planning || 0} unidades` },
              { label: 'Producidas', value: `${data.total_produced || 0} unidades` }
            ].map((item, index) => (
              <div key={index} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: themeColors.textSecondary }}>{item.label}:</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderParosContent(data: any, viewMode: string, setViewMode: Function, filterType: string, setFilterType: Function, filterDuration: string, setFilterDuration: Function, sortBy: string, setSortBy: Function, themeColors: any, tableStyles: any, isDark: boolean) {
  const paros: any[] = Array.isArray(data) ? data : (data?.paros || []);
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex" style={{ gap: '8px' }}>
          <select 
            className="form-select form-select-sm" 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)} 
            style={{
              background: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#404040' : '#d0d0d0'}`,
              color: isDark ? '#e0e0e0' : '#333',
              borderRadius: '6px',
              fontSize: '13px'
            }}
          >
            <option value="all">Todos los tipos</option>
          </select>
          <select 
            className="form-select form-select-sm" 
            value={filterDuration} 
            onChange={(e) => setFilterDuration(e.target.value)}
            style={{
              background: isDark ? '#2a2a2a' : '#ffffff',
              border: `1px solid ${isDark ? '#404040' : '#d0d0d0'}`,
              color: isDark ? '#e0e0e0' : '#333',
              borderRadius: '6px',
              fontSize: '13px'
            }}
          >
            <option value="all">Cualquier duración</option>
          </select>
        </div>
        <div className="btn-group" role="group">
          {['list', 'cards', 'stats'].map((mode) => (
            <button
              key={mode}
              className={`btn btn-sm ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
              style={{
                background: viewMode === mode ? themeColors.primary : 'transparent',
                color: viewMode === mode ? '#ffffff' : isDark ? '#999' : '#666',
                border: `1px solid ${isDark ? '#404040' : '#d0d0d0'}`,
                fontSize: '13px'
              }}
            >
              <i className={`fas fa-${mode === 'list' ? 'list' : mode === 'cards' ? 'th' : 'chart-pie'}`}></i>
            </button>
          ))}
        </div>
      </div>
      
      <div className="table-responsive" style={tableStyles.wrapper}>
        <table className="table table-hover" style={tableStyles.table}>
          <thead style={tableStyles.thead}>
            <tr>
              <th style={tableStyles.th}>Inicio</th>
              <th style={tableStyles.th}>Fin</th>
              <th style={{ ...tableStyles.th, textAlign: 'right' }}>Duración</th>
              <th style={tableStyles.th}>OF</th>
              <th style={tableStyles.th}>Tipo</th>
              <th style={tableStyles.th}>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {paros.map((paro: any, index: number) => (
              <tr key={index} style={{ background: index % 2 === 0 ? (isDark ? '#1f1f1f' : '#fafafa') : 'transparent' }}>
                <td style={tableStyles.td}>{new Date(paro.fecha_ini || paro.fecha_inicio).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</td>
                <td style={tableStyles.td}>{paro.fecha_fin ? new Date(paro.fecha_fin).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }) : <span style={{ ...tableStyles.badge, background: `${themeColors.warning}20`, color: themeColors.warning }}>En curso</span>}</td>
                <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace' }}>{(paro.duracion_minutos ?? paro.duracion_calculada ?? 0)} min</td>
                <td style={tableStyles.td}>{paro.cod_of || '--'}</td>
                <td style={tableStyles.td}>{paro.id_paro || '--'}</td>
                <td style={tableStyles.td}>{paro.desc_paro || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente separado para el contenido de producción
function ProduccionContent({ data, themeColors, isDark, machineId }: { data: any[]; themeColors: any; isDark: boolean; machineId: string }) {
  const [productionData, setProductionData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMachineData, setCurrentMachineData] = useState<any>(null);

  useEffect(() => {
    fetchProductionData();
    const interval = setInterval(fetchProductionData, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, [machineId]);

  const fetchProductionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/scada/production');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setProductionData(result.data || []);
          
          // Filtrar datos de la máquina actual
          const machineData = result.data.find((machine: any) => machine.machineId === machineId);
          setCurrentMachineData(machineData || null);
        }
      }
    } catch (error) {
      console.error('Error al obtener datos de producción:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && productionData.length === 0) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" style={{ color: themeColors.primary, width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Cargando datos de producción...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="production-content">
      {/* Resumen de la máquina actual */}
      <div className="row mb-4">
        <div className="col-12">
          <div style={{
            borderRadius: '12px',
            background: isDark ? '#242424' : '#ffffff',
            border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
            padding: '24px'
          }}>
            <h4 className="mb-3" style={{ fontSize: '18px', fontWeight: 600, color: isDark ? '#e0e0e0' : '#333' }}>
              <i className="fas fa-industry me-2" style={{ color: themeColors.primary }}></i>
              Producción de {currentMachineData?.machineName || machineId}
            </h4>
            
            {currentMachineData ? (
              <div className="row g-3 justify-content-center">
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div style={{ fontSize: '32px', fontWeight: 700, color: themeColors.success }}>
                      {currentMachineData.ok.toLocaleString('es-ES')}
                    </div>
                    <div style={{ fontSize: '14px', color: isDark ? '#b0b0b0' : '#666' }}>
                      Piezas OK
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div style={{ fontSize: '32px', fontWeight: 700, color: themeColors.error }}>
                      {currentMachineData.nok.toLocaleString('es-ES')}
                    </div>
                    <div style={{ fontSize: '14px', color: isDark ? '#b0b0b0' : '#666' }}>
                      Piezas NOK
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div style={{ fontSize: '32px', fontWeight: 700, color: themeColors.warning }}>
                      {currentMachineData.rw.toLocaleString('es-ES')}
                    </div>
                    <div style={{ fontSize: '14px', color: isDark ? '#b0b0b0' : '#666' }}>
                      Rechazos
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="text-center">
                    <div style={{ fontSize: '32px', fontWeight: 700, color: currentMachineData.efficiency >= 80 ? themeColors.success : currentMachineData.efficiency >= 60 ? themeColors.warning : themeColors.error }}>
                      {currentMachineData.efficiency}%
                    </div>
                    <div style={{ fontSize: '14px', color: isDark ? '#b0b0b0' : '#666' }}>
                      Eficiencia
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <i className="fas fa-exclamation-triangle mb-2" style={{ fontSize: '32px', color: themeColors.warning }}></i>
                <p style={{ color: themeColors.warning }}>No hay datos de producción disponibles para esta máquina</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico comparativo con todas las máquinas */}
      <div className="row mb-4">
        <div className="col-12">
          <div style={{
            borderRadius: '12px',
            background: isDark ? '#242424' : '#ffffff',
            border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
            padding: '24px'
          }}>
            <h5 className="mb-3" style={{ fontSize: '16px', fontWeight: 600, color: isDark ? '#e0e0e0' : '#333' }}>
              <i className="fas fa-chart-bar me-2" style={{ color: themeColors.primary }}></i>
              Comparativa de Producción (Últimos 30 días)
            </h5>
            <MachineProductionChart
              data={productionData}
              onMachineClick={() => {}}
              highlightMachine={machineId}
            />
          </div>
        </div>
      </div>

      {/* Información adicional */}
      {currentMachineData && (
        <div className="row">
          <div className="col-md-6">
            <div style={{
              borderRadius: '12px',
              background: isDark ? '#242424' : '#ffffff',
              border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h6 style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#e0e0e0' : '#333', marginBottom: '12px' }}>
                <i className="fas fa-info-circle me-2" style={{ color: themeColors.info }}></i>
                Información Actual
              </h6>
              <div style={{ fontSize: '13px', color: isDark ? '#b0b0b0' : '#666' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span>OF Actual:</span>
                  <strong>{currentMachineData.of_actual || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Producto:</span>
                  <strong>{currentMachineData.producto_actual || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Operario:</span>
                  <strong>{currentMachineData.operator || 'N/A'}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Turno:</span>
                  <strong>{currentMachineData.shift || 'N/A'}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div style={{
              borderRadius: '12px',
              background: isDark ? '#242424' : '#ffffff',
              border: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
              padding: '16px',
              marginBottom: '16px'
            }}>
              <h6 style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#e0e0e0' : '#333', marginBottom: '12px' }}>
                <i className="fas fa-chart-pie me-2" style={{ color: themeColors.success }}></i>
                Estadísticas
              </h6>
              <div style={{ fontSize: '13px', color: isDark ? '#b0b0b0' : '#666' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Producido:</span>
                  <strong>{currentMachineData.total.toLocaleString('es-ES')}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tasa de Calidad:</span>
                  <strong>{currentMachineData.efficiency}%</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Última Actualización:</span>
                  <strong>{new Date(currentMachineData.timestamp).toLocaleString('es-ES')}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderOEEContent(data: any, themeColors: any, tableStyles: any, isDark: boolean, machine?: any, oeeHookData?: any, oeeHookLoading?: boolean) {
  return (
    <div>
      {/* Gráficos OEE */}
      <div style={{ marginBottom: '24px' }}>
        <OEECharts
          data={oeeHookData}
          isLoading={oeeHookLoading || false}
          isDark={isDark}
          themeColors={themeColors}
        />
      </div>

      {/* Tabela detalhada */}
      <div className="table-responsive" style={tableStyles.wrapper}>
        <table className="table table-hover" style={tableStyles.table}>
          <thead style={tableStyles.thead}>
            <tr>
              <th style={tableStyles.th}>Fecha</th>
              <th style={tableStyles.th}>Turno</th>
              <th style={{ ...tableStyles.th, textAlign: 'right' }}>Disponibilidad</th>
              <th style={{ ...tableStyles.th, textAlign: 'right' }}>Rendimiento</th>
              <th style={{ ...tableStyles.th, textAlign: 'right' }}>Calidad</th>
              <th style={{ ...tableStyles.th, textAlign: 'right' }}>OEE</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? data.map((oee: any, index: number) => (
              <tr key={index} style={{ background: index % 2 === 0 ? (isDark ? '#1f1f1f' : '#fafafa') : 'transparent' }}>
                <td style={tableStyles.td}>{new Date(oee.fecha).toLocaleDateString('es-ES')}</td>
                <td style={tableStyles.td}>
                  <span style={{
                    ...tableStyles.badge,
                    background: isDark ? '#333' : '#f0f0f0',
                    color: isDark ? '#b0b0b0' : '#666'
                  }}>
                    {oee.turno}
                  </span>
                </td>
                <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: getOEEColor(oee.disponibilidad, themeColors) }}>
                  {oee.disponibilidad}%
                </td>
                <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: getOEEColor(oee.rendimiento, themeColors) }}>
                  {oee.rendimiento}%
                </td>
                <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: getOEEColor(oee.calidad, themeColors) }}>
                  {oee.calidad}%
                </td>
                <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: getOEEColor(oee.oee, themeColors) }}>
                  {oee.oee}%
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: isDark ? '#999' : '#666' }}>
                  No hay datos OEE disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderPedidosContent(data: any[], themeColors: any, tableStyles: any, isDark: boolean) {
  return (
    <div className="table-responsive" style={tableStyles.wrapper}>
      <table className="table table-hover" style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          <tr>
            <th style={tableStyles.th}>Código</th>
            <th style={tableStyles.th}>Producto</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Cantidad</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Entregado</th>
            <th style={{ ...tableStyles.th, textAlign: 'center' }}>Fecha</th>
            <th style={{ ...tableStyles.th, textAlign: 'center' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pedido: any, index: number) => (
            <tr key={index} style={{ background: index % 2 === 0 ? (isDark ? '#1f1f1f' : '#fafafa') : 'transparent' }}>
              <td style={tableStyles.td}>{pedido.cod_pedido}</td>
              <td style={tableStyles.td}>{pedido.desc_produto}</td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace' }}>{pedido.cantidad_pedido}</td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace' }}>{pedido.cantidad_entregada}</td>
              <td style={{ ...tableStyles.td, textAlign: 'center' }}>{new Date(pedido.fecha_pedido).toLocaleDateString('es-ES')}</td>
              <td style={{ ...tableStyles.td, textAlign: 'center' }}>
                <span style={{
                  ...tableStyles.badge,
                  ...getPedidoStatusStyle(pedido.estado_pedido)
                }}>
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

function renderHistoricoContent(data: any[], themeColors: any, tableStyles: any, isDark: boolean) {
  return (
    <div className="table-responsive" style={tableStyles.wrapper}>
      <table className="table table-hover" style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          <tr>
            <th style={tableStyles.th}>Fecha</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Total OK</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Total NOK</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Total RW</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Eficiencia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((hist: any, index: number) => (
            <tr key={index} style={{ background: index % 2 === 0 ? (isDark ? '#1f1f1f' : '#fafafa') : 'transparent' }}>
              <td style={tableStyles.td}>{new Date(hist.fecha).toLocaleDateString('es-ES')}</td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: themeColors.success }}>
                {hist.total_ok}
              </td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: themeColors.error }}>
                {hist.total_nok}
              </td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', color: themeColors.warning }}>
                {hist.total_rw}
              </td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: getOEEColor(hist.eficiencia_diaria, themeColors) }}>
                {Math.round(hist.eficiencia_diaria)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderVentasContent(data: any[], themeColors: any, tableStyles: any, isDark: boolean) {
  return (
    <div className="table-responsive" style={tableStyles.wrapper}>
      <table className="table table-hover" style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          <tr>
            <th style={tableStyles.th}>Código</th>
            <th style={tableStyles.th}>Cliente</th>
            <th style={tableStyles.th}>Producto</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Cantidad</th>
            <th style={{ ...tableStyles.th, textAlign: 'right' }}>Valor</th>
            <th style={{ ...tableStyles.th, textAlign: 'center' }}>Fecha</th>
            <th style={{ ...tableStyles.th, textAlign: 'center' }}>Entrega</th>
          </tr>
        </thead>
        <tbody>
          {data.map((venta: any, index: number) => (
            <tr key={index} style={{ background: index % 2 === 0 ? (isDark ? '#1f1f1f' : '#fafafa') : 'transparent' }}>
              <td style={tableStyles.td}>{venta.cod_venta}</td>
              <td style={tableStyles.td}>{venta.cliente}</td>
              <td style={tableStyles.td}>{venta.produto}</td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace' }}>{venta.cantidad}</td>
              <td style={{ ...tableStyles.td, textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>€{venta.valor_venta}</td>
              <td style={{ ...tableStyles.td, textAlign: 'center' }}>{new Date(venta.fecha_venta).toLocaleDateString('es-ES')}</td>
              <td style={{ ...tableStyles.td, textAlign: 'center' }}>
                <span style={{
                  ...tableStyles.badge,
                  ...getEntregaStatusStyle(venta.estado_entrega)
                }}>
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

function getOEEColor(value: number, themeColors: any) {
  if (value >= 80) return themeColors.success;
  if (value >= 60) return themeColors.warning;
  return themeColors.error;
}

function getPedidoStatusStyle(status: string) {
  const normalizedStatus = status?.toLowerCase();
  switch (normalizedStatus) {
    case 'completado': return { background: '#4caf5020', color: '#4caf50' };
    case 'en produccion': return { background: '#2196f320', color: '#2196f3' };
    case 'pendiente': return { background: '#ff980020', color: '#ff9800' };
    default: return { background: '#9e9e9e20', color: '#9e9e9e' };
  }
}

function getEntregaStatusStyle(status: string) {
  const normalizedStatus = status?.toLowerCase();
  switch (normalizedStatus) {
    case 'entregado': return { background: '#4caf5020', color: '#4caf50' };
    case 'en transito': return { background: '#2196f320', color: '#2196f3' };
    case 'pendiente': return { background: '#ff980020', color: '#ff9800' };
    default: return { background: '#9e9e9e20', color: '#9e9e9e' };
  }
}

// Función para calcular paradas acumuladas hasta completar 24h
function calculateParadasHasta24h(downtimeData: any[]) {
  if (!downtimeData || downtimeData.length === 0) return 0;

  // Ordenar paradas por fecha (más recientes primero)
  const sortedParadas = [...downtimeData].sort((a, b) => {
    const dateA = new Date(a.fecha || a.fecha_inicio || a.fecha_inicio);
    const dateB = new Date(b.fecha || b.fecha_inicio || b.fecha_inicio);
    return dateB.getTime() - dateA.getTime();
  });

  let totalHorasAcumuladas = 0;
  let paradasContabilizadas = 0;

  // Iterar pelas paradas acumulando horas até atingir 24h
  for (const parada of sortedParadas) {
    let horasParada = 0;

    // Calcular horas da parada baseado em diferentes formatos de dados
    if (parada.duracion_horas) {
      horasParada = parada.duracion_horas;
    } else if (parada.duracion_minutos) {
      horasParada = parada.duracion_minutos / 60;
    } else if (parada.num_paros) {
      // Para dados simulados, estimar tempo baseado no número de paros (média de 2h por paros)
      horasParada = parada.num_paros * 2;
    } else {
      // Fallback: considerar como 1h se não há informação de duração
      horasParada = 1;
    }

    // Garantir que não temos valores negativos ou inválidos
    horasParada = Math.max(0, horasParada);

    if (totalHorasAcumuladas + horasParada <= 24) {
      totalHorasAcumuladas += horasParada;
      paradasContabilizadas++;

      // Se atingiu exatamente 24h, para aqui
      if (Math.abs(totalHorasAcumuladas - 24) < 0.01) {
        break;
      }
    } else {
      // Se a próxima parada ultrapassaria 24h, para aqui
      break;
    }
  }

  return paradasContabilizadas;
}

// Nuevo tab de resumen con métricas principales
function renderResumenContent(machine: any, historicalData: any, insightsData: any, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function, cardStyles: any) {
  return (
    <div className="resumen-content">
      <div className="row mb-4">
        {[
          { icon: 'fas fa-tachometer-alt', value: `${machine?.efficiency || 0}%`, label: 'OEE Actual', color: themeColors.primary },
          { icon: 'fas fa-check', value: machine?.production?.ok || 0, label: 'Piezas OK', color: themeColors.success },
          { icon: 'fas fa-times', value: machine?.production?.nok || 0, label: 'Piezas NOK', color: themeColors.error },
          { icon: 'fas fa-clock', value: `${calculateParadasHasta24h(historicalData?.downtime || [])} paradas`, label: 'Paradas Mes', color: themeColors.warning },
          { icon: 'fas fa-euro-sign', value: `€${((historicalData?.cost_analysis?.[0]?.costo_total_perdidas_euros || 0)).toLocaleString('es-ES')}`, label: 'Pérdidas Mes', color: themeColors.info },
          { icon: 'fas fa-chart-line', value: historicalData?.summary?.total_production?.toLocaleString('es-ES') || 0, label: 'Prod. Total', color: themeColors.secondary }
        ].map((metric, index) => (
          <div key={index} className={`col-${getGridCols(6, 4, 2)}`}>
            <div style={{
              ...cardStyles.card,
              textAlign: 'center',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ padding: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: `${metric.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <i className={metric.icon} style={{ fontSize: '20px', color: metric.color }}></i>
                </div>
                <h5 style={{ fontSize: '24px', fontWeight: 700, color: metric.color, marginBottom: '4px' }}>{metric.value}</h5>
                <small style={{ fontSize: '12px', color: isDark ? '#999' : '#666' }}>{metric.label}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div style={cardStyles.card}>
            <div style={{ ...cardStyles.cardHeader, background: `${themeColors.warning}15`, color: themeColors.warning }}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Alertas Activas
            </div>
            <div style={cardStyles.cardBody}>
              {insightsData?.alertas?.length > 0 ? (
                insightsData.alertas.slice(0, 3).map((alerta: any, index: number) => (
                  <div key={index} style={{
                    padding: '12px',
                    marginBottom: index < 2 ? '8px' : 0,
                    borderRadius: '8px',
                    background: isDark ? '#1f1f1f' : '#f9f9f9'
                  }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong style={{ 
                          fontSize: '13px',
                          color: alerta.severidad === 'CRITICA' ? themeColors.error : 
                                 alerta.severidad === 'ALTA' ? themeColors.warning : themeColors.info 
                        }}>
                          {alerta.tipo.replace('_', ' ')}
                        </strong>
                        <p style={{ fontSize: '12px', color: isDark ? '#b0b0b0' : '#666', marginBottom: 0, marginTop: '4px' }}>
                          {alerta.mensaje}
                        </p>
                      </div>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: alerta.severidad === 'CRITICA' ? `${themeColors.error}20` : 
                                   alerta.severidad === 'ALTA' ? `${themeColors.warning}20` : `${themeColors.info}20`,
                        color: alerta.severidad === 'CRITICA' ? themeColors.error : 
                               alerta.severidad === 'ALTA' ? themeColors.warning : themeColors.info
                      }}>
                        {alerta.severidad}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-check-circle mb-2" style={{ fontSize: '32px', color: themeColors.success, opacity: 0.5 }}></i>
                  <p style={{ color: themeColors.success, fontSize: '14px', marginBottom: 0 }}>Sin alertas activas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div style={cardStyles.card}>
            <div style={{ ...cardStyles.cardHeader, background: `${themeColors.info}15`, color: themeColors.info }}>
              <i className="fas fa-lightbulb me-2"></i>
              Recomendaciones IA
            </div>
            <div style={cardStyles.cardBody}>
              {insightsData?.recomendaciones?.length > 0 ? (
                insightsData.recomendaciones.slice(0, 3).map((rec: any, index: number) => (
                  <div key={index} style={{
                    padding: '12px',
                    marginBottom: index < 2 ? '8px' : 0,
                    borderRadius: '8px',
                    background: isDark ? '#1f1f1f' : '#f9f9f9'
                  }}>
                    <h6 style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#e0e0e0' : '#333', marginBottom: '4px' }}>
                      {rec.accion}
                    </h6>
                    <p style={{ fontSize: '12px', color: isDark ? '#b0b0b0' : '#666', marginBottom: '4px' }}>
                      {rec.descripcion}
                    </p>
                    <small style={{ color: themeColors.success, fontSize: '11px' }}>
                      ROI estimado: €{rec.roi_estimado}
                    </small>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-robot mb-2" style={{ fontSize: '32px', color: themeColors.textSecondary, opacity: 0.5 }}></i>
                  <p style={{ color: themeColors.textSecondary, fontSize: '14px', marginBottom: 0 }}>Generando recomendaciones...</p>
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
function renderInsightsContent(insightsData: any, themeColors: any, cardStyles: any, isDark: boolean) {
  if (!insightsData) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border mb-3" style={{ color: themeColors.primary, width: '3rem', height: '3rem' }}></div>
        <p style={{ color: themeColors.text, fontSize: '14px' }}>Analizando datos con IA...</p>
      </div>
    );
  }

  return (
    <div className="insights-content">
      <div className="row mb-4">
        <div className="col-12">
          <div style={cardStyles.card}>
            <div style={{ ...cardStyles.cardHeader, background: isDark ? '#2a2a2a' : themeColors.primary, color: '#ffffff' }}>
              <i className="fas fa-brain me-2"></i>
              Análisis Inteligente de Rendimiento
            </div>
            <div style={cardStyles.cardBody}>
              <div className="row">
                <div className="col-md-4">
                  <h6 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.primary, marginBottom: '12px' }}>
                    Estado General
                  </h6>
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: insightsData.estado_general === 'OPTIMAL' ? `${themeColors.success}15` : 
                               insightsData.estado_general === 'WARNING' ? `${themeColors.warning}15` : `${themeColors.error}15`,
                    color: insightsData.estado_general === 'OPTIMAL' ? themeColors.success : 
                           insightsData.estado_general === 'WARNING' ? themeColors.warning : themeColors.error,
                    marginBottom: '12px'
                  }}>
                    <i className={`fas fa-${insightsData.estado_general === 'OPTIMAL' ? 'check' : insightsData.estado_general === 'WARNING' ? 'exclamation-triangle' : 'times'} me-2`}></i>
                    {insightsData.estado_general || 'EVALUANDO'}
                  </div>
                  <p style={{ fontSize: '12px', color: isDark ? '#b0b0b0' : '#666' }}>
                    {insightsData.diagnostico_general}
                  </p>
                </div>
                <div className="col-md-4">
                  <h6 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.success, marginBottom: '12px' }}>
                    Puntos Fuertes
                  </h6>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {insightsData.puntos_fuertes?.map((punto: string, index: number) => (
                      <li key={index} style={{ fontSize: '13px', color: isDark ? '#e0e0e0' : '#333', marginBottom: '8px' }}>
                        <i className="fas fa-check-circle me-2" style={{ color: themeColors.success, fontSize: '12px' }}></i>
                        {punto}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6 style={{ fontSize: '14px', fontWeight: 600, color: themeColors.error, marginBottom: '12px' }}>
                    Áreas de Mejora
                  </h6>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {insightsData.areas_mejora?.map((area: string, index: number) => (
                      <li key={index} style={{ fontSize: '13px', color: isDark ? '#e0e0e0' : '#333', marginBottom: '8px' }}>
                        <i className="fas fa-exclamation-circle me-2" style={{ color: themeColors.error, fontSize: '12px' }}></i>
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
function renderGestionContent(machine: any, themeColors: any, cardStyles: any, isDark: boolean) {
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
      <div className="row mb-4">
        <div className="col-md-4">
          <div style={cardStyles.card}>
            <div style={{ ...cardStyles.cardHeader, background: isDark ? '#2a2a2a' : themeColors.primary, color: '#ffffff' }}>
              <i className="fas fa-tools me-2"></i>
              Gestión de Paradas
            </div>
            <div style={cardStyles.cardBody}>
              <div className="d-grid gap-2">
                <button
                  className="btn"
                  style={{
                    background: `${themeColors.info}15`,
                    color: themeColors.info,
                    border: `1px solid ${themeColors.info}30`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '10px'
                  }}
                  onClick={() => alert('🚧 Función en desarrollo - Reclasificar paradas seleccionadas')}
                >
                  <i className="fas fa-edit me-2"></i>
                  Reclasificar Paradas
                </button>
                <button
                  className="btn"
                  style={{
                    background: `${themeColors.warning}15`,
                    color: themeColors.warning,
                    border: `1px solid ${themeColors.warning}30`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '10px'
                  }}
                  onClick={() => handleManagementAction('merge_microstops', {
                    threshold: 120,
                    mergeWindow: 300
                  })}
                >
                  <i className="fas fa-compress-arrows-alt me-2"></i>
                  Fusionar Micro-paradas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}