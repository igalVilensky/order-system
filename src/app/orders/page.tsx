"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useOrders, usePatients, useProducts } from "@/features/orders/queries";
import { useCreateOrder } from "@/features/orders/mutations";
import { OrderTable } from "@/components/OrderTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const orderSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  productId: z.string().min(1, "Product is required"),
  quantityGrams: z.number().positive("Quantity must be positive"),
  notes: z.string().optional(),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function OrdersPage() {
  const { role } = useAuth();
  const router = useRouter();
  const { data: orders = [], isLoading: ordersLoading } = useOrders();
  const { data: patients = [], isLoading: patientsLoading } = usePatients();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { mutate: createOrder } = useCreateOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantityGrams: 0,
    },
  });

  useEffect(() => {
    if (!role) {
      router.push("/");
    }
  }, [role, router]);

  const onSubmit = (data: OrderForm) => {
    createOrder(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (!role) return null;

  if (ordersLoading || patientsLoading || productsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="patientId">Patient</Label>
              <Select {...register("patientId")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.patientId && (
                <p className="text-red-500 text-sm">
                  {errors.patientId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="productId">Product</Label>
              <Select {...register("productId")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stockGrams}g)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.productId && (
                <p className="text-red-500 text-sm">
                  {errors.productId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="quantityGrams">Quantity (grams)</Label>
              <Input
                id="quantityGrams"
                type="number"
                {...register("quantityGrams", { valueAsNumber: true })}
              />
              {errors.quantityGrams && (
                <p className="text-red-500 text-sm">
                  {errors.quantityGrams.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" {...register("notes")} />
              {errors.notes && (
                <p className="text-red-500 text-sm">{errors.notes.message}</p>
              )}
            </div>
            <Button type="submit">Create Order</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable orders={orders} patients={patients} products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
