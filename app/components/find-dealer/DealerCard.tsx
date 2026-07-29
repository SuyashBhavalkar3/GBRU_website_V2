import React from 'react';
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';

interface DealerCardProps {
  dealer: {
    id?: string;
    name?: string;
    party_name?: string;
    shop_name?: string;
    mobile_number?: string;
    phone?: string;
    full_address?: string;
    address?: string;
    distance?: string;
    hours?: string;
    tags?: string[];
    badgeLabel?: string;
    badgeVariant?: 'top-rated' | 'processing' | 'partner' | 'none';
    rating?: number;
    expanded?: boolean;
  };
}

export default function DealerCard({ dealer }: DealerCardProps) {
  const isExpanded = dealer.expanded;

  const displayName = dealer.shop_name || dealer.party_name || dealer.name || 'Unnamed Dealer';
  const displayAddress = dealer.full_address || dealer.address || 'Address not available';
  const displayPhone = dealer.mobile_number || dealer.phone;
  const displayDistance = dealer.distance || 'Official Dealer';
  const displayHours = dealer.hours || 'Open: 9:00 AM - 6:00 PM';
  const displayTags = dealer.tags && dealer.tags.length > 0 ? dealer.tags : ['DEALER', 'VERIFIED'];
  const displayRating = dealer.rating || 5.0;

  return (
    <div
      className={`bg-white rounded-xl p-5 border transition-all ${
        isExpanded
          ? 'border-[#009933] ring-1 ring-[#009933]/20 shadow-md'
          : 'border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      {/* Top Header: Badge / Rating & Distance */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {dealer.badgeVariant === 'top-rated' && (
            <span className="inline-block bg-[#009933] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {dealer.badgeLabel || 'TOP RATED'}
            </span>
          )}
          {dealer.badgeVariant === 'processing' && (
            <span className="inline-block bg-gray-100 text-gray-500 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
              {dealer.badgeLabel || 'Processing...'}
            </span>
          )}
          {dealer.badgeVariant === 'partner' && (
            <span className="inline-block border border-gray-300 text-gray-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
              {dealer.badgeLabel || 'Official Partner'}
            </span>
          )}
          {!dealer.badgeVariant && (
            <span className="inline-block bg-[#EBFDF2] text-[#009933] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#009933]/10">
              AUTHORIZED
            </span>
          )}
          
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-[12px] font-semibold text-gray-600">
              {displayRating}
            </span>
          </div>
        </div>

        <span className="text-[12px] font-semibold text-[#009933] bg-[#EBFDF2] px-2 py-0.5 rounded">
          {displayDistance}
        </span>
      </div>

      {/* Dealer Name */}
      <h3 className="font-bold text-[18px] text-[#1A1A1A] mb-2 font-sans">
        {displayName}
      </h3>

      {/* Details List */}
      <div className="flex flex-col gap-1.5 text-[13px] text-gray-600 mb-3 font-geist">
        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <span>{displayAddress}</span>
        </div>

        {/* Phone */}
        {displayPhone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
            <a href={`tel:${displayPhone}`} className="hover:text-[#009933] transition-colors">{displayPhone}</a>
          </div>
        )}

        {/* Hours */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{displayHours}</span>
        </div>
      </div>

      {/* Tags */}
      {displayTags && displayTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayTags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase font-sans"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons (Expanded View Only) */}
      {isExpanded && (
        <div className="flex flex-col gap-2.5 pt-3 mt-3 border-t border-gray-100 font-sans">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayName + ' ' + displayAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-[#009933] hover:bg-[#00852B] text-white font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 fill-current" />
            Directions on Google Maps
          </a>

          {displayPhone && (
            <a
              href={`tel:${displayPhone}`}
              className="w-full h-11 bg-white border border-[#009933] text-[#009933] hover:bg-[#009933]/5 font-semibold text-[14px] rounded-lg flex items-center justify-center transition-colors"
            >
              Contact Dealer
            </a>
          )}
        </div>
      )}
    </div>
  );
}
