'use client';

import { useState, useEffect } from 'react';

// Tipos de dados
interface CauseImprovementRecord {
  id: string;
  fecha_hora: string;
  maquina: string;
  of: string;
  tipo: 'Calidad' | 'Parada';
  descripcion: string;
  responsable: string;
  estado: 'Abierta' | 'En curso' | 'Cerrada';
  impacto_euros?: number;
  impacto_tiempo_horas?: number;
  anexos?: string[];
  comentarios?: string;
}

export default function CauseImprovementLogPage() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<CauseImprovementRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CauseImprovementRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<CauseImprovementRecord | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    fecha: '',
    maquina: '',
    of: '',
    turno: '',
    tipo: '',
    responsable: ''
  });

  // Dados mockados
  const mockData: CauseImprovementRecord[] = [
    {
      id: '1',
      fecha_hora: '2024-09-23 08:30:00',
      maquina: 'M001',
      of: 'OF-2024-001',
      tipo: 'Parada',
      descripcion: 'Falla en motor principal - sobrecalentamiento',
      responsable: 'Juan Pérez',
      estado: 'Abierta',
      impacto_euros: 250.50,
      impacto_tiempo_horas: 2.5,
      anexos: ['foto_motor.jpg', 'log_error.txt'],
      comentarios: 'Se requiere revisión urgente del sistema de refrigeración.'
    },
    {
      id: '2',
      fecha_hora: '2024-09-23 10:15:00',
      maquina: 'M002',
      of: 'OF-2024-002',
      tipo: 'Calidad',
      descripcion: 'Defecto en acabado superficial - rayones visibles',
      responsable: 'María García',
      estado: 'En curso',
      impacto_euros: 125.00,
      impacto_tiempo_horas: 1.0,
      anexos: ['inspeccion_calidad.pdf'],
      comentarios: 'Investigando causa raíz. Posible problema en herramienta de corte.'
    },
    {
      id: '3',
      fecha_hora: '2024-09-22 14:45:00',
      maquina: 'M001',
      of: 'OF-2024-003',
      tipo: 'Parada',
      descripcion: 'Falla eléctrica - cortocircuito en panel de control',
      responsable: 'Carlos Rodríguez',
      estado: 'Cerrada',
      impacto_euros: 75.25,
      impacto_tiempo_horas: 0.75,
      anexos: ['reporte_mantenimiento.pdf'],
      comentarios: 'Problema resuelto. Reemplazado fusible defectuoso.'
    },
    {
      id: '4',
      fecha_hora: '2024-09-22 16:20:00',
      maquina: 'M003',
      of: 'OF-2024-004',
      tipo: 'Calidad',
      descripcion: 'Tolerancia dimensional fuera de especificación',
      responsable: 'Ana López',
      estado: 'Abierta',
      impacto_euros: 300.00,
      impacto_tiempo_horas: 3.0,
      anexos: ['mediciones.pdf', 'especificaciones.pdf'],
      comentarios: 'Requiere ajuste de parámetros de máquina.'
    },
    {
      id: '5',
      fecha_hora: '2024-09-21 09:10:00',
      maquina: 'M002',
      of: 'OF-2024-005',
      tipo: 'Parada',
      descripcion: 'Problema de alimentación - atasco en transportador',
      responsable: 'Pedro Martínez',
      estado: 'En curso',
      impacto_euros: 150.75,
      impacto_tiempo_horas: 1.5,
      comentarios: 'Limpiando sistema de transporte. Verificando sensores.'
    }
  ];

  // Opções para filtros
  const filterOptions = {
    maquinas: ['M001', 'M002', 'M003', 'M004'],
    turnos: ['Mañana', 'Tarde', 'Noche'],
    tipos: ['Calidad', 'Parada'],
    responsables: ['Juan Pérez', 'María García', 'Carlos Rodríguez', 'Ana López', 'Pedro Martínez']
  };

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setRecords(mockData);
      setFilteredRecords(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Aplicar filtros
    let filtered = records;

    if (filters.fecha) {
      filtered = filtered.filter(record =>
        record.fecha_hora.startsWith(filters.fecha)
      );
    }

    if (filters.maquina) {
      filtered = filtered.filter(record =>
        record.maquina === filters.maquina
      );
    }

    if (filters.of) {
      filtered = filtered.filter(record =>
        record.of.toLowerCase().includes(filters.of.toLowerCase())
      );
    }

    if (filters.turno) {
      // Simular filtro por turno baseado na hora
      const turnoHora = filters.turno === 'Mañana' ? [6, 14] :
                       filters.turno === 'Tarde' ? [14, 22] : [22, 6];
      filtered = filtered.filter(record => {
        const hora = parseInt(record.fecha_hora.split(' ')[1].split(':')[0]);
        if (filters.turno === 'Noche') {
          return hora >= turnoHora[0] || hora < turnoHora[1];
        }
        return hora >= turnoHora[0] && hora < turnoHora[1];
      });
    }

    if (filters.tipo) {
      filtered = filtered.filter(record =>
        record.tipo === filters.tipo
      );
    }

    if (filters.responsable) {
      filtered = filtered.filter(record =>
        record.responsable === filters.responsable
      );
    }

    setFilteredRecords(filtered);
  }, [records, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRowClick = (record: CauseImprovementRecord) => {
    setSelectedRecord(record);
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelectedRecord(null);
  };

  const handleStatusChange = (newStatus: 'Abierta' | 'En curso' | 'Cerrada') => {
    if (selectedRecord) {
      const updatedRecords = records.map(record =>
        record.id === selectedRecord.id
          ? { ...record, estado: newStatus }
          : record
      );
      setRecords(updatedRecords);
      setSelectedRecord({ ...selectedRecord, estado: newStatus });
    }
  };

  const getStatusBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Abierta': return 'rgba(220, 53, 69, 0.12)'; // vermelho suave
      case 'En curso': return 'rgba(255, 193, 7, 0.12)'; // amarelo suave
      case 'Cerrada': return 'rgba(25, 135, 84, 0.12)'; // verde suave
      default: return 'rgba(108, 117, 125, 0.12)'; // cinza suave
    }
  };

  const getStatusTextColor = (estado: string) => {
    switch (estado) {
      case 'Abierta': return '#dc3545';
      case 'En curso': return '#d69e2e';
      case 'Cerrada': return '#198754';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <h5>Cargando registro de causas y mejoras...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="page-content-wrapper">
        <div className="page-content">
          {/* Header */}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Registro de Causas / Mejorias</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/"><i className="bx bx-home-alt"></i></a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Registro de Causas / Mejorias
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Filtros */}
          <div className="card radius-15 mb-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label fw-bold">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={filters.fecha}
                    onChange={(e) => handleFilterChange('fecha', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-bold">Máquina</label>
                  <select
                    className="form-select"
                    value={filters.maquina}
                    onChange={(e) => handleFilterChange('maquina', e.target.value)}
                  >
                    <option value="">Todas</option>
                    {filterOptions.maquinas.map(maquina => (
                      <option key={maquina} value={maquina}>{maquina}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-bold">OF</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar OF..."
                    value={filters.of}
                    onChange={(e) => handleFilterChange('of', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-bold">Turno</label>
                  <select
                    className="form-select"
                    value={filters.turno}
                    onChange={(e) => handleFilterChange('turno', e.target.value)}
                  >
                    <option value="">Todos</option>
                    {filterOptions.turnos.map(turno => (
                      <option key={turno} value={turno}>{turno}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-bold">Tipo</label>
                  <select
                    className="form-select"
                    value={filters.tipo}
                    onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  >
                    <option value="">Todos</option>
                    {filterOptions.tipos.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-bold">Responsable</label>
                  <select
                    className="form-select"
                    value={filters.responsable}
                    onChange={(e) => handleFilterChange('responsable', e.target.value)}
                  >
                    <option value="">Todos</option>
                    {filterOptions.responsables.map(resp => (
                      <option key={resp} value={resp}>{resp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela */}
          <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div className="card-header">
              <h6 className="mb-0">Registros ({filteredRecords.length})</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Fecha/Hora</th>
                      <th>Máquina</th>
                      <th>OF</th>
                      <th>Tipo</th>
                      <th>Descripción</th>
                      <th>Responsable</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        onClick={() => handleRowClick(record)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{new Date(record.fecha_hora).toLocaleString('es-ES')}</td>
                        <td className="fw-bold">{record.maquina}</td>
                        <td>{record.of}</td>
                        <td>
                          <span className="badge" style={{
                            backgroundColor: record.tipo === 'Parada' ? 'rgba(220, 53, 69, 0.12)' : 'rgba(255, 193, 7, 0.12)',
                            color: record.tipo === 'Parada' ? '#dc3545' : '#d69e2e'
                          }}>
                            {record.tipo}
                          </span>
                        </td>
                        <td>{record.descripcion}</td>
                        <td>{record.responsable}</td>
                        <td>
                          <span className="badge" style={{
                            backgroundColor: getStatusBadgeColor(record.estado),
                            color: getStatusTextColor(record.estado)
                          }}>
                            {record.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredRecords.length === 0 && (
                <div className="text-center py-4">
                  <i className="fas fa-inbox mb-3" style={{ fontSize: '48px', color: '#ccc', opacity: 0.5 }}></i>
                  <p className="text-muted">No se encontraron registros con los filtros aplicados</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer/Modal de Detalles */}
      {showDrawer && selectedRecord && (
        <div className="offcanvas offcanvas-end show" style={{
          width: '400px',
          visibility: 'visible',
          transform: 'translateX(0)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-card)',
          backgroundColor: 'var(--bg)',
          color: 'var(--fg)'
        }}>
          <div className="offcanvas-header" style={{ borderBottom: '1px solid var(--border)' }}>
            <h5 className="offcanvas-title">Detalle del Registro</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseDrawer}
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="mb-3">
              <label className="form-label fw-bold">Descripción</label>
              <p className="mb-0">{selectedRecord.descripcion}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Impacto</label>
              <div className="row">
                <div className="col-6">
                  <small className="text-muted">Euros (€)</small>
                  <p className="mb-0 fw-bold">{selectedRecord.impacto_euros?.toFixed(2)} €</p>
                </div>
                <div className="col-6">
                  <small className="text-muted">Tiempo (horas)</small>
                  <p className="mb-0 fw-bold">{selectedRecord.impacto_tiempo_horas} h</p>
                </div>
              </div>
            </div>

            {selectedRecord.anexos && selectedRecord.anexos.length > 0 && (
              <div className="mb-3">
                <label className="form-label fw-bold">Anexos</label>
                <ul className="list-unstyled">
                  {selectedRecord.anexos.map((anexo, index) => (
                    <li key={index}>
                      <i className="fas fa-paperclip me-2"></i>
                      <a href="#" className="text-decoration-none">{anexo}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-bold">Comentarios</label>
              <p className="mb-0">{selectedRecord.comentarios || 'Sin comentarios'}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Estado Actual</label>
              <div className="d-flex gap-2">
                {(['Abierta', 'En curso', 'Cerrada'] as const).map((status) => (
                  <button
                    key={status}
                    className={`btn btn-sm ${selectedRecord.estado === status ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedRecord.estado === status ? getStatusBadgeColor(status) : 'transparent',
                      color: selectedRecord.estado === status ? getStatusTextColor(status) : 'var(--fg)',
                      border: `1px solid ${selectedRecord.estado === status ? getStatusTextColor(status) : 'var(--border)'}`
                    }}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para o drawer */}
      {showDrawer && (
        <div
          className="offcanvas-backdrop show"
          onClick={handleCloseDrawer}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        ></div>
      )}
    </div>
  );
}