export type UserRole = "owner" | "admin" | "developer" | "viewer";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}
