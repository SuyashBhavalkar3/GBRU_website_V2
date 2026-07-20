import React from 'react';
import Image from 'next/image';
import { MAP_PINS } from './data';
import { Plus, Minus, LocateFixed, Tractor } from 'lucide-react';

export default function DealerMap() {
  return (
    <div className="relative w-full h-[650px] lg:h-full min-h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
      
      {/* Static Map Image */}
      <Image
        src="/home/map.jpg"
        alt="Dealer Location Map"
        fill
        className="object-cover rounded-2xl"
        priority
      />

      {/* Dark Overlay Tint (Subtle) for readability */}
      <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none" />

      {/* Scattered Interactive Map Pins */}
      {MAP_PINS.map((pin) => (
        <div
          key={pin.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 cursor-pointer group"
          style={{ top: pin.top, left: pin.left }}
        >
          {/* Pin Circle */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-110 ${
              pin.active ? 'bg-[#009933] ring-4 ring-[#009933]/30 scale-110' : 'bg-[#1F7A3D]'
            }`}
          >
            <Tractor className="w-4 h-4 text-white" />
          </div>

          {/* Label Pill */}
          <div className="hidden sm:flex bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-gray-200 shadow-sm text-[10px] font-semibold text-gray-800 whitespace-nowrap">
            {pin.label}
          </div>
        </div>
      ))}

      {/* Bottom Left Overlay Badge */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-md flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#009933] animate-pulse" />
        <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase">
          LIVE CENTER: DES MOINES AREA
        </span>
      </div>

      {/* Bottom Right Zoom & Location Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Zoom in"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Zoom out"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="My location"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors"
        >
          <LocateFixed className="w-5 h-5 text-[#009933]" />
        </button>
      </div>

    </div>
  );
}
