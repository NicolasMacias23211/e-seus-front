<template>
  <header
    class="h-16 border-b-2 bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center shadow-md"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-[#021C7D]">Sistema de Tickets</h2>
          <p class="text-xs text-slate-500 font-medium">
            Gestión y seguimiento
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="showHelpModal = true"
        class="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all hover:shadow-sm cursor-pointer"
        title="Ayuda"
      >
        <HelpCircle class="h-5 w-5" />
      </button>

      <div class="relative" v-if="isGeneratingExport || isExportReady || isGeneratingDriver || isDriverReady">
        <button
          class="p-2.5 rounded-xl hover:bg-slate-100 relative transition-all hover:shadow-sm cursor-pointer"
          @click="toggleExportMenu"
          title="Descargas"
        >
          <Download class="h-6 w-6" :class="(isGeneratingExport || isGeneratingDriver) ? 'text-slate-400 animate-pulse' : 'text-[#021C7D]'" />
          <span
            v-if="isExportReady || isDriverReady"
            class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white"
          ></span>
        </button>

        <div
          v-if="showExportMenu"
          class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border-2 z-50"
        >
          <div class="px-5 py-4 border-b-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]">
            <h3 class="font-bold text-white">Descargas</h3>
            <p class="text-xs text-white/80 mt-0.5">Reportes listos para descargar</p>
          </div>

          <div v-if="isGeneratingExport || isGeneratingDriver" class="flex items-center gap-3 px-5 py-4">
            <div class="w-8 h-8 border-3 border-[#50bdeb] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            <div>
              <p class="text-sm font-semibold text-slate-800">Generando reporte...</p>
              <p class="text-xs text-slate-500">Esto puede tomar unos segundos</p>
            </div>
          </div>

          <div v-else class="p-4 space-y-3">
            <!-- General Export card -->
            <div v-if="isExportReady" class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle class="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-800">Exporte General</p>
                    <p class="text-xs text-slate-500">{{ exportData.length }} registros &middot; listo a las {{ formatReadyAt(readyAt) }}</p>
                  </div>
                </div>
                <button
                  @click="clearExport(); showExportMenu = false"
                  class="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X class="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <ExportToExcel
                  :data="exportData"
                  fileName="reporte_general"
                  sheetName="Reporte General"
                  title="Exporte General de Tickets"
                  :customHeaders="GENERAL_EXPORT_HEADERS"
                  buttonClass="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs transition-colors w-full"
                >
                  <FileSpreadsheet class="w-3.5 h-3.5" />
                  Excel
                </ExportToExcel>
                <ExportToPDF
                  :data="exportData"
                  fileName="reporte_general"
                  title="Exporte General de Tickets"
                  :customHeaders="GENERAL_EXPORT_HEADERS"
                  orientation="landscape"
                  buttonClass="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-colors w-full"
                >
                  <FileText class="w-3.5 h-3.5" />
                  PDF
                </ExportToPDF>
              </div>
            </div>

            <!-- Driver Report card -->
            <div v-if="isDriverReady" :class="{ 'border-t border-slate-100 pt-3': isExportReady }" class="space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CheckCircle class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-800">Reporte Driver</p>
                    <p class="text-xs text-slate-500">{{ driverExportData.length }} registros &middot; listo a las {{ formatReadyAt(driverReadyAt) }}</p>
                  </div>
                </div>
                <button
                  @click="clearDriverExport(); showExportMenu = false"
                  class="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X class="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <ExportToExcel
                  :data="driverExportData"
                  fileName="reporte_driver"
                  sheetName="Reporte Driver"
                  title="Reporte Driver"
                  :customHeaders="DRIVER_REPORT_HEADERS"
                  buttonClass="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs transition-colors w-full"
                >
                  <FileSpreadsheet class="w-3.5 h-3.5" />
                  Excel
                </ExportToExcel>
                <ExportToPDF
                  :data="driverExportData"
                  fileName="reporte_driver"
                  title="Reporte Driver"
                  :customHeaders="DRIVER_REPORT_HEADERS"
                  orientation="landscape"
                  buttonClass="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-colors w-full"
                >
                  <FileText class="w-3.5 h-3.5" />
                  PDF
                </ExportToPDF>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="relative">
        <button
          class="p-2.5 rounded-xl hover:bg-slate-100 relative transition-all hover:shadow-sm cursor-pointer"
          @click="toggleNotifications"
          title="Notificaciones"
        >
          <Bell class="h-5 w-5 text-slate-600" />
          <span
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md animate-pulse"
          >
            3
          </span>
        </button>

        <div
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border-2 z-50"
        >
          <div
            class="px-5 py-4 border-b-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]"
          >
            <h3 class="font-bold text-white">Notificaciones</h3>
            <p class="text-xs text-white/80 mt-0.5">
              Tienes 3 notificaciones nuevas
            </p>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <button
              v-for="notification in notifications"
              :key="notification.id"
              class="w-full px-5 py-4 hover:bg-slate-50 text-left border-b last:border-b-0 transition-colors group cursor-pointer"
            >
              <p
                class="text-sm font-bold text-[#021C7D] group-hover:text-[#50bdeb] transition-colors"
              >
                {{ notification.title }}
              </p>
              <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {{ notification.description }}
              </p>
              <p class="text-xs text-slate-500 mt-2 font-medium">
                🕐 {{ notification.time }}
              </p>
            </button>
          </div>
        </div>
      </div> -->

      <div class="relative">
        <button
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all hover:shadow-sm border-2 border-transparent hover:border-slate-200 cursor-pointer"
          @click="toggleUserMenu"
        >
          <div
            class="h-9 w-9 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] text-white flex items-center justify-center text-sm font-bold shadow-md"
          >
            {{ getUserInitials }}
          </div>
          <span class="text-sm font-bold text-slate-700">{{
            getUserName
          }}</span>
        </button>

        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border-2 z-50"
        >
          <div
            class="px-5 py-4 border-b-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]"
          >
            <h3 class="font-bold text-sm text-white">Mi Cuenta</h3>
            <p class="text-xs text-white/80 mt-0.5">{{ getUserEmail }}</p>
          </div>
          <button
            @click="goToProfile"
            class="w-full px-5 py-3 hover:bg-slate-50 text-left text-sm font-semibold flex items-center gap-3 transition-colors text-slate-700 hover:text-[#021C7D] cursor-pointer"
          >
            <User class="h-4 w-4" />
            Perfil
          </button>
          <!-- <button
           por ahora comentado mas adelane validamos si lo dejamos
            class="w-full px-5 py-3 hover:bg-slate-50 text-left text-sm font-semibold transition-colors text-slate-700 hover:text-[#021C7D] cursor-pointer"
          >
            ⚙️ Configuración
          </button> -->
          <div class="border-t-2">
            <button
              @click="handleLogout"
              class="w-full px-5 py-3 hover:bg-red-50 text-left text-sm font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <HelpModal :is-open="showHelpModal" @close="showHelpModal = false" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { HelpCircle, User, Download, CheckCircle, FileSpreadsheet, FileText, X } from "lucide-vue-next";
import { SessionStorageService } from "../services/SessionStorageService";
import { useExportStore } from "../utils/useExportStore";
import { GENERAL_EXPORT_HEADERS } from "../models/GeneralExport";
import { useDriverExportStore } from "../utils/useDriverExportStore";
import { DRIVER_REPORT_HEADERS } from "../models/DriverReport";
import ExportToExcel from "./ExportToExcel.vue";
import ExportToPDF from "./ExportToPDF.vue";
import HelpModal from "./HelpModal.vue";

const router = useRouter();
const sessionStorageService = new SessionStorageService();
const { isGenerating: isGeneratingExport, isReady: isExportReady, exportData, readyAt, clear: clearExport } = useExportStore();
const { isGenerating: isGeneratingDriver, isReady: isDriverReady, exportData: driverExportData, readyAt: driverReadyAt, clear: clearDriverExport } = useDriverExportStore();

function formatReadyAt(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
}

const showNotifications = ref(false);
const showUserMenu = ref(false);
const showHelpModal = ref(false);
const showExportMenu = ref(false);

const userInfo = sessionStorageService.getUserInfo();

const getUserInitials = computed(() => {
  if (!userInfo?.full_name) return "U";
  const fullName = userInfo.full_name;
  const names = fullName.trim().split(/\s+/);
  const firstName = names[0];
  const lastName = names[names.length - 1];
  if (names.length >= 2 && firstName?.[0] && lastName?.[0]) {
    return (firstName[0] + lastName[0]).toUpperCase();
  }
  return fullName[0]?.toUpperCase() || "U";
});

const getUserName = computed(() => {
  if (!userInfo?.full_name) return "user";
  return userInfo.full_name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

const getUserEmail = computed(() => {
  return userInfo?.email || "";
});

// const notifications = [
//   {
//     id: 1,
//     title: "Ticket TK-123 asignado",
//     description: "Te han asignado un nuevo ticket de alta prioridad",
//     time: "Hace 5 minutos",
//   },
//   {
//     id: 2,
//     title: "Comentario en TK-456",
//     description: "María agregó un comentario en tu ticket",
//     time: "Hace 1 hora",
//   },
//   {
//     id: 3,
//     title: "Sprint finalizado",
//     description: "El Sprint 5 ha sido completado exitosamente",
//     time: "Hace 2 horas",
//   },
// ];

// function toggleNotifications() {
//   showNotifications.value = !showNotifications.value;
//   showUserMenu.value = false;
//   showExportMenu.value = false;
// }

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
  showExportMenu.value = false;
}

function toggleExportMenu() {
  showExportMenu.value = !showExportMenu.value;
  showNotifications.value = false;
  showUserMenu.value = false;
}

function goToProfile() {
  showUserMenu.value = false;
  router.push("/profile");
}

function handleLogout() {
  sessionStorageService.handleLogout();
  router.push("/login");
}
</script>
