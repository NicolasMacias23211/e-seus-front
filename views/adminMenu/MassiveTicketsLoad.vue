<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
      >
        <Upload class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-[#021C7D]">
          Carga Masiva de Tickets
        </h1>
        <p class="text-xs text-slate-500">
          Importa múltiples tickets desde un archivo
        </p>
      </div>
    </div>

    <div
      class="bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6"
    >
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="fileInputRef?.click()"
        :class="[
          'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-[#50bdeb] bg-blue-50'
            : 'border-slate-300 hover:border-[#50bdeb] hover:bg-slate-50',
        ]"
      >
        <input
          ref="fileInputRef"
          type="file"
          accept=".xlsx,.xls,.csv"
          class="hidden"
          @change="handleFileSelect"
        />

        <div class="flex flex-col items-center gap-4">
          <div
            :class="[
              'w-16 h-16 rounded-full flex items-center justify-center transition-colors',
              isDragging ? 'bg-[#50bdeb]' : 'bg-gradient-to-br from-blue-50 to-blue-100',
            ]"
          >
            <CloudUpload
              :class="[
                'w-8 h-8 transition-colors',
                isDragging ? 'text-white' : 'text-[#021C7D]',
              ]"
            />
          </div>

          <div v-if="!selectedFile">
            <p class="text-lg font-semibold text-slate-700">
              Arrastra y suelta tu archivo aquí
            </p>
            <p class="text-sm text-slate-500 mt-1">
              o haz clic para seleccionarlo desde tu equipo
            </p>
            <p class="text-xs text-slate-400 mt-3">
              Formatos soportados: .xlsx, .xls, .csv
            </p>
          </div>

          <div v-else class="flex items-center gap-3">
            <div
              class="p-2 rounded-lg bg-gradient-to-br from-green-50 to-green-100"
            >
              <FileSpreadsheet class="w-6 h-6 text-green-600" />
            </div>
            <div class="text-left">
              <p class="text-sm font-semibold text-slate-700">
                {{ selectedFile.name }}
              </p>
              <p class="text-xs text-slate-500">
                {{ formatFileSize(selectedFile.size) }}
              </p>
            </div>
            <button
              @click.stop="clearFile"
              class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Quitar archivo"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          :disabled="!selectedFile"
          class="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload class="w-5 h-5" />
          Cargar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CloudUpload, FileSpreadsheet, Upload, X } from "lucide-vue-next";

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isDragging = ref(false);

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    selectedFile.value = file;
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    selectedFile.value = file;
  }
};

const clearFile = () => {
  selectedFile.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
</script>
