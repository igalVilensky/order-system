import { useState } from "react";
import { Role } from "@/types";

export function useAuth() {
  const [role, setRole] = useState<Role | null>(null);

  const login = (username: string, password: string) => {
    // Mock
    if (username === "staff" && password === "pass") {
      setRole("staff");
      return true;
    }
    if (username === "admin" && password === "pass") {
      setRole("admin");
      return true;
    }
    return false;
  };

  const logout = () => setRole(null);

  return { role, login, logout };
}

// Use in context or directly
