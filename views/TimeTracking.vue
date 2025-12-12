<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Clock class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Seguimiento de Tiempo
          </h1>
          <p class="text-xs text-slate-500">
            Registra y analiza el tiempo dedicado a tus tareas
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="previousWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all"
        >
          <ChevronLeft class="w-5 h-5 text-slate-600" />
        </button>
        <div class="text-center px-4">
          <p class="text-sm font-bold text-[#021C7D]">{{ currentWeekLabel }}</p>
          <p class="text-xs text-slate-500">{{ currentYearLabel }}</p>
        </div>
        <button
          @click="nextWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all"
        >
          <ChevronRight class="w-5 h-5 text-slate-600" />
        </button>
        <button
          @click="goToToday"
          class="px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold text-sm transition-all duration-200"
        >
          Hoy
        </button>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <div class="grid grid-cols-6 border-b-2 bg-slate-50">
        <div class="p-4 border-r-2">
          <p class="text-xs font-bold text-slate-600 uppercase">Tareas</p>
          <br />
          <button
            @click="saveTimeEntries"
            class="px-6 py-3 m-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2"
          >
            <Save class="w-5 h-5" />
            Guardar Tiempos
          </button>
        </div>
        <div
          v-for="day in weekDays"
          :key="day.date"
          class="p-4 text-center border-r-2 last:border-r-0"
          :class="{ 'bg-blue-50': day.isToday }"
        >
          <p
            class="text-xs font-bold uppercase mb-1"
            :class="day.isToday ? 'text-[#50bdeb]' : 'text-slate-600'"
          >
            {{ day.dayName }}
          </p>
          <p
            class="text-2xl font-bold mb-1"
            :class="day.isToday ? 'text-[#021C7D]' : 'text-slate-700'"
          >
            {{ day.dayNumber }}
          </p>
          <p class="text-xs text-slate-500">{{ day.month }}</p>
          <div class="mt-2 pt-2 border-t">
            <p class="text-sm font-bold text-[#021C7D]">
              {{ day.date ? getDayTotal(day.date) : "0h" }}
            </p>
            <p class="text-xs text-slate-500">
              of {{ day.date ? getTotalExpected(day.date) : "8" }}h
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 min-h-[500px]">
        <div class="border-r-2 bg-slate-50/50 p-3">
          <div class="space-y-2">
            <p class="text-xs font-bold text-slate-600 uppercase mb-3">
              Tickets disponibles
            </p>
            <div
              v-for="ticket in availableTickets"
              :key="ticket.idTicket"
              draggable="true"
              @dragstart="handleDragStart($event, ticket)"
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 cursor-move hover:border-[#50bdeb] hover:shadow-md transition-all"
            >
              <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <p class="text-xs font-bold text-[#50bdeb]">
                  {{ ticket.idTicket }}
                </p>
              </div>
              <p class="text-xs text-slate-700 font-medium line-clamp-2">
                {{ ticket.ticketTitle }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="day in weekDays"
          :key="day.date"
          class="border-r-2 last:border-r-0 p-3 space-y-2"
          :class="{ 'bg-blue-50/20': day.isToday }"
          @dragover.prevent
          @drop="handleDrop($event, day.date)"
        >
          <div
            v-for="entry in getEntriesForDay(day.date)"
            :key="entry.id"
            class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 hover:border-[#50bdeb] hover:shadow-md transition-all group relative"
          >
            <button
              @click="removeEntry(entry.id)"
              class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold"
            >
              ×
            </button>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <p class="text-xs font-bold text-[#50bdeb]">
                {{ entry.ticketId }}
              </p>
            </div>
            <p class="text-xs text-slate-700 font-medium mb-3 line-clamp-2">
              {{ entry.ticketTitle }}
            </p>
            <div class="flex items-center gap-2">
              <input
                v-model.number="entry.hours"
                type="number"
                min="0"
                max="24"
                placeholder="0"
                class="w-12 px-2 py-1.5 border-2 border-slate-200 rounded-lg text-center text-sm font-bold text-[#021C7D] focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
              <span class="text-xs text-slate-600 font-bold">h</span>
              <input
                v-model.number="entry.minutes"
                type="number"
                min="0"
                max="59"
                placeholder="0"
                class="w-12 px-2 py-1.5 border-2 border-slate-200 rounded-lg text-center text-sm font-bold text-[#021C7D] focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
              <span class="text-xs text-slate-600 font-bold">m</span>
            </div>
          </div>

          <button
            @click="showAddModal(day.date)"
            class="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-[#50bdeb] hover:text-[#50bdeb] transition-all text-sm font-medium"
          >
            + Agregar
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-gradient-to-br from-[#021C7D] to-[#50bdeb] rounded-2xl p-8 text-center shadow-lg"
        >
          <div
            class="bg-white/10 backdrop-blur rounded-lg px-4 py-2 inline-block mb-4"
          >
            <p class="text-sm font-semibold text-white/90">Cronómetro</p>
          </div>
          <div
            class="text-7xl font-bold text-white mb-8 font-mono tracking-wider"
          >
            {{ formatTime(currentTime) }}
          </div>
          <div class="flex items-center justify-center gap-4">
            <button
              v-if="!isTracking"
              @click="startTimer"
              class="px-10 py-4 bg-white text-[#021C7D] rounded-xl font-bold hover:bg-slate-100 hover:shadow-xl transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Play class="w-6 h-6" />
              Iniciar
            </button>
            <button
              v-else
              @click="stopTimer"
              class="px-10 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 hover:shadow-xl transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Square class="w-6 h-6" />
              Detener
            </button>
            <button
              @click="resetTimer"
              class="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white/40 text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border-2 shadow-sm p-6">
          <h3
            class="text-lg font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Clock class="w-5 h-5" />
            Registro Manual
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Ticket</label
              >
              <select
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              >
                <option value="">Seleccionar ticket...</option>
                <option
                  v-for="ticket in recentTickets"
                  :key="ticket.idTicket"
                  :value="ticket.idTicket"
                >
                  {{ ticket.idTicket }} - {{ ticket.ticketTitle }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Horas</label
              >
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="0.0"
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Fecha</label
              >
              <input
                type="date"
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
            </div>
            <div class="flex items-end">
              <button
                class="w-full px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-200"
              >
                Registrar Tiempo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-xl border-2 shadow-sm p-6">
          <h3
            class="text-lg font-bold text-[#021C7D] mb-6 flex items-center gap-2"
          >
            <Clock class="w-5 h-5" />
            Tickets Activos
          </h3>
          <div class="space-y-4">
            <div
              v-for="ticket in activeTickets"
              :key="ticket.idTicket"
              class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all border-2 border-transparent hover:border-[#50bdeb] cursor-pointer"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-[#50bdeb] font-bold text-sm">{{
                  ticket.idTicket
                }}</span>
                <span class="text-[#021C7D] font-bold text-lg"
                  >{{ ticket.tracked }}h</span
                >
              </div>
              <p class="text-sm text-slate-700 font-medium mb-3">
                {{ ticket.ticketTitle }}
              </p>
              <div class="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] h-2.5 rounded-full transition-all"
                  :style="{
                    width: `${(ticket.tracked / ticket.estimated) * 100}%`,
                  }"
                />
              </div>
              <div class="text-xs text-slate-500 mt-2 font-medium">
                {{ ticket.tracked }}h / {{ ticket.estimated }}h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import {
  Clock,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Save,
} from "lucide-vue-next";
import type { Ticket } from "../models";
import { useNotification } from "../utils/useNotification";
const notification = useNotification();

const isTracking = ref(false);
const currentTime = ref(0);
const activeTicket = ref<number | null>(null);
let timerInterval: number | null = null;

const currentWeekStart = ref(new Date());
const timeEntryData = ref<Record<string, number>>({});

interface TimeEntry {
  id: string;
  ticketId: number;
  ticketTitle: string;
  date: string;
  hours: number;
  minutes: number;
}

const timeEntries = ref<TimeEntry[]>([
  {
    id: "entry-1",
    ticketId: 101,
    ticketTitle: "Desarrollo de módulo de autenticación",
    date: "2025-11-18",
    hours: 2,
    minutes: 0,
  },
  {
    id: "entry-2",
    ticketId: 102,
    ticketTitle: "Implementación de dark mode en dashboard",
    date: "2025-11-18",
    hours: 1,
    minutes: 30,
  },
  {
    id: "entry-3",
    ticketId: 103,
    ticketTitle: "Optimización de queries de base de datos",
    date: "2025-11-19",
    hours: 3,
    minutes: 15,
  },
]);

// Mock data using Ticket model
const availableTickets = ref<Ticket[]>([
  {
    idTicket: 101,
    ticketTitle: "Desarrollo de módulo de autenticación",
    ticketDescription: "Implementar sistema de autenticación JWT",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user1",
    createAt: new Date("2025-11-15"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-01"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
  },
  {
    idTicket: 102,
    ticketTitle: "Implementación de dark mode en dashboard",
    ticketDescription: "Añadir soporte para tema oscuro",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user3",
    createAt: new Date("2025-11-16"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-11-30"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
  },
  {
    idTicket: 103,
    ticketTitle: "Optimización de queries de base de datos",
    ticketDescription: "Mejorar rendimiento de consultas principales",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "user4",
    createAt: new Date("2025-11-17"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-05"),
    statusId: 2,
    subProgramName: "Cliente Principal B",
  },
  {
    idTicket: 104,
    ticketTitle: "Diseño de nuevos componentes UI",
    ticketDescription: "Crear biblioteca de componentes reutilizables",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user5",
    createAt: new Date("2025-11-18"),
    updateAt: null,
    assignedTo: null,
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-10"),
    statusId: 1,
    subProgramName: "Cliente Principal A",
  },
  {
    idTicket: 105,
    ticketTitle: "Testing y corrección de bugs",
    ticketDescription: "Ejecutar suite de pruebas y corregir errores",
    ticketAttachments: null,
    ticketService: 3,
    ticketPriority: "Urgente",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user1",
    createAt: new Date("2025-11-19"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-11-25"),
    statusId: 2,
    subProgramName: "Cliente Principal C",
  },
]);

let draggedTicket: Ticket | null = null;

// Initialize to current week (Monday)
const initializeWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to Monday
  currentWeekStart.value = new Date(today);
  currentWeekStart.value.setDate(today.getDate() + diff);
  currentWeekStart.value.setHours(0, 0, 0, 0);
};

initializeWeek();

const weekDays = computed(() => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 5; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    const dayName = date
      .toLocaleDateString("es-ES", { weekday: "short" })
      .toUpperCase();
    const dayNumber = date.getDate();
    const month = date
      .toLocaleDateString("es-ES", { month: "short" })
      .toUpperCase();
    const dateStr = date.toISOString().split("T")[0];
    const isToday = date.getTime() === today.getTime();

    days.push({ dayName, dayNumber, month, date: dateStr, isToday });
  }

  return days;
});

const currentWeekLabel = computed(() => {
  const days = weekDays.value;
  if (days.length < 5) return "";
  const start = days[0]!;
  const end = days[4]!;
  return `${start.dayNumber} ${start.month} - ${end.dayNumber} ${end.month}`;
});

const currentYearLabel = computed(() => {
  return currentWeekStart.value.getFullYear().toString();
});

const previousWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7);
};

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7);
};

