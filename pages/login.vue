<template>
  <div class="bg-secondary bg-opacity-10 min-vh-100">
    <section class="min-vh-100 d-flex align-items-center">
      <div class="container py-4 h-100 ">
        <div class="row d-flex align-items-center justify-content-center h-100 pt-md-5 mt-md-5 pt-lg-0 mt-lg-4">
          <div class="col-md-6 col-lg-5">
            <NuxtImg 
              src="login.png"
              class="img-fluid" 
              alt="Phone image"
              quality="85" 
              />
          </div>
          <div class="col-md-6 col-lg-5 m-5">
              <h1 class="fs-3 fw-bolder pb-3">Log in</h1>
            <form>
              <!-- Email input -->
              <div class="form-outline mb-3">
                <input type="email" id="form1Example13" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example13">Email address</label>
              </div>
    
              <!-- Password input -->
              <div class="form-outline mb-3">
                <input type="password" id="form1Example23" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example23">Password</label>
              </div>
    
              <div class="d-flex justify-content-between align-items-center mb-3">
                <!-- Checkbox -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                  <label class="form-check-label" for="form1Example3"> Remember me </label>
                </div>
                <NuxtLink to="#!">Forgot password?</NuxtLink>
              </div>
    
              <!-- Submit button -->
              <!-- <button type="submit" class="btn btn-primary btn-lg w-100">Sign in</button> -->
              <NuxtLink to="/todos" class="btn btn-primary btn-lg w-100">Sign in</NuxtLink>

    
              <div class="divider d-flex align-items-center my-3">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <!-- Logo -->
              <div class="d-flex justify-content-center">
                <NuxtLink class="mx-2" to="#!">
                  <Icon 
                    name="logos:facebook" 
                    class="me-2" 
                    size='1.5em'
                    />
                </NuxtLink>
                <NuxtLink class="mx-2" to="#!">
                  <Icon 
                    name="flat-color-icons:google" 
                    class="me-2" 
                    size='1.5em'/>
                </NuxtLink>
                <NuxtLink class="mx-2" to="#!">
                  <Icon 
                    name="fa6-brands:square-x-twitter" 
                    class="text-dark me-2" 
                    size='1.5em'
                  />
                </NuxtLink>
                <NuxtLink class="mx-2" to="#!">
                  <Icon 
                    name="skill-icons:instagram" 
                    class="text-dark me-2" 
                    size='1.5em'
                  />
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
  </section>
  </div>

</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})


</script>

<style scoped>

</style>