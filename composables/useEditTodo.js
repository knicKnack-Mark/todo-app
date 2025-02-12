import { ref } from 'vue';

export function useEditTodo() {
  const selectedTodo = ref({ title: "" });

  const editTodo = (todo) => {
    selectedTodo.value = { ...todo };
  };

  return { selectedTodo, editTodo };
}
