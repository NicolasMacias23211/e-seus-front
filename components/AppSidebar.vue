<template>
  <div
    :class="[
      'flex h-screen flex-col bg-[#021C7D] text-white flex-shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden',
      isCollapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Header -->
    <div class="flex flex-col gap-3 p-3 border-b border-[#0829a3]">
      <div
        class="flex items-center"
        :class="isCollapsed ? 'justify-center' : 'justify-between'"
      >
        <h1
          v-if="!isCollapsed"
          class="text-xl font-bold truncate transition-opacity duration-200"
        >
          E-learning seus
        </h1>
        <button
          @click="toggleCollapse"
          class="p-1.5 rounded-lg hover:bg-[#0829a3] transition-colors flex-shrink-0 cursor-pointer"
          :title="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
        >
          <ChevronRight v-if="isCollapsed" class="h-5 w-5" />
          <ChevronLeft v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-2">
      <div class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
            isCollapsed ? 'justify-center px-0' : 'gap-3',
            $route.path === item.href
              ? 'bg-[#50bdeb] text-white'
              : 'text-white/80 hover:bg-[#0829a3] hover:text-white',
          ]"
          :title="isCollapsed ? item.name : ''"
        >
          <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
          <span
            v-if="!isCollapsed"
            class="truncate transition-opacity duration-200"
          >
            {{ item.name }}
          </span>
        </router-link>
      </div>
    </nav>

    <!-- Footer -->
    <div class="border-t border-[#0829a3] p-2">
      <router-link
        to="/settings"
        :class="[
          'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-[#0829a3] hover:text-white transition-colors',
          isCollapsed ? 'justify-center px-0' : 'gap-3',
        ]"
        :title="isCollapsed ? 'Configuración' : ''"
      >
        <Settings class="h-5 w-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="truncate">Configuración</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  TrendingUp,
  Kanban,
  List,
  Users,
  Settings,
  BarChart3,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageSquareWarning,
  CalendarDays
} from "lucide-vue-next";

const isCollapsed = ref(false);

const COLLAPSE_BREAKPOINT = 1280; // px — laptops típicos < 1280

function handleResize() {
  if (window.innerWidth < COLLAPSE_BREAKPOINT) {
    isCollapsed.value = true;
  }
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
}

onMounted(() => {
  // Colapsar por defecto en pantallas pequeñas
  isCollapsed.value = window.innerWidth < COLLAPSE_BREAKPOINT;
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
  { name: "Tablero", href: "/board", icon: Kanban },
  { name: "Lista de Tickets", href: "/tickets", icon: List },
  { name: "Backlog", href: "/backlog", icon: Layers },
  { name: "Equipo", href: "/team", icon: Users },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Tiempo", href: "/timetracking", icon: Clock },
  { name: "Novedades", href: "/novelties", icon: MessageSquareWarning },
  { name: "Programación", href: "/schedule", icon: CalendarDays },
];
</script>
