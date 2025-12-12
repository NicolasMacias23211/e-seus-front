<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <AlertTriangle class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Prioridades de Ticket
          </h1>
          <p class="text-xs text-slate-500">
            Gestión de prioridades del sistema
          </p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nueva Prioridad
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
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(priority, index) in priorities"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4">
                <span class="text-sm text-slate-700 font-medium">
                  {{ priority.priorityName }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ priority.priorityDescription }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(priority)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(priority)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="priorities.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                No hay prioridades registradas
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
            <div
            class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl"
          >
            >
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar Prioridad" : "Nueva Prioridad" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="priorityName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre de la Prioridad <span class="text-red-500">*</span>
              </label>
              <input
                id="priorityName"
                v-model="form.priorityName"
                type="text"
                required
                maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Ej: Alta, Media, Baja"
              />
            </div>

            <div>
              <label
                for="priorityDescription"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Descripción
              </label>
              <textarea
                id="priorityDescription"
                v-model="form.priorityDescription"
                maxlength="100"
                rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                placeholder="Descripción de la prioridad"
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
import { AlertTriangle, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { TicketPriority } from "../../models/TicketPriority";

const notification = useNotification();

const priorities = ref<TicketPriority[]>([
  {
    priorityName: "Crítica",
    priorityDescription: "Requiere atención inmediata",
  },
  { priorityName: "Alta", priorityDescription: "Alta prioridad" },
  { priorityName: "Media", priorityDescription: "Prioridad media" },
  { priorityName: "Baja", priorityDescription: "Prioridad baja" },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  priorityName: "",
  priorityDescription: "",
});

const openCreateModal = () => {
  isEditing.value = false;
  form.priorityName = "";
  form.priorityDescription = "";
  showModal.value = true;
};

const openEditModal = (priority: TicketPriority) => {
  isEditing.value = true;
  editingIndex.value = priorities.value.findIndex(
    (p: TicketPriority) => p.priorityName === priority.priorityName
  );
  form.priorityName = priority.priorityName;
  form.priorityDescription = priority.priorityDescription || "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.priorityName = "";
  form.priorityDescription = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    priorities.value[editingIndex.value] = {
      priorityName: form.priorityName,
      priorityDescription: form.priorityDescription || null,
    };
    notification.success(
      "¡Actualizado!",
      "La prioridad ha sido actualizada correctamente"
    );
  } else {
    priorities.value.push({
      priorityName: form.priorityName,
      priorityDescription: form.priorityDescription || null,
    });
    notification.success(
      "¡Creado!",
      "La prioridad ha sido creada correctamente"
    );
  }
  closeModal();
};

const confirmDelete = (priority: TicketPriority) => {
  if (
    confirm(`¿Está seguro de eliminar la prioridad "${priority.priorityName}"?`)
  ) {
    const index = priorities.value.findIndex(
      (p: TicketPriority) => p.priorityName === priority.priorityName
    );
    priorities.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "La prioridad ha sido eliminada correctamente"
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
