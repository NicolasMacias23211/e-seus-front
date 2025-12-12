export interface ReportedTime {
  idReportedTimes: number;
  dateReported: Date;
  reportedTime: string; // TIME from MySQL as string (HH:MM:SS)
  idTicket: number;
  createAt: Date;
  updateAt: Date | null;
}
