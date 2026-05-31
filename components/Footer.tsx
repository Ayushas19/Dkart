"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
} as const;

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container container-wide">
        <motion.div
          className="footer-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="footer-brand">
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}
              whileHover={{ x: 4 }}
            >
              <span className="text-azeret" style={{ color: "var(--accent-cream)", fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px" }}>
                <span style={{ color: "var(--accent-red)" }}>DK</span>ART
              </span>
            </motion.div>
            <p className="text-body" style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Samastipur&apos;s premier hyperlocal marketplace. Connecting local shops and vendors directly with customers for a premium streetwear e-commerce experience.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants} className="footer-col">
            <h5>Collections</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { href: "/", label: "Marketplace" },
                { href: "/category/food", label: "Food & Cakes" },
                { href: "/category/clothes", label: "Clothes" },
                { href: "/category/electronics", label: "Electronics" },
                { href: "/category/shoes", label: "Shoes" },
              ].map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 6, color: "var(--accent-red)" }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                >
                  <Link href={link.href} style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{link.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="footer-col">
            <h5>Company</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { href: "/", label: "About Brand" },
                { href: "/", label: "Hype Blog" },
                { href: "/", label: "Careers" },
                { href: "/", label: "Contact Info" },
              ].map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 6, color: "var(--accent-red)" }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                >
                  <Link href={link.href} style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{link.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants} className="footer-col">
            <h5>Customer Desk</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { href: "/", label: "Help & Returns" },
                { href: "/terms", label: "Terms of Drop" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "https://wa.me/919142717690", label: "WhatsApp Desk", external: true },
              ].map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 6, color: "var(--accent-red)" }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                >
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{link.label}</a>
                  ) : (
                    <Link href={link.href} style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{link.label}</Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ borderTop: "2px solid var(--border-light)" }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700 }}>© {new Date().getFullYear()} DISTRICT KART. ALL RIGHTS RESERVED.</span>
          <motion.div
            className="footer-social"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { href: "https://twitter.com", label: "Twitter" },
              { href: "https://instagram.com", label: "Instagram" },
              { href: "https://linkedin.com", label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1, color: "var(--accent-red)" }}
                whileTap={{ scale: 0.98 }}
              >
                {social.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
