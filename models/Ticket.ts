export interface Ticket {
  idTicket: number;
  ticketTitle: string;
  ticketDescription: string;
  ticketAttachments: string | null;
  ticketService: number;
  ticketPriority: string;
  ticketClosingCode: number | null;
  ticketAns: number;
  reporterUser: string;
  createAt: Date;
  updateAt: Date | null;
  assignedTo: string | null;
  closingDate: Date | null;
  estimatedClosingDate: Date | null;
  statusId: number;
  subProgramName: string;
}
