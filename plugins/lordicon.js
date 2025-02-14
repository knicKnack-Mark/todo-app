import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  if (process.client) {
    import('lottie-web').then((lottie) => {
      import('@lordicon/element').then(({ defineElement }) => {
        defineElement(lottie.default.loadAnimation);
      });
    });
  }
});
