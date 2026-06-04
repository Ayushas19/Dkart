import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiscoverShops from "@/components/DiscoverShops";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Disable cache for live updates

export default async function ShopListPage() {
  // Fetch all approved shops in Patna (or Samastipur/all)
  const shops = await prisma.shop.findMany({
    where: {
      status: "APPROVED",
      isActive: true,
    },
  });

  // Map database shops to match the DiscoverShops interface
  const formattedShops = shops.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    category: s.name.toLowerCase().includes("sweet")
      ? "sweets"
      : s.name.toLowerCase().includes("cake")
      ? "cakes"
      : s.name.toLowerCase().includes("style")
      ? "clothes"
      : s.name.toLowerCase().includes("food")
      ? "food"
      : "all",
  }));

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-16 lg:pb-0">
      <Header />

      {/* Hero Banner Section for Shop List */}
      <div className="monchies-section" style={{ padding: "48px 24px 24px" }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="monchies-section-subtitle">LOCAL BAZAAR</span>
          <h1 className="monchies-header monchies-section-title" style={{ fontSize: "36px", marginBottom: "8px" }}>
            Explore Local Shops &amp; Vendors
          </h1>
          <p className="monchies-body monchies-section-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Browse through Patna&apos;s most trusted neighborhood stores. Sourced locally, delivered fresh.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--monchies-cream)", borderBottom: "2px solid var(--monchies-chocolate)" }}>
        <DiscoverShops shops={formattedShops} />
      </div>

      <Footer />
    </main>
  );
}
