"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "No setup fees, ever",
  "Easy product & order management",
  "Real-time order tracking",
  "Secure COD & online payments",
];

export default function ShopCTA() {
  return (
    <section className="section" style={{ paddingBottom: 96, borderBottom: "2px solid var(--border-default)" }}>
      <div className="container">
        <motion.div
          className="cta-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            flexWrap: "wrap",
            gap: 32,
            padding: "48px"
          }}
        >
          {/* Left: text + features */}
          <div style={{ flex: "1 1 500px", minWidth: 280 }}>
            <h2 className="text-h2 text-azeret" style={{ fontSize: 24, color: "var(--text-primary)", marginBottom: 12 }}>
              Launch your local digital storefront
            </h2>
            <p className="text-body" style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 13.5 }}>
              Join verified local shops selling on District Kart. Start getting orders in Samastipur today — completely free.
            </p>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  <div style={{ padding: 4, background: 'var(--accent-red)', border: '1.5px solid var(--border-default)', borderRadius: 2 }}>
                    <Check size={10} color="var(--accent-cream)" strokeWidth={3} />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 240 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/vendor/register" className="btn btn-primary btn-lg">
                Start Your Shop
              </Link>
            </motion.div>
            <p className="text-azeret" style={{ fontSize: 9, color: "var(--text-tertiary)", marginTop: 12, fontWeight: 800 }}>
              Free forever. Upgrade anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
