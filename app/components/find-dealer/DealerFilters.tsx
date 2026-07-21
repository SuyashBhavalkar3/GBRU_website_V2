'use client';

import React, { useState } from 'react';
import { ChevronDown, LocateFixed, Search } from 'lucide-react';

export default function DealerFilters() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [marketplace, setMarketplace] = useState('');

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
      {/* 4 Dropdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
            Select State
          </label>
          <div className="relative">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none"
            >
              <option value="">All States</option>
              <option value="iowa">Iowa</option>
              <option value="illinois">Illinois</option>
              <option value="nebraska">Nebraska</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* District */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
            Select District
          </label>
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none"
            >
              <option value="">All Districts</option>
              <option value="polk">Polk District</option>
              <option value="dallas">Dallas District</option>
              <option value="story">Story District</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Tehsil */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
            Select Tehsil
          </label>
          <div className="relative">
            <select
              value={tehsil}
              onChange={(e) => setTehsil(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none"
            >
              <option value="">All Tehsils</option>
              <option value="des-moines">Des Moines</option>
              <option value="ankeny">Ankeny</option>
              <option value="johnston">Johnston</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Marketplace */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
            Select Marketplace
          </label>
          <div className="relative">
            <select
              value={marketplace}
              onChange={(e) => setMarketplace(e.target.value)}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none"
            >
              <option value="">All Marketplaces</option>
              <option value="central-hub">Central Agri Hub</option>
              <option value="north-market">North Market</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100 sm:border-t-0">
        <button
          type="button"
          className="w-full sm:w-auto h-[48px] px-6 rounded-xl border-2 border-[#154212] bg-white hover:bg-[#154212]/5 text-[#154212] text-[16px] font-medium flex items-center justify-center gap-2.5 transition-colors"
        >
          <LocateFixed className="w-5 h-5 text-[#154212]" />
          Use My Location
        </button>

        <button
          type="button"
          className="w-full sm:w-auto h-11 px-8 rounded-full bg-[#009933] hover:bg-[#00852B] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Search className="w-4 h-4" />
          Search Dealers
        </button>
      </div>
    </div>
  );
}
