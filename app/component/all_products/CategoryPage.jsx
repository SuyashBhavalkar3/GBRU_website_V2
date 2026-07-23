"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpBanner from "./NeedHelpBanner";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "@/data/products";
import { Search } from "lucide-react";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState(searchParamValue || "");
  const [activeChip, setActiveChip] = useState("popular");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tCat = useTranslations('categoryPage');

  // Update searchQuery if URL search param updates
  useEffect(() => {
    setSearchQuery(searchParamValue || "");
  }, [searchParamValue]);

  // Fetch items from ERP API when search query is active
  useEffect(() => {
    if (!searchQuery.trim()) {
      setItems([]);
      return;
    }

    const timer = setTimeout(() => {
      async function fetchItems() {
        setLoading(true);
        setError(null);

        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        const storedPhone = localStorage.getItem("user_phone") || "8308020899";

        if (!apiBase || !apiKey || !apiSecret) {
          setError("ERP API configurations are missing in .env.");
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.item_api.get_items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
              "X-API-SECRET": apiSecret
            },
            body: JSON.stringify({
              search: searchQuery.trim(),
              category: null,
              subcategory: null,
              brand: null,
              page: 1,
              page_size: 20,
              mobile_no: storedPhone
            })
          });

          const data = await res.json();

          if (!res.ok || (data.message && data.message.status === false)) {
            throw new Error(data.message?.message || "Failed to fetch item list.");
          }

          if (data.message && data.message.data && data.message.data.data) {
            setItems(data.message.data.data);
          } else {
            setItems([]);
          }
        } catch (err) {
          console.error("Search API error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchItems();
    }, 400); // Debounce API call by 400ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter categories based on search input and filter chip (fallback / non-search mode)
  const filteredCategories = CATEGORIES.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeChip === "popular") {
      return matchesSearch;
    }
    if (activeChip === "new") {
      return matchesSearch && ["seeder", "solar-systems", "sensors-monitoring"].includes(category.slug);
    }
    if (activeChip === "essentials") {
      return matchesSearch && ["irrigation", "accessories", "maintenance-kits"].includes(category.slug);
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar with real GBRU logo */}
      <Navbar />

      {/* Hero Section matching screenshot background tint and typography */}
      <section className="bg-gradient-to-b from-[#eaf6eb] via-[#f4faf5] to-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Header Left Aligned */}
          <div className="max-w-3xl mb-8">
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-bold text-[#154212] mb-4">
              {tCat('heading')}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {tCat('subheading')}
            </p>
          </div>

          {/* Search Bar & Integrated Chips Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl">
            {/* Search Input Pill */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={tCat('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 rounded-2xl sm:rounded-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
              />
            </div>

            {/* Quick Filter Chips beside search */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveChip("popular")}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  activeChip === "popular"
                    ? "bg-[#00a859] text-white"
                    : "bg-[#eaeaea] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tCat('chipPopular')}
              </button>
              <button
                onClick={() => setActiveChip("new")}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  activeChip === "new"
                    ? "bg-[#00a859] text-white"
                    : "bg-[#eaeaea] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tCat('chipNew')}
              </button>
              <button
                onClick={() => setActiveChip("essentials")}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                  activeChip === "essentials"
                    ? "bg-[#00a859] text-white"
                    : "bg-[#eaeaea] text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tCat('chipEssentials')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category or Search Result Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Error notification banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-[16px] p-4 text-sm text-red-600 text-center font-medium shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {searchQuery.trim() ? (
          /* Search Results Mode */
          loading ? (
            <div className="text-center py-20 w-full">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00a859]/30 border-t-[#00a859] mb-3"></div>
              <p className="text-slate-500 text-sm font-semibold">Searching GBRU item catalog...</p>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => {
                const mappedItem = {
                  id: item.item_code,
                  category: item.brand_id || "gbru",
                  name: item.item_name,
                  shortDescription: `${item.brand || "GBRU"} • Price: ₹${item.price} (MRP: ₹${item.mrp})`,
                  badge: item.discount > 0 ? `${Math.round(item.discount)}% OFF` : null,
                  favorite: false,
                  image: item.custom_image_1 || item.custom_image_path || "/all_products/seeder.jpg",
                };
                return (
                  <ProductCard key={item.item_code} item={mappedItem} type="product" />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-[24px] border border-dashed border-slate-300">
              <p className="text-slate-500 text-base mb-4">
                No products found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 bg-[#00a859] text-white rounded-full text-xs font-semibold hover:bg-[#00924d] transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )
        ) : (
          /* Categories Directory Mode (Default) */
          filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((cat) => (
                <ProductCard key={cat.slug} item={cat} type="category" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-[24px] border border-dashed border-slate-300">
              <p className="text-slate-500 text-base mb-4">
                {tCat('noCategoriesFound', { query: searchQuery })}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveChip("popular");
                }}
                className="px-5 py-2.5 bg-[#00a859] text-white rounded-full text-xs font-semibold hover:bg-[#00924d] transition-colors cursor-pointer"
              >
                {tCat('resetFilters')}
              </button>
            </div>
          )
        )}

        {/* Need Help Section */}
        <NeedHelpBanner variant="grid" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
