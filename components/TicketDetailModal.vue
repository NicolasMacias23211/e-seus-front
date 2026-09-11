<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
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
              <Inbox class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Ver Ticket</h3>
              <p class="text-xs text-white/80">
                Ticket #{{ fullTicket?.id_ticket ?? ticketId }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <label class="text-sm font-semibold text-white/90">Estado:</label>
              <select
                v-model="selectedStatusName"
                :disabled="isLoading || !fullTicket"
                class="px-4 py-2 bg-white/95 border-2 border-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all font-semibold text-slate-700"
              >
                <option
                  v-for="status in statusesList"
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
        <div v-if="isLoading" class="flex items-center justify-center py-16">
          <div class="text-center">
            <div
              class="w-12 h-12 border-4 border-[#50bdeb] border-t-transparent rounded-full animate-spin mx-auto mb-4"
            ></div>
            <p class="text-slate-600">Cargando ticket...</p>
          </div>
        </div>

        <template v-else-if="fullTicket">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Título del Ticket
            </label>
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              {{ fullTicket.ticket_title }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">
              Descripción
            </label>
            <div
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 min-h-[80px] whitespace-pre-wrap"
            >
              {{ fullTicket.ticket_description }}
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
                    new Date(fullTicket.create_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
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
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <input
                    :value="fullTicket.sub_program?.sub_program_name || 'No encontrado'"
                    disabled
                    type="text"
                    class="w-full px-4 py-2.5 border rounded-lg transition-all bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                  >
                    Prioridad
                    <Lock
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <select
                    :value="fullTicket.priority?.priority_name"
                    disabled
                    class="w-full px-4 py-2.5 border rounded-lg transition-all bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                  >
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
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <select
                    :value="fullTicket.service?.service_name"
                    disabled
                    class="w-full px-4 py-2.5 border rounded-lg transition-all bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                  >
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
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <select
                    :value="fullTicket.ticket_ans"
                    disabled
                    class="w-full px-4 py-2.5 border rounded-lg transition-all bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                  >
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
                      class="w-4 h-4 text-amber-600"
                      title="Solo editable en estado inicial"
                    />
                  </label>
                  <input
                    :value="estimatedClosingDateStr"
                    type="datetime-local"
                    disabled
                    class="w-full px-4 py-2.5 border rounded-lg transition-all bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>
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
                      <span
                        v-if="comment.visible_to_client"
                        class="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold mb-1"
                      >
                        Visible para el cliente
                      </span>
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
                          return total + (h || 0) * 60 + (m || 0);
                        }, 0) /
                          60)
                          | 0
                      }}h
                      {{
                        ticketReportedTimes.reduce((total, t) => {
                          if (!t.reported_time) return total;
                          const [h, m] = t.reported_time.split(":").map(Number);
                          return total + (h || 0) * 60 + (m || 0);
                        }, 0) % 60
                      }}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div
        class="bg-slate-50 px-6 py-4 rounded-b-2xl border-t border-slate-200 flex gap-3 flex-shrink-0"
      >
        <button
          @click="closeModal"
          class="flex-1 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors"
        >
          Cerrar
        </button>
        <button
          @click="saveChanges"
          :disabled="!hasChanges || isSaving"
          :class="[
            'flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors',
            hasChanges && !isSaving
              ? 'bg-gradient-to-r from-[#021C7D] to-[#50bdeb] hover:opacity-90 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed',
          ]"
        >
          {{ isSaving ? "Guardando..." : "Guardar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Inbox, Lock } from "lucide-vue-next";
import type {
  Ticket,
  Note,
  ReportedTime,
  Status,
  EUser,
  ANS,
  Service,
  TicketPriority,
} from "../models";
import { TicketsService } from "../services/ticketsService";
import { StatusService } from "../services/statusService";
import { eUsersService } from "../services/e-usersService";
import { RequestTypeService } from "../services/RequestTypeService";
import { TicketPriorityService } from "../services/ticketPriorityService";
import { AnsService } from "../services/ansService";
import { FileUploadService } from "../services/fileUploadService";
import { useNotification } from "../utils/useNotification";

interface Props {
  modelValue: boolean;
  ticketId: number | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  ticketUpdated: [];
}>();

const notification = useNotification();
const ticketsService = new TicketsService();
const statusService = new StatusService();
const eUsersServices = new eUsersService();
const requestTypeService = new RequestTypeService();
const ticketPriorityService = new TicketPriorityService();
const ansService = new AnsService();
const fileUploadService = new FileUploadService();

const isLoading = ref(false);
const isSaving = ref(false);
const fullTicket = ref<Ticket | null>(null);
const activeTab = ref<"details" | "comments" | "time">("details");

const statusesList = ref<Status[]>([]);
const eUsersList = ref<EUser[]>([]);
const servicesList = ref<Service[]>([]);
const prioritiesList = ref<TicketPriority[]>([]);
const ansList = ref<ANS[]>([]);

const ticketComments = ref<Note[]>([]);
const ticketReportedTimes = ref<ReportedTime[]>([]);

const selectedStatusName = ref("");
const originalStatusName = ref("");
const selectedAssignedTo = ref<string | null>(null);
const originalAssignedTo = ref<string | null>(null);

const assignedToSearch = ref("");
const showAssignedToDropdown = ref(false);
const filteredAssignedTo = ref<EUser[]>([]);

const attachedFiles = computed(() => {
  if (!fullTicket.value || !fullTicket.value.ticket_attachments) return [];
  return fullTicket.value.ticket_attachments
    .split(",")
    .map((file) => file.trim())
    .filter((file) => file.length > 0);
});

const estimatedClosingDateStr = computed(() => {
  if (!fullTicket.value?.estimated_closing_date) return "";
  const date = new Date(fullTicket.value.estimated_closing_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
});

const hasChanges = computed(() => {
  if (!fullTicket.value) return false;
  const statusChanged = selectedStatusName.value !== originalStatusName.value;
  const assignedChanged =
    selectedAssignedTo.value !== null &&
    selectedAssignedTo.value !== originalAssignedTo.value;
  return statusChanged || assignedChanged;
});

const loadCatalogs = async () => {
  try {
    const [statusesRes, eUsersRes, servicesRes, prioritiesRes, ansRes] =
      await Promise.all([
        statusService.getAll(),
        eUsersServices.getAll(),
        requestTypeService.getAll(),
        ticketPriorityService.getAll(),
        ansService.getAll(),
      ]);

    if (statusesRes.success && statusesRes.data?.results) {
      statusesList.value = statusesRes.data.results
        .flat()
        .filter(
          (status) =>
            !status.is_backlog &&
            status.ordering !== null &&
            status.ordering !== undefined,
        )
        .sort((a, b) => (a.ordering || 0) - (b.ordering || 0));
    }

    if (eUsersRes.success && eUsersRes.data?.results) {
      eUsersList.value = eUsersRes.data.results;
    }

    if (servicesRes.success && servicesRes.data?.results) {
      servicesList.value = servicesRes.data.results;
    }

    if (prioritiesRes.success && prioritiesRes.data?.results) {
      prioritiesList.value = prioritiesRes.data.results;
    }

    if (ansRes.success && ansRes.data?.results) {
      ansList.value = ansRes.data.results;
    }
  } catch (error) {
    notification.error(
      "Error",
      "No se pudieron cargar los datos necesarios para el ticket",
    );
  }
};

const loadTicketData = async (ticketId: number) => {
  isLoading.value = true;
  fullTicket.value = null;

  try {
    await loadCatalogs();

    const response = await ticketsService.getTicketById(ticketId);
    if (response.success && response.data) {
      fullTicket.value = response.data;

      selectedStatusName.value = fullTicket.value.status?.status_name || "";
      originalStatusName.value = selectedStatusName.value;

      selectedAssignedTo.value = fullTicket.value.assigned_to;
      originalAssignedTo.value = fullTicket.value.assigned_to;

      assignedToSearch.value = "";
      if (fullTicket.value.assigned_to) {
        let assignedUser = eUsersList.value.find(
          (u) => u.network_user === fullTicket.value!.assigned_to,
        );

        if (!assignedUser) {
          const userResponse = await eUsersServices.GetEUsersByNetworkUser(
            fullTicket.value.assigned_to,
          );
          if (userResponse.success && userResponse.data) {
            assignedUser = userResponse.data;
          }
        }

        if (assignedUser) {
          assignedToSearch.value =
            `${assignedUser.name} ${assignedUser.middle_name || ""} ${assignedUser.last_name} ${assignedUser.second_last_name || ""}`
              .trim()
              .replace(/\s+/g, " ");
        }
      }

      ticketComments.value =
        fullTicket.value.notes && fullTicket.value.notes.length > 0
          ? fullTicket.value.notes
          : [];

      ticketReportedTimes.value =
        fullTicket.value.reported_times &&
        fullTicket.value.reported_times.length > 0
          ? fullTicket.value.reported_times
          : [];

      activeTab.value = "details";
    } else {
      notification.error("Error", "No se pudo cargar la información del ticket");
      closeModal();
    }
  } catch (error) {
    notification.error("Error", "Ocurrió un error al cargar el ticket");
    closeModal();
  } finally {
    isLoading.value = false;
  }
};

const filterAssignedTo = async () => {
  const search = assignedToSearch.value.trim();
  if (search.length === 0) {
    filteredAssignedTo.value = eUsersList.value;
    return;
  }

  try {
    const response = await eUsersServices.getAll(search);
    if (response.success && response.data?.results) {
      filteredAssignedTo.value = response.data.results;
    } else {
      filteredAssignedTo.value = [];
    }
  } catch (error) {
    console.error("Error al buscar usuarios asignados:", error);
    filteredAssignedTo.value = [];
  }
};

const selectAssignedTo = (eUser: EUser) => {
  selectedAssignedTo.value = eUser.network_user;
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

const saveChanges = async () => {
  if (!fullTicket.value || !hasChanges.value || isSaving.value) return;

  isSaving.value = true;
  try {
    const ticketId = fullTicket.value.id_ticket;

    if (selectedStatusName.value !== originalStatusName.value) {
      const newStatus = statusesList.value.find(
        (status) => status.status_name === selectedStatusName.value,
      );

      if (!newStatus) {
        notification.error("Error", "No se encontró el estado seleccionado");
        return;
      }

      const statusResponse = await ticketsService.updateTicketStatus(
        ticketId,
        newStatus.id_status,
      );
      if (!statusResponse.success) {
        notification.error(
          "Error",
          statusResponse.message || "No se pudo actualizar el estado",
        );
        return;
      }
      originalStatusName.value = selectedStatusName.value;
    }

    if (
      selectedAssignedTo.value &&
      selectedAssignedTo.value !== originalAssignedTo.value
    ) {
      const assignResponse = await ticketsService.updateTicket(ticketId, {
        assigned_to: selectedAssignedTo.value,
      });
      if (!assignResponse.success) {
        notification.error(
          "Error",
          assignResponse.message || "No se pudo reasignar el ticket",
        );
        return;
      }
      originalAssignedTo.value = selectedAssignedTo.value;
    }

    notification.success(
      "Ticket actualizado",
      "Los cambios se guardaron correctamente",
    );
    emit("ticketUpdated");
    closeModal();
  } catch (error) {
    notification.error("Error", "Ocurrió un error al guardar los cambios");
  } finally {
    isSaving.value = false;
  }
};

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

const closeModal = () => {
  emit("update:modelValue", false);
};

watch(
  () => [props.modelValue, props.ticketId] as const,
  ([visible, id]) => {
    if (visible && id !== null) {
      loadTicketData(id);
    }
  },
);
</script>
