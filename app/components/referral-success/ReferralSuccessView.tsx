import React from 'react';
import Header from './Header';
import SuccessIcon from './SuccessIcon';
import ReferralInfoCard from './ReferralInfoCard';
import ActionButtons from './ActionButtons';
import WhatHappensNext from './WhatHappensNext';

export default function ReferralSuccessPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      
      {/* 1. Top Navigation Bar */}
      <Header />

      {/* 2. Main Centered Container - Expanded Width */}
      <main className="flex-grow w-full max-w-[1050px] mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col items-center text-center">
        
        {/* Success Icon */}
        <SuccessIcon />

        {/* Heading */}
        <h1 className="font-bold text-[32px] sm:text-[42px] md:text-[48px] text-[#00A63E] font-sans leading-tight mt-3 mb-4">
          Referral Sent Successfully!
        </h1>

        {/* Subtext */}
        <p 
          className="text-[16px] sm:text-[17px] md:text-[18px] text-gray-600 font-normal leading-relaxed max-w-[720px] mx-auto mb-6"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Great job! Your invitation has been sent to the farmer. You'll be notified as soon as they register their product and your rewards are unlocked.
        </p>

        {/* Referral Info Card */}
        <ReferralInfoCard />

        {/* Action Buttons */}
        <ActionButtons />

        {/* What Happens Next Panel */}
        <WhatHappensNext />

      </main>

    </div>
  );
}
