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
  procedure: string;
  notes?: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}
