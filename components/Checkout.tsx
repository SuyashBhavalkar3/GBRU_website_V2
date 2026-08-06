"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Checkout() {
  // Interactivity States
  const [paymentMode, setPaymentMode] = useState<"full" | "booking">("full");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isOffersOpen, setIsOffersOpen] = useState(true);

  // Address Interactivity States
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [states, setStates] = useState<any[]>([]);

  const [districts, setDistricts] = useState<any[]>([]);
  const [tahsils, setTahsils] = useState<any[]>([]);
  const [marketplaces, setMarketplaces] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const userStr = localStorage.getItem("gbru_user");
        if (!userStr) {
          setLoadingAddresses(false);
          setIsAddingAddress(true);
          return;
        }

        const user = JSON.parse(userStr);
        let mobile_no = user.mobile_no || user.user_id || user.customer_id;
        if (mobile_no && mobile_no.includes("@")) {
          mobile_no = mobile_no.split("@")[0];
        }
        const api_key = user.key_details?.api_key || user.api_key;
        const api_secret = user.key_details?.api_secret || user.api_secret;

        const res = await fetch("/api/shipping-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_no, api_key, api_secret })
        });
        
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data)) {
            setSavedAddresses(json.message.data);
            if (json.message.data.length > 0) {
              setIsAddressSaved(true);
              const primaryIdx = json.message.data.findIndex((a: any) => a.is_primary === 1);
              if (primaryIdx !== -1) setSelectedAddressIndex(primaryIdx);
            } else {
              setIsAddingAddress(true);
            }
          } else {
            setIsAddingAddress(true);
          }
        } else {
          setIsAddingAddress(true);
        }
      } catch (e) {
        console.error("Failed to fetch addresses:", e);
        setIsAddingAddress(true);
      } finally {
        setLoadingAddresses(false);
      }
    }

    async function fetchStates() {
      try {
        const res = await fetch("/api/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data)) {
            setStates(json.message.data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch states", e);
      }
    }

    fetchAddresses();
    fetchStates();
  }, []);

  // Address Form States
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pin: "",
    village: "", // Marketplace
    city: "", // Tehsil
    district: "",
    state: "",
    address1: "",
    address2: "",
    saveAddress: false,
  });

  // Fetch districts when state changes
  useEffect(() => {
    async function fetchDistricts() {
      if (!formData.state) {
        setDistricts([]);
        return;
      }
      try {
        const res = await fetch("/api/districts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state_id: formData.state })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data)) {
            setDistricts(json.message.data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch districts", e);
      }
    }
    fetchDistricts();
  }, [formData.state]);

  // Fetch tahsils when district changes
  useEffect(() => {
    async function fetchTahsils() {
      if (!formData.district) {
        setTahsils([]);
        return;
      }
      try {
        const res = await fetch("/api/tahsils", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ district_id: formData.district })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data)) {
            setTahsils(json.message.data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch tahsils", e);
      }
    }
    fetchTahsils();
  }, [formData.district]);

  // Fetch marketplaces when tehsil changes
  useEffect(() => {
    async function fetchMarketplaces() {
      if (!formData.city) {
        setMarketplaces([]);
        return;
      }
      try {
        const res = await fetch("/api/marketplaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tehsil_id: formData.city })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.message?.status && Array.isArray(json.message?.data)) {
            setMarketplaces(json.message.data);
          }
        }
      } catch (e) {
        console.error("Failed to fetch marketplaces", e);
      }
    }
    fetchMarketplaces();
  }, [formData.city]);

  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const handleSaveAddress = async () => {
    if (!formData.fullName || !formData.mobile || !formData.pin || !formData.village || !formData.city || !formData.district || !formData.state || !formData.address1) {
      alert("Please fill all required fields");
      return;
    }

    setIsSavingAddress(true);
    try {
      const userStr = localStorage.getItem("gbru_user");
      if (!userStr) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(userStr);
      let mobile_no = user.mobile_no || user.user_id || user.customer_id;
      if (mobile_no && mobile_no.includes("@")) {
        mobile_no = mobile_no.split("@")[0];
      }
      const api_key = user.key_details?.api_key || user.api_key;
      const api_secret = user.key_details?.api_secret || user.api_secret;
      
      const email_id = user.user_id && user.user_id.includes("@") ? user.user_id : (user.email || "");

      const address_data = {
        address_title: formData.fullName,
        address_line1: formData.address1,
        address_line2: formData.address2 || "",
        marketplace: formData.village, 
        tahsil: formData.city,         
        district: formData.district,   
        state: formData.state,
        pincode: formData.pin,
        country: "India",
        email_id: email_id,
        phone: formData.mobile
      };

      const res = await fetch("/api/shipping-address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, api_key, api_secret, address_data })
      });

      const json = await res.json();
      if (res.ok && json.message?.status) {
        const newAddress = json.message.data;
        const newAddresses = [...savedAddresses, newAddress];
        setSavedAddresses(newAddresses);
        setSelectedAddressIndex(newAddresses.length - 1); 
        setIsAddressSaved(true);
        setIsAddingAddress(false);
        setFormData({
          fullName: "", mobile: "", pin: "", village: "", city: "", district: "", state: "", address1: "", address2: "", saveAddress: false
        });
      } else {
        alert(json.error || json.message?.message || "Failed to save address");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    setPincodeStatus("checking");
    setTimeout(() => {
      // Mock check: pincodes starting with 1, 2, 3, or 4 are available
      if (/^[1-4]/.test(pincode)) {
        setPincodeStatus("available");
      } else {
        setPincodeStatus("unavailable");
      }
    }, 800);
  };

  const applyCoupon = () => {
    if (!couponCode) return;
    if (couponCode.toUpperCase() === "GBRU10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try 'GBRU10'");
      setCouponApplied(false);
    }
  };

  // Pricing calculations based on paymentMode
  const subtotal = 8499;
  const gst = 1530;
  const delivery = 0; // Free
  
  let couponDiscount = couponApplied ? 500 : 0;
  
  // Dynamic Total calculations
  const total = subtotal + gst - couponDiscount;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col gap-6">
        
        {/* Back Link */}
        <Link
          href="/cart-proceed"
          className="flex items-center gap-1.5 text-sm font-bold text-[#0D9740] hover:underline"
        >
          ← Back to Cart
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[36px] font-extrabold text-[#0F291B] tracking-tight">
            Checkout
          </h1>
          <p className="text-[#6B7280] text-sm">
            Complete your order in a few simple steps
          </p>
        </div>

        {/* Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* ── Left Column (Forms & Selection Cards) ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. Payment Mode Selector */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#0F291B] text-[16px]">Payment Mode</h3>
                <span className="text-xs text-[#0D9740] font-bold cursor-pointer hover:underline flex items-center gap-1">
                  Change
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mode 1: Full Payment */}
                <div
                  onClick={() => setPaymentMode("full")}
                  className={`relative p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMode === "full"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  {paymentMode === "full" && (
                    <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      ✓
                    </div>
                  )}

                  <div>
                    <div className="bg-[#DFB33F] text-white text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3">
                      RECOMMENDED
                    </div>
                    <h4 className="font-bold text-[#0F291B] text-[14px]">Full Payment</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[20px] font-extrabold text-[#0f291b]">₹8,499</span>
                      <span className="text-[12px] line-through text-zinc-400">₹9,999</span>
                    </div>
                    <div className="bg-emerald-50 text-[#0D9740] text-[10px] font-bold py-1 px-2 rounded-[6px] inline-block mt-2">
                      Save ₹1,500 (15% OFF)
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-3">Pay complete amount today</p>

                    <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                      <div className="flex justify-between">
                        <span>Order Total</span>
                        <span>₹9,948</span>
                      </div>
                      <div className="flex justify-between text-[#0D9740]">
                        <span>Instant Discount</span>
                        <span>- ₹1,248.74</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-zinc-100 pt-3">
                    <span className="text-[11px] font-medium text-[#6B7280]">Pay Now</span>
                    <div className="text-[20px] font-extrabold text-[#0f291b]">₹7,251</div>
                    <div className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-medium py-1 px-2.5 rounded-[6px] mt-2 flex items-center justify-center gap-1">
                      🎁 You'll save ₹1,248.74 on this order!
                    </div>
                  </div>
                </div>

                {/* Mode 2: Book Now & Pay Later */}
                <div
                  onClick={() => setPaymentMode("booking")}
                  className={`relative p-5 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMode === "booking"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  {paymentMode === "booking" && (
                    <div className="absolute top-[-10px] right-[-10px] bg-[#0d9740] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      ✓
                    </div>
                  )}

                  <div>
                    <div className="text-[9px] font-bold py-1 px-2 rounded-[6px] inline-block mb-3 border border-zinc-300 text-zinc-500">
                      BOOK NOW & PAY LATER
                    </div>
                    <h4 className="font-bold text-[#0F291B] text-[14px]">Booking Deposit</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-[20px] font-extrabold text-[#0f291b]">₹9,999</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-3">Reserve with small amount</p>

                    <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                      <div className="flex justify-between">
                        <span>Order Total</span>
                        <span>₹9,948</span>
                      </div>
                      <div className="flex justify-between text-[#0D9740]">
                        <span>Instant Discount</span>
                        <span>- ₹948.74</span>
                      </div>
                      <div className="flex justify-between bg-emerald-50 px-1 py-0.5 rounded text-[11px]">
                        <span>Effective Total</span>
                        <span className="font-bold text-[#0d9740]">₹8,999</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-zinc-100 pt-3">
                    <span className="text-[11px] font-medium text-[#6B7280]">Pay Now (Booking)</span>
                    <div className="text-[20px] font-extrabold text-[#0f291b]">₹1,000</div>
                    <span className="text-[11px] text-zinc-500 block mt-1">
                      Pay on Delivery: <span className="font-bold text-[#0f291b]">₹7,999</span>
                    </span>
                    <div className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-medium py-1 px-2.5 rounded-[6px] mt-2 flex items-center justify-center gap-1">
                      🎁 You'll save ₹948.74 on this order!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-[#0F291B] text-[18px]">Delivery Address</h3>
                  <p className="text-xs text-[#6B7280]">
                    Tell us where to deliver your agricultural equipment and supplies.
                  </p>
                </div>
                {isAddressSaved ? (
                  <button
                    onClick={() => {
                      setIsAddressSaved(false);
                      setIsAddingAddress(true);
                    }}
                    className="text-xs text-[#0D9740] font-bold hover:underline"
                  >
                    Edit
                  </button>
                ) : isAddingAddress ? (
                  <button
                    onClick={() => {
                      setIsAddingAddress(false);
                      if (savedAddresses.length > 0) {
                        setIsAddressSaved(true);
                      } else {
                        setIsAddressSaved(false);
                      }
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-800 font-bold flex items-center gap-1 border border-zinc-200 rounded-lg py-1 px-2.5 bg-zinc-50 hover:bg-zinc-100 transition-all"
                    title="Minimize form"
                  >
                    ✕ Minimize
                  </button>
                ) : null}
              </div>

              {loadingAddresses ? (
                <div className="flex justify-center py-6 text-sm text-zinc-500 font-semibold">
                  Loading addresses...
                </div>
              ) : isAddressSaved && savedAddresses.length > 0 ? (
                /* Saved Addresses List */
                <div className="flex flex-col gap-4">
                  {savedAddresses.map((addr, idx) => (
                    <div 
                      key={addr.name} 
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`relative border rounded-[16px] p-5 flex flex-col gap-2 cursor-pointer transition-all ${
                        selectedAddressIndex === idx 
                        ? "bg-[#F8FBB8]/20 border-[#0D9740]" 
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {selectedAddressIndex === idx && (
                        <div className="absolute top-4 right-4 bg-[#0d9740] text-white w-5 h-5 rounded-full flex items-center justify-center shadow-sm text-xs">
                          ✓
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F291B] text-sm">{addr.address_title}</span>
                        {addr.is_primary === 1 && (
                          <span className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-bold py-0.5 px-2 rounded-[4px]">Primary</span>
                        )}
                      </div>
                      <span className="text-xs text-[#374151] pr-6">
                        {addr.address_line1}, {addr.address_line2}, {addr.city || addr.tahsil}, {addr.district}, {addr.state} - {addr.pincode}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        Phone: {addr.phone}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => {
                        setIsAddressSaved(false);
                        setIsAddingAddress(true);
                      }}
                      className="h-12 px-8 border-2 border-dashed border-[#0D9740] hover:bg-[#0d9740]/[0.02] text-[#0D9740] font-bold text-sm rounded-[14px] transition-all flex items-center gap-2 shadow-sm"
                    >
                      ＋ Add Delivery Address
                    </button>
                  </div>
                </div>
              ) : !isAddingAddress ? (
                /* Initial "+ Add Address" button state */
                <div className="py-6 flex justify-center">
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="h-12 px-8 border-2 border-dashed border-[#0D9740] hover:bg-[#0d9740]/[0.02] text-[#0D9740] font-bold text-sm rounded-[14px] transition-all flex items-center gap-2 shadow-sm"
                  >
                    ＋ Add Delivery Address
                  </button>
                </div>
              ) : (
                /* Address Entry Form */
                <div className="flex flex-col gap-6">
                  {/* Service Pincode Checker */}
                  <form onSubmit={checkPincode} className="bg-[#F8F9FA] rounded-[16px] p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-zinc-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[20px] text-[#0D9740]">📍</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-[#0F291B]">Service Availability</span>
                        <span className="text-[10px] text-zinc-500">Check if we deliver to your village or area.</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        className="w-full md:w-40 h-10 px-3 bg-white border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] placeholder:text-zinc-400 focus:outline-[#0D9740]"
                      />
                      <button
                        type="submit"
                        className="h-10 px-6 bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs rounded-[10px] shadow transition-all whitespace-nowrap"
                      >
                        Check
                      </button>
                    </div>
                  </form>

                  {pincodeStatus === "checking" && (
                    <div className="text-xs text-zinc-500 font-semibold px-2">Checking service availability...</div>
                  )}
                  {pincodeStatus === "available" && (
                    <div className="text-xs text-emerald-600 font-bold px-2">✓ Service available in your area!</div>
                  )}
                  {pincodeStatus === "unavailable" && (
                    <div className="text-xs text-red-500 font-bold px-2">✗ Delivery unavailable to this pincode. Try a pincode starting with 1, 2, 3, or 4.</div>
                  )}

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">Mobile Number</label>
                      <input
                        type="text"
                        placeholder="+91 10-digit number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">Pincode</label>
                      <input
                        type="text"
                        placeholder="6-digit pincode"
                        value={formData.pin}
                        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">State</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value, district: "", city: "", village: "" })} // Reset children
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740] bg-white cursor-pointer"
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">District</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value, city: "", village: "" })} // Reset child selections
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740] bg-white cursor-pointer"
                        disabled={!formData.state}
                      >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">Tehsil</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value, village: "" })} // Reset child selection
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740] bg-white cursor-pointer"
                        disabled={!formData.district}
                      >
                        <option value="">Select Tehsil</option>
                        {tahsils.map((t) => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F291B]">Marketplace</label>
                      <select
                        value={formData.village}
                        onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740] bg-white cursor-pointer"
                        disabled={!formData.city}
                      >
                        <option value="">Select Marketplace</option>
                        {marketplaces.map((mp) => (
                          <option key={mp.id} value={mp.id}>{mp.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[#0F291B]">Address Line 1</label>
                      <input
                        type="text"
                        placeholder="Near Temple, School, or Shop"
                        value={formData.address1}
                        onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[#0F291B]">Address Line 2</label>
                      <input
                        type="text"
                        placeholder="Near Temple, School, or Shop"
                        value={formData.address2}
                        onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                        className="h-12 px-4 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
                      />
                    </div>
                  </div>

                  {/* Checkbox Save */}
                  <label className="flex items-center gap-2 text-xs text-zinc-600 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.saveAddress}
                      onChange={(e) => setFormData({ ...formData, saveAddress: e.target.checked })}
                      className="w-4 h-4 accent-[#0D9740] border border-zinc-200 rounded focus:ring-[#0D9740]"
                    />
                    Save this address for future orders
                  </label>

                  {/* Save Address Button */}
                  <div className="flex justify-end items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        setIsAddingAddress(false);
                        if (savedAddresses.length > 0) {
                          setIsAddressSaved(true);
                        } else {
                          setIsAddressSaved(false);
                        }
                      }}
                      className="h-12 px-6 border border-zinc-300 hover:bg-zinc-50 text-zinc-600 font-bold text-sm rounded-[10px] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAddress}
                      disabled={isSavingAddress}
                      className={`h-12 px-8 ${isSavingAddress ? 'bg-zinc-400' : 'bg-[#0D9740] hover:bg-[#0a7d34]'} text-white font-bold text-sm rounded-[10px] shadow transition-all flex items-center gap-2`}
                    >
                      {isSavingAddress ? "Saving..." : (
                        <>Save and Continue <span>→</span></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Method Card */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
              <h3 className="font-bold text-[#0F291B] text-[18px]">Payment Method</h3>
              
              <div className="flex flex-col gap-4">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-[16px] border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "upi"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-100 bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">📱</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#0F291B]">UPI</span>
                      <span className="text-[11px] text-zinc-500">Pay via UPI apps</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "upi" ? "border-[#0D9740] bg-[#0D9740]" : "border-zinc-300"
                  }`}>
                    {paymentMethod === "upi" && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-[16px] border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "card"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-100 bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">💳</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#0F291B]">Credit / Debit Card</span>
                      <span className="text-[11px] text-zinc-500">Visa, Mastercard, Rupay</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card" ? "border-[#0D9740] bg-[#0D9740]" : "border-zinc-300"
                  }`}>
                    {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-4 rounded-[16px] border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "netbanking"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-100 bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg">🏦</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#0F291B]">Net Banking</span>
                      <span className="text-[11px] text-zinc-500">All major banks</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "netbanking" ? "border-[#0D9740] bg-[#0D9740]" : "border-zinc-300"
                  }`}>
                    {paymentMethod === "netbanking" && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column (Order Summary) ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Summary Box */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-5">
              <h3 className="font-roboto font-bold text-[#0F291B] text-lg">
                Order Summary
              </h3>

              {/* Offers & Coupons Collapsible Drawer */}
              <div className="border border-zinc-100 rounded-[14px] overflow-hidden">
                <button
                  onClick={() => setIsOffersOpen(!isOffersOpen)}
                  className="w-full bg-[#F8F9FA] px-4 py-3 flex items-center justify-between text-xs font-bold text-[#0F291B]"
                >
                  <span className="flex items-center gap-2">
                    🏷️ Offers & Coupons
                  </span>
                  <span>{isOffersOpen ? "▲" : "▼"}</span>
                </button>

                {isOffersOpen && (
                  <div className="p-4 flex flex-col gap-3 bg-white">
                    <span className="text-[10px] text-zinc-500 block">Tap to apply coupon code. Use "GBRU10" to save ₹500.</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 h-9 px-3 border border-zinc-200 rounded-[8px] text-xs text-[#0F291B] focus:outline-[#0D9740]"
                      />
                      <button
                        onClick={applyCoupon}
                        className="h-9 px-4 bg-[#0F291B] hover:bg-[#08170f] text-white font-bold text-xs rounded-[8px]"
                      >
                        Apply
                      </button>
                    </div>

                    {couponApplied && (
                      <span className="text-[11px] text-[#0D9740] font-bold">✓ Coupon "GBRU10" Applied! Saved ₹500.</span>
                    )}
                    {couponError && (
                      <span className="text-[11px] text-red-500 font-bold">{couponError}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Info Row */}
              <div className="bg-[#F8F9FA] rounded-[14px] p-4 flex flex-col gap-1">
                <span className="font-bold text-xs text-[#0F291B]">GBRU Pro-Series 5000</span>
                <span className="text-[10px] text-zinc-500">Qty: 1 • Full Payment</span>
              </div>

              {/* Price Details */}
              <div className="flex flex-col gap-4 text-sm text-[#374151] border-t border-zinc-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">GST (18%)</span>
                  <span className="font-bold">₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Delivery</span>
                  <span className="font-bold text-[#0d9740]">FREE</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#0d9740]">
                    <span>Coupon Discount</span>
                    <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100">
                  <span className="font-bold text-[#0F291B] text-[16px]">Total</span>
                  <span className="font-extrabold text-[#0F291B] text-[24px]">
                    {paymentMode === "full" 
                      ? `₹${total.toLocaleString("en-IN")}`
                      : "₹1,000" // For booking, they only pay ₹1,000 now
                    }
                  </span>
                </div>
                {paymentMode === "booking" && (
                  <span className="text-[11px] text-zinc-500 text-right block leading-none">
                    (₹{ (total - 1000).toLocaleString("en-IN") } payable on delivery)
                  </span>
                )}
              </div>

              {/* Secure Checkout CTA */}
              <button className="w-full h-14 rounded-[14px] bg-gradient-to-r from-[#1A4D2E] to-[#2A6F45] hover:opacity-90 active:scale-[0.99] text-white font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-sm mt-2">
                🔒 Place Order Securely
              </button>

              <span className="text-[11px] text-zinc-500 text-center block">
                Your payment information is secure
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
