
export function useRemoveTodo(todos, paginatedTodos, currentPage) {
  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      todos.value = todos.value.filter(todo => todo.id !== id);
      if (paginatedTodos.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
    } catch (error) {
      console.error(error.message);
      alert("Error deleting todo");
    }
  };

  return { removeTodo };
}
