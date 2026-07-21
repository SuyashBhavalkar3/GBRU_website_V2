'use client';

import React from 'react';
import SuccessIcon from './SuccessIcon';
import WarrantyDetailsCard from './WarrantyDetailsCard';
import ActionButtons from './ActionButtons';
import NeedHelpBanner from './NeedHelpBanner';
import { MOCK_WARRANTY_DATA } from './data';

export default function WarrantyActivation() {
  return (
    <main className="min-h-screen bg-[#F0EEE6] py-8 md:py-16 px-4 flex items-center justify-center font-sans">
      
      {/* Outer Bordered Canvas Frame */}
      <div className="w-full max-w-[840px] bg-[#FAF9F5] border border-gray-800 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Main Content Column */}
        <div className="w-full max-w-[720px] mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Success Shield Icon & Confetti */}
          <SuccessIcon />

          {/* Heading */}
          <h1 className="font-bold text-[30px] sm:text-[36px] md:text-[40px] text-[#154212] font-sans leading-tight mb-3">
            Warranty Activated Successfully
          </h1>

          {/* Subtext */}
          <p 
            className="font-normal text-[14px] sm:text-[16px] text-gray-600 max-w-[500px] mx-auto leading-relaxed mb-4"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Your Seeder Pro X is now protected under our full enterprise coverage. High-performance cultivation starts with peace of mind.
          </p>

          {/* Warranty Details Card */}
          <WarrantyDetailsCard details={MOCK_WARRANTY_DATA} />

          {/* Action Buttons & Back Link */}
          <ActionButtons />

          {/* Need Help? Banner */}
          <NeedHelpBanner />

        </div>

      </div>

    </main>
  );
}
