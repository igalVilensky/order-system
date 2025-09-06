"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { usePatients } from "@/features/patients/queries";
import { useUpsertPatient } from "@/features/patients/mutations";
import { Patient } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const patientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  medicalId: z.string().min(1, "Medical ID is required"),
  prescriptionLimitGrams: z
    .number()
    .positive("Prescription limit must be positive"),
});

type PatientForm = z.infer<typeof patientSchema>;

export default function PatientsPage() {
  const { role } = useAuth();
  const router = useRouter();
  const { data: patients = [], isLoading } = usePatients();
  const { mutate: upsertPatient } = useUpsertPatient();
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      prescriptionLimitGrams: 0,
    },
  });

  useEffect(() => {
    if (!role) {
      router.push("/");
    } else if (role !== "admin") {
      router.push("/dashboard");
    }
  }, [role, router]);

  const onSubmit = (data: PatientForm) => {
    upsertPatient(data, {
      onSuccess: () => {
        reset();
        setEditingPatient(null);
      },
    });
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    reset(patient);
  };

  if (!role || role !== "admin") return null;

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {editingPatient ? "Edit Patient" : "Add Patient"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("id")} />
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="medicalId">Medical ID</Label>
              <Input id="medicalId" {...register("medicalId")} />
              {errors.medicalId && (
                <p className="text-red-500 text-sm">
                  {errors.medicalId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="prescriptionLimitGrams">
                Prescription Limit (grams/month)
              </Label>
              <Input
                id="prescriptionLimitGrams"
                type="number"
                {...register("prescriptionLimitGrams", { valueAsNumber: true })}
              />
              {errors.prescriptionLimitGrams && (
                <p className="text-red-500 text-sm">
                  {errors.prescriptionLimitGrams.message}
                </p>
              )}
            </div>
            <Button type="submit">
              {editingPatient ? "Update" : "Add"} Patient
            </Button>
            {editingPatient && (
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  setEditingPatient(null);
                }}
              >
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Medical ID</TableHead>
                <TableHead>Prescription Limit (g)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.medicalId}</TableCell>
                  <TableCell>{patient.prescriptionLimitGrams}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(patient)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
