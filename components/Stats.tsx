import React from "react";
import Image from "next/image";

export default function Stats() {
  const statItems = [
    { value: "50 Cr+", label: "Products in Field" },
    { value: "PAN", label: "India Support Network" },
    { value: "Our Presence", label: "Every 12 KM" },
    { value: "Fast", label: "Service & Spare Support" },
  ];

  // Mobile-specific compact cards (Figma design)
  const mobileStatItems = [
    { value: "50k+", label: "Farmers Served" },
    { value: "24h", label: "Fast Delivery" },
    { value: "PAN", label: "India Support" },
    { value: "10k+", label: "Spare Parts" },
  ];

  return (
    <>
      {/* ── MOBILE: Figma Impact stats redesign (167px height, dark green background) ── */}
      <section 
        className="block lg:hidden w-full text-white py-4 px-4 overflow-hidden border-t border-b border-[#0D9740]/10 flex flex-col justify-between"
        style={{
          background: "#072011",
          height: "167px"
        }}
      >
        {/* Header */}
        <div>
          <h2 className="font-roboto font-bold text-[14px] leading-tight text-white/95">
            Our Impact
          </h2>
          <h3 className="font-roboto font-bold text-[14px] leading-tight text-white/90">
            In Numbers
          </h3>
        </div>

        {/* Numbers Row */}
        <div className="flex items-center justify-between w-full mt-2 relative">
          
          {/* Stat 1 */}
          <div className="flex-1 flex flex-col items-center text-center px-1">
            {/* Box Package Icon */}
            <div className="text-white mb-1.5 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="font-roboto font-bold text-[12px] leading-tight text-white">5 Cr+</span>
            <span className="font-roboto font-normal text-[8px] leading-tight text-white/80 mt-0.5">Products in<br />Indian Fields</span>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-10 border-l border-dotted border-white/20" />

          {/* Stat 2 */}
          <div className="flex-1 flex flex-col items-center text-center px-1">
            {/* Map Pointer Icon */}
            <div className="text-white mb-1.5 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-roboto font-bold text-[12px] leading-tight text-white">PAN India</span>
            <span className="font-roboto font-normal text-[8px] leading-tight text-white/80 mt-0.5">services</span>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-10 border-l border-dotted border-white/20" />

          {/* Stat 3 */}
          <div className="flex-1 flex flex-col items-center text-center px-1">
            {/* Farmer/Presence Icon */}
            <div className="text-white mb-1.5 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-roboto font-bold text-[12px] leading-tight text-white">Our Presence</span>
            <span className="font-roboto font-normal text-[8px] leading-tight text-white/80 mt-0.5">Every 12 KM</span>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-10 border-l border-dotted border-white/20" />

          {/* Stat 4 */}
          <div className="flex-1 flex flex-col items-center text-center px-1">
            {/* Support Headphone Image Logo */}
            <div className="mb-1.5 h-6 flex items-center justify-center">
              <Image
                src="/assets/headset.png"
                alt="Headset"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span className="font-roboto font-bold text-[12px] leading-tight text-white">Fast</span>
            <span className="font-roboto font-normal text-[8px] leading-tight text-white/80 mt-0.5">Service & Spare<br />Support</span>
          </div>

        </div>
      </section>

      {/* ── DESKTOP: original layout (unchanged) ── */}
      <section className="hidden lg:flex w-full bg-[#F5F8F6] lg:h-[177px] pt-[22px] pb-[21px] px-4 lg:px-[64px] items-center justify-center border-b border-[#0F291B]/5">
        <div className="max-w-[1152px] w-full flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-0">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className="w-[270px] h-[134px] rounded-[20px] py-[24px] px-[15px] flex flex-col items-center justify-center text-center text-white shadow-lg border border-[#00752B]/20 hover:scale-[1.02] transition-all duration-300"
              style={{ background: "linear-gradient(180deg, #01BE6A 0%, #00752B 100%)" }}
            >
              <h2 className="font-roboto font-normal text-[36px] lg:text-[40px] leading-[44px] lg:leading-[60px] tracking-tight w-full">
                {item.value}
              </h2>
              <p className="font-roboto font-bold text-[12px] lg:text-[13px] leading-[15px] lg:leading-[16px] tracking-[0.65px] uppercase text-white/95 mt-1.5 w-full">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
