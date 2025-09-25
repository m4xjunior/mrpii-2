'use client';

import React, { useState, useEffect } from 'react';
import './informes.css';

// --- INTERFACES DE DATOS ---
interface Maquina {
    Id_maquina: number;
    Cod_maquina: string;
    Desc_maquina: string;
}

// Datos que vienen de la API
interface ApiTurnoData {
  turno: 'MAÑANA' | 'TARDE' | 'NOCHE';
  ventana_inicio: string;
  ventana_fin: string;
  oee_turno: number;
  disponibilidad_turno: number;
  rendimiento_turno: number;
  calidad_turno: number;
  velocidad_uh: number;
  seg_por_pza: number;
  unidades_ok: number;
  unidades_nok: number;
  unidades_repro: number;
  unidades_total: number;
  segundos_prod: number;
  segundos_prep: number;
  segundos_pp: number;
  segundos_pnp: number;
  segundos_pcalidad: number;
  objetivo_verde: number;
  objetivo_amarillo: number;
}

interface ApiGlobalesOfData {
  rendimiento_of: number;
  calidad_of: number;
  disponibilidad_of: number;
  oee_of: number;
  velocidad_uh_of: number;
  velocidad_seg_por_pza_of: number;
}

interface ApiPlanificacionData {
  cod_maquina: string;
  cod_of?: string;
  planificado: number;
  fuente_planificado: 'fase' | 'of' | 'sin_dato';
  unidades_ok_total: number;
  unidades_nok_total: number;
  unidades_rw_total: number;
  unidades_total: number;
  fecha_inicio_real?: string;
  fecha_fin_real?: string;
  fecha_fin_estimada?: string;
  objetivo_oee_verde: number;
  objetivo_oee_naranja: number;
}

interface ApiResponse {
  turnos: ApiTurnoData[];
  globales_of: ApiGlobalesOfData;
  planificacion: ApiPlanificacionData;
}

// Datos transformados para la UI
interface TurnoDataUI {
  turno: 'MAÑANA' | 'TARDE' | 'NOCHE';
  window: { start: string; end: string };
  kpis: { oee: number; disponibilidad: number; rendimiento: number; calidad: number; velocidad_uh: number; seg_por_pza: number };
  unidades: { ok: number; nok: number; rw: number; total: number };
  tiempos: { prod_s: number; prep_s: number; paro_pp_s: number; paro_pnp_s: number; paro_calidad_s: number };
}

interface ResumenDataUI {
  cod_maquina: string;
  cod_of?: string;
  planificado: number;
  unidades_ok: number;
  unidades_nok: number;
  unidades_rw: number;
  unidades_total: number;
  velocidad_uh: number;
  velocidad_seg_por_pza: number;
  rendimiento_of: number;
  disponibilidad_of: number;
  calidad_of: number;
  oee_of: number;
  fecha_inicio?: string;
  fecha_fin_estimada?: string;
}

interface InformesDataUI {
  meta: { maquina: string; of?: string; periodo: { inicio: string; fim: string }; timezone: string; objetivo_verde: number; objetivo_amarillo: number; fuente_planificado: string };
  turnos: TurnoDataUI[];
  resumen: ResumenDataUI;
  totais: { periodo_oee: number; periodo_vel_uh: number };
}

// --- COMPONENTES ---

const KPIValue: React.FC<{ label: string; value: number; format: 'percent' | 'units-per-hour' | 'decimal' | 'integer'; thresholds?: { verde: number; amarillo: number } }> = ({ label, value, format, thresholds }) => {
  const formatValue = () => {
    if (value === null || value === undefined || isNaN(value)) return '-';
    switch (format) {
      case 'percent': return `${value.toFixed(1)}%`;
      case 'units-per-hour': return `${value.toFixed(1)} u/h`;
      case 'decimal': return value.toFixed(1);
      case 'integer': return Math.round(value).toLocaleString();
      default: return value.toString();
    }
  };

  const getThresholdClass = () => {
    if (!thresholds || value === null || value === undefined) return '';
    if (value >= thresholds.verde) return 'kpi-verde';
    if (value >= thresholds.amarillo) return 'kpi-amarelo';
    return 'kpi-vermelho';
  };

  return (
    <div className="kpi-value">
      <div className={`value ${getThresholdClass()}`}>{formatValue()}</div>
      <div className="label">{label}</div>
    </div>
  );
};

