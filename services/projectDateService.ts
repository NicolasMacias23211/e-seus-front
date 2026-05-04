import { http, type ApiResponse } from "./http";
import type { ProjectDateRequest, ProjectDateResponse } from "../models";

export class ProjectDateService {
  private endPoint = "/project-date/calculate-date/"
  /**
   * Calcula la fecha estimada de cierre basada en el ANS y la fecha de creación
   * @param ans - ANS en horas (número entero)
   * @param dateCreation - Fecha de creación del ticket en formato ISO
   * @returns Fecha estimada de cierre
   */
  async calculateDate(
    ans: number,
    dateCreation: string,
  ): Promise<ApiResponse<ProjectDateResponse>> {
    const requestData: ProjectDateRequest = {
      ans,
      date_creation: dateCreation,
    };

    return await http.post<ProjectDateResponse, ProjectDateRequest>(this.endPoint, requestData);
  }
}
