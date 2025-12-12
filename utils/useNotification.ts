// # Ejemplo de uso de las notificaciones
// import { useNotification } from "../utils/useNotification";

// const notification = useNotification();

// // Notificación de éxito
// function handleSuccess() {
//   notification.success(
//     "¡Operación exitosa!",
//     "El ticket ha sido creado correctamente"
//   );
// }

// // Notificación de error
// function handleError() {
//   notification.error(
//     "Error en la operación",
//     "No se pudo crear el ticket. Intente nuevamente."
//   );
// }

// // Notificación de advertencia
// function handleWarning() {
//   notification.warning("Atención", "Algunos campos están vacíos");
// }

// // Notificación de información
// function handleInfo() {
//   notification.info("Información", "Los cambios se guardarán automáticamente");
// }

// // Con duración personalizada (en milisegundos)
// function handleCustomDuration() {
//   notification.success(
//     "Mensaje rápido",
//     "Este mensaje desaparecerá en 2 segundos",
//     2000
//   );
// }
// </script>
export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationOptions {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

let notificationContainer: any = null;

export function setNotificationContainer(container: any) {
  notificationContainer = container;
}

export function useNotification() {
  const showNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration: number = 5000
  ) => {
    if (notificationContainer) {
      notificationContainer.addNotification({
        type,
        title,
        message,
        duration,
      });
    } else {
      console.warn("NotificationContainer not initialized");
    }
  };

  const success = (title: string, message: string, duration?: number) => {
    showNotification("success", title, message, duration);
  };

  const error = (title: string, message: string, duration?: number) => {
    showNotification("error", title, message, duration);
  };

  const warning = (title: string, message: string, duration?: number) => {
    showNotification("warning", title, message, duration);
  };

  const info = (title: string, message: string, duration?: number) => {
    showNotification("info", title, message, duration);
  };

  return {
    showNotification,
    success,
    error,
    warning,
    info,
  };
}
