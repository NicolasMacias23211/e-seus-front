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
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-50">
            <Palette class="w-5 h-5 text-[#50bdeb]" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ creativosCount }}
            </p>
            <p class="text-xs text-slate-500">Creativos</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-green-50">
            <BookOpen class="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ arquitectosCount }}
            </p>
            <p class="text-xs text-slate-500">Arquitectos AVA</p>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-50">
            <UserCheck class="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-[#021C7D]">
              {{ asistentesCount }}
            </p>
            <p class="text-xs text-slate-500">Asistentes AVA</p>
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
          <option value="creativo">🎨 Creativos</option>
          <option value="practicante">🎓 Practicantes Creativos</option>
          <option value="arquitecto">📚 Arquitectos AVA</option>
          <option value="asistente">✏️ Asistentes AVA</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="member in filteredMembers"
        :key="member.networkUser"
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
              {{ member.name }} {{ member.lastName }}
            </h3>
            <div class="flex items-center gap-2">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold"
                :class="getRoleClass(member.rolName)"
              >
                {{ getRoleIcon(member.rolName) }}
                {{ getRoleLabel(member.rolName) }}
              </span>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <Mail class="w-4 h-4 text-slate-400" />
              <span>{{ member.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-slate-600">
              <Clock class="w-4 h-4 text-slate-400" />
              <span>{{ member.ticketsAsignados }} tickets asignados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Users,
  Palette,
  BookOpen,
  UserCheck,
  Search,
  Mail,
  Clock,
} from "lucide-vue-next";
import type { EUser } from "../models";

interface TeamMemberUI extends EUser {
  initials: string;
  ticketsAsignados: number;
}

const searchQuery = ref("");
const filterRole = ref("");

const teamMembers = ref<TeamMemberUI[]>([
  {
    networkUser: "mgonzalez",
    name: "María",
    middleName: null,
    lastName: "González",
    secondLastName: null,
    email: "maria.gonzalez@empresa.com",
    phone: "+57 300 123 4567",
    userClientName: "Cliente Principal A",
    idServices: 1,
    rolName: "creativo",
    initials: "MG",
    ticketsAsignados: 8,
  },
  {
    networkUser: "cramirez",
    name: "Carlos",
    middleName: null,
    lastName: "Ramírez",
    secondLastName: null,
    email: "carlos.ramirez@empresa.com",
    phone: "+57 300 234 5678",
    userClientName: "Cliente Principal A",
    idServices: 1,
    rolName: "creativo",
    initials: "CR",
    ticketsAsignados: 6,
  },
  {
    networkUser: "amartinez",
    name: "Ana",
    middleName: "María",
    lastName: "Martínez",
    secondLastName: "López",
    email: "ana.martinez@empresa.com",
    phone: "+57 300 345 6789",
    userClientName: "Cliente Principal B",
    idServices: 2,
    rolName: "practicante",
    initials: "AM",
    ticketsAsignados: 4,
  },
  {
    networkUser: "ltorres",
    name: "Luis",
    middleName: null,
    lastName: "Torres",
    secondLastName: null,
    email: "luis.torres@empresa.com",
    phone: "+57 300 456 7890",
    userClientName: "Cliente Principal A",
    idServices: 1,
    rolName: "practicante",
    initials: "LT",
    ticketsAsignados: 3,
  },
  {
    networkUser: "pherrera",
    name: "Patricia",
    middleName: null,
    lastName: "Herrera",
    secondLastName: "Ruiz",
    email: "patricia.herrera@empresa.com",
    phone: "+57 300 567 8901",
    userClientName: "Cliente Principal C",
    idServices: 3,
    rolName: "arquitecto",
    initials: "PH",
    ticketsAsignados: 10,
  },
  {
    networkUser: "dsilva",
    name: "Diego",
    middleName: "Fernando",
    lastName: "Silva",
    secondLastName: null,
    email: "diego.silva@empresa.com",
    phone: "+57 300 678 9012",
    userClientName: "Cliente Principal B",
    idServices: 2,
    rolName: "arquitecto",
    initials: "DS",
    ticketsAsignados: 9,
  },
  {
    networkUser: "clopez",
    name: "Carmen",
    middleName: null,
    lastName: "López",
    secondLastName: "García",
    email: "carmen.lopez@empresa.com",
    phone: "+57 300 789 0123",
    userClientName: "Cliente Principal A",
    idServices: 1,
    rolName: "arquitecto",
    initials: "CL",
    ticketsAsignados: 7,
  },
  {
    networkUser: "rdiaz",
    name: "Roberto",
    middleName: null,
    lastName: "Díaz",
    secondLastName: null,
    email: "roberto.diaz@empresa.com",
    phone: "+57 300 890 1234",
    userClientName: "Cliente Principal C",
    idServices: 3,
    rolName: "asistente",
    initials: "RD",
    ticketsAsignados: 5,
  },
  {
    networkUser: "evargas",
    name: "Elena",
    middleName: "Patricia",
    lastName: "Vargas",
    secondLastName: "Mendoza",
    email: "elena.vargas@empresa.com",
    phone: "+57 300 901 2345",
    userClientName: "Cliente Principal A",
    idServices: 1,
    rolName: "asistente",
    initials: "EV",
    ticketsAsignados: 6,
  },
  {
    networkUser: "jmorales",
    name: "Javier",
    middleName: null,
    lastName: "Morales",
    secondLastName: "Sánchez",
    email: "javier.morales@empresa.com",
    phone: "+57 300 012 3456",
    userClientName: "Cliente Principal B",
    idServices: 2,
    rolName: "asistente",
    initials: "JM",
    ticketsAsignados: 4,
  },
]);

const filteredMembers = computed(() => {
  return teamMembers.value.filter((member) => {
    const fullName = `${member.name} ${member.middleName || ""} ${
      member.lastName
    } ${member.secondLastName || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.value.toLowerCase()) ||
      (member.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ??
        false);

    const matchesRole =
      filterRole.value === "" || member.rolName === filterRole.value;

    return matchesSearch && matchesRole;
  });
});

const totalMembers = computed(() => teamMembers.value.length);

const creativosCount = computed(() => {
  return teamMembers.value.filter(
    (m) => m.rolName === "creativo" || m.rolName === "practicante"
  ).length;
});

const arquitectosCount = computed(() => {
  return teamMembers.value.filter((m) => m.rolName === "arquitecto").length;
});

const asistentesCount = computed(() => {
  return teamMembers.value.filter((m) => m.rolName === "asistente").length;
});

const getRoleClass = (role: string) => {
  const classes: Record<string, string> = {
    creativo: "bg-purple-100 text-purple-700",
    practicante: "bg-blue-100 text-blue-700",
    arquitecto: "bg-green-100 text-green-700",
    asistente: "bg-amber-100 text-amber-700",
  };
  return classes[role] || "bg-slate-100 text-slate-700";
};

const getRoleIcon = (role: string) => {
  const icons: Record<string, string> = {
    creativo: "🎨",
    practicante: "🎓",
    arquitecto: "📚",
    asistente: "✏️",
  };
  return icons[role] || "👤";
};

const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    creativo: "Creativo",
    practicante: "Practicante",
    arquitecto: "Arquitecto AVA",
    asistente: "Asistente AVA",
  };
  return labels[role] || role;
};
</script>
