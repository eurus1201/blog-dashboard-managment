import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = "https://api.realworld.io/api";

export async function registerUser(email, password, username) {
  try {
    const response = await axios.post(`${BASE_URL}/users`, {
      user: {
        email: email,
        password: password,
        username: username,
      },
    });
    return response.data.user.token;
  } catch (error) {
    console.error("Registration failed:", error.response.data);
    return null;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user: {
        email: email,
        password: password,
      },
    });
    const token = response.data.user.token;
    useAuthStore().setToken(token);
    return token;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    return null;
  }
}
