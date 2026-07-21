'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CheckCircle2, Network } from 'lucide-react';
import SearchSection from './SearchSection';
import FeatureBadges from './FeatureBadges';

export default function HeroSection() {
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 pt-10 pb-16 items-start">
      {/* Left Content */}
      <div className="flex flex-col max-w-[520px]">
        <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-bold text-[#154212] mb-6">
          {tHome('heroTitle')}
        </h1>
        <p className="text-[18px] leading-[32px] text-[#42493E] mb-7 max-w-[520px]">
          {tHome('heroDesc')}
        </p>
        
        <SearchSection />
        <FeatureBadges />
      </div>

      {/* Right Side Image & Overlay */}
      <div className="relative w-full aspect-[16/9] max-w-[560px] lg:ml-auto mt-8 lg:mt-12 lg:mr-12">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden">
          <Image
            src="/home/farmer_img.png"
            alt="Farmer using mobile app"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
            priority
          />
        </div>

        {/* Feature Card Overlay */}
        <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-12 bg-white/70 backdrop-blur-md rounded-[16px] p-4 shadow-xl z-10 w-[240px] border border-white/40">
          <h3 className="text-[#154212] font-semibold text-[14px] flex items-center gap-2 mb-3">
            <Network className="w-4 h-4 text-[#006B2C]" />
            Key Ecosystem Features
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Installation Videos" },
              { name: tHome('regWarrantyTitle'), link: "/warranty/register" },
              { name: tHome('ambassadorTitle'), link: "/ambassador" },
              { name: tCommon('needHelp'), link: "/support" }
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-[13px] font-medium text-[#42493E]">
                <CheckCircle2 className="w-4 h-4 text-[#006B2C] shrink-0" />
                {item.link ? (
                  <Link href={item.link} className="hover:text-[#006B2C] hover:underline transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <span>{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
