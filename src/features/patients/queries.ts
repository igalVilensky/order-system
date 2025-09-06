import { useQuery } from "@tanstack/react-query";
import { Patient } from "@/types";

// Mock API: Fetch patients
const mockFetchPatients = async () => {
  return new Promise<Patient[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "patient1",
          name: "John Doe",
          medicalId: "MED123",
          prescriptionLimitGrams: 30,
        },
        {
          id: "patient2",
          name: "Jane Smith",
          medicalId: "MED456",
          prescriptionLimitGrams: 50,
        },
      ]);
    }, 500);
  });
};

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: mockFetchPatients,
  });
}
