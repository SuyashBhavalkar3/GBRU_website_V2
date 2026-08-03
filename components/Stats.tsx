import React from "react";

export default function Stats() {
  const statItems = [
    { value: "50 Cr+", label: "Products in Field" },
    { value: "PAN", label: "India Support Network" },
    { value: "Our Presence", label: "Every 12 KM" },
    { value: "Fast", label: "Service & Spare Support" },
  ];

  return (
    <section className="w-full bg-[#F5F8F6] lg:h-[177px] pt-[22px] pb-[21px] px-4 lg:px-[64px] flex items-center justify-center border-b border-[#0F291B]/5">
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
  );
}
