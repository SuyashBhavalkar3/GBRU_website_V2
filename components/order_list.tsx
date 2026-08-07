"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { Package, MapPin, Banknote, Bell, Headphones, Phone } from "lucide-react";
import Footer from "./Footer";

interface Order {
  order_id: string;
  date: string;
  total_amount: number | string;
  received_amount: number | string;
  pending_amount: number | string;
  payupreferedmode?: string;
  payupreferedamount?: number | string;
}

interface UserDetails {
  Customer_name: string;
  address: string;
  status: string;
  role: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // User profile details
  const [userName, setUserName] = useState("Prakash");
  const [userMobile, setUserMobile] = useState("+91 98765 43210");
  
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem("gbru_user");
        if (!stored) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(stored);
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
        if (mobile_no) {
          setUserMobile(mobile_no.startsWith("+91") ? mobile_no : `+91 ${mobile_no}`);
        }

        // Fetch User profile details
        try {
          const userRes = await fetch('/api/user-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile_no })
          });
          const userData = await userRes.json();
          if (userData?.message?.status && userData?.message?.data) {
            const details: UserDetails = userData.message.data;
            if (details.Customer_name) {
              setUserName(details.Customer_name.split(" ")[0]);
            }
          }
        } catch (e) {
          console.error("Error loading user profile details:", e);
        }

        // Fetch orders list
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mobile_no })
        });

        const data = await res.json();
        
        if (data?.message?.status && data?.message?.data?.data) {
          setOrders(data.message.data.data);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter orders by search query
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery.trim()) return true;
    return order.order_id?.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });

  const handlePayNow = async (orderId: string, amount: number) => {
    setPayingOrderId(orderId);
    try {
      const stored = localStorage.getItem("gbru_user");
      if (!stored) {
        alert("User not logged in");
        return;
      }
      const parsed = JSON.parse(stored);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
      const email = parsed.user_id && parsed.user_id.includes("@") ? parsed.user_id : (parsed.email || "");

      const res = await fetch("/api/orders/pay-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_no,
          order_id: orderId,
          amount: amount,
          email
        })
      });
      const data = await res.json();
      if (data.status && data.token && data.actionUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.actionUrl;

        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "token";
        hidden.value = data.token;
        form.appendChild(hidden);

        document.body.appendChild(form);
        form.submit();
      } else {
        alert(data.error || data.message || "Failed to initiate payment.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while initiating payment.");
    } finally {
      setPayingOrderId(null);
    }
  };

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => Number(o.pending_amount) > 0).length;
  const deliveredOrdersCount = orders.filter((o) => Number(o.pending_amount) === 0).length;

  return (
    <div className="min-h-screen bg-[#F9FBF9] font-roboto flex flex-col">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 py-8 flex-1 flex flex-col gap-8">
        
        {/* 1. User Profile summary Header */}
        <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full border border-emerald-200 bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 text-2xl font-bold uppercase shadow-sm">
              {userName && userName !== "Loading..." ? userName.charAt(0) : "U"}
              <div className="absolute bottom-0 right-0 bg-[#0FA84D] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] border border-white z-10">
                ✓
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold text-[#0F291B] flex items-center gap-1.5 leading-snug">
                Hello, {userName} 👋
              </h1>
              <span className="text-xs text-zinc-500">
                Manage your account and orders easily
              </span>
              <span className="text-[11px] text-[#0FA84D] font-semibold mt-1 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {userMobile}
              </span>
            </div>
          </div>

          <Link 
            href="/user-profile" 
            className="h-10 px-6 border border-[#0D9740]/60 hover:bg-[#0D9740]/[0.02] text-[#0D9740] font-bold text-xs rounded-[10px] shadow-sm transition-all flex items-center justify-center"
          >
            Edit Profile
          </Link>
        </div>

        {/* 2. Account Shortcuts Grid */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#0F291B] text-sm tracking-wide uppercase">
            Account Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            
            {/* Shortcut: My Orders */}
            <Link 
              href="/orders" 
              className="bg-[#D3E7D9] border border-[#1E532E]/30 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#0F291B]">My Orders</span>
            </Link>

            {/* Shortcut: Addresses */}
            <Link 
              href="/user-profile" 
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#0F291B]">Addresses</span>
            </Link>

            {/* Shortcut: Payments */}
            <Link 
              href="/user-profile" 
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Banknote className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#0F291B]">Payments</span>
            </Link>

            {/* Shortcut: Notifications */}
            <Link 
              href="/user-profile" 
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#0F291B]">Notifications</span>
            </Link>

            {/* Shortcut: Support */}
            <Link 
              href="/help-centre" 
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#0F291B]">Support</span>
            </Link>

          </div>
        </div>

        {/* 3. My Orders Header with Search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/user-profile" className="text-zinc-500 hover:text-[#1E532E] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F291B] font-roboto">My Orders</h2>
            </div>
            <p className="text-zinc-500 text-sm font-medium">Track your purchases, payments and deliveries in one place.</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <input 
              type="text" 
              placeholder="Search Order ID" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-[#1E532E] font-medium text-zinc-800 placeholder-zinc-400 shadow-sm"
            />
            <svg className="w-5 h-5 text-zinc-400 absolute right-3.5 top-3.5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* 4. Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Orders Card */}
          <div className="bg-white border border-[#CDE5D2] rounded-[24px] p-6 text-left shadow-sm space-y-4">
            <span className="text-zinc-500 text-sm font-bold font-roboto">Total Orders</span>
            <div className="text-4xl font-extrabold text-[#0F291B] font-roboto">
              {loading ? "..." : totalOrdersCount}
            </div>
          </div>

          {/* Pending Card */}
          <div className="bg-white border border-[#CDE5D2] rounded-[24px] p-6 text-left shadow-sm space-y-4">
            <span className="text-zinc-500 text-sm font-bold font-roboto">Pending</span>
            <div className="text-4xl font-extrabold text-[#0F291B] font-roboto">
              {loading ? "..." : pendingOrdersCount}
            </div>
          </div>

          {/* Delivered Card */}
          <div className="bg-white border border-[#CDE5D2] rounded-[24px] p-6 text-left shadow-sm space-y-4">
            <span className="text-zinc-500 text-sm font-bold font-roboto">Delivered</span>
            <div className="text-4xl font-extrabold text-[#0F291B] font-roboto">
              {loading ? "..." : deliveredOrdersCount}
            </div>
          </div>
        </div>

        {/* 5. Orders Listing */}
        <div className="space-y-5">
          {loading ? (
            <div className="flex justify-center py-16">
              <svg className="animate-spin h-10 w-10 text-[#1E532E]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-rose-500 font-semibold">{error}</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 font-medium">No matching orders found.</div>
          ) : (
            filteredOrders.map((order, idx) => {
              const pendingAmt = Number(order.pending_amount);
              const isFullPayment = pendingAmt === 0;

              return (
                <div 
                  key={order.order_id || idx} 
                  className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-0 shadow-sm"
                >
                  {/* Column 1: Order Meta */}
                  <div className="flex-1 flex flex-col justify-between text-left space-y-4">
                    <div>
                      <span className="text-xs font-bold text-zinc-400 block mb-1">ORDER ID</span>
                      <h4 className="text-xl font-bold text-[#0F291B] font-roboto">#{order.order_id}</h4>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-zinc-400 block mb-1">ORDER DATE</span>
                      <span className="text-sm font-semibold text-zinc-700">{order.date}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {isFullPayment ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-extrabold w-fit uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                          <span>Full Payment</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-xs font-extrabold w-fit uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]" />
                          <span>Book Now</span>
                        </div>
                      )}
                      
                      <div className="text-zinc-500 text-xs font-medium">
                        Preferred Payment Mode: <span className="font-bold text-zinc-700">{order.payupreferedmode || "Online"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Financial Details (with Dividers) */}
                  <div className="flex-1 flex flex-col justify-center gap-4 md:border-l md:border-r md:border-zinc-150 md:px-8 py-2">
                    {/* Total Amount Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-xs font-bold font-roboto">TOTAL AMOUNT</span>
                      <span className="text-lg font-bold text-zinc-800">₹{Number(order.total_amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-[1px] bg-zinc-100" />

                    {/* Received Amount Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-xs font-bold font-roboto">RECEIVED AMOUNT</span>
                      <span className="text-lg font-bold text-[#1E532E]">₹{Number(order.received_amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="h-[1px] bg-zinc-100" />

                    {/* Pending Amount Row */}
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-xs font-bold font-roboto">PENDING AMOUNT</span>
                      <span className={`text-lg font-extrabold ${pendingAmt > 0 ? "text-rose-600" : "text-zinc-800"}`}>
                        ₹{pendingAmt.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: CTAs */}
                  <div className="flex-1 flex flex-col justify-center items-stretch md:items-end gap-3 md:pl-8">
                    {/* Pay Now Button */}
                    <button 
                      disabled={isFullPayment || payingOrderId === order.order_id}
                      onClick={() => handlePayNow(order.order_id, Number(order.pending_amount || 0))}
                      className={`w-full md:max-w-[200px] text-white font-bold py-3.5 rounded-2xl transition-all duration-200 font-roboto text-sm flex items-center justify-center ${
                        isFullPayment 
                          ? "bg-[#8DBA9A] cursor-not-allowed opacity-80" 
                          : "bg-[#1E532E] hover:bg-[#153B21]"
                      }`}
                    >
                      {payingOrderId === order.order_id ? (
                        <span className="flex items-center gap-1.5 justify-center">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Pay Now"
                      )}
                    </button>

                    {/* View Details Outline Button */}
                    <Link 
                      href={`/orders/${order.order_id}`}
                      className="w-full md:max-w-[200px] border border-[#1E532E] hover:bg-[#1E532E]/5 text-[#1E532E] font-bold py-3.5 rounded-2xl transition-all duration-200 font-roboto text-sm flex items-center justify-center"
                    >
                      View Details
                    </Link>

                    {/* Help Link */}
                    <Link 
                      href="/help-centre" 
                      className="inline-flex items-center gap-1 text-[#1E532E] hover:text-[#153B21] transition-colors text-xs font-bold mt-1.5 md:mr-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Help</span>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
export const dynamic = 'force-dynamic';
