import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import Button from '../common/Button';
import { ROUTES } from '../../constants/routes';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="w-full px-4 md:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link href={ROUTES.HOME} className="flex-shrink-0 relative h-12 w-36">
          <Image
            src="/home/gbru_logo.png"
            alt="GBRU Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#42493E]">
          <Link href={ROUTES.HOME} className="text-[#154212] relative pb-1">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#154212] rounded-full"></span>
          </Link>
          <Link href={ROUTES.PRODUCTS} className="hover:text-[#154212] transition-colors">
            All Products
          </Link>
          <Link href={ROUTES.SUPPORT} className="hover:text-[#154212] transition-colors">
            Support
          </Link>
          <Link href={ROUTES.CONTACT} className="hover:text-[#154212] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Button variant="primary" className="hidden sm:block py-2 px-6 rounded-[12px]">
            Sign up
          </Button>
          <button className="p-2 text-[#154212] hover:bg-gray-100 rounded-full transition-colors">
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
