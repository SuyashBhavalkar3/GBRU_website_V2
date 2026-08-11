"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AmbassadorHero() {
  const [userName, setUserName] = useState("Prakash");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("gbru_user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          if (userObj.first_name) {
            setUserName(userObj.first_name);
          } else if (userObj.customer_name) {
            setUserName(userObj.customer_name.split(" ")[0]);
          }
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="w-full bg-white px-4 sm:px-6 xl:px-8 py-4 xl:py-6">
      <section className="relative w-full max-w-[1400px] mx-auto overflow-hidden bg-cover bg-right xl:bg-center min-h-[450px] xl:min-h-[553px] flex items-center text-white rounded-[24px] xl:rounded-[40px]"
        style={{ backgroundImage: "url('/assets/brand.png')" }}
      >
      {/* Dark gradient overlay to make text readable */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 100%)"
        }}
      />
      
      {/* Soft dark overlay — mobile only */}
      <div
        className="block xl:hidden absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "rgba(0, 0, 0, 0.50)"
        }}
      />

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 xl:px-[64px] py-12 xl:py-0">
        <div className="flex flex-col gap-4 xl:gap-5 xl:w-[600px] h-full justify-center">
          
          {/* Top text */}
          <h3
            className="w-full text-white font-bold text-[24px] xl:text-[36px] leading-tight"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            गब्रू हो साथ , तो टेंशन की क्या बात!
          </h3>

          {/* Welcome back label */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-[28px] h-[28px] xl:w-[32px] xl:h-[32px] rounded-full bg-[#F5B800] flex items-center justify-center">
              <svg className="w-4 h-4 xl:w-5 xl:h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </div>
            <span className="text-white text-[16px] xl:text-[20px] font-medium opacity-90 tracking-wide">
              Welcome back {userName}
            </span>
          </div>

          {/* You are a GBRU Brand Ambassador */}
          <div className="flex flex-col mt-2 xl:mt-4 gap-1">
            <h2 className="text-white text-[24px] xl:text-[36px] font-bold leading-tight font-roboto">
              You are a GBRU
            </h2>
            <div className="flex items-center gap-2.5">
              <Image 
                src="/assets/broch.png" 
                alt="Brand Ambassador Badge" 
                width={44} 
                height={44} 
                className="w-8 h-8 xl:w-11 xl:h-11 object-contain drop-shadow-md"
              />
              <h1 className="text-[#F5B800] text-[32px] xl:text-[48px] font-bold leading-tight font-roboto">
                Brand Ambassador
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-white text-[15px] xl:text-[18px] font-medium leading-snug mt-2 xl:mt-4 xl:max-w-[480px]">
            Thankyou for helping farmers grow smarter and stronger with gbru
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-6 xl:mt-8">
            <a
              href="https://wa.me/919226514174"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1B8738] hover:bg-[#16702e] transition-colors text-white font-bold py-3.5 px-6 rounded-full text-[14px] xl:text-[15px] shadow-lg border border-[#2D722F]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Support
            </a>
            <button className="bg-[#FFD100] hover:bg-[#e6be00] transition-colors text-[#0F291B] font-bold py-3.5 px-8 rounded-full text-[14px] xl:text-[15px] shadow-lg">
              Ambassador Benefit
            </button>
          </div>

        </div>
      </div>
    </section>
    </div>
  );
}
