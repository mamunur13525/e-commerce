import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { CartAnimationProvider } from "@/components/context/cart-animation-context";
import { CartAnimationLayer } from "@/components/layout/cart-animation-layer";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garden Shop",
  description: "E-Commerce web application for garden shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartAnimationProvider>
          <CartAnimationLayer />
          <Navbar />

          {children}
          <Footer />
          <Toaster
            duration={5000}
          />
        </CartAnimationProvider>
      </body>
    </html>
  );
}
