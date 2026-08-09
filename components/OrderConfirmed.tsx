"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Package, Phone, Wrench, Shield } from "lucide-react";

export default function OrderConfirmed() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("orderId");
      setOrderId(id);
    }
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const userStr = localStorage.getItem("gbru_user");
        if (!userStr) {
          setLoading(false);
          return;
        }
        const user = JSON.parse(userStr);
        const mobile_no = user.customer_id?.split('-')[1] || user.user_id || user.mobile_no;
        if (!mobile_no) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/orders/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_no, order_id: orderId }),
        });
        const data = await res.json();
        if (data?.message?.status && data.message.data) {
          setOrderDetails(data.message.data);
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const formatPrice = (val: any) => {
    if (val === undefined || val === null) return "0.00";
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <svg className="animate-spin h-8 w-8 text-[#0D9740]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-zinc-500 font-semibold text-xs">Loading Order Details...</span>
        </div>
      </div>
    );
  }

  // Get first item details for display card, fallback to default tractor if no items or invalid order
  const displayItem = orderDetails?.items?.[0] || {
    item_name: "GBRU Pro-Series 5000",
    description: "Premium Multi-Purpose Agricultural Tractor",
    image: "/assets/gbru_tractor_main.png"
  };

  const deliveryDateStr = orderDetails?.delivery_date 
    ? new Date(orderDetails.delivery_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "June 2-5, 2026";

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col items-center gap-8">
        
        {/* Success Icon, Heading, and Order ID */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-md border-4 border-white">
            <Image src="/assets/order_confirm.png" alt="Order Confirmed" width={80} height={80} className="object-cover" />
          </div>
          <h1 className="text-[36px] font-extrabold text-[#0F291B] tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-zinc-500 text-sm">
            Thank you for choosing GBRU
          </p>
          <span className="text-xs text-zinc-500 font-bold bg-zinc-100 py-1.5 px-4 rounded-[8px] mt-2">
            Order ID: <span className="text-[#0F291B]">#{orderId || "GBRU2026052901"}</span>
          </span>
        </div>

        {/* Product Details Card */}
        <div className="max-w-[800px] w-full bg-white border border-zinc-200/85 rounded-[24px] p-6 shadow-sm flex flex-col md:flex-row items-stretch gap-6 relative mt-2">
          {/* Image */}
          <div className="relative w-full md:w-[120px] h-[120px] rounded-[16px] overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
            <Image
              src={displayItem.image || "/assets/gbru_tractor_main.png"}
              alt={displayItem.item_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between flex-1 py-1">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-[#0F291B] text-[18px]">
                {displayItem.item_name}
              </h3>
              <p className="text-xs text-zinc-500">
                {displayItem.description || "Premium Multi-Purpose Agricultural Equipment"}
              </p>
              
              <div className="flex items-center gap-3 mt-3">
                <span className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-bold py-1 px-3 rounded-[6px]">
                  {orderDetails?.status || "Confirmed"}
                </span>
                <span className="text-xs text-zinc-500">
                  Delivery: <span className="font-semibold text-[#0F291B]">{deliveryDateStr}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-6">
              <span className="text-xs font-bold text-zinc-500 uppercase">Total Amount</span>
              <span className="font-extrabold text-[#0F291B] text-[20px]">
                ₹{formatPrice(orderDetails?.grand_total || "1032500")}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Button Row */}
        <div className="max-w-[800px] w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Link
            href="/products"
            className="h-12 border-2 border-zinc-200 hover:border-zinc-300 rounded-[14px] text-[#0F291B] font-bold text-sm flex items-center justify-center transition-all shadow-sm"
          >
            Continue Shopping
          </Link>
          <button className="h-12 bg-[#0FA84D] hover:bg-[#0b8a3d] text-white font-bold text-sm rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.275-3.975-6.871-6.871l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Contact Support
          </button>
          <Link
            href="/orders"
            className="h-12 bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-sm rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <div className="flex items-center justify-center w-5 h-5 shrink-0 relative">
              <div 
                className="w-[16px] h-[16px] border-[2px] border-white rounded-tl-full rounded-tr-full rounded-bl-full rotate-45 flex items-center justify-center bg-transparent relative top-[-1px]"
                style={{ borderBottomRightRadius: '2px' }}
              >
                <div className="w-[5px] h-[5px] bg-white rounded-full" />
              </div>
            </div>
            Track Order
          </Link>
        </div>

        {/* "What Happens Next?" Section */}
        <div className="max-w-[800px] w-full bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6 mt-4">
          <h3 className="font-bold text-[#0F291B] text-lg">
            What Happens Next?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#EEF2EF] flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-[#163625]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-[#0F291B]">Order Processing</span>
                <span className="text-[10px] text-zinc-500 leading-normal">
                  Your order is being prepared for dispatch. Expected dispatch: Tomorrow.
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#FDF8EB] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#D89B2B]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-[#0F291B]">Expert Call</span>
                <span className="text-[10px] text-zinc-500 leading-normal">
                  Our expert will call you within 2 hours to confirm delivery details.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#EEF2EF] flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6 text-[#385341]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-[#0F291B]">Free Installation</span>
                <span className="text-[10px] text-zinc-500 leading-normal">
                  Our technician will install and provide training at your farm.
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#E8F8ED] flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-[#1FA652]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xs text-[#0F291B]">Warranty Activation</span>
                <span className="text-[10px] text-zinc-500 leading-normal">
                  5-year warranty will be activated upon installation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manage with Shoption App Card */}
        <div 
          className="max-w-[800px] w-full text-white rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8 shadow-sm relative mt-4"
          style={{ background: 'linear-gradient(343.13deg, #0B5D3B 3.06%, #043321 55.88%)' }}
        >
          <div className="flex flex-col gap-5 flex-1 z-10">
            <h3 className="font-bold text-[22px] leading-tight max-w-sm">
              Manage with Shoption App
            </h3>
            <p className="text-[11px] text-[#A1B8AD] leading-relaxed max-w-md">
              Download the Shoption app to track your order, request service, and access expert support.
            </p>

            <ul className="text-xs flex flex-col gap-2 mt-1">
              <li className="flex items-center gap-2">
                <span className="text-[#0D9740]">●</span> Real-time Order Tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0D9740]">●</span> Service Request Management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0D9740]">●</span> Warranty & Spare Parts Support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0D9740]">●</span> 24/7 Expert Help
              </li>
            </ul>

            <div className="mt-3">
              <button className="bg-white text-[#0F2F20] font-bold text-xs py-3 px-6 rounded-full flex items-center gap-2 shadow-sm transition-all hover:bg-zinc-100">
                Download Shoption App <span>→</span>
              </button>
            </div>
          </div>

          {/* Smartphone graphics */}
          <div className="relative w-64 h-72 md:w-[280px] md:h-[280px] flex-shrink-0 z-10 self-end md:self-auto translate-y-6 md:translate-y-8">
            <Image
              src="/assets/mobile-screen-mockup.png"
              alt="Shoption App Mockup"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </main>
    </div>
  );
}
