<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Reportes de Personal</h1>
      <div class="relative mb-8">
        <label for="name-input" class="block text-lg font-medium text-gray-700 mb-2">Buscar por nombre:</label>
        <input id="name-input" type="text" v-model="searchQuery" @focus="showSuggestions = true" @blur="handleBlur"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          placeholder="Escribe un nombre..." />
        <ul v-if="showSuggestions && filteredNames.length"
          class="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
          <li v-for="name in filteredNames" :key="name" @click="selectName(name)"
            class="px-4 py-3 cursor-pointer hover:bg-blue-100 transition duration-150">
            {{ name }}
          </li>
        </ul>
      </div>
      <div v-if="selectedName && occupationData && complianceData" class="mt-12 animate-fade-in">
        <h2 class="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Métricas de <span class="text-blue-600">{{ selectedName }}</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-medium text-gray-700 mb-4 text-center">Ocupación</h3>
            <PieChart :chart-data="occupationData" />
            <p class="text-center text-3xl font-bold text-blue-600 mt-4">{{ occupationData.datasets[0].data[0] }}%</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 class="text-xl font-medium text-gray-700 mb-4 text-center">Cumplimiento</h3>
            <PieChart :chart-data="complianceData" />
            <p class="text-center text-3xl font-bold text-blue-600 mt-4">{{ complianceData.datasets[0].data[0] }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { ChartData } from 'chart.js';
import PieChart from '../components/PieChart.vue';

type PieChartData = ChartData<'pie', number[], string>;

const searchQuery: Ref<string> = ref('');
const selectedName: Ref<string | null> = ref(null);
const showSuggestions: Ref<boolean> = ref(false);
const occupationData: Ref<PieChartData | null> = ref(null);
const complianceData: Ref<PieChartData | null> = ref(null);

const names: string[] = [
  'Juan Pérez',
  'Ana García',
  'Luis Rodríguez',
  'María Fernández',
  'Carlos López'
];

const filteredNames: ComputedRef<string[]> = computed(() => {
  if (!searchQuery.value) {
    return names;
  }
  return names.filter(name =>
    name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectName = (name: string): void => {
  selectedName.value = name;
  searchQuery.value = name;
  showSuggestions.value = false;

  const randomOccupation = Math.floor(Math.random() * 101);
  const randomCompliance = Math.floor(Math.random() * 101);

  occupationData.value = {
    datasets: [{
      data: [randomOccupation, 100 - randomOccupation],
      backgroundColor: ['#3B82F6', '#E5E7EB'],
    }],
  };

  complianceData.value = {
    datasets: [{
      data: [randomCompliance, 100 - randomCompliance],
      backgroundColor: ['#3B82F6', '#E5E7EB'],
    }],
  };
};

const handleBlur = (): void => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 150);
};
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>