import React from 'react';
import { Check, RefreshCw, Clock } from 'lucide-react';
import { TimelineStep } from './data';

interface ProcessTimelineCardProps {
  steps: TimelineStep[];
}

export default function ProcessTimelineCard({ steps }: ProcessTimelineCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col h-full">
      {/* Header */}
      <h2 className="font-bold text-[20px] text-gray-900 font-sans pb-4 border-b border-gray-100 mb-6">
        Process Timeline
      </h2>

      {/* Timeline Steps Container */}
      <div className="relative flex flex-col justify-between flex-grow pl-2">
        
        {/* Connecting Vertical Line */}
        <div className="absolute top-4 left-[21px] bottom-6 w-[2px] bg-gray-200 z-0" />

        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isPending = step.status === 'pending';

          return (
            <div key={step.id} className="relative z-10 flex items-start gap-4 mb-6 last:mb-0">
              
              {/* Icon Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all ${
                  isCompleted
                    ? 'bg-[#1B6E33] text-white'
                    : isActive
                    ? 'bg-[#1B6E33] text-white ring-4 ring-[#1B6E33]/20'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted && <Check className="w-5 h-5 stroke-[3]" />}
                {isActive && <RefreshCw className="w-4 h-4 animate-spin" />}
                {isPending && <Clock className="w-4 h-4 text-gray-400" />}
              </div>

              {/* Text Content */}
              <div className="flex flex-col pt-0.5">
                <h3
                  className={`font-bold text-[16px] font-sans ${
                    isActive
                      ? 'text-[#1B6E33]'
                      : isCompleted
                      ? 'text-gray-900'
                      : 'text-gray-600'
                  }`}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-[13px] text-gray-500 font-normal leading-relaxed mt-0.5"
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
  );
}
