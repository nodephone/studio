import { User } from "./user";

export interface Session {
  token: string;
  user: User;
  expiresAt: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
