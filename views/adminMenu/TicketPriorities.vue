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
                  {{ priority.priority_name }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ priority.priority_description }}
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
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
          <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-4 rounded-t-2xl">
            <h2 class="text-xl font-bold">
              {{ isEditing ? "Editar Prioridad" : "Nueva Prioridad" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label for="priorityName" class="block text-sm font-bold text-slate-700 mb-2">
                Nombre de la Prioridad <span class="text-red-500">*</span>
              </label>
              <input id="priorityName" v-model="form.priority_name" type="text" required  maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Ej: Alta, Media, Baja"/>
            </div>

            <div>
              <label
                for="priorityDescription"
                class="block text-sm font-bold text-slate-700 mb-2">
                Descripción
              </label>
              <textarea id="priorityDescription" v-model="form.priority_description" maxlength="100" rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                placeholder="Descripción de la prioridad">
              </textarea>
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
      :message="`¿Está seguro de que desea eliminar la prioridad '${clientToDelete?.priority_name}'?`"
      details="Esta acción eliminará permanentemente la prioridad del sistema. Los tickets relacionados a esta prioridad también podrían verse afectados."
      confirm-text="Sí, Eliminar" 
      cancel-text="Cancelar" 
      @confirm="handleDeleteConfirm" 
      @cancel="handleDeleteCancel" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { AlertTriangle, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { TicketPriorityService } from "../../services/ticketPriorityService";
import { TicketPriority } from "../../models/TicketPriority";
import ConfirmDialog from "../../components/ConfirmDialog.vue";


const notification = useNotification();
const ticketPriorityService = new TicketPriorityService();
const priorities = ref<TicketPriority[]>([]);
const showConfirmDialog = ref(false);
const clientToDelete = ref<TicketPriority | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);




const form = reactive({
  priority_name: "",
  priority_description: "",
});

const openCreateModal = () => {
  isEditing.value = false;
  form.priority_name = "";
  form.priority_description = "";
  showModal.value = true;
};

const openEditModal = (priority: TicketPriority) => {
  isEditing.value = true;
  editingIndex.value = priorities.value.findIndex(
    (p: TicketPriority) => p.priority_name === priority.priority_name
  );
  form.priority_name = priority.priority_name ?? "";
  form.priority_description = priority.priority_description ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.priority_name = "";
  form.priority_description = "";
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
    let dataCreate: TicketPriority = ({
      priority_name: form.priority_name,
      priority_description: form.priority_description,
    })

    let response = await ticketPriorityService.create(dataCreate)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "La prioridad ha sido creada correctamente"
      );
      loadPriorities();
      closeModal();
      return
    }
    console.error("Error al crear la prioridad: ", response.error)
    notification.error("Error", "No se logro crear la prioridad")
    closeModal();
  } catch (error) {
    console.error("Error al crear la prioridad: ", error)
    notification.error("Error", "No se logro crear la prioridad")
    closeModal();
  }
} 

const update = async () => {
  try {
    let data: TicketPriority = ({
        priority_name: form.priority_name,
        priority_description: form.priority_description,
      })

    let response = await ticketPriorityService.update(data, form.priority_name)
    if (response.success) {
      notification.success(
        "¡Actualizado!",
        "La prioridad ha sido actualizada correctamente"
      );
      loadPriorities();
      closeModal();
      return
    }
    console.error("Error al actualizar la prioridad: ", response.error)
    notification.error("Error", "No se logro actualizar la prioridad")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar la prioridad: ", error)
    notification.error("Error", "No se logro actualizar la prioridad")
    closeModal();
  }
}

const confirmDelete = (code: TicketPriority) => {
  clientToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  clientToDelete.value = null;
};


const handleDeleteConfirm = async () => {
  try {
    if (clientToDelete.value && clientToDelete.value.priority_name != undefined) {
      let response = await ticketPriorityService.delete(clientToDelete.value.priority_name)
      if (response.success) {

        notification.success(
          "¡Eliminado!",
          "La prioridad ha sido eliminada correctamente"
        );

        loadPriorities();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar la prioridad: ", response.error)
      notification.error("Error", "No se logro eliminar la prioridad")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar la prioridad: ", error)
    notification.error("Error", "No se logro eliminar la prioridad")
    handleDeleteCancel()
  }
};

const loadPriorities = async () => {
  try {
    const response = await ticketPriorityService.getAll()
    if (response.data && response.data.results) {
      priorities.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar las prioridades: ", error)
    notification.error("Error", "No se pudieron cargar las prioridades")
  }
}



onMounted(() => {
  loadPriorities();
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
