import { ref, computed } from "vue";
import { useCookie, useAsyncData } from "#app";

export function useAuth() {
  const authToken = useCookie("auth_token");
  const user = ref(null);

  // Fetch user data if token exists
  if (authToken.value) {
    useAsyncData("user", async () => {
      try {
        const response = await $fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${authToken.value}`,
          },
        });
        user.value = response;
      } catch (error) {
        console.error("Error fetching user:", error);
        authToken.value = null; // Remove invalid token
        user.value = null;
      }
    });
  }

  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated };
}
