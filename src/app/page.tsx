"use client";

import { useEffect, useState, forwardRef, useCallback, useImperativeHandle, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MachineStatus } from "../../types/machine";
import MachineDetailModal from "../../components/MachineDetailModal";
import ModernSidebar from "../../components/ModernSidebar";
import CountUp from "../../components/CountUp";
import "./factory-floor.css";

// Componente RotatingText do ReactBits
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

// Componente de configuração do título
interface TitleConfig {
  sistema: string;
  scada: string[];
}

const defaultConfig: TitleConfig = {
  sistema: 'Sistema',
  scada: ['SCADA', 'KH', '2024']
};

interface RotatingTextProps {
  texts: string[];
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: 'wait' | 'sync' | 'popLayout';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: 'characters' | 'words' | 'lines' | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  [key: string]: any;
}

const RotatingText = forwardRef<any, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Garante que o índice não fique fora dos limites se a lista de textos diminuir
  useEffect(() => {
    if (texts && currentTextIndex >= texts.length) {
      setCurrentTextIndex(0);
    }
  }, [texts, currentTextIndex]);

  // Validação para evitar crash se a lista de textos estiver vazia ou for inválida
  if (!texts || texts.length === 0) {
    return null; // Não renderiza nada se não houver textos
  }

  const splitIntoCharacters = (text: string) => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), segment => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    
    // Validação adicional para garantir que currentText não seja undefined
    if (!currentText) {
      return [];
    }

    if (splitBy === 'characters') {
      const words: string[] = currentText.split(' ');
      return words.map((word: string, i: number) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1
      }));
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word: string, i: number, arr: string[]) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1
      }));
    }
    if (splitBy === 'lines') {
      return currentText.split('\n').map((line: string, i: number, arr: string[]) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1
      }));
    }

    return currentText.split(splitBy).map((part: string, i: number, arr: string[]) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars;
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs((staggerFrom as number) - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName)} {...rest} layout transition={transition}>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.span
          key={currentTextIndex}
          className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj: any, wordIndex: number, array: any[]) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum: number, word: any) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn('text-rotate-word', splitLevelClassName)}>
                {wordObj.characters.map((char: string, charIndex: number) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum: number, word: any) => sum + word.characters.length, 0)
                      )
                    }}
                    className={cn('text-rotate-element', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';

// Custom hook para manejar el tema
function useThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    console.log("🎨 useThemeSwitcher: Inicializando...");

    // Cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem("scada-theme") || "light";
    setCurrentTheme(savedTheme);

    // Event listener para cambios de tema desde el script global
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail.theme;
      setCurrentTheme(newTheme);
      console.log("🔄 useThemeSwitcher: Tema cambiado a:", newTheme);
    };

    document.addEventListener("themeChange" as any, handleThemeChange);

    return () => {
      document.removeEventListener("themeChange" as any, handleThemeChange);
    };
  }, []);

  return { currentTheme };
}

