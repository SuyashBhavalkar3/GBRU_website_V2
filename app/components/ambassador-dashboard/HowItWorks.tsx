import React from 'react';
import { Star } from 'lucide-react';
import { MOCK_HOW_IT_WORKS } from './data';

export default function HowItWorks() {
  return (
    <section className="w-full my-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        
        {/* Section Heading */}
        <h2 className="font-bold text-[22px] sm:text-[24px] text-[#00A63E] font-sans mb-8">
          How it Works
        </h2>

        {/* 4-Step Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="flex flex-col items-start text-left">
              
              {/* Number Circle Badge with Linear Gradient */}
              <div
                style={{ background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' }}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[15px] font-sans mb-4 shadow-sm text-white ${
                  step.highlight ? 'ring-4 ring-[#00A63E]/20' : ''
                }`}
              >
                {step.highlight ? <Star className="w-4 h-4 text-white fill-white" /> : step.step}
              </div>

              {/* Title */}
              <h3
                className={`font-bold text-[16px] font-sans mb-1.5 ${
                  step.highlight ? 'text-[#00A63E]' : 'text-gray-900'
                }`}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-[13px] text-gray-500 font-normal leading-relaxed"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
