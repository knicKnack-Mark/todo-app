import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useAddTodo(todos, paginatedTodos, currentPage, totalPages) {
  const title = ref('');
  const toast = useToast(); 

  const addTodo = async () => {
    if (!title.value.trim()) return;

    const exists = todos.value.some(todo => todo.title.toLowerCase() === title.value.toLowerCase());
    if (exists) {
      toast.error('Todo already exists!');
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
          toast.error('Invalid todo title!');
        } else {
          throw new Error('Failed to add todo');
        }
        return;
      }

      const newTodoData = await response.json();
      todos.value.push(newTodoData);
      title.value = '';

      if (paginatedTodos.value.length >= 5) {
        currentPage.value = totalPages.value;
      }

      toast.success('Todo added successfully!');
    } catch (error) {
      console.error(error.message);
      toast.error('Error adding todo');
    }
  };

  return { title, addTodo };
}
