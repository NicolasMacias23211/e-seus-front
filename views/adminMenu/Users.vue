<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Users class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Usuarios Básicos</h1>
          <p class="text-xs text-slate-500">
            Gestión de usuarios externos que reportan tickets
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
              <th class="px-6 py-4 text-left text-sm font-bold">
                Usuario de Red
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold">Email</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(user, index) in users"
              :key="index"
              class="hover:bg-emerald-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ user.networkUser }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.mail || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.phone || "-" }}
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
              <td colspan="4" class="px-6 py-8 text-center text-slate-500">
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
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in"
        >
          <div
            class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl"
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
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all disabled:bg-slate-100"
                placeholder="usuario.red"
              />
              <p class="text-xs text-slate-500 mt-1">
                Este campo se usa como identificador único
              </p>
            </div>

            <div>
              <label
                for="mail"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                <Mail class="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                id="mail"
                v-model="form.mail"
                type="email"
                maxlength="50"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="correo@ejemplo.com (opcional)"
              />
              <p class="text-xs text-slate-500 mt-1">
                Email para notificaciones sobre sus tickets
              </p>
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
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="+54 11 1234-5678 (opcional)"
              />
              <p class="text-xs text-slate-500 mt-1">
                Teléfono de contacto del usuario
              </p>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div class="flex gap-2">
                <Info class="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p class="text-sm text-blue-800 font-medium">
                    Usuarios básicos
                  </p>
                  <p class="text-xs text-blue-700 mt-1">
                    Estos usuarios solo pueden crear y consultar sus propios
                    tickets. No tienen acceso al sistema completo.
                  </p>
                </div>
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
  Users,
  Plus,
  Edit2,
  Trash2,
  User,
  Mail,
  Phone,
  Info,
} from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { User as UserModel } from "../../models/User";

const notification = useNotification();

// Estado
const users = ref<UserModel[]>([
  {
    networkUser: "alopez",
    mail: "alopez@clienteexterno.com",
    phone: "+54 11 1234-5678",
  },
  {
    networkUser: "rmartinez",
    mail: "rmartinez@empresa.com",
    phone: "+54 11 8765-4321",
  },
  {
    networkUser: "crodriguez",
    mail: null,
    phone: null,
  },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive<{
  networkUser: string;
  mail: string | null;
  phone: string | null;
}>({
  networkUser: "",
  mail: null,
  phone: null,
});

// Métodos
const openCreateModal = () => {
  isEditing.value = false;
  form.networkUser = "";
  form.mail = null;
  form.phone = null;
  showModal.value = true;
};

const openEditModal = (user: UserModel) => {
  isEditing.value = true;
  editingIndex.value = users.value.findIndex(
    (u) => u.networkUser === user.networkUser
  );
  form.networkUser = user.networkUser;
  form.mail = user.mail;
  form.phone = user.phone;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  const userData: UserModel = {
    networkUser: form.networkUser,
    mail: form.mail && form.mail.trim() !== "" ? form.mail : null,
    phone: form.phone && form.phone.trim() !== "" ? form.phone : null,
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

const confirmDelete = (user: UserModel) => {
  if (confirm(`¿Está seguro de eliminar el usuario "${user.networkUser}"?`)) {
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
