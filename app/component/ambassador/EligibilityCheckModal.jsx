"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle,
  Leaf,
  Lock,
  Check,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";

export default function EligibilityCheckModal({ isOpen, onClose }) {
  const [step, setStep] = useState("checking"); // "checking" | "success"
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep("checking");
      setProgress(0);
      return;
    }

    // Prevent body scroll when modal is active
    document.body.style.overflow = "hidden";

    setStep("checking");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep("success");
          }, 200);
          return 100;
        }
        return Math.min(100, prev + 2.5);
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    alert("Application submitted! A GORU ambassador lead will contact you shortly.");
    onClose();
  };

  // Screen A: "Checking" Progress Screen
  if (step === "checking") {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#eaf6eb] via-[#f4faf5] to-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-y-auto">
        {/* Top Badge */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-[#00a859] text-xs font-extrabold uppercase tracking-wider border border-emerald-200">
            <CheckCircle className="w-4 h-4" />
            <span>Mobile Verified</span>
          </div>
        </div>

        {/* Center Content */}
        <div className="max-w-md w-full text-center space-y-6 my-auto">
          {/* Animated Ring Leaf Badge */}
          <div className="w-20 h-20 rounded-full bg-white border-4 border-emerald-200 flex items-center justify-center mx-auto shadow-md animate-pulse">
            <Leaf className="w-10 h-10 text-[#00a859]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27]">
              Checking your eligibility...
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Please wait a moment. This usually takes 1–2 seconds as we securely verify your farm credentials.
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-2 pt-4">
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00a859] rounded-full transition-all duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1" aria-live="polite">
              <span>Authenticating credentials...</span>
              <span className="text-[#00a859]">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Footer Security Row */}
        <div className="w-full max-w-md flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-[#00a859]" />
            <span>Secure encrypted session</span>
          </div>
          <span className="font-extrabold text-[#1c3a27] tracking-wider">GORU</span>
        </div>
      </div>
    );
  }

  // Screen B: "Success" Congratulations Screen
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 text-center shadow-2xl space-y-6 relative border border-slate-100 my-auto">
        {/* Top Check Badge */}
        <div className="w-16 h-16 rounded-full bg-[#00a859] text-white flex items-center justify-center mx-auto shadow-md">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00a859]">
            Congratulations!
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
            You're eligible to become a <strong className="text-slate-900 font-extrabold">GORU Brand Ambassador</strong>. Start inspiring farmers and earn exciting rewards.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleContinue}
            className="w-full bg-[#00a859] hover:bg-[#00924d] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer block w-full py-1"
          >
            Maybe Later
          </button>
        </div>

        {/* Two-Column Mini Info Cards */}
        <div className="grid grid-cols-2 gap-3 text-left pt-2">
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <TrendingUp className="w-4 h-4 text-[#00a859]" />
              <span>Earn Rewards</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Exclusive bonuses for every referral.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs mb-1">
              <Users className="w-4 h-4 text-[#00a859]" />
              <span>Join Community</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Connect with 500+ top agronomists.
            </p>
          </div>
        </div>

        {/* Bottom Avatar Social Proof Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
              RS
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
              AK
            </div>
            <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
              MP
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Join thousands of successful ambassadors
          </span>
        </div>
      </div>
    </div>
  );
}
