import { type Service } from "../models/Service";
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class RequestTypeService {
  private endPoint = "/services/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Service>>> {
    return await http.get<PaginatedResponse<Service>>(this.endPoint);
  }

  async create(service: Service): Promise<ApiResponse<Service>> {
    return await http.post<Service>(this.endPoint, service);
  }

  async update(service: Service, id: number): Promise<ApiResponse<Service>> {
    return await http.put<Service>(`${this.endPoint + id}/`, service);
  }

  async delete(id: number): Promise<ApiResponse<Service>> {
    return await http.delete<Service>(this.endPoint + id + "/");
  }
}