"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!role) return null; // Hide navigation on login page (unauthenticated)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/orders" className="hover:underline">
            Orders
          </Link>
          {role === "admin" && (
            <Link href="/patients" className="hover:underline">
              Patients
            </Link>
          )}
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-white border-white hover:bg-gray-700"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
