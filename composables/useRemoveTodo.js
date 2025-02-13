import { useToast } from 'vue-toastification';
import { useCookie } from '#app'; //1

export function useRemoveTodo(todos, paginatedTodos, currentPage) {
  const toast = useToast();
  const authToken = useCookie('auth_token'); // Retrieve the token //2

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.value}`, // Add the token in header //3
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete todo'); // Detailed error message
      }

      todos.value = todos.value.filter(todo => todo.id !== id);
      if (paginatedTodos.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
      toast.success('Todo deleted successfully!');
      
    } catch (error) {
      console.error(error.message);
      toast.error('Error deleting todo');
    }
  };

  return { removeTodo };
}
