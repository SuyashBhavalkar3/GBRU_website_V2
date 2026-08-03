import React from "react";
import Image from "next/image";

export default function Categories() {
  const categoriesList = [
    {
      name: "Solar & Secuirt",
      image: "/assets/cat_solar_security.png",
    },
    {
      name: "Seeders",
      image: "/assets/cat_seeders.png",
    },
    {
      name: "Sprayers",
      image: "/assets/cat_sprayers.png",
    },
    {
      name: "Irrigation",
      image: "/assets/cat_irrigation.png",
    },
    {
      name: "Accessories",
      image: "/assets/cat_accessories.png",
    },
  ];

  return (
    <section className="w-full bg-[#EAF5EE] lg:h-[480px] py-[40px] lg:py-[30px] px-4 lg:px-[64px] flex flex-col items-center justify-between text-center">
      
      {/* Title */}
      <h2 className="font-roboto font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[40px] lg:leading-[56px] tracking-[-0.96px] text-[#0F291B]">
        Shop By Category
      </h2>

      {/* Categories Row */}
      <div className="max-w-[1152px] w-full flex flex-wrap lg:flex-nowrap justify-center gap-[24px] my-6 lg:my-0">
        {categoriesList.map((cat, idx) => (
          <div 
            key={idx}
            className="w-[211.2px] h-[251.2px] flex flex-col items-center justify-between group"
          >
            {/* White Square Card (211.2 x 211.2px, rounded 32px) */}
            <div className="w-[211.2px] h-[211.2px] rounded-[32px] bg-white border border-[#0F291B]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center p-[20px] relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] cursor-pointer">
              {cat.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                </div>
              ) : (
                // Accessories is blank
                <div className="w-full h-full bg-white rounded-[32px]" />
              )}
            </div>

            {/* Label Text below Card */}
            <span className="font-roboto font-bold text-[13px] leading-[16px] tracking-[0.65px] text-[#0F291B] uppercase text-center w-full">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* View All Categories Button */}
      <button className="bg-[#0D9740] hover:bg-[#0b8036] text-white font-roboto font-bold text-[12px] tracking-wider w-[173px] h-[32px] rounded-full pt-[8px] pr-[24px] pb-[8px] pl-[24px] flex items-center justify-center transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md">
        View All categories
      </button>

    </section>
  );
}
