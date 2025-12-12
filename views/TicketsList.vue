<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
          >
            <List class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-[#021C7D]">Cola de Tickets</h1>
            <p class="text-xs text-slate-500">
              Tickets sin asignar esperando atención del área
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="px-6 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
        >
          <Plus class="w-5 h-5" />
          Asignar Múltiple
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-50">
            <List class="w-5 h-5 text-[#50bdeb]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ filteredTickets.length }}
            </p>
            <p class="text-xs text-slate-500">Sin Asignar</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-red-50">
            <AlertCircle class="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ highPriorityCount }}
            </p>
            <p class="text-xs text-slate-500">ANS Crítico</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-green-50">
            <BookmarkX class="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">{{ doneCount }}</p>
            <p class="text-xs text-slate-500">ANS Vencidos</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border-2 shadow-sm p-4">
      <div class="flex flex-wrap gap-3 items-center">
        <div class="flex-1 min-w-[250px] relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por ID, título o descripción..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
          />
        </div>

        <select
          v-model="filterANS"
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
        >
          <option value="">ANS</option>
          <option value="2h">2 Horas</option>
          <option value="4h">4 Horas</option>
          <option value="8h">8 Horas</option>
          <option value="programado">Programado</option>
        </select>

        <select
          v-model="filterTiempo"
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
        >
          <option value="">Tiempo en cola</option>
          <option value="reciente">Menos de 1h</option>
          <option value="medio">1-3 horas</option>
          <option value="critico">Más de 3h</option>
        </select>

        <button
          class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <Download class="w-4 h-4" />
          Exportar
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-slate-50 border-b-2">
          <tr>
            <th
              class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
            >
              # Ticket
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
            >
              Solicitud
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
            >
              ANS
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
            >
              Tiempo en cola
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="hover:bg-slate-50 cursor-pointer transition-colors"
            @click="viewTicket(ticket.id)"
          >
            <td class="px-6 py-4">
              <span class="text-[#50bdeb] font-bold text-lg"
                >#{{ ticket.id.split("-")[1] || "001" }}</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="max-w-md">
                <p class="text-slate-900 font-bold text-sm mb-1">
                  {{ ticket.title }}
                </p>
                <p class="text-slate-600 text-xs line-clamp-2">
                  {{
                    ticket.description ||
                    "Sin descripción adicional disponible para este ticket"
                  }}
                </p>
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit"
                :class="getANSClass(ticket.ans || '8h')"
              >
                {{ getANSIcon(ticket.ans || "8h") }} {{ ticket.ans || "8h" }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  :class="[
                    'w-2 h-2 rounded-full',
                    getTiempoIndicator(ticket.tiempoEspera || '1h:47m'),
                  ]"
                ></div>
                <span class="text-slate-700 font-bold text-sm">{{
                  ticket.tiempoEspera || "1h:47m"
                }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <button
                class="px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-lg font-semibold text-xs transition-all"
                @click.stop="assignTicket(ticket.id)"
              >
                Asignar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle,
  BookmarkX,
  Download,
  List,
  Plus,
  Search,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { mockTickets } from "../mock-data";

const searchQuery = ref("");
const filterANS = ref("");
const filterTiempo = ref("");

const filteredTickets = computed(() => {
  return mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchesSearch;
  });
});

const highPriorityCount = computed(() => {
  return mockTickets.filter(
    (t) => t.priority === "high" || t.priority === "urgent"
  ).length;
});

const doneCount = computed(() => {
  return mockTickets.filter((t) => t.status === "done").length;
});

const getANSClass = (ans: string) => {
  const classes: Record<string, string> = {
    "2h": "bg-red-100 text-red-700 border-2 border-red-500",
    "4h": "bg-orange-100 text-orange-700 border-2 border-orange-500",
    "8h": "bg-yellow-100 text-yellow-700",
    programado: "bg-blue-100 text-blue-700",
  };
  return classes[ans] || "bg-slate-100 text-slate-700";
};

const getANSIcon = (ans: string) => {
  const icons: Record<string, string> = {
    "2h": "🔴",
    "4h": "🟠",
    "8h": "🟡",
    programado: "📅",
  };
  return icons[ans] || "⚪";
};

const getTiempoIndicator = (tiempo: string) => {
  const match = tiempo.match(/(\d+(\.\d+)?)/);
  const horas = match ? parseFloat(match[1] || "0") : 0;
  if (horas < 1) return "bg-green-500";
  if (horas < 3) return "bg-yellow-500";
  return "bg-red-500 animate-pulse";
};

const assignTicket = (id: string) => {
  console.log("Asignar ticket:", id);
};

const viewTicket = (id: string) => {
  console.log("Ver ticket:", id);
};
</script>
