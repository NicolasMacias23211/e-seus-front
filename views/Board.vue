<template>
  <div
    class="h-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="px-6 py-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
              >
                <LayoutGrid class="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-[#021C7D]">Tablero</h1>
                <p class="text-xs text-slate-500 flex items-center gap-2">
                  <span
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  ></span>
                  Mis tickets
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="relative flex items-center gap-2">
              <div class="relative">
                <Search
                  class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar por ID de ticket..."
                  @keyup.enter="searchTicketById"
                  class="pl-10 pr-4 py-2.5 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                />
              </div>
              <button
                @click="searchTicketById"
                class="px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                title="Buscar ticket"
              >
                Buscar
              </button>
            </div>
            <button
              class="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              title="Filtros"
            >
              <Filter class="h-4 w-4" />
            </button>
            <button
              class="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600"
              title="Configuración"
            >
              <SlidersHorizontal class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-2">
      <div class="flex gap-1">
        <div
          @drop="handleDropToDelete"
          @dragover.prevent
          @dragenter="isDeletingZone = true"
          @dragleave="isDeletingZone = false"
          :class="[
            'flex-1 flex items-center justify-center gap-4 py-6 relative overflow-hidden transition-all duration-300 cursor-pointer rounded-xl shadow-lg border-2',
            isDeletingZone
              ? 'bg-red-200 shadow-2xl border-red-400 scale-[1.02]'
              : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300',
          ]"
          :style="{
            backgroundImage: isDeletingZone
              ? 'repeating-linear-gradient(45deg, #fca5a5 0, #fca5a5 20px, #f87171 20px, #f87171 40px)'
              : 'repeating-linear-gradient(45deg, #fee2e2 0, #fee2e2 20px, #fecaca 20px, #fecaca 40px)',
          }"
          title="Arrastrar aquí para denegar"
        >
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div
              :class="[
                'p-3 rounded-xl transition-all shadow-lg',
                isDeletingZone ? 'bg-red-300 scale-110' : 'bg-red-400',
              ]"
            >
              <Trash2 class="w-7 h-7 text-white" />
            </div>
            <div class="text-left">
              <span
                :class="[
                  'block text-xl font-black transition-all tracking-wide',
                  isDeletingZone ? 'text-red-900 scale-105' : 'text-red-500',
                ]"
              >
                DENEGAR TICKET
              </span>
            </div>
          </div>
        </div>

        <div
          @drop="handleDropToComplete"
          @dragover.prevent
          @dragenter="isCompletingZone = true"
          @dragleave="isCompletingZone = false"
          :class="[
            'flex-1 flex items-center justify-center gap-3 py-6 relative overflow-hidden transition-all duration-300 cursor-pointer rounded-xl shadow-lg border-2',
            isCompletingZone
              ? 'bg-green-200 shadow-2xl border-green-400 scale-[1.02]'
              : 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300',
          ]"
          :style="{
            backgroundImage: isCompletingZone
              ? 'repeating-linear-gradient(45deg, #86efac 0, #86efac 20px, #4ade80 20px, #4ade80 40px)'
              : 'repeating-linear-gradient(45deg, #dcfce7 0, #dcfce7 20px, #bbf7d0 20px, #bbf7d0 40px)',
          }"
          title="Arrastrar aquí para completar"
        >
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div
              :class="[
                'p-3 rounded-xl transition-all shadow-lg',
                isCompletingZone ? 'bg-green-600 scale-110' : 'bg-green-400',
              ]"
            >
              <CheckCircle2 class="w-7 h-7 text-white" />
            </div>
            <div class="text-left">
              <span
                :class="[
                  'block text-xl font-black transition-all tracking-wide',
                  isCompletingZone
                    ? 'text-green-900 scale-105'
                    : 'text-green-500',
                ]"
              >
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
          <div
            v-for="column in columns"
            :key="column.status"
            class="flex-1 min-w-[260px] max-w-[380px] flex flex-col"
          >
            <div class="flex items-center justify-between mb-4 px-1">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :class="column.color"></div>
                <h3
                  class="font-semibold text-slate-700 text-sm uppercase tracking-wide"
                >
                  {{ column.title }}
                </h3>
              </div>
              <span
                class="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full shadow-sm"
              >
                {{ ticketsByStatus[column.status].length }}
              </span>
            </div>

            <div
              class="flex-1 bg-slate-100/50 rounded-xl p-4 overflow-y-auto border border-slate-200/50 backdrop-blur-sm"
              :class="column.bgClass"
              @drop="handleDrop($event, column.statusId)"
              @dragover.prevent
              @dragenter="handleDragEnter(column.statusId)"
              @dragleave="handleDragLeave(column.statusId)"
            >
              <div class="space-y-4">
                <div
                  v-for="ticket in ticketsByStatus[column.status]"
                  :key="ticket.id_ticket"
                  draggable="true"
                  @dragstart="handleDragStart($event, ticket)"
                  @dragend="handleDragEnd"
                  @click="openTicketModal(ticket)"
                  class="cursor-move"
                >
                  <TicketCard :ticket="ticket" />
                </div>

                <div
                  v-if="ticketsByStatus[column.status].length === 0"
                  class="flex flex-col items-center justify-center py-8 text-slate-400"
                >
                  <div
                    class="w-12 h-12 rounded-full bg-slate-200/50 flex items-center justify-center mb-2"
                  >
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
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        <div
          class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] px-6 py-4 rounded-t-2xl flex-shrink-0"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"
              >
                <Trash2
                  v-if="modalAction === 'delete'"
                  class="w-5 h-5 text-white"
                />
                <CheckCircle2
                  v-else-if="modalAction === 'complete'"
                  class="w-5 h-5 text-white"
                />
                <Inbox
                  v-else-if="modalAction === 'view'"
                  class="w-5 h-5 text-white"
                />
                <LayoutGrid v-else class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">
                  {{
                    modalAction === "delete"
                      ? "Eliminar Ticket"
                      : modalAction === "complete"
                        ? "Completar Ticket"
                        : modalAction === "view"
                          ? "Ver Ticket"
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
                <label class="text-sm font-semibold text-white/90"
                  >Estado:</label
                >
                <select
                  v-model="editedTicket.status_name"
                  class="px-4 py-2 bg-white/95 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all font-semibold text-slate-700"
                >
                  <option
                    v-for="status in Array.from(statusIdMap.values()).filter(
                      (s) =>
                        !s.is_backlog &&
                        s.ordering !== null &&
                        s.ordering !== undefined,
                    )"
                    :key="status.id_status"
                    :value="status.status_name"
                  >
                    {{ status.status_name }}
                  </option>
                </select>
              </div>
              <button
                @click="closeModal"
                class="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              {{ editedTicket.ticket_title }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 min-h-[80px] whitespace-pre-wrap"
            >
              {{ editedTicket.ticket_description }}
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              Archivos Adjuntos
              <span
                v-if="attachedFiles.length > 0"
                class="ml-auto px-2 py-0.5 bg-[#50bdeb] text-white text-xs rounded-full"
              >
                {{ attachedFiles.length }}
              </span>
            </label>

            <div v-if="attachedFiles.length > 0" class="space-y-2">
              <div
                v-for="(file, index) in attachedFiles"
                :key="index"
                @click="downloadFile(file)"
                class="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg hover:border-[#50bdeb] hover:shadow-md transition-all cursor-pointer group"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="p-2 rounded-lg transition-all"
                    :class="getFileTypeConfig(file).bgColor"
                  >
                    <svg
                      class="w-6 h-6 transition-all"
                      :class="getFileTypeConfig(file).color"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        :d="getFileTypeConfig(file).icon"
                      />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-semibold text-slate-700 truncate group-hover:text-[#021C7D] transition-colors"
                    >
                      {{ file.split("_").slice(2).join("_") || file }}
                    </p>
                    <p class="text-xs text-slate-500 flex items-center gap-2">
                      <span
                        class="px-1.5 py-0.5 rounded text-xs font-semibold"
                        :class="[
                          getFileTypeConfig(file).bgColor,
                          getFileTypeConfig(file).color,
                        ]"
                      >
                        {{ getFileTypeConfig(file).label }}
                      </span>
                      <span>•</span>
                      <span>Haz clic para descargar</span>
                    </p>
                  </div>
                  <div
                    class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-5 h-5 text-slate-400 group-hover:text-[#50bdeb] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-center"
            >
              <div class="flex flex-col items-center gap-2 py-2">
                <svg
                  class="w-12 h-12 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
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
              <button
                @click="activeTab = 'details'"
                :class="[
                  'px-6 py-3 font-semibold text-sm transition-colors relative',
                  activeTab === 'details'
                    ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                    : 'text-slate-500 hover:text-slate-700',
                ]"
              >
                Detalles
              </button>
              <button
                @click="activeTab = 'comments'"
                :class="[
                  'px-6 py-3 font-semibold text-sm transition-colors relative',
                  activeTab === 'comments'
                    ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                    : 'text-slate-500 hover:text-slate-700',
                ]"
              >
                Comentarios
                <span
                  v-if="ticketComments.length > 0"
                  class="ml-2 px-2 py-0.5 bg-[#50bdeb] text-white text-xs rounded-full"
                >
                  {{ ticketComments.length }}
                </span>
              </button>
              <button
                @click="activeTab = 'time'"
                :class="[
                  'px-6 py-3 font-semibold text-sm transition-colors relative',
                  activeTab === 'time'
                    ? 'text-[#021C7D] border-b-2 border-[#021C7D]'
                    : 'text-slate-500 hover:text-slate-700',
                ]"
              >
                Tiempo Reportado
                <span
                  v-if="ticketReportedTimes.length > 0"
                  class="ml-2 px-2 py-0.5 bg-[#50bdeb] text-white text-xs rounded-full"
                >
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
                  class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-2"
                >
                  <svg
                    class="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
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
                      },
                    )
                  }}
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    Sub-cliente
                    <Lock
                      v-if="!canEditFields"
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <div class="relative">
                    <input
                      v-model="subProgramSearch"
                      @input="
                        filterSubPrograms();
                        showSubProgramDropdown = true;
                      "
                      @focus="
                        filterSubPrograms();
                        showSubProgramDropdown = true;
                      "
                      @blur="hideSubProgramDropdown"
                      :disabled="!canEditFields"
                      type="text"
                      placeholder="Buscar sub-cliente..."
                      :class="[
                        'w-full px-4 py-2.5 border rounded-lg transition-all',
                        canEditFields
                          ? 'border-slate-300 focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent'
                          : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed',
                      ]"
                    />
                    <div
                      v-if="
                        showSubProgramDropdown &&
                        filteredSubPrograms.length > 0 &&
                        canEditFields
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div
                        v-for="subProgram in filteredSubPrograms"
                        :key="subProgram.sub_program_name"
                        @mousedown="selectSubProgram(subProgram)"
                        class="px-4 py-2.5 hover:bg-[#50bdeb] hover:text-white cursor-pointer transition-colors border-b border-slate-100 last:border-b-0"
                      >
                        <div class="font-medium">
                          {{ subProgram.sub_program_name }}
                        </div>
                        <div class="text-xs opacity-75">
                          {{ subProgram.program_name_display }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Prioridad
                  </label>
                  <select
                    v-model="editedTicket.priority_name"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                  >
                    <option value="" disabled>Seleccione una prioridad</option>
                    <option
                      v-for="priority in prioritiesList"
                      :key="priority.priority_name"
                      :value="priority.priority_name"
                    >
                      {{ priority.priority_name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Asignado a
                  </label>
                  <div class="relative">
                    <input
                      v-model="assignedToSearch"
                      @input="
                        filterAssignedTo();
                        showAssignedToDropdown = true;
                      "
                      @focus="
                        filterAssignedTo();
                        showAssignedToDropdown = true;
                      "
                      @blur="hideAssignedToDropdown"
                      type="text"
                      placeholder="Buscar usuario..."
                      class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                    />
                    <div
                      v-if="
                        showAssignedToDropdown && filteredAssignedTo.length > 0
                      "
                      class="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      <div
                        v-for="eUser in filteredAssignedTo"
                        :key="eUser.network_user"
                        @mousedown="selectAssignedTo(eUser)"
                        class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                      >
                        <div class="font-semibold text-slate-700">
                          {{ eUser.name }} {{ eUser.middle_name || "" }}
                          {{ eUser.last_name }}
                          {{ eUser.second_last_name || "" }}
                        </div>
                        <div
                          class="text-xs text-slate-500 mt-1 flex items-center gap-3"
                        >
                          <span>{{ eUser.network_user }}</span>
                          <span v-if="eUser.email">• {{ eUser.email }}</span>
                          <span
                            v-if="eUser.rol_name"
                            class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                            >{{ eUser.rol_name }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    Servicio
                    <Lock
                      v-if="!canEditFields"
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <select
                    v-model="editedTicket.service_name"
                    :disabled="!canEditFields"
                    :class="[
                      'w-full px-4 py-2.5 border rounded-lg transition-all',
                      canEditFields
                        ? 'border-slate-300 focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent'
                        : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed',
                    ]"
                  >
                    <option value="" disabled>Seleccione un servicio</option>
                    <option
                      v-for="service in servicesList"
                      :key="service.id_services"
                      :value="service.service_name"
                    >
                      {{ service.service_name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    ANS (Acuerdo de Nivel de Servicio)
                    <Lock
                      v-if="!canEditFields"
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <select
                    v-model="editedTicket.ticket_ans"
                    :disabled="!canEditFields"
                    :class="[
                      'w-full px-4 py-2.5 border rounded-lg transition-all',
                      canEditFields
                        ? 'border-slate-300 focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent'
                        : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed',
                    ]"
                  >
                    <option value="" disabled>Seleccione un ANS</option>
                    <option
                      v-for="ans in ansList"
                      :key="ans.id_ans"
                      :value="ans.id_ans"
                    >
                      {{ ans.ans_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    Fecha Estimada de Cierre
                    <Lock
                      v-if="!canEditEstimatedDate"
                      class="w-4 h-4 text-amber-600"
                      :title="
                        isAnsNumeric
                          ? 'Fecha calculada automáticamente según ANS'
                          : 'Solo editable en estado inicial'
                      "
                    />
                  </label>
                  <input
                    v-model="estimatedClosingDateStr"
                    type="datetime-local"
                    :disabled="!canEditEstimatedDate"
                    :class="[
                      'w-full px-4 py-2.5 border rounded-lg transition-all',
                      canEditEstimatedDate
                        ? 'border-slate-300 focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent'
                        : 'bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed',
                    ]"
                  />
                </div>
                <div
                  v-if="modalAction === 'complete' || modalAction === 'delete'"
                >
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Código de Cierre
                  </label>
                  <select
                    v-model.number="editedTicket.ticket_closing_code"
                    class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all"
                  >
                    <option :value="null" disabled>Seleccione un código</option>
                    <option
                      v-for="closingCode in closingCodesList"
                      :key="closingCode.id_closing_code"
                      :value="closingCode.id_closing_code"
                    >
                      {{ closingCode.closing_code_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="modalAction !== 'view'">
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Reportar Tiempo
                </label>
                <div class="flex gap-2">
                  <div class="flex-1">
                    <div class="relative">
                      <input
                        v-model.number="reportedHours"
                        type="number"
                        min="0"
                        class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all pr-8"
                        placeholder="0"
                      />
                      <span
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500"
                        >H</span
                      >
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="relative">
                      <input
                        v-model.number="reportedMinutes"
                        type="number"
                        min="0"
                        max="59"
                        class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#50bdeb] focus:border-transparent transition-all pr-8"
                        placeholder="0"
                      />
                      <span
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500"
                        >M</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <CommentEditor
                v-if="modalAction !== 'view'"
                v-model="commentText"
                label="Agregar Comentario"
                placeholder="Escribe tu comentario aquí..."
                helper-text="Este comentario será agregado al historial del ticket."
              />
            </div>

            <div v-show="activeTab === 'comments'" class="space-y-4">
              <div v-if="ticketComments.length === 0" class="text-center py-12">
                <div class="text-slate-400 text-lg mb-2">
                  <svg
                    class="w-16 h-16 mx-auto mb-4"
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
                  No hay comentarios aún
                </div>
              </div>
              <div v-else class="space-y-4 max-h-96 overflow-y-auto pr-2">
                <div
                  v-for="comment in ticketComments"
                  :key="comment.id_note"
                  class="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    >
                      {{
                        comment.network_user
                          ? comment.network_user
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                          : "??"
                      }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-semibold text-slate-800">{{
                          comment.network_user || "Usuario desconocido"
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
                              },
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
              <div
                v-if="ticketReportedTimes.length === 0"
                class="text-center py-12"
              >
                <div class="text-slate-400 text-lg mb-2">
                  <svg
                    class="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  No hay tiempo reportado aún
                </div>
              </div>
              <div v-else class="space-y-3 max-h-96 overflow-y-auto pr-2">
                <div
                  v-for="time in ticketReportedTimes"
                  :key="time.id_reported_times"
                  class="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                      >
                        {{
                          time.network_user
                            ? time.network_user
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                            : "??"
                        }}
                      </div>
                      <div>
                        <div class="font-semibold text-slate-800">
                          {{ time.network_user || "Usuario desconocido" }}
                        </div>
                        <div class="text-xs text-slate-500">
                          {{
                            new Date(time.date_reported).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center gap-2">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span class="text-2xl font-bold text-[#021C7D]">
                          {{
                            time.reported_time
                              ? time.reported_time.split(":")[0]
                              : "0"
                          }}h
                          {{
                            time.reported_time
                              ? time.reported_time.split(":")[1]
                              : "0"
                          }}m
                        </span>
                      </div>
                      <div class="text-xs text-slate-500 mt-1">
                        Reportado
                        {{
                          new Date(time.create_at).toLocaleDateString("es-ES", {
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
                    class="flex items-center justify-between bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-lg p-4"
                  >
                    <span class="font-semibold text-lg">Tiempo Total</span>
                    <span class="text-2xl font-bold">
                      {{
                        (ticketReportedTimes.reduce((total, t) => {
                          if (!t.reported_time) return total;
                          const [h, m] = t.reported_time.split(":").map(Number);
                          return total + h * 60 + m;
                        }, 0) /
                          60)
                          | 0
                      }}h
                      {{
                        ticketReportedTimes.reduce((total, t) => {
                          if (!t.reported_time) return total;
                          const [h, m] = t.reported_time.split(":").map(Number);
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

        <div
          class="bg-slate-50 px-6 py-4 rounded-b-2xl border-t border-slate-200 flex gap-3 flex-shrink-0"
        >
          <button
            @click="closeModal"
            :class="modalAction === 'view' ? 'flex-1' : 'flex-1'"
            class="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors"
          >
            {{ modalAction === "view" ? "Cerrar" : "Cancelar" }}
          </button>
          <button
            v-if="modalAction !== 'view'"
            @click="confirmAction"
            class="flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors"
            :class="
              modalAction === 'delete'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : modalAction === 'complete'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white'
            "
          >
            {{
              modalAction === "delete"
                ? "Denegar"
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
import { ref, computed, onMounted, watch } from "vue";
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
  Lock,
} from "lucide-vue-next";
import type {
  TicketShort,
  Note,
  ANS,
  Service,
  Status,
  Ticket,
  SubProgram,
  EUser,
  TicketPriority,
  TicketUpdate,
  ClosingCode,
} from "../models";
import { RequestTypeService } from "../services/RequestTypeService";
import { TicketsService } from "../services/ticketsService";
import type { UserInfo } from "../models/login";
import { SessionStorageService } from "../services/SessionStorageService";
import { useNotification } from "../utils/useNotification";
import { NotesService } from "../services/notesService";
import { ClientsService } from "../services/clientsService";
import { StatusService } from "../services/statusService";
import { AnsService } from "../services/ansService";
import { ReportedTimeService } from "../services/reportedTimeService";
import { FileUploadService } from "../services/fileUploadService";
import { SubProgramsService } from "../services/subProgramsService";
import { eUsersService } from "../services/e-usersService";
import { TicketPriorityService } from "../services/ticketPriorityService";
import { ClosingCodeService } from "../services/closingCode";
import { ProjectDateService } from "../services/projectDateService";

const clientsService = new ClientsService();
const notification = useNotification();
const ansService = new AnsService();
const reportedTimeService = new ReportedTimeService();
const fileUploadService = new FileUploadService();
const requestTypeService = new RequestTypeService();
const subProgramsService = new SubProgramsService();
const eUsersServices = new eUsersService();
const ticketPriorityService = new TicketPriorityService();
const closingCodeService = new ClosingCodeService();
const projectDateService = new ProjectDateService();
const searchQuery = ref("");
const isDeletingZone = ref(false);
const isCompletingZone = ref(false);
const draggedTicket = ref<TicketShort | null>(null);
const showModal = ref(false);
const notesService = new NotesService();
const modalAction = ref<"move" | "delete" | "complete" | "view">("move");
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
const subProgramSearch = ref("");
const showSubProgramDropdown = ref(false);
const filteredSubPrograms = ref<SubProgram[]>([]);
const assignedToSearch = ref("");
const showAssignedToDropdown = ref(false);
const filteredAssignedTo = ref<EUser[]>([]);
const commentText = ref("");
const reportedHours = ref(0);
const reportedMinutes = ref(0);
const activeTab = ref<"details" | "comments" | "time">("details");
const ticketComments = ref<Note[]>([]);
const fullTicket = ref<Ticket | null>(null);

const attachedFiles = computed(() => {
  if (!fullTicket.value || !fullTicket.value.ticket_attachments) return [];
  return fullTicket.value.ticket_attachments
    .split(",")
    .map((file) => file.trim())
    .filter((file) => file.length > 0);
});

const getFileTypeConfig = (filename: string) => {
  const extension = filename
    .substring(filename.lastIndexOf(".") + 1)
    .toLowerCase();

  const configs: Record<
    string,
    { icon: string; color: string; bgColor: string; label: string }
  > = {
    pdf: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 12h8 M8 16h8",
      color: "text-red-600",
      bgColor: "bg-red-50",
      label: "PDF",
    },
    doc: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 12h8 M8 16h5",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      label: "DOC",
    },
    docx: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 12h8 M8 16h5",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      label: "DOCX",
    },
    xls: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 10h8 M8 14h8 M8 18h8",
      color: "text-green-600",
      bgColor: "bg-green-50",
      label: "XLS",
    },
    xlsx: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 10h8 M8 14h8 M8 18h8",
      color: "text-green-600",
      bgColor: "bg-green-50",
      label: "XLSX",
    },
    csv: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 10h8 M8 14h8 M8 18h8",
      color: "text-green-600",
      bgColor: "bg-green-50",
      label: "CSV",
    },
    txt: {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z M8 12h8 M8 16h8",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      label: "TXT",
    },
    jpg: {
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      label: "JPG",
    },
    jpeg: {
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      label: "JPEG",
    },
    png: {
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      label: "PNG",
    },
    zip: {
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      label: "ZIP",
    },
    rar: {
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      label: "RAR",
    },
  };

  return (
    configs[extension] || {
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z",
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      label: "FILE",
    }
  );
};

const downloadFile = async (filename: string) => {
  try {
    const result = await fileUploadService.downloadFile(filename);
    if (!result.success) {
      notification.error(
        "Error",
        result.message || "No se pudo descargar el archivo",
      );
    }
  } catch (error) {
    notification.error("Error", "Ocurrió un error al descargar el archivo");
  }
};

const ticketReportedTimes = ref<any[]>([]);
const servicesList = ref<Service[]>([]);
const ansList = ref<ANS[]>([]);
const subProgramsList = ref<SubProgram[]>([]);
const eUsersList = ref<EUser[]>([]);
const prioritiesList = ref<TicketPriority[]>([]);
const closingCodesList = ref<ClosingCode[]>([]);
const modalDataLoaded = ref(false);

const estimatedClosingDateStr = computed({
  get: () => {
    if (!editedTicket.value.estimated_closing_date) return "";
    const date = new Date(editedTicket.value.estimated_closing_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },
  set: (value: string) => {
    if (!value) {
      editedTicket.value.estimated_closing_date = null;
      return;
    }
    const date = new Date(value);
    editedTicket.value.estimated_closing_date = date.toISOString();
  },
});

const isFirstState = computed(() => {
  if (!editedTicket.value.status_name) return true;
  const currentStatus = Array.from(statusIdMap.value.values()).find(
    (status) => status.status_name === editedTicket.value.status_name,
  );

  return currentStatus ? currentStatus.ordering === 1 : true;
});

const wasOriginallyInFirstState = computed(() => {
  if (!draggedTicket.value?.status_name) return true;
  const originalStatus = Array.from(statusIdMap.value.values()).find(
    (status) => status.status_name === draggedTicket.value!.status_name,
  );

  return originalStatus ? originalStatus.ordering === 1 : true;
});

const canEditFields = computed(() => {
  if (modalAction.value === "view") return false;

  return wasOriginallyInFirstState.value;
});

const isAnsNumeric = computed(() => {
  if (!editedTicket.value.ticket_ans) return false;
  const currentAns = ansList.value.find(
    (ans) => ans.id_ans === editedTicket.value.ticket_ans,
  );
  if (!currentAns) return false;
  const ansName = currentAns.ans_name;
  return /^\d+$/.test(ansName);
});

const canEditEstimatedDate = computed(() => {
  return isFirstState.value && !isAnsNumeric.value;
});

const TicketsShort = ref<TicketShort[]>([]);
CurrentUserInfo;

const loadTickets = async () => {
  if (CurrentUserInfo.username === "") {
    return;
  }
  try {
    const response = await TicketService.GetTicketsByPerson(
      CurrentUserInfo.username,
    );
    if (response.data && response.data.results) {
      TicketsShort.value = response.data.results.flat();
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los tickets");
  }
};

const loadColumsByStatus = async () => {
  try {
    const statusRes = await statusService.getAll();
    if (statusRes.success && statusRes.data?.results) {
      const statuses = statusRes.data.results as Status[];
      const boardStatuses = statuses
        .filter(
          (status) =>
            !status.is_backlog &&
            status.ordering !== null &&
            status.ordering !== undefined,
        )
        .sort((a, b) => a.ordering - b.ordering);

      statusIdMap.value.clear();
      statuses.forEach((status) => {
        statusIdMap.value.set(status.id_status, status);
      });

      columns.value = boardStatuses.map((status, index) => ({
        title: status.status_name,
        status: status.id_status.toString(),
        color: columnColors[index % columnColors.length].color,
        bgClass: columnColors[index % columnColors.length].bgClass,
        statusId: status.id_status,
      }));
    }
  } catch (error) {
    notification.error(
      "Error",
      "No se pudieron cargar los estados del tablero",
    );
  }
};

const loadAns = async () => {
  try {
    const response = await ansService.getAll();
    if (response.data && response.data.results) {
      ansList.value = response.data.results;
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los ANS");
  }
};

const loadServices = async () => {
  try {
    const response = await requestTypeService.getAll();
    if (response.success && response.data) {
      servicesList.value = response.data.results;
    }
  } catch (err) {
    notification.error("Error", "No se pudieron cargar los servicios");
  }
};

const loadSubPrograms = async () => {
  try {
    const response = await subProgramsService.getAll();
    if (response.success && response.data?.results) {
      subProgramsList.value = response.data.results;
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los subprogramas");
  }
};

const loadEUsers = async () => {
  try {
    const response = await eUsersServices.getAll();
    if (response.success && response.data?.results) {
      eUsersList.value = response.data.results;
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los usuarios");
  }
};

const loadPriorities = async () => {
  try {
    const response = await ticketPriorityService.getAll();
    if (response.success && response.data?.results) {
      prioritiesList.value = response.data.results;
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar las prioridades");
  }
};

const loadClosingCodes = async () => {
  try {
    const response = await closingCodeService.getAll();
    if (response.success && response.data?.results) {
      closingCodesList.value = response.data.results;
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los códigos de cierre");
  }
};

const loadModalData = async () => {
  if (modalDataLoaded.value) return;

  try {
    await Promise.all([
      loadServices(),
      loadSubPrograms(),
      loadEUsers(),
      loadPriorities(),
      loadClosingCodes(),
    ]);
    modalDataLoaded.value = true;
  } catch (error) {
    notification.error(
      "Error",
      "No se pudieron cargar los datos necesarios para la edición del ticket",
    );
  }
};

const calculateEstimatedDateIfNeeded = async () => {
  if (!isAnsNumeric.value || !fullTicket.value) return;

  const currentAns = ansList.value.find(
    (ans) => ans.id_ans === editedTicket.value.ticket_ans,
  );

  if (!currentAns) return;

  try {
    const ansHours = parseInt(currentAns.ans_name);
    const dateCreation = fullTicket.value.create_at.split(".")[0];

    const projectDateResponse = await projectDateService.findProjectDate(
      ansHours,
      dateCreation,
    );

    if (projectDateResponse.success && projectDateResponse.data) {
      editedTicket.value.estimated_closing_date =
        projectDateResponse.data.response;
    }
  } catch (error) {
    notification.error(
      "Error",
      "No se pudo calcular la fecha estimada de cierre",
    );
  }
};

watch(
  () => editedTicket.value.ticket_ans,
  async (newAns, oldAns) => {
    if (newAns !== oldAns && fullTicket.value) {
      if (isAnsNumeric.value) {
        await calculateEstimatedDateIfNeeded();
      } else {
        if (!fullTicket.value.estimated_closing_date) {
          editedTicket.value.estimated_closing_date = null;
        }
      }
    }
  },
);

const columns = ref<
  {
    title: string;
    status: string;
    color: string;
    bgClass: string;
    statusId: number;
  }[]
>([]);

const statusIdMap = ref<Map<number, Status>>(new Map());

const columnColors = [
  { color: "bg-purple-500", bgClass: "bg-purple-50/30" },
  { color: "bg-blue-500", bgClass: "bg-blue-50/30" },
  { color: "bg-cyan-500", bgClass: "bg-cyan-50/30" },
  { color: "bg-amber-500", bgClass: "bg-amber-50/30" },
  { color: "bg-green-500", bgClass: "bg-green-50/30" },
  { color: "bg-pink-500", bgClass: "bg-pink-50/30" },
  { color: "bg-indigo-500", bgClass: "bg-indigo-50/30" },
  { color: "bg-red-500", bgClass: "bg-red-50/30" },
];

onMounted(() => {
  loadColumsByStatus();
  loadTickets();
  loadAns();
});

const ticketsByStatus = computed(() => {
  const result: Record<string, TicketShort[]> = {};
  columns.value.forEach((column) => {
    result[column.status] = [];
  });

  TicketsShort.value.forEach((ticket) => {
    const matchingStatus = Array.from(statusIdMap.value.values()).find(
      (status) =>
        status.status_name.toLowerCase().trim() ===
        ticket.status_name?.toLowerCase().trim(),
    );

    if (matchingStatus) {
      const columnKey = matchingStatus.id_status.toString();
      if (result[columnKey]) {
        const enrichedTicket = { ...ticket };
        const ans = ansList.value.find((a) => a.id_ans === ticket.ticket_ans);
        if (ans) {
          enrichedTicket.ticket_ans = ans.ans_name as any;
        }

        result[columnKey].push(enrichedTicket);
      }
    }
  });

  return result;
});

const handleDragStart = (event: DragEvent, ticket: TicketShort) => {
  draggedTicket.value = ticket;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", "");
  }
};

const handleDragEnd = () => {
  isDeletingZone.value = false;
  isCompletingZone.value = false;
};

const handleDragEnter = (_statusId: number) => {};

const handleDragLeave = (_statusId: number) => {};

const handleDrop = async (event: DragEvent, newStatusId: number) => {
  event.preventDefault();
  if (!draggedTicket.value) return;

  const newStatus = statusIdMap.value.get(newStatusId);
  if (!newStatus) {
    notification.error("Error", "Estado no encontrado");
    return;
  }

  const oldStatusName = draggedTicket.value.status_name;
  const newStatusName = newStatus.status_name;

  if (oldStatusName !== newStatusName) {
    await loadModalData();

    try {
      const response = await TicketService.getTicketById(
        draggedTicket.value.id_ticket,
      );
      if (response.success && response.data) {
        fullTicket.value = response.data;

        editedTicket.value = {
          id_ticket: fullTicket.value.id_ticket,
          ticket_title: fullTicket.value.ticket_title,
          ticket_description: fullTicket.value.ticket_description,
          ticket_attachments: fullTicket.value.ticket_attachments,
          service_name: fullTicket.value.service?.service_name || "",
          priority_name: fullTicket.value.priority?.priority_name || "Media",
          ticket_closing_code: fullTicket.value.ticket_closing_code,
          ticket_ans: fullTicket.value.ticket_ans,
          reporter_user_name: fullTicket.value.reporter_user || "",
          create_at: fullTicket.value.create_at,
          update_at: fullTicket.value.update_at || "",
          assigned_to: fullTicket.value.assigned_to,
          closing_date: fullTicket.value.closing_date,
          estimated_closing_date: fullTicket.value.estimated_closing_date,
          status_name: newStatusName,
          sub_program_name:
            fullTicket.value.sub_program?.sub_program_name || "",
        };

        subProgramSearch.value =
          editedTicket.value.sub_program_name || "No encontrado";

        if (fullTicket.value && fullTicket.value.assigned_to) {
          const assignedUser = eUsersList.value.find(
            (u) => u.network_user === fullTicket.value!.assigned_to,
          );
          if (assignedUser) {
            assignedToSearch.value =
              `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
                .trim()
                .replace(/\s+/g, " ");
          }
        }

        if (fullTicket.value.notes && fullTicket.value.notes.length > 0) {
          ticketComments.value = fullTicket.value.notes;
        } else {
          ticketComments.value = [];
        }

        if (
          fullTicket.value.reported_times &&
          fullTicket.value.reported_times.length > 0
        ) {
          ticketReportedTimes.value = fullTicket.value.reported_times;
        } else {
          ticketReportedTimes.value = [];
        }

        targetStatus.value = newStatusId;
        modalAction.value = "move";
        activeTab.value = "details";

        if (!editedTicket.value.estimated_closing_date) {
          await calculateEstimatedDateIfNeeded();
        }

        showModal.value = true;
      }
    } catch (error) {
      notification.error(
        "Error",
        "No se pudo cargar la información del ticket",
      );
    }
  }
};

const handleDropToDelete = async (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;
  const denyStatus = Array.from(statusIdMap.value.values()).find(
    (status) =>
      (status.ordering === null || status.ordering === undefined) &&
      status.is_completion === false &&
      status.is_backlog === false,
  );

  if (!denyStatus) {
    notification.error(
      "Error",
      "No se encontró un estado de denegación configurado en el sistema",
    );
    isDeletingZone.value = false;
    return;
  }

  await loadModalData();

  try {
    const response = await TicketService.getTicketById(
      draggedTicket.value.id_ticket,
    );
    if (response.success && response.data) {
      fullTicket.value = response.data;

      editedTicket.value = {
        id_ticket: fullTicket.value.id_ticket,
        ticket_title: fullTicket.value.ticket_title,
        ticket_description: fullTicket.value.ticket_description,
        ticket_attachments: fullTicket.value.ticket_attachments,
        service_name: fullTicket.value.service?.service_name || "",
        priority_name: fullTicket.value.priority?.priority_name || "Media",
        ticket_closing_code: fullTicket.value.ticket_closing_code,
        ticket_ans: fullTicket.value.ticket_ans,
        reporter_user_name: fullTicket.value.reporter_user || "",
        create_at: fullTicket.value.create_at,
        update_at: fullTicket.value.update_at || "",
        assigned_to: fullTicket.value.assigned_to,
        closing_date: fullTicket.value.closing_date,
        estimated_closing_date: fullTicket.value.estimated_closing_date,
        status_name: denyStatus.status_name,
        sub_program_name: fullTicket.value.sub_program?.sub_program_name || "",
      };

      subProgramSearch.value =
        editedTicket.value.sub_program_name || "No encontrado";

      if (fullTicket.value && fullTicket.value.assigned_to) {
        const assignedUser = eUsersList.value.find(
          (u) => u.network_user === fullTicket.value!.assigned_to,
        );
        if (assignedUser) {
          assignedToSearch.value =
            `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
              .trim()
              .replace(/\s+/g, " ");
        }
      }

      if (fullTicket.value.notes && fullTicket.value.notes.length > 0) {
        ticketComments.value = fullTicket.value.notes;
      } else {
        ticketComments.value = [];
      }

      if (
        fullTicket.value.reported_times &&
        fullTicket.value.reported_times.length > 0
      ) {
        ticketReportedTimes.value = fullTicket.value.reported_times;
      } else {
        ticketReportedTimes.value = [];
      }

      targetStatus.value = denyStatus.id_status;
      modalAction.value = "delete";
      activeTab.value = "details";

      if (!editedTicket.value.estimated_closing_date) {
        await calculateEstimatedDateIfNeeded();
      }

      showModal.value = true;
      isDeletingZone.value = false;
    }
  } catch (error) {
    notification.error("Error", "No se pudo cargar la información del ticket");
  }
};

const handleDropToComplete = async (event: DragEvent) => {
  event.preventDefault();
  if (!draggedTicket.value) return;

  const completionStatus = Array.from(statusIdMap.value.values()).find(
    (status) => status.is_completion === true,
  );

  if (!completionStatus) {
    notification.error(
      "Error",
      "No se encontró un estado de completado configurado en el sistema",
    );
    isCompletingZone.value = false;
    return;
  }

  await loadModalData();

  try {
    const response = await TicketService.getTicketById(
      draggedTicket.value.id_ticket,
    );
    if (response.success && response.data) {
      fullTicket.value = response.data;

      editedTicket.value = {
        id_ticket: fullTicket.value.id_ticket,
        ticket_title: fullTicket.value.ticket_title,
        ticket_description: fullTicket.value.ticket_description,
        ticket_attachments: fullTicket.value.ticket_attachments,
        service_name: fullTicket.value.service?.service_name || "",
        priority_name: fullTicket.value.priority?.priority_name || "Media",
        ticket_closing_code: fullTicket.value.ticket_closing_code,
        ticket_ans: fullTicket.value.ticket_ans,
        reporter_user_name: fullTicket.value.reporter_user || "",
        create_at: fullTicket.value.create_at,
        update_at: fullTicket.value.update_at || "",
        assigned_to: fullTicket.value.assigned_to,
        closing_date: fullTicket.value.closing_date,
        estimated_closing_date: fullTicket.value.estimated_closing_date,
        status_name: completionStatus.status_name,
        sub_program_name: fullTicket.value.sub_program?.sub_program_name || "",
      };

      subProgramSearch.value =
        editedTicket.value.sub_program_name || "No encontrado";

      if (fullTicket.value && fullTicket.value.assigned_to) {
        const assignedUser = eUsersList.value.find(
          (u) => u.network_user === fullTicket.value!.assigned_to,
        );
        if (assignedUser) {
          assignedToSearch.value =
            `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
              .trim()
              .replace(/\s+/g, " ");
        }
      }

      if (fullTicket.value.notes && fullTicket.value.notes.length > 0) {
        ticketComments.value = fullTicket.value.notes;
      } else {
        ticketComments.value = [];
      }

      if (
        fullTicket.value.reported_times &&
        fullTicket.value.reported_times.length > 0
      ) {
        ticketReportedTimes.value = fullTicket.value.reported_times;
      } else {
        ticketReportedTimes.value = [];
      }

      targetStatus.value = completionStatus.id_status;
      modalAction.value = "complete";
      activeTab.value = "details";

      if (!editedTicket.value.estimated_closing_date) {
        await calculateEstimatedDateIfNeeded();
      }

      showModal.value = true;
      isCompletingZone.value = false;
    }
  } catch (error) {
    notification.error("Error", "No se pudo cargar la información del ticket");
  }
};

const confirmAction = async () => {
  if (!draggedTicket.value) {
    return;
  }

  if (modalAction.value === "move") {
    const missingFields: string[] = [];

    if (
      !editedTicket.value.service_name ||
      editedTicket.value.service_name.trim() === ""
    ) {
      missingFields.push("Servicio");
    }

    if (!editedTicket.value.estimated_closing_date && !isAnsNumeric.value) {
      missingFields.push("Fecha Estimada de Cierre");
    }

    if (
      !editedTicket.value.assigned_to ||
      editedTicket.value.assigned_to.trim() === ""
    ) {
      missingFields.push("Asignado a");
    }
    if (
      !editedTicket.value.priority_name ||
      editedTicket.value.priority_name.trim() === ""
    ) {
      missingFields.push("Prioridad");
    }

    if (missingFields.length > 0) {
      notification.warning(
        "Campos incompletos",
        `Debes completar los siguientes campos antes de cambiar el estado: ${missingFields.join(", ")}`,
      );
      activeTab.value = "details";
      return;
    }
  }

  try {
    if (modalAction.value === "delete") {
      if (commentText.value.trim().length === 0) {
        notification.warning(
          "Comentario requerido",
          "Debes agregar un comentario antes de denegar el ticket",
        );
        activeTab.value = "details";
        return;
      }

      if (!editedTicket.value.ticket_closing_code) {
        notification.warning(
          "Código de cierre requerido",
          "Debes seleccionar un código de cierre",
        );
        activeTab.value = "details";
        return;
      }

      if (!targetStatus.value) {
        notification.error(
          "Error",
          "No se pudo identificar el estado de denegación",
        );
        return;
      }

      const response = await TicketService.updateTicketStatus(
        draggedTicket.value.id_ticket,
        targetStatus.value,
      );

      if (response.success) {
        if (reportedHours.value > 0 || reportedMinutes.value > 0) {
          try {
            const totalMinutes =
              reportedHours.value * 60 + reportedMinutes.value;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const reportedTimeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

            await reportedTimeService.createReportedTime({
              date_reported: new Date().toISOString().split("T")[0],
              id_ticket: draggedTicket.value.id_ticket,
              network_user: CurrentUserInfo.username,
              reported_time: reportedTimeStr,
            });
          } catch (error) {
            notification.error(
              "Advertencia",
              "El ticket se denegó pero no se pudo guardar el tiempo reportado",
            );
          }
        }

        try {
          await notesService.createNote({
            note: commentText.value.trim(),
            visible_to_client: false,
            id_ticket: draggedTicket.value.id_ticket,
            network_user: CurrentUserInfo.username,
          });
        } catch (error) {
          notification.error(
            "Advertencia",
            "El ticket se denegó pero no se pudo guardar el comentario",
          );
        }

        const index = TicketsShort.value.findIndex(
          (t) => t.id_ticket === draggedTicket.value!.id_ticket,
        );
        if (index !== -1) {
          TicketsShort.value.splice(index, 1);
        }
        notification.success("Éxito", "Ticket denegado correctamente");
      } else {
        notification.error("Error", "No se pudo denegar el ticket");
      }
    } else if (modalAction.value === "complete") {
      if (commentText.value.trim().length === 0) {
        notification.warning(
          "Comentario requerido",
          "Debes agregar un comentario antes de completar el ticket",
        );
        activeTab.value = "details";
        return;
      }

      if (!editedTicket.value.ticket_closing_code) {
        notification.warning(
          "Código de cierre requerido",
          "Debes seleccionar un código de cierre",
        );
        activeTab.value = "details";
        return;
      }

      if (!targetStatus.value) {
        notification.error(
          "Error",
          "No se pudo identificar el estado de completado",
        );
        return;
      }

      const response = await TicketService.updateTicketStatus(
        draggedTicket.value.id_ticket,
        targetStatus.value,
      );

      if (response.success) {
        if (reportedHours.value > 0 || reportedMinutes.value > 0) {
          try {
            const totalMinutes =
              reportedHours.value * 60 + reportedMinutes.value;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const reportedTimeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

            await reportedTimeService.createReportedTime({
              date_reported: new Date().toISOString().split("T")[0],
              id_ticket: draggedTicket.value.id_ticket,
              network_user: CurrentUserInfo.username,
              reported_time: reportedTimeStr,
            });
          } catch (error) {
            notification.error(
              "Advertencia",
              "El ticket se completó pero no se pudo guardar el tiempo reportado",
            );
          }
        }

        try {
          await notesService.createNote({
            note: commentText.value.trim(),
            visible_to_client: false,
            id_ticket: draggedTicket.value.id_ticket,
            network_user: CurrentUserInfo.username,
          });
        } catch (error) {
          notification.error(
            "Advertencia",
            "El ticket se completó pero no se pudo guardar el comentario",
          );
        }
        const index = TicketsShort.value.findIndex(
          (t) => t.id_ticket === draggedTicket.value!.id_ticket,
        );
        if (index !== -1) {
          TicketsShort.value.splice(index, 1);
        }
        notification.success("Éxito", "Ticket completado correctamente");
      } else {
        notification.error("Error", "No se pudo completar el ticket");
      }
    } else if (modalAction.value === "move") {
      if (commentText.value.trim().length === 0) {
        notification.warning(
          "Comentario requerido",
          "Debes agregar un comentario antes de cambiar el estado del ticket",
        );
        activeTab.value = "details";
        return;
      }

      const selectedStatus = Array.from(statusIdMap.value.values()).find(
        (status) => status.status_name === editedTicket.value.status_name,
      );

      if (!selectedStatus) {
        notification.error("Error", "Estado seleccionado no válido");
        return;
      }

      const statusIdToUpdate = selectedStatus.id_status;

      const currentStatus = Array.from(statusIdMap.value.values()).find(
        (status) => status.status_name === draggedTicket.value!.status_name,
      );

      const wasInFirstState = currentStatus
        ? currentStatus.ordering === 1
        : false;

      if (wasInFirstState) {
        const updateData: TicketUpdate = {};

        if (editedTicket.value.service_name) {
          const service = servicesList.value.find(
            (s) => s.service_name === editedTicket.value.service_name,
          );
          if (service) {
            updateData.ticket_service = service.id_services;
          }
        }

        if (editedTicket.value.sub_program_name) {
          updateData.sub_program_name = editedTicket.value.sub_program_name;
        }

        if (editedTicket.value.ticket_ans != null) {
          updateData.ticket_ans =
            typeof editedTicket.value.ticket_ans === "number"
              ? editedTicket.value.ticket_ans
              : Number(editedTicket.value.ticket_ans);
        }

        if (editedTicket.value.priority_name) {
          updateData.ticket_priority = editedTicket.value.priority_name;
        }

        if (editedTicket.value.assigned_to) {
          updateData.assigned_to = editedTicket.value.assigned_to;
        }

        if (editedTicket.value.estimated_closing_date) {
          updateData.estimated_closing_date =
            editedTicket.value.estimated_closing_date;
        }

        const updateResponse = await TicketService.updateTicket(
          draggedTicket.value.id_ticket,
          updateData,
        );

        if (!updateResponse.success) {
          notification.error(
            "Error",
            "No se pudieron actualizar los campos del ticket",
          );
          return;
        }
      }

      const response = await TicketService.updateTicketStatus(
        draggedTicket.value.id_ticket,
        statusIdToUpdate,
      );

      if (response.success) {
        const isNoLongerAssignedToMe =
          editedTicket.value.assigned_to &&
          editedTicket.value.assigned_to !== CurrentUserInfo.username;

        if (isNoLongerAssignedToMe) {
          const index = TicketsShort.value.findIndex(
            (t) => t.id_ticket === draggedTicket.value!.id_ticket,
          );
          if (index !== -1) {
            TicketsShort.value.splice(index, 1);
          }
        } else {
          const ticket = TicketsShort.value.find(
            (t) => t.id_ticket === draggedTicket.value!.id_ticket,
          );
          if (ticket) {
            Object.assign(ticket, editedTicket.value);
            ticket.update_at = new Date().toISOString();
          }
        }

        if (reportedHours.value > 0 || reportedMinutes.value > 0) {
          try {
            const totalMinutes =
              reportedHours.value * 60 + reportedMinutes.value;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            const reportedTimeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

            await reportedTimeService.createReportedTime({
              date_reported: new Date().toISOString().split("T")[0],
              id_ticket: draggedTicket.value.id_ticket,
              network_user: CurrentUserInfo.username,
              reported_time: reportedTimeStr,
            });
          } catch (error) {
            notification.error(
              "Advertencia",
              "El ticket se actualizó pero no se pudo guardar el tiempo reportado",
            );
          }
        }

        if (commentText.value.trim().length > 0) {
          try {
            await notesService.createNote({
              note: commentText.value.trim(),
              visible_to_client: false,
              id_ticket: draggedTicket.value.id_ticket,
              network_user: CurrentUserInfo.username,
            });
          } catch (error) {
            notification.error(
              "Advertencia",
              "El ticket se actualizó pero no se pudo guardar el comentario",
            );
          }
        }

        if (
          reportedHours.value > 0 ||
          reportedMinutes.value > 0 ||
          commentText.value.trim().length > 0
        ) {
          try {
            const ticketResponse = await TicketService.getTicketById(
              draggedTicket.value.id_ticket,
            );
            if (ticketResponse.success && ticketResponse.data) {
              fullTicket.value = ticketResponse.data;
              if (fullTicket.value.notes) {
                ticketComments.value = fullTicket.value.notes;
              }
              if (fullTicket.value.reported_times) {
                ticketReportedTimes.value = fullTicket.value.reported_times;
              }
            }
          } catch (error) {
            notification.error(
              "Advertencia",
              "El ticket se actualizó pero no se pudieron recargar los datos recientes",
            );
          }
        }

        notification.success(
          "Éxito",
          "Estado del ticket actualizado correctamente",
        );
      } else {
        notification.error(
          "Error",
          "No se pudo actualizar el estado del ticket",
        );
      }
    }

    closeModal();
  } catch (error) {
    notification.error(
      "Error",
      "Ocurrió un error al procesar la acción del ticket",
    );
  }
};

const closeModal = () => {
  showModal.value = false;
  draggedTicket.value = null;
  fullTicket.value = null;
  targetStatus.value = null;
  modalAction.value = "move";
  clientSearch.value = "";
  showClientDropdown.value = false;
  subProgramSearch.value = "";
  showSubProgramDropdown.value = false;
  assignedToSearch.value = "";
  showAssignedToDropdown.value = false;
  activeTab.value = "details";
  commentText.value = "";
  reportedHours.value = 0;
  reportedMinutes.value = 0;
};

const filterSubPrograms = () => {
  const search = subProgramSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredSubPrograms.value = subProgramsList.value;
  } else {
    filteredSubPrograms.value = subProgramsList.value.filter((subProgram) =>
      subProgram.sub_program_name.toLowerCase().includes(search),
    );
  }
};

const selectSubProgram = (subProgram: SubProgram) => {
  editedTicket.value.sub_program_name = subProgram.sub_program_name;
  subProgramSearch.value = subProgram.sub_program_name;
  showSubProgramDropdown.value = false;
};

const hideSubProgramDropdown = () => {
  setTimeout(() => {
    showSubProgramDropdown.value = false;
  }, 200);
};

const filterAssignedTo = () => {
  const search = assignedToSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredAssignedTo.value = eUsersList.value;
  } else {
    filteredAssignedTo.value = eUsersList.value.filter((eUser) => {
      const fullName =
        `${eUser.name} ${eUser.middle_name || ""} ${eUser.last_name} ${eUser.second_last_name || ""}`.toLowerCase();
      const networkUser = eUser.network_user.toLowerCase();
      const email = (eUser.email || "").toLowerCase();
      return (
        fullName.includes(search) ||
        networkUser.includes(search) ||
        email.includes(search)
      );
    });
  }
};

const selectAssignedTo = (eUser: EUser) => {
  editedTicket.value.assigned_to = eUser.network_user;
  assignedToSearch.value =
    `${eUser.name} ${eUser.middle_name || ""} ${eUser.last_name} ${eUser.second_last_name || ""}`
      .trim()
      .replace(/\s+/g, " ");
  showAssignedToDropdown.value = false;
};

const hideAssignedToDropdown = () => {
  setTimeout(() => {
    showAssignedToDropdown.value = false;
  }, 200);
};

const searchTicketById = async () => {
  const ticketId = parseInt(searchQuery.value.trim());

  if (isNaN(ticketId) || ticketId <= 0) {
    notification.warning(
      "ID inválido",
      "Por favor ingresa un número de ticket válido",
    );
    return;
  }

  try {
    await loadModalData();

    const response = await TicketService.getTicketById(ticketId);
    if (response.success && response.data) {
      fullTicket.value = response.data;

      draggedTicket.value = {
        id_ticket: fullTicket.value.id_ticket,
        ticket_title: fullTicket.value.ticket_title,
        ticket_description: fullTicket.value.ticket_description,
        ticket_attachments: fullTicket.value.ticket_attachments,
        service_name: fullTicket.value.service?.service_name || "",
        priority_name: fullTicket.value.priority?.priority_name || "Media",
        ticket_closing_code: fullTicket.value.ticket_closing_code,
        ticket_ans: fullTicket.value.ticket_ans,
        reporter_user_name: fullTicket.value.reporter_user || "",
        create_at: fullTicket.value.create_at,
        update_at: fullTicket.value.update_at || "",
        assigned_to: fullTicket.value.assigned_to,
        closing_date: fullTicket.value.closing_date,
        estimated_closing_date: fullTicket.value.estimated_closing_date,
        status_name: fullTicket.value.status?.status_name || "Nuevo",
        sub_program_name: fullTicket.value.sub_program?.sub_program_name || "",
      };

      editedTicket.value = { ...draggedTicket.value };

      subProgramSearch.value =
        editedTicket.value.sub_program_name || "No encontrado";

      if (fullTicket.value && fullTicket.value.assigned_to) {
        const assignedUser = eUsersList.value.find(
          (u) => u.network_user === fullTicket.value!.assigned_to,
        );
        if (assignedUser) {
          assignedToSearch.value =
            `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
              .trim()
              .replace(/\s+/g, " ");
        }
      }

      if (fullTicket.value.notes && fullTicket.value.notes.length > 0) {
        ticketComments.value = fullTicket.value.notes;
      } else {
        ticketComments.value = [];
      }

      if (
        fullTicket.value.reported_times &&
        fullTicket.value.reported_times.length > 0
      ) {
        ticketReportedTimes.value = fullTicket.value.reported_times;
      } else {
        ticketReportedTimes.value = [];
      }

      modalAction.value = "view";
      activeTab.value = "details";
      showModal.value = true;

      searchQuery.value = "";
    } else {
      notification.error(
        "Ticket no encontrado",
        `No se encontró un ticket con el ID ${ticketId}`,
      );
    }
  } catch (error) {
    notification.error("Error", "Ocurrió un error al buscar el ticket");
  }
};

const openTicketModal = async (ticket: TicketShort) => {
  await loadModalData();

  draggedTicket.value = ticket;
  modalAction.value = "move";
  activeTab.value = "details";

  try {
    const response = await TicketService.getTicketById(ticket.id_ticket);
    if (response.success && response.data) {
      fullTicket.value = response.data;

      editedTicket.value = {
        id_ticket: fullTicket.value.id_ticket,
        ticket_title: fullTicket.value.ticket_title,
        ticket_description: fullTicket.value.ticket_description,
        ticket_attachments: fullTicket.value.ticket_attachments,
        service_name: fullTicket.value.service?.service_name || "",
        priority_name: fullTicket.value.priority?.priority_name || "Media",
        ticket_closing_code: fullTicket.value.ticket_closing_code,
        ticket_ans: fullTicket.value.ticket_ans,
        reporter_user_name: fullTicket.value.reporter_user || "",
        create_at: fullTicket.value.create_at,
        update_at: fullTicket.value.update_at || "",
        assigned_to: fullTicket.value.assigned_to,
        closing_date: fullTicket.value.closing_date,
        estimated_closing_date: fullTicket.value.estimated_closing_date,
        status_name: fullTicket.value.status?.status_name || "Nuevo",
        sub_program_name: fullTicket.value.sub_program?.sub_program_name || "",
      };

      subProgramSearch.value =
        editedTicket.value.sub_program_name || "No encontrado";

      if (fullTicket.value && fullTicket.value.assigned_to) {
        const assignedUser = eUsersList.value.find(
          (u) => u.network_user === fullTicket.value!.assigned_to,
        );
        if (assignedUser) {
          assignedToSearch.value =
            `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
              .trim()
              .replace(/\s+/g, " ");
        }
      }

      if (fullTicket.value.notes && fullTicket.value.notes.length > 0) {
        ticketComments.value = fullTicket.value.notes;
      } else {
        ticketComments.value = [];
      }

      if (
        fullTicket.value.reported_times &&
        fullTicket.value.reported_times.length > 0
      ) {
        ticketReportedTimes.value = fullTicket.value.reported_times;
      } else {
        ticketReportedTimes.value = [];
      }

      if (!editedTicket.value.estimated_closing_date) {
        await calculateEstimatedDateIfNeeded();
      }

      showModal.value = true;
    } else {
      notification.error(
        "Error",
        "No se pudo cargar la información del ticket",
      );
    }
  } catch (error) {
    notification.error("Error", "No se pudo cargar el ticket");
  }
};
</script>
