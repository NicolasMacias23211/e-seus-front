<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b-2 border-slate-100 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"
          >
            <FileSpreadsheet class="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Exporte General</h2>
            <p class="text-sm text-white/80">
              Configura los filtros del reporte
            </p>
          </div>
        </div>
        <button
          @click="closeModal"
          class="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <X class="w-5 h-5 text-white" />
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6">
        <!-- Fechas -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Desde
            </label>
            <input
              v-model="dateFrom"
              type="date"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#50bdeb] transition-colors"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Hasta
            </label>
            <input
              v-model="dateTo"
              type="date"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#50bdeb] transition-colors"
            />
          </div>
        </div>

        <!-- Validación de fechas -->
        <div
          v-if="dateFrom && dateTo && dateTo < dateFrom"
          class="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-xl"
        >
          <AlertCircle class="w-5 h-5 text-red-600" />
          <span class="text-sm text-red-700">
            La fecha "Hasta" debe ser posterior a la fecha "Desde"
          </span>
        </div>

        <!-- Cliente Selector -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Cliente (Opcional)
          </label>
          <div class="relative">
            <input
              v-model="clientSearchQuery"
              type="text"
              placeholder="Buscar cliente..."
              class="w-full pl-4 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
              @input="handleClientSearch"
              @focus="showClientDropdown = true"
            />
            <div
              v-if="isLoadingClients"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div
                class="w-5 h-5 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
              ></div>
            </div>

            <!-- Dropdown clientes -->
            <div
              v-if="showClientDropdown && filteredClients.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10"
            >
              <div
                v-for="client in filteredClients"
                :key="client.client_name"
                class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                @click="selectClient(client)"
              >
                <div class="font-semibold text-slate-800">
                  {{ client.client_name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Cliente seleccionado -->
          <div
            v-if="selectedClient"
            class="mt-3 flex items-center justify-between p-3 bg-blue-50 border-2 border-blue-200 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <Building2 class="w-4 h-4 text-blue-600" />
              <span class="text-sm font-semibold text-blue-900">{{
                selectedClient.client_name
              }}</span>
            </div>
            <button
              @click="clearClient"
              class="w-6 h-6 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors"
            >
              <X class="w-4 h-4 text-blue-900" />
            </button>
          </div>
        </div>

        <!-- Tipos de Servicio Selector -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Tipo de Servicio (Opcional)
          </label>
          <div class="relative">
            <input
              v-model="serviceSearchQuery"
              type="text"
              placeholder="Buscar tipo de servicio..."
              class="w-full pl-4 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
              @input="handleServiceSearch"
              @focus="showServiceDropdown = true"
            />
            <div
              v-if="isLoadingServices"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div
                class="w-5 h-5 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
              ></div>
            </div>

            <!-- Dropdown servicios -->
            <div
              v-if="showServiceDropdown && filteredServices.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10"
            >
              <div
                v-for="service in filteredServices"
                :key="service.id_services"
                class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                @click="selectService(service)"
              >
                <div class="font-semibold text-slate-800">
                  {{ service.service_name }}
                </div>
                <div
                  v-if="service.service_description"
                  class="text-sm text-slate-500"
                >
                  {{ service.service_description }}
                </div>
              </div>
            </div>
          </div>

          <!-- Servicio seleccionado -->
          <div
            v-if="selectedService"
            class="mt-3 flex items-center justify-between p-3 bg-green-50 border-2 border-green-200 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <Settings class="w-4 h-4 text-green-600" />
              <div>
                <div class="text-sm font-semibold text-green-900">
                  {{ selectedService.service_name }}
                </div>
                <div
                  v-if="selectedService.service_description"
                  class="text-xs text-green-700"
                >
                  {{ selectedService.service_description }}
                </div>
              </div>
            </div>
            <button
              @click="clearService"
              class="w-6 h-6 rounded-full bg-green-200 hover:bg-green-300 flex items-center justify-center transition-colors"
            >
              <X class="w-4 h-4 text-green-900" />
            </button>
          </div>
        </div>

        <!-- E-User Selector -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            E-User por Nombre (Opcional)
          </label>
          <div class="relative">
            <input
              v-model="userSearchQuery"
              type="text"
              placeholder="Buscar usuario externo..."
              class="w-full pl-4 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
              @input="handleUserSearch"
              @focus="showUserDropdown = true"
            />
            <div
              v-if="isLoadingUsers"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <div
                class="w-5 h-5 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
              ></div>
            </div>

            <!-- Dropdown usuarios -->
            <div
              v-if="showUserDropdown && filteredUsers.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10"
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
          </div>

          <!-- Usuario seleccionado -->
          <div
            v-if="selectedUser"
            class="mt-3 flex items-center justify-between p-3 bg-purple-50 border-2 border-purple-200 rounded-xl"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center"
              >
                <span class="text-sm font-bold text-purple-900">{{
                  getInitials(selectedUser)
                }}</span>
              </div>
              <div>
                <div class="text-sm font-semibold text-purple-900">
                  {{ getFullName(selectedUser) }}
                </div>
                <div class="text-xs text-purple-700">
                  {{ selectedUser.email || selectedUser.network_user }}
                </div>
              </div>
            </div>
            <button
              @click="clearUser"
              class="w-6 h-6 rounded-full bg-purple-200 hover:bg-purple-300 flex items-center justify-center transition-colors"
            >
              <X class="w-4 h-4 text-purple-900" />
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-end gap-3 p-6 border-t-2 border-slate-100 bg-slate-50"
      >
        <button
          @click="closeModal"
          class="px-6 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="generateReport"
          :disabled="!isFormValid"
          :class="[
            'px-6 py-2.5 rounded-xl font-semibold transition-all',
            isFormValid
              ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white hover:shadow-lg'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed',
          ]"
        >
          <div class="flex items-center gap-2">
            <FileDown class="w-5 h-5" />
            <span>Exportar</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  X,
  FileSpreadsheet,
  Building2,
  Settings,
  FileDown,
  AlertCircle,
} from "lucide-vue-next";
import { eUsersService } from "../services/e-usersService";
import { ClientsService } from "../services/clientsService";
import { RequestTypeService } from "../services/RequestTypeService";
import { type EUser } from "../models/EUser";
import { type Client } from "../models/Client";
import { type Service } from "../models/Service";

