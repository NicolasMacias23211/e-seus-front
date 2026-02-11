<template>
  <div class="h-full flex flex-col bg-slate-50">
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
              >
                <Layers class="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-[#021C7D]">Backlog</h1>
                <p class="text-xs text-slate-500">
                  Gestiona y prioriza tickets pendientes
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative">
              <button
                @click="showExportMenu = !showExportMenu"
                class="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700 flex items-center gap-2"
              >
                <Download class="h-4 w-4" />
                Exportar
                <svg
                  class="h-3 w-3 transition-transform"
                  :class="{ 'rotate-180': showExportMenu }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                v-if="showExportMenu"
                @click="showExportMenu = false"
                class="fixed inset-0 z-10"
              ></div>
              <div
                v-if="showExportMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20"
              >
                <ExportToExcel
                  :data="exportData"
                  fileName="backlog_tickets"
                  sheetName="Backlog"
                  title="Reporte de Tickets - Backlog"
                  :excludeFields="['status', 'notes', 'reported_times']"
                  :customHeaders="{
                    id_ticket: 'ID',
                    ticket_title: 'Título',
                    ticket_description: 'Descripción',
                    service_name: 'Servicio',
                    priority_name: 'Prioridad',
                    assigned_to: 'Asignado a',
                    ans_name: 'ANS',
                    create_at: 'Fecha de Creación',
                    update_at: 'Última Actualización',
                    tiempo_reportado: 'Tiempo Reportado',
                  }"
                  :dateFields="['create_at', 'update_at']"
                  buttonClass="w-full px-4 py-2 text-left hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 flex items-center gap-2"
                  @afterExport="showExportMenu = false"
                >
                  <FileSpreadsheet class="h-4 w-4 text-green-600" />
                  Exportar a Excel
                </ExportToExcel>

                <ExportToPDF
                  :data="exportData"
                  fileName="backlog_tickets"
                  title="Reporte de Tickets - Backlog"
                  :excludeFields="['status', 'notes', 'reported_times']"
                  :customHeaders="{
                    id_ticket: 'ID',
                    ticket_title: 'Título',
                    ticket_description: 'Descripción',
                    service_name: 'Servicio',
                    priority_name: 'Prioridad',
                    assigned_to: 'Asignado a',
                    ans_name: 'ANS',
                    create_at: 'Fecha de Creación',
                    update_at: 'Última Actualización',
                    tiempo_reportado: 'Tiempo Reportado',
                  }"
                  :dateFields="['create_at', 'update_at']"
                  orientation="landscape"
                  buttonClass="w-full px-4 py-2 text-left hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 flex items-center gap-2"
                  @afterExport="showExportMenu = false"
                >
                  <FileText class="h-4 w-4 text-red-600" />
                  Exportar a PDF
                </ExportToPDF>
              </div>
            </div>

            <button
              @click="showCreateModal = true"
              class="px-4 py-2 bg-gradient-to-r from-[#50bdeb] to-[#3da8d5] hover:from-[#3da8d5] hover:to-[#2a96c4] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus class="h-4 w-4" />
              Nuevo Ticket
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative flex-1 max-w-md">
            <Search
              v-if="!isLoading"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            />
            <div
              v-else
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
            ></div>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Buscar por ID (ej: 123) o texto (título/descripción)..."
              class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
            />
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="toggleFilters"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                showFilters
                  ? 'bg-[#50bdeb] text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
              ]"
            >
              <Filter class="h-4 w-4" />
              Filtros
              <span
                v-if="activeFiltersCount > 0"
                class="px-1.5 py-0.5 bg-white/20 rounded text-xs"
              >
                {{ activeFiltersCount }}
              </span>
            </button>

            <button
              @click="toggleSort"
              class="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 flex items-center gap-2"
            >
              <ArrowUpDown class="h-4 w-4" />
              {{ sortLabels[sortBy] }}
            </button>

            <button
              @click="toggleView"
              class="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-slate-600"
              :title="
                viewMode === 'list' ? 'Vista de tarjetas' : 'Vista de lista'
              "
            >
              <component
                :is="viewMode === 'list' ? LayoutGrid : List"
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="showFilters"
        class="px-6 py-4 bg-slate-50 border-t border-slate-200"
      >
        <div class="grid grid-cols-4 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2"
              >Prioridad</label
            >
            <select
              v-model="filterPriority"
              class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent"
            >
              <option value="">Todas</option>
              <option
                v-for="priority in priorities"
                :key="priority.priority_name"
                :value="priority.priority_name"
              >
                {{ getPriorityEmoji(priority.priority_name) }}
                {{ priority.priority_name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2"
              >Servicio</label
            >
            <select
              v-model="filterService"
              class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent"
            >
              <option value="">Todos los servicios</option>
              <option
                v-for="service in services"
                :key="service.id_services"
                :value="service.id_services"
              >
                {{ service.service_name }}
              </option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <div class="px-6 py-3 bg-white border-t border-slate-200">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-[#50bdeb] rounded-full"></div>
              <span class="text-slate-600">Total:</span>
              <span class="font-bold text-[#021C7D]">{{
                filteredTickets.length
              }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span class="text-slate-600">Sin asignar:</span>
              <span class="font-bold text-orange-600">{{
                unassignedCount
              }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-500 rounded-full"></div>
              <span class="text-slate-600">Alta prioridad:</span>
              <span class="font-bold text-red-600">{{
                highPriorityCount
              }}</span>
            </div>
          </div>

          <div class="text-xs text-slate-500">
            Mostrando {{ filteredTickets.length }} de
            {{ backlogTickets.length }} tickets
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div class="p-6">
        <!-- Estado de carga -->
        <div v-if="isLoading" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div
              class="w-12 h-12 border-4 border-[#50bdeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"
            ></div>
            <p class="text-slate-600">Cargando tickets...</p>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertCircle class="w-8 h-8 text-red-500" />
            </div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2">
              Error al cargar tickets
            </h3>
            <p class="text-sm text-slate-600 mb-4">{{ error }}</p>
            <button
              @click="loadBacklogTickets"
              class="px-4 py-2 bg-gradient-to-r from-[#50bdeb] to-[#3da8d5] hover:from-[#3da8d5] hover:to-[#2a96c4] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              Reintentar
            </button>
          </div>
        </div>

        <!-- Contenido -->
        <div v-else>
          <div v-if="viewMode === 'list'" class="max-w-6xl mx-auto">
            <div
              class="bg-white rounded-lg border border-slate-200 overflow-hidden"
            >
              <div
                class="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide"
              >
                <div class="col-span-1">ID</div>
                <div class="col-span-3">Título</div>
                <div class="col-span-2">Servicio</div>
                <div class="col-span-2">Prioridad</div>
                <div class="col-span-2">Asignado</div>
                <div class="col-span-1">ANS</div>
                <div class="col-span-1 text-right">Tiempo</div>
              </div>

              <div
                v-for="(ticket, index) in sortedTickets"
                :key="ticket.id_ticket"
                :class="[
                  'grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100',
                  index === sortedTickets.length - 1 ? 'border-b-0' : '',
                ]"
                @click="openTicket(ticket.id_ticket)"
              >
                <div class="col-span-1">
                  <span class="font-mono text-xs font-semibold text-[#50bdeb]">
                    #{{ ticket.id_ticket }}
                  </span>
                </div>

                <div class="col-span-3">
                  <div class="flex items-start gap-2">
                    <span
                      class="text-sm font-medium text-slate-800 line-clamp-2"
                    >
                      {{ ticket.ticket_title }}
                    </span>
                  </div>
                </div>

                <div class="col-span-2">
                  <span
                    class="text-xs text-slate-600 truncate"
                    :title="ticket.service.service_name"
                  >
                    {{ ticket.service.service_name }}
                  </span>
                </div>

                <div class="col-span-2">
                  <span
                    :class="[
                      'text-xs font-semibold px-2.5 py-1 rounded-md border-2',
                      getPriorityClass(ticket.priority.priority_name),
                    ]"
                  >
                    {{ getPriorityLabel(ticket.priority.priority_name) }}
                  </span>
                </div>

                <div class="col-span-2">
                  <div
                    v-if="ticket.assigned_to"
                    class="flex items-center gap-2"
                  >
                    <div
                      class="w-6 h-6 rounded-full bg-gradient-to-br from-[#50bdeb] to-[#021C7D] text-white text-xs font-bold flex items-center justify-center"
                    >
                      {{ ticket.assigned_to.substring(0, 2).toUpperCase() }}
                    </div>
                    <span class="text-xs text-slate-600 truncate">
                      {{ ticket.assigned_to }}
                    </span>
                  </div>
                  <span v-else class="text-xs text-slate-400 italic">
                    Sin asignar
                  </span>
                </div>

                <div class="col-span-1">
                  <span
                    class="text-xs text-slate-600"
                    :title="ticket.ans.ans_description || ''"
                  >
                    {{ ticket.ans.ans_name }}
                  </span>
                </div>

                <div class="col-span-1 text-right">
                  <span class="text-xs text-slate-600 font-medium">
                    {{ getTotalReportedTime(ticket) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="max-w-5xl mx-auto space-y-3">
            <TicketCard
              v-for="ticket in sortedTickets"
              :key="ticket.id_ticket"
              :ticket="ticket"
            />
          </div>

          <div
            v-if="filteredTickets.length === 0"
            class="flex flex-col items-center justify-center py-16 text-slate-400"
          >
            <div
              class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4"
            >
              <Inbox class="w-10 h-10" />
            </div>
            <h3 class="text-lg font-semibold text-slate-600 mb-2">
              {{
                backlogTickets.length === 0
                  ? "No hay tickets en el backlog"
                  : "No se encontraron resultados"
              }}
            </h3>
            <p class="text-sm text-slate-500 mb-4">
              {{
                backlogTickets.length === 0
                  ? "Comienza creando un nuevo ticket"
                  : "Intenta ajustar los filtros"
              }}
            </p>
            <button
              v-if="backlogTickets.length === 0"
              @click="showCreateModal = true"
              class="px-4 py-2 bg-gradient-to-r from-[#50bdeb] to-[#3da8d5] hover:from-[#3da8d5] hover:to-[#2a96c4] text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus class="h-4 w-4" />
              Crear Ticket
            </button>
            <button
              v-else
              @click="clearFilters"
              class="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium text-slate-700 transition-all"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Crear Ticket -->
    <CreateTicketModal
      v-model="showCreateModal"
      @ticketCreated="handleTicketCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TicketCard from "../components/TicketCard.vue";
import CreateTicketModal from "../components/CreateTicketModal.vue";
import ExportToExcel from "../components/ExportToExcel.vue";
import ExportToPDF from "../components/ExportToPDF.vue";
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Inbox,
  Layers,
  Download,
  LayoutGrid,
  List,
  AlertCircle,
  FileSpreadsheet,
  FileText,
} from "lucide-vue-next";
import type { Ticket } from "../models/Ticket";
import type { Service } from "../models/Service";
import type { TicketPriority } from "../models/TicketPriority";
import type { TicketCreate } from "../models/Ticket";
import { TicketsService } from "../services/ticketsService";
import { RequestTypeService } from "../services/RequestTypeService";
import { TicketPriorityService } from "../services/ticketPriorityService";
import { useNotification } from "../utils/useNotification";

const router = useRouter();
const ticketsService = new TicketsService();
const requestTypeService = new RequestTypeService();
const priorityService = new TicketPriorityService();
const notification = useNotification();

const searchQuery = ref("");
const filterPriority = ref("");
const filterService = ref<number | "">("");
const showFilters = ref(false);
const viewMode = ref<"list" | "card">("list");
const sortBy = ref<"priority" | "created" | "updated" | "title">("priority");
const backlogTickets = ref<Ticket[]>([]);
const services = ref<Service[]>([]);
const priorities = ref<TicketPriority[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const showExportMenu = ref(false);
const showCreateModal = ref(false);

const sortLabels = {
  priority: "Prioridad",
  created: "Fecha creación",
  updated: "Última actualización",
  title: "Título",
};

// Función para cargar servicios
const loadServices = async () => {
  try {
    const response = await requestTypeService.getAll();
    if (response.success && response.data) {
      services.value = response.data.results;
    }
  } catch (err) {
    console.error("Error loading services:", err);
  }
};

// Función para cargar prioridades
const loadPriorities = async () => {
  try {
    const response = await priorityService.getAll();
    if (response.success && response.data) {
      priorities.value = response.data.results;
    }
  } catch (err) {
    console.error("Error loading priorities:", err);
  }
};

// Función para cargar los tickets de backlog
const loadBacklogTickets = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Preparar parámetros de búsqueda
    const searchParams: { search?: string; ticket_id?: string } = {};

    if (searchQuery.value.trim()) {
      // Si el valor es numérico, buscar por ID, sino por título/descripción
      if (/^\d+$/.test(searchQuery.value.trim())) {
        searchParams.ticket_id = searchQuery.value.trim();
      } else {
        searchParams.search = searchQuery.value.trim();
      }
    }

    const response = await ticketsService.getBacklogTickets(searchParams);

    if (response.success && response.data) {
      backlogTickets.value = response.data.results;
    } else {
      error.value = response.message || "Error al cargar los tickets";
    }
  } catch (err) {
    error.value = "Error al conectar con el servidor";
    console.error("Error loading backlog tickets:", err);
  } finally {
    isLoading.value = false;
  }
};

// Cargar tickets al montar el componente
onMounted(() => {
  loadBacklogTickets();
  loadServices();
  loadPriorities();
});

// Watcher para búsqueda con debounce
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    loadBacklogTickets();
  }, 500); // Esperar 500ms después de que el usuario deje de escribir
});

