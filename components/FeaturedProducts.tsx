"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginPrompt from "./LoginPrompt";
import { addToCartUtil } from "@/utils/cartUtils";

interface ERPProduct {
  item_code: string;
  item_name: string;
  item_group: string;
  brand: string;
  stock_uom: string;
  gst_hsn_code: string;
  custom_sub_category: string;
  custom_image_path: string | null;
  custom_image_1: string | null;
  brand_id: string;
  moq: number;
  price_list: string;
  mrp: number;
  discount: number;
  oem_code: string | null;
  no_gst_price: number;
  price: number;
  actual_rate: number;
}

export default function FeaturedProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<ERPProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch("/api/products?category_id=");
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data?.data)) {
            // Take the first 10 items for the featured display
            setProducts(json.message.data.data.slice(0, 10));
          }
        }
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const handleAddToCart = async (itemCode: string) => {
    const user = localStorage.getItem("gbru_user");
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      const success = await addToCartUtil(itemCode);
      if (success) {
        window.dispatchEvent(new Event("cartUpdate"));
        setToastMessage("Product added to cart successfully!");
        setTimeout(() => setToastMessage(""), 3000);
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#006B21] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-roboto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-[#006B21] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-down">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium font-inter">{toastMessage}</span>
        </div>
      )}
      
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 w-full">
      
      {/* Header controls */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F291B] tracking-tight">
          Featured Products
        </h2>
        <Link 
          href="/products" 
          className="text-sm font-bold text-[#006B21] hover:text-[#005a1b] transition-colors flex items-center gap-1.5"
        >
          View all products <span>→</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product) => {
          const itemImage = product.custom_image_1 && product.custom_image_1.startsWith("http")
            ? product.custom_image_1
            : "/assets/sprayer.png";

          // Fixed star rating mock for premium feel
          const mockRating = (3.8 + (parseInt(product.item_code) % 15) / 10).toFixed(1);
          const mockReviews = 40 + (parseInt(product.item_code) % 95);

          return (
            <div 
              key={product.item_code}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg relative p-4 group"
            >
              {/* Discount Sticker */}
              {product.discount && product.discount > 0 ? (
                <div className="absolute top-4 left-4 px-2 py-0.5 text-[10px] font-bold rounded bg-[#FEF5D1] text-[#78350F] z-10 border border-[#FDF4CE]">
                  {product.discount.toFixed(0)}% OFF
                </div>
              ) : null}

              {/* Image box */}
              <div className="relative w-full aspect-square bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-3 mb-4">
                <img 
                  src={itemImage} 
                  alt={product.item_name}
                  className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-xs text-[#1A1A1A] line-clamp-2 leading-snug min-h-[32px] mb-2 group-hover:text-[#0D9740] transition-colors">
                  {product.item_name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3 text-[10px] font-semibold text-zinc-500">
                  <span className="text-amber-500 text-xs">★</span>
                  <span className="text-[#1A1A1A]">{mockRating}</span>
                  <span>({mockReviews})</span>
                </div>

                <div className="mt-auto">
                  {/* Prices */}
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-sm font-extrabold text-[#0D9740]">₹{formatPrice(product.price)}</span>
                    {product.mrp > product.price && (
                      <span className="text-[10px] text-zinc-400 line-through">₹{formatPrice(product.mrp)}</span>
                    )}
                  </div>

                  {/* Add to Cart button */}
                  <button 
                    onClick={() => handleAddToCart(product.item_code)}
                    className="w-full bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Login Prompt Popup */}
      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
      </div>
    </section>
  );
}
