import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        testMatch: ['./tests/**/*.test.tsx'],
        globals: true
      },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
