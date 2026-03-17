<template>
  <div
    class="min-h-screen relative p-6 overflow-hidden"
    style="
      background: linear-gradient(
        135deg,
        #1e3a8a 0%,
        #0f172a 50%,
        #1e1b4b 100%
      );
    "
  >
    <div
      class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="
        background-image:
          linear-gradient(rgba(59, 130, 246, 0.5) 1.5px, transparent 1.5px),
          linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.5) 1.5px,
            transparent 1.5px
          );
        background-size: 50px 50px;
      "
    ></div>
    <div
      class="absolute inset-0 opacity-[0.05] pointer-events-none"
      style="
        background-image: radial-gradient(
          circle,
          rgba(96, 165, 250, 0.4) 1px,
          transparent 1px
        );
        background-size: 20px 20px;
      "
    ></div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-float-orb"
      ></div>
      <div
        class="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/25 to-blue-600/25 rounded-full blur-3xl animate-float-orb-reverse"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
      ></div>
      <div
        class="absolute top-20 right-1/4 w-32 h-32 border border-blue-400/10 rounded-2xl rotate-12 animate-float-slow"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-24 h-24 border border-cyan-400/10 rounded-full animate-float"
      ></div>
      <div
        class="absolute top-1/3 left-10 w-20 h-20 border-2 border-indigo-400/10 rounded-lg -rotate-12 animate-float-slow"
      ></div>
      <div
        class="absolute bottom-1/4 right-20 w-28 h-28 border border-purple-400/10 rounded-3xl rotate-45 animate-float"
      ></div>
      <div
        class="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-blue-400/20 to-transparent animate-fade-in-out"
      ></div>
      <div
        class="absolute top-1/3 right-1/3 w-px h-40 bg-gradient-to-b from-cyan-400/20 to-transparent animate-fade-in-out"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-20 left-1/3 w-px h-36 bg-gradient-to-b from-indigo-400/20 to-transparent animate-fade-in-out"
        style="animation-delay: 2s"
      ></div>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/40 via-cyan-400/40 to-transparent"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/40 via-blue-400/40 to-transparent"
    ></div>
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-8">
        <h1
          class="text-5xl font-bold text-white mb-3 drop-shadow-2xl tracking-wide bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent"
        >
          Gestión de Tickets
        </h1>
        <p class="text-blue-200/90 text-lg font-medium drop-shadow-lg">
          Aqui podras crear tickets al area de E-learning
        </p>
        <div
          class="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full mx-auto shadow-lg shadow-blue-400/50"
        ></div>
      </div>
      <div class="mb-6 flex justify-center">
        <div
          class="bg-white/5 backdrop-blur-xl rounded-2xl p-2 inline-flex gap-2 border border-white/10 shadow-2xl shadow-blue-500/10"
        >
          <button
            @click="activeTab = 'create'"
            :class="[
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2',
              activeTab === 'create'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'text-blue-200 hover:bg-white/10 hover:text-white',
            ]"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Crear Ticket
          </button>
          <button
            @click="activeTab = 'list'"
            :class="[
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2',
              activeTab === 'list'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                : 'text-blue-200 hover:bg-white/10 hover:text-white',
            ]"
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Mis Tickets
            <span
              v-if="tickets.length > 0"
              class="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full font-bold backdrop-blur-sm"
            >
              {{ tickets.length }}
            </span>
          </button>
        </div>
      </div>
      <div v-show="activeTab === 'create'" class="animate-fade-in">
        <div class="max-w-4xl mx-auto">
          <div class="mb-8">
            <div class="flex items-center justify-between relative">
              <div
                class="absolute top-6 left-0 right-0 h-1 bg-white/10 rounded-full backdrop-blur-sm"
                style="z-index: 0"
              ></div>
              <div
                class="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-500 shadow-lg shadow-blue-400/50"
                :style="{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                  zIndex: 1,
                }"
              ></div>
              <div
                v-for="step in steps"
                :key="step.id"
                class="relative flex flex-col items-center"
                style="z-index: 2"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 mb-2"
                  :class="
                    currentStep > step.id
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-300 shadow-lg shadow-green-500/50'
                      : currentStep === step.id
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-white shadow-2xl shadow-blue-500/70 scale-110'
                        : 'bg-white/5 text-white/50 border-white/20 backdrop-blur-sm'
                  "
                >
                  <svg
                    v-if="currentStep > step.id"
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span v-else>{{ step.id }}</span>
                </div>
                <span
                  class="text-xs font-semibold text-center max-w-[100px] transition-all"
                  :class="
                    currentStep === step.id
                      ? 'text-white scale-105'
                      : 'text-white/70'
                  "
                >
                  {{ step.label }}
                </span>
              </div>
            </div>
          </div>

          <div
            class="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(59,130,246,0.3)] p-8 border border-white/20 min-h-[500px] hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] transition-shadow duration-300"
          >
            <form @submit.prevent="handleSubmit">
              <div v-show="currentStep === 1" class="step-content">
                <h2
                  class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
                >
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                      />
                    </svg>
                  </div>
                  Información Básica
                </h2>

                <div class="space-y-6">
                  <div>
                    <label
                      for="title"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Título del Ticket <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      v-model="form.ticket_title"
                      type="text"
                      required
                      maxlength="45"
                      class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                      placeholder="Ej: Error en el sistema de reportes"
                    />
                    <p class="text-xs text-slate-500 mt-1">
                      {{ form.ticket_title.length }}/45 caracteres
                    </p>
                  </div>

                  <div>
                    <label
                      for="description"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Descripción <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      v-model="form.ticket_description"
                      required
                      maxlength="250"
                      rows="6"
                      class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none hover:border-blue-300"
                      placeholder="Describa detalladamente el problema o solicitud..."
                    ></textarea>
                    <p class="text-xs text-slate-500 mt-1">
                      {{ form.ticket_description.length }}/250 caracteres
                    </p>
                  </div>
                </div>
              </div>
              <div v-show="currentStep === 2" class="step-content">
                <h2
                  class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
                >
                  <div class="p-2 bg-purple-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      />
                    </svg>
                  </div>
                  Clasificación del Ticket
                </h2>

                <div class="space-y-6">
                  <div>
                    <label
                      for="service"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Servicio <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      v-model="form.ticket_service"
                      required
                      :disabled="isLoadingData"
                      class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white disabled:bg-slate-100"
                    >
                      <option :value="null" disabled>
                        Seleccione un servicio
                      </option>
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
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Prioridad <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="priority"
                      v-model="form.ticket_priority"
                      required
                      :disabled="isLoadingData"
                      class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white disabled:bg-slate-100"
                    >
                      <option value="" disabled>
                        Seleccione una prioridad
                      </option>
                      <option
                        v-for="priority in priorities"
                        :key="priority.priority_name"
                        :value="priority.priority_name"
                      >
                        {{ priority.priority_name }}
                        <template v-if="priority.priority_description">
                          - {{ priority.priority_description }}
                        </template>
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      for="ans"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      ANS <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="ans"
                      v-model="form.ticket_ans"
                      required
                      :disabled="isLoadingData"
                      class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-white disabled:bg-slate-100"
                    >
                      <option :value="null" disabled>Seleccione un ANS</option>
                      <option
                        v-for="ans in ansList"
                        :key="ans.id_ans"
                        :value="ans.id_ans"
                      >
                        {{ ans.ans_name }}
                        <template v-if="ans.ans_description">
                          - {{ ans.ans_description }}
                        </template>
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div v-show="currentStep === 3" class="step-content">
                <h2
                  class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
                >
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                      />
                    </svg>
                  </div>
                  Cliente y Programa
                </h2>

                <div class="space-y-6">
                  <div>
                    <label
                      for="client"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Cliente <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        id="client"
                        v-model="clientSearch"
                        @input="filterClients"
                        @focus="showClientDropdown = true"
                        @blur="hideClientDropdown"
                        type="text"
                        required
                        autocomplete="off"
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                        placeholder="Buscar cliente..."
                      />
                      <div
                        v-if="showClientDropdown && filteredClients.length > 0"
                        class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                      >
                        <div
                          v-for="client in filteredClients"
                          :key="client.client_name"
                          @mousedown.prevent="selectClient(client)"
                          class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                        >
                          {{ client.client_name }}
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

                  <div>
                    <label
                      for="program"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
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
                        :disabled="!form.client_name"
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed hover:border-blue-300"
                        placeholder="Buscar programa..."
                      />
                      <div
                        v-if="
                          showProgramDropdown && filteredPrograms.length > 0
                        "
                        class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                      >
                        <div
                          v-for="program in filteredPrograms"
                          :key="program.program_name"
                          @mousedown.prevent="selectProgram(program)"
                          class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                        >
                          {{ program.program_name }}
                        </div>
                      </div>
                      <div
                        v-if="
                          showProgramDropdown &&
                          programSearch &&
                          filteredPrograms.length === 0
                        "
                        class="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-4 text-slate-500 text-sm"
                      >
                        No se encontraron programas
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="subprogram"
                      class="block text-sm font-bold text-slate-700 mb-2"
                    >
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
                        :disabled="!form.program_name"
                        class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed hover:border-blue-300"
                        placeholder="Buscar subprograma..."
                      />
                      <div
                        v-if="
                          showSubProgramDropdown &&
                          filteredSubPrograms.length > 0
                        "
                        class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                      >
                        <div
                          v-for="subprogram in filteredSubPrograms"
                          :key="subprogram.sub_program_name"
                          @mousedown.prevent="selectSubProgram(subprogram)"
                          class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all border-b border-slate-100 last:border-b-0 font-medium text-slate-700"
                        >
                          {{ subprogram.sub_program_name }}
                        </div>
                      </div>
                      <div
                        v-if="
                          showSubProgramDropdown &&
                          subProgramSearch &&
                          filteredSubPrograms.length === 0
                        "
                        class="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-4 text-slate-500 text-sm"
                      >
                        No se encontraron subprogramas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="currentStep === 4" class="step-content">
                <h2
                  class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
                >
                  <div class="p-2 bg-orange-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  Archivos Adjuntos (Opcional)
                </h2>

                <div
                  class="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all bg-slate-50"
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
                      class="w-20 h-20 text-blue-400 mb-6"
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
                    <span class="text-lg text-slate-700 font-bold mb-3"
                      >Haga clic para seleccionar archivos</span
                    >
                    <span class="text-base text-slate-500 mb-4"
                      >o arrastre y suelte aquí</span
                    >
                    <span
                      class="text-sm text-slate-400 bg-white px-6 py-3 rounded-full border-2 border-slate-200 font-semibold"
                      >PDF, DOC, XLS, IMG, TXT, ZIP (Máx. 10MB)</span
                    >
                  </label>
                </div>

                <div v-if="uploadedFiles.length > 0" class="mt-6 space-y-3">
                  <p class="text-sm font-bold text-slate-700 mb-3">
                    Archivos seleccionados ({{ uploadedFiles.length }}):
                  </p>
                  <div
                    v-for="(file, index) in uploadedFiles"
                    :key="index"
                    class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="p-2 bg-blue-500 rounded-lg">
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-bold text-slate-800">
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
                      class="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                      title="Eliminar archivo"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  v-else
                  class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center"
                >
                  <p class="text-sm text-slate-600">
                    No hay archivos adjuntos. Puede continuar sin adjuntar
                    archivos.
                  </p>
                </div>
              </div>
              <div
                class="flex justify-between items-center pt-6 mt-6 border-t-2 border-slate-100"
              >
                <button
                  v-if="currentStep > 1"
                  type="button"
                  @click="previousStep"
                  class="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all font-bold shadow-sm flex items-center gap-2"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Anterior
                </button>
                <button
                  v-else
                  type="button"
                  @click="handleCancel"
                  class="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all font-bold shadow-sm"
                >
                  Cancelar
                </button>

                <div class="flex items-center gap-3">
                  <span class="text-sm text-slate-600 font-medium">
                    Paso {{ currentStep }} de {{ totalSteps }}
                  </span>
                  <button
                    v-if="currentStep < totalSteps"
                    type="button"
                    @click="nextStep"
                    :disabled="!canProceedToNextStep"
                    class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Siguiente
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    type="submit"
                    :disabled="isSubmitting || !canSubmit || isUploadingFiles"
                    class="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    <span
                      v-else-if="isUploadingFiles"
                      class="flex items-center gap-2"
                    >
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
                        class="animate-spin h-5 w-5"
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
                      Creando...
                    </span>
                  </button>
                </div>
              </div>
            </form>
            <div
              v-if="showSuccess"
              class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in"
            >
              <div class="p-2 bg-green-500 rounded-full">
                <svg
                  class="w-6 h-6 text-white"
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
                <p class="font-bold text-lg">¡Ticket creado exitosamente!</p>
                <p class="text-sm font-medium">
                  ID del Ticket:
                  <span class="font-bold">{{ createdTicketId }}</span>
                </p>
              </div>
            </div>

            <div
              v-if="errorMessage"
              class="mt-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in"
            >
              <div class="p-2 bg-red-500 rounded-full">
                <svg
                  class="w-6 h-6 text-white"
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
                <p class="font-bold text-lg">Error</p>
                <p class="text-sm font-medium">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeTab === 'list'" class="animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-blue-500/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-50 text-sm font-semibold mb-1">
                  Total Tickets
                </p>
                <p class="text-4xl font-bold">{{ ticketStats.total }}</p>
              </div>
              <div
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-indigo-500/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-indigo-50 text-sm font-semibold mb-1">
                  En Proceso
                </p>
                <p class="text-4xl font-bold">
                  {{ ticketStats.enProceso }}
                </p>
              </div>
              <div
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-sky-400/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sky-50 text-sm font-semibold mb-1">Pendientes</p>
                <p class="text-4xl font-bold">
                  {{ ticketStats.pendientes }}
                </p>
              </div>
              <div
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-cyan-500/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-cyan-50 text-sm font-semibold mb-1">
                  Completados
                </p>
                <p class="text-4xl font-bold">
                  {{ ticketStats.completados }}
                </p>
              </div>
              <div
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div
              class="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(59,130,246,0.3)] border border-white/20 overflow-hidden"
            >
              <div class="bg-gradient-to-r from-blue-700 to-blue-500 p-6">
                <h2
                  class="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                >
                  <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Mis Tickets
                  <span
                    class="ml-auto px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full"
                  >
                    {{ filteredTickets.length }} de {{ tickets.length }}
                  </span>
                </h2>
                <div class="relative mb-4">
                  <input
                    v-model="ticketSearchQuery"
                    type="text"
                    placeholder="Buscar por título, descripción o ID..."
                    class="w-full px-5 py-3 pl-12 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-slate-800 placeholder-slate-400 font-medium shadow-lg"
                  />
                  <svg
                    class="w-6 h-6 absolute left-4 top-3.5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div class="flex flex-wrap gap-3">
                  <select
                    v-model="selectedStatusFilter"
                    class="px-4 py-2 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-white shadow-lg text-sm"
                  >
                    <option :value="null">Todos los estados</option>
                    <option
                      v-for="status in statuses"
                      :key="status.id_status"
                      :value="status.id_status"
                    >
                      {{ status.status_name }}
                    </option>
                  </select>

                  <select
                    v-model="selectedPriorityFilter"
                    class="px-4 py-2 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-white shadow-lg text-sm"
                  >
                    <option :value="null">Todas las prioridades</option>
                    <option
                      v-for="priority in uniquePriorities"
                      :key="priority"
                      :value="priority"
                    >
                      {{ priority }}
                    </option>
                  </select>

                  <button
                    v-if="
                      ticketSearchQuery ||
                      selectedStatusFilter ||
                      selectedPriorityFilter
                    "
                    @click="clearFilters"
                    class="px-4 py-2 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl text-slate-700 font-semibold hover:bg-red-50 transition-all shadow-lg text-sm flex items-center gap-2"
                  >
                    <svg
                      class="w-4 h-4"
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
                    Limpiar filtros
                  </button>
                </div>
              </div>
              <div class="p-6">
                <div v-if="tickets.length === 0" class="text-center py-12">
                  <div
                    class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p class="text-slate-500 text-lg font-semibold mb-2">
                    No hay tickets creados aún
                  </p>
                  <p class="text-slate-400 text-sm">
                    Crea tu primer ticket usando el botón "Crear Ticket"
                  </p>
                </div>

                <div
                  v-else-if="filteredTickets.length === 0"
                  class="text-center py-12"
                >
                  <div
                    class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center"
                  >
                    <svg
                      class="w-12 h-12 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <p class="text-slate-500 text-lg font-semibold mb-2">
                    No se encontraron tickets
                  </p>
                  <p class="text-slate-400 text-sm">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                </div>

                <div
                  v-else
                  class="space-y-4 max-h-[calc(100vh-480px)] overflow-y-auto pr-2"
                >
                  <div
                    v-for="ticket in filteredTickets"
                    :key="ticket.id_ticket"
                    @click="
                      selectTicket(ticket);
                      detailTab = 'info';
                    "
                    :class="[
                      'group relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300',
                      selectedTicket?.id_ticket === ticket.id_ticket
                        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-500 shadow-lg scale-[1.02]'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.01]',
                    ]"
                  >
                    <div
                      v-if="selectedTicket?.id_ticket === ticket.id_ticket"
                      class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r-full"
                    ></div>

                    <div class="flex items-start gap-4">
                      <div
                        :class="[
                          'flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold border-2 transition-all',
                          selectedTicket?.id_ticket === ticket.id_ticket
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg shadow-blue-500/50'
                            : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 border-slate-300 group-hover:from-blue-100 group-hover:to-cyan-100 group-hover:text-blue-600',
                        ]"
                      >
                        <span class="text-[10px] opacity-70">ID</span>
                        <span class="text-lg leading-none">{{
                          ticket.id_ticket
                        }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3
                          class="font-bold text-slate-800 mb-2 text-base leading-tight"
                        >
                          {{ ticket.ticket_title }}
                        </h3>
                        <p
                          class="text-slate-600 text-sm mb-3 line-clamp-2 leading-relaxed"
                        >
                          {{ ticket.ticket_description }}
                        </p>
                        <div class="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            :class="[
                              'px-3 py-1 text-xs font-bold rounded-lg border-2',
                              getStatusClass(ticket.status_id),
                            ]"
                          >
                            {{ getStatusName(ticket.status_id) }}
                          </span>
                          <span
                            :class="[
                              'px-3 py-1 text-xs font-bold rounded-lg border-2',
                              getPriorityClass(ticket.ticket_priority),
                            ]"
                          >
                            {{ ticket.ticket_priority }}
                          </span>
                          <span
                            v-if="
                              getTicketComments(ticket.id_ticket).length > 0
                            "
                            class="px-3 py-1 text-xs font-bold rounded-lg border-2 bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
                          >
                            <svg
                              class="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                              />
                              <path
                                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                              />
                            </svg>
                            {{ getTicketComments(ticket.id_ticket).length }}
                          </span>
                        </div>
                        <div
                          class="flex items-center gap-4 text-xs text-slate-500"
                        >
                          <span class="flex items-center gap-1.5">
                            <svg
                              class="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {{ formatDate(ticket.create_at) }}
                          </span>
                          <span class="flex items-center gap-1.5">
                            <svg
                              class="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {{ formatTime(ticket.create_at) }}
                          </span>
                        </div>
                      </div>
                      <div class="flex-shrink-0">
                        <div
                          :class="[
                            'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                            selectedTicket?.id_ticket === ticket.id_ticket
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500',
                          ]"
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div
              class="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(59,130,246,0.3)] border border-white/20 overflow-hidden sticky top-6"
            >
              <div
                v-if="!selectedTicket"
                class="flex flex-col items-center justify-center py-20 px-6"
              >
                <div
                  class="w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 animate-pulse-slow"
                >
                  <svg
                    class="w-16 h-16 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <p
                  class="text-slate-600 text-lg font-semibold text-center mb-2"
                >
                  Selecciona un ticket
                </p>
                <p class="text-slate-400 text-sm text-center">
                  Haz clic en cualquier ticket de la lista para ver sus detalles
                  completos
                </p>
              </div>
              <div v-else class="h-full flex flex-col">
                <div
                  class="bg-gradient-to-r from-blue-800 to-blue-900 p-6 text-white"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div
                      class="flex-1 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border border-white/20"
                    >
                      <span class="text-xs opacity-70 font-semibold"
                        >TICKET</span
                      >
                      <span class="text-2xl font-bold leading-none">
                        #{{ selectedTicket.id_ticket }}
                      </span>
                    </div>
                    <button
                      @click="selectedTicket = null"
                      class="p-2 hover:bg-white/10 rounded-lg transition-all"
                      title="Cerrar"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <h2 class="text-xl font-bold leading-tight mb-3">
                    {{ selectedTicket.ticket_title }}
                  </h2>
                  <div class="flex flex-wrap gap-2">
                    <span
                      :class="[
                        'px-3 py-1.5 text-xs font-bold rounded-lg border-2',
                        getStatusClass(selectedTicket.status_id),
                      ]"
                    >
                      {{ getStatusName(selectedTicket.status_id) }}
                    </span>
                    <span
                      :class="[
                        'px-3 py-1.5 text-xs font-bold rounded-lg border-2',
                        getPriorityClass(selectedTicket.ticket_priority),
                      ]"
                    >
                      {{ selectedTicket.ticket_priority }}
                    </span>
                  </div>
                </div>
                <div
                  class="flex border-b-2 border-slate-100 bg-slate-50/50 px-2"
                >
                  <button
                    @click="detailTab = 'info'"
                    :class="[
                      'flex-1 py-3 px-4 font-bold text-sm transition-all relative',
                      detailTab === 'info'
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-700',
                    ]"
                  >
                    <span class="flex items-center justify-center gap-2">
                      <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Información
                    </span>
                    <div
                      v-if="detailTab === 'info'"
                      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-full"
                    ></div>
                  </button>
                  <button
                    @click="detailTab = 'comments'"
                    :class="[
                      'flex-1 py-3 px-4 font-bold text-sm transition-all relative',
                      detailTab === 'comments'
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-700',
                    ]"
                  >
                    <span class="flex items-center justify-center gap-2">
                      <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                        />
                        <path
                          d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                        />
                      </svg>
                      Comentarios
                      <span
                        v-if="
                          getTicketComments(selectedTicket.id_ticket).length > 0
                        "
                        class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"
                      >
                        {{ getTicketComments(selectedTicket.id_ticket).length }}
                      </span>
                    </span>
                    <div
                      v-if="detailTab === 'comments'"
                      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-full"
                    ></div>
                  </button>
                </div>
                <div class="flex-1 overflow-y-auto">
                  <div v-show="detailTab === 'info'" class="p-6 space-y-6">
                    <div>
                      <h3
                        class="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Descripción
                      </h3>
                      <p
                        class="text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-200"
                      >
                        {{ selectedTicket.ticket_description }}
                      </p>
                    </div>
                    <div class="space-y-4">
                      <h3
                        class="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fill-rule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Detalles del Ticket
                      </h3>

                      <div
                        class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200 space-y-3"
                      >
                        <div class="flex items-start justify-between">
                          <div class="flex items-center gap-2">
                            <div
                              class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"
                            >
                              <svg
                                class="w-4 h-4 text-blue-700"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p class="text-xs text-slate-500 font-semibold">
                                Fecha de Creación
                              </p>
                              <p class="text-sm text-slate-800 font-bold">
                                {{ formatDate(selectedTicket.create_at) }} -
                                {{ formatTime(selectedTicket.create_at) }}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div class="flex items-start justify-between">
                          <div class="flex items-center gap-2">
                            <div
                              class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"
                            >
                              <svg
                                class="w-4 h-4 text-indigo-700"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p class="text-xs text-slate-500 font-semibold">
                                Fecha Estimada de Cierre
                              </p>
                              <p class="text-sm text-slate-800 font-bold">
                                {{
                                  selectedTicket.estimated_closing_date
                                    ? formatDate(
                                        selectedTicket.estimated_closing_date,
                                      )
                                    : "No definida"
                                }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-show="detailTab === 'comments'" class="p-6">
                    <div
                      v-if="
                        getTicketComments(selectedTicket.id_ticket).length === 0
                      "
                      class="text-center py-12"
                    >
                      <div
                        class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center"
                      >
                        <svg
                          class="w-10 h-10 text-slate-400"
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
                      </div>
                      <p class="text-slate-600 font-semibold mb-1">
                        Sin comentarios
                      </p>
                      <p class="text-slate-400 text-sm">
                        Este ticket aún no tiene comentarios
                      </p>
                    </div>
                    <div v-else class="space-y-4">
                      <div class="relative">
                        <div
                          class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-sky-200 to-transparent"
                        ></div>
                        <div
                          v-for="(note, index) in getTicketComments(
                            selectedTicket.id_ticket,
                          )"
                          :key="note.id_note"
                          class="relative pl-16 pb-8 last:pb-0 group"
                        >
                          <div
                            class="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform border-4 border-white"
                          >
                            {{ getUserInitials(note.network_user) }}
                          </div>
                          <div
                            class="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                          >
                            <div class="flex items-center justify-between mb-2">
                              <span
                                class="font-bold text-slate-800 text-sm flex items-center gap-2"
                              >
                                {{ note.network_user }}
                                <span
                                  class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold"
                                >
                                  #{{ index + 1 }}
                                </span>
                              </span>
                            </div>
                            <p
                              class="text-slate-700 text-sm leading-relaxed mb-3"
                            >
                              {{ note.note }}
                            </p>
                            <div class="flex items-center gap-3 text-xs">
                              <span
                                class="flex items-center gap-1 text-slate-500"
                              >
                                <svg
                                  class="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                {{ formatDate(note.create_at) }}
                              </span>
                              <span
                                class="flex items-center gap-1 text-slate-500"
                              >
                                <svg
                                  class="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                {{ formatTime(note.create_at) }}
                              </span>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import type { Ticket, TicketCreate } from "../../models/Ticket";
