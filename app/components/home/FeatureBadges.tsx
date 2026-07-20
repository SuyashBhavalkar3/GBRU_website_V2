import React from 'react';


export default function FeatureBadges() {
  return (
    <div className="flex flex-wrap gap-6 items-center text-[15px] font-medium text-[#42493E]">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#006B2C" stroke="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Official Support</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#006B2C" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10,8 16,12 10,16" fill="white" />
        </svg>
        <span>Installation Videos</span>
      </div>
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#006B2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12a9 9 0 0 1 18 0" />
          <rect x="2" y="12" width="3" height="6" rx="1" />
          <rect x="19" y="12" width="3" height="6" rx="1" />
          <path d="M20.5 18v2a2 2 0 0 1-2 2h-4" />
          <circle cx="9" cy="13" r="1" fill="#006B2C" stroke="none" />
          <circle cx="15" cy="13" r="1" fill="#006B2C" stroke="none" />
        </svg>
        <span>Farmer Assistance</span>
      </div>
    </div>
  );
}
