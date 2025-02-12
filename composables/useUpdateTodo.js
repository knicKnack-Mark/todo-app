import { ref } from 'vue';

export function useUpdateTodo(todos, selectedTodo) {
  const updateTodo = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${selectedTodo.value.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: selectedTodo.value.title }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const index = todos.value.findIndex(t => t.id === selectedTodo.value.id);
      if (index !== -1) {
        todos.value[index].title = selectedTodo.value.title;
      }

      const modal = document.getElementById("editTodoModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return { updateTodo };
}
