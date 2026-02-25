<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <ChartBar class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Reportes de Métricas
          </h1>
          <p class="text-xs text-slate-500">
            Análisis de rendimiento por usuario
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm p-6">
      <div class="mb-6">
        <div class="relative">
          <input
            id="user-search"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre..."
            class="w-full pl-4 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
            @input="handleSearch"
            @focus="showDropdown = true"
          />
          <div
            v-if="isLoading"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <div
              class="w-5 h-5 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
          <div
            v-if="showDropdown && filteredUsers.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-10"
          >
            <div
              v-for="user in filteredUsers"
              :key="user.network_user"
              class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
              @click="selectUser(user)"
            >
              <div class="font-semibold text-slate-800">
                {{ getFullName(user) }}
              </div>
              <div class="text-sm text-slate-500">
                {{ user.email || user.network_user }}
              </div>
            </div>
          </div>
          <div
            v-if="
              showDropdown &&
              searchQuery &&
              filteredUsers.length === 0 &&
              !isLoading
            "
            class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg p-4 z-10"
          >
            <div class="text-sm text-slate-500 text-center">
              No se encontraron usuarios
            </div>
          </div>
        </div>
        <div
          v-if="selectedUser"
          class="mt-4 flex items-center justify-between p-4 bg-gradient-to-br from-[#021C7D] to-[#50bdeb] rounded-xl"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            >
              <span class="text-lg font-bold text-[#021C7D]">{{
                getInitials(selectedUser)
              }}</span>
            </div>
            <div>
              <div class="font-bold text-white">
                {{ getFullName(selectedUser) }}
              </div>
              <div class="text-sm text-white/90">
                {{ selectedUser.email || selectedUser.network_user }}
              </div>
              <div class="text-xs text-white/80 mt-1">
                {{ selectedUser.rol_name }}
              </div>
            </div>
          </div>
          <button
            @click="clearSelection"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X class="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div v-if="selectedUser">
        <div class="border-t-2 border-slate-100 pt-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-[#021C7D]">
              Métricas de Rendimiento
            </h2>
            <ExportChartsToPDF
              :userName="selectedUserFullName"
              :userRole="selectedUser.rol_name"
              :cumplimientoValue="cumplimientoValue"
              :ocupacionValue="ocupacionValue"
              compact
            />
          </div>
          <div
            v-if="isLoadingMetrics"
            class="flex items-center justify-center py-12"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 border-4 border-[#50bdeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"
              ></div>
              <p class="text-sm text-slate-500">Cargando métricas...</p>
            </div>
          </div>
          <div v-else class="grid grid-cols-2 gap-4">
            <div
              class="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-white transition-colors"
            >
              <CircularProgressChart
                title="Cumplimiento"
                :value="cumplimientoValue"
                color="#021c7d"
                height="240px"
              />
            </div>
            <div
              class="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-white transition-colors"
            >
              <CircularProgressChart
                title="Ocupación"
                :value="ocupacionValue"
                color="#50bdeb"
                height="240px"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 text-slate-400"
      >
        <div
          class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4"
        >
          <ChartBar class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-sm font-medium text-slate-500">
          Selecciona un usuario para ver las métricas
        </p>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm p-6">
      <h2 class="text-lg font-bold text-[#021C7D] mb-4">
        Estadísticas Generales
      </h2>
      <div class="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6">
        <h3 class="text-md font-bold text-[#021C7D] mb-3">
          Tickets Creados vs Cerrados (Última Semana)
        </h3>
        <LineComparisonChart
          :createdData="ticketsCreatedData"
          :closedData="ticketsClosedData"
          :categories="timeCategories"
          height="350px"
        />
      </div>
      <div class="border-t-2 border-slate-100 pt-6">
        <h3 class="text-md font-bold text-[#021C7D] mb-4">Exportar Reportes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            v-for="option in exportOptions"
            :key="option.id"
            @click="handleExport(option.id)"
            class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4 transition-all duration-300 hover:border-transparent hover:shadow-lg"
          >
            <div
              :class="[
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                option.color,
              ]"
            ></div>
            <div class="relative flex flex-col items-center gap-3">
              <div
                :class="[
                  'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                  option.bgColor,
                  'group-hover:bg-white/20',
                ]"
              >
                <component
                  :is="option.icon"
                  :class="[
                    'w-7 h-7 transition-colors duration-300',
                    option.textColor,
                    'group-hover:text-white',
                  ]"
                />
              </div>
              <div class="text-center">
                <div
                  class="font-bold text-slate-800 group-hover:text-white transition-colors duration-300"
                >
                  {{ option.name }}
                </div>
                <div
                  class="text-xs text-slate-500 group-hover:text-white/90 transition-colors duration-300 mt-1"
                >
                  {{ option.description }}
                </div>
              </div>
              <div
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FileDown class="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <BarChart3 class="w-4 h-4" />
          <span>Selecciona el formato de exportación deseado</span>
        </div>
      </div>
    </div>
    <DriverReportModal
      :isOpen="showDriverModal"
      @close="showDriverModal = false"
      @generate="handleDriverReport"
    />
    <GeneralExportModal
      :isOpen="showGeneralExportModal"
      @close="showGeneralExportModal = false"
      @export="handleGeneralExport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  ChartBar,
  X,
  FileText,
  FileSpreadsheet,
  FileDown,
  BarChart3,
} from "lucide-vue-next";
import { eUsersService } from "../services/e-usersService";
import { TicketsService } from "../services/ticketsService";
import { type EUser } from "../models";
import CircularProgressChart from "../components/CircularProgressChart.vue";
import LineComparisonChart from "../components/LineComparisonChart.vue";
import DriverReportModal, {
  type DriverReportParams,
} from "../components/DriverReportModal.vue";
import GeneralExportModal, {
  type GeneralExportParams,
} from "../components/GeneralExportModal.vue";
import ExportChartsToPDF from "../components/ExportChartsToPDF.vue";
import { useNotification } from "../utils/useNotification";

