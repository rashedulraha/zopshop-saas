import { api } from "@/lib/axios";
export const logout = async () => {
  try {
    await api.post("/api/signout");
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  } catch (error: any) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    throw error;
  }
};
