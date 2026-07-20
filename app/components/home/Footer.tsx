import React from 'react';
import Image from 'next/image';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="pt-[40px] pb-[40px] bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12">
        
        {/* Support CTA Banner */}
        <div className="w-full bg-[linear-gradient(90deg,#00A63E_0%,#008C34_100%)] rounded-[28px] px-[24px] xl:px-[56px] py-[32px] xl:py-0 flex flex-col xl:flex-row xl:items-center justify-between gap-[32px] xl:gap-0 min-h-[200px] xl:h-[200px]">
          
          {/* Left Side */}
          <div className="flex flex-col justify-center xl:h-full max-w-[520px]">
            <h2 className="font-bold text-[40px] leading-[48px] text-white font-sans m-0">
              Need Help?
            </h2>
            <p 
              className="font-normal text-[16px] leading-[28px] text-white mt-[8px] max-w-[500px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Our dedicated team is ready to assist you with installation, troubleshooting, or finding your local specialist.
            </p>
          </div>

          {/* Right Side - Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-[16px] w-full xl:w-auto xl:h-full">
            {/* Button 1: Call Support */}
            <button className="flex items-center justify-center gap-[8px] bg-white text-[#154212] h-[52px] w-full sm:w-[155px] rounded-[12px] font-medium text-[16px] font-sans hover:bg-gray-50 transition-colors">
              <Phone className="w-[18px] h-[18px]" strokeWidth={2} />
              Call Support
            </button>
            
            {/* Button 2: WhatsApp */}
            <button className="flex items-center justify-center gap-[8px] bg-[#008E34] text-white h-[52px] w-full sm:w-[140px] rounded-[12px] font-medium text-[16px] font-sans hover:opacity-90 transition-opacity">
              <MessageSquare className="w-[18px] h-[18px]" strokeWidth={2} />
              WhatsApp
            </button>

            {/* Button 3: Find Dealer */}
            <button className="flex items-center justify-center gap-[8px] bg-transparent border border-white/80 text-white h-[52px] w-full sm:w-[150px] rounded-[12px] font-medium text-[16px] font-sans hover:bg-white/10 transition-colors">
              <MapPin className="w-[18px] h-[18px]" strokeWidth={2} />
              Find Dealer
            </button>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-[60px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[40px] md:gap-0">
          
          {/* Left Side: Logo & Copyright */}
          <div className="flex flex-col">
            <div className="relative h-[60px] w-[140px]">
              <Image 
                src="/home/gbru_logo.png" 
                alt="GBRU Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
            <p 
              className="font-normal text-[14px] text-[#666666] mt-[12px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              © 2024 GBRU. All rights reserved.
            </p>
          </div>

          {/* Right Side: Links */}
          <div 
            className="flex flex-wrap items-center gap-[24px] md:gap-[36px]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {['Legal', 'Privacy Policy', 'Terms of Service', 'Support', 'Contact Us'].map((link) => (
              <Link 
                key={link} 
                href="#"
                className="font-normal text-[15px] text-[#42493E] hover:text-[#00A63E] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
