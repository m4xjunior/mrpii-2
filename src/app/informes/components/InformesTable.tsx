"use client";

import { useMemo, useState } from "react";

export type InformeRow = {
  maquinaId: number;
  maquina: string;
  codMaquina: string;
  numOF: string;
  productoRef: string | null;
  piezaInterna: string | null;
  fechaIniOF: string | null;
  fechaFinOF: string | null;
  segPorPieza: number | null;
  pzasHora: number | null;
  oee: number | null;
  disp: number | null;
  rend: number | null;
  cal: number | null;
  planificadas: number;
  ok: number;
  nok: number;
  rwk: number;
  planAttainment: number | null;
  horasPrep: number | null;
  horasProd: number | null;
  horasParo: number | null;
};

type SortKey = keyof Pick<InformeRow, "maquina" | "numOF" | "pzasHora" | "segPorPieza" | "ok" | "nok" | "rwk" | "planificadas">;

type InformesTableProps = {
  data: InformeRow[];
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onExport: () => void;
};

function formatNumber(value: number | null, decimals = 2) {
  if (value === null || Number.isNaN(value)) return "--";
  return value.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function formatDate(value: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("es-ES");
}

export function InformesTable({ data, loading, page, pageSize, total, onPageChange, onPageSizeChange, onExport }: InformesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("maquina");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (valueA === null || valueA === undefined) return 1;
      if (valueB === null || valueB === undefined) return -1;
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      const stringA = String(valueA).toLocaleLowerCase();
      const stringB = String(valueB).toLocaleLowerCase();
      if (stringA < stringB) return sortOrder === "asc" ? -1 : 1;
      if (stringA > stringB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortOrder]);

  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <section className="tarjeta tabla">
      <div className="tabla-cabecera">
        <h2 className="seccion-titulo">Datos generales por OF × Fase × Máquina</h2>
        <button type="button" className="btn btn-outline" onClick={onExport} disabled={loading || data.length === 0}>
          Exportar CSV
        </button>
      </div>
      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={() => toggleSort("maquina")}>
                Máquina
              </th>
              <th className="sortable" onClick={() => toggleSort("numOF")}>
                Nº de OF
              </th>
              <th>Referencia producto</th>
              <th>Nombre interno pieza</th>
              <th>Fecha inicio OF</th>
              <th>Fecha fin OF</th>
              <th className="sortable" onClick={() => toggleSort("segPorPieza")}>
                Segundos/pieza
              </th>
              <th className="sortable" onClick={() => toggleSort("pzasHora")}>
                Piezas/hora
              </th>
              <th>OEE</th>
              <th>Disp.</th>
              <th>Redt.</th>
              <th>Cal.</th>
              <th className="sortable" onClick={() => toggleSort("planificadas")}>
                Piezas planificadas
              </th>
              <th className="sortable" onClick={() => toggleSort("ok")}>
                OK
              </th>
              <th className="sortable" onClick={() => toggleSort("nok")}>
                NOK
              </th>
              <th className="sortable" onClick={() => toggleSort("rwk")}>
                RWK
              </th>
              <th>Plan Attainment</th>
              <th>Horas preparación</th>
              <th>Horas producción</th>
              <th>Horas paros</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={20} className="tabla-loading">
                  Cargando datos...
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={20} className="tabla-vacio">
                  Sin resultados para los filtros aplicados.
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr key={`${row.maquinaId}-${row.numOF}-${index}`}>
                  <td>{row.maquina || "--"}</td>
                  <td>{row.numOF || "--"}</td>
                  <td>{row.productoRef || "--"}</td>
                  <td>{row.piezaInterna || "--"}</td>
                  <td>{formatDate(row.fechaIniOF)}</td>
                  <td>{formatDate(row.fechaFinOF)}</td>
                  <td>{formatNumber(row.segPorPieza)}</td>
                  <td>{formatNumber(row.pzasHora)}</td>
                  <td>{formatNumber(row.oee !== null ? row.oee * 100 : null)}</td>
                  <td>{formatNumber(row.disp !== null ? row.disp * 100 : null)}</td>
                  <td>{formatNumber(row.rend !== null ? row.rend * 100 : null)}</td>
                  <td>{formatNumber(row.cal !== null ? row.cal * 100 : null)}</td>
                  <td>{row.planificadas.toLocaleString("es-ES")}</td>
                  <td>{row.ok.toLocaleString("es-ES")}</td>
                  <td>{row.nok.toLocaleString("es-ES")}</td>
                  <td>{row.rwk.toLocaleString("es-ES")}</td>
                  <td>{formatNumber(row.planAttainment !== null ? row.planAttainment * 100 : null)}</td>
                  <td>{formatNumber(row.horasPrep, 2)}</td>
                  <td>{formatNumber(row.horasProd, 2)}</td>
                  <td>{formatNumber(row.horasParo, 2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="tabla-paginacion">
        <div className="pagina-info">
          Página {page} de {totalPages}
        </div>
        <div className="pagina-controles">
          <button type="button" className="btn btn-outline" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1 || loading}>
            Anterior
          </button>
          <button type="button" className="btn btn-outline" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages || loading}>
            Siguiente
          </button>
        </div>
        <div className="pagina-tamano">
          <label htmlFor="page-size" className="form-label">
            Filas por página
          </label>
          <select
            id="page-size"
            className="form-select"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            disabled={loading}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
