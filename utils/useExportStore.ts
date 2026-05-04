import { ref } from "vue";
import type { GeneralExportFlat } from "../models/GeneralExport";

const isGenerating = ref(false);
const isReady = ref(false);
const exportData = ref<GeneralExportFlat[]>([]);
const readyAt = ref<Date | null>(null);

export function useExportStore() {
  function setGenerating() {
    isGenerating.value = true;
    isReady.value = false;
    exportData.value = [];
  }

  function setReady(data: GeneralExportFlat[]) {
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
