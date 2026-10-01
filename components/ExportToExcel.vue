<template>
  <button
    @click="exportToExcel"
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
        isExporting ? "Exportando..." : "Exportar a Excel"
      }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ExcelJS from "exceljs";

interface Props {
  data: any[];
  fileName?: string;
  sheetName?: string;
  buttonClass?: string;
  excludeFields?: string[];
  customHeaders?: Record<string, string>;
  dateFields?: string[];
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fileName: "reporte",
  sheetName: "Hoja1",
  buttonClass:
    "inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  excludeFields: () => [],
  customHeaders: () => ({}),
  dateFields: () => [],
  title: "",
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
      return value;
    }
    if (typeof value === "string" || typeof value === "number") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
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

const exportToExcel = async () => {
  try {
    isExporting.value = true;
    emit("beforeExport");

    if (!props.data || props.data.length === 0) {
      console.warn("No hay datos para exportar");
      emit("afterExport", false);
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(props.sheetName);

    const keys = getAllKeys(props.data);
    const headers = keys.map((key) => formatFieldName(key));

    worksheet.columns = keys.map((key, index) => ({
      key,
      width: Math.max((headers[index]?.length ?? 10) + 5, 15),
    }));

    if (props.title) {
      const titleRow = worksheet.addRow([props.title]);
      if (headers.length > 0) {
        worksheet.mergeCells(titleRow.number, 1, titleRow.number, headers.length);
      }
      titleRow.font = { bold: true, size: 16 };
      titleRow.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      titleRow.height = 30;
      titleRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9E1F2" },
      };
    }

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4472C4" },
    };
    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    headerRow.height = 25;

    props.data.forEach((item) => {
      const rowData: any = {};
      keys.forEach((key) => {
        const value = formatValue(item[key], key);
        rowData[key] = value;
      });
      worksheet.addRow(rowData);
    });

    const dataStartRow = headerRow.number + 1;
    const totalRows = worksheet.rowCount;
    const totalCols = headers.length;

    for (let row = headerRow.number; row <= totalRows; row++) {
      for (let col = 1; col <= totalCols; col++) {
        const cell = worksheet.getRow(row).getCell(col);
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        if (row >= dataStartRow && typeof cell.value === "number") {
          cell.alignment = { vertical: "middle", horizontal: "right" };
        } else if (row >= dataStartRow) {
          cell.alignment = { vertical: "middle", horizontal: "left" };
        }

        if (cell.value instanceof Date) {
          cell.numFmt = "dd/mm/yyyy";
        }
      }
    }

    worksheet.columns.forEach((column, index) => {
      let maxLength = headers[index]?.length || 10;

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= dataStartRow) {
          const cell = row.getCell(index + 1);
          const cellValue = cell.value?.toString() || "";
          maxLength = Math.max(maxLength, cellValue.length);
        }
      });

      column.width = Math.min(maxLength + 3, 50);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const timestamp = new Date().toISOString().slice(0, 10);
    const finalFileName = `${props.fileName}_${timestamp}.xlsx`;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = finalFileName;
    link.click();

    window.URL.revokeObjectURL(url);

    emit("afterExport", true);
  } catch (error) {
    console.error("Error al exportar a Excel:", error);
    emit("error", error as Error);
    emit("afterExport", false);
  } finally {
    isExporting.value = false;
  }
};

defineExpose({
  exportToExcel,
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
