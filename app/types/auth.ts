import { AppointmentPermissions, Role } from "./rbac";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions?: AppointmentPermissions[];
}

export interface AuthResponse {
  status: "success" | "fail";
  message: string;
  data: {
    user: User;
  };
  accessToken: string;
}
