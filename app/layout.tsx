import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Manrope } from "next/font/google";
import { ToastProvider } from "@/components/ToastContext";
import PopularItemsModal from "@/components/PopularItemsModal";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import Script from "next/script";
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
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Script id="google-translate-config" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr,bn,te,ta,gu,kn,ml,pa,ur,or,as,mai,gom,ne,sd,doi,mni,brx,sa',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script
          id="google-translate-loader"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <div id="google_translate_element" style={{ display: 'none' }} />
        <ToastProvider>
          <MaintenanceGuard />
          {children}
          <PopularItemsModal />
        </ToastProvider>
      </body>
    </html>
  );
}
