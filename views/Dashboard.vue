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
                      typeIcons[getTicketTypeByService(ticket.ticket_service)]
                        .bgColor,
                    ]"
                  >
                    <component
                      :is="
                        typeIcons[getTicketTypeByService(ticket.ticket_service)]
                          .icon
                      "
                      :class="[
                        'h-5 w-5',
                        typeIcons[getTicketTypeByService(ticket.ticket_service)]
                          .color,
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
                        ticket.ticket_priority as keyof typeof priorityConfig
                      ].color,
                    ]"
                  >
                    {{
                      priorityConfig[
                        ticket.ticket_priority as keyof typeof priorityConfig
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
                        {{ activity.action }}
                      </span>
                      <span class="font-semibold text-[#50bdeb]">{{
                        activity.ticket
                      }}</span>
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
import { ref, computed } from "vue";
import {
  LayoutGrid,
  AlertCircle,
  Clock,
  CheckCircle,
  Zap,
  Wrench,
  LayoutDashboard,
} from "lucide-vue-next";
import type { Ticket } from "../models";

const mockTickets = ref<Ticket[]>([
  {
    id_ticket: 101,
    ticket_title: "Implementar sistema de autenticación",
    ticket_description: "Crear el sistema de login y registro con JWT",
    ticket_attachments: null,
    ticket_service: 1,
    ticket_priority: "Alta",
    ticket_closing_code: null,
    ticket_ans: 1,
    reporter_user: "jperez",
    create_at: "2025-11-20T00:00:00.000Z",
    update_at: "",
    assigned_to: "mgonzalez",
    closing_date: null,
    estimated_closing_date: "2025-12-01T00:00:00.000Z",
    status_id: 2,
    sub_program_name: "Cliente Principal A",
  } as any,
  {
    id_ticket: 102,
    ticket_title: "Corregir error en módulo de pagos",
    ticket_description: "Bug en el proceso de checkout",
    ticket_attachments: null,
    ticket_service: 1,
    ticket_priority: "Urgente",
    ticket_closing_code: null,
    ticket_ans: 1,
    reporter_user: "cramirez",
    create_at: "2025-11-21T00:00:00.000Z",
    update_at: "",
    assigned_to: "mgonzalez",
    closing_date: null,
    estimated_closing_date: "2025-11-25T00:00:00.000Z",
    status_id: 2,
    sub_program_name: "Cliente Principal A",
  } as any,
  {
    id_ticket: 103,
    ticket_title: "Optimización de queries de base de datos",
    ticket_description: "Mejorar rendimiento de consultas principales",
    ticket_attachments: null,
    ticket_service: 2,
    ticket_priority: "Media",
    ticket_closing_code: null,
    ticket_ans: 2,
    reporter_user: "amartinez",
    create_at: "2025-11-19T00:00:00.000Z",
    update_at: "",
    assigned_to: "ltorres",
    closing_date: null,
    estimated_closing_date: "2025-12-05T00:00:00.000Z",
    status_id: 2,
    sub_program_name: "Cliente Principal B",
  } as any,
  {
    id_ticket: 104,
    ticket_title: "Diseño de nuevos componentes UI",
    ticket_description: "Crear biblioteca de componentes reutilizables",
    ticket_attachments: null,
    ticket_service: 1,
    ticket_priority: "Baja",
    ticket_closing_code: null,
    ticket_ans: 1,
    reporter_user: "pherrera",
    create_at: "2025-11-18T00:00:00.000Z",
    update_at: "",
    assigned_to: "dsilva",
    closing_date: null,
    estimated_closing_date: "2025-12-10T00:00:00.000Z",
    status_id: 2,
    sub_program_name: "Cliente Principal A",
  } as any,
  {
    id_ticket: 105,
    ticket_title: "Testing y corrección de bugs menores",
    ticket_description: "Suite de pruebas para nuevas funcionalidades",
    ticket_attachments: null,
    ticket_service: 3,
    ticket_priority: "Media",
    ticket_closing_code: null,
    ticket_ans: 1,
    reporter_user: "clopez",
    create_at: "2025-11-22T00:00:00.000Z",
    update_at: "",
    assigned_to: "rdiaz",
    closing_date: null,
    estimated_closing_date: "2025-12-03T00:00:00.000Z",
    status_id: 2,
    sub_program_name: "Cliente Principal C",
  } as any,
]);

const stats = [
  {
    title: "Tickets Asignados",
    value: "15",
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
    value: "8",
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
    value: "23",
    change: "este mes",
    trend: "+5",
    trendColor: "text-green-600",
    badge: "Éxito",
    badgeColor: "bg-green-100 text-green-700",
    icon: CheckCircle,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
    barColor: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    title: "Vencidos",
    value: "2",
    change: "no cerrados a tiempo",
    trend: "Atención",
    trendColor: "text-red-600",
    badge: "No completados",
    badgeColor: "bg-red-100 text-red-700",
    icon: AlertCircle,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    barColor: "bg-gradient-to-r from-red-400 to-red-600",
  },
];

const myTickets = computed(() =>
  mockTickets.value.filter((t) => t.assigned_to).slice(0, 5),
);

const recentActivity = [
  {
    id: 1,
    user: "Juan Pérez ",
    userInitials: "JP",
    action: "completó el ticket ",
    ticket: "104",
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    user: "María García ",
    userInitials: "MG",
    action: "creó un nuevo ticket ",
    ticket: "105",
    time: "Hace 1 hora",
  },
  {
    id: 3,
    user: "Carlos López ",
    userInitials: "CL",
    action: "comentó en ",
    ticket: "102",
    time: "Hace 2 horas",
  },
];

const priorityConfig = {
  Baja: { color: "bg-gray-100 text-gray-700", label: "Baja" },
  Media: { color: "bg-blue-100 text-blue-700", label: "Media" },
  Alta: { color: "bg-orange-100 text-orange-700", label: "Alta" },
  Urgente: { color: "bg-red-100 text-red-700", label: "Urgente" },
};

const typeIcons = {
  bug: { icon: AlertCircle, color: "text-red-500", bgColor: "bg-red-50" },
  feature: { icon: Zap, color: "text-[#50bdeb]", bgColor: "bg-blue-50" },
  task: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-50" },
  improvement: {
    icon: Wrench,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
};

const getTicketTypeByService = (serviceId: number) => {
  const typeMap: Record<number, keyof typeof typeIcons> = {
    1: "feature",
    2: "improvement",
    3: "bug",
  };
  return typeMap[serviceId] || "task";
};
</script>
