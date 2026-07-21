import React from 'react';

export default function SuccessIcon() {
  return (
    <div className="flex justify-center my-6">
      <div 
        className="w-[135px] h-[135px] rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #00A63E 0%, #008C34 100%)' }}
      >
        <svg
          className="w-[74px] h-[74px] text-white overflow-visible"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Envelope Body Outline with Bottom-Right Cutout */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M4 19h7 M4 19a2 2 0 01-2-2V7.5a2 2 0 012-2h16a2 2 0 012 2.5V13"
          />
          {/* V-Flap from Top-Left to Center to Top-Right */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
            d="M4 7.5l8 5.5 8-5.5"
          />
          {/* Overlapping Bold Checkmark on Bottom-Right */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.2"
            d="M12.5 18l3.5 3.5 6.5-6.5"
          />
        </svg>
      </div>
    </div>
  );
}
