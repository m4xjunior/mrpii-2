"use client";

import React, { useState, useEffect } from "react";
import "./informes.css";
import ProductionBars from "../../../components/charts/ProductionBars";
import TimeDistributionStack from "../../../components/charts/TimeDistributionStack";
import OEEByShift from "../../../components/charts/OEEByShift";
import TimesByShiftStack from "../../../components/charts/TimesByShiftStack";
import ProductionByShiftGrouped from "../../../components/charts/ProductionByShiftGrouped";
import SpeedLineByShift from "../../../components/charts/SpeedLineByShift";

// --- INTERFACES DE DATOS ---
interface Maquina {
  Id_maquina: number;
  Cod_maquina: string;
  Desc_maquina: string;
}

// Datos que vienen de la API
interface ApiOperarioData {
  turno: "MAÑANA" | "TARDE" | "NOCHE";
  id_operario: number | null;
  operario_nombre: string;
  legajo: string | null;
  unidades_ok: number;
  unidades_nok: number;
  unidades_repro: number;
  unidades_total: number;
  segundos_prod: number;
  segundos_prep: number;
  segundos_pp: number;
  segundos_pnp: number;
  segundos_pcalidad: number;
  segundos_paro: number;
  disponibilidad: number;
  rendimiento: number;
  calidad: number;
  oee: number;
  velocidad_uh: number;
  seg_por_pza: number;
}

interface ApiTurnoData {
  turno: "MAÑANA" | "TARDE" | "NOCHE";
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
  operarios?: ApiOperarioData[];
  estado_turno?: 'finalizado' | 'en_curso' | 'no_iniciado';
  ultima_actualizacion?: string;
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
  fuente_planificado: "fase" | "of" | "sin_dato";
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
interface OperarioDataUI {
  id?: number | null;
  nombre: string;
  legajo?: string | null;
  kpis: {
    oee: number;
    disponibilidad: number;
    rendimiento: number;
    calidad: number;
    velocidad_uh: number;
    seg_por_pza: number;
  };
  unidades: { ok: number; nok: number; rw: number; total: number };
  tiempos: {
    prod_s: number;
    prep_s: number;
    paro_pp_s: number;
    paro_pnp_s: number;
    paro_calidad_s: number;
    paro_total_s: number;
  };
}

interface TurnoDataUI {
  turno: "MAÑANA" | "TARDE" | "NOCHE";
  window: { start: string; end: string };
  kpis: {
    oee: number;
    disponibilidad: number;
    rendimiento: number;
    calidad: number;
    velocidad_uh: number;
    seg_por_pza: number;
  };
  unidades: { ok: number; nok: number; rw: number; total: number };
  tiempos: {
    prod_s: number;
    prep_s: number;
    paro_pp_s: number;
    paro_pnp_s: number;
    paro_calidad_s: number;
  };
  operarios: OperarioDataUI[];
  estado: 'finalizado' | 'en_curso' | 'no_iniciado';
  ultimaActualizacion?: string;
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
  meta: {
    maquina: string;
    of?: string;
    periodo: { inicio: string; fim: string };
    timezone: string;
    objetivo_verde: number;
    objetivo_amarillo: number;
    fuente_planificado: string;
  };
  turnos: TurnoDataUI[];
  resumen: ResumenDataUI;
  totais: { periodo_oee: number; periodo_vel_uh: number };
}

// --- COMPONENTES ---

const KPIValue: React.FC<{
  label: string;
  value: number;
  format: "percent" | "units-per-hour" | "decimal" | "integer";
  thresholds?: { verde: number; amarillo: number };
  size?: "small" | "medium" | "large";
}> = ({ label, value, format, thresholds, size = "medium" }) => {
  const formatValue = () => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    switch (format) {
      case "percent":
        return `${value.toFixed(1)}%`;
      case "units-per-hour":
        return `${value.toFixed(1)} u/h`;
      case "decimal":
        return value.toFixed(1);
      case "integer":
        return Math.round(value).toLocaleString();
      default:
        return value.toString();
    }
  };

  const getThresholdClass = () => {
    if (!thresholds || value === null || value === undefined) return "";
    if (value >= thresholds.verde) return "kpi-verde";
    if (value >= thresholds.amarillo) return "kpi-amarelo";
    return "kpi-vermelho";
  };

  return (
    <div className={`kpi-value kpi-${size}`}>
      <div className={`value ${getThresholdClass()}`}>{formatValue()}</div>
      <div className="label">{label}</div>
    </div>
  );
};

