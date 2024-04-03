<template>
  <div id="app">
    <template v-if="authStore.isLoggedIn">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Your App</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <!-- Add more navbar items as needed -->
            </ul>
          </div>
        </div>
      </nav>

      <!-- Header -->
      <header class="jumbotron text-center">
        <h1>Welcome to Your App</h1>
        <!-- You can add more content to the header as needed -->
      </header>
    </template>

    <!-- Router View -->
    <router-view></router-view>
    <!-- This is where the components for each route will be rendered -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "./stores/auth";

export default defineComponent({
  name: "App",
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
./stores/auth./stores/auth