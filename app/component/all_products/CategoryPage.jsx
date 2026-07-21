"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpBanner from "./NeedHelpBanner";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "@/data/products";
import { Search } from "lucide-react";

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("popular");
  const tCat = useTranslations('categoryPage');

  // Filter categories based on search input and filter chip
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
      {/* Shared Navbar with real GORU logo */}
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

      {/* Category Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <ProductCard key={cat.slug} item={cat} type="category" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
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
        )}

        {/* Need Help Section */}
        <NeedHelpBanner variant="grid" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
