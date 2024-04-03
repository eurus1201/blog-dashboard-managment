import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      //  login logic here
      this.isLoggedIn = true;
    },
    logout() {
      //  logout logic here
      this.isLoggedIn = false;
    },
  },
});
