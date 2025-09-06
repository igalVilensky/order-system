// src/lib/api.ts
import { Order, OrderStatus, Patient, Product } from "@/types";

// Mock data
const mockOrders: Order[] = [
  {
    id: "1",
    patientId: "p1",
    productId: "prod1",
    quantityGrams: 5,
    status: "pending",
    createdAt: "2025-09-01T10:00:00Z",
    notes: "Urgent",
  },
  {
    id: "2",
    patientId: "p2",
    productId: "prod2",
    quantityGrams: 10,
    status: "approved",
    createdAt: "2025-09-02T12:00:00Z",
  },
  {
    id: "3",
    patientId: "p1",
    productId: "prod1",
    quantityGrams: 7,
    status: "dispensed",
    createdAt: "2025-09-03T15:00:00Z",
  },
];

const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    medicalId: "MED123",
    prescriptionLimitGrams: 30,
  },
  {
    id: "p2",
    name: "Jane Smith",
    medicalId: "MED456",
    prescriptionLimitGrams: 20,
  },
];

const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Blue Dream",
    thcPercent: 20,
    cbdPercent: 5,
    stockGrams: 100,
    pricePerGram: 10,
  },
  {
    id: "prod2",
    name: "OG Kush",
    thcPercent: 25,
    cbdPercent: 2,
    stockGrams: 50,
    pricePerGram: 12,
  },
];

export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockOrders), 500));
};

export const getPatients = async (): Promise<Patient[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockPatients), 500));
};

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 500));
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<Order> => {
  const order = mockOrders.find((o) => o.id === orderId);
  if (!order) throw new Error("Order not found");
  order.status = status;
  return new Promise((resolve) => setTimeout(() => resolve(order), 500));
};
