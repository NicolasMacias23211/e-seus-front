
export interface DriverReportRow {
  euser_nombre: string;
  network_user: string;
  cliente: string;
  id_ticket: number;
  ticket_title: string;
  fecha_creacion: string;
  fecha_cierre: string | null;
  fecha_estimada_cierre: string | null;
  tiempo_ticket: string;
  tiempo_usuario_cliente: string;
  porcentaje_cliente: number;
  tiempo_total_usuario: string;
  cumple: boolean;
}

export interface DriverReportFilters {
  fecha_desde: string;
  fecha_hasta: string;
  cliente?: string;
  network_user?: string;
}

export interface DriverReportFlat {
  euser_nombre: string;
  network_user: string;
  cliente: string;
  id_ticket: number;
  ticket_title: string;
  fecha_creacion: string;
  fecha_cierre: string;
  fecha_estimada_cierre: string;
  tiempo_ticket: string;
  tiempo_usuario_cliente: string;
  porcentaje_cliente: string;
  tiempo_total_usuario: string;
  cumple: string;
}

export const DRIVER_REPORT_HEADERS: Record<keyof DriverReportFlat, string> = {
  euser_nombre: "E-Learning User",
  network_user: "Usuario Red",
  cliente: "Cliente",
  id_ticket: "Nº Ticket",
  ticket_title: "Título del Ticket",
  fecha_creacion: "Fecha Creación",
  fecha_cierre: "Fecha Cierre",
  fecha_estimada_cierre: "Fecha Est. Cierre",
  tiempo_ticket: "Tiempo en Ticket",
  tiempo_usuario_cliente: "Tiempo Total (Cliente)",
  porcentaje_cliente: "% Ocupación Cliente",
  tiempo_total_usuario: "Tiempo Total Usuario",
  cumple: "Cumple",
};
