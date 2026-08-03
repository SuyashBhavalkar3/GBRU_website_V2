"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FieldExperiences() {
  const playlist = [
    {
      title: "What Farmers Think about GBRU?",
      subtitle: "Our Farmer Review",
      desc: "See what our GBRU user are saying",
      duration: "03:19",
      category: "Exclusive Video",
      thumbnail: "/assets/thumb_farmers_review.png",
    },
    {
      title: "GBRU Mobile Auto",
      subtitle: "Mobile Starter Controller",
      desc: "Learn how the smart auto controller automates water pumps",
      duration: "02:58",
      category: "Information",
      thumbnail: "/assets/thumb_mobile_auto.png",
    },
    {
      title: "GBRU Solar Camera",
      subtitle: "Off-Grid Farm Security",
      desc: "In-depth review of our farm security monitoring system",
      duration: "08:20",
      category: "Reviews",
      thumbnail: "/assets/thumb_solar_camera.png",
    },
    {
      title: "GBRU Spray Pumps",
      subtitle: "Battery Knapsack Sprayers",
      desc: "See our battery operated knapsack sprayer pumps in action",
      duration: "03:41",
      category: "Information",
      thumbnail: "/assets/thumb_spray_pumps.png",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeVideo = playlist[activeIdx];

  // List of other videos (excluding active one or just showing list of all)
  // Let's show all of them on the right, highlighting the active one!
  const playlistItems = playlist.slice(1); // Show the other 3 items as playlist

  const handleSelectVideo = (originalIdx: number) => {
    setActiveIdx(originalIdx);
  };

  return (
    <section
      className="relative w-full bg-cover bg-no-repeat lg:h-[818px] pt-[18px] pr-[50px] pb-[18px] pl-[50px] flex flex-col items-center gap-[27px] overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/assets/field_experience_bg_drone.png')",
        backgroundPosition: "center -275px"
      }}
    >

      {/* Header Row */}
      <div className="relative z-10 w-full lg:w-[1180px] lg:h-[80px] flex items-start justify-between">
        <div className="text-left font-roboto">
          <h2 className="text-[#0F291B] text-[32px] lg:text-[40px] font-bold leading-tight">
            Field Experiences
          </h2>
          <p className="text-zinc-700 text-sm lg:text-base font-medium mt-1">
            Watch our equipment transform traditional farming.
          </p>
        </div>
        <button className="text-black font-roboto font-bold text-sm cursor-pointer hover:underline transition-colors duration-200">
          View All Videos
        </button>
      </div>

      {/* Main Console Box (Translucent green container overlaying outer background) */}
      <div
        className="relative z-10 w-full lg:w-[1180px] lg:h-[653px] rounded-[34px] overflow-hidden backdrop-blur-[0.1px] pt-[113px] pr-[32px] pb-[32px] pl-[20px] shadow-2xl border border-white/20"
        style={{ background: "linear-gradient(180deg, rgba(0, 168, 62, 0.5) 0%, rgba(34, 197, 94, 0.5) 100%)" }}
      >
        {/* Content Container */}
        <div className="relative z-10 w-full lg:h-[508px] flex flex-col lg:flex-row gap-[24px] items-start">

          {/* Left Column - Large Active Video Player */}
          <div className="w-full lg:w-[760px] flex flex-col justify-start items-start">
            {/* Player Card */}
            <div
              className="relative w-full lg:w-[760px] lg:h-[428px] rounded-[34px] overflow-hidden shadow-2xl group cursor-pointer border border-white/10"
              style={{ background: "linear-gradient(180deg, rgba(0, 168, 62, 0.5) 0%, rgba(34, 197, 94, 0.5) 100%)" }}
            >
              <Image
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                fill
                className="object-fill transition-transform duration-500 group-hover:scale-[1.03] rounded-[34px]"
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
            <div className="text-left text-white mt-[24px]">
              <h3 className="font-roboto font-bold text-[20px] lg:text-[24px] leading-tight">
                {activeVideo.subtitle}
              </h3>
              <p className="text-white/80 font-roboto text-sm lg:text-base mt-1.5 font-medium">
                See what our Gbru user are saying
              </p>
            </div>
          </div>

          {/* Right Column - Playlist Selection */}
          <div className="w-full lg:w-[368px] lg:h-[394px] flex flex-col gap-[16px] lg:gap-[40px] pb-[83.5px]">
            {playlist.map((video, idx) => {
              if (idx === activeIdx) return null; // Hide active video to keep exactly 3 items in the list
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectVideo(idx)}
                  className="flex items-center gap-[16px] p-[6px] w-full lg:w-[368px] lg:h-[112px] rounded-[10px] transition-all duration-300 cursor-pointer border bg-white/10 hover:bg-white/15 border-white/20 shadow-md"
                >
                  {/* Small Thumbnail with Play Icon */}
                  <div className="relative w-[182px] h-[100px] rounded-[8px] overflow-hidden flex-shrink-0 bg-black/20 border border-white/30 shadow-sm">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
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
                    <h4 className="text-white font-bold text-[14px] leading-snug line-clamp-2">
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

    </section>
  );
}
