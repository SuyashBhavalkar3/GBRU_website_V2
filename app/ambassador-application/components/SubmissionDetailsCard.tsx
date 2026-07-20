import React from 'react';
import { Info } from 'lucide-react';
import { SubmissionDetails } from '../data';

interface SubmissionDetailsCardProps {
  details: SubmissionDetails;
}

export default function SubmissionDetailsCard({ details }: SubmissionDetailsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="font-bold text-[20px] text-gray-900 font-sans">
            Submission Details
          </h2>
          <button 
            type="button"
            aria-label="Submission info"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100 my-2">
          
          {/* Row 1: Application ID */}
          <div className="py-3.5 flex items-center justify-between">
            <span className="text-[14px] font-medium text-gray-500 font-sans">
              Application ID
            </span>
            <span className="text-[15px] font-bold text-gray-900 font-sans">
              {details.applicationId}
            </span>
          </div>

          {/* Row 2: Submission Date */}
          <div className="py-3.5 flex items-center justify-between">
            <span className="text-[14px] font-medium text-gray-500 font-sans">
              Submission Date
            </span>
            <span className="text-[15px] font-bold text-gray-900 font-sans">
              {details.submissionDate}
            </span>
          </div>

          {/* Row 3: Current Status */}
          <div className="py-3.5 flex items-center justify-between">
            <span className="text-[14px] font-medium text-gray-500 font-sans">
              Current Status
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B6E33] animate-pulse" />
              <span className="text-[15px] font-bold text-[#1B6E33] font-sans">
                {details.status}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Italic Note Box */}
      <div className="bg-gray-50 border border-gray-200/60 rounded-xl p-4 mt-4">
        <p 
          className="text-[13px] text-gray-600 italic leading-relaxed"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          &quot;{details.note}&quot;
        </p>
      </div>

    </div>
  );
}
