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
  },
  app: {
    head: {
      title: 'Todo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'This is a website to manage your daily doing without hassle' },
        { name: 'format-detection', content: 'telephone-no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})