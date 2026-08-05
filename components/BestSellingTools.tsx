"use client";

import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  badges: string[];
  specs: string[];
  image: string;
}

export default function BestSellingTools() {
  const products: Product[] = [
    {
      id: 1,
      title: "Ultra-Mist Pro Sprayer",
      badges: ["Farmer's Choice", "1 Year Warranty"],
      specs: ["20L Tank Capacity", "High-Pressure Nozzle"],
      image: "/assets/cat_sprayers.png",
    },
    {
      id: 2,
      title: "Water Pump",
      badges: ["In Stock"],
      specs: ["Cast Iron Body", "Low Fuel Consumption"],
      image: "/assets/cat_irrigation.png", // Temporarily using irrigation image
    },
    {
      id: 3,
      title: "16-teeth seeder",
      badges: ["In Stock"],
      specs: ["Cast Iron Body", "efficient"],
      image: "/assets/cat_seeders.png",
    },
    {
      id: 4,
      title: "Power Weeder",
      badges: ["Easy Maintenance"],
      specs: ["9HP Engine Power", "Adjustable Tilling Width"],
      image: "/assets/cat_accessories.png", // Temporarily using accessories image
    },
  ];

  return (
    <section className="relative w-full bg-white pt-10 pb-12 px-4 lg:px-[64px] flex flex-col items-center justify-start overflow-hidden">
      {/* Header Container */}
      <div className="relative z-10 w-full lg:w-[1152px] flex items-center justify-between">
        <h2
          className="text-[#0F291B]"
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0px"
          }}
        >
          Featured Products
        </h2>
        <button className="w-[100px] h-[32px] bg-[#1E532E] hover:bg-[#153B21] text-white font-roboto font-bold text-[12px] rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
          View All
        </button>
      </div>

      {/* Products Grid Container */}
      <div className="relative z-10 w-full lg:w-[1152px] mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20.85px] items-stretch">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative rounded-[23.68px] border border-zinc-200/80 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            style={{ width: "272.36px", minHeight: "480px", padding: "18.5px" }}
          >
            {/* Upper Content */}
            <div className="flex flex-col">
              {/* Product Image Thumbnail */}
              <div
                className="relative rounded-[20px] bg-[#E2F0E4]/60 overflow-hidden flex items-center justify-center"
                style={{ width: "235.36px", height: "253.12px", padding: "16px" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-[12px] mb-[10px]">
                {product.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FCD34D] text-[#78350F] font-roboto font-bold text-[10px] px-2.5 py-0.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Product Name */}
              <h3 className="font-roboto font-bold text-[#0F291B] text-[16px] lg:text-[18px] leading-tight line-clamp-1">
                {product.title}
              </h3>

              {/* Specs List */}
              <ul className="mt-2.5 space-y-1.5">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-zinc-600 font-roboto text-sm font-medium">
                    <svg
                      className="w-4 h-4 text-[#2D722F] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Best Price Button */}
            <button
              className="mt-4 rounded-[23.68px] bg-[#1E532E] hover:bg-[#153B21] text-white font-roboto font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-md w-full"
              style={{ height: "41.68px" }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
