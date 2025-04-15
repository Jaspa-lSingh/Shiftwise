import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,  // Fixed port for Render
      host: "0.0.0.0", // Ensure it binds to all interfaces
    },
    preview: {
      allowedHosts: ['www.theshiftwise.com'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            axios: ["axios"],
            router: ["react-router-dom"],
          },
        },
      },
    },
    define: {
      "process.env": env, // Ensure the correct .env is loaded
    },
  };
});
