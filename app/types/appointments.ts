import { User } from "./auth";
import { Patient } from "./patient";
export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointments {
  patient: Patient;
  doctor: User;
  date: Date;
  status: AppointmentStatus;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}