import type { ANS } from "../../models/ANS";
import type { Service } from "../../models/Service";
import type { TicketPriority } from "../../models/TicketPriority";
import type { Client } from "../../models/Client";
import type { Program } from "../../models/Program";
import type { SubProgram } from "../../models/SubProgram";
import type { Status } from "../../models/Status";
import { AnsService } from "../../services/ansService";
import { RequestTypeService } from "../../services/RequestTypeService";
import { TicketPriorityService } from "../../services/ticketPriorityService";
import { ClientsService } from "../../services/clientsService";
import { StatusService } from "../../services/statusService";
import { UsersService } from "../../services/usersService";
import { TicketsService } from "../../services/ticketsService";
import { ProgramsService } from "../../services/programService";
import { SubProgramsService } from "../../services/subProgramService";
import type { Note } from "../../models/Notes";
import { NotesService } from "../../services/notesService";
import { SessionStorageService } from "../../services/SessionStorageService";
import { FileUploadService } from "../../services/fileUploadService";

const ansService = new AnsService();
const serviceService = new RequestTypeService();
const priorityService = new TicketPriorityService();
const clientsService = new ClientsService();
const statusService = new StatusService();
const usersService = new UsersService();
const programsService = new ProgramsService();
const subProgramsService = new SubProgramsService();
const fileUploadService = new FileUploadService();
const isSubmitting = ref(false);
const showSuccess = ref(false);
const createdTicketId = ref<number | null>(null);
const errorMessage = ref("");
const clientSearch = ref("");
const programSearch = ref("");
const subProgramSearch = ref("");
const showClientDropdown = ref(false);
const showProgramDropdown = ref(false);
const showSubProgramDropdown = ref(false);
const filteredClients = ref<Client[]>([]);
const filteredPrograms = ref<Program[]>([]);
const filteredSubPrograms = ref<SubProgram[]>([]);
const uploadedFiles = ref<File[]>([]);
const isUploadingFiles = ref(false);
const uploadedFileNames = ref<string[]>([]);
const services = ref<Service[]>([]);
const priorities = ref<TicketPriority[]>([]);
const statuses = ref<Status[]>([]);
const clients = ref<Client[]>([]);
const ansList = ref<ANS[]>([]);
const isLoadingData = ref(true);
const subPrograms = ref<SubProgram[]>([]);
const programs = ref<Program[]>([]);
const currentStep = ref(1);
const totalSteps = 4;
const selectedTicket = ref<Ticket | null>(null);
const isLoading = ref(false);
const ticketsService = new TicketsService();
const notesService = new NotesService();
const sessionStorageService = new SessionStorageService();
const tickets = ref<Ticket[]>([]);
const notes = ref<Note[]>([]);
const activeTab = ref<"create" | "list">("create");
const ticketSearchQuery = ref("");
const selectedStatusFilter = ref<number | null>(null);
const selectedPriorityFilter = ref<string | null>(null);
const detailTab = ref<"info" | "comments">("info");
let statusMap: Record<number, string>;

