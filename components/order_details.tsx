"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  FileText, 
  Tag, 
  Banknote, 
  Copy, 
  Check,
  Truck, 
  Info, 
  CreditCard, 
  Headphones, 
  Printer, 
  ArrowLeft,
  Download,
  X
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function OrderDetails({ orderId }: { orderId: string }) {
  const decodedOrderId = decodeURIComponent(orderId || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Cancel order state
  const [showCancelToast, setShowCancelToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cancelling, setCancelling] = useState(false);

  // Tracking state
  const [activeTrackingSticker, setActiveTrackingSticker] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!decodedOrderId) return;
      try {
        const stored = localStorage.getItem("gbru_user");
        if (!stored) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(stored);
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;

        const res = await fetch('/api/orders/details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile_no, order_id: decodedOrderId })
        });
        const data = await res.json();
        
        if (data?.message?.status && data?.message?.data) {
          setOrder(data.message.data);
        } else {
          setError("Failed to fetch order details");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [decodedOrderId]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }
    setCancelling(true);
    try {
      const stored = localStorage.getItem("gbru_user");
      if (!stored) {
        alert("User not logged in");
        setCancelling(false);
        return;
      }
      const parsed = JSON.parse(stored);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;

      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_no,
          order_id: decodedOrderId
        })
      });
      const data = await res.json();
      if (data?.message?.status) {
        setToastMessage(data.message.message || "Sales order cancelled successfully.");
        setShowCancelToast(true);
        // Refresh details after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        alert(data?.message?.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while cancelling the order.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center py-20">
          <svg className="animate-spin h-10 w-10 text-[#1E532E]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center py-20 text-rose-500 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center py-20 text-zinc-500 font-medium">
          No details found.
        </div>
      </div>
    );
  }

  const summary = order.order_summary || {};
  const shipment = order.shipment || {};
  const items = shipment.items || [];
  const statusDisplay = shipment.status || summary.allowed_action || "Pending Payment";
  const hasTransactions = order.transactions && order.transactions.length > 0;
  const hasInvoices = order.invoices && order.invoices.length > 0;

  // Extract LR and stickers
  const deliverySlips = shipment.delivery_slips || [];
  const dispatchDetails = order.dispatch_details || [];
  const allDispatches = [...deliverySlips, ...dispatchDetails];

  const isIndianPost = (nameOrId: string) => {
    const term = String(nameOrId || "").toLowerCase();
    return term.includes("indian post") || term.includes("india post");
  };

  const extractedLrs: any[] = [];
  const extractedStickers: string[] = [];

  // Parse from dispatches
  allDispatches.forEach((d: any) => {
    if (d.lr_no || d.lr_attachment || d.lr_photo || d.lr_url) {
      extractedLrs.push({
        lr_no: d.lr_no || d.lr_number || "LR",
        lr_attachment: d.lr_attachment || d.lr_photo || d.lr_url
      });
    }
    const isTransporterIndianPost = isIndianPost(d.transporter_name) || isIndianPost(d.transporter) || isIndianPost(shipment.transporter_name);
    if (isTransporterIndianPost) {
      const stCode = d.sticker_no || d.sticker || d.tracking_id || d.tracking_no || d.barcode;
      if (stCode) {
        extractedStickers.push(stCode);
      }
    }
  });

  // Parse from invoices
  const invoicesList = order.invoices || [];
  invoicesList.forEach((inv: any) => {
    // 1. lr_and_stickers (explicitly checks if item.type is sticker)
    const lrAndStickersList = inv.lr_and_stickers || [];
    lrAndStickersList.forEach((item: any) => {
      if (item.type?.toLowerCase() === "lr") {
        extractedLrs.push({
          lr_no: item.entry_id || item.lr_number || "LR",
          lr_attachment: item.document_url || item.print_url || item.lr_copy
        });
      } else if (item.type?.toLowerCase() === "sticker") {
        if (item.tracking_id) {
          extractedStickers.push(item.tracking_id);
        }
      }
    });

    // 2. transporter_details
    const transportDetails = inv.transporter_details || [];
    transportDetails.forEach((item: any) => {
      if (item.lr_number) {
        extractedLrs.push({
          lr_no: item.lr_number,
          lr_attachment: item.lr_copy || item.document_url
        });
      }
      if (isIndianPost(item.transporter_name) || isIndianPost(item.transporter)) {
        if (item.tracking_id) {
          extractedStickers.push(item.tracking_id);
        }
      }
    });

    // 3. selected_transport_entries
    const selectedEntries = inv.selected_transport_entries || [];
    selectedEntries.forEach((item: any) => {
      if (item.lr_number) {
        extractedLrs.push({
          lr_no: item.lr_number,
          lr_attachment: item.lr_copy || item.document_url
        });
      }
      if (isIndianPost(item.transporter_name) || isIndianPost(item.transporter)) {
        if (item.tracking_id) {
          extractedStickers.push(item.tracking_id);
        }
      }
    });
  });

  // Filter duplicates
  const finalLrs = extractedLrs.filter((v, i, a) => a.findIndex(t => t.lr_no === v.lr_no) === i);
  const finalStickers = Array.from(new Set(extractedStickers));

  const handleCopy = () => {
    if (summary.order_id) {
      navigator.clipboard.writeText(summary.order_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("resolve") || s.includes("close") || s.includes("complete") || s.includes("delivered")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (s.includes("progress") || s.includes("pending") || s.includes("process")) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const showActionMsg = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 4000);
  };

  const handlePrintLR = () => {
    if (finalLrs.length > 0) {
      const url = finalLrs[0].lr_attachment || finalLrs[0].lr_photo || finalLrs[0].lr_url;
      if (url) {
        window.location.href = url;
      } else {
        showActionMsg("LR Attachment URL not found.");
      }
    } else {
      showActionMsg("Order not yet dispatched");
    }
  };

  const handleTrackOrder = () => {
    if (finalStickers.length > 0) {
      handleTrackSticker(finalStickers[0]);
    } else {
      showActionMsg("Order not yet dispatched");
    }
  };

  const handleTrackSticker = async (stickerCode: string) => {
    setActiveTrackingSticker(stickerCode);
    setTrackingLoading(true);
    setTrackingError("");
    setTrackingData(null);
    try {
      const res = await fetch("/api/tracking/indian-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_id: stickerCode })
      });
      const resData = await res.json();
      if (resData.success && resData.data && resData.data[0]) {
        setTrackingData(resData.data[0]);
      } else {
        setTrackingError(resData.message || "Failed to retrieve tracking data from Indian Post.");
      }
    } catch (err) {
      console.error(err);
      setTrackingError("Failed to fetch tracking details. Please try again.");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FBF9] font-roboto flex flex-col relative">
      <Navbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Header Navigation Section */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/orders" className="text-zinc-500 hover:text-[#1E532E] transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="text-left space-y-0.5">
              <h2 className="text-2xl font-bold text-[#0F291B] font-roboto">Order Details</h2>
              <p className="text-zinc-500 text-xs font-semibold">Order ID: {summary.order_id}</p>
            </div>
          </div>
          
          <div className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${getStatusColor(statusDisplay)}`}>
            ● {statusDisplay}
          </div>
        </div>

        {/* Main Content 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Column (8 cols): Order info, Items, Transport */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Card 1: Order Summary */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 lg:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0F291B] font-roboto border-b border-zinc-100 pb-2.5 text-left">
                Order Summary
              </h3>

              <div className="space-y-4">
                {/* Row 1: Order Date */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-zinc-500 font-semibold text-sm">
                    <Calendar className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span>Order Date</span>
                  </div>
                  <span className="font-bold text-[#0F291B] text-sm">{summary.order_date || "--"}</span>
                </div>
                <div className="h-[1px] bg-zinc-100" />

                {/* Row 2: Order ID */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-zinc-500 font-semibold text-sm">
                    <FileText className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span>Order ID</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0F291B] text-sm">{summary.order_id}</span>
                    <button 
                      onClick={handleCopy} 
                      className="text-emerald-700 hover:text-emerald-800 transition-colors p-1"
                      title="Copy Order ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="h-[1px] bg-zinc-100" />

                {/* Row 3: Discount */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3 text-zinc-500 font-semibold text-sm">
                    <Tag className="w-5 h-5 text-zinc-400 shrink-0" />
                    <span>Discount</span>
                  </div>
                  <span className="font-bold text-rose-600 text-sm">
                    - ₹{Number(summary.discount_received || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                
                {/* Row 4: Order Amount Highlighted Box */}
                <div className="bg-[#F5F8F6] border border-[#E0EFE6] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#1E532E] font-bold text-sm">
                    <Banknote className="w-5 h-5 shrink-0" />
                    <span>Order Amount</span>
                  </div>
                  <span className="text-xl font-extrabold text-[#1E532E]">
                    ₹{Number(summary.order_amount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {actionMessage && (
                <div className="text-rose-600 text-xs font-semibold text-left bg-rose-50 border border-rose-100/50 rounded-xl px-4 py-2.5 animate-pulse">
                  ⚠️ {actionMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleTrackOrder}
                  className={`font-bold py-3 px-6 rounded-2xl text-xs font-roboto transition-all shadow-sm ${
                    finalStickers.length > 0
                      ? "bg-[#1A56DB] hover:bg-[#1E40AF] text-white cursor-pointer"
                      : "bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  Track Order
                </button>
                <button 
                  onClick={handlePrintLR}
                  className={`font-bold py-3 px-6 rounded-2xl text-xs font-roboto transition-all flex items-center gap-1.5 ${
                    finalLrs.length > 0 
                      ? "border border-zinc-200 hover:bg-zinc-50 text-zinc-600 cursor-pointer" 
                      : "border border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed"
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Print LR</span>
                </button>
              </div>
            </div>

            {/* Card 2: Shipment Details */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 lg:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0F291B] font-roboto border-b border-zinc-100 pb-2.5 text-left">
                Shipment 1 of 1
              </h3>

              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-6 text-zinc-500 font-medium">No items in this shipment.</div>
                ) : (
                  items.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 last:border-b-0 pb-4 last:pb-0 text-left">
                      <div className="space-y-1.5">
                        <h4 className="text-md font-bold text-[#0F291B] font-roboto">{item.item_name}</h4>
                        <div className="text-xs text-zinc-500 font-medium">
                          Qty: {item.qty} • Rate: ₹{Number(item.rate).toLocaleString('en-IN')}
                        </div>
                        <div className={`inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border border-amber-200/50`}>
                          ● {item.status || "Pending Payment"}
                        </div>
                      </div>
                      
                      <div className="text-right self-end md:self-center shrink-0">
                        <span className="text-lg font-extrabold text-[#0F291B]">
                          ₹{Number(item.total).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Stickers / Barcodes List (For Indian Post Tracking) */}
            {finalStickers.length > 0 && (
              <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 lg:p-8 shadow-sm space-y-4 text-left">
                <h3 className="text-lg font-bold text-[#0F291B] font-roboto border-b border-zinc-100 pb-2.5">
                  Indian Post Stickers
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Select a sticker/article number to track your shipment in real-time.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {finalStickers.map((stickerCode: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleTrackSticker(stickerCode)}
                      className="bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-100 rounded-xl px-4 py-2.5 text-xs font-bold font-roboto transition-all flex items-center gap-2"
                    >
                      <span className="text-base">📦</span>
                      <span>{stickerCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card 3: Transport Details */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 lg:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0F291B] font-roboto border-b border-zinc-100 pb-2.5 text-left">
                Transport Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {/* Transporter Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase font-roboto">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Transport Name</span>
                  </div>
                  <p className="font-bold text-[#0F291B] text-sm">
                    {shipment.transporter_name || "Not Assigned"}
                  </p>
                </div>

                {/* Shipment Date */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase font-roboto">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Shipment Date</span>
                  </div>
                  <p className="font-bold text-[#0F291B] text-sm">
                    {shipment.date || summary.order_date || "--"}
                  </p>
                </div>

                {/* Transport Status */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase font-roboto">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Status</span>
                  </div>
                  <p className="font-extrabold text-amber-600 text-sm">
                    {shipment.status || "Pending Payment"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Transactions, Invoice, Support assistance */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card A: Transactions */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
              {hasTransactions ? (
                <div className="w-full space-y-4 text-left">
                  <h4 className="font-bold text-[#0F291B] text-sm tracking-wide uppercase border-b pb-2">Transactions</h4>
                  {order.transactions.map((tx: any, idx: number) => (
                    <div key={idx} className="bg-zinc-50/50 rounded-xl p-3 border border-zinc-100 space-y-2 text-xs">
                      <div className="flex justify-between font-bold text-zinc-700">
                        <span>TXN ID:</span>
                        <span className="break-all">{tx.transaction_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Method:</span>
                        <span className="font-semibold">{tx.mode_of_payment}</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#1E532E]">
                        <span>Amount:</span>
                        <span>₹{Number(tx.amount).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-100">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#0F291B] text-sm font-roboto">No Transactions Found</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px] mx-auto font-medium">
                      Transactions will appear here after payment is completed.
                    </p>
                  </div>
                  <button className="bg-[#1E532E] hover:bg-[#153B21] text-white font-bold py-3.5 px-6 rounded-2xl text-xs font-roboto transition-colors shadow-md w-full">
                    Pay Now
                  </button>
                </>
              )}
            </div>

            {/* Card B: Invoice */}
            <div className="bg-white border border-[#CDE5D2] rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center min-h-[160px] text-center space-y-3">
              {hasInvoices ? (
                <div className="w-full space-y-3 text-left">
                  <h4 className="font-bold text-[#0F291B] text-sm tracking-wide uppercase border-b pb-2">Invoices</h4>
                  {order.invoices.map((inv: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between bg-zinc-50/50 rounded-xl p-3 border border-zinc-100">
                      <div className="text-xs">
                        <p className="font-bold text-zinc-700">{inv.invoice_id}</p>
                        <p className="text-zinc-400 text-[10px] mt-0.5">{inv.invoice_date}</p>
                      </div>
                      {inv.sales_invoice_print_url && (
                        <a 
                          href={inv.sales_invoice_print_url} 
                          className="text-[#1E532E] hover:text-[#153B21] p-1.5 bg-emerald-50 rounded-lg"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px] mx-auto font-medium">
                    Invoice will be generated after payment confirmation.
                  </p>
                </>
              )}
            </div>

            {/* Card C: Support Assistance */}
            <div className="bg-[#EEF2FC] border border-[#D5E1F9] rounded-[32px] p-6 shadow-sm text-left space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E6091] shrink-0 border border-blue-100">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#0F291B] text-sm font-roboto">Need Help with Order?</h4>
                  <p className="text-zinc-500 text-[10px] font-medium leading-relaxed">Available 24/7 for trade assistance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a 
                  href="https://wa.me/919226514174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-zinc-200 hover:bg-zinc-50 text-[#0F291B] font-bold py-2.5 rounded-xl text-xs font-roboto transition-all shadow-sm flex items-center justify-center"
                >
                  Contact Support
                </a>
                
                <Link 
                  href={`/support-help?order_id=${summary.order_id}`}
                  className="bg-white border border-zinc-200 hover:bg-zinc-50 text-[#0F291B] font-bold py-2.5 rounded-xl text-xs font-roboto transition-all shadow-sm flex items-center justify-center text-center"
                >
                  Raise complain
                </Link>
              </div>

              {String(summary.allowed_action || "").toLowerCase() === "cancel" && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs font-roboto transition-all shadow-sm flex items-center justify-center gap-1.5 duration-300 mt-2 active:scale-[0.98] disabled:opacity-50"
                >
                  {cancelling ? (
                    <span className="flex items-center gap-1.5 justify-center">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Cancelling...
                    </span>
                  ) : (
                    "Cancel Order"
                  )}
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Indian Post Tracking Overlay Modal */}
      {activeTrackingSticker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] border border-zinc-100 shadow-2xl max-w-[600px] w-full max-h-[85vh] flex flex-col overflow-hidden text-left animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F291B] font-roboto">Indian Post Tracking</h3>
                <p className="text-xs text-zinc-500 font-semibold mt-0.5">Article Number: {activeTrackingSticker}</p>
              </div>
              <button 
                onClick={() => setActiveTrackingSticker(null)}
                className="w-8 h-8 rounded-full bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {trackingLoading && (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <svg className="animate-spin h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Fetching tracking details...</p>
                </div>
              )}

              {trackingError && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-xs font-semibold text-center">
                  {trackingError}
                </div>
              )}

              {trackingData && (
                <div className="space-y-6">
                  {/* Booking Details Overview */}
                  <div className="bg-[#F5F8F6] border border-[#E0EFE6] rounded-2xl p-4 grid grid-cols-2 gap-4 text-xs font-medium text-[#0F291B]">
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Booked At</span>
                      <span className="font-bold">{trackingData.booking_details?.booked_at || "--"}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Booked On</span>
                      <span className="font-bold">
                        {trackingData.booking_details?.booked_on ? new Date(trackingData.booking_details.booked_on).toLocaleDateString() : "--"}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Delivery Location</span>
                      <span className="font-bold">{trackingData.booking_details?.delivery_location || "--"}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Delivery Status</span>
                      <span className="font-extrabold uppercase text-[#1E532E]">{trackingData.del_status?.del_status || "In Transit"}</span>
                    </div>
                  </div>

                  {/* Timeline History */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-[#0F291B] text-sm uppercase tracking-wide border-b pb-2">Tracking History</h4>
                    
                    {(!trackingData.tracking_details || trackingData.tracking_details.length === 0) ? (
                      <p className="text-xs text-zinc-500 text-center font-medium py-4">No tracking history entries found.</p>
                    ) : (
                      <div className="relative pl-6 border-l-2 border-emerald-100 ml-3 space-y-5 py-2">
                        {trackingData.tracking_details.map((step: any, sIdx: number) => (
                          <div key={sIdx} className="relative text-xs">
                            {/* Circle Dot on timeline */}
                            <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white ${
                              sIdx === 0 ? "border-[#1E532E]" : "border-emerald-200"
                            } flex items-center justify-center`}>
                              {sIdx === 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#1E532E]" />}
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-0.5 text-left">
                              <div className="flex items-center justify-between">
                                <span className={`font-bold ${sIdx === 0 ? "text-[#1E532E] text-[13px]" : "text-[#0F291B]"}`}>
                                  {step.event}
                                </span>
                                <span className="text-[10px] text-zinc-400 font-semibold shrink-0">
                                  {step.date ? new Date(step.date).toLocaleDateString() : "--"} {step.time || ""}
                                </span>
                              </div>
                              <p className="text-zinc-500 text-[11px] font-semibold">{step.office || "--"}</p>
                              {step.remarks && <p className="text-zinc-400 text-[10px] italic">Remarks: {step.remarks}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification with Progress Bar */}
      {showCancelToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-[#0F291B] text-white py-4 px-6 rounded-2xl shadow-xl flex flex-col gap-2 relative overflow-hidden min-w-[320px]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-lg">✓</span>
              <span className="text-xs font-bold font-roboto">{toastMessage}</span>
            </div>
            {/* Decreasing Line / Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-[#0D9740] w-full" style={{
              animation: 'shrinkWidth 3s linear forwards'
            }} />
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />

      <Footer />
    </div>
  );
}
export const dynamic = 'force-dynamic';
