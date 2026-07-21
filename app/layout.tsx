import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GORU Agri-Product Knowledge & Support Hub",
  description: "Precision farming equipment discovery, support, warranty registration, and contact services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${inter.variable} h-full antialiased font-sans`}>
      <body className={`${roboto.className} min-h-full flex flex-col font-sans`}>{children}</body>
    </html>
  );
}
