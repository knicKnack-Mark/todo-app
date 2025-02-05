<template>
  <button class="btn btn-outline-secondary" :type="buttonType" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    default: 'Add todo',
  },
  buttonType: {
    type: String,
    default: 'submit',
  },

});

</script>
