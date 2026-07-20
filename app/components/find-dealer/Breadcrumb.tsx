import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  return (
    <div className="w-full bg-[#FAF9F5] py-4">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-[14px] text-[#6B7280]">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/support" className="hover:text-[#1A1A1A] transition-colors">
            Support
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-[#1A1A1A]">
            Find Dealer
          </span>
        </div>
      </div>
    </div>
  );
}
