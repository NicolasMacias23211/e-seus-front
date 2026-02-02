<template>
  <div class="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="px-6 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center">
                <LayoutGrid class="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-[#021C7D]">Tablero</h1>
                <p class="text-xs text-slate-500 flex items-center gap-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Mis tickets
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input v-model="searchQuery" type="search" placeholder="Buscar tickets..."
                class="pl-10 pr-4 py-2.5 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all" />
            </div>
            <button
              class="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              title="Filtros">
              <Filter class="h-4 w-4" />
            </button>
            <button
              class="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              title="Configuración">
              <SlidersHorizontal class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-2">
      <div class="flex gap-1">
        <div @drop="handleDropToDelete" @dragover.prevent @dragenter="isDeletingZone = true"
          @dragleave="isDeletingZone = false" :class="[
            'flex-1 flex items-center justify-center gap-4 py-6 relative overflow-hidden transition-all duration-300 cursor-pointer rounded-xl shadow-lg border-2',
            isDeletingZone
              ? 'bg-red-200 shadow-2xl border-red-400 scale-[1.02]'
              : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300',
          ]" :style="{
            backgroundImage: isDeletingZone
              ? 'repeating-linear-gradient(45deg, #fca5a5 0, #fca5a5 20px, #f87171 20px, #f87171 40px)'
              : 'repeating-linear-gradient(45deg, #fee2e2 0, #fee2e2 20px, #fecaca 20px, #fecaca 40px)',
          }" title="Arrastrar aquí para denegar">
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div :class="[
              'p-3 rounded-xl transition-all shadow-lg',
              isDeletingZone ? 'bg-red-300 scale-110' : 'bg-red-400',
            ]">
              <Trash2 class="w-7 h-7 text-white" />
            </div>
            <div class="text-left">
              <span :class="[
                'block text-xl font-black transition-all tracking-wide',
                isDeletingZone ? 'text-red-900 scale-105' : 'text-red-500',
              ]">
                DENEGAR TICKET
              </span>
            </div>
          </div>
        </div>

        <div @drop="handleDropToComplete" @dragover.prevent @dragenter="isCompletingZone = true"
          @dragleave="isCompletingZone = false" :class="[
            'flex-1 flex items-center justify-center gap-3 py-6 relative overflow-hidden transition-all duration-300 cursor-pointer rounded-xl shadow-lg border-2',
            isCompletingZone
              ? 'bg-green-200 shadow-2xl border-green-400 scale-[1.02]'
              : 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300',
          ]" :style="{
            backgroundImage: isCompletingZone
              ? 'repeating-linear-gradient(45deg, #86efac 0, #86efac 20px, #4ade80 20px, #4ade80 40px)'
              : 'repeating-linear-gradient(45deg, #dcfce7 0, #dcfce7 20px, #bbf7d0 20px, #bbf7d0 40px)',
          }" title="Arrastrar aquí para completar">
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div :class="[
              'p-3 rounded-xl transition-all shadow-lg',
              isCompletingZone ? 'bg-green-600 scale-110' : 'bg-green-400',
            ]">
              <CheckCircle2 class="w-7 h-7 text-white" />
            </div>
            <div class="text-left">
              <span :class="[
                'block text-xl font-black transition-all tracking-wide',
                isCompletingZone
                  ? 'text-green-900 scale-105'
                  : 'text-green-500',
              ]">
                COMPLETADO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-x-auto overflow-y-hidden">
      <div class="h-full px-2 py-3 sm:px-3 sm:py-4 lg:px-4 lg:py-6">
        <div class="flex gap-2 sm:gap-3 lg:gap-4 h-full min-w-max">
          <div v-for="column in columns" :key="column.status" class="flex-1 min-w-[260px] max-w-[380px] flex flex-col">
            <div class="flex items-center justify-between mb-4 px-1">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :class="column.color"></div>
                <h3 class="font-semibold text-slate-700 text-sm uppercase tracking-wide">
                  {{ column.title }}
                </h3>
              </div>
              <span
                class="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full shadow-sm">
                {{ ticketsByStatus[column.status].length }}
              </span>
            </div>

            <div
              class="flex-1 bg-slate-100/50 rounded-xl p-4 overflow-y-auto border border-slate-200/50 backdrop-blur-sm"
              :class="column.bgClass" @drop="handleDrop($event, column.statusId)" @dragover.prevent
              @dragenter="handleDragEnter(column.statusId)" @dragleave="handleDragLeave(column.statusId)">
              <div class="space-y-4">
                <div v-for="ticket in ticketsByStatus[column.status]" :key="ticket.id_ticket" draggable="true"
                  @dragstart="handleDragStart($event, ticket)" @dragend="handleDragEnd" @click="openTicketModal(ticket)"
                  class="cursor-move">
                  <TicketCard :ticket="ticket" />
                </div>

                <div v-if="ticketsByStatus[column.status].length === 0"
                  class="flex flex-col items-center justify-center py-8 text-slate-400">
                  <div class="w-12 h-12 rounded-full bg-slate-200/50 flex items-center justify-center mb-2">
                    <Inbox class="w-6 h-6" />
                  </div>
                  <p class="text-xs">No hay tickets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] px-6 py-4 rounded-t-2xl flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Trash2 v-if="modalAction === 'delete'" class="w-5 h-5 text-white" />
                <CheckCircle2 v-else-if="modalAction === 'complete'" class="w-5 h-5 text-white" />
                <LayoutGrid v-else class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">
                  {{
                    modalAction === "delete"
                      ? "Eliminar Ticket"
                      : modalAction === "complete"
                        ? "Completar Ticket"
                        : "Actualizar Ticket"
                  }}
                </h3>
                <p class="text-xs text-white/80">
                  Ticket #{{ draggedTicket?.id_ticket }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <label class="text-sm font-semibold text-white/90">Estado:</label>
                <select v-model="editedTicket.status_name"
                  class="px-4 py-2 bg-white/95 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all font-semibold text-slate-700">
                  <option :value="'Nuevo'">Nuevo</option>
                  <option :value="'Pendiente'">Pendiente</option>
                  <option :value="'En progreso'">En Progreso</option>
                  <option :value="'En revisión'">En Revisión</option>
                </select>
              </div>
              <button @click="closeModal" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-4 flex-1 overflow-y-auto">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Título del Ticket
            </label>
            <div class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              {{ editedTicket.ticket_title }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 min-h-[80px] whitespace-pre-wrap">
              {{ editedTicket.ticket_description }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Archivos Adjuntos
            </label>
            <div v-if="editedTicket.ticket_attachments"
              class="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-start gap-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-slate-700">
                    {{ editedTicket.ticket_attachments }}
                  </p>
                  <p class="text-xs text-slate-500 mt-1">
                    Haga clic para descargar el archivo adjunto
                  </p>
                </div>
                <button class="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
              <div class="flex flex-col items-center gap-2 py-2">
                <svg class="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-sm font-medium text-slate-500">
                  No hay archivos adjuntos
                </p>
                <p class="text-xs text-slate-400">
                  Este ticket no tiene archivos adjuntos
                </p>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4">
            <div class="flex border-b border-slate-200 mb-4">
              <button @click="activeTab = 'details'" :class="[
                'px-6 py-3 font-semibold text-sm transition-colors relative',
                activeTab === 'details'
                  ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                  : 'text-slate-500 hover:text-slate-700',
              ]">
                Detalles
              </button>
              <button @click="activeTab = 'comments'" :class="[
                'px-6 py-3 font-semibold text-sm transition-colors relative',
                activeTab === 'comments'
                  ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                  : 'text-slate-500 hover:text-slate-700',
              ]">
                Comentarios
                <span v-if="ticketComments.length > 0"
                  class="ml-2 px-2 py-0.5 bg-[#50bdeb] text-white text-xs rounded-full">
                  {{ ticketComments.length }}
                </span>
              </button>
              <button @click="activeTab = 'time'" :class="[
                'px-6 py-3 font-semibold text-sm transition-colors relative',
                activeTab === 'time'
                  ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                  : 'text-slate-500 hover:text-slate-700',
              ]">
                Tiempo Reportado
                <span v-if="ticketReportedTimes.length > 0"
                  class="ml-2 px-2 py-0.5 bg-[#50bdeb] text-white text-xs rounded-full">
                  {{ ticketReportedTimes.length }}
                </span>
              </button>
            </div>

            <div v-show="activeTab === 'details'" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Fecha de Creación
                </label>
                <div
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-2">
                  <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{
                    new Date(editedTicket.create_at).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Cliente
                  </label>
                  <div class="relative">
                    <input v-model="clientSearch" @input="filterClients" @focus="showClientDropdown = true"
                      @blur="hideClientDropdown" type="text" autocomplete="off"
                      class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                      placeholder="Buscar cliente..." />
                    <div v-if="showClientDropdown && filteredClients.length > 0"
                      class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                      <div v-for="client in filteredClients" :key="client.client_name" @mousedown="selectClient(client)"
                        class="px-4 py-2.5 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700">
                        {{ client.client_name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Prioridad
                  </label>
                  <select v-model="editedTicket.priority_name"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all">
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Asignado a
                  </label>
                  <input v-model="editedTicket.assigned_to" type="text"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                    placeholder="Usuario asignado" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Servicio
                  </label>
                  <select v-model="editedTicket.service_name"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all">
                    <option value="" disabled>Seleccione un servicio</option>
                    <option v-for="service in servicesList" :key="service.id_services" :value="service.service_name">
                      {{ service.service_name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    ANS (Acuerdo de Nivel de Servicio)
                  </label>
                  <input v-model="editedTicket.ticket_ans" type="text"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                    placeholder="ANS" readonly />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Fecha Estimada de Cierre
                  </label>
                  <input v-model="estimatedClosingDateStr" type="date"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all" />
                </div>
                <div v-if="modalAction === 'complete'">
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Código de Cierre
                  </label>
                  <input v-model.number="editedTicket.ticket_closing_code" type="number"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                    placeholder="Código de cierre" />
                </div>
                <div v-else>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Reportar Tiempo
                  </label>
                  <div class="flex gap-2">
                    <div class="flex-1">
                      <div class="relative">
                        <input v-model.number="reportedHours" type="number" min="0"
                          class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all pr-8"
                          placeholder="0" />
                        <span
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">H</span>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div class="relative">
                        <input v-model.number="reportedMinutes" type="number" min="0" max="59"
                          class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all pr-8"
                          placeholder="0" />
                        <span
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CommentEditor v-model="commentText" label="Agregar Comentario"
                placeholder="Escribe tu comentario aquí..."
                helper-text="Este comentario será agregado al historial del ticket." />
            </div>

            <div v-show="activeTab === 'comments'" class="space-y-4">
              <div v-if="ticketComments.length === 0" class="text-center py-12">
                <div class="text-slate-400 text-lg mb-2">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  No hay comentarios aún
                </div>
              </div>
              <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
                <div v-for="comment in ticketComments" :key="comment.id_note"
                  class="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {{
                        comment.network_user
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                      }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-semibold text-slate-800">{{
                          comment.network_user
                        }}</span>
                        <span class="text-xs text-slate-500">
                          {{
                            new Date(comment.create_at).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          }}
                        </span>
                      </div>
                      <p class="text-slate-700 text-sm leading-relaxed">
                        {{ comment.note }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="activeTab === 'time'" class="space-y-4">
              <div v-if="ticketReportedTimes.length === 0" class="text-center py-12">
                <div class="text-slate-400 text-lg mb-2">
                  <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No hay tiempo reportado aún
                </div>
              </div>
              <div v-else class="space-y-3 max-h-96 overflow-y-auto pr-2">
                <div v-for="time in ticketReportedTimes" :key="time.idReportedTimes"
                  class="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {{
                          time.userName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        }}
                      </div>
                      <div>
                        <div class="font-semibold text-slate-800">
                          {{ time.userName }}
                        </div>
                        <div class="text-xs text-slate-500">
                          {{
                            new Date(time.dateReported).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-[#021C7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl font-bold text-[#021C7D]">
                          {{ time.reportedTime.split(":")[0] }}h
                          {{ time.reportedTime.split(":")[1] }}m
                        </span>
                      </div>
                      <div class="text-xs text-slate-500 mt-1">
                        Reportado
                        {{
                          new Date(time.createAt).toLocaleDateString("es-ES", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 pt-4 border-t-2 border-slate-300">
                  <div
                    class="flex items-center justify-between bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg p-4">
                    <span class="font-semibold text-lg">Tiempo Total</span>
                    <span class="text-2xl font-bold">
                      {{
                        (ticketReportedTimes.reduce((total, t) => {
                          const [h, m] = t.reportedTime.split(":").map(Number);
                          return total + h * 60 + m;
                        }, 0) /
                          60) |
                        0
                      }}h
                      {{
                        ticketReportedTimes.reduce((total, t) => {
                          const [h, m] = t.reportedTime.split(":").map(Number);
                          return total + h * 60 + m;
                        }, 0) % 60
                      }}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 px-6 py-4 rounded-b-2xl border-t border-slate-200 flex gap-3 flex-shrink-0">
          <button @click="closeModal"
            class="flex-1 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors">
            Cancelar
          </button>
          <button @click="confirmAction" class="flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors" :class="modalAction === 'delete'
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : modalAction === 'complete'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white'
            ">
            {{
              modalAction === "delete"
                ? "Eliminar"
                : modalAction === "complete"
                  ? "Completar"
                  : "Actualizar"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import TicketCard from "../components/TicketCard.vue";
import CommentEditor from "../components/CommentEditor.vue";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Inbox,
  LayoutGrid,
  Trash2,
  CheckCircle2,
} from "lucide-vue-next";
import type { TicketShort, Note, Client, ANS, Service } from "../models";
import { RequestTypeService } from "../services/RequestTypeService";
import { TicketsService } from "../services/ticketsService";
import type { UserInfo } from "../models/login";
import { SessionStorageService } from "../services/SessionStorageService";
import { useNotification } from "../utils/useNotification";
import { NotesService } from '../services/notesService';
import { ClientsService } from "../services/clientsService";
import { StatusService } from "../services/statusService"
import { AnsService } from "../services/ansService";
const clientsService = new ClientsService();
const notification = useNotification();
const ansService = new AnsService();
type BoardStatus = "new" | "pending" | "in-progress" | "in-review";
const requestTypeService = new RequestTypeService();
const searchQuery = ref("");
const isDeletingZone = ref(false);
const isCompletingZone = ref(false);
const draggedTicket = ref<TicketShort | null>(null);
const showModal = ref(false);
const notesService = new NotesService();
const modalAction = ref<"move" | "delete" | "complete">("move");
const targetStatus = ref<number | null>(null);
const SessionStorageServiceInstance = new SessionStorageService();
const CurrentUserInfo: UserInfo =
  SessionStorageServiceInstance.getUserInfo() || {
    username: "",
    full_name: "",
    email: "",
    position: "",
    document: 0,
  };
const TicketService = new TicketsService();
const statusService = new StatusService();
const editedTicket = ref<TicketShort>({
  id_ticket: 0,
  ticket_title: "",
  ticket_description: "",
  ticket_attachments: null,
  service_name: "",
  priority_name: "Media",
  ticket_closing_code: null,
  ticket_ans: 0,
  reporter_user_name: "",
  create_at: new Date().toISOString(),
  update_at: "",
  assigned_to: null,
  closing_date: null,
  estimated_closing_date: null,
  status_name: "Nuevo",
  sub_program_name: "",
});

const clientSearch = ref("");
const showClientDropdown = ref(false);
const filteredClients = ref<Client[]>([]);

const commentText = ref("");

const reportedHours = ref(0);
const reportedMinutes = ref(0);

const activeTab = ref<"details" | "comments" | "time">("details");

const ticketComments = ref<Note[]>([]);

//TODO: Validar por que no me esta trayendo info del back
const loadTicketNotes = async (ticketId: number) => {
  try {
    const response = await notesService.getNotesByTicket(ticketId);
    if (response.data && response.data.results) {
      ticketComments.value = response.data.results;
    }
  } catch (error) {
    console.error("Error al cargar las notas:", error);
    notification.error("Error", "No se pudieron cargar las notas.");
  }
}


const ticketReportedTimes = ref<any[]>([
  {
    idReportedTimes: 1,
    dateReported: new Date("2025-11-20"),
    reportedTime: "02:30:00",
    idTicket: 101,
    createAt: new Date("2025-11-20T16:00:00"),
    updateAt: null,
    userName: "Juan Pérez",
  },
  {
    idReportedTimes: 2,
    dateReported: new Date("2025-11-21"),
    reportedTime: "03:45:00",
    idTicket: 101,
    createAt: new Date("2025-11-21T18:00:00"),
    updateAt: null,
    userName: "María González",
  },
]);
const clientsList = ref<Client[]>([]);

const servicesList = ref<Service[]>([]);

const ansList = ref<ANS[]>([]);

// Computed para manejar la fecha estimada como string
const estimatedClosingDateStr = computed({
  get: () => {
    if (!editedTicket.value.estimated_closing_date) return "";
    const date = new Date(editedTicket.value.estimated_closing_date);
    return date.toISOString().split("T")[0];
  },
  set: (value: string) => {
    editedTicket.value.estimated_closing_date = value || null;
  },
});

const mockTickets = ref<TicketShort[]>([]);
CurrentUserInfo;

const loadTickets = async () => {
  if (CurrentUserInfo.username === "") {
    console.warn("Usuario no autenticado. No se pueden cargar los tickets.");
    return;
  }
  try {
    const response = await TicketService.GetTicketsByPerson(
      CurrentUserInfo.username
    );
    if (response.data && response.data.results) {
      mockTickets.value = response.data.results.flat();
      console.log("Tickets cargados:", mockTickets.value);
      console.log("Estados encontrados:", [
        ...new Set(mockTickets.value.map((t) => t.status_name)),
      ]);
    }
  } catch (error) {
    console.error("Error al cargar tickets:", error);
    notification.error("Error", "No se pudieron cargar los tickets");
  }
};

const loadColumsByStatus = async () => {
  try {
    const statusRes = await statusService.getAll();
    if (statusRes.success && statusRes.data?.results) {
      //columns.value = statusRes.data.results
      //aca se debe reemplzar los estados Hard-code con los dinamicos 
    }
  } catch (error) {

  }
}

// definir si aca si neceisto los ans
const loadAns = async () => {
  try {
    const response = await ansService.getAll()
    if (response.data && response.data.results) {
      ansList.value = response.data.results
    }
  } catch (error) {
    console.error("Error al cargar los ANS: ", error)
    notification.error("Error", "No se pudieron cargar los ANS")
  }
}

const loadServices = async () => {
  try {
    const response = await requestTypeService.getAll();
    if (response.success && response.data) {
      servicesList.value = response.data.results;
    }
  } catch (err) {
    console.error("Error loading services:", err);
    notification.error("Error", "No se pudieron cargar los servicios")
  }
};


onMounted(() => {
  loadTickets();
  loadServices();
});

const columns = [
  {
    title: "Nuevos",
    status: "new" as BoardStatus,
    color: "bg-purple-500",
    bgClass: "bg-purple-50/30",
    statusId: 1,
  },
  {
    title: "Pendiente",
    status: "pending" as BoardStatus,
    color: "bg-blue-500",
    bgClass: "bg-blue-50/30",
    statusId: 2,
  },
  {
    title: "En Progreso",
    status: "in-progress" as BoardStatus,
    color: "bg-[#50bdeb]",
    bgClass: "bg-cyan-50/30",
    statusId: 3,
  },
  {
    title: "En Revisión",
    status: "in-review" as BoardStatus,
    color: "bg-amber-500",
    bgClass: "bg-amber-50/30",
    statusId: 4,
  },
];

const normalizeStatus = (status: string | null | undefined): string => {
  if (!status) return "";
  return status
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const ticketsByStatus = computed(() => {
  const statusMap = {
    new: ["nuevo", "new"],
    pending: ["pendiente", "pending"],
    "in-progress": [
      "en progreso",
      "en proceso",
      "in-progress",
      "in progress",
      "progreso",
    ],
    "in-review": [
      "en revision",
      "en revisión",
      "revision",
      "revisión",
      "in-review",
      "in review",
    ],
  };

  const filterByStatus = (allowedStatuses: string[]) => {
    return mockTickets.value.filter((t) => {
      if (!t.status_name) return false;
      const normalized = normalizeStatus(t.status_name);
      return allowedStatuses.some(
        (status) => normalizeStatus(status) === normalized
      );
    });
  };

  return {
    new: filterByStatus(statusMap.new),
    pending: filterByStatus(statusMap.pending),
    "in-progress": filterByStatus(statusMap["in-progress"]),
    "in-review": filterByStatus(statusMap["in-review"]),
  };
});

const handleDragStart = (event: DragEvent, ticket: TicketShort) => {
  draggedTicket.value = ticket;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", "");
  }
};

const handleDragEnd = () => {
  draggedTicket.value = null;
  isDeletingZone.value = false;
  isCompletingZone.value = false;
};

const handleDragEnter = (_statusId: number) => {
  // Visual feedback for column hover
};

const handleDragLeave = (_statusId: number) => {
  // Visual feedback cleanup
};

const handleDrop = (event: DragEvent, newStatusId: number) => {
  event.preventDefault();
  if (!draggedTicket.value) return;

  const statusMap: { [key: number]: string } = {
    1: "Nuevo",
    2: "Pendiente",
    3: "En progreso",
    4: "En Revisión",
  };

  const oldStatusName = draggedTicket.value.status_name;
  const newStatusName = statusMap[newStatusId];
  if (oldStatusName !== newStatusName) {
    targetStatus.value = newStatusId;
    modalAction.value = "move";
    editedTicket.value = { ...draggedTicket.value };
    editedTicket.value.status_name = newStatusName;
    clientSearch.value = draggedTicket.value.sub_program_name || "";
    activeTab.value = "details";
    showModal.value = true;
  }
};

const handleDropToDelete = (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;

  modalAction.value = "delete";
  editedTicket.value = { ...draggedTicket.value };
  clientSearch.value = draggedTicket.value.sub_program_name || "";
  activeTab.value = "details";
  showModal.value = true;
  isDeletingZone.value = false;
};

const handleDropToComplete = (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;
  modalAction.value = "complete";
  editedTicket.value = { ...draggedTicket.value };
  clientSearch.value = draggedTicket.value.sub_program_name || "";
  activeTab.value = "details";
  showModal.value = true;
  isCompletingZone.value = false;
};

const confirmAction = () => {
  if (!draggedTicket.value) return;

  if (modalAction.value === "delete") {
    const index = mockTickets.value.findIndex(
      (t) => t.id_ticket === draggedTicket.value!.id_ticket
    );
    if (index !== -1) {
      mockTickets.value.splice(index, 1);
    }
  } else if (modalAction.value === "complete") {
    // Marcar como completado y actualizar con datos del formulario
    const ticket = mockTickets.value.find(
      (t) => t.id_ticket === draggedTicket.value!.id_ticket
    );
    if (ticket) {
      // Actualizar con los datos editados
      Object.assign(ticket, editedTicket.value);
      ticket.closing_date = new Date().toISOString();
      ticket.update_at = new Date().toISOString();
      // Eliminar el ticket del board al completarlo
      const index = mockTickets.value.findIndex(
        (t) => t.id_ticket === draggedTicket.value!.id_ticket
      );
      if (index !== -1) {
        mockTickets.value.splice(index, 1);
      }
    }
  } else if (modalAction.value === "move") {
    // Actualizar ticket con los datos editados del formulario
    const ticket = mockTickets.value.find(
      (t) => t.id_ticket === draggedTicket.value!.id_ticket
    );
    if (ticket) {
      Object.assign(ticket, editedTicket.value);
      ticket.update_at = new Date().toISOString();
    }
  }

  closeModal();
  console.log("Ticket actualizado:", editedTicket.value);
};

const closeModal = () => {
  showModal.value = false;
  draggedTicket.value = null;
  targetStatus.value = null;
  modalAction.value = "move";
  clientSearch.value = "";
  showClientDropdown.value = false;
  activeTab.value = "details";
  commentText.value = "";
  reportedHours.value = 0;
  reportedMinutes.value = 0;
};

const loadClients = async () => {
  let clientsRes;
  try {
    clientsRes = await clientsService.getAll();
  } catch (error) {
    notification.error("Error cargando los cliente", "No se pudieron cargar los clientes porfavor intente nuevamente si el problema persiste comunicarse con soporte tecnico");
  }
  if (clientsRes && clientsRes.success && clientsRes.data?.results) {
    clientsList.value = clientsRes.data.results;
  }
}


// Funciones para autocomplete de cliente
const filterClients = () => {
  loadClients();
  const search = clientSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredClients.value = clientsList.value;
  } else {
    filteredClients.value = clientsList.value.filter((client) =>
      client.client_name.toLowerCase().includes(search)
    );
  }
};

const selectClient = (client: Client) => {
  editedTicket.value.sub_program_name = client.client_name;
  clientSearch.value = client.client_name;
  showClientDropdown.value = false;
};

const hideClientDropdown = () => {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 200);
};

// Función para abrir modal al hacer click en un ticket
const openTicketModal = (ticket: TicketShort) => {
  draggedTicket.value = ticket;
  modalAction.value = "move";
  editedTicket.value = { ...ticket };
  clientSearch.value = ticket.sub_program_name || "";
  activeTab.value = "details";
  showModal.value = true;
};
</script>
