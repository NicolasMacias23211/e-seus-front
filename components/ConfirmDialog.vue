<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
        @click.self="handleCancel"
      >
        <Transition name="scale">
          <div
            v-if="isVisible"
            class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div :class="['px-6 py-5 flex items-center gap-4', headerClass]">
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                  iconBgClass,
                ]"
              >
                <component
                  :is="iconComponent"
                  :class="['w-6 h-6', iconColorClass]"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white">{{ title }}</h3>
              </div>
            </div>

            <div class="px-6 py-6">
              <p class="text-slate-700 text-base leading-relaxed">
                {{ message }}
              </p>

              <div
                v-if="details"
                class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <p class="text-sm text-slate-600">
                  {{ details }}
                </p>
              </div>

              <div
                v-if="type === 'delete' || type === 'warning'"
                class="mt-4 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <AlertTriangle
                  class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                />
                <p class="text-sm text-amber-800">
                  Esta acción no se puede deshacer. Por favor confirme que desea
                  continuar.
                </p>
              </div>
            </div>

            <div
              class="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3"
            >
              <button
                @click="handleCancel"
                class="flex-1 px-4 py-3 bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
              >
                {{ cancelText }}
              </button>
              <button
                @click="handleConfirm"
                :class="[
                  'flex-1 px-4 py-3 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] cursor-pointer',
                  confirmButtonClass,
                ]"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Trash2,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-vue-next";
import type { ConfirmDialogProps } from "../utils/ConfirmDialog";

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  type: "info",
  title: "",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  details: "",
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const config = computed(() => {
  const configs = {
    delete: {
      icon: Trash2,
      headerClass: "bg-gradient-to-r from-red-600 to-red-500",
      iconBgClass: "bg-red-100",
      iconColorClass: "text-red-600",
      confirmButtonClass:
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white",
      defaultTitle: "Confirmar Eliminación",
    },
    save: {
      icon: Save,
      headerClass: "bg-gradient-to-r from-green-600 to-emerald-500",
      iconBgClass: "bg-green-100",
      iconColorClass: "text-green-600",
      confirmButtonClass:
        "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white",
      defaultTitle: "Guardar Cambios",
    },
    update: {
      icon: RefreshCw,
      headerClass: "bg-gradient-to-r from-[#021C7D] to-[#50bdeb]",
      iconBgClass: "bg-blue-100",
      iconColorClass: "text-[#021C7D]",
      confirmButtonClass:
        "bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white",
      defaultTitle: "Actualizar Información",
    },
    success: {
      icon: CheckCircle2,
      headerClass: "bg-gradient-to-r from-green-600 to-emerald-500",
      iconBgClass: "bg-green-100",
      iconColorClass: "text-green-600",
      confirmButtonClass:
        "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white",
      defaultTitle: "Operación Exitosa",
    },
    warning: {
      icon: AlertTriangle,
      headerClass: "bg-gradient-to-r from-amber-600 to-orange-500",
      iconBgClass: "bg-amber-100",
      iconColorClass: "text-amber-600",
      confirmButtonClass:
        "bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white",
      defaultTitle: "Advertencia",
    },
    info: {
      icon: Info,
      headerClass: "bg-gradient-to-r from-[#021C7D] to-[#50bdeb]",
      iconBgClass: "bg-blue-100",
      iconColorClass: "text-[#021C7D]",
      confirmButtonClass:
        "bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white",
      defaultTitle: "Información",
    },
    error: {
      icon: XCircle,
      headerClass: "bg-gradient-to-r from-red-600 to-red-500",
      iconBgClass: "bg-red-100",
      iconColorClass: "text-red-600",
      confirmButtonClass:
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white",
      defaultTitle: "Error",
    },
  };

  return configs[props.type];
});

const iconComponent = computed(() => config.value.icon);
const headerClass = computed(() => config.value.headerClass);
const iconBgClass = computed(() => config.value.iconBgClass);
const iconColorClass = computed(() => config.value.iconColorClass);
const confirmButtonClass = computed(() => config.value.confirmButtonClass);
const title = computed(() => props.title || config.value.defaultTitle);

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped>
/* Animaciones de transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>

<!-- 
modo de uso:
import ConfirmDialog from "../../components/ConfirmDialog.vue";

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
    /> -->
