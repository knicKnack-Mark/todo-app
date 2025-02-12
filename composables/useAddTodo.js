import { ref } from 'vue';
import { useToast } from '@/composables/useToast';

export function useAddTodo(todos, paginatedTodos, currentPage, totalPages) {
  const title = ref('');
  const { showToast } = useToast();

  const addTodo = async () => {
    if (!title.value.trim()) return;

    const exists = todos.value.some(todo => todo.title.toLowerCase() === title.value.toLowerCase());
    if (exists) {
      showToast();
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/todos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title: title.value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors?.title) {
          showToast();
        } else {
          throw new Error("Failed to add todo");
        }
        return;
      }

      const newTodoData = await response.json();
      todos.value.push(newTodoData);
      title.value = '';

      if (paginatedTodos.value.length >= 5) {
        currentPage.value = totalPages.value;
      }
    } catch (error) {
      console.error(error.message);
      alert("Error adding todo");
    }
  };

  return { title, addTodo };
}
