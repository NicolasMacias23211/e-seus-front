<style scoped>
:deep(.dp--input) {
  border-radius: 12px;
  padding: 12px;
}

:deep(.dp--input-icon-pad) {
  padding-left: 35px
}
</style>

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
            <h1 class="text-2xl font-bold text-[#021C7D]">Novedades</h1>
            <p class="text-xs text-slate-500">
              Gestionar solicitudes de novedades
            </p>
          </div>
        </div>
      </div>
      <div class="grid gap-4">
        <div class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-amber-50">
              <List class="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p class="text-2xl font-bold text-[#021C7D]">
                {{ totalNoveltiesEarrings || 0 }}
              </p>
              <p class="text-xs text-slate-500">Solicitudes pendientes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FILTROS -->

    <div class="bg-white rounded-2xl shadow p-4 mb-6">
      <div class="flex flex-wrap justify-between md:grid-cols-4 gap-4">
        <input id="client" v-model="filters.user" @input="searchEUsers" @focus="handleFocus" @blur="hideDropdown"
          type="text" required autocomplete="off" class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[250px]"
          placeholder="Buscar Empleado..." />
        <div v-if="showDropdown && eUsers.length > 0"
          class="absolute z-10 mt-12.5 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
          <div v-for="user in eUsersFiltered" :key="user.network_user" @mousedown.prevent="selectUser(user)"
            class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700">
            {{ user.full_name }}
          </div>
        </div>

        <select v-model="filters.type" @change="handleFilters"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[200px]">
          <option value="">Todos los tipos</option>
          <option v-for="type in leaveTypes" :value="type.leave_type">
            {{ type.leave_type_name }}
          </option>
        </select>

        <select v-model="filters.status" @change="handleFilters"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[200px]">
          <option value="">Todos los estados</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
          <option value="Pendiente">Pendiente</option>
        </select>

        <input v-model="filters.date" @change="handleFilters" type="month"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[200px]" />

        <button @click="openModal()"
          class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] cursor-pointer text-white px-5 py-3 rounded-xl shadow min-w-[200px] max-w-[200px] w-full">
          + Nueva novedad
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Tabla -->
      <div class="xl:col-span-2">
        <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-bold">Empleado</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Tipo</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Fecha Inicio</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Fecha Fin</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Estado</th>
                <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="novelty in novelties" :key="novelty.id_novelty"
                class="hover:bg-slate-50 cursor-pointer transition-colors">
                <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                  {{ novelty.user_name + ' ' + novelty.user_last_name }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                  {{ novelty.leave_type_name }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                  {{ novelty.start_date }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ novelty.end_date }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ novelty.status }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-1">
                    <button @click="openEditModal(novelty)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer"
                      title="Editar">
                      <Edit2 class="w-4 h-4" />
                    </button>
                    <button @click="confirmDelete(novelty)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition- cursor-pointer" title="Eliminar">
                      <Trash2 class="w-4 h-4" />
                    </button>
                    <button @click="openModal(novelty)"
                      class="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition- cursor-pointer"
                      title="Eliminar">
                      <MessageSquareText class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="novelties.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-slate-500">
                  No hay solicitudes pendientes.
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination :total-registers="total" :items-count="itemsCount" @change="loadNovelties()" />
        </div>
      </div>
      <!-- Calendario -->
      <div class="xl:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="flex items-center justify-between gap-3 px-5">
          <div class="flex items-center gap-3 px-5 h-13">

            <button @click="previousWeek"
              class="p-1 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-100 transition-all cursor-pointer">
              <ChevronLeft class="w-5 h-5 text-slate-600" />
            </button>
            <div class="text-center px-4">
              <p class="text-sm font-bold text-[#021C7D]">{{ currentWeekLabel }}</p>
              <p class="text-xs text-slate-500">{{ currentYearLabel }}</p>
            </div>
            <button @click="nextWeek"
              class="p-1 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-100 transition-all cursor-pointer">
              <ChevronRight class="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <button @click="goToToday"
            class="px-4 py-1.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer">
            Hoy
          </button>
        </div>

        <div class="bg-white border-y-1 overflow-hidden">
          <div class="grid grid-cols-5 ">
            <div v-for="day in weekDays" :key="day.date" class="p-4 pb-2 text-center border-r-1" :class="{
              'bg-blue-50': day.isToday,
              'bg-gray-300': holidays.includes(day.date)
            }">
              <p class="text-xs font-bold uppercase mb-1" :class="day.isToday
                ? 'text-[#50bdeb]'
                : holidays.includes(day.date)
                  ? 'text-slate-400'
                  : 'text-slate-700'
                ">
                {{ day.dayName }}
              </p>
              <p class="text-2xl font-bold mb-1" :class="day.isToday
                ? 'text-[#021C7D]'
                : holidays.includes(day.date)
                  ? 'text-slate-400'
                  : 'text-slate-700'
                ">
                {{ day.dayNumber }}
              </p>
              <div class="pt-2">
                <div class="flex flex-col justify-center items-center gap-2 pt-0" v-for="type in leaveTypes"
                  :value="type.leave_type">
                  <span v-if="!holidays.includes(day.date)
                    && getCount(day.date, type.leave_type) > 0" class="w-10 h-8 rounded text-white text-center p-1 mb-2"
                    :style="{ backgroundColor: type.leave_type_color }">
                    {{ getCount(day.date, type.leave_type) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="m-3 text-sm flex justify-around gap-4 flex-wrap">
          <div class="flex items-center gap-2 flex-wrap" v-for="type in leaveTypes">
            <span class="w-4 h-4 rounded " :style="{ backgroundColor: type.leave_type_color }"></span>
            {{ type.leave_type_name }}
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 w-full overflow-auto"
        @click.self="closeModal">
        <div
      class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden animate-scale-in"
    >
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              Creación de Novedades
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[calc(95vh-180px)] overflow-auto">
            <div>
              <input id="ansId" v-model.number="form.id_novelty" type="number" hidden
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:bg-slate-100"
                placeholder="ID de la novedad" />
            </div>
            <input id="client" v-model="form.e_user" @input="searchEUsers" @focus="handleFocus" @blur="hideDropdown"
              type="text" required autocomplete="off"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
              placeholder="Buscar usuario a asignar..." />
            <div v-if="showDropdown && eUsers.length > 0"
              class="absolute z-10 -mt-3.5 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <div v-for="user in eUsersFiltered" :key="user.network_user" @mousedown.prevent="selectUser(user)"
                class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700">
                {{ user.full_name }}
              </div>
            </div>
            <div v-if="
              showDropdown &&
              eUsersFiltered.length === 0
            "
              class="absolute z-10 -mt-3.5 bg-white border-2 border-blue-200 rounded-xl shadow-xl p-4 text-slate-500 text-sm font-medium">
              No se encontraron usuarios
            </div>
            <select v-model="form.leave_type" class="border rounded-xl px-4 py-3 w-full ">
              <option value="">Seleccionar...</option>
              <option v-for="type in leaveTypes" :value="type.leave_type">
                {{ type.leave_type_name }}
              </option>
            </select>
            <select v-model="form.status" class="border rounded-xl px-4 py-3 w-full">
              <option value="">Seleccionar...</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
            <VueDatePicker v-model="selectedDates" range format="YYYY-MM-DD" :disabled-dates="holidays"
              placeholder="Seleccionar rango de fechas" class="" />
            <textarea v-model="form.comments" class="border rounded-xl px-4 py-3 w-full" placeholder="Comentarios"
              rows="3">
            </textarea>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeModal"
                class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-all font-medium cursor-pointer">
                Cancelar
              </button>
              <button type="submit"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl hover:shadow-lg transition-all font-medium cursor-pointer">
                {{ isEditing ? "Actualizar" : "Crear" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  
    <Teleport to="body">
      <div v-if="showModalDetails" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
          <div
            class="flex justify-between items-center bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              Detalle de Solicitud
            </h2>
            <span class="bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold" :class="{
              'bg-green-100 text-green-700': noveltySelected?.status === 'Aprobado',
              'bg-red-100 text-red-700': noveltySelected?.status === 'Rechazado',
              'bg-amber-100 text-amber-700': noveltySelected?.status === 'Pendiente'
            }">
              {{ noveltySelected?.status }}
            </span>
          </div>

          <article class="space-y-4">
            <div class="max-w-4xl mx-auto bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-auto animate-scale-in">
              <div class="p-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="text-slate-500 text-sm">
                      Empleado
                    </label>
                    <p class="font-semibold">
                      {{ noveltySelected?.user_name + ' ' + noveltySelected?.user_last_name }}
                    </p>
                  </div>
                  <div>
                    <label class="text-slate-500 text-sm">
                      Tipo
                    </label>
                    <p class="font-semibold">
                      {{ noveltySelected?.leave_type_name }}
                    </p>
                  </div>
                  <div>
                    <label class="text-slate-500 text-sm">
                      Fecha inicio
                    </label>
                    <p class="font-semibold">
                      {{ noveltySelected?.start_date }}
                    </p>
                  </div>
                  <div>
                    <label class="text-slate-500 text-sm">
                      Fecha fin
                    </label>
                    <p class="font-semibold">
                      {{ noveltySelected?.end_date }}
                    </p>
                  </div>
                </div>
                <div class="mt-8">
                  <label class="text-slate-500 text-sm">
                    Comentarios
                  </label>
                  <div class="mt-2 bg-slate-100 rounded-xl p-4">
                    {{ noveltySelected?.comments || 'No hay comentarios.' }}
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div class="flex justify-end gap-3 py-4 px-6 border-t-2 border-slate-100">
            <button type="button" @click="closeModal"
              class="bg-slate-500 text-white px-5 py-3 rounded-xl hover:shadow-lg cursor-pointer">
              Cancelar
            </button>
            <button type="button" @click="aproveNovelty(noveltySelected?.id_novelty!, 'Rechazado')"
              class="bg-red-500 text-white px-5 py-3 rounded-xl hover:shadow-lg cursor-pointer">
              Rechazar
            </button>
            <button type="button" @click="aproveNovelty(noveltySelected?.id_novelty!, 'Aprobado')"
              class="bg-green-600 text-white px-5 py-3 rounded-xl hover:shadow-lg cursor-pointer">
              Aprobar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar la novedad seleccionada?`"
      details="Esta acción eliminará permanentemente la novedad del sistema. Los ticket relacionados a esta novedad también podrían verse afectados."
      confirm-text="Sí, Eliminar" cancel-text="Cancelar" @confirm="deleteNovelty" @cancel="handleDeleteCancel" 
    />
  </div>
</template>


<script setup lang="ts">

import { ref, computed, onMounted, watch, reactive } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
// @ts-ignore
import '@vuepic/vue-datepicker/dist/main.css'
import { List, ChevronLeft, ChevronRight, Edit2, Trash2, MessageSquareText, Plus } from 'lucide-vue-next'
import { useNotification } from "../../utils/useNotification";
import { Holidays } from "../../utils/holidays";
import Pagination from '../../components/Pagination.vue'
import { formatDateISOS } from "../../utils/Date";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

import type { Novelties, NoveltiesFiltered, NoveltiesPatch } from '../../models/Novelties'
import type { PaginationState } from '../../models/Pagination'
import type { LeaveType } from '../../models/LeaveTypes'
import type { EUser } from '../../models/EUser'

import { NoveltiesService } from '../../services/Novelties'
import { LeaveTypesService } from '../../services/LeaveTypes'
import { eUsersService } from '../../services/e-usersService'

interface CountElement {
  day: string
  type: string
  count: number
}

const notification = useNotification();
const selectedDates = ref<Date[] | null>(null);
const showModal = ref(false);
const showModalDetails = ref(false);
const showDropdown = ref(false);
const currentWeekStart = ref(new Date());
const showConfirmDialog = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);
const countElements = ref<CountElement[]>([])


const noveltiesService = new NoveltiesService();
const leaveTypesService = new LeaveTypesService();
const holidayServices = new Holidays();
const eusersService = new eUsersService();

const novelties = ref<Novelties[]>([]); // Aquí deberías tener tus novelties
const noveltySelected = ref<Novelties | null>(null);
const leaveTypes = ref<LeaveType[]>([]); // Aquí deberías tener tus novelties
const totalNoveltiesEarrings = ref(0);
const total = ref(0);
const itemsCount = ref(0);
const holidays = ref<string[]>(holidayServices.getLocalStorage() || []);
const eUsers = ref<EUser[]>([]);
const eUsersFiltered = ref<EUser[]>([]);
const noveltyToDelete = ref<Novelties | null>(null);

const closeModal = () => {
  noveltySelected.value = null
  showModalDetails.value = false
  showModal.value = false
}

const openModal = (novelty?: Novelties) => {

  if (novelty) {
    noveltySelected.value = novelty
    showModalDetails.value = true
    showModal.value = false
    isEditing.value = true
    return
  }
  isEditing.value = false
  noveltySelected.value = null
  showModalDetails.value = false
  showModal.value = true
}

const openEditModal = (object: Novelties) => {
  showModalDetails.value = false
  isEditing.value = true;
  editingIndex.value = novelties.value.findIndex(
    (element) => element.id_novelty === object.id_novelty
  );
  form.id_novelty = object.id_novelty ?? 0;
  form.leave_type = object.leave_type ?? "";
  form.e_user = object.e_user ?? "";
  form.start_date = object.start_date ?? "";
  form.end_date = object.end_date ?? "";
  form.status = object.status ?? "";
  form.comments = object.comments ?? "";

  const stringToDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  selectedDates.value = [
    stringToDate(object.start_date),
    stringToDate(object.end_date)
  ];

  showModal.value = true;
};

const confirmDelete = (code: Novelties) => {
  noveltyToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  noveltyToDelete.value = null;
};

const form = reactive<Novelties>({
  id_novelty: undefined,
  e_user: "",
  leave_type: "",
  start_date: "",
  end_date: "",
  status: "",
  comments: ""
})

const currentMonth = new Date().toISOString().slice(0, 7);
const filters = ref({
  user: "",
  e_user: "",
  type: "",
  status: "Pendiente",
  date: currentMonth
})

watch(selectedDates, (dates) => {
  if (dates) {
    const dateStart = new Date(dates[0]);
    const dateEnd = new Date(dates[1]);
    const stringDateStart = formatDateISOS(setDateWithoutTime(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()))
    const stringDateEnd = formatDateISOS(setDateWithoutTime(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()))

    form.start_date = stringDateStart.split('T')[0];
    form.end_date = stringDateEnd.split('T')[0];
    return
  }
  form.start_date = "";
  form.end_date = "";
})

const initializeWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentWeekStart.value = new Date(today);
  currentWeekStart.value.setDate(today.getDate() + diff);
  currentWeekStart.value.setHours(0, 0, 0, 0);
};

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


function setDateWithoutTime(year: number, month: number, day: number) {
  return new Date(
    Number(year),
    Number(month),
    Number(day)
  );
}

const loadNovelties = async (dataFilters?: NoveltiesFiltered, pagination?: PaginationState) => {
  try {
    const page = pagination?.currentPage ?? 1
    const perPage = pagination?.perPage ?? 10
    holidayServices.getLocalStorage()
    const response = await noveltiesService.getAllFiltered(page, perPage, dataFilters)
    if (response.data && response.data.results) {
      novelties.value = response.data.results
      total.value = response.data.count
      itemsCount.value = response.data.results.length
    }
  } catch (error) {
    console.error("Error al cargar las novelties: ", error)
  }
}
const loadLeaveTypes = async () => {
  try {
    holidayServices.getLocalStorage()
    const response = await leaveTypesService.getAll()
    if (response.data && response.data.results) {
      leaveTypes.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los tipos de licencia: ", error)
  }
}
const loadEusers = async () => {
  try {
    const response = await eusersService.getAll()
    if (response.data && response.data.results) {
      eUsers.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los usuarios: ", error)
    notification.error("Error", "No se pudieron cargar los usuarios")
  }
}

const countNoveltiesEarrings = async (status: string) => {
  try {
    const response = await noveltiesService.getAllByStatus(status)
    if (response.data && response.data.results) {
      totalNoveltiesEarrings.value = response.data.count
    }
  } catch (error) {
    console.error("Error al cargar las novedades pendientes: ", error)
  }
}

const countElementsByLeaveType = async (status: string, date: string) => {
  try {
    const response = await noveltiesService.getAllByLeaveType(status, date)
    if (response.data && response.data.results) {
      return response.data?.count ?? 0
    }
  } catch (error) {
    console.error("Error al cargar las novedades pendientes: ", error)
    return 0
  }
}

const handleSubmit = () => {
  if (isEditing.value) {
    update()
    return
  }
  create()
};

const deleteNovelty = async () => {
  try {
    if (noveltyToDelete.value && noveltyToDelete.value.id_novelty != undefined) {
      let response = await noveltiesService.delete(noveltyToDelete.value.id_novelty)
      if (response.success) {
        notification.success(
          "¡Eliminado!",
          "La novedad ha sido eliminada correctamente"
        );

        loadNovelties();
        countNoveltiesEarrings('pendiente');
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar la novedad: ", response.error)
      notification.error("Error", "No se logro eliminar la novedad")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar la novedad: ", error)
    notification.error("Error", "No se logro eliminar la novedad")
    handleDeleteCancel()
  }
};


const create = async () => {
  try {
    let data: Novelties = ({
      leave_type: form.leave_type,
      e_user: form.e_user,
      start_date: form.start_date,
      end_date: form.end_date,
      status: form.status,
      comments: form.comments
    })

    let response = await noveltiesService.create(data)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "La novedad ha sido creada correctamente"
      );
      // loadNovelties();
      handleFilters();
      countNoveltiesEarrings('pendiente');
      closeModal();
      return
    }
    console.error("Error al crear el horario: ", response.error)
    notification.error("Error", "No se logro crear el horario")
    closeModal();
  } catch (error) {
    console.error("Error al crear el horario: ", error)
    notification.error("Error", "No se logro crear el horario")
    closeModal();
  }
}

const update = async () => {
  try {
    let data: Novelties = ({
      leave_type: form.leave_type,
      e_user: form.e_user,
      start_date: form.start_date,
      end_date: form.end_date === "" ? form.end_date : form.start_date,
      comments: form.comments,
      status: form.status
    })

    if (!form.id_novelty) {
      notification.error("Error", "ID de novedad no válido")
      return
    }

    let response = await noveltiesService.update(data, form.id_novelty)
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "La novedad ha sido actualizada correctamente"
      );
      // loadNovelties();
      handleFilters();
      countNoveltiesEarrings('pendiente');
      loadLeaveTypes();
      closeModal();
      return
    }
    console.error("Error al actualizar la novedad: ", response.error)
    notification.error("Error", "No se logro actualizar la novedad")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar la novedad: ", error)
    notification.error("Error", "No se logro actualizar la novedad")
    closeModal();
  }
}
const aproveNovelty = async (id_novelty: number, status: string) => {
  try {

    let dataPatch: NoveltiesPatch = ({
      status: status
    })
    let response = await noveltiesService.patch(dataPatch, id_novelty)
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "La novedad ha sido actualizada correctamente"
      );
      handleFilters();
      countNoveltiesEarrings('pendiente');
      closeModal();
      return
    }
    console.error("Error al actualizar la novedad: ", response.error)
    notification.error("Error", "No se logro actualizar la novedad")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar la novedad: ", error)
    notification.error("Error", "No se logro actualizar la novedad")
    closeModal();
  }
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
const searchEUsers = async () => {
  try {
    if (!filters.value.user) {
      filters.value.e_user = "";
      eUsersFiltered.value = eUsers.value;
      handleFilters();
      return;
    }
    eUsersFiltered.value = eUsers.value.filter(user =>
      matchText(filters.value.user, user.full_name)
    )
    showDropdown.value = true;

  } catch (error) {
    console.error("Error al cargar los EUsers:", error);
  }
};

const selectUser = (user: EUser) => {
  filters.value.user = user.full_name;
  filters.value.e_user = user.network_user;
  form.e_user = user.network_user;
  handleFilters()
  showDropdown.value = false;
};

function handleFocus() {
  showDropdown.value = true;
  searchEUsers();
};
function hideDropdown() {
  showDropdown.value = false;
};

function handleFilters() {
  const [year, month] = (filters?.value?.date ?? '').split('-')
  const firstDate = year && month ? `${year}-${month.padStart(2, '0')}-01` : '';
  const lastDay = year && month ? new Date(Number(year), Number(month), 0).toISOString().split('T')[0] : '';

  const dataFilters: NoveltiesFiltered = {
    e_user: filters.value.e_user,
    leave_type: filters.value.type,
    status: filters.value.status,
    start_date: firstDate || undefined,
    end_date: lastDay || undefined
  }
  loadNovelties(dataFilters)
}

const getCount = (day: string, leaveType: string): number => {
  return (
    countElements.value.find(
      item =>
        item.day === day &&
        item.type === leaveType
    )?.count ?? 0
  )
}

watch([weekDays, leaveTypes], async () => {
  countElements.value = await Promise.all(
    weekDays.value.flatMap(weekDay =>
      leaveTypes.value.map(async leaveType => ({

        day: weekDay.date,
        type: leaveType.leave_type,
        count: (await countElementsByLeaveType(
          leaveType.leave_type,
          weekDay.date
        )) ?? 0
      }))
    ))

})

onMounted(async () => {
  await loadEusers();
  await loadLeaveTypes();
  await countNoveltiesEarrings('pendiente');
  await loadNovelties();
  initializeWeek()
});

</script>