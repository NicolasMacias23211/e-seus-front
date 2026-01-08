<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] px-8 py-6 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <HelpCircle class="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">
              Guía de Uso del Sistema
            </h2>
            <p class="text-white/80 text-sm mt-1">
              Sistema de Gestión de Tickets
            </p>
          </div>
        </div>
        <button
          @click="closeModal"
          class="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X class="w-6 h-6 text-white" />
        </button>
      </div>

      <!-- Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-180px)] px-8 py-6">
        <!-- Introducción -->
        <section class="mb-8">
          <h3
            class="text-xl font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <BookOpen class="w-5 h-5" />
            Bienvenido al Sistema de Gestión de Tickets
          </h3>
          <p class="text-slate-700 leading-relaxed">
            Este sistema está diseñado para facilitar la gestión, seguimiento y
            resolución de tickets de soporte técnico. A continuación,
            encontrarás una guía del flujo básico de la aplicación.
          </p>
        </section>

        <!-- Flujo para Usuarios Externos -->
        <section class="mb-8">
          <h3
            class="text-xl font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Users class="w-5 h-5" />
            Para Usuarios Externos (Clientes)
          </h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#021C7D] font-bold"
              >
                1
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Crear un Nuevo Ticket
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Desde la página principal, selecciona "Crear Ticket". Completa
                  el formulario con la información del problema o solicitud,
                  incluyendo título, descripción, prioridad y adjuntos si es
                  necesario.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#021C7D] font-bold"
              >
                2
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Seguimiento de Tickets
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Accede a "Mis Tickets" para ver el estado de todos tus
                  tickets. Puedes filtrar por estado (Abierto, En Progreso,
                  Resuelto, Cerrado) y ver los detalles de cada uno.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#021C7D] font-bold"
              >
                3
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Agregar Comentarios
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  En el detalle de cada ticket, puedes agregar comentarios para
                  proporcionar más información o responder a consultas del
                  equipo de soporte.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#021C7D] font-bold"
              >
                4
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">Actualizar Perfil</h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Mantén actualizada tu información de contacto (correo
                  electrónico y teléfono) desde el menú "Perfil" en la esquina
                  superior derecha.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Flujo para Usuarios Internos -->
        <section class="mb-8">
          <h3
            class="text-xl font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Shield class="w-5 h-5" />
            Para Usuarios Internos (Equipo de Soporte)
          </h3>
          <div class="space-y-4">
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold"
              >
                1
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Dashboard Principal
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Al iniciar sesión, accederás al dashboard con métricas clave:
                  tickets abiertos, en progreso, resueltos y tiempo de
                  resolución promedio.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold"
              >
                2
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Gestión de Tickets
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Desde "Lista de Tickets" o el "Board Kanban", puedes ver todos
                  los tickets, asignarlos a miembros del equipo, cambiar estados
                  y prioridades.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold"
              >
                3
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Atención de Tickets
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Haz clic en un ticket para ver los detalles completos. Agrega
                  comentarios, actualiza el estado, registra tiempo trabajado y
                  adjunta archivos de solución.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold"
              >
                4
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">
                  Registro de Tiempo
                </h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Usa la sección "Seguimiento de Tiempo" para registrar las
                  horas dedicadas a cada ticket. Esto ayuda a generar reportes y
                  métricas de productividad.
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold"
              >
                5
              </div>
              <div>
                <h4 class="font-bold text-slate-800 mb-1">Cerrar Ticket</h4>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Una vez resuelto el problema, cambia el estado a "Resuelto" y
                  selecciona un código de cierre apropiado. El ticket quedará
                  cerrado cuando el cliente confirme la solución.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Estados de Tickets -->
        <section class="mb-8">
          <h3
            class="text-xl font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Tag class="w-5 h-5" />
            Estados de los Tickets
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 class="font-bold text-slate-800">Abierto</h4>
              </div>
              <p class="text-sm text-slate-600">
                Ticket recién creado, pendiente de asignación.
              </p>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h4 class="font-bold text-slate-800">En Progreso</h4>
              </div>
              <p class="text-sm text-slate-600">
                Ticket asignado y en proceso de resolución.
              </p>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 class="font-bold text-slate-800">Resuelto</h4>
              </div>
              <p class="text-sm text-slate-600">
                Problema solucionado, pendiente de confirmación del cliente.
              </p>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-slate-500 rounded-full"></div>
                <h4 class="font-bold text-slate-800">Cerrado</h4>
              </div>
              <p class="text-sm text-slate-600">
                Ticket completado y cerrado definitivamente.
              </p>
            </div>
          </div>
        </section>

        <!-- Consejos Útiles -->
        <section class="mb-4">
          <h3
            class="text-xl font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Lightbulb class="w-5 h-5" />
            Consejos Útiles
          </h3>
          <div class="space-y-3">
            <div class="flex gap-3 items-start">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-2 h-2 bg-[#50bdeb] rounded-full ring-4 ring-blue-100"
                ></div>
              </div>
              <p class="text-slate-700 text-sm">
                <strong>Sé específico:</strong> Proporciona toda la información
                posible al crear un ticket para agilizar la resolución.
              </p>
            </div>

            <div class="flex gap-3 items-start">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-2 h-2 bg-[#50bdeb] rounded-full ring-4 ring-blue-100"
                ></div>
              </div>
              <p class="text-slate-700 text-sm">
                <strong>Prioridades:</strong> Usa las prioridades correctamente.
                "Crítica" solo para problemas que afectan operaciones
                principales.
              </p>
            </div>

            <div class="flex gap-3 items-start">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-2 h-2 bg-[#50bdeb] rounded-full ring-4 ring-blue-100"
                ></div>
              </div>
              <p class="text-slate-700 text-sm">
                <strong>Mantén comunicación:</strong> Responde a los comentarios
                del equipo de soporte para resolver el ticket más rápido.
              </p>
            </div>

            <div class="flex gap-3 items-start">
              <div class="flex-shrink-0 mt-1">
                <div
                  class="w-2 h-2 bg-[#50bdeb] rounded-full ring-4 ring-blue-100"
                ></div>
              </div>
              <p class="text-slate-700 text-sm">
                <strong>Adjunta evidencias:</strong> Capturas de pantalla o
                archivos de log ayudan a identificar el problema más rápido.
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <div
        class="px-8 py-4 bg-slate-50 border-t-2 border-slate-200 flex justify-end"
      >
        <button
          @click="closeModal"
          class="px-6 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HelpCircle,
  X,
  BookOpen,
  Users,
  Shield,
  Tag,
  Lightbulb,
} from "lucide-vue-next";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
