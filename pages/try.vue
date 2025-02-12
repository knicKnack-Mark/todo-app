<template>
  <div>
    <div v-if="loading" class="preloader">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        
      </div>
    </div>

    <div v-show="!loading" class="content">
      <h1>THIS IS A WEBSITE WITH PRELOADER</h1>
      <div ref="target" class="box">Animate Me</div>
      <nuxt-link class="btn btn-primary" to="/animation">go to animation</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';

const target = ref(null);
useMotion(target, { opacity: 1, scale: 1.2 });

const loading = ref(true);

onMounted(() => {
  if (document.readyState === "complete") {
    loading.value = false;
  } else {
    window.addEventListener("load", () => {
      loading.value = false;
    });
  }
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
}
.content {
  text-align: center;
  padding: 50px;
}
</style>
