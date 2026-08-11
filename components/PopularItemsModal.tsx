"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PopularItemsModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingCartItemCode, setAddingCartItemCode] = useState<string | null>(null);
  const [addedItemsState, setAddedItemsState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleAddedToCart = async (e: Event) => {
      const customEvent = e as CustomEvent;
      const { category, subcategory, brand, item_name } = customEvent.detail || {};

      setAddedItemName(item_name || "Item");
      setPopularItems([]);
      setAddedItemsState({});
      setIsOpen(true);
      setLoading(true);

      try {
        const userStr = localStorage.getItem("gbru_user");
        let mobile_no = "";
        if (userStr) {
          const user = JSON.parse(userStr);
          mobile_no = user.customer_id?.split("-")[1] || user.user_id || user.mobile_no || "";
        }

        // Fetch active cart status to sync button states
        if (mobile_no) {
          try {
            const resCart = await fetch(`/api/cart?t=${Date.now()}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ mobile_no }),
              cache: "no-store"
            });
            if (resCart.ok) {
              const jsonCart = await resCart.json();
              const items = jsonCart.message?.data?.items || [];
              const initialAddedState: { [key: string]: boolean } = {};
              items.forEach((item: any) => {
                if (item.item) {
                  initialAddedState[String(item.item).trim().toLowerCase()] = true;
                }
              });
              setAddedItemsState(initialAddedState);
            }
          } catch (e) {
            
            setAddedItemsState({});
          }
        } else {
          setAddedItemsState({});
        }

        const res = await fetch(`/api/products/popular?t=${Date.now()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: category || null,
            subcategory: subcategory || null,
            brand: brand || "175",
            mobile_no: mobile_no || null,
          }),
          cache: "no-store"
        });

        const data = await res.json();
        if (data?.message?.status && data.message.data?.data) {
          setPopularItems(data.message.data.data.slice(0, 2));
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener("productAddedToCart" as any, handleAddedToCart);
    return () => window.removeEventListener("productAddedToCart" as any, handleAddedToCart);
  }, []);

  const handleAddPopularToCart = async (item: any) => {
    const userStr = localStorage.getItem("gbru_user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const mobile_no = user.customer_id?.split("-")[1] || user.user_id || user.mobile_no || "";
      if (!mobile_no) return;

      setAddingCartItemCode(item.item_code);

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_no,
          items: [
            {
              item: item.item_code,
              quantity: item.moq || 1,
              is_moq_applicable: 0,
              payment_type: "Full Payment",
              full_payment_amount: item.price || 0.0,
              full_payment_discount: item.discount_amount || 0.0,
              cod_value: 0.0,
              cod_display: 0.0,
              cod_discount: 0.0,
              COD_value: 0.0,
              COD_Display: 0.0,
              COD_discount: 0.0,
            },
          ],
        }),
      });

      const resJson = await res.json();
      if (resJson.message?.status || resJson.success) {
        setAddedItemsState((prev) => ({ ...prev, [item.item_code]: true }));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (err) {
      
    } finally {
      setAddingCartItemCode(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-[580px] p-6 lg:p-8 shadow-2xl relative flex flex-col gap-6 text-left border border-zinc-100 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100"
        >
          ✕
        </button>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center gap-3 border-b border-zinc-100 pb-5">
          <div className="w-12 h-12 rounded-full bg-[#EBF5EE] text-[#0D9740] flex items-center justify-center text-2xl">
            ✓
          </div>
          <h3 className="font-roboto font-extrabold text-[#0F291B] text-xl">
            Added to Cart Successfully!
          </h3>
          <p className="text-zinc-500 text-xs font-semibold max-w-[380px]">
            "{addedItemName}" has been successfully added to your shopping cart.
          </p>
        </div>

        {/* Popular Recommendations */}
        <div>
          <h4 className="font-bold text-[#0F291B] text-xs uppercase tracking-wider mb-4">
            Popular Add-ons Recommended for You
          </h4>

          {loading ? (
            <div className="h-32 flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-[#0D9740]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-zinc-400 text-xs font-bold">Fetching recommended items...</span>
            </div>
          ) : popularItems.length === 0 ? (
            <p className="text-zinc-400 text-xs italic py-4">No popular recommendations found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularItems.map((item) => (
                <div
                  key={item.item_code}
                  className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-3 flex flex-col justify-between hover:border-zinc-300 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-white border border-zinc-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                      {item.custom_image_1 ? (
                        <img src={item.custom_image_1} alt={item.item_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">🌱</span>
                      )}
                      {item.discount > 0 && (
                        <div className="absolute top-1 left-1 bg-[#0D9740] text-white text-[8px] font-bold px-1 rounded">
                          {Math.round(item.discount)}%
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h5 className="font-bold text-[#0F291B] text-xs truncate">{item.item_name}</h5>
                      <p className="text-[9px] text-zinc-400 uppercase tracking-wider font-extrabold mt-0.5">
                        {item.brand || "GBRU"}
                      </p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-[#0D9740] font-extrabold text-xs">
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-[9px] line-through text-zinc-400 font-semibold">
                            ₹{Number(item.mrp).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPopularToCart(item)}
                    disabled={addingCartItemCode === item.item_code || addedItemsState[String(item.item_code).trim().toLowerCase()]}
                    className={`w-full mt-3 h-8 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 ${
                      addedItemsState[String(item.item_code).trim().toLowerCase()]
                        ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                        : "bg-[#0D9740] hover:bg-[#0a7d34] text-white shadow-sm"
                    }`}
                  >
                    {addingCartItemCode === item.item_code ? (
                      <span className="animate-pulse">Adding...</span>
                    ) : addedItemsState[String(item.item_code).trim().toLowerCase()] ? (
                      "✓ Added to Cart"
                    ) : (
                      "+ Add to Cart"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="flex gap-3 pt-4 border-t border-zinc-100">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 h-12 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold text-xs rounded-xl transition-all"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/cart");
            }}
            className="flex-1 h-12 bg-[#0F291B] hover:bg-[#081810] text-white font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
