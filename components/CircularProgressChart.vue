<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

interface Props {
  title: string;
  value: number;
  width?: string;
  height?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "240px",
  color: "#50bdeb",
});

const chartRef = ref<HTMLElement>();
let chartInstance: echarts.ECharts | null = null;
const animatedValue = ref(0);

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const remaining = 100 - animatedValue.value;

  const option = {
    title: {
      text: `${animatedValue.value.toFixed(0)}%`,
      left: "center",
      top: "center",
      textStyle: {
        fontSize: 48,
        fontWeight: "bold",
        color: props.color,
      },
      subtext: props.title,
      subtextStyle: {
        fontSize: 16,
        color: "#64748b",
        fontWeight: "500",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}%",
    },
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 4,
        },
        label: {
          show: false,
        },
        emphasis: {
          scale: true,
          scaleSize: 5,
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: animatedValue.value,
            name: "Completado",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: props.color },
                { offset: 1, color: adjustBrightness(props.color, 0.7) },
              ]),
              shadowBlur: 20,
              shadowColor: props.color + "40",
            },
          },
          {
            value: remaining,
            name: "Restante",
            itemStyle: {
              color: "#e2e8f0",
              shadowBlur: 0,
            },
            emphasis: {
              disabled: true,
            },
          },
        ],
        animation: false, // Desactivar animación automática
      },
    ],
  };

  chartInstance.setOption(option);
};

const adjustBrightness = (color: string, factor: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.floor(r * factor));
  const newG = Math.min(255, Math.floor(g * factor));
  const newB = Math.min(255, Math.floor(b * factor));

  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

const updateChart = () => {
  if (chartInstance) {
    const remaining = 100 - animatedValue.value;

    chartInstance.setOption({
      title: {
        text: `${animatedValue.value.toFixed(0)}%`,
        subtext: props.title,
        textStyle: {
          color: props.color,
        },
      },
      series: [
        {
          data: [
            {
              animation: false, // Sin animación para actualizaciones suaves
              value: animatedValue.value,
              name: "Completado",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: props.color },
                  { offset: 1, color: adjustBrightness(props.color, 0.7) },
                ]),
                shadowBlur: 20,
                shadowColor: props.color + "40",
              },
            },
            {
              value: remaining,
              name: "Restante",
              itemStyle: {
                color: "#e2e8f0",
              },
            },
          ],
        },
      ],
    });
  }
};

// Animación del contador de 0 a valor final
const animateValue = (targetValue: number) => {
  const duration = 1500; // 1.5 segundos
  const steps = 60;
  const increment = targetValue / steps;
  const stepDuration = duration / steps;
  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    if (currentStep >= steps) {
      animatedValue.value = targetValue;
      updateChart();
      clearInterval(timer);
    } else {
      animatedValue.value = Math.min(increment * currentStep, targetValue);
      updateChart();
    }
  }, stepDuration);
};

watch(
  () => props.value,
  (newValue) => {
    animateValue(newValue);
  },
);

watch(
  () => props.title,
  () => {
    updateChart();
  },
);

watch(
  () => props.color,
  () => {
    updateChart();
  },
);

onMounted(() => {
  initChart();
  // Iniciar la animación después de un pequeño delay
  setTimeout(() => {
    animateValue(props.value);
  }, 100);

  window.addEventListener("resize", () => {
    chartInstance?.resize();
  });
});
</script>

<style scoped>
div {
  margin: 0 auto;
}
</style>
