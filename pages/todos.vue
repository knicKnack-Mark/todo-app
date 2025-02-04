<template>
  <div class="container text-center">
    <div class="d-inline-block position-relative">
      <NuxtImg 
        src="/mountain2.jpg" 
        alt="image"
        quality="100" 
        width="800"
        height="200"
        class="img-fluid d-block mx-auto "
      />
      
      <h1 class="position-absolute top-50 start-50 translate-middle text-white fw-bold text-shadow">
        Todo List
      </h1>

    </div>

    <form @submit.prevent="addTodo " class="mt-3 ">
      <input 
        type="text" 
        placeholder="Enter new todo" 
        v-model="title" 
        class="form-control"/>
      <button type="submit">Add todo</button>
    </form>
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
          <input 
            type="checkbox" 
            :checked="todo.done" 
            @change="toggleDone(todo.id, todo.done)" />
          <span :class="{done: todo.done}"> {{ todo.title }} </span>
          <button
            type="button"
            @click="removeTodo(todo.id)">Remove</button>
        </li>
      </ul>

      
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { data: todos, error, refresh} = await useFetch('http://127.0.0.1:8000/api/todos');

const title = ref('');
const addTodo = async () => {
  if(title.value.trim()){
    const response = await fetch('http://127.0.0.1:8000/api/todos', {
      method: 'POST',
      'headers': {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ title: title.value })
    });

    const newTodoData = await response.json();
    todos.value.push(newTodoData);
    title.value = '';
    
  }
}

const toggleDone = async (id, done) => {
  const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
    method: 'PUT',
    'headers': {
      'content-type': 'application/json'
    },
    body:JSON.stringify({ done: !done })
  })
  await refresh();
  }

const removeTodo = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
    method: 'DELETE',
    'headers': {
      'content-type': 'application/json'
    },
  })
  await refresh();
  }
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
.text-shadow {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>