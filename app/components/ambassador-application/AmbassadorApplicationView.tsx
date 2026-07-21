import React from 'react';
import Header from './Header';
import AmbassadorHero from './AmbassadorHero';
import SubmissionDetailsCard from './SubmissionDetailsCard';
import ProcessTimelineCard from './ProcessTimelineCard';
import NeedHelpFooterRow from './NeedHelpFooterRow';
import Footer from './Footer';
import { MOCK_SUBMISSION_DETAILS, MOCK_TIMELINE_STEPS } from './data';

export const metadata = {
  title: 'Application Under Review - GBRU Brand Ambassador',
  description: 'Track the live status of your GBRU Brand Ambassador application.',
};

export default function AmbassadorApplicationPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col font-sans">
      
      {/* 1. Top Navigation Bar */}
      <Header />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        
        {/* 2. Hero Section */}
        <AmbassadorHero />

        {/* 3. Details & Timeline 2-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 items-stretch">
          
          {/* 3a. Submission Details Card (Left Column) */}
          <SubmissionDetailsCard details={MOCK_SUBMISSION_DETAILS} />

          {/* 3b. Process Timeline Card (Right Column) */}
          <ProcessTimelineCard steps={MOCK_TIMELINE_STEPS} />

        </section>

        {/* 4. Need Help + CTA Row */}
        <NeedHelpFooterRow />

      </main>

      {/* 5. Footer */}
      <Footer />

    </div>
  );
}
