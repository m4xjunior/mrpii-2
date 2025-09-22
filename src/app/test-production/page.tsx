'use client';

import React, { useState } from 'react';
import ProductionDashboard from '../../../components/ProductionDashboard';
import { useProductionData } from '../../../hooks/useProductionData';

export default function TestProductionPage() {
  const [showCompact, setShowCompact] = useState(false);
  const { data, summary, isLoading, error, refreshData } = useProductionData(10000); // Actualizar cada 10 segundos

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-primary">
              <i className="fas fa-chart-line me-3"></i>
              Sistema de Producción - Test
            </h1>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setShowCompact(!showCompact)}
              >
                {showCompact ? 'Vista Completa' : 'Vista Compacta'}
              </button>
              <button
                className="btn btn-primary"
                onClick={refreshData}
                disabled={isLoading}
              >
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-refresh'} me-2`}></i>
                Actualizar Datos
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <ProductionDashboard compact={showCompact} />
            </div>
          </div>

          {/* Datos Raw para Debug */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-code me-2"></i>
                    Datos Debug (JSON)
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Resumen Actual:</h6>
                      <pre className="bg-light p-2 rounded">
                        {JSON.stringify(summary, null, 2)}
                      </pre>
                    </div>
                    <div className="col-md-6">
                      <h6>Datos de Máquinas:</h6>
                      <pre className="bg-light p-2 rounded">
                        {JSON.stringify(data, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container-fluid {
          background: #f8f9fa;
          min-height: 100vh;
        }

        .card {
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .btn {
          border-radius: 20px;
        }

        pre {
          font-size: 0.8rem;
          max-height: 300px;
          overflow: auto;
        }

        .status-indicator {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .status-ok { background-color: #28a745; }
        .status-warning { background-color: #ffc107; }
        .status-error { background-color: #dc3545; }
      `}</style>
    </div>
  );
}
