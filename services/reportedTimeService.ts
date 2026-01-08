import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type { ReportedTime } from "../models/ReportedTime";

interface UpdateReportedTimeDto {
  date_reported?: string;
  id_ticket?: number;
  network_user?: string | null;
  reported_time?: string;
}

interface CreateReportedTimeDto {
  date_reported: string;
  id_ticket: number;
  network_user: string;
  reported_time: string;
}

export class ReportedTimeService {
  async getReportedTimes(
    networkUser: string,
    dateAfter: string,
    dateBefore: string
  ): Promise<ApiResponse<PaginatedResponse<ReportedTime>>> {
    return await http.get<PaginatedResponse<ReportedTime>>(
      `/reported-times/?network_user=${networkUser}&date_reported_after=${dateAfter}&date_reported_before=${dateBefore}`
    );
  }

  async updateReportedTime(
    idReportedTime: number,
    data: UpdateReportedTimeDto
  ): Promise<ApiResponse<ReportedTime>> {
    return await http.patch<ReportedTime, UpdateReportedTimeDto>(
      `/reported-times/${idReportedTime}/`,
      data
    );
  }

  async createReportedTime(
    data: CreateReportedTimeDto
  ): Promise<ApiResponse<ReportedTime>> {
    return await http.post<ReportedTime, CreateReportedTimeDto>(
      `/reported-times/`,
      data
    );
  }

  async deleteReportedTime(idReportedTime: number): Promise<ApiResponse<void>> {
    return await http.delete<void>(`/reported-times/${idReportedTime}/`);
  }
}
