export interface Machine {
  // Identificadores básicos
  id_maquina: number;
  Cod_maquina: string;
  desc_maquina: string;
  activo: boolean;

  // Información de la OF
  Rt_Cod_of?: string;
  rt_Cod_producto?: string;
  rt_id_producto?: number;
  Rt_Desc_producto?: string;
  Rt_Unidades_planning?: number;
  Rt_Unidades_planning2?: number;

  // Estado actual de la máquina
  rt_id_actividad?: number;
  rt_id_paro?: number;
  Rt_Desc_actividad?: string;
  Rt_Desc_operario?: string;
  rt_desc_paro?: string;
  rt_dia_productivo?: string;
  rt_desc_turno?: string;
  rt_id_turno?: number;
  rt_id_his_fase?: number;
  rt_id_fase?: number;
  Rt_Desc_fase?: string;

  // Producción actual
  Rt_Unidades_ok?: number;
  Rt_Unidades_nok?: number;
  Rt_Unidades_repro?: number;
  Rt_Unidades_cal?: number;
  Rt_Unidades?: number;

  // Unidades por OF (acumuladas)
  Unidades_ok_of?: number;
  Unidades_nok_of?: number;
  Unidades_rw_of?: number;

  // Velocidades y rendimientos
  f_velocidad?: number;
  Rt_Rendimientonominal1?: number;
  Rt_Rendimientonominal2?: number;
  Rt_Factor_multiplicativo?: number;

  // Información de tiempos
  Rt_Seg_produccion?: number;
  Rt_Seg_preparacion?: number;
  Rt_Seg_paro?: number;
  Rt_Seg_produccion_turno?: number;
  Rt_Seg_paro_turno?: number;
  Rt_Hora?: string;
  Rt_Hora_inicio_turno?: string;
  Rt_Hora_fin_turno?: string;
  Rt_Fecha_ini?: string;
  Rt_Fecha_fin?: string;

  // Información de paros
  Rt_Id_paro?: number;
  Rt_Hora_inicio_paro?: string;
  Rt_Seg_paro_nominal?: number;
  Rt_Seg_paro_max?: number;
  Rt_Paro_maquina?: number;
  Rt_Id_his_prod_paro?: number;
  Rt_His_paro?: number;

  // Información del operador
  rt_num_operario?: number;
  rt_id_operario?: number;

  // Información adicional de producción
  Rt_Unidades_turno?: number;
  Rt_Unidades_ok_turno?: number;

  // Código del producto
  codigo_producto?: string;
}

export interface MachineStatus {
  machine: Machine;
  status: 'ACTIVA' | 'PARADA' | 'PRODUCIENDO' | 'MANTENIMIENTO' | 'INACTIVA';
  efficiency: number;
  oee: number;
  oeeBreakdown?: {
    disponibilidad: number;
    rendimiento: number;
    calidad: number;
  } | null;
  production: {
    ok: number;
    nok: number;
    rw: number;
    total: number;
  };
  productionOF: {
    ok: number;
    nok: number;
    rw: number;
    total: number;
    progress: number;
    remainingPieces: number;
    remainingTime: string;
  };
  velocity: {
    current: number;
    nominal: number;
    ratio: number;
  };
  currentOF?: string;
  operator?: string;
  operatorFull?: string;
  downtime?: string;
  product: {
    code: string;
    description: string;
  };
  order: {
    code: string;
    date?: string;
    shift: string;
  };
}

export interface OEEData {
  disponibilidad: number;
  rendimiento: number;
  calidad: number;
  oee: number;
  fecha: string;
  turno: string;
}

export interface ProductionData {
  fecha: Date;
  turno: string;
  unidades_ok: number;
  unidades_nok: number;
  unidades_rw: number;
  tiempo_produccion: number;
  velocidad_media: number;
  operario: string;
}

export interface DowntimeData {
  fecha_inicio: Date;
  fecha_fin?: Date;
  duracion_minutos: number;
  tipo_paro: string;
  descripcion: string;
  operario: string;
}

export interface MachineDetails {
  machine: Machine;
  oee: OEEData[];
  production: ProductionData[];
  downtime: DowntimeData[];
  orders: any[];
  sales: any[];
}