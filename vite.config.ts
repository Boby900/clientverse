/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals:true,
    setupFiles: './vitest.setup.ts',
    environment: 'jsdom',
  },
  plugins: [react()],
 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

