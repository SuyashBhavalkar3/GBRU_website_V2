'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'mr', label: 'मराठी' },
];

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLanguage = LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (nextLocale: string) => {
    setIsOpen(false);
    if (nextLocale === currentLocale || isPending) return;

    // Set cookie so preference persists across visits
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="inline-flex items-center gap-2 bg-[#f0f4f0] hover:bg-[#e2ebe2] px-3.5 py-1.5 rounded-full border border-[#d6e4d6] text-[#154212] text-[13px] font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#154212] focus:ring-offset-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-[#154212] shrink-0" />
        <span>{activeLanguage.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#154212] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-32 origin-top-right rounded-2xl bg-white border border-[#d6e4d6] shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:outline-none z-50 overflow-hidden py-1">
          {LANGUAGES.map((lang) => {
            const isActive = currentLocale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => switchLocale(lang.code)}
                className={`w-full text-left px-4 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#154212] text-white'
                    : 'text-[#42493E] hover:text-[#154212] hover:bg-[#f0f4f0]'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
