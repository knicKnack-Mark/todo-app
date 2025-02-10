<template>
  <div class="container text-center pt-3">
    <div class="d-inline-block position-relative">
      <NuxtImg 
        src="/mountain2.jpg" 
        alt="image"
        quality="100" 
        width="800"
        height="100"
        class="img-fluid d-block mx-auto"
      />
      <h1 class="position-absolute top-50 start-50 translate-middle text-white fw-bold text-shadow">
        Todo List
      </h1>
      <form @submit.prevent="addTodo" class="mt-3 input-group position-absolute pt-5 start-50 translate-middle">
        <input 
          v-model="title" 
          type="text" 
          placeholder="Enter new todo" 
          aria-label="Enter new todo" 
          class="form-control"
        />
        <button class="btn btn-success btn-outline-success">
          <Icon name="mdi-add-circle-outline" class="text-light"/>
        </button>
      </form>
    </div>

    <!-- Todo List -->
    <ul class="mt-5 pt-4 mx-auto list-unstyled" style="max-width: 800px; min-height: 200px;">
      <li v-if="paginatedTodos.length === 0" class="text-muted">No todos available. Add some tasks!</li>
      <li v-for="(todo, index) in paginatedTodos" :key="todo.id" class="d-flex align-items-center justify-content-between mb-2">
        <div class="form-check">
          <input 
            :id="`todo-${index}`"
            type="checkbox" 
            class="form-check-input custom-checkbox"
            :checked="todo.done" 
            @change="toggleDone(todo.id, todo.done)" 
          />
          <label :for="`todo-${index}`" class="form-check-label ms-2"></label>
        </div>
        <span :class="{ done: todo.done }" class="todo-text flex-grow-1 ms-2">
          <span class="text-animation">{{ todo.title }}</span>
        </span>
        <button @click="removeTodo(todo.id)" class="btn btn-success btn-outline-success me-2">
          <Icon name="mdi-edit" class="text-light"/>
        </button>
        <button @click="removeTodo(todo.id)" class="btn btn-danger btn-outline-danger">
          <Icon name="mdi-delete-outline" class="text-light"/>
        </button>

      </li>
    </ul>

    <!-- Pagination -->
    <nav aria-label="Todo Pagination" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages || totalPages === 0 }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const { data: todos, refresh } = await useFetch('http://127.0.0.1:8000/api/todos');

const title = ref('');
const currentPage = ref(1);
const pageSize = 5;

const addTodo = async () => {
  if (!title.value.trim()) return;

  // Check for duplicate title in the frontend
  const exists = todos.value.some(todo => todo.title.toLowerCase() === title.value.toLowerCase());
  if (exists) {
    alert("This title already exists! Please enter a different one.");
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
        alert("This title already exists! Please enter a different one.");
      } else {
        throw new Error("Failed to add todo");
      }
      return;
    }

    const newTodoData = await response.json();
    todos.value.push(newTodoData);
    title.value = '';

    if (paginatedTodos.value.length >= pageSize) {
      currentPage.value = totalPages.value;
    }
  } catch (error) {
    console.error(error.message);
    alert("Error adding todo");
  }
};



const toggleDone = async (id, done) => {
  const updatedDone = !done;
  await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ done: updatedDone }),
  });
  await refresh();
};


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


const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return todos.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.max(Math.ceil(todos.value.length / pageSize), 1));

watch(todos, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
</script>

<style scoped>
.text-shadow { text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); }
.custom-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  appearance: none;
  border: 2px solid #6c757d;
  border-radius: 4px;
  transition: background 0.3s ease, border-color 0.3s ease;
}
.custom-checkbox:checked {
  background-color: #28a745;
  border-color: #28a745;
  position: relative;
}
.custom-checkbox:checked::after {
  content: "✔";
  font-size: 14px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.todo-text .text-animation {
  display: inline-block;
  position: relative;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.todo-text.done .text-animation {
  color: #6c757d;
  opacity: 0.7;
}
.todo-text.done .text-animation::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 50%;
  width: 100%;
  height: 2px;
  background: #6c757d;
  transition: width 0.5s ease-in-out;
}
</style>