const FiltrosInformes: React.FC<{ filtros: any; maquinas: Maquina[]; onChange: (f: any) => void; onBuscar: () => void; disabled: boolean }> = ({ filtros, maquinas, onChange, onBuscar, disabled }) => (
  <div className="filtros-container">
    <h3>Filtros</h3>
    <div className="filtros-grid">
        <div className="filtro-item">
          <label htmlFor="cod_maquina">Máquina *</label>
          <select id="cod_maquina" value={filtros.cod_maquina} onChange={(e) => onChange({...filtros, cod_maquina: e.target.value})} required>
              <option value="" disabled>Seleccione una máquina</option>
              {maquinas.map(m => (
                  <option key={m.Id_maquina} value={m.Cod_maquina}>{m.Cod_maquina} - {m.Desc_maquina}</option>
              ))}
          </select>
        </div>
        <div className="filtro-item">
          <label htmlFor="cod_of">OF (opcional)</label>
          <input id="cod_of" type="text" placeholder="ej: OF-24-1234" value={filtros.cod_of} onChange={(e) => onChange({...filtros, cod_of: e.target.value})} />
        </div>
        <div className="filtro-item">
          <label htmlFor="start_date">Fecha Inicio *</label>
          <input id="start_date" type="date" value={filtros.fecha_inicio} onChange={(e) => onChange({...filtros, fecha_inicio: e.target.value})} required />
        </div>
        <div className="filtro-item">
          <label htmlFor="end_date">Fecha Fin *</label>
          <input id="end_date" type="date" value={filtros.fecha_fin} onChange={(e) => onChange({...filtros, fecha_fin: e.target.value})} required />
        </div>
    </div>
    <div className="filtros-actions">
      <button onClick={onBuscar} className="btn-buscar" disabled={disabled}>{disabled ? 'Cargando...' : 'Buscar Datos'}</button>
    </div>
  </div>
);

