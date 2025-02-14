<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeLink = ref(''); // Default to no active link

// Function to update the active link based on the route
const setActiveLink = (path) => {
  if (path === "/") {
    activeLink.value = "";
  } else if (path === "/todos") {
    activeLink.value = "Home";
  } else if (path === "/about") {
    activeLink.value = "About";
  } else if (path === "/features") {
    activeLink.value = "Features";
  }
};

// Check the route on initial mount
onMounted(() => {
  setActiveLink(route.path);
});

// Watch for route changes and update active link
watch(() => route.path, (newPath) => {
  setActiveLink(newPath);
});
</script>



<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid container-lg">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar-brand fw-bold">
        <span class="text-danger">MRK</span>NL
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- List -->
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium">
          <li class="nav-item px-2">
          <NuxtLink 
            class="nav-link" 
            :class="{ 'active-link': activeLink === 'Home' }" 
            to="/todos"
          >
            Home
          </NuxtLink>
          </li>
          <li class="nav-item px-2">
            <NuxtLink 
              class="nav-link" 
              :class="{ 'active-link': activeLink === 'About' }" 
              to="/about"
            >
              About
            </NuxtLink>
          </li>
          <li class="nav-item px-2">
            <NuxtLink 
              class="nav-link" 
              :class="{ 'active-link': activeLink === 'Features' }" 
              to="/features"
            >
              Features
            </NuxtLink>
          </li>
          <li class="nav-item px-2">
            <NuxtLink 
              class="nav-link" 
              to="/"
            >
              Logout
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Default link styles */
.nav-link {
  position: relative;
  color: black;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  display: inline-block; /* Ensures underline is only as wide as the text */
  padding-bottom: 2px; /* Adds space below the text */
}

/* Active link styles */
.active-link {
  color: #dc3545 !important; /* Bootstrap success color */
}

/* Underline animation */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #dc3545;
  transition: width 0.2s ease-in-out;
}

/* Expand the underline only under the text */
.active-link::after {
  width: 100%;
}
</style>
