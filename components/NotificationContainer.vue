<template>
  <Teleport to="body">
    <div
      id="notification-container"
      class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none"
    >
      <TransitionGroup name="notification">
        <NotificationToast
          v-for="notification in notifications"
          :key="notification.id"
          :type="notification.type"
          :title="notification.title"
          :message="notification.message"
          :duration="notification.duration"
          @close="removeNotification(notification.id)"
          class="pointer-events-auto"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NotificationToast from "./NotificationToast.vue";

export interface Notification {
  id: number;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
}

const notifications = ref<Notification[]>([]);

const addNotification = (notification: Omit<Notification, "id">) => {
  const id = Date.now();
  notifications.value.push({
    id,
    ...notification,
    duration: notification.duration || 5000,
  });
};

const removeNotification = (id: number) => {
  const index = notifications.value.findIndex((n) => n.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
};

defineExpose({
  addNotification,
  removeNotification,
});
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.4s ease;
}
</style>
