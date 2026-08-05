"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";

export default function OrderDetails({ orderId }: { orderId: string }) {
  const decodedOrderId = decodeURIComponent(orderId || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id;

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

  if (loading) return <div className="min-h-screen bg-[#F4F6F8] p-10 text-center">Loading order details...</div>;
  if (error) return <div className="min-h-screen bg-[#F4F6F8] p-10 text-center text-red-500">{error}</div>;
  if (!order) return <div className="min-h-screen bg-[#F4F6F8] p-10 text-center">No details found.</div>;

  const summary = order.order_summary || {};
  const shipment = order.shipment || {};
  const items = shipment.items || [];
  
  const statusDisplay = shipment.status || summary.allowed_action || "PENDING";
  const itemsCount = summary.total_items || items.length;

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-roboto flex flex-col pb-12">
      <Navbar />

      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 mt-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl py-4 px-6 border border-zinc-100 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/orders" className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors">
              <span>&larr;</span>
            </Link>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Order Detail</h1>
          </div>
          <div className="bg-emerald-50 text-[#0D9740] text-[11px] font-bold px-3 py-1.5 rounded-full border border-emerald-100/50 uppercase tracking-wider">
            {statusDisplay}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column (Order & Shipment) ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* ORDER DETAILS */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1A1A1A] text-[14px] flex items-center gap-2 tracking-wide uppercase">
                <span className="text-blue-400">📄</span> ORDER DETAILS
              </h3>
              <div className="bg-[#0F3B24] rounded-xl p-6 shadow-sm text-white flex flex-col gap-5">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-emerald-50">Order Date</span>
                  <span className="font-bold">{summary.order_date || "--"}</span>
                </div>
                <div className="h-[1px] bg-white/10 w-full"></div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-emerald-50">Order Id #</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#FFB800]">{summary.order_id}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-white/10 w-full"></div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-emerald-50">Order Amount</span>
                  <span className="font-bold">₹{summary.order_amount} ({itemsCount} items)</span>
                </div>
                <div className="h-[1px] bg-white/10 w-full"></div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-emerald-50">Discount Received</span>
                  <span className="font-bold">₹{summary.discount_received}</span>
                </div>
              </div>
            </div>

            {/* SHIPMENT ITEMS */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1A1A1A] text-[14px] flex items-center gap-2 tracking-wide uppercase">
                <span className="text-amber-700">📦</span> SHIPMENT ITEMS
              </h3>
              
              <div className="flex flex-col gap-4">
                {items.length === 0 ? (
                   <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-sm text-zinc-500">No items found.</div>
                ) : (
                  items.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-sm flex items-start gap-6">
                      <div className="w-24 h-24 relative rounded-lg border border-zinc-100 bg-zinc-50 flex-shrink-0 p-2 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.item_name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-4xl text-purple-600">⚙️</div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 gap-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[#1A1A1A] text-[15px]">{item.item_name}</h4>
                          <span className="font-extrabold text-[#1A1A1A] text-[16px]">₹{item.total}</span>
                        </div>
                        <div className="text-[13px] text-zinc-500 font-medium">
                          Qty: {item.qty} • Rate: ₹{item.rate}
                        </div>
                        <div className="mt-2 bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1.5 rounded-full border border-orange-100/50 uppercase tracking-wider w-fit">
                          {item.status || "PENDING"}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* ── Right Column (Transport, Transactions, Invoices) ── */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* TRANSPORT DETAILS */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1A1A1A] text-[14px] flex items-center gap-2 tracking-wide uppercase">
                <span className="text-orange-500">🚚</span> TRANSPORT DETAILS
              </h3>
              <div className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-zinc-500">Transport Name</span>
                  <span className="font-bold text-[#1A1A1A]">{shipment.transporter_name || "--"}</span>
                </div>
                <div className="h-[1px] bg-zinc-100 w-full"></div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-zinc-500">Status</span>
                  <span className="bg-orange-50 text-orange-600 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-orange-100">
                    {shipment.status || "PENDING"}
                  </span>
                </div>
                <div className="h-[1px] bg-zinc-100 w-full"></div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-zinc-500">Shipment Date</span>
                  <span className="font-bold text-[#1A1A1A]">{shipment.date || "--"}</span>
                </div>
              </div>
            </div>

            {/* TRANSACTIONS */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1A1A1A] text-[14px] flex items-center gap-2 tracking-wide uppercase">
                <span className="text-emerald-500 font-serif font-bold text-lg leading-none">₹</span> TRANSACTIONS
              </h3>
              {(!order.transactions || order.transactions.length === 0) ? (
                <div className="bg-white border border-zinc-200/80 rounded-xl p-8 shadow-sm flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">No transactions found</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {order.transactions.map((tx: any, idx: number) => (
                    <div key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-xs text-zinc-500 font-medium">Transaction ID</span>
                          <span className="text-sm font-bold text-[#1A1A1A] break-all">{tx.transaction_id || "--"}</span>
                        </div>
                        <div className="bg-emerald-50 text-[#0D9740] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                          {tx.status}
                        </div>
                      </div>
                      <div className="h-[1px] bg-zinc-100 w-full"></div>
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-zinc-500">Date</span>
                        <span className="font-bold text-[#1A1A1A]">{tx.date}</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-zinc-500">Mode of Payment</span>
                        <span className="font-bold text-[#1A1A1A]">{tx.mode_of_payment}</span>
                      </div>
                      <div className="flex justify-between items-center text-[14px] mt-1">
                        <span className="text-[#1A1A1A] font-medium">Amount</span>
                        <span className="font-bold text-[#1A1A1A] text-[15px]">₹{tx.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* INVOICES */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[#1A1A1A] text-[14px] flex items-center gap-2 tracking-wide uppercase">
                <span className="text-blue-400">🧾</span> INVOICES
              </h3>
              {(!order.invoices || order.invoices.length === 0) ? (
                <div className="bg-white border border-zinc-200/80 rounded-xl p-8 shadow-sm flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">No invoices created</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {order.invoices.map((inv: any, idx: number) => (
                    <div key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-xs text-zinc-500 font-medium">Invoice ID</span>
                          <span className="text-sm font-bold text-[#1A1A1A]">{inv.invoice_id || "--"}</span>
                        </div>
                        <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-100">
                          {inv.status}
                        </div>
                      </div>
                      <div className="h-[1px] bg-zinc-100 w-full"></div>
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-zinc-500">Date</span>
                        <span className="font-bold text-[#1A1A1A]">{inv.invoice_date}</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-zinc-500">Dispatch Status</span>
                        <span className="font-bold text-[#1A1A1A]">{inv.dispatch_status}</span>
                      </div>
                      <div className="flex justify-between items-center text-[14px] mt-1">
                        <span className="text-[#1A1A1A] font-medium">Amount</span>
                        <span className="font-bold text-[#1A1A1A] text-[15px]">₹{inv.amount}</span>
                      </div>
                      {inv.sales_invoice_print_url && (
                        <a 
                          href={inv.sales_invoice_print_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-3 w-full py-2.5 flex items-center justify-center gap-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-blue-50 transition-colors text-xs font-bold uppercase tracking-wider"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                          Download Invoice
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
