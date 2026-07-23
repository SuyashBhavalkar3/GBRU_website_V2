import ProductDetailPage from "@/app/component/all_products/ProductDetailPage";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId || "Product";
  const formattedProduct = productId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${formattedProduct} Details & Manuals | GBRU`,
    description: `Full specs, video installation guides, user manuals, and warranty details for ${formattedProduct}.`,
  };
}

export default async function ProductDetailPageRoute({ params }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.category;
  const productId = resolvedParams?.productId;

  return <ProductDetailPage categorySlug={categorySlug} productId={productId} />;
}
