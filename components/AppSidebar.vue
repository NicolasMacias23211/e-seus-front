<template>
  <div class="flex h-screen w-56 flex-col bg-[#021C7D] text-white">
    <div class="flex flex-col gap-4 p-4 border-b border-[#0829a3]">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Tickets</h1>
      </div>

      <div class="relative">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-white/60" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Buscar..."
          class="w-full pl-8 pr-3 py-2 bg-[#0829a3] border-none text-white placeholder:text-white/60 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50bdeb]"
        />
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto p-2">
      <div class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            $route.path === item.href
              ? 'bg-[#50bdeb] text-white'
              : 'text-white/80 hover:bg-[#0829a3] hover:text-white',
          ]"
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.name }}
        </router-link>
      </div>
    </nav>
    <div class="border-t border-[#0829a3] p-4">
      <router-link
        to="/settings"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-[#0829a3] hover:text-white transition-colors"
      >
        <Settings class="h-5 w-5" />
        Configuración
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  LayoutDashboard,
  LayoutGrid,
  List,
  Users,
  FolderKanban,
  Settings,
  BarChart3,
  Clock,
  Search,
  Layers,
} from "lucide-vue-next";

const searchQuery = ref("");

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tablero", href: "/board", icon: LayoutGrid },
  { name: "Lista de Tickets", href: "/tickets", icon: List },
  { name: "Backlog", href: "/backlog", icon: Layers },
  { name: "Proyectos", href: "/projects", icon: FolderKanban },
  { name: "Equipo", href: "/team", icon: Users },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Tiempo", href: "/timetracking", icon: Clock },
];
</script>
