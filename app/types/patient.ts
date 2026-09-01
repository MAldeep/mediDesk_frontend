import { AppointmentStatus } from "./appointments";
export interface IScan {
  url: string;
  publicId: string;
}
export interface Patient {
  id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  gender: "male" | "female";
  history?: string;
  appointments: AppointmentStatus[];
  scan?: IScan[];
}
