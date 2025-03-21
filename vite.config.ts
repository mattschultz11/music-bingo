import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  base: "/music-bingo/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    include: ["test/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude, "dist", "node_modules"],
  },
});
