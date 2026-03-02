import path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@/styled-system": path.resolve(__dirname, "./styled-system"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [TanStackRouterVite(), react()],
})
