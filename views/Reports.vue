<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <ChartBar class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-[#021C7D]">
            Reportes de Métricas
          </h1>
          <p class="text-xs text-slate-500">
            Análisis de rendimiento por usuario
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm p-6">
      <div class="mb-6">
        <div class="relative">
          <input
            id="user-search"
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre..."
            class="w-full pl-4 pr-10 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors"
            @input="handleSearch"
            @focus="showDropdown = true"
          />
          <div
            v-if="isLoading"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <div
              class="w-5 h-5 border-2 border-[#50bdeb] border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
          <div
            v-if="showDropdown && filteredUsers.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-10"
          >
            <div
              v-for="user in filteredUsers"
              :key="user.network_user"
              class="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
              @click="selectUser(user)"
            >
              <div class="font-semibold text-slate-800">
                {{ getFullName(user) }}
              </div>
              <div class="text-sm text-slate-500">
                {{ user.email || user.network_user }}
              </div>
            </div>
          </div>
          <div
            v-if="
              showDropdown &&
              searchQuery &&
              filteredUsers.length === 0 &&
              !isLoading
            "
            class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg p-4 z-10"
          >
            <div class="text-sm text-slate-500 text-center">
              No se encontraron usuarios
            </div>
          </div>
        </div>
        <div
          v-if="selectedUser"
          class="mt-4 flex items-center justify-between p-4 bg-gradient-to-br from-[#021C7D] to-[#50bdeb] rounded-xl"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            >
              <span class="text-lg font-bold text-[#021C7D]">{{
                getInitials(selectedUser)
              }}</span>
            </div>
            <div>
              <div class="font-bold text-white">
                {{ getFullName(selectedUser) }}
              </div>
              <div class="text-sm text-white/90">
                {{ selectedUser.email || selectedUser.network_user }}
              </div>
              <div class="text-xs text-white/80 mt-1">
                {{ selectedUser.rol_name }}
              </div>
            </div>
          </div>
          <button
            @click="clearSelection"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X class="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div v-if="selectedUser">
        <div class="border-t-2 border-slate-100 pt-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-[#021C7D]">
              Métricas de Rendimiento
            </h2>
            <ExportChartsToPDF
              :userName="selectedUserFullName"
              :userRole="selectedUser.rol_name"
              :cumplimientoValue="cumplimientoValue"
              :ocupacionValue="ocupacionValue"
              compact
            />
          </div>
          <div
            v-if="isLoadingMetrics"
            class="flex items-center justify-center py-12"
          >
            <div class="text-center">
              <div
                class="w-12 h-12 border-4 border-[#50bdeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"
              ></div>
              <p class="text-sm text-slate-500">Cargando métricas...</p>
            </div>
          </div>
          <div v-else class="grid grid-cols-2 gap-4">
            <div
              class="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-white transition-colors"
            >
              <CircularProgressChart
                title="Cumplimiento"
                :value="cumplimientoValue"
                color="#021c7d"
                height="240px"
              />
            </div>
            <div
              class="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-white transition-colors"
            >
              <CircularProgressChart
                title="Ocupación"
                :value="ocupacionValue"
                color="#50bdeb"
                height="240px"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 text-slate-400"
      >
        <div
          class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4"
        >
          <ChartBar class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-sm font-medium text-slate-500">
          Selecciona un usuario para ver las métricas
        </p>
      </div>
    </div>
    <div class="bg-white rounded-xl border-2 shadow-sm p-6">
      <h2 class="text-lg font-bold text-[#021C7D] mb-4">
        Estadísticas Generales
      </h2>
      <div class="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6">
        <h3 class="text-md font-bold text-[#021C7D] mb-3">
          Tickets Creados vs Cerrados (Última Semana)
        </h3>
        <LineComparisonChart
          :createdData="ticketsCreatedData"
          :closedData="ticketsClosedData"
          :categories="timeCategories"
          height="350px"
        />
      </div>
      <div class="border-t-2 border-slate-100 pt-6">
        <h3 class="text-md font-bold text-[#021C7D] mb-4">Exportar Reportes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            v-for="option in exportOptions"
            :key="option.id"
            @click="handleExport(option.id)"
            class="group relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4 transition-all duration-300 hover:border-transparent hover:shadow-lg"
          >
            <div
              :class="[
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                option.color,
              ]"
            ></div>
            <div class="relative flex flex-col items-center gap-3">
              <div
                :class="[
                  'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                  option.bgColor,
                  'group-hover:bg-white/20',
                ]"
              >
                <component
                  :is="option.icon"
                  :class="[
                    'w-7 h-7 transition-colors duration-300',
                    option.textColor,
                    'group-hover:text-white',
                  ]"
                />
              </div>
              <div class="text-center">
                <div
                  class="font-bold text-slate-800 group-hover:text-white transition-colors duration-300"
                >
                  {{ option.name }}
                </div>
                <div
                  class="text-xs text-slate-500 group-hover:text-white/90 transition-colors duration-300 mt-1"
                >
                  {{ option.description }}
                </div>
              </div>
              <div
                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FileDown class="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        </div>
        <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <BarChart3 class="w-4 h-4" />
          <span>Selecciona el formato de exportación deseado</span>
        </div>
      </div>
    </div>
    <!-- Ajustes de Parámetros -->
    <div class="bg-white rounded-xl border-2 shadow-sm p-6">
      <div class="flex items-center gap-3 mb-6">
        <div
          class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center"
        >
          <SlidersHorizontal class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-[#021C7D]">
            Ajustes de Parámetros
          </h2>
          <p class="text-xs text-slate-500">
            Configuración manual de datos del sistema
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Card 1: Ticket Completion -->
        <div
          class="rounded-xl border-2 border-slate-200 bg-slate-50 p-5 flex flex-col"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"
            >
              <CheckCircle2 class="w-4 h-4 text-[#021C7D]" />
            </div>
            <div>
              <h3 class="font-bold text-slate-800">
                Cumplimiento de Tickets
              </h3>
              <p class="text-xs text-slate-500">
                Marcar ticket finalizado como cumplido o no
              </p>
            </div>
          </div>

          <!-- Ticket search by ID -->
          <div class="mb-4">
            <label class="block text-xs font-semibold text-slate-600 mb-1.5">ID del Ticket</label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold pointer-events-none">#</span>
                <input
                  v-model="ticketIdInput"
                  type="number"
                  min="1"
                  placeholder="Ej: 1001"
                  class="w-full pl-7 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  @keyup.enter="searchTicketById"
                />
              </div>
              <button
                @click="searchTicketById"
                :disabled="isSearchingTicket"
                class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 flex-shrink-0 disabled:opacity-60"
              >
                <div v-if="isSearchingTicket" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <Search v-else class="w-4 h-4" />
                Buscar
              </button>
            </div>
            <p
              v-if="ticketSearchError"
              class="mt-2 text-xs text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="w-3 h-3" />
              {{ ticketSearchError }}
            </p>
          </div>

          <!-- Selected ticket -->
          <div
            v-if="selectedTicket"
            class="flex-1 flex flex-col rounded-xl border-2 border-slate-200 bg-white p-4"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="text-xs font-bold text-[#021C7D] bg-blue-50 px-2 py-0.5 rounded-md"
                    >#{{ selectedTicket.id_ticket }}</span
                  >
                  <span class="text-xs text-slate-500">{{ selectedTicket.service?.service_name }}</span>
                  <span
                    v-if="selectedTicket.status"
                    class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    :style="{ background: statusesWithColor.find(s => s.id_status === selectedTicket!.status.id_status)?.color ?? '#94a3b8' }"
                  >
                    {{ selectedTicket.status.status_name }}
                  </span>
                </div>
                <p class="text-sm font-semibold text-slate-800 truncate">
                  {{ selectedTicket.ticket_title }}
                </p>
                <p class="text-xs text-slate-500 mt-0.5">
                  Cerrado: {{ selectedTicket.closing_date ?? 'Sin cerrar' }} · Asignado:
                  {{ selectedTicket.assigned_to ?? 'Sin asignar' }}
                </p>
              </div>
              <button
                @click="clearTicketSelection"
                class="ml-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <X class="w-3 h-3 text-slate-500" />
              </button>
            </div>

            <!-- Toggle switch: cumplimiento -->
            <div
              class="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-3"
            >
              <div class="flex items-center gap-2">
                <component
                  :is="ticketCompletionStatus ? CheckCircle2 : AlertCircle"
                  :class="[
                    'w-4 h-4',
                    ticketCompletionStatus
                      ? 'text-green-500'
                      : 'text-amber-500',
                  ]"
                />
                <span class="text-sm font-medium text-slate-700">
                  {{
                    ticketCompletionStatus
                      ? "Marcado como Cumplido"
                      : "Marcado como No Cumplido"
                  }}
                </span>
              </div>
              <button
                @click="ticketCompletionStatus = !ticketCompletionStatus"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
                  ticketCompletionStatus ? 'bg-green-500' : 'bg-slate-300',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300',
                    ticketCompletionStatus
                      ? 'translate-x-6'
                      : 'translate-x-1',
                  ]"
                />
              </button>
            </div>

            <!-- Estimated closing date -->
            <div class="mb-3">
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">Fecha estimada de entrega</label>
              <input
                v-model="estimatedClosingDate"
                type="date"
                class="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm"
              />
              <p v-if="selectedTicket.estimated_closing_date" class="mt-1 text-xs text-slate-400">
                Actual: {{ new Date(selectedTicket.estimated_closing_date!).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
              </p>
            </div>

            <!-- Status selector -->
            <div class="mb-3">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-semibold text-slate-600">Estado del Ticket</p>
                <span v-if="selectedStatus !== originalStatusId" class="text-xs text-amber-500 font-semibold flex items-center gap-1">
                  <AlertCircle class="w-3 h-3" />
                  Cambio pendiente
                </span>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="status in statusesWithColor"
                  :key="status.id_status"
                  @click="selectedStatus = status.id_status"
                  :class="[
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all duration-200',
                    selectedStatus === status.id_status
                      ? 'border-transparent text-white shadow-md scale-105'
                      : 'border-slate-200 text-slate-600 bg-white hover:border-slate-300',
                  ]"
                  :style="selectedStatus === status.id_status ? { background: status.color } : {}"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    :style="{ background: selectedStatus === status.id_status ? 'rgba(255,255,255,0.7)' : status.color }"
                  />
                  {{ status.status_name }}
                  <span
                    v-if="originalStatusId === status.id_status"
                    class="ml-0.5 text-[10px] font-bold opacity-80 leading-none"
                    :class="selectedStatus === status.id_status ? 'text-white/80' : 'text-slate-400'"
                  >(Actual)</span>
                </button>
              </div>
            </div>

            <button
              @click="applyTicketChanges"
              :disabled="isSavingTicket || selectedStatus === null"
              class="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-auto disabled:opacity-60"
            >
              <div v-if="isSavingTicket" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <Check v-else class="w-4 h-4" />
              {{ isSavingTicket ? 'Guardando...' : 'Aplicar Cambios' }}
            </button>
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="flex-1 flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed border-slate-200"
          >
            <div
              class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3"
            >
              <CheckCircle2 class="w-6 h-6 text-slate-300" />
            </div>
            <p class="text-xs text-slate-500 text-center leading-relaxed">
              Ingresa el ID del ticket<br />y presiona Buscar
            </p>
          </div>
        </div>

        <!-- Card 2: Retroactive Time -->
        <div class="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center"
            >
              <Clock class="w-4 h-4 text-[#50bdeb]" />
            </div>
            <div>
              <h3 class="font-bold text-slate-800">Tiempo Retroactivo</h3>
              <p class="text-xs text-slate-500">
                Registrar horas trabajadas en días pasados
              </p>
            </div>
          </div>

          <!-- User search -->
          <div class="mb-3">
            <label class="block text-xs font-semibold text-slate-600 mb-1.5"
              >Usuario</label
            >
            <div class="relative">
              <UserIcon
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              />
              <input
                v-model="timeUserSearchQuery"
                type="text"
                placeholder="Buscar usuario..."
                class="w-full pl-9 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm"
                @input="showTimeUserDropdown = true"
                @focus="showTimeUserDropdown = true"
              />
              <div
                v-if="showTimeUserDropdown && filteredTimeUsers.length > 0"
                class="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-20"
              >
                <div
                  v-for="user in filteredTimeUsers"
                  :key="user.network_user"
                  class="px-4 py-2.5 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                  @click="selectTimeUser(user)"
                >
                  <div class="font-semibold text-slate-800 text-sm">
                    {{ getFullName(user) }}
                  </div>
                  <div class="text-xs text-slate-500">
                    {{ user.email || user.network_user }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected user chip -->
          <div
            v-if="selectedTimeUser"
            class="flex items-center gap-2 mb-3 p-2.5 bg-gradient-to-r from-[#021C7D]/10 to-[#50bdeb]/10 rounded-xl border border-[#50bdeb]/30"
          >
            <div
              class="w-7 h-7 rounded-full bg-gradient-to-br from-[#021C7D] to-[#50bdeb] flex items-center justify-center flex-shrink-0"
            >
              <span class="text-xs font-bold text-white">{{
                getInitials(selectedTimeUser)
              }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 truncate">
                {{ getFullName(selectedTimeUser) }}
              </p>
              <p class="text-xs text-slate-500">
                {{ selectedTimeUser.rol_name }}
              </p>
            </div>
            <button
              @click="clearTimeUser"
              class="w-6 h-6 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X class="w-3 h-3 text-slate-500" />
            </button>
          </div>

          <!-- Date + Duration -->
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">Fecha</label>
              <input
                v-model="retroDate"
                type="date"
                :max="todayDate"
                class="w-full px-3 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1.5">Tiempo empleado</label>
              <div class="flex items-center gap-1.5">
                <div class="relative flex-1">
                  <input
                    v-model.number="retroHours"
                    type="number"
                    min="0"
                    max="23"
                    placeholder="0"
                    class="w-full pr-7 pl-2 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">h</span>
                </div>
                <span class="text-slate-400 font-bold leading-none">:</span>
                <div class="relative flex-1">
                  <input
                    v-model.number="retroMinutes"
                    type="number"
                    min="0"
                    max="59"
                    placeholder="0"
                    class="w-full pr-8 pl-2 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">min</span>
                </div>
              </div>
            </div>
          </div>
          <p
            v-if="retroHours !== null && retroMinutes !== null && retroHours === 0 && retroMinutes === 0"
            class="mb-3 -mt-1 text-xs text-amber-500 flex items-center gap-1"
          >
            <AlertCircle class="w-3 h-3" />
            El tiempo debe ser mayor a 0 minutos.
          </p>

          <!-- Ticket association -->
          <div class="mb-4">
            <label class="block text-xs font-semibold text-slate-600 mb-1.5">ID del Ticket asociado</label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold pointer-events-none">#</span>
                <input
                  v-model="retroTicketIdInput"
                  type="number"
                  min="1"
                  placeholder="Ej: 1001"
                  class="w-full pl-7 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#50bdeb] transition-colors bg-white text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  @keyup.enter="searchRetroTicketById"
                />
              </div>
              <button
                @click="searchRetroTicketById"
                :disabled="isSearchingRetroTicket"
                class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 flex-shrink-0 disabled:opacity-60"
              >
                <div v-if="isSearchingRetroTicket" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <Search v-else class="w-4 h-4" />
                Buscar
              </button>
            </div>
            <p
              v-if="retroTicketSearchError"
              class="mt-2 text-xs text-red-500 flex items-center gap-1"
            >
              <AlertCircle class="w-3 h-3" />
              {{ retroTicketSearchError }}
            </p>
            <div
              v-if="selectedRetroTicket"
              class="mt-2 flex items-center gap-2 px-3 py-2 bg-white rounded-xl border-2 border-[#50bdeb]/40"
            >
              <span class="text-xs font-bold text-[#021C7D]"
                >#{{ selectedRetroTicket.id_ticket }}</span
              >
              <span class="text-xs text-slate-600 truncate flex-1">{{
                selectedRetroTicket.ticket_title
              }}</span>
              <button
                @click="selectedRetroTicket = null; retroTicketIdInput = null; retroTicketSearchError = ''"
                class="flex-shrink-0"
              >
                <X class="w-3 h-3 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
          </div>

          <button
            @click="registerRetroTime"
            :disabled="!selectedTimeUser || !retroDate || !retroTimeValid || !selectedRetroTicket || isRegisteringTime"
            :class="[
              'w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2',
              selectedTimeUser && retroDate && retroTimeValid && selectedRetroTicket && !isRegisteringTime
                ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white hover:opacity-90'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed',
            ]"
          >
            <div v-if="isRegisteringTime" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <Plus v-else class="w-4 h-4" />
            {{ isRegisteringTime ? 'Registrando...' : 'Registrar Tiempo' }}
          </button>
        </div>
      </div>
    </div>

    <DriverReportModal
      :isOpen="showDriverModal"
      @close="showDriverModal = false"
      @generate="handleDriverReport"
    />
    <GeneralExportModal
      :isOpen="showGeneralExportModal"
      @close="showGeneralExportModal = false"
      @export="handleGeneralExport"
    />

    <!-- Export state is shown in AppHeader -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  ChartBar,
  X,
  FileText,
  FileSpreadsheet,
  FileDown,
  BarChart3,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  User as UserIcon,
  Plus,
  Check,
} from "lucide-vue-next";
import { eUsersService } from "../services/e-usersService";
import { TicketsService } from "../services/ticketsService";
import { StatusService } from "../services/statusService";
import { type EUser } from "../models";
import { type Ticket } from "../models/Ticket";
import { type Status } from "../models/Status";
import CircularProgressChart from "../components/CircularProgressChart.vue";
import LineComparisonChart from "../components/LineComparisonChart.vue";
import DriverReportModal, {
  type DriverReportParams,
} from "../components/DriverReportModal.vue";
import GeneralExportModal, {
  type GeneralExportParams,
} from "../components/GeneralExportModal.vue";
import ExportChartsToPDF from "../components/ExportChartsToPDF.vue";
import { useNotification } from "../utils/useNotification";
import { useExportStore } from "../utils/useExportStore";
import { GeneralExportService } from "../services/generalExportService";
import { ReportedTimeService } from "../services/reportedTimeService";
import { DriverReportService } from "../services/driverReportService";
import { useDriverExportStore } from "../utils/useDriverExportStore";

const notification = useNotification();
const searchQuery = ref("");
const selectedUser = ref<EUser | null>(null);
const allUsers = ref<EUser[]>([]);
const isLoading = ref(false);
const showDropdown = ref(false);
const isLoadingMetrics = ref(false);
const cumplimientoValue = ref(0);
const ocupacionValue = ref(0);
const ticketsCreatedData = ref<number[]>([]);
const ticketsClosedData = ref<number[]>([]);
const timeCategories = ref<string[]>([]);
const isLoadingWeeklyStats = ref(false);
const eUserService = new eUsersService();
const ticketsService = new TicketsService();
const statusService = new StatusService();
const generalExportService = new GeneralExportService();
const reportedTimeService = new ReportedTimeService();
const driverReportService = new DriverReportService();
const { setGenerating, setReady, setError } = useExportStore();
const { setGenerating: setDriverGenerating, setReady: setDriverReady, setError: setDriverError } = useDriverExportStore();
const showDriverModal = ref(false);
const showGeneralExportModal = ref(false);

const exportOptions = ref([
  {
    id: "driver",
    name: "Driver",
    description: "Reporte de gestión y seguimiento",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: "general-export",
    name: "Exporte General",
    description: "Exportar datos con filtros avanzados",
    icon: FileSpreadsheet,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
]);

const selectedUserFullName = computed(() => {
  if (!selectedUser.value) return "";
  return getFullName(selectedUser.value);
});

const handleExport = (exportType: string) => {
  if (exportType === "driver") {
    showDriverModal.value = true;
  } else if (exportType === "general-export") {
    showGeneralExportModal.value = true;
  }
};

// Manejar generación del reporte Driver
const handleDriverReport = async (params: DriverReportParams) => {
  setDriverGenerating();

  try {
    const filters = {
      fecha_desde: params.dateFrom,
      fecha_hasta: params.dateTo,
      ...(params.client && { cliente: params.client.client_name }),
      ...(params.eUser && { network_user: params.eUser.network_user }),
    };

    const response = await driverReportService.getReport(filters);

    if (response.success && response.data) {
      const rows = response.data.results.map((row) => ({
        euser_nombre: row.euser_nombre,
        network_user: row.network_user,
        cliente: row.cliente,
        id_ticket: row.id_ticket,
        ticket_title: row.ticket_title,
        fecha_creacion: formatExportDate(row.fecha_creacion),
        fecha_cierre: formatExportDate(row.fecha_cierre),
        fecha_estimada_cierre: formatExportDate(row.fecha_estimada_cierre),
        tiempo_ticket: formatExportTime(row.tiempo_ticket),
        tiempo_usuario_cliente: formatExportTime(row.tiempo_usuario_cliente),
        porcentaje_cliente: `${row.porcentaje_cliente.toFixed(1)}%`,
        tiempo_total_usuario: formatExportTime(row.tiempo_total_usuario),
        cumple: row.cumple ? "Sí" : "No",
      }));

      setDriverReady(rows);

      if (rows.length === 0) {
        notification.error(
          "Sin resultados",
          "No se encontraron registros con los filtros aplicados.",
        );
      } else {
        notification.success(
          "Reporte Driver listo",
          `${rows.length} registros listos para descargar.`,
        );
      }
    } else {
      setDriverError();
      notification.error(
        "Error",
        response.message || "No se pudo generar el Reporte Driver",
      );
    }
  } catch {
    setDriverError();
    notification.error("Error", "Error al generar el Reporte Driver");
  }
};

// Formatear fecha ISO a dd/mm/yyyy
const formatExportDate = (iso: string | null): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Formatear tiempo HH:MM:SS -> "Xh Ymin"
const formatExportTime = (time: string): string => {
  const parts = time.split(":").map(Number);
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};

// Manejar exportación general
const handleGeneralExport = async (params: GeneralExportParams) => {
  setGenerating();

  try {
    const filters = {
      fecha_desde: params.dateFrom,
      fecha_hasta: params.dateTo,
      ...(params.client && { cliente: params.client.client_name }),
      ...(params.service && { id_servicio: params.service.id_services }),
      ...(params.eUser && { network_user: params.eUser.network_user }),
      ...(params.cumple !== undefined &&
        params.cumple !== null && { cumple: params.cumple }),
    };

    const response = await generalExportService.getReport(filters);

    if (response.success && response.data) {
      const rows = response.data.results.map((row) => ({
        id_ticket: row.id_ticket,
        fecha_creacion: formatExportDate(row.fecha_creacion),
        cliente: row.cliente,
        tipo_servicio: row.tipo_servicio,
        tiempo_total: formatExportTime(row.tiempo_total),
        euser_nombre: row.euser_nombre,
        cumple: row.cumple ? "Sí" : "No",
        fecha_cierre: formatExportDate(row.fecha_cierre),
        fecha_estimada_cierre: formatExportDate(row.fecha_estimada_cierre),
      }));
      setReady(rows);

      if (rows.length === 0) {
        notification.error(
          "Sin resultados",
          "No se encontraron tickets con los filtros aplicados.",
        );
      } else {
        notification.success(
          "Reporte listo",
          `${rows.length} registros listos para descargar.`,
        );
      }
    } else {
      setError();
      notification.error(
        "Error",
        response.message || "No se pudo generar el reporte",
      );
    }
  } catch {
    setError();
    notification.error("Error", "Error al generar el reporte general");
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value.slice(0, 10);

  const query = searchQuery.value.toLowerCase();
  return allUsers.value
    .filter((user) => {
      const fullName = getFullName(user).toLowerCase();
      const email = user.email?.toLowerCase() || "";
      const networkUser = user.network_user.toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        networkUser.includes(query)
      );
    })
    .slice(0, 10);
});

const loadUsers = async () => {
  isLoading.value = true;
  try {
    const response = await eUserService.getAll();
    if (response.data && response.data.results) {
      allUsers.value = response.data.results || [];
    }
  } catch (error) {
    notification.error("Error", "No se pudieron cargar los usuarios");
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  showDropdown.value = true;
};

const selectUser = async (user: EUser) => {
  selectedUser.value = user;
  searchQuery.value = getFullName(user);
  showDropdown.value = false;

  await loadMetrics(user.network_user);
};

const clearSelection = () => {
  selectedUser.value = null;
  searchQuery.value = "";
  showDropdown.value = false;
  cumplimientoValue.value = 0;
  ocupacionValue.value = 0;
};

const loadMetrics = async (networkUser: string) => {
  isLoadingMetrics.value = true;
  try {
    const now = new Date();
    const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1);
    const fechaDesde = primerDiaMes.toISOString().split("T")[0];
    const fechaHasta = now.toISOString().split("T")[0];

    const cumplimientoResponse = await eUserService.getMetricasCumplimiento(
      networkUser,
      fechaDesde,
      fechaHasta,
    );

    if (cumplimientoResponse.success && cumplimientoResponse.data) {
      cumplimientoValue.value = Math.round(
        cumplimientoResponse.data.data.porcentaje_cumplimiento,
      );
    }

    try {
      const ocupacionResponse = await eUserService.getMetricasOcupacion(
        networkUser,
        fechaDesde,
        fechaHasta,
      );

      if (ocupacionResponse.success && ocupacionResponse.data) {
        ocupacionValue.value = Math.round(
          ocupacionResponse.data.data.porcentaje_ocupacion,
        );
      }
    } catch (error) {
      notification.error("Error", "Error al cargar métricas de ocupación");
      ocupacionValue.value = 0;
    }
  } catch (error) {
    notification.error("Error", "Error al cargar métricas del usuario");
    cumplimientoValue.value = 0;
    ocupacionValue.value = 0;
  } finally {
    isLoadingMetrics.value = false;
  }
};

const loadWeeklyStats = async () => {
  isLoadingWeeklyStats.value = true;
  try {
    const response = await ticketsService.getWeeklyStats();

    if (response.success && response.data) {
      const stats = response.data.data;
      timeCategories.value = stats.datos_diarios.map((d) => d.dia);
      ticketsCreatedData.value = stats.datos_diarios.map((d) => d.creados);
      ticketsClosedData.value = stats.datos_diarios.map((d) => d.cerrados);
    }
  } catch (error) {
    notification.error("Error", "Error al cargar estadísticas semanales");
  } finally {
    isLoadingWeeklyStats.value = false;
  }
};

const getFullName = (user: EUser): string => {
  const parts = [
    user.name,
    user.middle_name,
    user.last_name,
    user.second_last_name,
  ].filter(Boolean);
  return parts.join(" ");
};

const getInitials = (user: EUser): string => {
  const name = user.name?.charAt(0) || "";
  const lastName = user.last_name?.charAt(0) || "";
  return (name + lastName).toUpperCase();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    showDropdown.value = false;
    showTimeUserDropdown.value = false;
  }
};

