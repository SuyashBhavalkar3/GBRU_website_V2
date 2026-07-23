"use client";

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-[520px]">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9484]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by product name or model..."
          className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#D9E0D8] placeholder:text-[#8A9484] shadow-sm focus:outline-none focus:border-[#006B2C] focus:ring-1 focus:ring-[#006B2C] text-[16px]"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-9">
        <Button variant="secondary" className="h-[48px] px-8 cursor-pointer" onClick={handleSearch}>
          Search Product
        </Button>
        <button 
          onClick={() => router.push('/warranty/register')}
          className="h-[48px] px-8 flex items-center justify-center gap-2 rounded-xl w-full sm:w-auto border border-[#006B2C] text-[#006B2C] hover:bg-emerald-50/50 transition-all font-medium text-sm cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" />
          Register Warranty
        </button>
      </div>
    </div>
  );
}
