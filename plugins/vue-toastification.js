import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    showCloseButtonOnHover: true,
    containerClassName: 'pt-5 mt-2'
  }

  nuxtApp.vueApp.use(Toast, options)
})
