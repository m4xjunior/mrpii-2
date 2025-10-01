"use client";

import { useEffect, useMemo, useState } from "react";
import "./informes.css";
import { InformesFilters, FiltrosState } from "./components/InformesFilters";
import { InformesKpis } from "./components/InformesKpis";
import { InformesTable, InformeRow } from "./components/InformesTable";
import { InformesTurnos, TurnoRow } from "./components/InformesTurnos";

type Summary = {
  oee: number | null;
  disp: number | null;
  rend: number | null;
  cal: number | null;
  planAttainment: number | null;
  pzasHora: number | null;
  segPorPza: number | null;
  ok: number;
  nok: number;
  rwk: number;
};

type ApiResponse = {
  summary: Summary;
  generales: InformeRow[];
  turnos: TurnoRow[];
  pagination: { page: number; pageSize: number; total: number };
};

type Maquina = {
  Id_maquina: number;
  Cod_maquina: string;
  Desc_maquina: string;
};

const crearFiltrosIniciales = (): FiltrosState => ({
  desde: "",
  hasta: "",
  maquinas: [],
  of: "",
  agruparPor: "of_fase_maquina"
});

const resumenVacio: Summary = {
  oee: null,
  disp: null,
  rend: null,
  cal: null,
  planAttainment: null,
  pzasHora: null,
  segPorPza: null,
  ok: 0,
  nok: 0,
  rwk: 0
};

export default function InformesPage() {
  const [filtros, setFiltros] = useState<FiltrosState>(crearFiltrosIniciales);
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosState>(crearFiltrosIniciales);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [resumen, setResumen] = useState<Summary>(resumenVacio);
  const [generales, setGenerales] = useState<InformeRow[]>([]);
  const [turnos, setTurnos] = useState<TurnoRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 });
  const [ofQuery, setOfQuery] = useState("");
  const [ofSuggestions, setOfSuggestions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMaquinas() {
      try {
        const response = await fetch("/api/maquinas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de máquinas");
        }
        const data = (await response.json()) as Maquina[];
        setMaquinas(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMaquinas();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      const query = ofQuery.trim();
      if (query.length < 2) {
        setOfSuggestions([]);
        return;
      }
      try {
        const params = new URLSearchParams({ query });
        if (filtros.maquinas.length > 0) {
          params.set("maquinaId", filtros.maquinas.join(","));
        }
        if (filtros.desde) params.set("desde", filtros.desde);
        if (filtros.hasta) params.set("hasta", filtros.hasta);
        const response = await fetch(`/api/informes/of-suggest?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error("Error al obtener sugerencias");
        }
        const data = (await response.json()) as string[];
        setOfSuggestions(data);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error(err);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [ofQuery, filtros.maquinas, filtros.desde, filtros.hasta]);

  useEffect(() => {
    async function fetchInformes() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set("page", pagination.page.toString());
        params.set("pageSize", pagination.pageSize.toString());
        params.set("agruparPor", filtrosAplicados.agruparPor);
        if (filtrosAplicados.desde) params.set("desde", filtrosAplicados.desde);
        if (filtrosAplicados.hasta) params.set("hasta", filtrosAplicados.hasta);
        if (filtrosAplicados.maquinas.length > 0) {
          params.set("maquinaId", filtrosAplicados.maquinas.join(","));
        }
        if (filtrosAplicados.of) params.set("of", filtrosAplicados.of);

        const response = await fetch(`/api/informes?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Error al procesar la solicitud");
        }
        const data = (await response.json()) as ApiResponse;
        setResumen(data.summary ?? resumenVacio);
        setGenerales(data.generales ?? []);
        setTurnos(data.turnos ?? []);
        setPagination((prev) => ({ ...prev, total: data.pagination?.total ?? 0 }));
      } catch (err) {
        console.error(err);
        setError("Error al procesar la solicitud");
        setResumen(resumenVacio);
        setGenerales([]);
        setTurnos([]);
        setPagination((prev) => ({ ...prev, total: 0 }));
      } finally {
        setLoading(false);
      }
    }

    fetchInformes();
  }, [filtrosAplicados, pagination.page, pagination.pageSize]);

  const onChangeFiltros = (partial: Partial<FiltrosState>) => {
    setFiltros((prev) => ({ ...prev, ...partial }));
  };

  const onSubmitFiltros = () => {
    setFiltrosAplicados({ ...filtros, maquinas: [...filtros.maquinas] });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onResetFiltros = () => {
    const inicial = crearFiltrosIniciales();
    setFiltros(inicial);
    setFiltrosAplicados(inicial);
    setPagination({ page: 1, pageSize: 20, total: 0 });
    setOfQuery("");
    setOfSuggestions([]);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination({ page: 1, pageSize: size, total: pagination.total });
  };

  const exportCsv = () => {
    if (generales.length === 0) {
      return;
    }
    const encabezados = [
      "Máquina",
      "Nº de OF",
      "Referencia producto",
      "Nombre interno pieza",
      "Fecha inicio OF",
      "Fecha fin OF",
      "Segundos/pieza",
      "Piezas/hora",
      "OEE",
      "Disp.",
      "Redt.",
      "Cal.",
      "Piezas planificadas",
      "OK",
      "NOK",
      "RWK",
      "Plan Attainment",
      "Horas preparación",
      "Horas producción",
      "Horas paros"
    ];

    const filas = generales.map((row) => [
      row.maquina,
      row.numOF,
      row.productoRef ?? "",
      row.piezaInterna ?? "",
      row.fechaIniOF ?? "",
      row.fechaFinOF ?? "",
      row.segPorPieza ?? "",
      row.pzasHora ?? "",
      row.oee ?? "",
      row.disp ?? "",
      row.rend ?? "",
      row.cal ?? "",
      row.planificadas,
      row.ok,
      row.nok,
      row.rwk,
      row.planAttainment ?? "",
      row.horasPrep ?? "",
      row.horasProd ?? "",
      row.horasParo ?? ""
    ]);

    const csvContenido = [encabezados, ...filas]
      .map((fila) => fila.map((valor) => `"${String(valor ?? "").replace(/"/g, '""')}"`).join(";"))
      .join("\n");

    const blob = new Blob([csvContenido], { type: "text/csv;charset=utf-8;" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "informes_generales.csv";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  };

  const estadoMensaje = useMemo(() => {
    if (error) return "Error al procesar la solicitud";
    if (!loading && generales.length === 0) return "Sin resultados para los filtros aplicados.";
    return null;
  }, [error, loading, generales.length]);

  return (
    <main className="informes-pagina">
      <header className="encabezado">
        <h1>Informes de producción</h1>
        <p>Consulta consolidada por OF, fase, máquina y turnos del período seleccionado.</p>
      </header>

      <InformesFilters
        filtros={filtros}
        maquinas={maquinas}
        onChange={onChangeFiltros}
        onSubmit={onSubmitFiltros}
        onReset={onResetFiltros}
        loading={loading}
        ofSuggestions={ofSuggestions}
        onOfInputChange={setOfQuery}
      />

      {estadoMensaje && <div className={error ? "banner-error" : "banner-info"}>{estadoMensaje}</div>}

      <InformesKpis resumen={resumen} />

      <InformesTable
        data={generales}
        loading={loading}
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onExport={exportCsv}
      />

      <InformesTurnos data={turnos} loading={loading} filtroOF={filtrosAplicados.of || undefined} />
    </main>
  );
}
