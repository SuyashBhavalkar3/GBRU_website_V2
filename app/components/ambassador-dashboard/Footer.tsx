import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-10 mt-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative h-10 w-32">
            <Image
              src="/home/gbru_logo.png"
              alt="GBRU Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-[13px] text-gray-500 font-normal">
            © 2026 GBRU. All rights reserved.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-gray-600 font-normal">
          <Link href="/legal" className="hover:text-[#1B6E33] transition-colors">
            Legal
          </Link>
          <Link href="/privacy" className="hover:text-[#1B6E33] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1B6E33] transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-[#1B6E33] transition-colors">
            Support
          </Link>
          <Link href="/contact" className="hover:text-[#1B6E33] transition-colors">
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
}
