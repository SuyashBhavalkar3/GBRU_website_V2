"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import RegisterProductBanner from "@/app/component/shared/RegisterProductBanner";
import { warrantiesData } from "@/data/warranties";
import {
  Plus,
  Search,
  ShieldCheck,
  Clock,
  FileText,
  FileClock,
  RefreshCw,
  Droplets,
  Tractor,
} from "lucide-react";

export default function MyWarrantyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const activeCount = warrantiesData.filter((w) => w.status === "active").length;
  const expiringCount = warrantiesData.filter((w) => w.status === "expiring").length;
  const expiredCount = warrantiesData.filter((w) => w.status === "expired").length;
  const pendingCount = warrantiesData.filter((w) => w.status === "pending").length;

  const filteredWarranties = warrantiesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warrantyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "Active") return matchesSearch && item.status === "active";
    if (activeFilter === "Expiring Soon") return matchesSearch && item.status === "expiring";
    if (activeFilter === "Expired") return matchesSearch && item.status === "expired";
    if (activeFilter === "Pending Registration") return matchesSearch && item.status === "pending";

    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Title & Top Register Button Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1c3a27] mb-2">
              My Warranty
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Manage all your registered product warranties in one place. Ensure your agricultural investments are protected.
            </p>
          </div>

          <button
            onClick={() => alert("Register product modal opened.")}
            className="bg-[#00a859] hover:bg-[#00924d] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Product</span>
          </button>
        </div>

        {/* 4 Stats Cards matching attached screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Active Warranties
              </p>
              <p className="text-2xl font-extrabold text-[#1c3a27]">{activeCount}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Expiring Soon
              </p>
              <p className="text-2xl font-extrabold text-[#1c3a27]">{expiringCount || 1}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Expired
              </p>
              <p className="text-2xl font-extrabold text-[#1c3a27]">{expiredCount}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between h-28">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileClock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Pending
              </p>
              <p className="text-2xl font-extrabold text-[#1c3a27]">{pendingCount}</p>
            </div>
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
              placeholder="Search by product or warranty ID"
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200/80 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] shadow-2xs"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {["All", "Active", "Expiring Soon", "Expired", "Pending Registration"].map(
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

        {/* Stacked Warranty Cards List matching attached screenshot exactly */}
        <div className="space-y-6 mb-12">
          {filteredWarranties.map((warranty) => {
            const isExpired = warranty.status === "expired";

            return (
              <div
                key={warranty.id}
                className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all"
              >
                {/* Left Gray Image Box (1/3 Width) */}
                <div className="w-full md:w-64 h-44 sm:h-48 bg-[#e9eae8] flex items-center justify-center shrink-0 relative p-4">
                  {warranty.id === "solar-irrigation-hub" ? (
                    <div className="text-slate-400 flex flex-col items-center justify-center opacity-60">
                      <Droplets className="w-12 h-12 mb-1" />
                    </div>
                  ) : warranty.id === "smart-tractor-g3" ? (
                    <div className="text-slate-400 flex flex-col items-center justify-center opacity-60">
                      <Tractor className="w-12 h-12 mb-1" />
                    </div>
                  ) : (
                    <Image
                      src={warranty.image}
                      alt={warranty.name}
                      fill
                      sizes="256px"
                      className="object-cover rounded-l-[28px]"
                    />
                  )}
                </div>

                {/* Right Info Box (2/3 Width) */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Top Row: Title, Model, Status Pill, Dates Box */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Title & Warranty ID */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                          {warranty.name}
                        </h3>
                        <span className="text-xs font-semibold text-slate-400">
                          ({warranty.model})
                        </span>
                        {isExpired ? (
                          <span className="bg-[#ffdada] text-[#d32f2f] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            EXPIRED
                          </span>
                        ) : (
                          <span className="bg-[#b5f5c3] text-[#008a46] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        Warranty ID: <strong className="text-slate-800 font-extrabold">{warranty.warrantyId}</strong>
                      </p>
                    </div>

                    {/* Right Dates Table Block */}
                    <div className="bg-[#f9faf9] rounded-2xl p-3 border border-slate-100 flex items-center gap-6 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          REGISTERED
                        </span>
                        <span className="font-extrabold text-slate-700">{warranty.purchaseDate}</span>
                      </div>
                      <div className="border-l border-slate-200 pl-6">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          EXPIRY DATE
                        </span>
                        <span className={`font-extrabold ${isExpired ? "text-rose-600" : "text-[#008a46]"}`}>
                          {warranty.expiryDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons Row */}
                  <div className="flex items-center gap-3 pt-2">
                    {isExpired ? (
                      <button
                        onClick={() => alert("Warranty Renewal requested.")}
                        className="inline-flex items-center gap-1.5 bg-[#00a859] hover:bg-[#00924d] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Renew Warranty</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Viewing Warranty Certificate for ${warranty.name}`)}
                        className="inline-flex items-center gap-1.5 border border-[#00a859] text-[#00a859] hover:bg-[#e8f7eb] px-5 py-2.5 rounded-full font-bold text-xs transition-colors bg-white cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    )}

                    <Link
                      href={`/profile/warranty/${warranty.id}`}
                      className="inline-flex items-center justify-center bg-[#eeeef0] hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-full font-extrabold text-xs transition-colors"
                    >
                      Details
                    </Link>
                  </div>
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
