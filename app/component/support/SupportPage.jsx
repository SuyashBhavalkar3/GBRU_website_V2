"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import SuccessModal from "@/app/component/shared/SuccessModal";
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
    productId: "",
    issueType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const uploadInputRef = useRef(null);

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
  };

  const handleUploadChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Pre-fill user profile details if authenticated
  useEffect(() => {
    const auth = localStorage.getItem("is_authenticated") === "true";
    if (auth) {
      const storedPhone = localStorage.getItem("user_phone");
      if (storedPhone) {
        const fetchUserData = async () => {
          try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
            if (apiBase && apiKey && apiSecret) {
              // Ensure storedPhone has '91' prefix correctly
              let cleaned = storedPhone.replace(/[^\d]/g, "");
              if (cleaned.length === 12 && cleaned.startsWith("91")) {
                cleaned = cleaned.slice(2);
              }
              
              const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.utility.get_user_details`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-KEY": apiKey,
                  "X-API-SECRET": apiSecret
                },
                body: JSON.stringify({
                  mobile_no: Number(cleaned)
                })
              });
              const data = await res.json();
              if (res.ok && data.message?.status !== false) {
                const userData = data.message?.data;
                if (userData) {
                  setFormData(prev => ({
                    ...prev,
                    fullName: userData.Customer_name || prev.fullName,
                    mobileNumber: storedPhone || prev.mobileNumber
                  }));
                }
              }
            }
          } catch (e) {
            console.error("Failed to fetch user data for support form pre-fill:", e);
          }
        };
        fetchUserData();
      }
    }
  }, []);
  const [productSearch, setProductSearch] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [isSearchingProduct, setIsSearchingProduct] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const [issueSearch, setIssueSearch] = useState("");
  const [issueResults, setIssueResults] = useState([]);
  const [isSearchingIssue, setIsSearchingIssue] = useState(false);
  const [showIssueDropdown, setShowIssueDropdown] = useState(false);

  useEffect(() => {
    if (!productSearch || productSearch.length < 2 || (formData.productId && productSearch === formData.productName)) {
      setProductResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingProduct(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        const storedPhone = localStorage.getItem("user_phone") || "8308020899";

        let response = await fetch(`${apiBase}/api/method/shoption_api.erp_api.item_api.get_items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
            "X-API-SECRET": apiSecret
          },
          body: JSON.stringify({
            search: productSearch,
            category: null,
            subcategory: null,
            brand: null,
            page: 1,
            page_size: 50,
            mobile_no: storedPhone
          })
        });
        let data = await response.json();

        // Retry with sandbox phone number if searching with the user's phone fails (e.g. UnboundLocalError backend price_rows bug)
        if (data.message && data.message.status === false && storedPhone !== "8308020899") {
          console.warn("Product search failed. Retrying with default sandbox phone...");
          response = await fetch(`${apiBase}/api/method/shoption_api.erp_api.item_api.get_items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
              "X-API-SECRET": apiSecret
            },
            body: JSON.stringify({
              search: productSearch,
              category: null,
              subcategory: null,
              brand: null,
              page: 1,
              page_size: 50,
              mobile_no: "8308020899"
            })
          });
          data = await response.json();
        }

        // Extracting nested array based on API signature from ProductListPage.jsx
        let items = [];
        if (data.message) {
          if (data.message.status === false) {
            items = [];
          } else if (data.message.data && Array.isArray(data.message.data.data)) {
            items = data.message.data.data;
          } else if (Array.isArray(data.message.data)) {
            items = data.message.data;
          } else if (Array.isArray(data.message)) {
            items = data.message;
          }
        }
        setProductResults(items);
        setShowProductDropdown(true);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setIsSearchingProduct(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [productSearch]);

  const fetchIssueCategories = async (searchVal = "") => {
    setIsSearchingIssue(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

      const url = `${apiBase}/api/method/shoption_chatbot.apis.query_categories.get_query_categories${searchVal ? `?search=${encodeURIComponent(searchVal)}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret
        }
      });
      const data = await response.json();
      const categories = data.message?.data?.categories || [];

      // Filter locally to make sure it only displays what the user typed (in case backend doesn't filter on 'search')
      if (searchVal) {
        const filtered = categories.filter(c =>
          (c.category_name || c.category_id || "").toLowerCase().includes(searchVal.toLowerCase())
        );
        setIssueResults(filtered);
      } else {
        setIssueResults(categories);
      }
    } catch (err) {
      console.error("Error fetching issue categories:", err);
    } finally {
      setIsSearchingIssue(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchIssueCategories(issueSearch);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [issueSearch]);

  const tSup = useTranslations('supportPage');
  const tCommon = useTranslations('common');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.description) {
      alert("Please fill in required fields (Full Name & Description).");
      return;
    }
    if (!uploadFile) {
      alert("Please upload the required file.");
      return;
    }
    setSubmitted(true);
    
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
      const userApiKey = localStorage.getItem("user_api_key");
      const userApiSecret = localStorage.getItem("user_api_secret");

      const headers = {};
      if (userApiKey && userApiSecret) {
        headers["Authorization"] = `token ${userApiKey}:${userApiSecret}`;
      } else {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }
      }

      // Format mobile number to match user requirements (removing spaces, formatting)
      const rawMobile = formData.mobileNumber || "";
      const cleanedMobile = rawMobile.replace(/[^\d+]/g, "");

      // Construct Multipart Form Data
      const submitData = new FormData();
      submitData.append("full_name", formData.fullName);
      submitData.append("mobile_number", cleanedMobile);
      submitData.append("product_name", formData.productId || formData.productName);
      submitData.append("issue_type", formData.issueType);
      submitData.append("description", formData.description);
      submitData.append("upload", uploadFile);

      const response = await fetch(`${apiBase}/api/method/shoption_products_multiutility.apis.support_request.submit_support_request`, {
        method: "POST",
        headers, // Content-Type header must be omitted for multipart
        body: submitData,
      });

      const data = await response.json();

      if (data.message?.status === true || data.message?.success || data.success) {
        setFormData({
          fullName: "",
          mobileNumber: "",
          productName: "",
          productId: "",
          issueType: "",
          description: "",
        });
        setUploadFile(null);
        setShowSuccessModal(true);
      } else {
        alert(data.message?.message || data.message?.error || data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitted(false);
    }
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
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('productName')}
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => {
                      setFormData({ ...formData, productName: e.target.value, productId: "" });
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => {
                      if (productResults.length > 0) setShowProductDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                    placeholder={tSup('selectProduct')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                    autoComplete="off"
                  />
                  {showProductDropdown && (productResults.length > 0 || isSearchingProduct) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {isSearchingProduct ? (
                        <div className="p-3 text-xs text-slate-500 text-center">Searching...</div>
                      ) : (
                        productResults.map((item, idx) => {
                          const displayName = item.item_name || item.name || item.item_code || String(item);
                          return (
                            <div
                              key={item.name || item.item_code || idx}
                              className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-xs text-slate-700 border-b border-slate-100 last:border-b-0"
                              onClick={() => {
                                const name = item.item_name || item.name || String(item);
                                const code = item.item_code || item.name || "";
                                setFormData({ ...formData, productName: name, productId: code });
                                setProductSearch(name);
                                setShowProductDropdown(false);
                              }}
                            >
                              {displayName}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tSup('issueType')}
                  </label>
                  <input
                    type="text"
                    value={formData.issueType}
                    onChange={(e) => {
                      setFormData({ ...formData, issueType: e.target.value });
                      setIssueSearch(e.target.value);
                      setShowIssueDropdown(true);
                    }}
                    onFocus={() => {
                      setShowIssueDropdown(true);
                      if (issueResults.length === 0) {
                        fetchIssueCategories(issueSearch);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowIssueDropdown(false), 200)}
                    placeholder={tSup('selectIssue')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a859] focus:border-transparent"
                    autoComplete="off"
                  />
                  {showIssueDropdown && (issueResults.length > 0 || isSearchingIssue) && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {isSearchingIssue ? (
                        <div className="p-3 text-xs text-slate-500 text-center">Searching...</div>
                      ) : (
                        issueResults.map((cat, idx) => {
                          const displayName = cat.category_name || cat.category_id || String(cat);
                          return (
                            <div
                              key={cat.category_id || idx}
                              className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-xs text-slate-700 border-b border-slate-100 last:border-b-0"
                              onClick={() => {
                                setFormData({ ...formData, issueType: displayName });
                                setIssueSearch(displayName);
                                setShowIssueDropdown(false);
                              }}
                            >
                              <div className="font-semibold">{displayName}</div>
                              {cat.category_description && (
                                <div className="text-[10px] text-slate-400 mt-0.5">{cat.category_description}</div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
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
                <input 
                  type="file"
                  ref={uploadInputRef}
                  onChange={handleUploadChange}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
                <div 
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-[#00a859] transition-colors cursor-pointer bg-slate-50/50"
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700 truncate max-w-full">
                    {uploadFile ? (
                      <span className="text-[#00a859] font-extrabold">{uploadFile.name}</span>
                    ) : (
                      tSup('uploadInstructions')
                    )}
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
                    <p className="font-bold text-white">support@GBRU-agri.com</p>
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

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={"Request Submitted!"}
        message={"Your support request has been submitted successfully. We will get back to you soon."}
      />
    </div>
  );
}

