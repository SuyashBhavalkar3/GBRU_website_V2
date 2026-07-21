'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

export default function PopularProductsSection() {
  const tHome = useTranslations('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const baseProducts: Product[] = [
    {
      id: '1',
      title: tHome('prod1Title'),
      description: tHome('prod1Desc'),
      sku: 'SKU: AG-500-X',
      image: '/home/popular-product-1.jpg',
      isBestSeller: true,
    },
    {
      id: '2',
      title: tHome('prod2Title'),
      description: tHome('prod2Desc'),
      sku: 'SKU: HF-300-V3',
      image: '/home/popular-product-2.jpg',
    },
    {
      id: '3',
      title: tHome('prod3Title'),
      description: tHome('prod3Desc'),
      sku: 'SKU: TS-SCAN-9',
      image: '/home/popular-product-3.jpg',
    }
  ];

  const products: Product[] = [
    ...baseProducts,
    ...baseProducts.map(p => ({ ...p, id: p.id + '-copy1', isBestSeller: false })),
    ...baseProducts.map(p => ({ ...p, id: p.id + '-copy2', isBestSeller: false }))
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-[80px] pb-[80px] bg-white overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex items-center justify-between mb-[40px]">
        <h2 className="font-bold text-[40px] leading-[48px] text-[#154212]">
          {tHome('popularProducts')}
        </h2>
        {/* Navigation Arrows */}
        <div className="hidden md:flex items-center gap-[12px]">
          <button 
            onClick={scrollLeft}
            className="w-[48px] h-[48px] rounded-full border border-[#E8ECE8] flex items-center justify-center text-[#154212] hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-[48px] h-[48px] rounded-full border border-[#E8ECE8] flex items-center justify-center text-[#154212] hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full max-w-[1440px] mx-auto pl-4 md:pl-8 xl:pl-12">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-[24px] pb-8 pr-4 md:pr-8 xl:pr-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .flex::-webkit-scrollbar {
              display: none;
            }
          `}} />
          
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
