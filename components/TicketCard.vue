<template>
  <div
    class="bg-white rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:shadow-lg transition-all cursor-pointer group p-4"
    @click="openTicket"
  >
    <div class="space-y-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2">
          <component
            :is="typeIcons[getTicketTypeByName(ticket.service_name)].icon"
            :class="[
              'h-4 w-4',
              typeIcons[getTicketTypeByName(ticket.service_name)].color,
            ]"
          />
          <span
            class="font-mono text-xs font-semibold px-2.5 py-1 bg-[#50bdeb]/10 text-[#021C7D] border border-[#50bdeb]/20 rounded-md"
          >
            #{{ ticket.id_ticket }}
          </span>
        </div>
        <span
          :class="[
            'text-xs font-semibold px-2.5 py-1 rounded-md border-2',
            priorityConfig[ticket.priority_name]?.color ||
              'bg-slate-50 text-slate-700 border-slate-300',
          ]"
        >
          {{
            priorityConfig[ticket.priority_name]?.label || ticket.priority_name
          }}
        </span>
      </div>

      <h4
        class="font-semibold text-sm line-clamp-2 leading-snug text-slate-800 group-hover:text-[#021C7D] transition-colors"
      >
        {{ ticket.ticket_title }}
      </h4>

      <div class="flex flex-wrap gap-1.5">
        <span
          class="text-xs px-2.5 py-1 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-md border border-slate-200 font-medium"
        >
          {{ ticket.sub_program_name || "Sin cliente" }}
        </span>
      </div>

      <div
        class="flex items-center justify-between pt-3 border-t-2 border-slate-100"
      >
        <div class="flex items-center gap-3 text-xs text-slate-600">
          <div
            class="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"
          >
            <MessageSquare class="h-3.5 w-3.5 text-slate-500" />
            <span class="font-semibold">0</span>
          </div>
          <div
            class="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"
          >
            <Clock class="h-3.5 w-3.5 text-slate-500" />
            <span class="font-semibold">0h</span>
          </div>
        </div>
        <div
          v-if="ticket.assigned_to"
          class="h-8 w-8 rounded-full bg-gradient-to-br from-[#50bdeb] to-[#021C7D] text-white text-xs font-bold flex items-center justify-center shadow-md ring-2 ring-white"
          :title="ticket.assigned_to"
        >
          {{ ticket.assigned_to.substring(0, 2).toUpperCase() }}
        </div>
        <div
          v-else
          class="h-8 w-8 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center"
        >
          <User class="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle,
  CheckCircle,
  Zap,
  Wrench,
  MessageSquare,
  Clock,
  User,
} from "lucide-vue-next";
import type { Ticket } from "../models";

interface Props {
  ticket: Ticket;
}

defineProps<Props>();

const priorityConfig: Record<string, { color: string; label: string }> = {
  Baja: {
    color: "bg-slate-50 text-slate-700 border-slate-300",
    label: "Baja",
  },
  Media: {
    color: "bg-blue-50 text-blue-700 border-blue-400",
    label: "Media",
  },
  Alta: {
    color: "bg-orange-50 text-orange-700 border-orange-400",
    label: "Alta",
  },
  Urgente: {
    color: "bg-red-50 text-red-700 border-red-400",
    label: "Urgente",
  },
};

const typeIcons: Record<string, { icon: any; color: string }> = {
  bug: { icon: AlertCircle, color: "text-red-500" },
  feature: { icon: Zap, color: "text-[#50bdeb]" },
  task: { icon: CheckCircle, color: "text-green-500" },
  improvement: { icon: Wrench, color: "text-amber-500" },
};

// Helper to get ticket type by service name
const getTicketTypeByName = (serviceName: string) => {
  const nameMap: Record<string, keyof typeof typeIcons> = {
    "Soporte Técnico": "bug",
    Desarrollo: "feature",
    Infraestructura: "improvement",
    Consultoría: "task",
  };
  return nameMap[serviceName] || "task";
};

function openTicket() {
  console.log("Open ticket details");
}
</script>
