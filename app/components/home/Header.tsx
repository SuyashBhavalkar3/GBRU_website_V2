'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { ROUTES } from '../../constants/routes';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  const navLinks = [
    { name: tNav('home'), href: ROUTES.HOME },
    { name: tNav('allProducts'), href: ROUTES.PRODUCTS },
    { name: tNav('support'), href: ROUTES.SUPPORT },
    { name: tNav('contact'), href: ROUTES.CONTACT },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="w-full px-4 md:px-8 lg:px-12 h-[72px] flex items-center justify-between">
        {/* Left: Logo */}
        <Link href={ROUTES.HOME} className="flex-shrink-0 relative h-12 w-36">
          <Image
            src="/home/gbru_logo.png"
            alt="GBRU Logo"
            fill
            sizes="144px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#42493E]">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 transition-colors ${
                  isActive
                    ? 'text-[#154212] font-bold'
                    : 'hover:text-[#154212]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#154212] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Language Switcher */}
        <div className="flex items-center gap-4">
          <Button variant="primary" className="hidden sm:block py-2 px-6 rounded-[12px]">
            {tCommon('signUp')}
          </Button>
          
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#154212] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-[15px] ${
                  isActive
                    ? 'text-[#154212] font-bold border-l-4 border-[#154212] pl-3'
                    : 'text-[#42493E] font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 flex flex-col gap-3">
            <Button variant="primary" className="w-full py-2.5 rounded-[12px]">
              {tCommon('signUp')}
            </Button>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-gray-500">Language:</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
