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
export interface InviteResponse {
  status: "success" | "fail";
  message: string;
  data: {
    user: User;
  };
}
export interface InviteUser {
  name: string;
  email: string;
  role: "doctor" | "staff";
  adminName: string | undefined;
}
