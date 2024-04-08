import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(createPinia());
createApp(App).use(router).mount("#app");
