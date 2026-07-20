import React from 'react';

export default function SuccessIcon() {
  return (
    <div className="relative flex items-center justify-center my-6">
      
      {/* Shield Icon SVG - Matched 1:1 to image */}
      <div className="relative z-10 w-[140px] h-[150px] drop-shadow-2xl transition-transform hover:scale-105 duration-300">
        <svg viewBox="0 0 100 110" className="w-full h-full">
          <defs>
            {/* Left half lighter green gradient */}
            <linearGradient id="leftShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6BC45C" />
              <stop offset="100%" stopColor="#4BB143" />
            </linearGradient>
            
            {/* Right half darker green gradient */}
            <linearGradient id="rightShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3E9B36" />
              <stop offset="100%" stopColor="#2D7B27" />
            </linearGradient>

            {/* Checkmark subtle shadow */}
            <filter id="checkShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#1D5218" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Clip path for Left Half */}
          <clipPath id="leftClip">
            <rect x="0" y="0" width="50" height="110" />
          </clipPath>

          {/* Clip path for Right Half */}
          <clipPath id="rightClip">
            <rect x="50" y="0" width="50" height="110" />
          </clipPath>

          {/* Outer Shield - Left Half */}
          <path
            d="M 50 3 C 68 15, 88 12, 96 24 C 96 64, 78 92, 50 103 C 22 92, 4 64, 4 24 C 12 12, 32 15, 50 3 Z"
            fill="url(#leftShieldGrad)"
            clipPath="url(#leftClip)"
          />

          {/* Outer Shield - Right Half */}
          <path
            d="M 50 3 C 68 15, 88 12, 96 24 C 96 64, 78 92, 50 103 C 22 92, 4 64, 4 24 C 12 12, 32 15, 50 3 Z"
            fill="url(#rightShieldGrad)"
            clipPath="url(#rightClip)"
          />

          {/* Inner White Outline Track */}
          <path
            d="M 50 10 C 65 19, 82 17, 89 27 C 89 59, 74 84, 50 94 C 26 84, 11 59, 11 27 C 18 17, 35 19, 50 10 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Shield - Left Half */}
          <path
            d="M 50 15 C 63 23, 78 21, 84 30 C 84 56, 70 78, 50 87 C 30 78, 16 56, 16 30 C 22 21, 37 23, 50 15 Z"
            fill="url(#leftShieldGrad)"
            clipPath="url(#leftClip)"
          />

          {/* Inner Shield - Right Half */}
          <path
            d="M 50 15 C 63 23, 78 21, 84 30 C 84 56, 70 78, 50 87 C 30 78, 16 56, 16 30 C 22 21, 37 23, 50 15 Z"
            fill="url(#rightShieldGrad)"
            clipPath="url(#rightClip)"
          />

          {/* Center Checkmark */}
          <path
            d="M 33 50 L 46 64 L 69 36"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#checkShadow)"
          />
        </svg>
      </div>

    </div>
  );
}
