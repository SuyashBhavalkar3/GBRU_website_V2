"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { useShoptionSetting } from "@/hooks/useShoptionSetting";

const features = [
  {
    icon: "/assets/Icon1.png", // Fallback to icons or custom design
    title: "Available on WhatsApp",
    desc: "For seamless direct communication.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon2.png",
    title: "Place Orders & Payments",
    desc: "Direct transactions within the chat.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon3.png",
    title: "Raise & Track Complaints",
    desc: "Swift issue resolution and status updates.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon4.png",
    title: "Track Your Order",
    desc: "Real-time visibility on your deliveries.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon5.png",
    title: "IoT Product Installation Videos",
    desc: "Access detailed device setup guides.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon6.png",
    title: "Check Personalized Offers",
    desc: "Exclusive deals designed just for you.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  },
  {
    icon: "/assets/Icon1.png",
    title: "Available in All Languages",
    desc: "Multi-lingual support for global users.",
    iconBg: "#E8F5EE",
    iconColor: "#0D9740"
  }
];

export default function BoostBusinessWithNova() {
  const { whatsappLink } = useShoptionSetting();

  return (
    <section className="w-full bg-white py-12 md:py-16 flex justify-center items-center px-4 select-none">
      {/* Main viewport div */}
      <div
        className="relative w-full max-w-[1206px] min-h-[641px] rounded-[47px] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 shadow-[0_15px_50px_rgba(13,151,64,0.05)] border border-emerald-500/10"
        style={{
          background: "linear-gradient(135deg, #E6F5EC 0%, #FFFFFF 100%)",
        }}
      >
        {/* Left Sub Div */}
        <div className="relative z-10 flex flex-col text-left max-w-full lg:max-w-[620px] gap-6">

          {/* Header info */}
          <div className="flex flex-col gap-2.5">
            {/* Star badge */}
            <div className="flex items-center gap-1.5 bg-[#E8F5EE] border border-[#0D9740]/20 rounded-md px-2.5 py-1 w-fit">
              <Star className="w-3 h-3 text-[#0D9740] fill-[#0D9740]" />
              <span className="text-[10px] md:text-[11px] font-extrabold text-[#0D9740] tracking-wide uppercase">
                Your Smart Communication Partner
              </span>
            </div>

            <h2 className="text-3xl md:text-[40px] font-black text-[#0B2516] tracking-tight leading-[1.1]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Simplify your shopping<br />
              experience with <span className="text-[#0D9740]">NOVA</span>
            </h2>
            <p className="text-xs md:text-sm font-semibold text-zinc-500 font-sans tracking-wide">
              AI-Powered Commerce & Customer Assistant
            </p>
          </div>

          {/* Features cards layout */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-[9.1px] w-full"
            style={{
              rowGap: "12px",
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-[9.1px] bg-white border border-[#E5E7EB] shadow-sm ${i === features.length - 1 ? "sm:col-span-2" : ""
                  }`}
                style={{
                  width: "100%",
                  minHeight: "55.76px",
                  borderRadius: "9.1px",
                  borderWidth: "0.57px",
                  padding: "10px 12px",
                }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: f.iconBg,
                    color: f.iconColor,
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-extrabold text-[#0B2516] truncate leading-tight uppercase tracking-wider">
                    {f.title}
                  </span>
                  <span className="text-[9.5px] text-zinc-400 font-semibold truncate leading-none mt-0.5">
                    {f.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Button */}
          <div className="flex mt-2">
            <a
              href={`${whatsappLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center bg-[#0D9740] hover:bg-[#0b8537] text-white font-extrabold transition-all duration-300 transform active:scale-95 shadow-md shadow-[#0D9740]/20 cursor-pointer uppercase"
              style={{
                width: "188.14px",
                height: "45.52px",
                borderRadius: "5689.54px",
                paddingLeft: "42px", // Give extra left padding to keep text centered without overlapping the left-aligned logo
                paddingRight: "18.21px",
              }}
            >
              {/* Circular white logo badge positioned absolutely to the left edge */}
              <div
                className="absolute left-[3px] top-[2.76px] rounded-full overflow-hidden border border-white/20 bg-white flex items-center justify-center flex-shrink-0"
                style={{
                  width: "40px",
                  height: "40px"
                }}
              >
                <Image src="/assets/nova.jpeg" alt="Nova" width={40} height={40} className="object-cover" />
              </div>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: "10.24px",
                  lineHeight: "15.93px",
                  letterSpacing: "0.26px",
                  textAlign: "center",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                Chat with Nova
              </span>
            </a>
          </div>

        </div>

        {/* Right Illustration Column */}
        <div className="relative z-10 flex justify-center items-center w-full lg:w-auto mt-8 lg:mt-0">
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[460px] lg:h-[460px] flex-shrink-0 animate-float">
            <Image
              src="/assets/nova.jpeg"
              alt="Boost your business with GBRU Nova AI"
              width={460}
              height={460}
              className="object-contain object-center drop-shadow-xl"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
