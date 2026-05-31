"use client";

import { motion, type Variants } from "framer-motion";

const reviews = [
  {
    id: 1,
    rating: 5,
    content:
      "District Kart transformed how I shop locally. I can now browse my favourite stores and get everything delivered — it’s like having the whole market at my fingertips.",
    name: "Priya Sharma",
    role: "Regular Customer",
    initials: "PS",
  },
  {
    id: 2,
    rating: 5,
    content:
      "Setting up my shop was incredibly easy. Within a day I had my products listed and orders started coming in. The vendor dashboard gives me full control over everything.",
    name: "Rahul Verma",
    role: "Electronics Vendor",
    initials: "RV",
  },
  {
    id: 3,
    rating: 4,
    content:
      "The delivery is always on time and the product quality from local vendors is amazing. District Kart has truly bridged the gap between local shops and online convenience.",
    name: "Anita Kumari",
    role: "Cake Shop Owner",
    initials: "AK",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1 },
  }),
};

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" style={{ borderBottom: "2px solid var(--border-default)" }}>
      <div className="container container-wide">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-overline">Reviews</span>
          <h2 className="text-h2">Powering local dreams</h2>
          <p className="text-body" style={{ color: "var(--text-secondary)" }}>See what Samastipur community says about the platform</p>
        </motion.div>

        <div className="grid grid-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              className="testimonial-card"
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                transform: "translate(-2px, -2px)",
                boxShadow: "5px 5px 0px var(--accent-red)",
                borderColor: "var(--accent-red)"
              }}
              style={{
                background: "var(--bg-card)",
                border: "2px solid var(--border-default)",
                borderRadius: "4px",
                padding: "32px",
                boxShadow: "3px 3px 0px var(--border-default)",
                transition: "all 0.2s ease"
              }}
            >
              <div>
                {/* Stars */}
                <div
                  className="stars"
                  style={{ marginBottom: 16, fontSize: 14 }}
                  aria-label={`Rating: ${review.rating} out of 5 stars`}
                >
                  {"★".repeat(review.rating)}
                  {review.rating < 5 && (
                    <span style={{ color: "var(--border-light)" }}>{"★".repeat(5 - review.rating)}</span>
                  )}
                </div>

                <p className="quote" style={{ fontSize: 14.5, color: "var(--text-primary)", fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>&ldquo;{review.content}&rdquo;</p>
              </div>

              <div className="testimonial-author" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                <div
                  className="testimonial-avatar"
                  style={{ 
                    width: 38,
                    height: 38,
                    borderRadius: 4,
                    border: "2px solid var(--border-default)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 12,
                    fontWeight: 900
                  }}
                >
                  {review.initials}
                </div>
                <div className="testimonial-info">
                  <div className="name text-azeret" style={{ fontSize: 11, fontWeight: 800, color: "var(--text-primary)" }}>{review.name}</div>
                  <div className="role text-azeret" style={{ fontSize: 9, color: "var(--text-secondary)", marginTop: 2 }}>{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