const filteredTickets = computed(() => {
  // La búsqueda por texto/ID ya se hace en el backend
  // Solo filtramos localmente por prioridad, servicio y asignación
  return backlogTickets.value.filter((ticket) => {
    const matchesPriority =
      !filterPriority.value ||
      ticket.priority.priority_name === filterPriority.value;

    const matchesService =
      !filterService.value ||
      ticket.service.id_services === filterService.value;

    return matchesPriority && matchesService;
  });
});

const sortedTickets = computed(() => {
  const tickets = [...filteredTickets.value];

  const priorityOrder: Record<string, number> = {
    highest: 1,
    high: 2,
    medium: 3,
    low: 4,
    lowest: 5,
  };

  switch (sortBy.value) {
    case "priority":
      return tickets.sort((a, b) => {
        const aPriority = getPriorityKey(a.priority.priority_name);
        const bPriority = getPriorityKey(b.priority.priority_name);
        return (
          (priorityOrder[aPriority] || 999) - (priorityOrder[bPriority] || 999)
        );
      });
    case "title":
      return tickets.sort((a, b) =>
        a.ticket_title.localeCompare(b.ticket_title),
      );
    case "created":
      return tickets.sort(
        (a, b) =>
          new Date(b.create_at).getTime() - new Date(a.create_at).getTime(),
      );
    case "updated":
      return tickets.sort(
        (a, b) =>
          new Date(b.update_at).getTime() - new Date(a.update_at).getTime(),
      );
    default:
      return tickets;
  }
});

