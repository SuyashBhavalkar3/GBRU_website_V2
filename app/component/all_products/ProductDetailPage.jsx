"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeedHelpBanner from "./NeedHelpBanner";
import Breadcrumb from "./Breadcrumb";
import { getProductDetail } from "@/data/products";
import {
  Download,
  Play,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function ProductDetailPage({ categorySlug, productId }) {
  const tDetail = useTranslations('productDetailPage');
  const tCatDict = useTranslations('categories');
  const tProdDict = useTranslations('productItems');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  // Retrieve detailed product data
  const product = getProductDetail(categorySlug, productId);

  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

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
  const displayCatName = prefix ? tCatDict(`${prefix}Name`) : (product.categoryName || categorySlug);
  const displayProdName = tProdDict.has(`${product.id}Name`) ? tProdDict(`${product.id}Name`) : product.name;
  const displayProdDesc = tProdDict.has(`${product.id}Desc`) ? tProdDict(`${product.id}Desc`) : (product.description || product.shortDescription);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { label: tNav('home'), href: "/" },
    { label: tNav('allProducts'), href: "/products" },
    { label: displayCatName, href: `/products/${categorySlug}` },
    { label: displayProdName, href: `/products/${categorySlug}/${productId}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb Trail */}
        <Breadcrumb items={breadcrumbs} />

        {/* Hero / Title Section */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Title & CTAs (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f5e9] text-[#00a859] text-xs font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> {tDetail('officialResource')}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c3a27] tracking-tight">
                {displayProdName}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {displayProdDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#technical-docs"
                  className="inline-flex items-center gap-2 bg-[#00a859] hover:bg-[#00924d] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-xs transition-all"
                >
                  <Download className="w-4 h-4" />
                  {tDetail('downloadManual')}
                </a>
                <Link
                  href="/warranty/register"
                  className="inline-flex items-center gap-2 border border-[#00a859] text-[#00a859] hover:bg-emerald-50 px-6 py-3 rounded-xl font-bold text-xs transition-all"
                >
                  <FileCheck className="w-4 h-4" />
                  {tDetail('registerWarrantyNow')}
                </Link>
              </div>
            </div>

            {/* Hero Image Block (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-72 sm:h-88 rounded-[28px] overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Video Installation Guide */}
        <section className="mb-14">
          <div className="bg-white rounded-[24px] border border-slate-200/80 p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Video Thumbnail (6 Cols) */}
            <div
              className="lg:col-span-6 relative group cursor-pointer"
              onClick={() => setActiveVideoModal(tDetail('featuredTitle'))}
            >
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-100 bg-slate-900">
                <Image
                  src={product.featuredGuide?.image || product.heroImage}
                  alt={tDetail('featuredTitle')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {product.featuredGuide?.duration || "04:45"}
                </div>
              </div>
            </div>

            {/* Right Video Info (6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00a859]">
                {tDetail('featuredTag')}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {tDetail('featuredTitle')}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {tDetail('featuredDesc')}
              </p>
              <button
                type="button"
                onClick={() => setActiveVideoModal(tDetail('featuredTitle'))}
                className="inline-flex items-center gap-2 bg-[#00a859] hover:bg-[#00924d] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {tDetail('watchGuide')}
              </button>
            </div>
          </div>
        </section>

        {/* Video Tutorials & Guides */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">{tDetail('videoTutorials')}</h2>
            <p className="text-xs text-slate-500">{tDetail('videoTutorialsSub')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.tutorialVideos.map((tut) => (
              <div
                key={tut.id}
                onClick={() => setActiveVideoModal(tut.title)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative w-full h-36 bg-slate-900 overflow-hidden">
                  <Image
                    src={tut.thumbnail}
                    alt={tut.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5 text-[#00a859]" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {tut.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-slate-900 text-xs group-hover:text-[#00a859] transition-colors line-clamp-2">
                    {tut.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Documentation Section */}
        <section className="mb-14" id="technical-docs">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">{tDetail('techDocs')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.technicalDocs.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00a859] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-0.5">{doc.title}</h3>
                    <p className="text-xs text-slate-500">{doc.meta}</p>
                  </div>
                </div>

                <a
                  href={`#download-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading ${doc.filename}...`);
                  }}
                  className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-[#00a859] hover:border-[#00a859] hover:bg-emerald-50 transition-colors shrink-0"
                  aria-label="Download document"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Protect Your Investment Banner */}
        <section className="mb-14">
          <div className="bg-[#00a859] rounded-[24px] p-8 md:p-10 text-white shadow-md">
            <h2 className="text-2xl font-extrabold text-white mb-2">
              {tDetail('protectInvestment')}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mb-6 leading-relaxed">
              {tDetail('protectInvestmentDesc')}
            </p>
            <Link
              href="/warranty/register"
              className="inline-block bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-full font-bold text-xs shadow-xs transition-colors"
            >
              {tDetail('registerWarrantyNow')}
            </Link>
          </div>
        </section>

        {/* Reusable Need Help Banner */}
        <NeedHelpBanner variant="banner" />

        {/* FAQ Accordion Section */}
        <section className="my-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#1c3a27] mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">{tDetail('quickAnswers')}</p>
          </div>

          <div className="space-y-3">
            {product.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFaq(index);
                    }}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <div className="text-slate-400">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full p-6 text-white space-y-4 border border-slate-700 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base">{activeVideoModal}</h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white text-xs font-semibold bg-slate-800 px-3 py-1 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-2 p-6">
                <Play className="w-12 h-12 text-[#00a859] mx-auto fill-current animate-pulse" />
                <p className="font-semibold text-slate-200 text-sm">Playing: {activeVideoModal}</p>
                <p className="text-xs text-slate-400">(Demonstration Video Player active)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
