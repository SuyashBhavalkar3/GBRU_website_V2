"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const images = [
  "/assets/gbru_tractor_main.png",
  "/assets/gbru_tractor_thumb2.png",
  "/assets/gbru_tractor_thumb3.png",
  "/assets/gbru_tractor_thumb4.png",
];

export default function ProductDetail() {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [paymentOption, setPaymentOption] = useState<"full" | "booking">("full");
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "guide" | "warranty" | "faqs">("specs");

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
      <Navbar />

      {/* Main Container */}
      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col gap-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A4A4A] uppercase">
          <Link href="/" className="hover:text-[#0D9740]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0D9740]">Tractors</Link>
          <span>/</span>
          <span className="text-[#111] font-extrabold">GBRU Pro-Series 5000</span>
        </div>

        {/* Product Meta Header (Title, Subtitle, Badges) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[36px] font-bold text-[#0F291B] tracking-tight">
            GBRU Pro-Series 5000
          </h1>
          <p className="text-[#6B7280] text-[16px]">
            Premium Multi-Purpose Agricultural Tractor
          </p>

          {/* Quick Badges Row */}
          <div className="flex flex-wrap items-center gap-6 mt-2 text-sm text-[#374151]">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="font-bold">4.9</span>
              <span className="text-[#6B7280]">(2,847)</span>
            </div>
            <div className="h-4 w-px bg-zinc-300"></div>
            <div className="flex items-center gap-1.5 text-[#0D9740] font-semibold">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              In Stock
            </div>
            <div className="h-4 w-px bg-zinc-300"></div>
            <div className="flex items-center gap-1.5 text-[#374151]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-400">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
              </svg>
              3-5 Days Delivery
            </div>
            <div className="h-4 w-px bg-zinc-300"></div>
            <div className="flex items-center gap-1.5 text-[#374151]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-400">
                <path fillRule="evenodd" d="M9.661 2.237a.75.75 0 01.678 0l7.25 3.5a.75.75 0 01.411.676v7.124a3 3 0 01-1.579 2.63l-5.75 3.125a.75.75 0 01-.684 0l-5.75-3.125A3 3 0 013 13.537V6.413a.75.75 0 01.411-.676l7.25-3.5zM10 3.62L4.5 6.277v7.26c0 .8.44 1.54 1.151 1.926L10 18.067l4.349-2.604A2.25 2.25 0 0015.5 13.536V6.278L10 3.62z" clipRule="evenodd" />
              </svg>
              5 Year Warranty
            </div>
          </div>
        </div>

        {/* Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* ── Left Column (Media Gallery & Details) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Showcase Image */}
            <div className="relative w-full h-[400px] md:h-[480px] rounded-[24px] overflow-hidden border border-zinc-200/80 bg-zinc-50 shadow-sm">
              <Image
                src={images[activeImgIdx]}
                alt="GBRU Pro-Series 5000"
                fill
                className="object-cover"
                priority
              />
              {/* New Launch Badge */}
              <div className="absolute top-4 left-4 bg-[#DFB33F] text-white text-[12px] font-bold py-1.5 px-3 rounded-[9999px] shadow-sm">
                New Launch
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative w-20 h-20 rounded-[12px] overflow-hidden border-2 bg-zinc-100 transition-all ${
                    activeImgIdx === idx ? "border-[#0D9740] ring-2 ring-[#0D9740]/20" : "border-transparent hover:border-zinc-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="bg-[#F4F6F4]/60 border border-[#E1E6E1] rounded-[20px] p-6 mt-4">
              <h3 className="font-roboto font-bold text-[#0F291B] text-[16px] mb-6">
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[#0F291B] text-[18px] leading-tight">50 HP Engine</span>
                  <span className="text-[#6B7280] text-[13px]">High Torque</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[#0F291B] text-[18px] leading-tight">8+2 Gearbox</span>
                  <span className="text-[#6B7280] text-[13px]">Smooth Shift</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[#0F291B] text-[18px] leading-tight">1800 kg</span>
                  <span className="text-[#6B7280] text-[13px]">Lifting Capacity</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-[#0d9740] text-[18px] leading-tight">Fuel Efficient</span>
                  <span className="text-[#6B7280] text-[13px]">Save ₹30k/yr</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column (Booking & Checkout Options) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Limited Time Offer Price Banner */}
            <div className="bg-[#2D5A42] rounded-[16px] p-5 text-white flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold tracking-widest text-[#A7C7B6] uppercase">
                  LIMITED TIME OFFER
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-extrabold leading-none">₹8,499</span>
                  <span className="text-[16px] line-through text-[#8CAF9C]">₹9,999</span>
                </div>
              </div>
              <div className="bg-[#22C55E] text-[12px] font-bold py-2 px-4 rounded-[10px] shadow-sm">
                Get 15% OFF
              </div>
            </div>

            {/* Option Cards Row */}
            <div className="flex gap-4 items-stretch">
              
              {/* Card 1: Full Payment */}
              <div
                onClick={() => setPaymentOption("full")}
                className={`relative flex-1 p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentOption === "full"
                    ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                    : "border-zinc-200 bg-white"
                }`}
              >
                {paymentOption === "full" && (
                  <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    ✓
                  </div>
                )}
                
                <div>
                  <div className="bg-[#DFB33F] text-white text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3">
                    MOST PREFERRED
                  </div>
                  <h4 className="font-bold text-[#0F291B] text-[14px]">FULL PAYMENT</h4>
                  <p className="text-[11px] text-[#6B7280] mt-1">Pay complete amount today</p>
                  
                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                    <div className="flex justify-between">
                      <span>Order Total</span>
                      <span>₹8,499</span>
                    </div>
                    <div className="flex justify-between text-[#0D9740]">
                      <span>Instant Discount</span>
                      <span>- ₹1,248.74</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-3">
                  <span className="text-[11px] font-medium text-[#6B7280]">Pay Now</span>
                  <div className="text-[20px] font-extrabold text-[#0f291b]">₹7,251</div>
                </div>

                <ul className="mt-4 flex flex-col gap-2 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9740] font-bold">✓</span> Priority Dispatch
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9740] font-bold">✓</span> Fastest Delivery
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9740] font-bold">✓</span> Full Warranty Benefits
                  </li>
                </ul>
              </div>

              {/* Card 2: Book Product */}
              <div
                onClick={() => setPaymentOption("booking")}
                className={`relative flex-1 p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  paymentOption === "booking"
                    ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                    : "border-zinc-200 bg-white"
                }`}
              >
                {paymentOption === "booking" && (
                  <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    ✓
                  </div>
                )}

                <div>
                  <div className="text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3 border border-zinc-300 text-zinc-500">
                    BOOK PRODUCT
                  </div>
                  <h4 className="font-bold text-[#0F291B] text-[14px]">BOOKING DEPOSIT</h4>
                  <p className="text-[11px] text-[#6B7280] mt-1">Reserve with small amount</p>

                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                    <div className="flex justify-between">
                      <span>Total Price</span>
                      <span>₹8,499</span>
                    </div>
                    <div className="flex justify-between text-[#0d9740]">
                      <span>Discount</span>
                      <span>- ₹948.74</span>
                    </div>
                    <div className="flex justify-between bg-emerald-50 px-1 py-0.5 rounded text-[11px]">
                      <span>Effective Total</span>
                      <span className="font-bold text-[#0d9740]">₹7,550</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-3 flex flex-col">
                  <div>
                    <span className="text-[11px] font-medium text-[#6B7280]">Pay Now (Booking)</span>
                    <div className="text-[20px] font-extrabold text-[#0f291b]">₹1,000</div>
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500">
                    Pay on Delivery: <span className="font-bold text-[#0f291b]">₹6,550</span>
                  </div>
                </div>

                <ul className="mt-4 flex flex-col gap-2 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                  <li className="flex items-center gap-1.5">
                    <span className="text-zinc-400">✓</span> Secure Product Today
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-zinc-400">✓</span> Balance on Delivery
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-zinc-400">✓</span> Easy Reservation Process
                  </li>
                </ul>
              </div>

            </div>

            {/* helper text */}
            <p className="text-[11px] text-[#6B7280] leading-relaxed text-center px-4">
              {paymentOption === "full"
                ? "Most farmers choose full payment for faster processing."
                : "Only ₹1,000 required to reserve this product today. Remaining balance can be paid on delivery."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full h-14 rounded-[14px] bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm">
                Add to Cart {paymentOption === "full" ? "₹ 7,251" : "₹ 1,000"}
              </button>

              <button className="w-full h-14 rounded-[14px] bg-[#22C55E] hover:bg-[#1eb053] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.132 1.233 8.37 3.472A11.758 11.758 0 0 1 23.7 11.886c-.004 6.533-5.33 11.858-11.86 11.858-2.003-.001-3.973-.509-5.727-1.478L0 24zm6.549-3.722c1.656.982 3.284 1.498 4.887 1.499 5.342 0 9.691-4.348 9.694-9.69C21.19 6.745 16.993 2.5 11.864 2.5a9.686 9.686 0 0 0-8.291 14.858l-.993 3.629 3.737-.98-.21-.129zm10.174-6.856c-.287-.144-1.695-.837-1.958-.933-.263-.096-.454-.144-.645.144-.191.288-.741.933-.909 1.124-.167.191-.335.215-.622.072-.287-.144-1.21-.446-2.305-1.424-.853-.761-1.429-1.701-1.597-1.989-.168-.287-.018-.443.126-.585.129-.127.287-.335.43-.502.144-.167.191-.287.287-.478.096-.191.048-.36-.024-.503-.072-.144-.645-1.554-.885-2.128-.233-.561-.469-.485-.645-.494-.168-.008-.36-.01-.55-.01s-.502.072-.765.36c-.263.288-1.004.981-1.004 2.392s1.028 2.775 1.171 2.967c.143.191 2.023 3.088 4.901 4.33.684.296 1.218.472 1.634.604.687.218 1.312.187 1.806.114.551-.082 1.695-.693 1.934-1.362.24-.669.24-1.243.167-1.362-.072-.119-.263-.191-.55-.335z" />
                </svg>
                WhatsApp Support
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-200/80 pt-6">
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                <span className="text-emerald-600 text-[18px]">📍</span> PAN India
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                <span className="text-emerald-600 text-[18px]">⚙️</span> Genuine Parts
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                <span className="text-emerald-600 text-[18px]">🔧</span> Every 12 KM
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                <span className="text-emerald-600 text-[18px]">🛡️</span> Secure Payment
              </div>
            </div>

            {/* Bottom Trusted Box */}
            <div className="bg-[#F8FBF8] border border-[#E5F2E8] py-4 px-6 rounded-[14px] flex items-center justify-center gap-2 mt-2">
              <span className="text-[18px]">🏆</span>
              <span className="text-xs font-bold text-[#0F291B]">
                Trusted by 3,524 Farmers across India
              </span>
            </div>

          </div>

        </div>

      </main>

      {/* ── Full-Width Green Trust Banner ── */}
      <section className="w-full bg-[#305C45] text-white py-8 mt-12 px-4 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[20px]">📍</div>
            <span className="font-bold text-sm">PAN India Support</span>
            <span className="text-[11px] text-[#A2C3B2]">Service in 18,000+ locations</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[20px]">📦</div>
            <span className="font-bold text-sm">Spare Parts Available</span>
            <span className="text-[11px] text-[#A2C3B2]">24/7 availability guarantee</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[20px]">🔧</div>
            <span className="font-bold text-sm">Presence Every 12 KM</span>
            <span className="text-[11px] text-[#A2C3B2]">Quick service access</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[20px]">⚡</div>
            <span className="font-bold text-sm">Fast Service</span>
            <span className="text-[11px] text-[#A2C3B2]">Same day response</span>
          </div>
          <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[20px]">🛡️</div>
            <span className="font-bold text-sm">Secure Payment</span>
            <span className="text-[11px] text-[#A2C3B2]">100% safe & encrypted</span>
          </div>
        </div>
      </section>

      {/* ── Interactive Tabs & Technical Specifications ── */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-12">
        {/* Tabs Bar */}
        <div className="flex flex-wrap border-b border-zinc-200 text-sm font-semibold text-zinc-500 mb-8">
          <button
            onClick={() => setActiveTab("specs")}
            className={`py-4 px-6 border-b-2 transition-all ${
              activeTab === "specs"
                ? "border-[#0D9740] text-[#0F291B] font-bold"
                : "border-transparent hover:text-[#0f291b]"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`py-4 px-6 border-b-2 transition-all ${
              activeTab === "features"
                ? "border-[#0D9740] text-[#0F291B] font-bold"
                : "border-transparent hover:text-[#0f291b]"
            }`}
          >
            Key Features
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`py-4 px-6 border-b-2 transition-all ${
              activeTab === "guide"
                ? "border-[#0D9740] text-[#0F291B] font-bold"
                : "border-transparent hover:text-[#0f291b]"
            }`}
          >
            User Guide
          </button>
          <button
            onClick={() => setActiveTab("warranty")}
            className={`py-4 px-6 border-b-2 transition-all ${
              activeTab === "warranty"
                ? "border-[#0D9740] text-[#0F291B] font-bold"
                : "border-transparent hover:text-[#0f291b]"
            }`}
          >
            Warranty
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`py-4 px-6 border-b-2 transition-all ${
              activeTab === "faqs"
                ? "border-[#0D9740] text-[#0F291B] font-bold"
                : "border-transparent hover:text-[#0f291b]"
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-zinc-100 rounded-[24px] p-6 lg:p-8 shadow-sm">
          {activeTab === "specs" && (
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[#0F291B] text-lg">Technical Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Engine Power</span>
                  <span className="font-bold text-[#0F291B]">50 HP</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Lifting Capacity</span>
                  <span className="font-bold text-[#0F291B]">1800 kg</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Engine Type</span>
                  <span className="font-bold text-[#0F291B]">4 Cylinder Water Cooled</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Fuel Tank</span>
                  <span className="font-bold text-[#0F291B]">65 Liters</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Gear Box</span>
                  <span className="font-bold text-[#0F291B]">8 Forward + 2 Reverse</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Brakes</span>
                  <span className="font-bold text-[#0F291B]">Oil Immersed Brakes</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">PTO Power</span>
                  <span className="font-bold text-[#0F291B]">42.5 HP @ 540 RPM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Weight</span>
                  <span className="font-bold text-[#0F291B]">2250 kg</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">Key Features</h4>
              <ul className="list-disc list-inside text-sm text-[#374151] flex flex-col gap-2">
                <li>Heavy-duty structure built for extreme field terrains.</li>
                <li>Dynamic power steering for effortless navigation.</li>
                <li>Digital smart diagnostic engine monitor panel.</li>
                <li>Dual clutch configuration for advanced implement control.</li>
              </ul>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">User Guide & Downloads</h4>
              <p className="text-sm text-[#374151]">
                Download our comprehensive user manual and operating instructions.
              </p>
              <div className="flex gap-4 mt-2">
                <button className="bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs py-2.5 px-5 rounded-[8px]">
                  Download Manual PDF
                </button>
              </div>
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">Warranty Information</h4>
              <p className="text-sm text-[#374151] leading-relaxed">
                Enjoy peace of mind with GBRU's premium 5-Year Comprehensive Warranty covering the engine, transmission, hydraulics, and structural chassis frame. Includes free annual health checks.
              </p>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">Frequently Asked Questions</h4>
              <div className="flex flex-col gap-4 text-sm mt-2">
                <div>
                  <span className="font-bold text-[#0f291b] block">Q: Can I pay cash on delivery?</span>
                  <span className="text-zinc-600 block mt-1">A: Yes, with the Booking Option you pay ₹1,000 now to reserve, and the remaining ₹6,550 on delivery.</span>
                </div>
                <div>
                  <span className="font-bold text-[#0f291b] block">Q: Is home delivery available?</span>
                  <span className="text-zinc-600 block mt-1">A: Yes, we ship directly to your farm locations anywhere across India.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── See It in Action Section ── */}
      <section className="w-full bg-[#F7F9F7] py-16 px-4 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto">
          <h2 className="font-roboto font-bold text-[#0F291B] text-[32px] mb-2">
            See It in Action
          </h2>
          <p className="text-[#6B7280] text-sm mb-10">
            Real farmers, real results from across India
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Video Card 1 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-100 shadow-sm flex flex-col group cursor-pointer">
              <div className="relative h-44 bg-zinc-100 overflow-hidden">
                <Image
                  src="/assets/gbru_action_success.png"
                  alt="Farmer Success Story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-emerald-700 text-lg pl-0.5">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] py-0.5 px-1.5 rounded">
                  3:24
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="font-bold text-[#0F291B] text-[14px]">Farmer Success Story</span>
                <span className="text-xs text-[#6B7280]">Ramesh Kumar from Punjab</span>
              </div>
            </div>

            {/* Video Card 2 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-100 shadow-sm flex flex-col group cursor-pointer">
              <div className="relative h-44 bg-zinc-100 overflow-hidden">
                <Image
                  src="/assets/gbru_action_demo.png"
                  alt="Field Demo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-emerald-700 text-lg pl-0.5">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] py-0.5 px-1.5 rounded">
                  5:12
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="font-bold text-[#0F291B] text-[14px]">Field Demo</span>
                <span className="text-xs text-[#6B7280]">Ploughing Performance</span>
              </div>
            </div>

            {/* Video Card 3 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-100 shadow-sm flex flex-col group cursor-pointer">
              <div className="relative h-44 bg-zinc-100 overflow-hidden">
                <Image
                  src="/assets/gbru_field_workshop.png"
                  alt="Installation Guide"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-emerald-700 text-lg pl-0.5">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] py-0.5 px-1.5 rounded">
                  2:45
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="font-bold text-[#0F291B] text-[14px]">Installation Guide</span>
                <span className="text-xs text-[#6B7280]">Setup in 30 Minutes</span>
              </div>
            </div>

            {/* Video Card 4 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-100 shadow-sm flex flex-col group cursor-pointer">
              <div className="relative h-44 bg-zinc-100 overflow-hidden">
                <Image
                  src="/assets/gbru_field_punjab_expo.png"
                  alt="Exhibition Highlights"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-all">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-emerald-700 text-lg pl-0.5">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] py-0.5 px-1.5 rounded">
                  4:18
                </span>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <span className="font-bold text-[#0F291B] text-[14px]">Exhibition Highlights</span>
                <span className="text-xs text-[#6B7280]">India Agri Expo 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Complete Your Farm Setup Section ── */}
      <section className="w-full bg-white py-16 px-4 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto">
          <h2 className="font-roboto font-bold text-[#0F291B] text-[32px] mb-2">
            Complete Your Farm Setup
          </h2>
          <p className="text-[#6B7280] text-sm mb-10">
            Frequently bought together - Build your complete agricultural solution
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rec 1 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-40 w-full bg-[#EAF2ED] rounded-[14px] overflow-hidden mb-4">
                  <Image
                    src="/assets/cat_seeders.png"
                    alt="Rotavator Attachment"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="font-bold text-[#0F291B] text-sm">Rotavator Attachment</h4>
                <p className="text-xs text-[#6B7280] mt-1">Heavy-duty soil preparation</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-zinc-100">
                <span className="font-extrabold text-[#0F291B]">₹45,000</span>
                <button className="w-8 h-8 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>

            {/* Rec 2 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-40 w-full bg-[#EAF2ED] rounded-[14px] overflow-hidden mb-4">
                  <Image
                    src="/assets/cat_seeders.png"
                    alt="Seed Drill"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="font-bold text-[#0F291B] text-sm">Seed Drill</h4>
                <p className="text-xs text-[#6B7280] mt-1">Precision seeding system</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-zinc-100">
                <span className="font-extrabold text-[#0F291B]">₹35,000</span>
                <button className="w-8 h-8 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>

            {/* Rec 3 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-40 w-full bg-[#EAF2ED] rounded-[14px] overflow-hidden mb-4">
                  <Image
                    src="/assets/cat_sprayers.png"
                    alt="Agricultural Sprayer"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="font-bold text-[#0F291B] text-sm">Agricultural Sprayer</h4>
                <p className="text-xs text-[#6B7280] mt-1">Boom sprayer 400L capacity</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-zinc-100">
                <span className="font-extrabold text-[#0F291B]">₹28,000</span>
                <button className="w-8 h-8 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>

            {/* Rec 4 */}
            <div className="bg-white rounded-[20px] overflow-hidden border border-zinc-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-40 w-full bg-[#EAF2ED] rounded-[14px] overflow-hidden mb-4">
                  <Image
                    src="/assets/cat_accessories.png"
                    alt="Trailer 2-Ton"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="font-bold text-[#0F291B] text-sm">Trailer 2-Ton</h4>
                <p className="text-xs text-[#6B7280] mt-1">Heavy duty farm trailer</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-zinc-100">
                <span className="font-extrabold text-[#0F291B]">₹65,000</span>
                <button className="w-8 h-8 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