// Props
interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  close: [];
  export: [params: GeneralExportParams];
}>();

export interface GeneralExportParams {
  dateFrom: string;
  dateTo: string;
  client?: Client;
  service?: Service;
  eUser?: EUser;
}

// Services
const eUserService = new eUsersService();
const clientService = new ClientsService();
const serviceTypeService = new RequestTypeService();

// Estado - Fechas
const dateFrom = ref("");
const dateTo = ref("");

// Estado - Clientes
const clientSearchQuery = ref("");
const selectedClient = ref<Client | null>(null);
const allClients = ref<Client[]>([]);
const isLoadingClients = ref(false);
const showClientDropdown = ref(false);

// Estado - Servicios
const serviceSearchQuery = ref("");
const selectedService = ref<Service | null>(null);
const allServices = ref<Service[]>([]);
const isLoadingServices = ref(false);
const showServiceDropdown = ref(false);

// Estado - Usuarios
const userSearchQuery = ref("");
const selectedUser = ref<EUser | null>(null);
const allUsers = ref<EUser[]>([]);
const isLoadingUsers = ref(false);
const showUserDropdown = ref(false);

// Computed
const filteredClients = computed(() => {
  if (!clientSearchQuery.value) return allClients.value.slice(0, 10);

  const query = clientSearchQuery.value.toLowerCase();
  return allClients.value
    .filter((client) => client.client_name.toLowerCase().includes(query))
    .slice(0, 10);
});

const filteredServices = computed(() => {
  if (!serviceSearchQuery.value) return allServices.value.slice(0, 10);

  const query = serviceSearchQuery.value.toLowerCase();
  return allServices.value
    .filter((service) => {
      const name = service.service_name.toLowerCase();
      const description = service.service_description?.toLowerCase() || "";
      return name.includes(query) || description.includes(query);
    })
    .slice(0, 10);
});

const filteredUsers = computed(() => {
  if (!userSearchQuery.value) return allUsers.value.slice(0, 10);

  const query = userSearchQuery.value.toLowerCase();
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

const isFormValid = computed(() => {
  if (!dateFrom.value || !dateTo.value) return false;
  if (dateTo.value < dateFrom.value) return false;
  return true;
});

// Métodos - Clientes
const loadClients = async () => {
  isLoadingClients.value = true;
  try {
    const response = await clientService.getAll();
    if (response.data && response.data.results) {
      allClients.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  } finally {
    isLoadingClients.value = false;
  }
};

const handleClientSearch = () => {
  showClientDropdown.value = true;
};

const selectClient = (client: Client) => {
  selectedClient.value = client;
  clientSearchQuery.value = client.client_name;
  showClientDropdown.value = false;
};

const clearClient = () => {
  selectedClient.value = null;
  clientSearchQuery.value = "";
};

// Métodos - Servicios
const loadServices = async () => {
  isLoadingServices.value = true;
  try {
    const response = await serviceTypeService.getAll();
    if (response.data && response.data.results) {
      allServices.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar servicios:", error);
  } finally {
    isLoadingServices.value = false;
  }
};

const handleServiceSearch = () => {
  showServiceDropdown.value = true;
};

const selectService = (service: Service) => {
  selectedService.value = service;
  serviceSearchQuery.value = service.service_name;
  showServiceDropdown.value = false;
};

const clearService = () => {
  selectedService.value = null;
  serviceSearchQuery.value = "";
};

// Métodos - Usuarios
const loadUsers = async () => {
  isLoadingUsers.value = true;
  try {
    const response = await eUserService.getAll();
    if (response.data && response.data.results) {
      allUsers.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  } finally {
    isLoadingUsers.value = false;
  }
};

const handleUserSearch = () => {
  showUserDropdown.value = true;
};

const selectUser = (user: EUser) => {
  selectedUser.value = user;
  userSearchQuery.value = getFullName(user);
  showUserDropdown.value = false;
};

const clearUser = () => {
  selectedUser.value = null;
  userSearchQuery.value = "";
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

// Métodos - Modal
const closeModal = () => {
  emit("close");
  resetForm();
};

const generateReport = () => {
  if (!isFormValid.value) return;

  const params: GeneralExportParams = {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    client: selectedClient.value || undefined,
    service: selectedService.value || undefined,
    eUser: selectedUser.value || undefined,
  };

  emit("export", params);
  closeModal();
};

const resetForm = () => {
  dateFrom.value = "";
  dateTo.value = "";
  selectedClient.value = null;
  clientSearchQuery.value = "";
  selectedService.value = null;
  serviceSearchQuery.value = "";
  selectedUser.value = null;
  userSearchQuery.value = "";
  showClientDropdown.value = false;
  showServiceDropdown.value = false;
  showUserDropdown.value = false;
};

// Cerrar dropdowns al hacer click fuera
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    showClientDropdown.value = false;
    showServiceDropdown.value = false;
    showUserDropdown.value = false;
  }
};

onMounted(() => {
  loadClients();
  loadServices();
  loadUsers();
  document.addEventListener("click", handleClickOutside);
});
</script>
