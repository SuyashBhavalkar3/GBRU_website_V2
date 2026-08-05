"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import LoginPrompt from './LoginPrompt';

const products = [
  { id: 1, title: 'Smart Guard 4G Solar Power', brand: 'GBRU PRO', price: '₹14,999', rating: '4.8', discount: '25% OFF', image: '/assets/sprayer.png' },
  { id: 2, title: 'FlowMaster 500 Pump', brand: 'GBRU INDUSTRIAL', price: '₹84,500', rating: '5.0', discount: null, image: '/assets/farmer.png' },
  { id: 3, title: 'FlowMaster 500 Pump', brand: 'GBRU INDUSTRIAL', price: '₹84,500', rating: '5.0', discount: null, image: '/assets/farmer.png' },
  { id: 4, title: 'FlowMaster 500 Pump', brand: 'GBRU INDUSTRIAL', price: '₹84,500', rating: '5.0', discount: null, image: '/assets/farmer.png' },
  { id: 5, title: 'FlowMaster 500 Pump', brand: 'GBRU INDUSTRIAL', price: '₹84,500', rating: '5.0', discount: null, image: '/assets/farmer.png' },
  { id: 6, title: 'Smart Guard 4G Solar Power', brand: 'GBRU PRO', price: '₹14,999', rating: '4.8', discount: '25% OFF', image: '/assets/sprayer.png' },
  { id: 7, title: 'Smart Guard 4G Solar Power', brand: 'GBRU PRO', price: '₹14,999', rating: '4.8', discount: '25% OFF', image: '/assets/sprayer.png' },
  { id: 8, title: 'Smart Guard 4G Solar Power', brand: 'GBRU PRO', price: '₹14,999', rating: '4.8', discount: '25% OFF', image: '/assets/sprayer.png' }
];

const AllProducts = () => {
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = () => {
    const user = localStorage.getItem("gbru_user");
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      alert("Added to cart!");
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium mb-6">
          <Link href="/" className="text-[#4A4A4A] hover:text-[#006B21]">Home</Link>
          <span className="text-[#4A4A4A]">&gt;</span>
          <span className="text-[#006B21]">All Products</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 tracking-tight">
            All Agricultural Solutions
          </h1>
          <p className="text-[#4A4A4A] max-w-3xl leading-relaxed text-sm md:text-base">
            Explore our curated collection of industrial-grade machinery, smart irrigation systems,
            and professional farming tools designed for the modern agri-enterprise.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Categories */}
            <div className="relative">
              <select defaultValue="" className="appearance-none bg-[#F3F6FA] text-[#1A1A1A] px-4 py-2.5 pr-10 rounded-full outline-none text-sm font-medium cursor-pointer border border-gray-200 hover:border-gray-300">
                <option value="" disabled>Categories</option>
                <option value="pumps">Pumps</option>
                <option value="solar">Solar Systems</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Price Range */}
            <div className="relative">
              <select defaultValue="" className="appearance-none bg-[#F3F6FA] text-[#1A1A1A] px-4 py-2.5 pr-10 rounded-full outline-none text-sm font-medium cursor-pointer border border-gray-200 hover:border-gray-300">
                <option value="" disabled>Price Range</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-50000">₹10,000 - ₹50,000</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search equipment..." 
              className="w-full bg-[#F3F6FA] text-[#1A1A1A] pl-10 pr-4 py-2.5 rounded-full outline-none text-sm border border-gray-200 focus:border-[#006B21]"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
            <span className="text-sm font-semibold text-[#1A1A1A]">
              120 <span className="text-gray-500 font-normal">items</span>
            </span>
            <div className="relative">
              <select defaultValue="featured" className="appearance-none bg-transparent text-[#1A1A1A] font-semibold text-sm pr-6 outline-none cursor-pointer">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 p-4 flex items-center justify-center">
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-[#FFF9E5] text-[#B8860B] text-[10px] font-bold px-2 py-1 rounded">
                    {product.discount}
                  </div>
                )}
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  fill
                  className="object-contain p-4"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#006B21] text-xs font-bold tracking-wide">{product.brand}</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#FFC700]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-[#1A1A1A] font-bold mb-3 line-clamp-2 leading-snug">
                  {product.title}
                </h3>
                
                <div className="mt-auto">
                  <div className="text-xl font-bold text-[#1A1A1A] mb-4">
                    {product.price}
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-[#006B21] text-white font-bold py-2.5 rounded-lg hover:bg-[#005a1b] transition-colors text-[13px] shadow-sm"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded bg-[#006B21] text-white font-semibold">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-[#1A1A1A] font-semibold hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-4 h-10 flex items-center justify-center rounded border border-gray-300 text-[#1A1A1A] font-semibold hover:bg-gray-50 transition-colors gap-1">
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </main>

      {/* Login Prompt Popup */}
      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </div>
  );
};

export default AllProducts;
