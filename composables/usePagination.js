// composables/usePagination.js
import { ref, computed, watch } from 'vue';

export function usePagination(todos, pageSize = 5) {
  const currentPage = ref(1);

  const paginatedTodos = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return todos.value.slice(start, start + pageSize);
  });

  const totalPages = computed(() => Math.max(Math.ceil(todos.value.length / pageSize), 1));

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  watch(todos, () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  });

  return {
    currentPage,
    paginatedTodos,
    totalPages,
    nextPage,
    prevPage,
  };
}
