<template>
  <div
    class="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
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
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0538d4] rounded-full opacity-10 blur-3xl"
      ></div>

      <div
        class="absolute top-32 right-24 animate-float-slow"
        style="animation-delay: 0.3s"
      >
        <div
          class="w-16 h-16 border-2 border-white/15 rounded-xl rotate-45"
        ></div>
      </div>
      <div
        class="absolute bottom-40 left-20 animate-float"
        style="animation-delay: 1.2s"
      >
        <div
          class="w-20 h-20 border-2 border-white/10 rounded-lg -rotate-12"
        ></div>
      </div>
      <div
        class="absolute top-1/4 left-1/3 animate-float-slow"
        style="animation-delay: 2s"
      >
        <div class="w-12 h-12 bg-white/5 rounded-full"></div>
      </div>
      <div
        class="absolute bottom-1/3 right-1/4 animate-float"
        style="animation-delay: 0.8s"
      >
        <div
          class="w-14 h-14 border-2 border-white/20 rounded-lg rotate-12"
        ></div>
      </div>

      <div
        class="absolute top-1/4 left-16 w-2 h-2 bg-white/40 rounded-full animate-particle"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute top-2/3 right-32 w-3 h-3 bg-[#50bdeb]/50 rounded-full animate-particle-slow"
        style="animation-delay: 1.5s"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-particle"
        style="animation-delay: 2.3s"
      ></div>
      <div
        class="absolute top-1/3 right-1/3 w-3 h-3 bg-white/25 rounded-full animate-particle-slow"
        style="animation-delay: 0.8s"
      ></div>
      <div
        class="absolute bottom-40 left-32 w-2 h-2 bg-[#50bdeb]/40 rounded-full animate-particle"
        style="animation-delay: 1.8s"
      ></div>

      <div
        class="absolute top-20 left-1/4 animate-float opacity-10"
        style="animation-delay: 0.5s"
      >
        <svg
          class="w-14 h-14 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"
          />
          <path d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z" />
        </svg>
      </div>
      <div
        class="absolute bottom-32 right-1/4 animate-float-slow opacity-10"
        style="animation-delay: 1.5s"
      >
        <svg
          class="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
          />
          <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
        </svg>
      </div>
      <div
        class="absolute top-1/2 right-20 animate-float opacity-10"
        style="animation-delay: 2.2s"
      >
        <svg
          class="w-10 h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
      <div
        class="absolute top-64 right-24 animate-float-slow opacity-10"
        style="animation-delay: 0.9s"
      >
        <svg
          class="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"
          />
        </svg>
      </div>
      <div
        class="absolute bottom-1/4 left-1/3 animate-float opacity-10"
        style="animation-delay: 1.7s"
      >
        <svg
          class="w-11 h-11 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
          />
        </svg>
      </div>
    </div>

    <div class="w-full max-w-3xl relative z-10">
      <div class="text-center mb-8">
        <div
          class="inline-block p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm border border-[#50bdeb]/30 shadow-lg shadow-[#50bdeb]/20"
        >
          <svg
            class="w-12 h-12 text-[#50bdeb]"
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
        <h1
          class="text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-wide"
        >
          Crear Nuevo Ticket
        </h1>
        <p class="text-blue-100 text-lg font-medium">
          Complete el formulario para reportar su solicitud
        </p>
        <div
          class="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent rounded-full mx-auto"
        ></div>
      </div>

      <div
        class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_rgba(0,25,80,0.4)] p-8 border border-[#50bdeb]/20"
      >
        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
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
                <path
                  d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
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

          <div class="mb-6">
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
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
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
              rows="5"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none hover:border-blue-300"
              placeholder="Describa detalladamente el problema o solicitud..."
            ></textarea>
            <div class="text-right text-sm text-slate-500 mt-1 font-medium">
              {{ form.ticketDescription.length }}/250 caracteres
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  <path
                    d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
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
                  :key="service.id"
                  :value="service.id"
                >
                  {{ service.name }}
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
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
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
                  :key="priority.name"
                  :value="priority.name"
                >
                  {{ priority.name }} - {{ priority.description }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-6">
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
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
                  class="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-4 text-slate-500 text-sm"
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
                    d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V5a1 1 0 00-1-1h-3zm1 2v1h1V6h-1z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"
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
                  class="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
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
                  class="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-4 text-slate-500 text-sm"
                >
                  No se encontraron subprogramas
                </div>
              </div>
            </div>
          </div>

          <div class="mb-6">
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
              <option v-for="ans in ansList" :key="ans.id" :value="ans.id">
                {{ ans.name }} - {{ ans.description }}
              </option>
            </select>
          </div>

          <div class="mb-6">
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
              Archivos Adjuntos
            </label>
            <div
              class="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all bg-slate-50"
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
                  class="w-16 h-16 text-blue-400 mb-4"
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
                <span class="text-base text-slate-700 font-bold mb-2"
                  >Haga clic para seleccionar archivos</span
                >
                <span class="text-sm text-slate-500 mt-1"
                  >o arrastre y suelte aquí</span
                >
                <span
                  class="text-xs text-slate-400 mt-3 bg-white px-4 py-2 rounded-full border border-slate-200"
                  >PDF, DOC, XLS, IMG, TXT, ZIP (Máx. 10MB)</span
                >
              </label>
            </div>
            <div v-if="uploadedFiles.length > 0" class="mt-4 space-y-2">
              <div
                v-for="(file, index) in uploadedFiles"
                :key="index"
                class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all"
              >
                <div class="flex items-center space-x-3">
                  <div class="p-2 bg-blue-500 rounded-lg">
                    <svg
                      class="w-5 h-5 text-white"
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
          </div>
          <div class="flex gap-4 justify-end pt-4 border-t-2 border-slate-100">
            <button
              type="button"
              @click="handleCancel"
              class="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 hover:border-slate-400 transition-all font-bold shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500"
            >
              <span v-if="!isSubmitting" class="flex items-center gap-2">
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
        </form>

        <div
          v-if="showSuccess"
          class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 rounded-xl shadow-lg flex items-center gap-3"
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
          class="mt-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800 rounded-xl shadow-lg flex items-center gap-3"
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

      <div class="text-center mt-8">
        <div
          class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-[#50bdeb]/30 shadow-lg hover:bg-white/15 transition-all"
        >
          <svg
            class="w-5 h-5 text-[#50bdeb]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="font-medium tracking-wide">
            ¿Necesita ayuda? Contacte al equipo de soporte
          </p>
        </div>

        <div
          class="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-[#50bdeb] to-transparent rounded-full mx-auto"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Ticket } from "../../models/Ticket";

// Form data
const form = reactive({
  ticketTitle: "",
  ticketDescription: "",
  ticketAttachments: "",
  ticketService: "" as number | "",
  ticketPriority: "",
  ticketAns: "" as number | "",
  clientName: "",
  programName: "",
  subProgramName: "",
  estimatedClosingDate: "",
});

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
const filteredClients = ref<Array<{ name: string }>>([]);
const filteredPrograms = ref<Array<{ name: string; clientName: string }>>([]);
const filteredSubPrograms = ref<Array<{ name: string; programName: string }>>(
  []
);

const uploadedFiles = ref<File[]>([]);

const services = ref([
  { id: 1, name: "Soporte Técnico" },
  { id: 2, name: "Desarrollo" },
  { id: 3, name: "Infraestructura" },
  { id: 4, name: "Consultoría" },
]);

const priorities = ref([
  { name: "Baja", description: "No urgente" },
  { name: "Media", description: "Moderada" },
  { name: "Alta", description: "Urgente" },
  { name: "Crítica", description: "Muy urgente" },
]);

const clients = ref([
  { name: "Cliente A - Empresa Tech" },
  { name: "Cliente B - Corporación Global" },
  { name: "Cliente C - Soluciones SA" },
  { name: "Cliente D - Innovación Digital" },
  { name: "Cliente E - Sistemas Integrados" },
  { name: "Cliente F - Desarrollo Web" },
]);

const programs = ref([
  { name: "Programa Alpha", clientName: "Cliente A - Empresa Tech" },
  { name: "Programa Beta", clientName: "Cliente A - Empresa Tech" },
  { name: "Programa Gamma", clientName: "Cliente B - Corporación Global" },
  { name: "Programa Delta", clientName: "Cliente B - Corporación Global" },
  { name: "Programa Epsilon", clientName: "Cliente C - Soluciones SA" },
  { name: "Programa Zeta", clientName: "Cliente C - Soluciones SA" },
]);

const subPrograms = ref([
  { name: "Subprograma 1.1", programName: "Programa Alpha" },
  { name: "Subprograma 1.2", programName: "Programa Alpha" },
  { name: "Subprograma 2.1", programName: "Programa Beta" },
  { name: "Subprograma 2.2", programName: "Programa Beta" },
  { name: "Subprograma 3.1", programName: "Programa Gamma" },
  { name: "Subprograma 3.2", programName: "Programa Gamma" },
]);

const ansList = ref([
  { id: 1, name: "ANS 24h", description: "24 horas" },
  { id: 2, name: "ANS 48h", description: "48 horas" },
  { id: 3, name: "ANS 72h", description: "72 horas" },
  { id: 4, name: "ANS 1 semana", description: "1 semana" },
]);

// Autocomplete methods
const filterClients = () => {
  const search = clientSearch.value.toLowerCase();
  if (search.length === 0) {
    filteredClients.value = clients.value;
  } else {
    filteredClients.value = clients.value.filter((client) =>
      client.name.toLowerCase().includes(search)
    );
  }
};

const selectClient = (client: { name: string }) => {
  form.clientName = client.name;
  clientSearch.value = client.name;
  showClientDropdown.value = false;
  // Limpiar programa y subprograma al cambiar cliente
  form.programName = "";
  form.subProgramName = "";
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
    (p) => p.clientName === form.clientName
  );

  if (search.length === 0) {
    filteredPrograms.value = clientPrograms;
  } else {
    filteredPrograms.value = clientPrograms.filter((program) =>
      program.name.toLowerCase().includes(search)
    );
  }
};

const selectProgram = (program: { name: string; clientName: string }) => {
  form.programName = program.name;
  programSearch.value = program.name;
  showProgramDropdown.value = false;
  // Limpiar subprograma al cambiar programa
  form.subProgramName = "";
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
    (sp) => sp.programName === form.programName
  );

  if (search.length === 0) {
    filteredSubPrograms.value = programSubPrograms;
  } else {
    filteredSubPrograms.value = programSubPrograms.filter((subprogram) =>
      subprogram.name.toLowerCase().includes(search)
    );
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

const hideSubProgramDropdown = () => {
  setTimeout(() => {
    showSubProgramDropdown.value = false;
  }, 200);
};

// File upload methods
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files);

    // Validar tamaño (max 10MB por archivo)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = newFiles.filter((file) => {
      if (file.size > maxSize) {
        errorMessage.value = `El archivo ${file.name} excede el tamaño máximo de 10MB`;
        return false;
      }
      return true;
    });

    uploadedFiles.value = [...uploadedFiles.value, ...validFiles];

    // Limpiar el input para permitir subir el mismo archivo nuevamente
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

