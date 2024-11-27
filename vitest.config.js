import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    port: 3001,
  },
  test: {
    include: ["__tests__/**/*.test.{js,jsx}"],
    environment: "happy-dom",
  },

  plugins: [react()],
});
