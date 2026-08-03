"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';

const categories = [
  { id: 1, title: 'Irrigation Systems', image: '/assets/sprayer.png' },
  { id: 2, title: 'Power Machinery', image: '/assets/sprayer.png' },
  { id: 3, title: 'Machinery', image: '/assets/sprayer.png' },
  { id: 4, title: 'Solar and Security', image: '/assets/sprayer.png' },
  { id: 5, title: 'Smart Sensors', image: '/assets/sprayer.png' },
  { id: 6, title: 'Crop Protection', image: '/assets/sprayer.png' },
  { id: 7, title: 'Accessories', image: '/assets/sprayer.png' },
  { id: 8, title: 'Tools', image: '/assets/sprayer.png' }
];

const advantages = [
  { 
    id: 1, 
    title: 'Certified Quality', 
    desc: 'Every machine and tool undergoes rigorous stress testing for heavy-duty field use.',
    icon: '/assets/certified.png'
  },
  { 
    id: 2, 
    title: 'Expert Installation', 
    desc: 'On-site setup and technical training by our team across India.',
    icon: '/assets/installation.png'
  },
  { 
    id: 3, 
    title: 'Lifetime Support', 
    desc: 'Access to 24/7 technical assistance for the life of your equipment.',
    icon: '/assets/support.png'
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col">
      <Navbar />
      
      {/* Header Section */}
      <div className="w-full bg-[#F9F9F9] pt-10 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#4A4A4A] mb-8 uppercase">
            <Link href="/" className="hover:text-[#006B21]">Home</Link>
            <span>&gt;</span>
            <span className="text-[#1A1A1A]">Categories</span>
          </div>

          <h1 className="text-3xl md:text-[40px] font-bold text-[#1A1A1A] mb-4 tracking-tight">
            Shop by Category
          </h1>
          <p className="text-[#4A4A4A] max-w-2xl text-sm md:text-base leading-relaxed">
            Discover our comprehensive range of professional-grade agricultural solutions. From
            precision irrigation systems to heavy-duty machinery, we provide the tools to empower
            India's modern farmers.
          </p>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-12 flex flex-col">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col group cursor-pointer">
              {/* Image Container */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-2">
                  {cat.title}
                </h3>
                <div className="mt-auto flex items-center text-[#006B21] font-semibold text-sm hover:underline">
                  Browse Collection 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* GBRU Advantage Section */}
      <div className="w-full bg-[#F8F9FA] pt-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              The GBRU Advantage
            </h2>
            <div className="w-12 h-1 bg-[#006B21] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv) => (
              <div key={adv.id} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                {/* Icon Container */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full overflow-hidden relative bg-[#D4E8DC]">
                  <Image src={adv.icon as string} alt={adv.title} fill className="object-cover scale-[1.35]" />
                </div>
                
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
                  {adv.title}
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Categories;
