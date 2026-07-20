import React from 'react';
import Header from '../home/Header';
import Footer from '../home/Footer';
import WarrantyHero from './WarrantyHero';
import WarrantyStepper from './WarrantyStepper';
import WarrantyRegistrationForm from './WarrantyRegistrationForm';
import WhyRegisterSection from './WhyRegisterSection';
import WarrantyFAQSection from './WarrantyFAQSection';
import Container from '../common/Container';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WarrantyLandingPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb Section */}
        <section className="w-full bg-white h-[80px] border-b border-[#ECECEC] flex items-center">
          <Container>
            <div className="flex items-center gap-2 font-sans font-normal text-[16px]">
              <Link href="/" className="text-[#42493E] hover:text-[#154212] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#8A9484]" />
              <Link href="/products" className="text-[#42493E] hover:text-[#154212] transition-colors">
                Product
              </Link>
              <ChevronRight className="w-4 h-4 text-[#8A9484]" />
              <span className="text-[#154212]">
                Warranty Registration
              </span>
            </div>
          </Container>
        </section>

        {/* Hero Section */}
        <WarrantyHero />

        {/* Stepper Section */}
        <WarrantyStepper />
        
        {/* Form Section */}
        <WarrantyRegistrationForm />
        
        {/* Why Register Section */}
        <WhyRegisterSection />
        
        {/* FAQ Section */}
        <WarrantyFAQSection />
        
      </main>

      <Footer />
    </div>
  );
}