// Methods
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    showSuccess.value = false;

    // Validaciones adicionales
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

    // Simular creación del ticket
    // En producción, aquí se haría la llamada a la API
    const newTicket: Partial<Ticket> = {
      ticketTitle: form.ticketTitle,
      ticketDescription: form.ticketDescription,
      ticketAttachments:
        uploadedFiles.value.length > 0
          ? uploadedFiles.value.map((f) => f.name).join(", ")
          : null,
      ticketService: form.ticketService as number,
      ticketPriority: form.ticketPriority,
      ticketAns: form.ticketAns as number,
      subProgramName: form.subProgramName,
      estimatedClosingDate: form.estimatedClosingDate
        ? new Date(form.estimatedClosingDate)
        : null,
      reporterUser: "current-user", // Se obtendría del contexto de autenticación
      statusId: 1, // Estado inicial "Nuevo"
      createAt: new Date(),
    };

    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular respuesta exitosa
    createdTicketId.value = Math.floor(Math.random() * 10000);
    showSuccess.value = true;

    // Limpiar formulario después de 3 segundos
    setTimeout(() => {
      resetForm();
    }, 3000);

    console.log("Ticket creado:", newTicket);
    console.log("Archivos adjuntos:", uploadedFiles.value);
  } catch (error) {
    errorMessage.value =
      "Error al crear el ticket. Por favor intente nuevamente.";
    console.error("Error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  if (
    confirm(
      "¿Está seguro de que desea cancelar? Se perderán los datos ingresados."
    )
  ) {
    resetForm();
  }
};

const resetForm = () => {
  form.ticketTitle = "";
  form.ticketDescription = "";
  form.ticketAttachments = "";
  form.ticketService = "";
  form.ticketPriority = "";
  form.ticketAns = "";
  form.clientName = "";
  form.programName = "";
  form.subProgramName = "";
  form.estimatedClosingDate = "";
  clientSearch.value = "";
  programSearch.value = "";
  subProgramSearch.value = "";
  uploadedFiles.value = [];
  showSuccess.value = false;
  createdTicketId.value = null;
  errorMessage.value = "";
};
</script>

<style scoped>
/* Animaciones sutiles */
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

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-particle {
  animation: particle 4s ease-in-out infinite;
}

.animate-particle-slow {
  animation: particle-slow 6s ease-in-out infinite;
}
</style>
