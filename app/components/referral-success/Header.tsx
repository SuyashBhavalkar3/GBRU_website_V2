import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-[76px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <div className="relative h-[54px] w-[150px]">
              <Image
                src="/home/gbru_logo.png"
                alt="GBRU Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#42493E]">
          <Link href="/" className="text-[#00A63E] font-bold relative py-6">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#00A63E] rounded-full" />
          </Link>
          <Link href="/products" className="hover:text-[#00A63E] transition-colors py-6">
            All Products
          </Link>
          <Link href="/support" className="hover:text-[#00A63E] transition-colors py-6">
            Support
          </Link>
          <Link href="/contact" className="hover:text-[#00A63E] transition-colors py-6">
            Contact
          </Link>
        </nav>

        {/* Right: Logged-in User Profile & Language Selector */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[14px] text-gray-800 font-sans">
              Rajesh Kumar
            </span>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#00A63E]/30 shadow-sm shrink-0">
              <Image
                src="/rajesh-avatar.jpg"
                alt="Rajesh Kumar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Language selector"
            className="p-2 text-[#00A63E] hover:bg-gray-100 rounded-full transition-colors ml-1"
          >
            <Globe className="w-5 h-5 text-[#00A63E]" />
          </button>
        </div>

      </div>
    </header>
  );
}
