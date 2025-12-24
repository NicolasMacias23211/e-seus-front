  <template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
            
          > 
            <FileText class="w-5 h-5 text-white" />
          </div>
          <div> 
            <h1 class="text-2xl font-bold text-[#021C7D]">Tipos de Servicio</h1>
            <p class="text-xs text-slate-500">Gestión de servicios del sistema</p>
          </div>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium">
          <Plus class="w-5 h-5" />
          Nuevo Servicio
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-bold">Nombre</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Descripción</th>
                <th class="px-6 py-4 text-left text-sm font-bold">Tiempo Estimado</th>
                <th class="px-6 py-4 text-center text-sm font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="(service, index) in services" :key="index" class="hover:bg-blue-50 transition-colors">
                <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                  {{ service.service_name }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ service.service_description }}
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ service.estimated_solution_time   }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openEditModal(service)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Edit2 class="w-4 h-4" />
                    </button>
                    <button
                      @click="confirmDelete(service)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="services.length === 0">
                <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                  No hay servicios registrados
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
              
              <h2 class="text-xl font-bold">
                {{ isEditing ? "Editar Servicio" : "Nuevo Servicio" }}
              </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
              <div>
                <input id="codeId" v-model.number="form.id_services" type="number" hidden :disabled="isEditing"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-slate-100"
                placeholder="ID del servicio"/>
              </div>
              
              <div>
                <label
                  for="serviceName"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Nombre del Servicio <span class="text-red-500">*</span>
                </label>
                <input
                  id="serviceName"
                  v-model="form.service_name"
                  type="text"
                  required
                  maxlength="45"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  placeholder="Ingrese el nombre del servicio"
                />
              </div>

              <div>
                <label
                  for="serviceDescription"
                  class="block text-sm font-bold text-slate-700 mb-2"
                >
                  Descripción
                </label>
                <textarea
                  id="serviceDescription"
                  v-model="form.service_description"
                  maxlength="100"
                  rows="3"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none"
                  placeholder="Descripción del servicio"
                ></textarea>
              </div>
              <div>
                <label 
                  for="estimatedTime"
                  class="block text-sm font-bold text-slate-700 mb-2"
                  >
                  Tiempo Estimado (HH:MM:SS)
                </label>
                <input
                  id="estimatedTime"
                  v-model="form.estimated_solution_time"
                  type="text"
                  pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  placeholder="Ejemplo: 02:30:00"
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
        type="delete" title="Confirmar Eliminación"
        :message="`¿Está seguro de que desea eliminar este servicio? '${clientToDelete?.service_name}'?`"
        details="Esta acción no se puede deshacer."
        confirm-text="Si, Eliminar"
        cancel-text="Cancelar"
        @confirm="handleDeleteConfirm"
        @cancel="handleDeleteCancel"/>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, reactive, onMounted } from "vue";
  import { FileText, Plus, Edit2, Trash2 } from "lucide-vue-next";
  import { useNotification } from "../../utils/useNotification";
  import { ServiceService } from "../../services/serviceService";
  import { Service } from "../../models/Service";
  import ConfirmDialog from "../../components/ConfirmDialog.vue";

  const notification = useNotification();
  const serviceService = new ServiceService();
  const services = ref<Service[]>([]);
  const showConfirmDialog = ref(false);
  const clientToDelete = ref<Service | null>(null);
  const showModal = ref(false);
  const isEditing = ref(false);
  const editingIndex = ref(-1);


  const form = reactive({
    id_services: 0,
    service_name: "",
    service_description: "",
    estimated_solution_time: "",
  });

  const openCreateModal = () => {
    isEditing.value = false;
    form.id_services = 0;
    form.service_name = "";
    form.service_description = "";
    form.estimated_solution_time = "";
    showModal.value = true;
  };

  const openEditModal = (service: Service) => {
    isEditing.value = true;
    editingIndex.value = services.value.findIndex(
      (s) => s.id_services === service.id_services
    );
    form.id_services = service.id_services ?? 0;
    form.service_name = service.service_name;
    form.service_description = service.service_description ?? "";
    form.estimated_solution_time = service.estimated_solution_time ?? "";
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    form.id_services = 0;
    form.service_name = "";
    form.service_description = "";
    form.estimated_solution_time = "";
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
      let dataCreate: Service = ({
        service_name: form.service_name,
        service_description: form.service_description,
        estimated_solution_time: form.estimated_solution_time,
      })

      let response = await serviceService.create(dataCreate)
      if (response.success) {
        notification.success(
          "¡Creado!",
          "El servicio ha sido creado correctamente"
        );
        loadServices();
        closeModal();
        return;
      }
      console.error("Error creando el servicio:", response.error);
      notification.error("Error", "No se pudo crear el servicio");
      closeModal();
    } catch (error) {
      console.error("Error creando el servicio:", error);
      notification.error("Error", "No se pudo crear el servicio");
      closeModal();
    }
  }


  const update = async () => {
    try {
      let data: Service = ({
        service_name: form.service_name,
        service_description: form.service_description,
        estimated_solution_time: form.estimated_solution_time,
      })

      let response = await serviceService.update(data, form.id_services)
      if (response.success) {
        notification.success(
          "¡Actualizado!",
          "El servicio ha sido actualizado correctamente"
        );
        loadServices();
        closeModal();
        return;
      }
      console.error("Error actualizando el servicio:", response.error);
      notification.error("Error", "No se logró actualizar el servicio");
      closeModal();
    } catch (error) {
      console.error("Error actualizando el servicio:", error);
      notification.error("Error", "No se logró actualizar el servicio");
      closeModal();
    }
  }

  const confirmDelete = (code: Service) => {
    clientToDelete.value = code;
    showConfirmDialog.value = true;
  };

  const handleDeleteCancel = () => {
    showConfirmDialog.value = false;
    clientToDelete.value = null;
  };

  const handleDeleteConfirm = async () => {
    try {
      if (clientToDelete.value && clientToDelete.value.id_services != undefined) {
        let response = await serviceService.delete(clientToDelete.value.id_services)
        if (response.success) {

          notification.success(
            "¡Eliminado!",
            "El servicio ha sido eliminado correctamente"
          );

          loadServices();
          handleDeleteCancel()
          return
        }
        console.error("Error al eliminar el servicio: ", response.error)
        notification.error("Error", "No se logró eliminar el servicio, hay registros asociados a este servicio")
        handleDeleteCancel()
      }
    } catch (error) {
      console.error("Error al eliminar el servicio: ", error)
      notification.error("Error", "No se logró eliminar el servicio, hay registros asociados a este servicio")
      handleDeleteCancel()
    }
  };

  const loadServices = async () => {
    try {
      const response = await serviceService.getAll()
      if (response.data && response.data.results) {
        services.value = response.data.results
      }
    } catch (error) {
      console.error("Error al cargar los servicios: ", error)
      notification.error("Error", "No se pudieron cargar los servicios")
    }
  }

  onMounted(() => {
    loadServices();
  })


  // const confirmDelete = (service: Service) => {
  //   if (
  //     confirm(`¿Está seguro de eliminar el servicio "${service.service_name}"?`)
  //   ) {
  //     const index = services.value.findIndex(
  //       (s) => s.id_services === service.id_services
  //     );
  //     services.value.splice(index, 1);
  //     notification.success(
  //       "¡Eliminado!",
  //       "El servicio ha sido eliminado correctamente"
  //     );
  //   }
  // };
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
