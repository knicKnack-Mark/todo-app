  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useCookie } from '#app';

  export function useAddTodo(todos, paginatedTodos, currentPage, totalPages) {
    const title = ref('');
    const toast = useToast();
    const authToken = useCookie('auth_token'); // ✅ Retrieve token from cookie

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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken.value}` // ✅ Send token with request
          },
          body: JSON.stringify({ title: title.value }),
        });

        const text = await response.text();
        console.log('Raw Response:', text); // Debugging

        if (!response.ok) {
          toast.error('Failed to add todo');
          return;
        }

        const newTodoData = JSON.parse(text);
        todos.value.push(newTodoData);
        title.value = '';
        toast.success('Todo added successfully!');
      } catch (error) {
        console.error('Fetch Error:', error);
        toast.error('Error adding todo');
      }
    };
    
    return { title, addTodo };
  }
