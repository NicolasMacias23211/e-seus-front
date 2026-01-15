<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
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
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="code in ans" :key="code.id_ans" class="hover:bg-blue-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ code.ans_name }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ code.ans_description }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(code)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(code)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="isLoading">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                <div class="flex items-center justify-center gap-2">
                  <div class="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Cargando...
                </div>
              </td>
            </tr>
            <tr v-else-if="ans.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                No hay ANS registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <div class="px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-600">
            Mostrando {{ (currentPage - 1) * pageSize + 1 }} a {{ Math.min(currentPage * pageSize, totalItems) }} de {{ totalItems }} registros
          </div>
          <div class="flex items-center gap-3">
            <select
              :value="pageSize"
              @change="(e) => changePageSize(Number((e.target as HTMLSelectElement).value))"
              class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
            >
              <option :value="10">10 por página</option>
              <option :value="25">25 por página</option>
              <option :value="50">50 por página</option>
              <option :value="100">100 por página</option>
            </select>
            <div class="flex items-center gap-1">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <template v-for="page in visiblePages" :key="page">
                <button
                  v-if="typeof page === 'number'"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-sm font-medium',
                    page === currentPage
                      ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white'
                      : 'border border-slate-300 hover:bg-slate-100'
                  ]"
                >
                  {{ page }}
                </button>
                <span v-else class="px-2 text-slate-400">...</span>
              </template>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar ANS" : "Nuevo ANS" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <input
                id="ansId"
                v-model.number="form.id_ans"
                type="number"
                required
                hidden
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
                v-model="form.ans_name"
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
                v-model="form.ans_description"
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
    <ConfirmDialog 
      :is-visible="showConfirmDialog" 
      type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar el ANS '${ansToDelete?.ans_name}'?`"
      details="Esta acción eliminará permanente el ANS del sistema"
      confirm-text="Sí, eliminar"
      cancel-text="Cancelar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Clock, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { usePagination } from "../../utils/usePagination";
import { AnsService } from "../../services/ansService";
import type { ANS } from "../../models/ANS";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

const notification = useNotification();
const ansService = new AnsService();

const {
  items: ans,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  isLoading,
  visiblePages,
  loadData,
  goToPage,
  nextPage,
  prevPage,
  changePageSize,
} = usePagination<ANS>(
  (page, size) => ansService.getAll(page, size),
  10 
);

const showConfirmDialog = ref(false);
const ansToDelete = ref<ANS | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  id_ans: 0,
  ans_name: "",
  ans_description: "" as string | null,
});

const openCreateModal = () => {
  isEditing.value = false;
  form.id_ans = 0;
  form.ans_name = "";
  form.ans_description = "";
  showModal.value = true;
};

const openEditModal = (code: ANS) => {
  isEditing.value = true;
  editingIndex.value = ans.value.findIndex(
    (a) => a.id_ans === code.id_ans);
  form.id_ans = code.id_ans ?? 0;
  form.ans_name = code.ans_name ?? "";
  form.ans_description = code.ans_description ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.id_ans = 0;
  form.ans_name = "";
  form.ans_description = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    update();
  } else {
    create();
  }
};


const create = async () => {
  try {
    let dataCreate: ANS = ({
      ans_name: form.ans_name,
      ans_description: form.ans_description,
    })

    let response = await ansService.create(dataCreate);
    if(response.success){
      notification.success(
        "¡Creado!",
        "El ANS ha sido creado correctamente"
      );
      reloadData();
      closeModal();
      return
    }
    console.error("Error al crear el ANS:", response.error);
    notification.error("Error", "No se logró crear el ANS");
    closeModal();
  } catch (error) {
    console.error("Error al crear el ANS: ", error);
    notification.error("Error", "No se logró crear el ANS");
    closeModal();
  }
}


const update = async () => {
  try {
    let data: ANS = ({
        ans_name: form.ans_name,
        ans_description: form.ans_description,
      })

    let response = await ansService.update(data, form.id_ans)
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "El ANS ha sido actualizado correctamente"
      );
      reloadData();
      closeModal();
      return
    }
    console.error("Error al actualizar el ANS: ", response.error)
    notification.error("Error", "No se logro actualizar el ANS")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el ANS: ", error)
    notification.error("Error", "No se logró actualizar el ANS")
    closeModal();
  }
}

const confirmDelete = (code: ANS) => {
  ansToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  ansToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (ansToDelete.value && ansToDelete.value.id_ans != undefined) {
      let response = await ansService.delete(ansToDelete.value.id_ans)
      if (response.success) {

        notification.success(
          "¡Eliminado!",
          "El ANS ha sido eliminado correctamente"
        );

        reloadData();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar el ANS: ", response.error)
      notification.error("Error", "No se logro eliminar el ANS")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar el ANS: ", error)
    notification.error("Error", "No se logro eliminar el ANS")
    handleDeleteCancel()
  }
};

const reloadData = () => {
  loadData(currentPage.value);
};

onMounted(() => {
  loadData();
})

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
