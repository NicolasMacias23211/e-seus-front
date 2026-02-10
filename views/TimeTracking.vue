<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <Clock class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Seguimiento de Tiempo
          </h1>
          <p class="text-xs text-slate-500">
            Registra y analiza el tiempo dedicado a tus tareas
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="previousWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all"
        >
          <ChevronLeft class="w-5 h-5 text-slate-600" />
        </button>
        <div class="text-center px-4">
          <p class="text-sm font-bold text-[#021C7D]">{{ currentWeekLabel }}</p>
          <p class="text-xs text-slate-500">{{ currentYearLabel }}</p>
        </div>
        <button
          @click="nextWeek"
          class="p-2.5 rounded-lg border-2 border-slate-200 hover:border-[#50bdeb] hover:bg-slate-50 transition-all"
        >
          <ChevronRight class="w-5 h-5 text-slate-600" />
        </button>
        <button
          @click="goToToday"
          class="px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold text-sm transition-all duration-200"
        >
          Hoy
        </button>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm overflow-hidden">
      <div class="grid grid-cols-6 border-b-2 bg-slate-50">
        <div class="p-4 border-r-2 flex items-center justify-between">
          <button
            @click="showInfoModal = true"
            class="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-md text-white rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1.5 group"
            title="Información sobre el dashboard"
          >
            <Info class="w-4 h-4 group-hover:scale-110 transition-transform" />
            Para mas informacion
          </button>
        </div>
        <div
          v-for="day in weekDays"
          :key="day.date"
          class="p-4 text-center border-r-2 last:border-r-0"
          :class="{ 'bg-blue-50': day.isToday }"
        >
          <p
            class="text-xs font-bold uppercase mb-1"
            :class="day.isToday ? 'text-[#50bdeb]' : 'text-slate-600'"
          >
            {{ day.dayName }}
          </p>
          <p
            class="text-2xl font-bold mb-1"
            :class="day.isToday ? 'text-[#021C7D]' : 'text-slate-700'"
          >
            {{ day.dayNumber }}
          </p>
          <p class="text-xs text-slate-500">{{ day.month }}</p>
          <div class="mt-2 pt-2 border-t">
            <p class="text-sm font-bold text-[#021C7D]">
              {{ day.date ? getDayTotal(day.date) : "0h" }}
            </p>
            <p class="text-xs text-slate-500">
              of {{ day.date ? getTotalExpected(day.date) : "8" }}h
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6 min-h-[500px]">
        <div class="border-r-2 bg-slate-50/50 p-3">
          <div class="space-y-2">
            <p class="text-xs font-bold text-slate-600 uppercase mb-3">
              Tickets disponibles
            </p>
            <div
              v-for="ticket in availableTickets"
              :key="ticket.id_ticket"
              draggable="true"
              @dragstart="handleDragStart($event, ticket)"
              class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 cursor-move hover:border-[#50bdeb] hover:shadow-md transition-all"
            >
              <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <p class="text-xs font-bold text-[#50bdeb]">
                  {{ ticket.id_ticket }}
                </p>
              </div>
              <p class="text-xs text-slate-700 font-medium line-clamp-2">
                {{ ticket.ticket_title }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="day in weekDays"
          :key="day.date"
          class="border-r-2 last:border-r-0 p-3 space-y-2"
          :class="{ 'bg-blue-50/20': day.isToday }"
          @dragover.prevent
          @drop="handleDrop($event, day.date)"
        >
          <div
            v-for="entry in getEntriesForDay(day.date)"
            :key="entry.id"
            class="bg-white rounded-lg border-l-4 border-l-[#021C7D] border-2 border-slate-200 p-3 hover:border-[#50bdeb] hover:shadow-md transition-all group relative"
            :class="{ 'opacity-75': isPastDate(entry.date) }"
          >
            <button
              v-if="!isPastDate(entry.date)"
              @click="removeEntry(entry.id, entry.date)"
              class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold"
            >
              ×
            </button>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <p class="text-xs font-bold text-[#50bdeb]">
                {{ entry.ticketId }}
              </p>
            </div>
            <p class="text-xs text-slate-700 font-medium mb-3 line-clamp-2">
              {{ entry.ticketTitle }}
            </p>
            <div class="flex items-center gap-2">
              <input
                v-model.number="entry.hours"
                @input="onTimeChange(entry)"
                type="number"
                min="0"
                max="24"
                placeholder="0"
                :disabled="isPastDate(entry.date)"
                class="w-12 px-2 py-1.5 border-2 border-slate-200 rounded-lg text-center text-sm font-bold text-[#021C7D] focus:outline-none focus:border-[#50bdeb] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <span class="text-xs text-slate-600 font-bold">h</span>
              <input
                v-model.number="entry.minutes"
                @input="onTimeChange(entry)"
                type="number"
                min="0"
                max="59"
                placeholder="0"
                :disabled="isPastDate(entry.date)"
                class="w-12 px-2 py-1.5 border-2 border-slate-200 rounded-lg text-center text-sm font-bold text-[#021C7D] focus:outline-none focus:border-[#50bdeb] transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              <span class="text-xs text-slate-600 font-bold">m</span>
            </div>
            <div class="mt-2 flex items-center gap-1 text-xs">
              <div
                v-if="entry.isSaving"
                class="flex items-center gap-1 text-blue-600"
              >
                <div
                  class="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
                ></div>
                <span>Guardando...</span>
              </div>
              <div
                v-else-if="entry.isDirty"
                class="flex items-center gap-1 text-orange-600"
              >
                <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Sin guardar</span>
              </div>
              <div
                v-else-if="entry.reportedTimeId"
                class="flex items-center gap-1 text-green-600"
              >
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Guardado</span>
              </div>
            </div>
          </div>

          <button
            @click="showAddModal(day.date)"
            class="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 hover:border-[#50bdeb] hover:text-[#50bdeb] transition-all text-sm font-medium"
          >
            + Agregar
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-gradient-to-br from-[#021C7D] to-[#50bdeb] rounded-2xl p-8 text-center shadow-lg"
        >
          <div
            class="bg-white/10 backdrop-blur rounded-lg px-4 py-2 inline-block mb-4"
          >
            <p class="text-sm font-semibold text-white/90">Cronómetro</p>
          </div>
          <div
            class="text-7xl font-bold text-white mb-8 font-mono tracking-wider"
          >
            {{ formatTime(currentTime) }}
          </div>
          <div class="flex items-center justify-center gap-4">
            <button
              v-if="!isTracking"
              @click="startTimer"
              class="px-10 py-4 bg-white text-[#021C7D] rounded-xl font-bold hover:bg-slate-100 hover:shadow-xl transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Play class="w-6 h-6" />
              Iniciar
            </button>
            <button
              v-else
              @click="stopTimer"
              class="px-10 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 hover:shadow-xl transition-all duration-200 flex items-center gap-3 text-lg"
            >
              <Square class="w-6 h-6" />
              Detener
            </button>
            <button
              @click="resetTimer"
              class="px-8 py-4 bg-white/20 backdrop-blur border-2 border-white/40 text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl border-2 shadow-sm p-6">
          <h3
            class="text-lg font-bold text-[#021C7D] mb-4 flex items-center gap-2"
          >
            <Clock class="w-5 h-5" />
            Registro Manual
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Ticket</label
              >
              <select
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              >
                <option value="">Seleccionar ticket...</option>
                <option
                  v-for="ticket in recentTickets"
                  :key="ticket.id_ticket"
                  :value="ticket.id_ticket"
                >
                  {{ ticket.id_ticket }} - {{ ticket.ticket_title }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Horas</label
              >
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="0.0"
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 block mb-2"
                >Fecha</label
              >
              <input
                type="date"
                class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
            </div>
            <div class="flex items-end">
              <button
                class="w-full px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-200"
              >
                Registrar Tiempo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-xl border-2 shadow-sm p-6">
          <h3
            class="text-lg font-bold text-[#021C7D] mb-6 flex items-center gap-2"
          >
            <Clock class="w-5 h-5" />
            Tickets Activos
          </h3>
          <div class="space-y-4">
            <div
              v-for="ticket in activeTickets"
              :key="ticket.id_ticket"
              class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all border-2 border-transparent hover:border-[#50bdeb] cursor-pointer"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-[#50bdeb] font-bold text-sm">{{
                  ticket.id_ticket
                }}</span>
                <span class="text-[#021C7D] font-bold text-lg"
                  >{{ ticket.tracked }}h</span
                >
              </div>
              <p class="text-sm text-slate-700 font-medium mb-3">
                {{ ticket.ticket_title }}
              </p>
              <div class="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] h-2.5 rounded-full transition-all"
                  :style="{
                    width: `${(ticket.tracked / ticket.estimated) * 100}%`,
                  }"
                />
              </div>
              <div class="text-xs text-slate-500 mt-2 font-medium">
                {{ ticket.tracked }}h / {{ ticket.estimated }}h
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4 transform transition-all"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-[#021C7D] flex items-center gap-2">
            <Clock class="w-6 h-6" />
            {{ modalData.ticketId ? "Agregar" : "Agregar" }} Tiempo
          </h3>
          <button
            @click="closeModal"
            class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <div v-if="!modalData.ticketId">
            <label class="text-sm font-semibold text-slate-700 block mb-2">
              Número de Ticket <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold"
              >
                #
              </span>
              <input
                v-model.number="modalData.selectedTicketId"
                type="number"
                min="1"
                placeholder="Ingresa el número del ticket"
                class="w-full pl-8 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors"
              />
            </div>
          </div>

          <div
            v-else
            class="bg-blue-50 border-2 border-blue-200 rounded-xl p-4"
          >
            <p class="text-xs font-semibold text-blue-600 mb-1">
              TICKET SELECCIONADO
            </p>
            <p class="text-sm font-bold text-[#021C7D]">
              #{{ modalData.ticketId }}
            </p>
            <p class="text-sm text-slate-700 mt-1">
              {{ modalData.ticketTitle }}
            </p>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 block mb-2">
              Fecha <span class="text-red-500">*</span>
            </label>
            <input
              v-model="modalData.date"
              type="date"
              :disabled="true"
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors bg-slate-50"
            />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 block mb-2">
              Tiempo <span class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="relative">
                  <input
                    v-model.number="modalData.hours"
                    type="number"
                    min="0"
                    max="24"
                    placeholder="0"
                    class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-bold text-center focus:outline-none focus:border-[#50bdeb] transition-colors"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-semibold"
                  >
                    h
                  </span>
                </div>
              </div>
              <span class="text-slate-400 font-bold">:</span>
              <div class="flex-1">
                <div class="relative">
                  <input
                    v-model.number="modalData.minutes"
                    type="number"
                    min="0"
                    max="59"
                    placeholder="0"
                    class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-bold text-center focus:outline-none focus:border-[#50bdeb] transition-colors"
                  />
                  <span
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-semibold"
                  >
                    m
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 block mb-2">
              Comentario
            </label>
            <textarea
              v-model="modalData.comment"
              rows="4"
              placeholder="Describe el trabajo realizado..."
              class="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-[#50bdeb] transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="closeModal"
            class="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="saveModalEntry"
            :disabled="!isModalValid"
            class="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="cancelDelete"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4 transform transition-all"
      >
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-800">
              Confirmar Eliminación
            </h3>
            <p class="text-sm text-slate-500">
              Esta acción no se puede deshacer
            </p>
          </div>
        </div>

        <p class="text-slate-700 mb-6">
          ¿Estás seguro de que deseas eliminar el registro de tiempo del
          <span class="font-bold text-[#021C7D]"
            >Ticket #{{ entryToDelete?.ticketId }}</span
          >?
        </p>

        <div class="flex gap-3">
          <button
            @click="cancelDelete"
            class="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 hover:shadow-lg transition-all duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showInfoModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      @click.self="showInfoModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 transform transition-all max-h-[90vh] flex flex-col"
      >
        <div
          class="flex items-center justify-between p-6 pb-4 border-b border-slate-200 flex-shrink-0"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0"
            >
              <Info class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 class="text-lg sm:text-2xl font-bold text-[#021C7D]">
              Cómo funciona el Dashboard
            </h3>
          </div>
          <button
            @click="showInfoModal = false"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4 sm:space-y-6 p-6 overflow-y-auto flex-1">
          <div
            class="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5"
          >
            <h4
              class="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm sm:text-base"
            >
              <div
                class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm"
              >
                1
              </div>
              Agregar Tiempo
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-blue-800 ml-6 sm:ml-8">
              <li class="flex items-start gap-2">
                <span class="text-blue-600 mt-1">•</span>
                <span
                  ><strong>Arrastra y suelta</strong> un ticket desde la columna
                  izquierda a cualquier día de la semana</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-600 mt-1">•</span>
                <span
                  >Haz clic en el botón <strong>"+ Agregar"</strong> en
                  cualquier día para agregar tiempo manualmente</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-blue-600 mt-1">•</span>
                <span>Ingresa las horas y minutos trabajados en el ticket</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-5"
          >
            <h4
              class="font-bold text-green-900 mb-3 flex items-center gap-2 text-sm sm:text-base"
            >
              <div
                class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm"
              >
                2
              </div>
              Guardado Automático
            </h4>
            <ul
              class="space-y-2 text-xs sm:text-sm text-green-800 ml-6 sm:ml-8"
            >
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-1">•</span>
                <span
                  >Los cambios se guardan
                  <strong>automáticamente</strong> después de 1.5 segundos de
                  inactividad</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 mt-1">•</span>
                <span
                  >Verás indicadores de estado:
                  <strong class="text-orange-600">Sin guardar</strong>,
                  <strong class="text-blue-600">Guardando...</strong>,
                  <strong class="text-green-600">Guardado</strong></span
                >
              </li>
            </ul>
          </div>

          <div
            class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 sm:p-5"
          >
            <h4
              class="font-bold text-amber-900 mb-3 flex items-center gap-2 text-sm sm:text-base"
            >
              <div
                class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm"
              >
                !
              </div>
              Restricciones Importantes
            </h4>
            <ul
              class="space-y-2 text-xs sm:text-sm text-amber-800 ml-6 sm:ml-8"
            >
              <li class="flex items-start gap-2">
                <span class="text-amber-600 mt-1">⚠</span>
                <span
                  ><strong>No se pueden editar fechas pasadas:</strong> Solo
                  puedes modificar el día actual y fechas futuras de la
                  semana</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-amber-600 mt-1">⚠</span>
                <span
                  ><strong>Eliminación:</strong> Pasa el cursor sobre una
                  entrada y haz clic en la "×" para eliminarla (solo fechas no
                  pasadas)</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-amber-600 mt-1">⚠</span>
                <span
                  ><strong>Navegación semanal:</strong> Usa las flechas para
                  moverte entre semanas y el botón "Hoy" para volver a la semana
                  actual</span
                >
              </li>
            </ul>
          </div>

          <div
            class="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 sm:p-5"
          >
            <h4
              class="font-bold text-purple-900 mb-3 flex items-center gap-2 text-sm sm:text-base"
            >
              <div
                class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm"
              >
                💡
              </div>
              Consejos
            </h4>
            <ul
              class="space-y-2 text-xs sm:text-sm text-purple-800 ml-6 sm:ml-8"
            >
              <li class="flex items-start gap-2">
                <span class="text-purple-600 mt-1">•</span>
                <span
                  >Puedes agregar comentarios opcionales al registrar
                  tiempo</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-600 mt-1">•</span>
                <span
                  >El total diario se calcula automáticamente y se muestra en el
                  encabezado de cada día</span
                >
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-600 mt-1">•</span>
                <span
                  >Los días están resaltados en azul cuando corresponden al día
                  actual</span
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="p-6 pt-4 border-t border-slate-200 flex justify-end flex-shrink-0"
        >
          <button
            @click="showInfoModal = false"
            class="px-6 py-3 bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";
import {
  Clock,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-vue-next";
import type { Ticket, TicketShort } from "../models";
import type { ReportedTime } from "../models/ReportedTime";
import { useNotification } from "../utils/useNotification";
import { ReportedTimeService } from "../services/reportedTimeService";
import { SessionStorageService } from "../services/SessionStorageService";
import { TicketsService } from "../services/ticketsService";
import { NotesService } from "../services/notesService";
const notification = useNotification();

const reportedTimeService = new ReportedTimeService();
const sessionStorage = new SessionStorageService();
const ticketsService = new TicketsService();
const notesService = new NotesService();

const isTracking = ref(false);
const currentTime = ref(0);
const activeTicket = ref<number | null>(null);
let timerInterval: number | null = null;

const currentWeekStart = ref(new Date());
const timeEntryData = ref<Record<string, number>>({});

interface TimeEntry {
  id: string;
  ticketId: number;
  ticketTitle: string;
  date: string;
  hours: number;
  minutes: number;
  reportedTimeId?: number;
  isSaving?: boolean;
  isDirty?: boolean;
  comment?: string;
}

const timeEntries = ref<TimeEntry[]>([]);

const availableTickets = ref<TicketShort[]>([]);

let draggedTicket: TicketShort | null = null;

const saveTimers = new Map<string, number>();

const showModal = ref(false);
const modalData = ref({
  ticketId: null as number | null,
  ticketTitle: "" as string,
  selectedTicketId: "" as string | number,
  date: "" as string,
  hours: 0,
  minutes: 0,
  comment: "" as string,
});

const showDeleteModal = ref(false);
const entryToDelete = ref<{
  id: string;
  date: string;
  ticketId: number;
} | null>(null);

const showInfoModal = ref(false);

const initializeWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentWeekStart.value = new Date(today);
  currentWeekStart.value.setDate(today.getDate() + diff);
  currentWeekStart.value.setHours(0, 0, 0, 0);
};

initializeWeek();

const weekDays = computed(() => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 5; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    const dayName = date
      .toLocaleDateString("es-ES", { weekday: "short" })
      .toUpperCase();
    const dayNumber = date.getDate();
    const month = date
      .toLocaleDateString("es-ES", { month: "short" })
      .toUpperCase();
    const dateStr = date.toISOString().split("T")[0];
    const isToday = date.getTime() === today.getTime();

    days.push({ dayName, dayNumber, month, date: dateStr, isToday });
  }

  return days;
});

const currentWeekLabel = computed(() => {
  const days = weekDays.value;
  if (days.length < 5) return "";
  const start = days[0]!;
  const end = days[4]!;
  return `${start.dayNumber} ${start.month} - ${end.dayNumber} ${end.month}`;
});

const currentYearLabel = computed(() => {
  return currentWeekStart.value.getFullYear().toString();
});

const isModalValid = computed(() => {
  const hasTicket =
    modalData.value.ticketId || modalData.value.selectedTicketId;
  const hasTime = modalData.value.hours > 0 || modalData.value.minutes > 0;
  return hasTicket && hasTime && modalData.value.date;
});

const previousWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7);
  loadReportedTimes();
};

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value);
  currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7);
  loadReportedTimes();
};

