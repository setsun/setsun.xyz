import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import glslify from "vite-plugin-glslify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glslify(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    global: "window",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ui",
    },
    // todo: determine if we need to do anything else here for externals
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "leva",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
      ],
    },
  },
});
