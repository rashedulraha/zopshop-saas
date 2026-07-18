import { register } from "./axison_service/register.service";
import { login } from "./axison_service/login.service";
import { useSession } from "./axison_service/useSession.service";
import { logout } from "./axison_service/logout.service";

export const axiosServics = {
  register,
  login,
  useSession,
  logout,
};