export default function Dashboard() {
  const [machines, setMachines] = useState<MachineStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [selectedMachine, setSelectedMachine] = useState<MachineStatus | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  // Usar el hook del theme switcher
  const { currentTheme } = useThemeSwitcher();

  // Estado para controlar o layout da sidebar
  const [sidebarToggled, setSidebarToggled] = useState(false);

  // Estado para controlar a configuração do título
  const [titleConfig, setTitleConfig] = useState<TitleConfig>(defaultConfig);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [tempConfig, setTempConfig] = useState<TitleConfig>(defaultConfig);

  // Carrega a configuração do localStorage ao iniciar o componente
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('titleConfig');
      if (savedConfig) {
        const parsedConfig: TitleConfig = JSON.parse(savedConfig);
        if (parsedConfig && typeof parsedConfig.sistema === 'string' && Array.isArray(parsedConfig.scada)) {
          setTitleConfig(parsedConfig);
        }
      }
    } catch (error) {
      console.error("Falha ao carregar configuração do título do localStorage:", error);
    }
  }, []);

  // Funções para gerenciar configuração do título
  const openConfigDialog = () => {
    setTempConfig(titleConfig);
    setShowConfigDialog(true);
  };

  const closeConfigDialog = () => {
    setShowConfigDialog(false);
  };

  const saveConfig = () => {
    setTitleConfig(tempConfig);
    try {
      localStorage.setItem('titleConfig', JSON.stringify(tempConfig));
    } catch (error) {
      console.error("Falha ao salvar configuração do título no localStorage:", error);
    }
    setShowConfigDialog(false);
  };

  const resetConfig = () => {
    setTempConfig(defaultConfig);
  };

  const addScadaText = () => {
    if (tempConfig.scada.length < 5) {
      setTempConfig({
        ...tempConfig,
        scada: [...tempConfig.scada, '']
      });
    }
  };

  const updateScadaText = (index: number, value: string) => {
    const newScada = [...tempConfig.scada];
    newScada[index] = value;
    setTempConfig({
      ...tempConfig,
      scada: newScada
    });
  };

  const removeScadaText = (index: number) => {
    if (tempConfig.scada.length > 1) {
      const newScada = tempConfig.scada.filter((_, i) => i !== index);
      setTempConfig({
        ...tempConfig,
        scada: newScada
      });
    }
  };

  // Mostrar información del tema actual en consola
  useEffect(() => {
    console.log("🏠 Dashboard: Tema actual:", currentTheme);
    console.log(
      "💡 Theme Customizer: Haz clic en el botón ⚙️ en la esquina inferior derecha para cambiar el tema",
    );
  }, [currentTheme]);

  // Listener para eventos da sidebar
  useEffect(() => {
    const handleSidebarToggle = (event: any) => {
      setSidebarToggled(event.detail.isMinimized);
      console.log("📏 Sidebar toggle:", event.detail.isMinimized ? 'minimizada' : 'expandida');
    };

    document.addEventListener('sidebarToggle', handleSidebarToggle);
    return () => document.removeEventListener('sidebarToggle', handleSidebarToggle);
  }, []);

  const [monthly, setMonthly] = useState<{
    ok: number;
    nok: number;
    rw: number;
    total: number;
    eficiencia: number;
    perdidas_eur: number;
  } | null>(null);
  const [daily, setDaily] = useState<{
    ok: number;
    nok: number;
    rw: number;
    total: number;
    eficiencia: number;
    perdidas_eur: number;
    fecha: string;
  } | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<"month" | "day" | "hour">(
    "day",
  ); // Por defecto mostrar día

  // Función para cargar datos del período seleccionado
  const loadPeriodData = async (period: "month" | "day" | "hour") => {
    try {
      let response;
      if (period === "month") {
        response = await fetch("/api/analytics/monthly");
      } else if (period === "day") {
        response = await fetch("/api/analytics/daily");
      } else {
        // Para hora, por ahora usar datos del día
        response = await fetch("/api/analytics/daily");
      }

      if (response && response.ok) {
        const data = await response.json();
        if (data.success) {
          if (period === "month") {
            setMonthly(data.data);
          } else {
            setDaily(data.data);
          }
          console.log(`📊 Datos cargados para período: ${period}`, data.data);
        }
      }
    } catch (error) {
      console.error(`❌ Error cargando datos para período ${period}:`, error);
    }
  };

  // Cargar datos iniciales del día
  useEffect(() => {
    loadPeriodData("day");
    loadPeriodData("month"); // También cargar datos mensuales
  }, []);

  // Manejar cambio de período
  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPeriod = event.target.id.replace("period", "").toLowerCase() as
      | "month"
      | "day"
      | "hour";
    setCurrentPeriod(newPeriod);
    loadPeriodData(newPeriod);
  };

  // Datos del período actual
  const currentData = currentPeriod === "month" ? monthly : daily;
  const alerts = machines
    .map((m) => {
      if (m.status === "PARADA") {
        return {
          type: "PARADA",
          machine: `${m.machine.desc_maquina} -${m.machine.Cod_maquina}`,
          code: m.machine.Cod_maquina,
          message: m.downtime || "Parada detectada",
          time: new Date().toLocaleTimeString("es-ES"),
        };
      }
      if ((m.production?.nok || 0) > 0) {
        return {
          type: "CALIDAD",
          machine: `${m.machine.desc_maquina} -${m.machine.Cod_maquina}`,
          code: m.machine.Cod_maquina,
          message: `Piezas NOK: ${m.production.nok}`,
          time: new Date().toLocaleTimeString("es-ES"),
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{
    type: string;
    machine: string;
    code: string;
    message: string;
    time: string;
  }>;

  const openMachineByCode = (code: string) => {
    const found = machines.find((m) => m.machine.Cod_maquina === code);
    if (found) {
      setSelectedMachine(found);
      setIsModalOpen(true);
    }
  };

  const fetchMachines = async () => {
    try {
      console.log("🔄 Buscando datos de las máquinas...");
      const response = await fetch("/api/scada/machines");
      const data = await response.json();

      if (data.success) {
        setMachines(data.data);
        setLastUpdate(new Date().toLocaleTimeString("es-ES"));
        setError(null);
        console.log(`✅ ${data.count} máquinas cargadas`);
      } else {
        setError(data.message || "Error al cargar datos");
        console.error("❌ Error en la API:", data.message);
      }
    } catch (err) {
      setError("Error de conexión");
      console.error("❌ Error de fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
    fetch("/api/analytics/monthly")
      .then((r) => r.json())
      .then((res) => {
        if (res?.success) setMonthly(res.data);
      })
      .catch(() => {});
    const interval = setInterval(() => {
      fetchMachines();
      fetch("/api/analytics/monthly")
        .then((r) => r.json())
        .then((res) => {
          if (res?.success) setMonthly(res.data);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMachineClick = (machine: MachineStatus) => {
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const getStatusIcon = (status: MachineStatus["status"]) => {
    switch (status) {
      case "PRODUCIENDO":
        return "fas fa-play-circle";
      case "ACTIVA":
        return "fas fa-power-off";
      case "PARADA":
        return "fas fa-pause-circle";
      case "MANTENIMIENTO":
        return "fas fa-tools";
      case "INACTIVA":
        return "fas fa-stop-circle";
      default:
        return "fas fa-question-circle";
    }
  };

  const getStatusText = (status: MachineStatus["status"]) => {
    switch (status) {
      case "PRODUCIENDO":
        return "PRODUCIENDO";
      case "ACTIVA":
        return "ACTIVA";
      case "PARADA":
        return "PARADA";
      case "MANTENIMIENTO":
        return "MANTENIMIENTO";
      case "INACTIVA":
        return "INACTIVA";
      default:
        return "DESCONOCIDO";
    }
  };

  const getMachineTypeIcon = (machineCode: string) => {
    if (machineCode.includes("DOBL")) return "fas fa-industry";
    if (machineCode.includes("SOLD")) return "fas fa-fire";
    if (machineCode.includes("TROQ")) return "fas fa-cut";
    if (machineCode.includes("TERM")) return "fas fa-compress-arrows-alt";
    return "fas fa-cog";
  };

  const formatNumber = (value?: number | null) => {
    if (value === null || value === undefined) return "-";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return "-";
    return Math.round(numeric).toLocaleString("es-ES");
  };

  const formatPercentValue = (value?: number | null) => {
    if (value === null || value === undefined) return "-";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return "-";
    return `${numeric.toFixed(1)}%`;
  };

  const getKpiToneClass = (value?: number | null) => {
    if (value === null || value === undefined) return "kpi-neutral";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return "kpi-neutral";
    if (numeric >= 85) return "kpi-good";
    if (numeric >= 65) return "kpi-warn";
    return "kpi-bad";
  };

  if (loading) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <h5>Cargando datos de las máquinas...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <div className="text-center">
                <i
                  className="fas fa-exclamation-triangle text-danger mb-3"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="text-danger mb-3">{error}</h5>
                <button className="btn btn-primary" onClick={fetchMachines}>
                  <i className="fas fa-redo me-2"></i>Intentar de Nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`wrapper ${sidebarToggled ? 'toggled' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar-wrapper" data-simplebar="true">
        <ModernSidebar currentPage="dashboard" />
      </div>


      {/* Main Content */}
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            {/* Título principal com logo e texto rotativo */}
            <div className="main-title-section">
              <div className="title-with-logo">
                <img src="/images/logo_transparent.png" alt="KH Logo" className="main-logo" />
                <div className="title-text">
                  <div className="title-sistema-container">
                    <span className="title-sistema">{titleConfig.sistema}</span>
                  </div>
                  <RotatingText
                    texts={titleConfig.scada.length > 0 ? titleConfig.scada : ['SCADA']}
                    mainClassName="rotating-text-scada"
                    staggerFrom={"center"}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-120%", opacity: 0 }}
                    staggerDuration={0.025}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    rotationInterval={2500}
                    auto={true}
                    loop={true}
                    splitBy="characters"
                  />
                </div>
                <button
                  className="config-title-btn"
                  onClick={openConfigDialog}
                  title="Configurar título"
                >
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            </div>

            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
              <div className="breadcrumb-title pe-3">
                <i className="bx bx-home-alt me-2"></i>
                Panel de Control
              </div>
              <div className="ps-3">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                    <li className="breadcrumb-item">
                      <a href="javascript:;">
                        <i className="bx bx-home-alt"></i>
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <i className="fas fa-sync-alt me-1"></i>
                      Sincronizado
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="ms-auto">
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  Última Actualización: {lastUpdate}
                </small>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-success">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h2 className="mb-0 text-white">
                          <CountUp
                            to={machines.filter((m) => m.status === "PRODUCIENDO").length}
                            decimals={0}
                            duration={1}
                          />
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-play-circle"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Produciendo</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        +
                        <CountUp
                          to={Math.round(
                            (machines.filter((m) => m.status === "PRODUCIENDO")
                              .length /
                              machines.length) *
                              100,
                          ) || 0}
                          decimals={0}
                          duration={1}
                        />
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-primary">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h2 className="mb-0 text-white">
                          <CountUp
                            to={machines.filter((m) => m.status === "ACTIVA").length}
                            decimals={0}
                            duration={1}
                          />
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-power-off"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Activas</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        +
                        <CountUp
                          to={Math.round(
                            (machines.filter((m) => m.status === "ACTIVA")
                              .length /
                              machines.length) *
                              100,
                          ) || 0}
                          decimals={0}
                          duration={1}
                        />
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-danger">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h2 className="mb-0 text-white">
                          <CountUp
                            to={machines.filter((m) => m.status === "PARADA").length}
                            decimals={0}
                            duration={1}
                          />
                          <i className="bx bxs-down-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-pause-circle"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Paradas</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        -
                        <CountUp
                          to={Math.round(
                            (machines.filter((m) => m.status === "PARADA")
                              .length /
                              machines.length) *
                              100,
                          ) || 0}
                          decimals={0}
                          duration={1}
                        />
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="card radius-15 bg-info">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h2 className="mb-0 text-white">
                          <CountUp
                            to={monthly?.total ?? machines.length}
                            decimals={0}
                            duration={1}
                            separator=","
                          />
                          <i className="bx bxs-up-arrow-alt font-14 text-white"></i>
                        </h2>
                      </div>
                      <div className="ms-auto font-35 text-white">
                        <i className="fas fa-box"></i>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-white">Producción Mes</p>
                      </div>
                      <div className="ms-auto font-14 text-white">
                        {monthly ? `${monthly.eficiencia}% ef.` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Machines Status Grid */}
            <div className="row">
              <div className="col-12">
                <div className="card radius-15">
                  <div className="card-header border-bottom-0">
                    <div className="d-lg-flex align-items-center">
                      <div>
                        <h5 className="mb-2 mb-lg-0">
                          Estado de Máquinas en Tiempo Real
                        </h5>
                      </div>
                      <div className="ms-lg-auto mb-2 mb-lg-0">
                        <div className="btn-group-round">
                          <div className="btn-group">
                            <button type="button" className="btn btn-white">
                              Todas
                            </button>
                            <button type="button" className="btn btn-white">
                              Produciendo
                            </button>
                            <button type="button" className="btn btn-white">
                              Paradas
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {machines.map((machineStatus) => {
                        const plannedUnits =
                          machineStatus.Rt_Unidades_planning ?? 0;
                        const producedOkUnits =
                          machineStatus.production.ok ?? 0;
                        const planningProgress =
                          plannedUnits > 0
                            ? Math.min(
                                100,
                                (producedOkUnits / plannedUnits) * 100,
                              )
                            : 0;
                        const remainingPieces =
                          machineStatus.productionOF.remainingPieces ?? 0;
                        const remainingProgressBase =
                          remainingPieces + producedOkUnits;
                        const remainingProgress =
                          remainingProgressBase > 0
                            ? Math.min(
                                100,
                                (producedOkUnits / remainingProgressBase) * 100,
                              )
                            : 0;
                        const statusKey = machineStatus.status.toLowerCase();
                        const machineIconClass = getMachineTypeIcon(
                          machineStatus.machine.Cod_maquina,
                        );
                        const oeeTurno =
                          machineStatus.oee_turno ?? machineStatus.oee ?? 0;
                        const disponibilidad =
                          machineStatus.oeeBreakdown?.disponibilidad ?? null;
                        const rendimiento =
                          machineStatus.rendimiento ??
                          machineStatus.oeeBreakdown?.rendimiento ??
                          null;
                        const calidad =
                          machineStatus.oeeBreakdown?.calidad ?? null;
                        const totalPieces = machineStatus.production.total ?? 0;
                        const qualityRate =
                          totalPieces > 0
                            ? (machineStatus.production.ok / totalPieces) * 100
                            : null;
                        const operatorLabel =
                          machineStatus.operatorFull ||
                          machineStatus.operator ||
                          "Sin operador";
                        const productLabel =
                          machineStatus.product?.description ||
                          machineStatus.product?.code ||
                          "Sin producto";
                        const shiftLabel =
                          machineStatus.order?.shift || "Sin turno";
                        const currentOF =
                          machineStatus.currentOF &&
                          machineStatus.currentOF !== "--"
                            ? machineStatus.currentOF
                            : null;
                        const downtimeLabel =
                          machineStatus.downtime ||
                          (machineStatus.status === "PARADA"
                            ? "Parada detectada"
                            : null);
                        const scrapRate =
                          totalPieces > 0
                            ? (machineStatus.production.nok / totalPieces) * 100
                            : null;
                        const remainingTime =
                          machineStatus.productionOF.remainingTime ||
                          "Sin estimación";
                        const turnoWindow =
                          machineStatus.machine.Rt_Hora_inicio_turno &&
                          machineStatus.machine.Rt_Hora_fin_turno
                            ? `${new Date(machineStatus.machine.Rt_Hora_inicio_turno).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} - ${new Date(machineStatus.machine.Rt_Hora_fin_turno).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`
                            : "Sin horario";
                        const statusChips = [
                          {
                            key: "state",
                            className: `status-chip is-${statusKey}`,
                            label: getStatusText(machineStatus.status),
                            prefixDot: true,
                          },
                          {
                            key: "oee",
                            className: "status-chip",
                            icon: "fas fa-gauge-high",
                            label: `OEE ${formatPercentValue(oeeTurno)}`,
                          },
                          {
                            key: "vel",
                            className: "status-chip",
                            icon: "fas fa-tachometer-alt",
                            label: `Vel ${machineStatus.velocity.current.toFixed(1)} u/h`,
                          },
                        ];
                        if (downtimeLabel) {
                          statusChips.push({
                            key: "downtime",
                            className: "status-chip is-parada",
                            icon: "fas fa-pause-circle",
                            label: downtimeLabel,
                          });
                        }

                        const metaChips = [
                          {
                            key: "shift",
                            icon: "fas fa-clock",
                            label: "Turno",
                            value: shiftLabel,
                            subtext: turnoWindow,
                          },
                          {
                            key: "operator",
                            icon: "fas fa-user",
                            label: "Operador",
                            value: operatorLabel,
                            subtext: "Responsable del puesto",
                          },
                          {
                            key: "quality",
                            icon: "fas fa-shield-check",
                            label: "Calidad",
                            value:
                              qualityRate !== null
                                ? formatPercentValue(qualityRate)
                                : "—",
                            subtext: `${formatNumber(machineStatus.production.ok)} OK / ${formatNumber(machineStatus.production.nok)} NOK`,
                            tone:
                              qualityRate !== null && qualityRate < 90
                                ? "chip-critical"
                                : undefined,
                          },
                          {
                            key: "nok",
                            icon: "fas fa-bolt",
                            label: "Scrap",
                            value:
                              scrapRate !== null
                                ? formatPercentValue(scrapRate)
                                : "—",
                            subtext:
                              scrapRate !== null
                                ? `${formatNumber(machineStatus.production.nok)} piezas NOK`
                                : "Sin registros",
                            tone:
                              scrapRate !== null && scrapRate > 5
                                ? "chip-warning"
                                : "chip-success",
                          },
                        ];
                        if (downtimeLabel) {
                          metaChips.push({
                            key: "downtime",
                            icon: "fas fa-stopwatch",
                            label: "Paros",
                            value: downtimeLabel,
                            subtext: machineStatus.ofInfo?.parosMinutes
                              ? `${machineStatus.ofInfo.parosMinutes} min acumulados`
                              : "Último evento registrado",
                            tone: "chip-critical",
                          });
                        }

                        return (
                          <div
                            key={machineStatus.machine.id_maquina}
                            className="col-12 col-lg-6 col-xxl-4 mb-3"
                          >
                            <div
                              className={`card radius-20 factory-machine-card machine-card status-${statusKey}`}
                              onClick={() => handleMachineClick(machineStatus)}
                            >
                              <div className="card-body">
                                <div className="machine-header-refined">
                                  <div className="machine-identity">
                                    <div className="machine-icon-wrapper">
                                      <i
                                        className={`${machineIconClass} machine-type-icon`}
                                      ></i>
                                    </div>
                                    <div className="machine-info">
                                      <div className="machine-name-row">
                                        <div className="machine-name">
                                          {machineStatus.machine.desc_maquina}
                                        </div>
                                        {/* Círculo minimalista con % OF realizada al lado del nombre */}
                                        {currentOF && (
                                          <div className="of-progress-circle">
                                            <svg viewBox="0 0 100 100" className="circular-progress">
                                              <circle
                                                className="circle-bg"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                              />
                                              <circle
                                                className="circle-progress"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                style={{
                                                  strokeDasharray: `${planningProgress * 2.827} 282.7`,
                                                }}
                                              />
                                            </svg>
                                            <div className="circle-text">
                                              <span className="circle-percentage">
                                                {Math.round(planningProgress)}%
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="machine-meta-line">
                                        {currentOF && (
                                          <span className="of-badge">
                                            OF {currentOF}
                                          </span>
                                        )}
                                      </div>
                                      <div className="machine-meta-details">
                                        <div className="meta-detail-item">
                                          <i className="fas fa-clock"></i>
                                          <span>TURNO: {shiftLabel}</span>
                                        </div>
                                        <div className="meta-detail-item">
                                          <i className="fas fa-user"></i>
                                          <span>OPERADOR: {operatorLabel}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="status-indicator">
                                    <div className="status-extra">
                                      {statusChips.map((chip) => (
                                        <span
                                          key={chip.key}
                                          className={chip.className}
                                        >
                                          {chip.prefixDot && (
                                            <span className="status-dot"></span>
                                          )}
                                          {chip.icon && (
                                            <i
                                              className={`${chip.icon} me-1`}
                                            ></i>
                                          )}
                                          {chip.label}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="machine-body-grid">
                                  <div className="machine-kpi-card">
                                    <span className="kpi-label">OEE turno</span>
                                    <span
                                      className={`kpi-value ${getKpiToneClass(oeeTurno)}`}
                                    >
                                      <CountUp
                                        to={oeeTurno || 0}
                                        decimals={1}
                                        duration={1}
                                      />%
                                    </span>
                                    <small className="kpi-subtext">
                                      Disp {formatPercentValue(disponibilidad)}{" "}
                                      • Rend {formatPercentValue(rendimiento)} •
                                      Cal {formatPercentValue(calidad)}
                                    </small>
                                  </div>
                                  <div className="machine-kpi-card">
                                    <span className="kpi-label">Velocidad</span>
                                    <span className="kpi-value kpi-accent">
                                      {machineStatus.velocity.current.toFixed(
                                        1,
                                      )}{" "}
                                      u/h
                                    </span>
                                    <small className="kpi-subtext">
                                      Nom{" "}
                                      {machineStatus.velocity.nominal.toFixed(
                                        1,
                                      )}{" "}
                                      •{" "}
                                      {Math.round(
                                        machineStatus.velocity.ratio * 100,
                                      )}
                                      %
                                    </small>
                                  </div>
                                  <div className="machine-kpi-card">
                                    <span className="kpi-label">Calidad</span>
                                    <span
                                      className={`kpi-value ${getKpiToneClass(qualityRate)}`}
                                    >
                                      <CountUp
                                        to={qualityRate || 0}
                                        decimals={1}
                                        duration={1}
                                      />%
                                    </span>
                                    <small className="kpi-subtext">
                                      OK{" "}
                                      <CountUp
                                        to={machineStatus.production.ok}
                                        decimals={0}
                                        duration={1}
                                        separator=","
                                      />{" "}
                                      • NOK{" "}
                                      <CountUp
                                        to={machineStatus.production.nok}
                                        decimals={0}
                                        duration={1}
                                        separator=","
                                      />
                                    </small>
                                  </div>
                                </div>

                                <div className="machine-progress-grid">
                                  <div className="progress-tile">
                                    <div className="progress-heading">
                                      <span>Plan</span>
                                      <span>
                                        {formatNumber(producedOkUnits)} /{" "}
                                        {formatNumber(plannedUnits)}
                                      </span>
                                    </div>
                                    <div className="progress-pill">
                                      <div
                                        className="progress-fill progress-plan"
                                        style={{
                                          width: `${planningProgress}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="progress-tile">
                                    <div className="progress-heading">
                                      <span>Tiempo restante</span>
                                      <span>
                                        {machineStatus.productionOF
                                          .remainingTime || "-"}
                                      </span>
                                    </div>
                                    <div className="progress-pill">
                                      <div
                                        className="progress-fill progress-remaining"
                                        style={{
                                          width: `${remainingProgress}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="machine-footer-meta">
                                  <div className="meta-item">
                                    <span className="meta-label">
                                      <i className="fas fa-box-open me-1"></i>
                                      Producto
                                    </span>
                                    <span className="meta-value">
                                      {productLabel}
                                    </span>
                                  </div>
                                  <div className="meta-item">
                                    <span className="meta-label">
                                      <i className="fas fa-layer-group me-1"></i>
                                      Total
                                    </span>
                                    <span className="meta-value">
                                      {formatNumber(totalPieces)}
                                    </span>
                                  </div>
                                </div>

                                {machineStatus.ofInfo && (
                                  <div className="machine-footer-info">
                                    {machineStatus.ofInfo
                                      .estimatedFinishDate && (
                                      <div className="info-item">
                                        <i className="fas fa-calendar-check"></i>
                                        <div className="info-content">
                                          <span className="info-label">
                                            Fin Estimado
                                          </span>
                                          <span className="info-value">
                                            {
                                              machineStatus.ofInfo
                                                .estimatedFinishDate
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    {machineStatus.ofInfo.parosMinutes > 0 && (
                                      <div className="info-item paros">
                                        <i className="fas fa-pause-circle"></i>
                                        <div className="info-content">
                                          <span className="info-label">
                                            Paros
                                          </span>
                                          <span className="info-value">
                                            {machineStatus.ofInfo.parosMinutes}{" "}
                                            min
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {machines.length === 0 && (
                      <div className="text-center py-5">
                        <i
                          className="fas fa-industry text-muted mb-3"
                          style={{ fontSize: "3rem" }}
                        ></i>
                        <h5 className="text-muted">
                          Ninguna máquina encontrada
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Efficiency Summary */}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card radius-15">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="mb-0">Eficiencia por Tipo de Máquina</h5>
                      </div>
                      <div className="dropdown ms-auto">
                        <div
                          className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="javascript:;">
                            Acción
                          </a>
                          <a className="dropdown-item" href="javascript:;">
                            Otra acción
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="javascript:;">
                            Algo más aquí
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">
                          Dobladora{" "}
                          <span className="float-end">
                            {machines.filter((m) =>
                              m.machine.Cod_maquina.includes("DOBL"),
                            ).length > 0
                              ? Math.round(
                                  machines
                                    .filter((m) =>
                                      m.machine.Cod_maquina.includes("DOBL"),
                                    )
                                    .reduce(
                                      (acc, m) => acc + (m.efficiency || 0),
                                      0,
                                    ) /
                                    machines.filter((m) =>
                                      m.machine.Cod_maquina.includes("DOBL"),
                                    ).length,
                                )
                              : 0}
                            %
                          </span>
                        </p>
                        <div
                          className="progress radius-15"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${machines.filter((m) => m.machine.Cod_maquina.includes("DOBL")).length > 0 ? Math.round(machines.filter((m) => m.machine.Cod_maquina.includes("DOBL")).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter((m) => m.machine.Cod_maquina.includes("DOBL")).length) : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">
                          Soldadura{" "}
                          <span className="float-end">
                            {machines.filter((m) =>
                              m.machine.Cod_maquina.includes("SOLD"),
                            ).length > 0
                              ? Math.round(
                                  machines
                                    .filter((m) =>
                                      m.machine.Cod_maquina.includes("SOLD"),
                                    )
                                    .reduce(
                                      (acc, m) => acc + (m.efficiency || 0),
                                      0,
                                    ) /
                                    machines.filter((m) =>
                                      m.machine.Cod_maquina.includes("SOLD"),
                                    ).length,
                                )
                              : 0}
                            %
                          </span>
                        </p>
                        <div
                          className="progress radius-15"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{
                              width: `${machines.filter((m) => m.machine.Cod_maquina.includes("SOLD")).length > 0 ? Math.round(machines.filter((m) => m.machine.Cod_maquina.includes("SOLD")).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter((m) => m.machine.Cod_maquina.includes("SOLD")).length) : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-wrapper mb-4">
                        <p className="mb-1">
                          Troqueladora{" "}
                          <span className="float-end">
                            {machines.filter((m) =>
                              m.machine.Cod_maquina.includes("TROQ"),
                            ).length > 0
                              ? Math.round(
                                  machines
                                    .filter((m) =>
                                      m.machine.Cod_maquina.includes("TROQ"),
                                    )
                                    .reduce(
                                      (acc, m) => acc + (m.efficiency || 0),
                                      0,
                                    ) /
                                    machines.filter((m) =>
                                      m.machine.Cod_maquina.includes("TROQ"),
                                    ).length,
                                )
                              : 0}
                            %
                          </span>
                        </p>
                        <div
                          className="progress radius-15"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: `${machines.filter((m) => m.machine.Cod_maquina.includes("TROQ")).length > 0 ? Math.round(machines.filter((m) => m.machine.Cod_maquina.includes("TROQ")).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter((m) => m.machine.Cod_maquina.includes("TROQ")).length) : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="progress-wrapper">
                        <p className="mb-1">
                          Terminación{" "}
                          <span className="float-end">
                            {machines.filter((m) =>
                              m.machine.Cod_maquina.includes("TERM"),
                            ).length > 0
                              ? Math.round(
                                  machines
                                    .filter((m) =>
                                      m.machine.Cod_maquina.includes("TERM"),
                                    )
                                    .reduce(
                                      (acc, m) => acc + (m.efficiency || 0),
                                      0,
                                    ) /
                                    machines.filter((m) =>
                                      m.machine.Cod_maquina.includes("TERM"),
                                    ).length,
                                )
                              : 0}
                            %
                          </span>
                        </p>
                        <div
                          className="progress radius-15"
                          style={{ height: "5px" }}
                        >
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{
                              width: `${machines.filter((m) => m.machine.Cod_maquina.includes("TERM")).length > 0 ? Math.round(machines.filter((m) => m.machine.Cod_maquina.includes("TERM")).reduce((acc, m) => acc + (m.efficiency || 0), 0) / machines.filter((m) => m.machine.Cod_maquina.includes("TERM")).length) : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card radius-15">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">Estado de Producción</h5>
                      </div>
                      <div className="dropdown ms-auto">
                        <div
                          className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-horizontal-rounded"></i>
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="javascript:;">
                            Acción
                          </a>
                          <a className="dropdown-item" href="javascript:;">
                            Otra acción
                          </a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="javascript:;">
                            Algo más aquí
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 g-3">
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Piezas OK (Día)</p>
                              </div>
                              <div className="ms-auto text-success">
                                <span>+<CountUp to={currentData?.ok ?? 0} decimals={0} duration={1} separator="," /></span>
                              </div>
                            </div>
                            <h4 className="mb-0"><CountUp to={currentData?.ok ?? 0} decimals={0} duration={1} separator="," /></h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Piezas NOK (Día)</p>
                              </div>
                              <div className="ms-auto text-danger">
                                <span>+<CountUp to={currentData?.nok ?? 0} decimals={0} duration={1} separator="," /></span>
                              </div>
                            </div>
                            <h4 className="mb-0"><CountUp to={currentData?.nok ?? 0} decimals={0} duration={1} separator="," /></h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Retrabajo (Día)</p>
                              </div>
                              <div className="ms-auto text-warning">
                                <span>+<CountUp to={currentData?.rw ?? 0} decimals={0} duration={1} separator="," /></span>
                              </div>
                            </div>
                            <h4 className="mb-0"><CountUp to={currentData?.rw ?? 0} decimals={0} duration={1} separator="," /></h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15 border shadow-none">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div>
                                <p className="mb-0">Pérdidas Día (€)</p>
                              </div>
                              <div className="ms-auto text-danger">
                                <span>
                                  {currentData
                                    ? currentData.perdidas_eur.toLocaleString(
                                        "es-ES",
                                        { style: "currency", currency: "EUR" },
                                      )
                                    : "—"}
                                </span>
                              </div>
                            </div>
                            <h4 className="mb-0">
                              {currentData
                                ? currentData.perdidas_eur.toLocaleString(
                                    "es-ES",
                                    { style: "currency", currency: "EUR" },
                                  )
                                : "—"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Detail Modal */}
      <MachineDetailModal
        machine={selectedMachine}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <div className="footer">
        <p className="mb-0">Sistema SCADA MRPII - © 2024 Grupo KH</p>
      </div>

      {/* Theme Customizer */}
      <div className="switcher-body">
        <button
          className="btn btn-primary btn-switcher shadow-sm"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i className="bx bx-cog bx-spin"></i>
        </button>
        <div
          className="offcanvas offcanvas-end shadow border-start-0 p-2"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasScrolling"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
              Personalizador de Tema
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <h6 className="mb-0">Variación de Tema</h6>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="lightmode"
                value="option1"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="lightmode">
                Claro
              </label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="darkmode"
                value="option2"
              />
              <label className="form-check-label" htmlFor="darkmode">
                Oscuro
              </label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="darksidebar"
                value="option3"
              />
              <label className="form-check-label" htmlFor="darksidebar">
                Barra Lateral Oscura
              </label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="ColorLessIcons"
                value="option4"
              />
              <label className="form-check-label" htmlFor="ColorLessIcons">
                Iconos sin Color
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Configuração do Título */}
      {showConfigDialog && (
        <div className="config-dialog-overlay" onClick={closeConfigDialog}>
          <div className="config-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="config-dialog-header">
              <h3><i className="fas fa-cog me-2"></i>Configurar Título</h3>
              <button className="config-dialog-close" onClick={closeConfigDialog}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="config-dialog-body">
              <div className="config-section">
                <label className="config-label">
                  <i className="fas fa-tag me-2"></i>
                  Texto "Sistema":
                </label>
                <input
                  type="text"
                  className="config-input"
                  value={tempConfig.sistema}
                  onChange={(e) => setTempConfig({...tempConfig, sistema: e.target.value})}
                  placeholder="Digite o texto do sistema..."
                />
              </div>

              <div className="config-section">
                <label className="config-label">
                  <i className="fas fa-exchange-alt me-2"></i>
                  Textos Rotativos:
                </label>
                <div className="scada-texts-list">
                  {tempConfig.scada.map((text, index) => (
                    <div key={index} className="scada-text-item">
                      <input
                        type="text"
                        className="config-input scada-input"
                        value={text}
                        onChange={(e) => updateScadaText(index, e.target.value)}
                        placeholder={`Texto ${index + 1}...`}
                      />
                      {tempConfig.scada.length > 1 && (
                        <button
                          className="remove-scada-btn"
                          onClick={() => removeScadaText(index)}
                          title="Remover texto"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {tempConfig.scada.length < 5 && (
                  <button className="add-scada-btn" onClick={addScadaText}>
                    <i className="fas fa-plus me-2"></i>Adicionar Texto
                  </button>
                )}
              </div>

              {/* Preview Section */}
              <div className="config-preview">
                <h4><i className="fas fa-eye me-2"></i>Preview:</h4>
                <div className="preview-title">
                  <img src="/images/logo_transparent.png" alt="KH Logo" className="preview-logo" />
                  <div className="preview-text">
                    <span className="preview-sistema">{tempConfig.sistema}</span>
                    <RotatingText
                      texts={tempConfig.scada.length > 0 ? tempConfig.scada : ['SCADA']}
                      mainClassName="preview-scada"
                      staggerFrom="center"
                      staggerDuration={0.025}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      rotationInterval={2500}
                      auto={true}
                      loop={true}
                      splitBy="characters"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="config-dialog-footer">
              <button className="config-btn config-btn-secondary" onClick={resetConfig}>
                <i className="fas fa-undo me-2"></i>Resetar
              </button>
              <div className="config-btn-group">
                <button className="config-btn config-btn-secondary" onClick={closeConfigDialog}>
                  Cancelar
                </button>
                <button className="config-btn config-btn-primary" onClick={saveConfig}>
                  <i className="fas fa-save me-2"></i>Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .main-title-section {
          text-align: center;
          margin-bottom: 2rem;
          padding: 2rem 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .title-with-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .main-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          animation: logo-pulse 3s ease-in-out infinite;
        }

        .title-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .title-with-logo {
          position: relative;
        }

        .title-sistema-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .title-sistema {
          font-size: 2.5rem;
          font-weight: 800;
          color: #000000;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 2px;
          line-height: 1;
        }

        .config-title-btn {
          position: absolute;
          top: -10px;
          right: -10px;
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
          opacity: 0.8;
          z-index: 10;
        }

        .config-title-btn:hover {
          opacity: 1;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
        }

        /* CSS do RotatingText do ReactBits */
        .text-rotate {
          display: flex;
          flex-wrap: wrap;
          white-space: pre-wrap;
          position: relative;
        }

        .text-rotate-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .text-rotate-word {
          display: inline-flex;
        }

        .text-rotate-lines {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .text-rotate-element {
          display: inline-block;
          position: relative;
        }

        .text-rotate-space {
          white-space: pre;
        }

        /* Classe para acessibilidade - Oculta o texto duplicado */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Correção para garantir que a classe sr-only do componente seja aplicada */
        .rotating-text-scada > .sr-only,
        .preview-scada > .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border-width: 0 !important;
        }

        /* Evitar duplicação de caracteres */
        .rotating-text-scada .text-rotate-element {
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          text-shadow: inherit;
          letter-spacing: inherit;
        }

        /* Estilos específicos para o título SCADA */
        .rotating-text-scada {
          font-size: 2rem;
          font-weight: 700;
          color: #dc3545;
          text-shadow: 2px 2px 4px rgba(220, 53, 69, 0.3);
          letter-spacing: 4px;
          line-height: 1;
          margin-top: 0.5rem;
          min-height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes scada-glow {
          from {
            text-shadow: 2px 2px 4px rgba(220, 53, 69, 0.3);
          }
          to {
            text-shadow: 2px 2px 8px rgba(220, 53, 69, 0.6), 0 0 12px rgba(220, 53, 69, 0.4);
          }
        }

        @media (max-width: 768px) {
          .main-title-section {
            padding: 1.5rem 0;
            margin-bottom: 1.5rem;
          }

          .title-with-logo {
            gap: 1rem;
          }

          .main-logo {
            width: 60px;
            height: 60px;
          }

          .title-sistema {
            font-size: 2rem;
          }

          .rotating-text-scada {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .main-title-section {
            padding: 1rem 0;
          }

          .title-with-logo {
            flex-direction: column;
            gap: 0.5rem;
          }

          .title-sistema {
            font-size: 1.8rem;
          }

        .rotating-text-scada {
          font-size: 1.5rem;
          }
        }

        /* Configuração do Título - Diálogo */
        .config-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .config-dialog {
          background: white;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow: hidden;
          animation: dialog-appear 0.3s ease-out;
        }

        @keyframes dialog-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .config-dialog-header {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .config-dialog-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .config-dialog-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .config-dialog-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .config-dialog-body {
          padding: 2rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .config-section {
          margin-bottom: 2rem;
        }

        .config-label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }

        .config-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .config-input:focus {
          outline: none;
          border-color: #dc3545;
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }

        .scada-texts-list {
          margin-bottom: 1rem;
        }

        .scada-text-item {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          align-items: center;
        }

        .scada-input {
          flex: 1;
        }

        .remove-scada-btn {
          background: #dc3545;
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .remove-scada-btn:hover {
          background: #c82333;
        }

        .add-scada-btn {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .add-scada-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }

        .config-preview {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 1.5rem;
          margin-top: 1.5rem;
          border: 2px solid #e9ecef;
        }

        .config-preview h4 {
          margin: 0 0 1rem 0;
          color: #495057;
          font-size: 1.1rem;
        }

        .preview-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .preview-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .preview-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: center;
        }

        .preview-sistema {
          font-size: 1.5rem;
          font-weight: 800;
          color: #000000;
        }

        .preview-scada {
          font-size: 1.5rem;
          font-weight: 700;
          color: #dc3545;
          text-shadow: 1px 1px 2px rgba(220, 53, 69, 0.3);
          letter-spacing: 2px;
          min-height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .config-dialog-footer {
          padding: 1.5rem;
          background: #f8f9fa;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #e9ecef;
        }

        .config-btn-group {
          display: flex;
          gap: 0.75rem;
        }

        .config-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
        }

        .config-btn-primary {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
        }

        .config-btn-primary:hover {
          background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }

        .config-btn-secondary {
          background: #6c757d;
          color: white;
        }

        .config-btn-secondary:hover {
          background: #5a6268;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
