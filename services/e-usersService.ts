import { type EUser } from "../models/EUser";
import {
  type MetricasCumplimiento,
  type MetricasOcupacion,
} from "../models/Metricas";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class eUsersService {
  private endPoint = "/eusers/";

  async GetEUsersByNetworkUser(
    networkUser: string,
  ): Promise<ApiResponse<EUser>> {
    return await http.get<EUser>(`/eusers/${networkUser}/`);
  }

  async getAllPaginated(
    page: number,
    pageSize: number,
    activo: boolean = true,
  ): Promise<ApiResponse<PaginatedResponse<EUser>>> {
    return await http.get<PaginatedResponse<EUser>>(
      `${this.endPoint}?page=${page}&page_size=${pageSize}&activo=${activo}`,
    );
  }

  async getAll(
    search?: string,
    activo: boolean = true,
  ): Promise<ApiResponse<PaginatedResponse<EUser>>> {
    const params = new URLSearchParams();
    params.append("activo", activo.toString());
    if (search && search.trim().length > 0) {
      params.append("search", search.trim());
    }

    const queryString = params.toString();
    const endpoint = queryString ? `${this.endPoint}?${queryString}` : this.endPoint;

    return await http.get<PaginatedResponse<EUser>>(endpoint);
  }

  async create(eUser: EUser): Promise<ApiResponse<EUser>> {
    return await http.post<EUser>(this.endPoint, eUser);
  }

  async update(eUser: EUser, id: string): Promise<ApiResponse<EUser>> {
    return await http.put<EUser>(`${this.endPoint + id}/`, eUser);
  }

  async delete(id: string): Promise<ApiResponse<EUser>> {
    return await http.delete<EUser>(this.endPoint + id + "/");
  }

  async getMetricasCumplimiento(
    networkUser: string,
    fechaDesde?: string,
    fechaHasta?: string,
  ): Promise<ApiResponse<MetricasCumplimiento>> {
    const params = new URLSearchParams();
    params.append("network_user", networkUser);
    if (fechaDesde) params.append("fecha_desde", fechaDesde);
    if (fechaHasta) params.append("fecha_hasta", fechaHasta);

    return await http.get<MetricasCumplimiento>(
      `/eusers/metricas-cumplimiento/?${params.toString()}`,
    );
  }

  async getMetricasOcupacion(
    networkUser: string,
    fechaDesde?: string,
    fechaHasta?: string,
  ): Promise<ApiResponse<MetricasOcupacion>> {
    const params = new URLSearchParams();
    params.append("network_user", networkUser);
    if (fechaDesde) params.append("fecha_desde", fechaDesde);
    if (fechaHasta) params.append("fecha_hasta", fechaHasta);

    return await http.get<MetricasOcupacion>(
      `/eusers/metricas-ocupacion/?${params.toString()}`,
    );
  }
}
