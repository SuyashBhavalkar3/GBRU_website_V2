import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ActionCardsSection from './ActionCardsSection';
import ProductCategoriesSection from './ProductCategoriesSection';
import PopularProductsSection from './PopularProductsSection';
import BrandAmbassadorSection from './BrandAmbassadorSection';
import SupportServicesSection from './SupportServicesSection';
import Footer from './Footer';
import Container from '../common/Container';

export default function HomePage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Container>
          <HeroSection />
          <ActionCardsSection />
          <ProductCategoriesSection />
        </Container>
        <PopularProductsSection />
        <BrandAmbassadorSection />
        <SupportServicesSection />
        <Footer />
      </main>
    </div>
  );
}
