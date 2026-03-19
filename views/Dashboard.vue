<template>
  <div class="flex h-screen overflow-hidden">
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-y-auto bg-slate-50">
        <div class="p-6 space-y-6">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
              >
                <LayoutDashboard class="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-[#021C7D]">
                  Dashboard Personal
                </h1>
                <p class="text-xs text-slate-500">
                  Seguimiento de tus tickets y actividad personal
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="stat in stats"
              :key="stat.title"
              class="bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div :class="['p-3 rounded-xl', stat.bgColor]">
                    <component
                      :is="stat.icon"
                      :class="['h-6 w-6', stat.iconColor]"
                    />
                  </div>
                  <span
                    :class="[
                      'text-xs font-semibold px-2 py-1 rounded-full',
                      stat.badgeColor,
                    ]"
                  >
                    {{ stat.badge }}
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600 mb-1">
                    {{ stat.title }}
                  </p>
                  <p class="text-3xl font-bold text-[#021C7D] mb-2">
                    {{ stat.value }}
                  </p>
                  <div class="flex items-center gap-2">
                    <span :class="['text-xs font-semibold', stat.trendColor]">
                      {{ stat.trend }}
                    </span>
                    <span class="text-xs text-slate-500">{{
                      stat.change
                    }}</span>
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'h-1',
                  stat.barColor,
                  'transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-95',
                ]"
              ></div>
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <div class="bg-white rounded-xl border-2 shadow-sm">
              <div class="p-6 border-b flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-semibold text-[#021C7D]">
                    Mis Tickets
                  </h2>
                  <p class="text-xs text-slate-500 mt-1">
                    Asignados a ti actualmente
                  </p>
                </div>
                <button
                  class="text-[#50bdeb] hover:text-[#021C7D] text-sm font-medium transition-colors"
                  @click="goToBoard"
                >
                  Ver todos →
                </button>
              </div>
              <div class="p-4 space-y-2">
                <div
                  v-for="ticket in myTickets"
                  :key="ticket.id_ticket"
                  class="flex items-center gap-4 p-4 rounded-xl border-2 hover:border-[#50bdeb] hover:shadow-md cursor-pointer transition-all duration-200 group"
                >
                  <div
                    :class="[
                      'p-2.5 rounded-lg',
                      getServiceStyle(ticket.service_name).bgColor,
                    ]"
                  >
                    <component
                      :is="getServiceStyle(ticket.service_name).icon"
                      :class="[
                        'h-5 w-5',
                        getServiceStyle(ticket.service_name).color,
                      ]"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="font-semibold text-sm truncate text-[#021C7D] group-hover:text-[#50bdeb] transition-colors"
                    >
                      {{ ticket.ticket_title }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs text-slate-500 font-medium"
                        >Ticket #{{ ticket.id_ticket }}</span
                      >
                      <span class="text-xs text-slate-400">•</span>
                      <span class="text-xs text-slate-500">{{
                        ticket.sub_program_name
                      }}</span>
                    </div>
                  </div>
                  <span
                    :class="[
                      'text-xs px-3 py-1.5 rounded-full font-semibold',
                      priorityConfig[
                        ticket.priority_name as keyof typeof priorityConfig
                      ].color,
                    ]"
                  >
                    {{
                      priorityConfig[
                        ticket.priority_name as keyof typeof priorityConfig
                      ].label
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl border-2 shadow-sm">
              <div class="p-6 border-b">
                <div>
                  <h2 class="text-lg font-semibold text-[#021C7D]">
                    Actividad Reciente
                  </h2>
                  <p class="text-xs text-slate-500 mt-1">
                    Últimas actualizaciones del equipo
                  </p>
                </div>
              </div>
              <div class="p-4 space-y-3">
                <div
                  v-if="recentActivity.length === 0"
                  class="flex flex-col items-center justify-center py-8 text-slate-400"
                >
                  <Clock class="h-8 w-8 mb-2 opacity-40" />
                  <p class="text-sm">Sin actividad reciente</p>
                </div>
                <div
                  v-for="activity in recentActivity"
                  :key="activity.id"
                  class="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div
                    class="h-10 w-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 shadow-md"
                  >
                    {{ activity.userInitials }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm leading-relaxed">
                      <span class="font-semibold text-[#021C7D]">{{
                        activity.user
                      }}</span>
                      <span class="text-slate-600">
                        &nbsp;{{ activity.action }}&nbsp;
                      </span>
                      <span class="font-semibold text-[#50bdeb]">{{
                        activity.ticket
                      }}</span>
                    </p>
                    <p
                      v-if="activity.note_preview"
                      class="text-xs text-slate-500 mt-0.5 line-clamp-1 italic"
                    >
                      "{{ activity.note_preview }}"
                    </p>
                    <div class="flex items-center gap-2 mt-1.5">
                      <Clock class="h-3 w-3 text-slate-400" />
                      <p class="text-xs text-slate-500">{{ activity.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  LayoutGrid,
  AlertCircle,
  Clock,
  CheckCircle,
  Zap,
  Wrench,
  LayoutDashboard,
} from "lucide-vue-next";
import type { TicketShort } from "../models";
import type { DashboardStatsData } from "../models/Metricas";
import type { RecentActivityItem } from "../models/Notes";
import { SessionStorageService } from "../services/SessionStorageService";
import type { UserInfo } from "../models/login";
import { TicketsService } from "../services/ticketsService";
import { NotesService } from "../services/notesService";
import { useNotification } from "../utils/useNotification";
import { timeAgo } from "../utils/Date";
import { useRouter } from "vue-router";

const router = useRouter();
const notification = useNotification();
const TicketService = new TicketsService();
const notesService = new NotesService();
const SessionStorageServiceInstance = new SessionStorageService();
const CurrentUserInfo: UserInfo =
  SessionStorageServiceInstance.getUserInfo() || {
    username: "",
    full_name: "",
    email: "",
    position: "",
    document: 0,
  };
const Tickets = ref<TicketShort[]>([]);
const recentActivityRaw = ref<RecentActivityItem[]>([]);
const statsData = ref<DashboardStatsData>({
  assigned: 0,
  in_progress: 0,
  completed_this_month: 0,
  overdue: 0,
  completed_vs_last_month: 0,
});

const loadRecentActivity = async () => {
  if (CurrentUserInfo.username === "") return;
  try {
    const response = await notesService.getRecentActivity(5);
    if (response.data?.data) {
      recentActivityRaw.value = response.data.data;
    }
  } catch {
    notification.error("Error", "No se pudo cargar la actividad reciente");
  }
};

const loadDashboardStats = async () => {
  if (CurrentUserInfo.username === "") return;
  try {
    const response = await TicketService.getDashboardStats();
    if (response.data?.data) {
      statsData.value = response.data.data;
    }
  } catch {
    notification.error("Error", "No se pudieron cargar las estadísticas");
  }
};

const loadTickets = async () => {
  if (CurrentUserInfo.username === "") {
    return;
  }
  try {
    const response = await TicketService.GetTicketsByPerson(
      CurrentUserInfo.username,
    );
    if (response.data && response.data.results) {
      Tickets.value = response.data.results.flat();
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los tickets");
  }
};

const stats = computed(() => {
  const delta = statsData.value.completed_vs_last_month;
  const deltaLabel = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : "";
  const deltaColor =
    delta > 0
      ? "text-green-600"
      : delta < 0
        ? "text-red-600"
        : "text-slate-500";
  return [
    {
      title: "Tickets Asignados",
      value: statsData.value.assigned,
      change: "tickets activos",
      trend: "Total",
      trendColor: "text-blue-600",
      badge: "Tuyos",
      badgeColor: "bg-blue-100 text-blue-700",
      icon: LayoutGrid,
      bgColor: "bg-blue-50",
      iconColor: "text-[#50bdeb]",
      barColor: "bg-gradient-to-r from-[#021C7D] to-[#50bdeb]",
    },
    {
      title: "En Progreso",
      value: statsData.value.in_progress,
      change: "tickets trabajando",
      trend: "Activo",
      trendColor: "text-amber-600",
      badge: "Trabajando",
      badgeColor: "bg-amber-100 text-amber-700",
      icon: Clock,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
      barColor: "bg-gradient-to-r from-amber-400 to-amber-600",
    },
    {
      title: "Completados",
      value: statsData.value.completed_this_month,
      change: "este mes",
      trend: deltaLabel,
      trendColor: deltaColor,
      badge: "Éxito",
      badgeColor: "bg-green-100 text-green-700",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      barColor: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      title: "Vencidos",
      value: statsData.value.overdue,
      change: "no cerrados a tiempo",
      trend: statsData.value.overdue > 0 ? "Atención" : "Al día",
      trendColor:
        statsData.value.overdue > 0 ? "text-red-600" : "text-green-600",
      badge: "No completados",
      badgeColor: "bg-red-100 text-red-700",
      icon: AlertCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      barColor: "bg-gradient-to-r from-red-400 to-red-600",
    },
  ];
});

const myTickets = computed(() =>
  Tickets.value.filter((t) => t.assigned_to).slice(0, 5),
);

const recentActivity = computed(() =>
  recentActivityRaw.value.map((item) => ({
    id: item.id_note,
    user: item.full_name,
    userInitials: item.full_name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join(""),
    action: "comentó en ",
    ticket: item.ticket_title,
    note_preview: item.note_preview,
    time: timeAgo(item.create_at),
  })),
);

const priorityConfig = {
  Baja: { color: "bg-gray-100 text-gray-700", label: "Baja" },
  Media: { color: "bg-blue-100 text-blue-700", label: "Media" },
  Alta: { color: "bg-orange-100 text-orange-700", label: "Alta" },
  Urgente: { color: "bg-red-100 text-red-700", label: "Urgente" },
};

const serviceStylePalette = [
  { icon: Zap, color: "text-[#50bdeb]", bgColor: "bg-blue-50" },
  { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-50" },
  { icon: Wrench, color: "text-amber-500", bgColor: "bg-amber-50" },
  { icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
];

const getServiceStyle = (serviceName: string) => {
  if (!serviceName) return serviceStylePalette[0];
  const name = serviceName.toLowerCase();
  if (
    name.includes("bug") ||
    name.includes("error") ||
    name.includes("incidente") ||
    name.includes("fallo")
  )
    return serviceStylePalette[3];
  if (
    name.includes("nuevo") ||
    name.includes("nueva") ||
    name.includes("funcionalidad") ||
    name.includes("desarrollo")
  )
    return serviceStylePalette[0];
  if (
    name.includes("mejora") ||
    name.includes("optimiz") ||
    name.includes("mantenimiento") ||
    name.includes("soporte")
  )
    return serviceStylePalette[2];
  const hash = Array.from(serviceName).reduce(
    (acc, c) => (acc * 31 + c.charCodeAt(0)) % serviceStylePalette.length,
    0,
  );
  return serviceStylePalette[Math.abs(hash)];
};

function goToBoard() {
  router.push("/board");
}

onMounted(() => {
  loadTickets();
  loadDashboardStats();
  loadRecentActivity();
});
</script>
