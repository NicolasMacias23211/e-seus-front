<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <Clock class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Programación
          </h1>
          <p class="text-xs text-slate-500">
            Pogramación semanal de asistencia.
          </p>
        </div>
      </div>
      <button @click="openModal()"
        class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] cursor-pointer text-white px-5 py-3 rounded-xl shadow min-w-[200px] max-w-[200px] w-full">
        + Nueva novedad
      </button> 
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <div class="bg-white rounded-2xl shadow p-4 mb-6">
      <div class="flex flex-wrap justify-around md:grid-cols-4 gap-4">

        <select v-model="filters.type" @change="handleFilters"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[300px]">
          <option value="">Todos los tipos</option>
          <option v-for="type in leaveTypes" :value="type.leave_type">
            {{ type.leave_type_name }}
          </option>
        </select>

        <select v-model="filters.status" @change="handleFilters"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[300px]">
          <option value="">Todos los estados</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Rechazado">Rechazado</option>
          <option value="Pendiente">Pendiente</option>
        </select>

        <input v-model="filters.date" @change="handleFilters" type="month"
          class="border rounded-xl px-4 py-3 w-full min-w-[200px] max-w-[300px]" />

      </div>
    </div>
      <!-- Tabla -->
      <div class="w-full">
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
                  <div v-if="novelty.status !== 'Aprobado'" class="flex items-center justify-center gap-1">
                    <button @click="openEditModal(novelty)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer"
                      title="Editar">
                      <Edit2 class="w-4 h-4" />
                    </button>
                    <button @click="confirmDelete(novelty)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition- cursor-pointer" title="Eliminar">
                      <Trash2 class="w-4 h-4" />
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
    </div>
    <Teleport to="body">
      <div v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 w-full overflow-auto"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden animate-scale-in">
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
            <select v-model="form.leave_type" class="border rounded-xl px-4 py-3 w-full ">
              <option value="">Seleccionar...</option>
              <option v-for="type in leaveTypes" :value="type.leave_type">
                {{ type.leave_type_name }}
              </option>
            </select>
            <VueDatePicker v-model="selectedDates" range format="YYYY-MM-DD" :disabled-dates="holidays"
              placeholder="Seleccionar rango de fechas" />

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
    
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar la novedad seleccionada?`"
      details="Esta acción eliminará permanentemente la novedad del sistema. Los ticket relacionados a esta novedad también podrían verse afectados."
      confirm-text="Sí, Eliminar" cancel-text="Cancelar" @confirm="deleteNovelty" @cancel="handleDeleteCancel" 
      />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from "vue";
import { VueDatePicker } from '@vuepic/vue-datepicker'
// @ts-ignore
import '@vuepic/vue-datepicker/dist/main.css'
import { Clock, Edit2, Trash2 } from 'lucide-vue-next'
import { useNotification } from "../utils/useNotification.ts";
import { eUsersService } from '../services/e-usersService.ts';
import type { EUser } from "../models/EUser.ts";
import type { EmployeeSchedule } from '../models/EmployeeSchedule.ts';
import { EmployeeScheduleService } from '../services/employeeSchedule.ts';
import ConfirmDialog from "../components/ConfirmDialog.vue";
import { Holidays } from "../utils/holidays.ts";
import { NoveltiesService } from '../services/Novelties.ts';
import type { Novelties, NoveltiesFiltered } from '../models/Novelties.ts'
import { LeaveTypesService } from "../services/LeaveTypes.ts";
import type { LeaveType } from "../models/LeaveTypes.ts";
import { formatDateISOS } from "../utils/Date.ts";
import { SessionStorageService } from "../services/SessionStorageService.ts";
import Pagination from '../components/Pagination.vue';


const sessionStorageService = new SessionStorageService();
const selectedDates = ref<Date[] | null>(null);
const notification = useNotification();
const eUsersServices = new eUsersService();
const noveltiesService = new NoveltiesService();
const leaveTypesService = new LeaveTypesService();
const eUsers = ref<EUser[]>([]);
const employeeScheduleService = new EmployeeScheduleService() // Debe ser optimizado para buscar en el rango de fecha de masximo 3 semanas.
const employeeSchedules = ref<EmployeeSchedule[]>([])
const currentWeekStart = ref(new Date());
const showConfirmDialog = ref(false);
const holidayServices = new Holidays();
const holidays = ref<string[]>(holidayServices.getLocalStorage() || []);
const showModal = ref(false);
const showModalNovelties = ref(false);

const showModalDetails = ref(false);
const isEditing = ref(false);
const leaveTypes = ref<LeaveType[]>([]);
const novelties = ref<Novelties[]>([]); // Aquí deberías tener tus novelties
const noveltySelected = ref<Novelties | null>(null);
const noveltyToDelete = ref<Novelties | null>(null);
const total = ref(0);
const itemsCount = ref(0);
const editingIndex = ref(-1);
const userInfo = sessionStorageService.getItem('userInfo') as { username?: string } | null;

const initializeWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentWeekStart.value = new Date(today);
  currentWeekStart.value.setDate(today.getDate() + diff);
  currentWeekStart.value.setHours(0, 0, 0, 0);

};
interface DayInfo {
  dayName: string;
  dayNumber: number;
  month: string;
  date: string;
  isToday: boolean;
}

const currentMonth = new Date().toISOString().slice(0, 7);
const filters = ref({
  user: userInfo?.username ?? '',
  e_user: "",
  type: "",
  status: "Pendiente",
  date: currentMonth
})

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
    const [year = 0, month = 1, day = 1] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  selectedDates.value = [
    stringToDate(object.start_date),
    stringToDate(object.end_date)
  ];

  showModal.value = true;
};

type NoveltiesForm = Novelties & {
  search?: string;
};

const form = reactive<NoveltiesForm>({
  id_novelty: undefined,
  e_user: userInfo?.username ?? '',
  leave_type: "",
  start_date: "",
  end_date: "",
  status: "",
  comments: "",
  search: ""
})


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

    if (dateStr) {
      days.push({ dayName, dayNumber, month, date: dateStr, isToday });
    }
  }

  return days;
});

const closeModal = () => {
  noveltySelected.value = null
  showModal.value = false
  showModalNovelties.value = false
}
const openModal = (novelty?: Novelties) => {
  if (novelty) {
    noveltySelected.value = novelty
    showModal.value = false
    isEditing.value = true
    return
  }
  showModal.value = true
  isEditing.value = false
  noveltySelected.value = null
  form.leave_type = ""
  selectedDates.value = null
}

const handleSubmit = () => {
  if (isEditing.value) {
    update()
    return
  }
  create()
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

function setDateWithoutTime(year: number, month: number, day: number) {
  return new Date(
    Number(year),
    Number(month),
    Number(day)
  );
}

const previousDateToday = (date: string): boolean => {
  const [year, month, day] = date.split('-');
  const today = new Date();

  const dateCompare = setDateWithoutTime(Number(year), Number(month) - 1, Number(day))
  const todayWithoutTime = setDateWithoutTime(today.getFullYear(), today.getMonth(), today.getDate())

  return dateCompare.getTime() < todayWithoutTime.getTime();
};

const loadEmployeeSchedule = async () => {
  try {
    holidayServices.getLocalStorage()
    const response = await employeeScheduleService.getAll()
    if (response.data && response.data.results) {
      employeeSchedules.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar la programación de empleados: ", error)
  }
}

const loadEusers = async () => {
  try {

    const response = await eUsersServices.getAll()
    if (response.data && response.data.results) {
      eUsers.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los E-Users: ", error)
  }
}

const loadNovelties = async (dataFilters?: NoveltiesFiltered) => {
  try {
    holidayServices.getLocalStorage()
    const response = await noveltiesService.getAllFiltered(1, 10, dataFilters)
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
      leaveTypes.value = response.data.results.filter(type => (type.leave_type !== 'VACACIONES' ))
    }
  } catch (error) {
    console.error("Error al cargar los tipos de licencia: ", error)
  }
}

const create = async () => {
  try {    
    if (previousDateToday(form.start_date) || previousDateToday(form.end_date)) {
      notification.error("Error", "No se puede seleccionar fechas pasadas")
      return
    }

    let data: Novelties = ({
      leave_type: form.leave_type,
      e_user: userInfo?.username ?? "",
      start_date: form.start_date,
      end_date: form.end_date,
      status: 'Pendiente',
      comments: form.comments
    })

    let response = await noveltiesService.create(data)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "La novedad ha sido creada correctamente"
      );
      loadNovelties()
      closeModal();
      return
    }
    console.error("Error al crear la novedad: ", response.error)
    notification.error("Error", "No se logro crear la novedad")
    closeModal();
  } catch (error) {
    console.error("Error al crear la novedad: ", error)
    notification.error("Error", "No se logro crear la novedad")
    closeModal();
  }
}

const update = async () => {
  try {
    if (previousDateToday(form.start_date) || previousDateToday(form.end_date)) {
      notification.error("Error", "No se puede seleccionar fechas pasadas")
      return
    }
    let data: Novelties = ({
      leave_type: form.leave_type,
      e_user: userInfo?.username ?? "",
      start_date: form.start_date,
      end_date: form.end_date === "" ? form.start_date : form.end_date,
      comments: form.comments,
      status: "Pendiente"
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
      loadNovelties();
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

const confirmDelete = (code: Novelties) => {
  noveltyToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  noveltyToDelete.value = null;
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

onMounted(async () => {
  await loadEusers();
  await loadLeaveTypes();
  await loadEmployeeSchedule();
  initializeWeek()
  await loadNovelties();
});

</script>
