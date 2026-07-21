'use client';

import React from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface ReferralsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onOpenAdvancedFilters?: () => void;
}

export default function ReferralsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onOpenAdvancedFilters,
}: ReferralsFilterBarProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 my-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left & Middle: Search Input + Status Select Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-grow max-w-[720px]">
        
        {/* Search Input Box */}
        <div className="relative w-full sm:w-auto flex-grow min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search farmers by name or phone..."
            className="w-full bg-gray-50/70 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A63E]/20 focus:border-[#00A63E] transition-all font-sans"
          />
        </div>

        {/* Status Dropdown Select */}
        <div className="relative w-full sm:w-[180px] shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none bg-gray-50/70 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[14px] font-medium text-[#00A63E] focus:outline-none focus:ring-2 focus:ring-[#00A63E]/20 focus:border-[#00A63E] transition-all font-sans cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="reward-earned">Reward Earned</option>
            <option value="verified">Verified</option>
            <option value="registered">Registered</option>
            <option value="pending">Pending</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#00A63E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.2]" />
        </div>

      </div>

      {/* Right: Advanced Filters Outlined Pill Button */}
      <button
        type="button"
        onClick={onOpenAdvancedFilters}
        className="w-full sm:w-auto h-[42px] px-5 rounded-full bg-white border-2 border-[#00A63E] text-[#00A63E] font-bold text-[14px] font-sans inline-flex items-center justify-center gap-2 hover:bg-[#00A63E]/5 transition-all shrink-0 cursor-pointer shadow-2xs"
      >
        <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
        <span>Advanced Filters</span>
      </button>

    </div>
  );
}
