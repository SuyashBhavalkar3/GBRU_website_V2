'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReferralsPaginationProps {
  totalCount?: number;
  pageSize?: number;
}

export default function ReferralsPagination({ totalCount = 48, pageSize = 5 }: ReferralsPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
      
      {/* Left: Summary Text */}
      <span className="text-[13px] font-medium text-gray-500 text-center sm:text-left">
        Showing 1-5 of {totalCount} referrals
      </span>

      {/* Right: Page Buttons */}
      <div className="flex items-center gap-2">
        
        {/* Previous Page Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page 1 */}
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          style={currentPage === 1 ? { background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' } : undefined}
          className={`w-9 h-9 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all ${
            currentPage === 1
              ? 'text-white shadow-xs'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          1
        </button>

        {/* Page 2 */}
        <button
          type="button"
          onClick={() => setCurrentPage(2)}
          style={currentPage === 2 ? { background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' } : undefined}
          className={`w-9 h-9 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all ${
            currentPage === 2
              ? 'text-white shadow-xs'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          type="button"
          onClick={() => setCurrentPage(3)}
          style={currentPage === 3 ? { background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' } : undefined}
          className={`w-9 h-9 rounded-lg font-bold text-[14px] flex items-center justify-center transition-all ${
            currentPage === 3
              ? 'text-white shadow-xs'
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          3
        </button>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(3, prev + 1))}
          disabled={currentPage === 3}
          aria-label="Next Page"
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
}
