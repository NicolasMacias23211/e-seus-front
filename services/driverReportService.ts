import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { DriverReportRow, DriverReportFilters } from "../models/DriverReport";

export class DriverReportService {
  private endpoint = "/tickets/reporte-driver/";

  async getReport(
    filters: DriverReportFilters,
  ): Promise<ApiResponse<PaginatedResponse<DriverReportRow>>> {
    const params = new URLSearchParams();

    params.append("fecha_desde", filters.fecha_desde);
    params.append("fecha_hasta", filters.fecha_hasta);

    if (filters.cliente) {
      params.append("cliente", filters.cliente);
    }
    if (filters.network_user) {
      params.append("network_user", filters.network_user);
    }

    return await http.get<PaginatedResponse<DriverReportRow>>(
      `${this.endpoint}?${params.toString()}`,
    );
  }
}
