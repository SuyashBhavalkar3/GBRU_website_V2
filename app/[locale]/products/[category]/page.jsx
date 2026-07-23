import ProductListPage from "@/app/component/all_products/ProductListPage";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams?.category || "Category";
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ");

  return {
    title: `${formattedCategory} Knowledge Hub | GBRU`,
    description: `Access technical documentation, installation videos, and product specs for ${formattedCategory} models.`,
  };
}

export default async function CategoryPageRoute({ params }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category;

  return <ProductListPage categorySlug={categorySlug} />;
}
