import React from 'react';
import Link from 'next/link';
import { Search, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function SearchSection() {
  return (
    <div className="w-full max-w-[520px]">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9484]" />
        <input
          type="text"
          placeholder="Search by product name or model..."
          className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#D9E0D8] placeholder:text-[#8A9484] shadow-sm focus:outline-none focus:border-[#006B2C] focus:ring-1 focus:ring-[#006B2C] text-[16px]"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-9">
        <Button variant="secondary" className="h-[48px] px-8">
          Search Product
        </Button>
        <Link href="/warranty/register">
          <Button variant="outline" className="h-[48px] px-8 flex items-center justify-center gap-2 rounded-xl w-full sm:w-auto">
            <ShieldCheck className="w-5 h-5" />
            Register Warranty
          </Button>
        </Link>
      </div>
    </div>
  );
}
