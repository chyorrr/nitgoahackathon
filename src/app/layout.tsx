import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingHelp from "@/components/FloatingHelp";
import { LocationProvider } from "@/contexts/LocationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityVoice - Local Issue Reporting & Impact Tracking",
  description: "Report civic issues with photos and GPS location. Track resolution progress in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <LocationProvider>
          <div className="relative z-10">
            <Navbar />
            <FloatingHelp />
            {children}
          </div>
        </LocationProvider>
      </body>
    </html>
  );
}
