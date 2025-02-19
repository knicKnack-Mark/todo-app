<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card border-dark">
      <div class="card-body text-center p-4 p-xxl-5">
        <!-- Dynamic Icon -->
        <Icon :name="cardIcon" size="3em" class="text-primary mb-4" />
        <h4 class="mb-4">{{ cardTitle }}</h4>
        <p class="mb-4 text-secondary">{{ cardText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardTitle: {
    type: String,
    required: true
  },
  cardText: {
    type: String,
    required: true
  },
  cardIcon: {
    type: String,
  }
});
</script>
