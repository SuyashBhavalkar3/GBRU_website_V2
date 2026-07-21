import React from 'react';
import Image from 'next/image';
import { BadgeCheck, Clock } from 'lucide-react';

export default function AmbassadorHero() {
  return (
    <section className="w-full my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Illustration Card (5 of 12 columns ~42%) */}
        <div className="lg:col-span-5 w-full">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-gray-100">
            <Image
              src="/home/ambassador-review.png"
              alt="Farmer being recognized as a GORU brand ambassador with team members reviewing documents"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>

        {/* Right Column: Hero Content (7 of 12 columns ~58%) */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1B6E33]/10 text-[#1B6E33] px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide uppercase mb-4 border border-[#1B6E33]/20">
            <BadgeCheck className="w-4 h-4 text-[#1B6E33]" />
            <span>Official Ambassador Portal</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-bold text-[32px] sm:text-[40px] lg:text-[46px] text-gray-900 leading-tight font-sans mb-4">
            Application Under Review
          </h1>

          {/* Description Paragraph */}
          <p 
            className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal mb-6 max-w-[620px]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Thank you for applying to become a GBRU Brand Ambassador. Our team is carefully reviewing your application to ensure the best fit for our community.
          </p>

          {/* Expected Review Time Box */}
          <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#1B6E33] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider font-sans">
                Expected Review Time
              </span>
              <span className="text-[18px] font-bold text-gray-900 font-sans">
                24–48 Hours
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
