import React from 'react';
import DealerCard from './DealerCard';
import { MOCK_DEALERS } from './data';

export default function DealerList() {
  return (
    <div className="flex flex-col gap-4">
      {/* Results Header */}
      <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-1">
        5 RESULTS FOUND
      </div>

      {/* Dealer Cards Stack */}
      <div className="flex flex-col gap-4">
        {MOCK_DEALERS.map((dealer) => (
          <DealerCard key={dealer.id} dealer={dealer} />
        ))}
      </div>
    </div>
  );
}
