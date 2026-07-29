'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import DealerFilters from './DealerFilters';
import DealerList from './DealerList';
import DealerMap from './DealerMap';
import NeedHelpBanner from './NeedHelpBanner';
import Footer from './Footer';

const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

export default function FindDealerLandingPage() {
  const tDealer = useTranslations('findDealer');
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [dealers, setDealers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDealerId, setActiveDealerId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<{ state?: string; district?: string; tehsil?: string; marketplace?: string }>({});
  const [paginationInfo, setPaginationInfo] = useState<{
    page: number;
    page_length: number;
    total_count: number;
    total_pages: number;
  } | null>(null);
  const [userAddress, setUserAddress] = useState<any>(null);

  const getHeaders = () => {
    const headers: any = {
      "Content-Type": "application/json"
    };
    if (apiKey && apiSecret) {
      headers["X-API-KEY"] = apiKey;
      headers["X-API-SECRET"] = apiSecret;
    }

    if (typeof window !== "undefined") {
      const userApiKey = localStorage.getItem("user_api_key");
      const userApiSecret = localStorage.getItem("user_api_secret");
      if (userApiKey && userApiSecret) {
        headers["Authorization"] = `token ${userApiKey}:${userApiSecret}`;
      }
    }
    return headers;
  };

  const fetchDealers = useCallback(async (
    page: number = 1,
    filters?: { state?: string; district?: string; tehsil?: string; marketplace?: string }
  ) => {
    // Only fetch if authenticated
    const auth = localStorage.getItem("is_authenticated") === "true";
    const userApiKey = localStorage.getItem("user_api_key");
    const userApiSecret = localStorage.getItem("user_api_secret");
    if (!auth || !userApiKey || !userApiSecret) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const currentFilters = filters !== undefined ? filters : activeFilters;
      if (filters !== undefined) {
        setActiveFilters(filters);
      }

      const payload = {
        state: currentFilters.state || null,
        district: currentFilters.district || null,
        tehsil: currentFilters.tehsil || null,
        marketplace: currentFilters.marketplace || null,
        page: page,
        page_length: 20
      };

      const response = await fetch(`${apiBase}/api/method/shoption_products_multiutility.apis.near_by_dealer.get_near_by_dealers`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.message?.status && Array.isArray(data.message.data)) {
        setDealers(data.message.data);
        if (data.message.user_address) {
          setUserAddress(data.message.user_address);
        }
        if (data.message.pagination) {
          setPaginationInfo({
            page: data.message.pagination.page,
            page_length: data.message.pagination.page_length,
            total_count: data.message.pagination.total_count,
            total_pages: data.message.pagination.total_pages
          });
        } else {
          setPaginationInfo(null);
        }
        // Default active dealer to the first one in the list if available
        if (data.message.data.length > 0) {
          setActiveDealerId(data.message.data[0].name || data.message.data[0].id);
        } else {
          setActiveDealerId(null);
        }
      } else {
        setError(data.message?.message || "Failed to fetch dealers.");
      }
    } catch (err: any) {
      console.error("Error fetching dealers:", err);
      setError(err.message || "Failed to fetch dealers.");
    } finally {
      setIsLoading(false);
    }
  }, [activeFilters]);

  // Verify authentication, fetch API keys if needed, and fetch dealers on mount
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const auth = localStorage.getItem("is_authenticated") === "true";
      if (!auth) {
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }

      const phone = localStorage.getItem("user_phone");
      let userApiKey = null;
      let userApiSecret = null;

      if (phone) {
        try {
          let cleanedPhone = phone.replace(/[^\d]/g, "");
          if (cleanedPhone.length === 12 && cleanedPhone.startsWith("91")) {
            cleanedPhone = cleanedPhone.slice(2);
          }

          const res = await fetch(`${apiBase}/api/method/shoption_api.erp_api.utility.get_user_details`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey || "",
              "X-API-SECRET": apiSecret || ""
            },
            body: JSON.stringify({
              mobile_no: Number(cleanedPhone)
            })
          });

          const data = await res.json();
          if (res.ok && data.message?.status && data.message?.data?.key_details) {
            userApiKey = data.message.data.key_details.api_key || null;
            userApiSecret = data.message.data.key_details.api_secret || null;

            if (userApiKey && userApiSecret) {
              localStorage.setItem("user_api_key", userApiKey);
              localStorage.setItem("user_api_secret", userApiSecret);
            }
          }
        } catch (err) {
          console.error("Failed to fetch user details on dealer page:", err);
        }
      }

      if (!userApiKey || !userApiSecret) {
        userApiKey = localStorage.getItem("user_api_key");
        userApiSecret = localStorage.getItem("user_api_secret");
      }

      if (!userApiKey || !userApiSecret) {
        console.warn("User lacks API credentials in profile details, using public credentials or caching fallbacks.");
      }

      setIsAuthenticated(true);
      fetchDealers(1);
    };

    checkAuthAndFetch();
  }, [router, fetchDealers]);

  const handleDealerClick = (id: string) => {
    setActiveDealerId((prev) => (prev === id ? null : id));
  };

  const handleSearch = (filters: { state: string; district: string; tehsil: string; marketplace: string }) => {
    fetchDealers(1, filters);
  };

  const handlePageChange = (page: number) => {
    fetchDealers(page);
  };

  if (isAuthenticated === null) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20 bg-[#FAF9F5]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#154212]"></div>
            <p className="text-gray-600 text-sm font-medium">Verifying access...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null;
  }

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
        <DealerFilters onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8 text-sm font-sans">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* 5. Main Content Layout (Results List + Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          
          {/* 5a. Results List Column (2 of 5 columns / ~40%) */}
          <div className="lg:col-span-2">
            <DealerList 
              dealers={dealers} 
              isLoading={isLoading} 
              activeDealerId={activeDealerId} 
              onDealerClick={handleDealerClick} 
              paginationInfo={paginationInfo}
              onPageChange={handlePageChange}
            />
          </div>

          {/* 5b. Map Panel Column (3 of 5 columns / ~60%) */}
          <div className="lg:col-span-3 h-[600px] lg:h-full lg:min-h-[780px]">
            <DealerMap 
              dealers={dealers} 
              activeDealerId={activeDealerId} 
              onDealerClick={handleDealerClick} 
              userAddress={userAddress}
              activeFilters={activeFilters}
            />
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
