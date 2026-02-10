import { http, type ApiResponse } from "./http";
import type { ProjectDateRequest, ProjectDateResponse } from "../models";

export class ProjectDateService {
  /**
   * Calcula la fecha estimada de cierre basada en el ANS y la fecha de creación
   * @param ans - ANS en horas (número entero)
   * @param dateCreation - Fecha de creación del ticket en formato ISO
   * @returns Fecha estimada de cierre
   */
  async findProjectDate(
    ans: number,
    dateCreation: string,
  ): Promise<ApiResponse<ProjectDateResponse>> {
    const requestData: ProjectDateRequest = {
      ans,
      date_creation: dateCreation,
    };

    return await http.post<ProjectDateResponse, ProjectDateRequest>(
      "/project-date/findProjectDate/",
      requestData,
    );
  }
}
