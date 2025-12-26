<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <UserCog class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Usuarios del Sistema</h1>
          <p class="text-xs text-slate-500">
            Gestión de usuarios internos (E-Users)
          </p>
        </div>
      </div>
      <button @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium">
        <Plus class="w-5 h-5" />
        Nuevo Usuario
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">Usuario Red</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre Completo</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Email</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Cliente</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Rol</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="(user, index) in eusers" :key="index" class="hover:bg-blue-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ user.network_user }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ getFullName(user) }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.phone || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.user_client_name  || "-" }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                  :class="getRoleBadgeClass(user.rol_name)"
                >
                  {{ user.rol_name }}
                </span>
              </td> 
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(user)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(user)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="eusers.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-slate-500">
                No hay usuarios registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full animate-scale-in max-h-[90vh] overflow-y-auto">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl sticky top-0">
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar Usuario" : "Nuevo Usuario" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label for="networkUser" class="block text-sm font-bold text-slate-700 mb-2">
                <User class="w-4 h-4 inline mr-1" />
                Usuario de Red <span class="text-red-500">*</span>
              </label>
              <input id="networkUser" v-model="form.network_user" type="text" required maxlength="45"
                :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all disabled:bg-slate-100"
                placeholder="usuario.red"/>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-bold text-slate-700 mb-2">
                  Nombre <span class="text-red-500">*</span>
                </label>
                <input id="name" v-model="form.name" type="text" required maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Nombre"/>
              </div>

              <div>
                <label for="middleName" class="block text-sm font-bold text-slate-700 mb-2">
                  Segundo Nombre
                </label>
                <input id="middleName" v-model="form.middle_name" type="text" maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Segundo nombre (opcional)"/>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="lastName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Apellido <span class="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  v-model="form.last_name"
                  type="text"
                  required
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Apellido"
                />
              </div>

              <div>
                <label
                  for="secondLastName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Segundo Apellido
                </label>
                <input
                  id="secondLastName"
                  v-model="form.second_last_name"
                  type="text"
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Segundo apellido (opcional)"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="email"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  <Mail class="w-4 h-4 inline mr-1" />
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  <Phone class="w-4 h-4 inline mr-1" />
                  Teléfono
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="+54 11 1234-5678"
                />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label
                  for="clientName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  <Building2 class="w-4 h-4 inline mr-1" />
                  Cliente <span class="text-red-500"></span>
                </label>
                <select
                  id="clientName"
                  v-model="form.user_client_name"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option :value="null">Seleccionar cliente...</option>
                  <option
                    v-for="client in clients"
                    :key="client.client_name"
                    :value="client.client_name"
                  >
                    {{ client.client_name }}
                  </option>
                </select>
              </div>

              <div>
                <label for="serviceId"class="block text-sm font-bold text-slate-700 mb-2">
                  <Briefcase class="w-4 h-4 inline mr-1" />
                  Servicio <span class="text-red-500"></span>
                </label>
                <select
                  id="serviceId"
                  v-model.number="form.id_services"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option :value="null">Seleccionar servicio...</option>
                  <option
                    v-for="service in services"
                    :key="service.id_services"
                    :value="service.id_services"
                  >
                    {{ service.service_name }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  for="roleName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  <Shield class="w-4 h-4 inline mr-1" />
                  Rol <span class="text-red-500">*</span>
                </label>
                <select
                  id="roleName"
                  v-model="form.rol_name"
                  
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option value="" disabled>Seleccione un rol...</option>
                  <option
                    v-for="role in roles"
                    :key="role.rol_name"
                    :value="role.rol_name"
                  >
                    {{ role.rol_name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                {{ isEditing ? "Actualizar" : "Crear" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
    <ConfirmDialog
      :is-visible="showConfirmDialog"
      type="delete" title="Confirmar eliminación"
      message="¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer."
      confirm-text="Si, eliminar"
      cancel-text="Cancelar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {UserCog, Plus, Edit2, Trash2, User, Mail, Phone, Building2, Briefcase, Shield, Users,} from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { eUsersService } from "../../services/e-usersService";
import type { EUser } from "../../models/EUser";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import { ClientsService } from "../../services/clientsService";
import { ServiceService } from "../../services/serviceService";
import { RolesService } from "../../services/rolesService";
import type { Client } from "../../models/Client";
import type { Service } from "../../models/Service";
import type { Role } from "../../models/Role";   

const notification = useNotification();

// Instancias de servicios
const eusersService = new eUsersService();
const clientsService = new ClientsService();
const servicesService = new ServiceService();
const rolesService = new RolesService();

// Arrays de datos
const eusers = ref<EUser[]>([]);
const clients = ref<Client[]>([]);
const services = ref<Service[]>([]);
const roles = ref<Role[]>([]);

// Control de modal y diálogo
const showConfirmDialog = ref(false);
const clientToDelete = ref<EUser | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);


const form = reactive({
  network_user: "",
  name: "",
  middle_name: null as string | null,
  last_name: "",
  second_last_name: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  user_client_name: null as string | null,
  id_services: null as number | null,
  rol_name: "",
});

// Métodos
const getFullName = (user: EUser) => {
  const parts = [
    user.name,
    user.middle_name,
    user.last_name,
    user.second_last_name,
  ].filter(Boolean);
  return parts.join(" ");
};

const getRoleBadgeClass = (role: string) => {
  const classes: Record<string, string> = {};
  return classes[role] || "bg-slate-100 text-slate-700";
};

const openCreateModal = () => {
  isEditing.value = false;
  form.network_user = "";
  form.name = "";
  form.middle_name = null;
  form.last_name = "";
  form.second_last_name = null;
  form.email = null;
  form.phone = null;
  form.user_client_name = null;
  form.id_services = null;
  form.rol_name = "";
  showModal.value = true;
};

const openEditModal = (user: EUser) => {
  isEditing.value = true;
  editingIndex.value = eusers.value.findIndex(
    (u) => u.network_user === user.network_user
  );
  form.network_user = user.network_user;
  form.name = user.name;
  form.middle_name = user.middle_name;
  form.last_name = user.last_name;
  form.second_last_name = user.second_last_name;
  form.email = user.email;
  form.phone = user.phone;
  form.user_client_name = typeof user.user_client_name === 'string' ? user.user_client_name : null;
  form.id_services = typeof user.id_services === 'number' ? user.id_services : null;
  form.rol_name = user.rol_name;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.network_user = "";
  form.name = "";
  form.middle_name = null;
  form.last_name = "";
  form.second_last_name = null;
  form.email = null;
  form.phone = null;
  form.user_client_name = null;
  form.id_services = null;
  form.rol_name = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    update();
    return;
  }
  create();
}


const create = async () => {
  try {
    let dataCreate: EUser = ({
      network_user: form.network_user,
      name: form.name,
      middle_name: form.middle_name,
      last_name: form.last_name,
      second_last_name: form.second_last_name,
      email: form.email,
      phone: form.phone,
      user_client_name: form.user_client_name || "",
      id_services: form.id_services || null,
      rol_name: form.rol_name || "",
    })

    let response = await eusersService.create(dataCreate);

    if(response.success) {
      notification.success(
        "¡Creado!",
        "El usuario ha sido creado correctamente"
      );
      loadEusers();
      closeModal();
      return
    }
    console.error("Error al crear el usuario:", response.error)
    notification.error("Error", "No se logró crear el usuario")
    closeModal();
  } catch (error) {
    console.error("Error al crear el usuario:", error)
    notification.error("Error", "No se logró crear el usuario")
    closeModal();
  }
}


const update = async () => {
  try {
    let data: EUser = ({
      network_user: form.network_user,
      name: form.name,
      middle_name: form.middle_name,
      last_name: form.last_name,
      second_last_name: form.second_last_name,
      email: form.email,
      phone: form.phone,
      user_client_name: form.user_client_name || "",
      id_services: form.id_services,
      rol_name: form.rol_name,
    })

    let response = await eusersService.update(data, form.network_user);
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "El usuario ha sido actualizado correctamente"
      );
      loadEusers();
      closeModal();
      return
    }
    console.error("Error al actualizar el usuario:", response.error)
    notification.error("Error", "No se logró actualizar el usuario")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el usuario:", error)
    notification.error("Error", "No se logró actualizar el usuario")
    closeModal();
  }
}

const confirmDelete = (user: EUser) => {
  clientToDelete.value = user;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  clientToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (clientToDelete.value && clientToDelete.value.network_user != undefined){
      let response = await eusersService.delete(clientToDelete.value.network_user);
      if (response.success) {
        notification.success(
          "¡Eliminado!",
          "El usuario ha sido eliminado correctamente"
        );
        loadEusers();
        handleDeleteCancel();
        return;
      }
      console.error("Error al eliminar el usuario:", response.error);
      notification.error("Error", "No se logró eliminar el usuario");
      handleDeleteCancel();
    }  
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    notification.error("Error", "No se logró eliminar el usuario");
    handleDeleteCancel();
  }
}

const loadEusers = async () => {
  try {
    const response = await eusersService.getAll();
    if (response.data && response.data.results) {
      eusers.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    notification.error("Error", "No se logró cargar los usuarios");
  }
}

const loadClients = async () => {
  try {
    const response = await clientsService.getAll();
    if (response.data && response.data.results) {
      clients.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar clientes:", error);
    notification.error("Error", "No se pudieron cargar los clientes");
  }
};

const loadServices = async () => {
  try {
    const response = await servicesService.getAll();
    if (response.data && response.data.results) {
      services.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar servicios:", error);
    notification.error("Error", "No se pudieron cargar los servicios");
  }
};

const loadRoles = async () => {
  try {
    const response = await rolesService.getAll();
    if (response.data && response.data.results) {
      roles.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar roles:", error);
    notification.error("Error", "No se pudieron cargar los roles");
  }
};

onMounted(() => {
  loadEusers();
  loadClients();
  loadServices();
  loadRoles();
});


</script>

<style scoped>
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
</style>
