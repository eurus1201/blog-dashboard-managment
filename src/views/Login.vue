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
            <form @submit.prevent="handleSubmit">
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
                    @click="login"
                    type="submit"
                    class="btn btn-primary btn-block mt-4"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div class="mt-3 text-start">
              <p>
                Don’t have account?
                <span class="font-weight-bold">Register Now</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/auth";
import  router  from "../router/index";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const login = () => {
      //  login logic here
      authStore.login();
      router.push("/allPosts");
    };

    return {
      login,
    };
  },
});
</script>
