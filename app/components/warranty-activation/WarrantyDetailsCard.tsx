import React from 'react';
import { WarrantyDetails } from './data';

interface WarrantyDetailsCardProps {
  details: WarrantyDetails;
}

export default function WarrantyDetailsCard({ details }: WarrantyDetailsCardProps) {
  return (
    <div className="w-full max-w-[560px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 md:px-8 my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-left">
        
        {/* Column 1: Warranty ID */}
        <div className="flex flex-col pb-4 md:pb-0 md:pr-6 justify-center">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 font-sans">
            WARRANTY ID
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-gray-900 font-sans">
            {details.warrantyId}
          </span>
        </div>

        {/* Column 2: Product */}
        <div className="flex flex-col py-4 md:py-0 md:px-6 justify-center">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 font-sans">
            PRODUCT
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-[#154212] font-sans">
            {details.product}
          </span>
        </div>

        {/* Column 3: Expiry */}
        <div className="flex flex-col pt-4 md:pt-0 md:pl-6 justify-center">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 font-sans">
            EXPIRY
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-gray-900 font-sans">
            {details.expiry}
          </span>
        </div>

      </div>
    </div>
  );
}
