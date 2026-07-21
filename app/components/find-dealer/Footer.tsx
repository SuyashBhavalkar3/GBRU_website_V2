import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F5F4] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col items-start gap-2">
          <div className="relative h-[50px] w-[140px]">
            <Image
              src="/home/gbru_logo.png"
              alt="GBRU Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-[14px] text-[#525252] font-normal" style={{ fontFamily: 'Geist, sans-serif' }}>
            © 2024 GBRU. All rights reserved.
          </p>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-[15px] text-[#42493E] font-normal" style={{ fontFamily: 'Geist, sans-serif' }}>
          <Link href="/legal" className="hover:text-[#009933] transition-colors">
            Legal
          </Link>
          <Link href="/privacy" className="hover:text-[#009933] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#009933] transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-[#009933] transition-colors">
            Support
          </Link>
          <Link href="/contact" className="hover:text-[#009933] transition-colors">
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
}
