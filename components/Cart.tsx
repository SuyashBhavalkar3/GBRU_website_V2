"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsStr = localStorage.getItem("gbru_cart_items");
    if (itemsStr) {
      try {
        setCartItems(JSON.parse(itemsStr));
      } catch (e) {
        console.error("Failed to parse cart items");
      }
    }
    setLoading(false);
  }, []);

  const gstRate = 0.18;

  // Calculate totals from items
  const subtotal = cartItems.reduce((acc, item) => acc + (item.amount || (item.rate * item.quantity)), 0);
  const gst = Math.round(subtotal * gstRate);
  const total = subtotal + gst;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-10 h-10 border-4 border-[#006B21] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col gap-6">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="flex items-center gap-1.5 text-sm font-bold text-[#0D9740] hover:underline"
        >
          ← Back to Shopping
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[36px] font-extrabold text-[#0F291B] tracking-tight">
            Your Cart
          </h1>
          <p className="text-[#6B7280] text-sm">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-zinc-200/80 rounded-[24px] p-12 text-center flex flex-col items-center gap-4 mt-4 shadow-sm">
            <span className="text-[48px]">🛒</span>
            <h3 className="font-bold text-[#0F291B] text-lg">Your cart is empty</h3>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Looks like you haven't added any products to your cart yet. Let's head back to browse GBRU heavy-duty tools.
            </p>
            <Link
              href="/products"
              className="bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs py-3 px-6 rounded-full shadow transition-all mt-2"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Column Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
            
            {/* ── Left Column (Cart Item & Trust Badges) ── */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {cartItems.map((item, index) => (
                <div key={item.item || index} className="bg-white border border-zinc-200/80 rounded-[24px] p-6 flex flex-col md:flex-row items-stretch gap-6 relative shadow-sm">
                  
                  {/* Product Image */}
                  <div className="relative w-full md:w-[160px] h-[160px] rounded-[16px] overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0">
                    <Image
                      src={item.custom_image_1 || "/assets/gbru_tractor_main.png"}
                      alt={item.item_name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    
                    {/* Info Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[#0F291B] text-[18px] leading-snug">
                          {item.item_name || item.item}
                        </h3>
                        <p className="text-xs text-[#6B7280]">
                          Brand: {item.brand || "GBRU"}
                        </p>
                        
                        {/* Payment Mode Badge */}
                        <div className="mt-2.5">
                          <span className="bg-[#EBF5EE] text-[#0D9740] text-[11px] font-bold py-1 px-3 rounded-[9999px]">
                            Full Payment
                          </span>
                        </div>
                      </div>

                      {/* Trash Button */}
                      <button
                        onClick={() => {
                          const updated = cartItems.filter((_, i) => i !== index);
                          setCartItems(updated);
                          localStorage.setItem("gbru_cart_items", JSON.stringify(updated));
                        }}
                        className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Item"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.587 7.402a.75.75 0 01.796.7l.25 4a.75.75 0 11-1.492.094l-.25-4a.75.75 0 01.7-.796zm3-.7l.25 4a.75.75 0 01-.796.796a.75.75 0 01-.7-.796l.25-4a.75.75 0 011 .7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity & Total Price Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-100">
                      {/* Quantity Toggle */}
                      <div className="flex items-center bg-[#F4F6F4] rounded-[9999px] px-3 py-1.5 gap-4">
                        <button
                          onClick={() => {
                            const newQty = Math.max(1, item.quantity - 1);
                            const updated = [...cartItems];
                            updated[index] = { ...item, quantity: newQty, amount: newQty * item.rate };
                            setCartItems(updated);
                            localStorage.setItem("gbru_cart_items", JSON.stringify(updated));
                          }}
                          className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1"
                        >
                          −
                        </button>
                        <span className="font-bold text-sm text-[#0F291B] min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            const newQty = item.quantity + 1;
                            const updated = [...cartItems];
                            updated[index] = { ...item, quantity: newQty, amount: newQty * item.rate };
                            setCartItems(updated);
                            localStorage.setItem("gbru_cart_items", JSON.stringify(updated));
                          }}
                          className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1"
                        >
                          +
                        </button>
                      </div>

                      {/* Price display */}
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Total Price</span>
                        <span className="font-extrabold text-[#0F291B] text-[20px]">
                          ₹{(item.amount || (item.rate * item.quantity)).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">🛡️</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Secure Transaction</span>
                    <span className="text-[10px] text-zinc-500">100% Safe Payment</span>
                  </div>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">🚚</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Fast Delivery</span>
                    <span className="text-[10px] text-zinc-500">3-5 Days Delivery</span>
                  </div>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">📞</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Expert Support</span>
                    <span className="text-[10px] text-zinc-500">24/7 Helpline Available</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right Column (Order Summary & Estimates) ── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Summary Box */}
              <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-5">
                <h3 className="font-roboto font-bold text-[#0F291B] text-lg">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-4 text-sm text-[#374151]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Delivery</span>
                    <span className="font-bold text-[#0d9740]">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Installation</span>
                    <span className="font-bold text-[#0d9740]">FREE</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-zinc-100">
                    <span className="text-zinc-500">GST (18%)</span>
                    <span className="font-bold">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-[#0F291B] text-[16px]">Total</span>
                    <span className="font-extrabold text-[#0F291B] text-[28px]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link href="/proceed-to-checkout" className="w-full h-14 rounded-[14px] bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm mt-2">
                  Proceed to Checkout
                  <span className="text-[18px]">→</span>
                </Link>
              </div>

              {/* Delivery Estimates */}
              <div className="bg-[#F8F9FA] rounded-[20px] p-5 flex flex-col gap-3 border border-zinc-100">
                <span className="font-bold text-xs text-[#0F291B]">Estimated Delivery</span>
                <div className="flex items-center gap-2 text-xs text-[#374151]">
                  <span className="text-red-500">📍</span>
                  <span>Delivery to <span className="font-bold text-[#0f291b]">Ludhiana, Punjab</span></span>
                </div>
                <div className="text-xs text-emerald-600 font-bold ml-5">
                  Expected: June 2-5, 2026
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
