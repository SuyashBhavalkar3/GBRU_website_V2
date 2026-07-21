import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function NeedHelpBanner() {
  return (
    <div className="w-full bg-[#009933] rounded-2xl p-6 sm:p-8 lg:p-10 my-12 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Content */}
        <div className="max-w-[600px]">
          <h2 className="font-bold text-[24px] sm:text-[28px] lg:text-[32px] font-sans mb-2">
            Need Help?
          </h2>
          <p 
            className="font-normal text-[14px] sm:text-[16px] text-white/90 leading-relaxed"
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
            className="h-12 px-6 rounded-full bg-white hover:bg-gray-100 text-[#009933] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 fill-current" />
            Call Support
          </button>

          {/* WhatsApp Button */}
          <button
            type="button"
            className="h-12 px-6 rounded-full bg-[#00852B] hover:bg-[#007325] border border-white/20 text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>

          {/* Find Dealer Button */}
          <button
            type="button"
            className="h-12 px-6 rounded-full bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Find Dealer
          </button>

        </div>

      </div>
    </div>
  );
}
