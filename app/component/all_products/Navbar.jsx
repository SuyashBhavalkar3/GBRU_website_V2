"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomeActive = pathname === "/products" || pathname === "/";
  const isSupportActive = pathname?.startsWith("/support");
  const isContactActive = pathname?.startsWith("/contact");
  const isAmbassadorActive = pathname?.startsWith("/ambassador");
  const isAllProductsActive = pathname?.startsWith("/products/") && !isHomeActive;

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Real GORU Brand Logo */}
        <Link href="/products" className="flex items-center gap-2">
          <div className="relative h-10 w-36 sm:w-40">
            <Image
              src="/all_products/logo.png"
              alt="GORU Logo"
              fill
              priority
              sizes="160px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links matching underline active indicator */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link
            href="/products"
            className={`py-1 transition-colors ${
              isHomeActive
                ? "text-[#1c3a27] font-extrabold border-b-2 border-[#1c3a27]"
                : "hover:text-[#00a859]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`py-1 transition-colors ${
              isAllProductsActive
                ? "text-[#1c3a27] font-extrabold border-b-2 border-[#1c3a27]"
                : "hover:text-[#00a859]"
            }`}
          >
            All Products
          </Link>
          <Link
            href="/ambassador"
            className={`py-1 transition-colors ${
              isAmbassadorActive
                ? "text-[#1c3a27] font-extrabold border-b-2 border-[#1c3a27]"
                : "hover:text-[#00a859]"
            }`}
          >
            Ambassador
          </Link>
          <Link
            href="/support"
            className={`py-1 transition-colors ${
              isSupportActive
                ? "text-[#1c3a27] font-extrabold border-b-2 border-[#1c3a27]"
                : "hover:text-[#00a859]"
            }`}
          >
            Support
          </Link>
          <Link
            href="/contact"
            className={`py-1 transition-colors ${
              isContactActive
                ? "text-[#1c3a27] font-extrabold border-b-2 border-[#1c3a27]"
                : "hover:text-[#00a859]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="bg-[#008a46] hover:bg-[#00753b] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-xs cursor-pointer">
            Sign up
          </button>
          <button
            aria-label="Language selector"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-semibold py-2"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-semibold py-2"
          >
            All Products
          </Link>
          <Link
            href="/ambassador"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 ${
              isAmbassadorActive
                ? "text-[#1c3a27] font-extrabold border-l-4 border-[#1c3a27] pl-3"
                : "text-slate-700 font-semibold"
            }`}
          >
            Ambassador
          </Link>
          <Link
            href="/support"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-semibold py-2"
          >
            Support
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2 ${
              isContactActive
                ? "text-[#1c3a27] font-extrabold border-l-4 border-[#1c3a27] pl-3"
                : "text-slate-700 font-semibold"
            }`}
          >
            Contact
          </Link>
          <div className="pt-2 flex items-center gap-3">
            <button className="w-full bg-[#008a46] text-white py-2.5 rounded-full font-bold text-center shadow-xs">
              Sign up
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
