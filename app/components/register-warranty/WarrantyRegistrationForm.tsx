'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Container from '../common/Container';
import { ChevronDown, FileUp, Camera, Loader2, Lock } from 'lucide-react';

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10 last:mb-0">
    <div className="border-b border-[#E5E7EB] pb-3 mb-6">
      <h2 className="font-semibold text-[18px] text-[#154212] font-sans">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  isSelect?: boolean;
  options?: {id: string, name: string}[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
};

const FormField = ({ label, placeholder, type = 'text', fullWidth = false, isSelect = false, options = [], value, onChange }: InputProps) => (
  <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
    {label ? (
      <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
        {label}
      </label>
    ) : (
      <div className="h-[28px]" />
    )}
    <div className="relative">
      {isSelect ? (
        <select 
          className="w-full h-[52px] px-4 rounded-[8px] border border-[#D1D5DB] bg-white text-[15px] text-[#42493E] focus:outline-none focus:border-[#009933] focus:ring-1 focus:ring-[#009933] appearance-none font-geist cursor-pointer"
          value={value || ""}
          onChange={onChange}
        >
          <option value="" disabled className="text-[#9CA3AF]">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      ) : (
        <input 
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          className="w-full h-[52px] px-4 rounded-[8px] border border-[#D1D5DB] bg-white text-[15px] text-[#42493E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#009933] focus:ring-1 focus:ring-[#009933] font-geist"
        />
      )}
      {isSelect && (
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
      )}
    </div>
  </div>
);

// Fallback GBRU products in case order API returns empty or fails
const FALLBACK_PRODUCTS = [
  { id: "seeder-pro-x", name: "Seeder Pro X" },
  { id: "agri-sow-3000", name: "Agri-Sow 3000" },
  { id: "ecoplanter-lite", name: "EcoPlanter Lite" },
  { id: "terramaster-500", name: "TerraMaster 500" },
  { id: "smartsow-v2", name: "SmartSow V2" },
  { id: "grainguard-4.0", name: "GrainGuard 4.0" }
];

// Resilient recursive JSON parser to extract products from dynamic orders response
function extractProductsFromOrders(data: any): { id: string; name: string }[] {
  const productsMap = new Map<string, string>();

  const processItems = (itemsArray: any[]) => {
    if (!Array.isArray(itemsArray)) return;
    for (const item of itemsArray) {
      if (!item) continue;
      
      // If it's an order containing an items list
      if (Array.isArray(item.items)) {
        processItems(item.items);
      }
      
      // Extract item info if it looks like an item
      const itemCode = item.item_code || item.item_id || item.id || item.product_id;
      const itemName = item.item_name || item.product_name || item.name;
      
      if (itemCode && itemName) {
        productsMap.set(String(itemCode), String(itemName));
      }
    }
  };

  const traverse = (val: any) => {
    if (!val) return;
    if (Array.isArray(val)) {
      processItems(val);
      for (const subVal of val) {
        if (typeof subVal === 'object') {
          traverse(subVal);
        }
      }
      return;
    }
    if (typeof val === 'object') {
      if (Array.isArray(val.data)) {
        processItems(val.data);
      }
      if (Array.isArray(val.orders)) {
        processItems(val.orders);
      }
      if (Array.isArray(val.items)) {
        processItems(val.items);
      }
      for (const key of Object.keys(val)) {
        if (typeof val[key] === 'object') {
          traverse(val[key]);
        }
      }
    }
  };

  traverse(data);

  return Array.from(productsMap.entries()).map(([id, name]) => ({
    id,
    name
  }));
}

// Helper to ensure customer phone numbers have the +91 country prefix
function formatMobileWithCountryCode(phone: string): string {
  if (!phone) return "";
  let cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+91")) {
    return cleaned;
  }
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }
  return `+91${cleaned}`;
}

