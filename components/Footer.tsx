import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer 
      className="w-full text-white pt-16 pb-6 px-6 lg:px-12 font-roboto border-t border-white/10 mt-auto"
      style={{ background: 'linear-gradient(163.13deg, #0B5D3B 44.12%, #043321 96.94%)' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        .footer-heading {
          font-family: 'Nimbus Sans', sans-serif;
          font-weight: 700;
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
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Column 1: Stay Updated */}
        <div className="flex flex-col gap-6">
          <h3 className="footer-heading">Stay Updated</h3>
          <p className="footer-text">Get latest offers, new products and farming tips.</p>
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
          
          {/* Chat Icon */}
          <div className="mt-4">
            <button className="hover:opacity-80 transition-opacity">
              <Image src="/assets/msg-logo.png" alt="Chat" width={32} height={32} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto border-t border-[#315636] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#87A38D] font-roboto">
        <p>© 2025 Shopion. All rights reserved.</p>
        <p className="flex items-center gap-1">Made with <span className="text-red-500">❤️</span> for Farmers</p>
      </div>
    </footer>
  );
};

export default Footer;
