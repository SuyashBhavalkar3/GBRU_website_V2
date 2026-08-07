"use client";

import React, { useEffect, useState } from "react";
import LoginPrompt from "./LoginPrompt";

interface PaymentOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCode: string;
  onConfirm?: () => void;
}

export default function PaymentOptionModal({
  isOpen,
  onClose,
  itemCode,
  onConfirm,
}: PaymentOptionModalProps) {
  const [selectedOption, setSelectedOption] = useState<"full" | "booking">("full");
  const [productDetails, setProductDetails] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (!isOpen || !itemCode) return;

    const loadItemDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item_code: itemCode }),
        });
        const data = await res.json();
        if (data?.message?.status && data.message.data) {
          setProductDetails(data.message.data);
          setQuantity(data.message.data.moq || 1);
          const codVal = data.message.data.COD_value || data.message.data.cod_value || 0;
          if (codVal <= 0) {
            setSelectedOption("full");
          }
        }
      } catch (err) {
        console.error("Error fetching product details for modal:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItemDetails();
  }, [isOpen, itemCode]);

  if (!isOpen) return null;

  const formatPrice = (val: any) => {
    const num = parseFloat(val);
    return isNaN(num) ? "0.00" : num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleAddToCart = async () => {
    try {
      const stored = localStorage.getItem("gbru_user");
      if (!stored) {
        const pendingItem = {
          item: itemCode,
          item_name: productDetails?.item_name,
          quantity: quantity,
          is_moq_applicable: 0,
          payment_type: selectedOption === "full" ? "Full Payment" : "Cash On Delivery",
          full_payment_amount: productDetails?.full_payment_amount || 0.0,
          full_payment_discount: productDetails?.full_payment_discount || 0.0,
          cod_value: productDetails?.COD_value || 0.0,
          cod_display: productDetails?.COD_Display || 0.0,
          cod_discount: productDetails?.COD_discount || 0.0,
        };
        localStorage.setItem("gbru_pending_cart_item", JSON.stringify(pendingItem));
        setShowLoginPrompt(true);
        return;
      }

      const parsed = JSON.parse(stored);
      const mobile_no = parsed.customer_id?.split('-')[1] || parsed.user_id || parsed.mobile_no;

      if (!mobile_no) {
        const pendingItem = {
          item: itemCode,
          item_name: productDetails?.item_name,
          quantity: quantity,
          is_moq_applicable: 0,
          payment_type: selectedOption === "full" ? "Full Payment" : "Cash On Delivery",
          full_payment_amount: productDetails?.full_payment_amount || 0.0,
          full_payment_discount: productDetails?.full_payment_discount || 0.0,
          cod_value: productDetails?.COD_value || 0.0,
          cod_display: productDetails?.COD_Display || 0.0,
          cod_discount: productDetails?.COD_discount || 0.0,
        };
        localStorage.setItem("gbru_pending_cart_item", JSON.stringify(pendingItem));
        setShowLoginPrompt(true);
        return;
      }

      setSubmitting(true);

      const payload = {
        mobile_no,
        items: [
          {
            item: itemCode,
            quantity: quantity,
            is_moq_applicable: 0,
            payment_type: selectedOption === "full" ? "Full Payment" : "Cash On Delivery",
            full_payment_amount: productDetails?.full_payment_amount || 0.0,
            full_payment_discount: productDetails?.full_payment_discount || 0.0,
            cod_value: productDetails?.COD_value || 0.0,
            cod_display: productDetails?.COD_Display || 0.0,
            cod_discount: productDetails?.COD_discount || 0.0,
          }
        ]
      };

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();

      if (resJson.message?.status) {
        // Dispatch event to update navbar cart count
        window.dispatchEvent(new Event("cartUpdate"));
        alert(`${productDetails?.item_name || "Product"} added to cart successfully!`);
        if (onConfirm) onConfirm();
        onClose();
      } else {
        alert(resJson.message?.message || "Failed to add product to cart.");
      }
    } catch (err: any) {
      console.error("Error adding item to cart:", err);
      alert("Failed to add product to cart.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-roboto">
      <div 
        className="bg-white rounded-[28px] border border-zinc-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1 text-left">
            <h2 className="text-xl font-bold text-[#0F291B] tracking-tight">Select Payment Option</h2>
            <p className="text-zinc-500 text-xs leading-normal">
              Choose how you want to pay for <span className="font-bold text-[#0F291B]">{productDetails?.item_name || "selected product"}</span>
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-zinc-600 text-xl font-bold p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col justify-center items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-[#0D9740]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-zinc-500 text-[11px] font-semibold">Retrieving product price data...</span>
          </div>
        ) : (
          <>
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
                <div className="flex items-center gap-2 mb-2 text-left">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    selectedOption === "full" ? "border-[#0d9740]" : "border-zinc-300"
                  }`}>
                    {selectedOption === "full" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                    )}
                  </div>
                  <span className="font-bold text-[#0F291B] text-sm">Full Payment</span>
                </div>
                <p className="text-[11px] text-zinc-500 mb-4 pl-6 text-left">Pay complete amount today</p>
                <div className="pl-6 pt-2 border-t border-zinc-100 mt-auto text-left flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-500">
                    <span>M.R.P.</span>
                    <span className="line-through">₹{formatPrice((productDetails?.mrp || 0) * quantity)}</span>
                  </div>
                  {(productDetails?.discount || 0) > 0 && (
                    <div className="flex justify-between items-center text-[11px] text-[#0d9740] font-medium">
                      <span>Discount</span>
                      <span>{Number(productDetails?.discount).toFixed(0)}% OFF</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[11px] text-zinc-500">
                    <span>Sales Price</span>
                    <span>₹{formatPrice((productDetails?.actual_rate || productDetails?.price || 0) * quantity)}</span>
                  </div>
                  {(productDetails?.full_payment_discount || 0) > 0 && (
                    <div className="flex justify-between items-center text-[11px] text-[#0d9740] font-medium">
                      <span>Full Pay Discount</span>
                      <span>-₹{formatPrice((productDetails?.full_payment_discount || 0) * quantity)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-100 mt-1">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Pay Now</span>
                    <span className="text-base font-extrabold text-[#0f291b]">
                      ₹{formatPrice((productDetails?.full_payment_amount || productDetails?.price || 0) * quantity)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Cash On Delivery */}
              {productDetails && (productDetails.COD_value || productDetails.cod_value || 0) > 0 && (
                <div
                  onClick={() => setSelectedOption("booking")}
                  className={`flex-1 p-4 rounded-[20px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedOption === "booking"
                      ? "border-[#0d9740] bg-[#0d9740]/[0.02]"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-left">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      selectedOption === "booking" ? "border-[#0d9740]" : "border-zinc-300"
                    }`}>
                      {selectedOption === "booking" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0d9740]" />
                      )}
                    </div>
                    <span className="font-bold text-[#0F291B] text-sm">Cash On Delivery</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-4 pl-6 text-left">Pay deposit now & balance on delivery</p>
                  <div className="pl-6 pt-2 border-t border-zinc-100 mt-auto text-left flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[11px] text-zinc-500">
                      <span>M.R.P.</span>
                      <span className="line-through">₹{formatPrice((productDetails?.mrp || 0) * quantity)}</span>
                    </div>
                    {(productDetails?.discount || 0) > 0 && (
                      <div className="flex justify-between items-center text-[11px] text-[#0d9740] font-medium">
                        <span>Discount</span>
                        <span>{Number(productDetails?.discount).toFixed(0)}% OFF</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[11px] text-zinc-500">
                      <span>Sales Price</span>
                      <span>₹{formatPrice((productDetails?.actual_rate || productDetails?.price || 0) * quantity)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-zinc-500">
                      <span>Balance on Delivery</span>
                      <span>₹{formatPrice((productDetails?.COD_value || productDetails?.cod_value || 0) * quantity)}</span>
                    </div>
                    {(productDetails?.COD_discount || productDetails?.cod_discount || 0) > 0 && (
                      <div className="flex justify-between items-center text-[11px] text-[#0d9740] font-medium">
                        <span>COD Discount</span>
                        <span>-₹{formatPrice((productDetails?.COD_discount || productDetails?.cod_discount || 0) * quantity)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-100 mt-1">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Pay Deposit</span>
                      <span className="text-base font-extrabold text-[#0f291b]">
                        ₹{formatPrice((productDetails?.COD_Display || productDetails?.cod_display || 0) * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 px-1">
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-sm font-bold text-[#0F291B]">Quantity</span>
                {productDetails?.moq > 1 && (
                  <span className="text-[10px] text-zinc-500 font-medium">
                    Minimum Order: {productDetails.moq} {productDetails.measurement_unit || "Nos"}
                  </span>
                )}
              </div>
              <div className="flex items-center bg-[#F4F6F4] rounded-[9999px] px-4 py-2 gap-5 shadow-sm">
                <button
                  onClick={() => setQuantity(prev => Math.max(productDetails?.moq || 1, prev - 1))}
                  className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[18px] px-2 transition-colors"
                >
                  −
                </button>
                <span className="font-extrabold text-sm text-[#0F291B] min-w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-zinc-500 hover:text-[#0F291B] font-extrabold text-[18px] px-2 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                disabled={submitting}
                className="px-5 py-2.5 rounded-full border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-[#0D9740] hover:bg-[#0a7d34] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </div>
  );
}
