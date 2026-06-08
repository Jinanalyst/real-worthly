import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Worthly type system (from the design tokens).
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jb-mono",
});

export const metadata: Metadata = {
  title: "Worthly — Build your money habits. Earn your Worth.",
  description:
    "Worthly helps you understand your spending emotions, complete financial missions, and earn points for building better money habits. An educational habit app — testnet rewards have no monetary value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerif.variable} ${dmSans.variable} ${jbMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
