<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Shield class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Roles</h1>
          <p class="text-xs text-slate-500">Gestión de roles y permisos</p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nuevo Rol
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
                Nombre del Rol
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(role, index) in roles"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ role.rolName }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ role.description }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(role)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(role)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="roles.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                No hay roles registrados
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
              {{ isEditing ? "Editar Rol" : "Nuevo Rol" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="rolName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre del Rol <span class="text-red-500">*</span>
              </label>
              <input
                id="rolName"
                v-model="form.rolName"
                type="text"
                required
                maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all"
                placeholder="Ingrese el nombre del rol"
              />
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Descripción
              </label>
              <textarea
                id="description"
                v-model="form.description"
                maxlength="100"
                rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all resize-none"
                placeholder="Descripción del rol"
              ></textarea>
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
import { Shield, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { Role } from "../../models/Role";

const notification = useNotification();

// Estado
const roles = ref<Role[]>([
  { rolName: "Administrador", description: "Acceso total al sistema" },
  { rolName: "Supervisor", description: "Supervisión y gestión de equipos" },
  { rolName: "Agente", description: "Gestión de tickets asignados" },
  { rolName: "Usuario", description: "Acceso básico al sistema" },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  rolName: "",
  description: "",
});

// Métodos
const openCreateModal = () => {
  isEditing.value = false;
  form.rolName = "";
  form.description = "";
  showModal.value = true;
};

const openEditModal = (role: Role) => {
  isEditing.value = true;
  editingIndex.value = roles.value.findIndex((r) => r.rolName === role.rolName);
  form.rolName = role.rolName;
  form.description = role.description || "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.rolName = "";
  form.description = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    roles.value[editingIndex.value] = {
      rolName: form.rolName,
      description: form.description,
    };
    notification.success(
      "¡Actualizado!",
      "El rol ha sido actualizado correctamente"
    );
  } else {
    roles.value.push({
      rolName: form.rolName,
      description: form.description,
    });
    notification.success("¡Creado!", "El rol ha sido creado correctamente");
  }
  closeModal();
};

const confirmDelete = (role: Role) => {
  if (confirm(`¿Está seguro de eliminar el rol "${role.rolName}"?`)) {
    const index = roles.value.findIndex((r) => r.rolName === role.rolName);
    roles.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "El rol ha sido eliminado correctamente"
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
