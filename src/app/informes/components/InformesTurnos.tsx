"use client";

export type TurnoRow = {
  diaProductivo: string;
  idTurno: number;
  turno?: string;
  maquinaId: number;
  numOF?: string;
  operarios: string[];
  numOperarios: number;
  oee: number | null;
  disp: number | null;
  rend: number | null;
  cal: number | null;
  ok: number;
  nok: number;
  rwk: number;
  horasPreparacion: number | null;
  horasProduccion: number | null;
  horasParos: number | null;
};

type InformesTurnosProps = {
  data: TurnoRow[];
  loading: boolean;
  filtroOF?: string;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("es-ES");
}

function formatNumber(value: number | null, decimals = 2) {
  if (value === null || Number.isNaN(value)) return "--";
  return value.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) return "--";
  return `${(value * 100).toFixed(1)} %`;
}

export function InformesTurnos({ data, loading, filtroOF }: InformesTurnosProps) {
  const agrupado = new Map<string, TurnoRow[]>();

  if (!loading) {
    data.forEach((row) => {
      const clave = filtroOF ? row.numOF || "--" : row.diaProductivo;
      if (!agrupado.has(clave)) {
        agrupado.set(clave, []);
      }
      agrupado.get(clave)!.push(row);
    });
  }

  const grupos = Array.from(agrupado.entries()).sort(([a], [b]) => (a < b ? -1 : 1));

  return (
    <section className="tarjeta turnos">
      <h2 className="seccion-titulo">Datos de Turnos (1–4)</h2>
      {loading ? (
        <p className="texto-estado">Cargando turnos...</p>
      ) : grupos.length === 0 ? (
        <p className="texto-estado">Sin resultados para los filtros aplicados.</p>
      ) : (
        <div className="turnos-accordion">
          {grupos.map(([clave, filas]) => (
            <details key={clave} className="turno-grupo" open>
              <summary>
                {filtroOF ? `OF ${clave}` : `Día ${formatDate(clave)}`}
              </summary>
              <div className="turno-tabla">
                <table>
                  <thead>
                    <tr>
                      <th>Turno</th>
                      <th>Operarios (nº)</th>
                      <th>OEE</th>
                      <th>Disp.</th>
                      <th>Redt.</th>
                      <th>Cal.</th>
                      <th>OK</th>
                      <th>NOK</th>
                      <th>RWK</th>
                      <th>Horas preparación</th>
                      <th>Horas producción</th>
                      <th>Horas paros</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filas
                      .sort((a, b) => a.idTurno - b.idTurno)
                      .map((fila, indice) => (
                        <tr key={`${fila.diaProductivo}-${fila.idTurno}-${indice}`}>
                          <td>{fila.turno || `Turno ${fila.idTurno}`}</td>
                          <td>
                            <div className="operarios-lista">
                              <span className="badge">{fila.numOperarios}</span>
                              <span>{fila.operarios.length > 0 ? fila.operarios.join(", ") : "Sin datos"}</span>
                            </div>
                          </td>
                          <td>{formatPercent(fila.oee)}</td>
                          <td>{formatPercent(fila.disp)}</td>
                          <td>{formatPercent(fila.rend)}</td>
                          <td>{formatPercent(fila.cal)}</td>
                          <td>{fila.ok.toLocaleString("es-ES")}</td>
                          <td>{fila.nok.toLocaleString("es-ES")}</td>
                          <td>{fila.rwk.toLocaleString("es-ES")}</td>
                          <td>{formatNumber(fila.horasPreparacion)}</td>
                          <td>{formatNumber(fila.horasProduccion)}</td>
                          <td>{formatNumber(fila.horasParos)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
