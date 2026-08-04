"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrackOrderDetails() {
  const triggerPrintInvoice = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 py-8 flex-1 flex flex-col gap-8">

        {/* Back Link */}
        <Link
          href="/track-order"
          className="flex items-center gap-1.5 text-sm font-bold text-[#0D9740] hover:underline self-start"
        >
          ← Back to Tracking
        </Link>

        {/* Product & Details Header Card */}
        <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col lg:flex-row justify-between items-stretch gap-6 relative">

          <div className="flex flex-col md:flex-row items-stretch gap-6 flex-1">
            {/* Product Image */}
            <div className="relative w-full md:w-[120px] h-[120px] rounded-[16px] overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
              <Image
                src="/assets/gbru_tractor_main.png"
                alt="GBRU Pro-Series 5000"
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between py-1">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[#0F291B] text-[18px] leading-tight">
                  GBRU Pro-Series 5000
                </h3>
                <p className="text-xs text-zinc-500">
                  Premium Multi-Purpose Agricultural Tractor
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-500 font-medium">
                  <span>Order ID: <span className="text-[#0F291B] font-bold">#GBRU2026052901</span></span>
                  <span className="h-3 w-px bg-zinc-300"></span>
                  <span className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-bold py-0.5 px-2.5 rounded-[4px]">
                    Full Payment
                  </span>
                </div>
              </div>

              {/* Delivery Details row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4 pt-3 border-t border-zinc-100 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500">Delivery Address</span>
                  <span className="font-bold text-[#0F291B]">Ramesh Kumar</span>
                  <span className="text-zinc-600 text-[11px]">Khanna, Ludhiana, Punjab - 141401</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500">Expected Delivery</span>
                  <span className="font-extrabold text-[#0D9740] text-[15px] mt-0.5">
                    June 2-5, 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Download Action */}
          <div className="flex items-start justify-end">
            <button
              onClick={triggerPrintInvoice}
              className="h-10 px-5 border border-zinc-300 hover:bg-zinc-50 rounded-[10px] text-[#374151] font-bold text-xs flex items-center gap-2 shadow-sm transition-all whitespace-nowrap mt-2"
            >
              📥 Invoice
            </button>
          </div>

        </div>

        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left Column (Order Journey Vertical Timeline) ── */}
          <div className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-[24px] p-6 lg:p-8 shadow-sm">
            <h3 className="font-bold text-[#0F291B] text-lg mb-8">
              Order Journey
            </h3>

            {/* Vertical timeline */}
            <div className="relative pl-8 flex flex-col gap-8 border-l border-zinc-200 ml-4">

              {/* Step 1: Confirmed */}
              <div className="relative">
                {/* Check Circle Indicator */}
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-[#0FA84D] text-white flex items-center justify-center text-sm border-4 border-white shadow-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-[#0F291B]">Order Confirmed</span>
                  <span className="text-[10px] text-zinc-500 leading-normal">
                    Your order has been confirmed.
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1">
                    May 29, 2026 - 2:30 PM
                  </span>
                </div>
              </div>

              {/* Step 2: Processing */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-[#0FA84D] text-white flex items-center justify-center text-sm border-4 border-white shadow-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-[#0F291B]">Processing</span>
                  <span className="text-[10px] text-zinc-500 leading-normal">
                    Order is being prepared for dispatch.
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1">
                    May 29, 2026 - 3:15 PM
                  </span>
                </div>
              </div>

              {/* Step 3: Packed */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-[#0FA84D] text-white flex items-center justify-center text-sm border-4 border-white shadow-sm font-bold">
                  ✓
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-[#0F291B]">Packed</span>
                  <span className="text-[10px] text-zinc-500 leading-normal">
                    Product has been packed and ready.
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1">
                    May 30, 2026 - 10:00 AM
                  </span>
                </div>
              </div>

              {/* Step 4: Dispatched (Active / Highlighted) */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-[#DFB33F] text-white flex items-center justify-center text-xs border-4 border-white shadow-sm font-bold">
                  🚚
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-[#0F291B]">Dispatched</span>
                  <span className="text-[10px] text-zinc-500 leading-normal">
                    Package dispatched from warehouse.
                  </span>
                  <span className="text-[10px] text-[#DFB33F] font-bold mt-1">
                    May 30, 2026 - 2:45 PM
                  </span>
                </div>
              </div>

              {/* Step 5: In Transit */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center text-xs border-4 border-white shadow-sm">
                  📍
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-zinc-400">In Transit</span>
                  <span className="text-[10px] text-zinc-400 leading-normal">
                    On the way to your location.
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1">
                    Expected: May 31, 2026
                  </span>
                </div>
              </div>

              {/* Step 6: Out for Delivery */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center text-xs border-4 border-white shadow-sm">
                  🚚
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-zinc-400">Out for Delivery</span>
                  <span className="text-[10px] text-zinc-400 leading-normal">
                    Out for delivery to your address.
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1">
                    Expected: June 2, 2026
                  </span>
                </div>
              </div>

              {/* Step 7: Delivered */}
              <div className="relative">
                <div className="absolute left-[-46px] top-0 w-8 h-8 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center text-xs border-4 border-white shadow-sm">
                  🏠
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-zinc-400">Delivered</span>
                  <span className="text-[10px] text-zinc-400 leading-normal">
                    Successfully delivered.
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1">
                    Expected: June 2, 2026
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Right Column (Delivery Information & Actions) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">

            {/* Delivery Info Box */}
            <div className="bg-[#0F2F20] text-white rounded-[24px] p-6 shadow-sm flex flex-col gap-5">
              <h4 className="font-bold text-[16px] border-b border-white/10 pb-3">
                Delivery Information
              </h4>

              <div className="flex flex-col gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">🚚</span>
                  <div className="flex flex-col">
                    <span className="text-[#A1B8AD] text-[10px]">Delivery Partner</span>
                    <span className="font-bold">GBRU Logistics</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">📦</span>
                  <div className="flex flex-col">
                    <span className="text-[#A1B8AD] text-[10px]">Tracking Number</span>
                    <span className="font-bold">GBRU2026PB1234</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">📅</span>
                  <div className="flex flex-col">
                    <span className="text-[#A1B8AD] text-[10px]">Expected Delivery</span>
                    <span className="font-bold">June 2-5, 2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">🔧</span>
                  <div className="flex flex-col">
                    <span className="text-[#A1B8AD] text-[10px]">Free Installation</span>
                    <span className="font-bold">Scheduled after delivery</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">📞</span>
                  <div className="flex flex-col">
                    <span className="text-[#A1B8AD] text-[10px]">24/7 Support</span>
                    <span className="font-bold">1800-XXX-GBRU</span>
                  </div>
                </div>
              </div>

              {/* Sub-notice */}
              <div className="bg-white/5 border border-white/10 rounded-[14px] p-3 text-[11px] text-[#A1B8AD] leading-relaxed flex items-start gap-2">
                <span>💡</span>
                <span>Our expert will call you before delivery to confirm the best delivery time.</span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-sm">Quick Actions</h4>

              <div className="flex flex-col gap-3">
                <button className="w-full h-11 border border-zinc-200 hover:bg-zinc-50 rounded-[10px] text-xs font-bold text-[#374151] flex items-center justify-center gap-2 shadow-sm transition-all">
                  💬 WhatsApp Support
                </button>
                <button className="w-full h-11 border border-zinc-200 hover:bg-zinc-50 rounded-[10px] text-xs font-bold text-[#374151] flex items-center justify-center gap-2 shadow-sm transition-all">
                  📞 Talk to Expert
                </button>
                <button
                  onClick={triggerPrintInvoice}
                  className="w-full h-11 border border-zinc-200 hover:bg-zinc-50 rounded-[10px] text-xs font-bold text-[#374151] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  📥 Download Invoice
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Need Help? Card */}
        <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
          <h3 className="font-bold text-[#0F291B] text-lg">Need Help?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8F9FA] hover:bg-zinc-100 rounded-[16px] p-4 flex items-center gap-4 cursor-pointer transition-colors border border-zinc-100/50">
              <div className="w-12 h-12 bg-emerald-50 text-[#0D9740] rounded-full flex items-center justify-center text-lg">📞</div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-[#0F291B]">Talk to GBRU Expert</span>
                <span className="text-[10px] text-zinc-500">Get instant help from our specialists</span>
              </div>
            </div>

            <div className="bg-[#EBF7EF] hover:bg-[#e1f2e7] rounded-[16px] p-4 flex items-center gap-4 cursor-pointer transition-colors border border-zinc-100/50">
              <div className="w-12 h-12 bg-white text-[#25D366] rounded-full flex items-center justify-center text-lg">💬</div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-[#0FA84D]">WhatsApp Assistance</span>
                <span className="text-[10px] text-[#4A785D]">Chat with us on WhatsApp</span>
              </div>
            </div>

            <div className="bg-[#FCF9F3] hover:bg-[#faf4e9] rounded-[16px] p-4 flex items-center gap-4 cursor-pointer transition-colors border border-zinc-100/50">
              <div className="w-12 h-12 bg-white text-[#DFB33F] rounded-full flex items-center justify-center text-lg">⚙️</div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-[#0F291B]">Raise Service Request</span>
                <span className="text-[10px] text-zinc-500">Schedule installation or service checkup</span>
              </div>
            </div>

            <div className="bg-[#F8F9FA] hover:bg-zinc-100 rounded-[16px] p-4 flex items-center gap-4 cursor-pointer transition-colors border border-zinc-100/50">
              <div className="w-12 h-12 bg-emerald-50 text-[#0d9740] rounded-full flex items-center justify-center text-lg">🔧</div>
              <div className="flex flex-col">
                <span className="font-bold text-xs text-[#0F291B]">Installation Support</span>
                <span className="text-[10px] text-zinc-500">Book your free farm installation training</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-[14px] p-4 text-center text-xs text-zinc-500 font-medium">
            Average Response Time: <span className="font-bold text-[#0D9740]">2 Minutes</span> • Our team is here to support you at every step
          </div>
        </div>

        {/* Why Farmers Trust GBRU section */}
        <div className="bg-[#F8F9FA] rounded-[24px] p-6 lg:p-8 flex flex-col gap-8 border border-zinc-100">
          <h3 className="font-bold text-[#0F291B] text-lg text-center">Why Farmers Trust GBRU</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-zinc-200">📍</div>
              <span className="font-extrabold text-[#0F291B] text-[16px]">18,000+</span>
              <span className="text-zinc-500 text-[10px]">PAN India Support</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-zinc-200">🔧</div>
              <span className="font-extrabold text-[#0F291B] text-[16px]">&lt; 30 min</span>
              <span className="text-zinc-500 text-[10px]">Service Every 12 KM</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-zinc-200">📦</div>
              <span className="font-extrabold text-[#0F291B] text-[16px]">Genuine</span>
              <span className="text-zinc-500 text-[10px]">Genuine Spares</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-zinc-200">⚡</div>
              <span className="font-extrabold text-[#0F291B] text-[16px]">2 min</span>
              <span className="text-zinc-500 text-[10px]">Fast Support</span>
            </div>
            <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-zinc-200">🛡️</div>
              <span className="font-extrabold text-[#0F291B] text-[16px]">5 Years</span>
              <span className="text-zinc-500 text-[10px]">Warranty Protection</span>
            </div>
          </div>
        </div>

        {/* Manage Everything in Shoption App Card */}
        <div className="bg-[#0F2F20] text-white rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8 shadow-sm relative mt-4">
          <div className="flex flex-col gap-5 flex-1 z-10">
            <div className="bg-white/10 text-white text-[9px] font-bold py-1 px-3 rounded-[6px] inline-block w-fit">
              APP EXPERIENCE
            </div>
            <h3 className="font-bold text-[24px] leading-tight max-w-sm">
              Manage Everything in Shoption App
            </h3>
            <p className="text-[11px] text-[#A1B8AD] leading-relaxed max-w-md">
              Your complete agricultural equipment management ecosystem in one powerful app.
            </p>

            {/* 2-column feature checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-1 text-[11px]">
              <div className="flex gap-2">
                <span className="text-[#0D9740]">📦</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Real-Time Tracking</span>
                  <span className="text-[#A1B8AD] text-[10px]">Live updates on order status</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[#0D9740]">🔧</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Service Requests</span>
                  <span className="text-[#A1B8AD] text-[10px]">Book appointments instantly</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[#0D9740]">🛡️</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Warranty Management</span>
                  <span className="text-[#A1B8AD] text-[10px]">Complete warranty documents</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[#0D9740]">🔔</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Instant Notifications</span>
                  <span className="text-[#A1B8AD] text-[10px]">Get notified about every update</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[#0D9740]">📋</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Product History</span>
                  <span className="text-[#A1B8AD] text-[10px]">Access purchase records</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[#0D9740]">⚙️</span>
                <div className="flex flex-col leading-snug">
                  <span className="font-bold">Spare Support</span>
                  <span className="text-[#A1B8AD] text-[10px]">Order genuine spare parts</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="bg-white text-[#0F2F20] font-bold text-xs h-11 px-6 rounded-full flex items-center gap-2 shadow-sm transition-all hover:bg-zinc-100">
                Open in Shoption <span>→</span>
              </button>
              <button className="border border-white/30 text-white font-bold text-xs h-11 px-6 rounded-full flex items-center gap-2 transition-all hover:bg-white/5">
                Download App
              </button>
            </div>
          </div>

          {/* Smartphone graphics */}
          <div className="relative w-44 h-56 flex-shrink-0 z-10 self-end md:self-auto translate-y-6 md:translate-y-8">
            <Image
              src="/assets/holding_phone.png"
              alt="Shoption App Mockup"
              fill
              className="object-contain -scale-x-100"
            />
          </div>
        </div>

      </main>


    </div>
  );
}
