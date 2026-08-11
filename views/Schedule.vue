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
      <div class="flex items-center gap-3">
        <button @click="previousWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all cursor-pointer">
          <ChevronLeft class="w-5 h-5 text-slate-600" />
        </button>
        <div class="text-center px-4">
          <p class="text-sm font-bold text-[#021C7D]">{{ currentWeekLabel }}</p>
          <p class="text-xs text-slate-500">{{ currentYearLabel }}</p>
        </div>
        <button @click="nextWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all cursor-pointer">
          <ChevronRight class="w-5 h-5 text-slate-600" />
        </button>
        <button @click="goToToday"
          class="px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer">
          Hoy
        </button>
      </div>
      <button @click="openModal()"
        class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] cursor-pointer text-white px-5 py-3 rounded-xl shadow min-w-[200px] max-w-[200px] w-full">
        + Nueva novedad
      </button>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <div class="grid grid-cols-5 border-b-2 bg-slate-50">
        <div v-for="day in weekDays" :key="day.date"
          class=" flex items-center justify-center gap-2 p-4 text-center border-r-2 last:border-r-0" :class="{
            'bg-blue-50': day.isToday,
            'bg-gray-300': holidays.includes(day.date)
          }">
          <div class="">
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
            <p class="text-xs" :class="holidays.includes(day.date)
              ? 'text-slate-400'
              : 'text-slate-700'
              ">
              {{ day.month }}</p>

          </div>
          <MessageSquareWarning v-if="getNoveltiesByDate(day.date)" class="text-red-500 cursor-pointer"
            @click="openModalNovelties(day)" />
        </div>
      </div>
      <div class="grid grid-cols-5 min-h-[500px]">
        <div v-for="day in weekDays" :key="day.date" class="border-r-2 last:border-r-0 p-3 space-y-2" :class="{
          'bg-blue-50': day.isToday,
          'bg-gray-300': holidays.includes(day.date)
        }">
          <div v-for="object in employeeSchedulesByDate[day.date]" :key="object.id_employee_schudele">
            <div v-if="day.date === object.date"
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 hover:border-[#50bdeb] hover:shadow-md transition-all group relative"
              :class="{
                'opacity-65': previousDateToday(object.date),
                'cursor-move': !previousDateToday(object.date),
                'cursor-default': previousDateToday(object.date)
              }">
              <button v-if="!previousDateToday(object.date)" @click="confirmDelete(object)"
                class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold cursor-pointer">
                X
              </button>
              <div class="flex items-center gap-2 mb-2">
                <p class="text-xs font-bold text-[#50bdeb]">
                  {{ getAtributesUser(object.e_user).rolName }}
                </p>
              </div>
              <p class="text-xs text-slate-700 font-medium mb-3 truncate">
                {{ getAtributesUser(object.e_user).fullName }}
              </p>
            </div>
          </div>
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
    <Teleport to="body">
      <div v-if="showModalNovelties"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 w-full overflow-auto"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden animate-scale-in">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              Novedades para el {{ dateNoveltiesToShow?.dayNumber }} de {{ new Date(dateNoveltiesToShow?.date ?? "").toLocaleDateString("es-ES", {month: "long",}) }}
            </h2>
          </div>

          <article class="p-6 space-y-4 max-h-[calc(95vh-180px)] overflow-auto">
            <div v-for="novelty in noveltiesToShow"
              class="relative flex justify-between items-start bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">

              <!-- Contenido -->
              <div class="flex-1 p-3 pl-5">
                <div class="flex items-center justify-between">
                  <p class="mt-2 text-lg font-medium text-gray-800">
                    {{ novelty.user_name + ' ' + novelty.user_last_name }}
                  </p>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ novelty.leave_type_name }}
                  </h3>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-gray-500">Fecha inicio</p>
                    <p class="font-medium">{{ novelty.start_date }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Fecha fin</p>
                    <p class="font-medium">{{ novelty.end_date }}</p>
                  </div>
                </div>
              </div>

              <!-- Borde indicador -->
              <div 
                class="w-3 self-stretch"
                :style="{ backgroundColor: novelty.leave_type_color }"
              ></div>

            </div>
          </article>
          <div class="flex gap-3 pt-4">

            <button type="button" @click="closeModal"
              class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-all font-medium cursor-pointer">
              Cancelar
            </button>
          </div>            
        </div>
      </div>
    </Teleport>
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar a ${getAtributesUser(employeeScheduleToDelete?.e_user || '').fullName} la programación del día ${employeeScheduleToDelete?.date}?`"
      details="Esta acción eliminará permanentemente la programación del sistema. Los ticket relacionados a esta programación también podrían verse afectados."
      confirm-text="Sí, Eliminar" cancel-text="Cancelar" @confirm="handleDeleteConfirm" @cancel="handleDeleteCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from "vue";
import { VueDatePicker } from '@vuepic/vue-datepicker'
// @ts-ignore
import '@vuepic/vue-datepicker/dist/main.css'
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquareWarning
} from "lucide-vue-next";
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
const search = ref('');
const employeeScheduleToDelete = ref<EmployeeSchedule | null>(null);
const showConfirmDialog = ref(false);
const holidayServices = new Holidays();
const holidays = ref<string[]>(holidayServices.getLocalStorage() || []);
const showModal = ref(false);
const showModalNovelties = ref(false);
const isEditing = ref(false);
const leaveTypes = ref<LeaveType[]>([]);
const novelties = ref<Novelties[]>([]); // Aquí deberías tener tus novelties
const noveltiesToShow = ref<Novelties[]>([]); // Aquí deberías tener tus novelties
const noveltySelected = ref<Novelties | null>(null);
const total = ref(0);
const itemsCount = ref(0);

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
const dateNoveltiesToShow = ref<DayInfo | null>(null);
const userInfo = sessionStorageService.getItem('userInfo') as { username?: string } | null;

const form = reactive<Novelties>({
  id_novelty: undefined,
  e_user: "",
  leave_type: "",
  start_date: "",
  end_date: "",
  status: "",
  comments: ""
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
  isEditing.value = false
  noveltySelected.value = null
  showModal.value = true
}
const openModalNovelties = (day: DayInfo) => {
  showModalNovelties.value = true
  noveltiesToShow.value = noveltisByDates[day.date]
  dateNoveltiesToShow.value = day
}

const handleSubmit = () => {
  if (isEditing.value) {
    update()
    return
  }
  create()
};

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

const employeeSchedulesByDate = computed(() => {
  const grouped: Record<string, EmployeeSchedule[]> = {};

  employeeSchedules.value.forEach(schedule => {
    if (!grouped[schedule.date]) {
      grouped[schedule.date] = [];
    }
    grouped[schedule.date]!.push(schedule);
  });

  return grouped;
});

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

const previousWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7);
  noveltisByDates = {}
  loadEmployeeSchedule();
  loadNovelties();
};

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7);
  noveltisByDates = {}
  loadEmployeeSchedule();
  loadNovelties();
};

const goToToday = async () => {
  noveltisByDates = {}
  initializeWeek();
  loadEmployeeSchedule();

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
let noveltisByDates: Record<string, any[]> = {};
function getNoveltiesByDate(date: string): boolean {
  noveltisByDates[date] = novelties.value.filter(item => (
    item.start_date <= date && date <= item.end_date
  ))
  return noveltisByDates[date].length > 0;
}

const loadNovelties = async () => {
  try {
    const user = sessionStorageService.getItem('userInfo') as any
    const dataFilters: NoveltiesFiltered = {
      e_user: user.username,
      status: 'Aprobado',
      start_date: weekDays.value[0]?.date,
      end_date: weekDays.value[weekDays.value.length - 1]?.date
    }

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
      loadNovelties();
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

const confirmDelete = (code: EmployeeSchedule) => {
  employeeScheduleToDelete.value = code;
  showConfirmDialog.value = true;
};
const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  employeeScheduleToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (employeeScheduleToDelete.value && employeeScheduleToDelete.value.id_employee_schudele != undefined) {
      let response = await employeeScheduleService.delete(employeeScheduleToDelete.value.id_employee_schudele)
      if (response.success) {
        notification.success(
          "¡Eliminado!",
          "la novedad ha sido eliminado correctamente"
        );

        loadEmployeeSchedule();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar la programación: ", response.error)
      notification.error("Error", "No se logro eliminar la programación")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar la programación: ", error)
    notification.error("Error", "No se logro eliminar la programación")
    handleDeleteCancel()
  }
};

const getAtributesUser = (user: string) => {
  const userFound = eUsers.value.find(item => item.network_user === user)
  const rolName = userFound?.rol_name
  const fullName = userFound?.full_name
  return { rolName: rolName, fullName: fullName }
}

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
