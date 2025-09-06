import { useQuery } from "@tanstack/react-query";
import { Patient } from "@/types";
import { getFromLocalStorage } from "@/lib/localStorage";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: () => getFromLocalStorage<Patient>("patients"),
  });
}
