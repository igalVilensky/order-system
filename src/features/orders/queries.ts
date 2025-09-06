// src/features/orders/queries.ts
import { useQuery } from "@tanstack/react-query";
import { getOrders, getPatients, getProducts } from "@/lib/api";
import { Order, Patient, Product } from "@/types";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export const usePatients = () => {
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
