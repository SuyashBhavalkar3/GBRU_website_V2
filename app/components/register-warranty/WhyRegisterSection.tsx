import React from 'react';
import Container from '../common/Container';
import { CheckCircle2, BadgeCheck, History, Wrench } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Easy Service Claims',
    description: 'Prioritized service tickets and dedicated support channels for registered users.',
  },
  {
    icon: BadgeCheck,
    title: 'Authentic & Covered',
    description: 'Ensure your product is authentic and covered by our comprehensive manufacturer warranty.',
  },
  {
    icon: History,
    title: 'Latest Updates',
    description: 'Be the first to receive firmware updates, optimization tips, and safety announcements.',
  },
  {
    icon: Wrench,
    title: 'Paperless Process',
    description: 'Paperless claim process. Your product details are already in our system for quick access.',
  },
];

export default function WhyRegisterSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24 border-t border-[#E5E7EB]">
      <Container>
        <div className="w-full flex flex-col items-center">
          
          <h2 className="font-semibold text-[24px] md:text-[32px] text-[#154212] font-sans mb-12">
            Why Register Your Warranty?
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
                    {/* The design has placeholder 'Easy Service Claims' for all, but providing contextual titles based on the descriptions */}
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="font-normal text-[14px] text-[#42493E] leading-[1.6]"
                    style={{ fontFamily: 'Geist, sans-serif' }}
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
