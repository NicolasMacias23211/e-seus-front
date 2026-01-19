<template>
  <button
    @click="exportToPDF"
    :disabled="!data || data.length === 0 || isExporting"
    :class="buttonClass"
    type="button"
  >
    <slot>
      <svg
        v-if="!isExporting"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="m9 15 3 3 3-3" />
      </svg>
      <svg
        v-else
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span class="ml-2">{{
        isExporting ? "Exportando..." : "Exportar a PDF"
      }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  data: any[];
  fileName?: string;
  buttonClass?: string;
  excludeFields?: string[];
  customHeaders?: Record<string, string>;
  dateFields?: string[];
  title?: string;
  orientation?: "portrait" | "landscape";
}

const props = withDefaults(defineProps<Props>(), {
  fileName: "reporte",
  buttonClass:
    "inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  excludeFields: () => [],
  customHeaders: () => ({}),
  dateFields: () => [],
  title: "",
  orientation: "landscape",
});

const emit = defineEmits<{
  beforeExport: [];
  afterExport: [success: boolean];
  error: [error: Error];
}>();

const isExporting = ref(false);

const formatFieldName = (field: string): string => {
  if (props.customHeaders[field]) {
    return props.customHeaders[field];
  }

  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

const formatValue = (value: any, field: string): any => {
  if (value === null || value === undefined) {
    return "";
  }

  if (props.dateFields.includes(field)) {
    if (value instanceof Date) {
      return value.toLocaleDateString("es-ES");
    }
    if (typeof value === "string" || typeof value === "number") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("es-ES");
      }
    }
  }

  if (typeof value === "object" && value !== null) {
    if ("name" in value) return value.name;
    if ("nombre" in value) return value.nombre;
    if ("title" in value) return value.title;
    if ("titulo" in value) return value.titulo;
    return JSON.stringify(value);
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  return value;
};

const getAllKeys = (data: any[]): string[] => {
  const keysSet = new Set<string>();

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!props.excludeFields.includes(key)) {
        keysSet.add(key);
      }
    });
  });

  return Array.from(keysSet);
};

const exportToPDF = async () => {
  try {
    isExporting.value = true;
    emit("beforeExport");

    if (!props.data || props.data.length === 0) {
      console.warn("No hay datos para exportar");
      emit("afterExport", false);
      return;
    }

    const doc = new jsPDF({
      orientation: props.orientation,
      unit: "mm",
      format: "a4",
    });

    const keys = getAllKeys(props.data);
    const headers = keys.map((key) => formatFieldName(key));

    const tableData = props.data.map((item) => {
      return keys.map((key) => {
        const value = formatValue(item[key], key);
        return String(value);
      });
    });

    doc.setFont("helvetica");

    let yPosition = 20;

    if (props.title) {
      doc.setFontSize(16);
      doc.setTextColor(2, 28, 125);
      doc.text(props.title, doc.internal.pageSize.getWidth() / 2, yPosition, {
        align: "center",
      });
      yPosition += 15;
    }

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Generado: ${currentDate}`, 14, yPosition);
    yPosition += 10;

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: yPosition,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
      },
      headStyles: {
        fillColor: [68, 114, 196],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: keys.reduce((acc, key, index) => {
        const maxLength = Math.max(
          formatFieldName(key).length,
          ...props.data.map(
            (item) => String(formatValue(item[key], key)).length
          )
        );

        acc[index] = {
          cellWidth: Math.min(Math.max(maxLength * 1.5, 20), 50),
        };
        return acc;
      }, {} as any),
      margin: { top: 10, right: 14, bottom: 10, left: 14 },
      didDrawPage: (data) => {
        const pageCount = doc.getNumberOfPages();
        const pageNumber = (doc as any).internal.getCurrentPageInfo()
          .pageNumber;

        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Página ${pageNumber} de ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      },
    });

    const timestamp = new Date().toISOString().slice(0, 10);
    const finalFileName = `${props.fileName}_${timestamp}.pdf`;

    doc.save(finalFileName);

    emit("afterExport", true);
  } catch (error) {
    console.error("Error al exportar a PDF:", error);
    emit("error", error as Error);
    emit("afterExport", false);
  } finally {
    isExporting.value = false;
  }
};

defineExpose({
  exportToPDF,
});
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