// ─── Ajustes de Parámetros ───────────────────────────────────────────────────

const STATUS_COLORS = ["#94a3b8", "#6366f1", "#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6", "#f97316"];
const allStatuses = ref<Status[]>([]);

const statusesWithColor = computed(() =>
  allStatuses.value.map((s, i) => ({ ...s, color: STATUS_COLORS[i % STATUS_COLORS.length] }))
);

const loadStatuses = async () => {
  try {
    const response = await statusService.getAll();
    if (response.success && response.data?.results) {
      allStatuses.value = (response.data.results as unknown as Status[]).flat();
    }
  } catch {
    notification.error("Error", "No se pudieron cargar los estados");
  }
};

// Ticket completion
const ticketIdInput = ref<number | null>(null);
const ticketSearchError = ref("");
const isSearchingTicket = ref(false);
const isSavingTicket = ref(false);
const selectedTicket = ref<Ticket | null>(null);
const ticketCompletionStatus = ref(false);
const selectedStatus = ref<number | null>(null);
const originalStatusId = ref<number | null>(null);
const estimatedClosingDate = ref<string>("");

const searchTicketById = async () => {
  ticketSearchError.value = "";
  if (!ticketIdInput.value) {
    ticketSearchError.value = "Ingresa un ID válido.";
    return;
  }
  isSearchingTicket.value = true;
  try {
    const response = await ticketsService.getTicketById(Number(ticketIdInput.value));
    if (response.success && response.data) {
      selectedTicket.value = response.data;
      ticketCompletionStatus.value = response.data.cumplimiento ?? false;
      selectedStatus.value = response.data.status_id;
      originalStatusId.value = response.data.status_id;
      estimatedClosingDate.value = response.data.estimated_closing_date ?? "";
    } else {
      selectedTicket.value = null;
      ticketSearchError.value = `No se encontró el ticket #${ticketIdInput.value}.`;
    }
  } catch {
    selectedTicket.value = null;
    ticketSearchError.value = `No se encontró el ticket #${ticketIdInput.value}.`;
  } finally {
    isSearchingTicket.value = false;
  }
};

