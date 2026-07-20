import React from 'react';
import Link from 'next/link';
import { ShieldCheck, UsersRound, BookOpenText, Headset } from 'lucide-react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

const cards = [
  {
    title: 'Register Warranty',
    description: 'Protect your investment in seconds with our digital registration.',
    icon: ShieldCheck,
    bgColor: '#DFF5E7',
    iconColor: '#0B7A33',
    iconSize: 24,
    strokeWidth: 2.5,
    link: '/warranty/register',
  },
  {
    title: 'Brand Ambassador',
    description: 'Join our network of industry leaders and earn exclusive rewards.',
    icon: UsersRound,
    bgColor: '#EEF7F0',
    iconColor: '#617567',
    iconSize: 22,
    strokeWidth: 2.2,
    link: '/ambassador-application',
  },
  {
    title: 'Learn More',
    description: 'Dive deep into product specs and environmental impact studies.',
    icon: BookOpenText,
    bgColor: '#F2F4FF',
    iconColor: '#646C88',
    iconSize: 22,
    strokeWidth: 2.2,
  },
  {
    title: 'Get Support',
    description: 'Our dedicated technicians are ready to assist you 24/7.',
    icon: Headset,
    bgColor: '#FFF1F1',
    iconColor: '#D92D20',
    iconSize: 24,
    strokeWidth: 2.5,
  },
];

export default function ActionCardsSection() {
  return (
    <section className="pt-[80px] pb-[80px] bg-white">
      <div className="flex flex-col items-center mb-[48px]">
        <h2 className={`text-[#222222] font-bold text-[42px] leading-[50px] mb-[12px] text-center ${manrope.className}`}>
          What Would You Like To Do Today?
        </h2>
        <div className="w-[72px] h-[4px] bg-[#6BC48F] rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const CardContent = (
            <div 
              className="bg-white rounded-[20px] p-[24px] aspect-square shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-start justify-center hover:shadow-lg transition-shadow cursor-pointer h-full"
            >
              <div 
                className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center mb-[24px]"
                style={{ backgroundColor: card.bgColor }}
              >
                <Icon size={card.iconSize} style={{ color: card.iconColor }} strokeWidth={card.strokeWidth} />
              </div>
              <h3 className={`font-bold text-[22px] text-[#222222] mb-[12px] ${manrope.className}`}>
                {card.title}
              </h3>
              <p className="text-[#6B7280] font-normal text-[16px] leading-[28px] max-w-[220px]">
                {card.description}
              </p>
            </div>
          );

          if (card.link) {
            return (
              <Link key={index} href={card.link}>
                {CardContent}
              </Link>
            );
          }

          return <div key={index}>{CardContent}</div>;
        })}
      </div>
    </section>
  );
}
