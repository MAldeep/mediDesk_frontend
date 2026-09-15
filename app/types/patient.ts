import { Appointments } from "./appointments";
export interface IScan {
  url: string;
  publicId: string;
}
export interface Patient {
  _id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  gender: "male" | "female";
  history?: string;
  appointments: Appointments[];
  scan?: IScan[];
}
export interface GetParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
