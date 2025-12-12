export interface Comment {
  idComment: number;
  comment: string;
  createAt: Date;
  updateAt: Date | null;
  idTicket: number;
}
