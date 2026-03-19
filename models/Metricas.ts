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
  assigned: number;
  in_progress: number;
  completed_this_month: number;
  overdue: number;
  completed_vs_last_month: number;
}

export interface DashboardStats {
  success: boolean;
  data: DashboardStatsData;
}
