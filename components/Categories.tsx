"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  category_id: string;
  category_name: string;
  custom_category_id: number;
  custom_image_path: string;
  product_count: number;
}

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to load categories.");
        }
        const json = await res.json();
        
        if (json.message?.status && Array.isArray(json.message?.data?.data)) {
          // Take only first 5 categories to match original layout
          setCategoriesList(json.message.data.data.slice(0, 5));
        } else {
          throw new Error("Invalid response format.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);


  return (
    <section className="w-full bg-[#EAF5EE] lg:h-[480px] py-[40px] lg:py-[30px] px-4 lg:px-[64px] flex flex-col items-center justify-between text-center">

      {/* Title */}
      <h2 className="font-roboto font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[40px] lg:leading-[56px] tracking-[-0.96px] text-[#0F291B]">
        Shop By Category
      </h2>

      {/* Categories Row */}
      <div className="max-w-[1152px] w-full flex flex-wrap lg:flex-nowrap justify-center gap-[24px] my-6 lg:my-0">
        {loading ? (
          <div className="flex items-center justify-center w-full h-[251px]">
            <div className="w-10 h-10 border-4 border-[#006B21] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center w-full h-[251px] text-red-500">
            Failed to load categories
          </div>
        ) : (
          categoriesList.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category_id=${cat.category_id}&category_name=${encodeURIComponent(cat.category_name)}`}
              className="w-[211.2px] h-[251.2px] flex flex-col items-center justify-between group"
            >
              {/* White Square Card (211.2 x 211.2px, rounded 32px) */}
              <div className="w-[211.2px] h-[211.2px] rounded-[32px] bg-white border border-[#0F291B]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center p-[20px] relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] cursor-pointer">
                {cat.custom_image_path ? (
                  <div className="relative w-full h-full">
                    <img
                      src={cat.custom_image_path}
                      alt={cat.category_name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                  </div>
                ) : (
                  // Accessories is blank
                  <div className="w-full h-full bg-white rounded-[32px]" />
                )}
              </div>

              {/* Label Text below Card */}
              <span className="font-roboto font-bold text-[13px] leading-[16px] tracking-[0.65px] text-[#0F291B] uppercase text-center w-full truncate px-2">
                {cat.category_name}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* View All Categories Button */}
      <Link href="/categories">
        <button className="bg-[#0D9740] hover:bg-[#0b8036] text-white font-roboto font-bold text-[12px] tracking-wider w-[173px] h-[32px] rounded-full pt-[8px] pr-[24px] pb-[8px] pl-[24px] flex items-center justify-center transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md">
          View All categories
        </button>
      </Link>

    </section>
  );
}


