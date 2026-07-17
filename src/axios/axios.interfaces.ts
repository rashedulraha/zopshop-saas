export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  token: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
  };
  token: string;
  refreshToken: string;
}
