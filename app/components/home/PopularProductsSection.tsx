'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

const baseProducts: Product[] = [
  {
    id: '1',
    title: 'AgriPro Pro-Spread 500',
    description: 'High-capacity automated spreader with GPS tracking.',
    sku: 'SKU: AG-500-X',
    image: '/home/popular-product-1.jpg',
    isBestSeller: true,
  },
  {
    id: '2',
    title: 'HydroFlow Pump v3',
    description: 'Variable speed drive irrigation pump with smart connectivity.',
    sku: 'SKU: HF-300-V3',
    image: '/home/popular-product-2.jpg',
  },
  {
    id: '3',
    title: 'TerraScan Soil Monitor',
    description: 'Real-time nutrient and moisture analysis for large fields.',
    sku: 'SKU: TS-SCAN-9',
    image: '/home/popular-product-3.jpg',
  }
];

// Repeat products to create a continuous scrolling feel
const products: Product[] = [
  ...baseProducts,
  ...baseProducts.map(p => ({ ...p, id: p.id + '-copy1', isBestSeller: false })),
  ...baseProducts.map(p => ({ ...p, id: p.id + '-copy2', isBestSeller: false }))
];

export default function PopularProductsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          Popular Products
        </h2>
        {/* Navigation Arrows for Mouse Users */}
        <div className="hidden md:flex items-center gap-[12px]">
          <button 
            onClick={scrollLeft}
            className="w-[48px] h-[48px] rounded-full border border-[#E8ECE8] flex items-center justify-center text-[#154212] hover:bg-gray-50 transition-colors"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-[48px] h-[48px] rounded-full border border-[#E8ECE8] flex items-center justify-center text-[#154212] hover:bg-gray-50 transition-colors"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      {/* padding-left matches container padding to align with title */}
      <div className="w-full max-w-[1440px] mx-auto pl-4 md:pl-8 xl:pl-12">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-[24px] pb-8 pr-4 md:pr-8 xl:pr-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide Webkit Scrollbar via tailwind if plugin exists, else via custom CSS */}
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