const clearTicketSelection = () => {
  selectedTicket.value = null;
  ticketIdInput.value = null;
  ticketSearchError.value = "";
  ticketCompletionStatus.value = false;
  selectedStatus.value = null;
  originalStatusId.value = null;
  estimatedClosingDate.value = "";
};

const applyTicketChanges = async () => {
  if (!selectedTicket.value || selectedStatus.value === null) return;
  isSavingTicket.value = true;
  try {
    const response = await ticketsService.patchTicket(
      {
        status_id: selectedStatus.value,
        cumplimiento: ticketCompletionStatus.value,
        ...(estimatedClosingDate.value ? { estimated_closing_date: estimatedClosingDate.value } : {}),
      },
      selectedTicket.value.id_ticket,
    );
    if (response.success) {
      originalStatusId.value = selectedStatus.value;
      notification.success("Cambios guardados", `Ticket #${selectedTicket.value.id_ticket} actualizado correctamente.`);
    } else {
      notification.error("Error", response.message || "No se pudieron guardar los cambios.");
    }
  } catch {
    notification.error("Error", "Error al guardar los cambios del ticket.");
  } finally {
    isSavingTicket.value = false;
  }
};

const timeUserSearchQuery = ref("");
const showTimeUserDropdown = ref(false);
const selectedTimeUser = ref<EUser | null>(null);
const retroDate = ref("");
const retroHours = ref<number | null>(null);
const retroMinutes = ref<number | null>(null);

