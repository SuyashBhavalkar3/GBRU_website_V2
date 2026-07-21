'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, ArrowLeft } from 'lucide-react';

export default function ActionButtons() {
  return (
    <div className="flex flex-col items-center gap-5 my-6 w-full">
      {/* 2 Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[500px]">
        
        {/* Download Certificate Button */}
        <button
          type="button"
          onClick={() => console.log('Downloading certificate...')}
          className="w-full sm:w-auto h-[48px] px-6 rounded-full bg-[#009933] hover:bg-[#00852B] text-white font-semibold text-[15px] font-sans flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          Download Certificate
        </button>

        {/* View My Warranty Button */}
        <button
          type="button"
          onClick={() => console.log('Viewing warranty...')}
          className="w-full sm:w-auto h-[48px] px-6 rounded-full bg-white border-2 border-[#009933] text-[#009933] hover:bg-[#009933]/5 font-semibold text-[15px] font-sans flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          View My Warranty
        </button>

      </div>

      {/* Back to Home Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#154212] hover:underline transition-all mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
