import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-36">
            <Image
              src="/home/gbru_logo.png"
              alt="GBRU Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#42493E]">
          <Link href="/" className="hover:text-[#009933] transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#009933] transition-colors">
            All Products
          </Link>
          <Link href="/support" className="hover:text-[#009933] transition-colors">
            Support
          </Link>
          <Link href="/contact" className="hover:text-[#009933] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Sign up Button & Language Icon */}
        <div className="flex items-center gap-4">
          <button className="bg-[#009933] hover:bg-[#00852B] text-white font-medium text-[14px] px-6 py-2.5 rounded-full transition-colors">
            Sign up
          </button>
          <button className="p-2 text-[#42493E] hover:bg-gray-100 rounded-full transition-colors">
            <Globe className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