const loadMyTickets = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const currentUser = sessionStorageService.getUserInfo();

    if (!currentUser || !currentUser.username) {
      errorMessage.value = "No se pudo obtener el usuario actual";
      return;
    }

    const networkUser = currentUser.username;
    const response = await ticketsService.GetTicketByReporter(networkUser);

    if (response && response.results) {
      tickets.value = response.results;
    } else {
      tickets.value = [];
    }
  } catch (error) {
    errorMessage.value = "Error al cargar los tickets";
    tickets.value = [];
  } finally {
    isLoading.value = false;
  }
};

const loadTicketNotes = async (ticketId: number) => {
  try {
    const response = await notesService.getNotesByTicket(ticketId);

    if (response.data && response.data.results) {
      const ticketNotes = response.data.results;

      ticketNotes.forEach((note: Note) => {
        const existingIndex = notes.value.findIndex(
          (n) => n.id_note === note.id_note,
        );
        if (existingIndex >= 0) {
          notes.value[existingIndex] = note;
        } else {
          notes.value.push(note);
        }
      });
    }
  } catch (error) {
    console.error("Error al cargar notas:", error);
  }
};

const selectTicket = async (ticket: Ticket) => {
  selectedTicket.value = ticket;
  await loadTicketNotes(ticket.id_ticket);
};