const goToToday = () => {
  initializeWeek();
  loadReportedTimes();
};

const getDayTotal = (date: string) => {
  const totalMinutes = timeEntries.value
    .filter((entry) => entry.date === date)
    .reduce((sum, entry) => sum + entry.hours * 60 + entry.minutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h:${minutes}m` : `${hours}h`;
};

const getTotalExpected = (_date: string | undefined) => {
  return "8";
};

const getEntriesForDay = (date: string | undefined) => {
  if (!date) return [];
  return timeEntries.value.filter((entry) => entry.date === date);
};

const handleDragStart = (event: DragEvent, ticket: TicketShort) => {
  draggedTicket = ticket;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
  }
};

const handleDrop = (event: DragEvent, date: string | undefined) => {
  event.preventDefault();
  if (!draggedTicket || !date) return;

  if (isPastDate(date)) {
    notification.error(
      "Error",
      "No se pueden agregar registros en fechas pasadas",
    );
    draggedTicket = null;
    return;
  }

  modalData.value = {
    ticketId: draggedTicket.id_ticket,
    ticketTitle: draggedTicket.ticket_title,
    selectedTicketId: "",
    date: date,
    hours: 0,
    minutes: 0,
    comment: "",
  };
  showModal.value = true;
  draggedTicket = null;
};

const isPastDate = (date: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = date.split("-").map(Number);
  const entryDate = new Date(year, month - 1, day);
  entryDate.setHours(0, 0, 0, 0);

  return entryDate.getTime() < today.getTime();
};

const removeEntry = async (entryId: string, date: string) => {
  if (isPastDate(date)) {
    notification.error(
      "Error",
      "No se pueden eliminar registros de fechas pasadas",
    );
    return;
  }

  const entry = timeEntries.value.find((e) => e.id === entryId);
  if (!entry) return;

  entryToDelete.value = {
    id: entryId,
    date: date,
    ticketId: entry.ticketId,
  };
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!entryToDelete.value) return;

  const { id: entryId, ticketId } = entryToDelete.value;
  const index = timeEntries.value.findIndex((e) => e.id === entryId);

  if (index > -1) {
    const entry = timeEntries.value[index];
    if (entry.reportedTimeId) {
      try {
        await reportedTimeService.deleteReportedTime(entry.reportedTimeId);

        timeEntries.value.splice(index, 1);
        notification.success(
          "Eliminado",
          `Tiempo del ticket #${ticketId} eliminado correctamente`,
        );
      } catch (error: any) {
        console.error("Error al eliminar tiempo:", error);
        if (error?.status === 204 || error?.status === 200) {
          timeEntries.value.splice(index, 1);
          notification.success(
            "Eliminado",
            `Tiempo del ticket #${ticketId} eliminado correctamente`,
          );
        } else {
          notification.error(
            "Error",
            "No se pudo eliminar el registro del servidor",
          );
        }
      }
    } else {
      timeEntries.value.splice(index, 1);
      notification.success(
        "Eliminado",
        `Tiempo del ticket #${ticketId} eliminado`,
      );
    }

    const timer = saveTimers.get(entryId);
    if (timer) {
      clearTimeout(timer);
      saveTimers.delete(entryId);
    }
  }
  showDeleteModal.value = false;
  entryToDelete.value = null;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  entryToDelete.value = null;
};

