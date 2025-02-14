// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/styles/global.css'],
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('lord-icon')
    }
  }
})