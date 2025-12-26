import {type Client } from "../models/Client";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class ClientsService {
    private endPoint = "/clients/";

    async getAll(): Promise<ApiResponse<PaginatedResponse<Client>>> {
        return await http.get<PaginatedResponse<Client>>(this.endPoint)
    }
}