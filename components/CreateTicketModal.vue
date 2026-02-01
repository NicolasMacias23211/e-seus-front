<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden animate-scale-in"
    >
      <div
        class="bg-gradient-to-r from-[#021C7D] to-[#50bdeb] text-white px-6 py-5 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Crear Nuevo Ticket</h2>
            <p class="text-sm text-blue-100 font-medium">
              Complete los datos para crear el ticket
            </p>
          </div>
        </div>
        <button
          @click="closeModal"
          class="p-2 hover:bg-white/20 rounded-lg transition-all"
          type="button"
        >
          <svg
            class="w-6 h-6"
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

      <div class="overflow-y-auto max-h-[calc(95vh-180px)] p-6">
        <div
          v-if="isLoadingData"
          class="flex flex-col items-center justify-center py-12"
        >
          <svg
            class="animate-spin h-12 w-12 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="text-slate-600 font-medium">Cargando datos...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit">
          <div class="mb-5">
            <label
              for="title"
              class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                />
              </svg>
              Título del Ticket <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="form.ticketTitle"
              type="text"
              required
              maxlength="45"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
              placeholder="Ej: Error en el sistema de reportes"
            />
          </div>

          <div class="mb-5">
            <label
              for="description"
              class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Descripción <span class="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              v-model="form.ticketDescription"
              required
              maxlength="250"
              rows="4"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none hover:border-blue-300"
              placeholder="Describa detalladamente el problema o solicitud..."
            ></textarea>
            <div class="text-right text-sm text-slate-500 mt-1 font-medium">
              {{ form.ticketDescription.length }}/250 caracteres
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                for="service"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Servicio <span class="text-red-500">*</span>
              </label>
              <select
                id="service"
                v-model="form.ticketService"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
              >
                <option value="" disabled>Seleccione un servicio</option>
                <option
                  v-for="service in services"
                  :key="service.id_services"
                  :value="service.id_services"
                >
                  {{ service.service_name }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="priority"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                Prioridad <span class="text-red-500">*</span>
              </label>
              <select
                id="priority"
                v-model="form.ticketPriority"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
              >
                <option value="" disabled>Seleccione una prioridad</option>
                <option
                  v-for="priority in priorities"
                  :key="priority.priority_name"
                  :value="priority.priority_name"
                >
                  {{ priority.priority_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5">
            <label
              for="client"
              class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              Cliente <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="client"
                v-model="clientSearch"
                @input="filterClients"
                @focus="handleClientFocus"
                @blur="hideClientDropdown"
                type="text"
                required
                autocomplete="off"
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                placeholder="Buscar cliente..."
              />
              <div
                v-if="showClientDropdown && filteredClients.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
              >
                <div
                  v-for="client in filteredClients"
                  :key="client.name"
                  @mousedown.prevent="selectClient(client)"
                  class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                >
                  {{ client.name }}
                </div>
              </div>
              <div
                v-if="
                  showClientDropdown &&
                  clientSearch &&
                  filteredClients.length === 0
                "
                class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl p-4 text-slate-500 text-sm font-medium"
              >
                No se encontraron clientes
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                for="program"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                  />
                </svg>
                Programa <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="program"
                  v-model="programSearch"
                  @input="filterPrograms"
                  @focus="showProgramDropdown = true"
                  @blur="hideProgramDropdown"
                  type="text"
                  required
                  autocomplete="off"
                  :disabled="!form.clientName"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed hover:border-blue-300"
                  placeholder="Buscar programa..."
                />
                <div
                  v-if="showProgramDropdown && filteredPrograms.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
                >
                  <div
                    v-for="program in filteredPrograms"
                    :key="program.name"
                    @mousedown.prevent="selectProgram(program)"
                    class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                  >
                    {{ program.name }}
                  </div>
                </div>
                <div
                  v-if="
                    showProgramDropdown &&
                    programSearch &&
                    filteredPrograms.length === 0
                  "
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl p-4 text-slate-500 text-sm font-medium"
                >
                  No se encontraron programas
                </div>
              </div>
            </div>

            <div>
              <label
                for="subprogram"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Subprograma <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="subprogram"
                  v-model="subProgramSearch"
                  @input="filterSubPrograms"
                  @focus="showSubProgramDropdown = true"
                  @blur="hideSubProgramDropdown"
                  type="text"
                  required
                  autocomplete="off"
                  :disabled="!form.programName"
                  class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed hover:border-blue-300"
                  placeholder="Buscar subprograma..."
                />
                <div
                  v-if="
                    showSubProgramDropdown && filteredSubPrograms.length > 0
                  "
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"
                >
                  <div
                    v-for="subprogram in filteredSubPrograms"
                    :key="subprogram.name"
                    @mousedown.prevent="selectSubProgram(subprogram)"
                    class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                  >
                    {{ subprogram.name }}
                  </div>
                </div>
                <div
                  v-if="
                    showSubProgramDropdown &&
                    subProgramSearch &&
                    filteredSubPrograms.length === 0
                  "
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl p-4 text-slate-500 text-sm font-medium"
                >
                  No se encontraron subprogramas
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                for="ans"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
                ANS <span class="text-red-500">*</span>
              </label>
              <select
                id="ans"
                v-model="form.ticketAns"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
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

            <div>
              <label
                for="status"
                class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Estado <span class="text-red-500">*</span>
              </label>
              <select
                id="status"
                v-model="form.statusId"
                required
                class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white"
              >
                <option value="" disabled>Seleccione un estado</option>
                <option
                  v-for="status in statusList"
                  :key="status.id_status"
                  :value="status.id_status"
                >
                  {{ status.status_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5">
            <label
              class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"
            >
              <svg
                class="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clip-rule="evenodd"
                />
              </svg>
              Archivos Adjuntos (Opcional)
            </label>
            <div
              class="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all bg-slate-50"
            >
              <input
                id="file-upload"
                type="file"
                multiple
                @change="handleFileUpload"
                class="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt,.zip"
              />
              <label
                for="file-upload"
                class="cursor-pointer flex flex-col items-center"
              >
                <svg
                  class="w-12 h-12 text-blue-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="text-sm font-bold text-slate-700 mb-1">
                  Haga clic para subir archivos
                </span>
                <span class="text-xs text-slate-500">
                  PDF, DOC, XLS, imágenes (máx. 10MB por archivo)
                </span>
              </label>
            </div>
            <div v-if="uploadedFiles.length > 0" class="mt-4 space-y-2">
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
              >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <svg
                    class="w-8 h-8 text-blue-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-bold text-slate-700 truncate">
                      {{ file.name }}
                    </p>
                    <p class="text-xs text-slate-500 font-medium">
                      {{ formatFileSize(file.size) }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="ml-3 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="showSuccess"
            class="mb-5 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 rounded-xl shadow-lg flex items-center gap-3"
          >
            <div class="p-2 bg-green-500 rounded-full">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p class="font-bold">¡Ticket creado exitosamente!</p>
              <p class="text-sm font-medium">
                ID del Ticket:
                <span class="font-bold">{{ createdTicketId }}</span>
              </p>
            </div>
          </div>

          <div
            v-if="errorMessage"
            class="mb-5 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800 rounded-xl shadow-lg flex items-center gap-3"
          >
            <div class="p-2 bg-red-500 rounded-full">
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
            </div>
            <div>
              <p class="font-bold">Error</p>
              <p class="text-sm font-medium">{{ errorMessage }}</p>
            </div>
          </div>
        </form>
      </div>

      <div
        class="bg-slate-50 px-6 py-4 flex gap-3 justify-end border-t-2 border-slate-100"
      >
        <button
          type="button"
          @click="closeModal"
          :disabled="isLoadingData"
          class="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          @click="handleSubmit"
          :disabled="isSubmitting || isLoadingData || isUploadingFiles"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500"
        >
          <span
            v-if="!isSubmitting && !isUploadingFiles"
            class="flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Crear Ticket
          </span>
          <span v-else-if="isUploadingFiles" class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Subiendo archivos...
          </span>
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creando ticket...
          </span>
        </button>
      </div>
    </div>

    <ConfirmDialog
      :is-visible="showConfirmClose"
      type="warning"
      title="¿Cerrar sin guardar?"
      message="¿Está seguro de que desea cerrar el formulario? Se perderán todos los datos ingresados."
      details="Esta acción no se puede deshacer. Todos los campos del formulario serán limpiados."
      confirm-text="Sí, Cerrar"
      cancel-text="Continuar Editando"
      @confirm="handleConfirmClose"
      @cancel="handleCancelClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import type { TicketCreate } from "../models/Ticket";
import type { Service } from "../models/Service";
import type { TicketPriority } from "../models/TicketPriority";
import type { Client } from "../models/Client";
import type { Program } from "../models/Program";
import type { SubProgram } from "../models/SubProgram";
import type { ANS } from "../models/ANS";
import type { Status } from "../models/Status";
import { ServiceService } from "../services/serviceService";
import { TicketPriorityService } from "../services/ticketPriorityService";
import { ClientsService } from "../services/clientsService";
import { ProgramsService } from "../services/programsService";
import { SubProgramsService } from "../services/subProgramsService";
import { AnsService } from "../services/ansService";
import { StatusService } from "../services/statusService";
import { TicketsService } from "../services/ticketsService";
import { SessionStorageService } from "../services/SessionStorageService";
import { FileUploadService } from "../services/fileUploadService";
import ConfirmDialog from "./ConfirmDialog.vue";

const serviceService = new ServiceService();
const priorityService = new TicketPriorityService();
const clientsService = new ClientsService();
const programsService = new ProgramsService();
const subProgramsService = new SubProgramsService();
const ansService = new AnsService();
const statusService = new StatusService();
const ticketsService = new TicketsService();
const sessionStorage = new SessionStorageService();
const fileUploadService = new FileUploadService();

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "ticketCreated", ticket: TicketCreate): void;
}>();

const form = reactive({
  ticketTitle: "",
  ticketDescription: "",
  ticketAttachments: "",
  ticketService: "" as number | "",
  ticketPriority: "",
  ticketAns: "" as number | "",
  reporterUser: "",
  clientName: "",
  programName: "",
  subProgramName: "",
  statusId: "" as number | "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);
const createdTicketId = ref<number | null>(null);
const errorMessage = ref("");
const showConfirmClose = ref(false);
const isUploadingFiles = ref(false);
const uploadedFileNames = ref<string[]>([]);

const clientSearch = ref("");
const programSearch = ref("");
const subProgramSearch = ref("");
const showClientDropdown = ref(false);
const showProgramDropdown = ref(false);
const showSubProgramDropdown = ref(false);
const filteredClients = ref<Array<{ name: string }>>([]);
const filteredPrograms = ref<Array<{ name: string; clientName: string }>>([]);
const filteredSubPrograms = ref<Array<{ name: string; programName: string }>>(
  [],
);

const uploadedFiles = ref<File[]>([]);

const services = ref<Service[]>([]);
const priorities = ref<TicketPriority[]>([]);
const clients = ref<Client[]>([]);
const programs = ref<Program[]>([]);
const subPrograms = ref<SubProgram[]>([]);
const ansList = ref<ANS[]>([]);
const statusList = ref<Status[]>([]);
const isLoadingData = ref(false);

const loadData = async () => {
  try {
    isLoadingData.value = true;

    const [
      servicesRes,
      prioritiesRes,
      clientsRes,
      programsRes,
      subProgramsRes,
      ansRes,
      statusRes,
    ] = await Promise.all([
      serviceService.getAll(),
      priorityService.getAll(),
      clientsService.getAll(),
      programsService.getAll(),
      subProgramsService.getAll(),
      ansService.getAll(),
      statusService.getAll(),
    ]);

    if (servicesRes.success && servicesRes.data?.results) {
      services.value = servicesRes.data.results;
    }

    if (prioritiesRes.success && prioritiesRes.data?.results) {
      priorities.value = prioritiesRes.data.results;
    }

    if (clientsRes.success && clientsRes.data?.results) {
      clients.value = clientsRes.data.results;
    }

    if (programsRes.success && programsRes.data?.results) {
      programs.value = programsRes.data.results;
    }

    if (subProgramsRes.success && subProgramsRes.data?.results) {
      subPrograms.value = subProgramsRes.data.results;
    }

    if (ansRes.success && ansRes.data?.results) {
      ansList.value = ansRes.data.results;
    }

    if (statusRes.success && statusRes.data?.results) {
      statusList.value = statusRes.data.results;
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    errorMessage.value = "Error al cargar los datos del formulario";
  } finally {
    isLoadingData.value = false;
  }
};

const filterClients = () => {
  const search = clientSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredClients.value = clients.value.map((c) => ({
      name: c.client_name,
    }));
  } else {
    filteredClients.value = clients.value
      .filter((client) => client.client_name.toLowerCase().includes(search))
      .map((c) => ({ name: c.client_name }));
  }
};

const selectClient = (client: { name: string }) => {
  form.clientName = client.name;
  clientSearch.value = client.name;
  showClientDropdown.value = false;
  form.programName = "";
  form.subProgramName = "";
  programSearch.value = "";
  subProgramSearch.value = "";
};

const handleClientFocus = () => {
  showClientDropdown.value = true;
  filterClients();
};

const hideClientDropdown = () => {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 200);
};

const filterPrograms = () => {
  const search = programSearch.value.toLowerCase();
  const clientPrograms = programs.value.filter(
    (p) => p.client_name.toLowerCase() === form.clientName.toLowerCase(),
  );

  if (search.length === 0) {
    filteredPrograms.value = clientPrograms.map((p) => ({
      name: p.program_name,
      clientName: p.client_name,
    }));
  } else {
    filteredPrograms.value = clientPrograms
      .filter((program) => program.program_name.toLowerCase().includes(search))
      .map((p) => ({ name: p.program_name, clientName: p.client_name }));
  }
};

const selectProgram = (program: { name: string; clientName: string }) => {
  form.programName = program.name;
  programSearch.value = program.name;
  showProgramDropdown.value = false;
  form.subProgramName = "";
  subProgramSearch.value = "";
};

const handleProgramFocus = () => {
  if (!form.clientName) return;
  showProgramDropdown.value = true;
  filterPrograms();
};

const hideProgramDropdown = () => {
  setTimeout(() => {
    showProgramDropdown.value = false;
  }, 200);
};

const filterSubPrograms = () => {
  const search = subProgramSearch.value.toLowerCase();
  const programSubPrograms = subPrograms.value.filter(
    (sp) => sp.program_name.toLowerCase() === form.programName.toLowerCase(),
  );

  if (search.length === 0) {
    filteredSubPrograms.value = programSubPrograms.map((sp) => ({
      name: sp.sub_program_name,
      programName: sp.program_name,
    }));
  } else {
    filteredSubPrograms.value = programSubPrograms
      .filter((subprogram) =>
        subprogram.sub_program_name.toLowerCase().includes(search),
      )
      .map((sp) => ({
        name: sp.sub_program_name,
        programName: sp.program_name,
      }));
  }
};

const selectSubProgram = (subprogram: {
  name: string;
  programName: string;
}) => {
  form.subProgramName = subprogram.name;
  subProgramSearch.value = subprogram.name;
  showSubProgramDropdown.value = false;
};

const handleSubProgramFocus = () => {
  if (!form.programName) return;
  showSubProgramDropdown.value = true;
  filterSubPrograms();
};

const hideSubProgramDropdown = () => {
  setTimeout(() => {
    showSubProgramDropdown.value = false;
  }, 200);
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files);

    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize) {
        errorMessage.value = `El archivo ${file.name} excede el tamaño máximo de 10MB`;
        setTimeout(() => {
          errorMessage.value = "";
        }, 5000);
        return false;
      }
      return true;
    });

    uploadedFiles.value = [...uploadedFiles.value, ...validFiles];
    target.value = "";
  }
};

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    showSuccess.value = false;

    if (!form.ticketTitle.trim()) {
      errorMessage.value = "El título es requerido";
      return;
    }

    if (!form.ticketDescription.trim()) {
      errorMessage.value = "La descripción es requerida";
      return;
    }

    if (!form.clientName) {
      errorMessage.value = "Debe seleccionar un cliente";
      return;
    }

    if (!form.programName) {
      errorMessage.value = "Debe seleccionar un programa";
      return;
    }

    if (!form.subProgramName) {
      errorMessage.value = "Debe seleccionar un subprograma";
      return;
    }

    // Subir archivos si hay alguno
    let fileNames: string[] = [];
    if (uploadedFiles.value.length > 0) {
      isUploadingFiles.value = true;
      const uploadResponse = await fileUploadService.uploadFiles(
        uploadedFiles.value,
      );

      if (uploadResponse.success && uploadResponse.data) {
        fileNames = uploadResponse.data;
        uploadedFileNames.value = fileNames;
      } else {
        errorMessage.value =
          uploadResponse.message || "Error al subir los archivos";
        return;
      }
      isUploadingFiles.value = false;
    }

    const newTicket: TicketCreate = {
      ticket_title: form.ticketTitle,
      ticket_description: form.ticketDescription,
      ticket_attachments: fileNames.length > 0 ? fileNames.join(", ") : null,
      ticket_service: form.ticketService as number,
      ticket_priority: form.ticketPriority,
      ticket_ans: form.ticketAns as number,
      sub_program_name: form.subProgramName,
      reporter_user: sessionStorage.getUserInfo()?.username || "",
      status_id: form.statusId as number,
      assigned_to: sessionStorage.getUserInfo()?.username || "",
    };

    const response = await ticketsService.create(newTicket);

    if (response.success && response.data) {
      createdTicketId.value = response.data.id_ticket;
      showSuccess.value = true;

      emit("ticketCreated", newTicket);

      setTimeout(() => {
        resetForm();
        closeModal();
      }, 2000);
    } else {
      errorMessage.value = response.message || "Error al crear el ticket";
    }
  } catch (error) {
    errorMessage.value =
      "Error al crear el ticket. Por favor intente nuevamente.";
    console.error("Error:", error);
  } finally {
    isSubmitting.value = false;
    isUploadingFiles.value = false;
  }
};

