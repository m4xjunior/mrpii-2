"use client";

type NumberOrNull = number | null;

type Resumen = {
  oee: NumberOrNull;
  disp: NumberOrNull;
  rend: NumberOrNull;
  cal: NumberOrNull;
  planAttainment: NumberOrNull;
  pzasHora: NumberOrNull;
  segPorPza: NumberOrNull;
  ok: number;
  nok: number;
  rwk: number;
};

function formatPercent(value: NumberOrNull) {
  if (value === null || Number.isNaN(value)) return "--";
  return `${(value * 100).toFixed(1)} %`;
}

function formatDecimal(value: NumberOrNull, decimals = 2) {
  if (value === null || Number.isNaN(value)) return "--";
  return value.toFixed(decimals).replace(".", ",");
}

function formatInteger(value: number) {
  return value.toLocaleString("es-ES");
}

type InformesKpisProps = {
  resumen: Resumen;
};

export function InformesKpis({ resumen }: InformesKpisProps) {
  return (
    <section className="tarjeta kpis">
      <h2 className="seccion-titulo">Indicadores del período</h2>
      <div className="kpi-grid">
        <article className="kpi-item">
          <span className="kpi-label">OEE</span>
          <strong className="kpi-valor">{formatPercent(resumen.oee)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Disponibilidad</span>
          <strong className="kpi-valor">{formatPercent(resumen.disp)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Rendimiento</span>
          <strong className="kpi-valor">{formatPercent(resumen.rend)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Calidad</span>
          <strong className="kpi-valor">{formatPercent(resumen.cal)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Plan Attainment</span>
          <strong className="kpi-valor">{formatPercent(resumen.planAttainment)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Piezas/hora</span>
          <strong className="kpi-valor">{formatDecimal(resumen.pzasHora)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">Segundos/pieza</span>
          <strong className="kpi-valor">{formatDecimal(resumen.segPorPza)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">OK</span>
          <strong className="kpi-valor">{formatInteger(resumen.ok)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">NOK</span>
          <strong className="kpi-valor">{formatInteger(resumen.nok)}</strong>
        </article>
        <article className="kpi-item">
          <span className="kpi-label">RWK</span>
          <strong className="kpi-valor">{formatInteger(resumen.rwk)}</strong>
        </article>
      </div>
    </section>
  );
}
