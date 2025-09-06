"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Patient } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mock API: Create or update patient
const mockUpsertPatient = async (
  patient: Omit<Patient, "id"> & { id?: string }
) => {
  return new Promise<Patient>((resolve) => {
    setTimeout(() => {
      resolve({
        ...patient,
        id: patient.id || uuidv4(),
      } as Patient);
    }, 500);
  });
};

export function useUpsertPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockUpsertPatient,
    onSuccess: (newPatient) => {
      queryClient.setQueryData<Patient[]>(["patients"], (old = []) => {
        if (newPatient.id && old.some((p) => p.id === newPatient.id)) {
          // Update existing patient
          return old.map((p) => (p.id === newPatient.id ? newPatient : p));
        }
        // Add new patient
        return [...old, newPatient];
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
