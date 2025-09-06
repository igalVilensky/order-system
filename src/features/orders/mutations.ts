"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderStatus, Product, Patient } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mock API: In a real app, this would be an HTTP request
const mockCreateOrder = async (
  order: Omit<Order, "id" | "createdAt" | "status">
) => {
  return new Promise<Order>((resolve) => {
    setTimeout(() => {
      resolve({
        ...order,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        status: "pending" as OrderStatus,
      });
    }, 500);
  });
};

// Mock API: Update product stock
const mockUpdateStock = async (productId: string, quantityDeducted: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

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
      // Fetch current data from cache
      const products = queryClient.getQueryData<Product[]>(["products"]) || [];
      const patients = queryClient.getQueryData<Patient[]>(["patients"]) || [];

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
      const orders = queryClient.getQueryData<Order[]>(["orders"]) || [];
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
      const newOrder = await mockCreateOrder({
        patientId,
        productId,
        quantityGrams,
        notes,
      });

      // Update stock
      await mockUpdateStock(productId, quantityGrams);

      return newOrder;
    },
    onSuccess: (newOrder) => {
      // Update orders cache
      queryClient.setQueryData<Order[]>(["orders"], (old = []) => [
        ...old,
        newOrder,
      ]);

      // Update product stock cache
      queryClient.setQueryData<Product[]>(["products"], (old = []) =>
        old.map((p) =>
          p.id === newOrder.productId
            ? { ...p, stockGrams: p.stockGrams - newOrder.quantityGrams }
            : p
        )
      );
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}

// Existing mutation for updating order status (assumed)
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
      // Mock API: Update order status
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
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
