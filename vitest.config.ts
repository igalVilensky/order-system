// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Required for React component testing
    setupFiles: ["./setupTests.ts"], // Optional: for Jest-DOM extensions
    globals: true, // Enables Vitest globals (describe, it, expect) without imports
    css: false, // Disable CSS processing if not needed
    coverage: {
      provider: "v8", // Use V8 for coverage
      reporter: ["text", "json", "html"], // Coverage report formats
    },
  },
});
