"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  ArrowDown,
  ShieldCheck,
  Globe,
  ExternalLink,
  Share2,
  Camera,
  Tv,
  Briefcase,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    reasonForContact: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const tCon = useTranslations('contactPage');
  const tCommon = useTranslations('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.message) {
      alert("Please fill in required fields (Full Name & Message).");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        mobileNumber: "",
        emailAddress: "",
        reasonForContact: "General Inquiry",
        message: "",
      });
      alert("Thank you for reaching out! A GBRU specialist will respond within 24 hours.");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero Section matching exact screenshot layout, white background, font sizing, and down arrow CTA */}
      <section className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Text (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-bold text-[#154212] mb-4">
              {tCon('heading')}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-[460px]">
              {tCon('subheading')}
            </p>
            <div className="pt-2">
              <a
                href="#message-form"
                className="inline-flex items-center gap-2 bg-[#008a46] hover:bg-[#00753b] text-white px-6 py-3 rounded-full font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>{tCon('heading')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column Illustration (6 Cols) with 3D illustration */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] h-[320px] sm:h-[380px]">
              <Image
                src="/all_products/get in touch.png"
                alt="GBRU Get in Touch 3D Illustration"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-contain object-center lg:object-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Contact Method Cards Section with soft light mint-gray background transition */}
      <section className="bg-[#f2f5f2] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call Us */}
          <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between text-center min-h-[270px]">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] text-[#1b5e20] flex items-center justify-center mb-5 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1c2e22] text-xl mb-2">{tCon('callUs')}</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-[200px] leading-relaxed mb-6">
                {tCon('callUsDesc')}
              </p>
            </div>
            <a
              href="tel:18002474776"
              className="w-full border-2 border-[#1c4e26] text-[#1c4e26] bg-white text-xs font-extrabold py-2.5 px-6 rounded-full hover:bg-[#1c4e26] hover:text-white transition-all duration-200 text-center"
            >
              {tCommon('callNow')}
            </a>
          </div>

          {/* Card 2: Email Us */}
          <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between text-center min-h-[270px]">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] text-[#1b5e20] flex items-center justify-center mb-5 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1c2e22] text-xl mb-2">{tCon('emailUs')}</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-[200px] leading-relaxed mb-6">
                {tCon('emailUsDesc')}
              </p>
            </div>
            <a
              href="mailto:support@GBRU-agri.com"
              className="w-full border-2 border-[#1c4e26] text-[#1c4e26] bg-white text-xs font-extrabold py-2.5 px-6 rounded-full hover:bg-[#1c4e26] hover:text-white transition-all duration-200 text-center"
            >
              {tCon('sendEmail')}
            </a>
          </div>

          {/* Card 3: WhatsApp */}
          <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between text-center min-h-[270px]">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] text-[#1b5e20] flex items-center justify-center mb-5 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1c2e22] text-xl mb-2">{tCon('whatsAppTitle')}</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-[200px] leading-relaxed mb-6">
                {tCon('whatsAppDesc')}
              </p>
            </div>
            <a
              href="https://wa.me/18002474776"
              target="_blank"
              rel="noreferrer"
              className="w-full border-2 border-[#1c4e26] text-[#1c4e26] bg-white text-xs font-extrabold py-2.5 px-6 rounded-full hover:bg-[#1c4e26] hover:text-white transition-all duration-200 text-center"
            >
              {tCommon('chatNow')}
            </a>
          </div>

          {/* Card 4: Visit Office */}
          <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between text-center min-h-[270px]">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] text-[#1b5e20] flex items-center justify-center mb-5 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#1c2e22] text-xl mb-2">{tCon('visitOffice')}</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-[200px] leading-relaxed mb-6">
                {tCon('visitOfficeDesc')}
              </p>
            </div>
            <Link
              href="/find-dealer"
              className="w-full border-2 border-[#1c4e26] text-[#1c4e26] bg-white text-xs font-extrabold py-2.5 px-6 rounded-full hover:bg-[#1c4e26] hover:text-white transition-all duration-200 text-center block"
            >
              {tCommon('findDealer')}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Form & Global Presence */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Two-Column Section: Form + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16" id="message-form">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] mb-6">
              {tCon('sendMessageHeading')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tCon('fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={tCon('enterNamePlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f2] border border-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tCon('mobileNumber')}
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f2] border border-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] transition-all"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tCon('emailAddress')}
                  </label>
                  <input
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f2] border border-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tCon('reasonForContact')}
                  </label>
                  <select
                    value={formData.reasonForContact}
                    onChange={(e) => setFormData({ ...formData, reasonForContact: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f2] border border-transparent text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] transition-all"
                  >
                    <option value="General Inquiry">{tCon('reasonGeneral')}</option>
                    <option value="Sales & Purchasing">{tCon('reasonSales')}</option>
                    <option value="Partnership & Dealer">{tCon('reasonPartnership')}</option>
                    <option value="Technical Support">{tCon('reasonTechSupport')}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tCon('message')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={tCon('messagePlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f2] border border-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#008a46] hover:bg-[#00753b] text-white py-3 rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {submitted ? tCon('sendingMessage') : tCon('sendMessage')}
              </button>
            </form>
          </div>

          {/* Right Column: Sidebar Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Business Hours Card (Solid Green) */}
            <div className="bg-[#008a46] text-white rounded-[24px] p-6 sm:p-7 shadow-md">
              <h3 className="font-extrabold text-lg mb-5 text-white">{tCon('businessHours')}</h3>
              <div className="space-y-3 text-xs sm:text-sm text-emerald-50">
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <span className="font-medium">{tCon('monFri')}</span>
                  <span className="font-bold text-white">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <span className="font-medium">{tCon('saturday')}</span>
                  <span className="font-bold text-white">9:00 AM - 1:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <span className="font-medium">{tCon('sunday')}</span>
                  <span className="font-bold text-emerald-200">{tCon('closed')}</span>
                </div>
              </div>
            </div>

            {/* Sidebar Notes Container */}
            <div className="bg-[#f4f4f2] rounded-[24px] p-6 space-y-4 border border-slate-200/50">
              {/* Fast Response Guarantee */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-[#008a46] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs mb-0.5">
                    {tCon('fastResponseTitle')}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {tCon('fastResponseDesc')}
                  </p>
                </div>
              </div>

              {/* Global Support */}
              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <div className="w-8 h-8 rounded-full bg-white text-[#008a46] flex items-center justify-center shrink-0 shadow-2xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs mb-0.5">
                    {tCon('globalSupportTitle')}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {tCon('globalSupportDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Global Presence Section with real map1.png and map2.png images */}
        <section className="mb-16" id="global-presence">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] text-center mb-8">
            {tCon('globalPresence')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Office 1: Corporate Office */}
            <div className="bg-white rounded-[24px] border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center gap-5 hover:border-emerald-300 transition-all">
              <div className="relative w-full sm:w-44 h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src="/all_products/map1.png"
                  alt="Corporate Office Map"
                  fill
                  sizes="(max-width: 640px) 100vw, 176px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-extrabold text-slate-900 text-base">{tCon('corporateOffice')}</h3>
                <p className="text-xs text-slate-500">Chinchwad, Pune, MH 411019, India</p>
                <p className="text-xs font-bold text-[#008a46]">+91 911 1216 1814</p>
                <a
                  href="#map-corporate"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#008a46] transition-colors pt-1"
                >
                  <span>{tCon('viewOnMap')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Office 2: Wadki Office */}
            <div className="bg-white rounded-[24px] border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center gap-5 hover:border-emerald-300 transition-all">
              <div className="relative w-full sm:w-44 h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src="/all_products/map2.png"
                  alt="Wadki Office Map"
                  fill
                  sizes="(max-width: 640px) 100vw, 176px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-extrabold text-slate-900 text-base">{tCon('wadkiOffice')}</h3>
                <p className="text-xs text-slate-500">Akurdi Flyover Round 35, Pune, MH 411019, India</p>
                <p className="text-xs font-bold text-[#008a46]">+91 911 1216 1814</p>
                <a
                  href="#map-wadki"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#008a46] transition-colors pt-1"
                >
                  <span>{tCon('viewOnMap')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Connect with the Community Section */}
        <section className="my-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] text-center mb-8">
            {tCon('communityConnect')}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Social 1 */}
            <div className="bg-[#f4f4f2] rounded-[24px] p-6 text-center hover:bg-emerald-50 border border-slate-200/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white text-[#008a46] flex items-center justify-center mb-3 shadow-2xs">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">Facebook</h4>
              <p className="text-[11px] text-slate-500">125k+ {tCon('followers')}</p>
            </div>

            {/* Social 2 */}
            <div className="bg-[#f4f4f2] rounded-[24px] p-6 text-center hover:bg-emerald-50 border border-slate-200/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white text-[#008a46] flex items-center justify-center mb-3 shadow-2xs">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">Instagram</h4>
              <p className="text-[11px] text-slate-500">85k+ {tCon('followers')}</p>
            </div>

            {/* Social 3 */}
            <div className="bg-[#f4f4f2] rounded-[24px] p-6 text-center hover:bg-emerald-50 border border-slate-200/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white text-[#008a46] flex items-center justify-center mb-3 shadow-2xs">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">YouTube</h4>
              <p className="text-[11px] text-slate-500">250k+ {tCon('subscribers')}</p>
            </div>

            {/* Social 4 */}
            <div className="bg-[#f4f4f2] rounded-[24px] p-6 text-center hover:bg-emerald-50 border border-slate-200/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white text-[#008a46] flex items-center justify-center mb-3 shadow-2xs">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">LinkedIn</h4>
              <p className="text-[11px] text-slate-500">45k+ {tCon('professionals')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

