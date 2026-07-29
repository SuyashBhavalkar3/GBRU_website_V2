import React, { useEffect, useState, useRef } from 'react';
import { Plus, Minus, LocateFixed, Tractor } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface DealerMapProps {
  dealers: any[];
  activeDealerId: string | null;
  onDealerClick: (id: string) => void;
  userAddress?: any;
  activeFilters?: { state?: string; district?: string; tehsil?: string; marketplace?: string };
}

// Client-side cache for Nominatim coordinates to stay within rate limits and speed up rendering
const geocodeCache: Record<string, [number, number]> = {};

const cleanGeocodeQuery = (query: string): string => {
  if (!query) return "";
  return query
    .split(',')
    .map(part => part.trim())
    .filter(part => {
      if (/^\d+$/.test(part)) {
        // Only keep numeric parts if they look like a valid 6-digit pincode in India
        return part.length === 6;
      }
      return part.length > 0;
    })
    .join(', ');
};

const getCoordinates = async (query: string): Promise<[number, number] | null> => {
  if (geocodeCache[query]) {
    return geocodeCache[query];
  }

  try {
    const cached = localStorage.getItem(`geocode_${query}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      geocodeCache[query] = parsed;
      return parsed;
    }
  } catch (e) {}

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "GBRU-Dealer-Finder/1.0"
      }
    });
    const data = await res.json();
    if (data && data.length > 0) {
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      geocodeCache[query] = coords;
      try {
        localStorage.setItem(`geocode_${query}`, JSON.stringify(coords));
      } catch (e) {}
      return coords;
    }
  } catch (err) {
    console.error("Geocoding API error (Nominatim API might be rate-limited or offline):", query, err);
  }
  return null;
};

// Generates slightly offset coordinates around a center point so multiple fallbacks don't overlap
const getFallbackOffset = (center: [number, number], index: number): [number, number] => {
  const angle = (index * 0.95) % (2 * Math.PI);
  const radius = 0.015 + (index * 0.003) % 0.04; // offset radius in degrees
  return [
    center[0] + radius * Math.sin(angle),
    center[1] + radius * Math.cos(angle)
  ];
};

export default function DealerMap({ dealers, activeDealerId, onDealerClick, userAddress, activeFilters }: DealerMapProps) {
  const [leafletL, setLeafletL] = useState<any>(null);
  const [userCoords, setUserCoords] = useState<[number, number]>([18.5204, 73.8567]); // Default: Pune, India
  const [hasLocatedUser, setHasLocatedUser] = useState(false);

  const hasActiveFilters = activeFilters && (
    !!activeFilters.state || 
    !!activeFilters.district || 
    !!activeFilters.tehsil || 
    !!activeFilters.marketplace
  );
  
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);

  // 1. Load Leaflet dynamically on the client side to avoid SSR errors
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadLeaflet = async () => {
      try {
        const L = await import('leaflet');
        setLeafletL(L);
      } catch (err) {
        console.error("Failed to load Leaflet module:", err);
      }
    };
    loadLeaflet();
  }, []);

  // Helper to resolve coordinates from userAddress object sequentially
  const resolveAddressCoords = async (): Promise<[number, number] | null> => {
    if (!userAddress) return null;
    
    // Try multiple search queries from most specific to generic fallback
    const queries: string[] = [];
    
    if (userAddress.full_address) {
      queries.push(cleanGeocodeQuery(userAddress.full_address));
    }
    
    if (userAddress.pincode) {
      queries.push(`${userAddress.pincode}, India`);
    }
    
    if (userAddress.marketplace_name || userAddress.district_name) {
      queries.push(
        [userAddress.marketplace_name, userAddress.district_name, userAddress.state]
          .filter(Boolean)
          .join(', ')
      );
    }
    
    if (userAddress.tahshil_name) {
      queries.push(
        [userAddress.tahshil_name, userAddress.state, userAddress.pincode]
          .filter(Boolean)
          .join(', ')
      );
    }
    
    if (userAddress.state) {
      queries.push(`${userAddress.state}, India`);
    }

    const uniqueCleanedQueries = Array.from(
      new Set(
        queries
          .map(q => cleanGeocodeQuery(q))
          .filter(q => q.trim().length > 0)
      )
    );

    for (const query of uniqueCleanedQueries) {
      const coords = await getCoordinates(query);
      if (coords) return coords;
    }
    return null;
  };

  // 2. Initialize User Location on Load/Fallback
  useEffect(() => {
    const L = leafletL?.default || leafletL;
    if (!L) return;

    const initUserLocation = async () => {
      if (hasLocatedUser) return; // Maintain precise browser GPS if already granted

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const gpsCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
            setUserCoords(gpsCoords);
            setHasLocatedUser(true);
            if (leafletMap.current) {
              leafletMap.current.setView(gpsCoords, 11);
            }
          },
          async (error) => {
            console.log("Browser geolocation declined or failed. Falling back to profile address.", error);
            const addressCoords = await resolveAddressCoords();
            if (addressCoords) {
              setUserCoords(addressCoords);
              if (leafletMap.current) {
                leafletMap.current.setView(addressCoords, 11);
              }
            }
          },
          { timeout: 6000 }
        );
      } else {
        const addressCoords = await resolveAddressCoords();
        if (addressCoords) {
          setUserCoords(addressCoords);
          if (leafletMap.current) {
            leafletMap.current.setView(addressCoords, 11);
          }
        }
      }
    };

    initUserLocation();
  }, [userAddress, leafletL]);

  // 3. Initialize Leaflet Map Instance
  useEffect(() => {
    const L = leafletL?.default || leafletL;
    if (!L || !mapRef.current || leafletMap.current) return;

    leafletMap.current = L.map(mapRef.current, {
      zoomControl: false // Disable default zoom control to use our custom buttons
    }).setView(userCoords, 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap.current);

    // Force layout update after rendering
    setTimeout(() => {
      if (leafletMap.current) {
        leafletMap.current.invalidateSize();
      }
    }, 100);

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [leafletL]);

  // 4. Handle updating user location marker on the map
  useEffect(() => {
    const L = leafletL?.default || leafletL;
    if (!L || !leafletMap.current) return;

    // Clear old user marker and accuracy circle
    if (userMarkerRef.current) {
      leafletMap.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (userCircleRef.current) {
      leafletMap.current.removeLayer(userCircleRef.current);
      userCircleRef.current = null;
    }

    // Do not render user marker on the map if filters are active
    if (hasActiveFilters) {
      return;
    }

    const userPulseIcon = L.divIcon({
      html: `
        <div class="relative w-7 h-7 flex items-center justify-center">
          <div class="absolute w-full h-full rounded-full bg-blue-500 opacity-40 animate-ping"></div>
          <div class="relative w-4.5 h-4.5 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
        </div>
      `,
      className: 'user-pulse-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    userMarkerRef.current = L.marker(userCoords, { icon: userPulseIcon })
      .addTo(leafletMap.current)
      .bindPopup(`<div class="font-sans font-bold text-slate-800 text-xs">Your Location</div>`);

    userCircleRef.current = L.circle(userCoords, {
      radius: 1800, // 1.8km accuracy circle indicator
      fillColor: '#3b82f6',
      fillOpacity: 0.08,
      color: '#3b82f6',
      opacity: 0.15,
      weight: 1.5
    }).addTo(leafletMap.current);

  }, [userCoords, leafletL, activeFilters]);

  // 5. Geocode dealers and render markers dynamically
  useEffect(() => {
    const L = leafletL?.default || leafletL;
    if (!L || !leafletMap.current) return;

    let active = true;

    // Clear previous dealer markers
    markersRef.current.forEach(m => {
      if (leafletMap.current) {
        leafletMap.current.removeLayer(m.marker);
      }
    });
    markersRef.current = [];

    const loadDealerMarkers = async () => {
      const markersList: any[] = [];

      for (let i = 0; i < dealers.length; i++) {
        if (!active || !leafletMap.current) return;

        const dealer = dealers[i];
        const id = dealer.name || dealer.id;
        const name = dealer.shop_name || dealer.party_name || 'Authorized Dealer';

        // 1. Form geocode search query
        const searchQuery = [
          dealer.marketplace_name || dealer.marketplace,
          dealer.tahshil_name || dealer.tahshil,
          dealer.district_name || dealer.district,
          dealer.state,
          dealer.pincode
        ].filter(Boolean).join(', ');

        // 2. Fetch coordinates (with rate-limiting/stagger delay if not cached)
        const finalQuery = cleanGeocodeQuery(searchQuery || dealer.full_address);
        
        let isCached = false;
        try {
          isCached = !!geocodeCache[finalQuery] || (typeof window !== "undefined" && !!localStorage.getItem(`geocode_${finalQuery}`));
        } catch (e) {}

        if (!isCached && i > 0) {
          // Stagger requests to OpenStreetMap Nominatim by 1 second to comply with usage policy and avoid CORS block
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!active || !leafletMap.current) return;

        let coords = await getCoordinates(finalQuery);
        
        // Check active and map state again after await
        if (!active || !leafletMap.current) return;

        if (!coords) {
          // Stagger fallbacks around the user location to avoid grouping
          coords = getFallbackOffset(userCoords, i);
        }

        // 3. Create Custom Branded HTML Icon
        const isSelected = activeDealerId === id;
        const dealerIcon = L.divIcon({
          html: `
            <div class="flex items-center gap-1">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all transform hover:scale-110 ${
                isSelected ? 'bg-[#009933] ring-4 ring-[#009933]/30 scale-110' : 'bg-[#1F7A3D]'
              }">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="hidden sm:block bg-white/95 px-2 py-0.5 rounded border border-slate-200 shadow-sm text-[9px] font-extrabold text-slate-800 whitespace-nowrap">
                ${name.substring(0, 18)}${name.length > 18 ? '...' : ''}
              </div>
            </div>
          `,
          className: `dealer-marker-${id}`,
          iconSize: [110, 32],
          iconAnchor: [16, 16]
        });

        // 4. Create Marker & Bind Popup
        const marker = L.marker(coords, { icon: dealerIcon })
          .addTo(leafletMap.current)
          .on('click', () => {
            onDealerClick(id);
          });

        const popupContent = `
          <div class="font-sans p-1 text-slate-800 max-w-[200px]">
            <h4 class="font-bold text-xs text-[#154212] mb-1">${name}</h4>
            <p class="text-[10px] text-slate-500 mb-2 leading-relaxed">${dealer.full_address || searchQuery}</p>
            ${dealer.mobile_number ? `
              <div class="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <span>📞</span> ${dealer.mobile_number}
              </div>
            ` : ''}
          </div>
        `;
        marker.bindPopup(popupContent);

        markersList.push({
          id,
          coords,
          marker
        });
      }

      if (active && leafletMap.current) {
        markersRef.current = markersList;

        // Auto-fit map bounds to show all markers when filters are active
        if (markersList.length > 0 && hasActiveFilters) {
          const bounds = L.latLngBounds(markersList.map(m => m.coords));
          leafletMap.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
      }
    };

    loadDealerMarkers();

    return () => {
      active = false;
    };
  }, [dealers, leafletL, userCoords, activeDealerId, activeFilters]);

  // 6. Handle camera animations when activeDealerId changes
  useEffect(() => {
    if (!leafletMap.current || !activeDealerId) return;

    const matched = markersRef.current.find(m => m.id === activeDealerId);
    if (matched) {
      leafletMap.current.setView(matched.coords, 14, {
        animate: true,
        duration: 1.2
      });
      matched.marker.openPopup();
    }
  }, [activeDealerId]);

  // Map Controls triggers
  const zoomIn = () => {
    if (leafletMap.current) {
      leafletMap.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (leafletMap.current) {
      leafletMap.current.zoomOut();
    }
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const gpsCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserCoords(gpsCoords);
          setHasLocatedUser(true);
          if (leafletMap.current) {
            leafletMap.current.setView(gpsCoords, 13, {
              animate: true,
              duration: 1
            });
          }
        },
        (error) => {
          console.error("Browser geolocation error:", error);
          alert("Could not get your location. Please check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="relative w-full h-[650px] lg:h-full min-h-[600px] rounded-2xl overflow-hidden border border-gray-250 shadow-sm bg-slate-50 font-sans">
      
      {/* Dynamic Leaflet OSM Map Canvas container */}
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Bottom Left Badge */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-md flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#009933] animate-pulse" />
        <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase">
          {dealers.length} ACTIVE {dealers.length === 1 ? 'DEALER' : 'DEALERS'} FOUND
        </span>
      </div>

      {/* Map Interactive Zoom & Locate Controls Overlay */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={locateUser}
          aria-label="My location"
          className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <LocateFixed className="w-5 h-5 text-[#009933]" />
        </button>
      </div>

    </div>
  );
}