const getTicketComments = (ticketId: number) => {
  return notes.value.filter((note) => note.id_ticket === ticketId);
};

const getStatusName = (statusId: number) => {
  statusMap = {};

  for (let index = 0; index < statuses.value.length; index++) {
    const status = statuses.value[index];
    if (!status) continue;
    statusMap[status.id_status] = status.status_name;
  }
  return statusMap[statusId] || "Desconocido";
};

const getStatusClass = (statusId: number) => {
  const classMap: Record<number, string> = {
    1: "bg-indigo-100 text-indigo-700",
    2: "bg-blue-100 text-blue-700",
    3: "bg-sky-100 text-sky-700",
    4: "bg-amber-100 text-amber-700",
    5: "bg-cyan-100 text-cyan-700",
  };
  return classMap[statusId] || "bg-slate-100 text-slate-700";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getUserInitials = (name: string | number) => {
  const userName = String(name);
  if (!userName || userName.trim() === "") return "??";

  return userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const clearFilters = () => {
  ticketSearchQuery.value = "";
  selectedStatusFilter.value = null;
  selectedPriorityFilter.value = null;
};

const getPriorityClass = (priority: string) => {
  const classMap: Record<string, string> = {
    Alta: "bg-orange-100 text-orange-700 border-orange-200",
    Media: "bg-sky-100 text-sky-700 border-sky-200",
    Baja: "bg-cyan-100 text-cyan-700 border-cyan-200",
    Urgente: "bg-red-100 text-red-700 border-red-200",
  };
  return classMap[priority] || "bg-slate-100 text-slate-700 border-slate-200";
};
const steps = [
  { id: 1, label: "Información Básica" },
  { id: 2, label: "Clasificación" },
  { id: 3, label: "Cliente y Programa" },
  { id: 4, label: "Archivos" },
];

interface CreateTicketForm {
  ticket_title: string;
  ticket_description: string;
  ticket_attachments: string | null;
  ticket_service: number | null;
  ticket_priority: string;
  ticket_ans: number | null;
  sub_program_name: string;
  client_name: string;
  program_name: string;
  status_id: number;
}

const form = reactive<CreateTicketForm>({
  ticket_title: "",
  ticket_description: "",
  ticket_attachments: null,
  ticket_service: null,
  ticket_priority: "",
  ticket_ans: null,
  sub_program_name: "",
  client_name: "",
  program_name: "",
  status_id: 0,
});

const loadFormData = async () => {
  isLoadingData.value = true;
  try {
    await Promise.all([
      loadAns(),
      loadServices(),
      loadPriorities(),
      loadClients(),
      loadPrograms(),
      loadSubPrograms(),
      loadStatuses(),
    ]);

    if (statuses.value.length > 0) {
      const initialStatus = statuses.value.find((s) => s.ordering === 1);
      if (initialStatus) {
        form.status_id = initialStatus.id_status;
      }
    }
  } catch (error) {
    console.error("Error al cargar datos del formulario:", error);
  } finally {
    isLoadingData.value = false;
  }
};

const loadPrograms = async () => {
  try {
    const response = await programsService.getAll();
    if (response.success && response.data) {
      programs.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar programas:", error);
  }
};

const loadSubPrograms = async () => {
  try {
    const response = await subProgramsService.getAll();
    if (response.success && response.data) {
      subPrograms.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar subprogramas:", error);
  }
};

const loadAns = async () => {
  try {
    const response = await ansService.getAll();
    if (response.success && response.data) {
      ansList.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar ANS:", error);
  }
};

const loadServices = async () => {
  try {
    const response = await serviceService.getAll();
    if (response.success && response.data) {
      services.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar servicios:", error);
  }
};

const loadPriorities = async () => {
  try {
    const response = await priorityService.getAll();
    if (response.success && response.data) {
      priorities.value = response.data.results || [];
    }
  } catch (error) {
    console.error("Error al cargar prioridades:", error);
  }
};

const loadClients = async () => {
  try {
    const response = await clientsService.getAll();
    if (response.success && response.data) {
      clients.value = response.data.results || [];
      filteredClients.value = clients.value;
    }
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  }
};

const loadStatuses = async () => {
  try {
    const response = await statusService.getAll();
    if (response.success && response.data) {
      statuses.value = (response.data.results || []).flat();
    }
  } catch (error) {
    console.error("Error al cargar estados:", error);
  }
};

const filterClients = () => {
  const search = clientSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredClients.value = clients.value;
  } else {
    filteredClients.value = clients.value.filter((client) =>
      client.client_name.toLowerCase().includes(search),
    );
  }
};

const selectClient = (client: Client) => {
  form.client_name = client.client_name;
  clientSearch.value = client.client_name;
  showClientDropdown.value = false;

  form.program_name = "";
  form.sub_program_name = "";
  programSearch.value = "";
  subProgramSearch.value = "";
};

const hideClientDropdown = () => {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 200);
};

const filterPrograms = () => {
  const search = programSearch.value.toLowerCase();
  const clientPrograms = programs.value.filter(
    (p) => p.client_name === form.client_name,
  );

  if (search.length === 0) {
    filteredPrograms.value = clientPrograms;
  } else {
    filteredPrograms.value = clientPrograms.filter((program) =>
      program.program_name.toLowerCase().includes(search),
    );
  }
};

const selectProgram = (program: Program) => {
  form.program_name = program.program_name;
  programSearch.value = program.program_name;
  showProgramDropdown.value = false;
  form.sub_program_name = "";
  subProgramSearch.value = "";
};

const hideProgramDropdown = () => {
  setTimeout(() => {
    showProgramDropdown.value = false;
  }, 200);
};

const filterSubPrograms = () => {
  const search = subProgramSearch.value.toLowerCase();
  const programSubPrograms = subPrograms.value.filter(
    (sp) => sp.program_name === form.program_name,
  );

  if (search.length === 0) {
    filteredSubPrograms.value = programSubPrograms;
  } else {
    filteredSubPrograms.value = programSubPrograms.filter((subprogram) =>
      subprogram.sub_program_name.toLowerCase().includes(search),
    );
  }
};

const selectSubProgram = (subprogram: SubProgram) => {
  form.sub_program_name = subprogram.sub_program_name;
  subProgramSearch.value = subprogram.sub_program_name;
  showSubProgramDropdown.value = false;
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

const nextStep = () => {
  if (currentStep.value < totalSteps && canProceedToNextStep.value) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Computed properties for validation
const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (
        form.ticket_title.trim().length > 0 &&
        form.ticket_description.trim().length > 0
      );
    case 2:
      return (
        form.ticket_service !== null &&
        form.ticket_priority !== "" &&
        form.ticket_ans !== null
      );
    case 3:
      return (
        form.client_name !== "" &&
        form.program_name !== "" &&
        form.sub_program_name !== ""
      );
    case 4:
      return true; // Files are optional
    default:
      return false;
  }
});

const canSubmit = computed(() => {
  return (
    form.ticket_title.trim().length > 0 &&
    form.ticket_description.trim().length > 0 &&
    form.ticket_service !== null &&
    form.ticket_priority !== "" &&
    form.ticket_ans !== null &&
    form.client_name !== "" &&
    form.program_name !== "" &&
    form.sub_program_name !== ""
  );
});

const filteredTickets = computed(() => {
  let result = tickets.value;

  // Filtrar por búsqueda
  if (ticketSearchQuery.value.trim()) {
    const query = ticketSearchQuery.value.toLowerCase();
    result = result.filter(
      (ticket) =>
        ticket.ticket_title.toLowerCase().includes(query) ||
        ticket.ticket_description.toLowerCase().includes(query) ||
        ticket.id_ticket.toString().includes(query),
    );
  }

  // Filtrar por estado
  if (selectedStatusFilter.value !== null) {
    result = result.filter(
      (ticket) => ticket.status_id === selectedStatusFilter.value,
    );
  }

  // Filtrar por prioridad
  if (selectedPriorityFilter.value !== null) {
    result = result.filter(
      (ticket) => ticket.ticket_priority === selectedPriorityFilter.value,
    );
  }

  return result;
});

const ticketStats = computed(() => {
  const total = tickets.value.length;

  // Contar tickets en proceso (ordering != null)
  const enProceso = tickets.value.filter((ticket) => {
    const estado = statuses.value.find((s) => s.id_status === ticket.status_id);
    return estado && estado.ordering != null;
  }).length;

  // Contar tickets completados (is_complete === true)
  const completados = tickets.value.filter((ticket) => {
    const estado = statuses.value.find((s) => s.id_status === ticket.status_id);
    return estado && estado.is_completion === true;
  }).length;

  // Contar tickets pendientes (que no están en proceso ni completados)
  const pendientes = tickets.value.filter((ticket) => {
    const estado = statuses.value.find((s) => s.id_status === ticket.status_id);
    if (!estado) return false;

    const esEnProceso = estado.ordering != null;
    const esCompletado = estado.is_completion === true;

    return !esEnProceso && !esCompletado;
  }).length;

  const byStatus = tickets.value.reduce(
    (acc, ticket) => {
      acc[ticket.status_id] = (acc[ticket.status_id] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const byPriority = tickets.value.reduce(
    (acc, ticket) => {
      acc[ticket.ticket_priority] = (acc[ticket.ticket_priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return { total, enProceso, completados, pendientes, byStatus, byPriority };
});

const uniquePriorities = computed(() => {
  return Array.from(new Set(tickets.value.map((t) => t.ticket_priority)));
});

// Methods
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    showSuccess.value = false;

    // Validaciones adicionales
    if (!form.ticket_title.trim()) {
      errorMessage.value = "El título es requerido";
      return;
    }

    if (!form.ticket_description.trim()) {
      errorMessage.value = "La descripción es requerida";
      return;
    }

    if (!form.ticket_service || form.ticket_service === 0) {
      errorMessage.value = "Debe seleccionar un servicio";
      return;
    }

    if (!form.ticket_priority || form.ticket_priority === "") {
      errorMessage.value = "Debe seleccionar una prioridad";
      return;
    }

    if (!form.ticket_ans || form.ticket_ans === 0) {
      errorMessage.value = "Debe seleccionar un ANS";
      return;
    }

    if (!form.client_name) {
      errorMessage.value = "Debe seleccionar un cliente";
      return;
    }

    if (!form.program_name) {
      errorMessage.value = "Debe seleccionar un programa";
      return;
    }

    if (!form.sub_program_name) {
      errorMessage.value = "Debe seleccionar un subprograma";
      return;
    }

    const currentUser = sessionStorageService.getUserInfo();

    if (!currentUser) {
      errorMessage.value =
        "No se pudo obtener la información del usuario. Por favor inicie sesión nuevamente.";
      return;
    }

    const userData = {
      network_user: currentUser.username,
      mail: currentUser.email || "",
      phone: "",
      full_name: currentUser.full_name || currentUser.username,
    };

    try {
      const userResult = await usersService.ensureUserExists(userData);

      if (!userResult.success) {
        errorMessage.value =
          "Error al validar/crear usuario. Por favor intente nuevamente.";
        return;
      }
    } catch (error: any) {
      console.error("Error al validar/crear usuario:", error);
      errorMessage.value = `Error al validar usuario: ${error.message || "Error desconocido"}`;
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

    // Crear objeto que coincida con TicketCreate del backend
    const ticketData: TicketCreate = {
      ticket_title: form.ticket_title,
      ticket_description: form.ticket_description,
      ticket_attachments: fileNames.length > 0 ? fileNames.join(", ") : null,
      ticket_service: form.ticket_service!,
      ticket_priority: form.ticket_priority,
      ticket_ans: form.ticket_ans!,
      sub_program_name: form.sub_program_name,
      reporter_user: currentUser.username,
      status_id: form.status_id,
      assigned_to: undefined,
    };

    try {
      const ticketResult = await ticketsService.create(ticketData);

      if (!ticketResult.success || !ticketResult.data) {
        errorMessage.value = ticketResult.message || "Error al crear el ticket";
        return;
      }

      createdTicketId.value = ticketResult.data.id_ticket || null;
      showSuccess.value = true;

      // Recargar lista de tickets
      await loadMyTickets();

      setTimeout(() => {
        resetForm();
        activeTab.value = "list";
      }, 2000);
    } catch (error: any) {
      console.error("Error al crear ticket:", error);
      errorMessage.value =
        error.message ||
        "Error al crear el ticket. Por favor intente nuevamente.";
    }
  } catch (error: any) {
    console.error("Error general:", error);
    errorMessage.value =
      error.message ||
      "Error al crear el ticket. Por favor intente nuevamente.";
  } finally {
    isSubmitting.value = false;
    isUploadingFiles.value = false;
  }
};

const handleCancel = () => {
  if (
    confirm(
      "¿Está seguro de que desea cancelar? Se perderán los datos ingresados.",
    )
  ) {
    resetForm();
  }
};

const resetForm = () => {
  form.ticket_title = "";
  form.ticket_description = "";
  form.ticket_attachments = null;
  form.ticket_service = null;
  form.ticket_priority = "";
  form.ticket_ans = null;
  form.client_name = "";
  form.program_name = "";
  form.sub_program_name = "";
  form.status_id = 0;
  clientSearch.value = "";
  programSearch.value = "";
  subProgramSearch.value = "";
  uploadedFiles.value = [];
  uploadedFileNames.value = [];
  showSuccess.value = false;
  createdTicketId.value = null;
  errorMessage.value = "";
  currentStep.value = 1;
  isUploadingFiles.value = false;
};

onMounted(async () => {
  await loadFormData();
  filteredPrograms.value = programs.value;
  filteredSubPrograms.value = subPrograms.value;
  loadMyTickets();
});
</script>

<style scoped>
/* Animaciones mejoradas */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) translateX(10px) rotate(-5deg);
  }
}

@keyframes float-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes float-orb-reverse {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-30px, 30px) scale(0.9);
  }
  66% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.15;
    transform: scale(1.05);
  }
}

@keyframes fade-in-out {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes particle {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
}

@keyframes particle-slow {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-150px) translateX(50px) scale(0);
    opacity: 0;
  }
}

.bg-white {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-float-orb {
  animation: float-orb 20s ease-in-out infinite;
}

.animate-float-orb-reverse {
  animation: float-orb-reverse 25s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-fade-in-out {
  animation: fade-in-out 4s ease-in-out infinite;
}

.animate-particle {
  animation: particle 4s ease-in-out infinite;
}

.animate-particle-slow {
  animation: particle-slow 6s ease-in-out infinite;
}

.step-content {
  animation: fadeIn 0.3s ease-out;
}
</style>
