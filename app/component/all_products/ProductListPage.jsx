"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpBanner from "./NeedHelpBanner";
import ProductCard from "./ProductCard";
import Breadcrumb from "./Breadcrumb";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductListPage({ categorySlug }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Retrieve matching category details & product list
  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug) || {
    slug: categorySlug,
    name: categorySlug
      ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ")
      : "Category",
    description: "High-performance equipment and maintenance tools.",
  };

  const productList = PRODUCTS[categorySlug] || [
    {
      id: `${categorySlug}-pro-x`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `${currentCategory.name} Pro X`,
      shortDescription: `Precision depth control with multi-seed compatibility for high-yield farming.`,
      badge: "TOP RATED",
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-3000`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `Agri-Sow 3000`,
      shortDescription: `Fully-automated distribution system designed for large-scale industrial field rows.`,
      favorite: true,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-lite`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `EcoPlanter Lite`,
      shortDescription: `Lightweight, manual-operation seeder perfect for small-scale horticulture gardens.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-terramaster`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `TerraMaster 500`,
      shortDescription: `Heavy-duty multi-row planting smart attachment with reinforced wheel components.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-v2`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `SmartSow V2`,
      shortDescription: `IoT-enabled seeder with real-time soil moisture sensing and continuous tracking.`,
      badge: "NEW EDITION",
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
    {
      id: `${categorySlug}-grainguard`,
      category: categorySlug,
      categoryName: currentCategory.name,
      name: `GrainGuard 4.0`,
      shortDescription: `Advanced seed metering system specifically optimized for small grains and legumes.`,
      badge: null,
      image: currentCategory.image || "/all_products/seeder.jpg",
    },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: currentCategory.name, href: `/products/${currentCategory.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Trail */}
        <Breadcrumb items={breadcrumbs} />

        {/* Page Heading Section matching Screenshot 1 */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1c3a27] tracking-tight mb-2">
            {currentCategory.name} Knowledge Hub
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Access detailed installation guides, technical specifications, and maintenance resources for every {currentCategory.name} model.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Showing {productList.length} {currentCategory.name} models
          </p>
        </div>

        {/* Product Grid (3 columns desktop / 2 tablet / 1 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {productList.map((product) => (
            <ProductCard key={product.id} item={product} type="product" />
          ))}
        </div>

        {/* Centered Pagination Control matching Screenshot 1 */}
        <div className="flex items-center justify-center gap-2 my-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-emerald-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-2xl text-xs font-bold transition-all ${
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
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-emerald-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
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
