"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, ShoppingCart, AlertCircle, Truck, Play, Percent, Globe, ArrowRight } from "lucide-react";
import { useShoptionSetting } from "@/hooks/useShoptionSetting";

const features = [
  {
    icon: <MessageSquare className="w-5 h-5 text-white" />,
    title: "AVAILABLE ON WHATSAPP",
    desc: "For seamless direct communication."
  },
  {
    icon: <ShoppingCart className="w-5 h-5 text-white" />,
    title: "PLACE ORDERS & PAYMENTS",
    desc: "Direct transactions within the chat."
  },
  {
    icon: <AlertCircle className="w-5 h-5 text-white" />,
    title: "RAISE & TRACK COMPLAINTS",
    desc: "Swift issue resolution and status updates."
  },
  {
    icon: <Truck className="w-5 h-5 text-white" />,
    title: "TRACK YOUR ORDER",
    desc: "Real-time visibility on your deliveries."
  },
  {
    icon: <Play className="w-5 h-5 text-white" fill="white" />,
    title: "IoT PRODUCT INSTALLATION VIDEOS",
    desc: "Access detailed device setup guides."
  },
  {
    icon: <Percent className="w-5 h-5 text-white" />,
    title: "CHECK PERSONALIZED OFFERS",
    desc: "Exclusive deals designed just for you."
  },
  {
    icon: <Globe className="w-5 h-5 text-white" />,
    title: "AVAILABLE IN ALL LANGUAGES",
    desc: "Multi-lingual support for global users."
  }
];

export default function BoostBusinessWithNova() {
  const { whatsappLink } = useShoptionSetting();

  return (
    <section className="w-full bg-[#FAFCFB] py-12 md:py-20 border-t border-zinc-100/80 select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <h2 className="text-4xl md:text-5xl font-black text-[#0B2516] tracking-tight leading-[1.1] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            SIMPLIFY YOUR SHOPPING<br />
            EXPERIENCE WITH <span className="text-[#0D9740]">NOVA</span>
          </h2>
          <p className="text-lg md:text-xl font-bold text-[#374151] mb-8 font-sans">
            AI-Powered Commerce & Customer Assistant
          </p>

          {/* Features Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1C4E30] flex items-center justify-center shadow-md shadow-[#1C4E30]/10">
                  {f.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-xs md:text-sm font-extrabold text-[#0B2516] tracking-wide uppercase">
                    {f.title}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Button */}
          <div className="flex">
            <a
              href={`${whatsappLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-zinc-50 text-[#0D9740] border border-[#0D9740] font-extrabold text-sm md:text-base px-6 py-2.5 rounded-full transition-all duration-300 transform active:scale-95 shadow-md shadow-zinc-100 cursor-pointer uppercase tracking-wider"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0D9740]/20 flex-shrink-0">
                <Image src="/assets/nova.jpeg" alt="Nova" fill className="object-cover" />
              </div>
              <span>Chat with Nova</span>
              <ArrowRight className="w-5 h-5 text-[#0D9740]" />
            </a>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full aspect-square max-w-[450px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/60 bg-white">
            <Image
              src="/assets/nova.jpeg"
              alt="Boost your business with GBRU Nova AI"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
