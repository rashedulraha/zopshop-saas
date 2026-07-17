interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  token: string;
  refreshToken: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  token: string;
  refreshToken: string;
}
