"use client";

import { motion, type Variants } from "framer-motion";
import { Search, ArrowRight, MapPin, ShoppingBag, Star, Truck } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const stats = [
    { Icon: ShoppingBag, value: "200+", label: "Local Shops" },
    { Icon: Star, value: "5,000+", label: "Happy Shoppers" },
    { Icon: MapPin, value: "2", label: "Cities Live" },
    { Icon: Truck, value: "Same Day", label: "Fast Drop" },
  ];

  return (
    <section className="hero-section" id="heroSection">
      <div className="container hero-content">
        {/* Column 1: Left Content */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          style={{ width: "100%" }}
        >
          {/* Location pill */}
          <motion.div
            variants={itemVariants}
            className="hero-badge-container"
          >
            <span 
              className="badge"
              style={{
                padding: "8px 16px",
                fontSize: 11,
                fontWeight: 900,
                borderWidth: 2,
                boxShadow: "2px 2px 0px var(--border-default)"
              }}
            >
              <MapPin size={12} color="var(--accent-red)" style={{ marginRight: 6 }} />
              Live in Samastipur &amp; Nawabganj
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-display"
            style={{
              color: "var(--text-primary)",
              marginBottom: 16,
              lineHeight: 1.05
            }}
          >
            Shop local.
            <br />
            Discover <span className="text-serif-italic" style={{ textTransform: "none", color: "var(--accent-red)" }}>endlessly.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="hero-desc"
          >
            Unlock elite local collections and storefronts across Samastipur. Get gourmet treats, premium fashion, home delivery, and same-day drops directly to your space.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <motion.a
              href="#trending-shops"
              className="btn btn-primary btn-lg"
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Enter Drop <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/vendor/login"
              className="btn btn-secondary btn-lg"
              whileTap={{ scale: 0.98 }}
            >
              Open Your Shop
            </motion.a>
          </motion.div>

          {/* Search bar */}
          <motion.div variants={itemVariants} className="hero-search">
            <div style={{ position: "relative", width: "100%", display: "flex", gap: 12 }}>
              <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 16,
                    color: "var(--text-tertiary)",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search local shops, drops, clothes, food..."
                  aria-label="Search products"
                  style={{
                    paddingLeft: 44,
                    height: 48,
                    borderRadius: 4,
                    border: "2px solid var(--border-default)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    width: "100%"
                  }}
                />
              </div>
              <button className="hero-search-btn" type="button" style={{ height: 48, borderRadius: 4 }}>Search</button>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants} 
            className="hero-stats-row"
          >
            {stats.map((stat, i) => {
              const { Icon } = stat;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div 
                    style={{
                      border: "2px solid var(--border-default)",
                      padding: 8,
                      borderRadius: 4,
                      background: "var(--bg-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={14} color="var(--accent-red)" />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 900, color: "var(--text-primary)" }}>{stat.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.5px" }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Column 2: Premium Framer visual with 1:1 image and hover shift effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="hero-image-container"
        >
          <div className="hero-image-wrapper">
            <img 
              src="https://framerusercontent.com/images/75LBV1xf4btDeSecxxpQ1EHBtKE.png" 
              alt="Rawline Premium Streetwear Model" 
              className="hero-streetwear-img"
            />
            {/* Float Overlay Tag */}
            <div className="hero-tag-overlay">
              <span className="hero-tag-label">LATEST DROP</span>
              <span className="hero-tag-value">DK-01 // SS26</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
