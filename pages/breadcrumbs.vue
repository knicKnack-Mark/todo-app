<template>
  <div>
    <!-- Button to trigger toast -->
    <button type="button" class="btn btn-primary" id="liveToastBtn">
      Show live toast
    </button>
    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3 mt-5">
      <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">

          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          This title already exists! Please enter a different one.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const { $bootstrap } = useNuxtApp()

onMounted(() => {
  const toastBtn = document.getElementById('liveToastBtn')
  const toastEl = document.getElementById('liveToast')

  if (toastBtn && toastEl) {
    toastBtn.addEventListener('click', () => {
      const toast = new $bootstrap.Toast(toastEl)
      toast.show()
    })
  }
})
</script>
