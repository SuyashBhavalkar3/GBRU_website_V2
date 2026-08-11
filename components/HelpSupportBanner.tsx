"use client";

import React from "react";
import Image from "next/image";

export default function HelpSupportBanner() {
  return (
    <>
      {/* ================================================================= */}
      {/* DESKTOP LAYOUT — hidden on mobile (md and below) */}
      {/* ================================================================= */}
      <div className="hidden xl:block w-full bg-[#F9F9FA] py-10 px-4 md:px-8 mt-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left text */}
          <div>
            <h2 className="text-2xl md:text-[28px] font-medium text-[#006B21] mb-2">
              Need Help Choosing Equipment?
            </h2>
            <p className="text-base text-[#006B21]/80 font-normal">
              Our agriculture specialists are ready to guide you to the perfect tool for your farm.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+919226514174"
              className="flex items-center gap-2 bg-[#006B21] hover:bg-[#005a1b] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-base shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Expert Call
            </a>

            <a
              href="https://wa.me/919226514174"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-base shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE LAYOUT — hidden on md+ */}
      {/* ================================================================= */}
      <div className="flex xl:hidden w-full bg-[#F9F9FA] px-4 py-4 justify-center">
        <div
          className="flex w-full max-w-[358px] rounded-[24px] overflow-hidden p-3.5 items-stretch justify-between shadow-sm border border-[#E5E7EB]"
          style={{ background: "#F0FAF2", height: "124px" }}
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
              <svg className="w-4 h-4 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
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
    </>
  );
}
