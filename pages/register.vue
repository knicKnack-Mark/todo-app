
<template>
  <div class="bg-register min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
          <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="row">
                <div class="col-12">
                  <div class="mb-4">
                    <h2 class="h3">Registration</h2>
                    <h3 class="fs-6 fw-normal text-secondary m-0">Enter your details</h3>
                  </div>
                </div>
              </div>
              <form @submit.prevent="register">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input v-model="form.firstName" type="text" class="form-control" placeholder="First Name" required>
                      <label>First Name</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input v-model="form.lastName" type="text" class="form-control" placeholder="Last Name" required>
                      <label>Last Name</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com" required>
                      <label>Email</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
                      <label>Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input v-model="form.agree" class="form-check-input" type="checkbox">
                      <label class="form-check-label text-secondary">
                        I agree to the <a href="#" class="link-primary text-decoration-none">terms and conditions</a>
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid">
                      <button class="btn bsb-btn-2xl btn-primary" type="submit" :disabled="loading">
                        {{ loading ? 'Registering...' : 'Sign up' }}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-4 mb-2 border-secondary-subtle">
                  <p class="m-0 text-secondary text-center">
                    Already have an account? <a href="#!" class="link-primary text-decoration-none">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

import { ref } from 'vue';
import { useFetch, useRouter } from '#app';
import { useToast } from 'vue-toastification';

const loading = ref(false);
const toast = useToast({
  containerClassName: 'pt-4',
});
const router = useRouter(); // 👈 Import the router

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  agree: false,
});

const register = async () => {
  if (!form.value.agree) {
    toast.error('You must agree to the terms and conditions.');
    return;
  }

  loading.value = true;

  try {
    const { data, error } = await useFetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
      },
    });

    if (error.value) {
      // Check if Laravel validation errors exist
      if (error.value.data?.errors) {
        const validationErrors = error.value.data.errors;
        Object.values(validationErrors).forEach((messages) => {
          messages.forEach((message) => toast.error(message));
        });
      } else {
        toast.error(error.value.data?.message || "Registration failed.");
      }
      return;
    }

    // Store token for authentication
    localStorage.setItem('auth_token', data.value.token);

    toast.success('Registration successful! Redirecting to login...', {
      timeout: 2000,
    });

    // Clear form after successful registration
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agree: false,
    };

    // 👇 Redirect to login page after 2 seconds
    setTimeout(() => {
      router.push('/login');
    }, 2500);
  } catch (error) {
    toast.error(error.message || "An unexpected error occurred.");
  } finally {
    loading.value = false;
  }
};
</script>


