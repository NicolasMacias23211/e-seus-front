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
      <div class="grid grid-cols-6 border-b-2 bg-slate-50">
        <div class="p-4 border-r-2 flex flex-col justify-center">
          <input 
            id="client"
            v-model="search"
            type="text" required autocomplete="off"
            class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            placeholder="Buscar usuario a asignar..." 
          /> 
        </div>
        <div
          v-for="day in weekDays"
          :key="day.date"
          class="p-4 text-center border-r-2 last:border-r-0"
          :class="{ 
            'bg-blue-50': day.isToday,
            'bg-gray-300': holidays.includes(day.date)
            }"
        >
          <p
            class="text-xs font-bold uppercase mb-1"
            :class="day.isToday 
              ? 'text-[#50bdeb]' 
              : holidays.includes(day.date) 
              ? 'text-slate-400' 
              : 'text-slate-700'
            "
          >
            {{ day.dayName }}
          </p>
          <p
            class="text-2xl font-bold mb-1"
            :class="day.isToday 
              ? 'text-[#021C7D]' 
              : holidays.includes(day.date) 
              ? 'text-slate-400' 
              : 'text-slate-700'
            "
          >
            {{ day.dayNumber }}
          </p>
          <p 
            class="text-xs"
            :class="holidays.includes(day.date) 
              ? 'text-slate-400' 
              : 'text-slate-700'
            " 
            >
            {{ day.month }}</p>
        </div>
      </div>
      <div class="grid grid-cols-6 min-h-[500px]">
        <div class="border-r-2 bg-slate-50/50 p-3">
          <div class="space-y-2">
            <p class="text-xs text-center font-bold text-slate-600 uppercase mb-3">
              Usuarios E-learning
            </p>
            <div v-if="filteredEUser.length === 0"
              class="bg-gray-200 rounded-lg p-3"
            >
            No se encontraron usuarios
            </div>
            <div
              v-for="user in filteredEUser"
              :key="user.name"
              draggable="true"
              @dragstart="handleDragStart($event, user)"
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 cursor-move hover:border-[#50bdeb] hover:shadow-md transition-all"
            >
              <div class="flex items-center gap-2 mb-1">
                <p class="text-xs font-bold text-[#50bdeb]">
                  {{ user.rol_name }}
                </p>
              </div>
              <p class="text-xs text-slate-700 font-medium line-clamp-2">
                {{ user.full_name }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="day in weekDays"
          :key="day.date"
          class="border-r-2 last:border-r-0 p-3 space-y-2"
          :class="{ 
            'bg-blue-50': day.isToday,
            'bg-gray-300': holidays.includes(day.date)
            }"
          @dragover.prevent
          @drop="handleDrop($event, day.date)"
        >
          <div
            v-for="object in employeeSchedulesByDate[day.date]"
            :key="object.id_employee_schudele"
            :draggable="!previousDateToday(day.date)"
            @dragstart="handleDragStart($event, object)"
          >
            <div
              v-if="day.date === object.date"
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 hover:border-[#50bdeb] hover:shadow-md transition-all group relative"
              :class="{ 
                'opacity-65': previousDateToday(object.date),
                'cursor-move': !previousDateToday(object.date), 
                'cursor-default': previousDateToday(object.date) 
              }"
            >
              <button
                v-if="!previousDateToday(object.date)"
                @click="confirmDelete(object)"
                class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold cursor-pointer"
              >
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
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar a ${getAtributesUser(employeeScheduleToDelete?.e_user || '').fullName} la programación del día ${employeeScheduleToDelete?.date}?`"
      details="Esta acción eliminará permanentemente la programación del sistema. Los ticket relacionados a esta programación también podrían verse afectados."
      confirm-text="Sí, Eliminar" cancel-text="Cancelar" @confirm="handleDeleteConfirm" @cancel="handleDeleteCancel" 
      />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { eUsersService } from '../../services/e-usersService';
import type { EUser } from "../../models/EUser";
import type { EmployeeSchedule } from '../../models/EmployeeSchedule';
import { EmployeeScheduleService } from '../../services/employeeSchedule';
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { Holidays } from "../../utils/holidays.ts";

const notification = useNotification();
const eUsersServices = new eUsersService();
const eUsers = ref<EUser[]>([]);
const employeeScheduleService = new EmployeeScheduleService() // Debe ser optimizado para buscar en el rango de fecha de masximo 3 semanas.
const employeeSchedules = ref<EmployeeSchedule[]>([])
const currentWeekStart = ref(new Date());
const search = ref('');
const employeeScheduleToDelete = ref<EmployeeSchedule | null>(null);
const showConfirmDialog = ref(false);
const holidayServices = new Holidays();
const holidays = ref<string[]>(holidayServices.getLocalStorage() || []);
const draggedElement = ref<EmployeeSchedule | EUser | null>(null);
const filteredEUser = computed(() => {
  return eUsers.value.filter((user) => user.full_name.toLowerCase().includes(search.value.toLowerCase()))
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

function setDateWithoutTime (year: number, month: number, day: number) {
  return new Date(
    Number(year),
    Number(month),
    Number(day)
  );
}

const previousDateToday = (date: string): boolean => {
  const [year, month, day] = date.split('-');
  const today = new Date();

  const dateCompare = setDateWithoutTime(Number(year), Number(month) -1, Number(day))
  const todayWithoutTime = setDateWithoutTime(today.getFullYear(), today.getMonth(), today.getDate())
  
  return dateCompare.getTime() < todayWithoutTime.getTime();
};
const dateSameDateObject = (date: string, dateObject: string): boolean => {
  var [year, month, day] = date.split('-');
  const newDate = setDateWithoutTime(Number(year), Number(month) -1, Number(day))
  
  var [year, month, day] = dateObject.split('-');
  const newDateObject = setDateWithoutTime(Number(year), Number(month) -1, Number(day))
  
  return newDate.getTime() == newDateObject.getTime();
};

const previousWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7);
  loadEmployeeSchedule();
};

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7);
  loadEmployeeSchedule();
};

const goToToday = () => {
  initializeWeek();
  loadEmployeeSchedule();
  
};

function elementIsEUser(
  object: EUser | EmployeeSchedule
): object is EUser {
  return "network_user" in object;
}

const handleDragStart = (event: DragEvent, object: EUser | EmployeeSchedule) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
  }

  if(elementIsEUser(object)){
    draggedElement.value = employeeSchedules.value.find(item => item.e_user === object.network_user) || null
    return
  }

  if (previousDateToday(object.date)) {
    return
  }

  draggedElement.value = object
}

const handleDrop = (event: DragEvent, date: string | undefined) => {
  event.preventDefault();

  if(holidays.value.includes(date || '')){
    notification.error(
      "Error",
      "No se pueden agregar registros en días festivos",
    );
    draggedElement.value = null;
    return;
  }

  if (!draggedElement.value || !date) return;
  
  if (previousDateToday(date)) {
    notification.error(
      "Error",
      "No se pueden agregar registros en fechas pasadas",
    );
    draggedElement.value = null;
    return;
  }

  if(elementIsEUser(draggedElement.value)){
    create(draggedElement.value.network_user, date)
    return
  }

  if(dateSameDateObject(date, draggedElement.value.date)){
    return
  }
  
  update(draggedElement.value, date)
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

const create = async (userName: string, date: string) => {
  try {
    const [year, month, day] = date.split("-").map(Number);

    let dataCreate: EmployeeSchedule = ({
      e_user: userName,
      date: `${year}-${month}-${day}`
    })


    let response = await employeeScheduleService.create(dataCreate)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "Se agrego el usuario enla fecha elegida"
      );
      loadEmployeeSchedule();
      return
    }
    console.error("Error al crear la programación: ", response.error)
    notification.error("Error", "No se logro crear la programación")
  } catch (error) {
    console.error("Error al crear la programación: ", error)
    notification.error("Error", "No se logro crear la programación")
  }
}

const update = async (object :EmployeeSchedule, date: string) => {
  try {
    const [year, month, day] = date.split("-").map(Number);

    let dataCreate: EmployeeSchedule = ({
      e_user: object.e_user,
      date: `${year}-${month}-${day}`
    })

    if(!object.id_employee_schudele) {
      console.error("Error al actualizar la programación id")
      notification.error("Error", "No se logro actualizar la programación id")
      return
    }

    let response = await employeeScheduleService.update(dataCreate, object.id_employee_schudele)
    
    if (response.success) {
      notification.success(
        "Actualizado!",
        "Se modifico la fecha para el usuario"
      );
      loadEmployeeSchedule();
      return
    }
    console.error("Error al crear la programación: ", response.error)
    notification.error("Error", "No se logro crear la programación")
  } catch (error) {
    console.error("Error al crear la programación: ", error)
    notification.error("Error", "No se logro crear la programación")
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
          "El horario ha sido eliminado correctamente"
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
  return {rolName: rolName, fullName: fullName}
}


onMounted(async () => {
  await loadEusers();
  await loadEmployeeSchedule();
  initializeWeek()
});

</script>
