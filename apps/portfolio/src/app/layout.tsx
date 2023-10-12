"use client";

import "@/styles/globals.css";
// todo: fix overriding styles
// include styles from the ui package
import "veda-ui/styles.css";

import { Analytics } from "@vercel/analytics/react";
import { Antonio, Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // todo: quick and easy, prolly a better way to refactor later
  const searchParams = useSearchParams();
  const backgroundColor = searchParams.get("background")
    ? `#${searchParams.get("background")}`
    : "";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${antonio.variable} dark`}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <body
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Layout>{children}</Layout>
      </body>

      <Analytics />
    </html>
  );
}
