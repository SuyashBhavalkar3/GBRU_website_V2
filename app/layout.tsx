import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Manrope } from "next/font/google";
import { ToastProvider } from "@/components/ToastContext";
import PopularItemsModal from "@/components/PopularItemsModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "GBRU Shoption",
  description: "GBRU Industrial-Grade Machinery & Smart Agricultural Solutions",
  icons: {
    icon: "/assets/gbru_green.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ zoom: "1.1" }}>
        <ToastProvider>
          {children}
          <PopularItemsModal />
        </ToastProvider>
      </body>
    </html>
  );
}
