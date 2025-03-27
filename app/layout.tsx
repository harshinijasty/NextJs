import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
// import Footer from "@/components/footer"; 

import { UserProvider } from "@/components/registrationcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Registration",
  description: "Home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

<div className="flex flex-col min-h-screen overflow-hidden">
        
        <UserProvider>
          <Header />
        {/* Page Content */}
        <main className="flex-grow">{children}</main>
            {/* Footer with Map */}
            {/* <Footer /> */}

    </UserProvider>
    </div>
      </body>
    </html>
  );
}
