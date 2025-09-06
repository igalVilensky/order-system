import { useQuery } from "@tanstack/react-query";
import { Order, Product } from "@/types";
import { getFromLocalStorage } from "@/lib/localStorage";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getFromLocalStorage<Order>("orders"),
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getFromLocalStorage<Product>("products"),
  });
}
