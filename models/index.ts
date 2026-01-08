// Export all models from individual files
export * from "./Client";
export * from "./Service";
export * from "./Role";
export * from "./EUser";
export * from "./TicketPriority";
export * from "./Program";
export * from "./SubProgram";
export * from "./ClosingCode";
export * from "./ANS";
export * from "./User";
export * from "./Status";
export * from "./Ticket";
export * from "./ReportedTime";
export * from "./Notes";

// Legacy type definitions (for backward compatibility)
// These can be removed once all views are migrated to use the new models
export type Priority = "low" | "medium" | "high" | "urgent";
export type TicketType = "bug" | "feature" | "task" | "improvement";
export type TicketStatus =
  | "backlog"
  | "todo"
  | "in-progress"
  | "in-review"
  | "done";

export interface LegacyTicket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  priority: Priority;
  status: TicketStatus;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  } | null;
  reporter: {
    name: string;
    avatar: string;
    initials: string;
  };
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  project: string;
  labels: string[];
  comments: number;
  timeTracked: number;
  timeEstimate: number;
  ans?: string;
  tiempoEspera?: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  lead: {
    name: string;
    avatar: string;
  };
  members: number;
  tickets: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: "admin" | "developer" | "designer" | "qa" | "manager";
  status: "active" | "inactive";
  joinedAt: Date;
  assignedTickets: number;
  completedTickets: number;
}

export interface TimeEntry {
  id: string;
  ticketId: string;
  ticketTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  description: string;
  duration: number;
  date: Date;
  startTime?: Date;
  endTime?: Date;
}
