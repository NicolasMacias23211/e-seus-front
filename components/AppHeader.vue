<template>
  <header
    class="h-16 border-b-2 bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center shadow-md"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-[#021C7D]">Sistema de Tickets</h2>
          <p class="text-xs text-slate-500 font-medium">
            Gestión y seguimiento
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all hover:shadow-sm cursor-pointer"
        title="Ayuda"
      >
        <HelpCircle class="h-5 w-5" />
      </button>

      <div class="relative">
        <button
          class="p-2.5 rounded-xl hover:bg-slate-100 relative transition-all hover:shadow-sm cursor-pointer"
          @click="toggleNotifications"
          title="Notificaciones"
        >
          <Bell class="h-5 w-5 text-slate-600" />
          <span
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md animate-pulse"
          >
            3
          </span>
        </button>

        <div
          v-if="showNotifications"
          class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border-2 z-50"
        >
          <div
            class="px-5 py-4 border-b-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]"
          >
            <h3 class="font-bold text-white">Notificaciones</h3>
            <p class="text-xs text-white/80 mt-0.5">
              Tienes 3 notificaciones nuevas
            </p>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <button
              v-for="notification in notifications"
              :key="notification.id"
              class="w-full px-5 py-4 hover:bg-slate-50 text-left border-b last:border-b-0 transition-colors group cursor-pointer"
            >
              <p
                class="text-sm font-bold text-[#021C7D] group-hover:text-[#50bdeb] transition-colors"
              >
                {{ notification.title }}
              </p>
              <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {{ notification.description }}
              </p>
              <p class="text-xs text-slate-500 mt-2 font-medium">
                🕐 {{ notification.time }}
              </p>
            </button>
          </div>
        </div>
      </div>

      <div class="relative">
        <button
          class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all hover:shadow-sm border-2 border-transparent hover:border-slate-200 cursor-pointer"
          @click="toggleUserMenu"
        >
          <div
            class="h-9 w-9 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] text-white flex items-center justify-center text-sm font-bold shadow-md"
          >
            JP
          </div>
          <span class="text-sm font-bold text-slate-700">Juan Pérez</span>
        </button>

        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border-2 z-50"
        >
          <div
            class="px-5 py-4 border-b-2 bg-gradient-to-r from-[#021C7D] to-[#50bdeb]"
          >
            <h3 class="font-bold text-sm text-white">Mi Cuenta</h3>
            <p class="text-xs text-white/80 mt-0.5">juan.perez@empresa.com</p>
          </div>
          <button
            class="w-full px-5 py-3 hover:bg-slate-50 text-left text-sm font-semibold flex items-center gap-3 transition-colors text-slate-700 hover:text-[#021C7D] cursor-pointer"
          >
            <User class="h-4 w-4" />
            Perfil
          </button>
          <button
            class="w-full px-5 py-3 hover:bg-slate-50 text-left text-sm font-semibold transition-colors text-slate-700 hover:text-[#021C7D] cursor-pointer"
          >
            ⚙️ Configuración
          </button>
          <div class="border-t-2">
            <button
              class="w-full px-5 py-3 hover:bg-red-50 text-left text-sm font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Bell, HelpCircle, User } from "lucide-vue-next";

const showNotifications = ref(false);
const showUserMenu = ref(false);

const notifications = [
  {
    id: 1,
    title: "Ticket TK-123 asignado",
    description: "Te han asignado un nuevo ticket de alta prioridad",
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    title: "Comentario en TK-456",
    description: "María agregó un comentario en tu ticket",
    time: "Hace 1 hora",
  },
  {
    id: 3,
    title: "Sprint finalizado",
    description: "El Sprint 5 ha sido completado exitosamente",
    time: "Hace 2 horas",
  },
];

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
  showUserMenu.value = false;
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
}
</script>
