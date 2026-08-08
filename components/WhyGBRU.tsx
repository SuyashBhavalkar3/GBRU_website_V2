"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon1.png" alt="Durable Equipment" fill className="object-contain" />
      </div>
    ),
    title: "Durable Equipment",
    desc: "Engineered to withstand harsh field conditions for years.",
  },
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon2.png" alt="Service Support" fill className="object-contain" />
      </div>
    ),
    title: "Service Support",
    desc: "On-field expert technicians available at your call.",
  },
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon3.png" alt="Fast Delivery" fill className="object-contain" />
      </div>
    ),
    title: "Fast Delivery",
    desc: "Rapid shipping network to get tools to you when you need them.",
  },
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon4.png" alt="Easy Usage" fill className="object-contain" />
      </div>
    ),
    title: "Easy Usage",
    desc: "Intuitive controls that anyone can master in minutes.",
  },
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon5.png" alt="Warranty" fill className="object-contain" />
      </div>
    ),
    title: "Warranty",
    desc: "Guaranteed performance with comprehensive warranty plans.",
  },
  {
    icon: (
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src="/assets/Icon6.png" alt="Spare Support" fill className="object-contain" />
      </div>
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
          <h2 className="flex items-center text-[#1E3A2F] gap-2">
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "48px",
                lineHeight: "56px",
                letterSpacing: "-0.96px",
                textAlign: "center"
              }}
            >
              Why
            </span>
            {/* Clip to hide tagline, show mascot + GBRU letters sized to match "Why" text */}
            <div style={{ width: "136px", height: "63px", overflow: "hidden", position: "relative", flexShrink: 0, top: "-8px" }}>
              <Image
                src="/assets/gbru_green.png"
                alt="GBRU"
                width={136}
                height={90}
                className="object-contain object-top"
              />
            </div>
          </h2>
          <p className="font-roboto text-[#3A3A3A] text-[16px] text-center w-full leading-relaxed">
            We combine heavy-duty materials with farmer-first designs to ensure you never stop<br />
            growing.
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
