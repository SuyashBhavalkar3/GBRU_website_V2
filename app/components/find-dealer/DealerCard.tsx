import React from 'react';
import { Dealer } from './data';
import { MapPin, Phone, Clock, Navigation, Star } from 'lucide-react';

interface DealerCardProps {
  dealer: Dealer;
}

export default function DealerCard({ dealer }: DealerCardProps) {
  const isExpanded = dealer.expanded;

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
        <div>
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
          {dealer.rating && (
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <span className="text-[12px] font-medium text-gray-600 ml-1">
                {dealer.rating}
              </span>
            </div>
          )}
        </div>

        <span className="text-[13px] font-semibold text-gray-500">
          {dealer.distance}
        </span>
      </div>

      {/* Dealer Name */}
      <h3 className="font-bold text-[18px] text-[#1A1A1A] mb-2 font-sans">
        {dealer.name}
      </h3>

      {/* Details List */}
      <div className="flex flex-col gap-1.5 text-[13px] text-gray-600 mb-3">
        {/* Address */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <span>{dealer.address}</span>
        </div>

        {/* Phone */}
        {dealer.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{dealer.phone}</span>
          </div>
        )}

        {/* Hours */}
        {dealer.hours && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{dealer.hours}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {dealer.tags && dealer.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dealer.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons (Expanded View Only) */}
      {isExpanded && (
        <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            className="w-full h-11 bg-[#009933] hover:bg-[#00852B] text-white font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 fill-current" />
            Directions
          </button>

          <button
            type="button"
            className="w-full h-11 bg-white border border-[#009933] text-[#009933] hover:bg-[#009933]/5 font-semibold text-[14px] rounded-lg flex items-center justify-center transition-colors"
          >
            Contact Dealer
          </button>
        </div>
      )}
    </div>
  );
}
