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
        <Stats />
        {/* Desktop order: Categories then FieldExperiences */}
        <div className="hidden lg:block">
          <Categories />
        </div>
        {!isLoggedIn && <FieldExperiences />}
        {/* Mobile order: Categories after FieldExperiences */}
        <div className="block lg:hidden">
          <Categories />
        </div>
        <BestSellingTools />
        <ToolsInAction />
        {!isLoggedIn && <AppDownload />}
        {!isLoggedIn && <GbRUOnField />}
        {!isLoggedIn && <WhyGBRU />}
        <Testimonials />
        <HelpSupportBanner />
        <AppDownloadBanner />
      </main>
      <Footer />
    </div>
  );
}
