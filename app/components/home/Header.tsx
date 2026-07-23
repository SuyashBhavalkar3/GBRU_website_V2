'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { ROUTES } from '../../constants/routes';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Rajesh Kumar");
  const [userAvatar, setUserAvatar] = useState("/rajesh-avatar.jpg");
  const pathname = usePathname();
  const router = useRouter();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const authenticated = localStorage.getItem("is_authenticated") === "true";
    setIsLoggedIn(authenticated);

    if (authenticated) {
      // Immediate load from local storage cache
      const cachedName = localStorage.getItem("user_name");
      const cachedAvatar = localStorage.getItem("user_avatar");
      if (cachedName) setUserName(cachedName);
      if (cachedAvatar) setUserAvatar(cachedAvatar);

      // Async fetch to align with backend
      const fetchFreshDetails = async () => {
        const phone = localStorage.getItem("user_phone");
        if (!phone) return;
        
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

        if (apiBase && apiKey && apiSecret) {
          try {
            const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.utility.get_user_details`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
                "X-API-SECRET": apiSecret
              },
              body: JSON.stringify({
                mobile_no: Number(phone.replace(/\s/g, ""))
              })
            });

            const data = await res.json();
            if (data.message && data.message.status && data.message.data) {
              const freshName = data.message.data.Customer_name;
              const freshAvatar = data.message.data.profile_image;
              
              setUserName(freshName);
              localStorage.setItem("user_name", freshName);
              
              if (freshAvatar) {
                setUserAvatar(freshAvatar);
                localStorage.setItem("user_avatar", freshAvatar);
              }
            }
          } catch (err) {
            console.error("Error fetching user details in header:", err);
          }
        }
      };

      fetchFreshDetails();
    }
  }, []);

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
          {isLoggedIn ? (
            <Link 
              href="/profile" 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <span className="text-[15px] font-semibold text-[#42493E] group-hover:text-[#154212] transition-colors capitalize">
                {userName}
              </span>
              <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#4ADE80] transition-transform group-hover:scale-105">
                <Image
                  src={userAvatar}
                  alt={`${userName} Avatar`}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            </Link>
          ) : (
            <button 
              className="bg-[#006B2C] text-white hover:bg-[#005a25] font-medium transition-all hidden sm:block py-2 px-6 rounded-[12px] cursor-pointer"
              onClick={() => router.push('/login')}
            >
              {tCommon('signUp')}
            </button>
          )}
          
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
            {isLoggedIn ? (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Account:</span>
                <Link 
                  href="/profile" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-[15px] font-semibold text-gray-700 capitalize">{userName}</span>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#4ADE80]">
                    <Image
                      src={userAvatar}
                      alt={`${userName} Avatar`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <button 
                className="bg-[#006B2C] text-white hover:bg-[#005a25] font-medium transition-all w-full py-2.5 rounded-[12px] cursor-pointer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/login');
                }}
              >
                {tCommon('signUp')}
              </button>
            )}
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
