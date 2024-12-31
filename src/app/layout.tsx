import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";

// Configure fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const urbanistFont = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

// Metadata for the document
export const metadata: Metadata = {
  title: "Travora",
  description:
    "Discover, exchange, and sell travel deals effortlessly with Travora.",
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanistFont.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
