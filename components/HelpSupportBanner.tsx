"use client";

import React from "react";
import Image from "next/image";

export default function HelpSupportBanner() {
  return (
    <div className="w-full bg-white border-t border-gray-100 py-10 px-4 md:px-8">
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (Unchanged) */}
      {/* ========================================================================= */}
      <div className="hidden md:flex max-w-[1280px] mx-auto flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#006B21] tracking-tight mb-2">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-sm md:text-base text-zinc-600 font-medium">
            Our agriculture specialists are ready to guide you to the perfect tool for your farm.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+919226514174"
            className="flex items-center gap-2 bg-[#006B21] hover:bg-[#005a1b] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-md"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Expert Call
          </a>

          <a
            href="https://wa.me/919226514174"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-md"
          >
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.885.522 3.654 1.43 5.176l-1.408 5.147 5.27-1.385C8.75 21.577 10.323 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 1.818c4.52 0 8.182 3.662 8.182 8.182 0 4.52-3.662 8.182-8.182 8.182-1.503 0-2.912-.41-4.133-1.12l-.296-.172-3.072.807.82-2.998-.188-.3C4.425 15.118 4 13.613 4 12c0-4.52 3.662-8.182 8.182-8.182z" />
            </svg>
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (Figma Redesign) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (Figma Redesign) */}
      {/* ========================================================================= */}
      <div 
        className="flex md:hidden w-full max-w-[358px] mx-auto rounded-[24px] overflow-hidden p-3.5 items-stretch justify-between shadow-sm border border-[#E5E7EB]"
        style={{
          background: "#F0FAF2",
          height: "124px"
        }}
      >
        {/* Left Side Info */}
        <div className="flex flex-col flex-1 text-left justify-between pr-1">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-roboto font-bold text-[#1F2937] text-[16px] leading-tight">
              Need any Help?
            </h2>
            <p className="font-roboto font-normal text-[#4A4A4A] text-[12px] leading-[14px]">
              Talk to expert
            </p>
          </div>

          <div className="flex items-center gap-1 text-[#006B21] font-bold text-[12px] leading-none my-1">
            {/* Green Headphone Icon */}
            <svg 
              className="w-4 h-4 stroke-current fill-none shrink-0" 
              viewBox="0 0 24 24" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            +91 91 14 15 16 17
          </div>

          <a
            href="tel:+919114151617"
            className="bg-[#1E532E] hover:bg-[#163e22] text-white font-roboto font-bold text-[11px] py-1.5 px-3 rounded-full text-center shadow-sm w-fit transition-colors"
          >
            call now
          </a>
        </div>

        {/* Vertical Divider */}
        <div className="flex flex-col items-center justify-center relative px-2">
          <div className="w-[1px] h-full border-l border-dashed border-zinc-300" />
          <span 
            className="absolute bg-[#F0FAF2] font-roboto font-medium text-zinc-400 text-[11px] px-1"
            style={{ top: "calc(50% - 8px)" }}
          >
            or
          </span>
        </div>

        {/* Right Side WhatsApp Option */}
        <div className="flex items-center justify-center pl-1 shrink-0">
          <a
            href="https://wa.me/919114151617"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
          >
            {/* WhatsApp Image Logo */}
            <Image
              src="/assets/whatsapp_logo.png"
              alt="WhatsApp"
              width={28}
              height={28}
              className="object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
