"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MainCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  _count: { subCategories: number };
}

// Static fallback categories shown while real ones load (or if DB is empty)
const FALLBACK_CATEGORIES: MainCategory[] = [
  { id: "f1", name: "Food",        icon: "🍔", _count: { subCategories: 0 } },
  { id: "f2", name: "Cakes",       icon: "🎂", _count: { subCategories: 0 } },
  { id: "f3", name: "Clothes",     icon: "👗", _count: { subCategories: 0 } },
  { id: "f4", name: "Electronics", icon: "📱", _count: { subCategories: 0 } },
  { id: "f5", name: "Shoes",       icon: "👟", _count: { subCategories: 0 } },
];

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<MainCategory[]>(FALLBACK_CATEGORIES);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.categories?.length > 0) {
          setCategories(d.categories);
          setActiveIdx(0);
        }
      })
      .catch(() => {}); // silently fall back
  }, []);

  const activeCat = categories[activeIdx];

  // Generate a visual "sample card" grid for the active category
  const sampleCards = Array.from({ length: 5 }, (_, i) => ({
    label: `${activeCat.icon} ${activeCat.name} ${i + 1}`,
  }));

  return (
    <section className="section section-dark" id="sample-showcase" style={{ borderBottom: "2px solid var(--border-default)" }}>
      <div className="container container-wide">
        <div className="section-header" style={{ color: "var(--accent-cream)" }}>
          <span className="text-overline" style={{ color: "var(--text-tertiary)" }}>
            Collections
          </span>
          <h2 className="text-h2" style={{ color: "var(--accent-cream)" }}>
            Browse {activeCat.icon} {activeCat.name}
          </h2>
          <p className="text-body" style={{ color: "var(--text-secondary)" }}>
            Discover samastipur verified vendors inside this catalog.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="shopall-tabs" style={{ marginBottom: 36 }}>
          {categories.map((cat, idx) => {
            const active = idx === activeIdx;
            return (
              <motion.button
                key={cat.id}
                className={`shopall-tab${active ? " active" : ""}`}
                onClick={() => setActiveIdx(idx)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={
                  active
                    ? { background: "var(--accent-red)", color: "var(--accent-cream)", borderColor: "var(--border-default)", boxShadow: "2px 2px 0px var(--border-default)" }
                    : { background: "transparent", color: "var(--text-secondary)", borderColor: "var(--border-light)", boxShadow: "none" }
                }
              >
                <span style={{ marginRight: 6 }}>{cat.icon}</span>
                {cat.name}
              </motion.button>
            );
          })}
        </div>

        {/* Sample Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="sample-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {sampleCards.map((card, i) => (
              <motion.div
                key={`${activeIdx}-${i}`}
                className="sample-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                style={{
                  border: "2px solid var(--border-default)",
                  background: "#161616",
                  borderRadius: 4,
                  boxShadow: "3px 3px 0px var(--border-default)",
                }}
              >
                <Link href={`/category/${encodeURIComponent(activeCat.name.toLowerCase())}`}>
                  <div 
                    className="sample-placeholder" 
                    style={{ 
                      background: "linear-gradient(135deg, #111111 0%, #1c1c1c 100%)",
                      backgroundImage: "radial-gradient(#474747 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                      borderRadius: 4
                    }}
                  />
                  <div className="sample-overlay" style={{ background: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start", padding: 16 }}>
                    <span className="text-azeret" style={{ fontSize: 10, fontWeight: 800, color: "var(--text-tertiary)" }}>DK DROP</span>
                    <span className="text-azeret" style={{ fontSize: 13, fontWeight: 900, color: "var(--accent-cream)", marginTop: 4 }}>{card.label}</span>
                    <span className="text-serif-italic" style={{ fontSize: 11, color: "var(--accent-red)", marginTop: 6, fontWeight: 600 }}>Explore collection →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All link */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link
            href={`/category/${encodeURIComponent(activeCat.name.toLowerCase())}`}
            className="btn btn-secondary btn-sm"
          >
            View All {activeCat.icon} {activeCat.name} Shops →
          </Link>
        </div>
      </div>
    </section>
  );
}
