import { register } from "./axison_service/register.service";
import { login } from "./axison_service/login.service";
import { useSession } from "./axison_service/useSession.service";

export const axiosServics = {
  register,
  login,
  useSession,
};
