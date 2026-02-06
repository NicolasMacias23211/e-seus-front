<template>
  <div class="px-6 py-4 border-t border-slate-200 bg-slate-50">
    <div class="flex items-center justify-between">
      <!-- Información de registros -->
      <div class="text-sm text-slate-600">
        Mostrando {{ (currentPage - 1) * pageSize + 1 }} a 
        {{ Math.min(currentPage * pageSize, totalItems) }} de {{ totalItems }} registros
      </div>

      <!-- Controles de paginación -->
      <div class="flex items-center gap-3">
        <!-- Selector de items por página -->
        <select
          :value="pageSize"
          @change="(e) => $emit('page-size-change', Number((e.target as HTMLSelectElement).value))"
          class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option :value="10">10 por página</option>
          <option :value="25">25 por página</option>
          <option :value="50">50 por página</option>
          <option :value="100">100 por página</option>
        </select>

        <!-- Botones de navegación -->
        <div class="flex items-center gap-1">
          <!-- Botón anterior -->
          <button
            @click="$emit('prev-page')"
            :disabled="currentPage === 1"
            class="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Página anterior"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>

          <!-- Números de página -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="typeof page === 'number'"
              @click="$emit('go-to-page', page)"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                page === currentPage
                  ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white shadow-md'
                  : 'border border-slate-300 hover:bg-slate-100'
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-2 text-slate-400">...</span>
          </template>

          <!-- Botón siguiente -->
          <button
            @click="$emit('next-page')"
            :disabled="currentPage === totalPages"
            class="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Página siguiente"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface Props {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
});

defineEmits<{
  'page-size-change': [size: number];
  'prev-page': [];
  'next-page': [];
  'go-to-page': [page: number];
}>();

const totalPages = computed(() => 
  Math.ceil(props.totalItems / props.pageSize) || 1
);

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = props.currentPage;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);
  }

  return pages;
});
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
