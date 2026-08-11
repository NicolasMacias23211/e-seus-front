import { type Client } from "../models/Client";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class ClientsService {
    private endpoint = "/clients/";

    async getAll(): Promise<ApiResponse<PaginatedResponse<Client>>> {
        return await http.get<PaginatedResponse<Client>>(this.endpoint)
    }

    async getAllPaginated(
        page: number,
        pageSize: number,
    ): Promise<ApiResponse<PaginatedResponse<Client>>> {
        return await http.get<PaginatedResponse<Client>>(
            `${this.endpoint}?page=${page}&page_size=${pageSize}`,
        );
    }
    
    async create(client: Client): Promise<ApiResponse<Client>> {
        return await http.post<Client>(this.endpoint, client);
      }
    
    async update(client: Client, client_name: string): Promise<ApiResponse<Client>> {
      return await http.put<Client>(`${this.endpoint + client_name}/`, client);
    }

    async delete(client_name: string): Promise<ApiResponse<Client>> {
      return await http.delete<Client>(this.endpoint + client_name + "/");
    }
}