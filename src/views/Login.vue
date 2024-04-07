<template>
  <div class="md-container">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 pr-0">
        <div class="card" style="border-radius: 4px; min-width: 450px">
          <div
            class="card-body"
            style="padding: 37px 20px 19px; background-color: #eceeef"
          >
            <h1 class="text-center warm-gray">LOGIN</h1>
            <form @submit.prevent="login">
              <div class="mb-4">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>
              <div class="row">
                <div class="col">
                  <button
                    :disabled="loading"
                    type="submit"
                    class="btn btn-primary btn-block mt-4"
                  >
                    <span v-if="loading">Logging in...</span>
                    <span v-else>Login</span>
                  </button>
                </div>
              </div>
            </form>
            <div class="mt-3 text-start">
              <p>
                Don’t have an account?
                <router-link to="/register" class="font-weight-bold text-dark">Register Now</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import router from "../router/index";
import { loginUser } from "../services/authService";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    const login = async () => {
      try {
        loading.value = true; 
        const token = await loginUser(email.value, password.value);
        if (token) {
          authStore.login();
          authStore.setToken(token);
          router.push("/allPosts");
        } else {
          console.error("Login failed: Token not provided");
        }
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        loading.value = false; 
      }
    };

    return {
      email,
      password,
      login,
      loading,
    };
  },
});
</script>

<style>
.warm-gray {
  color: #707070;
  font-size: 47px;
  margin-top: 35px;
  margin-bottom: 49px;
}

@media (max-width: 576px) {
  .card {
    width: 100vw;
    border-radius: 0;
  }
}
</style>
