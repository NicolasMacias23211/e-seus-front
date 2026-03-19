export interface MetricasCumplimientoData {
  network_user: string;
  nombre_completo: string;
  fecha_desde: string;
  fecha_hasta: string;
  total_tickets: number;
  tickets_cumplimiento: number;
  porcentaje_cumplimiento: number;
}

export interface MetricasCumplimiento {
  success: boolean;
  data: MetricasCumplimientoData;
}

export interface MetricasOcupacionData {
  network_user: string;
  nombre_completo: string;
  fecha_desde: string;
  fecha_hasta: string;
  total_horas_reportadas: number;
  total_horas_disponibles: number;
  porcentaje_ocupacion: number;
}

export interface MetricasOcupacion {
  success: boolean;
  data: MetricasOcupacionData;
}

export interface DatoDiario {
  dia: string;
  fecha: string;
  creados: number;
  cerrados: number;
}

export interface WeeklyStatsData {
  periodo: string;
  fecha_desde: string;
  fecha_hasta: string;
  datos_diarios: DatoDiario[];
}

export interface WeeklyStats {
  success: boolean;
  data: WeeklyStatsData;
}

export interface DashboardStatsData {
  /** Total de tickets asignados al usuario (todos los estados activos) */
  assigned: number;
  /** Tickets en estado "En Progreso" asignados al usuario */
  in_progress: number;
  /** Tickets cerrados/completados por el usuario en el mes actual */
  completed_this_month: number;
  /** Tickets que superaron su fecha estimada de cierre sin haber sido cerrados */
  overdue: number;
  /** Variación de completados vs mes anterior (puede ser positivo o negativo) */
  completed_vs_last_month: number;
}

export interface DashboardStats {
  success: boolean;
  data: DashboardStatsData;
}
