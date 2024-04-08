import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AllPosts from "@/views/AllPosts.vue";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout.vue";
import PublicLayout from "@/components/layout/PublicLayout.vue";
import NewPost from "@/views/NewPost.vue";
import EditPost from "@/views/EditPost.vue";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "/",
        component: Login,
      },
      {
        path: "/register",
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
      {
        path: "/articles/edit/:slug",
        component: EditPost,
        props: true 
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
