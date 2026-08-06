"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartSummary, setCartSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const stored = localStorage.getItem("gbru_user");
        if (!stored) {
          router.push("/otp");
          return;
        }

        const parsed = JSON.parse(stored);
        // Extract mobile number from session keys
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;

        if (!mobile_no) {
          router.push("/otp");
          return;
        }

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_no }),
        });

        if (!res.ok) {
          setError("Failed to retrieve cart. Please log in again.");
          return;
        }

        const data = await res.json();
        if (data?.message?.status && data.message.data) {
          setCartItems(data.message.data.items || []);
          setCartSummary(data.message.data);
        } else {
          setError(data?.message?.message || "Failed to load cart.");
        }
      } catch (err: any) {
        console.error("Error loading cart details:", err);
        setError("Error loading cart details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const handleUpdateQty = async (itemObj: any, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    // Locally update quantity for immediate response
    setCartItems(prev =>
      prev.map(item =>
        item.item === itemObj.item
          ? { ...item, quantity: newQty, amount: item.rate * newQty }
          : item
      )
    );

    try {
      const stored = localStorage.getItem("gbru_user");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
      if (!mobile_no) return;

      const payload = {
        mobile_no,
        item: itemObj.item,
        quantity: newQty,
        payment_type: itemObj.payment_type || "Full Payment",
        full_payment_amount: itemObj.full_payment_amount || 0.0,
        full_payment_discount: itemObj.full_payment_discount || 0.0,
        COD_value: itemObj.cod_value || 0.0,
        COD_Display: itemObj.cod_display || 0.0,
        COD_discount: itemObj.cod_discount || 0.0
      };

      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resJson = await res.json();
      console.log("update_cart_item response payload:", resJson);
      if (resJson?.message?.status) {
        window.dispatchEvent(new Event("cartUpdate"));
      } else {
        console.error("Failed to sync quantity update:", resJson);
      }
    } catch (e) {
      console.error("Failed to sync quantity update to ERP:", e);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    // Locally remove item for immediate response
    setCartItems(prev => prev.filter(item => item.item !== itemId));

    try {
      const stored = localStorage.getItem("gbru_user");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
      if (!mobile_no) return;

      const res = await fetch("/api/cart/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, item: itemId })
      });

      const resJson = await res.json();
      if (resJson.message?.status) {
        window.dispatchEvent(new Event("cartUpdate"));
        setToastMessage("Product removed from cart successfully!");
        setTimeout(() => {
          setToastMessage("");
        }, 1500);
      } else {
        console.error("Failed to delete cart item:", resJson);
      }
    } catch (e) {
      console.error("Failed to delete cart item:", e);
    }
  };

  const formatPrice = (val: any) => {
    if (val === undefined || val === null) return "0.00";
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col justify-center items-center gap-3">
        <svg className="animate-spin h-8 w-8 text-[#0D9740]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-zinc-500 font-semibold text-xs">Retrieving Your Cart...</span>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const gst = 0;
  const total = subtotal;

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
          href="/all_products"
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

        {error ? (
          <div className="bg-white border border-zinc-200/80 rounded-[24px] p-12 text-center flex flex-col items-center gap-4 mt-4 shadow-sm">
            <span className="text-[48px]">⚠️</span>
            <h3 className="font-bold text-[#0F291B] text-lg">{error}</h3>
            <Link
              href="/login"
              className="bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs py-3 px-6 rounded-full shadow transition-all mt-2"
            >
              Sign In
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-zinc-200/80 rounded-[24px] p-12 text-center flex flex-col items-center gap-4 mt-4 shadow-sm">
            <span className="text-[48px]">🛒</span>
            <h3 className="font-bold text-[#0F291B] text-lg">Your cart is empty</h3>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Looks like you haven&apos;t added any products to your cart yet. Let&apos;s head back to browse GBRU heavy-duty tools.
            </p>
            <Link
              href="/all_products"
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

              {/* Product Cards List */}
              {cartItems.map((item) => {
                const itemImage = item.image || "/assets/sprayer.png";

                return (
                  <div key={item.item} className="bg-white border border-zinc-200/80 rounded-[24px] p-6 flex flex-col md:flex-row items-stretch gap-6 relative shadow-sm">

                    {/* Product Image */}
                    <div className="relative w-full md:w-[160px] h-[160px] rounded-[16px] overflow-hidden bg-zinc-50 border border-zinc-100 flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={itemImage}
                        alt={item.item_name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1 py-1 text-left">

                      {/* Info Header */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-[#0F291B] text-[18px] leading-snug">
                            {item.item_name}
                          </h3>
                          <p className="text-xs text-[#6B7280]">
                            Brand: <span className="font-bold text-[#0D9740]">{item.brand || "GBRU"}</span> | HSN: {item.gst_hsn_code}
                          </p>

                          {/* Payment Mode Badge */}
                          <div className="mt-2.5">
                            <span className="bg-[#EBF5EE] text-[#0D9740] text-[11px] font-bold py-1 px-3 rounded-[9999px]">
                              {item.payment_type ? item.payment_type.toUpperCase() : "FULL PAYMENT"}
                            </span>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => handleDeleteItem(item.item)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
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
                            onClick={() => handleUpdateQty(item, item.quantity, -1)}
                            className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1"
                          >
                            −
                          </button>
                          <span className="font-bold text-sm text-[#0F291B] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item, item.quantity, 1)}
                            className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1"
                          >
                            +
                          </button>
                        </div>

                        {/* Price display */}
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Total Price</span>
                          <span className="font-extrabold text-[#0F291B] text-[20px]">
                            ₹{formatPrice(item.amount)}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">🛡️</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Secure Transaction</span>
                    <span className="text-[10px] text-zinc-500">100% Safe Payment</span>
                  </div>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">🚚</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Fast Delivery</span>
                    <span className="text-[10px] text-zinc-500">3-5 Days Delivery</span>
                  </div>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex items-center gap-3 shadow-sm text-left">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5EE] flex items-center justify-center text-[18px]">📞</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[#0F291B]">Expert Support</span>
                    <span className="text-[10px] text-zinc-500">24/7 Helpline Available</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right Column (Order Summary & Estimates) ── */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">

              {/* Summary Box */}
              <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-5">
                <h3 className="font-roboto font-bold text-[#0F291B] text-lg">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-4 text-sm text-[#374151]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-bold">₹{formatPrice(subtotal)}</span>
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
                    <span className="text-zinc-500">Taxes & Charges</span>
                    <span className="font-bold text-[#0d9740] text-[11px] bg-[#EBF5EE] py-0.5 px-2 rounded">INCLUSIVE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-[#0F291B] text-[16px]">Total</span>
                    <span className="font-extrabold text-[#0F291B] text-[28px]">
                      ₹{formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link href="/proceed-to-checkout" className="w-full h-14 rounded-[14px] bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm mt-2">
                  Proceed to Checkout
                  <span className="text-[18px]">→</span>
                </Link>
              </div>

            </div>

          </div>
        )}

      </main>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-[#0D9740] text-white px-5 py-3.5 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <span>🗑️</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
