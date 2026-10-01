import { ref } from "vue";
import type { DriverReportFlat } from "../models/DriverReport";

const isGenerating = ref(false);
const isReady = ref(false);
const exportData = ref<DriverReportFlat[]>([]);
const readyAt = ref<Date | null>(null);

export function useDriverExportStore() {
  function setGenerating() {
    isGenerating.value = true;
    isReady.value = false;
    exportData.value = [];
  }

  function setReady(data: DriverReportFlat[]) {
    isGenerating.value = false;
    exportData.value = data;
    isReady.value = data.length > 0;
    readyAt.value = data.length > 0 ? new Date() : null;
  }

  function setError() {
    isGenerating.value = false;
    isReady.value = false;
    exportData.value = [];
    readyAt.value = null;
  }

  function clear() {
    isGenerating.value = false;
    isReady.value = false;
    exportData.value = [];
    readyAt.value = null;
  }

  return { isGenerating, isReady, exportData, readyAt, setGenerating, setReady, setError, clear };
}
