<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

interface Props {
  createdData: number[];
  closedData: number[];
  categories: string[];
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "350px",
});

const chartRef = ref<HTMLElement>();
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      textStyle: {
        color: "#334155",
      },
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6b7280",
        },
      },
    },
    legend: {
      data: ["Tickets Creados", "Tickets Cerrados"],
      top: 10,
      textStyle: {
        fontSize: 13,
        fontWeight: 500,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "60px",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.categories,
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "#f1f5f9",
        },
      },
    },
    series: [
      {
        name: "Tickets Creados",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#50bdeb",
          width: 3,
        },
        itemStyle: {
          color: "#50bdeb",
          borderWidth: 2,
          borderColor: "#fff",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(80, 189, 235, 0.3)",
            },
            {
              offset: 1,
              color: "rgba(80, 189, 235, 0.05)",
            },
          ]),
        },
        data: props.createdData,
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: "rgba(80, 189, 235, 0.5)",
          },
        },
      },
      {
        name: "Tickets Cerrados",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#10b981",
          width: 3,
        },
        itemStyle: {
          color: "#10b981",
          borderWidth: 2,
          borderColor: "#fff",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(16, 185, 129, 0.3)",
            },
            {
              offset: 1,
              color: "rgba(16, 185, 129, 0.05)",
            },
          ]),
        },
        data: props.closedData,
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: "rgba(16, 185, 129, 0.5)",
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);
};

const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption({
      xAxis: {
        data: props.categories,
      },
      series: [
        {
          data: props.createdData,
        },
        {
          data: props.closedData,
        },
      ],
    });
  }
};

watch(
  () => [props.createdData, props.closedData, props.categories],
  () => {
    updateChart();
  },
  { deep: true },
);

onMounted(() => {
  initChart();
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
