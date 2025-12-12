<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button
        class="p-2.5 hover:bg-slate-100 rounded-xl transition-colors border-2 border-slate-200"
        @click="goBack"
      >
        <ArrowLeft class="w-5 h-5 text-slate-600" />
      </button>
      <div class="flex items-center gap-3 flex-1">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <FileText class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3">
            <AlertCircle class="w-5 h-5 text-red-500" />
            <span class="text-[#50bdeb] font-bold text-lg">PROJ-101</span>
            <h1 class="text-2xl font-bold text-[#021C7D]">
              {{ ticket.title }}
            </h1>
          </div>
        </div>
      </div>
      <button
        class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center gap-2"
      >
        <Link class="w-4 h-4" />
        Copiar Link
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl border-2 shadow-sm p-6">
          <div class="flex items-center gap-2 border-b-2 pb-4 mb-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-5 py-2.5 rounded-xl font-semibold transition-all"
              :class="
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#021C7D] hover:bg-slate-100'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <div v-if="activeTab === 'details'" class="space-y-6">
            <div>
              <h3
                class="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wide"
              >
                Descripción
              </h3>
              <p class="text-slate-700 leading-relaxed text-base">
                {{ ticket.description }}
              </p>
            </div>
          </div>

          <div v-if="activeTab === 'comments'" class="space-y-6">
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0"
              >
                JD
              </div>
              <div class="flex-1">
                <textarea
                  v-model="newComment"
                  placeholder="Agregar un comentario..."
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] min-h-[120px] transition-colors"
                />
                <div class="flex justify-end gap-2 mt-3">
                  <button
                    class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    class="px-6 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-200"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-4 mt-6">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0"
                >
                  {{ comment.author.charAt(0) }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-bold text-[#021C7D]">{{
                      comment.author
                    }}</span>
                    <span class="text-sm text-slate-500 font-medium">{{
                      comment.timestamp
                    }}</span>
                  </div>
                  <p class="text-slate-700 leading-relaxed">
                    {{ comment.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'activity'" class="space-y-4">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="flex gap-4 pb-4 border-b-2 last:border-0"
            >
              <div
                class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"
              >
                <Clock class="w-5 h-5 text-slate-600" />
              </div>
              <div class="flex-1">
                <p class="text-slate-700">
                  <span class="font-bold text-[#021C7D]">{{
                    activity.user
                  }}</span>
                  {{ activity.action }}
                </p>
                <span class="text-sm text-slate-500 font-medium">{{
                  activity.timestamp
                }}</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'attachments'" class="space-y-4">
            <div
              class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-[#50bdeb] hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Upload class="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p class="text-slate-700 font-medium mb-2">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p class="text-sm text-slate-400">PNG, JPG, PDF hasta 10MB</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div
                class="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center gap-3 hover:border-[#50bdeb] transition-colors cursor-pointer"
              >
                <div
                  class="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-medium truncate">documento.pdf</p>
                  <p class="text-sm text-slate-400">2.4 MB</p>
                </div>
              </div>

              <div
                class="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center gap-3 hover:border-[#50bdeb] transition-colors cursor-pointer"
              >
                <div
                  class="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-medium truncate">captura.png</p>
                  <p class="text-sm text-slate-400">1.2 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-xl border-2 shadow-sm p-6 space-y-5">
          <div>
            <label
              class="text-sm font-bold text-slate-600 block mb-3 uppercase tracking-wide"
              >Estado</label
            >
            <select
              v-model="ticket.status"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:border-[#50bdeb] transition-colors"
            >
              <option value="backlog">📦 Backlog</option>
              <option value="todo">📝 Por Hacer</option>
              <option value="in-progress">⚡ En Progreso</option>
              <option value="review">👀 En Revisión</option>
              <option value="done">✅ Completado</option>
            </select>
          </div>

          <div>
            <label
              class="text-sm font-bold text-slate-600 block mb-3 uppercase tracking-wide"
              >Prioridad</label
            >
            <select
              v-model="ticket.priority"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:border-[#50bdeb] transition-colors"
            >
              <option value="urgent">🔴 Urgente</option>
              <option value="high">🟠 Alta</option>
              <option value="medium">🟡 Media</option>
              <option value="low">🟢 Baja</option>
            </select>
          </div>

          <div>
            <label
              class="text-sm font-bold text-slate-600 block mb-3 uppercase tracking-wide"
              >Asignado a</label
            >
            <select
              v-model="ticket.assignee"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:border-[#50bdeb] transition-colors"
            >
              <option>👤 Juan Pérez</option>
              <option>👤 María García</option>
              <option>👤 Carlos López</option>
              <option>👤 Ana Martínez</option>
            </select>
          </div>

          <div>
            <label
              class="text-sm font-bold text-slate-600 block mb-3 uppercase tracking-wide"
              >Sprint</label
            >
            <select
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-semibold focus:outline-none focus:border-[#50bdeb] transition-colors"
            >
              <option>🏃 Sprint 12</option>
              <option>🏃 Sprint 13</option>
              <option>🏃 Sprint 14</option>
            </select>
          </div>

          <div>
            <label
              class="text-sm font-bold text-slate-600 block mb-3 uppercase tracking-wide"
              >Etiquetas</label
            >
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in ticket.tags"
                :key="tag"
                class="px-3 py-1.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-full text-sm font-semibold shadow-sm"
              >
                {{ tag }}
              </span>
              <button
                class="px-3 py-1.5 border-2 border-dashed border-slate-300 text-slate-600 rounded-full text-sm font-semibold hover:border-[#50bdeb] hover:text-[#50bdeb] transition-colors"
              >
                + Agregar
              </button>
            </div>
          </div>

          <div class="pt-5 border-t-2">
            <div class="flex items-center justify-between mb-3">
              <span
                class="text-sm font-bold text-slate-600 uppercase tracking-wide"
                >Tiempo Rastreado</span
              >
              <span class="text-sm text-[#021C7D] font-bold"
                >{{ ticket.timeTracked }}h / {{ ticket.timeEstimated }}h</span
              >
            </div>
            <div class="w-full bg-slate-200 rounded-full h-3">
              <div
                class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] h-3 rounded-full transition-all shadow-sm"
                :style="{
                  width: `${
                    (ticket.timeTracked / ticket.timeEstimated) * 100
                  }%`,
                }"
              />
            </div>
            <p class="text-xs text-slate-500 mt-2 font-medium">
              {{
                Math.round((ticket.timeTracked / ticket.timeEstimated) * 100)
              }}% completado
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  FileText,
  ArrowLeft,
  AlertCircle,
  Link,
  Clock,
  Upload,
} from "lucide-vue-next";

const activeTab = ref("details");
const newComment = ref("");

const tabs = [
  { id: "details", label: "Detalles" },
  { id: "comments", label: "Comentarios" },
  { id: "activity", label: "Actividad" },
  { id: "attachments", label: "Adjuntos" },
];

const ticket = reactive({
  id: "PROJ-101",
  title: "Error en el login al iniciar sesión con Google",
  description:
    'Los usuarios están reportando que no pueden iniciar sesión usando Google OAuth. El botón de "Iniciar sesión con Google" no responde y aparece un error en la consola del navegador.',
  status: "in-progress",
  priority: "high",
  assignee: "Juan Pérez",
  tags: ["backend", "auth", "bug"],
  timeTracked: 12,
  timeEstimated: 20,
});

const comments = [
  {
    id: 1,
    author: "María García",
    text: "He estado revisando el código y parece que el problema está en la configuración de las credenciales de OAuth.",
    timestamp: "Hace 2 horas",
  },
  {
    id: 2,
    author: "Carlos López",
    text: "Adjunto capturas de pantalla del error que aparece en la consola.",
    timestamp: "Hace 4 horas",
  },
];

const activities = [
  {
    id: 1,
    user: "Juan Pérez",
    action: 'cambió el estado de "Por Hacer" a "En Progreso"',
    timestamp: "Hace 1 hora",
  },
  {
    id: 2,
    user: "María García",
    action: "agregó un comentario",
    timestamp: "Hace 2 horas",
  },
  {
    id: 3,
    user: "Carlos López",
    action: "subió 2 archivos adjuntos",
    timestamp: "Hace 4 horas",
  },
];

const goBack = () => {
  console.log("Volver atrás");
};
</script>
