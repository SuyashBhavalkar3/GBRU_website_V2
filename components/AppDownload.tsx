"use client";

import React from "react";
import Image from "next/image";

export default function AppDownload() {
  return (
    <section className="relative w-full py-8 px-4 sm:px-6 lg:px-[37px] flex items-center justify-center overflow-hidden bg-white">
      {/* Inner Box (Container) */}
      <div
        className="relative w-full max-w-[1206px] min-h-[641px] rounded-[28px] lg:rounded-[47px] overflow-hidden border border-[#CDE5D2] flex flex-col lg:flex-row justify-between p-6 sm:p-8 lg:p-12 bg-no-repeat"
        style={{
          background: "linear-gradient(135deg, #F0FAF2 0%, #DCEFE0 100%)"
        }}
      >
        {/* Soft Leaves Background Asset at Bottom */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/green_leaves.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom -400px"
          }}
        />

        {/* Left Column (Logo, Title, Features grid, Download buttons) */}
        <div className="relative z-10 w-full lg:w-[450px] flex flex-col justify-between h-full text-left">
          {/* Logo & Title Header */}
          <div className="flex flex-col">
            <div className="relative w-[160px] sm:w-[180px] h-[50px] mb-6">
              <Image
                src="/assets/shoption_logo.png"
                alt="Shoption Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-[#0F291B] font-roboto font-bold text-[28px] lg:text-[34px] leading-tight">
              Gbru (<span className="text-[#2D722F]">गब्रू</span>) Powered by Shoption
            </h2>
            <p className="text-zinc-700 font-roboto text-sm lg:text-base font-medium mt-3 leading-relaxed">
              Our Shoption App tracks order, request service, check warranty and get spare parts- all in Shoption App.
            </p>
          </div>

          {/* 2x2 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[364px] my-6">
            {/* Card 1 */}
            <div
              className="bg-white/90 backdrop-blur-sm flex items-center gap-2 shadow-sm border-zinc-200/60 rounded-[7.6px] border px-2 py-2 min-h-[66px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2F0E4] flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-[#2D722F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25M12 10.5v.01" />
                </svg>
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-roboto font-bold text-[#0F291B] text-[11px] leading-tight">Track order</h4>
                <p className="text-zinc-500 font-roboto text-[8px] mt-0.5 leading-tight truncate">Kow where your order is anytime.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="bg-white/90 backdrop-blur-sm flex items-center gap-2 shadow-sm border-zinc-200/60 rounded-[7.6px] border px-2 py-2 min-h-[66px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2F0E4] flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-[#2D722F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-roboto font-bold text-[#0F291B] text-[11px] leading-tight">Spare Part</h4>
                <p className="text-zinc-500 font-roboto text-[8px] mt-0.5 leading-tight truncate">spare part support instantly</p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="bg-white/90 backdrop-blur-sm flex items-center gap-2 shadow-sm border-zinc-200/60 rounded-[7.6px] border px-2 py-2 min-h-[66px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2F0E4] flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-[#2D722F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-roboto font-bold text-[#0F291B] text-[11px] leading-tight">Expert help</h4>
                <p className="text-zinc-500 font-roboto text-[8px] mt-0.5 leading-tight truncate">Connect with support instantly</p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="bg-white/90 backdrop-blur-sm flex items-center gap-2 shadow-sm border-zinc-200/60 rounded-[7.6px] border px-2 py-2 min-h-[66px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#E2F0E4] flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-[#2D722F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="text-left min-w-0">
                <h4 className="font-roboto font-bold text-[#0F291B] text-[11px] leading-tight">Warranty</h4>
                <p className="text-zinc-500 font-roboto text-[8px] mt-0.5 leading-tight truncate">Check status</p>
              </div>
            </div>
          </div>

          {/* Download Badges */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Google Play Store Badge */}
            <a
              href="https://play.google.com/store/apps/details?id=com.shoption.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-[14px] w-full sm:w-[145px] min-h-[48px] hover:bg-black/90 transition-all shadow-md"
            >
              {/* Play Store Colored Icon */}
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 466 511.98" fill="none">
                <path fill="#EA4335" d="M199.9 237.8L1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z" />
                <path fill="#FBBC04" d="M433.91 205.1L329.26 145.1l-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z" />
                <path fill="#34A853" d="M199.42 273.45L329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z" />
                <path fill="#4285F4" d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z" />
              </svg>
              <div className="text-left">
                <div className="text-[7px] uppercase tracking-wider font-semibold text-zinc-300">GET IT ON</div>
                <div className="text-[12px] font-bold leading-tight">Google Play</div>
              </div>
            </a>

            {/* Apple App Store Badge */}
            <a
              href="https://apps.apple.com/in/app/shoption-for-irrigation-shops/id1544284156"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-[14px] w-full sm:w-[145px] min-h-[48px] hover:bg-black/90 transition-all shadow-md"
            >
              {/* Apple Icon */}
              <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
              </svg>
              <div className="text-left font-roboto">
                <div className="text-[6px] uppercase tracking-wider font-semibold text-zinc-300">Download on the</div>
                <div className="text-[12px] font-bold leading-tight">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* Middle Column (Mockup Phone in Hand) */}
        <div className="relative lg:absolute z-20 pointer-events-none w-full max-w-[360px] sm:max-w-[420px] lg:w-[560px] lg:h-[680px] lg:bottom-0 lg:top-auto lg:left-[440px] mx-auto mt-6 lg:mt-0">
          <Image
            src="/assets/phone_in_hand.png"
            alt="Phone Mockup in Hand"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Right Column (Specifications Card Panel) */}
        <div className="relative lg:absolute bg-white/70 backdrop-blur-md border border-white/40 p-6 flex flex-col justify-between shadow-lg z-10 w-full lg:w-[259px] min-h-[543px] lg:h-[543px] lg:top-[49px] lg:left-[857px] rounded-[11px] mt-6 lg:mt-0">
          {/* Top Specifications Content */}
          <div className="flex flex-col text-left">
            <h3 className="font-roboto font-bold text-[#0F291B] text-[18px] lg:text-[20px] leading-tight mb-6">
              Your Complete Farming Partner In Your Pocket
            </h3>

            {/* Double Checkmark Spec List */}
            <ul className="space-y-[30px] mt-2">
              {[
                "Easy Order Tracking",
                "Quick Service",
                "Genuine Spare Parts",
                "Warranty Management",
                "Expert Support Anytime"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-[#0F291B] font-roboto text-sm font-semibold">
                  {/* Custom Double Checkmark SVG */}
                  <div className="flex items-center text-[#2D722F] flex-shrink-0">
                    <svg className="w-4 h-4 -mr-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Logos branding */}
          <div className="flex flex-col items-center border-t border-zinc-200/40 pt-4">
            <div className="relative w-[85px] h-[34px] mb-2">
              <Image
                src="/assets/gbru_green.png"
                alt="GBRU Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] font-roboto text-zinc-500 uppercase tracking-widest font-semibold mb-1">
              Powered by
            </span>
            <div className="relative w-[110px] h-[32px]">
              <Image
                src="/assets/shoption_logo.png"
                alt="Shoption Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
