import { api } from "../lib/axiosClient";
import { Patient } from "../types/patient";
import { CreatePatientData } from "../validations/patientValidation";

export const patientServices = {
  create: async (patientData: CreatePatientData): Promise<Patient> => {
    const response = await api.post("/patients", patientData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/patients");
    return response.data.data.patients;
  },
};
