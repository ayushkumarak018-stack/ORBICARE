import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrbiCare – Elderly Health Companion",
  description:
    "OrbiCare is a compassionate health management platform for elderly care – tracking medications, vitals, meals, appointments and family coordination in one place.",
  keywords: ["elderly care", "health monitoring", "medication tracker", "vitals dashboard"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
