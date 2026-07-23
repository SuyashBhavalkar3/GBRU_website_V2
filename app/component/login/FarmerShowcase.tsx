"use client";

import Image from "next/image";

export default function FarmerShowcase() {
  return (
    <div className="relative w-full h-full group select-none bg-[#FAF9F5]">
      {/* Background Farmer Illustration */}
      <Image
        src="/home/gbru_farmer.png"
        alt="GBRU Farmer Ambassador"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
      />
    </div>
  );
}
