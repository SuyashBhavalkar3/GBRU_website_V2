'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '../common/Container';
import { CheckCircle2, BadgeCheck, History, Wrench } from 'lucide-react';

export default function WhyRegisterSection() {
  const tWar = useTranslations('warranty');

  const benefits = [
    {
      icon: CheckCircle2,
      title: tWar('benefit1Title'),
      description: tWar('benefit1Desc'),
    },
    {
      icon: BadgeCheck,
      title: tWar('benefit2Title'),
      description: tWar('benefit2Desc'),
    },
    {
      icon: History,
      title: tWar('benefit3Title'),
      description: tWar('benefit3Desc'),
    },
    {
      icon: Wrench,
      title: tWar('benefit4Title'),
      description: tWar('benefit4Desc'),
    },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24 border-t border-[#E5E7EB]">
      <Container>
        <div className="w-full flex flex-col items-center">
          
          <h2 className="font-semibold text-[24px] md:text-[32px] text-[#154212] font-sans mb-12">
            {tWar('whyRegisterHeading')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-[48px] h-[48px] rounded-full bg-[#009933] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-[16px] md:text-[18px] text-[#154212] font-sans mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="font-normal text-[14px] text-[#42493E] leading-[1.6]"
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
