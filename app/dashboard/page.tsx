import React from "react";
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

export const metadata = {
  title: "Dashboard - GBRU",
  description: "Farmer Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <ToolsInAction />
        <Testimonials />
        <HelpSupportBanner />
        <Stats />
        <AppDownloadBanner />
      </main>
      <Footer />
    </div>
  );
}
