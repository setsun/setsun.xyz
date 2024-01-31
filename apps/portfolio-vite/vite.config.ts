import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import { reactReplacements } from "@softarc/native-federation-esbuild/src/lib/react-replacements";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => ({
  plugins: [
    await federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: "dist",
        tsConfig: "tsconfig.json",
        federationConfig: "module-federation.config.cjs",
        verbose: false,
        dev: command === "serve",
      },
      adapter: createEsBuildAdapter({
        plugins: [],
        fileReplacements: reactReplacements.dev,
      }),
    }),
    react(),
  ],
}));
