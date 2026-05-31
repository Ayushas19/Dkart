"use client";

import { motion, type Variants } from "framer-motion";
import { Search, ShoppingCart, Package } from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: Search,
    title: "Browse Local Shops",
    description:
      "Explore verified local shops in Samastipur. Filter by category, location, or what you're craving.",
  },
  {
    num: "02",
    Icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Pick your favourite products, check prices and reviews, then add them to your cart with one tap.",
  },
  {
    num: "03",
    Icon: Package,
    title: "Get It Delivered",
    description:
      "Place your order and get it delivered right to your doorstep. Fast, reliable, and hassle-free.",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1 },
  }),
};

export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-overline">Method</span>
          <h2 className="text-h2">Start in 3 Simple Steps</h2>
          <p className="text-body" style={{ color: "var(--text-secondary)" }}>From browse to fast local delivery — engineered to be seamless</p>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <motion.div
                key={step.num}
                className="step-card"
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  border: "2px solid var(--border-default)",
                  background: "var(--bg-card)",
                  padding: "32px 24px",
                  borderRadius: "4px",
                  boxShadow: "3px 3px 0px var(--border-default)",
                  transition: "all 0.2s ease"
                }}
                whileHover={{
                  transform: "translate(-2px, -2px)",
                  boxShadow: "5px 5px 0px var(--accent-red)",
                  borderColor: "var(--accent-red)"
                }}
              >
                <div className="step-number">{step.num}</div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={24} color="var(--accent-red)" />
                </div>
                <h4 className="text-h4 text-azeret" style={{ fontSize: 14, color: "var(--text-primary)", marginBottom: 8 }}>{step.title}</h4>
                <p className="text-body" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
