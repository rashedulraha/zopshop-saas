import { api } from "@/lib/axios";
import { RegisterPayload } from "../axios.interfaces";

export const register = async (userData: RegisterPayload) => {
  try {
    //   console.log(userData);
    const { data } = await api.post("/api/auth/sign-up/email", userData);
    //   console.log(data);
    return data;
  } catch (error: any) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    throw error;
  }
};
