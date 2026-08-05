"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./Navbar";

export default function OrderList() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const stored = localStorage.getItem("gbru_user");
        if (!stored) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(stored);
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id;

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

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-roboto flex flex-col pb-12">
      <Navbar />

      <main className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 mt-6">
        {/* Header Section */}
        <div className="bg-white rounded-t-xl py-4 px-6 border border-zinc-100 flex items-center relative mb-4">
          <Link href="/user-profile" className="text-zinc-500 hover:text-zinc-700 font-medium absolute left-6 text-sm flex items-center gap-2">
            <span>&larr;</span> Back
          </Link>
          <h1 className="text-xl font-bold text-[#1A1A1A] mx-auto">My Orders</h1>
        </div>

        {/* Order Cards */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-10 text-zinc-500">Loading orders...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 text-zinc-500">No orders found.</div>
          ) : (
            orders.map((order: any, index: number) => (
              <div key={order.order_id || index} className="bg-white rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-zinc-100 p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-[#1A1A1A] text-[15px]">Order Id: #{order.order_id}</h3>
                    <span className="text-[13px] text-zinc-500">{order.date}</span>
                    <div className="mt-2">
                      <Link 
                        href={`/orders/${order.order_id}`}
                        className="inline-block border border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 text-[13px] font-medium px-4 py-1.5 rounded"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <button className="text-[#3B82F6] hover:underline text-[13px] font-medium underline">Help?</button>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[#1A1A1A]">
                    <span className="font-medium text-[14px]">Total Amount</span>
                    <span className="font-bold text-[15px]">₹{order.total_amount}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-100 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[14px] text-[#1A1A1A]">Received Amount</span>
                    <span className="font-bold text-[#0FA84D] text-[15px]">₹{order.received_amount}</span>
                  </div>
                  <div className="h-[1px] bg-zinc-100 w-full"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[14px] text-[#1A1A1A]">Pending Amount</span>
                    <span className="font-bold text-[#E11D48] text-[15px]">₹{order.pending_amount}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-1.5">
                  {Number(order.pending_amount) > 0 && (
                    <button className="bg-[#28A745] hover:bg-[#218838] text-white font-bold text-[13px] px-6 py-2.5 rounded w-fit mb-2 tracking-wide">
                      PAY NOW
                    </button>
                  )}
                  <span className="text-[12px] text-zinc-400 font-medium">Preferred Mode: {order.payupreferedmode}</span>
                  <span className="text-[12px] text-zinc-400 font-medium">Amount: ₹{order.payupreferedamount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
