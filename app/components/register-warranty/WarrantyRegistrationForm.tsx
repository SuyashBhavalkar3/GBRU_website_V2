'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Container from '../common/Container';
import { ChevronDown, FileUp, Camera } from 'lucide-react';

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10 last:mb-0">
    <div className="border-b border-[#E5E7EB] pb-3 mb-6">
      <h2 className="font-semibold text-[18px] text-[#154212] font-sans">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  isSelect?: boolean;
};

const FormField = ({ label, placeholder, type = 'text', fullWidth = false, isSelect = false }: InputProps) => (
  <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
    {label && (
      <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
        {label}
      </label>
    )}
    <div className="relative">
      {isSelect ? (
        <select 
          className="w-full h-[52px] px-4 rounded-[8px] border border-[#D1D5DB] bg-white text-[15px] text-[#42493E] focus:outline-none focus:border-[#009933] focus:ring-1 focus:ring-[#009933] appearance-none font-geist cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled className="text-[#9CA3AF]">{placeholder}</option>
        </select>
      ) : (
        <input 
          type={type}
          placeholder={placeholder}
          className="w-full h-[52px] px-4 rounded-[8px] border border-[#D1D5DB] bg-white text-[15px] text-[#42493E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#009933] focus:ring-1 focus:ring-[#009933] font-geist"
        />
      )}
      {isSelect && (
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
      )}
    </div>
  </div>
);

export default function WarrantyRegistrationForm() {
  const router = useRouter();
  const tWar = useTranslations('warranty');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/warranty-success');
  };

  return (
    <section id="warranty-registration-form" className="w-full bg-[#F5F5F5] py-12 md:py-[80px]">
      <Container>
        <div className="w-full max-w-[1120px] mx-auto bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden shadow-[0px_8px_32px_rgba(0,0,0,0.04)]">
          
          {/* Form Header */}
          <div className="w-full h-auto md:h-[96px] bg-[#009933] px-6 py-5 md:px-[40px] flex flex-col justify-center">
            <h1 className="font-bold text-[24px] md:text-[28px] text-white font-sans">
              {tWar('formHeaderTitle')}
            </h1>
            <p className="font-normal text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] font-geist mt-1 md:mt-2">
              {tWar('formHeaderSub')}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-[40px]">
            <form onSubmit={handleSubmit}>
              
              {/* SECTION 1 */}
              <FormSection title={tWar('sec1Title')}>
                <FormField label={tWar('productName')} placeholder={tWar('selectProduct')} isSelect />
                <FormField label={tWar('modelNumber')} placeholder={tWar('modelPlaceholder')} />
                <FormField label={tWar('serialNumber')} placeholder={tWar('serialPlaceholder')} />
                <FormField label={tWar('purchaseDate')} placeholder="mm / dd / yyyy" type="date" />
                <FormField label={tWar('dealerName')} placeholder={tWar('dealerPlaceholder')} fullWidth />
                <FormField label={tWar('dealerInfo')} placeholder={tWar('dealerState')} isSelect />
                <FormField label="" placeholder={tWar('dealerDistrict')} isSelect />
                <FormField label="" placeholder={tWar('dealerTehsil')} isSelect />
                <FormField label="" placeholder={tWar('dealerMarketplace')} isSelect />
              </FormSection>

              {/* SECTION 2 */}
              <FormSection title={tWar('sec2Title')}>
                <FormField label={tWar('customerName')} placeholder={tWar('fullNamePlaceholder')} />
                <FormField label={tWar('mobileNumber')} placeholder="+91 00000 00000" />
                <FormField label={tWar('emailAddress')} placeholder="name@example.com" fullWidth />
                <FormField label={tWar('state')} placeholder={tWar('selectState')} isSelect />
                <FormField label={tWar('district')} placeholder={tWar('district')} />
                <FormField label={tWar('villageCity')} placeholder={tWar('villageCityPlaceholder')} fullWidth />
              </FormSection>

              {/* SECTION 3 */}
              <FormSection title={tWar('sec3Title')}>
                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
                    {tWar('invoiceCopy')}
                  </label>
                  <button type="button" className="w-full h-[120px] rounded-[12px] border-2 border-dashed border-[#D1D5DB] bg-white flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileUp className="w-6 h-6 text-[#6B7280]" />
                    <span className="font-normal text-[14px] text-[#6B7280] font-geist">
                      {tWar('dragDrop')} <span className="text-[#009933]">{tWar('browse')}</span>
                    </span>
                  </button>
                </div>

                <div className="flex flex-col">
                  <label className="font-medium text-[14px] text-[#42493E] mb-2 font-geist">
                    {tWar('productPhoto')}
                  </label>
                  <button type="button" className="w-full h-[120px] rounded-[12px] border-2 border-dashed border-[#D1D5DB] bg-white flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
                    <Camera className="w-6 h-6 text-[#6B7280]" />
                    <span className="font-normal text-[14px] text-[#6B7280] font-geist">
                      {tWar('dragDrop')} <span className="text-[#009933]">{tWar('browse')}</span>
                    </span>
                  </button>
                </div>
              </FormSection>

              {/* Submit Section */}
              <div className="mt-[48px] flex flex-col items-center">
                <button 
                  type="submit"
                  className="bg-[#009933] hover:bg-[#00852B] text-white font-semibold text-[18px] font-sans h-[56px] w-full max-w-[420px] rounded-[10px] shadow-[0px_8px_20px_rgba(0,153,51,0.25)] transition-all cursor-pointer"
                >
                  {tWar('submitButton')}
                </button>
                <p className="mt-4 font-normal text-[12px] text-[#6B7280] font-geist text-center">
                  {tWar('termsText')}{' '}
                  <a href="#" className="text-[#154212] underline">
                    {tWar('termsLink')}
                  </a>{' '}
                  {tWar('termsTextEnd')}
                </p>
              </div>

            </form>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
