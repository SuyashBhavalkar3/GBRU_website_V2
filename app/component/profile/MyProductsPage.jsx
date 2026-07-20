"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import StatusBadge from "@/app/component/shared/StatusBadge";
import RegisterProductBanner from "@/app/component/shared/RegisterProductBanner";
import { warrantiesData } from "@/data/warranties";
import {
  Search,
  Eye,
  PlayCircle,
  ShieldCheck,
  Headset,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";

export default function MyProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = warrantiesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "Active Warranty") return matchesSearch && item.status === "active";
    if (activeFilter === "Expired Warranty") return matchesSearch && item.status === "expired";
    if (activeFilter === "Pending Registration") return matchesSearch && item.status === "pending";

    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1c3a27] mb-2">
              My Products
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Manage all your registered GORU products, warranties, manuals and support in one place.
            </p>
          </div>

          {/* Green Stat Badge */}
          <div className="bg-[#00a859] text-white px-6 py-3.5 rounded-[20px] shadow-md text-center shrink-0 w-fit">
            <span className="block text-2xl font-extrabold leading-none">
              {warrantiesData.length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
              Total Units
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200/80 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] shadow-2xs"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {["All", "Active Warranty", "Expired Warranty", "Pending Registration"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeFilter === filter
                      ? "bg-[#00a859] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* Product Grid (3 columns desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => {
            const isExpired = product.status === "expired";

            return (
              <div
                key={product.id}
                className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                {/* Product Photo Container */}
                <div>
                  <div className="relative w-full h-48 bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />

                    {/* Top-Left Verified Badge */}
                    <div className="absolute top-3 left-3 bg-[#00a859] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Product Details Header */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">
                          {product.name}
                        </h3>
                        <p className="text-slate-400 text-xs font-medium">
                          Model: {product.model}
                        </p>
                      </div>
                      <StatusBadge status={product.status} />
                    </div>

                    {/* Mini Info Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px] font-bold uppercase block">
                          Purchase Date
                        </span>
                        <span className="font-extrabold text-slate-700">
                          {product.purchaseDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] font-bold uppercase block">
                          Warranty
                        </span>
                        <span className="font-extrabold text-slate-700">
                          {isExpired
                            ? `Expired ${product.expiryDate}`
                            : `Expires ${product.expiryDate}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2x2 Action Buttons Row */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/profile/warranty/${product.id}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-slate-200 text-slate-700 hover:border-[#00a859] hover:text-[#00a859] text-xs font-bold transition-colors bg-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </Link>

                  <Link
                    href={`/products/seeder/${product.id}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-slate-200 text-slate-700 hover:border-[#00a859] hover:text-[#00a859] text-xs font-bold transition-colors bg-white"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Videos</span>
                  </Link>

                  {isExpired ? (
                    <button
                      onClick={() => alert("Warranty Renewal requested.")}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#00a859] hover:bg-[#00924d] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Renew</span>
                    </button>
                  ) : (
                    <Link
                      href={`/profile/warranty/${product.id}`}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-slate-200 text-slate-700 hover:border-[#00a859] hover:text-[#00a859] text-xs font-bold transition-colors bg-white"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Warranty</span>
                    </Link>
                  )}

                  <Link
                    href="/support"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full border border-slate-200 text-slate-700 hover:border-[#00a859] hover:text-[#00a859] text-xs font-bold transition-colors bg-white"
                  >
                    <Headset className="w-3.5 h-3.5" />
                    <span>Support</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <RegisterProductBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
