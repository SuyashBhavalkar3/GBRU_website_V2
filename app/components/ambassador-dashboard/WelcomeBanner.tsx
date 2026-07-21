import React from 'react';
import Image from 'next/image';
import { BadgeCheck, Calendar } from 'lucide-react';
import { MOCK_USER } from './data';

export default function WelcomeBanner() {
  return (
    <section className="w-full my-6">
      <div 
        className="w-full text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md"
        style={{ background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' }}
      >
        
        {/* Large Avatar Image */}
        <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-full overflow-hidden border-2 border-white shrink-0 shadow-md">
          <Image
            src={MOCK_USER.avatarUrl}
            alt={MOCK_USER.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Stack */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide uppercase mb-2 border border-white/20">
            <BadgeCheck className="w-4 h-4 text-white" />
            <span>{MOCK_USER.role}</span>
          </div>

          {/* Heading */}
          <h1 className="font-bold text-[26px] sm:text-[32px] md:text-[36px] text-white leading-tight font-sans">
            Congratulations, {MOCK_USER.name}!
          </h1>

          {/* Description */}
          <p 
            className="text-[14px] sm:text-[16px] text-green-50/90 font-normal leading-relaxed mt-1.5 max-w-[760px]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Your application has been approved. You are now a key partner in our mission to modernize Indian agriculture.
          </p>

          {/* Date Row */}
          <div className="flex items-center gap-2 text-[13px] font-medium text-green-100/80 mt-3">
            <Calendar className="w-4 h-4 text-green-100" />
            <span>Approval Date: {MOCK_USER.approvalDate}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
