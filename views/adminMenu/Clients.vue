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
                {{ client.clientName }}
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
              <input
                id="clientName"
                v-model="form.clientName"
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
      :message="`¿Está seguro de que desea eliminar el cliente '${clientToDelete?.clientName}'?`"
      details="Esta acción eliminará permanentemente el cliente del sistema. Todos los programas y sub-programas asociados también podrían verse afectados."
      confirm-text="Sí, Eliminar"
      cancel-text="Cancelar"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Building2, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { Client } from "../../models/Client";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

const notification = useNotification();

const clients = ref<Client[]>([
  { clientName: "Cliente A - Empresa Tech" },
  { clientName: "Cliente B - Corporación Global" },
  { clientName: "Cliente C - Soluciones SA" },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  clientName: "",
});

const showConfirmDialog = ref(false);
const clientToDelete = ref<Client | null>(null);

const openCreateModal = () => {
  isEditing.value = false;
  form.clientName = "";
  showModal.value = true;
};

const openEditModal = (client: Client) => {
  isEditing.value = true;
  editingIndex.value = clients.value.findIndex(
    (c) => c.clientName === client.clientName
  );
  form.clientName = client.clientName;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.clientName = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    clients.value[editingIndex.value] = { clientName: form.clientName };
    notification.success(
      "¡Actualizado!",
      "El cliente ha sido actualizado correctamente"
    );
  } else {
    clients.value.push({ clientName: form.clientName });
    notification.success("¡Creado!", "El cliente ha sido creado correctamente");
  }
  closeModal();
};

const confirmDelete = (client: Client) => {
  clientToDelete.value = client;
  showConfirmDialog.value = true;
};

const handleDeleteConfirm = () => {
  if (clientToDelete.value) {
    const index = clients.value.findIndex(
      (c) => c.clientName === clientToDelete.value!.clientName
    );
    clients.value.splice(index, 1);
    notification.success(
      "¡Eliminado!",
      "El cliente ha sido eliminado correctamente"
    );
  }
  showConfirmDialog.value = false;
  clientToDelete.value = null;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  clientToDelete.value = null;
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
