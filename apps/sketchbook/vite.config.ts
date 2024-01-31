import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { glslify } from "vite-plugin-glslify";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    glslify(),
    await federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: "dist",
        tsConfig: "tsconfig.json",
        federationConfig: "module-federation.config.cjs",
        verbose: false,
        dev: command === "serve",
      },
      adapter: createEsBuildAdapter({ plugins: [] }),
    }),
  ],
}));
