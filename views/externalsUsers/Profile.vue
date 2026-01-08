<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-6"
  >
    <div class="w-full max-w-5xl mx-auto">
      <!-- Header con gradiente -->
      <div
        class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] rounded-2xl p-6 mb-6 shadow-lg"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <User class="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Mi Perfil</h1>
            <p class="text-sm text-white/90">
              Información personal y configuración de cuenta
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-md border-2 border-blue-100 p-8">
        <!-- Avatar y nombre -->
        <div
          class="flex items-center gap-6 mb-8 pb-8 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent p-6 rounded-xl"
        >
          <div
            class="w-24 h-24 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-white text-3xl font-bold shadow-xl"
          >
            {{ getUserInitials() }}
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-slate-800 mb-1">
              {{ getFullName() }}
            </h2>
            <p class="text-slate-600 font-medium flex items-center gap-2">
              <Briefcase class="w-4 h-4" />
              {{ userProfile.rol_name }}
            </p>
            <p class="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <Building2 class="w-4 h-4" />
              {{ userProfile.user_client_name }}
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Información Personal (Solo lectura) -->
          <div class="mb-6">
            <h3
              class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <UserCircle class="w-5 h-5 text-[#021C7D]" />
              Información Personal
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Usuario de Red
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.network_user }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Nombre
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.name }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Segundo Nombre
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.middle_name || "N/A" }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Apellido
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.last_name }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Segundo Apellido
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.second_last_name || "N/A" }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Cliente
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.user_client_name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Información de Contacto (Editable) -->
          <div class="mb-6">
            <h3
              class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <Mail class="w-5 h-5 text-[#021C7D]" />
              Información de Contacto
              <span class="text-sm font-normal text-slate-500 ml-2">
                (Puedes modificar estos campos)
              </span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="email"
                  class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <Mail class="w-4 h-4 text-[#021C7D]" />
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  v-model="editableProfile.email"
                  type="email"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all hover:border-slate-300 bg-white"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <Phone class="w-4 h-4 text-[#021C7D]" />
                  Teléfono
                </label>
                <input
                  id="phone"
                  v-model="editableProfile.phone"
                  type="tel"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all hover:border-slate-300 bg-white"
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>
          </div>

          <!-- Información Adicional (Solo lectura) -->
          <div class="mb-6">
            <h3
              class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <Shield class="w-5 h-5 text-[#021C7D]" />
              Información del Sistema
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Rol
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed flex items-center gap-2"
                >
                  <Shield class="w-4 h-4 text-[#021C7D]" />
                  {{ userProfile.rol_name }}
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje de éxito -->
          <div
            v-if="showSuccess"
            class="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
            >
              <Check class="w-6 h-6 text-white" />
            </div>
            <div>
              <p class="text-green-800 font-bold text-sm">
                ¡Información actualizada exitosamente!
              </p>
              <p class="text-green-600 text-xs mt-1">
                Tus datos de contacto han sido guardados correctamente.
              </p>
            </div>
          </div>

          <!-- Botones de acción -->
          <div class="flex gap-4 pt-6 border-t-2 border-blue-100">
            <button
              type="button"
              @click="resetChanges"
              class="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all hover:shadow-md flex items-center justify-center gap-2 border-2 border-slate-200"
            >
              <RotateCcw class="w-5 h-5" />
              Cancelar Cambios
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save class="w-5 h-5" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  User,
  Mail,
  Phone,
  Shield,
  UserCircle,
  Briefcase,
  Building2,
  Save,
  RotateCcw,
  Check,
} from "lucide-vue-next";
import type { EUser } from "../../models";

const showSuccess = ref(false);

// Mock data del usuario
const userProfile = reactive<EUser>({
  network_user: "jperez",
  name: "Juan",
  middle_name: "Carlos",
  last_name: "Pérez",
  second_last_name: "González",
  email: "juan.perez@empresa.com",
  phone: "+57 300 123 4567",
  user_client_name: "Cliente Principal A",
  id_services: 1,
  rol_name: "Soporte Técnico",
});

// Copia editable solo de los campos modificables
const editableProfile = reactive({
  email: userProfile.email,
  phone: userProfile.phone,
});

const getUserInitials = () => {
  const firstInitial = userProfile.name.charAt(0).toUpperCase();
  const lastInitial = userProfile.last_name.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

const getFullName = () => {
  const parts = [
    userProfile.name,
    userProfile.middle_name,
    userProfile.last_name,
    userProfile.second_last_name,
  ].filter(Boolean);
  return parts.join(" ");
};

const resetChanges = () => {
  editableProfile.email = userProfile.email;
  editableProfile.phone = userProfile.phone;
  showSuccess.value = false;
};

const handleSubmit = () => {
  // Actualizar solo los campos editables
  userProfile.email = editableProfile.email;
  userProfile.phone = editableProfile.phone;

  // Mostrar mensaje de éxito
  showSuccess.value = true;

  // Ocultar mensaje después de 3 segundos
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);

  console.log("Información actualizada:", {
    email: userProfile.email,
    phone: userProfile.phone,
  });
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
