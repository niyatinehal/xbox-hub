// 'use client';
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 👈 import this

export const metadata: Metadata = {
  title: "GameHub",
  description: "Discover, favorite, and get AI recommendations for games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f1a17] text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main> {/* page content */}
        <Footer /> {/* persistent footer */}
      </body>
    </html>
  );
}