const TurnoCard: React.FC<{ turno: 'MAÑANA' | 'TARDE' | 'NOCHE'; dados?: TurnoDataUI; thresholds: { verde: number; amarillo: number } }> = ({ turno, dados, thresholds }) => {
  if (!dados) {
    return (
      <div className="turno-card sem-dados">
        <h3>{turno}</h3>
        <p>Sin datos para este turno</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      return `${h}:${m}`;
  };

  const totalTiempo = Math.max(dados.tiempos.prod_s + dados.tiempos.prep_s + dados.tiempos.paro_pp_s + dados.tiempos.paro_pnp_s + dados.tiempos.paro_calidad_s, 1);

  return (
    <div className="turno-card">
      <div className="turno-header">
        <h3>{turno}</h3>
        <div className="turno-window">{new Date(dados.window.start).toLocaleTimeString('es-ES')} - {new Date(dados.window.end).toLocaleTimeString('es-ES')}</div>
        <div className="kpis-principais">
          <KPIValue label="OEE" value={dados.kpis.oee} format="percent" thresholds={thresholds} />
          <KPIValue label="Velocidad" value={dados.kpis.velocidad_uh} format="units-per-hour" />
        </div>
      </div>
      <div className="kpis-grid">
        <KPIValue label="Disponibilidad" value={dados.kpis.disponibilidad} format="percent" thresholds={thresholds} />
        <KPIValue label="Rendimiento" value={dados.kpis.rendimiento} format="percent" thresholds={thresholds} />
        <KPIValue label="Calidad" value={dados.kpis.calidad} format="percent" thresholds={thresholds} />
        <KPIValue label="Seg/Pieza" value={dados.kpis.seg_por_pza} format="decimal" />
      </div>
      <div className="producao-section">
        <h4>Producción</h4>
        <div className="producao-grid">
          <div className="producao-item"><span className="producao-label">OK:</span><span className="producao-valor ok">{Math.round(dados.unidades.ok).toLocaleString()}</span></div>
          <div className="producao-item"><span className="producao-label">NOK:</span><span className="producao-valor nok">{Math.round(dados.unidades.nok).toLocaleString()}</span></div>
          <div className="producao-item"><span className="producao-label">Reproceso:</span><span className="producao-valor rw">{Math.round(dados.unidades.rw).toLocaleString()}</span></div>
          <div className="producao-item total"><span className="producao-label">Total:</span><span className="producao-valor">{Math.round(dados.unidades.total).toLocaleString()}</span></div>
        </div>
      </div>
      <div className="tempos-chart">
        <h4>Tiempos</h4>
        <div className="chart-container">
          <div className="chart-bar">
            <div className="bar-segment prod" style={{width: `${(dados.tiempos.prod_s / totalTiempo) * 100}%`}} title={`Producción: ${formatTime(dados.tiempos.prod_s)}`} />
            <div className="bar-segment prep" style={{width: `${(dados.tiempos.prep_s / totalTiempo) * 100}%`}} title={`Preparación: ${formatTime(dados.tiempos.prep_s)}`} />
            <div className="bar-segment pp" style={{width: `${(dados.tiempos.paro_pp_s / totalTiempo) * 100}%`}} title={`PP: ${formatTime(dados.tiempos.paro_pp_s)}`} />
            <div className="bar-segment pnp" style={{width: `${(dados.tiempos.paro_pnp_s / totalTiempo) * 100}%`}} title={`PNP: ${formatTime(dados.tiempos.paro_pnp_s)}`} />
            <div className="bar-segment cal" style={{width: `${(dados.tiempos.paro_calidad_s / totalTiempo) * 100}%`}} title={`Calidad: ${formatTime(dados.tiempos.paro_calidad_s)}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
    <div className="turno-card skeleton">
        <div className="skeleton-header"></div>
        <div className="skeleton-kpi"></div>
        <div className="skeleton-kpi"></div>
        <div className="skeleton-grid"></div>
        <div className="skeleton-producao"></div>
        <div className="skeleton-chart"></div>
    </div>
);

// --- PÁGINA PRINCIPAL ---
export default function InformesPage() {
  const [filtros, setFiltros] = useState({ 
      cod_maquina: '', 
      cod_of: '', 
      fecha_inicio: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      fecha_fin: new Date().toISOString().split('T')[0] 
  });
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [datos, setDatos] = useState<InformesDataUI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchMaquinas = async () => {
          try {
              const response = await fetch('/api/maquinas');
              if(response.ok) {
                  const data: Maquina[] = await response.json();
                  setMaquinas(data);
              }
          } catch (err) {
              console.error("Failed to fetch maquinas", err);
          }
      };
      fetchMaquinas();
  }, []);

  const transformData = (apiData: ApiResponse, params: any): InformesDataUI => {
      const { turnos, globales_of, planificacion } = apiData;

      const turnosUI: TurnoDataUI[] = turnos.map(t => ({
          turno: t.turno,
          window: { start: t.ventana_inicio, end: t.ventana_fin },
          kpis: { oee: t.oee_turno, disponibilidad: t.disponibilidad_turno, rendimiento: t.rendimiento_turno, calidad: t.calidad_turno, velocidad_uh: t.velocidad_uh, seg_por_pza: t.seg_por_pza },
          unidades: { ok: t.unidades_ok, nok: t.unidades_nok, rw: t.unidades_repro, total: t.unidades_total },
          tiempos: { prod_s: t.segundos_prod, prep_s: t.segundos_prep, paro_pp_s: t.segundos_pp, paro_pnp_s: t.segundos_pnp, paro_calidad_s: t.segundos_pcalidad },
      }));

      const resumenUI: ResumenDataUI = {
          cod_maquina: planificacion.cod_maquina,
          cod_of: planificacion.cod_of,
          planificado: planificacion.planificado,
          unidades_ok: planificacion.unidades_ok_total,
          unidades_nok: planificacion.unidades_nok_total,
          unidades_rw: planificacion.unidades_rw_total,
          unidades_total: planificacion.unidades_total,
          velocidad_uh: globales_of.velocidad_uh_of,
          velocidad_seg_por_pza: globales_of.velocidad_seg_por_pza_of,
          rendimiento_of: globales_of.rendimiento_of,
          disponibilidad_of: globales_of.disponibilidad_of,
          calidad_of: globales_of.calidad_of,
          oee_of: globales_of.oee_of,
          fecha_inicio: planificacion.fecha_inicio_real,
          fecha_fin_estimada: planificacion.fecha_fin_estimada,
      };

      const totalOEE = turnos.length > 0 ? turnos.reduce((acc, t) => acc + t.oee_turno, 0) / turnos.length : 0;
      const totalVelocidad = turnos.length > 0 ? turnos.reduce((acc, t) => acc + t.velocidad_uh, 0) / turnos.length : 0;

      return {
          meta: {
              maquina: planificacion.cod_maquina,
              of: planificacion.cod_of,
              periodo: { inicio: params.fecha_inicio, fim: params.fecha_fin },
              timezone: 'Europe/Madrid',
              objetivo_verde: planificacion.objetivo_oee_verde,
              objetivo_amarillo: planificacion.objetivo_oee_naranja,
              fuente_planificado: planificacion.fuente_planificado,
          },
          turnos: turnosUI,
          resumen: resumenUI,
          totais: { periodo_oee: totalOEE, periodo_vel_uh: totalVelocidad },
      };
  };

  const buscarDados = async () => {
    if (!filtros.cod_maquina || !filtros.fecha_inicio || !filtros.fecha_fin) {
      setError('Los campos Máquina, Fecha Inicio y Fecha Fin son obligatorios.');
      return;
    }
    setLoading(true);
    setError(null);
    setDatos(null);

    try {
      const params = new URLSearchParams({
        cod_maquina: filtros.cod_maquina,
        fecha_inicio: filtros.fecha_inicio,
        fecha_fin: filtros.fecha_fin,
        ...(filtros.cod_of && { cod_of: filtros.cod_of }),
      });

      const response = await fetch(`/api/informes?${params.toString()}`);
      const apiData: ApiResponse = await response.json();

      if (response.ok) {
        if (apiData.turnos.length === 0 && !apiData.planificacion.cod_maquina) {
            setError('No se encontraron datos para los filtros seleccionados.');
            setDatos(null);
        } else {
            const transformed = transformData(apiData, filtros);
            setDatos(transformed);
        }
      } else {
        const errorData = apiData as any;
        setError(errorData.error || 'Error al cargar los datos del servidor.');
      }
    } catch (err) {
      console.error('Error al buscar datos:', err);
      setError('Error de conexión. Verifique la red o el estado del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="informes-page">
      <div className="container">
        <header className="page-header">
          <h1>Informes de Producción</h1>
          <p>Análisis de rendimiento por máquina, OF y turno con datos en tiempo real.</p>
        </header>

        <section className="filtros-section">
          <FiltrosInformes filtros={filtros} maquinas={maquinas} onChange={setFiltros} onBuscar={buscarDados} disabled={loading} />
        </section>

        {error && <div className="error-message"><strong>Error:</strong> {error}</div>}

        {loading && (
            <section className="turnos-section">
                <div className="turnos-grid">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </section>
        )}

        {datos && !loading && (
          <>
            <section className="meta-section">
              <div className="meta-grid">
                <div className="meta-item"><span className="meta-label">Máquina:</span><span className="meta-value">{datos.meta.maquina}</span></div>
                {datos.meta.of && <div className="meta-item"><span className="meta-label">OF:</span><span className="meta-value">{datos.meta.of}</span></div>}
                <div className="meta-item"><span className="meta-label">Período:</span><span className="meta-value">{new Date(datos.meta.periodo.inicio).toLocaleDateString('es-ES')} - {new Date(datos.meta.periodo.fim).toLocaleDateString('es-ES')}</span></div>
                <div className="meta-item"><span className="meta-label">Timezone:</span><span className="meta-value">{datos.meta.timezone}</span></div>
              </div>
            </section>

            <section className="totais-section">
              <h2>Resumen General</h2>
              <div className="resumen-grid">
                <div className="resumen-card">
                  <div className="resumen-header">
                    <span className="resumen-label">Planificado</span>
                    <span className={`badge-source badge-${datos.meta.fuente_planificado}`}>{datos.meta.fuente_planificado}</span>
                  </div>
                  <div className="resumen-value">{datos.resumen.planificado.toLocaleString()} pzas</div>
                </div>
                <div className="resumen-card">
                  <span className="resumen-label">Producido</span>
                  <div className="resumen-value">{datos.resumen.unidades_total.toLocaleString()} pzas</div>
                  <div className="resumen-subvalues">
                    <span className="ok">OK {datos.resumen.unidades_ok.toLocaleString()}</span>
                    <span className="nok">NOK {datos.resumen.unidades_nok.toLocaleString()}</span>
                    <span className="rw">RW {datos.resumen.unidades_rw.toLocaleString()}</span>
                  </div>
                </div>
                <div className="resumen-card">
                  <span className="resumen-label">Velocidad OF</span>
                  <div className="resumen-value">{datos.resumen.velocidad_uh.toFixed(1)} u/h</div>
                  <small>{datos.resumen.velocidad_seg_por_pza.toFixed(1)} seg/pza</small>
                </div>
                <div className="resumen-card">
                  <span className="resumen-label">Fechas</span>
                  <div className="resumen-fechas">
                    {datos.resumen.fecha_inicio && <span><strong>Inicio:</strong> {new Date(datos.resumen.fecha_inicio).toLocaleString('es-ES')}</span>}
                    {datos.resumen.fecha_fin_estimada && <span><strong>Fin Estimado:</strong> {new Date(datos.resumen.fecha_fin_estimada).toLocaleString('es-ES')}</span>}
                  </div>
                </div>
              </div>
            </section>

            <section className="turnos-section">
              <div className="turnos-grid">
                {['MAÑANA', 'TARDE', 'NOCHE'].map(turno_nome => {
                  const turno = datos.turnos.find(t => t.turno === turno_nome);
                  return <TurnoCard key={turno_nome} turno={turno_nome as 'MAÑANA' | 'TARDE' | 'NOCHE'} dados={turno} thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />;
                })}
              </div>
            </section>

            <section className="totais-section">
              <h2>Resumen del Período (Agregado)</h2>
              <div className="totais-grid">
                <KPIValue label="OEE Promedio (Turnos)" value={datos.totais.periodo_oee} format="percent" thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />
                <KPIValue label="Velocidad Promedio (Turnos)" value={datos.totais.periodo_vel_uh} format="units-per-hour" />
                <KPIValue label="OEE (OF)" value={datos.resumen.oee_of} format="percent" thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />
                <KPIValue label="Disponibilidad (OF)" value={datos.resumen.disponibilidad_of} format="percent" thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />
                <KPIValue label="Rendimiento (OF)" value={datos.resumen.rendimiento_of} format="percent" thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />
                <KPIValue label="Calidad (OF)" value={datos.resumen.calidad_of} format="percent" thresholds={{ verde: datos.meta.objetivo_verde, amarillo: datos.meta.objetivo_amarillo }} />
              </div>
            </section>
          </>
        )}

        {!datos && !loading && !error &&
            <div className="placeholder-message">
                <p>Por favor, introduzca los filtros y haga clic en "Buscar Datos" para ver los informes.</p>
            </div>
        }
      </div>
    </div>
  );
}
