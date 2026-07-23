"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Navbar from "@/app/component/all_products/Navbar";
import Footer from "@/app/component/all_products/Footer";
import StepperTimeline from "@/app/component/shared/StepperTimeline";
import TierCard from "@/app/component/shared/TierCard";
import FaqAccordion from "@/app/component/shared/FaqAccordion";
import EligibilityCheckModal from "./EligibilityCheckModal";
import {
  Sprout,
  Gift,
  Star,
  TrendingUp,
  Medal,
  Award,
  Trophy,
  Gem,
  Percent,
  Banknote,
  FileText,
  Headphones,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function AmbassadorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tAmb = useTranslations('ambassadorPage');
  const tCommon = useTranslations('common');

  const journeySteps = [
    {
      number: 1,
      title: "Check Eligibility",
      description: "Simply verify your mobile number to get started.",
    },
    {
      number: 2,
      title: "Recommend",
      description: "Share products with your network of fellow farmers.",
    },
    {
      number: 3,
      title: "Purchase",
      description: "Your community makes their first technological upgrade.",
    },
    {
      number: 4,
      title: "Earn",
      description: "Receive rewards and scale your ambassador levels.",
    },
  ];

  const ambassadorFaqs = [
    {
      question: tAmb('faq1Q'),
      answer: tAmb('faq1A'),
    },
    {
      question: tAmb('faq2Q'),
      answer: tAmb('faq2A'),
    },
    {
      question: tAmb('faq3Q'),
      answer: tAmb('faq3A'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Text (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h1 className="text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] font-bold text-[#154212] mb-4">
              {tAmb('headingPrefix')}{" "}
              <span className="text-[#00a859]">{tAmb('headingHighlight')}</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[480px]">
              {tAmb('heroDesc')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#00a859] hover:bg-[#00924d] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                {tCommon('checkEligibility')}
              </button>

              <a
                href="#journey"
                className="border-2 border-[#00a859] text-[#00a859] hover:bg-[#e6f4ea] px-7 py-3.5 rounded-full font-bold text-sm bg-white transition-all cursor-pointer inline-block"
              >
                {tCommon('learnHowItWorks')}
              </a>
            </div>

            <p className="text-[11px] text-slate-400 font-medium italic mt-3">
              {tAmb('eligibilityNote')}
            </p>
          </div>

          {/* Right Column Graphic Card (6 Cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] aspect-[16/9] rounded-[28px] overflow-hidden shadow-xl border border-slate-100 bg-[#083b16]">
              <Image
                src="/all_products/ambassador.png"
                alt="GBRU Brand Ambassador Graphic"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain sm:object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* "Why Become an Ambassador?" Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading with Green Accent Line */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] mb-2">
              Why Become an Ambassador?
            </h2>
            <div className="w-12 h-1 bg-[#00a859] rounded-full mx-auto" />
          </div>

          {/* 4 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-[#1c2e22] text-base sm:text-lg mb-2">
                  Impact
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Lead the transformation of your community with sustainable practices.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-[#1c2e22] text-base sm:text-lg mb-2">
                  Rewards
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Earn cashbacks and bonuses for every successful referral.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-[#1c2e22] text-base sm:text-lg mb-2">
                  Recognition
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Gain status as a verified community leader and tech innovator.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col justify-between text-left hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-[#1c2e22] text-base sm:text-lg mb-2">
                  Growth
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Exclusive access to training, workshops, and farming insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "The Journey to Success" Section */}
      <section className="bg-[#f4f6f4] py-16 px-4 sm:px-6 lg:px-8" id="journey">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27]">
              The Journey to Success
            </h2>
          </div>

          <StepperTimeline steps={journeySteps} />
        </div>
      </section>

      {/* "Climb the Success Tiers" Section */}
      <section className="bg-[#f4f6f4] pb-20 px-4 sm:px-6 lg:px-8" id="tiers">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] mb-2">
              Climb the Success Tiers
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              The more you share, the higher your status and the bigger your benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TierCard
              name="Bronze Ambassador"
              icon={Medal}
              badgeBgClass="bg-[#b85c14] text-white"
              tagText="Refer 1-5 Farmers"
              criteria="Start your journey and build your local farming network."
              reward="Reward: Exclusive Merch"
            />
            <TierCard
              name="Silver Ambassador"
              icon={Award}
              badgeBgClass="bg-[#94a3b8] text-white"
              tagText="Refer 5-15 Farmers"
              criteria="A recognized voice in the community with growing influence."
              reward="Reward: Service Discounts"
            />
            <TierCard
              name="Gold Ambassador"
              icon={Trophy}
              badgeBgClass="bg-[#eab308] text-white"
              tagText="Refer 15-30 Farmers"
              criteria="A key partner driving agricultural innovation forward."
              reward="Reward: Cash Rewards"
            />
            <TierCard
              name="Diamond Ambassador"
              icon={Gem}
              badgeBgClass="bg-[#64748b] text-white"
              tagText="Refer 30+ Farmers"
              criteria="The ultimate tier for our most dedicated brand leaders."
              reward="Reward: VIP Event Access"
            />
          </div>
        </div>
      </section>

      {/* Exclusive Rewards & Benefits Section */}
      <section className="bg-[#f4f6f4] py-16 px-4 sm:px-6 lg:px-8" id="benefits">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27] mb-2">
              Exclusive Rewards & Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Instant Cashback */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-2">
                Instant Cashback
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                Direct credit to your bank account for every new purchase made by your referrals.
              </p>
            </div>

            {/* Card 2: Service Discounts */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-2">
                Service Discounts
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                Up to 25% off on premium equipment consultation and equipment rentals.
              </p>
            </div>

            {/* Card 3: VIP Events */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-2">
                VIP Events
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                Invitations to regional agri-tech seminars and networking dinners with experts.
              </p>
            </div>

            {/* Card 4: Technical Priority */}
            <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col items-center justify-center text-center min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-[#e8f7eb] text-[#00a859] flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1c2e22] text-base mb-2">
                Technical Priority
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                Dedicated support line for your own farming operation. 24/7 priority service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section with stylized opening double quote matching attached screenshot */}
      <section className="bg-[#00a859] py-16 px-4 sm:px-6 lg:px-8 text-white" id="testimonial">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Image (5 Cols) with real human.png turbaned farmer image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] h-[320px] sm:h-[360px] rounded-[28px] overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/all_products/human.png"
                alt="Rajesh Kumar Punjab Gold Ambassador"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column Quote Text & Navigation Arrows (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Opening Double Quotation Mark (renders as filled 99 shape) */}
            <span className="text-6xl sm:text-7xl font-serif text-emerald-200/90 leading-none select-none font-bold block -mb-2">
              “
            </span>

            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-relaxed italic">
              "Being an ambassador has allowed me to help my neighbors access the best technology while growing my own farm with exclusive rewards."
            </p>

            <div>
              <h4 className="font-extrabold text-white text-base">Rajesh Kumar</h4>
              <p className="text-emerald-100 text-xs font-medium">Punjab Gold Ambassador</p>
            </div>

            {/* Navigation Arrows Row */}
            <div className="flex items-center gap-3 pt-2">
              <button
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="bg-[#f4f6f4] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c3a27]">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={ambassadorFaqs} />
        </div>
      </section>

      {/* Final CTA Banner Section */}
      <section className="bg-[#f4f6f4] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#008a46] rounded-[28px] p-10 sm:p-14 text-white text-center shadow-xl space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Start Your Leadership Journey Today
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Don't just farm for yourself. Empower your entire community and reap the rewards of modernization.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#005c2d] hover:bg-[#004a24] text-white px-8 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all cursor-pointer inline-block"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Modal Flow Overlay */}
      <EligibilityCheckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

