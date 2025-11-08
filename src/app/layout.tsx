import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingHelp from "@/components/FloatingHelp";
import Aurora from "@/components/Iridescence";

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
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Global Aurora Background */}
        <div className="fixed inset-0 pointer-events-none opacity-15 z-0">
          <Aurora 
            colorStops={['#00C853', '#69F0AE', '#2979FF']}
            amplitude={1.5}
            blend={0.7}
            speed={0.3}
          />
        </div>
        
        <div className="relative z-10">
          <Navbar />
          <FloatingHelp />
          {children}
        </div>
      </body>
    </html>
  );
}
