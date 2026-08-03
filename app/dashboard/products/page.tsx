import React from 'react';
import Products from '@/components/Products';

export const metadata = {
  title: 'Products (Dashboard) - GBRU',
  description: 'View products in this category.',
};

export default function DashboardProductsPage() {
  // Authentication checking can be added here
  return <Products />;
}
