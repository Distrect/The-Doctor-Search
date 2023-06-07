import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssModules from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[hash:base64:2]",
    },
  },
});
