import { api } from "@/lib/axios";

export const useSession = async () => {
  try {
    //   console.log(userData);
    const { data } = await api.get("/api/me");
    //   console.log(data);
    return data;
  } catch (error: any) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    throw error;
  }
};