const closeModal = () => {
  if (isSubmitting.value) return;

  if (
    form.ticketTitle ||
    form.ticketDescription ||
    form.clientName ||
    uploadedFiles.value.length > 0
  ) {
    showConfirmClose.value = true;
    return;
  }

  resetForm();
  emit("update:modelValue", false);
};

const handleConfirmClose = () => {
  showConfirmClose.value = false;
  resetForm();
  emit("update:modelValue", false);
};

const handleCancelClose = () => {
  showConfirmClose.value = false;
};

const resetForm = () => {
  form.ticketTitle = "";
  form.ticketDescription = "";
  form.ticketAttachments = "";
  form.ticketService = "";
  form.ticketPriority = "";
  form.ticketAns = "";
  form.reporterUser = "";
  form.clientName = "";
  form.programName = "";
  form.subProgramName = "";
  form.statusId = "";
  clientSearch.value = "";
  programSearch.value = "";
  subProgramSearch.value = "";
  uploadedFiles.value = [];
  uploadedFileNames.value = [];
  showSuccess.value = false;
  createdTicketId.value = null;
  errorMessage.value = "";
  isUploadingFiles.value = false;
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      showSuccess.value = false;
      errorMessage.value = "";
    } else {
      loadData();
    }
  },
);

onMounted(() => {
  loadData();
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

::-webkit-scrollbar {
  width: 8px;
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
