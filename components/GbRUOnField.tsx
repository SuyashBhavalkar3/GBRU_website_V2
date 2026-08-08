"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function GbRUOnField() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const stats = [
    { value: "50+", label: "Exhibitions Attended" },
    { value: "2M+", label: "Farmers Reached" },
    { value: "15+", label: "States Covered" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: "1110px" }}
    >
      {/* Background: Green Grass Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/green_grass.png"
          alt="Green Grass Background"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
        />
        {/* Gradient overlay – light at top (for title) fading to transparent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* ── Section Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center pt-10 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-0">
        {/* Header */}
        <h2 className="font-roboto font-bold text-[#0F291B] text-[30px] sm:text-[40px] leading-tight text-center mb-3 max-w-3xl">
          GBRU on the Field
        </h2>
        <p className="font-roboto text-[#374151] text-[15px] sm:text-[16px] text-center mb-0 max-w-2xl">
          Experience our technology live at exhibitions across India.
        </p>

        {/* Mobile layout */}
        <div className="mt-8 w-full max-w-[1152px] grid grid-cols-1 gap-4 lg:hidden">
          <div
            onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/w5p5uD50hxM?autoplay=1")}
            className="relative rounded-[20px] overflow-hidden shadow-xl cursor-pointer group aspect-[16/10]"
          >
            <Image
              src="/assets/gbru_field_live_demo.png"
              alt="Live Demo Highlights"
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-[#2D722F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <span className="font-roboto font-semibold text-white text-[14px] drop-shadow">
                Live Demo Highlights
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { src: "/assets/gbru_field_punjab_expo.png", title: "Punjab Agri Expo" },
              { src: "/assets/gbru_field_kisan_mela.png", title: "Kisan Mela Booth" },
              { src: "/assets/gbru_field_workshop.png", title: "Farmer Workshop 2024" },
            ].map((card) => (
              <div key={card.title} className="relative rounded-[16px] overflow-hidden shadow-lg aspect-[16/10]">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-roboto font-semibold text-white text-[13px] drop-shadow">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop layout */}
        <div
          className="hidden lg:grid mt-[28px] w-[1152px]"
          style={{
            height: "627.25px",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          <div
            onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/w5p5uD50hxM?autoplay=1")}
            className="relative rounded-[20px] overflow-hidden shadow-xl cursor-pointer group"
            style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
          >
            <Image
              src="/assets/gbru_field_live_demo.png"
              alt="Live Demo Highlights"
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-[#2D722F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="font-roboto font-semibold text-white text-[15px] drop-shadow">
                Live Demo Highlights
              </span>
            </div>
          </div>

          <div className="relative rounded-[16px] overflow-hidden shadow-lg cursor-pointer group" style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
            <Image src="/assets/gbru_field_punjab_expo.png" alt="Punjab Agri Expo" fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
            <div className="absolute bottom-3 left-3"><span className="font-roboto font-semibold text-white text-[13px] drop-shadow">Punjab Agri Expo</span></div>
          </div>

          <div className="relative rounded-[16px] overflow-hidden shadow-lg cursor-pointer group" style={{ gridColumn: "4 / 5", gridRow: "1 / 2" }}>
            <Image src="/assets/gbru_field_kisan_mela.png" alt="Kisan Mela Booth" fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
            <div className="absolute bottom-3 left-3"><span className="font-roboto font-semibold text-white text-[13px] drop-shadow">Kisan Mela Booth</span></div>
          </div>

          <div className="relative rounded-[16px] overflow-hidden shadow-lg cursor-pointer group" style={{ gridColumn: "3 / 5", gridRow: "2 / 3" }}>
            <Image src="/assets/gbru_field_workshop.png" alt="Farmer Workshop 2024" fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
            <div className="absolute bottom-3 left-3"><span className="font-roboto font-semibold text-white text-[13px] drop-shadow">Farmer Workshop 2024</span></div>
          </div>
        </div>

        {/* View More Button */}
        <button className="bg-[#0D9740] hover:bg-[#0a7d34] text-white font-roboto font-semibold text-[15px] shadow-md transition-all duration-300 hover:scale-105 active:scale-95 mt-8 sm:mt-10 w-full sm:w-[226px] h-14 sm:h-16 rounded-full px-8 sm:px-[67px]">
          View More
        </button>

        {/* ── Stats Bar ── */}
        <div className="w-full max-w-[1152px] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-md border border-white/70 rounded-[16px] min-h-[124px] sm:min-h-[142px] px-6 py-8 gap-1"
            >
              <span className="font-roboto font-bold text-[#0F291B] text-[30px] sm:text-[36px] leading-tight">
                {stat.value}
              </span>
              <span className="font-roboto text-[#6B7280] text-[13px] sm:text-[14px] font-medium text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4 animate-fade-in"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold z-10"
              onClick={() => setActiveVideoUrl(null)}
            >
              ✕
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src={activeVideoUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
}
