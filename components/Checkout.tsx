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

  // Dynamic Checkout States
  const [checkoutDetails, setCheckoutDetails] = useState<any>(null);
  const [proceedData, setProceedData] = useState<any>(null);
  const [defaultProceedData, setDefaultProceedData] = useState<any>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(true);

  // Address Interactivity States
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [editingAddressName, setEditingAddressName] = useState<string | null>(null);
  
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "alert" | "confirm";
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ isOpen: false, type: "alert", title: "", message: "" });

  const showAlert = (message: string, title = "Message") => {
    setModalConfig({ isOpen: true, type: "alert", title, message });
  };

  const showConfirm = (message: string, onConfirm: () => void, title = "Confirm") => {
    setModalConfig({ isOpen: true, type: "confirm", title, message, onConfirm });
  };

  const [states, setStates] = useState<any[]>([]);

  const [districts, setDistricts] = useState<any[]>([]);
  const [tahsils, setTahsils] = useState<any[]>([]);
  const [marketplaces, setMarketplaces] = useState<any[]>([]);

  const fetchProceedData = async (items: any[], couponCodeToApply?: string) => {
    try {
      const userStr = localStorage.getItem("gbru_user");
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const mobile_no = user.customer_id?.split('-')[1] || user.user_id || user.mobile_no;
      if (!mobile_no) return;

      const formattedItems = items.map(i => ({
        item: i.item,
        quantity: i.quantity
      }));

      const res = await fetch("/api/cart/proceed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_no,
          items: formattedItems,
          coupon_code: couponCodeToApply || null
        })
      });
      const data = await res.json();
      if (data?.message?.status && data.message.data) {
        setProceedData(data.message.data);
        if (!couponCodeToApply) {
          setDefaultProceedData(data.message.data);
        }
        if (data.message.data.coupon) {
          setCouponApplied(true);
          setCouponError("");
        } else if (couponCodeToApply) {
          setCouponError("Failed to apply coupon.");
          setCouponApplied(false);
        }
      }
    } catch (e) {
      console.error("Failed to load proceed details:", e);
    }
  };

  useEffect(() => {
    async function fetchAddressesAndCheckout() {
      try {
        setLoadingCheckout(true);
        const userStr = localStorage.getItem("gbru_user");
        if (!userStr) {
          setLoadingAddresses(false);
          setIsAddingAddress(true);
          setLoadingCheckout(false);
          return;
        }

        const user = JSON.parse(userStr);
        let mobile_no = user.mobile_no || user.user_id || user.customer_id;
        if (mobile_no && mobile_no.includes("@")) {
          mobile_no = mobile_no.split("@")[0];
        }
        const api_key = user.key_details?.api_key || user.api_key;
        const api_secret = user.key_details?.api_secret || user.api_secret;

        // 1. Fetch Shipping Addresses
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

        // 2. Fetch Checkout Details
        const checkoutMobile = user.customer_id?.split('-')[1] || user.user_id || user.mobile_no;
        const checkoutRes = await fetch("/api/cart/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_no: checkoutMobile })
        });
        if (checkoutRes.ok) {
          const checkoutJson = await checkoutRes.json();
          if (checkoutJson.message?.status && checkoutJson.message.data) {
            setCheckoutDetails(checkoutJson.message.data);
            
            // Set paymentMode based on checkout items' payment type
            const firstItem = checkoutJson.message.data.items?.[0];
            if (firstItem?.payment_type === "Cash On Delivery") {
              setPaymentMode("booking");
            } else {
              setPaymentMode("full");
            }

            // Immediately load Proceed details
            await fetchProceedData(checkoutJson.message.data.items);
          }
        }
      } catch (e) {
        console.error("Failed to fetch addresses and checkout:", e);
        setIsAddingAddress(true);
      } finally {
        setLoadingAddresses(false);
        setLoadingCheckout(false);
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

    fetchAddressesAndCheckout();
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

  const requestDeleteAddress = (name: string) => {
    showConfirm("Are you sure you want to delete this address?", () => performDeleteAddress(name), "Delete Address");
  };

  const performDeleteAddress = async (name: string) => {
    // Optimistically remove from state for now
    const previousAddresses = [...savedAddresses];
    const previousIndex = selectedAddressIndex;

    const updatedAddresses = savedAddresses.filter(a => a.name !== name);
    setSavedAddresses(updatedAddresses);
    if (selectedAddressIndex >= updatedAddresses.length) {
      setSelectedAddressIndex(Math.max(0, updatedAddresses.length - 1));
    }
    if (updatedAddresses.length === 0) {
      setIsAddressSaved(false);
      setIsAddingAddress(true);
    }

    try {
      const userStr = localStorage.getItem("gbru_user");
      if (!userStr) return;
      
      const user = JSON.parse(userStr);
      let mobile_no = user.mobile_no || user.user_id || user.customer_id;
      if (mobile_no && mobile_no.includes("@")) {
        mobile_no = mobile_no.split("@")[0];
      }
      const api_key = user.key_details?.api_key || user.api_key;
      const api_secret = user.key_details?.api_secret || user.api_secret;

      const res = await fetch("/api/shipping-address/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, api_key, api_secret, name })
      });

      const json = await res.json();
      if (!res.ok || !json.message?.status) {
        // Revert optimistic update
        setSavedAddresses(previousAddresses);
        setSelectedAddressIndex(previousIndex);
        if (previousAddresses.length > 0) {
          setIsAddressSaved(true);
          setIsAddingAddress(false);
        }
        
        let errorMsg = json.error || json.message?.message || "Failed to delete address";
        if (json._server_messages) {
          try {
            const serverMsgs = JSON.parse(json._server_messages);
            if (serverMsgs.length > 0) {
              const msgObj = JSON.parse(serverMsgs[0]);
              if (msgObj.message) {
                errorMsg = msgObj.message.replace(/<[^>]*>?/gm, '');
              }
            }
          } catch (e) {}
        }
        showAlert(errorMsg, "Deletion Error");
      }
    } catch (e) {
      console.error(e);
      // Revert optimistic update
      setSavedAddresses(previousAddresses);
      setSelectedAddressIndex(previousIndex);
      showAlert("Error deleting address", "Error");
    }
  };

  const handleMakePrimary = async (name: string) => {
    // Optimistically update UI
    const previousAddresses = [...savedAddresses];
    
    setSavedAddresses(prev => prev.map(a => ({
      ...a,
      is_primary: a.name === name ? 1 : 0
    })));

    try {
      const userStr = localStorage.getItem("gbru_user");
      if (!userStr) return;
      
      const user = JSON.parse(userStr);
      let mobile_no = user.mobile_no || user.user_id || user.customer_id;
      if (mobile_no && mobile_no.includes("@")) {
        mobile_no = mobile_no.split("@")[0];
      }
      const api_key = user.key_details?.api_key || user.api_key;
      const api_secret = user.key_details?.api_secret || user.api_secret;

      const res = await fetch("/api/shipping-address/make-primary", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, api_key, api_secret, name })
      });

      const json = await res.json();
      if (!res.ok || !json.message?.status) {
        // Revert optimistic update
        setSavedAddresses(previousAddresses);
        
        let errorMsg = json.error || json.message?.message || "Failed to set primary address";
        if (json._server_messages) {
          try {
            const serverMsgs = JSON.parse(json._server_messages);
            if (serverMsgs.length > 0) {
              const msgObj = JSON.parse(serverMsgs[0]);
              if (msgObj.message) {
                errorMsg = msgObj.message.replace(/<[^>]*>?/gm, '');
              }
            }
          } catch (e) {}
        }
        showAlert(errorMsg, "Error");
      }
    } catch (e) {
      console.error(e);
      // Revert optimistic update
      setSavedAddresses(previousAddresses);
      showAlert("Error setting primary address", "Error");
    }
  };

  const handleSaveAddress = async () => {
    if (!formData.fullName || !formData.mobile || !formData.pin || !formData.village || !formData.city || !formData.district || !formData.state || !formData.address1) {
      showAlert("Please fill all required fields", "Missing Information");
      return;
    }

    setIsSavingAddress(true);
    try {
      const userStr = localStorage.getItem("gbru_user");
      if (!userStr) {
        showAlert("Please login first", "Authentication Required");
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

      const address_data: any = {
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

      if (editingAddressName) {
        address_data.name = editingAddressName;
      }

      const endpoint = editingAddressName ? "/api/shipping-address/update" : "/api/shipping-address/add";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no, api_key, api_secret, address_data })
      });

      const json = await res.json();
      if (res.ok && json.message?.status) {
        const returnedAddress = json.message.data;
        if (editingAddressName) {
          const updatedAddresses = savedAddresses.map(a => 
            a.name === editingAddressName ? returnedAddress : a
          );
          setSavedAddresses(updatedAddresses);
          const idx = updatedAddresses.findIndex(a => a.name === returnedAddress.name);
          if (idx !== -1) setSelectedAddressIndex(idx);
        } else {
          const newAddresses = [...savedAddresses, returnedAddress];
          setSavedAddresses(newAddresses);
          setSelectedAddressIndex(newAddresses.length - 1); 
        }
        setIsAddressSaved(true);
        setIsAddingAddress(false);
        setEditingAddressName(null);
        setFormData({
          fullName: "", mobile: "", pin: "", village: "", city: "", district: "", state: "", address1: "", address2: "", saveAddress: false
        });
      } else {
        let errorMsg = json.error || json.message?.message || "Failed to save address";
        
        if (json._server_messages) {
          try {
            const serverMsgs = JSON.parse(json._server_messages);
            if (serverMsgs.length > 0) {
              const msgObj = JSON.parse(serverMsgs[0]);
              // Remove HTML tags for clean alert text
              if (msgObj.message) {
                errorMsg = msgObj.message.replace(/<[^>]*>?/gm, '');
              }
            }
          } catch (e) {
            console.error("Could not parse server messages", e);
          }
        }
        
        showAlert(errorMsg, "Error Saving Address");
      }
    } catch (e) {
      console.error(e);
      showAlert("Error saving address", "Error");
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
    if (paymentMode === "booking") {
      setCouponError("coupon valid only if payment type is Full Payment");
      setCouponApplied(false);
      return;
    }
    if (!checkoutDetails?.items) return;
    fetchProceedData(checkoutDetails.items, couponCode);
  };

  const handleSelectPaymentMode = (mode: "full" | "booking") => {
    setPaymentMode(mode);
    if (mode === "booking") {
      if (couponApplied || couponCode) {
        setCouponError("coupon valid only if payment type is Full Payment");
        setCouponApplied(false);
        if (checkoutDetails?.items) {
          fetchProceedData(checkoutDetails.items, "");
        }
      }
    } else {
      setCouponError("");
    }
  };

  const formatPrice = (val: any) => {
    if (val === undefined || val === null) return "0.00";
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Pricing calculations based on paymentMode and proceedData
  const activePricingData = paymentMode === "booking" ? (defaultProceedData || proceedData) : proceedData;
  const subtotal = activePricingData?.payment_summary?.original_amount || 0;
  const gst = activePricingData?.total_taxes_and_charges || 0;
  const delivery = 0;
  const couponDiscount = paymentMode === "booking" ? 0 : (proceedData?.payment_summary?.full_payment?.coupen_discount || 0);
  
  const total = activePricingData?.grand_total || 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col pb-16">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 pt-8 flex flex-col gap-6">
        
        {/* Back Link */}
        <Link
          href="/cart"
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
                  onClick={() => handleSelectPaymentMode("full")}
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
                      <span className="text-[20px] font-extrabold text-[#0f291b]">
                        ₹{formatPrice(proceedData?.payment_summary?.full_payment?.payable_amount)}
                      </span>
                      {proceedData?.payment_summary?.full_payment?.discount_amount > 0 && (
                        <span className="text-[12px] line-through text-zinc-400">
                          ₹{formatPrice(proceedData?.payment_summary?.original_amount)}
                        </span>
                      )}
                    </div>
                    {proceedData?.payment_summary?.full_payment?.discount_amount > 0 && (
                      <div className="bg-emerald-50 text-[#0D9740] text-[10px] font-bold py-1 px-2 rounded-[6px] inline-block mt-2">
                        {proceedData?.payment_summary?.full_payment?.label || "Discount Applied"}
                      </div>
                    )}
                    <p className="text-[11px] text-[#6B7280] mt-3">Pay complete amount today</p>

                    <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                      <div className="flex justify-between">
                        <span>Order Total</span>
                        <span>₹{formatPrice(proceedData?.payment_summary?.original_amount)}</span>
                      </div>
                      <div className="flex justify-between text-[#0D9740]">
                        <span>Instant Discount</span>
                        <span>- ₹{formatPrice(proceedData?.payment_summary?.full_payment?.discount_amount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-zinc-100 pt-3">
                    <span className="text-[11px] font-medium text-[#6B7280]">Pay Now</span>
                    <div className="text-[20px] font-extrabold text-[#0f291b]">
                      ₹{formatPrice(proceedData?.payment_summary?.full_payment?.payable_amount)}
                    </div>
                    {proceedData?.payment_summary?.full_payment?.discount_amount > 0 && (
                      <div className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-medium py-1 px-2.5 rounded-[6px] mt-2 flex items-center justify-center gap-1">
                        🎁 You'll save ₹{formatPrice(proceedData?.payment_summary?.full_payment?.discount_amount)} on this order!
                      </div>
                    )}
                  </div>
                </div>

                {proceedData?.allowed_payment_types?.includes("Cash On Delivery") && proceedData?.payment_summary?.cash_on_delivery && (
                  /* Mode 2: Book Now & Pay Later */
                  <div
                    onClick={() => handleSelectPaymentMode("booking")}
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
                        <span className="text-[20px] font-extrabold text-[#0f291b]">
                          ₹{formatPrice(defaultProceedData?.payment_summary?.cash_on_delivery?.pay_now || proceedData?.payment_summary?.cash_on_delivery?.pay_now)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-3">Reserve with small amount</p>

                      <div className="mt-4 flex flex-col gap-1.5 text-xs text-[#374151] border-t border-zinc-100 pt-3">
                        <div className="flex justify-between">
                          <span>Order Total</span>
                          <span>₹{formatPrice(defaultProceedData?.payment_summary?.original_amount || proceedData?.payment_summary?.original_amount)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-zinc-100 pt-3">
                      <span className="text-[11px] font-medium text-[#6B7280]">Pay Now (Booking)</span>
                      <div className="text-[20px] font-extrabold text-[#0f291b]">
                        ₹{formatPrice(defaultProceedData?.payment_summary?.cash_on_delivery?.pay_now || proceedData?.payment_summary?.cash_on_delivery?.pay_now)}
                      </div>
                      <span className="text-[11px] text-zinc-500 block mt-1">
                        Pay on Delivery: <span className="font-bold text-[#0f291b]">
                          ₹{formatPrice(defaultProceedData?.payment_summary?.cash_on_delivery?.pay_on_delivery || proceedData?.payment_summary?.cash_on_delivery?.pay_on_delivery)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
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
                {isAddingAddress ? (
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

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F291B] text-sm">{addr.address_title}</span>
                        {addr.is_primary === 1 && (
                          <span className="bg-[#EBF5EE] text-[#0D9740] text-[10px] font-bold py-0.5 px-2 rounded-[4px]">Primary</span>
                        )}
                        <div className="ml-auto flex items-center gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({
                                fullName: addr.address_title || "",
                                mobile: addr.phone || "",
                                pin: addr.pincode || "",
                                village: addr.marketplace || "",
                                city: addr.tahsil || "", 
                                district: addr.district || "",
                                state: addr.state || "",
                                address1: addr.address_line1 || "",
                                address2: addr.address_line2 || "",
                                saveAddress: false,
                              });
                              setEditingAddressName(addr.name);
                              setIsAddressSaved(false);
                              setIsAddingAddress(true);
                            }}
                            className="text-xs text-[#0D9740] hover:underline font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              requestDeleteAddress(addr.name);
                            }}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                            title="Delete Address"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <span className="text-xs text-[#374151] pr-6">
                        {addr.address_line1}, {addr.address_line2}, {addr.city || addr.tahsil}, {addr.district}, {addr.state} - {addr.pincode}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        Phone: {addr.phone}
                      </span>
                      {selectedAddressIndex === idx && addr.is_primary !== 1 && (
                        <div className="mt-1 pt-2 border-t border-zinc-100/50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMakePrimary(addr.name);
                            }}
                            className="text-[11px] font-bold text-[#0D9740] bg-[#0D9740]/10 hover:bg-[#0D9740]/20 py-1.5 px-3 rounded-[8px] transition-colors"
                          >
                            Set as Primary Address
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => {
                        setIsAddressSaved(false);
                        setIsAddingAddress(true);
                        setEditingAddressName(null);
                        setFormData({
                          fullName: "", mobile: "", pin: "", village: "", city: "", district: "", state: "", address1: "", address2: "", saveAddress: false
                        });
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
                    onClick={() => {
                      setIsAddingAddress(true);
                      setEditingAddressName(null);
                      setFormData({
                        fullName: "", mobile: "", pin: "", village: "", city: "", district: "", state: "", address1: "", address2: "", saveAddress: false
                      });
                    }}
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
                      <span className="text-[11px] text-[#0D9740] font-bold">✓ Coupon "{proceedData?.coupon?.code || couponCode}" Applied! Saved ₹{formatPrice(couponDiscount)}.</span>
                    )}
                    {couponError && (
                      <span className="text-[11px] text-red-500 font-bold">{couponError}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="flex flex-col gap-4 text-sm text-[#374151] border-t border-zinc-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold">₹{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">GST</span>
                  <span className="font-bold">₹{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Delivery</span>
                  <span className="font-bold text-[#0d9740]">FREE</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#0d9740]">
                    <span>Coupon Discount</span>
                    <span>- ₹{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100">
                  <span className="font-bold text-[#0F291B] text-[16px]">Total</span>
                  <span className="font-extrabold text-[#0F291B] text-[24px]">
                    {paymentMode === "full" 
                      ? `₹${formatPrice(proceedData?.payment_summary?.full_payment?.payable_amount)}`
                      : `₹${formatPrice(proceedData?.payment_summary?.cash_on_delivery?.pay_now)}`
                    }
                  </span>
                </div>
                {paymentMode === "booking" && (
                  <span className="text-[11px] text-zinc-500 text-right block leading-none">
                    (₹{formatPrice(proceedData?.payment_summary?.cash_on_delivery?.pay_on_delivery)} payable on delivery)
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

      {/* Custom Modal for Alerts/Confirms */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-sm flex flex-col items-center text-center transform animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {modalConfig.type === "confirm" ? (
              <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
            ) : (
              <div className="w-12 h-12 bg-[#0D9740]/10 text-[#0D9740] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
            )}
            
            <h3 className="font-bold text-lg text-zinc-900 mb-2">{modalConfig.title}</h3>
            <p className="text-sm text-zinc-500 mb-6">{modalConfig.message}</p>
            
            <div className="flex gap-3 w-full">
              {modalConfig.type === "confirm" && (
                <button
                  onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 px-4 rounded-[12px] font-bold text-sm text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  if (modalConfig.onConfirm) modalConfig.onConfirm();
                  setModalConfig(prev => ({ ...prev, isOpen: false }));
                }}
                className={`flex-1 py-2.5 px-4 rounded-[12px] font-bold text-sm text-white shadow-sm transition-colors ${
                  modalConfig.type === "confirm" ? "bg-red-500 hover:bg-red-600" : "bg-[#0D9740] hover:bg-[#0b8036]"
                }`}
              >
                {modalConfig.type === "confirm" ? "Confirm" : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
