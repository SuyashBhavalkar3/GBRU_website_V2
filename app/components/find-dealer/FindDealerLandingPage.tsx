'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import DealerFilters from './DealerFilters';
import DealerList from './DealerList';
import DealerMap from './DealerMap';
import NeedHelpBanner from './NeedHelpBanner';
import Footer from './Footer';

export default function FindDealerLandingPage() {
  const tDealer = useTranslations('findDealer');

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      
      {/* 1. Top Navigation Bar */}
      <Header />

      {/* 2. Breadcrumb */}
      <Breadcrumb />

      {/* Main Page Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        
        {/* 3. Page Heading Section */}
        <div className="mb-8 max-w-[800px]">
          <h1 className="font-bold text-[36px] sm:text-[42px] lg:text-[48px] text-[#154212] leading-tight font-sans mb-3">
            {tDealer('heading')}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            {tDealer('subheading')}
          </p>
        </div>

        {/* 4. Filter Bar */}
        <DealerFilters />

        {/* 5. Main Content Layout (Results List + Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          
          {/* 5a. Results List Column (2 of 5 columns / ~40%) */}
          <div className="lg:col-span-2">
            <DealerList />
          </div>

          {/* 5b. Map Panel Column (3 of 5 columns / ~60%) */}
          <div className="lg:col-span-3 h-[600px] lg:h-full lg:min-h-[780px]">
            <DealerMap />
          </div>

        </div>

        {/* 6. Need Help? Banner */}
        <NeedHelpBanner />

      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
