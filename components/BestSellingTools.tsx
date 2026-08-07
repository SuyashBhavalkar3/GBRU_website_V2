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
          const badges = [
            product.brand || "GBRU",
            discountVal > 0 ? `${discountVal.toFixed(0)}% OFF` : "Farmer's Choice"
          ];
          
          // Generate specs based on item category or fallback properties
          const specs = [
            `MOQ: ${product.moq} ${product.stock_uom}`,
            `GST HSN: ${product.gst_hsn_code || "8432"}`
          ];

          const itemImage = product.custom_image_1 || product.image || "/assets/sprayer.png";

          return (
            <div
              key={product.item_code}
              className="relative rounded-[23.68px] border border-zinc-200/80 bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{ width: "272.36px", minHeight: "480px", padding: "18.5px" }}
            >
              {/* Upper Content */}
              <div className="flex flex-col">
                {/* Product Image Thumbnail */}
                <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer">
                  <div
                    className="relative rounded-[20px] bg-[#E2F0E4]/60 overflow-hidden flex items-center justify-center hover:opacity-95 transition-opacity"
                    style={{ width: "235.36px", height: "253.12px", padding: "16px" }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={itemImage}
                        alt={product.item_name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </Link>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-[12px] mb-[10px]">
                  {badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FCD34D] text-[#78350F] font-roboto font-bold text-[10px] px-2.5 py-0.5 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Product Name */}
                <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer hover:underline text-[#0F291B] transition-all">
                  <h3 className="font-roboto font-bold text-[#0F291B] text-[16px] lg:text-[18px] leading-tight line-clamp-1">
                    {product.item_name}
                  </h3>
                </Link>

                {/* Specs List */}
                <ul className="mt-2.5 space-y-1.5 text-left">
                  {specs.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-600 font-roboto text-sm font-medium">
                      <svg
                        className="w-4 h-4 text-[#2D722F] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 rounded-[12px] bg-[#0D9740] hover:bg-[#0a7d34] text-white font-roboto font-bold text-sm flex items-center justify-center transition-all duration-300 shadow-sm w-full active:scale-[0.99]"
                style={{ height: "44px" }}
              >
                Add to Cart
              </button>
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
