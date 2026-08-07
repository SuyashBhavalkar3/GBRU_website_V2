"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoginPrompt from "./LoginPrompt";
import { addToCartUtil } from "@/utils/cartUtils";

function ProductDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemCode = searchParams.get("item_code") || "24529";

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [paymentOption, setPaymentOption] = useState<"full" | "booking">("full");
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "guide" | "warranty" | "faqs">("specs");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item_code: itemCode }),
        });
        const data = await res.json();
        if (data?.message?.status && data.message.data) {
          setProduct(data.message.data);
          setActiveImgIdx(0);
          setQuantity(data.message.data.moq || 1);
        } else {
          setError(data?.message?.message || "Failed to load product details.");
        }
      } catch (err: any) {
        console.error("Error loading product details:", err);
        setError("Error loading product details.");
      } finally {
        setLoading(false);
      }
    };
    if (itemCode) {
      fetchDetails();
    }
  }, [itemCode]);

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleAddToCart = async () => {
    const user = localStorage.getItem("gbru_user");
    if (!user) {
      const pendingItem = {
        item: product.item_code,
        item_name: product.item_name,
        quantity: quantity,
        is_moq_applicable: 0,
        payment_type: paymentOption === "full" ? "Full Payment" : "Cash On Delivery",
        full_payment_amount: product.full_payment_amount || 0.0,
        full_payment_discount: product.full_payment_discount || 0.0,
        cod_value: product.cod_value || product.COD_value || 0.0,
        cod_display: product.cod_display || product.COD_Display || 0.0,
        cod_discount: product.cod_discount || product.COD_discount || 0.0,
      };
      localStorage.setItem("gbru_pending_cart_item", JSON.stringify(pendingItem));
      setShowLoginPrompt(true);
      return;
    }

    try {
      const parsed = JSON.parse(user);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
      if (!mobile_no) {
        setShowLoginPrompt(true);
        return;
      }

      setSubmitting(true);

      const payload = {
        mobile_no,
        items: [
          {
            item: product.item_code,
            quantity: quantity,
            is_moq_applicable: 0,
            payment_type: paymentOption === "full" ? "Full Payment" : "Cash On Delivery",
            full_payment_amount: product.full_payment_amount || 0.0,
            full_payment_discount: product.full_payment_discount || 0.0,
            cod_value: product.cod_value || product.COD_value || 0.0,
            cod_display: product.cod_display || product.COD_Display || 0.0,
            cod_discount: product.cod_discount || product.COD_discount || 0.0,
          }
        ]
      };

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      if (resJson.message?.status) {
        window.dispatchEvent(new Event("cartUpdate"));
        setToastType("success");
        setToastMessage(`${product.item_name} added to cart successfully!`);
        setTimeout(() => setToastMessage(""), 3000);
      } else {
        setToastType("error");
        setToastMessage(resJson.message?.message || "Failed to add product to cart.");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error in add to cart:", err);
      setToastType("error");
      setToastMessage("Failed to add product to cart.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setSubmitting(false);
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
        <span className="text-zinc-500 font-semibold text-xs">Loading Product Details...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col">
        <Navbar />
        <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 py-16 text-center flex flex-col items-center gap-4">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-lg font-bold text-red-600">{error || "Product Not Found"}</h2>
          <Link href="/all_products" className="text-[#0D9740] font-bold hover:underline">
            Back to All Products
          </Link>
        </main>
      </div>
    );
  }

  // Get dynamic valid images list
  const validImages: string[] = [];
  if (product.images) {
    Object.keys(product.images).forEach((key) => {
      const url = product.images[key];
      if (url && url.startsWith("http") && !url.endsWith("/0")) {
        validImages.push(url);
      }
    });
  }
  if (validImages.length === 0) {
    validImages.push("/assets/sprayer.png");
  }

  const activeImg = validImages[activeImgIdx] || validImages[0];

  const hasCod = Number(product?.COD_value || product?.cod_value || 0) > 0;

  const getFeaturesList = () => {
    const raw = product?.key_features || product?.features;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string" && raw.trim()) {
      return raw.split(/\n+/).map(line => line.replace(/^[\*\-\u2022]\s*/, "").trim()).filter(Boolean);
    }
    const desc = product?.description || "";
    if (desc && !desc.includes("<p>") && !desc.includes("<div>")) {
      return desc.split(/[\n\.]+/).map((line: string) => line.trim()).filter((line: string) => line.length > 5);
    }
    return [
      `Premium quality ${product?.item_name || 'equipment'} designed for Indian farming terrains.`,
      `Engineered for durability, high performance, and fuel efficiency.`,
      `Comes with standard manufacturer warranty and PAN-India service support.`
    ];
  };

  const featuresList = getFeaturesList();

  return (
    <div className="min-h-screen bg-white font-roboto relative">
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] ${toastType === "error" ? "bg-red-600" : "bg-[#006B21]"} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-down`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {toastType === "error" ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span className="font-medium font-inter">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col gap-6">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A4A4A] uppercase">
          <Link href="/" className="hover:text-[#0D9740]">Home</Link>
          <span>/</span>
          <Link href="/all_products" className="hover:text-[#0D9740]">Products</Link>
          <span>/</span>
          <span className="text-[#111] font-extrabold">{product.item_name}</span>
        </div>

        {/* Product Meta Header (Title, Subtitle, Badges) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] md:text-[36px] font-bold text-[#0F291B] tracking-tight leading-tight">
            {product.item_name}
          </h1>
          <p className="text-[#6B7280] text-[16px] font-medium">
            Brand: <span className="text-[#0D9740] font-bold">{product.brand || "GBRU"}</span>
          </p>

          {/* Quick Badges Row */}
          <div className="flex flex-wrap items-center gap-6 mt-2 text-sm text-[#374151]">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="font-bold">4.8</span>
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
          </div>
        </div>

        {/* Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">

          {/* ── Left Column (Media Gallery & Details) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Main Showcase Image */}
            <div className="relative w-full h-[320px] md:h-[480px] rounded-[24px] overflow-hidden border border-zinc-200/80 bg-zinc-50 shadow-sm flex items-center justify-center p-4">
              <img
                src={activeImg}
                alt={product.item_name}
                className="max-h-full max-w-full object-contain"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#DFB33F] text-white text-[12px] font-bold py-1.5 px-3 rounded-[9999px] shadow-sm">
                  {product.discount.toFixed(0)}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {validImages.length > 1 && (
              <div className="flex flex-wrap gap-4">
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`relative w-20 h-20 rounded-[12px] overflow-hidden border-2 bg-zinc-50 transition-all p-2 flex items-center justify-center ${activeImgIdx === idx ? "border-[#0D9740] ring-2 ring-[#0D9740]/20" : "border-zinc-200 hover:border-zinc-300"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Key Highlights */}
            <div className="bg-[#F4F6F4]/60 border border-[#E1E6E1] rounded-[20px] p-6 mt-4">
              <h3 className="font-roboto font-bold text-[#0F291B] text-[16px] mb-4">
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-[#0F291B] text-[16px] leading-tight">MOQ</span>
                  <span className="text-[#6B7280] text-[13px]">{product.moq} {product.measurement_unit || "Nos"}</span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="font-bold text-[#0d9740] text-[16px] leading-tight">Authentic Brand</span>
                  <span className="text-[#6B7280] text-[13px]">100% GBRU Quality</span>
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
                  <span className="text-[32px] font-extrabold leading-none">₹{formatPrice(product.price)}</span>
                  {product.mrp > product.price && (
                    <span className="text-[16px] line-through text-[#8CAF9C]">₹{formatPrice(product.mrp)}</span>
                  )}
                </div>
              </div>
              {product.discount > 0 && (
                <div className="bg-[#22C55E] text-[12px] font-bold py-2 px-4 rounded-[10px] shadow-sm">
                  Get {product.discount.toFixed(0)}% OFF
                </div>
              )}
            </div>

            {/* Option Cards Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">

              {/* Card 1: Full Payment */}
              <div
                onClick={() => setPaymentOption("full")}
                className={`relative flex-1 p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${paymentOption === "full"
                  ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                  : "border-zinc-200 bg-white"
                  }`}
              >
                {paymentOption === "full" && (
                  <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md text-xs">
                    ✓
                  </div>
                )}

                <div>
                  <div className="bg-[#DFB33F] text-white text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3">
                    MOST PREFERRED
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentOption === "full" ? "border-[#0d9740]" : "border-zinc-300"
                      }`}>
                      {paymentOption === "full" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                      )}
                    </div>
                    <h4 className="font-bold text-[#0F291B] text-[14px]">FULL PAYMENT</h4>
                  </div>
                  <p className="text-[11px] text-[#6B7280] mt-1.5 pl-6">Pay complete amount today</p>

                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3 pl-6">
                    <div className="flex justify-between">
                      <span>Grand Total</span>
                      <span>₹{formatPrice(product.actual_rate || product.price)}</span>
                    </div>
                    {product.full_payment_discount > 0 && (
                      <div className="flex justify-between text-[#0D9740]">
                        <span>Full Pay Discount</span>
                        <span>- ₹{formatPrice(product.full_payment_discount)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-3 pl-6">
                  <span className="text-[11px] font-medium text-[#6B7280]">Pay Now</span>
                  <div className="text-[20px] font-extrabold text-[#0f291b]">
                    ₹{formatPrice(product.full_payment_amount || product.price)}
                  </div>
                </div>
              </div>

              {/* Card 2: Cash On Delivery */}
              {hasCod && (
                <div
                  onClick={() => setPaymentOption("booking")}
                  className={`relative flex-1 p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${paymentOption === "booking"
                    ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                    : "border-zinc-200 bg-white"
                    }`}
                >
                  {paymentOption === "booking" && (
                    <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md text-xs">
                      ✓
                    </div>
                  )}

                  <div>
                    <div className="text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3 border border-zinc-300 text-zinc-500 bg-zinc-50">
                      CASH ON DELIVERY
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentOption === "booking" ? "border-[#0d9740]" : "border-zinc-300"
                        }`}>
                        {paymentOption === "booking" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                        )}
                      </div>
                      <h4 className="font-bold text-[#0F291B] text-[14px]">COD PAYMENT</h4>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-1.5 pl-6">Pay deposit & balance on delivery</p>

                    <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3 pl-6">
                      <div className="flex justify-between">
                        <span>Grand Total</span>
                        <span>₹{formatPrice(product.actual_rate || product.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pay Now (Deposit)</span>
                        <span>₹{formatPrice(product.COD_Display)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pay on Delivery</span>
                        <span>₹{formatPrice(product.COD_value)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-zinc-100 pt-3 flex flex-col pl-6">
                    <div>
                      <span className="text-[11px] font-medium text-[#6B7280]">Pay Now (Deposit)</span>
                      <div className="text-[20px] font-extrabold text-[#0f291b]">
                        ₹{formatPrice(product.COD_Display)}
                      </div>
                    </div>
                    <div className="mt-1 text-[11px] text-zinc-500">
                      Pay on Delivery: <span className="font-bold text-[#0f291b]">
                        ₹{formatPrice(product.COD_value)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* helper text */}
            {hasCod && (
              <p className="text-[11px] text-[#6B7280] leading-relaxed text-center px-4">
                {paymentOption === "full"
                  ? "Most farmers choose full payment for faster processing."
                  : `Only ₹${formatPrice(product.COD_Display)} required to reserve this product today. Remaining balance can be paid on delivery.`}
              </p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-3 px-4 bg-zinc-50 border border-zinc-100 rounded-[14px] mt-2 mb-1">
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-xs font-bold text-[#0F291B]">Select Quantity</span>
                {product?.moq > 1 && (
                  <span className="text-[10px] text-zinc-500 font-medium">
                    Minimum: {product.moq} {product.stock_uom || "Nos"}
                  </span>
                )}
              </div>
              <div className="flex items-center bg-white rounded-[9999px] border border-zinc-200 px-3 py-1 gap-4 shadow-sm">
                <button
                  onClick={() => setQuantity(prev => Math.max(product?.moq || 1, prev - 1))}
                  className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1 transition-colors"
                >
                  −
                </button>
                <span className="font-extrabold text-sm text-[#0F291B] min-w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[16px] px-1 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={submitting}
                className="w-full h-14 rounded-[14px] bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding to Cart...
                  </>
                ) : (
                  "Add to Cart"
                )}
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

          </div>

        </div>

      </main>

      {/* ── Interactive Tabs & Technical Specifications ── */}
      <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-12">
        {/* Tabs Bar */}
        <div className="flex flex-wrap border-b border-zinc-200 text-sm font-semibold text-zinc-500 mb-8">
          <button
            onClick={() => setActiveTab("specs")}
            className={`py-4 px-6 border-b-2 transition-all ${activeTab === "specs"
              ? "border-[#0D9740] text-[#0F291B] font-bold"
              : "border-transparent hover:text-[#0f291b]"
              }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`py-4 px-6 border-b-2 transition-all ${activeTab === "features"
              ? "border-[#0D9740] text-[#0F291B] font-bold"
              : "border-transparent hover:text-[#0f291b]"
              }`}
          >
            Key Features
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`py-4 px-6 border-b-2 transition-all ${activeTab === "guide"
              ? "border-[#0D9740] text-[#0F291B] font-bold"
              : "border-transparent hover:text-[#0f291b]"
              }`}
          >
            User Guide
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-zinc-100 rounded-[24px] p-6 lg:p-8 shadow-sm">
          {activeTab === "specs" && (
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[#0F291B] text-lg">Technical Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Item Name</span>
                  <span className="font-bold text-[#0F291B]">{product.item_name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Brand</span>
                  <span className="font-bold text-[#0F291B]">{product.brand || "GBRU"}</span>
                </div>

                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Minimum Order Quantity</span>
                  <span className="font-bold text-[#0F291B]">{product.moq} {product.measurement_unit || "Nos"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-zinc-100">
                  <span className="text-zinc-500">Valid From</span>
                  <span className="font-bold text-[#0F291B]">{product.valid_from || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">Key Features</h4>
              <ul className="list-disc list-inside text-sm text-[#374151] flex flex-col gap-2">
                {featuresList.map((feat: string, fIdx: number) => (
                  <li key={fIdx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[#0F291B] text-lg">User Guide & Description</h4>
              <p className="text-sm text-[#374151] leading-relaxed">
                {product.description || "No manual description is currently available for this product."}
              </p>
            </div>
          )}
        </div>
      </section>

      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </div>
  );
}

export default function ProductDetail() {

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <span className="text-zinc-500 font-medium">Loading GBRU Platform...</span>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}
