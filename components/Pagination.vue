<template>
    <div class="col-12 flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <button 
                :disabled="pagination.center == pagination.firstPage || pagination.totalPages < 2"
                @click="goToPage(pagination.currentPage - 1)"
                :class="{
                    'bg-indigo-500 text-white cursor-pointer': pagination.currentPage != pagination.firstPage,
                    'bg-white text-gray-200 border border-white/10': pagination.currentPage == pagination.firstPage,
                }"
                class="relative inline-flex items-center rounded-md px-2 py-2">Anterior</button>
            <button
                @click="goToPage(pagination.currentPage + 1)"
                :disabled="pagination.currentPage == pagination.totalPages" 
                :class="{
                    'bg-indigo-500 text-white cursor-pointer': pagination.currentPage != pagination.totalPages,
                    'bg-white text-gray-200 border border-white/10': pagination.currentPage == pagination.totalPages,
                }"
                class="relative inline-flex items-center rounded-md px-2 py-2">Siguiente</button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <select :value="pagination.perPage" @change="changePerPage"
                class="px-1 py-1 border-2 border-slate-200 rounded-xl transition-all bg-white">
                <option v-for="v in pagination.perPageOptions" :key="v" :value="v">
                    {{ v }}
                </option>
            </select>
            <div>
                <p class="text-sm text-gray-300 text-center">
                    Showing
                    {{ props.itemsCount }}
                    <span class="font-medium"></span>
                    of
                    <span class="font-medium"></span>
                    {{ props.totalRegisters }}
                    results
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
                    <button type="button"
                        :disabled="pagination.center == pagination.firstPage || pagination.totalPages < 2"
                        @click="goToPage(pagination.currentPage - 1)"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-black-400 inset-ring-gray-700"
                        :class="{
                            'hover:bg-indigo-500 hover:text-white cursor-pointer': pagination.currentPage != pagination.firstPage,
                        }">
                        <ChevronLeft class="size-5" aria-hidden="true" />
                    </button>
                    <input type="button" aria-current="page"
                        :disabled="pagination.totalPages < 2 || pagination.currentPage == pagination.firstPage"
                        @click="goToPage(pagination.firstPage)" :value="pagination.firstPage" :class="{
                            'bg-indigo-500 text-white': pagination.currentPage == pagination.firstPage,
                        }"
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm text-black-400 cursor-pointer hover:bg-indigo-500 hover:text-white">
                    <span v-if="pagination.totalPages > 5"
                        class="relative z-10 inline-flex items-center px-2 py-2 text-sm text-black-400 cursor-default">...</span>

                    <input v-if="pagination.totalPages > 1" type="button" :value="pagination.previous"
                        :disabled="!pagination.previous || pagination.currentPage == pagination.previous"
                        @click="goToPage(pagination.previous!)" :class="{
                            'bg-indigo-500 text-white': pagination.currentPage == pagination.previous,
                        }"
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm text-black-400 cursor-pointer hover:bg-indigo-500 hover:text-white">
                    <input v-if="pagination.totalPages > 2" type="button" :value="pagination.center"
                        @click="goToPage(pagination.center)" :disabled="pagination.currentPage == pagination.center"
                        :class="{
                            'bg-indigo-500 text-white': pagination.currentPage == pagination.center,
                        }"
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm text-black-400 cursor-pointer hover:bg-indigo-500 hover:text-white">
                    <input v-if="pagination.totalPages > 3" type="button" :value="pagination.next"
                        :disabled="!pagination.next || pagination.currentPage == pagination.next"
                        @click="goToPage(pagination.next!)" :class="{
                            'bg-indigo-500 text-white': pagination.currentPage == pagination.next,
                        }"
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm text-black-400 cursor-pointer hover:bg-indigo-500 hover:text-white">

                    <span v-if="pagination.totalPages > 5"
                        class="relative z-10 inline-flex items-center px-2 py-2 text-sm text-black-400 cursor-default">...</span>

                    <input v-if="pagination.totalPages > 4" type="button" @click="goToPage(pagination.totalPages)"
                        :value="pagination.totalPages" :class="{
                            'bg-indigo-500 text-white': pagination.currentPage == pagination.totalPages,
                        }"
                        class="relative z-10 inline-flex items-center px-4 py-2 text-sm text-black-400 cursor-pointer hover:bg-indigo-500 hover:text-white">
                    <button type="button" 
                        @click="goToPage(pagination.currentPage + 1)"
                        :disabled="pagination.currentPage == pagination.totalPages" 
                        :class="{
                            'hover:bg-indigo-500 hover:text-white cursor-pointer': pagination.currentPage != pagination.totalPages,
                        }"
                        class="relative z-10 inline-flex items-center rounded-r-md px-2 py-2 text-sm text-black-400">
                        <ChevronRight class="size-5" aria-hidden="true" />
                    </button>

                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
    totalRegisters: number,
    itemsCount: number
}>()

const emit = defineEmits<{
    (e: 'change', payload: PaginationState): void
}>()

export interface PaginationState {
    firstPage: number,
    previous: number | null,
    center: number,
    next: number | null,
    totalPages: number,
    perPage: number,
    currentPage: number
    perPageOptions: [10, 20, 50, 100]
}

const pagination = ref<PaginationState>({
    firstPage: 1,
    previous: null,
    center: 1,
    next: null,
    totalPages: 1,
    perPage: 10,
    currentPage: 1,
    perPageOptions: [10, 20, 50, 100]
})

function recalculate() {
    const totalPages = Math.max(1, Math.ceil(props.totalRegisters / pagination.value.perPage))

    let pager = pagination.value
    pager.totalPages = totalPages
    if (pager.totalPages < 5) {
        pager.firstPage = 1
        pager.previous = 2
        pager.center = 3
        pager.next = 4
        return
    }

    if (pager.currentPage == pager.firstPage || pager.currentPage == pager.firstPage + 1) {
        pager.previous = pager.firstPage + 1
        pager.center = pager.firstPage + 2
        pager.next = pager.firstPage + 3
        return
    }

    if (pager.currentPage == pager.totalPages || pager.currentPage == pager.totalPages - 1) {
        pager.previous = pager.totalPages - 3
        pager.center = pager.totalPages - 2
        pager.next = pager.totalPages - 1
        return
    }

    pager.center = pager.currentPage
    pager.previous = pager.center - 1
    pager.next = pager.center + 1
}

watch(
    () => props.totalRegisters,
    () => {
        recalculate()
        emit('change', pagination.value)
    },
    { immediate: true }
)

function goToPage(page: number) {
    if (page < 1 || page > pagination.value.totalPages) page = 1
    pagination.value.currentPage = page
    emit('change', pagination.value)
    recalculate()
}

function changePerPage(event: Event) {
    pagination.value.perPage = parseInt((event.target as HTMLSelectElement).value)
    emit('change', pagination.value)
    recalculate()
}

</script>