"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Durable Equipment",
    desc: "Engineered to withstand harsh field conditions for years.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
      </svg>
    ),
    title: "Service Support",
    desc: "On-field expert technicians available at your call.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Rapid shipping network to get tools to you when you need them.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
      </svg>
    ),
    title: "Easy Usage",
    desc: "Intuitive controls that anyone can master in minutes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Warranty",
    desc: "Guaranteed performance with comprehensive warranty plans.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#1E6B3C" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Spare Support",
    desc: "Genuine parts readily available for every model we sell.",
  },
];

export default function WhyGBRU() {
  return (
    <section
      className="relative w-full bg-white flex items-center justify-center"
      style={{
        height: "648px",
        paddingTop: "44px",
        paddingBottom: "44px",
      }}
    >
      {/* Inner Div */}
      <div
        className="flex flex-col items-center w-full"
        style={{
          maxWidth: "1280px",
          height: "560px",
          paddingLeft: "64px",
          paddingRight: "64px",
          gap: "64px",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          {/* Title: Why GBRU */}
          <h2 className="flex items-end font-roboto font-bold text-[#1E3A2F] text-[40px] leading-none gap-2">
            <span>Why</span>
            {/* Clip to hide tagline, show mascot + GBRU letters sized to match "Why" text */}
            <div style={{ width: "110px", height: "52px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <Image
                src="/assets/gbru_green.png"
                alt="GBRU"
                width={110}
                height={75}
                className="object-contain object-top"
              />
            </div>
          </h2>
          <p className="font-roboto text-[#6B7280] text-[16px] text-center max-w-[480px] leading-relaxed">
            We combine heavy-duty materials with farmer-first designs to ensure
            you never stop growing.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            width: "1152px",
            height: "376px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            rowGap: "24px",
            columnGap: "24px",
          }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white border border-[#E5E7EB] hover:border-[#1E6B3C]/30 hover:shadow-sm transition-all duration-300"
              style={{
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              {/* Icon Box */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-[10px] bg-[#E8F5EE]"
                style={{ width: "48px", height: "48px" }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <span className="font-roboto font-bold text-[#1E3A2F] text-[17px] leading-snug">
                  {feature.title}
                </span>
                <span className="font-roboto text-[#6B7280] text-[14px] leading-relaxed">
                  {feature.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
