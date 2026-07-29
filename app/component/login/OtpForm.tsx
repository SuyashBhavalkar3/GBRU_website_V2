"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Clock, RotateCw, ShieldCheck, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { ROUTES } from "@/app/constants/routes";
import { useTranslations } from "next-intl";

interface OtpFormProps {
  phoneNumber?: string;
}

export default function OtpForm({ phoneNumber = "98765 43210" }: OtpFormProps) {
  const router = useRouter();
  const t = useTranslations("otp");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(29);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // References for shifting focus between inputs
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Countdown timer effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle digit input change
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return; // Allow numbers only

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next box if character entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Focus previous input and clear it
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join("");

    if (code.length < 6) {
      setError(t("errorCompleteOtp"));
      return;
    }

    setIsLoading(true);

    try {
      const cleanedPhone = phoneNumber.replace(/\s/g, "");
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
      
      if (!apiBase || !apiKey || !apiSecret) {
        throw new Error("ERP API credentials are not configured in .env file.");
      }
      
      const res = await fetch(`${apiBase}/api/method/shoption_api.otp.api.verify_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret
        },
        body: JSON.stringify({
          mobile_no: cleanedPhone,
          otp: code
        })
      });

      const data = await res.json();

      // Check if code was incorrect or failed validation
      if (!res.ok || (data.message && data.message.status === false)) {
        throw new Error(data.message?.message || t("errorInvalidOtp"));
      }

      console.log("Verify OTP API Success:", data);

      // Save user session in localStorage
      localStorage.setItem("user_phone", cleanedPhone);
      localStorage.setItem("is_authenticated", "true");
      localStorage.removeItem("user_api_key");
      localStorage.removeItem("user_api_secret");

      // Redirect to the home page
      router.push(ROUTES.HOME);
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || t("errorVerifyFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend Trigger
  const handleResend = async () => {
    if (timer > 0 || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const cleanedPhone = phoneNumber.replace(/\s/g, "");
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
      
      if (!apiBase || !apiKey || !apiSecret) {
        throw new Error("ERP API credentials are not configured in .env file.");
      }
      
      const res = await fetch(`${apiBase}/api/method/shoption_api.otp.api.send_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret
        },
        body: JSON.stringify({
          mobile_no: cleanedPhone
        })
      });

      const data = await res.json();

      if (!res.ok || (data.message && data.message.status === false)) {
        throw new Error(data.message?.message || t("errorResendFailed"));
      }

      console.log("Resend OTP Success:", data);

      // Reset timer and values
      setTimer(29);
      setOtp(new Array(6).fill(""));
      setError(null);
      inputRefs.current[0]?.focus();
      alert(t("otpSentAlert"));
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || t("errorResendVerificationFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  // Format timer as mm:ss
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B6E33] tracking-tight mb-2">
          {t("verifyTitle")}
        </h2>
        <div className="text-sm text-gray-500 leading-normal">
          <span>{t("sentCodeTo")} </span>
          <span className="font-bold text-gray-700">+{phoneNumber.startsWith("91") ? "" : "91 "}{phoneNumber}</span>.
          <div className="mt-1">
            <Link 
              href="/login" 
              className="text-sm font-bold text-[#1E7A38] hover:text-[#155A27] hover:underline"
            >
              {t("changeNumber")}
            </Link>
          </div>
        </div>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-md">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Fields Row */}
        <div className="flex justify-between gap-2 md:gap-3 py-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {
                if (el) inputRefs.current[idx] = el;
              }}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg md:text-xl font-bold rounded-xl border bg-white focus:outline-none transition-all ${
                digit !== "" 
                  ? "border-[#1E7A38] bg-emerald-50/10 text-gray-900" 
                  : "border-gray-300 text-gray-400"
              } focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 shadow-sm`}
              disabled={isLoading}
              required
            />
          ))}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 bg-[#1E7A38] hover:bg-[#155A27] disabled:bg-gray-400 text-white font-bold rounded-full shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t("verifying")}</span>
            </>
          ) : (
            <>
              <span>{t("verifyButton")}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Timer & Resend Option */}
      <div className="mt-8 flex flex-col items-center justify-center space-y-4">
        {/* Resend code timer */}
        <div className="flex items-center space-x-1.5 text-sm text-gray-500 font-medium">
          <Clock size={16} className="text-gray-400" />
          <span>{t("resendTimer")}</span>
          <span className="font-bold text-gray-700">{formatTime(timer)}</span>
        </div>

        {/* Resend Code Action */}
        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || isLoading}
          className={`flex items-center space-x-2 text-sm font-bold transition-colors focus:outline-none select-none ${
            timer > 0 
              ? "text-gray-350 cursor-not-allowed" 
              : "text-[#1E7A38] hover:text-[#155A27] hover:underline cursor-pointer"
          }`}
        >
          <RotateCw size={14} className={timer === 0 ? "animate-pulse" : ""} />
          <span>{t("resendButton")}</span>
        </button>
      </div>

      {/* Security alert box */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-150 rounded-xl flex gap-3 text-left">
        <div className="text-[#1B6E33] shrink-0 pt-0.5">
          <ShieldCheck size={20} className="fill-emerald-100" />
        </div>
        <p className="text-[11px] leading-relaxed text-gray-550">
          {t("securityMessage")}
        </p>
      </div>
    </div>
  );
}
