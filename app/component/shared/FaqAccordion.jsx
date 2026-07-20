"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggle(index);
              }}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="font-extrabold text-slate-900 text-sm sm:text-base pr-4">
                {item.question}
              </span>
              <div className="text-slate-400 shrink-0">
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 md:px-6 md:pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
