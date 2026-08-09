"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginPrompt from "./LoginPrompt";
import PaymentOptionModal from "./PaymentOptionModal";

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

interface Subcategory {
  sub_cat_id: string;
  subcategory_name: string;
  image: string;
  category: string;
}

export default function Products() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id") || "";
  const categoryName = searchParams.get("category_name") || "All Products";

  const [productsList, setProductsList] = useState<ERPProduct[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cartItemCodes, setCartItemCodes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCartStatus = async () => {
      const user = localStorage.getItem("gbru_user");
      if (!user) return;
      try {
        const parsed = JSON.parse(user);
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
        if (!mobile_no) return;
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_no })
        });
        if (res.ok) {
          const json = await res.json();
          const items = json.message?.data?.items || [];
          setCartItemCodes(items.map((i: any) => i.item));
        }
      } catch (e) {
        
      }
    };

    fetchCartStatus();
    window.addEventListener("cartUpdate", fetchCartStatus);
    return () => window.removeEventListener("cartUpdate", fetchCartStatus);
  }, []);

  // Load subcategories
  useEffect(() => {
    async function loadSubcategories() {
      if (!categoryId) return;
      try {
        const res = await fetch(`/api/subcategories?category_id=${categoryId}`);
        if (res.ok) {
          const text = await res.text();
          try {
            const json = JSON.parse(text);
            if (json.message?.status && Array.isArray(json.message.data)) {
              setSubcategories(json.message.data);
            } else {
              setSubcategories([]);
            }
          } catch (e) {
            
          }
        }
      } catch (err) {
        
      }
    }
    loadSubcategories();
    setSelectedSubcategory("all"); // Reset selection on category change
    setSearchQuery("");
    setSearchInput("");
  }, [categoryId]);

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  // Load products based on category, subcategory, and search query
  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      setError("");
      try {
        const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
        const response = await fetch(
          `/api/products?category_id=${categoryId}&subcategory_id=${selectedSubcategory}${searchParam}`
        );
        if (!response.ok) {
          throw new Error("Failed to load products for this category.");
        }
        const text = await response.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch (e) {
          
          throw new Error("Failed to parse products data");
        }
        if (json?.message?.status && Array.isArray(json.message.data?.data)) {
          setProductsList(json.message.data.data);
        } else {
          setProductsList([]);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    loadCategoryProducts();
  }, [categoryId, selectedSubcategory, searchQuery]);

  // Format currency
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const sortedProducts = [...productsList].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return (a.price || 0) - (b.price || 0);
      case "price_desc":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0; // Default order (newest/best sellers)
    }
  });

  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col">
      <Navbar />

      {/* Top Banner Section */}
      <div className="w-full bg-[#F9F9F9] pt-10 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A4A4A] mb-8 uppercase">
            <Link href="/" className="hover:text-[#006B21]">Home</Link>
            <span className="text-[#A5B4A8]">&gt;</span>
            <Link href="/categories" className="hover:text-[#006B21]">Categories</Link>
            <span className="text-[#A5B4A8]">&gt;</span>
            <span className="text-[#006B21]">{categoryName}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            {categoryName}
          </h1>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-12 flex flex-col min-h-[400px] justify-center">

        {loading ? (
          /* Loading indicator */
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-[#006B21] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-zinc-500 font-medium">Loading GBRU products...</span>
          </div>
        ) : error ? (
          /* Error fallback */
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <span className="text-red-500 text-3xl">⚠️</span>
            <h3 className="font-bold text-[#0F291B] text-lg font-roboto">Unable to load products</h3>
            <p className="text-zinc-500 text-xs max-w-xs">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-[#006B21] text-white font-bold text-xs py-2 px-4 rounded-full"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Header Controls (Title + Sort + Subcategory filter) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-1">
                  Precision Management
                </h2>
                <p className="text-sm text-[#4A4A4A]">
                  Showing {productsList.length} Professional Products Found
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">

                {/* Search Bar */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); }} 
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Search in category..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 text-[#1A1A1A] text-sm rounded-l-md pl-4 py-2 outline-none focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21]"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#006B21] text-white px-4 py-2 rounded-r-md text-sm font-semibold hover:bg-[#005a1b] transition-colors"
                  >
                    Search
                  </button>
                </form>

                {/* Subcategory Dropdown Filter */}
                {subcategories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#4A4A4A]">SUBCATEGORY:</span>
                    <div className="relative">
                      <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 text-[#1A1A1A] text-sm rounded-md pl-4 pr-10 py-2 outline-none focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21] cursor-pointer"
                      >
                        <option value="all">All Subcategories</option>
                        {subcategories.map((sub) => (
                          <option key={sub.sub_cat_id} value={sub.sub_cat_id}>
                            {sub.subcategory_name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sort By Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#4A4A4A]">SORT BY:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 text-[#1A1A1A] text-sm rounded-md pl-4 pr-10 py-2 outline-none focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21] cursor-pointer"
                    >
                      <option value="newest">Newest Arrivals</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="best_sellers">Best Sellers</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {productsList.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 text-center gap-2 flex-1">
                <span className="text-4xl">📦</span>
                <h3 className="font-bold text-[#0F291B] text-lg font-roboto">No Products Found</h3>
                <p className="text-zinc-500 text-xs max-w-xs">
                  We couldn&apos;t find any GBRU products in this subcategory at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
                {sortedProducts.map((product) => {
                  const discountText = product.discount > 0 ? `${product.discount.toFixed(0)}% OFF` : "SPECIAL PRICE";
                  const itemImage = product.custom_image_1 && product.custom_image_1.startsWith("http")
                    ? product.custom_image_1
                    : "/assets/sprayer.png";

                  return (
                    <div
                      key={product.item_code}
                      className="bg-white rounded-[18px] border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-lg relative text-left pb-3"
                    >
                      {/* Image Section */}
                      <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer">
                        <div className="relative h-36 md:h-56 w-full bg-gray-50 overflow-hidden flex items-center justify-center p-3 hover:opacity-90 transition-opacity border-b border-gray-100">
                          {/* Badge Overlay */}
                          {product.discount && product.discount > 0 ? (
                            <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded-[6px] z-10 bg-[#FEF5D1] text-[#78350F] border border-[#FDF4CE]">
                              {product.discount.toFixed(0)}% OFF
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
                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <Link href={`/products/view_product?item_code=${product.item_code}`} className="cursor-pointer hover:text-[#006B21] transition-colors">
                          <h3 className="font-roboto font-bold text-[12px] md:text-sm text-[#1A1A1A] mb-2 leading-snug min-h-[34px] md:min-h-[40px] line-clamp-2">
                            {product.item_name}
                          </h3>
                        </Link>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.brand && (
                            <span className="bg-[#F3F4F6] text-[#4B5563] text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded">
                              {product.brand.toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto">
                          {/* Price - color set to #006B21 */}
                          <div className="flex items-baseline gap-2 mb-1">
                            <span 
                              className="text-[15px] md:text-xl font-bold"
                              style={{ color: "#006B21" }}
                            >
                              ₹{formatPrice(product.price)}
                            </span>
                            {product.mrp > product.price && (
                              <span className="text-[10px] md:text-xs text-[#6B7280] line-through">₹{formatPrice(product.mrp)}</span>
                            )}
                          </div>

                          <div className="text-[9px] md:text-[11px] text-[#4B5563] font-bold mb-3 flex flex-col gap-0.5">
                            <span>MOQ: <span className="text-[#0F291B]">{product.moq} {product.stock_uom}</span></span>
                          </div>

                          {/* Add to Cart button - background set to #006B21 */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full h-9 md:h-11 text-white font-roboto font-bold text-[11px] md:text-sm rounded-[8px] md:rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                            style={{ backgroundColor: "#006B21" }}
                          >
                            {cartItemCodes.includes(product.item_code) ? "Update Cart" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />

      <PaymentOptionModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        itemCode={selectedProduct?.item_code || ""}
      />
    </div>
  );
}
