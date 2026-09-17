import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // tsconfig의 paths("@/*")와 동일하게 맞춘다
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    include: ["**/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
