<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <CheckCircle class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Códigos de Cierre</h1>
          <p class="text-xs text-slate-500">
            Motivos de finalización de tickets
          </p>
        </div>
      </div>
      <button @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer">
        <Plus class="w-5 h-5" />
        Nuevo Código
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">ID</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="(code, index) in closingCodes" :key="index" class="hover:bg-blue-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ code.id_closing_code }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ code.closing_code_name }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ code.closing_code_description }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button @click="openEditModal(code)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer" title="Editar">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(code)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all cursor-pointer" title="Eliminar">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="closingCodes.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                No hay códigos de cierre registrados
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
              {{
                isEditing ? "Editar Código de Cierre" : "Nuevo Código de Cierre"
              }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <input id="codeId" v-model.number="form.id_closing_code" type="number" hidden :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-slate-100"
                placeholder="ID del código" />
            </div>

            <div>
              <label for="codeName" class="block text-sm font-bold text-slate-700 mb-2">
                Nombre del Código <span class="text-red-500">*</span>
              </label>
              <input id="codeName" v-model="form.closing_code_name" type="text" required maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Ej: Resuelto, Cancelado, etc." />
            </div>

            <div>
              <label for="codeDescription" class="block text-sm font-bold text-slate-700 mb-2">
                Descripción
              </label>
              <textarea id="codeDescription" v-model="form.closing_code_description" maxlength="100" rows="3"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                placeholder="Descripción del código de cierre"></textarea>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="closeModal"
                class="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-all font-medium cursor-pointer">
                Cancelar
              </button>
              <button type="submit"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl hover:shadow-lg transition-all font-medium cursor-pointer">
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
import { ref, reactive, onMounted } from "vue";
import { CheckCircle, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { ClosingCodeService } from "../../services/closingCode";
import type { ClosingCode } from "../../models/ClosingCode";

const notification = useNotification();
const closingCodeService = new ClosingCodeService()

const closingCodes = ref<ClosingCode[]>([]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  id_closing_code: 0,
  closing_code_name: "",
  closing_code_description: "",
});

const openCreateModal = () => {
  isEditing.value = false;
  form.id_closing_code = 0;
  form.closing_code_name = "";
  form.closing_code_description = "";
  showModal.value = true;
};

const openEditModal = (code: ClosingCode) => {
  isEditing.value = true;
  editingIndex.value = closingCodes.value.findIndex(
    (c) => c.id_closing_code === code.id_closing_code
  );
  form.id_closing_code = code.id_closing_code ?? 0;
  form.closing_code_name = code.closing_code_name ?? "";
  form.closing_code_description = code.closing_code_description ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.id_closing_code = 0;
  form.closing_code_name = "";
  form.closing_code_description = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      let dataUpdate: ClosingCode = ({
        closing_code_name: form.closing_code_name,
        closing_code_description: form.closing_code_description,
      })

      let response = await closingCodeService.update(dataUpdate, form.id_closing_code)
      if (response.success) {
        notification.success(
          "¡Actualizado!",
          "El código de cierre ha sido actualizado correctamente"
        );
        loadClosingCodes();
      }
    }
    if (!isEditing.value) {
      let dataCreate: ClosingCode = ({
        closing_code_name: form.closing_code_name,
        closing_code_description: form.closing_code_description,
      })

      let response = await closingCodeService.create(dataCreate)
      if (response.success) {
        notification.success(
          "¡Creado!",
          "El código de cierre ha sido creado correctamente"
        );
        loadClosingCodes();
      }
    }
    closeModal();
  } catch (error) {
    console.error("Error al crear el codigo de cierre: ", error)
    notification.error("Error", "No se logro crear el codigo de cierre")
  }
};

const confirmDelete = async (code: ClosingCode) => {
  if (
    confirm(`¿Está seguro de eliminar el código "${code.closing_code_name}"?`)
  ) {
    if (code.id_closing_code) {
      console.log(code.id_closing_code)
      // let response = await closingCodeService.delete(code.id_closing_code) 
      notification.success(
        "¡Eliminado!",
        "El código de cierre ha sido eliminado correctamente"
      );
    }
  }
};

const loadClosingCodes = async () => {
  try {
    const response = await closingCodeService.getAll()
    if (response.data && response.data.results) {
      closingCodes.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los codigos de cierre: ", error)
    notification.error("Error", "No se pudieron cargar los codigos de cierre")
  }
}

onMounted(() => {
  loadClosingCodes();
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
