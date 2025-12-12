<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Clock class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">ANS</h1>
          <p class="text-xs text-slate-500">Acuerdos de Nivel de Servicio</p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nuevo ANS
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
              <th class="px-6 py-4 text-left text-sm font-bold">ID</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(ans, index) in ansList"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ ans.idAns }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ ans.ansName }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ ans.ansDescription }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(ans)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(ans)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="ansList.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                No hay ANS registrados
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
              {{ isEditing ? "Editar ANS" : "Nuevo ANS" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="ansId"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                ID <span class="text-red-500">*</span>
              </label>
              <input
                id="ansId"
                v-model.number="form.idAns"
                type="number"
                required
                :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:bg-slate-100"
                placeholder="ID del ANS"
              />
            </div>

            <div>
              <label
                for="ansName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre del ANS <span class="text-red-500">*</span>
              </label>
              <input
                id="ansName"
                v-model="form.ansName"
                type="text"
                required
                maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Ej: 24 horas, 48 horas"
              />
            </div>

            <div>
              <label
                for="ansDescription"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Descripción
              </label>
              <textarea
                id="ansDescription"
                v-model="form.ansDescription"
                maxlength="100"
                rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                placeholder="Descripción del ANS"
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
import { Clock, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { ANS } from "../../models/ANS";

const notification = useNotification();

const ansList = ref<ANS[]>([
  {
    idAns: 1,
    ansName: "24 horas",
    ansDescription: "Resolución en 24 horas hábiles",
  },
  {
    idAns: 2,
    ansName: "48 horas",
    ansDescription: "Resolución en 48 horas hábiles",
  },
  {
    idAns: 3,
    ansName: "72 horas",
    ansDescription: "Resolución en 72 horas hábiles",
  },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  idAns: 0,
  ansName: "",
  ansDescription: "" as string | null,
});

const openCreateModal = () => {
  isEditing.value = false;
  form.idAns = 0;
  form.ansName = "";
  form.ansDescription = "";
  showModal.value = true;
};

const openEditModal = (ans: ANS) => {
  isEditing.value = true;
  editingIndex.value = ansList.value.findIndex((a) => a.idAns === ans.idAns);
  form.idAns = ans.idAns;
  form.ansName = ans.ansName;
  form.ansDescription = ans.ansDescription;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.idAns = 0;
  form.ansName = "";
  form.ansDescription = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    ansList.value[editingIndex.value] = {
      idAns: form.idAns,
      ansName: form.ansName,
      ansDescription: form.ansDescription,
    };
    notification.success(
      "¡Actualizado!",
      "El ANS ha sido actualizado correctamente"
    );
  } else {
    ansList.value.push({
      idAns: form.idAns,
      ansName: form.ansName,
      ansDescription: form.ansDescription,
    });
    notification.success("¡Creado!", "El ANS ha sido creado correctamente");
  }
  closeModal();
};

const confirmDelete = (ans: ANS) => {
  if (confirm(`¿Está seguro de eliminar el ANS "${ans.ansName}"?`)) {
    const index = ansList.value.findIndex((a) => a.idAns === ans.idAns);
    ansList.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "El ANS ha sido eliminado correctamente"
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
