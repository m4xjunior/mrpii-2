'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function OFDetailPage() {
  const params = useParams();
  const ofId = params.ofId as string;

  // Estado de carregamento
  const [loading, setLoading] = useState(true);
  const [includeSetup, setIncludeSetup] = useState(true);

  // Dados mockados (vou remover conforme solicitado, mas por enquanto manter para estrutura)
  const mockData = {
    ofId,
    product: 'Produto XYZ',
    machine: 'M-001',
    operator: 'Fernanda',
    shift: 'Tarde',
    status: 'EN CURSO',
    kpis: {
      oee: 85,
      disponibilidade: 90,
      rendimento: 88,
      qualidade: 95,
      preparacaoMin: 45,
      producaoTotal: 1250,
      ok: 1200,
      nok: 30,
      rw: 20
    }
  };

  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
                <h5>Cargando detalles de OF #{ofId}...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Header Sticky */}
      <div className="sticky-top bg-white border-bottom" style={{ top: '60px', zIndex: 1000 }}>
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3 mb-1">OF #{ofId} — {mockData.product}</h1>
              <p className="text-muted mb-0">
                Máquina {mockData.machine} · Operario: {mockData.operator} · Turno {mockData.shift}
              </p>
            </div>
            <div className="col-md-4">
              <span className={`badge ${mockData.status === 'EN CURSO' ? 'bg-success' : 'bg-secondary'} fs-6 px-3 py-2`}>
                {mockData.status}
              </span>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-outline-primary me-2">
                <i className="fas fa-download me-1"></i>Exportar
              </button>
              <button className="btn btn-outline-secondary">
                <i className="fas fa-print me-1"></i>Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            {/* KPIs */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">KPIs da OF</h5>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="includeSetup"
                      checked={includeSetup}
                      onChange={(e) => setIncludeSetup(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="includeSetup">
                      Preparação (min): {includeSetup ? 'incluída' : 'excluída'}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">OEE</p>
                            <h4 className="mb-0">{mockData.kpis.oee}%</h4>
                          </div>
                          <div className="text-success">
                            <i className="fas fa-chart-line fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">Disponibilidade</p>
                            <h4 className="mb-0">{mockData.kpis.disponibilidade}%</h4>
                          </div>
                          <div className="text-primary">
                            <i className="fas fa-clock fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">Rendimento</p>
                            <h4 className="mb-0">{mockData.kpis.rendimento}%</h4>
                          </div>
                          <div className="text-warning">
                            <i className="fas fa-tachometer-alt fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">Qualidade</p>
                            <h4 className="mb-0">{mockData.kpis.qualidade}%</h4>
                          </div>
                          <div className="text-info">
                            <i className="fas fa-check-circle fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">Produção Total</p>
                            <h4 className="mb-0">{mockData.kpis.producaoTotal}</h4>
                          </div>
                          <div className="text-secondary">
                            <i className="fas fa-boxes fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">OK / NOK / RW</p>
                            <h4 className="mb-0">{mockData.kpis.ok} / {mockData.kpis.nok} / {mockData.kpis.rw}</h4>
                          </div>
                          <div className="text-success">
                            <i className="fas fa-thumbs-up fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-0 text-muted">Preparação</p>
                            <h4 className="mb-0">{mockData.kpis.preparacaoMin} min</h4>
                          </div>
                          <div className="text-muted">
                            <i className="fas fa-tools fa-2x"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header border-bottom-0">
                    <h6 className="mb-0">OEE ao longo do tempo</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--muted)' }}>
                      <p className="text-muted">Gráfico de linha OEE - Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header border-bottom-0">
                    <h6 className="mb-0">Produção por segmento (OK/NOK/RWK)</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--muted)' }}>
                      <p className="text-muted">Gráfico de barras apiladas - Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header border-bottom-0">
                    <h6 className="mb-0">Pareto de Paradas</h6>
                  </div>
                  <div className="card-body">
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--muted)' }}>
                      <p className="text-muted">Gráfico Pareto - Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabela de Eventos */}
            <div className="row">
              <div className="col-12">
                <div className="card radius-15" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                  <div className="card-header border-bottom-0 sticky-top bg-white" style={{ top: '160px', zIndex: 100 }}>
                    <h6 className="mb-0">Eventos e Paradas</h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Hora inicio</th>
                            <th>Hora fin</th>
                            <th>Tipo</th>
                            <th>Causa nivel 1</th>
                            <th>Causa nivel 2</th>
                            <th>Operario</th>
                            <th>Segundos</th>
                            <th>Observaciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Mock data rows */}
                          <tr>
                            <td>08:15</td>
                            <td>08:45</td>
                            <td><span className="badge" style={{ backgroundColor: 'rgba(220, 53, 69, 0.12)', color: '#dc3545' }}>PP</span></td>
                            <td>Material</td>
                            <td>Falta estoque</td>
                            <td>Fernanda</td>
                            <td>1800</td>
                            <td>Aguardando reposição</td>
                          </tr>
                          <tr>
                            <td>10:30</td>
                            <td>10:45</td>
                            <td><span className="badge" style={{ backgroundColor: 'rgba(255, 193, 7, 0.12)', color: '#ffc107' }}>PNP</span></td>
                            <td>Manutenção</td>
                            <td>Ajuste calibragem</td>
                            <td>Fernanda</td>
                            <td>900</td>
                            <td>Calibragem preventiva</td>
                          </tr>
                          <tr>
                            <td>12:00</td>
                            <td>12:15</td>
                            <td><span className="badge" style={{ backgroundColor: 'rgba(220, 53, 69, 0.12)', color: '#dc3545' }}>PP</span></td>
                            <td>Qualidade</td>
                            <td>Rejeição lote</td>
                            <td>Fernanda</td>
                            <td>900</td>
                            <td>Verificação qualidade</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Lateral */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="improvementsPanel" aria-labelledby="improvementsPanelLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="improvementsPanelLabel">Possíveis Melhorias</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label htmlFor="responsible" className="form-label">Responsável</label>
            <select className="form-select" id="responsible">
              <option>Selecionar responsável...</option>
              <option>Fernanda</option>
              <option>João</option>
              <option>Maria</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="improvements" className="form-label">Observações de melhoria</label>
            <textarea className="form-control" id="improvements" rows={5} placeholder="Digite suas observações..."></textarea>
          </div>
          <button className="btn btn-primary">Salvar</button>
        </div>
      </div>
    </div>
  );
}