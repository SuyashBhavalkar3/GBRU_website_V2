import React from "react";

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
      {/* ── MOBILE: horizontal scroll strip (Figma exact) ── */}
      <section className="block lg:hidden w-full bg-white px-3.5 pt-8 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none snap-x snap-mandatory">
          {mobileStatItems.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 snap-start flex flex-col items-center justify-center text-center text-white"
              style={{
                width: "83.67px",
                height: "41.97px",
                borderRadius: "6.2px",
                border: "0.31px solid rgba(255,255,255,0.35)",
                padding: "7.44px",
                background: "linear-gradient(180deg, #01BE6A 0%, #00752B 100%)",
              }}
            >
              <span className="font-roboto font-bold text-[13px] leading-none">{item.value}</span>
              <span className="font-roboto font-semibold text-[8px] leading-tight tracking-wide uppercase text-white/90 mt-0.5">{item.label}</span>
            </div>
          ))}
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
