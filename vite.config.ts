import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts", // Adjusted for test/ outside src/
    include: ["test/**/*.test.{ts,tsx}"], // Include tests from test/ folder
    exclude: [...configDefaults.exclude, "dist", "node_modules"],
  },
});
