"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import FieldExperiences from "@/components/FieldExperiences";
import BestSellingTools from "@/components/BestSellingTools";
import AppDownload from "@/components/AppDownload";
import GbRUOnField from "@/components/GbRUOnField";
import WhyGBRU from "@/components/WhyGBRU";
import Testimonials from "@/components/Testimonials";
import ToolsInAction from "@/components/ToolsInAction";
import HelpSupportBanner from "@/components/HelpSupportBanner";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("gbru_user"));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* ── DESKTOP ONLY: Stats at top ── */}
        <div className="hidden lg:block">
          <Stats />
        </div>

        {/* ── DESKTOP ONLY: Categories ── */}
        <div className="hidden lg:block">
          <Categories />
        </div>

        {/* ── FieldExperiences (guest only) — self-guards mobile/desktop internally ── */}
        {!isLoggedIn && <FieldExperiences />}

        {/* ── MOBILE ONLY: Categories (after FieldExperiences on mobile) ── */}
        <div className="block lg:hidden">
          <Categories />
        </div>

        {/* ── BestSellingTools — self-guards mobile/desktop internally ── */}
        <BestSellingTools />

        {/* ── DESKTOP ONLY: ToolsInAction ── */}
        <div className="hidden lg:block">
          <ToolsInAction />
        </div>

        {/* ── MOBILE ONLY: ToolsInAction (only when logged in) ── */}
        {isLoggedIn && (
          <div className="block lg:hidden">
            <ToolsInAction />
          </div>
        )}

        {/* ── DESKTOP ONLY: AppDownload, GbRUOnField, WhyGBRU (guest only) ── */}
        <div className="hidden lg:block">
          {!isLoggedIn && <AppDownload />}
          {!isLoggedIn && <GbRUOnField />}
          {!isLoggedIn && <WhyGBRU />}
        </div>

        {/* ── MOBILE ONLY: WhyGBRU + GbRUOnField (guest only) ── */}
        {!isLoggedIn && (
          <div className="block lg:hidden">
            <WhyGBRU />
            <GbRUOnField />
          </div>
        )}

        {/* ── Testimonials — self-guards mobile/desktop internally ── */}
        <Testimonials />

        {/* ── MOBILE ONLY: HelpSupportBanner + Stats + AppDownloadBanner (logged in only) ── */}
        {isLoggedIn && (
          <div className="block lg:hidden">
            <HelpSupportBanner />
            <Stats />
            <AppDownloadBanner />
          </div>
        )}

        {/* ── DESKTOP ONLY: HelpSupportBanner + AppDownloadBanner ── */}
        <div className="hidden lg:block">
          <HelpSupportBanner />
          <AppDownloadBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
}
