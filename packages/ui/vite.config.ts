import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glslify from "vite-plugin-glslify";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ui",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
      ],
      output: {
        globals: {
          react: "react",
          "react-dom": "react-dom",
          three: "three",
          "@react-three/fiber": "@react-three/fiber",
          "@react-three/drei": "@react-three/drei",
        },
      },
    },
  },
  define: {
    global: "window",
  },
});
