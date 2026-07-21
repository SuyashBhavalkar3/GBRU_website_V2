import React from 'react';
import { Referral, STATUS_STYLES } from './data';

interface ReferralsTableProps {
  referrals: Referral[];
}

export default function ReferralsTable({ referrals }: ReferralsTableProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-[#F3F4F6] border-b border-gray-200 text-[12px] font-bold text-gray-700 uppercase tracking-wider font-sans">
              <th scope="col" className="py-4 px-6 font-bold">
                Farmer Name
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                Mobile Number
              </th>
              <th scope="col" className="py-4 px-6 font-bold">
                Date Referred
              </th>
              <th scope="col" className="py-4 px-6 font-bold text-right sm:text-left">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 font-sans">
            {referrals.map((item) => {
              const style = STATUS_STYLES[item.status];

              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  
                  {/* Column 1: Farmer Name */}
                  <td className="py-4.5 px-6">
                    <div className="flex items-center gap-3.5">
                      {/* Initials Circular Badge */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] font-sans shrink-0 shadow-2xs ${item.avatarBg} ${item.avatarText}`}
                      >
                        {item.initials}
                      </div>

                      {/* Name & Sub-label Stack */}
                      <div className="flex flex-col">
                        <span className="font-bold text-[15px] text-gray-900 leading-snug">
                          {item.name}
                        </span>
                        <span className="text-[12px] text-gray-500 font-normal">
                          {item.subLabel}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Mobile Number */}
                  <td className="py-4.5 px-6 text-[14px] text-gray-700 font-medium">
                    {item.mobile}
                  </td>

                  {/* Column 3: Date Referred */}
                  <td className="py-4.5 px-6 text-[14px] text-gray-700 font-normal">
                    {item.dateReferred}
                  </td>

                  {/* Column 4: Status Pill Badge */}
                  <td className="py-4.5 px-6 text-right sm:text-left">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold ${style.bgClass} ${style.textClass} shadow-2xs`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dotClass}`} />
                      {style.label}
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
