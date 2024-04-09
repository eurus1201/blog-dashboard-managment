import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import withAuth from "./withAuth";

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
    const username = response.data.user.username;
    useAuthStore().setToken(token);
    useAuthStore().setUserName(username);
    return token;
  } catch (error) {
    console.error("Registration failed:", error.response.data);
    toast(error, {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
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
    const username = response.data.user.username;
    useAuthStore().setToken(token);
    useAuthStore().setUserName(username);
    return token;
  } catch (error) {
    toast('errorLogin failed: Token not provided', {
      theme: "auto",
      type: "error",
      dangerouslyHTMLString: true,
    });
    console.error("Login failed :", error);
    return null;
  }
};

export const currentUser = async () => {
  try {
    const response = await withAuth("get", `${BASE_URL}/user`);
    return response.user;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};