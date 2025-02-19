<template>
  <!-- <Preloader :loading="loading" /> -->
  <div class="container text-center pt-5 no-vertical-scrollbar">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
        <h2 class="mb-4 display-5 text-center">Our Features</h2>
        <p class="text-secondary mb-5 text-center lead fs-4">
          Our comprehensive range of services caters the plans of everyone to be creative every day and to be able to finish the workload easily and neatly
        </p>
        <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle">
      </div>
    </div>

    <div class="row g-4">
      <Card 
        v-for="(item, index) in cards" 
        :key="index"
        :cardTitle="item.cardTitle" 
        :cardText="item.cardText"
        :cardIcon="item.cardIcon"
      /> 
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth', // Apply the middleware
});

const cards = [
  {
    cardTitle: "Task Management",
    cardText: "Create, manage, and prioritize your tasks in one place.",
    cardIcon: "fluent-mdl2:task-manager"
  },
  {
    cardTitle: "Simple UI",
    cardText: "A clean and simple user interface that makes navigation a breeze.",
    cardIcon: "gg:ui-kit"
  },
  {
    cardTitle: "Cross Platform",
    cardText: "Access your tasks from any device, anywhere.",
    cardIcon: "tdesign:control-platform-filled"
  },
  {
    cardTitle: "Task Tracking",
    cardText: "Monitor your progress and stay on top of deadlines.",
    cardIcon: "tdesign:task"
  },
  {
    cardTitle: "Lorem Ipsum",
    cardText: "Additional features to boost your productivity.",
    cardIcon: "flat-color-icons:info"
  }
];
</script>


<style scoped>
/* Add your styles here */
</style>
