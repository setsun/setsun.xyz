import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";

import { Antonio, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Layout from '../components/Layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const antonio = Antonio({
  subsets: ['latin'],
  variable: '--font-antonio',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${antonio.variable}`}>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>

      <Analytics />
    </html>
  );
}
