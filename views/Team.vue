<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Users class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">Equipo E-Learning</h1>
          <p class="text-xs text-slate-500">Miembros del equipo y sus roles</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-purple-50">
            <Users class="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">{{ totalMembers }}</p>
            <p class="text-xs text-slate-500">Total Miembros</p>
          </div>
        </div>
      </div>
      <div
        v-for="role in availableRoles"
        :key="role.rol_name"
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-50">
            <span class="text-2xl">{{ role.icon }}</span>
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ getMemberCountByRole(role.rol_name) }}
            </p>
            <p class="text-xs text-slate-500">{{ role.rol_name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm p-4">
      <div class="flex flex-wrap gap-3 items-center">
        <div class="flex-1 min-w-[250px] relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre o rol..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
          />
        </div>

        <select
          v-model="filterRole"
          class="px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
        >
          <option value="">👥 Todos los roles</option>
          <option
            v-for="role in availableRoles"
            :key="role.rol_name"
            :value="role.rol_name"
          >
            {{ role.icon }} {{ role.rol_name }}
          </option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="member in filteredMembers"
        :key="member.network_user"
        class="bg-white rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        <div
          class="h-24 bg-gradient-to-br from-[#021C7D] to-[#50bdeb] relative"
        >
          <div class="absolute -bottom-10 left-6">
            <div
              class="w-20 h-20 rounded-xl border-4 border-white bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-md"
            >
              <span class="text-2xl font-bold text-[#021C7D]">{{
                member.initials
              }}</span>
            </div>
          </div>
        </div>
        <div class="pt-12 px-6 pb-6">
          <div class="mb-3">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">
              {{ member.name }} {{ member.last_name }}
            </h3>
            <div class="flex items-center gap-2">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700"
              >
                {{ getRoleIcon(member.rol_name) }}
                {{ member.rol_name }}
              </span>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <Mail class="w-4 h-4 text-slate-400" />
              <span>{{ member.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <PhoneCall class="w-4 h-4 text-slate-400" />
              <span>{{ member.phone }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Users, Search, Mail, PhoneCall } from "lucide-vue-next";
import type { EUser, Role } from "../models";
import { eUsersService } from "../services/e-usersService";
import { RolesService } from "../services/rolesService";
import { useNotification } from "../utils/useNotification";

const notification = useNotification();
const eUsers = new eUsersService();
const rolesService = new RolesService();

interface TeamMemberUI extends EUser {
  initials: string;
}

const teamMembers = ref<TeamMemberUI[]>([]);
const availableRoles = ref<Role[]>([]);

const loadTeamMembers = async () => {
  try {
    const response = await eUsers.getAll();
    if (response.data && response.data.results) {
      teamMembers.value = response.data.results.flat().map((member: EUser) => ({
        ...member,
        initials: getInitials(member.name, member.last_name),
      }));
    }
  } catch (error) {
    console.error("Error al cargar miembros del equipo:", error);
    notification.error(
      "Error",
      "No se pudieron cargar los miembros del equipo."
    );
  }
};

const getInitials = (name: string, lastName: string): string => {
  const firstInitial = name?.charAt(0).toUpperCase() || "";
  const lastInitial = lastName?.charAt(0).toUpperCase() || "";
  return `${firstInitial}${lastInitial}`;
};

const loadRoles = async () => {
  try {
    const response = await rolesService.getAll();
    if (response.data && response.data.results) {
      availableRoles.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar roles:", error);
    notification.error("Error", "No se pudieron cargar los roles.");
  }
};

onMounted(() => {
  loadTeamMembers();
  loadRoles();
});

const searchQuery = ref("");
const filterRole = ref("");

const filteredMembers = computed(() => {
  return teamMembers.value.filter((member) => {
    const fullName = `${member.name} ${member.middle_name || ""} ${
      member.last_name
    } ${member.second_last_name || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.value.toLowerCase()) ||
      (member.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ??
        false);

    const matchesRole =
      filterRole.value === "" || member.rol_name === filterRole.value;

    return matchesSearch && matchesRole;
  });
});

const totalMembers = computed(() => teamMembers.value.length);

const getMemberCountByRole = (roleName: string) => {
  return teamMembers.value.filter((m) => m.rol_name === roleName).length;
};

const getRoleIcon = (role: string) => {
  const roleFromDB = availableRoles.value.find((r) => r.rol_name === role);
  return roleFromDB?.icon || "👤";
};
</script>
