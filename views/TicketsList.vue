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
              {{ itemsCount }}
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
          <input v-model="serchFilters.search" @input="handleSearch" type="text"
            placeholder="Buscar por ID, título o descripción..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors" />
        </div>

        <select v-model="serchFilters.ans" @change="handleSearch" placeholder="ANS"
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-nonefocus:border-[#50bdeb] transition-colors">
          <option value="" selected>ANS</option>
          <option v-for="ans in filterAns" :value="ans.ans_name">{{ ans.ans_name === "Programado" ? ans.ans_name :
            ans.ans_name + " horas" }} </option>
        </select>

        <select v-model="serchFilters.time_elapsed" @change="handleSearch"
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors">
          <option value="" selected>Tiempo en cola</option>
          <option value="1">Menos de 1h</option>
          <option value="3">Menos de 3h</option>
          <option value="+3">Más de 3h</option>
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
            @dblclick.prevent="openModal(ticket)"
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
              <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit"
                :class="getClass(ticket)[0]">
                <div class="w-3 h-3 rounded-full" :class="getClass(ticket)[1]"></div>
                <span v-if="ticket.ans" :class="getClass(ticket)[0]">
                  {{ ticket.ans !== 'Programado' ? ticket.ans + " h" : ticket.ans }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit"
                :class="{
                  'bg-red-100 text-red-700': ticket.isCritical,
                }">
                <div class="w-3 h-3 rounded-full" :class="{
                  'bg-red-500 animate-pulse': ticket.isCritical && !ticket.isExpired,
                  'bg-red-800': ticket.isExpired,
                  'bg-green-500': !ticket.isCritical,
                }"></div>
                <span>
                  {{ ticket.hour_elapsed }} h {{ ticket.minute_elapsed }} m
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <button @click="openModal(ticket)"
                class="px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-lg font-semibold text-xs cursor-pointer">
                Asignar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :total-registers="total" :items-count="itemsCount" @change="loadData" />
    </div>
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              Asignación de Ticket #{{ form.id_ticket }}
            </h2>
          </div>

          <form @submit.prevent="assignTicket" class="p-6 space-y-4">
            <div>
              <input id="ansId" v-model.number="form.id_ticket" type="number" hidden
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:bg-slate-100"
                placeholder="ID del ticket" />
            </div>
            <input id="client" v-model="form.search" @input="searchEUsers" @focus="handleFocus" @blur="hideDropdown"
              type="text" required autocomplete="off"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
              placeholder="Buscar usuario a asignar..." />
            <div v-if="showDropdown && eUsers.length > 0"
              class="absolute z-10 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <div v-for="user in eUsersFiltered" :key="user.network_user" @mousedown.prevent="selectUser(user)"
                class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700">
                {{ user.full_name }}
              </div>
            </div>
            <div v-if="
              showDropdown &&
              eUsersFiltered.length === 0
            "
              class="absolute z-10 mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl p-4 text-slate-500 text-sm font-medium">
              No se encontraron usuarios
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeModal"
                class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-all font-medium cursor-pointer">
                Cancelar
              </button>
              <button type="submit"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl hover:shadow-lg transition-all font-medium cursor-pointer">
                Asignar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle,
  BookmarkX,
  List,
  Search,
} from "lucide-vue-next";
import { ref,onMounted } from "vue";
import { TicketsService } from "../services/ticketsService";
import { AnsService } from "../services/ansService";
import type { TicketList } from "../models/Ticket";
import type { ANS } from "../models/ANS";
import type { EUser } from "../models/EUser";
import type { PaginationState } from "../components/Pagination.vue";
import Pagination from "../components/Pagination.vue";
import { parseBackendDate, formatDateISOS } from "../utils/Date";
import { eUsersService } from "../services/e-usersService";
import type { TicketUpdate } from '../models/Ticket';
import { useNotification } from "../utils/useNotification";

interface loadDataParams {
  search?: string;
  id_ans?: number;
  time_elapsed?: string;
  before?: boolean;
}

