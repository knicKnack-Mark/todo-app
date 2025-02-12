<template>
  <div>
    <Motion
      v-for="(product, index) in products"
      :key="index"
      preset="slideVisibleLeft"
      :duration="600"
      :delay="index * 200"
    >
      <section>
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
      </section>
    </Motion>
  </div>
</template>

<script setup>
const products = [
  { title: "Product 1", description: "Description text" },
  { title: "Product 2", description: "Description text" },
  { title: "Product 3", description: "Description text" },
];
</script>
