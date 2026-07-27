"use client";

import FarmerShowcase from "./FarmerShowcase";
import LoginForm from "./LoginForm";
import LanguageSwitcher from "@/app/components/common/LanguageSwitcher";

export default function LoginPage() {
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

          {/* Right Column: Login Form Content */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-center min-h-[420px] md:h-[560px] lg:h-[580px]">
            <LoginForm />
          </div>
          
        </div>
      </div>
    </main>
  );
}