const retroTimeValid = computed(
  () =>
    retroHours.value !== null &&
    retroMinutes.value !== null &&
    (retroHours.value > 0 || retroMinutes.value > 0),
);
const retroTicketIdInput = ref<number | null>(null);
const retroTicketSearchError = ref("");
const isSearchingRetroTicket = ref(false);
const selectedRetroTicket = ref<Ticket | null>(null);

const todayDate = computed(() => new Date().toISOString().split("T")[0]);

const filteredTimeUsers = computed(() => {
  if (!timeUserSearchQuery.value) return allUsers.value.slice(0, 8);
  const query = timeUserSearchQuery.value.toLowerCase();
  return allUsers.value
    .filter((u) => {
      const fullName = getFullName(u).toLowerCase();
      const email = u.email?.toLowerCase() || "";
      const networkUser = u.network_user.toLowerCase();
      return (
        fullName.includes(query) ||
        email.includes(query) ||
        networkUser.includes(query)
      );
    })
    .slice(0, 8);
});

const searchRetroTicketById = async () => {
  retroTicketSearchError.value = "";
  if (!retroTicketIdInput.value) {
    retroTicketSearchError.value = "Ingresa un ID válido.";
    return;
  }
  isSearchingRetroTicket.value = true;
  try {
    const response = await ticketsService.getTicketById(Number(retroTicketIdInput.value));
    if (response.success && response.data) {
      selectedRetroTicket.value = response.data;
    } else {
      selectedRetroTicket.value = null;
      retroTicketSearchError.value = `No se encontró el ticket #${retroTicketIdInput.value}.`;
    }
  } catch {
    selectedRetroTicket.value = null;
    retroTicketSearchError.value = `No se encontró el ticket #${retroTicketIdInput.value}.`;
  } finally {
    isSearchingRetroTicket.value = false;
  }
};

