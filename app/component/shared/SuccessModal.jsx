"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

export default function SuccessModal({ isOpen, onClose, title, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5 text-[#00a859]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {title || "Success!"}
          </h3>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {message || "Your request has been submitted successfully."}
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-[#00a859] hover:bg-[#00924d] text-white py-2.5 rounded-full font-bold text-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
