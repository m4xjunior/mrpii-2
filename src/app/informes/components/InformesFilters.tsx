"use client";

import { useMemo } from "react";

export type AgruparPor = "of_fase_maquina" | "of" | "maquina" | "dia";

export type FiltrosState = {
  desde: string;
  hasta: string;
  maquinas: number[];
  of: string;
  agruparPor: AgruparPor;
};

type Maquina = {
  Id_maquina: number;
  Cod_maquina: string;
  Desc_maquina: string;
};

type InformesFiltersProps = {
  filtros: FiltrosState;
  maquinas: Maquina[];
  onChange: (partial: Partial<FiltrosState>) => void;
  onSubmit: () => void;
  onReset: () => void;
  loading: boolean;
  ofSuggestions: string[];
  onOfInputChange: (value: string) => void;
};

export function InformesFilters({
  filtros,
  maquinas,
  onChange,
  onSubmit,
  onReset,
  loading,
  ofSuggestions,
  onOfInputChange
}: InformesFiltersProps) {
  const maquinasSeleccionadas = useMemo(() => new Set(filtros.maquinas), [filtros.maquinas]);

  return (
    <section className="tarjeta filtros">
      <h2 className="seccion-titulo">Filtros</h2>
      <div className="filtros-grid">
        <div className="filtro-item">
          <label className="form-label" htmlFor="fecha-desde">
            Fecha desde (día productivo)
          </label>
          <input
            id="fecha-desde"
            type="date"
            className="form-control"
            value={filtros.desde}
            onChange={(event) => onChange({ desde: event.target.value })}
          />
        </div>
        <div className="filtro-item">
          <label className="form-label" htmlFor="fecha-hasta">
            Fecha hasta (día productivo)
          </label>
          <input
            id="fecha-hasta"
            type="date"
            className="form-control"
            value={filtros.hasta}
            onChange={(event) => onChange({ hasta: event.target.value })}
          />
        </div>
        <div className="filtro-item">
          <label className="form-label" htmlFor="maquinas-select">
            Máquina (selección múltiple)
          </label>
          <select
            id="maquinas-select"
            multiple
            className="form-select"
            value={filtros.maquinas.map(String)}
            onChange={(event) => {
              const selected = Array.from(event.target.selectedOptions).map((option) => Number(option.value));
              onChange({ maquinas: selected });
            }}
          >
            {maquinas.map((maquina) => (
              <option key={maquina.Id_maquina} value={maquina.Id_maquina}>
                {maquina.Cod_maquina} · {maquina.Desc_maquina}
              </option>
            ))}
          </select>
          {maquinasSeleccionadas.size === 0 ? (
            <span className="ayuda">Si no seleccionas ninguna máquina se incluirán todas.</span>
          ) : (
            <span className="ayuda">{maquinasSeleccionadas.size} máquina(s) seleccionada(s).</span>
          )}
        </div>
        <div className="filtro-item">
          <label className="form-label" htmlFor="of-input">
            Nº de OF
          </label>
          <input
            id="of-input"
            type="text"
            className="form-control"
            placeholder="Introduce un código de OF"
            value={filtros.of}
            onChange={(event) => {
              const value = event.target.value.toUpperCase();
              onChange({ of: value });
              onOfInputChange(value);
            }}
            list="of-suggestions"
          />
          <datalist id="of-suggestions">
            {ofSuggestions.map((sugerencia) => (
              <option key={sugerencia} value={sugerencia} />
            ))}
          </datalist>
        </div>
        <div className="filtro-item">
          <label className="form-label" htmlFor="agrupar-select">
            Agrupar por
          </label>
          <select
            id="agrupar-select"
            className="form-select"
            value={filtros.agruparPor}
            onChange={(event) => onChange({ agruparPor: event.target.value as AgruparPor })}
          >
            <option value="of_fase_maquina">OF × Fase × Máquina</option>
            <option value="of">OF</option>
            <option value="maquina">Máquina</option>
            <option value="dia">Día productivo (próximamente)</option>
          </select>
        </div>
      </div>
      <div className="filtros-acciones">
        <button type="button" className="btn btn-secondary" onClick={onReset} disabled={loading}>
          Limpiar
        </button>
        <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={loading}>
          {loading ? "Aplicando filtros..." : "Aplicar filtros"}
        </button>
      </div>
    </section>
  );
}
