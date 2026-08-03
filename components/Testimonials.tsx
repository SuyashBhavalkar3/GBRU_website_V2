"use client";

import React from "react";
import Image from "next/image";

const flyers = [
  { src: "/assets/gbru_flyer_happy_kisan1.png", alt: "Happy Kisan Flyer 1" },
  { src: "/assets/gbru_flyer_happy_kisan2.png", alt: "Happy Kisan Flyer 2" },
  { src: "/assets/gbru_flyer_happy_kisan3.png", alt: "Happy Kisan Flyer 3" },
];

const reviews = [
  {
    quote: "“GBRU power weeder has made my work much easier. Strong, reliable and very fuel efficient.”",
    name: "Ramesh Yadav",
    loc: "Karnal, Haryana",
    avatar: "/assets/avatar_ramesh.png",
  },
  {
    quote: "“Spray pump quality is top notch. Battery backup is excellent and pressure is very strong.”",
    name: "Suresh Patel",
    loc: "Anand, Gujarat",
    avatar: "/assets/avatar_suresh.png",
  },
  {
    quote: "“Seeder works perfectly in all types of soil. Very happy with the performance.”",
    name: "Mahendra Singh",
    loc: "Jaipur, Rajasthan",
    avatar: "/assets/avatar_mahendra.png",
  },
  {
    quote: "“Solar products from GBRU are durable and very useful for our farm security.”",
    name: "Balwinder Singh",
    loc: "Ludhiana, Punjab",
    avatar: "/assets/avatar_balwinder.png",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white flex flex-col items-center py-[44px] px-[37px] lg:px-0">
      {/* ── Top Testimonial Rounded Box ── */}
      <div
        className="relative w-full max-w-[1206px] rounded-[47px] overflow-hidden border border-[#CDE5D2] flex flex-col items-center py-10 px-4 lg:px-6 bg-no-repeat"
        style={{
          background: "linear-gradient(135deg, #F0FAF2 0%, #DCEFE0 100%)",
          minHeight: "730px",
        }}
      >
        {/* Background grass pattern with higher opacity to show rich green tones */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.45] mix-blend-multiply">
          <Image
            src="/assets/green_grass.png"
            alt="Grass Texture"
            fill
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Header */}
          <h2
            className="font-roboto font-bold text-[#0F291B] text-[28px] leading-tight text-center flex items-center justify-center"
            style={{ width: "254px", height: "32px", marginBottom: "12px" }}
          >
            Testimonial
          </h2>
          <p
            className="font-roboto text-[#374151] text-[16px] text-center font-medium flex items-center justify-center"
            style={{ width: "523px", height: "32px", marginBottom: "40px" }}
          >
            Trusted by Farmers, Proven in the Field
          </p>

          {/* Flyers Row */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-5 w-full max-w-[1152px] mb-10">
            {flyers.map((flyer, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden shadow-lg border border-white/60 bg-white"
                style={{
                  width: "357px",
                  height: "357px",
                  borderRadius: "16px",
                }}
              >
                <Image
                  src={flyer.src}
                  alt={flyer.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* View More Button */}
          <button
            className="bg-[#0D9740] hover:bg-[#0a7d34] text-white font-roboto font-semibold text-[15px] shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              width: "226px",
              height: "64px",
              borderRadius: "9999px",
              paddingTop: "21px",
              paddingBottom: "21px",
              paddingLeft: "67px",
              paddingRight: "67px",
            }}
          >
            View More
          </button>
        </div>
      </div>

      {/* ── Bottom What Farmers Say Section ── */}
      <div className="w-full max-w-[1206px] flex flex-col items-center mt-8 px-[37px] lg:px-0">
        <h3 
          className="font-roboto font-bold text-center flex items-center justify-center mb-10 whitespace-nowrap text-[#1F2937] text-[28px]"
          style={{ height: "32px" }}
        >
          What Farmers Say
        </h3>

        {/* Reviews Horizontal Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              style={{ minHeight: "180px" }}
            >
              {/* Quote */}
              <p className="font-roboto text-[#374151] text-[14px] leading-relaxed mb-6 font-normal">
                {review.quote}
              </p>

              {/* User Meta */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-roboto font-bold text-[#0F291B] text-[14px]">
                    {review.name}
                  </span>
                  <span className="font-roboto text-[#6B7280] text-[12px]">
                    {review.loc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
