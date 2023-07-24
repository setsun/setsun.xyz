import "@/styles/globals.css";
// todo: fix overriding styles
// include styles from the ui package
import "veda-ui/styles.css";

import { Analytics } from "@vercel/analytics/react";
import { Antonio, Inter } from "next/font/google";

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
  return (
    <html lang="en" className={`${inter.variable} ${antonio.variable} dark`}>
      <body>
        <Layout>{children}</Layout>
      </body>

      <Analytics />
    </html>
  );
}
