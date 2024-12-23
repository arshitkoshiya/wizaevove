import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   outDir: "build", // Customize the output directory
  // },
  server: {
    host: "10.37.55.111", // Bind to all network interfaces
    port: 5173, // Default Vite port (you can change this if needed)
    strictPort: false, // If you want Vite to throw an error if port is already in use
  },
});
