<template>
  <div
    class="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
    style="background: linear-gradient(135deg, #0538d4 0%, #001e5c 100%)"
  >
    <div
      class="absolute inset-0 opacity-10 pointer-events-none"
      style="
        background-image: linear-gradient(
            rgba(80, 189, 235, 0.4) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(80, 189, 235, 0.4) 1px, transparent 1px);
        background-size: 30px 30px;
      "
    ></div>

    <div
      class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent opacity-80"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent opacity-80"
    ></div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-40 h-40 bg-[#50bdeb] rounded-full opacity-20 blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-48 h-48 bg-[#50bdeb] rounded-full opacity-20 blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0538d4] rounded-full opacity-10 blur-3xl"
      ></div>
    </div>

    <div class="w-full max-w-4xl relative z-10">
      <div class="text-center mb-8">
        <div
          class="inline-block p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm border border-[#50bdeb]/30 shadow-lg shadow-[#50bdeb]/20"
        >
          <User class="w-12 h-12 text-[#50bdeb]" />
        </div>
        <h1
          class="text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-wide"
        >
          Mi Perfil
        </h1>
        <p class="text-blue-100 text-lg font-medium">
          Información personal y configuración de cuenta
        </p>
        <div
          class="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent rounded-full mx-auto"
        ></div>
      </div>

      <div
        class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,25,80,0.4)] p-8 border border-[#50bdeb]/20"
      >
        <!-- Avatar y nombre -->
        <div
          class="flex items-center gap-6 mb-8 pb-8 border-b-2 border-slate-200"
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
              {{ userProfile.rolName }}
            </p>
            <p class="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <Building2 class="w-4 h-4" />
              {{ userProfile.userClientName }}
            </p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Información Personal (Solo lectura) -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <UserCircle class="w-5 h-5 text-blue-600" />
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
                  {{ userProfile.networkUser }}
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
                  {{ userProfile.middleName || "N/A" }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Apellido
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.lastName }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Segundo Apellido
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.secondLastName || "N/A" }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">
                  Cliente
                </label>
                <div
                  class="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 font-medium cursor-not-allowed"
                >
                  {{ userProfile.userClientName }}
                </div>
              </div>
            </div>
          </div>

          <!-- Información de Contacto (Editable) -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <Mail class="w-5 h-5 text-blue-600" />
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
                  <Mail class="w-4 h-4 text-blue-600" />
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  v-model="editableProfile.email"
                  type="email"
                  class="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
                >
                  <Phone class="w-4 h-4 text-blue-600" />
                  Teléfono
                </label>
                <input
                  id="phone"
                  v-model="editableProfile.phone"
                  type="tel"
                  class="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>
          </div>

          <!-- Información Adicional (Solo lectura) -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
            >
              <Shield class="w-5 h-5 text-blue-600" />
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
                  <Shield class="w-4 h-4 text-blue-600" />
                  {{ userProfile.rolName }}
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
          <div class="flex gap-4 pt-6 border-t-2 border-slate-200">
            <button
              type="button"
              @click="resetChanges"
              class="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all hover:shadow-md flex items-center justify-center gap-2"
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
  networkUser: "jperez",
  name: "Juan",
  middleName: "Carlos",
  lastName: "Pérez",
  secondLastName: "González",
  email: "juan.perez@empresa.com",
  phone: "+57 300 123 4567",
  userClientName: "Cliente Principal A",
  idServices: 1,
  rolName: "Soporte Técnico",
});

// Copia editable solo de los campos modificables
const editableProfile = reactive({
  email: userProfile.email,
  phone: userProfile.phone,
});

const getUserInitials = () => {
  const firstInitial = userProfile.name.charAt(0).toUpperCase();
  const lastInitial = userProfile.lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

const getFullName = () => {
  const parts = [
    userProfile.name,
    userProfile.middleName,
    userProfile.lastName,
    userProfile.secondLastName,
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
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
