import { ref, computed } from 'vue';

export function usePagination<T>(
  loadFunction: (page: number, pageSize: number) => Promise<any>,
  initialPageSize = 10
) {
  const items = ref<T[]>([]);
  const currentPage = ref(1);
  const pageSize = ref(initialPageSize);
  const totalItems = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  
  const totalPages = computed(() => 
    Math.ceil(totalItems.value / pageSize.value) || 1
  );

  const hasNextPage = computed(() => 
    currentPage.value < totalPages.value
  );

  const hasPrevPage = computed(() => 
    currentPage.value > 1
  );

  const loadData = async (page = 1) => {
    try {
      isLoading.value = true;
      error.value = null;    
      const response = await loadFunction(page, pageSize.value);
      
      if (response?.data) {
        const newItems = response.data.results || [];
        const newTotal = response.data.count || 0;
            
        items.value = [];
    
        items.value = newItems;
        totalItems.value = newTotal;
        currentPage.value = page;
        
      }
    } catch (err) {
      error.value = 'Error al cargar los datos';
    } finally {
      isLoading.value = false;
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      loadData(page);
    }
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      loadData(currentPage.value + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage.value) {
      loadData(currentPage.value - 1);
    }
  };

  const changePageSize = (newSize: number) => {
    pageSize.value = newSize;
    currentPage.value = 1;
    loadData(1);
  };

  const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const total = totalPages.value;
    const current = currentPage.value;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  });

  return {
    items,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    isLoading,
    error,
    hasNextPage,
    hasPrevPage,
    visiblePages,

    loadData,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
  };
}
