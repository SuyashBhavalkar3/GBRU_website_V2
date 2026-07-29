import React from 'react';
import DealerCard from './DealerCard';
import { Loader2 } from 'lucide-react';

interface DealerListProps {
  dealers: any[];
  isLoading: boolean;
  activeDealerId: string | null;
  onDealerClick: (id: string) => void;
  paginationInfo: {
    page: number;
    page_length: number;
    total_count: number;
    total_pages: number;
  } | null;
  onPageChange: (page: number) => void;
}

export default function DealerList({
  dealers,
  isLoading,
  activeDealerId,
  onDealerClick,
  paginationInfo,
  onPageChange
}: DealerListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
        <Loader2 className="w-8 h-8 text-[#009933] animate-spin mb-4" />
        <p className="text-gray-500 text-sm font-geist">Locating authorized dealers...</p>
      </div>
    );
  }

  if (!dealers || dealers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm text-center font-sans">
        <p className="text-gray-700 font-bold text-lg mb-2">No Dealers Found</p>
        <p className="text-gray-400 text-sm max-w-[280px] font-geist">
          Try selecting a different State, District, Tehsil, or Marketplace using the filters.
        </p>
      </div>
    );
  }

  const getPageNumbers = (current: number, total: number) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, '...', total);
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Results Header */}
      <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">
        {paginationInfo ? paginationInfo.total_count : dealers.length} {((paginationInfo ? paginationInfo.total_count : dealers.length) === 1) ? 'RESULT' : 'RESULTS'} FOUND
      </div>

      {/* Dealer Cards Stack */}
      <div className="flex flex-col gap-4 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
        {dealers.map((dealer) => {
          const id = dealer.name || dealer.id;
          const isExpanded = activeDealerId === id;
          return (
            <div
              key={id}
              onClick={() => onDealerClick(id)}
              className="cursor-pointer"
            >
              <DealerCard dealer={{ ...dealer, expanded: isExpanded }} />
            </div>
          );
        })}
      </div>

      {/* Pagination anchored at the bottom (outside scrollable area) */}
      {paginationInfo && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between py-4 px-2 border-t border-gray-150 mt-4 text-xs text-gray-500 font-sans">
          <span className="font-semibold">
            Showing {(paginationInfo.page - 1) * paginationInfo.page_length + 1} - {Math.min(paginationInfo.page * paginationInfo.page_length, paginationInfo.total_count)} of {paginationInfo.total_count}
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={paginationInfo.page === 1}
              onClick={() => onPageChange(paginationInfo.page - 1)}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all text-[#154212] cursor-pointer"
            >
              Prev
            </button>
            
            {getPageNumbers(paginationInfo.page, paginationInfo.total_pages).map((p, index) => {
              if (p === '...') {
                return (
                  <span key={`dots-${index}`} className="px-1.5 text-gray-400 font-medium">
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={p}
                  disabled={paginationInfo.page === p}
                  onClick={() => onPageChange(p as number)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer disabled:opacity-100 ${
                    paginationInfo.page === p
                      ? 'bg-[#154212] text-white'
                      : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              disabled={paginationInfo.page === paginationInfo.total_pages}
              onClick={() => onPageChange(paginationInfo.page + 1)}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all text-[#154212] cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
