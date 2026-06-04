"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  // Auto-rotate slides
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-container">
        <motion.div
          className="hero-banner-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Content */}
          <div className="hero-banner-left">
            <h2 className="hero-banner-title">
              Shop from{" "}
              <br />
              Trusted <span className="hero-banner-green">Local Stores</span>
              <br />
              in Your <span className="hero-banner-orange">District</span>
            </h2>

            <p className="hero-banner-desc">
              Cakes, Clothing, Sweets, Restaurants and more...
            </p>

            <div className="hero-banner-actions">
              <button
                onClick={() => router.push("/shop")}
                className="hero-banner-btn-primary"
              >
                Shop Now
              </button>
              <button
                onClick={() => router.push("/vendor/login")}
                className="hero-banner-btn-secondary"
              >
                Become a Seller
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hero-banner-right">
            <div className="hero-banner-img-wrap">
              <Image
                src="/scooter_delivery.png"
                alt="District Kart Delivery"
                fill
                className="hero-banner-img"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Dot Indicators */}
        <div className="hero-dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`hero-dot ${i === activeSlide ? "active" : ""}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
