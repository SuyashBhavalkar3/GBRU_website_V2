"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FarmerShowcase from "./FarmerShowcase";
import OtpForm from "./OtpForm";
import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";

function OtpPageContent() {
  const searchParams = useSearchParams();
  const phone = searchParams?.get("phone") || "98765 43210";

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#F3F4F6] relative overflow-x-hidden">
      {/* Split background blocks */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-1/2 md:h-full bg-[#FAF9F5] z-0" />
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-1/2 md:h-full bg-[#F3F4F6] z-0" />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Centered card capsule wrapper */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-[940px] bg-white flex flex-col md:flex-row rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-gray-150/60">
          
          {/* Left Column: Farmer Showcase */}
          <div className="w-full md:w-1/2 h-[340px] sm:h-[400px] md:h-[560px] lg:h-[580px] relative">
            <FarmerShowcase />
          </div>

          {/* Right Column: OTP Form Content */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-center min-h-[460px] md:h-[560px] lg:h-[580px]">
            <OtpForm phoneNumber={phone} />
          </div>
          
        </div>
      </div>
    </main>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6]">
        <div className="text-[#1E7A38] font-bold text-lg animate-pulse">Loading...</div>
      </div>
    }>
      <OtpPageContent />
    </Suspense>
  );
}
