import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/nav/navbar";
import SessionProvider from "@/components/ui/sessionprovider";
import React from "react";
import { Toaster } from "../components/ui/toaster"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto lg:py-10 space-y-10 p-5 lg:p-0">
            <Navbar />
            {children}
          </main>
          <Toaster /> {/* Add Toaster component here */}
        </ThemeProvider>
        <SessionProvider />
      </body>
    </html>
  );
}
