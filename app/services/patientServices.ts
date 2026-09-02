import { api } from "../lib/axiosClient";
import { GetPatientsParams, Patient } from "../types/patient";
import { CreatePatientData } from "../validations/patientValidation";

export const patientServices = {
  create: async (patientData: CreatePatientData): Promise<Patient> => {
    const response = await api.post("/patients", patientData);
    return response.data;
  },
  getAll: async (params?: GetPatientsParams): Promise<Patient[]> => {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    );
    const response = await api.get("/patients", { params: cleanParams });
    return response.data.data.patients;
  },
  getById: async (id: string): Promise<Patient> => {
    console.log("Sending the request");
    const response = await api.get(`/patients/${id}`);
    return response.data.data.patient;
  },
};