const FiltrosInformes: React.FC<{
  filtros: any;
  maquinas: Maquina[];
  ofs?: string[];
  onChange: (f: any) => void;
  onBuscar: () => void;
  onExport?: () => void;
  disabled: boolean;
}> = ({ filtros, maquinas, ofs = [], onChange, onBuscar, onExport, disabled }) => (
  <div className="card radius-15">
    <div className="card-body">
      <div className="d-flex align-items-center mb-3">
        <h5 className="mb-0">
          <i className="fas fa-filter me-2"></i>
          Filtros de Búsqueda
        </h5>
      </div>
      <div className="filtros-grid">
        <div className="filtro-item">
          <label htmlFor="cod_maquina" className="form-label">
            <i className="fas fa-industry me-1"></i>Máquina *
          </label>
          <select
            id="cod_maquina"
            className="form-select"
            value={filtros.cod_maquina}
            onChange={(e) =>
              onChange({ ...filtros, cod_maquina: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Seleccione una máquina
            </option>
            {maquinas.map((m) => (
              <option key={m.Id_maquina} value={m.Cod_maquina}>
                {m.Cod_maquina} - {m.Desc_maquina}
              </option>
            ))}
          </select>
        </div>
        <div className="filtro-item">
          <label htmlFor="cod_of" className="form-label">
            <i className="fas fa-clipboard-list me-1"></i>OF (opcional)
          </label>
          <input
            id="cod_of"
            type="text"
            className="form-control"
            placeholder="ej: OF-24-1234"
            value={filtros.cod_of}
            onChange={(e) => onChange({ ...filtros, cod_of: e.target.value })}
            list="ofs-list"
          />
          <datalist id="ofs-list">
            {ofs.slice(0, 50).map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </div>
        <div className="filtro-item">
          <label htmlFor="start_date" className="form-label">
            <i className="fas fa-calendar-alt me-1"></i>Fecha Inicio *
          </label>
          <input
            id="start_date"
            type="date"
            className="form-control"
            value={filtros.fecha_inicio}
            onChange={(e) =>
              onChange({ ...filtros, fecha_inicio: e.target.value })
            }
            required
          />
        </div>
        <div className="filtro-item">
          <label htmlFor="end_date" className="form-label">
            <i className="fas fa-calendar-alt me-1"></i>Fecha Fin *
          </label>
          <input
            id="end_date"
            type="date"
            className="form-control"
            value={filtros.fecha_fin}
            onChange={(e) =>
              onChange({ ...filtros, fecha_fin: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button
          onClick={onBuscar}
          className="btn btn-primary btn-lg"
          disabled={disabled}
        >
          {disabled ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Cargando...
            </>
          ) : (
            <>
              <i className="fas fa-search me-2"></i>
              Buscar Datos
            </>
          )}
        </button>
        <button
          onClick={onExport}
          className="btn btn-outline-secondary btn-lg"
          disabled={disabled}
          aria-label="Exportar datos visibles"
        >
          <i className="fas fa-file-export me-2"></i>
          Exportar (CSV)
        </button>
      </div>
    </div>
  </div>
);

const TurnoCard: React.FC<{
  turno: "MAÑANA" | "TARDE" | "NOCHE";
  dados?: TurnoDataUI;
  thresholds: { verde: number; amarillo: number };
  planificado?: number;
}> = ({ turno, dados, thresholds, planificado = 0 }) => {
  if (!dados) {
    return (
      <div className="col-12 col-lg-4">
        <div className="card radius-15 h-100">
          <div className="card-body text-center d-flex flex-column justify-content-center">
            <i
              className="fas fa-clock text-muted mb-3"
              style={{ fontSize: "2.5rem" }}
            ></i>
            <h5 className="text-muted">{turno}</h5>
            <p className="text-muted mb-0">Sin datos para este turno</p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}`;
  };

  const totalTiempo = Math.max(
    dados.tiempos.prod_s +
      dados.tiempos.prep_s +
      dados.tiempos.paro_pp_s +
      dados.tiempos.paro_pnp_s +
      dados.tiempos.paro_calidad_s,
    1,
  );

  const getTurnoIcon = (turno: string) => {
    switch (turno) {
      case "MAÑANA":
        return "fas fa-sun";
      case "TARDE":
        return "fas fa-cloud-sun";
      case "NOCHE":
        return "fas fa-moon";
      default:
        return "fas fa-clock";
    }
  };

  const getTurnoColor = (turno: string) => {
    switch (turno) {
      case "MAÑANA":
        return "warning";
      case "TARDE":
        return "info";
      case "NOCHE":
        return "dark";
      default:
        return "secondary";
    }
  };

  const formatPercentValue = (value?: number | null) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return `${value.toFixed(1)}%`;
  };

  const formatUnits = (value?: number | null) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return Math.round(value).toLocaleString();
  };

  const getChipClass = (value?: number | null) => {
    if (value === null || value === undefined || isNaN(value)) return "chip-neutral";
    if (value >= thresholds.verde) return "chip-verde";
    if (value >= thresholds.amarillo) return "chip-amarillo";
    return "chip-rojo";
  };

  const estado = dados.estado ?? "finalizado";
  const estadoKey = estado.replace("_", "-");
  const estadoLabel =
    estado === "en_curso" ? "En curso" : estado === "no_iniciado" ? "No iniciado" : "Finalizado";
  const estadoIcon =
    estado === "en_curso"
      ? "fas fa-broadcast-tower"
      : estado === "no_iniciado"
        ? "fas fa-hourglass-half"
        : "fas fa-check-circle";

  const windowStart = new Date(dados.window.start);
  const windowEnd = new Date(dados.window.end);
  const startTime = windowStart.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = windowEnd.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const datosHasta = dados.ultimaActualizacion
    ? new Date(dados.ultimaActualizacion)
    : new Date();

  if (estado === "no_iniciado") {
    return (
      <div className="col-12 col-lg-4">
        <div className={`card radius-15 h-100 turno-card estado-${estadoKey}`}>
          <div className="card-header border-bottom-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  className={`icon-circle bg-light-${getTurnoColor(turno)} text-${getTurnoColor(turno)} me-3`}
                >
                  <i className={getTurnoIcon(turno)}></i>
                </div>
                <div>
                  <h5 className="mb-0">{turno}</h5>
                  <small className="text-muted">
                    {startTime} - {endTime}
                  </small>
                </div>
              </div>
              <span className={`turno-state turno-${estadoKey}`}>
                <i className={`${estadoIcon} me-1`}></i>
                {estadoLabel}
              </span>
            </div>
          </div>
          <div className="card-body turno-pending-body text-center">
            <i className="fas fa-calendar-alt text-muted mb-3" style={{ fontSize: "2.5rem" }}></i>
            <p className="text-muted mb-1">Este turno ainda não começou.</p>
            <small className="text-muted">Início previsto às {startTime}</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12 col-lg-4">
      <div className={`card radius-15 h-100 turno-card estado-${estadoKey}`}>
        <div className="card-header border-bottom-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className={`icon-circle bg-light-${getTurnoColor(turno)} text-${getTurnoColor(turno)} me-3`}
              >
                <i className={getTurnoIcon(turno)}></i>
              </div>
              <div>
                <h5 className="mb-0">{turno}</h5>
                <small className="text-muted">
                  {startTime} - {endTime}
                </small>
              </div>
            </div>
            <div className="text-end">
              <span className={`turno-state turno-${estadoKey}`}>
                <i className={`${estadoIcon} me-1`}></i>
                {estadoLabel}
              </span>
              {dados.operarios && dados.operarios.length > 0 && (
                <div className="turno-resume mt-2">
                  <small className="text-muted d-block">Operador líder</small>
                  <span className="fw-semibold">{dados.operarios[0].nombre}</span>
                </div>
              )}
              </div>
          </div>
        </div>

        <div className="card-body">
          {estado === "en_curso" && (
            <div className="turno-alert en-curso">
              <i className="fas fa-satellite-dish me-2"></i>
              Dados atualizados até {datosHasta.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
          {/* KPIs Principales */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <KPIValue
                label="OEE"
                value={dados.kpis.oee}
                format="percent"
                thresholds={thresholds}
                size="large"
              />
            </div>
            <div className="col-6">
              <KPIValue
                label="Velocidad"
                value={dados.kpis.velocidad_uh}
                format="units-per-hour"
                size="large"
              />
            </div>
          </div>

          {/* KPIs Secundarios */}
          <div className="row g-2 mb-4">
            <div className="col-6">
              <KPIValue
                label="Disponibilidad"
                value={dados.kpis.disponibilidad}
                format="percent"
                thresholds={thresholds}
                size="small"
              />
            </div>
            <div className="col-6">
              <KPIValue
                label="Rendimiento"
                value={dados.kpis.rendimiento}
                format="percent"
                thresholds={thresholds}
                size="small"
              />
            </div>
            <div className="col-6">
              <KPIValue
                label="Calidad"
                value={dados.kpis.calidad}
                format="percent"
                thresholds={thresholds}
                size="small"
              />
            </div>
            <div className="col-6">
              <KPIValue
                label="Seg/Pieza"
                value={dados.kpis.seg_por_pza}
                format="decimal"
                size="small"
              />
            </div>
          </div>

          {/* Producción */}
          <div className="produccion-section">
            <h6 className="mb-3">
              <i className="fas fa-chart-bar me-2"></i>Producción
            </h6>

            <div className="chart-wrapper mb-3">
              <ProductionBars
                data={{
                  plan: Math.round(planificado),
                  ok: Math.round(dados.unidades.ok),
                  nok: Math.round(dados.unidades.nok),
                  rwk: Math.round(dados.unidades.rw),
                }}
                height={220}
              />
            </div>

            {/* Keep existing stat cards below chart */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="stat-card bg-light-success">
                  <div className="stat-value text-success">
                    {Math.round(dados.unidades.ok).toLocaleString()}
                  </div>
                  <div className="stat-label">OK</div>
                </div>
              </div>
              <div className="col-6">
                <div className="stat-card bg-light-danger">
                  <div className="stat-value text-danger">
                    {Math.round(dados.unidades.nok).toLocaleString()}
                  </div>
                  <div className="stat-label">NOK</div>
                </div>
              </div>
              <div className="col-6">
                <div className="stat-card bg-light-warning">
                  <div className="stat-value text-warning">
                    {Math.round(dados.unidades.rw).toLocaleString()}
                  </div>
                  <div className="stat-label">Reproceso</div>
                </div>
              </div>
              <div className="col-6">
                <div className="stat-card bg-light-primary">
                  <div className="stat-value text-primary">
                    {Math.round(planificado).toLocaleString()}
                  </div>
                  <div className="stat-label">Plan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tiempos Chart */}
          <div className="tiempos-section">
            <h6 className="mb-3">
              <i className="fas fa-clock me-2"></i>Distribución de Tiempos
            </h6>

            <div className="chart-wrapper mb-3">
              <TimeDistributionStack
                data={{
                  prepSeconds: dados.tiempos.prep_s,
                  prodSeconds: dados.tiempos.prod_s,
                  paroSeconds:
                    dados.tiempos.paro_pp_s + dados.tiempos.paro_pnp_s,
                  calidadSeconds: dados.tiempos.paro_calidad_s,
                }}
                height={220}
              />
            </div>

            {/* Keep existing time stats below chart */}
            <div className="chart-legend mt-2">
              <div className="legend-item">
                <span className="legend-dot prod"></span>Prod:{" "}
                {formatTime(dados.tiempos.prod_s)}
              </div>
              <div className="legend-item">
                <span className="legend-dot prep"></span>Prep:{" "}
                {formatTime(dados.tiempos.prep_s)}
              </div>
              <div className="legend-item">
                <span className="legend-dot pp"></span>PP:{" "}
                {formatTime(dados.tiempos.paro_pp_s)}
              </div>
              <div className="legend-item">
                <span className="legend-dot pnp"></span>PNP:{" "}
                {formatTime(dados.tiempos.paro_pnp_s)}
              </div>
              <div className="legend-item">
                <span className="legend-dot cal"></span>Cal:{" "}
                {formatTime(dados.tiempos.paro_calidad_s)}
              </div>
            </div>
          </div>

          {/* Operadores */}
          <div className="operadores-section mt-4" id="operadores-por-turno">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">
                <i className="fas fa-user-hard-hat me-2"></i>Operadores
              </h6>
              <span className="badge bg-light-primary text-primary">
                {dados.operarios.length} activos
              </span>
            </div>

            {dados.operarios.length > 0 ? (
              <div className="operator-list">
                {dados.operarios.map((operario) => {
                  const totalOperador = Math.max(
                    operario.tiempos.prod_s +
                      operario.tiempos.prep_s +
                      operario.tiempos.paro_total_s,
                    1,
                  );

                  const prodPct = (operario.tiempos.prod_s / totalOperador) * 100;
                  const prepPct = (operario.tiempos.prep_s / totalOperador) * 100;
                  const paroPct = (operario.tiempos.paro_total_s / totalOperador) * 100;

                  const rowKey = `${operario.id ?? "sin-id"}-${operario.nombre}`;

                  const isActual = dados.operarios[0]?.nombre === operario.nombre;

                  return (
                    <div className="operator-row" key={rowKey}>
                      <div className="operator-meta">
                        <div className="operator-name">
                          {operario.nombre}
                          {isActual && (
                            <span className="badge bg-light-primary text-primary ms-2">Actual</span>
                          )}
                        </div>
                        {operario.legajo && (
                          <div className="operator-legajo">
                            Legajo {operario.legajo}
                          </div>
                        )}
                      </div>

                      <div className="operator-bars">
                        <div className="operator-bar-bg">
                          <span
                            className="operator-bar-segment prod"
                            style={{ width: `${prodPct}%` }}
                          ></span>
                          <span
                            className="operator-bar-segment prep"
                            style={{ width: `${prepPct}%` }}
                          ></span>
                          <span
                            className="operator-bar-segment paro"
                            style={{ width: `${paroPct}%` }}
                          ></span>
                        </div>
                        <div className="operator-times">
                          <span>Prod {formatTime(operario.tiempos.prod_s)}</span>
                          <span>Prep {formatTime(operario.tiempos.prep_s)}</span>
                          <span>Paro {formatTime(operario.tiempos.paro_total_s)}</span>
                        </div>
                      </div>

                      <div className="operator-kpis">
                        <span className={`kpi-chip ${getChipClass(operario.kpis.oee)}`}>
                          OEE {formatPercentValue(operario.kpis.oee)}
                        </span>
                        <span
                          className={`kpi-chip ${getChipClass(operario.kpis.disponibilidad)}`}
                        >
                          Disp {formatPercentValue(operario.kpis.disponibilidad)}
                        </span>
                        <span
                          className={`kpi-chip ${getChipClass(operario.kpis.rendimiento)}`}
                        >
                          Rend {formatPercentValue(operario.kpis.rendimiento)}
                        </span>
                      </div>

                      <div className="operator-piezas">
                        <span className="badge bg-light-success text-success">
                          OK {formatUnits(operario.unidades.ok)}
                        </span>
                        <span className="badge bg-light-danger text-danger">
                          NOK {formatUnits(operario.unidades.nok)}
                        </span>
                        <span className="badge bg-light-warning text-warning">
                          RW {formatUnits(operario.unidades.rw)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="operator-empty text-muted">
                <i className="far fa-user-slash me-2"></i>
                Sin registros de operadores en el turno
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="col-12 col-lg-4">
    <div className="card radius-15 h-100">
      <div className="card-body">
        <div className="skeleton-loader">
          <div className="skeleton-header mb-3"></div>
          <div className="skeleton-kpi mb-3"></div>
          <div className="skeleton-grid mb-3"></div>
          <div className="skeleton-producao mb-3"></div>
          <div className="skeleton-chart"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL ---
export default function InformesPage() {
  const [filtros, setFiltros] = useState({
    cod_maquina: "",
    cod_of: "",
    fecha_inicio: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    fecha_fin: new Date().toISOString().split("T")[0],
  });
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [datos, setDatos] = useState<InformesDataUI | null>(null);
  const [ofs, setOfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await fetch("/api/maquinas");
        if (response.ok) {
          const data: Maquina[] = await response.json();
          setMaquinas(data);
        }
      } catch (err) {
        console.error("Failed to fetch maquinas", err);
      }
    };
    const fetchOFs = async () => {
      try {
        const res = await fetch("/api/analytics/ofs");
        if (res.ok) {
          const data = await res.json();
          const list = (data?.data || []).map((o: any) => o.cod_of).filter(Boolean);
          setOfs(list);
        }
      } catch (e) {
        console.warn("No se pudieron cargar OFs para autocompletar", e);
      }
    };
    fetchMaquinas();
    fetchOFs();
  }, []);

  const transformData = (apiData: ApiResponse, params: any): InformesDataUI => {
    const { turnos, globales_of, planificacion } = apiData;

    const toNumber = (value: number | string | null | undefined, fallback = 0) => {
      if (value === null || value === undefined) return fallback;
      if (typeof value === 'number') return value;
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : fallback;
    };

    const turnosUI: TurnoDataUI[] = turnos.map((t) => ({
      turno: t.turno,
      window: { start: t.ventana_inicio, end: t.ventana_fin },
      kpis: {
        oee: toNumber(t.oee_turno),
        disponibilidad: toNumber(t.disponibilidad_turno),
        rendimiento: toNumber(t.rendimiento_turno),
        calidad: toNumber(t.calidad_turno),
        velocidad_uh: toNumber(t.velocidad_uh),
        seg_por_pza: toNumber(t.seg_por_pza),
      },
      unidades: {
        ok: toNumber(t.unidades_ok),
        nok: toNumber(t.unidades_nok),
        rw: toNumber(t.unidades_repro),
        total: toNumber(t.unidades_total),
      },
      tiempos: {
        prod_s: toNumber(t.segundos_prod),
        prep_s: toNumber(t.segundos_prep),
        paro_pp_s: toNumber(t.segundos_pp),
        paro_pnp_s: toNumber(t.segundos_pnp),
        paro_calidad_s: toNumber(t.segundos_pcalidad),
      },
      operarios: (t.operarios ?? []).map((op) => ({
        id: op.id_operario ?? undefined,
        nombre: op.operario_nombre,
        legajo: op.legajo ?? undefined,
        kpis: {
          oee: toNumber(op.oee),
          disponibilidad: toNumber(op.disponibilidad),
          rendimiento: toNumber(op.rendimiento),
          calidad: toNumber(op.calidad),
          velocidad_uh: toNumber(op.velocidad_uh),
          seg_por_pza: toNumber(op.seg_por_pza),
        },
        unidades: {
          ok: toNumber(op.unidades_ok),
          nok: toNumber(op.unidades_nok),
          rw: toNumber(op.unidades_repro),
          total: toNumber(op.unidades_total),
        },
        tiempos: {
          prod_s: toNumber(op.segundos_prod),
          prep_s: toNumber(op.segundos_prep),
          paro_pp_s: toNumber(op.segundos_pp),
          paro_pnp_s: toNumber(op.segundos_pnp),
          paro_calidad_s: toNumber(op.segundos_pcalidad),
          paro_total_s: toNumber(op.segundos_paro),
        },
      })),
      estado: (t.estado_turno as TurnoDataUI['estado']) ?? 'finalizado',
      ultimaActualizacion: t.ultima_actualizacion,
    }));

    const resumenUI: ResumenDataUI = {
      cod_maquina: planificacion.cod_maquina,
      cod_of: planificacion.cod_of,
      planificado: toNumber(planificacion.planificado),
      unidades_ok: toNumber(planificacion.unidades_ok_total),
      unidades_nok: toNumber(planificacion.unidades_nok_total),
      unidades_rw: toNumber(planificacion.unidades_rw_total),
      unidades_total: toNumber(planificacion.unidades_total),
      velocidad_uh: toNumber(globales_of.velocidad_uh_of),
      velocidad_seg_por_pza: toNumber(globales_of.velocidad_seg_por_pza_of),
      rendimiento_of: toNumber(globales_of.rendimiento_of),
      disponibilidad_of: toNumber(globales_of.disponibilidad_of),
      calidad_of: toNumber(globales_of.calidad_of),
      oee_of: toNumber(globales_of.oee_of),
      fecha_inicio: planificacion.fecha_inicio_real,
      fecha_fin_estimada: planificacion.fecha_fin_estimada,
    };

    const totalOEE =
      turnos.length > 0
        ? turnos.reduce((acc, t) => acc + toNumber(t.oee_turno), 0) / turnos.length
        : 0;
    const totalVelocidad =
      turnos.length > 0
        ? turnos.reduce((acc, t) => acc + toNumber(t.velocidad_uh), 0) / turnos.length
        : 0;

    return {
      meta: {
        maquina: planificacion.cod_maquina,
        of: planificacion.cod_of,
        periodo: { inicio: params.fecha_inicio, fim: params.fecha_fin },
        timezone: "Europe/Madrid",
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
      setError(
        "Los campos Máquina, Fecha Inicio y Fecha Fin son obligatorios.",
      );
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
          setError("No se encontraron datos para los filtros seleccionados.");
          setDatos(null);
        } else {
          const transformed = transformData(apiData, filtros);
          setDatos(transformed);
        }
      } else {
        const errorData = apiData as any;
        setError(errorData.error || "Error al cargar los datos del servidor.");
      }
    } catch (err) {
      console.error("Error al buscar datos:", err);
      setError("Error de conexión. Verifique la red o el estado del servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Exportar CSV con lo visible en la pantalla
  const exportCsv = (data: InformesDataUI | null) => {
    if (!data) return;
    const lines: string[] = [];
    const q = (s: any) => `"${String(s ?? "").replace(/"/g, '""')}"`;

    // Resumen consolidado
    const totalProd = data.turnos.reduce((a, t) => a + (t.tiempos.prod_s || 0), 0);
    const totalPrep = data.turnos.reduce((a, t) => a + (t.tiempos.prep_s || 0), 0);
    const totalParo = data.turnos.reduce((a, t) => a + (t.tiempos.paro_pp_s + t.tiempos.paro_pnp_s + t.tiempos.paro_calidad_s), 0);
    lines.push("Resumen Consolidado");
    lines.push(["Máquina", "OF", "Planificado", "Total", "OK", "NOK", "RWK", "Tiempo Prod (s)", "Tiempo Prep (s)", "Tiempo Paro (s)", "OEE Promedio (%)"].join(","));
    lines.push([
      q(data.meta.maquina),
      q(data.meta.of || ""),
      data.resumen.planificado,
      data.resumen.unidades_total,
      data.resumen.unidades_ok,
      data.resumen.unidades_nok,
      data.resumen.unidades_rw,
      totalProd,
      totalPrep,
      totalParo,
      data.totais.periodo_oee.toFixed(1),
    ].join(","));

    // Por Turno
    lines.push("");
    lines.push("Datos por Turno");
    lines.push(["Turno","Tiempo Prod (s)","Tiempo Prep (s)","Tiempo Paro (s)","OEE (%)","Rendimiento (%)","Vel u/h","Seg/Pieza","OK","NOK","RWK","Total","Operadores"].join(","));
    for (const t of data.turnos) {
      const opCount = t.operarios?.length || 0;
      lines.push([
        t.turno,
        t.tiempos.prod_s,
        t.tiempos.prep_s,
        t.tiempos.paro_pp_s + t.tiempos.paro_pnp_s + t.tiempos.paro_calidad_s,
        t.kpis.oee.toFixed(1),
        t.kpis.rendimiento.toFixed(1),
        t.kpis.velocidad_uh.toFixed(1),
        t.kpis.seg_por_pza.toFixed(1),
        t.unidades.ok,
        t.unidades.nok,
        t.unidades.rw,
        t.unidades.total,
        opCount,
      ].join(","));
    }

    // Operadores por Turno
    lines.push("");
    lines.push("Operadores por Turno");
    lines.push(["Turno","Operador","Legajo","Prod (s)","Prep (s)","Paro (s)","OEE (%)","Rendimiento (%)","Vel u/h","Seg/Pieza","OK","NOK","RWK","Total"].join(","));
    for (const t of data.turnos) {
      for (const op of t.operarios) {
        lines.push([
          t.turno,
          q(op.nombre),
          q(op.legajo || ""),
          op.tiempos.prod_s,
          op.tiempos.prep_s,
          op.tiempos.paro_total_s,
          op.kpis.oee.toFixed(1),
          op.kpis.rendimiento.toFixed(1),
          op.kpis.velocidad_uh.toFixed(1),
          op.kpis.seg_por_pza.toFixed(1),
          op.unidades.ok,
          op.unidades.nok,
          op.unidades.rw,
          op.unidades.total,
        ].join(","));
      }
    }

    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informes_${data.meta.maquina}_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="wrapper">
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            {/* Page Breadcrumb */}
            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">Informes</div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="bx bx-home-alt"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Producción
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  {new Date().toLocaleString("es-ES")}
                </small>
              </div>
            </div>

            {/* Page Header */}
            <div className="text-center mb-4">
              <h1 className="page-title">
                <i className="fas fa-chart-line me-2"></i>
                Informes de Producción
              </h1>
              <p className="page-subtitle">
                Análisis de rendimiento por máquina, OF y turno con datos en
                tiempo real
              </p>
            </div>

            {/* Sticky Submenu / Toolbar */}
            {datos && (
              <div className="informes-toolbar">
                <div className="toolbar-inner container-fluid">
                  <a className="menu-pill" href="#resumen-consolidado">Resumen</a>
                  <a className="menu-pill" href="#comparacion-turnos">Comparación de turnos</a>
                  <a className="menu-pill" href="#datos-por-turno">Datos por turno</a>
                  <a className="menu-pill" href="#operadores-por-turno">Operadores</a>
                  <a className="menu-pill" href="#resumen-global">KPIs globales</a>
                  <span className="divider" aria-hidden="true"></span>
                  <button className="menu-pill btn btn-sm btn-outline-secondary" onClick={() => exportCsv(datos)}>
                    <i className="fas fa-file-export me-1"></i> Exportar
                  </button>
                  <div className="meta">
                    <span><i className="fas fa-industry me-1"></i>{datos.meta.maquina}</span>
                    {datos.meta.of && <span><i className="fas fa-clipboard-list me-1"></i>{datos.meta.of}</span>}
                    <span><i className="fas fa-clock me-1"></i>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Filtros Section */}
            <div className="mb-4">
              <FiltrosInformes
                filtros={filtros}
                maquinas={maquinas}
                ofs={ofs}
                onChange={setFiltros}
                onBuscar={buscarDados}
                onExport={() => exportCsv(datos)}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="alert alert-danger d-flex align-items-center mb-4"
                role="alert"
              >
                <i className="fas fa-exclamation-triangle me-2"></i>
                <div>
                  <strong>Error:</strong> {error}
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="row">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            )}

            {/* Data Display */}
            {datos && !loading && (
              <>
                {/* Meta Information */}
                <div className="row mb-4" id="datos-por-turno">
                  <div className="col-12">
                    <div className="card radius-15">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h5 className="mb-0">
                            <i className="fas fa-info-circle me-2"></i>
                            Información del Análisis
                          </h5>
                          <span
                            className={`badge bg-${datos.meta.fuente_planificado === "fase" ? "success" : datos.meta.fuente_planificado === "of" ? "primary" : "secondary"}`}
                          >
                            {datos.meta.fuente_planificado.toUpperCase()}
                          </span>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-3">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-industry text-primary me-2"></i>
                              <div>
                                <small className="text-muted d-block">
                                  Máquina
                                </small>
                                <strong>{datos.meta.maquina}</strong>
                              </div>
                            </div>
                          </div>
                          {datos.meta.of && (
                            <div className="col-md-3">
                              <div className="d-flex align-items-center">
                                <i className="fas fa-clipboard-list text-info me-2"></i>
                                <div>
                                  <small className="text-muted d-block">
                                    Orden de Fabricación
                                  </small>
                                  <strong>{datos.meta.of}</strong>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="col-md-3">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-calendar-alt text-warning me-2"></i>
                              <div>
                                <small className="text-muted d-block">
                                  Período
                                </small>
                                <strong>
                                  {new Date(
                                    datos.meta.periodo.inicio,
                                  ).toLocaleDateString("es-ES")}{" "}
                                  -
                                  {new Date(
                                    datos.meta.periodo.fim,
                                  ).toLocaleDateString("es-ES")}
                                </strong>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-globe text-success me-2"></i>
                              <div>
                                <small className="text-muted d-block">
                                  Zona Horaria
                                </small>
                                <strong>{datos.meta.timezone}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumen Consolidado */}
                <div className="row mb-3" role="region" aria-labelledby="resumen-consolidado" id="resumen-consolidado">
                  <div className="col-12">
                    <h5 id="resumen-consolidado" className="mb-2">Resumen Consolidado</h5>
                  </div>
                  {(() => {
                    const totalProd = datos.turnos.reduce((a, t) => a + (t.tiempos.prod_s || 0), 0);
                    const totalPrep = datos.turnos.reduce((a, t) => a + (t.tiempos.prep_s || 0), 0);
                    const totalParo = datos.turnos.reduce((a, t) => a + (t.tiempos.paro_pp_s + t.tiempos.paro_pnp_s + t.tiempos.paro_calidad_s), 0);
                    const total = totalProd + totalPrep + totalParo;
                    const toHHMM = (s: number) => {
                      const h = Math.floor(s / 3600).toString().padStart(2, '0');
                      const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
                      return `${h}:${m}`;
                    };
                    return (
                      <>
                        <div className="col-12 col-md-6 col-lg-3">
                          <div className="card radius-15">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">Tiempo Total</h6>
                                  <h4 className="mb-0">{toHHMM(total)}</h4>
                                </div>
                                <div className="icon-circle bg-light">
                                  <i className="fas fa-clock"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                          <div className="card radius-15">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">Tiempo Productivo</h6>
                                  <h4 className="mb-0">{toHHMM(totalProd)}</h4>
                                </div>
                                <div className="icon-circle bg-light-success text-success">
                                  <i className="fas fa-play"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                          <div className="card radius-15">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">Tiempo de Paros</h6>
                                  <h4 className="mb-0">{toHHMM(totalParo)}</h4>
                                </div>
                                <div className="icon-circle bg-light-danger text-danger">
                                  <i className="fas fa-hand-paper"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                          <div className="card radius-15">
                            <div className="card-body">
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">Eficiencia Media</h6>
                                  <h4 className="mb-0">{datos.totais.periodo_oee.toFixed(1)}%</h4>
                                </div>
                                <div className="icon-circle bg-light-info text-info">
                                  <i className="fas fa-percentage"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Summary Cards */}
                <div className="row mb-4">
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card radius-15 bg-gradient-primary text-white">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h6 className="mb-0 text-white">Planificado</h6>
                            <h4 className="mb-0 text-white">
                              {datos.resumen.planificado.toLocaleString()}
                            </h4>
                            <small className="text-white-75">piezas</small>
                          </div>
                          <div className="icon-circle bg-white bg-opacity-25">
                            <i className="fas fa-target text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card radius-15 bg-gradient-success text-white">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h6 className="mb-0 text-white">Producido</h6>
                            <h4 className="mb-0 text-white">
                              {datos.resumen.unidades_total.toLocaleString()}
                            </h4>
                            <small className="text-white-75">
                              OK: {datos.resumen.unidades_ok.toLocaleString()} |
                              NOK: {datos.resumen.unidades_nok.toLocaleString()}
                            </small>
                          </div>
                          <div className="icon-circle bg-white bg-opacity-25">
                            <i className="fas fa-chart-bar text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card radius-15 bg-gradient-info text-white">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h6 className="mb-0 text-white">OEE General</h6>
                            <h4 className="mb-0 text-white">
                              {datos.resumen.oee_of.toFixed(1)}%
                            </h4>
                            <small className="text-white-75">OF completa</small>
                          </div>
                          <div className="icon-circle bg-white bg-opacity-25">
                            <i className="fas fa-percentage text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card radius-15 bg-gradient-warning text-white">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <h6 className="mb-0 text-white">Velocidad</h6>
                            <h4 className="mb-0 text-white">
                              {datos.resumen.velocidad_uh.toFixed(1)}
                            </h4>
                            <small className="text-white-75">
                              u/h promedio
                            </small>
                          </div>
                          <div className="icon-circle bg-white bg-opacity-25">
                            <i className="fas fa-tachometer-alt text-white"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Turnos Grid - Three Column Layout */}
                <div className="row mb-4">
                  {["MAÑANA", "TARDE", "NOCHE"].map((turno_nome) => {
                    const turno = datos.turnos.find(
                      (t) => t.turno === turno_nome,
                    );
                    return (
                      <TurnoCard
                        key={turno_nome}
                        turno={turno_nome as "MAÑANA" | "TARDE" | "NOCHE"}
                        dados={turno}
                        planificado={datos.resumen.planificado}
                        thresholds={{
                          verde: datos.meta.objetivo_verde,
                          amarillo: datos.meta.objetivo_amarillo,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Global KPIs Summary */}
                {/* Comparación entre Turnos */}
                <div className="row mb-4" role="region" aria-labelledby="comparacion-turnos" id="comparacion-turnos">
                  <div className="col-12">
                    <h5 id="comparacion-turnos" className="mb-2">Comparación entre Turnos</h5>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card radius-15 h-100">
                      <div className="card-header border-bottom-0"><strong>OEE por Turno (%)</strong></div>
                      <div className="card-body">
                        <OEEByShift data={datos.turnos.map(t => ({ turno: t.turno, oee: t.kpis.oee }))} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card radius-15 h-100">
                      <div className="card-header border-bottom-0"><strong>Tiempos por Turno (Prep/Prod/Paro)</strong></div>
                      <div className="card-body">
                        <TimesByShiftStack data={datos.turnos.map(t => ({ turno: t.turno, prep_s: t.tiempos.prep_s, prod_s: t.tiempos.prod_s, paro_s: t.tiempos.paro_pp_s + t.tiempos.paro_pnp_s + t.tiempos.paro_calidad_s }))} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card radius-15 h-100">
                      <div className="card-header border-bottom-0"><strong>Producción por Turno (OK/NOK/RWK)</strong></div>
                      <div className="card-body">
                        <ProductionByShiftGrouped data={datos.turnos.map(t => ({ turno: t.turno, ok: t.unidades.ok, nok: t.unidades.nok, rwk: t.unidades.rw }))} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Línea: Velocidad y Seg/Pieza por Turno */}
                <div className="row mb-4" role="region" aria-labelledby="linea-velocidad">
                  <div className="col-12">
                    <div className="card radius-15 h-100">
                      <div className="card-header border-bottom-0"><strong id="linea-velocidad">Velocidad y Seg/Pieza por Turno (líneas)</strong></div>
                      <div className="card-body">
                        <SpeedLineByShift data={datos.turnos.map(t => ({ turno: t.turno, uxh: t.kpis.velocidad_uh, segxpza: t.kpis.seg_por_pza }))} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row" id="resumen-global">
                  <div className="col-12">
                    <div className="card radius-15">
                      <div className="card-header border-bottom-0">
                        <h5 className="mb-0">
                          <i className="fas fa-chart-pie me-2"></i>
                          Resumen Global del Período
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row g-4">
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="OEE Promedio"
                              value={datos.totais.periodo_oee}
                              format="percent"
                              thresholds={{
                                verde: datos.meta.objetivo_verde,
                                amarillo: datos.meta.objetivo_amarillo,
                              }}
                              size="medium"
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="Velocidad Media"
                              value={datos.totais.periodo_vel_uh}
                              format="units-per-hour"
                              size="medium"
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="Disponibilidad"
                              value={datos.resumen.disponibilidad_of}
                              format="percent"
                              thresholds={{
                                verde: datos.meta.objetivo_verde,
                                amarillo: datos.meta.objetivo_amarillo,
                              }}
                              size="medium"
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="Rendimiento"
                              value={datos.resumen.rendimiento_of}
                              format="percent"
                              thresholds={{
                                verde: datos.meta.objetivo_verde,
                                amarillo: datos.meta.objetivo_amarillo,
                              }}
                              size="medium"
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="Calidad"
                              value={datos.resumen.calidad_of}
                              format="percent"
                              thresholds={{
                                verde: datos.meta.objetivo_verde,
                                amarillo: datos.meta.objetivo_amarillo,
                              }}
                              size="medium"
                            />
                          </div>
                          <div className="col-12 col-md-6 col-lg-2">
                            <KPIValue
                              label="Seg/Pieza"
                              value={datos.resumen.velocidad_seg_por_pza}
                              format="decimal"
                              size="medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Placeholder Message */}
            {!datos && !loading && !error && (
              <div className="text-center py-5">
                <div className="card radius-15">
                  <div className="card-body py-5">
                    <i
                      className="fas fa-chart-line text-muted mb-3"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="text-muted mb-3">Listo para Analizar</h5>
                    <p className="text-muted">
                      Seleccione los filtros y haga clic en "Buscar Datos" para
                      generar los informes de producción.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
