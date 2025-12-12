export type ConfirmDialogType =
  | "delete"
  | "save"
  | "update"
  | "success"
  | "warning"
  | "info"
  | "error";

export interface ConfirmDialogProps {
  isVisible: boolean;
  type?: ConfirmDialogType;
  title?: string;
  message: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
}
