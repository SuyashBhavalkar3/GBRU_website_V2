import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  description: string;
  sku: string;
  image: string;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-[380px] shrink-0 bg-white rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full h-[220px]">
        <Image 
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-[20px] left-[20px] bg-[#215A2A] text-white font-bold text-[12px] px-[14px] py-[8px] rounded-full">
            BEST SELLER
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-[24px] flex flex-col flex-grow">
        <h3 className="font-bold text-[24px] text-[#154212] mb-[8px]">
          {product.title}
        </h3>
        <p className="font-normal text-[16px] leading-[28px] text-[#42493E] mb-[24px]">
          {product.description}
        </p>

        <div className="flex-grow"></div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-[15px] text-[#7A7A7A]">
            {product.sku}
          </span>
          <button className="flex items-center gap-[6px] font-medium text-[16px] text-[#006B2C] hover:underline">
            View Details
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
