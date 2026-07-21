import React from 'react';
import { Check, Star, Medal, Gem } from 'lucide-react';
import { MOCK_TIERS, Tier } from './data';

const getTierIcon = (iconName: Tier['iconName'], isReached: boolean) => {
  if (isReached) {
    return <Check className="w-4.5 h-4.5 text-white stroke-[2.5]" />;
  }
  
  const iconClass = 'w-4.5 h-4.5 text-[#A0A0A0] stroke-[1.6]';
  switch (iconName) {
    case 'star':
      return <Star className={iconClass} />;
    case 'medal':
      return <Medal className={iconClass} />;
    case 'gem':
      return <Gem className={iconClass} />;
    default:
      return <Star className={iconClass} />;
  }
};

export default function JourneyProgress() {
  return (
    <section className="w-full my-6">
      <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-6 sm:p-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-normal text-[24px] sm:text-[26px] text-gray-900 font-sans">
            Your Journey
          </h2>
          <span className="text-[14px] text-gray-600 font-sans">
            3 more to reach <span className="text-[#00A63E] font-medium">Silver</span>
          </span>
        </div>

        {/* Horizontal Progress Track Container */}
        <div className="relative w-full px-2 sm:px-6 py-2">
          
          {/* Base Gray Track Line */}
          <div className="absolute top-[20px] left-6 right-6 h-[4px] bg-[#EBEBEB] z-0 rounded-full" />

          {/* Active Green Progress Line extending ~30% towards Silver */}
          <div 
            className="absolute top-[20px] left-6 h-[4px] bg-[#00A63E] z-0 rounded-full transition-all duration-500" 
            style={{ width: '28%' }}
          />

          {/* Tier Stops Grid */}
          <div className="relative z-10 flex items-center justify-between">
            {MOCK_TIERS.map((tier) => {
              const isReached = tier.status === 'reached' || tier.status === 'current';

              return (
                <div key={tier.id} className="flex flex-col items-center">
                  
                  {/* Circle Icon Badge */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isReached
                        ? 'bg-[#00A63E] shadow-sm'
                        : 'bg-[#F4F4F4] border border-[#E0E0E0] text-[#A0A0A0]'
                    }`}
                  >
                    {getTierIcon(tier.iconName, isReached)}
                  </div>

                  {/* Tier Label */}
                  <span
                    className={`text-[13px] font-sans mt-2.5 ${
                      isReached ? 'text-[#00A63E] font-medium' : 'text-[#A0A0A0] font-normal'
                    }`}
                  >
                    {tier.name}
                  </span>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
