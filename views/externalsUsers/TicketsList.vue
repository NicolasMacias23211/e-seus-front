<template>
  <div
    class="min-h-screen relative overflow-hidden"
    style="background: linear-gradient(135deg, #0538d4 0%, #001e5c 100%)"
  >
    <div
      class="absolute inset-0 opacity-10 pointer-events-none"
      style="
        background-image: linear-gradient(
            rgba(80, 189, 235, 0.4) 1px,
            transparent 1px
          ),
          linear-gradient(90deg, rgba(80, 189, 235, 0.4) 1px, transparent 1px);
        background-size: 30px 30px;
      "
    ></div>

    <div
      class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent opacity-80"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent opacity-80"
    ></div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-40 h-40 bg-[#50bdeb] rounded-full opacity-20 blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-48 h-48 bg-[#50bdeb] rounded-full opacity-20 blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <div class="relative z-10 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <div
            class="inline-block p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm border border-[#50bdeb]/30 shadow-lg shadow-[#50bdeb]/20"
          >
            <List class="w-12 h-12 text-[#50bdeb]" />
          </div>
          <h1
            class="text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-wide"
          >
            Mis Tickets
          </h1>
          <p class="text-blue-100 text-lg font-medium">
            Consulta el estado y registros de tus solicitudes
          </p>
          <div
            class="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent rounded-full mx-auto"
          ></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Lista de Tickets -->
          <div
            class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,25,80,0.4)] p-6 border border-[#50bdeb]/20"
          >
            <div class="flex items-center justify-between mb-6">
              <h2
                class="text-2xl font-bold text-slate-800 flex items-center gap-2"
              >
                <FileText class="w-6 h-6 text-blue-600" />
                Lista de Tickets
              </h2>
              <span
                class="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full"
              >
                {{ tickets.length }} tickets
              </span>
            </div>

            <div v-if="tickets.length === 0" class="text-center py-12">
              <Inbox class="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p class="text-slate-500 text-lg">No hay tickets creados aún</p>
            </div>

            <div
              v-else
              class="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2"
            >
              <div
                v-for="ticket in tickets"
                :key="ticket.idTicket"
                @click="selectTicket(ticket)"
                :class="[
                  'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg',
                  selectedTicket?.idTicket === ticket.idTicket
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-300',
                ]"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-slate-800 mb-1 truncate">
                      {{ ticket.ticketTitle }}
                    </h3>
                    <div
                      class="flex items-center gap-3 text-xs text-slate-500 mb-2"
                    >
                      <span class="flex items-center gap-1">
                        <Calendar class="w-3 h-3" />
                        {{ formatDate(ticket.createAt) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <Clock class="w-3 h-3" />
                        {{ formatTime(ticket.createAt) }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span
                        :class="[
                          'px-3 py-1 text-xs font-bold rounded-full',
                          getStatusClass(ticket.statusId),
                        ]"
                      >
                        {{ getStatusName(ticket.statusId) }}
                      </span>
                      <span
                        :class="[
                          'px-3 py-1 text-xs font-bold rounded-full',
                          getPriorityClass(ticket.ticketPriority),
                        ]"
                      >
                        {{ ticket.ticketPriority }}
                      </span>
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                    >
                      <MessageSquare
                        :class="[
                          'w-5 h-5',
                          getTicketComments(ticket.idTicket).length > 0
                            ? 'text-blue-600'
                            : 'text-slate-400',
                        ]"
                      />
                    </div>
                    <span
                      v-if="getTicketComments(ticket.idTicket).length > 0"
                      class="block text-center text-xs font-bold text-blue-600 mt-1"
                    >
                      {{ getTicketComments(ticket.idTicket).length }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detalle del Ticket y Comentarios -->
          <div
            class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,25,80,0.4)] p-6 border border-[#50bdeb]/20"
          >
            <div
              v-if="!selectedTicket"
              class="flex flex-col items-center justify-center h-full py-12"
            >
              <div
                class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4"
              >
                <ArrowLeft class="w-10 h-10 text-slate-400" />
              </div>
              <p class="text-slate-500 text-lg text-center">
                Selecciona un ticket para ver sus detalles y comentarios
              </p>
            </div>

            <div v-else class="h-full flex flex-col">
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h2
                    class="text-2xl font-bold text-slate-800 flex items-center gap-2"
                  >
                    <FileText class="w-6 h-6 text-blue-600" />
                    Detalles del Ticket
                  </h2>
                  <span class="text-sm text-slate-500">
                    #{{ selectedTicket.idTicket }}
                  </span>
                </div>

                <div class="space-y-4">
                  <div>
                    <h3 class="font-bold text-lg text-slate-800 mb-2">
                      {{ selectedTicket.ticketTitle }}
                    </h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                      {{ selectedTicket.ticketDescription }}
                    </p>
                  </div>

                  <div
                    class="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200"
                  >
                    <div>
                      <span
                        class="text-xs font-semibold text-slate-500 block mb-1"
                      >
                        Estado
                      </span>
                      <span
                        :class="[
                          'px-3 py-1 text-xs font-bold rounded-full inline-block',
                          getStatusClass(selectedTicket.statusId),
                        ]"
                      >
                        {{ getStatusName(selectedTicket.statusId) }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="text-xs font-semibold text-slate-500 block mb-1"
                      >
                        Prioridad
                      </span>
                      <span
                        :class="[
                          'px-3 py-1 text-xs font-bold rounded-full inline-block',
                          getPriorityClass(selectedTicket.ticketPriority),
                        ]"
                      >
                        {{ selectedTicket.ticketPriority }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="text-xs font-semibold text-slate-500 block mb-1"
                      >
                        Fecha de Creación
                      </span>
                      <span class="text-sm text-slate-700 font-medium">
                        {{ formatDate(selectedTicket.createAt) }}
                      </span>
                    </div>
                    <div>
                      <span
                        class="text-xs font-semibold text-slate-500 block mb-1"
                      >
                        Hora
                      </span>
                      <span class="text-sm text-slate-700 font-medium">
                        {{ formatTime(selectedTicket.createAt) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-1 border-t border-slate-200 pt-6">
                <div class="flex items-center justify-between mb-4">
                  <h3
                    class="text-xl font-bold text-slate-800 flex items-center gap-2"
                  >
                    <MessageSquare class="w-5 h-5 text-blue-600" />
                    Comentarios
                  </h3>
                  <span
                    v-if="getTicketComments(selectedTicket.idTicket).length > 0"
                    class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                  >
                    {{ getTicketComments(selectedTicket.idTicket).length }}
                    comentarios
                  </span>
                </div>

                <div
                  v-if="getTicketComments(selectedTicket.idTicket).length === 0"
                  class="text-center py-8"
                >
                  <MessageSquare
                    class="w-12 h-12 mx-auto mb-3 text-slate-300"
                  />
                  <p class="text-slate-500">
                    Este ticket no tiene comentarios aún
                  </p>
                </div>

                <div
                  v-else
                  class="space-y-4 max-h-[calc(100vh-580px)] overflow-y-auto pr-2"
                >
                  <div
                    v-for="comment in getTicketComments(
                      selectedTicket.idTicket
                    )"
                    :key="comment.idComment"
                    class="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex items-start gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                      >
                        {{ getUserInitials(comment.userName) }}
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                          <span class="font-bold text-slate-800 text-sm">
                            {{ comment.userName }}
                          </span>
                          <span class="text-xs text-slate-500">
                            {{ formatDate(comment.createAt) }} -
                            {{ formatTime(comment.createAt) }}
                          </span>
                        </div>
                        <p class="text-slate-700 text-sm leading-relaxed">
                          {{ comment.comment }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  List,
  FileText,
  Calendar,
  Clock,
  MessageSquare,
  Inbox,
  ArrowLeft,
} from "lucide-vue-next";
import type { Ticket } from "../../models";

interface Comment {
  idComment: number;
  comment: string;
  createAt: Date;
  updateAt: Date | null;
  idTicket: number;
  userName: string;
}

const selectedTicket = ref<Ticket | null>(null);

// Mock data para tickets
const tickets = ref<Ticket[]>([
  {
    idTicket: 101,
    ticketTitle: "Error en el sistema de reportes",
    ticketDescription:
      "Al intentar generar el reporte mensual, el sistema muestra un error 500 y no permite descargar el archivo.",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "jperez",
    createAt: new Date("2025-12-10T09:30:00"),
    updateAt: null,
    assignedTo: "mgonzalez",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-15"),
    statusId: 2,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 102,
    ticketTitle: "Solicitud de acceso a módulo de ventas",
    ticketDescription:
      "Necesito acceso al módulo de ventas para poder consultar el historial de pedidos del cliente.",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "mlopez",
    createAt: new Date("2025-12-09T14:20:00"),
    updateAt: null,
    assignedTo: "aramirez",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-12"),
    statusId: 3,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 103,
    ticketTitle: "Actualización de información personal",
    ticketDescription:
      "Por favor actualizar mi correo electrónico y número de teléfono en el sistema.",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Baja",
    ticketClosingCode: 1,
    ticketAns: 1,
    reporterUser: "cgarcia",
    createAt: new Date("2025-12-08T11:00:00"),
    updateAt: new Date("2025-12-09T16:30:00"),
    assignedTo: "ltorres",
    closingDate: new Date("2025-12-09T16:30:00"),
    estimatedClosingDate: new Date("2025-12-11"),
    statusId: 5,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 104,
    ticketTitle: "Problema con inicio de sesión",
    ticketDescription:
      "No puedo iniciar sesión en la plataforma. Me aparece un mensaje de credenciales incorrectas aunque estoy seguro de que son correctas.",
    ticketAttachments: null,
    ticketService: 3,
    ticketPriority: "Urgente",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "dsilva",
    createAt: new Date("2025-12-11T08:15:00"),
    updateAt: null,
    assignedTo: "jmorales",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-11"),
    statusId: 1,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 105,
    ticketTitle: "Consulta sobre funcionalidad de exportación",
    ticketDescription:
      "¿Es posible exportar los datos en formato Excel? Solo veo la opción de PDF.",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Baja",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "rdiaz",
    createAt: new Date("2025-12-07T16:45:00"),
    updateAt: null,
    assignedTo: "mgonzalez",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-14"),
    statusId: 4,
    subProgramName: "Soporte Nivel 1 - A1",
  },
]);

// Mock data para comentarios
const comments = ref<Comment[]>([
  {
    idComment: 1,
    comment:
      "Hemos recibido tu reporte. Estamos investigando el problema con el servidor de reportes.",
    createAt: new Date("2025-12-10T10:15:00"),
    updateAt: null,
    idTicket: 101,
    userName: "María González",
  },
  {
    idComment: 2,
    comment:
      "El equipo técnico ya identificó la causa. Será solucionado hoy antes de las 5pm.",
    createAt: new Date("2025-12-10T14:30:00"),
    updateAt: null,
    idTicket: 101,
    userName: "Carlos Ramírez",
  },
  {
    idComment: 3,
    comment:
      "Tu solicitud de acceso ha sido aprobada. Procederemos con la configuración.",
    createAt: new Date("2025-12-09T15:00:00"),
    updateAt: null,
    idTicket: 102,
    userName: "Ana Ramírez",
  },
  {
    idComment: 4,
    comment: "Los datos han sido actualizados correctamente en el sistema.",
    createAt: new Date("2025-12-09T16:15:00"),
    updateAt: null,
    idTicket: 103,
    userName: "Luis Torres",
  },
  {
    idComment: 5,
    comment:
      "Ticket cerrado. Si tienes alguna otra consulta, no dudes en contactarnos.",
    createAt: new Date("2025-12-09T16:30:00"),
    updateAt: null,
    idTicket: 103,
    userName: "Luis Torres",
  },
  {
    idComment: 6,
    comment:
      "Hemos restablecido tu contraseña. Deberías haber recibido un correo con las nuevas credenciales.",
    createAt: new Date("2025-12-11T09:00:00"),
    updateAt: null,
    idTicket: 104,
    userName: "Jorge Morales",
  },
  {
    idComment: 7,
    comment:
      "Sí, es posible exportar en Excel. Te enviaré un instructivo para activar esa opción.",
    createAt: new Date("2025-12-07T17:30:00"),
    updateAt: null,
    idTicket: 105,
    userName: "María González",
  },
]);

const selectTicket = (ticket: Ticket) => {
  selectedTicket.value = ticket;
};

const getTicketComments = (ticketId: number) => {
  return comments.value.filter((comment) => comment.idTicket === ticketId);
};

const getStatusName = (statusId: number) => {
  const statusMap: Record<number, string> = {
    1: "Nuevo",
    2: "Pendiente",
    3: "En Progreso",
    4: "En Revisión",
    5: "Completado",
  };
  return statusMap[statusId] || "Desconocido";
};

const getStatusClass = (statusId: number) => {
  const classMap: Record<number, string> = {
    1: "bg-purple-100 text-purple-700",
    2: "bg-blue-100 text-blue-700",
    3: "bg-cyan-100 text-cyan-700",
    4: "bg-amber-100 text-amber-700",
    5: "bg-green-100 text-green-700",
  };
  return classMap[statusId] || "bg-slate-100 text-slate-700";
};

const getPriorityClass = (priority: string) => {
  const classMap: Record<string, string> = {
    Baja: "bg-slate-100 text-slate-700",
    Media: "bg-yellow-100 text-yellow-700",
    Alta: "bg-orange-100 text-orange-700",
    Urgente: "bg-red-100 text-red-700",
  };
  return classMap[priority] || "bg-slate-100 text-slate-700";
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