const unassignedCount = computed(
  () => backlogTickets.value.filter((t) => !t.assigned_to).length,
);

const highPriorityCount = computed(
  () =>
    backlogTickets.value.filter((t) => {
      const priority = getPriorityKey(t.priority.priority_name);
      return ["highest", "high"].includes(priority);
    }).length,
);

const activeFiltersCount = computed(() => {
  let count = 0;
  if (filterPriority.value) count++;
  if (filterService.value) count++;
  return count;
});

// Función para obtener emoji de prioridad
const getPriorityEmoji = (priorityName: string): string => {
  const emojiMap: Record<string, string> = {
    Crítica: "🔴",
    Alta: "🟠",
    Media: "🟡",
    Baja: "🟢",
    Mínima: "⚪",
  };
  return emojiMap[priorityName] || "⚪";
};

// Función para mapear prioridades de la API a las del frontend
const getPriorityKey = (priorityName: string): string => {
  const mapping: Record<string, string> = {
    Crítica: "highest",
    Alta: "high",
    Media: "medium",
    Baja: "low",
    Mínima: "lowest",
  };
  return mapping[priorityName] || "medium";
};

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const toggleView = () => {
  viewMode.value = viewMode.value === "list" ? "card" : "list";
};

const toggleSort = () => {
  const sortOptions: Array<"priority" | "created" | "updated" | "title"> = [
    "priority",
    "created",
    "updated",
    "title",
  ];
  const currentIndex = sortOptions.indexOf(sortBy.value);
  const nextIndex = (currentIndex + 1) % sortOptions.length;
  sortBy.value = sortOptions[nextIndex]!;
};

