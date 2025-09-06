"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Patient } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/localStorage";

export function useUpsertPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patient: Omit<Patient, "id"> & { id?: string }) => {
      const patients = getFromLocalStorage<Patient>("patients");
      const newPatient: Patient = {
        ...patient,
        id: patient.id || uuidv4(),
      } as Patient;

      if (patient.id) {
        // Update existing patient
        const updatedPatients = patients.map((p) =>
          p.id === patient.id ? newPatient : p
        );
        setToLocalStorage("patients", updatedPatients);
      } else {
        // Add new patient
        setToLocalStorage("patients", [...patients, newPatient]);
      }

      return newPatient;
    },
    onSuccess: (newPatient) => {
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) => {
        if (newPatient.id && old.some((p) => p.id === newPatient.id)) {
          return old.map((p) => (p.id === newPatient.id ? newPatient : p));
        }
        return [...old, newPatient];
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
