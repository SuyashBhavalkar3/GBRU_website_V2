"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import FaqAccordion from "@/app/component/shared/FaqAccordion";
import {
  Search,
  Phone,
  MessageSquare,
  Store,
  AlertCircle,
  PlayCircle,
  FileText,
  Wrench,
  HelpCircle,
  UploadCloud,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    productName: "",
    issueType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const tSup = useTranslations('supportPage');
  const tCommon = useTranslations('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.description) {
      alert("Please fill in required fields (Full Name & Description).");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        mobileNumber: "",
        productName: "",
        issueType: "",
        description: "",
      });
      alert("Support request submitted successfully! Ticket ID #GORU-" + Math.floor(100000 + Math.random() * 900000));
    }, 400);
  };

  const supportFaqs = [
    {
      question: tSup('faq1Q'),
      answer: tSup('faq1A'),
    },
    {
      question: tSup('faq2Q'),
      answer: tSup('faq2A'),
    },
    {
      question: tSup('faq3Q'),
      answer: tSup('faq3A'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero Section matching reference screenshot tint & search bar */}
      <section className="bg-gradient-to-b from-[#eaf6eb] via-[#f4faf5] to-white pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-bold text-[#154212] mb-4">
            {tSup('heading')}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {tSup('subheading')}
          </p>

          {/* Light Gray Pill Search Input */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={tSup('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#f0f2f0] border border-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00a859] focus:border-transparent transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* 4 Quick Action Cards Row with exact matching icon badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Call Support */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">{tCommon('callSupport')}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {tSup('callSupportDesc')}
              </p>
            </div>
            <a href="tel:18002474776" className="inline-flex items-center gap-1 text-[#00a859] font-bold text-xs hover:underline">
              <span>{tCommon('callNow')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: WhatsApp Support */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">{tSup('whatsAppSupport')}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {tSup('whatsAppDesc')}
              </p>
            </div>
            <a href="https://wa.me/18002474776" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#00a859] font-bold text-xs hover:underline">
              <span>{tCommon('chatNow')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Find Dealer */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full cursor-pointer">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#f0f0ed] text-slate-700 flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">{tCommon('findDealer')}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {tSup('findDealerDesc')}
              </p>
            </div>
            <Link href="/find-dealer" className="inline-flex items-center gap-1 text-slate-700 font-bold text-xs hover:underline">
              <span>{tCommon('search')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Raise Complaint (Coral/Red badge) */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#ffebee] text-[#e53935] flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">{tSup('raiseComplaintTitle')}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {tSup('raiseComplaintDesc')}
              </p>
            </div>
            <a href="#support-form" className="inline-flex items-center gap-1 text-[#e53935] font-bold text-xs hover:underline">
              <span>{tCommon('submit')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Help Resources Row */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] text-center mb-6">
            {tSup('quickHelpResources')}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#installation-videos"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <PlayCircle className="w-4 h-4 text-[#00a859]" />
              <span>{tSup('installationVideos')}</span>
            </a>
            <a
              href="#user-manuals"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <FileText className="w-4 h-4 text-[#00a859]" />
              <span>{tSup('userManuals')}</span>
            </a>
            <a
              href="#troubleshooting"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <Wrench className="w-4 h-4 text-[#00a859]" />
              <span>{tSup('troubleshooting')}</span>
            </a>
            <a
              href="#common-issues"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <HelpCircle className="w-4 h-4 text-[#00a859]" />
              <span>{tSup('commonIssues')}</span>
            </a>
          </div>
        </section>

        {/* Two-Column Form & Sidebar Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16" id="support-form">
          {/* Left Column: Form Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] mb-6">
              {tSup('submitRequestHeading')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('fullName')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={tSup('enterNamePlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('mobileNumber')}
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('productName')}
                  </label>
                  <select
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  >
                    <option value="">{tSup('selectProduct')}</option>
                    <option value="seeder-pro-x">Seeder Pro X</option>
                    <option value="agri-sow-3000">Agri-Sow 3000</option>
                    <option value="ecoplanter-lite">EcoPlanter Lite</option>
                    <option value="drip-master-pro">DripMaster Pro System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('issueType')}
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  >
                    <option value="">{tSup('selectIssue')}</option>
                    <option value="installation">{tSup('issueInstallation')}</option>
                    <option value="maintenance">{tSup('issueMaintenance')}</option>
                    <option value="warranty">{tSup('issueWarranty')}</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tSup('description')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={tSup('describeProblemPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                />
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tSup('uploadMedia')}
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#00a859] transition-colors cursor-pointer bg-slate-50/50">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">
                    {tSup('uploadInstructions')}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {tSup('uploadLimit')}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#00a859] hover:bg-[#00924d] text-white py-3 rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {submitted ? tSup('submittingRequest') : tSup('submitRequest')}
              </button>
            </form>
          </div>

          {/* Right Column: Sidebar Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card (Green Highlight) */}
            <div className="bg-[#00a859] text-white rounded-[24px] p-6 sm:p-7 shadow-md relative overflow-hidden">
              <h3 className="font-extrabold text-lg mb-5 text-white">{tSup('directContact')}</h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">1-800-AGRI-HELP</p>
                    <p className="text-emerald-100 text-[11px]">{tSup('tollFree')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-white/15">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">support@goru-agri.com</p>
                    <p className="text-emerald-100 text-[11px]">{tSup('emailResponse')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">{tSup('availability')}</h3>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">{tSup('monFri')}</span>
                  <span className="font-bold text-slate-900">08:00 - 18:00</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">{tSup('saturday')}</span>
                  <span className="font-bold text-slate-900">09:00 - 15:00</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">{tSup('sunday')}</span>
                  <span className="font-bold text-slate-900">{tSup('closed')}</span>
                </div>

                <div className="pt-3 flex items-center gap-2 text-xs font-bold text-[#00a859]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{tSup('responseTime')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#1c3a27] mb-2">
              {tSup('faqHeading')}
            </h2>
          </div>

          <FaqAccordion items={supportFaqs} />

          <div className="text-center mt-6">
            <a
              href="#all-topics"
              className="text-xs font-semibold text-slate-500 hover:text-[#00a859] transition-colors"
            >
              {tSup('viewAllHelpTopics')}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
