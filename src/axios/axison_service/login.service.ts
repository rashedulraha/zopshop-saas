import { api } from "@/lib/axios";

import { LoginPayload } from "../axios.interfaces";

export const login = async (userData: LoginPayload) => {
  try {
    const { data } = await api.post("/api/auth/sign-in/email", userData);
    //   console.log(data);
    return data;
  } catch (error: any) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    throw error;
  }
};
