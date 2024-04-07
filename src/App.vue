<template>
  <div id="app" class="w-100">
    <!-- Conditional rendering based on authentication status -->
    <template v-if="authStore.isLoggedIn">
      <!-- Render the authenticated layout -->
      <AuthenticatedLayout />
    </template>
    <template v-else>
      <!-- Render the public layout -->
      <PublicLayout />
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "./stores/auth";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import PublicLayout from "@/components/layout/PublicLayout.vue"; 

export default defineComponent({
  name: "App",
  components: {
    AuthenticatedLayout,
    PublicLayout
  },
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
});
</script>

<style>
/* Add any custom styles here */
</style>
