import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useCookie } from '#app';

export function useEditTodo(todos) {
  const toast = useToast();
  const authToken = useCookie('auth_token'); // Retrieve token
  const selectedTodo = ref({ title: "" });

  // Triggered when user clicks 'Edit'
  const editTodo = (todo) => {
    selectedTodo.value = { ...todo };
  };

  // Save the updated Todo
  const saveEditedTodo = async () => {
    if (!selectedTodo.value.title.trim()) {
      toast.error('Title cannot be empty!');
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${selectedTodo.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken.value}`, // Authorization with token
        },
        body: JSON.stringify({ title: selectedTodo.value.title, done: selectedTodo.value.done }), // Send updated title and done status
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Error response from backend:', responseData); // Log the full response from backend
        toast.error(responseData.message || 'Failed to update todo');
        return;
      }
  
      // Update the todo in the local list after successful update
      const updatedTodo = responseData.todo;
      const index = todos.value.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }
  
      toast.success('Todo updated successfully!');
      selectedTodo.value = { title: "", done: false }; // Reset selectedTodo after success
    } catch (error) {
      console.error('Error updating todo:', error); // Log the full error stack for debugging
      toast.error('Error updating todo');
    }
  };
  
  

  return { selectedTodo, editTodo, saveEditedTodo };
}
