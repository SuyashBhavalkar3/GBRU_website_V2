"use client";

import { useState } from "react";
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
      question: "How do I register my product for warranty?",
      answer: "You can register your product by logging into your portal account, navigating to 'My Products', and clicking on 'Register New Device'. You will need your serial number and invoice date.",
    },
    {
      question: "Can I update the firmware on my own?",
      answer: "Yes, all smart controllers and connected seeders support wireless over-the-air (OTA) updates via the GORU Mobile App.",
    },
    {
      question: "Where can I find my nearest service center?",
      answer: "Use our interactive Find Dealer search tool by entering your zip code or region to find authorized service centers near you.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero Section matching reference screenshot tint & search bar */}
      <section className="bg-gradient-to-b from-[#eaf6eb] via-[#f4faf5] to-white pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c3a27] tracking-tight">
            Need Help?
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            We're here to help you with installation, troubleshooting, warranty, and product-related questions.
          </p>

          {/* Light Gray Pill Search Input */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your issue..."
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
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">Call Support</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Immediate assistance from field agents.
              </p>
            </div>
            <a href="tel:18002474776" className="inline-flex items-center gap-1 text-[#00a859] font-bold text-xs hover:underline">
              <span>Call Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: WhatsApp Support */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">WhatsApp Support</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Chat with our experts on the go.
              </p>
            </div>
            <a href="https://wa.me/18002474776" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#00a859] font-bold text-xs hover:underline">
              <span>Chat Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Find Dealer */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#f0f0ed] text-slate-700 flex items-center justify-center mb-4">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">Find Dealer</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Locate authorized service center near you.
              </p>
            </div>
            <a href="#dealers" className="inline-flex items-center gap-1 text-slate-700 font-bold text-xs hover:underline">
              <span>Search</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Raise Complaint (Coral/Red badge) */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <div>
              <div className="w-11 h-11 rounded-full bg-[#ffebee] text-[#e53935] flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-1">Raise Complaint</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Report an issue for tracking and resolution.
              </p>
            </div>
            <a href="#support-form" className="inline-flex items-center gap-1 text-[#e53935] font-bold text-xs hover:underline">
              <span>Submit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Help Resources Row */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] text-center mb-6">
            Quick Help Resources
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#installation-videos"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <PlayCircle className="w-4 h-4 text-[#00a859]" />
              <span>Installation Videos</span>
            </a>
            <a
              href="#user-manuals"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <FileText className="w-4 h-4 text-[#00a859]" />
              <span>User Manuals</span>
            </a>
            <a
              href="#troubleshooting"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <Wrench className="w-4 h-4 text-[#00a859]" />
              <span>Troubleshooting</span>
            </a>
            <a
              href="#common-issues"
              className="inline-flex items-center gap-2 bg-white border border-slate-200/80 hover:border-[#00a859] hover:text-[#00a859] px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <HelpCircle className="w-4 h-4 text-[#00a859]" />
              <span>Common Issues</span>
            </a>
          </div>
        </section>

        {/* Two-Column Form & Sidebar Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16" id="support-form">
          {/* Left Column: Form Card (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-[24px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c3a27] mb-6">
              Submit a Support Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
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
                    Product Name
                  </label>
                  <select
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  >
                    <option value="">Select Product</option>
                    <option value="seeder-pro-x">Seeder Pro X</option>
                    <option value="agri-sow-3000">Agri-Sow 3000</option>
                    <option value="ecoplanter-lite">EcoPlanter Lite</option>
                    <option value="drip-master-pro">DripMaster Pro System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Issue Type
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                  >
                    <option value="">Select Issue</option>
                    <option value="installation">Installation & Setup</option>
                    <option value="maintenance">Maintenance & Calibration</option>
                    <option value="warranty">Warranty Claim</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Please describe your problem in detail..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                />
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Photo/Video
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#00a859] transition-colors cursor-pointer bg-slate-50/50">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">
                    Click or drag file here to upload
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Maximum file size 10MB; PNG, JPG, MP4
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#00a859] hover:bg-[#00924d] text-white py-3 rounded-full font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {submitted ? "Submitting Request..." : "Submit Request"}
              </button>
            </form>
          </div>

          {/* Right Column: Sidebar Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card (Green Highlight) */}
            <div className="bg-[#00a859] text-white rounded-[24px] p-6 sm:p-7 shadow-md relative overflow-hidden">
              <h3 className="font-extrabold text-lg mb-5 text-white">Direct Contact</h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">1-800-AGRI-HELP</p>
                    <p className="text-emerald-100 text-[11px]">Toll-free helpline</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-white/15">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">support@goru-agri.com</p>
                    <p className="text-emerald-100 text-[11px]">24/7 email response</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Availability</h3>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">Mon - Fri:</span>
                  <span className="font-bold text-slate-900">08:00 - 18:00</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">Saturday:</span>
                  <span className="font-bold text-slate-900">09:00 - 15:00</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">Sunday:</span>
                  <span className="font-bold text-slate-900">Closed</span>
                </div>

                <div className="pt-3 flex items-center gap-2 text-xs font-bold text-[#00a859]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Response Time: &lt; 2 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#1c3a27] mb-2">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={supportFaqs} />

          <div className="text-center mt-6">
            <a
              href="#all-topics"
              className="text-xs font-semibold text-slate-500 hover:text-[#00a859] transition-colors"
            >
              View All Help Topics
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
