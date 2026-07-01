export interface Address {
  _id?: string;
  full_name: string;
  phone: string;
  building: string;
  colony: string;
  region: string;
  city: string;
  area: string;
  address: string;
  label: string;
  isDefault: boolean;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  googleId?: string;
  phone?: string;
  addresses?: Address[];
  isPasswordLogin?: boolean
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
  otp?: string;
}