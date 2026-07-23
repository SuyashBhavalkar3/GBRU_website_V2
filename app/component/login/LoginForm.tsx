"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, Mail, Phone, Loader2 } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { ROUTES } from "@/app/constants/routes";

export default function LoginForm() {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<"mobile" | "email">("mobile");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (loginMode === "mobile" && mobileNumber.replace(/\s/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (loginMode === "email" && !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    if (loginMode === "mobile") {
      try {
        const cleanedPhone = mobileNumber.replace(/\s/g, "");
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

        // Check for error responses from server
        if (!res.ok || (data.message && data.message.status === false)) {
          throw new Error(data.message?.message || "Failed to send OTP. Please try again.");
        }

        console.log("Send OTP API Success:", data);

        // Redirect to the OTP verification page upon successful request
        router.push(`/login/verify?phone=${encodeURIComponent(cleanedPhone)}`);
      } catch (err: any) {
        console.error("Login API Error:", err);
        setError(err.message || "Failed to send OTP. Please check your network connection.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback/simulated mock email flow
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/login/verify?phone=${encodeURIComponent(email)}`);
      }, 1500);
    }
  };

  // Helper to format/restrict input to numbers and spaces for mobile
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/[^\d\s]/g, "");
    setMobileNumber(cleaned);
  };

  return (
    <div className="w-full max-w-[380px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B6E33] tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Log in to access your product, warranty details, and ambassador rewards.
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor={loginMode === "mobile" ? "mobile-input" : "email-input"} 
              className="block text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              {loginMode === "mobile" ? "Mobile Number" : "Email Address"}
            </label>
            
            {loginMode === "mobile" ? (
              /* Joined Mobile Input Controls */
              <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#1E7A38] focus-within:border-[#1E7A38] transition-all duration-200 shadow-sm">
                {/* Country Code Selector Box */}
                <button
                  type="button"
                  aria-label="Select Country Code"
                  className="flex items-center space-x-1 px-3 md:px-4 bg-gray-50 border-r border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors select-none"
                >
                  <span className="text-base" role="img" aria-label="India flag">🇮🇳</span>
                  <span className="text-sm font-semibold tracking-tight">+91</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* Phone number input */}
                <input
                  id="mobile-input"
                  type="tel"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  placeholder="98765 43210"
                  maxLength={12}
                  className="flex-grow px-4 py-3.5 text-sm md:text-base outline-none text-gray-900 bg-white placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            ) : (
              /* Email Input Controls */
              <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#1E7A38] focus-within:border-[#1E7A38] transition-all duration-200 shadow-sm">
                <div className="flex items-center justify-center px-4 bg-gray-50 border-r border-gray-200 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex-grow px-4 py-3.5 text-sm md:text-base outline-none text-gray-900 bg-white placeholder-gray-400"
                  disabled={isLoading}
                  required
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 bg-[#1E7A38] hover:bg-[#155A27] disabled:bg-gray-400 text-white font-bold rounded-full shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-400 font-medium">Or</span>
          </div>
        </div>

        {/* Alternatives & Footer */}
        <div className="space-y-6 text-center">
          {/* Toggle Login Mode (Email vs Mobile) */}
          <button
            type="button"
            onClick={() => setLoginMode(loginMode === "mobile" ? "email" : "mobile")}
            disabled={isLoading}
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#1E7A38] hover:text-[#155A27] hover:underline transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
          >
            {loginMode === "mobile" ? (
              <>
                <Mail size={16} />
                <span>Login with Email</span>
              </>
            ) : (
              <>
                <Phone size={16} />
                <span>Login with Mobile</span>
              </>
            )}
          </button>

          {/* Register Footer */}
          <p className="text-xs md:text-sm text-gray-500 leading-normal pt-2">
            Don't have an account?{" "}
            <Link 
              href={ROUTES.WARRANTY_REGISTER} 
              className="font-bold text-[#1E7A38] hover:text-[#155A27] hover:underline"
            >
              Register Product
            </Link>{" "}
            to get started.
          </p>
      </div>
    </div>
  );
}
