"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';

const products = [
  {
    id: 1,
    badge: { text: 'BEST SELLER', classes: 'bg-[#E5E7EB] text-[#374151]' },
    image: '/assets/sprayer.png',
    title: 'GBRU Pro-Drip Kit',
    tags: ['UV RESISTANT', 'EASY SETUP', '2 YEAR WARRANTY'],
    price: '12,499',
    booking: '1,500'
  },
  {
    id: 2,
    badge: { text: 'NEW TECH', classes: 'bg-[#D4E8DC] text-[#006B21]' },
    image: '/assets/sprayer.png',
    title: 'Smart Rain Sensor V2',
    tags: ['APP CONTROL', 'PRECISION', 'WIRELESS'],
    price: '3,899',
    booking: '500'
  },
  {
    id: 3,
    badge: { text: 'FARMER APPROVED', classes: 'bg-[#E3E8D4] text-[#4A5D23]' },
    image: '/assets/sprayer.png',
    title: 'Solar Pump Controller',
    tags: ['SOLAR READY', 'HEAVY DUTY', '5HP SUPPORT'],
    price: '42,500',
    booking: '5,000'
  },
  {
    id: 4,
    badge: { text: 'BEST SELLER', classes: 'bg-[#E5E7EB] text-[#374151]' },
    image: '/assets/sprayer.png',
    title: 'Heavy Duty Sprayer',
    tags: ['16L CAPACITY', 'BATTERY OPERATED'],
    price: '4,500',
    booking: '500'
  },
  {
    id: 5,
    badge: { text: 'NEW TECH', classes: 'bg-[#D4E8DC] text-[#006B21]' },
    image: '/assets/sprayer.png',
    title: 'Automatic Fogger',
    tags: ['LARGE AREA', 'TIMED SPRAY'],
    price: '8,200',
    booking: '1,000'
  },
  {
    id: 6,
    badge: { text: 'FARMER APPROVED', classes: 'bg-[#E3E8D4] text-[#4A5D23]' },
    image: '/assets/sprayer.png',
    title: 'Mini Tractor Attachments',
    tags: ['UNIVERSAL FIT', 'DURABLE STEEL'],
    price: '15,000',
    booking: '2,000'
  },
  {
    id: 7,
    badge: { text: 'BEST SELLER', classes: 'bg-[#E5E7EB] text-[#374151]' },
    image: '/assets/sprayer.png',
    title: 'Watering Hose 50m',
    tags: ['KINK FREE', 'ALL WEATHER'],
    price: '2,100',
    booking: '200'
  },
  {
    id: 8,
    badge: { text: 'NEW TECH', classes: 'bg-[#D4E8DC] text-[#006B21]' },
    image: '/assets/sprayer.png',
    title: 'Drone Sprayer Pro',
    tags: ['AUTONOMOUS', '10 ACRE/HR'],
    price: '1,20,000',
    booking: '10,000'
  },
  {
    id: 9,
    badge: { text: 'FARMER APPROVED', classes: 'bg-[#E3E8D4] text-[#4A5D23]' },
    image: '/assets/sprayer.png',
    title: 'Organic Fertilizer Dispenser',
    tags: ['EVEN SPREAD', 'EASY CLEAN'],
    price: '6,400',
    booking: '800'
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col">
      <Navbar />

      {/* Top Banner Section */}
      <div className="w-full bg-[#F9F9F9] pt-10 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A4A4A] mb-8 uppercase">
            <Link href="/" className="hover:text-[#006B21]">Home</Link>
            <span className="text-[#A5B4A8]">&gt;</span>
            <Link href="/categories" className="hover:text-[#006B21]">Categories</Link>
            <span className="text-[#A5B4A8]">&gt;</span>
            <span className="text-[#006B21]">Irrigation Systems</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Irrigation Systems
          </h1>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-12 flex flex-col">
        
        {/* Header Controls (Title + Sort) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-1">
              Precision Management
            </h2>
            <p className="text-sm text-[#4A4A4A]">
              Showing 42 Professional Products Found
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-sm font-semibold text-[#4A4A4A]">SORT BY:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-[#1A1A1A] text-sm rounded-md pl-4 pr-10 py-2 outline-none focus:border-[#006B21] focus:ring-1 focus:ring-[#006B21] cursor-pointer">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Sellers</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-shadow hover:shadow-lg relative">
              
              {/* Image Section */}
              <div className="relative h-56 w-full bg-[#EAEAEA] overflow-hidden">
                {/* Badge Overlay */}
                <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full z-10 ${product.badge.classes}`}>
                  {product.badge.text}
                </div>
                <Image src={product.image} alt={product.title} fill className="object-cover" />
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#1A1A1A] mb-3">
                  {product.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-bold text-[#006B21]">₹{product.price}</span>
                    <span className="text-xs text-[#6B7280]">Full Price</span>
                  </div>
                  
                  {/* Booking */}
                  <div className="text-xs text-[#4B5563] font-semibold mb-5">
                    Booking: ₹{product.booking}
                  </div>
                  
                  <button className="w-full bg-[#006B21] text-white font-bold py-3 rounded-lg hover:bg-[#005a1b] transition-colors text-sm">
                    Get Best Price
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-10">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#006B21] text-white font-semibold text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold">
            3
          </button>
          
          <span className="px-1 text-gray-400">...</span>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold">
            12
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </main>
    </div>
  );
};

export default Products;
