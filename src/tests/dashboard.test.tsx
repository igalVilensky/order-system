// src/tests/dashboard.test.tsx
import { renderHook } from "@testing-library/react";
import { useMemo } from "react";
import { describe, it, expect } from "vitest";
import { Order } from "@/types";

const mockOrders: Order[] = [
  {
    id: "1",
    createdAt: "2025-09-01T10:00:00Z",
    patientId: "p1",
    productId: "prod1",
    quantityGrams: 5,
    status: "pending",
  },
  {
    id: "2",
    createdAt: "2025-09-01T12:00:00Z",
    patientId: "p2",
    productId: "prod2",
    quantityGrams: 10,
    status: "approved",
  },
  {
    id: "3",
    createdAt: "2025-09-02T10:00:00Z",
    patientId: "p3",
    productId: "prod1",
    quantityGrams: 7,
    status: "dispensed",
  },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toISOString().split("T")[0];

const useOrdersPerDay = (orders: Order[]) => {
  return useMemo(() => {
    const ordersByDate = orders.reduce((acc, order) => {
      const date = formatDate(order.createdAt);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(ordersByDate).map(([date, count]) => ({
      date,
      orders: count,
    }));
  }, [orders]);
};

describe("Dashboard ordersPerDay", () => {
  it("groups orders by date correctly", () => {
    const { result } = renderHook(() => useOrdersPerDay(mockOrders));
    expect(result.current).toEqual([
      { date: "2025-09-01", orders: 2 },
      { date: "2025-09-02", orders: 1 },
    ]);
  });
});
