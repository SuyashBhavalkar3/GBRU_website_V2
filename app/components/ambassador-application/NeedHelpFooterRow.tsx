import React from 'react';
import Link from 'next/link';
import { Headset, ArrowLeft } from 'lucide-react';

export default function NeedHelpFooterRow() {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-start gap-24 my-10">
      
      {/* Left: Support Box */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start sm:items-center gap-4 flex-grow max-w-[750px] shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-[#1B6E33]/10 text-[#1B6E33] flex items-center justify-center shrink-0">
          <Headset className="w-6 h-6" />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-[16px] text-gray-900 font-sans">
            Need Help?
          </h3>
          <p 
            className="text-[13px] text-gray-600 font-normal leading-normal"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Our support team is available 24/7 for application queries.
          </p>
          <Link
            href="/support"
            className="text-[13px] font-bold text-[#1B6E33] hover:underline transition-all mt-1 inline-flex items-center gap-1"
          >
            Contact Support →
          </Link>
        </div>
      </div>

      {/* Right: Back to Profile Dashboard Button */}
      <div className="shrink-0 flex items-center">
        <Link
          href="/"
          className="w-full sm:w-auto min-w-[320px] md:min-w-[360px] h-[56px] px-12 rounded-full bg-[#1B6E33] hover:bg-[#165a29] text-white font-semibold text-[16px] font-sans flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          Back to Profile Dashboard
        </Link>
      </div>

    </div>
  );
}
