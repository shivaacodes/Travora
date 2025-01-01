import type { Metadata } from "next";
import {
  Inter,
  Urbanist,
  Montserrat_Alternates,
  Playwrite_AU_SA,
} from "next/font/google";
import "./globals.css";

// Configure fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playwriteFont = Playwrite_AU_SA({
  weight: ["100", "200", "300", "400"],
  display: "optional",
  variable: "--font-playwrite",
});

const montserratFont = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-montserrat",
});

const urbanistFont = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
});

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
    <html
      lang="en"
      className={`${urbanistFont.variable} ${inter.variable} ${montserratFont.variable} ${playwriteFont.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
