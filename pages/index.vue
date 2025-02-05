<template>
      <div class="container p-5">
        <div class="row flex-lg-row-reverse align-items-center ">
            <div class="col-10 mx-auto col-sm-8 col-lg-6">
                <img 
                  src="/assets/drawn.png"  class="d-block mx-lg-auto img-fluid" alt="vector" loading="lazy">
            </div>
            <div class="col-lg-6">
                <div class="lc-block mb-3">
                    <div editable="rich">
                        <h2 class="fw-bold display-5">Welcome to Your Todo App</h2>
                    </div>
                </div>
                <div class="lc-block mb-3">
                    <div editable="rich">
                        <p class="lead">Stay organized, keep track of your tasks, and boost your productivity. 
                          With our easy-to-use Todo App, you can efficiently create, manage, and prioritize your tasks in one place.
                        </p>
                        <p class="lead ">
                          Ready to start? Click below to view or add your tasks and take control of your to-do list today!
                        </p>
                        
                    </div>
                </div>
                <div class="lc-block d-grid gap-2 d-md-flex justify-content-md-start">
                  <NuxtLink
                    to="/todos"
                    class="btn btn-danger px-4 me-md-2 rounded-pill w-md-auto"
                  >
                    Take Control of Your Day
                  </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>