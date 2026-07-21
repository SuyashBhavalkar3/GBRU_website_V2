'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'हिं' },
  { code: 'mr', label: 'मराठी', short: 'मर' },
];

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === currentLocale || isPending) return;

    // Set cookie so preference persists across visits
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className={`inline-flex items-center bg-[#f0f4f0] p-1 rounded-full border border-[#d6e4d6] ${className}`}>
      <div className="flex items-center px-1.5 text-[#154212] shrink-0" title="Change Language">
        <Globe className="w-4 h-4 text-[#154212]" />
      </div>
      <div className="flex items-center gap-1">
        {LANGUAGES.map((lang) => {
          const isActive = currentLocale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => switchLocale(lang.code)}
              disabled={isPending}
              aria-label={`Switch language to ${lang.label}`}
              className={`px-3 py-1 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#154212] text-white shadow-sm'
                  : 'text-[#42493E] hover:text-[#154212] hover:bg-white/80'
              }`}
            >
              {lang.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
