import { api } from "../lib/axiosClient";
import { GetPatientsParams, Patient } from "../types/patient";
import {
  CreatePatientData,
  UpdatePatientData,
} from "../validations/patientValidation";

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
    const response = await api.get(`/patients/${id}`);
    return response.data.data.patient;
  },
  update: async (
    id: string,
    updateData: UpdatePatientData,
  ): Promise<Patient> => {
    const response = await api.patch(`/patients/${id}`, updateData);
    return response.data.data.patient;
  },
  uploadScan: async (id: string, file: File): Promise<Patient> => {
    const formData = new FormData();
    formData.append("scan", file);
    const response = await api.post(`/patients/${id}/scan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.patient;
  },
  deleteScan: async (id: string, publicId: string): Promise<Patient> => {
    const response = await api.delete(`/patients/${id}/scan`, {
      data: { publicId },
    });
    return response.data.data.patient;
  },
  deletePatient: async (id: string): Promise<Patient> => {
    const response = await api.delete(`/patients/${id}`);

    return response.data.data.patient;
  },
};
