import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = "https://api.realworld.io/api";

export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      user: {
        email,
        password,
        username,
      },
    });
    const token = response.data.user.token;
    useAuthStore().setToken(token);
    return token;
  } catch (error) {
    console.error("Registration failed:", error.response.data);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user: {
        email,
        password,
      },
    });
    const token = response.data.user.token;
    useAuthStore().setToken(token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    return null;
  }
};
