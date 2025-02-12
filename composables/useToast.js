import { ref, onMounted } from 'vue';

export function useToast() {
  const toastInstance = ref(null);
  const { $bootstrap } = useNuxtApp();

  onMounted(() => {
    const toastEl = document.getElementById('liveToast');
    if (toastEl) {
      toastInstance.value = new $bootstrap.Toast(toastEl);
    }
  });

  const showToast = () => {
    if (toastInstance.value) {
      toastInstance.value.show();
    }
  };

  return { showToast };
}
