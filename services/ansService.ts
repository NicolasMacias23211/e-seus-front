// Servicio para gestionar ANS (Acuerdo de Nivel de Servicio)
import { http, type ApiResponse } from "./http";
import type { ANS } from "../models/ANS";

export class AnsService {
  private endpoint = "/ans";

  /**
   * Obtener todos los ANS
   */
  async getAll(): Promise<ApiResponse<ANS[]>> {
    return await http.get<ANS[]>(this.endpoint);
  }

  /**
   * Obtener un ANS por ID
   */
  async getById(id: number): Promise<ApiResponse<ANS>> {
    return await http.get<ANS>(`${this.endpoint}/${id}`);
  }

  /**
   * Crear un nuevo ANS
   */
  async create(ans: Omit<ANS, "idAns">): Promise<ApiResponse<ANS>> {
    return await http.post<ANS>(this.endpoint, ans);
  }

  /**
   * Actualizar un ANS existente
   */
  async update(id: number, ans: Partial<ANS>): Promise<ApiResponse<ANS>> {
    return await http.put<ANS>(`${this.endpoint}/${id}`, ans);
  }

  /**
   * Eliminar un ANS
   */
  async delete(id: number): Promise<ApiResponse<void>> {
    return await http.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Buscar ANS por nombre
   */
  async searchByName(name: string): Promise<ApiResponse<ANS[]>> {
    return await http.get<ANS[]>(
      `${this.endpoint}/search?name=${encodeURIComponent(name)}`
    );
  }
}

// Exportar instancia única del servicio
export const ansService = new AnsService();
