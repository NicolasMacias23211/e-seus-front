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
            <button
              class="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700 flex items-center gap-2"
            >
              <Download class="h-4 w-4" />
              Exportar
            </button>
            <button
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
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Buscar por ID, título o descripción..."
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
              <option value="highest">🔴 Crítica</option>
              <option value="high">🟠 Alta</option>
              <option value="medium">🟡 Media</option>
              <option value="low">🟢 Baja</option>
              <option value="lowest">⚪ Mínima</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2"
              >Tipo</label
            >
            <select
              v-model="filterType"
              class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent"
            >
              <option value="">Todos los tipos</option>
              <option value="bug">🐛 Bug</option>
              <option value="feature">⚡ Feature</option>
              <option value="task">✅ Task</option>
              <option value="improvement">🔧 Improvement</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-2"
              >Asignación</label
            >
            <select
              v-model="filterAssignee"
              class="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="unassigned">Sin asignar</option>
              <option value="assigned">Asignados</option>
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
        <div v-if="viewMode === 'list'" class="max-w-6xl mx-auto">
          <div
            class="bg-white rounded-lg border border-slate-200 overflow-hidden"
          >
            <div
              class="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wide"
            >
              <div class="col-span-1">ID</div>
              <div class="col-span-4">Título</div>
              <div class="col-span-2">Tipo</div>
              <div class="col-span-2">Prioridad</div>
              <div class="col-span-2">Asignado</div>
              <div class="col-span-1 text-right">Tiempo</div>
            </div>

            <div
              v-for="(ticket, index) in sortedTickets"
              :key="ticket.id"
              :class="[
                'grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100',
                index === sortedTickets.length - 1 ? 'border-b-0' : '',
              ]"
              @click="openTicket(ticket.id)"
            >
              <div class="col-span-1">
                <span class="font-mono text-xs font-semibold text-[#50bdeb]">{{
                  ticket.id
                }}</span>
              </div>

              <div class="col-span-4">
                <div class="flex items-start gap-2">
                  <component
                    :is="getTypeIcon(ticket.type)"
                    :class="[
                      'w-4 h-4 flex-shrink-0 mt-0.5',
                      getTypeColor(ticket.type),
                    ]"
                  />
                  <span
                    class="text-sm font-medium text-slate-800 line-clamp-2"
                    >{{ ticket.title }}</span
                  >
                </div>
              </div>

              <div class="col-span-2">
                <span
                  class="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium"
                >
                  {{ getTypeLabel(ticket.type) }}
                </span>
              </div>

              <div class="col-span-2">
                <span
                  :class="[
                    'text-xs font-semibold px-2.5 py-1 rounded-md border-2',
                    getPriorityClass(ticket.priority),
                  ]"
                >
                  {{ getPriorityLabel(ticket.priority) }}
                </span>
              </div>

              <div class="col-span-2">
                <div v-if="ticket.assignee" class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 rounded-full bg-gradient-to-br from-[#50bdeb] to-[#021C7D] text-white text-xs font-bold flex items-center justify-center"
                  >
                    {{ ticket.assignee.initials }}
                  </div>
                  <span class="text-xs text-slate-600 truncate">{{
                    ticket.assignee.name
                  }}</span>
                </div>
                <span v-else class="text-xs text-slate-400 italic"
                  >Sin asignar</span
                >
              </div>

              <div class="col-span-1 text-right">
                <span class="text-xs text-slate-600 font-medium"
                  >{{ ticket.timeTracked || 0 }}h</span
                >
              </div>
            </div>
          </div>
        </div>

        <div v-else class="max-w-5xl mx-auto space-y-3">
          <TicketCard
            v-for="ticket in sortedTickets"
            :key="ticket.id"
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import TicketCard from "../components/TicketCard.vue";
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
  Zap,
  CheckCircle,
  Wrench,
} from "lucide-vue-next";
import { mockTickets } from "../mock-data";

const router = useRouter();

const searchQuery = ref("");
const filterPriority = ref("");
const filterType = ref("");
const filterAssignee = ref("");
const showFilters = ref(false);
const viewMode = ref<"list" | "card">("list");
const sortBy = ref<"priority" | "created" | "updated" | "title">("priority");

const sortLabels = {
  priority: "Prioridad",
  created: "Fecha creación",
  updated: "Última actualización",
  title: "Título",
};

const backlogTickets = computed(() =>
  mockTickets.filter((t) => t.status === "backlog")
);

const filteredTickets = computed(() => {
  return backlogTickets.value.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (ticket.description &&
        ticket.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()));

    const matchesPriority =
      !filterPriority.value || ticket.priority === filterPriority.value;

    const matchesType = !filterType.value || ticket.type === filterType.value;

    const matchesAssignee =
      !filterAssignee.value ||
      (filterAssignee.value === "unassigned" && !ticket.assignee) ||
      (filterAssignee.value === "assigned" && ticket.assignee);

    return matchesSearch && matchesPriority && matchesType && matchesAssignee;
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
      return tickets.sort(
        (a, b) =>
          (priorityOrder[a.priority] || 999) -
          (priorityOrder[b.priority] || 999)
      );
    case "title":
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    case "created":
    case "updated":
      return tickets.sort((a, b) => b.id.localeCompare(a.id));
    default:
      return tickets;
  }
});

const unassignedCount = computed(
  () => backlogTickets.value.filter((t) => !t.assignee).length
);

const highPriorityCount = computed(
  () =>
    backlogTickets.value.filter((t) => ["highest", "high"].includes(t.priority))
      .length
);

const activeFiltersCount = computed(() => {
  let count = 0;
  if (filterPriority.value) count++;
  if (filterType.value) count++;
  if (filterAssignee.value) count++;
  return count;
});

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
  filterType.value = "";
  filterAssignee.value = "";
  searchQuery.value = "";
};

const openTicket = (ticketId: string) => {
  router.push(`/ticket/${ticketId}`);
};

const getTypeIcon = (type: string) => {
  const icons: Record<string, any> = {
    bug: AlertCircle,
    feature: Zap,
    task: CheckCircle,
    improvement: Wrench,
  };
  return icons[type] || CheckCircle;
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    bug: "text-red-500",
    feature: "text-[#50bdeb]",
    task: "text-green-500",
    improvement: "text-amber-500",
  };
  return colors[type] || "text-slate-500";
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    bug: "Bug",
    feature: "Feature",
    task: "Task",
    improvement: "Improvement",
  };
  return labels[type] || type;
};

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    highest: "bg-red-50 text-red-700 border-red-400",
    high: "bg-orange-50 text-orange-700 border-orange-400",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-400",
    low: "bg-green-50 text-green-700 border-green-400",
    lowest: "bg-slate-50 text-slate-700 border-slate-300",
  };
  return classes[priority] || "bg-slate-50 text-slate-700 border-slate-300";
};

const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    highest: "Crítica",
    high: "Alta",
    medium: "Media",
    low: "Baja",
    lowest: "Mínima",
  };
  return labels[priority] || priority;
};
</script>
