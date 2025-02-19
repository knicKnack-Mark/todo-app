<template>
  <div class="bg-secondary bg-opacity-10 min-vh-100">
    <section class="min-vh-100 d-flex align-items-center">
      <div class="container py-4 h-100 bg-white rounded-4">
        <div class="row d-flex align-items-center justify-content-center h-100 pt-md-5 mt-md-5 pt-lg-0 mt-lg-4">
          <div class="col-md-6 col-lg-5">
            <NuxtImg 
              src="login2.png"
              class="img-fluid" 
              alt="Phone image"
              quality="85" 
            />
          </div>
          <div class="col-md-6 col-lg-5 m-5">
            <h1 class="fs-3 fw-bolder pb-3">Log in</h1>
            <form @submit.prevent="login">
              <!-- Email input -->
              <div class="form-outline mb-3">
                <input 
                  v-model="form.email" 
                  type="email" 
                  class="form-control form-control-lg" 
                  required
                  placeholder="Email Address" 
                  />
              </div>

              <!-- Password input -->
              <div class="form-outline mb-3">
                <input 
                  v-model="form.password" 
                  type="password" 
                  class="form-control form-control-lg" 
                  required
                  placeholder="Password"
                  />
                
              </div>

              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="rememberMe" />
                  <label class="form-check-label"> Remember me </label>
                </div>
                <NuxtLink class="text-decoration-none" to="#">Forgot password?</NuxtLink>
              </div>

              <!-- Submit button -->
              <button class="btn btn-primary btn-lg w-100" type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Sign in' }}
              </button>

              <div class="divider d-flex align-items-center my-3">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <!-- Social login -->
              <div class="d-flex justify-content-center pb-3">
                <NuxtLink class="mx-2" to="#"><Icon name="logos:facebook" size="1.5em" /></NuxtLink>
                <NuxtLink class="mx-2" to="#"><Icon name="flat-color-icons:google" size="1.5em" /></NuxtLink>
                <NuxtLink class="mx-2 text-dark" to="#"><Icon name="fa6-brands:square-x-twitter" size="1.5em" /></NuxtLink>
                <NuxtLink class="mx-2" to="#"><Icon name="skill-icons:instagram" size="1.5em" /></NuxtLink>
              </div>
              <div class="d-flex justify-content-center">
                <p class="text-muted">Don't have an account? <NuxtLink to="/register">Register</NuxtLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

definePageMeta({
  layout: false
});



const router = useRouter();
const toast = useToast();
const loading = ref(false);

const form = ref({
  email: '',
  password: ''
});

const rememberMe = ref(false);

const login = async () => {
  loading.value = true;

  try {
    const { data, error } = await useFetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    });

    console.log("API Response:", data.value); // ✅ Debugging - See response in console

    if (error.value) {
      toast.error(error.value.data?.message || 'Login failed.');
      return;
    }

    if (!data.value || !data.value.token) {
      toast.error("Invalid response. No token received.");
      console.error("Error: Token is missing in response", data.value);
      return;
    }

    // ✅ Store token in cookie for authentication
    useCookie('auth_token', { maxAge: 60 * 60 * 24 }).value = data.value.token;

    toast.success('Login successful! Redirecting...');
    setTimeout(() => {
      router.push('/todos');
    }, 1000);
  } catch (err) {
    console.error("Login error:", err);
    toast.error('An unexpected error occurred.');
  } finally {
    loading.value = false;
  }
};


</script>

<style scoped>

</style>
