"use client";

import React from "react";

export default function HelpSupportBanner() {
  return (
    <div className="w-full bg-[#F9F9FA] py-10 px-4 md:px-8 mt-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left text */}
        <div>
          <h2 className="text-2xl md:text-[28px] font-medium text-[#006B21] mb-2">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-base text-[#006B21]/80 font-normal">
            Our agriculture specialists are ready to guide you to the perfect tool for your farm.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+919226514174"
            className="flex items-center gap-2 bg-[#006B21] hover:bg-[#005a1b] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-base shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Expert Call
          </a>

          <a
            href="https://wa.me/919226514174"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-base shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 8h8"/>
              <path d="M8 12h8"/>
              <path d="M8 16h4"/>
            </svg>
            WhatsApp Support
          </a>
        </div>

      </div>
    </div>
  );
}
