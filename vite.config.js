import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    // Use happy-dom for a more lightweight browser environment
    environment: "happy-dom",
  },
  plugins: [react()],
});
