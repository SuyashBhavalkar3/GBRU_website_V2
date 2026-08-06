"use client";

import React from "react";

export default function HelpSupportBanner() {
  return (
    <div className="w-full bg-white border-t border-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left text */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#006B21] tracking-tight mb-2">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-sm md:text-base text-zinc-600 font-medium">
            Our agriculture specialists are ready to guide you to the perfect tool for your farm.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+919226514174"
            className="flex items-center gap-2 bg-[#006B21] hover:bg-[#005a1b] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-md"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Expert Call
          </a>

          <a
            href="https://wa.me/919226514174"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-md"
          >
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.885.522 3.654 1.43 5.176l-1.408 5.147 5.27-1.385C8.75 21.577 10.323 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 1.818c4.52 0 8.182 3.662 8.182 8.182 0 4.52-3.662 8.182-8.182 8.182-1.503 0-2.912-.41-4.133-1.12l-.296-.172-3.072.807.82-2.998-.188-.3C4.425 15.118 4 13.613 4 12c0-4.52 3.662-8.182 8.182-8.182z" />
            </svg>
            WhatsApp Support
          </a>
        </div>

      </div>
    </div>
  );
}
