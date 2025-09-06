"use client";

import { useEffect } from "react";
import { initializeLocalStorage } from "@/lib/localStorage";

export function LocalStorageInitializer() {
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return null;
}
