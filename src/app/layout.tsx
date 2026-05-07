import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DHOP — Hand-tossed New York Style Pizza in Fort Myers",
  description:
    "Watch it made. Taste the difference. Hand-tossed New York-style pizza from DHOP, made fresh, no shortcuts. Located in the heart of Downtown Fort Myers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-ink">{children}</body>
    </html>
  );
}
