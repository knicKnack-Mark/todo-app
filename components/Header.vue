<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid container-lg">
      <!-- Logo -->
      <NuxtLink to="/todos" class="navbar-brand fw-bold">
        <span class="text-danger">MRK</span>NL
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation List -->
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

          <!-- Account Dropdown (Only if Authenticated) -->
          <li v-if="isAuthenticated" class="nav-item dropdown px-2">
            <a
              class="nav-link"
              href="#"
              id="accountDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user.name || 'Loading...' }}
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
                <NuxtLink class="dropdown-item text-danger" @click="logout">Logout</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from '#app';
import { useAuth } from '@/composables/useAuth';

const { user, isAuthenticated } = useAuth();
const route = useRoute();
const router = useRouter();
const activeLink = ref('');

// Function to update the active link based on the route
const setActiveLink = (path) => {
  if (path === '/') activeLink.value = '';
  else if (path === '/todos') activeLink.value = 'Home';
  else if (path === '/about') activeLink.value = 'About';
  else if (path === '/features') activeLink.value = 'Features';
};

// Initialize active link on mount
onMounted(() => setActiveLink(route.path));

// Watch for route changes and update active link
watch(() => route.path, (newPath) => setActiveLink(newPath));

// Logout function
const logout = () => {
  useCookie('auth_token').value = null;
  router.push('/login');
};
</script>
