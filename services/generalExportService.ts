import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { GeneralExportRow, GeneralExportFilters } from "../models/GeneralExport";

export class GeneralExportService {
  private endpoint = "/tickets/reporte-general/";

  async getReport(
    filters: GeneralExportFilters,
  ): Promise<ApiResponse<PaginatedResponse<GeneralExportRow>>> {
    const params = new URLSearchParams();

    params.append("fecha_desde", filters.fecha_desde);
    params.append("fecha_hasta", filters.fecha_hasta);

    if (filters.cliente) {
      params.append("cliente", filters.cliente);
    }
    if (filters.id_servicio !== undefined) {
      params.append("id_servicio", String(filters.id_servicio));
    }
    if (filters.network_user) {
      params.append("network_user", filters.network_user);
    }
    if (filters.cumple !== undefined) {
      params.append("cumple", String(filters.cumple));
    }

    return await http.get<PaginatedResponse<GeneralExportRow>>(
      `${this.endpoint}?${params.toString()}`,
    );
  }
}
