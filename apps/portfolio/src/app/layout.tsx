"use client";

import "@/styles/globals.css";
// todo: fix overriding styles
// include styles from the ui package
import "ui/styles.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Antonio, Inter } from "next/font/google";

import Layout from "@/components/Layout";
import { trpc } from "@/utils/trpc";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${antonio.variable} dark`}>
      <body>
        <Layout>{children}</Layout>
      </body>

      <Analytics />
      <SpeedInsights />
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
