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
                <div v-for="ticket in ticketsByStatus[column.status]" :key="ticket.idTicket" draggable="true"
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
                  Ticket #{{ draggedTicket?.idTicket }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <label class="text-sm font-semibold text-white/90">Estado:</label>
                <select v-model="editedTicket.statusId"
                  class="px-4 py-2 bg-white/95 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all font-semibold text-slate-700">
                  <option :value="1">Nuevo</option>
                  <option :value="2">Pendiente</option>
                  <option :value="3">En Progreso</option>
                  <option :value="4">En Revisión</option>
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
              {{ editedTicket.ticketTitle }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 min-h-[80px] whitespace-pre-wrap">
              {{ editedTicket.ticketDescription }}
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
            <div v-if="editedTicket.ticketAttachments"
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
                    {{ editedTicket.ticketAttachments }}
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
                    new Date(editedTicket.createAt).toLocaleDateString(
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
                      <div v-for="client in filteredClients" :key="client.name" @mousedown="selectClient(client)"
                        class="px-4 py-2.5 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700">
                        {{ client.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Prioridad
                  </label>
                  <select v-model="editedTicket.ticketPriority"
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
                  <input v-model="editedTicket.assignedTo" type="text"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                    placeholder="Usuario asignado" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    Servicio
                  </label>
                  <select v-model.number="editedTicket.ticketService"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all">
                    <option value="" disabled>Seleccione un servicio</option>
                    <option v-for="service in servicesList" :key="service.id" :value="service.id">
                      {{ service.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-2">
                    ANS (Acuerdo de Nivel de Servicio)
                  </label>
                  <select v-model.number="editedTicket.ticketAns"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all">
                    <option value="" disabled>Seleccione un ANS</option>
                    <option v-for="ans in ansList" :key="ans.id" :value="ans.id">
                      {{ ans.name }} - {{ ans.description }}
                    </option>
                  </select>
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
                  <input v-model.number="editedTicket.ticketClosingCode" type="number"
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
                <div v-for="comment in ticketComments" :key="comment.idComment"
                  class="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {{
                        comment.userName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                      }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-semibold text-slate-800">{{
                          comment.userName
                        }}</span>
                        <span class="text-xs text-slate-500">
                          {{
                            new Date(comment.createAt).toLocaleDateString(
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
                        {{ comment.comment }}
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
import { ref, computed } from "vue";
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
import type { Ticket } from "../models";
import { TicketsService } from "../services/ticketsService";
import { ApiResponse } from "../services/http";
type BoardStatus = "new" | "pending" | "in-progress" | "in-review";

const searchQuery = ref("");
const isDeletingZone = ref(false);
const isCompletingZone = ref(false);
const draggedTicket = ref<Ticket | null>(null);
const showModal = ref(false);
const modalAction = ref<"move" | "delete" | "complete">("move");
const targetStatus = ref<number | null>(null);

const editedTicket = ref<Ticket>({
  idTicket: 0,
  ticketTitle: "",
  ticketDescription: "",
  ticketAttachments: null,
  ticketService: 0,
  ticketPriority: "Media",
  ticketClosingCode: null,
  ticketAns: 0,
  reporterUser: "",
  createAt: new Date(),
  updateAt: null,
  assignedTo: null,
  closingDate: null,
  estimatedClosingDate: null,
  statusId: 1,
  subProgramName: "",
});

const clientSearch = ref("");
const showClientDropdown = ref(false);
const filteredClients = ref<{ name: string }[]>([]);

// Variables para el editor de comentarios
const commentText = ref("");

// Variables para reportar tiempo
const reportedHours = ref(0);
const reportedMinutes = ref(0);

// Variables para tabs
const activeTab = ref<"details" | "comments" | "time">("details");

// Mock data para comentarios y tiempo reportado
const ticketComments = ref<any[]>([
  {
    idComment: 1,
    comment: "Se inició el análisis del problema",
    createAt: new Date("2025-11-20T10:30:00"),
    updateAt: null,
    idTicket: 101,
    userName: "Juan Pérez",
  },
  {
    idComment: 2,
    comment: "Ya tengo identificada la causa raíz del error",
    createAt: new Date("2025-11-20T14:15:00"),
    updateAt: null,
    idTicket: 101,
    userName: "Juan Pérez",
  },
]);

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

const clientsList = ref([
  { name: "Cliente Principal A" },
  { name: "Cliente Principal B" },
  { name: "Cliente Principal C" },
  { name: "Cliente Tech Solutions" },
  { name: "Cliente Global Corp" },
]);

const servicesList = ref([
  { id: 1, name: "Soporte Técnico" },
  { id: 2, name: "Desarrollo" },
  { id: 3, name: "Infraestructura" },
  { id: 4, name: "Consultoría" },
]);

const ansList = ref([
  { id: 1, name: "ANS 24h", description: "Respuesta en 24 horas" },
  { id: 2, name: "ANS 48h", description: "Respuesta en 48 horas" },
  { id: 3, name: "ANS 72h", description: "Respuesta en 72 horas" },
  { id: 4, name: "ANS 1 semana", description: "Respuesta en 1 semana" },
]);

// Computed para manejar la fecha estimada como string
const estimatedClosingDateStr = computed({
  get: () => {
    if (!editedTicket.value.estimatedClosingDate) return "";
    const date = new Date(editedTicket.value.estimatedClosingDate);
    return date.toISOString().split("T")[0];
  },
  set: (value: string) => {
    editedTicket.value.estimatedClosingDate = value ? new Date(value) : null;
  },
});

const mockTickets = ref<Ticket[]>([
  {
    idTicket: 101,
    ticketTitle: "Implementar sistema de autenticación",
    ticketDescription: "Crear el sistema de login y registro con JWT",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "jperez",
    createAt: new Date("2025-11-20"),
    updateAt: null,
    assignedTo: "mgonzalez",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-01"),
    statusId: 1,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 102,
    ticketTitle: "Corregir error en módulo de pagos",
    ticketDescription: "Bug en el proceso de checkout",
    ticketAttachments: null,
    ticketService: 3,
    ticketPriority: "Urgente",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "cramirez",
    createAt: new Date("2025-11-21"),
    updateAt: null,
    assignedTo: "mgonzalez",
    closingDate: null,
    estimatedClosingDate: new Date("2025-11-25"),
    statusId: 2,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 103,
    ticketTitle: "Optimización de queries de base de datos",
    ticketDescription: "Mejorar rendimiento de consultas principales",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "amartinez",
    createAt: new Date("2025-11-19"),
    updateAt: null,
    assignedTo: "ltorres",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-05"),
    statusId: 3,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 104,
    ticketTitle: "Diseño de nuevos componentes UI",
    ticketDescription: "Crear biblioteca de componentes reutilizables",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Media",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "pherrera",
    createAt: new Date("2025-11-18"),
    updateAt: null,
    assignedTo: "dsilva",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-10"),
    statusId: 4,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 105,
    ticketTitle: "Testing y corrección de bugs menores",
    ticketDescription: "Suite de pruebas para nuevas funcionalidades",
    ticketAttachments: null,
    ticketService: 3,
    ticketPriority: "Baja",
    ticketClosingCode: 1,
    ticketAns: 1,
    reporterUser: "clopez",
    createAt: new Date("2025-11-15"),
    updateAt: new Date("2025-11-23"),
    assignedTo: "rdiaz",
    closingDate: new Date("2025-11-23"),
    estimatedClosingDate: new Date("2025-11-22"),
    statusId: 1,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 106,
    ticketTitle: "Implementar modo oscuro en dashboard",
    ticketDescription: "Añadir soporte para tema oscuro",
    ticketAttachments: null,
    ticketService: 1,
    ticketPriority: "Baja",
    ticketClosingCode: null,
    ticketAns: 1,
    reporterUser: "evargas",
    createAt: new Date("2025-11-22"),
    updateAt: null,
    assignedTo: null,
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-15"),
    statusId: 2,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 107,
    ticketTitle: "Migrar base de datos a nueva versión",
    ticketDescription: "Actualizar PostgreSQL a versión 15",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Alta",
    ticketClosingCode: null,
    ticketAns: 2,
    reporterUser: "jmorales",
    createAt: new Date("2025-11-23"),
    updateAt: null,
    assignedTo: "pherrera",
    closingDate: null,
    estimatedClosingDate: new Date("2025-12-08"),
    statusId: 3,
    subProgramName: "Soporte Nivel 1 - A1",
  },
  {
    idTicket: 108,
    ticketTitle: "Configurar CI/CD pipeline",
    ticketDescription: "Implementar pipeline de despliegue automático",
    ticketAttachments: null,
    ticketService: 2,
    ticketPriority: "Media",
    ticketClosingCode: 2,
    ticketAns: 2,
    reporterUser: "dsilva",
    createAt: new Date("2025-11-10"),
    updateAt: new Date("2025-11-22"),
    assignedTo: "ltorres",
    closingDate: new Date("2025-11-22"),
    estimatedClosingDate: new Date("2025-11-20"),
    statusId: 4,
    subProgramName: "Soporte Nivel 1 - A1",
  },
]);

const TicketService = new TicketsService();

const dataTickets = TicketService.GetTicketsByPerson("nmaciduq");
console.log(dataTickets);

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

const ticketsByStatus = computed(() => ({
  new: mockTickets.value.filter((t) => t.statusId === 1),
  pending: mockTickets.value.filter((t) => t.statusId === 2),
  "in-progress": mockTickets.value.filter((t) => t.statusId === 3),
  "in-review": mockTickets.value.filter((t) => t.statusId === 4),
}));

// Drag and drop handlers
const handleDragStart = (event: DragEvent, ticket: Ticket) => {
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

  const oldStatusId = draggedTicket.value.statusId;
  if (oldStatusId !== newStatusId) {
    targetStatus.value = newStatusId;
    modalAction.value = "move";
    editedTicket.value = { ...draggedTicket.value };
    editedTicket.value.statusId = newStatusId;
    clientSearch.value = draggedTicket.value.subProgramName;
    activeTab.value = "details";
    showModal.value = true;
  }
};

const handleDropToDelete = (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;

  modalAction.value = "delete";
  editedTicket.value = { ...draggedTicket.value };
  clientSearch.value = draggedTicket.value.subProgramName;
  activeTab.value = "details";
  showModal.value = true;
  isDeletingZone.value = false;
};

const handleDropToComplete = (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;
  modalAction.value = "complete";
  editedTicket.value = { ...draggedTicket.value };
  clientSearch.value = draggedTicket.value.subProgramName;
  activeTab.value = "details";
  showModal.value = true;
  isCompletingZone.value = false;
};

const confirmAction = () => {
  if (!draggedTicket.value) return;

  if (modalAction.value === "delete") {
    const index = mockTickets.value.findIndex(
      (t) => t.idTicket === draggedTicket.value!.idTicket
    );
    if (index !== -1) {
      mockTickets.value.splice(index, 1);
    }
  } else if (modalAction.value === "complete") {
    // Marcar como completado y actualizar con datos del formulario
    const ticket = mockTickets.value.find(
      (t) => t.idTicket === draggedTicket.value!.idTicket
    );
    if (ticket) {
      // Actualizar con los datos editados
      Object.assign(ticket, editedTicket.value);
      ticket.closingDate = new Date();
      ticket.updateAt = new Date();
      // Eliminar el ticket del board al completarlo
      const index = mockTickets.value.findIndex(
        (t) => t.idTicket === draggedTicket.value!.idTicket
      );
      if (index !== -1) {
        mockTickets.value.splice(index, 1);
      }
    }
  } else if (modalAction.value === "move") {
    // Actualizar ticket con los datos editados del formulario
    const ticket = mockTickets.value.find(
      (t) => t.idTicket === draggedTicket.value!.idTicket
    );
    if (ticket) {
      Object.assign(ticket, editedTicket.value);
      ticket.updateAt = new Date();
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

// Funciones para autocomplete de cliente
const filterClients = () => {
  const search = clientSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredClients.value = clientsList.value;
  } else {
    filteredClients.value = clientsList.value.filter((client) =>
      client.name.toLowerCase().includes(search)
    );
  }
};

const selectClient = (client: { name: string }) => {
  editedTicket.value.subProgramName = client.name;
  clientSearch.value = client.name;
  showClientDropdown.value = false;
};

const hideClientDropdown = () => {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 200);
};

// Función para abrir modal al hacer click en un ticket
const openTicketModal = (ticket: Ticket) => {
  draggedTicket.value = ticket;
  modalAction.value = "move";
  editedTicket.value = { ...ticket };
  clientSearch.value = ticket.subProgramName;
  activeTab.value = "details";
  showModal.value = true;
};
</script>
