<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
    <lord-icon
      src="https://cdn.lordicon.com/lltgvngb.json"
      trigger="loop"
      colors="primary:#121331,secondary:#e83a30"
      style="width:200px;height:200px"
    />
    <h1 class="display-4 fw-bold text-danger">{{ error.statusCode }}</h1>
    <p class="lead">{{ error.message || 'Oops! Something went wrong.' }}</p>
    <NuxtLink to="/" class="btn btn-primary mt-3">Go Home</NuxtLink>
  </div>
</template>

<script setup>
defineProps(['error']);
</script>
