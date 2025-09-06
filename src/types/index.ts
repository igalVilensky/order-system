export type OrderStatus = "pending" | "approved" | "dispensed";

export interface Product {
  id: string;
  name: string;
  thcPercent: number;
  cbdPercent: number;
  stockGrams: number;
  pricePerGram: number;
}

export interface Patient {
  id: string;
  name: string;
  medicalId: string;
  prescriptionLimitGrams: number; // max per month
}

export interface Order {
  id: string;
  patientId: string;
  productId: string;
  quantityGrams: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export type Role = "staff" | "admin";
