'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, LocateFixed, Search, Loader2 } from 'lucide-react';

const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

interface DealerFiltersProps {
  onSearch: (filters: { state: string; district: string; tehsil: string; marketplace: string }) => void;
  isLoading: boolean;
}

export default function DealerFilters({ onSearch, isLoading }: DealerFiltersProps) {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [marketplace, setMarketplace] = useState('');

  const [statesList, setStatesList] = useState<{ id: string; name: string }[]>([]);
  const [districtsList, setDistrictsList] = useState<{ id: string; name: string }[]>([]);
  const [tehsilsList, setTehsilsList] = useState<{ id: string; name: string }[]>([]);
  const [marketplacesList, setMarketplacesList] = useState<{ id: string; name: string }[]>([]);

  const getHeaders = () => {
    const headers: any = {
      "Content-Type": "application/json"
    };
    if (apiKey && apiSecret) {
      headers["X-API-KEY"] = apiKey;
      headers["X-API-SECRET"] = apiSecret;
    }
    return headers;
  };

  // Fetch States on Mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_states`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ name: "India" })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setStatesList(data.message.data);
        }
      } catch (err) {
        console.error("Failed to fetch states", err);
      }
    };
    fetchStates();
  }, []);

  // Fetch Districts when State changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!state) {
        setDistrictsList([]);
        setDistrict('');
        return;
      }
      try {
        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_districts`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ state_id: state })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setDistrictsList(data.message.data);
          setDistrict('');
        }
      } catch (err) {
        console.error("Failed to fetch districts", err);
      }
    };
    fetchDistricts();
  }, [state]);

  // Fetch Tehsils when District changes
  useEffect(() => {
    const fetchTahsils = async () => {
      if (!district) {
        setTehsilsList([]);
        setTehsil('');
        return;
      }
      try {
        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_tahsils`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ district_id: district })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setTehsilsList(data.message.data);
          setTehsil('');
        }
      } catch (err) {
        console.error("Failed to fetch tahsils", err);
      }
    };
    fetchTahsils();
  }, [district]);

  // Fetch Marketplaces when Tehsil changes
  useEffect(() => {
    const fetchMarketplaces = async () => {
      if (!tehsil) {
        setMarketplacesList([]);
        setMarketplace('');
        return;
      }
      try {
        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_marketplaces`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ tehsil_id: tehsil })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setMarketplacesList(data.message.data);
          setMarketplace('');
        }
      } catch (err) {
        console.error("Failed to fetch marketplaces", err);
      }
    };
    fetchMarketplaces();
  }, [tehsil]);

  const handleSearchClick = () => {
    onSearch({ state, district, tehsil, marketplace });
  };

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
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none cursor-pointer font-sans"
            >
              <option value="">All States</option>
              {statesList.map((st) => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
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
              disabled={!state}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer font-sans"
            >
              <option value="">All Districts</option>
              {districtsList.map((dt) => (
                <option key={dt.id} value={dt.id}>{dt.name}</option>
              ))}
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
              disabled={!district}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer font-sans"
            >
              <option value="">All Tehsils</option>
              {tehsilsList.map((th) => (
                <option key={th.id} value={th.id}>{th.name}</option>
              ))}
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
              disabled={!tehsil}
              className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 bg-white text-[14px] text-gray-800 focus:outline-none focus:border-[#009933] appearance-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer font-sans"
            >
              <option value="">All Marketplaces</option>
              {marketplacesList.map((mp) => (
                <option key={mp.id} value={mp.id}>{mp.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100 sm:border-t-0 font-sans">
        <button
          type="button"
          onClick={() => alert("Location services are not enabled in sandbox. Please use the dropdown filters to search.")}
          className="w-full sm:w-auto h-[48px] px-6 rounded-xl border-2 border-[#154212] bg-white hover:bg-[#154212]/5 text-[#154212] text-[16px] font-medium flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
        >
          <LocateFixed className="w-5 h-5 text-[#154212]" />
          Use My Location
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleSearchClick}
          className="w-full sm:w-auto h-11 px-8 rounded-full bg-[#009933] hover:bg-[#00852B] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          Search Dealers
        </button>
      </div>
    </div>
  );
}
