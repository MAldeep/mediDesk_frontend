import { User } from "./auth";
import { Patient } from "./patient";
export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointments {
  _id: string;
  patient: Patient;
  doctor: User;
  date: Date;
  status: AppointmentStatus;
  durationMinutes: number;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}
