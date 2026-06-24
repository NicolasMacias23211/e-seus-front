import { type User } from '../models/User';
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class UsersService {
    private endPoint = "/users/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<User>>> {
        return await http.get<PaginatedResponse<User>>(this.endPoint)
    }

    async getAllPaginated(
        page: number,
        pageSize: number,
      ): Promise<ApiResponse<PaginatedResponse<User>>> {
        return await http.get<PaginatedResponse<User>>(
          `${this.endPoint}?page=${page}&page_size=${pageSize}`,
        );
      }

    async getByNetworkUser(networkUser: string): Promise<ApiResponse<User>> {
        return await http.get<User>(`${this.endPoint}${encodeURIComponent(networkUser)}/`)
    }

    async create(user: User): Promise<ApiResponse<User>> {
        return await http.post<User>(this.endPoint, user)
    }

    async ensureUserExists(user: User): Promise<ApiResponse<User>> {
        try {
            const existingUser = await this.getByNetworkUser(user.network_user);
            
            if (existingUser.success && existingUser.data) {
                return existingUser;
            }
            
            return await this.create(user);
        } catch (error: any) {
            if (error.status === 404 || error.code === 404) {
                console.log("Usuario no encontrado (404), creando nuevo usuario");
                return await this.create(user);
            }
            throw error;
        }
    }
}
