<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCookie } from '#app';

const route = useRoute();
const router = useRouter();
const activeLink = ref('');

// Dummy user data (replace with API data)
const user = ref({
  name: 'John Doe',
  email: 'johndoe@example.com'
});

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

// ✅ Logout Function
const logout = () => {
  useCookie('auth_token').value = null; // Clear the auth token
  router.push('/login'); // Redirect to login page
};
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
            <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'Home' }" to="/todos">
              Home
            </NuxtLink>
          </li>
          <li class="nav-item px-2">
            <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'About' }" to="/about">
              About
            </NuxtLink>
          </li>
          <li class="nav-item px-2">
            <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'Features' }" to="/features">
              Features
            </NuxtLink>
          </li>

          <!-- Account Dropdown (Without Avatar) -->
          <li class="nav-item dropdown px-2">
            <a class="nav-link " href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ user.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
              <li class="dropdown-header">
                <strong>{{ user.name }}</strong><br />
                <small class="text-muted">{{ user.email }}</small>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <NuxtLink class="dropdown-item" to="#">Profile</NuxtLink>
              </li>
              <li>
                <a class="dropdown-item text-danger" @click="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown-header {
  padding: 10px 20px;
}

.dropdown-item {
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>
