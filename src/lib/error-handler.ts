import { toast } from "sonner";
import { isAxiosError } from "axios";

export const handleApiError = (error: unknown, fallbackMessage = "An unexpected error occurred.") => {
  console.error("[API Error]", error);
  
  if (isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || fallbackMessage;
    toast.error(message);
    return message;
  }
  
  if (error instanceof Error) {
    toast.error(error.message || fallbackMessage);
    return error.message;
  }
  
  toast.error(fallbackMessage);
  return fallbackMessage;
};
