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
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 transition-all group relative"
              :class="{
                'opacity-65': previousDateToday(object.date),
              }">
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
              class="flex-1 px-4 py-3 border-t-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-all font-medium cursor-pointer" style="border-top-width:1px">
              Cancelar
            </button>
          </div>            
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted} from "vue";
// @ts-ignore
import '@vuepic/vue-datepicker/dist/main.css'
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquareWarning
} from "lucide-vue-next";
import { eUsersService } from '../services/e-usersService.ts';
import type { EUser } from "../models/EUser.ts";
import type { EmployeeSchedule } from '../models/EmployeeSchedule.ts';
import { EmployeeScheduleService } from '../services/employeeSchedule.ts';
import { Holidays } from "../utils/holidays.ts";
import { NoveltiesService } from '../services/Novelties.ts';
import type { Novelties, NoveltiesFiltered } from '../models/Novelties.ts'
import { LeaveTypesService } from "../services/LeaveTypes.ts";
import type { LeaveType } from "../models/LeaveTypes.ts";
import { SessionStorageService } from "../services/SessionStorageService.ts";


const sessionStorageService = new SessionStorageService();
const eUsersServices = new eUsersService();
const noveltiesService = new NoveltiesService();
const leaveTypesService = new LeaveTypesService();
const eUsers = ref<EUser[]>([]);
const employeeScheduleService = new EmployeeScheduleService() // Debe ser optimizado para buscar en el rango de fecha de masximo 3 semanas.
const employeeSchedules = ref<EmployeeSchedule[]>([])
const currentWeekStart = ref(new Date());
const holidayServices = new Holidays();
const holidays = ref<string[]>(holidayServices.getLocalStorage() || []);
const showModal = ref(false);
const showModalNovelties = ref(false);
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

const openModalNovelties = (day: DayInfo) => {
  showModalNovelties.value = true
  noveltiesToShow.value = noveltisByDates[day.date]
  dateNoveltiesToShow.value = day
}

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

const getAtributesUser = (user: string) => {
  const userFound = eUsers.value.find(item => item.network_user === user)
  const rolName = userFound?.rol_name
  const fullName = userFound?.full_name
  return { rolName: rolName, fullName: fullName }
}

onMounted(async () => {
  await loadEusers();
  await loadLeaveTypes();
  await loadEmployeeSchedule();
  initializeWeek()
  await loadNovelties();
});

</script>
