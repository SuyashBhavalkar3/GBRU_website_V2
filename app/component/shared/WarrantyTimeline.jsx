import { CheckCircle2 } from "lucide-react";

export default function WarrantyTimeline({
  registrationDate = "Oct 12, 2023",
  todayDate = "Oct 24, 2024",
  expiryDate = "Dec 15, 2025",
}) {
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] my-6">
      <h3 className="font-extrabold text-[#1c3a27] text-lg mb-8">
        Warranty Timeline
      </h3>

      {/* Progress Bar Container */}
      <div className="relative max-w-4xl mx-auto px-4 py-4">
        {/* Connecting Line Track */}
        <div className="absolute top-1/2 left-10 right-10 h-1 -translate-y-1/2 flex items-center z-0">
          {/* Active solid green portion (Registration to Today) */}
          <div className="w-2/3 h-full bg-[#00a859]" />
          {/* Remaining dashed gray portion (Today to Expiry) */}
          <div className="w-1/3 h-full bg-slate-300 border-t-2 border-dashed border-slate-400" />
        </div>

        {/* 3 Step Markers */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Marker 1: Registration */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#00a859] text-white flex items-center justify-center shadow-md border-2 border-white">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <p className="font-extrabold text-slate-900 text-xs">Registration</p>
              <p className="text-slate-500 text-[11px] font-medium">{registrationDate}</p>
            </div>
          </div>

          {/* Marker 2: Today */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#00a859] text-white font-extrabold text-xs flex items-center justify-center shadow-md border-2 border-white animate-pulse">
                in
              </div>
            </div>
            <div className="mt-3">
              <p className="font-extrabold text-[#00a859] text-xs">Today</p>
              <p className="text-slate-500 text-[11px] font-medium">{todayDate}</p>
            </div>
          </div>

          {/* Marker 3: Expiry Date */}
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 font-extrabold text-xs flex items-center justify-center border-2 border-white">
              31
            </div>
            <div className="mt-3">
              <p className="font-extrabold text-slate-900 text-xs">Expiry Date</p>
              <p className="text-slate-500 text-[11px] font-medium">{expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
