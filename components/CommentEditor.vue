<template>
  <div>
    <label
      v-if="label"
      class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
    >
      <svg
        class="w-5 h-5 text-[#021C7D]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      {{ label }}
    </label>
    <div class="w-full border border-slate-300 rounded-lg bg-white shadow-sm">
      <div
        class="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50 rounded-t-lg"
      >
        <div class="flex flex-wrap items-center gap-1">
          <div class="flex items-center gap-1 pe-2 border-r border-slate-300">
            <button
              type="button"
              @click="formatText('bold')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              :class="{ 'bg-slate-200 text-[#021C7D]': isActive('bold') }"
              title="Negrita (Ctrl+B)"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="formatText('italic')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              :class="{ 'bg-slate-200 text-[#021C7D]': isActive('italic') }"
              title="Cursiva (Ctrl+I)"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 4h4m-4 16h4m-1-16l-2 16"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="formatText('underline')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Subrayado"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 19h14M7 5v6a5 5 0 0010 0V5"
                />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-1 pe-2 border-r border-slate-300">
            <button
              type="button"
              @click="formatText('ul')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Lista con viñetas"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="formatText('ol')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Lista numerada"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-1 pe-2 border-r border-slate-300">
            <button
              type="button"
              @click="formatText('code')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Código en línea"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="formatText('codeblock')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Bloque de código"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              type="button"
              @click="formatText('link')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Insertar enlace"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-1">
            <button
              type="button"
              @click="formatText('quote')"
              class="p-2 text-slate-600 rounded hover:text-[#021C7D] hover:bg-slate-200 transition-colors"
              title="Cita"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="button"
          @click="showPreview = !showPreview"
          class="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
          :class="
            showPreview
              ? 'bg-[#021C7D] text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-300'
          "
        >
          {{ showPreview ? "Editor" : "Vista Previa" }}
        </button>
      </div>

      <div class="px-4 py-3 bg-white rounded-b-lg">
        <div
          v-if="!showPreview"
          ref="editorRef"
          contenteditable="true"
          @input="handleInput"
          @keydown="handleKeydown"
          @paste="handlePaste"
          :class="editorClasses"
          class="block w-full min-h-[150px] text-sm text-slate-800 focus:outline-none focus:ring-0 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400"
          :data-placeholder="placeholder"
        ></div>
        <div
          v-else
          v-html="renderedHtml"
          class="prose prose-sm max-w-none min-h-[150px] text-slate-800"
        ></div>
      </div>
    </div>
    <p v-if="helperText" class="mt-2 text-xs text-slate-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  editorClasses?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "Escribe tu comentario aquí...",
  helperText: "Usa la barra de herramientas para dar formato al texto.",
  editorClasses: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editorRef = ref<HTMLDivElement | null>(null);
const showPreview = ref(false);

// Sincronizar contenido del editor con el modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorRef.value && editorRef.value.innerHTML !== newValue) {
      editorRef.value.innerHTML = newValue;
    }
  }
);

onMounted(() => {
  if (editorRef.value && props.modelValue) {
    editorRef.value.innerHTML = props.modelValue;
  }
});

const handleInput = () => {
  if (editorRef.value) {
    emit("update:modelValue", editorRef.value.innerHTML);
  }
};

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const text = event.clipboardData?.getData("text/plain") || "";
  document.execCommand("insertText", false, text);
};

const handleKeydown = (event: KeyboardEvent) => {
  // Atajos de teclado
  if (event.ctrlKey || event.metaKey) {
    switch (event.key.toLowerCase()) {
      case "b":
        event.preventDefault();
        formatText("bold");
        break;
      case "i":
        event.preventDefault();
        formatText("italic");
        break;
      case "u":
        event.preventDefault();
        formatText("underline");
        break;
    }
  }
};

const formatText = (command: string) => {
  if (!editorRef.value) return;

  editorRef.value.focus();

  switch (command) {
    case "bold":
      document.execCommand("bold");
      break;
    case "italic":
      document.execCommand("italic");
      break;
    case "underline":
      document.execCommand("underline");
      break;
    case "ul":
      document.execCommand("insertUnorderedList");
      break;
    case "ol":
      document.execCommand("insertOrderedList");
      break;
    case "code":
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const code = document.createElement("code");
        code.style.backgroundColor = "#f1f5f9";
        code.style.padding = "2px 6px";
        code.style.borderRadius = "4px";
        code.style.fontFamily = "monospace";
        code.style.fontSize = "0.9em";
        try {
          range.surroundContents(code);
        } catch {
          code.appendChild(range.extractContents());
          range.insertNode(code);
        }
      }
      break;
    case "codeblock":
      const pre = document.createElement("pre");
      pre.style.backgroundColor = "#1e293b";
      pre.style.color = "#4ade80";
      pre.style.padding = "12px";
      pre.style.borderRadius = "6px";
      pre.style.fontFamily = "monospace";
      pre.style.fontSize = "0.875em";
      pre.style.marginTop = "8px";
      pre.style.marginBottom = "8px";
      pre.textContent = "// Tu código aquí";
      document.execCommand("insertHTML", false, pre.outerHTML);
      break;
    case "link":
      const url = prompt("Ingresa la URL:");
      if (url) {
        document.execCommand("createLink", false, url);
      }
      break;
    case "quote":
      const blockquote = document.createElement("blockquote");
      blockquote.style.borderLeft = "4px solid #50bdeb";
      blockquote.style.paddingLeft = "16px";
      blockquote.style.marginLeft = "0";
      blockquote.style.fontStyle = "italic";
      blockquote.style.color = "#64748b";
      blockquote.textContent = "Cita o texto importante";
      document.execCommand("insertHTML", false, blockquote.outerHTML);
      break;
  }

  handleInput();
};

const isActive = (command: string): boolean => {
  try {
    switch (command) {
      case "bold":
        return document.queryCommandState("bold");
      case "italic":
        return document.queryCommandState("italic");
      case "underline":
        return document.queryCommandState("underline");
      default:
        return false;
    }
  } catch {
    return false;
  }
};

const renderedHtml = computed(() => {
  return props.modelValue || '<p class="text-slate-400">Sin contenido</p>';
});
</script>

<style scoped>
/* Estilos para el editor contenteditable */
[contenteditable="true"] {
  outline: none;
}

[contenteditable="true"]:focus {
  outline: none;
}

/* Estilos para elementos dentro del editor */
:deep(b),
:deep(strong) {
  font-weight: 700;
}

:deep(i),
:deep(em) {
  font-style: italic;
}

:deep(u) {
  text-decoration: underline;
}

:deep(ul) {
  list-style-type: disc;
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(ol) {
  list-style-type: decimal;
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(li) {
  margin-bottom: 4px;
}

:deep(code) {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
}

:deep(pre) {
  background-color: #1e293b;
  color: #4ade80;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.875em;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
}

:deep(blockquote) {
  border-left: 4px solid #50bdeb;
  padding-left: 16px;
  margin-left: 0;
  font-style: italic;
  color: #64748b;
  margin-top: 8px;
  margin-bottom: 8px;
}

:deep(a) {
  color: #021c7d;
  text-decoration: underline;
}

:deep(a:hover) {
  color: #50bdeb;
}

/* Estilos para la vista previa (prose) */
.prose {
  color: #1e293b;
}

.prose :deep(p) {
  margin-bottom: 8px;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin-top: 8px;
  margin-bottom: 8px;
}

.prose :deep(li) {
  margin-bottom: 4px;
}
</style>
