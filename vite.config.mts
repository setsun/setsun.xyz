import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { dependencies } from "./package.json";

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      target: "cloudflare-module",
      prerender: {
        // Enable prerendering
        enabled: true,

        // Enable if you need pages to be at `/page/index.html` instead of `/page.html`
        autoSubfolderIndex: true,

        // Whether to extract links from the HTML and prerender them also
        crawlLinks: true,

        // Number of times to retry a failed prerender job
        retryCount: 2,

        // Delay between retries in milliseconds
        retryDelay: 1000,

        // Callback when page is successfully rendered
        onSuccess: ({ page }) => {
          console.log(`Rendered ${page.path}!`);
        },
      },
      customViteReactPlugin: true,
    }),
    federation({
      name: "setsun-xyz-mf-host",
      filename: "remoteEntry.js",
      remotes: {
        sketchbook: {
          name: "sketchbook",
          entryGlobalName: "sketchbook",
          type: "module",
          shareScope: "default",
          entry: "https://sketchbook.setsun.xyz/remoteEntry.js",
        },
      },
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    viteReact(),
  ],
});

export default config;
