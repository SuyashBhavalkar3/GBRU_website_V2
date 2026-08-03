'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Manrope:wght@600&family=Roboto:wght@400;500;600&display=swap');
      `}} />
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/caroussel-2.jpg')" }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-[1100px] bg-white rounded-xl shadow-2xl overflow-hidden min-h-[650px]">
          
          {/* Left Side (Green Gradient) - Exactly same as Login */}
          <div className="w-full md:w-[45%] relative p-10 flex flex-col bg-gradient-to-b from-[#2E6F18] via-[#4F8D14] to-[#C99C15] overflow-hidden">
            {/* Logo */}
            <div className="mb-10 relative z-10">
              <Image 
                src="/assets/gbru_header_logo.png" 
                alt="GBRU Logo" 
                width={120} 
                height={50} 
                className="object-contain"
              />
            </div>

            {/* Welcome Text */}
            <h1 
              className="text-white mb-8 relative z-10"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                letterSpacing: '0px'
              }}
            >
              Welcome to GBRU - Your<br />Partner in Smarter Farming.
            </h1>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 relative z-10">
              {[
                { text: '10k+ Farmers Trust Us', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                { text: 'Secure Payments', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                { text: '24/7 Technical Support', icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-white">
                  {item.icon}
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      lineHeight: '12px',
                      letterSpacing: '0.6px'
                    }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Farmer Image */}
            <div className="mt-auto relative z-10 flex-1 flex items-end justify-center rounded-xl overflow-hidden">
              <Image 
                src="/assets/farmer.png" 
                alt="Farmer" 
                width={300} 
                height={250} 
                className="object-cover rounded-xl shadow-lg border border-white/20 w-full h-auto max-h-[260px]"
              />
            </div>
            
            {/* Subtle glow overlay for styling */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
          </div>

          {/* Right Side (OTP Form) */}
          <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center bg-white">
            <h2 
              className="text-[#1A1A1A] mb-3"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '28px',
                lineHeight: '36px'
              }}
            >
              Verify Your Number
            </h2>
            
            <p 
              className="text-[#4A4A4A] mb-1"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '21px'
              }}
            >
              Enter the 6-digit code sent to <span className="font-semibold text-black">+91 98765 43210</span>
            </p>

            <button 
              className="text-[#006B21] text-left hover:underline mb-10 w-fit"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Edit Number
            </button>

            <form className="flex flex-col">
              {/* OTP Input Fields */}
              <div className="flex gap-3 md:gap-4 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 md:w-[54px] md:h-[60px] text-center text-xl font-semibold border rounded-lg outline-none transition-all focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21] text-[#1A1A1A]"
                    style={{
                      borderColor: digit ? '#006B21' : '#E5E5E5',
                      backgroundColor: '#F9F9F9',
                      borderWidth: digit ? '2px' : '1px'
                    }}
                  />
                ))}
              </div>

              <button 
                type="button"
                className="w-full text-white rounded-lg shadow-[0_4px_12px_rgba(0,107,33,0.25)] transition-opacity hover:opacity-90 flex items-center justify-center mb-4"
                style={{
                  height: '56px',
                  background: '#006B21',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '24px'
                }}
              >
                Verify & Login
              </button>

              <div className="text-center w-full mb-8">
                <p 
                  className="text-[#6B7280]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '21px'
                  }}
                >
                  OTP valid for 10 min
                </p>
              </div>

              <div className="text-center w-full">
                <p 
                  className="text-[#6B7280]"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                    fontSize: '15px'
                  }}
                >
                  Didn't receive the code? <span className="text-[#9CA3AF]">Resend OTP in 00:24</span>
                </p>
              </div>
            </form>

            <div className="mt-12 pt-6 border-t border-[#D9D9D9] flex justify-center items-center w-full">
              <a 
                href="#" 
                className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#006B21] transition-colors" 
                style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help Center
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Otp;
