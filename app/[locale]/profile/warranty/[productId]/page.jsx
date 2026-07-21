import WarrantyDetailPage from "@/app/component/profile/WarrantyDetailPage";

export const metadata = {
  title: "Warranty Details | GORU Agri-Portal",
  description: "Detailed warranty coverage, timeline, documents, and maintenance logs for your GORU equipment.",
};

export default async function WarrantyDetailRoute({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId || "seeder-pro-x";

  return <WarrantyDetailPage productId={productId} />;
}
