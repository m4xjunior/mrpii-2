'use client';

import { useState, useEffect, CSSProperties } from 'react';
import { MachineStatus } from '../types/machine';
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
  const [activeTab, setActiveTab] = useState('oee');
  const [tabData, setTabData] = useState<any>(null);
  const [oeeData, setOeeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'stats'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('fecha');
  const [shiftData, setShiftData] = useState<any>(null);
  const [shiftLoading, setShiftLoading] = useState(false);

  // Hook para dados OEE - deve estar no nível superior
  const { data: oeeHookData, loading: oeeHookLoading, error: oeeHookError } = useOEEData(
    machine?.machine?.Cod_maquina || null,
    7
  );


  useEffect(() => {
    if (isOpen && machine) {
      fetchTabData(activeTab);
      if (!oeeData) {
        fetchOeeData();
      }
      if (!shiftData && machine.currentOF && machine.currentOF !== '--') {
        fetchShiftData();
      }
    }
  }, [isOpen, machine, activeTab]);

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

  const fetchShiftData = async () => {
    if (!machine || !machine.currentOF || machine.currentOF === '--') return;

    setShiftLoading(true);
    try {
      const response = await fetch(`/api/analytics/shifts?cod_maquina=${machine.machine.Cod_maquina}&cod_of=${machine.currentOF}`);
      const result = await response.json();
      if (result.success) {
        setShiftData(result.data);
      }
    } catch (error) {
      console.error('Error obteniendo datos por turno:', error);
    } finally {
      setShiftLoading(false);
    }
  };

  if (!isOpen || !machine) return null;


  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: 'fas fa-dashboard' },
    { id: 'of', label: 'OF Actual', icon: 'fas fa-clipboard-list' },
    { id: 'paros', label: 'Paradas', icon: 'fas fa-pause-circle' },
    { id: 'produccion', label: 'Producción', icon: 'fas fa-chart-line' },
    { id: 'oee', label: 'OEE', icon: 'fas fa-tachometer-alt' }
  ];

  const formatNumber = (value?: number | null) => {
    if (value === null || value === undefined) return '—';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '—';
    return Math.round(numeric).toLocaleString('es-ES');
  };

  const formatPercent = (value?: number | null) => {
    if (value === null || value === undefined) return '—';
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return '—';
    return `${numeric.toFixed(1)}%`;
  };

  const shiftLabel = machine.order?.shift || 'Sin turno';
  const currentOF = machine.currentOF && machine.currentOF !== '--' ? machine.currentOF : null;
  const downtimeLabel = machine.downtime || (machine.status === 'PARADA' ? 'Parada detectada' : null);
  const plannedUnits = machine.Rt_Unidades_planning ?? 0;
  const producedOkUnits = machine.production.ok ?? 0;
  const planningProgress = plannedUnits > 0 ? Math.min(100, (producedOkUnits / plannedUnits) * 100) : 0;
  const remainingPieces = machine.productionOF?.remainingPieces ?? 0;
  const remainingTime = machine.productionOF?.remainingTime || '—';
  const totalPieces = machine.production.total ?? 0;
  const qualityRate = totalPieces > 0 ? (machine.production.ok / totalPieces) * 100 : null;

  const tabBadges: Record<string, string> = {
    resumen: formatPercent(machine.oee_turno ?? machine.oee ?? null),
    of: formatNumber(machine.productionOF?.total ?? machine.production.total ?? 0),
    paros: machine.ofInfo?.parosMinutes ? `${machine.ofInfo.parosMinutes}m` : '0m',
    produccion: formatNumber(machine.production.ok ?? 0),
    oee: formatPercent(machine.oee_turno ?? machine.oee ?? null),
  };

  const chipEntries = [
    {
      label: 'Turno',
      value: shiftLabel,
      subtext: 'Ventana actual',
    },
    {
      label: 'OF en curso',
      value: currentOF || 'Sin OF',
      subtext: remainingPieces ? `${formatNumber(remainingPieces)} piezas restantes` : 'Ninguna restante',
      tone: currentOF ? 'is-success' : undefined,
    },
    {
      label: 'Operador',
      value: machine.operatorFull || machine.operator || 'Sin operador',
      subtext: 'Responsable del turno',
    },
    {
      label: 'Tiempo restante',
      value: remainingTime,
      subtext: planningProgress ? `${planningProgress.toFixed(0)}% completado` : 'Sin planificación',
    },
    {
      label: 'Calidad',
      value: qualityRate !== null ? formatPercent(qualityRate) : '—',
      subtext: `${formatNumber(machine.production.ok)} OK / ${formatNumber(machine.production.nok)} NOK`,
      tone: qualityRate !== null && qualityRate < 90 ? 'is-critical' : undefined,
    },
    {
      label: 'Paros acumulados',
      value: machine.ofInfo?.parosMinutes ? `${machine.ofInfo.parosMinutes} min` : 'Sin eventos',
      subtext: downtimeLabel ? downtimeLabel : 'Operativa estable',
      tone: downtimeLabel ? 'is-critical' : undefined,
    },
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
      background: isDark
        ? 'linear-gradient(135deg, rgba(30,30,30,0.95), rgba(58,58,58,0.85))'
        : 'linear-gradient(135deg, rgba(248, 249, 255, 0.96), rgba(236, 243, 255, 0.92))',
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
      background: 'transparent',
      padding: '8px 24px 0',
      borderBottom: `1px solid ${isDark ? '#333333' : '#e8e8e8'}`,
      flexShrink: 0
    },
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
              <div className="machine-detail-chip-grid">
                {chipEntries.map((chip, index) => (
                  <div
                    key={`${chip.label}-${index}`}
                    className={`machine-detail-chip ${chip.tone ?? ''}`}
                  >
                    <span className="chip-label">{chip.label}</span>
                    <span className="chip-value">{chip.value}</span>
                    {chip.subtext && (
                      <span className="chip-subtext">{chip.subtext}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          {/* Tabs Navigation - Sticky */}
            <div style={modalStyles.tabsNav} className="machine-detail-tabbar">
              {tabs.map((tab) => {
                const badge = tabBadges[tab.id];
                const showBadge = badge && badge !== '—';
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`machine-detail-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                    style={activeTab === tab.id ? ({ '--tab-accent': themeColors.primary } as CSSProperties) : undefined}
                  >
                    <span className="tab-icon">
                      <i className={tab.icon}></i>
                    </span>
                    <span className="tab-label">{tab.label}</span>
                    {showBadge && <span className="tab-badge">{badge}</span>}
                  </button>
                );
              })}
            </div>

          {/* Tab Content - Scrollable */}
            <div style={modalStyles.tabContent}>
                {loading && ['of', 'paros', 'produccion', 'oee'].includes(activeTab) ? (
                  <div className="py-5">
                    <SkeletonLoader />
                  </div>
                ) : (
                  renderTabContent(activeTab, tabData, oeeData, machine, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, isDark, themeColors, isMobile, isTablet, getGridCols, oeeHookData, oeeHookLoading, shiftData, shiftLoading)
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

function renderTabContent(tab: string, data: any, oeeData: any, machine: any, viewMode: string, setViewMode: Function, filterType: string, setFilterType: Function, filterDuration: string, setFilterDuration: Function, sortBy: string, setSortBy: Function, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function, oeeHookData?: any, oeeHookLoading?: boolean, shiftData?: any, shiftLoading?: boolean, refreshNightShiftCache?: (event?: React.MouseEvent<HTMLButtonElement>) => Promise<void>) {
  
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
      return renderResumenContent(machine, isDark, themeColors, isMobile, isTablet, getGridCols, cardStyles, shiftData, shiftLoading || false, refreshNightShiftCache);
    case 'of':
      return data ? renderOFContent(data, themeColors, cardStyles) : renderNoData(themeColors);
    case 'paros':
      return data ? renderParosContent(data, viewMode, setViewMode, filterType, setFilterType, filterDuration, setFilterDuration, sortBy, setSortBy, themeColors, tableStyles, isDark) : renderNoData(themeColors);
    case 'produccion':
      return <ProduccionContent data={data} themeColors={themeColors} isDark={isDark} machineId={machine?.machine?.Cod_maquina || ''} />;
    case 'oee':
      return renderOEEContent(data, themeColors, tableStyles, isDark, machine?.machine, oeeHookData, oeeHookLoading);
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
function ProduccionContent({ data, themeColors, isDark, machineId }: { data: any; themeColors: any; isDark: boolean; machineId: string }) {
  // Usar dados que já foram carregados pelo componente pai com a nova estrutura da API
  const currentMachineData = data ? {
    machineId: machineId,
    machineName: data.machine?.Desc_maquina || machineId,
    ok: data.production?.ok || 0,
    nok: data.production?.nok || 0,
    rw: data.production?.rw || 0,
    efficiency: data.efficiency || 0,
    total: data.production?.total || 0,
    of_actual: data.of?.Rt_Cod_of || 'N/A',
    producto_actual: data.of?.Rt_Desc_producto || 'N/A',
    operator: data.operator || 'N/A',
    shift: typeof data.shift === 'string' ? data.shift : 'N/A',
    timestamp: new Date().toISOString(),
    historical: data.historical || []
  } : null;

  if (!data) {
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
              Gráfico de Producción (Dados da mesma API do Resumen)
            </h5>
            <div className="text-center py-4">
              <i className="fas fa-info-circle mb-2" style={{ fontSize: '24px', color: themeColors.info }}></i>
              <p style={{ color: isDark ? '#b0b0b0' : '#666', fontSize: '14px' }}>
                Gráfico temporariamente indisponível - Usando dados consistentes da API de Resumen
              </p>
            </div>
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




function getOEEColor(value: number, themeColors: any) {
  if (value >= 80) return themeColors.success;
  if (value >= 60) return themeColors.warning;
  return themeColors.error;
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
function renderResumenContent(machine: any, isDark: boolean, themeColors: any, isMobile: boolean, isTablet: boolean, getGridCols: Function, cardStyles: any, shiftData: any, shiftLoading: boolean, refreshNightShiftCache?: (event?: React.MouseEvent<HTMLButtonElement>) => Promise<void>) {
  return (
    <div className="resumen-content">
      <div className="row mb-4">
        {[
          { icon: 'fas fa-tachometer-alt', value: `${machine?.efficiency || 0}%`, label: 'OEE Actual', color: themeColors.primary },
          { icon: 'fas fa-check', value: machine?.production?.ok || 0, label: 'Piezas OK', color: themeColors.success },
          { icon: 'fas fa-times', value: machine?.production?.nok || 0, label: 'Piezas NOK', color: themeColors.error },
          { icon: 'fas fa-clock', value: `0 paradas`, label: 'Paradas Mes', color: themeColors.warning },
          { icon: 'fas fa-euro-sign', value: `€0`, label: 'Pérdidas Mes', color: themeColors.info },
          { icon: 'fas fa-chart-line', value: '0', label: 'Prod. Total', color: themeColors.secondary }
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
              {false ? (
                [].slice(0, 3).map((alerta: any, index: number) => (
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
              {false ? (
                [].slice(0, 3).map((rec: any, index: number) => (
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

      {/* Dados consolidados da OF */}
      <div className="row mt-4">
        <div className="col-12">
          <div style={cardStyles.card}>
            <div style={{ ...cardStyles.cardHeader, background: `${themeColors.primary}15`, color: themeColors.primary }}>
              <i className="fas fa-clipboard-list me-2"></i>
              Datos Consolidados da OF: {machine.currentOF}
            </div>
            <div style={cardStyles.cardBody}>
              <div className="row">
                {/* Coluna esquerda - Dados da OF */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3" style={{ color: themeColors.primary }}>
                      Información General
                    </h6>
                    <div className="d-grid gap-2 small">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Producto:</span>
                        <span>{machine.rt_Desc_producto || machine.product?.description || '—'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Planificado:</span>
                        <span>{machine.Rt_Unidades_planning?.toLocaleString('es-ES') || 0}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Producido OK:</span>
                        <span className="text-success">{machine.rt_Unidades_ok?.toLocaleString('es-ES') || 0}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">NOK:</span>
                        <span className="text-danger">{machine.rt_Unidades_nok?.toLocaleString('es-ES') || 0}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">RWK:</span>
                        <span className="text-warning">{machine.rt_Unidades_rw?.toLocaleString('es-ES') || 0}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">OEE da OF:</span>
                        <span className={machine.oee_of >= 65 ? 'text-success' : 'text-warning'}>
                          {(machine.oee_of ?? 0).toFixed(1)}%
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Rendimiento OF:</span>
                        <span>{(machine.rendimiento_of ?? 0).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Velocidade e tempos */}
                  <div className="mb-3">
                    <h6 className="fw-bold mb-3" style={{ color: themeColors.primary }}>
                      Velocidad y Tiempos
                    </h6>
                    <div className="d-grid gap-2 small">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Velocidad:</span>
                        <span>
                          {machine.rt_velocidad > 0 ? `${Math.round(3600 / machine.rt_velocidad)} u/h` : '— u/h'} · {machine.rt_tiempo_pieza?.toFixed(2) ?? '—'} seg/pza
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Tiempo Producción:</span>
                        <span>{machine.rt_tiempo_prod ? `${Math.round(machine.rt_tiempo_prod / 60)} min` : '—'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Fecha Inicio:</span>
                        <span>{machine.rt_fecha_inicio ? new Date(machine.rt_fecha_inicio).toLocaleString('es-ES') : '—'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">Fin Estimado:</span>
                        <span>{machine.rt_fecha_fin_estimada ? new Date(machine.rt_fecha_fin_estimada).toLocaleString('es-ES') : '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna direita - Dados por turno */}
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold" style={{ color: themeColors.primary, margin: 0 }}>
                      Rendimiento por Turno
                    {shiftData && shiftData.cache_info && (
                      shiftData.cache_info.night_shift_from_cache ? (
                        <span className="badge bg-info ms-2" style={{ fontSize: '10px' }}>
                          <i className="fas fa-database me-1"></i>
                          Dados Dinâmicos Ativos
                        </span>
                      ) : shiftData.cache_info.night_shift_from_dynamic ? (
                        <span className="badge bg-warning ms-2" style={{ fontSize: '10px' }}>
                          <i className="fas fa-magic me-1"></i>
                          Gerado Automaticamente
                        </span>
                      ) : null
                    )}
                    </h6>
                    {machine.currentOF && machine.currentOF !== '--' && (
                      <button
                        onClick={async (event) => {
                          if (!machine || !machine.currentOF || machine.currentOF === '--') return;

                          try {
                            const response = await fetch('/api/analytics/shifts', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                cod_maquina: machine.machine.Cod_maquina,
                                cod_of: machine.currentOF,
                                action: 'refresh_night_shift'
                              })
                            });

                            const result = await response.json();
                            if (result.success) {
                              // Forçar recarregamento da página para atualizar os dados
                              window.location.reload();
                            }
                          } catch (error) {
                            console.error('Error al refrescar cache del turno de noche:', error);
                          }
                        }}
                        className="btn btn-sm"
                        style={{
                          background: themeColors.info,
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                        title="Atualizar dados dinâmicos do turno da noite"
                      >
                        <i className="fas fa-sync-alt me-1"></i>
                        Atualizar Cache
                      </button>
                    )}
                  </div>

                  {shiftLoading ? (
                    <div className="text-center py-4">
                      <i className="fas fa-spinner fa-spin mb-2" style={{ fontSize: '24px', color: themeColors.primary }}></i>
                      <p style={{ color: themeColors.textSecondary, fontSize: '14px' }}>Cargando datos por turno...</p>
                    </div>
                  ) : shiftData && shiftData.turnos ? (
                    <div className="d-grid gap-3">
                      {shiftData.turnos.map((turno: any, index: number) => (
                        <div key={index} style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: isDark ? '#1f1f1f' : '#f9f9f9',
                          border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
                          position: 'relative'
                        }}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold" style={{ color: themeColors.primary }}>
                              {turno.turno}
                              {turno.turno === 'Noche' && shiftData?.cache_info?.night_shift_from_cache && (
                                <i className="fas fa-magic ms-2" style={{ color: themeColors.info, fontSize: '12px' }} title="Usando variáveis dinâmicas"></i>
                              )}
                            </span>
                            <span className={`badge ${turno.oee >= 65 ? 'bg-success' : 'bg-warning'}`}>
                              OEE: {turno.oee?.toFixed(1) ?? 0}%
                              {turno.turno === 'Noche' && (
                                shiftData?.cache_info?.night_shift_from_cache ? (
                                  <span className="ms-1" style={{ fontSize: '10px' }}>(Cache)</span>
                                ) : shiftData?.cache_info?.night_shift_from_dynamic ? (
                                  <span className="ms-1" style={{ fontSize: '10px' }}>(Auto)</span>
                                ) : null
                              )}
                            </span>
                          </div>

                          {/* Barra OEE */}
                          <div className="mb-2">
                            <div className="d-flex justify-content-between text-xs mb-1">
                              <span>OEE</span>
                              <span>{turno.oee?.toFixed(1) ?? 0}%</span>
                            </div>
                            <div style={{
                              height: '8px',
                              background: isDark ? '#333' : '#e0e0e0',
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                height: '100%',
                                width: `${Math.min(100, turno.oee ?? 0)}%`,
                                background: turno.oee >= 65 ? themeColors.success : themeColors.warning,
                                transition: 'width 0.3s ease'
                              }}></div>
                            </div>
                          </div>

                          {/* Barra empilhada de tempos */}
                          <div className="mb-2">
                            <div className="d-flex justify-content-between text-xs mb-1">
                              <span>Tiempos (min)</span>
                              <span>{(turno.prep_min + turno.prod_min + turno.paro_min) || 0} total</span>
                            </div>
                            <div style={{
                              height: '8px',
                              background: isDark ? '#333' : '#e0e0e0',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              display: 'flex'
                            }}>
                              <div style={{
                                height: '100%',
                                width: `${((turno.prep_min || 0) / Math.max(1, (turno.prep_min + turno.prod_min + turno.paro_min))) * 100}%`,
                                background: themeColors.warning,
                                transition: 'width 0.3s ease'
                              }} title={`Preparación: ${turno.prep_min || 0} min`}></div>
                              <div style={{
                                height: '100%',
                                width: `${((turno.prod_min || 0) / Math.max(1, (turno.prep_min + turno.prod_min + turno.paro_min))) * 100}%`,
                                background: themeColors.success,
                                transition: 'width 0.3s ease'
                              }} title={`Producción: ${turno.prod_min || 0} min`}></div>
                              <div style={{
                                height: '100%',
                                width: `${((turno.paro_min || 0) / Math.max(1, (turno.prep_min + turno.prod_min + turno.paro_min))) * 100}%`,
                                background: themeColors.error,
                                transition: 'width 0.3s ease'
                              }} title={`Paros: ${turno.paro_min || 0} min`}></div>
                            </div>
                            <div className="d-flex justify-content-between text-xs mt-1">
                              <span style={{ color: themeColors.warning }}>Prep</span>
                              <span style={{ color: themeColors.success }}>Prod</span>
                              <span style={{ color: themeColors.error }}>Paro</span>
                            </div>
                          </div>

                          {/* Estatísticas do turno */}
                          <div className="row text-center">
                            <div className="col-4">
                              <div className="text-success fw-bold">{turno.ok?.toLocaleString('es-ES') || 0}</div>
                              <div className="text-xs">OK</div>
                            </div>
                            <div className="col-4">
                              <div className="text-danger fw-bold">{turno.nok?.toLocaleString('es-ES') || 0}</div>
                              <div className="text-xs">NOK</div>
                            </div>
                            <div className="col-4">
                              <div className="text-warning fw-bold">{turno.rwk?.toLocaleString('es-ES') || 0}</div>
                              <div className="text-xs">RWK</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-chart-bar mb-2" style={{ fontSize: '24px', color: themeColors.textSecondary, opacity: 0.5 }}></i>
                      <p style={{ color: themeColors.textSecondary, fontSize: '14px', marginBottom: 0 }}>
                        {machine.currentOF ? 'No hay datos por turno disponibles' : 'Sin OF activa'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
