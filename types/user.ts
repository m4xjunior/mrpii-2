export interface User {
  nombre: string;
  apellido: string;
  foto: string;
  funcion: string;
  departamento: string;
  turno: string;
}

export const defaultUser: User = {
  nombre: 'Operador',
  apellido: 'SCADA',
  foto: '/assets/images/avatars/avatar-1.png',
  funcion: 'Operador',
  departamento: 'Producción',
  turno: 'Mañana'
};