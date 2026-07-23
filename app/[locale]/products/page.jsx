import React, { Suspense } from "react";
import CategoryPage from "@/app/component/all_products/CategoryPage";

export const metadata = {
  title: "Explore Product Categories | GBRU Agri-Knowledge Hub",
  description: "Browse GBRU precision seeders, irrigation systems, controllers, farm machinery, solar setups, and maintenance kits.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00a859]/30 border-t-[#00a859]"></div>
      </div>
    }>
      <CategoryPage />
    </Suspense>
  );
}
