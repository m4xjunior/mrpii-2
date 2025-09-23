'use client';

import { useState, useEffect } from 'react';
import { User, defaultUser } from '../types/user';

const USER_STORAGE_KEY = 'scada-user-profile';

export function useUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...defaultUser, ...parsedUser });
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar usuario en localStorage cuando cambia
  const updateUser = (newUserData: Partial<User>) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);

    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error guardando datos del usuario:', error);
    }
  };

  // Resetear usuario a valores por defecto
  const resetUser = () => {
    setUser(defaultUser);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Error eliminando datos del usuario:', error);
    }
  };

  return {
    user,
    loading,
    updateUser,
    resetUser
  };
}