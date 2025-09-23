'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../hooks/useUser';
import { User } from '../../../types/user';

export default function PerfilPage() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<User>(user);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      updateUser(formData);
      // Pequeño delay para mostrar feedback
      setTimeout(() => {
        setSaving(false);
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Error guardando perfil:', error);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, seleccione un archivo de imagen válido.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          foto: base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <header className="top-header">
        <nav className="navbar navbar-expand">
          <div className="left-topbar d-flex align-items-center">
            <a href="/" className="toggle-btn">
              <i className="bx bx-arrow-back"></i>
            </a>
          </div>
          <div className="flex-grow-1 text-center">
            <h5 className="mb-0">Configuración de Perfil</h5>
          </div>
          <div className="right-topbar">
            {/* Espacio para mantener centrado */}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="card radius-15">
                    <div className="card-header border-bottom-0">
                      <div className="d-flex align-items-center">
                        <div>
                          <h5 className="mb-0">Información Personal</h5>
                          <p className="mb-0 text-muted">Complete su información de perfil</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        {/* Foto de perfil */}
                        <div className="text-center mb-4">
                          <div className="position-relative d-inline-block">
                            <img
                              src={formData.foto || '/assets/images/avatars/avatar-1.png'}
                              alt="Foto de perfil"
                              className="rounded-circle"
                              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
                              style={{ width: '32px', height: '32px', padding: '0' }}
                              title="Cambiar foto"
                              onClick={handlePhotoClick}
                            >
                              <i className="bx bx-camera" style={{ fontSize: '16px' }}></i>
                            </button>
                          </div>
                          <p className="text-muted mt-2 small">Haga clic en la cámara para cambiar la foto</p>
                        </div>

                        {/* Campos del formulario */}
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) => handleInputChange('nombre', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label">Apellido *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="apellido"
                              value={formData.apellido}
                              onChange={(e) => handleInputChange('apellido', e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="funcion" className="form-label">Función *</label>
                          <select
                            className="form-select"
                            id="funcion"
                            value={formData.funcion}
                            onChange={(e) => handleInputChange('funcion', e.target.value)}
                            required
                          >
                            <option value="">Seleccione una función</option>
                            <option value="Operador">Operador</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Ingeniero">Ingeniero</option>
                            <option value="Administrador">Administrador</option>
                          </select>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="departamento" className="form-label">Departamento *</label>
                            <select
                              className="form-select"
                              id="departamento"
                              value={formData.departamento}
                              onChange={(e) => handleInputChange('departamento', e.target.value)}
                              required
                            >
                              <option value="">Seleccione un departamento</option>
                              <option value="Producción">Producción</option>
                              <option value="Mantenimiento">Mantenimiento</option>
                              <option value="Calidad">Calidad</option>
                              <option value="Logística">Logística</option>
                              <option value="Administración">Administración</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="turno" className="form-label">Turno *</label>
                            <select
                              className="form-select"
                              id="turno"
                              value={formData.turno}
                              onChange={(e) => handleInputChange('turno', e.target.value)}
                              required
                            >
                              <option value="">Seleccione un turno</option>
                              <option value="Mañana">Mañana</option>
                              <option value="Tarde">Tarde</option>
                              <option value="Noche">Noche</option>
                              <option value="Rotativo">Rotativo</option>
                            </select>
                          </div>
                        </div>

                        {/* Botones */}
                        <div className="d-flex gap-2 mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary flex-fill"
                            disabled={saving}
                          >
                            {saving ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Guardando...
                              </>
                            ) : (
                              <>
                                <i className="bx bx-save me-2"></i>
                                Guardar Cambios
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                            disabled={saving}
                          >
                            <i className="bx bx-x me-2"></i>
                            Cancelar
                          </button>
                        </div>
                      </form>

                      {/* Input de arquivo escondido para upload de foto */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="mb-0">Sistema SCADA MRPII - © 2024 Grupo KH</p>
      </div>
    </div>
  );
}