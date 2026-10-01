export interface GeneralExportRow {
  id_ticket: number;
  fecha_creacion: string;
  cliente: string;
  tipo_servicio: string;
  tiempo_total: string;
  euser_nombre: string;
  cumple: boolean;
  fecha_cierre: string | null;
  fecha_estimada_cierre: string | null;
}

export interface GeneralExportFilters {
  fecha_desde: string;
  fecha_hasta: string;
  cliente?: string;
  id_servicio?: number;
  network_user?: string;
  cumple?: boolean;
}

export interface GeneralExportFlat {
  id_ticket: number;
  fecha_creacion: string;
  cliente: string;
  tipo_servicio: string;
  tiempo_total: string;
  euser_nombre: string;
  cumple: string;
  fecha_cierre: string;
  fecha_estimada_cierre: string;
}

export const GENERAL_EXPORT_HEADERS: Record<keyof GeneralExportFlat, string> =
  {
    id_ticket: "Nº Ticket",
    fecha_creacion: "Fecha Creación",
    cliente: "Cliente",
    tipo_servicio: "Tipo de Servicio",
    tiempo_total: "Tiempo Total",
    euser_nombre: "E-Learning User",
    cumple: "Cumple",
    fecha_cierre: "Fecha Cierre",
    fecha_estimada_cierre: "Fecha Est. Cierre",
  };
