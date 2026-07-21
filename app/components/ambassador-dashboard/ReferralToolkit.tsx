'use client';

import React, { useState } from 'react';
import { QrCode, Copy, Share2, Download, Check } from 'lucide-react';
import { MOCK_USER } from './data';

export default function ReferralToolkit() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_USER.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full my-6">
      <div 
        className="w-full text-white rounded-[24px] p-6 sm:p-8 md:p-9 flex flex-col lg:flex-row items-center gap-7 shadow-md"
        style={{ background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' }}
      >
        
        {/* QR Box Container - 160px Square White Capsule */}
        <div className="bg-white rounded-[24px] p-4 w-[160px] h-[160px] flex items-center justify-center shrink-0 shadow-sm">
          <div className="w-full h-full rounded-[20px] border-2 border-dashed border-[#86DF89] flex items-center justify-center bg-white">
            <QrCode className="w-16 h-16 stroke-[1.6] text-[#7CD97F]" />
          </div>
        </div>

        {/* Content & Action Controls */}
        <div className="flex flex-col items-start justify-center text-left flex-grow w-full">
          
          <h2 className="font-normal text-[26px] sm:text-[28px] text-white font-sans tracking-tight mb-1 text-left">
            Your Personal Referral Toolkit
          </h2>

          <p 
            className="text-[15px] sm:text-[16px] text-white/90 font-light leading-relaxed mb-6 text-left"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Share your unique code or QR code with farmers during your site visits.
          </p>

          {/* Action Row - Copy capsule in middle with large width, Share & Download on right */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            
            {/* Dark Olive Green Code Box in Middle - Fully Expanded Width */}
            <div className="bg-[#2B4D2B] rounded-[16px] px-6 h-[54px] flex items-center justify-between gap-6 border border-white/10 font-mono text-[16px] tracking-widest text-[#CEEBCE] font-medium flex-1">
              <span>{MOCK_USER.referralCode}</span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy referral code"
                className="p-1 hover:bg-white/10 rounded-md transition-colors text-[#CEEBCE] hover:text-white shrink-0"
                title="Copy Code"
              >
                {copied ? <Check className="w-4.5 h-4.5 text-green-300" /> : <Copy className="w-4.5 h-4.5" />}
              </button>
            </div>

            {/* Solid Green Share Button */}
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'GBRU Ambassador Referral',
                    text: `Use my referral code ${MOCK_USER.referralCode} for GBRU products!`,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  handleCopy();
                }
              }}
              className="h-[54px] px-6 rounded-[16px] bg-[#009E38] hover:bg-[#008930] text-white font-medium text-[16px] font-sans inline-flex items-center justify-center gap-2.5 transition-colors shadow-sm shrink-0"
            >
              <Share2 className="w-4.5 h-4.5 stroke-[2.2]" />
              Share
            </button>

            {/* Square White Download Button */}
            <button
              type="button"
              onClick={() => alert('Referral QR Code certificate downloading...')}
              aria-label="Download QR Code"
              className="w-[54px] h-[54px] rounded-[16px] bg-white hover:bg-gray-100 text-[#008C34] flex items-center justify-center transition-colors shadow-sm shrink-0"
              title="Download QR Toolkit"
            >
              <Download className="w-5.5 h-5.5 stroke-[2.2]" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
