export function useToggleDone(todos) {
  const toggleDone = async (id, done) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ done: !done }),
      });

      const todo = todos.value.find((t) => t.id === id);
      if (todo) todo.done = !done;
    } catch (error) {
      console.error(error.message);
      alert("Error updating todo");
    }
  };

  return { toggleDone };
}
