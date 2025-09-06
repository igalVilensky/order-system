import { Order, Patient, Product, OrderStatus } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Blue Dream",
    thcPercent: 18,
    cbdPercent: 1,
    stockGrams: 500,
    pricePerGram: 10,
  },
  {
    id: "2",
    name: "OG Kush",
    thcPercent: 20,
    cbdPercent: 0.5,
    stockGrams: 300,
    pricePerGram: 12,
  },
  // Add more...
];

export const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    medicalId: "MED123",
    prescriptionLimitGrams: 30,
  },
  {
    id: "2",
    name: "Jane Smith",
    medicalId: "MED456",
    prescriptionLimitGrams: 50,
  },
  // Add more...
];

export const orders: Order[] = [
  {
    id: "1",
    patientId: "1",
    productId: "1",
    quantityGrams: 5,
    status: "pending",
    createdAt: "2025-09-01",
  },
  // Add more...
];
