<template>
  <footer
    class="relative bg-gradient-to-br from-[#001950] to-[#021C7D] border-t-4 border-[#50bdeb] shadow-[0_-4px_20px_rgba(0,25,80,0.3)] py-6 px-4 overflow-hidden"
  >
    <div
      class="absolute inset-0 opacity-5 pointer-events-none"
      style="
        background-image: linear-gradient(
            rgba(0, 200, 255, 0.5) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(0, 200, 255, 0.5) 1px, transparent 1px);
        background-size: 30px 30px;
      "
    ></div>
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent rounded-full"
    ></div>
    <div class="relative z-10 container mx-auto">
      <div class="text-center">
        <p
          class="text-slate-200 text-sm font-medium tracking-wide transition-all hover:text-[#50bdeb]"
        >
          Copyright © Emtelco S.A.S {{ currentYear }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>
