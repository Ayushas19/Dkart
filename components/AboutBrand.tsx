"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutBrand() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll transforms matching Framer's premium "About Image" behavior:
  // 1. Expanding the image clipping mask from scaled inset to full bleed
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    [
      "inset(12% 12% 12% 12% round 8px)",
      "inset(0% 0% 0% 0% round 0px)"
    ]
  );

  // 2. Slow parallax translation inside the wrapper
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // 3. Smooth scale shift for the inner streetwear image
  const scale = useTransform(scrollYProgress, [0.1, 0.55], [1.15, 1]);

  return (
    <section 
      ref={containerRef}
      className="section section-dark about-brand-section" 
      id="about"
      style={{ 
        position: "relative",
        overflow: "hidden", 
        borderBottom: "2px solid var(--border-default)",
        padding: "120px 0"
      }}
    >
      <div className="container container-wide">
        <div className="about-grid">
          {/* Left Side: Brand Story / Typographic Blocks */}
          <div className="about-text-column">
            <span className="text-overline" style={{ color: "var(--accent-red)" }}>
              Brand Ethos
            </span>
            <h2 className="text-display text-azeret" style={{ fontSize: "38px", color: "var(--accent-cream)", marginBottom: "24px", lineHeight: "1.1" }}>
              RAWLINE //
              <br />
              UNFILTERED STATE.
            </h2>
            <p className="text-body-lg" style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "16px", lineHeight: "1.7" }}>
              District Kart is proud to introduce RAWLINE. Born in the digital street, engineered for individuals who reject compromise. High-contrast silhouettes, premium heavyweights, and limited drops.
            </p>
            <div className="about-metrics" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div>
                <h4 style={{ fontSize: "24px", fontWeight: 900, color: "var(--accent-cream)", margin: 0, fontFamily: "var(--font-display)" }}>SS26</h4>
                <p style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-tertiary)", margin: "4px 0 0 0", letterSpacing: "1px", fontWeight: 700 }}>Current Drop Year</p>
              </div>
              <div>
                <h4 style={{ fontSize: "24px", fontWeight: 900, color: "var(--accent-cream)", margin: 0, fontFamily: "var(--font-display)" }}>100%</h4>
                <p style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--text-tertiary)", margin: "4px 0 0 0", letterSpacing: "1px", fontWeight: 700 }}>Heavy Cotton Knit</p>
              </div>
            </div>
          </div>

          {/* Right Side: Scroll-Driven Mask Reveal Image */}
          <div className="about-image-column">
            <div className="about-mask-container">
              <motion.div 
                style={{ 
                  clipPath,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "4px",
                  border: "2px solid var(--border-default)",
                  boxShadow: "8px 8px 0px rgba(0,0,0,0.3)"
                }}
              >
                <motion.img
                  src="https://framerusercontent.com/images/75LBV1xf4btDeSecxxpQ1EHBtKE.png"
                  alt="Rawline Brand Model Story"
                  style={{
                    width: "100%",
                    height: "130%", // Overheight to support y parallax translation
                    objectFit: "cover",
                    objectPosition: "center",
                    y,
                    scale
                  }}
                />
                
                {/* Visual grid dots overlay inside the mask */}
                <div 
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px)",
                    backgroundSize: "16px 16px",
                    pointerEvents: "none",
                    zIndex: 2
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