const notification = useNotification();
const ansService = new AnsService();
const ticketService = new TicketsService();
const updateTicket = ref<TicketUpdate>({
  assigned_to: "",
});
const e_UsersService = new eUsersService();
const tickets = ref<TicketList[]>([]);
const allTickets = ref<TicketList[]>([]);
const eUsers = ref<EUser[]>([]);
const eUsersFiltered = ref<EUser[]>([]);
const total = ref(0);
const itemsCount = ref(0);
const filterAns = ref<ANS[]>([]);
const ticketsCritial = ref(0);
const ticketsExpired = ref(0);
const loadDataParams = ref<loadDataParams>({
  search: '',
  id_ans: undefined,
  time_elapsed: '',
  before: false,
});
const serchFilters = ref({
  search: "",
  ans: "",
  time_elapsed: "",
})
const showModal = ref(false);
const form = ref<{
  id_ticket?: number
  networkUser: string,
  fullName: string,
  search: string
}>({
  id_ticket: undefined,
  networkUser: "",
  fullName: "",
  search: "",
})
const showDropdown = ref(false);

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

const loadEUser = async () => {
  try {
    const response = await e_UsersService.getAll();
    if (response.data && response.data.results) {
      eUsers.value = response.data.results;
      eUsersFiltered.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar los ANS:", error);
  }
};

const searchEUsers = async () => {
  try {
    if (!form.value.search) {
      eUsersFiltered.value = eUsers.value;
      return;
    }
    eUsersFiltered.value = eUsers.value.filter(user =>
      matchText(form.value.search, user.full_name)
    )
    showDropdown.value = true;

  } catch (error) {
    console.error("Error al cargar los EUsers:", error);
  }
};

const selectUser = (user: EUser) => {
  form.value.networkUser = user.network_user;
  form.value.search = user.full_name;
  showDropdown.value = false;
  updateTicket.value.assigned_to = user.network_user;
};

const loadAllTickets = async () => {
  try {
    const response = await ticketService.getAllTicketsWithoutAssignment(1, 1000);
    if (response.data && response.data.results) {
      allTickets.value = response.data.results;
      itemsCount.value = response.data.results.length;
    }
    ticketsCritial.value = 0;
    ticketsExpired.value = 0;
    allTickets.value.forEach(ticket => {
      setTicketInformationValidate(ticket);
      if (ticket.isCritical) {
        ticketsCritial.value += 1;
      }
      if (ticket.isExpired) {
        ticketsExpired.value += 1;
      }
    })
  } catch (error) {
    console.error("Error al cargar los tickets:", error);
  }
};

const loadData = async (pagination?: PaginationState, loadDataParams?: loadDataParams) => {
  try {
    const page = pagination?.currentPage ?? 1;
    const perPage = pagination?.perPage ?? 10;
    const response = await ticketService.getAllTicketsWithoutAssignment(page, perPage, loadDataParams?.search, loadDataParams?.id_ans, loadDataParams?.time_elapsed, loadDataParams?.before);
    if (response.data && response.data.results) {
      tickets.value = response.data.results;
      total.value = response.data.count;
      tickets.value.forEach(ticket => {
        setTicketInformationValidate(ticket);
      })
      tickets.value.sort((a, b) => {
        const timeA = a.hour_elapsed * 60 + a.minute_elapsed;
        const timeB = b.hour_elapsed * 60 + b.minute_elapsed;
        return timeB - timeA; // orden descendente por tiempo en cola
      })
    }
  } catch (error) {
    console.error("Error al cargar los tickets:", error);
    notification.error("Error", "No se logró cargar los tickets")
  }
};

const calculateTimeInElapsed = (ticket: TicketList): number[] => {
  const createdDate = new Date(parseBackendDate(ticket.create_at));
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return [diffHrs, diffMins];
}

const assignTicket = async () => {
  try {

    if (form.value.id_ticket) {
      let response = await ticketService.patchTicket(updateTicket.value, form.value.id_ticket);

      if (response.success) {
        notification.success(
          "¡Actualizado!",
          "El ticket ha sido actualizado correctamente"
        );

        loadAllTickets();
        loadData();
        loadEUser();
        loadAns();
      }
      closeModal();
      return
    }
    console.error("Error al actualizar el ticket: id ticket es undefined")
    notification.error("Error", "No se logro actualizar el ticket")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el ticket: ", error)
    notification.error("Error", "No se logró actualizar el ticket")
    closeModal();
  }
}

function isCriticalTime(ans: number, hour: number, minutes: number): boolean {
  //lógica crítica basada en ANS y tiempo transcurrido
  const criticalTimeLimit = ans * 0.7; // ejemplo: crítico si se ha pasado el 70% del ANS
  const elapsedTime = hour + (minutes / 60);
  return elapsedTime >= criticalTimeLimit;
}

function isExpiredTime(ticket: TicketList): boolean {
  if (ticket.estimated_closing_date) {
    const estimatedDate = new Date(parseBackendDate(ticket.estimated_closing_date));
    const now = new Date();
    if (now >= estimatedDate) {
      return true;
    }
  }
  return false;
}

function setTicketInformationValidate(ticket: TicketList) {
  filterAns.value.some(ans => {
    if (ans.id_ans === ticket.ticket_ans) {
      ticket.ans = ans.ans_name;
      return true;
    }
  })
  let time_elapsed = calculateTimeInElapsed(ticket);
  if (ticket.ans && ticket.ans !== "programado") {
    ticket.isCritical = isCriticalTime(parseInt(ticket.ans), time_elapsed[0] || 0, time_elapsed[1] || 0);
  }
  if (ticket.ans === "Programado" && (time_elapsed[0] || 0) > 5) {
    ticket.isCritical = true;
  }
  ticket.hour_elapsed = time_elapsed[0] || 0;
  ticket.minute_elapsed = time_elapsed[1] || 0;
  ticket.isExpired = isExpiredTime(ticket);
}

function getClass(ticket: TicketList): string[] {
  if (ticket.ans === "Programado") {
    return ['bg-blue-100 text-blue-500', "bg-blue-500"];
  }
  const ans = parseInt(ticket.ans);
  if (ans <= 2) {
    return ['bg-red-100 text-red-700', "bg-red-500"];
  }
  if (ans > 2 && ans <= 4) {
    return ['bg-orange-100 text-orange-700', "bg-orange-500"];
  }
  if (ans > 4 && ans <= 6) {
    return ['bg-yellow-100 text-yellow-800', "bg-yellow-500"];
  }
  if (ans > 6) {
    return ['bg-amber-100 text-amber-700', "bg-amber-500"];
  }
  return ['bg-blue-100 text-blue-700'];
}

function handleSearch() {
  loadDataParams.value.search = serchFilters.value.search;
  loadDataParams.value.time_elapsed = serchFilters.value.time_elapsed;
  loadDataParams.value.id_ans = undefined;

  if (serchFilters.value.ans) {
    filterAns.value.forEach(ans => {
      if (ans.ans_name === serchFilters.value.ans) {
        loadDataParams.value.id_ans = ans.id_ans;
        return true;
      }
    })
  }

  if (serchFilters.value.time_elapsed) {
    const now = new Date();
    loadDataParams.value.before = false;
    if (serchFilters.value.time_elapsed === "+3") {
      loadDataParams.value.before = true;
      serchFilters.value.time_elapsed = "3";
    }
    now.setHours(now.getHours() - parseInt(serchFilters.value.time_elapsed));
    loadDataParams.value.time_elapsed = formatDateISOS(now);
  }
  loadData(Pagination.value, loadDataParams.value);
}

function matchText(search: string, target: string): boolean {
  if (!search.trim()) return true

  const terms = search
    .toLowerCase()
    .trim()
    .split(/\s+/)

  const normalizedTarget = target
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

  return terms.every(term => normalizedTarget.includes(term))
}

function openModal(Ticket: TicketList) {
  form.value.id_ticket = Ticket.id_ticket;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
function handleFocus() {
  showDropdown.value = true;
  searchEUsers();
};
function hideDropdown() {
  showDropdown.value = false;
};


onMounted(() => {
  loadEUser();
  loadAns();
  loadAllTickets();
  loadData();
});

</script>
