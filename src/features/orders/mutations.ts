"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus, Product, Patient } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { getFromLocalStorage, setToLocalStorage } from "@/lib/localStorage";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      patientId,
      productId,
      quantityGrams,
      notes,
    }: {
      patientId: string;
      productId: string;
      quantityGrams: number;
      notes?: string;
    }) => {
      const products = getFromLocalStorage<Product>("products");
      const patients = getFromLocalStorage<Patient>("patients");
      const orders = getFromLocalStorage<Order>("orders");

      // Validate stock
      const product = products.find((p) => p.id === productId);
      if (!product || product.stockGrams < quantityGrams) {
        throw new Error("Insufficient stock");
      }

      // Validate monthly prescription limit
      const patient = patients.find((p) => p.id === patientId);
      if (!patient) {
        throw new Error("Patient not found");
      }
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      const patientOrdersThisMonth = orders.filter(
        (o) => o.patientId === patientId && o.createdAt.startsWith(currentMonth)
      );
      const totalGramsThisMonth = patientOrdersThisMonth.reduce(
        (sum, o) => sum + o.quantityGrams,
        0
      );
      if (
        totalGramsThisMonth + quantityGrams >
        patient.prescriptionLimitGrams
      ) {
        throw new Error("Exceeds monthly prescription limit");
      }

      // Create order
      const newOrder: Order = {
        id: uuidv4(),
        patientId,
        productId,
        quantityGrams,
        notes,
        status: "pending" as OrderStatus,
        createdAt: new Date().toISOString(),
      };

      // Update local storage
      setToLocalStorage("orders", [...orders, newOrder]);
      setToLocalStorage(
        "products",
        products.map((p) =>
          p.id === productId
            ? { ...p, stockGrams: p.stockGrams - quantityGrams }
            : p
        )
      );

      return newOrder;
    },
    onSuccess: (newOrder) => {
      queryClient.setQueryData<Order[]>(["orders"], (old = []) => [
        ...old,
        newOrder,
      ]);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => {
      const orders = getFromLocalStorage<Order>("orders");
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );
      setToLocalStorage("orders", updatedOrders);
    },
    onSuccess: (_, { orderId, status }) => {
      queryClient.setQueryData<Order[]>(["orders"], (old = []) =>
        old.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    },
  });
}
