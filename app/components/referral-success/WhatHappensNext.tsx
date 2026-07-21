import React from 'react';
import { TrendingUp } from 'lucide-react';
import { MOCK_NEXT_STEPS } from './data';

export default function WhatHappensNext() {
  return (
    <section className="w-full max-w-[1000px] mx-auto my-8">
      <div className="bg-[#F3F4F6] rounded-2xl p-7 sm:p-10 border border-gray-200/60">
        
        {/* Header Row */}
        <div className="flex items-center gap-3 mb-9">
          <TrendingUp className="w-6 h-6 text-[#00A63E] stroke-[2.5]" />
          <h2 className="font-bold text-[22px] sm:text-[26px] text-[#00A63E] font-sans">
            What happens next?
          </h2>
        </div>

        {/* 3-Step Process Track */}
        <div className="relative w-full">
          
          {/* Base Horizontal Connecting Line spanning from center of Step 1 to center of Step 3 */}
          <div className="hidden sm:block absolute top-[22px] left-[22px] right-[22px] h-[2px] bg-gray-300/80 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative z-10">
            {MOCK_NEXT_STEPS.map((step) => {
              const isActive = step.status === 'active';
              
              // Alignment mapping: Step 1 left corner, Step 2 middle, Step 3 right corner
              const alignmentClass = 
                step.step === 1 
                  ? 'sm:items-start sm:text-left' 
                  : step.step === 2 
                  ? 'sm:items-center sm:text-center' 
                  : 'sm:items-end sm:text-right';

              return (
                <div key={step.step} className={`flex sm:flex-col items-start gap-4 sm:gap-0 ${alignmentClass}`}>
                  
                  {/* Step Number Circle Badge */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[16px] font-sans shrink-0 sm:mb-4 shadow-2xs ${
                      isActive
                        ? 'bg-[#00A63E] text-white ring-4 ring-[#00A63E]/20'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Step Title & Description Container */}
                  <div className={`flex flex-col ${step.step === 1 ? 'sm:text-left' : step.step === 2 ? 'sm:text-center' : 'sm:text-right sm:items-end'}`}>
                    <h3 className="font-bold text-[16px] sm:text-[17px] text-gray-900 font-sans mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p 
                      className="text-[13px] sm:text-[14px] text-gray-600 font-normal leading-relaxed sm:max-w-[260px]"
                      style={{ fontFamily: 'Geist, sans-serif' }}
                    >
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