const showAddModal = (date: string | undefined) => {
  if (!date) return;

  if (isPastDate(date)) {
    notification.error(
      "Error",
      "No se pueden agregar registros en fechas pasadas",
    );
    return;
  }

  modalData.value = {
    ticketId: null,
    ticketTitle: "",
    selectedTicketId: "",
    date: date,
    hours: 0,
    minutes: 0,
    comment: "",
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalData.value = {
    ticketId: null,
    ticketTitle: "",
    selectedTicketId: "",
    date: "",
    hours: 0,
    minutes: 0,
    comment: "",
  };
};

const saveModalEntry = async () => {
  if (!isModalValid.value) return;

  const ticketId =
    modalData.value.ticketId || Number(modalData.value.selectedTicketId);

  const userInfo = sessionStorage.getUserInfo();
  if (!userInfo || !userInfo.username) {
    notification.error("Error", "No se pudo obtener el usuario de la sesión");
    return;
  }

  let ticket = availableTickets.value.find((t) => t.id_ticket === ticketId);

  if (!ticket) {
    ticket = {
      id_ticket: ticketId,
      ticket_title: `Ticket #${ticketId}`,
      service_name: "",
      priority_name: "",
      status_name: "",
      reporter_user_name: "",
      assigned_to: null,
      create_at: "",
      estimated_closing_date: null,
    };
  }

  const totalMinutes =
    (modalData.value.hours || 0) * 60 + (modalData.value.minutes || 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const reportedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;

  try {
    const timeResponse = await reportedTimeService.createReportedTime({
      reported_time: reportedTime,
      date_reported: modalData.value.date,
      id_ticket: ticketId,
      network_user: userInfo.username,
    });

    if (!timeResponse.success || !timeResponse.data) {
      notification.error(
        "Error",
        "No se pudo crear el registro de tiempo reportado",
      );
      return;
    }

    if (modalData.value.comment && modalData.value.comment.trim()) {
      const noteResponse = await notesService.createNote({
        note: modalData.value.comment.trim(),
        visible_to_client: false,
        id_ticket: ticketId,
        network_user: userInfo.username,
      });

      if (!noteResponse.success) {
        notification.warning(
          "Advertencia",
          "El tiempo se guardó pero no se pudo crear el comentario",
        );
      }
    }

    const newEntry: TimeEntry = {
      id: `entry-${timeResponse.data.id_reported_times}`,
      ticketId: ticketId,
      ticketTitle: ticket.ticket_title,
      date: modalData.value.date,
      hours: modalData.value.hours || 0,
      minutes: modalData.value.minutes || 0,
      reportedTimeId: timeResponse.data.id_reported_times,
      isSaving: false,
      isDirty: false,
    };

    timeEntries.value.push(newEntry);

    closeModal();

    const message = modalData.value.comment
      ? `Tiempo y comentario agregados al ticket #${ticketId}`
      : `Tiempo agregado al ticket #${ticketId}`;

    notification.success("¡Éxito!", message);
  } catch (error) {
    console.error("Error al guardar entrada:", error);
    notification.error(
      "Error",
      "Ocurrió un error al guardar el tiempo reportado",
    );
  }
};

const autoSaveEntry = (entry: TimeEntry) => {
  const existingTimer = saveTimers.get(entry.id);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  entry.isDirty = true;

  const timer = window.setTimeout(async () => {
    await saveEntry(entry);
    saveTimers.delete(entry.id);
  }, 1500);

  saveTimers.set(entry.id, timer);
};

const saveEntry = async (entry: TimeEntry) => {
  const userInfo = sessionStorage.getUserInfo();
  if (!userInfo || !userInfo.username) {
    notification.error("Error", "No se pudo obtener el usuario de la sesión");
    return;
  }

  entry.isSaving = true;

  const totalMinutes = entry.hours * 60 + entry.minutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const reportedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;

  try {
    if (entry.reportedTimeId) {
      const response = await reportedTimeService.updateReportedTime(
        entry.reportedTimeId,
        {
          reported_time: reportedTime,
          date_reported: entry.date,
          id_ticket: entry.ticketId,
          network_user: userInfo.username,
        },
      );

      if (response.success) {
        entry.isDirty = false;
        notification.success(
          "Guardado",
          `Tiempo actualizado para ticket #${entry.ticketId}`,
        );
      } else {
        notification.error(
          "Error",
          "No se pudo actualizar el tiempo reportado",
        );
      }
    } else {
      const response = await reportedTimeService.createReportedTime({
        reported_time: reportedTime,
        date_reported: entry.date,
        id_ticket: entry.ticketId,
        network_user: userInfo.username,
      });

      if (response.success && response.data) {
        entry.reportedTimeId = response.data.id_reported_times;
        entry.isDirty = false;

        if (entry.comment && entry.comment.trim()) {
          try {
            await notesService.createNote({
              note: entry.comment.trim(),
              visible_to_client: false,
              id_ticket: entry.ticketId,
              network_user: userInfo.username,
            });
          } catch (noteError) {
            console.error("Error al crear comentario:", noteError);
          }
        }

        notification.success(
          "Guardado",
          `Tiempo creado para ticket #${entry.ticketId}`,
        );
      } else {
        notification.error("Error", "No se pudo crear el tiempo reportado");
      }
    }
  } catch (error) {
    console.error("Error al guardar tiempo:", error);
    notification.error("Error", "Ocurrió un error al guardar el tiempo");
  } finally {
    entry.isSaving = false;
  }
};

const saveTimeEntries = async () => {
  const pendingEntries = timeEntries.value.filter(
    (entry) => entry.isDirty || !entry.reportedTimeId,
  );

  if (pendingEntries.length === 0) {
    notification.info("Info", "No hay cambios pendientes por guardar");
    return;
  }

  saveTimers.forEach((timer) => clearTimeout(timer));
  saveTimers.clear();

  const promises = pendingEntries.map((entry) => saveEntry(entry));
  await Promise.all(promises);

  notification.success(
    "¡Éxito!",
    `Se guardaron ${pendingEntries.length} registro(s) de tiempo`,
  );
};

const onTimeChange = (entry: TimeEntry) => {
  if (!isPastDate(entry.date)) {
    autoSaveEntry(entry);
  }
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const startTimer = () => {
  isTracking.value = true;
  timerInterval = window.setInterval(() => {
    currentTime.value++;
  }, 1000);
};

const stopTimer = () => {
  isTracking.value = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const resetTimer = () => {
  currentTime.value = 0;
  activeTicket.value = null;
};

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  saveTimers.forEach((timer) => clearTimeout(timer));
  saveTimers.clear();
});

const loadReportedTimes = async () => {
  const userInfo = sessionStorage.getUserInfo();
  if (!userInfo || !userInfo.username) {
    notification.error("Error", "No se pudo obtener el usuario de la sesión");
    return;
  }

  const days = weekDays.value;
  if (days.length === 0) return;

  const dateAfter = days[0]!.date;
  const dateBefore = days[days.length - 1]!.date;

  try {
    const response = await reportedTimeService.getReportedTimes(
      userInfo.username,
      dateAfter,
      dateBefore,
    );

    if (response.success && response.data) {
      timeEntries.value = response.data.results
        .filter((rt: ReportedTime) => rt.reported_time)
        .map((rt: ReportedTime) => {
          const timeParts = rt.reported_time.split(":");
          const hours = parseInt(timeParts[0] || "0", 10);
          const minutes = parseInt(timeParts[1] || "0", 10);
          let dateStr: string;
          if (typeof rt.date_reported === 'string') {
            dateStr = rt.date_reported.split("T")[0];
          } else {
            dateStr = String(rt.date_reported).split("T")[0];
          }

          const ticket = availableTickets.value.find(
            (t) => t.id_ticket === rt.id_ticket,
          );
          const ticketTitle = ticket?.ticket_title || `Ticket #${rt.id_ticket}`;

          return {
            id: `entry-${rt.id_reported_times}`,
            ticketId: rt.id_ticket,
            ticketTitle: ticketTitle,
            date: dateStr,
            hours,
            minutes,
            reportedTimeId: rt.id_reported_times,
            isSaving: false,
            isDirty: false,
          };
        });
    }
  } catch (error) {
    console.error("Error al cargar tiempos reportados:", error);
    notification.error("Error", "No se pudieron cargar los tiempos reportados");
  }
};

const loadAssignedTickets = async () => {
  const userInfo = sessionStorage.getUserInfo();
  if (!userInfo || !userInfo.username) {
    notification.error("Error", "No se pudo obtener el usuario de la sesión");
    return;
  }

  try {
    const response = await ticketsService.GetTicketsByPerson(userInfo.username);

    if (response.success && response.data) {
      availableTickets.value = response.data.results.flat();
    }
  } catch (error) {
    console.error("Error al cargar tickets asignados:", error);
    notification.error("Error", "No se pudieron cargar los tickets asignados");
  }
};

onMounted(async () => {
  await loadAssignedTickets();
  await loadReportedTimes();
});

const recentTickets = ref<Ticket[]>([
  {
    id_ticket: 101,
    ticket_title: "Error en el login",
    service_name: "Soporte Técnico",
    priority_name: "Alta",
    status_name: "En Progreso",
    reporter_user_name: "user1",
    assigned_to: "user2",
    create_at: "2025-11-20",
    estimated_closing_date: "2025-11-30",
    ticket_description: "Corregir error de autenticación",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal A",
  },
  {
    id_ticket: 102,
    ticket_title: "Implementar dark mode",
    service_name: "Desarrollo",
    priority_name: "Media",
    status_name: "En Progreso",
    reporter_user_name: "user3",
    assigned_to: "user2",
    create_at: "2025-11-21",
    estimated_closing_date: "2025-12-05",
    ticket_description: "Añadir tema oscuro a la aplicación",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal A",
  },
  {
    id_ticket: 103,
    ticket_title: "Optimizar queries",
    service_name: "Base de Datos",
    priority_name: "Alta",
    status_name: "En Progreso",
    reporter_user_name: "user4",
    assigned_to: "user2",
    create_at: "2025-11-22",
    estimated_closing_date: "2025-12-01",
    ticket_description: "Mejorar rendimiento de consultas",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal B",
  },
]);

interface TicketWithTracking extends Ticket {
  tracked: number;
  estimated: number;
}

const activeTickets = ref<TicketWithTracking[]>([
  {
    id_ticket: 101,
    ticket_title: "Error en el login",
    service_name: "Soporte Técnico",
    priority_name: "Alta",
    status_name: "En Progreso",
    reporter_user_name: "user1",
    assigned_to: "user2",
    create_at: "2025-11-20",
    estimated_closing_date: "2025-11-30",
    ticket_description: "Corregir error de autenticación",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal A",
    tracked: 12,
    estimated: 20,
  },
  {
    id_ticket: 102,
    ticket_title: "Implementar dark mode",
    service_name: "Desarrollo",
    priority_name: "Media",
    status_name: "En Progreso",
    reporter_user_name: "user3",
    assigned_to: "user2",
    create_at: "2025-11-21",
    estimated_closing_date: "2025-12-05",
    ticket_description: "Añadir tema oscuro",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal A",
    tracked: 8,
    estimated: 16,
  },
  {
    id_ticket: 103,
    ticket_title: "Optimizar queries",
    service_name: "Base de Datos",
    priority_name: "Alta",
    status_name: "En Progreso",
    reporter_user_name: "user4",
    assigned_to: "user2",
    create_at: "2025-11-22",
    estimated_closing_date: "2025-12-01",
    ticket_description: "Mejorar rendimiento",
    ticket_attachments: null,
    ticket_closing_code: null,
    ticket_ans: null,
    update_at: null,
    closing_date: null,
    sub_program_name: "Cliente Principal B",
    tracked: 15,
    estimated: 24,
  },
]);
</script>
