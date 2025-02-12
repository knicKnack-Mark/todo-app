import { ref, computed, watch } from 'vue';
import { useFetch } from '#app';

export function useTodos() {
  const { data: todos, refresh } = useFetch('http://127.0.0.1:8000/api/todos');
  const selectedTodo = ref({ title: "" });
  const title = ref('');

  const addTodo = async () => {
    if (!title.value.trim()) return;
    const exists = todos.value.some(todo => todo.title.toLowerCase() === title.value.toLowerCase());
    if (exists) return false;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/todos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ title: title.value }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      todos.value.push(await response.json());
      title.value = '';
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const updateTodo = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/todos/${selectedTodo.value.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: selectedTodo.value.title }),
      });
      const index = todos.value.findIndex(t => t.id === selectedTodo.value.id);
      if (index !== -1) todos.value[index].title = selectedTodo.value.title;
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/todos/${id}`, { method: 'DELETE' });
      todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return { 
    todos, 
    selectedTodo, 
    title, 
    addTodo, 
    updateTodo, 
    removeTodo
  };
}