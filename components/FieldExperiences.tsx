"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FieldExperiences() {
  const playlist = [
    {
      title: "GBRU Spray Pumps",
      subtitle: "Our Farmer Review",
      desc: "See what our Gbru user are saying",
      duration: "03:41",
      category: "Information",
      thumbnail: "/assets/thumb_spray_pumps.png",
      videoUrl: "https://www.youtube.com/embed/3rhBieQevLA?autoplay=1",
    },
    {
      title: "GBRU Solar Camera",
      subtitle: "solar camera in action",
      desc: "In-depth review of our farm security monitoring system",
      duration: "08:20",
      category: "Reviews",
      thumbnail: "/assets/thumb_solar_camera.png",
      videoUrl: "https://www.youtube.com/embed/7gGJHSmBGOM?autoplay=1",
    },
    {
      title: "GBRU Mobile Auto",
      subtitle: "mobile auto in action",
      desc: "Learn how the smart auto controller automates water pumps",
      duration: "02:58",
      category: "Information",
      thumbnail: "/assets/thumb_mobile_auto.png",
      videoUrl: "https://www.youtube.com/embed/DX5_nQpXYjA?autoplay=1",
    },
    {
      title: "GBRU Seeder",
      subtitle: "seeder in action",
      desc: "See how the seeder makes planting faster and easier",
      duration: "04:15",
      category: "Exclusive Video",
      thumbnail: "/assets/cat_seeders.png",
      videoUrl: "https://www.youtube.com/embed/fGxiAGA4uf0?autoplay=1",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const activeVideo = playlist[activeIdx];

  // List of other videos (excluding active one or just showing list of all)
  // Let's show all of them on the right, highlighting the active one!
  const playlistItems = playlist.slice(1); // Show the other 3 items as playlist

  const handleSelectVideo = (originalIdx: number) => {
    setActiveIdx(originalIdx);
  };

  return (
    <section
      className="relative w-full bg-no-repeat bg-white pt-4 pb-8 px-4 sm:px-6 lg:h-[818px] lg:pt-[18px] lg:pr-[50px] lg:pb-[18px] lg:pl-[50px] flex flex-col items-center gap-4 lg:gap-[27px] overflow-hidden"
      style={{
        backgroundImage: "url('/assets/field_experience_bg_drone.png')",
        backgroundPosition: "center -280px",
        backgroundSize: "100% auto"
      }}
    >

      {/* Header Row */}
      <div className="relative z-10 w-full max-w-[1180px] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="text-left font-roboto max-w-2xl">
          <h2 className="text-[#0F291B] text-[28px] sm:text-[32px] lg:text-[40px] font-bold leading-tight">
            Field Experiences
          </h2>
          <p className="text-zinc-700 text-sm lg:text-base font-medium mt-1 max-w-md">
            Watch our equipment transform traditional farming.
          </p>
        </div>
        <button className="text-black font-roboto font-bold text-sm cursor-pointer hover:underline transition-colors duration-200 self-start sm:self-auto">
          View All Videos
        </button>
      </div>

      {/* Main Console Box (Translucent green container overlaying outer background) */}
      <div
        className="relative z-10 w-full max-w-[1180px] rounded-[24px] lg:rounded-[34px] overflow-hidden backdrop-blur-[0.1px] pt-6 pb-6 px-4 sm:px-5 lg:pt-[113px] lg:pr-[32px] lg:pb-[32px] lg:pl-[20px] shadow-2xl border border-white/20"
        style={{ background: "linear-gradient(180deg, rgba(0, 168, 62, 0.5) 0%, rgba(34, 197, 94, 0.5) 100%)" }}
      >
        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-[24px] items-start">

          {/* Left Column - Large Active Video Player */}
          <div className="w-full lg:w-[760px] flex flex-col justify-start items-start">
            {/* Player Card */}
            <div
              className="relative w-full h-[220px] sm:h-[320px] lg:w-[760px] lg:h-[428px] rounded-[24px] lg:rounded-[34px] overflow-hidden shadow-2xl group cursor-pointer border border-white/10"
              onClick={() => setActiveVideoUrl(activeVideo.videoUrl)}
              style={{ background: "linear-gradient(180deg, rgba(0, 168, 62, 0.5) 0%, rgba(34, 197, 94, 0.5) 100%)" }}
            >
              <Image
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: "center 12%" }}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors duration-300">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 fill-[#2D722F] ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Time Indicator Overlay */}
              <span className="absolute bottom-4 right-4 bg-black/75 px-2.5 py-0.5 rounded text-[11px] font-bold text-white tracking-wide">
                {activeVideo.duration}
              </span>
            </div>

            {/* Active Video Info */}
            <div className="text-left text-white mt-4 lg:mt-[24px]">
              <h3 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '32px',
                  lineHeight: '32px',
                  letterSpacing: '-0.24px',
                  verticalAlign: 'middle',
                }}
              >
                {activeVideo.subtitle}
              </h3>
              <p 
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  verticalAlign: 'middle',
                }}
                className="text-white mt-[8px]"
              >
                {activeVideo.desc}
              </p>
            </div>
          </div>

          {/* Right Column - Playlist Selection */}
          <div className="w-full lg:w-[368px] flex flex-col gap-4 lg:gap-[40px] pb-0 lg:pb-[83.5px]">
            {playlist.map((video, idx) => {
              if (idx === activeIdx) return null; // Hide active video to keep exactly 3 items in the list
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectVideo(idx)}
                  className="flex items-center gap-3 sm:gap-[16px] p-2 sm:p-[6px] w-full lg:w-[368px] lg:h-[112px] rounded-[14px] lg:rounded-[10px] transition-all duration-300 cursor-pointer border bg-white/10 hover:bg-white/15 border-white/20 shadow-md"
                >
                  {/* Small Thumbnail with Play Icon */}
                  <div className="relative w-[118px] sm:w-[150px] lg:w-[182px] h-[74px] sm:h-[84px] lg:h-[100px] rounded-[8px] overflow-hidden flex-shrink-0 bg-black/20 border border-white/30 shadow-sm">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover object-bottom"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                        <svg className="w-2.5 h-2.5 fill-[#2D722F] ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-left min-w-0 flex flex-col justify-center">
                    <h4 className="text-white font-bold text-[13px] sm:text-[14px] leading-snug line-clamp-2">
                      {video.title}
                    </h4>
                    <span className="text-white/80 text-[11px] font-medium mt-1">
                      {video.duration} • {video.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>


      {/* Video Lightbox Modal */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4 animate-fade-in"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <button 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 transition-colors text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold z-10"
              onClick={() => setActiveVideoUrl(null)}
            >
              ✕
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src={activeVideoUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
}
