import type { WorkingHours } from "../models/WorkingHours";

/**
 * Tipo que representa el estado del ANS de un ticket
 * - normal: ANS en tiempo o no iniciado
 * - critical: Se acerca el vencimiento ANS (70% completado)
 * - expired: Ya se venció el ANS
 */
export type AnsStatus = "normal" | "critical" | "expired";

/**
 * Clase para calcular las horas laborales transcurridas entre dos fechas
 * considerando el horario laboral configurado y días festivos
 */
export class AnsTimeCalculator {
  private workingHours: WorkingHours[];
  private holidays: string[];
  private daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  constructor(workingHours: WorkingHours[], holidays: string[]) {
    this.workingHours = workingHours;
    this.holidays = holidays;
  }

  /**
   * Calcula las horas laborales entre la fecha de creación y la fecha actual
   * Devuelve [horas, minutos]
   */
  public calculateElapsedTime(dateCreation: string | null): [number, number] {
    if (!dateCreation) return [0, 0];

    let currentIterationDate: Date | null = new Date(dateCreation);
    const now = new Date();
    let elapsedHours = 0;

    while (currentIterationDate.getTime() < now.getTime()) {
      const endTime = this.setTimes(currentIterationDate, false);
      
      if (endTime && endTime.getTime() < now.getTime()) {
        elapsedHours += (endTime.getTime() - currentIterationDate.getTime()) / (1000 * 60 * 60);
        currentIterationDate = this.setTimes(this.nextWorkingDay(currentIterationDate), true);
        if (!currentIterationDate) return [0, 0];
        continue;
      }
      
      elapsedHours += (now.getTime() - currentIterationDate.getTime()) / (1000 * 60 * 60);
      break;
    }

    const hours = Math.floor(elapsedHours);
    const minutes = Math.round((elapsedHours - hours) * 60);
    return [hours, minutes];
  }

  /**
   * Determina si el ticket está crítico (70% del ANS) o vencido
   * Para ANS "Programado":
   *  - Sin fecha estimada de cierre → siempre "normal"
   *  - Con fecha estimada → "expired" si ya pasó, "critical" si el tiempo
   *    transcurrido desde la creación supera el 70% del lapso total
   */
  public getAnsStatus(
    ticket: { 
      create_at: string; 
      estimated_closing_date: string | null; 
      ans?: string;
    },
    ansName: string
  ): AnsStatus {
    // ANS Programado: la proximidad se mide contra la fecha estimada
    if (ansName === "Programado") {
      return this.getProgramadoStatus(ticket);
    }

    const [hours, minutes] = this.calculateElapsedTime(ticket.create_at);
    const elapsedTime = hours + (minutes / 60);

    // Verificar si está vencido por fecha estimada
    if (ticket.estimated_closing_date) {
      const estimatedDate = new Date(ticket.estimated_closing_date);
      if (new Date() >= estimatedDate) {
        return "expired";
      }
    }

    // ANS numérico
    const ansNumber = parseInt(ansName);
    if (isNaN(ansNumber)) return "normal";

    // Verificar si está vencido por ANS
    if (elapsedTime >= ansNumber) {
      return "expired";
    }

    // Verificar si está crítico (70% del ANS)
    const criticalTimeLimit = ansNumber * 0.7;
    if (elapsedTime >= criticalTimeLimit) {
      return "critical";
    }

    return "normal";
  }

  /**
   * ANS "Programado": evalúa proximidad/vencimiento contra la fecha
   * estimada de cierre. Sin fecha → siempre normal (blanco).
   */
  private getProgramadoStatus(ticket: {
    create_at: string;
    estimated_closing_date: string | null;
  }): AnsStatus {
    if (!ticket.estimated_closing_date) {
      return "normal";
    }

    const now = new Date();
    const estimatedDate = new Date(ticket.estimated_closing_date);

    // Ya venció la fecha estimada
    if (now.getTime() >= estimatedDate.getTime()) {
      return "expired";
    }

    // Crítico si se ha recorrido el 70% del lapso creación → fecha estimada
    const createdAt = new Date(ticket.create_at);
    const totalSpan = estimatedDate.getTime() - createdAt.getTime();
    const elapsed = now.getTime() - createdAt.getTime();

    // Lapso inválido (fecha estimada antes de la creación) → se considera crítico
    if (totalSpan <= 0) {
      return "critical";
    }

    return elapsed >= totalSpan * 0.7 ? "critical" : "normal";
  }

  /**
   * Obtiene [horas, minutos] e isExpired/isCritical para compatibilidad
   */
  public getDetailedStatus(ticket: { 
    create_at: string; 
    estimated_closing_date: string | null; 
    ans?: string;
  }, ansName: string): {
    hours: number;
    minutes: number;
    isCritical: boolean;
    isExpired: boolean;
  } {
    const [hours, minutes] = this.calculateElapsedTime(ticket.create_at);
    const elapsedTime = hours + (minutes / 60);
    let isCritical = false;
    let isExpired = false;

    // ANS Programado: proximidad medida contra la fecha estimada
    if (ansName === "Programado") {
      const status = this.getProgramadoStatus(ticket);
      return {
        hours,
        minutes,
        isCritical: status === "critical",
        isExpired: status === "expired",
      };
    }

    if (ticket.estimated_closing_date) {
      const estimatedDate = new Date(ticket.estimated_closing_date);
      if (new Date() >= estimatedDate) {
        isExpired = true;
      }
    }

    if (!isExpired) {
      const ansNumber = parseInt(ansName);
      if (!isNaN(ansNumber)) {
        if (elapsedTime >= ansNumber) {
          isExpired = true;
        } else if (elapsedTime >= ansNumber * 0.7) {
          isCritical = true;
        }
      }
    }

    return { hours, minutes, isCritical, isExpired };
  }

  private setTimes(date: Date, isInitial: boolean): Date | null {
    try {
      const dayOfWeek = this.daysWeek[date.getDay()];
      const workingDay = this.workingHours.find(element => element.week_day === dayOfWeek);
      
      if (workingDay && workingDay.start_time && isInitial) {
        return this.combineDateAndTime(date, workingDay.start_time);
      }
      if (workingDay && workingDay.end_time && !isInitial) {
        return this.combineDateAndTime(date, workingDay.end_time);
      }
      
      return date;
    } catch (error) {
      console.error("Error setting times:", error);
      return null;
    }
  }

  private combineDateAndTime(date: Date, timeStr: string): Date {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    return newDate;
  }

  private isWorkingDay(date: Date): boolean {
    if (this.holidays.includes(date.toISOString().split('T')[0])) {
      return false;
    }
    return this.workingHours.some(element => {
      return element.week_day === this.daysWeek[date.getDay()];
    });
  }

  private nextWorkingDay(date: Date): Date {
    const result = new Date(date);
    do {
      result.setDate(result.getDate() + 1);
    } while (!this.isWorkingDay(result));
    return result;
  }
}
