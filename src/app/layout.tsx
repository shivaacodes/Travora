import type { Metadata } from "next";
import {
  Inter,
  Urbanist,
  Montserrat_Alternates,
  Poppins,
} from "next/font/google";
import "./globals.css";

//Font 1
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

//Font 2
const poppinsFont = Poppins({
  weight: ["400", "900", "700", "500"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-poppins",
});

//Font 3
const montserratFont = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-montserrat",
});

//Font 4
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = `${urbanistFont.variable} ${inter.variable} ${montserratFont.variable} ${poppinsFont.variable}`;
  return (
    <html lang="en" className={fontVariables}>
      <body className="antialiased ">{children}</body>
    </html>
  );
}
