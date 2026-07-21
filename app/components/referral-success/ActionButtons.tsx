'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { ROUTES } from '@/app/constants/routes';

export default function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 my-8 w-full max-w-[820px] mx-auto px-4">
      
      {/* Primary Pill Button: Invite Another Farmer */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.location.href = ROUTES.AMBASSADOR_DASHBOARD;
          }
        }}
        style={{ background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' }}
        className="w-full sm:w-auto h-[54px] px-8 rounded-full text-white font-medium text-[16px] font-sans inline-flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 transition-all cursor-pointer"
      >
        <span>Invite Another Farmer</span>
        <UserPlus className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* Secondary Outlined Pill Button: Back to Dashboard */}
      <Link
        href={ROUTES.AMBASSADOR_DASHBOARD}
        className="w-full sm:w-auto h-[54px] px-8 rounded-full bg-white border border-[#00A63E] text-[#00A63E] font-medium text-[16px] font-sans inline-flex items-center justify-center hover:bg-[#00A63E]/5 transition-all cursor-pointer shadow-2xs"
      >
        Back to Dashboard
      </Link>

    </div>
  );
}
