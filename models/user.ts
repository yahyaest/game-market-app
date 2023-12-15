export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  name: string;
  phone?: number;
  role: "USER" | "ADMIN";
  avatarUrl?: string;
  authProvider?: "GOOGLE" | "FACEBOOK" | "GITHUB";
}
