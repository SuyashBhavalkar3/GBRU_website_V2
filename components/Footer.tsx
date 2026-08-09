"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="w-full text-white pt-12 pb-8 lg:pt-16 lg:pb-6 px-6 lg:px-12 font-roboto border-t border-white/10 mt-auto overflow-hidden"
      style={{ background: 'linear-gradient(163.13deg, #0B5D3B 44.12%, #043321 96.94%)' }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        .footer-heading {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: 0px;
          vertical-align: middle;
        }
        .footer-text {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          color: #A3B5A6;
          line-height: 24px;
        }
        .footer-link {
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          color: #A3B5A6;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #FFB703;
        }
      `}} />

      {/* ========================================================================= */}
      {/* DESKTOP FOOTER LAYOUT (Unchanged for Web/Desktop viewports) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        <div className="max-w-[1280px] mx-auto grid grid-cols-4 gap-8 mb-16">
          {/* Column 1: Stay Updated */}
          <div className="flex flex-col gap-6">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-text whitespace-nowrap">Get latest offers, new products and farming tips.</p>
            <div className="flex w-full mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#2C5230] text-white placeholder-[#87A38D] px-4 py-3 rounded-l-md border-none outline-none focus:ring-1 focus:ring-[#FFB703] text-sm font-roboto"
              />
              <button className="bg-[#FFB703] hover:bg-[#e6a500] text-black font-bold px-6 py-3 rounded-r-md transition-colors text-sm font-roboto whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6 lg:pl-10">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/products" className="footer-link">Products</Link></li>
              <li><Link href="/categories" className="footer-link">For Farmers</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><a href="https://shoption.in" target="_blank" rel="noopener noreferrer" className="footer-link">Dealer Login</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-6">
            <h3 className="footer-heading">Support</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/help-centre" className="footer-link">FAQ</Link></li>
              <li><Link href="/help-centre" className="footer-link">Help Center</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/returns" className="footer-link">Return Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-6">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 footer-text">
                <svg className="w-5 h-5 text-[#A3B5A6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+91 9114151617</span>
              </li>
              <li className="flex items-start gap-3 footer-text">
                <svg className="w-5 h-5 text-[#A3B5A6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>contact@Shoption.in</span>
              </li>
              <li className="flex items-start gap-3 footer-text">
                <svg className="w-5 h-5 text-[#A3B5A6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <div className="flex flex-col gap-1 text-[13px] leading-tight">
                  <span><strong className="font-bold text-white">Corporate:</strong> City Vista, A Wing, 7th Fl, Office 10-12A, Kharadi, Pune 411014.</span>
                  <span><strong className="font-bold text-white">Registered:</strong> Sr. No.-133/3/9, Saswad Rd, Uruli Devachi, Haveli, Pune 412308.</span>
                  <span><strong className="font-bold text-white">Head Office:</strong> WTC, Tower 4, Level 2, Knowledge Park, Kharadi, Pune 411014.</span>
                </div>
              </li>
            </ul>
            <div className="mt-4">
              <button className="hover:opacity-80 transition-opacity">
                <Image src="/assets/msg-logo.png" alt="Chat" width={32} height={32} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1280px] mx-auto border-t border-[#315636] pt-6 flex justify-between items-center text-xs text-[#87A38D] font-roboto">
          <p>© 2025 Shopion. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <span className="text-red-500">❤️</span> for Farmers</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE FOOTER LAYOUT (Short & Sweet, matching Figma design) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden max-w-[480px] mx-auto flex flex-col gap-8 text-left">
        {/* Brand Header */}
        <div className="flex flex-col gap-3">
          <div className="relative w-[160px] h-[68px] flex-shrink-0">
            <Image
              src="/assets/gbru_header_logo.png"
              alt="GBRU Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <p className="text-zinc-200 text-sm font-roboto font-normal leading-relaxed opacity-90 max-w-[340px]">
            Cultivating innovation since 1984. The reliable partner for the modern Indian farmer.
          </p>
        </div>

        {/* Join Our Newsletter Form */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-[1.5px] text-zinc-300 font-sans uppercase">JOIN OUR NEWSLETTER</span>
          <div className="flex items-center w-full bg-[#165034]/70 border border-[#2D7351] rounded-2xl p-1.5 min-h-[56px] shadow-inner">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-zinc-400/80 px-3 py-2 outline-none border-none text-sm font-roboto"
            />
            <button className="bg-[#FFB703] hover:bg-[#e6a500] text-[#0F291B] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider line before accordions */}
        <div className="w-full h-px bg-white/10" />

        {/* Accordions */}
        <div className="flex flex-col w-full">
          {/* Quick Links Accordion */}
          <div className="border-b border-white/10 py-4">
            <button
              onClick={() => toggleSection("quick")}
              className="w-full flex justify-between items-center text-sm font-bold text-white uppercase tracking-wider font-sans focus:outline-none"
            >
              <span>Quick Links</span>
              <svg
                className={`w-4 h-4 text-zinc-300 transition-transform duration-200 ${openSection === "quick" ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSection === "quick" ? "max-h-[220px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
              <ul className="flex flex-col gap-3.5 pl-1.5">
                <li><Link href="/about" className="text-zinc-300 hover:text-white text-xs font-roboto">About Us</Link></li>
                <li><Link href="/products" className="text-zinc-300 hover:text-white text-xs font-roboto">Products</Link></li>
                <li><Link href="/categories" className="text-zinc-300 hover:text-white text-xs font-roboto">For Farmers</Link></li>
                <li><Link href="/blog" className="text-zinc-300 hover:text-white text-xs font-roboto">Blog</Link></li>
                <li><a href="https://shoption.in" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white text-xs font-roboto">Dealer Login</a></li>
              </ul>
            </div>
          </div>

          {/* Support Accordion */}
          <div className="border-b border-white/10 py-4">
            <button
              onClick={() => toggleSection("support")}
              className="w-full flex justify-between items-center text-sm font-bold text-white uppercase tracking-wider font-sans focus:outline-none"
            >
              <span>Support</span>
              <svg
                className={`w-4 h-4 text-zinc-300 transition-transform duration-200 ${openSection === "support" ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSection === "support" ? "max-h-[220px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
              <ul className="flex flex-col gap-3.5 pl-1.5">
                <li><Link href="/help-centre" className="text-zinc-300 hover:text-white text-xs font-roboto">FAQ</Link></li>
                <li><Link href="/help-centre" className="text-zinc-300 hover:text-white text-xs font-roboto">Help Center</Link></li>
                <li><Link href="/terms" className="text-zinc-300 hover:text-white text-xs font-roboto">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-zinc-300 hover:text-white text-xs font-roboto">Privacy Policy</Link></li>
                <li><Link href="/returns" className="text-zinc-300 hover:text-white text-xs font-roboto">Return Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Accordion */}
          <div className="border-b border-white/10 py-4">
            <button
              onClick={() => toggleSection("contact")}
              className="w-full flex justify-between items-center text-sm font-bold text-white uppercase tracking-wider font-sans focus:outline-none"
            >
              <span>Contact</span>
              <svg
                className={`w-4 h-4 text-zinc-300 transition-transform duration-200 ${openSection === "contact" ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSection === "contact" ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
              <ul className="flex flex-col gap-4 pl-1.5 text-zinc-300 font-roboto text-xs leading-normal">
                <li className="flex items-center gap-2">
                  <span className="font-bold text-white">Call:</span> +91 9114151617
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold text-white">Email:</span> contact@Shoption.in
                </li>
                <li className="flex flex-col gap-1.5 pt-1">
                  <span className="font-bold text-white">Corporate:</span>
                  <span>City Vista, A Wing, 7th Fl, Office 10-12A, Kharadi, Pune 411014.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons matching Figma (Medal, YouTube, Gallery) */}
        <div className="flex gap-6 py-2 items-center">
          {/* Medal/Award Icon */}
          <a href="#" className="text-zinc-200 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.75M6.75 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.75m0 0a3.75 3.75 0 117.5 0m-7.5 0h7.5M12 9a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
            </svg>
          </a>
          {/* YouTube Icon */}
          <a href="#" className="text-zinc-200 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          {/* Photo/Gallery Icon */}
          <a href="#" className="text-zinc-200 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
            </svg>
          </a>
        </div>

        {/* Footer info & Copyright */}
        <div className="flex flex-col gap-4 text-center items-center font-roboto text-xs text-[#87A38D] border-t border-[#315636] pt-6">
          <p>© 2024 GBRU AGRI-TECH PVT LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
          <p className="flex items-center gap-1">Made with <span className="text-red-500">❤️</span> for Farmers</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
