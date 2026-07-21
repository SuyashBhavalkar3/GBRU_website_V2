'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Seeder',
    description: 'Precision sowing tools for diverse crop types.',
    image: '/home/seeder.jpg'
  },
  {
    title: 'Irrigation',
    description: 'Efficient water management for optimal farming.',
    image: '/home/irrigation.jpg'
  },
  {
    title: 'Controllers',
    description: 'Automated systems for smart farm operations.',
    image: '/home/controllers.jpg'
  },
  {
    title: 'Farm Equipment',
    description: 'Heavy-duty machinery for the toughest tasks.',
    image: '/home/farm-equipment.jpg'
  },
  {
    title: 'Accessories',
    description: 'Essential add-ons and replacement components.',
    image: '/home/accessories.jpg'
  }
];

export default function ProductCategoriesSection() {
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');

  return (
    <section className="pt-[80px] pb-[80px] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-[48px]">
        <h2 className="font-bold text-[40px] leading-[48px] text-[#154212]">
          {tHome('browseCategories')}
        </h2>
        <Link 
          href="/products"
          className="flex items-center gap-[6px] font-medium text-[16px] text-[#006B2C] hover:underline cursor-pointer"
        >
          {tCommon('viewAllCategories')} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[24px]">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="bg-white border border-[#E8ECE8] rounded-[20px] p-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square rounded-[14px] overflow-hidden mb-[16px] shrink-0">
              <Image 
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </div>
            
            {/* Content Area */}
            <div className="flex flex-col flex-grow">
              <h3 className="font-bold text-[20px] text-[#154212] mb-1">
                {category.title}
              </h3>
              <p className="font-normal text-[15px] leading-[26px] text-[#42493E]">
                {category.description}
              </p>
              
              {/* Spacer pushes button to bottom */}
              <div className="flex-grow"></div>
              
              {/* Bottom Button */}
              <Link 
                href="/products"
                className="w-full h-[44px] mt-[16px] bg-white border border-[#DCE5DC] rounded-full flex items-center justify-center gap-[8px] font-medium text-[15px] text-[#006B2C] hover:bg-gray-50 transition-colors"
              >
                {tCommon('viewProducts')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
