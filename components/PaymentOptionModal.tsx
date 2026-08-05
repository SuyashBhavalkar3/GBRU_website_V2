"use client";

import React, { useState } from "react";

interface PaymentOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onConfirm: (option: "full" | "booking") => void;
  mrp?: number;
  price?: number;
}

export default function PaymentOptionModal({
  isOpen,
  onClose,
  productName,
  onConfirm,
  mrp = 0,
  price = 0,
}: PaymentOptionModalProps) {
  const [selectedOption, setSelectedOption] = useState<"full" | "booking">("full");

  if (!isOpen) return null;

  const displayMrp = mrp || price || 0;
  const displayPrice = price || displayMrp || 0;

  const formatPrice = (val: any) => {
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleConfirm = () => {
    onConfirm(selectedOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-roboto">
      <div 
        className="bg-white rounded-[28px] border border-zinc-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-[#0F291B] tracking-tight">Select Payment Option</h2>
            <p className="text-zinc-500 text-xs leading-normal">
              Choose how you want to pay for <span className="font-bold text-[#0F291B]">{productName}</span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-zinc-600 text-xl font-bold p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Card 1: Full Payment */}
          <div
            onClick={() => setSelectedOption("full")}
            className={`flex-1 p-4 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
              selectedOption === "full"
                ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                selectedOption === "full" ? "border-[#0d9740]" : "border-zinc-300"
              }`}>
                {selectedOption === "full" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                )}
              </div>
              <span className="font-bold text-[#0F291B] text-sm">Full Payment</span>
            </div>
            <p className="text-[11px] text-zinc-500 mb-4 pl-6">Pay complete amount today</p>
            {displayPrice > 0 && (
              <div className="pl-6 pt-2 border-t border-zinc-100 mt-auto">
                <span className="text-[10px] text-zinc-400 font-medium">Pay Now</span>
                <div className="text-base font-extrabold text-[#0f291b]">₹{formatPrice(displayPrice)}</div>
              </div>
            )}
          </div>

          {/* Card 2: Cash On Delivery */}
          <div
            onClick={() => setSelectedOption("booking")}
            className={`flex-1 p-4 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
              selectedOption === "booking"
                ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                selectedOption === "booking" ? "border-[#0d9740]" : "border-zinc-300"
              }`}>
                {selectedOption === "booking" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                )}
              </div>
              <span className="font-bold text-[#0F291B] text-sm">Cash On Delivery</span>
            </div>
            <p className="text-[11px] text-zinc-500 mb-4 pl-6">Pay deposit now & balance on delivery</p>
            {displayPrice > 0 && (
              <div className="pl-6 pt-2 border-t border-zinc-100 mt-auto">
                <span className="text-[10px] text-zinc-400 font-medium">Pay Now (Deposit)</span>
                <div className="text-base font-extrabold text-[#0f291b]">₹{formatPrice(displayPrice * 0.1)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs shadow-md transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
