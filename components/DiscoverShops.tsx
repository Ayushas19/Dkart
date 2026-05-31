"use client";

import { useState } from "react";
import Link from "next/link";

interface ShopData {
  id: string;
  name: string;
  description: string | null;
  category?: string | null;
}

const categoryTabs = [
  { label: "All Shops", cat: "all" },
  { label: "Food", cat: "food" },
  { label: "Cakes", cat: "cakes" },
  { label: "Clothes", cat: "clothes" },
  { label: "Electronics", cat: "electronics" },
  { label: "Shoes", cat: "shoes" },
];

export default function DiscoverShops({ shops }: { shops: ShopData[] }) {
  const [activeCat, setActiveCat] = useState("all");

  const filteredShops = activeCat === "all"
    ? shops
    : shops.filter((s) => s.category?.toLowerCase() === activeCat);

  return (
    <section className="section" id="shop-all">
      <div className="container container-wide">
        <div className="section-header">
          <span className="text-overline">Discovery</span>
          <h2 className="text-h2">Discover Local Shops</h2>
          <p className="text-body" style={{ color: "var(--text-secondary)" }}>Curated elite vendors in Samastipur ready for drops</p>
        </div>

        <div className="shopall-tabs" id="shopallTabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab.cat}
              className={`shopall-tab${activeCat === tab.cat ? " active" : ""}`}
              onClick={() => setActiveCat(tab.cat)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="product-grid-4" id="shopAllGrid">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => {
              const initial = shop.name?.[0] ?? "S";
              return (
                <div className="vendor-showcase-card" key={shop.id}>
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
                    <p className="vendor-desc text-body" style={{ fontSize: 12.5 }}>
                      {shop.description || "No description available yet."}
                    </p>
                  </div>
                  <div className="vendor-footer">
                    <span className="status-badge active" style={{ fontSize: 10, fontFamily: "var(--font-display)" }}>● ACTIVE</span>
                    <Link href={`/shop/${shop.id}`} className="view-shop-btn text-azeret" style={{ fontSize: 11, fontWeight: 800 }}>
                      View Shop →
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 24px", color: "var(--text-tertiary)", border: "2px dashed var(--border-default)", borderRadius: 4 }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
              <p className="text-azeret" style={{ fontSize: 12, fontWeight: 800 }}>No shops found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
