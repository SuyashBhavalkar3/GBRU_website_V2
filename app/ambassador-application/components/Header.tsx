import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, User } from 'lucide-react';
import { MOCK_USER } from '../data';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[76px] flex items-center justify-between">
        
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
          <Link href="/" className="text-[#1B6E33] font-bold relative py-6">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1B6E33] rounded-full" />
          </Link>
          <Link href="/products" className="hover:text-[#1B6E33] transition-colors py-6">
            All Products
          </Link>
          <Link href="/support" className="hover:text-[#1B6E33] transition-colors py-6">
            Support
          </Link>
          <Link href="/contact" className="hover:text-[#1B6E33] transition-colors py-6">
            Contact
          </Link>
        </nav>

        {/* Right: Logged-in User Profile & Language Selector */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[14px] text-gray-800 font-sans">
              {MOCK_USER.name}
            </span>
            <div className="w-9 h-9 rounded-full bg-[#1B6E33]/10 text-[#1B6E33] flex items-center justify-center font-bold text-[14px] border border-[#1B6E33]/20">
              <User className="w-5 h-5 text-[#1B6E33]" />
            </div>
          </div>

          <button
            type="button"
            aria-label="Language selector"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-1"
          >
            <Globe className="w-5 h-5 text-gray-600" />
          </button>
        </div>

      </div>
    </header>
  );
}
