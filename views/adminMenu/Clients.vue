<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Building2 class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Clientes</h1>
          <p class="text-xs text-slate-500">
            Gestión de clientes principales del sistema
          </p>
        </div>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium"
      >
        <Plus class="w-5 h-5" />
        Nuevo Cliente
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
                Nombre del Cliente
              </th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="(client, index) in clients"
              :key="index"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ client.client_name }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="openEditModal(client)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(client)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="clients.length === 0">
              <td colspan="2" class="px-6 py-8 text-center text-slate-500">
                No hay clientes registrados
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
              {{ isEditing ? "Editar Cliente" : "Nuevo Cliente" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <label
                for="clientName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre del Cliente <span class="text-red-500">*</span>
              </label>
              <div>
              <input id="clientId" v-model.number="form.id_client" type="number" required hidden
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all disabled:bg-slate-100" />
            </div>
              <input
                id="clientName"
                v-model="form.client_name"
                type="text"
                required
                maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ingrese el nombre del cliente"
              />
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
      type="delete"
      title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar el cliente '${clientToDelete?.client_name}'?`"
      details="Esta acción eliminará permanentemente el cliente del sistema. Todos los programas y sub-programas asociados también podrían verse afectados."
      confirm-text="Sí, Eliminar"
      cancel-text="Cancelar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Building2, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { Client } from "../../models/Client";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import type { PaginationState } from "../../components/Pagination.vue";
import Pagination from "../../components/Pagination.vue";
import { ClientsService } from "../../services/clientsService.ts";

const notification = useNotification();
const clientService = new ClientsService();
const clients = ref<Client[]>([]);
const total = ref(0)
const itemsCount = ref(0)

const loadData = async (pagination?: PaginationState) => {
  try {
    const page = pagination?.currentPage ?? 1
    const perPage = pagination?.perPage ?? 10
    const response = await clientService.getAllPaginated(page, perPage)
    if (response.data && response.data.results) {
      clients.value = response.data.results
      total.value = response.data.count
      itemsCount.value = response.data.results.length
    }
  } catch (error) {
    console.error("Error al cargar los códigos de cierre: ", error)
    notification.error("Error", "No se pudieron cargar los códigos de cierre")
  }
}

const showConfirmDialog = ref(false);
const clientToDelete = ref<Client | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  id_client: 0,
  client_name: "",
  client_name_last:""
});

const openCreateModal = () => {
  isEditing.value = false;
  form.id_client = 0;
  form.client_name = "";
  showModal.value = true;
};

const openEditModal = (code: Client) => {
  isEditing.value = true;
  editingIndex.value = clients.value.findIndex(
    (a) => a.client_name === code.client_name);
  form.client_name = code.client_name ?? "";
  form.client_name_last = code.client_name ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.client_name = "";
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
    let dataCreate: Client = ({
      client_name: form.client_name
    })

    let response = await clientService.create(dataCreate);
    if (response.success) {
      notification.success(
        "¡Creado!",
        "El cliente ha sido creado correctamente"
      );
      loadData();
      closeModal();
      return
    }
    console.error("Error al crear el cliente:", response.error);
    notification.error("Error", "No se logró crear el cliente");
    closeModal();
  } catch (error) {
    console.error("Error al crear el cliente: ", error);
    notification.error("Error", "No se logró crear el cliente");
    closeModal();
  }
}


const update = async () => {
  try {
    let data: Client = ({
       client_name : form.client_name,
    })

    let response = await clientService.update(data, form.client_name_last)
    if (response.success) {
      
      await clientService.delete(form.client_name_last)
      notification.success(
        "¡Actualizado!",
        "El Cliente ha sido actualizado correctamente"
      );
      loadData();
      closeModal();
      return
    }
    console.error("Error al actualizar el cliente: ", response.error)
    notification.error("Error", "No se logro actualizar el cliente")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el cliente: ", error)
    notification.error("Error", "No se logró actualizar el cliente")
    closeModal();
  }
}

const confirmDelete = (code: Client) => {
  clientToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  clientToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (clientToDelete.value && clientToDelete.value.client_name != undefined) {
      let response = await clientService.delete(clientToDelete.value.client_name)
      if (response.success) {

        notification.success(
          "¡Eliminado!",
          "El cliente ha sido eliminado correctamente"
        );

        loadData();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar el cliente: ", response.error)
      notification.error("Error", "No se logro eliminar el cliente")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar el cliente: ", error)
    notification.error("Error", "No se logro eliminar el cliente")
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
