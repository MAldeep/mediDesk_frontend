import { Permission, Role } from "./rbac";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions?: Permission[];
}

export interface AuthResponse {
  status: "success" | "fail";
  message: string;
  data: {
    user: User;
  };
  accessToken: string;
}
export interface LogoutResponse {
  status: "success" | "fail";
  message: string;
}
