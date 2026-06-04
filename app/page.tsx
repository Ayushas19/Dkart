import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, Lock, Headphones, Flame, Smartphone, Store } from "lucide-react";

export const revalidate = 0; // Disable caching to fetch live seeds

export default async function HomePage({
  searchParams,
}: {
  searchParams: { loc?: string };
}) {
  const location = searchParams.loc || "Patna";
  const shopWhere: any = { status: "APPROVED", isActive: true };
  if (location !== "all") {
    shopWhere.location = location;
  }

  // 1. Fetch approved shops in the selected district
  const shops = await prisma.shop.findMany({
    where: shopWhere,
    take: 8,
  });

  // 2. Fetch products dynamically
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      shop: {
        status: "APPROVED",
        isActive: true,
        ...(location !== "all" ? { location } : {})
      }
    },
    include: {
      shop: true,
      subCategory: true
    },
    take: 8,
  });

  // Category Bubbles Configuration — REORDERED per user request:
  // 1. Restaurant, 2. Cake, 3. Sweets, ... last: Fashion & Clothing (Coming Soon)
  const categoriesList = [
    { name: "Restaurants", image: "/images/categories/restaurant.png", bg: "#FFF7ED", labelColor: "#1E293B", url: "/category/Restaurant", badge: null },
    { name: "Cakes", image: "/images/categories/cake.png", bg: "#FDF2F8", labelColor: "#1E293B", url: "/category/Cake", badge: null },
    { name: "Sweets", image: "/images/categories/sweets.png", bg: "#FFF7ED", labelColor: "#1E293B", url: "/category/Sweets", badge: null },
    { name: "Cosmetics", image: "/images/categories/cosmetics.png", bg: "#FDF2F8", labelColor: "##1E293B", url: "/category/Cosmetics", badge: null },
    { name: "Hotels", image: "/images/categories/hotels.png", bg: "#EFF6FF", labelColor: "#1E293B", url: "/category/Hotels", badge: null },
    { name: "Pharmacy", image: "/images/categories/pharmacy.png", bg: "#EBF7EE", labelColor: "#1E293B", url: "/category/Pharmacy", badge: null },
    { name: "Fashion", image: "/images/categories/clothing.png", bg: "#EBF7EE", labelColor: "#1E293B", url: "/category/Clothing", badge: "Coming Soon" },
    { name: "More", image: "/images/categories/sweets.png", bg: "#F1F5F9", labelColor: "#1E293B", url: "/shop", badge: null },
  ];

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-16 lg:pb-0">
      <Header />
      <Hero />

      {/* 1. TICKER MARQUEE BAR */}
      <div className="monchies-ticker">
        <div className="monchies-ticker-track">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="display-contents" style={{ display: 'contents' }}>
              <div className="monchies-ticker-item">
                <span className="monchies-ticker-star">✦</span> Same Day Delivery in Your District
              </div>
              <div className="monchies-ticker-item">
                <span className="monchies-ticker-star">✦</span> Support Local Shops
              </div>
              <div className="monchies-ticker-item">
                <span className="monchies-ticker-star">✦</span> 100% Secure Payments
              </div>
              <div className="monchies-ticker-item">
                <span className="monchies-ticker-star">✦</span> 24/7 Customer Support
              </div>
              <div className="monchies-ticker-item">
                <span className="monchies-ticker-star">✦</span> Order from Patna&apos;s Best Stores
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CORE FEATURES / BENEFITS CARD GRID */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-features-grid">
            <div className="monchies-feature-card">
              <div className="monchies-feature-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h3 className="monchies-header">100% Local Shops</h3>
              <p className="monchies-body">Sourced directly from verified local merchants in your district.</p>
            </div>

            <div className="monchies-feature-card">
              <div className="monchies-feature-icon-box">
                <Truck size={26} />
              </div>
              <h3 className="monchies-header">Same Day Delivery</h3>
              <p className="monchies-body">Fresh and fast delivery within hours, bringing your local bazaar straight to your door.</p>
            </div>

            <div className="monchies-feature-card">
              <div className="monchies-feature-icon-box">
                <Lock size={26} />
              </div>
              <h3 className="monchies-header">Secure Payments</h3>
              <p className="monchies-body">Enjoy absolute peace of mind with 100% secure checkout and UPI payment options.</p>
            </div>

            <div className="monchies-feature-card">
              <div className="monchies-feature-icon-box">
                <Headphones size={26} />
              </div>
              <h3 className="monchies-header">Direct Vendor Support</h3>
              <p className="monchies-body">Connect directly with shop owners for personalized support and quick order updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES COLLECTIONS GRID */}
      <section className="monchies-section" id="categories">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-section-header">
            <span className="monchies-section-subtitle">OUR COLLECTIONS</span>
            <h2 className="monchies-header monchies-section-title">Wholesome Categories We Deliver</h2>
            <p className="monchies-body monchies-section-desc">
              Everything you need in your district, curated and delivered with utmost care.
            </p>
          </div>

          <div className="monchies-categories-grid">
            <div className="monchies-category-card">
              <div className="monchies-category-img-wrap">
                <img src="/images/categories/restaurant.png" alt="Restaurants" className="monchies-category-img" />
              </div>
              <div className="monchies-category-info">
                <h3 className="monchies-header monchies-category-title">Restaurants</h3>
                <Link href="/category/Restaurant" className="monchies-category-link">
                  Order Food &rarr;
                </Link>
              </div>
            </div>

            <div className="monchies-category-card">
              <div className="monchies-category-img-wrap">
                <img src="/images/categories/cake.png" alt="Cakes & Sweets" className="monchies-category-img" />
              </div>
              <div className="monchies-category-info">
                <h3 className="monchies-header monchies-category-title">Cakes &amp; Sweets</h3>
                <Link href="/category/Sweets" className="monchies-category-link">
                  Shop Treats &rarr;
                </Link>
              </div>
            </div>

            <div className="monchies-category-card relative">
              <span className="category-coming-soon" style={{ top: '16px', right: '16px', left: 'auto', transform: 'none' }}>Coming Soon</span>
              <div className="monchies-category-img-wrap">
                <img src="/images/categories/clothing.png" alt="Fashion & Clothing" className="monchies-category-img" />
              </div>
              <div className="monchies-category-info">
                <h3 className="monchies-header monchies-category-title">Fashion &amp; Clothing</h3>
                <Link href="/category/Clothing" className="monchies-category-link opacity-60 pointer-events-none">
                  Coming Soon &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS PRODUCT GRID */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-section-header">
            <span className="monchies-section-subtitle">BESTSELLERS IN {location.toUpperCase()}</span>
            <h2 className="monchies-header monchies-section-title">Trending Products Loved by Neighbors</h2>
            <p className="monchies-body monchies-section-desc">
              These popular items from your local high street stores are flying off the shelves.
            </p>
          </div>

          <div className="monchies-product-grid">
            {products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  shop={product.shop} 
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-[#3d280d] font-bold bg-white rounded-3xl border-2 border-[#3d280d] shadow-[4px_4px_0px_#3d280d]">
                No active products found in {location} right now. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS CARD BOX */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-how-it-works-box">
            <div className="monchies-hw-left">
              <span className="monchies-section-subtitle">HOW IT WORKS</span>
              <h2 className="monchies-header monchies-hw-title">Shop Your Local District Bazaar in 3 Easy Steps</h2>
              <p className="monchies-body monchies-hw-desc">
                Supporting local businesses has never been this simple. Mix and match products from multiple trusted merchants in your area, and let us handle the delivery.
              </p>
              <Link href="/shop" className="monchies-btn">
                Start Exploring Shops
              </Link>
            </div>

            <div className="monchies-hw-right">
              <div className="monchies-step-item">
                <div className="monchies-step-num">1</div>
                <div>
                  <h4 className="monchies-step-title">Choose Your Category</h4>
                  <p className="monchies-body text-sm mt-1">Select from Restaurants, Cakes, Sweets, and more.</p>
                </div>
              </div>

              <div className="monchies-step-item">
                <div className="monchies-step-num">2</div>
                <div>
                  <h4 className="monchies-step-title">Select Local Shops &amp; Add</h4>
                  <p className="monchies-body text-sm mt-1">Pick products from verified shops near you.</p>
                </div>
              </div>

              <div className="monchies-step-item">
                <div className="monchies-step-num">3</div>
                <div>
                  <h4 className="monchies-step-title">Enjoy Doorstep Delivery</h4>
                  <p className="monchies-body text-sm mt-1">Receive all your ordered items delivered today with care.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND STORY BANNER */}
      <section className="monchies-section" style={{ backgroundColor: 'var(--monchies-beige)' }} id="about">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-brand-story">
            <h2 className="monchies-header monchies-brand-story-text">
              DistrictKart is a thoughtfully crafted hyperlocal platform for modern district shopping, built to highlight premium local stores, sweets, food, and essentials with trusted ingredients and authentic local flavors.
            </h2>
            <Link href="/shop" className="monchies-btn monchies-btn-secondary">
              Meet Our Local Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* 7. NEIGHBORS TESTIMONIALS */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-section-header">
            <span className="monchies-section-subtitle">LOVED BY NEIGHBORS</span>
            <h2 className="monchies-header monchies-section-title">Trusted by Thousands of Families</h2>
            <p className="monchies-body monchies-section-desc">
              Read how DistrictKart is making daily shopping easier and supporting local merchants.
            </p>
          </div>

          <div className="monchies-testimonials-grid">
            <div className="monchies-testimonial-card">
              <p className="monchies-testimonial-quote">
                &ldquo;The sweets from our local sweet shop tasted fresh, rich, and authentic. Fast delivery and simple checkout process. Truly a savior for family get-togethers.&rdquo;
              </p>
              <span className="monchies-testimonial-author">Amit K. &mdash; Patna Resident</span>
            </div>

            <div className="monchies-testimonial-card">
              <p className="monchies-testimonial-quote">
                &ldquo;Even my picky kids love ordering cakes and snacks from our neighborhood bakery now. Seeing our trusted shops online makes us shop with confidence.&rdquo;
              </p>
              <span className="monchies-testimonial-author">Soniya R. &mdash; School Teacher</span>
            </div>

            <div className="monchies-testimonial-card">
              <p className="monchies-testimonial-quote">
                &ldquo;Snack and dinner time has never been easier. Finding sameday delivery for both restaurant food and sweet treats from local stores is amazing.&rdquo;
              </p>
              <span className="monchies-testimonial-author">Ravi S. &mdash; Father of Two</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIBE SECTION */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-newsletter-box" style={{ backgroundColor: 'var(--monchies-sage)' }}>
            <span className="monchies-section-subtitle" style={{ color: '#fff' }}>STAY UPDATED</span>
            <h2 className="monchies-header monchies-section-title">Get 10% Off Your First Order</h2>
            <p className="monchies-body monchies-section-desc">
              Join our newsletter for exclusive offers, new shop arrivals, and district news updates.
            </p>
            <form className="monchies-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                className="monchies-newsletter-input" 
                required
              />
              <button type="submit" className="monchies-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. JOURNAL BLOG GRID */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-section-header">
            <span className="monchies-section-subtitle">OUR JOURNAL</span>
            <h2 className="monchies-header monchies-section-title">Latest from the DistrictKart Journal</h2>
            <p className="monchies-body monchies-section-desc">
              Tips, vendor highlights, and recipes from our local district experts.
            </p>
          </div>

          <div className="monchies-journal-grid">
            <div className="monchies-journal-card">
              <div className="monchies-journal-img-wrap">
                <img src="/images/categories/restaurant.png" alt="Restaurants" className="monchies-journal-img" />
              </div>
              <span className="monchies-journal-meta"><span>By Admin</span> &bull; <span>June 4, 2026</span></span>
              <h4 className="monchies-header monchies-journal-title">5 Local Restaurants in Patna You Must Order From This Weekend</h4>
            </div>

            <div className="monchies-journal-card">
              <div className="monchies-journal-img-wrap">
                <img src="/images/categories/cake.png" alt="Bakery" className="monchies-journal-img" />
              </div>
              <span className="monchies-journal-meta"><span>By Bakery Team</span> &bull; <span>May 28, 2026</span></span>
              <h4 className="monchies-header monchies-journal-title">How Local Bakers Make Custom Birthday Cakes So Fresh and Fluffy</h4>
            </div>

            <div className="monchies-journal-card">
              <div className="monchies-journal-img-wrap">
                <img src="/images/categories/sweets.png" alt="Sweets" className="monchies-journal-img" />
              </div>
              <span className="monchies-journal-meta"><span>By Sweets Expert</span> &bull; <span>May 15, 2026</span></span>
              <h4 className="monchies-header monchies-journal-title">The Art of Traditional Sweets Making: Sourcing Clean Ingredients</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SOCIALS FEED GRID */}
      <section className="monchies-section">
        <div className="max-w-[1200px] mx-auto">
          <div className="monchies-section-header">
            <span className="monchies-section-subtitle">FOLLOW US</span>
            <h2 className="monchies-header monchies-section-title">Follow the District Bazaar Journey</h2>
            <p className="monchies-body monchies-section-desc">
              Use #DistrictKart to show us how you support your neighborhood shops!
            </p>
          </div>

          <div className="monchies-socials-grid">
            <div className="monchies-social-item">
              <img src="/images/categories/restaurant.png" alt="Food" className="monchies-social-img" />
            </div>
            <div className="monchies-social-item">
              <img src="/images/categories/cake.png" alt="Cake" className="monchies-social-img" />
            </div>
            <div className="monchies-social-item">
              <img src="/images/categories/sweets.png" alt="Sweets" className="monchies-social-img" />
            </div>
            <div className="monchies-social-item">
              <img src="/images/categories/clothing.png" alt="Clothing" className="monchies-social-img" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