const selectTimeUser = (user: EUser) => {
  selectedTimeUser.value = user;
  timeUserSearchQuery.value = getFullName(user);
  showTimeUserDropdown.value = false;
};

const clearTimeUser = () => {
  selectedTimeUser.value = null;
  timeUserSearchQuery.value = "";
};

const isRegisteringTime = ref(false);

const registerRetroTime = async () => {
  if (!selectedTimeUser.value || !retroDate.value || !retroTimeValid.value || !selectedRetroTicket.value) return;

  const hours = retroHours.value ?? 0;
  const minutes = retroMinutes.value ?? 0;
  const reportedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

  isRegisteringTime.value = true;
  try {
    const response = await reportedTimeService.createReportedTime({
      reported_time: reportedTime,
      date_reported: retroDate.value,
      id_ticket: selectedRetroTicket.value.id_ticket,
      network_user: selectedTimeUser.value.network_user,
    });

    if (response.success) {
      notification.success(
        "Tiempo registrado",
        `${hours}h ${minutes}min registrados para ${selectedTimeUser.value.network_user} en ticket #${selectedRetroTicket.value.id_ticket}.`,
      );
      // Reset form
      retroDate.value = "";
      retroHours.value = null;
      retroMinutes.value = null;
      selectedRetroTicket.value = null;
      retroTicketIdInput.value = null;
      retroTicketSearchError.value = "";
      selectedTimeUser.value = null;
      timeUserSearchQuery.value = "";
    } else {
      notification.error("Error", response.message || "No se pudo registrar el tiempo.");
    }
  } catch {
    notification.error("Error", "Error al registrar el tiempo retroactivo.");
  } finally {
    isRegisteringTime.value = false;
  }
};



onMounted(() => {
  loadUsers();
  loadWeeklyStats();
  loadStatuses();
  document.addEventListener("click", handleClickOutside);
});
</script>
