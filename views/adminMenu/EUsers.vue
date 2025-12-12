<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <UserCog class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Usuarios del Sistema
          </h1>
          <p class="text-xs text-slate-500">
            Gestión de usuarios internos (E-Users)
          </p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nuevo Usuario
      </button>
    </div>

    <div
      class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead
            class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white"
          >
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">Usuario Red</th>
              <th class="px-6 py-4 text-left text-sm font-bold">
                Nombre Completo
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold">Email</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Cliente</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Rol</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(user, index) in users"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ user.networkUser }}
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
                {{ user.userClientName }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                  :class="getRoleBadgeClass(user.rolName)"
                >
                  {{ user.rolName }}
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
            <tr v-if="users.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-slate-500">
                No hay usuarios registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full animate-scale-in max-h-[90vh] overflow-y-auto"
        >
          <div
            <div
            class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl sticky top-0"
          >
            >
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar Usuario" : "Nuevo Usuario" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="networkUser"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                <User class="w-4 h-4 inline mr-1" />
                Usuario de Red <span class="text-red-500">*</span>
              </label>
              <input
                id="networkUser"
                v-model="form.networkUser"
                type="text"
                required
                maxlength="45"
                :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all disabled:bg-slate-100"
                placeholder="usuario.red"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Nombre <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Nombre"
                />
              </div>

              <div>
                <label
                  for="middleName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Segundo Nombre
                </label>
                <input
                  id="middleName"
                  v-model="form.middleName"
                  type="text"
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  placeholder="Segundo nombre (opcional)"
                />
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
                  v-model="form.lastName"
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
                  v-model="form.secondLastName"
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
                  Cliente <span class="text-red-500">*</span>
                </label>
                <select
                  id="clientName"
                  v-model="form.userClientName"
                  required
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option value="" disabled>Seleccione un cliente</option>
                  <option
                    v-for="client in clients"
                    :key="client"
                    :value="client"
                  >
                    {{ client }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  for="serviceId"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  <Briefcase class="w-4 h-4 inline mr-1" />
                  Servicio <span class="text-red-500">*</span>
                </label>
                <select
                  id="serviceId"
                  v-model.number="form.idServices"
                  required
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option value="" disabled>Seleccione un servicio</option>
                  <option
                    v-for="service in services"
                    :key="service.id"
                    :value="service.id"
                  >
                    {{ service.name }}
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
                  v-model="form.rolName"
                  required
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all bg-white"
                >
                  <option value="" disabled>Seleccione un rol</option>
                  <option v-for="role in roles" :key="role" :value="role">
                    {{ role }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  UserCog,
  Plus,
  Edit2,
  Trash2,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Shield,
} from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { EUser } from "../../models/EUser";

const notification = useNotification();

// Estado
const users = ref<EUser[]>([
  {
    networkUser: "jperez",
    name: "Juan",
    middleName: "Carlos",
    lastName: "Pérez",
    secondLastName: "González",
    email: "jperez@empresa.com",
    phone: "+54 11 1234-5678",
    userClientName: "Cliente A - Empresa Tech",
    idServices: 1,
    rolName: "Administrador",
  },
  {
    networkUser: "mgarcia",
    name: "María",
    middleName: null,
    lastName: "García",
    secondLastName: "López",
    email: "mgarcia@empresa.com",
    phone: "+54 11 8765-4321",
    userClientName: "Cliente B - Corporación Global",
    idServices: 2,
    rolName: "Técnico",
  },
]);

const clients = ref<string[]>([
  "Cliente A - Empresa Tech",
  "Cliente B - Corporación Global",
  "Cliente C - Soluciones SA",
]);

const services = ref([
  { id: 1, name: "Soporte Técnico" },
  { id: 2, name: "Desarrollo" },
  { id: 3, name: "Mantenimiento" },
]);

const roles = ref<string[]>([
  "Administrador",
  "Técnico",
  "Supervisor",
  "Analista",
  "Usuario",
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  networkUser: "",
  name: "",
  middleName: null as string | null,
  lastName: "",
  secondLastName: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  userClientName: "",
  idServices: 0,
  rolName: "",
});

// Métodos
const getFullName = (user: EUser) => {
  const parts = [
    user.name,
    user.middleName,
    user.lastName,
    user.secondLastName,
  ].filter(Boolean);
  return parts.join(" ");
};

const getRoleBadgeClass = (role: string) => {
  const classes: Record<string, string> = {
    Administrador: "bg-purple-100 text-purple-700",
    Técnico: "bg-blue-100 text-blue-700",
    Supervisor: "bg-indigo-100 text-indigo-700",
    Analista: "bg-cyan-100 text-cyan-700",
    Usuario: "bg-green-100 text-green-700",
  };
  return classes[role] || "bg-slate-100 text-slate-700";
};

const openCreateModal = () => {
  isEditing.value = false;
  form.networkUser = "";
  form.name = "";
  form.middleName = null;
  form.lastName = "";
  form.secondLastName = null;
  form.email = null;
  form.phone = null;
  form.userClientName = "";
  form.idServices = 0;
  form.rolName = "";
  showModal.value = true;
};

const openEditModal = (user: EUser) => {
  isEditing.value = true;
  editingIndex.value = users.value.findIndex(
    (u) => u.networkUser === user.networkUser
  );
  form.networkUser = user.networkUser;
  form.name = user.name;
  form.middleName = user.middleName;
  form.lastName = user.lastName;
  form.secondLastName = user.secondLastName;
  form.email = user.email;
  form.phone = user.phone;
  form.userClientName = user.userClientName;
  form.idServices = user.idServices;
  form.rolName = user.rolName;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  const userData: EUser = {
    networkUser: form.networkUser,
    name: form.name,
    middleName: form.middleName,
    lastName: form.lastName,
    secondLastName: form.secondLastName,
    email: form.email,
    phone: form.phone,
    userClientName: form.userClientName,
    idServices: form.idServices,
    rolName: form.rolName,
  };

  if (isEditing.value) {
    users.value[editingIndex.value] = userData;
    notification.success(
      "¡Actualizado!",
      "El usuario ha sido actualizado correctamente"
    );
  } else {
    users.value.push(userData);
    notification.success("¡Creado!", "El usuario ha sido creado correctamente");
  }
  closeModal();
};

const confirmDelete = (user: EUser) => {
  if (confirm(`¿Está seguro de eliminar el usuario "${getFullName(user)}"?`)) {
    const index = users.value.findIndex(
      (u) => u.networkUser === user.networkUser
    );
    users.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "El usuario ha sido eliminado correctamente"
    );
  }
};
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
