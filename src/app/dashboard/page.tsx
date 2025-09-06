"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useOrders } from "@/features/orders/queries";
import { useProducts } from "@/features/products/queries";
import { Order, Product } from "@/types";

// Helper to format date to "YYYY-MM-DD"
const formatDate = (dateString: string) => {
  return new Date(dateString).toISOString().split("T")[0];
};

export default function Dashboard() {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.push("/");
    }
  }, [role, router]);

  const { data: orders = [] } = useOrders();
  const { data: products = [] } = useProducts();

  // Compute orders per day for LineChart
  const ordersPerDay = useMemo(() => {
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

  // Compute top products by sales (quantity * price) for BarChart
  const topProducts = useMemo(() => {
    const salesByProduct = orders.reduce((acc, order) => {
      const product = products.find((p) => p.id === order.productId);
      if (!product) return acc;
      const sales = order.quantityGrams * product.pricePerGram;
      acc[order.productId] = {
        name: product.name,
        sales: (acc[order.productId]?.sales || 0) + sales,
      };
      return acc;
    }, {} as Record<string, { name: string; sales: number }>);

    return Object.values(salesByProduct)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [orders, products]);

  // Compute KPIs
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    const product = products.find((p) => p.id === order.productId);
    return sum + (product ? order.quantityGrams * product.pricePerGram : 0);
  }, 0);
  const avgOrderSize =
    totalOrders > 0
      ? orders.reduce((sum, order) => sum + order.quantityGrams, 0) /
        totalOrders
      : 0;

  if (!role) return null; // Prevent flash of content before redirect

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p>€{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold">Avg Order Size</h3>
          <p>{avgOrderSize.toFixed(2)}g</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Orders Per Day</h3>
          <LineChart width={500} height={300} data={ordersPerDay}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Products by Sales</h3>
          <BarChart width={500} height={300} data={topProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
