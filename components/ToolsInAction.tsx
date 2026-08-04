"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export default function ToolsInAction() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const videos: VideoItem[] = [
    {
      id: 1,
      title: "Power Weeder in Action",
      thumbnail: "/assets/thumb_farmers_review_wide_1785751072100.png",
      videoUrl: "https://www.youtube.com/embed/ismU9cWjqJE?autoplay=1",
    },
    {
      id: 2,
      title: "Spray Pump Performance",
      thumbnail: "/assets/thumb_spray_pumps.png",
      videoUrl: "https://www.youtube.com/embed/ismU9cWjqJE?autoplay=1",
    },
    {
      id: 3,
      title: "Seeder Field Test",
      thumbnail: "/assets/thumb_farmers_review_new_1785751049481.png",
      videoUrl: "https://www.youtube.com/embed/ismU9cWjqJE?autoplay=1",
    },
    {
      id: 4,
      title: "Solar Fence Installation",
      thumbnail: "/assets/thumb_solar_camera.png",
      videoUrl: "https://www.youtube.com/embed/ismU9cWjqJE?autoplay=1",
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 w-full py-16">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Green Block */}
        <div className="w-full lg:w-[28%] bg-[#008A3D] rounded-3xl p-8 flex flex-col justify-between text-white min-h-[250px]">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold font-roboto leading-tight mb-3">
              See Tools in Action
            </h2>
            <p className="text-xs lg:text-sm text-white/95 leading-relaxed font-medium">
              Watch real farmers using GBRU tools in their fields.
            </p>
          </div>
          <a
            href="/videos"
            className="mt-6 bg-white hover:bg-zinc-50 transition-colors text-[#008A3D] font-bold py-3.5 px-6 rounded-full text-center text-xs w-full lg:w-fit shadow-md flex items-center justify-center gap-2"
          >
            Watch All Videos
            <span>→</span>
          </a>
        </div>

        {/* Right 4 Videos Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((vid) => (
            <div key={vid.id} className="flex flex-col group cursor-pointer">
              
              {/* Thumbnail Container */}
              <div 
                onClick={() => setActiveVideoUrl(vid.videoUrl)}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
              >
                {/* Image */}
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Translucent overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                    <svg className="w-5 h-5 text-[#008A3D] ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-xs font-bold text-center text-[#1A1A1A] group-hover:text-[#008A3D] transition-colors leading-tight">
                {vid.title}
              </h3>

            </div>
          ))}
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
