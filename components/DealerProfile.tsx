'use client';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const DealerProfile = () => {
  const router = useRouter();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700&family=Roboto:wght@400;500;700&display=swap');
      `}} />
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center font-inter"
        style={{ backgroundImage: "url('/assets/caroussel-2.jpg')" }}
      >
        <div className="w-full max-w-[1100px] bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[650px]">
          
          {/* Left Side (Green Gradient) */}
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

          {/* Right Pane (Content) */}
          <div className="w-full md:w-[55%] p-10 lg:p-14 flex flex-col justify-center items-start">
            
            <div className="bg-[#e4efe8] text-[#34784a] text-[11px] font-bold px-3 py-1.5 rounded-full w-fit flex items-center gap-1.5 translate-y-5 mb-1 uppercase tracking-wide z-10">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Dealer Profile
            </div>
            
            <h2 
              className="text-[#1a1a1a] mb-2 flex items-end"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '32px', lineHeight: '41.6px', letterSpacing: '0px', width: '400px', height: '72px' }}
            >
              Dealer Account Detected
            </h2>
            <p className="text-[#0e7c37] font-semibold text-[17px] mb-4">
              This platform is for farmers.
            </p>
            
            <p className="text-[#596472] mb-8 leading-[1.6] text-[15px] pr-4 max-w-[420px]">
              Dealers can continue through the dedicated Dealer Portal to manage orders, track inventory, and access technical support documentation.
            </p>
            
            <button 
              onClick={() => window.location.href = 'https://play.google.com/store/apps/details?id=com.shoption.app'}
              className="bg-[#1F4125] hover:bg-[#152e19] text-white text-[15px] font-semibold py-3.5 px-6 rounded-lg shadow-sm transition-colors w-full max-w-[420px] flex items-center justify-center gap-2 mb-8"
            >
              Go to Dashboard
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
            <div className="border-t border-gray-200 pt-6 w-full max-w-[420px] mt-6">
              <p className="text-[#596472] text-[11px] font-bold uppercase tracking-widest mb-5">
                ACCESS DEALER PLATFORM
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <a href="#" className="hover:opacity-80 transition-opacity bg-[#151515] text-white rounded-md overflow-hidden flex items-center h-[42px] px-3 w-[150px] justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 49.7-.8 90.5-85 111.4-123.4-38.3-15.6-70.5-51.2-70.5-87.2zM208 81c15-20.9 25.8-49.8 23-79-24.8 1.1-55.7 17.3-72.2 38.3-14 17.7-26.1 47.7-22.3 76.2 27.8 2.2 56.5-14.6 71.5-35.5z"/></svg>
                  <div className="flex flex-col items-start"><span className="text-[8px] leading-none mb-0.5">Download on the</span><span className="text-[13px] font-semibold leading-none">App Store</span></div>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity bg-[#151515] text-white rounded-md overflow-hidden flex items-center h-[42px] px-3 w-[150px] justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 512 512"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                  <div className="flex flex-col items-start"><span className="text-[8px] leading-none mb-0.5">GET IT ON</span><span className="text-[13px] font-semibold leading-none">Google Play</span></div>
                </a>
              </div>
              
              <p className="text-[#596472] text-[13px] text-center">
                Need help? <a href="#" className="text-[#0e7c37] font-bold hover:underline">Contact Support</a>
              </p>
            </div>
            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DealerProfile;
