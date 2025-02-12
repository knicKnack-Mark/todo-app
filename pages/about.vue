<template>
  <div>
    <!-- Preloader Component -->
    <!-- <Preloader :loading="loading" /> -->

    <!-- Main Content -->
    <div v-show="!loading" class="container text-center">
      <h1>About Us</h1>
      <p>Welcome to our website. We are dedicated to providing the best service possible.</p>
    </div>
  </div>
</template>

<script setup>

// const loading = ref(true);

// onMounted(() => {
//   setTimeout(() => {
//     loading.value = false;
//   }, 500); // Adjust delay for smoother transition
// });
</script>
