"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ERPTicket {
  name: string; // Ticket ID
  complaint_type: string;
  order?: string;
  description: string;
  status: string; // Open, Resolved, etc.
  creation: string; // Created Date
}

export default function SupportHelpPage() {
  const [mobileNo, setMobileNo] = useState("");
  const [complaintTypes, setComplaintTypes] = useState<string[]>([
    "Refund",
    "Service / Support",
    "Return / Replacement",
    "Product Issue",
    "Logistics Issue",
    "Installation Issue",
    "Information Required",
    "General Inquiry",
    "Delivery Inquiry",
    "Delivered Goods Issue",
    "Dealer / Customer Issue",
    "Billing / Payment",
    "Account & Customer",
    "Order Status Inquiry"
  ]);
  const [orders, setOrders] = useState<string[]>([]);
  const [tickets, setTickets] = useState<ERPTicket[]>([]);

  // Form Fields
  const [category, setCategory] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  // Status flags
  const [isLoadingMasters, setIsLoadingMasters] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load User details and call APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gbru_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const mobile = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;
          if (mobile) {
            setMobileNo(mobile);
            fetchMasters(mobile);
            fetchTickets(mobile);
          }
        } catch (e) {
          console.error("Error reading gbru_user storage:", e);
        }
      }
    }
  }, []);

  // Fetch Complaint Masters (Types and Orders list)
  const fetchMasters = async (mobile: string) => {
    setIsLoadingMasters(true);
    try {
      const res = await fetch("/api/complaints/masters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no: mobile }),
      });
      const data = await res.json();
      
      if (data?.message?.status && data?.message?.data) {
        const types = data.message.data.complaint_types || [];
        const orderList = data.message.data.orders || [];
        if (types.length > 0) {
          setComplaintTypes(types);
          setCategory(types[0]);
        }
        setOrders(orderList);
      }
    } catch (err) {
      console.error("Error loading complaint masters:", err);
    } finally {
      setIsLoadingMasters(false);
    }
  };

  // Fetch Raised Tickets/Complaints List
  const fetchTickets = async (mobile: string) => {
    setIsLoadingTickets(true);
    try {
      const res = await fetch("/api/complaints/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_no: mobile }),
      });
      const data = await res.json();
      if (data?.message?.status && data?.message?.data) {
        const ticketList = Array.isArray(data.message.data)
          ? data.message.data
          : (Array.isArray(data.message.data.data) ? data.message.data.data : []);
        setTickets(ticketList);
      }
    } catch (err) {
      console.error("Error loading ticket list:", err);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    if (!mobileNo) {
      alert("Please login to raise a complaint.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSubmitSuccess(false);

    try {
      const formPayload = new FormData();
      formPayload.append("mobile_no", mobileNo);
      formPayload.append("complaint_type", category || complaintTypes[0]);
      if (selectedOrder) {
        formPayload.append("order", selectedOrder);
      }
      formPayload.append("subject", subject);
      formPayload.append("description", description);
      if (attachment) {
        formPayload.append("attachment_1", attachment);
      }

      const res = await fetch("/api/complaints/raise", {
        method: "POST",
        body: formPayload,
      });
      const data = await res.json();

      if (data?.message?.status) {
        setSubmitSuccess(true);
        setSubject("");
        setDescription("");
        setAttachment(null);
        // Refresh ticket list
        fetchTickets(mobileNo);
        // Reset file input
        const fileInput = document.getElementById("file-attachment") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setErrorMessage(data?.message?.message || "Failed to submit your complaint. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("resolve") || s.includes("close")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (s.includes("progress") || s.includes("pending")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How can I register my product warranty?",
      a: "You can register your warranty by raising a support ticket here with your Invoice / Serial number, or by contacting our specialists on WhatsApp with purchase details."
    },
    {
      q: "What is the standard delivery timeline for GBRU tools?",
      a: "Typically, orders are processed and delivered within 4-7 business days across PAN-India. Tracking details are sent via SMS and can also be viewed in the Shoption App."
    },
    {
      q: "Where can I request replacement parts or servicing?",
      a: "Use our 'Expert Call' button to connect directly with a parts representative, or submit a request ticket selecting 'Machine Operations / Servicing' category."
    },
    {
      q: "Can I cancel or modify my order after placement?",
      a: "Yes, you can request order modifications or cancellations within 24 hours of order placement by contacting our support team directly before dispatch."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FBF9]">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-8 lg:py-12">
        {/* Page Title & Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl lg:text-[40px] font-bold text-[#0F291B] tracking-tight leading-tight font-roboto">
            Support & Help Desk
          </h1>
          <p className="text-zinc-600 mt-3 text-sm lg:text-base font-medium">
            Have queries regarding orders, machine operations, or warranty? Raise a complaint/ticket or connect with our support agents instantly.
          </p>
        </div>

        {/* Contact Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Support */}
          <a 
            href="https://wa.me/919226514174" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between bg-white border border-[#CDE5D2] rounded-3xl p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E2F0E4] flex items-center justify-center text-[#1E532E] shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#0F291B] text-lg font-roboto">WhatsApp Support</h4>
                <p className="text-zinc-500 text-sm mt-0.5">Chat instantly with support agent</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Expert Call Support */}
          <a 
            href="tel:+918121819367" 
            className="flex items-center justify-between bg-white border border-[#CDE5D2] rounded-3xl p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#E2F0E4] flex items-center justify-center text-[#1E532E] shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#0F291B] text-lg font-roboto">Expert Call</h4>
                <p className="text-zinc-500 text-sm mt-0.5">Dial directly to speak with engineers</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-zinc-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Complaint & Support Form (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-white border border-[#CDE5D2] rounded-[32px] p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl lg:text-2xl font-bold text-[#0F291B] mb-6 font-roboto border-b border-zinc-100 pb-3">
              Raise a Support Request / Complaint
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Complaint registered successfully! Check Ticket status on the right side.</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm font-semibold">
                {errorMessage}
              </div>
            )}

            {!mobileNo ? (
              <div className="py-8 text-center bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl">
                <p className="text-zinc-600 font-medium text-sm">Please log in to submit support requests and view your ticket history.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0F291B] font-roboto">Issue Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F5F8F6] border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E532E] font-medium text-zinc-800"
                  >
                    {complaintTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Optional Order Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0F291B] font-roboto">Order Reference (Optional)</label>
                  <select 
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                    className="w-full bg-[#F5F8F6] border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E532E] font-medium text-zinc-800"
                  >
                    <option value="">-- Select Order Reference (if applicable) --</option>
                    {orders.map((ord) => (
                      <option key={ord} value={ord}>{ord}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0F291B] font-roboto">Subject</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Issue with warranty verification or delay in shipment"
                    required
                    className="w-full bg-[#F5F8F6] border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E532E] font-medium text-zinc-800 placeholder-zinc-400"
                  />
                </div>

                {/* Description Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0F291B] font-roboto">Describe your Issue / Complaint</label>
                  <textarea 
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about your complaint, order reference, or product issue..."
                    required
                    className="w-full bg-[#F5F8F6] border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E532E] font-medium text-zinc-800 placeholder-zinc-400 resize-none"
                  />
                </div>

                {/* File Attachment Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#0F291B] font-roboto">Attach Bill / Image (Optional)</label>
                  <div className="relative w-full border-2 border-dashed border-zinc-200 hover:border-[#1E532E] rounded-xl py-6 flex flex-col items-center justify-center cursor-pointer bg-[#F5F8F6]/50 transition-colors">
                    <input 
                      type="file" 
                      id="file-attachment"
                      onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <svg className="w-8 h-8 text-zinc-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-xs text-zinc-500 font-medium">
                      {attachment ? `Selected: ${attachment.name}` : "Upload invoice, product image, or PDF files"}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#1E532E] hover:bg-[#153B21] disabled:bg-zinc-400 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md font-roboto text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting Complaint...</span>
                    </>
                  ) : (
                    <span>Register Complaint</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Ticket History & FAQ (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Ticket Status History */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 shadow-sm">
              {(() => {
                const activeTickets = Array.isArray(tickets) ? tickets : [];
                return (
                  <>
                    <h2 className="text-lg lg:text-xl font-bold text-[#0F291B] mb-4 font-roboto">
                      Your Support Tickets ({activeTickets.length})
                    </h2>
                    
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                      {isLoadingTickets ? (
                        <div className="py-8 flex justify-center">
                          <svg className="animate-spin h-6 w-6 text-[#1E532E]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        </div>
                      ) : activeTickets.length === 0 ? (
                        <p className="text-zinc-500 text-sm font-medium">No complaints registered yet.</p>
                      ) : (
                        activeTickets.map((tkt) => (
                          <div key={tkt.name} className="border border-zinc-100 rounded-2xl p-4 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-zinc-500">{tkt.name}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getStatusColor(tkt.status)}`}>
                          {tkt.status || "Open"}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#0F291B] text-sm font-roboto line-clamp-1 mb-1">
                        Category: {tkt.complaint_type}
                      </h4>
                      {tkt.order && (
                        <p className="text-[#1E532E] text-xs font-bold mb-1.5">
                          Order: {tkt.order}
                        </p>
                      )}
                      <p className="text-zinc-600 text-xs font-medium mb-2 leading-relaxed whitespace-pre-wrap">{tkt.description}</p>
                      <div className="text-[10px] text-zinc-400 font-medium text-right">
                        Created on: {tkt.creation?.split(" ")[0]}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          );
        })()}
      </div>

            {/* FAQs Accordion */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 shadow-sm">
              <h2 className="text-lg lg:text-xl font-bold text-[#0F291B] mb-4 font-roboto">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-zinc-100 last:border-b-0 pb-3 last:pb-0">
                    <button 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-[#0F291B] font-roboto py-2 focus:outline-none hover:text-[#1E532E] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <svg 
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === index ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <p className="text-zinc-500 text-xs font-medium mt-1 leading-relaxed pl-1 transition-all duration-300">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
export const dynamic = 'force-dynamic';