const notification = useNotification();
const searchQuery = ref("");
const selectedUser = ref<EUser | null>(null);
const allUsers = ref<EUser[]>([]);
const isLoading = ref(false);
const showDropdown = ref(false);
const isLoadingMetrics = ref(false);
const cumplimientoValue = ref(0);
const ocupacionValue = ref(0);
const ticketsCreatedData = ref<number[]>([]);
const ticketsClosedData = ref<number[]>([]);
const timeCategories = ref<string[]>([]);
const isLoadingWeeklyStats = ref(false);
const eUserService = new eUsersService();
const ticketsService = new TicketsService();
const showDriverModal = ref(false);
const showGeneralExportModal = ref(false);

const exportOptions = ref([
  {
    id: "driver",
    name: "Driver",
    description: "Reporte de gestión y seguimiento",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: "general-export",
    name: "Exporte General",
    description: "Exportar datos con filtros avanzados",
    icon: FileSpreadsheet,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
]);

const selectedUserFullName = computed(() => {
  if (!selectedUser.value) return "";
  return getFullName(selectedUser.value);
});

const handleExport = (exportType: string) => {
  if (exportType === "driver") {
    showDriverModal.value = true;
  } else if (exportType === "general-export") {
    showGeneralExportModal.value = true;
  }
};

// Manejar generación del reporte Driver
const handleDriverReport = (params: DriverReportParams) => {
  console.log("Generando reporte Driver con parámetros:", params);
};

// Manejar exportación general
const handleGeneralExport = (params: GeneralExportParams) => {
  console.log("Exportando datos con parámetros:", params);
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value.slice(0, 10);

  const query = searchQuery.value.toLowerCase();
  return allUsers.value
    .filter((user) => {
      const fullName = getFullName(user).toLowerCase();
      const email = user.email?.toLowerCase() || "";
      const networkUser = user.network_user.toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        networkUser.includes(query)
      );
    })
    .slice(0, 10);
});

const loadUsers = async () => {
  isLoading.value = true;
  try {
    const response = await eUserService.getAll();
    if (response.data && response.data.results) {
      allUsers.value = response.data.results || [];
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los usuarios");
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  showDropdown.value = true;
};

const selectUser = async (user: EUser) => {
  selectedUser.value = user;
  searchQuery.value = getFullName(user);
  showDropdown.value = false;

  await loadMetrics(user.network_user);
};

const clearSelection = () => {
  selectedUser.value = null;
  searchQuery.value = "";
  showDropdown.value = false;
  cumplimientoValue.value = 0;
  ocupacionValue.value = 0;
};

const loadMetrics = async (networkUser: string) => {
  isLoadingMetrics.value = true;
  try {
    const now = new Date();
    const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1);
    const fechaDesde = primerDiaMes.toISOString().split("T")[0];
    const fechaHasta = now.toISOString().split("T")[0];

    const cumplimientoResponse = await eUserService.getMetricasCumplimiento(
      networkUser,
      fechaDesde,
      fechaHasta,
    );

    if (cumplimientoResponse.success && cumplimientoResponse.data) {
      cumplimientoValue.value = Math.round(
        cumplimientoResponse.data.data.porcentaje_cumplimiento,
      );
    }

    try {
      const ocupacionResponse = await eUserService.getMetricasOcupacion(
        networkUser,
        fechaDesde,
        fechaHasta,
      );

      if (ocupacionResponse.success && ocupacionResponse.data) {
        ocupacionValue.value = Math.round(
          ocupacionResponse.data.data.porcentaje_ocupacion,
        );
      }
    } catch (error) {
      notification.error("Error", "Error al cargar métricas de ocupación");
      ocupacionValue.value = 0;
    }
  } catch (error) {
    notification.error("Error", "Error al cargar métricas del usuario");
    cumplimientoValue.value = 0;
    ocupacionValue.value = 0;
  } finally {
    isLoadingMetrics.value = false;
  }
};

const loadWeeklyStats = async () => {
  isLoadingWeeklyStats.value = true;
  try {
    const response = await ticketsService.getWeeklyStats();

    if (response.success && response.data) {
      const stats = response.data.data;
      timeCategories.value = stats.datos_diarios.map((d) => d.dia);
      ticketsCreatedData.value = stats.datos_diarios.map((d) => d.creados);
      ticketsClosedData.value = stats.datos_diarios.map((d) => d.cerrados);
    }
  } catch (error) {
    notification.error("Error", "Error al cargar estadísticas semanales");
  } finally {
    isLoadingWeeklyStats.value = false;
  }
};

const getFullName = (user: EUser): string => {
  const parts = [
    user.name,
    user.middle_name,
    user.last_name,
    user.second_last_name,
  ].filter(Boolean);
  return parts.join(" ");
};

const getInitials = (user: EUser): string => {
  const name = user.name?.charAt(0) || "";
  const lastName = user.last_name?.charAt(0) || "";
  return (name + lastName).toUpperCase();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  loadUsers();
  loadWeeklyStats();
  document.addEventListener("click", handleClickOutside);
});
</script>
