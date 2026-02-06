<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <Clock class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Horarios de Trabajo</h1>
          <p class="text-xs text-slate-500">
            Gestión de horarios de trabajo e-learning
          </p>
        </div>
      </div>
      <button @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer">
        <Plus class="w-5 h-5" />
        Nuevo Horario
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">Día</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Horario Entrada</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Horario Salida</th>
              <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="(object, index) in workingHours" :key="index" class="hover:bg-emerald-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ object.week_day }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ object.start_time }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ object.end_time }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button @click="openEditModal(object)"
                    class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer" title="Editar">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(object)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition- cursor-pointer" title="Eliminar">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div> 
              </td>
            </tr>
            <tr v-if="workingHours.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                No hay horarios de trabajo registrados
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
                isEditing ? "Editar Horario" : "Nuevo Horario"
              }}
            </h2>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div>
              <input id="codeId" v-model.number="form.id_working_hours" type="number" hidden :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-slate-100"
                placeholder="Id del horario" />
            </div>

            <div>
              <label for="codeName" class="block text-sm font-bold text-slate-700 mb-2">
                Día de la Semana <span class="text-red-500">*</span>
              </label>
              <select id="codeName" v-model="form.week_day" type="text" required maxlength="45"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Ej: Lunes, Martes, etc." >
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div>
              <label for="codeDescription" class="block text-sm font-bold text-slate-700 mb-2">
                Hora de Entrada <span class="text-red-500">*</span>
              </label>
              <input id="codeDescription" 
              v-model="form.start_time" 
              maxlength="100" rows="3"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
              type="time"
              />
            </div>
            <div>
                <label for="codeDescription" class="block text-sm font-bold text-slate-700 mb-2">
                  Hora de Salida <span class="text-red-500">*</span>
              </label>
              <input id="codeDescription" 
              v-model="form.end_time" 
              maxlength="100" rows="3"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
              type="time"
              />
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
    <ConfirmDialog :is-visible="showConfirmDialog" type="delete" title="Confirmar Eliminación"
      :message="`¿Está seguro de que desea eliminar el horario del día '${horarioToDelete?.week_day}'?`"
      details="Esta acción eliminará permanentemente el horario del sistema. Los ticket relacionados a este horario también podrían verse afectados."
      confirm-text="Sí, Eliminar" cancel-text="Cancelar" @confirm="handleDeleteConfirm" @cancel="handleDeleteCancel" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Clock, Plus, Edit2, Trash2 } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import { WorkingHoursService } from "../../services/WorkingHoursService";
import type { WorkingHours } from "../../models/WorkingHours";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

const notification = useNotification();
const workingHoursService = new WorkingHoursService()
const workingHours = ref<WorkingHours[]>([]);
const showConfirmDialog = ref(false)
const horarioToDelete = ref<WorkingHours | null>(null);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = reactive({
  id_working_hours: 0,
  week_day: "",
  start_time: "",
  end_time: ""
});

const openCreateModal = () => {
  isEditing.value = false;
  form.id_working_hours = 0;
  form.week_day = "";
  form.start_time = "";
  showModal.value = true;
};

const openEditModal = (object: WorkingHours) => {
  isEditing.value = true;
  editingIndex.value = workingHours.value.findIndex(
    (element) => element.id_working_hours === object.id_working_hours
  );
  form.id_working_hours = object.id_working_hours ?? 0;
  form.week_day = object.week_day ?? "";
  form.start_time = object.start_time ?? "";
  form.end_time = object.end_time ?? "";
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.id_working_hours = 0;
  form.week_day = "";
  form.start_time = "";
  form.end_time = "";
  isEditing.value = false;
  editingIndex.value = -1;
};

const handleSubmit = () => {
  if (isEditing.value) {
    update()
    return
  }
  create()
};

const create = async () => {
  try {
    let dataCreate: WorkingHours = ({
      week_day: form.week_day,
      start_time: form.start_time,
      end_time: form.end_time,
    })

    let response = await workingHoursService.create(dataCreate)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "El horario ha sido creado correctamente"
      );
      loadWorkingHours();
      closeModal();
      return
    }
    console.error("Error al crear el horario: ", response.error)
    notification.error("Error", "No se logro crear el horario")
    closeModal();
  } catch (error) {
    console.error("Error al crear el horario: ", error)
    notification.error("Error", "No se logro crear el horario")
    closeModal();
  }
}

const update = async () => {
  try {
    let data: WorkingHours = ({
      week_day: form.week_day,
      start_time: form.start_time,
      end_time: form.end_time,
    })

    let response = await workingHoursService.update(data, form.id_working_hours)
    if (response.success) {
      notification.success(
        "¡Creado!",
        "El horario ha sido actualizado correctamente"
      );
      loadWorkingHours();
      closeModal();
      return
    }
    console.error("Error al actualizar el horario: ", response.error)
    notification.error("Error", "No se logro actualizar el horario")
    closeModal();
  } catch (error) {
    console.error("Error al actualizar el horario: ", error)
    notification.error("Error", "No se logro actualizar el horario")
    closeModal();
  }
}

const confirmDelete = (code: WorkingHours) => {
  horarioToDelete.value = code;
  showConfirmDialog.value = true;
};
const handleDeleteCancel = () => {
  showConfirmDialog.value = false;
  horarioToDelete.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    if (horarioToDelete.value && horarioToDelete.value.id_working_hours != undefined) {
      let response = await workingHoursService.delete(horarioToDelete.value.id_working_hours)
      if (response.success) {
        notification.success(
          "¡Eliminado!",
          "El horario ha sido eliminado correctamente"
        );

        loadWorkingHours();
        handleDeleteCancel()
        return
      }
      console.error("Error al eliminar el horario: ", response.error)
      notification.error("Error", "No se logro eliminar el horario")
      handleDeleteCancel()
    }
  } catch (error) {
    console.error("Error al eliminar el horario: ", error)
    notification.error("Error", "No se logro eliminar el horario")
    handleDeleteCancel()
  }
};



const loadWorkingHours = async () => {
  try {
    const response = await workingHoursService.getAll()
    console.log("Response working hours: ", response)
    if (response.data && response.data.results) {
      workingHours.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los horarios de cierre: ", error)
    notification.error("Error", "No se pudieron cargar los horarios de cierre")
  }
}

onMounted(() => {
  loadWorkingHours();
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