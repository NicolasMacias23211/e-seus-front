<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
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
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-50">
            <List class="w-5 h-5 text-[#50bdeb]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ total }}
            </p>
            <p class="text-xs text-slate-500">Sin Asignar</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-red-50">
            <AlertCircle class="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ ticketsCritial }}
            </p>
            <p class="text-xs text-slate-500">ANS Crítico</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-green-50">
            <BookmarkX class="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">{{ ticketsExpired }}</p>
            <p class="text-xs text-slate-500">ANS Vencidos</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border-2 shadow-sm p-4">
      <div class="flex flex-wrap gap-3 items-center">
        <div class="flex-1 min-w-[250px] relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Buscar por ID, título o descripción..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors" />
        </div>

        <select
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-nonefocus:border-[#50bdeb] transition-colors">
          <option value="">ANS</option>
          <option v-for="ans in filterAns" :value="ans.ans_name">{{ ans.ans_name === "Programado" ? ans.ans_name :
            ans.ans_name + " horas" }} </option>
        </select>

        <select
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors">
          <option value="">Tiempo en cola</option>
          <option value="reciente">Menos de 1h</option>
          <option value="medio">1-3 horas</option>
          <option value="critico">Más de 3h</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-slate-50 border-b-2">
          <tr>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              # Ticket
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              Solicitud
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              ANS
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              Tiempo en cola
            </th>
            <th class="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="ticket in tickets" :key="ticket.id_ticket"
            class="hover:bg-slate-50 cursor-pointer transition-colors">
            <td class="px-6 py-4">
              <span class="text-[#50bdeb] font-bold text-lg">#{{ ticket.id_ticket }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="max-w-md">
                <p class="text-slate-900 font-bold text-sm mb-1">
                  {{ ticket.ticket_title }}
                </p>
                <p class="text-slate-600 text-xs line-clamp-2">
                  {{
                    ticket.ticket_description ||
                    "Sin descripción adicional disponible para este ticket"
                  }}
                </p>
              </div>
            </td>
            <td class="px-6 py-4">
              <span v-if="ticket.ans" class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                {{ ticket.ans !== 'Programado' ? ticket.ans + " h" : ticket.ans }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :class="{
                  'bg-red-500': ticket.isCritical,
                  'bg-green-500': !ticket.isCritical,
                }"></div>
                <span class="text-slate-7200 font-bold text-sm">
                  {{ ticket.hour_elapsed }} h {{ ticket.minute_elapsed }} m
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <button
                class="px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-lg font-semibold text-xs transition-all">
                Asignar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total-registers="total" :items-count="itemsCount" @change="loadData" />
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
import { ref, reactive, onMounted } from "vue";
import { TicketsService } from "../services/ticketsService";
import { AnsService } from "../services/ansService";
import type { TicketList } from "../models/Ticket";
import type { ANS } from "../models/ANS";
import Pagination, { PaginationState } from "../components/Pagination.vue";
import { time } from "node:console";


const ansService = new AnsService();
const ticketService = new TicketsService();
const tickets = ref<TicketList[]>([]);
const allTickets = ref<TicketList[]>([]);
const total = ref(0);
const itemsCount = ref(0);
const filterAns = ref<ANS[]>([]);
const ticketsCritial = ref(0);
const ticketsExpired = ref(0);

const loadAns = async () => {
  try {
    const response = await ansService.getAll();
    if (response.data && response.data.results) {
      filterAns.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar los ANS:", error);
  }
};

const loadAllTickets = async () => {
  try {
    const response = await ticketService.getAllTicketsWithoutAssignment(1, 1000);
    if (response.data && response.data.results) {
      allTickets.value = response.data.results;
    }
    ticketsCritial.value = 0;
    allTickets.value.forEach(ticket => {
      if (filterAns.value[ticket.ticket_ans]) {
        ticket.ans = filterAns.value[ticket.ticket_ans].ans_name;
      }
      let time_elapsed = calculateTimeInElapsed(ticket);
      if (isCriticalTime(parseInt(ticket.ans), time_elapsed[0], time_elapsed[1])) {
        ticketsCritial.value += 1;
      }
      if (ticket.estimated_closing_date) {
        const estimatedDate = new Date(ticket.estimated_closing_date);
        estimatedDate.setHours(estimatedDate.getHours() + 5);
        const now = new Date();
        if (now >= estimatedDate) {
          ticketsExpired.value += 1;
        }
      }
    })
  } catch (error) {
    console.error("Error al cargar los tickets:", error);
  }
};

const loadData = async (pagination?: PaginationState) => {
  try {
    const page = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 10;
    const response = await ticketService.getAllTicketsWithoutAssignment(page, perPage);
    if (response.data && response.data.results) {
      tickets.value = response.data.results;
      total.value = response.data.count;
      itemsCount.value = response.data.results.length;
      tickets.value.forEach(ticket => {
        if (filterAns.value[ticket.ticket_ans]) {
          ticket.ans = filterAns.value[ticket.ticket_ans].ans_name;
        }
        let time_elapsed = calculateTimeInElapsed(ticket);
        ticket.hour_elapsed = time_elapsed[0];
        ticket.minute_elapsed = time_elapsed[1];
        if (ticket.ans && ticket.ans !== "programado") {
          ticket.isCritical = isCriticalTime(parseInt(ticket.ans), time_elapsed[0], time_elapsed[1]);
        }
      })
      tickets.value.sort((a, b) => {
        const timeA = a.hour_elapsed * 60 + a.minute_elapsed;
        const timeB = b.hour_elapsed * 60 + b.minute_elapsed;
        return timeB - timeA; // orden descendente por tiempo en cola
      })
    }
  } catch (error) {
    console.error("Error al cargar los tickets:", error);
  }
};

const calculateTimeInElapsed = (ticket: TicketList): number[] => {
  const createdDate = new Date(ticket.create_at);
  const now = new Date();
  createdDate.setHours(createdDate.getHours() + 5); // ajuste por modificación de entrega del backend
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return [diffHrs, diffMins];
}

function isCriticalTime(ans: number, hour: number, minutes: number): boolean {
  //lógica crítica basada en ANS y tiempo transcurrido
  const criticalTimeLimit = ans * 0.7; // ejemplo: crítico si se ha pasado el 70% del ANS
  const elapsedTime = hour + (minutes / 60);
  return elapsedTime >= criticalTimeLimit;
}

onMounted(() => {
  loadAns();
  loadAllTickets();
  loadData();
});

</script>
