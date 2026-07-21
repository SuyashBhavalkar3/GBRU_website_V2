'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Container from '../common/Container';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-[12px] overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-[16px] text-[#42493E] font-sans">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#42493E] shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#42493E] shrink-0 ml-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-2">
          <p 
            className="font-normal text-[15px] text-[#6B7280] leading-[1.6]"
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default function WarrantyFAQSection() {
  const tWar = useTranslations('warranty');

  const faqs = [
    {
      question: tWar('faq1Q'),
      answer: tWar('faq1A'),
    },
    {
      question: tWar('faq2Q'),
      answer: tWar('faq2A'),
    },
    {
      question: tWar('faq3Q'),
      answer: tWar('faq3A'),
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <Container>
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">
          
          <h2 className="font-semibold text-[24px] md:text-[32px] text-[#154212] font-sans mb-10">
            {tWar('faqHeading')}
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
