"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, MapPin, Banknote, Bell, Headphones, ClipboardList, CheckCircle2, XCircle, Home, Plus, Edit3, Trash2, HelpCircle, MessageSquare, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export default function UserProfile() {
  // Modal states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // User States
  const [userName, setUserName] = useState("Loading...");
  const [userFullName, setUserFullName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem("gbru_user");
        if (!stored) {
          setLoading(false);
          return;
        }

        const parsed = JSON.parse(stored);
        const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id;

        const res = await fetch('/api/user-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile_no })
        });
        const data = await res.json();

        if (data?.message?.status && data?.message?.data) {
          const ud = data.message.data;
          setUserFullName(ud.Customer_name || "");
          setUserName(ud.Customer_name ? ud.Customer_name.split(" ")[0] : "User");
          const phone = ud.customer_id?.split('-')[1] || mobile_no;
          setUserPhone(`+91 ${phone}`);

          if (ud.address) {
            setAddresses([{
              id: "1",
              name: ud.Customer_name || "User",
              phone: `+91 ${phone}`,
              address: ud.address,
              isDefault: true,
            }]);
          }
        }
      } catch (err) {
        console.error("Error fetching user details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Form states
  const [tempName, setTempName] = useState(userFullName);
  const [tempPhone, setTempPhone] = useState(userPhone);

  const [newAddressForm, setNewAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserFullName(tempName);
    const firstName = tempName.split(" ")[0] || tempName;
    setUserName(firstName);
    setUserPhone(tempPhone);
    setShowEditProfileModal(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressForm.name || !newAddressForm.phone || !newAddressForm.address) return;

    const created: Address = {
      id: String(Date.now()),
      name: newAddressForm.name,
      phone: newAddressForm.phone,
      address: newAddressForm.address,
      isDefault: false,
    };

    setAddresses([...addresses, created]);
    setShowAddAddressModal(false);
    setNewAddressForm({ name: "", phone: "", address: "" });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-roboto flex flex-col">
      <Navbar />

      <main className="max-w-[1280px] w-full mx-auto px-4 lg:px-8 py-8 flex-1 flex flex-col gap-8">

        {/* User Welcome Banner Card */}
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
                <Phone className="w-3 h-3" /> {userPhone}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setTempName(userFullName);
              setTempPhone(userPhone);
              setShowEditProfileModal(true);
            }}
            className="h-10 px-6 border border-[#0D9740]/60 hover:bg-[#0D9740]/[0.02] text-[#0D9740] font-bold text-xs rounded-[10px] shadow-sm transition-all"
          >
            Edit Profile
          </button>
        </div>

        {/* Account Shortcuts */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-[#0F291B] text-sm tracking-wide uppercase">
            Account Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Link
              href="/orders"
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><Package className="w-5 h-5" /></div>
              <span className="font-bold text-xs text-[#0F291B]">My Orders</span>
            </Link>
            <div
              onClick={() => setShowAddAddressModal(true)}
              className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><MapPin className="w-5 h-5" /></div>
              <span className="font-bold text-xs text-[#0F291B]">Addresses</span>
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><Banknote className="w-5 h-5" /></div>
              <span className="font-bold text-xs text-[#0F291B]">Payments</span>
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><Bell className="w-5 h-5" /></div>
              <span className="font-bold text-xs text-[#0F291B]">Notifications</span>
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-[16px] p-4 flex flex-col items-center gap-2.5 text-center shadow-sm hover:shadow transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><Headphones className="w-5 h-5" /></div>
              <span className="font-bold text-xs text-[#0F291B]">Support</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (Orders & Addresses) */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Order Summary */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#0F291B] text-[18px]">Order Summary</h3>
                <Link
                  href="/orders"
                  className="text-xs text-[#0D9740] font-bold hover:underline"
                >
                  VIEW ALL ORDERS
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pending */}
                <div className="border border-zinc-100 rounded-[20px] p-4 flex items-center justify-between cursor-pointer hover:border-zinc-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FCF9F3] text-[#DFB33F] flex items-center justify-center"><ClipboardList className="w-4 h-4" /></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-500 font-semibold uppercase leading-none">Pending</span>
                      <span className="font-extrabold text-[16px] text-[#0F291B] mt-1">02</span>
                    </div>
                  </div>
                  <span className="text-zinc-400">›</span>
                </div>

                {/* Delivered */}
                <div className="border border-zinc-100 rounded-[20px] p-4 flex items-center justify-between cursor-pointer hover:border-zinc-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-500 font-semibold uppercase leading-none">Delivered</span>
                      <span className="font-extrabold text-[16px] text-[#0F291B] mt-1">12</span>
                    </div>
                  </div>
                  <span className="text-zinc-400">›</span>
                </div>

                {/* Cancelled */}
                <div className="border border-zinc-100 rounded-[20px] p-4 flex items-center justify-between cursor-pointer hover:border-zinc-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><XCircle className="w-4 h-4" /></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-500 font-semibold uppercase leading-none">Cancelled</span>
                      <span className="font-extrabold text-[16px] text-[#0F291B] mt-1">01</span>
                    </div>
                  </div>
                  <span className="text-zinc-400">›</span>
                </div>
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#0F291B] text-[18px]">Saved Addresses</h3>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="text-xs text-[#0D9740] font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> ADD NEW ADDRESS
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {addresses.length === 0 ? (
                  <span className="text-xs text-zinc-500">No saved addresses found.</span>
                ) : (
                  addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#0D9740] bg-[#0D9740]/[0.01] rounded-[20px] p-5 flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] text-[#0D9740]"><Home className="w-4 h-4" /></span>
                          <span className="font-bold text-xs text-[#0F291B]">{addr.name}</span>
                        </div>
                        {addr.isDefault && (
                          <span className="bg-emerald-50 text-[#0D9740] text-[9px] font-bold py-0.5 px-2 rounded">
                            DEFAULT
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#374151] leading-relaxed">
                        {addr.address} <br />
                        <span className="text-zinc-500 font-medium block mt-1">Phone: {addr.phone}</span>
                      </p>

                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider mt-2 border-t border-zinc-100 pt-3">
                        <button className="text-zinc-500 hover:text-[#0D9740] flex items-center gap-1"><Edit3 className="w-3.5 h-3.5" /> EDIT</button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> DELETE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Payment Info & Support) */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Payment Info Card */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-5">
              <h3 className="font-bold text-[#0F291B] text-lg">Payment Info</h3>

              <div className="flex flex-col gap-3.5 text-xs text-[#374151]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Full Payment Orders</span>
                  <span className="font-bold">08</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Booking Orders</span>
                  <span className="font-bold">05</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200/80 pt-3.5 items-baseline">
                  <span className="text-zinc-500">Wallet Balance</span>
                  <span className="font-extrabold text-[#0D9740] text-lg">₹1,240.00</span>
                </div>
              </div>

              <button className="w-full h-12 bg-[#0FA84D] hover:bg-[#0b8a3d] text-white font-bold text-xs rounded-[10px] shadow-sm transition-all mt-2">
                Manage Payments
              </button>
            </div>

            {/* Help & Support */}
            <div className="bg-white border border-zinc-200/80 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-[#0F291B] text-lg">Help & Support</h3>

              <div className="flex flex-col gap-1 text-xs text-[#374151]">
                <Link
                  href="/faq"
                  className="flex items-center justify-between py-3 border-b border-zinc-100 hover:text-[#0D9740] transition-colors"
                >
                  <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-zinc-500" /> Visit FAQs</span>
                  <span className="text-zinc-400">›</span>
                </Link>
                <button className="flex items-center justify-between py-3 border-b border-zinc-100 text-left hover:text-[#0D9740] transition-colors">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-zinc-500" /> Contact Support</span>
                  <span className="text-zinc-400">›</span>
                </button>
                <button className="flex items-center justify-between py-3 bg-emerald-50/50 mt-1 px-3 rounded-lg text-left text-emerald-600 hover:text-[#0D9740] hover:bg-emerald-50 transition-colors font-bold">
                  <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> WhatsApp Support</span>
                  <span className="text-[14px]">↗</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleEditProfile}
            className="bg-white rounded-[24px] max-w-sm w-full p-6 flex flex-col gap-4 shadow-xl"
          >
            <h3 className="font-bold text-[#0F291B] text-lg">Edit Profile</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500">Full Name</label>
              <input
                type="text"
                required
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="h-11 px-3 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500">Phone Number</label>
              <input
                type="text"
                required
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="h-11 px-3 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="h-10 px-5 border border-zinc-300 rounded-[8px] text-xs font-bold text-zinc-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-5 bg-[#0D9740] hover:bg-[#0a7d34] text-white rounded-[8px] font-bold text-xs"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleAddAddress}
            className="bg-white rounded-[24px] max-w-sm w-full p-6 flex flex-col gap-4 shadow-xl"
          >
            <h3 className="font-bold text-[#0F291B] text-lg">Add New Address</h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter recipient name"
                value={newAddressForm.name}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, name: e.target.value })}
                className="h-11 px-3 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500">Phone Number</label>
              <input
                type="text"
                required
                placeholder="10-digit mobile number"
                value={newAddressForm.phone}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                className="h-11 px-3 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-zinc-500">Address details</label>
              <textarea
                required
                placeholder="House no, Village, District, State & Pincode"
                value={newAddressForm.address}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, address: e.target.value })}
                className="h-20 p-3 border border-zinc-200 rounded-[10px] text-sm text-[#0F291B] focus:outline-[#0D9740] resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => setShowAddAddressModal(false)}
                className="h-10 px-5 border border-zinc-300 rounded-[8px] text-xs font-bold text-zinc-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-5 bg-[#0D9740] hover:bg-[#0a7d34] text-white rounded-[8px] font-bold text-xs"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
