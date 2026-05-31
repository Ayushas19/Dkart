import Link from "next/link";
import { Shop as PrismaShop } from "@prisma/client";

export default function VendorCard({ shop }: { shop: Partial<PrismaShop> }) {
  const initial = shop.name?.[0] ?? "S";

  return (
    <div className="vendor-showcase-card">
      <div 
        className="vendor-banner" 
        style={{ 
          background: "linear-gradient(135deg, #161616 0%, #2d2d2d 100%)",
          backgroundImage: "radial-gradient(#474747 1px, transparent 1px)",
          backgroundSize: "12px 12px"
        }}
      >
        <div className="vendor-avatar">
          <div className="vendor-avatar-inner">{initial}</div>
        </div>
      </div>
      <div className="vendor-body">
        <h4 className="vendor-name text-azeret" style={{ fontSize: 15 }}>{shop.name}</h4>
        <div className="vendor-meta">
          <span className="stars">★★★★★</span>
          <span className="vendor-rating-num font-bold text-azeret">4.9</span>
          <span>·</span>
          <span className="text-azeret" style={{ fontSize: 10 }}>Marketplace</span>
        </div>
        <p className="vendor-desc text-body" style={{ fontSize: 12.5 }}>{shop.description || "No description available yet."}</p>
      </div>
      <div className="vendor-footer">
        <span className="status-badge active" style={{ fontSize: 10, fontFamily: "var(--font-display)" }}>● ACTIVE</span>
        <Link href={`/shop/${shop.id}`} className="view-shop-btn text-azeret" style={{ fontSize: 11, fontWeight: 800 }}>View Shop →</Link>
      </div>
    </div>
  );
}
