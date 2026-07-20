import React from 'react';
import Image from 'next/image';
import { ChevronRight, Gift, TrendingUp } from 'lucide-react';

const HelpFarmersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Left Person */}
    <path d="M3 21v-1a3 3 0 0 1 3-3h1" />
    <circle cx="5" cy="12" r="2.5" />
    
    {/* Right Person */}
    <path d="M21 21v-1a3 3 0 0 0-3-3h-1" />
    <circle cx="19" cy="12" r="2.5" />

    {/* Center Person */}
    <path d="M8 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" />
    <circle cx="12" cy="9" r="3.5" />
  </svg>
);

const CommunityBadgeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Ribbon */}
    <path d="M7 13.5v7.5l5-3.5 5 3.5v-7.5" />
    {/* Circle */}
    <circle cx="12" cy="9" r="6" />
    {/* Filled Star */}
    <path d="M12 4.5l1.2 3 3.3.5-2.4 2.3.6 3.2-2.7-1.4-2.7 1.4.6-3.2-2.4-2.3 3.3-.5z" fill="currentColor" stroke="none" />
  </svg>
);

export default function BrandAmbassadorSection() {
  return (
    <section className="pt-[80px] pb-[80px] bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="relative w-full h-auto bg-[#012B0C] rounded-[28px] overflow-hidden flex flex-col md:flex-row">
          
          {/* Image Layer (Right Side on Desktop, Bottom on Mobile) */}
          <div className="relative md:absolute top-0 right-0 w-full md:w-[52%] h-[300px] md:h-full z-0 order-2 md:order-none">
            <Image 
              src="/home/brand-ambassador-banner.png" 
              alt="GBRU Brand Ambassador" 
              fill 
              className="object-cover object-center md:object-right brightness-110"
            />
          </div>

          {/* Gradient Overlay (Desktop Only) */}
          <div 
            className="absolute inset-0 z-10 hidden md:block" 
            style={{ 
              background: 'linear-gradient(90deg, #012B0C 0%, #012B0C 40%, rgba(1,43,12,0.85) 58%, rgba(1,43,12,0.45) 72%, rgba(1,43,12,0) 100%)' 
            }}
          ></div>

          {/* Mobile Overlay (Fade up from bottom) */}
          <div className="absolute inset-0 z-10 block md:hidden bg-[#012B0C]/40"></div>

          {/* Content Layer (Left Side on Desktop, Top on Mobile) */}
          <div className="relative z-20 w-full md:w-[48%] p-[40px] md:p-[64px] flex flex-col justify-center order-1 md:order-none bg-[#012B0C] md:bg-transparent">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-[6px] bg-[rgba(120,253,137,0.12)] text-[#78FD89] px-[14px] h-[34px] rounded-full w-fit">
              <CommunityBadgeIcon className="w-[22px] h-[22px]" />
              <span className="font-light text-[14px]">
                Join Our Community
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-medium text-[40px] md:text-[52px] leading-[48px] md:leading-[60px] text-white max-w-[520px] mt-[32px]">
              Become a GBRU<br />Brand Ambassador
            </h2>

            {/* Description */}
            <p className="font-light text-[16px] md:text-[18px] leading-[28px] md:leading-[34px] text-[#78FD89] max-w-[430px] mt-[28px] mb-[48px]">
              Refer farmers, help them choose the right products, and earn exciting rewards as you grow the community.
            </p>

            {/* CTA Button */}
            <button className="flex items-center justify-center gap-[4px] bg-white text-[#154212] font-medium text-[16px] h-[52px] w-[160px] rounded-[12px] hover:opacity-90 transition-opacity">
              Apply Now
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Divider */}
            <div className="w-full max-w-[400px] h-[1px] bg-[rgba(255,255,255,0.12)] mt-[48px]"></div>

            {/* Features Row */}
            <div className="flex gap-[48px] md:gap-[80px] mt-[40px]">
              <div className="flex flex-col items-center gap-[12px]">
                <Gift className="w-[28px] h-[28px] text-[#78FD89]" strokeWidth={1.5} />
                <span className="font-light text-[15px] text-white">Earn Rewards</span>
              </div>
              <div className="flex flex-col items-center gap-[12px]">
                <HelpFarmersIcon className="w-[28px] h-[28px] text-[#78FD89]" />
                <span className="font-light text-[15px] text-white">Help Farmers</span>
              </div>
              <div className="flex flex-col items-center gap-[12px]">
                <TrendingUp className="w-[28px] h-[28px] text-[#78FD89]" strokeWidth={1.5} />
                <span className="font-light text-[15px] text-white">Grow Together</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
