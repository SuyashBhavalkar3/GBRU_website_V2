import React from 'react';
import Image from 'next/image';
import Container from '../common/Container';

export default function WarrantyHero() {
  return (
    <section className="w-full bg-[#007A1C] min-h-[520px] flex items-center py-12 md:py-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[520px]">
          
          {/* Left Side */}
          <div className="flex flex-col justify-center text-left max-w-[620px] xl:max-w-none">
            <h1 className="font-bold text-[40px] md:text-[48px] lg:text-[56px] leading-[1.2] text-white font-sans max-w-[520px]">
              Register Your Product Warranty
            </h1>
            
            <p 
              className="font-normal text-[16px] md:text-[18px] leading-[1.6] md:leading-[28px] text-[rgba(255,255,255,0.85)] mt-[20px] md:mt-[24px] max-w-[620px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Protect your investment. Register your product to enjoy faster support, genuine warranty benefits, service assistance, and future product updates.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-[16px] mt-[32px] md:mt-[40px]">
              <a 
                href="#warranty-registration-form"
                className="bg-white text-[#154212] font-semibold text-[16px] font-sans h-[48px] md:h-[52px] w-full sm:w-[200px] rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                Register Now
              </a>
              
              <button className="bg-transparent border-[2px] border-white text-white font-semibold text-[16px] font-sans h-[48px] md:h-[52px] w-full sm:w-[280px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                Download Warranty Policy
              </button>
            </div>
          </div>
          
          {/* Right Side - Collage Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center">
            <Image 
              src="/register-warranty/collage.png" 
              alt="Product Collage" 
              fill 
              className="object-contain"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
