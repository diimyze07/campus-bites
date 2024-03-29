import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const poppins = Manrope({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lite Bite",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
