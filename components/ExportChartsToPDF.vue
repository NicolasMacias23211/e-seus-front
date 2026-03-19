<template>
  <button
    v-if="compact"
    @click="exportToPDF"
    :disabled="isExporting"
    :title="isExporting ? 'Exportando...' : 'Exportar métricas a PDF'"
    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:from-[#021C7D] hover:to-[#3da8d6] text-white font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <FileText v-if="!isExporting" class="w-4 h-4" />
    <div
      v-else
      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    ></div>
    <span class="text-sm">{{
      isExporting ? "Exportando..." : "Exportar PDF"
    }}</span>
  </button>
  <button
    v-else
    @click="exportToPDF"
    :disabled="isExporting"
    class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4 transition-all duration-300 hover:border-transparent hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    ></div>
    <div class="relative flex flex-col items-center gap-3">
      <div
        class="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20"
      >
        <FileText
          v-if="!isExporting"
          class="w-7 h-7 text-red-600 transition-colors duration-300 group-hover:text-white"
        />
        <div
          v-else
          class="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
      <div class="text-center">
        <div
          class="font-bold text-slate-800 group-hover:text-white transition-colors duration-300"
        >
          {{ isExporting ? "Exportando..." : "PDF Métricas" }}
        </div>
        <div
          class="text-xs text-slate-500 group-hover:text-white/90 transition-colors duration-300 mt-1"
        >
          Exportar gráficas a PDF
        </div>
      </div>
      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FileDown class="w-4 h-4 text-white" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FileText, FileDown } from "lucide-vue-next";
import jsPDF from "jspdf";
import * as echarts from "echarts";

interface Props {
  userName: string;
  userRole: string;
  cumplimientoValue: number;
  ocupacionValue: number;
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
});

const isExporting = ref(false);

const createChartImage = async (
  value: number,
  title: string,
  color: string,
): Promise<string> => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.width = "400px";
    container.style.height = "300px";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);
    const chart = echarts.init(container);

    const remaining = 100 - value;

    const option = {
      title: {
        text: `${value.toFixed(0)}%`,
        left: "center",
        top: "center",
        textStyle: {
          fontSize: 48,
          fontWeight: "bold",
          color: color,
        },
        subtext: title,
        subtextStyle: {
          fontSize: 16,
          color: "#64748b",
          fontWeight: "500",
        },
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
            label: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: value,
              name: "Completado",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: color },
                  {
                    offset: 1,
                    color: adjustBrightness(color, 0.7),
                  },
                ]),
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
          animation: false,
        },
      ],
    };

    chart.setOption(option);

    setTimeout(() => {
      const imageUrl = chart.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: "#fff",
      });

      chart.dispose();
      document.body.removeChild(container);

      resolve(imageUrl);
    }, 500);
  });
};

const adjustBrightness = (color: string, factor: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.floor(r * factor));
  const newG = Math.min(255, Math.floor(g * factor));
  const newB = Math.min(255, Math.floor(b * factor));

  return `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

const exportToPDF = async () => {
  try {
    isExporting.value = true;

    const cumplimientoImage = await createChartImage(
      props.cumplimientoValue,
      "Cumplimiento",
      "#021c7d",
    );

    const ocupacionImage = await createChartImage(
      props.ocupacionValue,
      "Ocupación",
      "#50bdeb",
    );

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(2, 28, 125); // #021C7D
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Métricas", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Análisis de Rendimiento", pageWidth / 2, 30, { align: "center" });

    doc.setFillColor(240, 242, 245);
    doc.roundedRect(15, 50, pageWidth - 30, 30, 3, 3, "F");

    doc.setTextColor(2, 28, 125);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Información del Usuario", 20, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`Nombre: ${props.userName}`, 20, 68);
    doc.text(`Rol: ${props.userRole}`, 20, 75);

    const currentDate = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generado el: ${currentDate}`, pageWidth - 20, 75, {
      align: "right",
    });

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 28, 125);
    doc.text("Métricas de Rendimiento", 20, 95);

    const chartWidth = 80;
    const chartHeight = 60;
    const chart1X = pageWidth / 4 - chartWidth / 2;
    const chartY = 105;

    doc.addImage(
      cumplimientoImage,
      "PNG",
      chart1X,
      chartY,
      chartWidth,
      chartHeight,
    );

    doc.setDrawColor(2, 28, 125);
    doc.setLineWidth(0.5);
    doc.roundedRect(
      chart1X - 5,
      chartY - 5,
      chartWidth + 10,
      chartHeight + 10,
      3,
      3,
    );

    const chart2X = (3 * pageWidth) / 4 - chartWidth / 2;

    doc.addImage(
      ocupacionImage,
      "PNG",
      chart2X,
      chartY,
      chartWidth,
      chartHeight,
    );

    doc.setDrawColor(80, 189, 235);
    doc.roundedRect(
      chart2X - 5,
      chartY - 5,
      chartWidth + 10,
      chartHeight + 10,
      3,
      3,
    );

    doc.setFillColor(240, 242, 245);
    doc.roundedRect(15, 180, pageWidth - 30, 60, 3, 3, "F");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 28, 125);
    doc.text("Resumen Estadístico", 20, 190);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);

    doc.text("• Cumplimiento:", 25, 200);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 28, 125);
    doc.text(`${props.cumplimientoValue}%`, 65, 200);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("• Ocupación:", 25, 210);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 189, 235);
    doc.text(`${props.ocupacionValue}%`, 65, 210);

    // Footer
    doc.setFillColor(241, 245, 249);
    doc.rect(0, pageHeight - 20, pageWidth, 20, "F");

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Sistema de Gestión de Tickets - Reporte generado automáticamente - Copyright © Emtelco S.A.S ${new Date().getFullYear()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );

    doc.setDrawColor(80, 189, 235);
    doc.setLineWidth(1);
    doc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);

    const fileName = `Metricas_${props.userName.replace(/\s+/g, "_")}_${
      new Date().toISOString().split("T")[0]
    }.pdf`;

    doc.save(fileName);
  } catch (error) {
    console.error("Error al exportar a PDF:", error);
    alert("Error al generar el PDF. Por favor, intente nuevamente.");
  } finally {
    isExporting.value = false;
  }
};
</script>
