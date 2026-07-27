'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

// Removed static categories array

export default function ProductCategoriesSection() {
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');

  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

        if (!apiBase || !apiKey || !apiSecret) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.category_api.get_categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
            "X-API-SECRET": apiSecret
          },
          body: JSON.stringify({
            page: 1,
            page_size: 5,
            search: null
          })
        });

        const data = await res.json();
        if (data.message && data.message.data && data.message.data.data) {
          const mappedCats = data.message.data.data.map((c: any) => ({
            slug: c.category_id,
            title: c.category_name,
            description: "",
            image: c.custom_image_path || "/home/seeder.jpg",
          }));
          setCategories(mappedCats);
        }
      } catch (err) {
        console.error("Home Categories API error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="pt-[80px] pb-[80px] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-[48px]">
        <h2 className="font-bold text-[40px] leading-[48px] text-[#154212]">
          {tHome('browseCategories')}
        </h2>
        <Link 
          href="/products"
          className="flex items-center gap-[6px] font-medium text-[16px] text-[#006B2C] hover:underline cursor-pointer"
        >
          {tCommon('viewAllCategories')} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#00a859]/30 border-t-[#00a859]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[24px]">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white border border-[#E8ECE8] rounded-[20px] p-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-[14px] overflow-hidden mb-[16px] shrink-0 bg-slate-100">
                <Image 
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              
              {/* Content Area */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-[20px] text-[#154212] mb-1">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="font-normal text-[15px] leading-[26px] text-[#42493E]">
                    {category.description}
                  </p>
                )}
                
                {/* Spacer pushes button to bottom */}
                <div className="flex-grow"></div>
                
                {/* Bottom Button */}
                <Link 
                  href={`/products/${category.slug}`}
                  className="w-full h-[44px] mt-[16px] bg-white border border-[#DCE5DC] rounded-full flex items-center justify-center gap-[8px] font-medium text-[15px] text-[#006B2C] hover:bg-gray-50 transition-colors"
                >
                  {tCommon('viewProducts')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
