<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
      >
        <Settings class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-[#021C7D]">Configuración</h1>
        <p class="text-xs text-slate-500">
          Gestiona los parámetros del sistema
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        to="/settings/cliente-principal"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Building2 class="w-6 h-6 text-blue-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">
              Cliente Principal
            </h3>
            <p class="text-xs text-slate-600">
              Gestiona los clientes principales del sistema
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/sub-programa"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Users class="w-6 h-6 text-purple-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">Sub-Programa</h3>
            <p class="text-xs text-slate-600">
              Administra sub-programas asociados
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/programa"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <FolderKanban
              class="w-6 h-6 text-green-600 group-hover:text-white"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">Programa</h3>
            <p class="text-xs text-slate-600">
              Configura programas y proyectos
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/ans"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Clock class="w-6 h-6 text-red-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">ANS</h3>
            <p class="text-xs text-slate-600">
              Define acuerdos de nivel de servicio
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/estados-solicitud"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <FileText class="w-6 h-6 text-amber-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">
              Proridades de tickets
            </h3>
            <p class="text-xs text-slate-600">Proridades de tickets</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/codigos-cierre"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <CheckCircle
              class="w-6 h-6 text-indigo-600 group-hover:text-white"
            />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">
              Códigos de Cierre
            </h3>
            <p class="text-xs text-slate-600">
              Motivos de finalización de tickets
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/tipos-servicio"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Layers class="w-6 h-6 text-cyan-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">
              Tipos de Servicio
            </h3>
            <p class="text-xs text-slate-600">
              Clasificación de servicios ofrecidos
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/e-usuarios"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <UserCog class="w-6 h-6 text-pink-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">E-Usuarios</h3>
            <p class="text-xs text-slate-600">
              Usuarios internos del sistema con roles
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/usuarios"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Users class="w-6 h-6 text-emerald-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">Usuarios</h3>
            <p class="text-xs text-slate-600">
              Usuarios básicos que reportan tickets
            </p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/roles"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Shield class="w-6 h-6 text-slate-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">Roles</h3>
            <p class="text-xs text-slate-600">Roles y permisos del sistema</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/settings/horarios"
        class="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-[#50bdeb] hover:shadow-lg transition-all duration-200"
      >
        <div class="flex items-start gap-4">
          <div
            class="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 group-hover:from-[#021C7D] group-hover:to-[#50bdeb] transition-all"
          >
            <Clock class="w-6 h-6 text-emerald-600 group-hover:text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-[#021C7D] mb-1">Horarios</h3>
            <p class="text-xs text-slate-600">
              Horarios de trabajo en el área.
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2,
  CheckCircle,
  Clock,
  FileText,
  FolderKanban,
  Layers,
  Settings,
  Shield,
  UserCog,
  Users
} from "lucide-vue-next";
</script>
