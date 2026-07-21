'use client';

import React from 'react';
import { UserPlus, ListChecks, ShieldCheck, Headset } from 'lucide-react';

export type TabType = 'invite' | 'referrals' | 'rewards' | 'support';

interface NavTabsProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export default function NavTabs({ activeTab = 'invite', onTabChange }: NavTabsProps) {
  const tabs = [
    {
      id: 'invite' as TabType,
      label: 'Invite Farmers',
      icon: UserPlus,
    },
    {
      id: 'referrals' as TabType,
      label: 'My Referrals',
      icon: ListChecks,
    },
    {
      id: 'rewards' as TabType,
      label: 'Reward Policy',
      icon: ShieldCheck,
    },
    {
      id: 'support' as TabType,
      label: 'Support',
      icon: Headset,
    },
  ];

  return (
    <section className="w-full my-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              style={isActive ? { background: 'linear-gradient(90deg, #00A63E 0%, #008C34 100%)' } : undefined}
              className={`rounded-2xl p-5 border transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                isActive
                  ? 'border-[#008C34] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-800 hover:border-[#00A63E]/40 hover:shadow-sm'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#1B6E33]/10 text-[#1B6E33]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <span className={`font-bold text-[14px] sm:text-[15px] font-sans ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
