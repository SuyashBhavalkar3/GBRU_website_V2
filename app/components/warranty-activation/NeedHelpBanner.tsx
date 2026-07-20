'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function NeedHelpBanner() {
  return (
    <div className="w-full bg-[#009933] rounded-2xl p-6 md:p-8 mt-10 text-white shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Content */}
        <div className="max-w-[440px] text-left">
          <h3 className="font-bold text-[22px] md:text-[26px] font-sans mb-1.5">
            Need Help?
          </h3>
          <p 
            className="font-normal text-[13px] md:text-[14px] text-white/90 leading-relaxed"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Our dedicated team is ready to assist you with installation, troubleshooting, or finding your local specialist.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          
          {/* Call Support Button */}
          <button
            type="button"
            className="h-11 px-5 rounded-full bg-white hover:bg-gray-100 text-[#009933] font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            Call Support
          </button>

          {/* WhatsApp Button */}
          <button
            type="button"
            className="h-11 px-5 rounded-full bg-[#00852B] hover:bg-[#007325] border border-white/20 text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </button>

          {/* Find Dealer Link/Button */}
          <Link
            href="/find-dealer"
            className="h-11 px-5 rounded-full bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            Find Dealer
          </Link>

        </div>

      </div>
    </div>
  );
}
