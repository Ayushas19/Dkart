"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="monchies-footer" id="footer">
      <div className="monchies-footer-container">
        
        <div className="monchies-footer-main">
          {/* Brand Info Column */}
          <div className="monchies-footer-info-col">
            <div className="monchies-footer-logo-row">
              <div className="monchies-footer-logo">D</div>
              <div className="monchies-footer-logo-text">
                DISTRICT<span>KART</span>
              </div>
            </div>
            
            <div className="monchies-footer-contacts">
              <p className="monchies-body" style={{ color: "#5d4d3d", fontSize: "14px", lineHeight: "1.5", marginBottom: "16px" }}>
                DistrictKart connects you with verified local shops in your area, bringing fresh food, treats, clothing, and everyday essentials directly to your doorstep.
              </p>
              <div>
                <a href="https://maps.google.com/?q=Mohanpur+Road,+Samastipur" target="_blank" rel="noopener noreferrer">
                  Mohanpur Road, Samastipur, Bihar - 848101
                </a>
              </div>
              <div>
                <a href="tel:+919142717690">+91 91427 17690</a>
              </div>
              <div>
                <a href="mailto:hello@districtkart.com">hello@districtkart.com</a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="monchies-footer-links-col">
            {/* Column 1: Shop */}
            <div>
              <h4 className="monchies-footer-nav-title">Shop</h4>
              <div className="monchies-footer-nav-list">
                <Link href="/category/Restaurant" className="monchies-footer-nav-link">Restaurants</Link>
                <Link href="/category/Cake" className="monchies-footer-nav-link">Cakes</Link>
                <Link href="/category/Sweets" className="monchies-footer-nav-link">Sweets</Link>
                <Link href="/category/Clothing" className="monchies-footer-nav-link">Clothing</Link>
              </div>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="monchies-footer-nav-title">Information</h4>
              <div className="monchies-footer-nav-list">
                <Link href="/#categories" className="monchies-footer-nav-link">Categories</Link>
                <Link href="/#about" className="monchies-footer-nav-link">About Us</Link>
                <Link href="/#help" className="monchies-footer-nav-link">Help Center</Link>
                <Link href="/vendor/login" className="monchies-footer-nav-link">Become a Seller</Link>
              </div>
            </div>

            {/* Column 3: Hours */}
            <div>
              <h4 className="monchies-footer-nav-title">Opening Hours</h4>
              <div className="monchies-footer-nav-list" style={{ color: "#5d4d3d" }}>
                <div>
                  <span style={{ fontWeight: 700, display: "block" }}>Monday - Friday</span>
                  <span>09:00 AM - 10:00 PM</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700, display: "block" }}>Saturday - Sunday</span>
                  <span>09:00 AM - 08:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom area */}
        <div className="monchies-footer-bottom">
          <div className="monchies-footer-bottom-author">
            &copy; {new Date().getFullYear()} Crafted &amp; Designed by <a href="https://github.com/Ayushas19" target="_blank" rel="noopener noreferrer">nxson / Ayushas19</a>
          </div>

          <div className="monchies-footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="monchies-footer-social-link">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="monchies-footer-social-link">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="monchies-footer-social-link">TikTok</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

