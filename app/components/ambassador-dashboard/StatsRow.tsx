import React from 'react';
import { Users, CheckCircle2, Banknote } from 'lucide-react';
import { MOCK_STATS, Stat } from './data';

const getStatIcon = (iconName: Stat['iconName']) => {
  switch (iconName) {
    case 'users':
      return <Users className="w-5 h-5 text-[#00A63E]" />;
    case 'check-circle':
      return <CheckCircle2 className="w-5 h-5 text-[#00A63E]" />;
    case 'banknote':
      return <Banknote className="w-5 h-5 text-[#00A63E]" />;
    default:
      return null;
  }
};

export default function StatsRow() {
  return (
    <section className="w-full my-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {MOCK_STATS.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-md"
          >
            {/* Top Light-Green Circle Icon Badge */}
            <div className="w-11 h-11 rounded-full bg-[#00A63E]/10 flex items-center justify-center mb-3">
              {getStatIcon(stat.iconName)}
            </div>

            {/* Label */}
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest font-sans mb-1">
              {stat.label}
            </span>

            {/* Value */}
            <span className="text-[32px] sm:text-[36px] font-bold text-[#00A63E] font-sans leading-tight">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
