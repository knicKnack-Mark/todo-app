<template>
  <div v-if="loading" class="preloader">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>


defineProps({
  loading: Boolean,
});
</script>

<style>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  z-index: 9999;
  transition: opacity 0.5s ease-in-out;
}
</style>
