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
                {{ subProgram.sub_program_name }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ subProgram.program_name }}
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
      <Pagination 
        :total-registers="total"
        :items-count="itemsCount" 
        @change="loadSubPrograms" 
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
              {{ isEditing ? "Editar Sub-Programa" : "Nuevo Sub-Programa" }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <input
              id="subProgramNameLast"
              v-model="form.sub_program_name_last"
              type="text"
              hidden
            />
            <div>
              <label
                for="subProgramName"
                class="block text-sm font-bold text-slate-700 mb-2"
              >
                Nombre del Sub-Programa <span class="text-red-500">*</span>
              </label>
              <input
                id="subProgramName"
                v-model="form.sub_program_name"
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
                v-model="form.program_name"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
              >
                <option value="" disabled>Seleccione un programa</option>
                <option
                  v-for="subProgram in subPrograms"
                  :key="subProgram.program_name"
                  :value="subProgram.program_name"
                >
                  {{ subProgram.program_name }}
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
    <ConfirmDialog
      :is-visible="showConfirmDialog"
      type="delete"
      title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar el cliente '${subProgramToDelete?.sub_program_name}'?`"
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
import { Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { Client } from "../../models/Client";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import type { PaginationState } from "../../components/Pagination.vue";
import Pagination from "../../components/Pagination.vue";
import { ClientsService } from "../../services/clientsService.ts";
import type { Program } from "../../models/Program";
import { ProgramsService } from "../../services/programsService.ts";
import { SubProgramsService } from "../../services/subProgramService";
import { SubProgram } from '../../models/SubProgram';

const notification = useNotification();
const clientService = new ClientsService();
const clients = ref<Client[]>([]);
const programsService = new ProgramsService();
const programs = ref<Program[]>([]);
const subProgramService = new SubProgramsService();
const subPrograms = ref<SubProgram[]>([]);
const total = ref(0)
const itemsCount = ref(0)

const loadClients = async () => {
  try {
    const response = await clientService.getAll()
    if (response.data && response.data.results) {
      clients.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los clientes: ", error)
    notification.error("Error", "No se pudieron cargar los clientes")
  }
}

const loadPrograms = async () => {
  try {
    const response = await programsService.getAll()
    if (response.data && response.data.results) {
      programs.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los clientes: ", error)
    notification.error("Error", "No se pudieron cargar los clientes")
  }
}

const loadSubPrograms = async (pagination?: PaginationState) => {
  try {
    const page = pagination?.currentPage ?? 1
    const perPage = pagination?.perPage ?? 10
    const response = await subProgramService.getAllPaginated(page, perPage)
    if (response.data && response.data.results) {
      subPrograms.value = response.data.results
      total.value = response.data.count
      itemsCount.value = response.data.results.length
    }
  } catch (error) {
    console.error("Error al cargar los programas: ", error)
    notification.error("Error", "No se pudieron cargar los programas")
  }
}

const showConfirmDialog = ref(false);
const subProgramToDelete = ref<SubProgram | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  sub_program_name_last: "",
  sub_program_name:"",
  program_name: ""
});

const openCreateModal = () => {
  isEditing.value = false;
  form.sub_program_name = "";
  form.program_name = "";
  showModal.value = true;
};

const openEditModal = (code: SubProgram) => {
  isEditing.value = true;
  editingIndex.value = subPrograms.value.findIndex(
    (a) => a.sub_program_name === code.sub_program_name);
  form.sub_program_name_last = code.sub_program_name ?? "";
  form.sub_program_name = code.sub_program_name ?? "";
  form.program_name = code.program_name ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.sub_program_name_last = "";
  form.sub_program_name = "";
  form.program_name = "";
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
    let dataCreate: SubProgram = ({
      sub_program_name: form.sub_program_name,
      program_name: form.program_name
    })

    let response = await subProgramService.create(dataCreate);
    if (response.success) {
      notification.success(
        "¡Creado!",
        "El cliente ha sido creado correctamente"
      );
      loadSubPrograms();
      closeModal();
      return
    }
    console.error("Error al crear el programa:", response.error);
    notification.error("Error", "No se logró crear el programa");
    closeModal();
  } catch (error) {
    console.error("Error al crear el programa: ", error);
    notification.error("Error", "No se logró crear el programa");
    closeModal();
  }
}


const update = async () => {
  try {
    let data: SubProgram = ({
      sub_program_name: form.sub_program_name,
      program_name: form.program_name
    })

    let response = await subProgramService.update(data, form.sub_program_name_last)
    if (response.success) {
      
      await subProgramService.delete(form.sub_program_name_last)
      notification.success(
        "¡Actualizado!",
        "El programa ha sido actualizado correctamente"
      );
      loadSubPrograms();
      closeModal();
      return
    }
    console.error("Error al actualizar el programa: ", response.error)
    notification.error("Error", "No se logro actualizar el programa")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el programa: ", error)
    notification.error("Error", "No se logró actualizar el programa")
    closeModal();
  }
}

const confirmDelete = (code: SubProgram) => {
  subProgramToDelete.value = code;
  showConfirmDialog.value = true;
};

const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  subProgramToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (subProgramToDelete.value && subProgramToDelete.value.sub_program_name != undefined) {
      let response = await subProgramService.delete(subProgramToDelete.value.sub_program_name)
      if (response.success) {

        notification.success(
          "¡Eliminado!",
          "El programa ha sido eliminado correctamente"
        );

        loadSubPrograms();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar el programa: ", response.error)
      notification.error("Error", "No se logro eliminar el programa")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar el programa: ", error)
    notification.error("Error", "No se logro eliminar el programa")
    handleDeleteCancel()
  }
};

onMounted(() => {
  loadClients();
  loadPrograms();
  loadSubPrograms();
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
