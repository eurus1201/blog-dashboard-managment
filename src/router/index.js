import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AllPosts from "@/views/AllPosts.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/allPosts",
    name: "allPosts",
    component: AllPosts,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
