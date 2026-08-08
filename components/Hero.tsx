"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [carouselIndex, setCarouselIndex] = useState(1); // 0, 1, 2

  const carouselImages = [
    "/assets/caroussel-2.jpg", // Left
    "/assets/caroussel-3.jpg", // Center (Product Poster)
    "/assets/caroussel-1.jpg", // Right
  ];

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  // Get index positions for left, center, right styling
  const getPositionClass = (idx: number) => {
    const relativeIndex = (idx - carouselIndex + 3) % 3;
    if (relativeIndex === 0) return "left";
    if (relativeIndex === 1) return "center";
    return "right";
  };

  const features = [
    {
      title: "Durable Build",
      desc: "Long lasting performance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#162A5A] w-6 h-6 flex-shrink-0"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      ),
    },
    {
      title: "High Performance",
      desc: "More efficiency, better output",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#162A5A] w-6 h-6 flex-shrink-0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      ),
    },
    {
      title: "Easy Maintenance",
      desc: "Simple servicing, low maintenance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#162A5A] w-6 h-6 flex-shrink-0"><line x1="21" y1="8" x2="14" y2="8"></line><line x1="10" y1="8" x2="3" y2="8"></line><line x1="21" y1="16" x2="12" y2="16"></line><line x1="8" y1="16" x2="3" y2="16"></line><line x1="14" y1="5" x2="14" y2="11"></line><line x1="8" y1="13" x2="8" y2="19"></line></svg>
      ),
    },
    {
      title: "Farmer Trusted",
      desc: "Used by thousands of happy farmers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#162A5A] w-6 h-6 flex-shrink-0"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
      ),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-cover bg-center min-h-[553px] py-10 lg:py-0 flex items-center text-white"
      style={{ backgroundImage: "url('/assets/home_hero_bg.png')" }}
    >
      {/* Backdrop blur overlay for the background image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backdropFilter: "blur(6px)" }}
      />
      {/* Soft white overlay descending from left to right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.05) 100%)"
        }}
      />

      {/* Left side glow filter (dissolved radial gradient) */}
      <div
        className="absolute z-0 pointer-events-none hidden lg:block"
        style={{
          width: "550px",
          height: "650px",
          top: "-50px",
          left: "-150px",
          background: "radial-gradient(circle at 40% 50%, rgba(248, 240, 218, 0.7) 0%, rgba(227, 209, 179, 0.3) 55%, rgba(255, 255, 255, 0) 100%)",
          opacity: 0.6,
          filter: "blur(60px)",
        }}
      />

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (Unchanged for Web/Desktop viewports) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-[64px]">
        <div className="grid grid-cols-12 gap-8 items-center h-full">

          {/* Left Column (Hero Content) */}
          <div className="col-span-6 flex flex-col justify-between gap-8 h-[466px]">
            {/* Top Text Content */}
            <div className="space-y-2.5 font-roboto">
              <h3 
                className="w-full lg:w-[564px] lg:max-w-[576px] flex items-center flex-wrap gap-1.5"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '40px',
                  lineHeight: '56px',
                  letterSpacing: '-0.96px',
                  verticalAlign: 'middle'
                }}
              >
                <span className="text-[#2D722F]">गब्रू हो साथ</span> <span className="text-[#2D722F]">,</span> <span className="text-white">तो टेंशन की क्या बात !</span>
              </h3>
              <h1 className="text-3xl sm:text-4xl lg:text-[43.36px] font-semibold leading-tight tracking-normal text-[#0F291B] font-roboto">
                Right tool.<br />
                <span 
                  className="bg-clip-text text-transparent bg-cover font-semibold inline-block mt-1"
                  style={{ backgroundImage: "linear-gradient(90deg, #2D722F 0%, #768F0F 100%)" }}
                >
                  Better Farming.
                </span>
              </h1>
              <p className="text-[#0F291B]/80 max-w-lg font-roboto font-normal text-[15px] lg:text-[18px] leading-[22px] lg:leading-[28px] tracking-normal">
                High-performance machinery designed for the modern<br />farmer. Durable, efficient, and backed by pan-India support.
              </p>
            </div>

            {/* Bottom Actions Content */}
            <div className="space-y-5 mt-6 lg:mt-0">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link href="/all_products" className="bg-[#0D9740] hover:bg-[#0b8036] text-white font-roboto font-bold text-[14px] leading-none w-full sm:w-[185px] h-[52px] sm:h-[58px] min-h-[48px] rounded-[32px] px-8 flex items-center justify-center transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-lg">
                  Explore Products
                </Link>
                <a 
                  href="https://www.youtube.com/playlist?list=PLHXlLG4lLpM1RC3vTHQf8iDX5jAI707Jm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-[7.99px] bg-white border border-[#2B7832] text-[#2B7832] font-roboto font-bold text-[14px] leading-none w-full sm:w-[185px] h-[52px] sm:h-[58px] min-h-[48px] rounded-[32px] px-8 transition-all duration-200 cursor-pointer shadow-md"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#2B7832" strokeWidth="2.5" fill="none" />
                    <path d="M10 8.5V15.5L15.5 12L10 8.5Z" fill="#2B7832" />
                  </svg>
                  Watch Demo
                </a>
              </div>

              {/* Feature Pill Card (Capsule bottom left) */}
              <div className="bg-[#EAE8E0] text-[#162A5A] rounded-[50px] shadow-lg w-full lg:w-[620px] lg:ml-[-20px] flex flex-col sm:flex-row gap-4 sm:gap-4 lg:gap-[18px] px-5 py-4 lg:px-6 lg:py-5 items-start sm:items-center justify-between z-20 relative">
                {features.map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 min-w-0 w-full sm:w-auto">
                    <div className="flex-shrink-0 flex items-center justify-center mt-0.5">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <h4 
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '12px',
                          lineHeight: '16px',
                          letterSpacing: '0px',
                          verticalAlign: 'middle',
                          color: '#011F4A'
                        }}
                        className="whitespace-nowrap"
                      >
                        {item.title}
                      </h4>
                      <p 
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '15px',
                          letterSpacing: '0px',
                          verticalAlign: 'middle',
                          color: '#00130B'
                        }}
                        className="max-w-[145px] mt-[2px]"
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Carousel & YouTube Video Box) */}
          <div className="col-span-6 flex flex-col items-center lg:items-end justify-center space-y-8">

            {/* Photo Carousel wrapper */}
            <div className="relative w-full max-w-[671px] h-[250px] sm:h-[320px] flex items-center justify-center overflow-visible">
              {/* Carousel Track */}
              <div className="relative w-full h-[220px] sm:h-[288px] flex items-center justify-center">
                {carouselImages.map((imgUrl, idx) => {
                  const pos = getPositionClass(idx);

                  if (pos === "center") {
                    return (
                      <div
                        key={idx}
                        className="absolute z-20 w-[260px] sm:w-[420px] md:w-[512px] h-[160px] sm:h-[240px] md:h-[288px] transition-all duration-500 ease-in-out transform scale-100 opacity-100 shadow-2xl rounded-2xl overflow-hidden border-2 border-white/20"
                      >
                        <Image
                          src={imgUrl}
                          alt="Machinery Carousel Center"
                          fill
                          className="object-cover"
                          sizes="(max-w-768px) 300px, 512px"
                          priority
                        />
                      </div>
                    );
                  }

                  const isLeft = pos === "left";
                  return (
                    <div
                      key={idx}
                      className={`absolute z-10 hidden sm:block w-[140px] md:w-[181px] h-[140px] md:h-[184px] transition-all duration-500 ease-in-out transform opacity-100 overflow-hidden rounded-xl border border-white/10 ${isLeft
                        ? "translate-x-[-120px] md:translate-x-[-220px]"
                        : "translate-x-[120px] md:translate-x-[220px]"
                        }`}
                    >
                      <Image
                        src={imgUrl}
                        alt="Machinery Carousel Side"
                        fill
                        className="object-cover"
                        sizes="181px"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-0 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 border border-white/10 hover:bg-[#00A859] transition-all text-white cursor-pointer hover:scale-105"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 border border-white/10 hover:bg-[#00A859] transition-all text-white cursor-pointer hover:scale-105"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* YouTube Video Box properties - Flex row of 3 cards */}
            <div className="flex justify-center gap-3 w-full max-w-[500px]">
              {[
                {
                  url: "https://www.youtube.com/watch?v=GTNiviig9Z0&list=PLHXlLG4lLpM1nsq-u5QYMel-p24VXjyUw&index=1",
                  thumbnail: "https://img.youtube.com/vi/GTNiviig9Z0/maxresdefault.jpg",
                  subtitle: "watch our",
                  title: "Diesel Power Weeder"
                },
                {
                  url: "https://www.youtube.com/shorts/l6gdhNhF0mc",
                  thumbnail: "/assets/drone-sprayer-thumbnail.png",
                  subtitle: "watch our",
                  title: "Drone Sprayer"
                },
                {
                  url: "https://www.youtube.com/watch?v=ismU9cWjqJE&list=PLHXlLG4lLpM3M2gek-b4RVCJV3hBecrf8&index=1",
                  thumbnail: "https://img.youtube.com/vi/ismU9cWjqJE/maxresdefault.jpg",
                  subtitle: "watch our",
                  title: "Kisan Expo 2025"
                }
              ].map((video, i) => (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="relative group w-[154.6px] h-[131.01px] max-w-[169.77px] rounded-[11.32px] overflow-hidden border-[0.71px] border-white/20 p-[11.32px] flex flex-col gap-[2.69px] bg-white/10 backdrop-blur-lg shadow-xl transition-transform duration-300 hover:scale-[1.03] text-left"
                >
                  <div className="relative w-[132px] h-[75px] rounded-[6px] overflow-hidden bg-black flex-shrink-0 z-10">
                    {video.thumbnail.startsWith('http') ? (
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover z-0" />
                    ) : (
                      <Image
                        src={video.thumbnail}
                        alt="YouTube Video Thumbnail"
                        fill
                        className="object-cover z-0"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 group-hover:bg-black/25 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                        <svg className="w-2.5 h-2.5 fill-[#0F291B] ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-20 font-roboto text-left flex flex-col justify-center min-w-0 mt-0.5">
                    <span className="block text-[8px] text-white/50 uppercase tracking-wider font-semibold leading-none">{video.subtitle}</span>
                    <span className="block text-[10px] text-white font-bold leading-tight mt-0.5 truncate">{video.title}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (Figma Mockup Snapshot 1) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden relative z-10 w-full px-4 flex flex-col gap-6 text-center max-w-[480px] mx-auto">
        {/* Title / Hero Header */}
        <div className="flex flex-col items-center pt-2">
          <h3 
            className="mb-2 text-center"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '56px',
              letterSpacing: '-0.96px',
              verticalAlign: 'middle'
            }}
          >
            <span className="text-[#2D722F]">गब्रू हो साथ</span> <span className="text-[#2D722F]">,</span> <span className="text-white">तो टेंशन की क्या बात !</span>
          </h3>
          <h1 className="text-2xl font-bold leading-snug">
            <span className="text-[#0F291B]">Right tool.</span>{" "}
            <span 
              className="bg-clip-text text-transparent bg-cover font-bold"
              style={{ backgroundImage: "linear-gradient(90deg, #2D722F 0%, #768F0F 100%)" }}
            >
              Better Farming.
            </span>
          </h1>
        </div>

        {/* Carousel Slider */}
        <div className="relative w-full h-[180px] flex items-center justify-center overflow-visible">
          {/* Carousel Track */}
          <div className="relative w-full h-[150px] flex items-center justify-center">
            {carouselImages.map((imgUrl, idx) => {
              const pos = getPositionClass(idx);

              if (pos === "center") {
                return (
                  <div
                    key={idx}
                    className="absolute z-20 w-[210px] h-[130px] transition-all duration-500 ease-in-out transform scale-100 opacity-100 shadow-xl rounded-2xl overflow-hidden border-2 border-white/20"
                  >
                    <Image
                      src={imgUrl}
                      alt="Machinery Carousel Center"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                );
              }

              const isLeft = pos === "left";
              return (
                <div
                  key={idx}
                  className={`absolute z-10 w-[70px] h-[90px] transition-all duration-500 ease-in-out transform opacity-50 overflow-hidden rounded-xl border border-white/10 ${isLeft
                    ? "translate-x-[-120px]"
                    : "translate-x-[120px]"
                    }`}
                >
                  <Image
                    src={imgUrl}
                    alt="Machinery Carousel Side"
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-1 z-30 flex items-center justify-center w-7 h-7 rounded-full bg-black/45 text-white"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-1 z-30 flex items-center justify-center w-7 h-7 rounded-full bg-black/45 text-white"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Action Buttons (side-by-side) */}
        <div className="flex gap-4 w-full justify-center px-1">
          <Link href="/all_products" className="flex-1 bg-[#0D9740] hover:bg-[#0b8036] text-white font-roboto font-bold text-[13px] h-[46px] rounded-full flex items-center justify-center shadow-md">
            Explore Products
          </Link>
          <a 
            href="https://www.youtube.com/playlist?list=PLHXlLG4lLpM1RC3vTHQf8iDX5jAI707Jm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#2B7832] text-[#2B7832] font-roboto font-bold text-[13px] h-[46px] rounded-full shadow-sm"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#2B7832" strokeWidth="2.5" />
              <path d="M10 8.5V15.5L15.5 12L10 8.5Z" fill="#2B7832" />
            </svg>
            Watch Demo
          </a>
        </div>

        {/* Translucent Video Cards (3 items side-by-side) */}
        <div className="flex gap-3 overflow-x-auto py-2 w-full snap-x justify-center scrollbar-none">
          {[
            {
              url: "https://www.youtube.com/watch?v=GTNiviig9Z0&list=PLHXlLG4lLpM1nsq-u5QYMel-p24VXjyUw&index=1",
              thumbnail: "https://img.youtube.com/vi/GTNiviig9Z0/maxresdefault.jpg",
              subtitle: "watch our",
              title: "Kisan Expo 2025"
            },
            {
              url: "https://www.youtube.com/shorts/l6gdhNhF0mc",
              thumbnail: "/assets/drone-sprayer-thumbnail.png",
              subtitle: "watch our",
              title: "Kisan Expo 2025"
            },
            {
              url: "https://www.youtube.com/watch?v=ismU9cWjqJE&list=PLHXlLG4lLpM3M2gek-b4RVCJV3hBecrf8&index=1",
              thumbnail: "https://img.youtube.com/vi/ismU9cWjqJE/maxresdefault.jpg",
              subtitle: "watch our",
              title: "Kisan Expo 2025"
            }
          ].map((video, i) => (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="relative group w-[105px] h-[95px] rounded-xl overflow-hidden border border-white/20 p-2 flex flex-col gap-1 bg-white/25 backdrop-blur-md shadow-lg text-left snap-start flex-shrink-0"
            >
              <div className="relative w-full h-[52px] rounded-lg overflow-hidden bg-black flex-shrink-0">
                {video.thumbnail.startsWith('http') ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <Image src={video.thumbnail} alt="Thumbnail" fill className="object-cover" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                    <svg className="w-2 h-2 fill-[#0F291B] ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-[7px] text-white">
                <span className="opacity-60 uppercase font-semibold leading-none">{video.subtitle}</span>
                <span className="font-bold leading-tight mt-0.5 truncate">{video.title}</span>
              </div>
            </a>
          ))}
        </div>

        {/* 2x2 Features Grid (Banner style at the bottom) */}
        <div className="w-full bg-[#E5E7EB]/90 backdrop-blur-md py-4 px-5 rounded-2xl mt-2 text-left">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {features.map((item, i) => (
              <div key={i} className="flex items-center space-x-2 min-w-0">
                <div className="flex-shrink-0 p-1 bg-[#00A859]/10 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <h4 className="text-[10px] font-bold text-[#0F291B] truncate leading-tight">{item.title}</h4>
                  <p className="text-[8px] text-black/60 font-semibold leading-none truncate mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
