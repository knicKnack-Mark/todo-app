<script setup>
import { useToast } from 'vue-toastification'

const toast = useToast()

const showToast = () => {
  toast.success('Vue Toastification is working!')
}
</script>

<template>
  <button class="btn btn-primary" @click="showToast">Show Toast</button>
</template>
