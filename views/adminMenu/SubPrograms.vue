<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Layers class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Sub-Programas</h1>
          <p class="text-xs text-slate-500">
            Gestión de sub-programas del sistema
          </p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nuevo Sub-Programa
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
                Sub-Programa
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold">Programa</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(subProgram, index) in subPrograms"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ subProgram.subProgramName }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ subProgram.programName }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(subProgram)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(subProgram)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="subPrograms.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                No hay sub-programas registrados
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
              {{ isEditing ? "Editar Sub-Programa" : "Nuevo Sub-Programa" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="subProgramName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre del Sub-Programa <span class="text-red-500">*</span>
              </label>
              <input
                id="subProgramName"
                v-model="form.subProgramName"
                type="text"
                required
                maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Ingrese el nombre del sub-programa"
              />
            </div>

            <div>
              <label
                for="programName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Programa <span class="text-red-500">*</span>
              </label>
              <select
                id="programName"
                v-model="form.programName"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
              >
                <option value="" disabled>Seleccione un programa</option>
                <option
                  v-for="program in programs"
                  :key="program"
                  :value="program"
                >
                  {{ program }}
                </option>
              </select>
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
import { Layers, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { SubProgram } from "../../models/SubProgram";

const notification = useNotification();

const subPrograms = ref<SubProgram[]>([
  { subProgramName: "Sub-Programa 1A", programName: "Programa Alpha" },
  { subProgramName: "Sub-Programa 1B", programName: "Programa Alpha" },
  { subProgramName: "Sub-Programa 2A", programName: "Programa Beta" },
]);

const programs = ref<string[]>([
  "Programa Alpha",
  "Programa Beta",
  "Programa Gamma",
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  subProgramName: "",
  programName: "",
});

const openCreateModal = () => {
  isEditing.value = false;
  form.subProgramName = "";
  form.programName = "";
  showModal.value = true;
};

const openEditModal = (subProgram: SubProgram) => {
  isEditing.value = true;
  editingIndex.value = subPrograms.value.findIndex(
    (sp) => sp.subProgramName === subProgram.subProgramName
  );
  form.subProgramName = subProgram.subProgramName;
  form.programName = subProgram.programName;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.subProgramName = "";
  form.programName = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    subPrograms.value[editingIndex.value] = {
      subProgramName: form.subProgramName,
      programName: form.programName,
    };
    notification.success(
      "¡Actualizado!",
      "El sub-programa ha sido actualizado correctamente"
    );
  } else {
    subPrograms.value.push({
      subProgramName: form.subProgramName,
      programName: form.programName,
    });
    notification.success(
      "¡Creado!",
      "El sub-programa ha sido creado correctamente"
    );
  }
  closeModal();
};

const confirmDelete = (subProgram: SubProgram) => {
  if (
    confirm(
      `¿Está seguro de eliminar el sub-programa "${subProgram.subProgramName}"?`
    )
  ) {
    const index = subPrograms.value.findIndex(
      (sp) => sp.subProgramName === subProgram.subProgramName
    );
    subPrograms.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "El sub-programa ha sido eliminado correctamente"
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
