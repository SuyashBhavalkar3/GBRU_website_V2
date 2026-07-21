'use client';

import React, { useState } from 'react';
import Header from './Header';
import WelcomeBanner from './WelcomeBanner';
import StatsRow from './StatsRow';
import ReferralToolkit from './ReferralToolkit';
import NavTabs, { TabType } from './NavTabs';
import JourneyProgress from './JourneyProgress';
import MyReferralsView from './MyReferralsView';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

export default function AmbassadorDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('invite');

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      
      {/* 1. Navigation Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        
        {/* Top Section: Welcome Banner, Stats, and Toolkit for 'invite' tab */}
        {activeTab === 'invite' && (
          <>
            {/* 2. Welcome Banner */}
            <WelcomeBanner />

            {/* 3. Referral Stats Row */}
            <StatsRow />

            {/* 4. Personal Referral Toolkit */}
            <ReferralToolkit />
          </>
        )}

        {/* 5. Persistent Navigation Tabs */}
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 6. Persistent Your Journey Progress Card */}
        <JourneyProgress />

        {/* 7. Tab-Specific Content */}
        {activeTab === 'referrals' && <MyReferralsView />}

        {activeTab === 'rewards' && (
          <section className="w-full my-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <h2 className="font-bold text-[22px] text-[#00A63E] mb-2 font-sans">
              Reward Policy & Guidelines
            </h2>
            <p className="text-[14px] text-gray-600 max-w-[600px] mx-auto">
              Earn ₹500 for every verified farmer warranty registration. Higher ambassador tiers unlock exclusive quarterly performance bonuses.
            </p>
          </section>
        )}

        {activeTab === 'support' && (
          <section className="w-full my-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <h2 className="font-bold text-[22px] text-[#00A63E] mb-2 font-sans">
              Ambassador Support Desk
            </h2>
            <p className="text-[14px] text-gray-600 max-w-[600px] mx-auto">
              Need assistance with farmer referrals or warranty verification? Call our dedicated help line at 1800-419-4278.
            </p>
          </section>
        )}

        {/* 8. Persistent How it Works Card */}
        <HowItWorks />

      </main>

      {/* 9. Footer */}
      <Footer />

    </div>
  );
}
