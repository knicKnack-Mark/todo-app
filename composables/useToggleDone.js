import { useCookie } from "#app"; // Import useCookie
import { useToast } from "vue-toastification"; // Import toast notifications

export function useToggleDone(todos) {
  const authToken = useCookie("auth_token"); // Retrieve token
  const toast = useToast(); // Initialize toast

  const toggleDone = async (id, done) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken.value}` // ✅ Add token
        },
        body: JSON.stringify({ done: !done }),
      });

      if (!response.ok) throw new Error("Failed to update todo status");

      const todo = todos.value.find((t) => t.id === id);
      if (todo) {
        todo.done = !done;
        toast.success(`Todo marked as ${todo.done ? "completed" : "incomplete"}!`);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Error updating todo status");
    }
  };

  return { toggleDone };
}
