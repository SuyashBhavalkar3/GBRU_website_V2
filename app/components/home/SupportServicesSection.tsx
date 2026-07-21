'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BadgeCheck, BriefcaseMedical, NotebookPen, Headset } from 'lucide-react';

export default function SupportServicesSection() {
  const tHome = useTranslations('home');

  const services = [
    {
      title: tHome('installGuidesTitle'),
      description: tHome('installGuidesDesc'),
      icon: NotebookPen,
    },
    {
      title: tHome('regWarrantyTitle'),
      description: tHome('regWarrantyDesc'),
      icon: BadgeCheck,
      link: '/warranty/register',
    },
    {
      title: tHome('troubleshootingTitle'),
      description: tHome('troubleshootingDesc'),
      icon: BriefcaseMedical,
    },
    {
      title: tHome('expertSupportTitle'),
      description: tHome('expertSupportDesc'),
      icon: Headset,
      link: '/support',
    },
  ];

  return (
    <section className="py-[64px] bg-[#4A4A4A]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const CardItem = (
              <div 
                className="bg-white rounded-[20px] p-[40px] w-full max-w-[278px] h-[310px] mx-auto flex flex-col items-center text-center shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Icon Circle */}
                <div className="w-[60px] h-[60px] rounded-full bg-[#DDF8E6] flex items-center justify-center mb-[28px] shrink-0">
                  <Icon className="w-[24px] h-[24px] text-[#00A63E]" strokeWidth={2} />
                </div>
                
                {/* Title */}
                <div className="min-h-[60px] flex items-center justify-center w-full mb-[12px]">
                  <h3 className="font-bold text-[24px] leading-[30px] text-[#00A63E] font-sans text-center">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p 
                  className="font-semibold text-[16px] leading-[34px] text-[#42493E] max-w-[220px] text-center mx-auto"
                >
                  {service.description}
                </p>
              </div>
            );

            if (service.link) {
              return (
                <Link key={index} href={service.link} className="flex justify-center">
                  {CardItem}
                </Link>
              );
            }

            return <div key={index} className="flex justify-center">{CardItem}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