const clearFilters = () => {
  filterPriority.value = "";
  filterService.value = "";
  searchQuery.value = "";
};

const openTicket = (ticketId: number) => {
  router.push(`/ticket/${ticketId}`);
};

const getPriorityClass = (priorityName: string) => {
  const priority = getPriorityKey(priorityName);
  const classes: Record<string, string> = {
    highest: "bg-red-50 text-red-700 border-red-400",
    high: "bg-orange-50 text-orange-700 border-orange-400",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-400",
    low: "bg-green-50 text-green-700 border-green-400",
    lowest: "bg-slate-50 text-slate-700 border-slate-300",
  };
  return classes[priority] || "bg-slate-50 text-slate-700 border-slate-300";
};

const getPriorityLabel = (priorityName: string) => {
  return priorityName;
};

// Función para calcular tiempo total reportado
const getTotalReportedTime = (ticket: Ticket): string => {
  if (!ticket.reported_times || ticket.reported_times.length === 0) {
    return "0h";
  }

  let totalMinutes = 0;
  ticket.reported_times.forEach((rt) => {
    const [hours, minutes] = rt.reported_time.split(":").map(Number);
    totalMinutes += (hours || 0) * 60 + (minutes || 0);
  });

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

// Preparar datos para exportar
const exportData = computed(() => {
  return filteredTickets.value.map((ticket) => ({
    id_ticket: ticket.id_ticket,
    ticket_title: ticket.ticket_title,
    ticket_description: ticket.ticket_description,
    service_name: ticket.service.service_name,
    priority_name: ticket.priority.priority_name,
    assigned_to: ticket.assigned_to || "Sin asignar",
    ans_name: ticket.ans.ans_name,
    create_at: ticket.create_at,
    update_at: ticket.update_at,
    tiempo_reportado: getTotalReportedTime(ticket),
  }));
});

// Manejar creación de ticket
const handleTicketCreated = async (ticket: TicketCreate) => {
  notification.success(
    "¡Ticket creado!",
    `El ticket "${ticket.ticket_title}" ha sido creado exitosamente`,
  );

  // Recargar la lista de tickets
  await loadBacklogTickets();
};
</script>
