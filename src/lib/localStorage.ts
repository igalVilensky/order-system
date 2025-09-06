import { Order, Patient, Product, OrderStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mocked initial data
const initialProducts: Product[] = [
  {
    id: "prod1",
    name: "Blue Dream",
    thcPercent: 20,
    cbdPercent: 2,
    stockGrams: 100,
    pricePerGram: 10,
  },
  {
    id: "prod2",
    name: "OG Kush",
    thcPercent: 25,
    cbdPercent: 1,
    stockGrams: 50,
    pricePerGram: 12,
  },
];

const initialPatients: Patient[] = [
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
];

const initialOrders: Order[] = [
  {
    id: "order1",
    patientId: "patient1",
    productId: "prod1",
    quantityGrams: 5,
    status: "pending" as OrderStatus,
    createdAt: new Date().toISOString(),
    notes: "First order",
  },
];

// Initialize local storage with mocked data if empty
export function initializeLocalStorage() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem("patients")) {
    localStorage.setItem("patients", JSON.stringify(initialPatients));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(initialOrders));
  }
}

// Generic get function
export function getFromLocalStorage<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Generic set function
export function setToLocalStorage<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}
