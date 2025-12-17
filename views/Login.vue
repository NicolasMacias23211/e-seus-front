<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#021C7D] via-[#0a2f9e] to-[#50bdeb] flex items-center justify-center p-4">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#50bdeb]/20 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"></div>
      <div class="absolute top-10 right-20 animate-float" style="animation-delay: 0.5s">
        <div class="w-20 h-20 border-2 border-white/20 rounded-lg rotate-45"></div>
      </div>
      <div class="absolute bottom-32 left-16 animate-float-slow" style="animation-delay: 1.5s">
        <div class="w-16 h-16 border-2 border-white/15 rounded-full"></div>
      </div>
      <div class="absolute top-1/3 left-1/4 animate-float" style="animation-delay: 2.5s">
        <div class="w-12 h-12 bg-white/5 rounded-lg rotate-12"></div>
      </div>
      <div class="absolute bottom-1/4 right-1/4 animate-float-slow" style="animation-delay: 0.8s">
        <div class="w-24 h-24 border-2 border-white/10 rounded-xl -rotate-12"></div>
      </div>
      <div class="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-particle"
        style="animation-delay: 0.2s"></div>
      <div class="absolute top-1/3 right-20 w-3 h-3 bg-[#50bdeb]/40 rounded-full animate-particle-slow"
        style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-particle"
        style="animation-delay: 1.8s"></div>
      <div class="absolute top-2/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-particle-slow"
        style="animation-delay: 0.5s"></div>
      <div class="absolute bottom-1/4 left-20 w-2 h-2 bg-[#50bdeb]/30 rounded-full animate-particle"
        style="animation-delay: 2.2s"></div>
      <div class="absolute top-16 left-1/4 animate-float-slow opacity-10">
        <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9 10h1a1 1 0 000-2H9a1 1 0 000 2zm0 2a1 1 0 000 2h6a1 1 0 000-2H9zm11-3.06a1.31 1.31 0 00-.06-.27v-.09a1.07 1.07 0 00-.19-.28l-6-6a1.07 1.07 0 00-.28-.19.32.32 0 00-.09 0 .88.88 0 00-.33-.11H7a3 3 0 00-3 3v14a3 3 0 003 3h10a3 3 0 003-3V8.94zm-6-3.53L16.59 8H15a1 1 0 01-1-1zM18 19a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1h5v3a3 3 0 003 3h3zm-3-3H9a1 1 0 000 2h6a1 1 0 000-2z" />
        </svg>
      </div>
      <div class="absolute bottom-20 right-1/4 animate-float opacity-10" style="animation-delay: 1.2s">
        <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div class="absolute top-1/2 right-16 animate-float-slow opacity-10" style="animation-delay: 2s">
        <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    </div>
    <div
      class="relative w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
      <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] px-8 py-12 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-white/10 backdrop-blur-sm" style="
            mask-image: radial-gradient(
              circle at top right,
              transparent 30%,
              black 70%
            );
          "></div>
        <div class="relative z-10">
          <div
            class="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <Lock class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Bienvenido</h1>
          <p class="text-white/80 text-sm">
            Sistema de Gestión de Tickets para el area de E-learning
          </p>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="p-8 space-y-6">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-bold text-slate-700">
            Usuario
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User class="w-5 h-5 text-slate-400 group-focus-within:text-[#50bdeb] transition-colors" />
            </div>
            <input id="username" v-model="form.username" type="text" required
              class="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all outline-none"
              placeholder="Ingrese su usuario" />
          </div>
        </div>
        <div class="space-y-2">
          <label for="password" class="block text-sm font-bold text-slate-700">
            Contraseña
          </label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <KeyRound class="w-5 h-5 text-slate-400 group-focus-within:text-[#50bdeb] transition-colors" />
            </div>
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
              class="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#50bdeb] focus:border-[#50bdeb] transition-all outline-none"
              placeholder="Ingrese su contraseña" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#50bdeb] transition-colors">
              <Eye v-if="!showPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input v-model="form.rememberMe" type="checkbox"
              class="w-4 h-4 text-[#50bdeb] border-slate-300 rounded focus:ring-[#50bdeb] cursor-pointer" />
            <span class="text-sm text-slate-600 group-hover:text-slate-900">
              Recordarme
            </span>
          </label>
          <a href="https://adself.emtelco.co/webclient/index.html?#/selfservice/enrollment" class="text-sm text-[#50bdeb] hover:text-[#021C7D] font-medium transition-colors">
            <!-- Este enlace que lleve a la pagina para desbloquar el usuario -->
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button type="submit" :disabled="isLoading"
          class="w-full bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
          <span>{{
            isLoading ? "Iniciando sesión..." : "Iniciar Sesión"
          }}</span>
        </button>
      </form>
      <div class="px-8 py-6 bg-slate-50 text-center border-t border-slate-200">
        <p class="text-sm text-slate-600">
          Realize el login con usuario y clave de red
        </p>
      </div>
    </div>
    <div class="absolute bottom-4 left-0 right-0 text-center">
      <p class="text-white/60 text-sm">
        Copyright © Emtelco S.A.S {{ currentYear }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Lock, User, KeyRound, Eye, EyeOff, Loader2 } from "lucide-vue-next";
import { useNotification } from "../utils/useNotification";
import { LoginService } from "../services/loginService";
import { computed } from "vue";
import type { Login, UserInfo } from "../models/login";
import {SessionStorageService} from "../services/SessionStorageService"

const currentYear = computed(() => new Date().getFullYear());
const router = useRouter();
const notification = useNotification();
const loginService = new LoginService();

const form = reactive({
  username: "",
  password: "",
  rememberMe: false,
});
const showPassword = ref(false);
const isLoading = ref(false);
//TODO: el orden 
const handleLogin = async () => {
    if (form.username && form.password) {
      const sessionStorageService = new SessionStorageService();
      const loginResult:Login = await loginService.login(form.username,form.password)
      sessionStorageService.handleLogin(loginResult);
      if(sessionStorageService.getAccessToken != null){
      notification.success(
        "¡Bienvenido!",
        `Sesión iniciada como ${form.username}`
      );
      router.push("/dashboard");
      }
    } else {
      notification.error("Error", "Credenciales inválidas");
    }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-slow {

  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) translateX(10px) rotate(-5deg);
  }
}

@keyframes particle {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
}

@keyframes particle-slow {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(-150px) translateX(50px) scale(0);
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-particle {
  animation: particle 4s ease-in-out infinite;
}

.animate-particle-slow {
  animation: particle-slow 6s ease-in-out infinite;
}

input[type="checkbox"]:checked {
  background-color: #50bdeb;
  border-color: #50bdeb;
}
</style>
