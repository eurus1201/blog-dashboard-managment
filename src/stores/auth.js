import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    userName: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserName(userName) {
      this.userName = userName;
    },
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
});
