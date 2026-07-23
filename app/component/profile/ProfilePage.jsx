"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import StatCard from "@/app/component/shared/StatCard";
import StatusBadge from "@/app/component/shared/StatusBadge";
import SettingsListItem from "@/app/component/shared/SettingsListItem";
import { userProfile } from "@/data/warranties";
import {
  Pencil,
  Package,
  ShieldCheck,
  Award,
  Globe,
  Bell,
  MapPin,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNo, setPhoneNo] = useState("9049111890");

  useEffect(() => {
    // Get the phone number from local storage
    const storedPhone = localStorage.getItem("user_phone") || "9049111890";
    setPhoneNo(storedPhone);

    async function fetchUserDetails() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

      if (!apiBase || !apiKey || !apiSecret) {
        setError("ERP API credentials are not configured in .env file.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.utility.get_user_details`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
            "X-API-SECRET": apiSecret
          },
          body: JSON.stringify({
            mobile_no: Number(storedPhone.replace(/\s/g, ""))
          })
        });

        const data = await res.json();

        if (!res.ok || (data.message && data.message.status === false)) {
          throw new Error(data.message?.message || "Failed to fetch user details from ERP.");
        }

        if (data.message && data.message.data) {
          setUserData(data.message.data);
        }
      } catch (err) {
        console.error("API error in ProfilePage:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  // Fallback display names/avatars if API isn't populated yet
  const displayName = userData ? userData.Customer_name : (loading ? "Loading..." : "Rajesh Kumar");
  const displayPhone = userData ? userData.customer_id : phoneNo;
  const displayRole = userData ? `${userData.role} • ${userData.status}` : "Verified Profile";
  const displayAvatar = userData && userData.profile_image ? userData.profile_image : "/rajesh-avatar.jpg";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Error display if configuration fails */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-[16px] p-4 text-sm text-red-600 text-center font-medium shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Profile Header Card */}
        <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.03)] text-center max-w-4xl mx-auto mb-8 relative">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
            <Image
              src={displayAvatar}
              alt={displayName}
              fill
              priority
              sizes="112px"
              className="rounded-full object-cover object-top border-4 border-white shadow-md"
            />
            {/* Green Online Dot */}
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#00a859] border-2 border-white flex items-center justify-center shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] mb-2 capitalize">
            {displayName}
          </h1>

          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <StatusBadge status="verified" textOverride={displayRole} />
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {displayPhone} {userData ? `• ${userData.user_id}` : ""}
            </p>
            {userData && userData.address && (
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 flex items-center gap-1.5 justify-center leading-relaxed">
                <MapPin className="w-4 h-4 text-[#00a859] shrink-0" />
                <span className="text-slate-600">{userData.address}</span>
              </p>
            )}
          </div>

          <div>
            <button
              onClick={() => alert("Edit profile details modal")}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-slate-300 hover:border-[#00a859] text-slate-700 hover:text-[#00a859] text-xs font-bold transition-all cursor-pointer bg-white"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Stats Row (4 Cards) */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <StatCard number={userProfile.stats.registeredProducts} label="REGISTERED PRODUCTS" />
          <StatCard number={userProfile.stats.activeWarranties} label="ACTIVE WARRANTIES" />
          <StatCard number={userProfile.stats.supportTickets} label="SUPPORT TICKETS" />
          <StatCard number={userProfile.stats.savedVideos} label="SAVED VIDEOS" />
        </div>

        {/* Quick Access Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-xl font-extrabold text-[#1c3a27] mb-4">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: My Products */}
            <Link
              href="/profile/products"
              className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-300 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#00a859] transition-colors">
                    My Products
                  </h3>
                  <p className="text-slate-500 text-xs">Manage your equipment</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00a859] transition-colors" />
            </Link>

            {/* Card 2: My Warranty */}
            <Link
              href="/profile/warranty"
              className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-300 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#00a859] transition-colors">
                    My Warranty
                  </h3>
                  <p className="text-slate-500 text-xs">Check protection status</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00a859] transition-colors" />
            </Link>

            {/* Card 3: Brand Ambassador (Solid Green Card) */}
            <Link
              href="/ambassador"
              className="bg-[#00a859] text-white rounded-[24px] p-6 shadow-md hover:bg-[#00924d] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    Brand Ambassador
                  </h3>
                  <p className="text-emerald-100 text-xs">Prestige benefits & rewards</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
            ACCOUNT SETTINGS
          </h2>

          <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden divide-y divide-slate-100">
            <SettingsListItem icon={Globe} label="Language" value="English" />
            <SettingsListItem icon={Bell} label="Notifications" />
            <SettingsListItem icon={MapPin} label="Manage Address" />
            <SettingsListItem icon={HelpCircle} label="Help & Support" href="/support" />
            <SettingsListItem icon={Info} label="About GBRU" />
            <SettingsListItem
              icon={LogOut}
              label="Logout"
              isLogout={true}
              onClick={() => {
                localStorage.removeItem("user_phone");
                localStorage.removeItem("is_authenticated");
                alert("Logged out successfully.");
                window.location.href = "/";
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

