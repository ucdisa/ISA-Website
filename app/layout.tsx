import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import { Footer } from "@/components/general/Footer";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISA at UC Davis",
  description: "Indian Student Association at UC Davis",
  icons: {
    icon: [
      { url: "/assets/isa-logo.png", type: "image/png" },
    ],
    apple: "/assets/isa-logo.png",
    shortcut: "/assets/isa-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/assets/isa-logo.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/isa-logo.png?v=2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <MantineProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Notifications />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        
        </MantineProvider>
      </body>
    </html>
  );
}