export default function WarrantyRegistrationForm() {
  const router = useRouter();
  const tWar = useTranslations('warranty');
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [statesList, setStatesList] = useState<{id: string, name: string}[]>([]);
  const [dealerDistrictsList, setDealerDistrictsList] = useState<{id: string, name: string}[]>([]);
  const [dealerTahsilsList, setDealerTahsilsList] = useState<{id: string, name: string}[]>([]);
  const [dealerMarketplacesList, setDealerMarketplacesList] = useState<{id: string, name: string}[]>([]);
  const [customerDistrictsList, setCustomerDistrictsList] = useState<{id: string, name: string}[]>([]);
  
  const [productsList, setProductsList] = useState<{id: string, name: string}[]>([]);
  const [productDetailsMap, setProductDetailsMap] = useState<Record<string, any>>({});
  const [rawOrders, setRawOrders] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const invoiceInputRef = React.useRef<HTMLInputElement>(null);
  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const [parsedAddressParts, setParsedAddressParts] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    productName: "",
    modelNumber: "",
    serialNumber: "",
    purchaseDate: "",
    dealerName: "",
    dealerState: "",
    dealerDistrict: "",
    dealerTehsil: "",
    dealerMarketplace: "",
    customerName: "",
    mobileNumber: "",
    emailAddress: "",
    customerState: "",
    customerDistrict: "",
    villageCity: ""
  });

  // Check auth and fetch products / user details on mount
  useEffect(() => {
    const auth = localStorage.getItem("is_authenticated") === "true";
    setIsAuthenticated(auth);

    if (auth) {
      const storedPhone = localStorage.getItem("user_phone");
      if (storedPhone) {
        fetchUserDataAndOrders(storedPhone);
      } else {
        // Fallback standard products list
        setProductsList(FALLBACK_PRODUCTS);
      }
    }
  }, []);

  // Look up customer state from parsed address parts
  useEffect(() => {
    if (statesList.length > 0 && parsedAddressParts.length > 0) {
      let matchedStateId = "";
      for (const part of parsedAddressParts) {
        const matchedState = statesList.find(s => s.name.toLowerCase() === part.toLowerCase());
        if (matchedState) {
          matchedStateId = matchedState.id;
          break;
        }
      }
      if (matchedStateId) {
        setFormData(prev => ({ ...prev, customerState: matchedStateId }));
      }
    }
  }, [statesList, parsedAddressParts]);

  // Look up customer district from parsed address parts once districts list is loaded
  useEffect(() => {
    if (customerDistrictsList.length > 0 && parsedAddressParts.length > 0) {
      let matchedDistrictId = "";
      // Scan parts from right to left to find district (prioritizing Nandurbar/Satara over other text)
      for (let i = parsedAddressParts.length - 1; i >= 0; i--) {
        const part = parsedAddressParts[i];
        const matchedDistrict = customerDistrictsList.find(d => d.name.toLowerCase() === part.toLowerCase());
        if (matchedDistrict) {
          matchedDistrictId = matchedDistrict.id;
          break;
        }
      }
      if (matchedDistrictId) {
        setFormData(prev => ({ ...prev, customerDistrict: matchedDistrictId }));
      }
    }
  }, [customerDistrictsList, parsedAddressParts]);

  const fetchUserDataAndOrders = async (phone: string) => {
    setProfileLoading(true);
    setApiError(null);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;

      if (!apiBase || !apiKey || !apiSecret) {
        throw new Error("ERP API credentials are not configured in .env file.");
      }

      let cleanedPhone = phone.replace(/[^\d]/g, "");
      if (cleanedPhone.length === 12 && cleanedPhone.startsWith("91")) {
        cleanedPhone = cleanedPhone.slice(2);
      }

      // 1. Fetch User Profile and Private Credentials
      const profileRes = await fetch(`${apiBase}/api/method/shoption_api.erp_api.utility.get_user_details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          "X-API-SECRET": apiSecret
        },
        body: JSON.stringify({
          mobile_no: Number(cleanedPhone)
        })
      });

      const profileData = await profileRes.json();
      if (!profileRes.ok || (profileData.message && profileData.message.status === false)) {
        throw new Error(profileData.message?.message || "Failed to fetch user details.");
      }

      const userData = profileData.message?.data;
      if (userData) {
        // Parse address parts by commas
        const rawAddress = userData.address || "";
        const parts = rawAddress.split(',').map((p: string) => p.trim()).filter(Boolean);
        setParsedAddressParts(parts);

        // Auto-fill customer profile details
        setFormData(prev => ({
          ...prev,
          customerName: userData.Customer_name || prev.customerName,
          mobileNumber: formatMobileWithCountryCode(phone || prev.mobileNumber),
          emailAddress: userData.user_id || prev.emailAddress,
          villageCity: parts[0] || rawAddress || prev.villageCity,
          customerState: userData.state || prev.customerState,
          customerDistrict: userData.district || prev.customerDistrict
        }));

        // Retrieve private tokens for orders API
        const userApiKey = userData.key_details?.api_key;
        const userApiSecret = userData.key_details?.api_secret;

        if (userApiKey && userApiSecret) {
          localStorage.setItem("user_api_key", userApiKey);
          localStorage.setItem("user_api_secret", userApiSecret);
          await fetchPurchasedProducts(apiBase, userApiKey, userApiSecret);
        } else {
          // Try using cached keys if present
          const cachedKey = localStorage.getItem("user_api_key");
          const cachedSecret = localStorage.getItem("user_api_secret");
          if (cachedKey && cachedSecret) {
            await fetchPurchasedProducts(apiBase, cachedKey, cachedSecret);
          } else {
            console.warn("User profile details lack key_details");
            setProductsList(FALLBACK_PRODUCTS);
          }
        }
      } else {
        setProductsList(FALLBACK_PRODUCTS);
      }
    } catch (err: any) {
      console.error("Error loading user profile or orders:", err);
      setApiError(err.message || "Failed to retrieve your purchased products list.");
      setProductsList(FALLBACK_PRODUCTS);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchPurchasedProducts = async (apiBase: string, userApiKey: string, userApiSecret: string) => {
    setIsLoadingProducts(true);
    try {
      const url = new URL(`${apiBase}/api/method/shoption_api.cart.cart.get_order_from_list`);
      url.searchParams.append("from_date", "2022-01-01");
      url.searchParams.append("to_date", "2027-07-21");
      url.searchParams.append("page_size", "200");
      url.searchParams.append("page", "1");

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${userApiKey}:${userApiSecret}`
        }
      });

      const data = await response.json();
      if (!response.ok || (data.message && data.message.status === false)) {
        throw new Error(data.message?.message || "Failed to fetch purchased products list.");
      }

      // Safe traversal to find the array of orders
      let ordersArray: any[] = [];
      const findOrders = (val: any) => {
        if (!val) return;
        if (Array.isArray(val)) {
          if (val.some(v => v && (v.order_id || v.name))) {
            ordersArray = val;
            return;
          }
          for (const subVal of val) {
            if (typeof subVal === 'object') {
              findOrders(subVal);
            }
          }
        } else if (typeof val === 'object') {
          if (Array.isArray(val.data)) {
            ordersArray = val.data;
            return;
          }
          if (Array.isArray(val.orders)) {
            ordersArray = val.orders;
            return;
          }
          for (const key of Object.keys(val)) {
            if (typeof val[key] === 'object') {
              findOrders(val[key]);
            }
          }
        }
      };
      findOrders(data);
      setRawOrders(ordersArray);

      // Now for each order, fetch details to obtain item codes and names
      const detailPromises = ordersArray.map(async (order: any) => {
        const orderId = order.order_id || order.name;
        if (!orderId) return [];

        try {
          const detailUrl = `${apiBase}/api/method/shoption_api.cart.cart.get_order_details`;
          const detailRes = await fetch(detailUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `token ${userApiKey}:${userApiSecret}`
            },
            body: JSON.stringify({ order_id: orderId })
          });

          const detailData = await detailRes.json();
          if (detailRes.ok && detailData.message && detailData.message.status !== false && detailData.message.data) {
            const shipmentItems = detailData.message.data.shipment?.items || [];
            const normalItems = detailData.message.data.items || [];
            const allItems = [...shipmentItems, ...normalItems];

            const orderDate = detailData.message.data.order_summary?.order_date || order.date || "";
            const dealer = detailData.message.data.shipment?.transporter_name || detailData.message.data.order_summary?.customer_name || "";

            return allItems.map((item: any) => ({
              id: item.item_code || item.item_id || item.id,
              name: item.item_name || item.name || item.product_name,
              orderDate,
              dealerName: dealer
            }));
          } else {
            console.warn(`POST order details returned status false for order: ${orderId}`, detailData);
          }
        } catch (err) {
          console.error(`POST order details failed for order: ${orderId}`, err);
        }
        return [];
      });

      const allItemsLists = await Promise.all(detailPromises);
      const flatItems = allItemsLists.flat();

      // Deduplicate items and build details map
      const productsMap = new Map<string, { id: string; name: string }>();
      const detailsMap: Record<string, { id: string; name: string; orderDate: string; dealerName: string }> = {};

      for (const item of flatItems) {
        if (item && item.id && item.name) {
          productsMap.set(item.id, { id: item.id, name: item.name });
          detailsMap[item.id] = item;
        }
      }

      setProductDetailsMap(detailsMap);

      const parsedProducts = Array.from(productsMap.values());
      if (parsedProducts.length > 0) {
        setProductsList(parsedProducts);
      } else {
        console.info("No items found in detailed orders list, falling back to standard list.");
        setProductsList(FALLBACK_PRODUCTS);
      }
    } catch (err: any) {
      console.error("Error retrieving user orders details list:", err);
      setProductsList(FALLBACK_PRODUCTS);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Handle product selection change and autofill related details
  const handleProductSelect = (productId: string) => {
    setFormData(prev => ({ ...prev, productName: productId }));

    const detail = productDetailsMap[productId];
    if (detail) {
      // Parse order date (convert from DD-MM-YYYY to YYYY-MM-DD for date input)
      let formattedDate = "";
      if (detail.orderDate) {
        const parts = detail.orderDate.split(' ')[0].split('-');
        if (parts.length === 3) {
          if (parts[2].length === 4) {
            formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          } else {
            formattedDate = detail.orderDate;
          }
        } else {
          formattedDate = detail.orderDate;
        }
      }
      setFormData(prev => ({
        ...prev,
        purchaseDate: formattedDate || prev.purchaseDate,
        dealerName: detail.dealerName || prev.dealerName
      }));
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        
        const headers: any = {
          "Content-Type": "application/json"
        };
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }

        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_states`, {
          method: "POST",
          headers,
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

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.dealerState) {
        setDealerDistrictsList([]);
        setFormData(prev => ({...prev, dealerDistrict: ""}));
        return;
      }
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        
        const headers: any = {
          "Content-Type": "application/json"
        };
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }

        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_districts`, {
          method: "POST",
          headers,
          body: JSON.stringify({ state_id: formData.dealerState })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setDealerDistrictsList(data.message.data);
          setFormData(prev => ({...prev, dealerDistrict: ""}));
        }
      } catch (err) {
        console.error("Failed to fetch districts", err);
      }
    };
    fetchDistricts();
  }, [formData.dealerState]);

  useEffect(() => {
    const fetchTahsils = async () => {
      if (!formData.dealerDistrict) {
        setDealerTahsilsList([]);
        setFormData(prev => ({...prev, dealerTehsil: ""}));
        return;
      }
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        
        const headers: any = {
          "Content-Type": "application/json"
        };
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }

        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_tahsils`, {
          method: "POST",
          headers,
          body: JSON.stringify({ district_id: formData.dealerDistrict })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setDealerTahsilsList(data.message.data);
          setFormData(prev => ({...prev, dealerTehsil: ""}));
        }
      } catch (err) {
        console.error("Failed to fetch tahsils", err);
      }
    };
    fetchTahsils();
  }, [formData.dealerDistrict]);

  useEffect(() => {
    const fetchMarketplaces = async () => {
      if (!formData.dealerTehsil) {
        setDealerMarketplacesList([]);
        setFormData(prev => ({...prev, dealerMarketplace: ""}));
        return;
      }
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        
        const headers: any = {
          "Content-Type": "application/json"
        };
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }

        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_marketplaces`, {
          method: "POST",
          headers,
          body: JSON.stringify({ tehsil_id: formData.dealerTehsil })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setDealerMarketplacesList(data.message.data);
          setFormData(prev => ({...prev, dealerMarketplace: ""}));
        }
      } catch (err) {
        console.error("Failed to fetch marketplaces", err);
      }
    };
    fetchMarketplaces();
  }, [formData.dealerTehsil]);

  useEffect(() => {
    const fetchCustomerDistricts = async () => {
      if (!formData.customerState) {
        setCustomerDistrictsList([]);
        setFormData(prev => ({...prev, customerDistrict: ""}));
        return;
      }
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        
        const headers: any = {
          "Content-Type": "application/json"
        };
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }

        const response = await fetch(`${apiBase}/api/method/shoption_api.area.api.get_districts`, {
          method: "POST",
          headers,
          body: JSON.stringify({ state_id: formData.customerState })
        });
        const data = await response.json();
        if (data.message?.status && data.message.data) {
          setCustomerDistrictsList(data.message.data);
          setFormData(prev => ({...prev, customerDistrict: ""}));
        }
      } catch (err) {
        console.error("Failed to fetch customer districts", err);
      }
    };
    fetchCustomerDistricts();
  }, [formData.customerState]);

  const handleInvoiceClick = () => {
    invoiceInputRef.current?.click();
  };

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInvoiceFile(e.target.files[0]);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://uaterp.gbru.in";
      const userApiKey = localStorage.getItem("user_api_key");
      const userApiSecret = localStorage.getItem("user_api_secret");

      const headers: any = {};
      if (userApiKey && userApiSecret) {
        headers["Authorization"] = `token ${userApiKey}:${userApiSecret}`;
      } else {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
        if (apiKey && apiSecret) {
          headers["X-API-KEY"] = apiKey;
          headers["X-API-SECRET"] = apiSecret;
        }
      }

      // Lookup state names from IDs for API formatting
      const dealerStateName = statesList.find(s => s.id === formData.dealerState)?.name || formData.dealerState;
      const customerStateName = statesList.find(s => s.id === formData.customerState)?.name || formData.customerState;

      // Construct Multipart Form Data
      const submitData = new FormData();
      submitData.append("product_name", formData.productName);
      submitData.append("model_number", formData.modelNumber);
      submitData.append("serial_number", formData.serialNumber);
      submitData.append("purchase_date", formData.purchaseDate);
      submitData.append("dealer_name", formData.dealerName);
      submitData.append("dealer_state", dealerStateName);
      submitData.append("dealer_district", formData.dealerDistrict);
      submitData.append("dealer_tehsil", formData.dealerTehsil);
      submitData.append("dealer_marketplace", formData.dealerMarketplace);
      submitData.append("costomer_name", formData.customerName);
      submitData.append("mobile_number", formatMobileWithCountryCode(formData.mobileNumber));
      submitData.append("email", formData.emailAddress);
      submitData.append("costomer_state", customerStateName);
      submitData.append("costomer_district", formData.customerDistrict);
      submitData.append("city", formData.villageCity);

      if (invoiceFile) {
        submitData.append("invoice", invoiceFile);
      }
      if (photoFile) {
        submitData.append("photo", photoFile);
      }

      const response = await fetch(`${apiBase}/api/method/shoption_products_multiutility.apis.warranty_registration_form.submit_warranty_registration`, {
        method: "POST",
        headers, // Multipart headers are set automatically by fetch
        body: submitData
      });

      const data = await response.json();
      if (!response.ok || (data.message && data.message.status === false)) {
        throw new Error(data.message?.message || data.message?.error || "Failed to submit warranty registration.");
      }

      console.log("Warranty Submit Response:", data);
      const currentLocale = window.location.pathname.split('/')[1];
      const localizedPath = ['hi', 'mr'].includes(currentLocale) ? `/${currentLocale}/warranty-success` : '/warranty-success';
      window.location.href = localizedPath;
    } catch (err: any) {
      console.error("Warranty submit error:", err);
      setApiError(err.message || "An unexpected error occurred during submission.");
      alert(err.message || "Failed to submit warranty registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="warranty-registration-form" className="w-full bg-[#F5F5F5] py-12 md:py-[80px]">
      <Container>
        <div className="w-full max-w-[1120px] mx-auto bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
          
          {/* Form Header */}
          <div className="w-full h-auto md:h-[96px] bg-[#009933] px-6 py-5 md:px-[40px] flex flex-col justify-center">
            <h1 className="font-bold text-[24px] md:text-[28px] text-white font-sans">
              {tWar('formHeaderTitle')}
            </h1>
            <p className="font-normal text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] font-geist mt-1 md:mt-2">
              {tWar('formHeaderSub')}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-[40px] relative min-h-[300px]">
            {/* If not authenticated, show premium glassmorphism overlay */}
            {isAuthenticated === false && (
              <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/70 flex flex-col items-center justify-center p-6 text-center rounded-[16px]">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-[450px] w-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#EBFDF2] text-[#009933] flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-[22px] font-bold text-[#154212] mb-3 font-sans">
                    Authentication Required
                  </h2>
                  <p className="text-[#42493E] text-[14px] leading-relaxed mb-6 font-geist">
                    To view and select your purchased products for warranty registration, please log in to your account.
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="bg-[#009933] hover:bg-[#00852B] text-white font-semibold text-[16px] font-sans h-[48px] w-full rounded-[10px] shadow-[0px_8px_20px_rgba(0,153,51,0.20)] transition-all cursor-pointer"
                  >
                    Log In to Continue
                  </button>
                </div>
              </div>
            )}

            {/* If authenticated but fetching credentials/details, show premium loading spinner */}
            {isAuthenticated && (profileLoading || isLoadingProducts) && (
              <div className="absolute inset-0 z-20 bg-white/80 flex flex-col items-center justify-center p-6 text-center rounded-[16px]">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-[#009933]" />
                  <p className="text-[#42493E] text-[15px] font-medium font-geist">
                    Loading your profile and purchased products list...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className={isAuthenticated === false ? "opacity-30 pointer-events-none select-none" : ""}>
              
              {/* SECTION 1 */}
              <FormSection title={tWar('sec1Title')}>
                <FormField 
                  label={tWar('productName')} 
                  placeholder={isLoadingProducts ? "Loading products..." : tWar('selectProduct')} 
                  isSelect 
                  options={productsList}
                  value={formData.productName}
                  onChange={(e) => handleProductSelect(e.target.value)}
                />
                <FormField 
                  label={tWar('modelNumber')} 
                  placeholder={tWar('modelPlaceholder')} 
                  value={formData.modelNumber}
                  onChange={(e) => setFormData({...formData, modelNumber: e.target.value})}
                />
                <FormField 
                  label={tWar('serialNumber')} 
                  placeholder={tWar('serialPlaceholder')} 
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                />
                <FormField 
                  label={tWar('purchaseDate')} 
                  placeholder="mm / dd / yyyy" 
                  type="date" 
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                />
                <FormField 
                  label={tWar('dealerName')} 
                  placeholder={tWar('dealerPlaceholder')} 
                  fullWidth 
                  value={formData.dealerName}
                  onChange={(e) => setFormData({...formData, dealerName: e.target.value})}
                />
                <FormField 
                  label={tWar('dealerInfo')} 
                  placeholder={tWar('dealerState')} 
                  isSelect 
                  options={statesList}
                  value={formData.dealerState}
                  onChange={(e) => setFormData({...formData, dealerState: e.target.value})}
                />
                <FormField 
                  label="" 
                  placeholder={tWar('dealerDistrict')} 
                  isSelect 
                  options={dealerDistrictsList}
                  value={formData.dealerDistrict}
                  onChange={(e) => setFormData({...formData, dealerDistrict: e.target.value})}
                />
                <FormField 
                  label="" 
                  placeholder={tWar('dealerTehsil')} 
                  isSelect 
                  options={dealerTahsilsList}
                  value={formData.dealerTehsil}
                  onChange={(e) => setFormData({...formData, dealerTehsil: e.target.value})}
                />
                <FormField 
                  label="" 
                  placeholder={tWar('dealerMarketplace')} 
                  isSelect 
                  options={dealerMarketplacesList}
                  value={formData.dealerMarketplace}
                  onChange={(e) => setFormData({...formData, dealerMarketplace: e.target.value})}
                />
              </FormSection>

              {/* SECTION 2 */}
              <FormSection title={tWar('sec2Title')}>
                <FormField 
                  label={tWar('customerName')} 
                  placeholder={tWar('fullNamePlaceholder')} 
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
                <FormField 
                  label={tWar('mobileNumber')} 
                  placeholder="+91 00000 00000" 
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                />
                <FormField 
                  label={tWar('emailAddress')} 
                  placeholder="name@example.com" 
                  fullWidth 
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                />
                <FormField 
                  label={tWar('state')} 
                  placeholder={tWar('selectState')} 
                  isSelect 
                  options={statesList}
                  value={formData.customerState}
                  onChange={(e) => setFormData({...formData, customerState: e.target.value})}
                />
                <FormField 
                  label={tWar('district')} 
                  placeholder={tWar('district')} 
                  isSelect
                  options={customerDistrictsList}
                  value={formData.customerDistrict}
                  onChange={(e) => setFormData({...formData, customerDistrict: e.target.value})}
                />
                <FormField 
                  label={tWar('villageCity')} 
                  placeholder={tWar('villageCityPlaceholder')} 
                  fullWidth 
                  value={formData.villageCity}
                  onChange={(e) => setFormData({...formData, villageCity: e.target.value})}
                />
              </FormSection>

              {/* SECTION 3 */}
              <FormSection title={tWar('sec3Title')}>
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
                    {tWar('invoiceCopy')}
                  </label>
                  <input 
                    type="file" 
                    ref={invoiceInputRef} 
                    onChange={handleInvoiceChange} 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                  />
                  <button 
                    type="button" 
                    onClick={handleInvoiceClick}
                    className="w-full h-[120px] rounded-[12px] border-2 border-dashed border-[#D1D5DB] bg-white flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer p-4 text-center"
                  >
                    <FileUp className="w-6 h-6 text-[#6B7280]" />
                    <span className="font-normal text-[14px] text-[#6B7280] font-geist truncate max-w-full">
                      {invoiceFile ? (
                        <span className="font-semibold text-[#009933]">{invoiceFile.name}</span>
                      ) : (
                        <>
                          {tWar('dragDrop')} <span className="text-[#009933]">{tWar('browse')}</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
                    {tWar('productPhoto')}
                  </label>
                  <input 
                    type="file" 
                    ref={photoInputRef} 
                    onChange={handlePhotoChange} 
                    className="hidden" 
                    accept=".jpg,.jpeg,.png"
                  />
                  <button 
                    type="button" 
                    onClick={handlePhotoClick}
                    className="w-full h-[120px] rounded-[12px] border-2 border-dashed border-[#D1D5DB] bg-white flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer p-4 text-center"
                  >
                    <Camera className="w-6 h-6 text-[#6B7280]" />
                    <span className="font-normal text-[14px] text-[#6B7280] font-geist truncate max-w-full">
                      {photoFile ? (
                        <span className="font-semibold text-[#009933]">{photoFile.name}</span>
                      ) : (
                        <>
                          {tWar('dragDrop')} <span className="text-[#009933]">{tWar('browse')}</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </FormSection>

              {/* Submit Section */}
              <div className="mt-[48px] flex flex-col items-center">
                {apiError && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[14px] rounded-r-lg max-w-[420px] w-full text-center shadow-sm">
                    ⚠️ {apiError}
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#009933] hover:bg-[#00852B] disabled:bg-[#85c299] text-white font-semibold text-[18px] font-sans h-[56px] w-full max-w-[420px] rounded-[10px] shadow-[0px_8px_20px_rgba(0,153,51,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <span>{tWar('submitButton')}</span>
                  )}
                </button>
                
                <p className="mt-4 font-normal text-[12px] text-[#6B7280] font-geist text-center">
                  {tWar('termsText')}{' '}
                  <a href="#" className="text-[#154212] underline">
                    {tWar('termsLink')}
                  </a>{' '}
                  {tWar('termsTextEnd')}
                </p>
              </div>

            </form>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
