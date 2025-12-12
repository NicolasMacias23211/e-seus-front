<template>
  <div v-if="isStandaloneRoute" class="h-screen bg-slate-100">
    <router-view />
  </div>

  <div v-else class="flex h-screen bg-slate-100 overflow-hidden">
    <AppSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-6 bg-slate-200">
        <router-view />
      </main>
    </div>
  </div>
  <NotificationContainer ref="notificationContainerRef" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "../components/AppSidebar.vue";
import AppHeader from "../components/AppHeader.vue";
import NotificationContainer from "../components/NotificationContainer.vue";
import { setNotificationContainer } from "../utils/useNotification";

const route = useRoute();
const notificationContainerRef = ref();

const isStandaloneRoute = computed(() => {
  return route.meta.layout === "standalone";
});

onMounted(() => {
  if (notificationContainerRef.value) {
    setNotificationContainer(notificationContainerRef.value);
  }
});
</script>

<style>
:root {
  --color-primary: #021c7d;
  --color-primary-light: #50bdeb;
  --color-background: #0f172a;
  --color-surface: #1e293b;
}
</style>
