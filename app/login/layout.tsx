import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login | GBRU Partner Portal",
  description: "Log in to access your GBRU product information, warranty details, and ambassador rewards.",
};

export default async function StandaloneLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F3F4F6]">
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