const goToToday = () => {
  initializeWeek();
};

const getDayTotal = (date: string) => {
  const totalMinutes = timeEntries.value
    .filter((entry) => entry.date === date)
    .reduce((sum, entry) => sum + entry.hours * 60 + entry.minutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h:${minutes}m` : `${hours}h`;
};

const getTotalExpected = (_date: string | undefined) => {
  return "8";
};

const getEntriesForDay = (date: string | undefined) => {
  if (!date) return [];
  return timeEntries.value.filter((entry) => entry.date === date);
};

const handleDragStart = (event: DragEvent, ticket: Ticket) => {
  draggedTicket = ticket;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
  }
};

const handleDrop = (event: DragEvent, date: string | undefined) => {
  event.preventDefault();
  if (!draggedTicket || !date) return;

  const newEntry: TimeEntry = {
    id: `entry-${Date.now()}`,
    ticketId: draggedTicket.idTicket,
    ticketTitle: draggedTicket.ticketTitle,
    date: date,
    hours: 0,
    minutes: 0,
  };

  timeEntries.value.push(newEntry);
  draggedTicket = null;
};

const removeEntry = (entryId: string) => {
  const index = timeEntries.value.findIndex((e) => e.id === entryId);
  if (index > -1) {
    timeEntries.value.splice(index, 1);
  }
};

const showAddModal = (date: string | undefined) => {
  if (!date) return;
  console.log("Show add modal for date:", date);
};

const saveTimeEntries = () => {
  console.log("Guardando tiempos:", timeEntryData.value);
  notification.success("¡Exito!", "El tiempo ha sido registrado correctamente");
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const startTimer = () => {
  isTracking.value = true;
  timerInterval = window.setInterval(() => {
    currentTime.value++;
  }, 1000);
};

const stopTimer = () => {
  isTracking.value = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const resetTimer = () => {
  currentTime.value = 0;
  activeTicket.value = null;
};

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

const recentTickets = ref<Ticket[]>([
  {
    idTicket: 101,
    ticketTitle: "Error en el login",
    ticketDescription: "Corregir error de autenticación",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user1",
    createAt: new Date("2025-11-20"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-11-30"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
  },
  {
    idTicket: 102,
    ticketTitle: "Implementar dark mode",
    ticketDescription: "Añadir tema oscuro a la aplicación",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user3",
    createAt: new Date("2025-11-21"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-05"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
  },
  {
    idTicket: 103,
    ticketTitle: "Optimizar queries",
    ticketDescription: "Mejorar rendimiento de consultas",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "user4",
    createAt: new Date("2025-11-22"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-01"),
    statusId: 2,
    subProgramName: "Cliente Principal B",
  },
]);

interface TicketWithTracking extends Ticket {
  tracked: number;
  estimated: number;
}

const activeTickets = ref<TicketWithTracking[]>([
  {
    idTicket: 101,
    ticketTitle: "Error en el login",
    ticketDescription: "Corregir error de autenticación",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user1",
    createAt: new Date("2025-11-20"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-11-30"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
    tracked: 12,
    estimated: 20,
  },
  {
    idTicket: 102,
    ticketTitle: "Implementar dark mode",
    ticketDescription: "Añadir tema oscuro",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "user3",
    createAt: new Date("2025-11-21"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-05"),
    statusId: 2,
    subProgramName: "Cliente Principal A",
    tracked: 8,
    estimated: 16,
  },
  {
    idTicket: 103,
    ticketTitle: "Optimizar queries",
    ticketDescription: "Mejorar rendimiento",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "user4",
    createAt: new Date("2025-11-22"),
    updateAt: null,
    assignedTo: "user2",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-01"),
    statusId: 2,
    subProgramName: "Cliente Principal B",
    tracked: 15,
    estimated: 24,
  },
]);
</script>
