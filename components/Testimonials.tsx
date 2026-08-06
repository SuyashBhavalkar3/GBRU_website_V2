"use client";

import React, { useState } from "react";
import Image from "next/image";

const farmerReviews = [
  { src: "/assets/farmer_review (1).jpg", alt: "Farmer Review 1" },
  { src: "/assets/farmer_review (2).jpg", alt: "Farmer Review 2" },
  { src: "/assets/farmer_review (3).jpg", alt: "Farmer Review 3" },
  { src: "/assets/farmer_review (4).jpg", alt: "Farmer Review 4" },
  { src: "/assets/farmer_review (5).jpg", alt: "Farmer Review 5" },
  { src: "/assets/farmer_review (6).jpg", alt: "Farmer Review 6" },
  { src: "/assets/farmer_review (7).jpg", alt: "Farmer Review 7" },
  { src: "/assets/farmer_review (8).jpg", alt: "Farmer Review 8" },
  { src: "/assets/farmer_review (9).jpg", alt: "Farmer Review 9" },
  { src: "/assets/farmer_review (10).jpg", alt: "Farmer Review 10" },
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
  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <section className="w-full bg-white flex flex-col items-center py-[44px] px-[37px] lg:px-0">
      {/* ── Top Testimonial Rounded Box ── */}
      <div
        className="relative w-full max-w-[1206px] rounded-[47px] overflow-hidden border border-[#CDE5D2] flex flex-col items-center py-10 px-4 lg:px-6 bg-no-repeat transition-all duration-500"
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
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5 w-full max-w-[1152px] mb-10 transition-all duration-500">
            {farmerReviews.slice(0, visibleCount).map((review, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden shadow-lg border border-white/60 bg-white animate-in zoom-in-95 duration-500"
                style={{
                  width: "357px",
                  height: "357px",
                  borderRadius: "16px",
                }}
              >
                <Image
                  src={review.src}
                  alt={review.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* View More Button */}
          {visibleCount < farmerReviews.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
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
              Load More
            </button>
          )}
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
