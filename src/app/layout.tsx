import type { Metadata } from "next";
import "./globals.css";
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Affiliate Hygiene Dashboard",
  description: "Daily reports of core sites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/default.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
