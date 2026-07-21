"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpBanner from "./NeedHelpBanner";
import ProductCard from "./ProductCard";
import Breadcrumb from "./Breadcrumb";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductListPage({ categorySlug }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tList = useTranslations('productListPage');
  const tCatDict = useTranslations('categories');
  const tNav = useTranslations('nav');

  const keyMap = {
    "seeder": "seeder",
    "irrigation": "irrigation",
    "controllers": "controllers",
    "farm-equipment": "farmEquipment",
    "accessories": "accessories",
    "solar-systems": "solarSystems",
    "sensors-monitoring": "sensorsMonitoring",
    "maintenance-kits": "maintenanceKits",
  };

  const prefix = keyMap[categorySlug];

  // Retrieve matching category details & product list
  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug) || {
    slug: categorySlug,
    name: categorySlug
      ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ")
      : "Category",
    description: "High-performance equipment and maintenance tools.",
  };

  const displayName = prefix ? tCatDict(`${prefix}Name`) : currentCategory.name;

  const productList = PRODUCTS[categorySlug] || [
    {
      id: `${categorySlug}-pro-x`,
      category: categorySlug,
      categoryName: displayName,
      name: `${displayName} Pro X`,
      shortDescription: `Precision depth control with multi-seed compatibility for high-yield farming.`,
      badge: "TOP RATED",
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-3000`,
      category: categorySlug,
      categoryName: displayName,
      name: `Agri-Sow 3000`,
      shortDescription: `Fully-automated distribution system designed for large-scale industrial field rows.`,
      favorite: true,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-lite`,
      category: categorySlug,
      categoryName: displayName,
      name: `EcoPlanter Lite`,
      shortDescription: `Lightweight, manual-operation seeder perfect for small-scale horticulture gardens.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-terramaster`,
      category: categorySlug,
      categoryName: displayName,
      name: `TerraMaster 500`,
      shortDescription: `Heavy-duty multi-row planting smart attachment with reinforced wheel components.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-v2`,
      category: categorySlug,
      categoryName: displayName,
      name: `SmartSow V2`,
      shortDescription: `IoT-enabled seeder with real-time soil moisture sensing and continuous tracking.`,
      badge: "NEW EDITION",
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-grainguard`,
      category: categorySlug,
      categoryName: displayName,
      name: `GrainGuard 4.0`,
      shortDescription: `Advanced seed metering system specifically optimized for small grains and legumes.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
  ];

  const breadcrumbs = [
    { label: tNav('home'), href: "/" },
    { label: tNav('allProducts'), href: "/products" },
    { label: displayName, href: `/products/${currentCategory.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Trail */}
        <Breadcrumb items={breadcrumbs} />

        {/* Page Heading Section */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1c3a27] tracking-tight mb-2">
            {displayName} {tList('knowledgeHub')}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            {tList('hubDesc')}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {tList('showingModels', { count: productList.length })}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {productList.map((product) => (
            <ProductCard key={product.id} item={product} type="product" />
          ))}
        </div>

        {/* Pagination Control */}
        <div className="flex items-center justify-center gap-2 my-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-emerald-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === pageNum
                  ? "bg-[#1c4e26] text-white shadow-xs"
                  : "bg-[#f2f6f2] text-slate-700 hover:bg-emerald-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            disabled={currentPage === 3}
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-emerald-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reusable Full-width Banner Need Help */}
        <NeedHelpBanner variant="banner" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
