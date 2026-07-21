import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { MOCK_REFERRAL_DETAILS } from './data';

export default function ReferralInfoCard() {
  return (
    <div className="w-full max-w-[820px] mx-auto my-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Data Columns */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-14 w-full sm:w-auto">
          
          {/* Column 1: SENT VIA */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[12px] font-bold tracking-widest text-gray-500 uppercase font-sans mb-1.5">
              SENT VIA
            </span>
            <span className="text-[20px] sm:text-[24px] font-bold text-gray-900 font-sans">
              {MOCK_REFERRAL_DETAILS.sentVia}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-12 bg-gray-200 self-center" />
          <div className="block sm:hidden w-full h-px bg-gray-100" />

          {/* Column 2: REFERENCE ID */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[12px] font-bold tracking-widest text-gray-500 uppercase font-sans mb-1.5">
              REFERENCE ID
            </span>
            <span className="text-[20px] sm:text-[24px] font-bold text-[#00A63E] font-sans">
              {MOCK_REFERRAL_DETAILS.referenceId}
            </span>
          </div>

        </div>

        {/* Far Right Decorative Badge Icon */}
        <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
          <BadgeCheck className="w-7 h-7 text-gray-300 stroke-[1.6]" />
        </div>

      </div>
    </div>
  );
}
