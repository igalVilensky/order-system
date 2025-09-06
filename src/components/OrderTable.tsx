// src/components/OrderTable.tsx
import { useState } from "react";
import { Order, Patient, Product, OrderStatus } from "@/types";
import { useUpdateOrderStatus } from "@/features/orders/mutations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderTableProps {
  orders: Order[];
  patients: Patient[];
  products: Product[];
}

export function OrderTable({ orders, patients, products }: OrderTableProps) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const filteredOrders = orders
    .filter((order) => statusFilter === "all" || order.status === statusFilter)
    .filter((order) =>
      dateFilter ? order.createdAt.startsWith(dateFilter) : true
    );

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateStatus({ orderId, status });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as OrderStatus | "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="dispensed">Dispensed</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by date"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity (g)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => {
            const patient = patients.find((p) => p.id === order.patientId);
            const product = products.find((p) => p.id === order.productId);
            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{patient?.name || "Unknown"}</TableCell>
                <TableCell>{product?.name || "Unknown"}</TableCell>
                <TableCell>{order.quantityGrams}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  {order.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(order.id, "dispensed")
                        } // reject means moving to dispensed for simplicity
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {order.status === "approved" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(order.id, "dispensed")}
                    >
                      Dispense
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
