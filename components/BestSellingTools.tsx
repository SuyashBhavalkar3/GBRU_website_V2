"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginPrompt from "./LoginPrompt";
import PaymentOptionModal from "./PaymentOptionModal";

export default function BestSellingTools() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/products/featured", { method: "POST" });
        if (!res.ok) {
          throw new Error("Failed to load featured tools.");
        }
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch(e) {
          console.error("Failed to parse featured JSON:", text);
          throw new Error("Invalid JSON");
        }
        if (data?.message?.status && Array.isArray(data.message.data?.data)) {
          // Take first 4 items for featured section
          setProducts(data.message.data.data.slice(0, 4));
        }
      } catch (e) {
        console.error("Error loading featured products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const formatPrice = (num: any) => {
    const val = parseFloat(num);
    return isNaN(val) ? "0.00" : val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center items-center">
        <svg className="animate-spin h-8 w-8 text-[#1E532E]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Don't render empty section
  }

  return (
    <section className="relative w-full bg-white pt-10 pb-12 px-4 lg:px-[64px] flex flex-col items-center justify-start overflow-hidden">
      {/* Header Container */}
      <div className="relative z-10 w-full lg:w-[1152px] flex items-center justify-between">
        <h2 
          className="text-[#0F291B]"
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0px"
          }}
        >
          Featured Products
        </h2>
        <Link href="/all_products">
          <button className="w-[100px] h-[32px] bg-[#1E532E] hover:bg-[#153B21] text-white font-roboto font-bold text-[12px] rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
            View All
          </button>
        </Link>
      </div>

      {/* Products Grid Container */}
      <div className="relative z-10 w-full lg:w-[1152px] mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20.85px] items-stretch">
        {products.map((product) => {
          const discountVal = product.discount || 0;
          const itemImage = product.custom_image_1 || product.image || "/assets/sprayer.png";

          return (
            <div
              key={product.item_code}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-lg relative text-left"
            >
              {/* Image Section */}
              <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer">
                <div className="relative h-56 w-full bg-gray-50 overflow-hidden flex items-center justify-center p-4 hover:opacity-90 transition-opacity">
                  {discountVal > 0 ? (
                    <div className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-[8px] z-10 bg-[#FEF5D1] text-[#78350F] border border-[#FDF4CE]">
                      {discountVal.toFixed(0)}% OFF
                    </div>
                  ) : null}
                  <img
                    src={itemImage}
                    alt={product.item_name}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </Link>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer hover:text-[#006B21] transition-colors">
                  <h3 className="font-bold text-sm text-[#1A1A1A] mb-3 leading-snug min-h-[40px] line-clamp-2">
                    {product.item_name}
                  </h3>
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.brand && (
                    <span className="bg-[#F3F4F6] text-[#4B5563] text-[9px] font-bold px-2 py-0.5 rounded">
                      {product.brand.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-bold text-[#006B21]">₹{formatPrice(product.price)}</span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-[#6B7280] line-through">₹{formatPrice(product.mrp)}</span>
                    )}
                  </div>

                  <div className="text-[11px] text-[#4B5563] font-bold mb-4 flex flex-col gap-0.5">
                    <span>Minimum Order Quantity: <span className="text-[#0F291B]">{product.moq} {product.stock_uom}</span></span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full h-11 bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-sm rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />

      <PaymentOptionModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        itemCode={selectedProduct?.item_code || ""}
      />
    </section>
  );
}
