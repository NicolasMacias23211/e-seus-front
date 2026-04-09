<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <List class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Estados</h1>
          <p class="text-xs text-slate-500">Estados para los tickets</p>
        </div>
      </div>
      <button @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium">
        <Plus class="w-5 h-5" />
        Nuevo Estado
      </button>
    </div>
    <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Es BackLog</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Es completar</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Orden</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="object in status" :key="object.id_status" class="hover:bg-blue-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ object.status_name }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ object.status_description }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ object.is_backlog ? '1' : '0' }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ object.is_completion ? '1' : '0' }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ object.ordering }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button @click="openEditModal(object)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all" title="Editar">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(object)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all" title="Eliminar">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="status.length === 0">
              <td colspan="3" class="px-6 py-8 text-center text-slate-500">
                No hay estados registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination 
        :total-registers="total"
        :items-count="itemsCount" 
        @change="loadData" 
      />
    </div>
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar Estado" : "Nuevo Estado" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <input id="statusId" v-model.number="form.id_status" type="number" required hidden :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:bg-slate-100"
                placeholder="ID del estado" />
            </div>

            <div>
              <label for="statusName" class="block text-sm font-bold text-slate-700 mb-2">
                Nombre del estado <span class="text-red-500">*</span>
              </label>
              <input id="statusName" v-model="form.status_name" type="text" required maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                placeholder="Ej: 24 horas, 48 horas" />
            </div>

            <div>
              <label for="statusDescription" class="block text-sm font-bold text-slate-700 mb-2">
                Descripción
              </label>
              <textarea id="statusDescription" v-model="form.status_description" maxlength="100" rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                placeholder="Descripción del estado"></textarea>
            </div>
            <div class="flex">
              <label for="isBacklog" class="block text-sm font-bold text-slate-700 hover:cursor-pointer">
                Es BackLog
              </label>
              <input id="isBacklog"
                type="checkbox"
                v-model="form.is_backlog"
                class="px-4 py-3 ml-4 hover:cursor-pointer">
            </div>
            <div class="flex">
              <label for="isCompletion" class="block text-sm font-bold text-slate-700 hover:cursor-pointer">
                Es estado final
              </label>
              <input id="isCompletion"
                type="checkbox"
                v-model="form.is_completion"
                class="px-4 py-3 ml-4 hover:cursor-pointer">
            </div>
            <div>
              <label for="ordering" class="block text-sm font-bold text-slate-700 mb-2">
                Orden
              </label>
              <input id="ordering"
                type="number"
                v-model="form.ordering"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                placeholder="Orden de los estado">
            </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeModal"
                class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-all font-medium">
                Cancelar
              </button>
              <button type="submit"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl hover:shadow-lg transition-all font-medium">
                {{ isEditing ? "Actualizar" : "Crear" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar el estado '${statusToDelete?.status_name}'?`"
      details="Esta acción eliminará permanente el estado del sistema" confirm-text="Sí, eliminar" cancel-text="Cancelar"
      @confirm="handleDeleteConfirm" @cancel="handleDeleteCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { List, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { StatusService } from "../../services/statusService";
import type { Status, StatusCrud } from "../../models/Status";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import type { PaginationState } from "../../components/Pagination.vue";
import Pagination from "../../components/Pagination.vue";

const notification = useNotification();
const statusService = new StatusService();
const status = ref<Status[]>([]);
const total = ref(0)
const itemsCount = ref(0)

const loadData = async (pagination?: PaginationState) => {
  try {
    const page = pagination?.currentPage ?? 1
    const perPage = pagination?.perPage ?? 10
    const response = await statusService.getAllPaginated(page, perPage)
    if (response.data && response.data.results) {
      status.value = response.data.results
      total.value = response.data.count
      itemsCount.value = response.data.results.length
    }
  } catch (error) {
    console.error("Error al cargar los códigos de cierre: ", error)
    notification.error("Error", "No se pudieron cargar los códigos de cierre")
  }
}

const showConfirmDialog = ref(false);
const statusToDelete = ref<Status | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  id_status: 0,
  status_name: "",
  status_description: "",
  is_backlog: false,
  is_completion: false,
  ordering: 0,
});

const openCreateModal = () => {
  isEditing.value = false;
  form.id_status = 0;
  form.status_name = "";
  form.status_description = "";
  form.is_backlog = false;
  form.is_completion = false; 
  form.ordering = 0;
  showModal.value = true;
};

const openEditModal = (code: Status) => {
  isEditing.value = true;
  editingIndex.value = status.value.findIndex(
    (a) => a.id_status === code.id_status);
  form.id_status = code.id_status ?? 0;
  form.status_name = code.status_name ?? "";
  form.status_description = code.status_description ?? "";
  form.is_backlog = code.is_backlog ?? false;
  form.is_completion = code.is_completion ?? false;
  form.ordering = code.ordering ?? 0;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.id_status = 0;
  form.status_name = "";
  form.status_description = "";
  form.is_backlog = false;
  form.is_completion = false;
  form.ordering = 0;
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
    let dataCreate: StatusCrud = ({
      status_name: form.status_name,
      status_description: form.status_description,
      is_backlog: form.is_backlog,
      is_completion: form.is_completion,
      ordering: form.ordering,
    })

    let response = await statusService.create(dataCreate);
    if (response.success) {
      notification.success(
        "¡Creado!",
        "El estado ha sido creado correctamente"
      );
      loadData();
      closeModal();
      return
    }
    console.error("Error al crear el estado:", response.error);
    notification.error("Error", "No se logró crear el estado");
    closeModal();
  } catch (error) {
    console.error("Error al crear el estado: ", error);
    notification.error("Error", "No se logró crear el estado");
    closeModal();
  }
}


const update = async () => {
  try {
    let data: StatusCrud = ({
      status_name: form.status_name,
      status_description: form.status_description,
      is_backlog: form.is_backlog,
      is_completion: form.is_completion,
      ordering: form.ordering,
    })

    let response = await statusService.update(data, form.id_status)
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "El estado ha sido actualizado correctamente"
      );
      loadData();
      closeModal();
      return
    }
    console.error("Error al actualizar el estado: ", response.error)
    notification.error("Error", "No se logro actualizar el estado")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el estado: ", error)
    notification.error("Error", "No se logró actualizar el estado")
    closeModal();
  }
}

const confirmDelete = (code: Status) => {
  statusToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  statusToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (statusToDelete.value && statusToDelete.value.id_status != undefined) {
      let response = await statusService.delete(statusToDelete.value.id_status)
      if (response.success) {

        notification.success(
          "¡Eliminado!",
          "El estado ha sido eliminado correctamente"
        );

        loadData();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar el estado: ", response.error)
      notification.error("Error", "No se logro eliminar el estado")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar el estado: ", error)
    notification.error("Error", "No se logro eliminar el estado")
    handleDeleteCancel()
  }
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
