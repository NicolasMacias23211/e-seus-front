<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
          <Users class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Usuarios Básicos</h1>
          <p class="text-xs text-slate-500">
            Gestión de usuarios externos que reportan tickets
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold">
                Usuario de Red
              </th>
              <th class="px-6 py-4 text-left text-sm font-bold">Nombre Completo</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Email</th>
              <th class="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="(user, index) in users"
              :key="index" class="hover:bg-emerald-50 transition-colors">
              <td class="px-6 py-4 text-sm text-slate-700 font-mono">
                {{ user.network_user }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-700 font-medium">
                {{ user.full_name || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.mail || "-" }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ user.phone || "-" }}
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                No hay usuarios registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,  onMounted } from "vue";
import { Users } from "lucide-vue-next";
import { useNotification } from "../../utils/useNotification";
import type { User } from "../../models/User";
import { UsersService } from "../../services/usersService";
// import { UsersService } from "../../services/usersService";

const notification = useNotification();
const usersService = new UsersService();
const users = ref<User[]>([]);

const loadUsers = async () => {
  try {
    const response = await usersService.getAll()
    if (response.data && response.data.results) {
      users.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los usuarios: ", error)
    notification.error("Error", "No se pudieron cargar los usuarios")
  }
}

onMounted(() => {
  loadUsers();
});
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