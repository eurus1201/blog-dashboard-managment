import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const withAuth = async (method, path, body = null) => {
  try {
    const authStore = useAuthStore();

    const token = authStore.token;

    if (!token) {
      router.push("/");
      throw new Error("No token available");
    }
    const headers = {
      Authorization: `Token ${token}`,
    };

    let response;

    switch (method.toLowerCase()) {
      case "get":
        response = await axios.get(path, { headers });
        break;
      case "post":
        response = await axios.post(path, body, { headers });
        break;
      case "put":
        response = await axios.put(path, body, { headers });
        break;
      case "delete":
        response = await axios.delete(path, { headers });
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    return response.data;
  } catch (error) {
    console.error("Error with authenticated request:", error);
    throw error;
  }
};

export default withAuth;
