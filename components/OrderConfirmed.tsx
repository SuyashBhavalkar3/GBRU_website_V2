"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderConfirmed() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("orderId");
      setOrderId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col justify-between">
      <Navbar />

      <main className="max-w-[600px] w-full mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center gap-6">
        {/* Animated Checkmark Icon */}
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 bg-[#EBF5EE] rounded-full flex items-center justify-center animate-bounce shadow-inner">
            <svg
              className="w-12 h-12 text-[#0D9740] animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Heading & Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-extrabold text-[#0F291B] tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Thank you for choosing GBRU. Your order has been successfully placed.
          </p>
          {orderId && (
            <span className="text-xs text-zinc-500 font-bold bg-zinc-100 py-1.5 px-4 rounded-full mt-4 self-center">
              Order ID: <span className="text-[#0F291B]">#{orderId}</span>
            </span>
          )}
        </div>

        {/* Minimalist Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
          <Link
            href="/orders"
            className="flex-1 h-12 bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-sm rounded-xl flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
          >
            My Orders
          </Link>
          <Link
            href="/categories"
            className="flex-1 h-12 border-2 border-zinc-200 hover:border-zinc-300 text-[#0F291B] font-bold text-sm rounded-xl flex items-center justify-center transition-all active:scale-[0.98] shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
