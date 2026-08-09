"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import ToolsInAction from "@/components/ToolsInAction";
import Testimonials from "@/components/Testimonials";
import HelpSupportBanner from "@/components/HelpSupportBanner";
import Stats from "@/components/Stats";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import Footer from "@/components/Footer";

export default function DashboardPage() {
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
        <Categories />
        <FeaturedProducts />
        <ToolsInAction />
        <Testimonials />
        
        {/* Mobile View: Render these sections only when logged in */}
        {isLoggedIn ? (
          <div className="block lg:hidden">
            <HelpSupportBanner />
            <Stats />
            <AppDownloadBanner />
          </div>
        ) : null}

        {/* Desktop View: Keep original layouts unchanged */}
        <div className="hidden lg:block">
          <HelpSupportBanner />
          <Stats />
          <AppDownloadBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
}
