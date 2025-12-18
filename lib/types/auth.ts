export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  googleId?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

