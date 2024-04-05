import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AllPosts from "@/views/AllPosts.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import PublicLayout from "@/components/layout/PublicLayout.vue";
import NewPost from "@/views/NewPost.vue";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "/",
        // name: "Login",
        component: Login,
      },
      {
        path: "/register",
        // name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/app",
    component: AuthenticatedLayout,
    children: [
      {
        path: "/allPosts",
        component: AllPosts,
      },
      {
        path: "/newPost",
        component: NewPost,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
