"use client";

import LinkNext from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { User, MapPin, Menu, X, ShoppingCart, Sun, Moon, Crown } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useSession } from "next-auth/react";

export default function Header() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderInner />
    </Suspense>
  );
}

function HeaderSkeleton() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div style={{ width: 150, height: 38, background: '#222', border: '2px solid #ffffe3', borderRadius: 4 }} />
      </div>
    </header>
  );
}

function HeaderInner() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loc = searchParams?.get("loc") || "all";
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { data: session } = useSession();
  const sessionUser = session?.user as any;
  const userInitial = sessionUser?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLoc = e.target.value;
    if (newLoc === "all") {
      router.push("/");
    } else {
      router.push(`/?loc=${newLoc}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Collections" },
    { href: "/category/clothes", label: "Drops", hasCrown: true },
    { href: "/#about", label: "About" },
    { href: "/#journal", label: "Journal" },
  ];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Logo */}
          <LinkNext href="/" className="header-logo" aria-label="District Kart Home" style={{ fontSize: "20px", letterSpacing: "-1px" }}>
            <span>DISTRICT</span> KART
          </LinkNext>

          {/* Desktop Nav */}
          <nav className="header-nav desktop-nav">
            {navLinks.map((link) => (
              <div key={link.href} className="nav-link-container">
                <LinkNext href={link.href} className="header-nav-link">
                  {link.label}
                </LinkNext>
                {link.hasCrown && (
                  <div className="crown-badge">
                    <Crown size={12} fill="var(--accent-red)" stroke="var(--accent-red)" />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Desktop Actions */}
            <div className="desktop-actions header-actions">
              {session ? (
                <LinkNext href="/dashboard" className="header-action-item" title="My Account" style={{ padding: "4px", borderRadius: "4px" }}>
                  {sessionUser?.image ? (
                    <img src={sessionUser.image} alt={sessionUser.name || "User"} style={{ width: 32, height: 32, border: "2px solid var(--border-default)" }} />
                  ) : (
                    <div style={{ width: 32, height: 32, background: "var(--accent-red)", display: "flex", alignItems: "center", justifyOrigin: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "var(--accent-cream)", border: "2px solid var(--border-default)" }}>
                      {userInitial}
                    </div>
                  )}
                </LinkNext>
              ) : (
                <LinkNext href="/auth/login" className="header-action-item">
                  <User size={16} />
                  <span>Login</span>
                </LinkNext>
              )}

              <LinkNext href="/cart" className="header-action-item" aria-label="View Cart">
                <ShoppingCart size={16} />
                <span>Cart</span>
              </LinkNext>

              <LinkNext href="/vendor/login" className="header-cta">
                Open Shop
              </LinkNext>
            </div>

            {/* Theme toggle — always visible */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                border: "2px solid var(--border-default)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                boxShadow: "2px 2px 0px var(--border-default)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="mobile-toggle nav-mobile-toggle"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="hamburger-bars">
                <span className="hamburger-bar bar-1"></span>
                <span className="hamburger-bar bar-2"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.8)",
          zIndex: 200,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease"
        }}
      >
        <div 
          className="mobile-drawer" 
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "300px",
            background: "var(--bg-primary)",
            borderLeft: "2px solid var(--border-default)",
            padding: "24px",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            overflowY: "auto"
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <LinkNext href="/" className="header-logo" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "18px", letterSpacing: "-1px" }}>
              <span>DISTRICT</span> KART
            </LinkNext>
            <button
              className="mobile-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <div key={link.href} style={{ position: 'relative', display: 'block', width: '100%' }}>
                <LinkNext
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ display: 'block', width: '100%' }}
                >
                  {link.label}
                </LinkNext>
                {link.hasCrown && (
                  <span className="crown-badge" style={{
                    position: 'absolute',
                    top: '50%',
                    right: '16px',
                    transform: 'translateY(-50%)',
                    animation: 'float-crown 2s ease-in-out infinite',
                    color: 'var(--accent-red)',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Crown size={14} fill="var(--accent-red)" stroke="var(--accent-red)" />
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {session ? (
              <LinkNext
                href="/dashboard"
                className="header-action-item"
                onClick={() => setIsMenuOpen(false)}
                style={{ justifyContent: 'center', padding: '12px', border: "2px solid var(--border-default)" }}
              >
                {sessionUser?.image ? (
                  <img src={sessionUser.image} alt={sessionUser.name || "User"} style={{ width: 24, height: 24, border: "2px solid var(--border-default)" }} />
                ) : (
                  <div style={{ width: 24, height: 24, background: "var(--accent-red)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "var(--accent-cream)", border: "1.5px solid var(--border-default)" }}>
                    {userInitial}
                  </div>
                )}
                <span style={{ marginLeft: 8 }}>My Account</span>
              </LinkNext>
            ) : (
              <LinkNext
                href="/auth/login"
                className="header-action-item"
                onClick={() => setIsMenuOpen(false)}
                style={{ justifyContent: 'center', padding: '12px', border: "2px solid var(--border-default)" }}
              >
                <User size={16} />
                <span style={{ marginLeft: 8 }}>Login</span>
              </LinkNext>
            )}

            <LinkNext
              href="/cart"
              className="header-action-item"
              onClick={() => setIsMenuOpen(false)}
              style={{ justifyContent: 'center', padding: '12px', border: "2px solid var(--border-default)" }}
            >
              <ShoppingCart size={16} />
              <span style={{ marginLeft: 8 }}>Cart</span>
            </LinkNext>

            <LinkNext
              href="/vendor/login"
              className="header-cta"
              onClick={() => setIsMenuOpen(false)}
              style={{ textAlign: 'center', display: 'block' }}
            >
              Open Shop
            </LinkNext>
          </div>

          {/* Location Selector */}
          <div style={{ marginTop: 32 }}>
            <label style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--text-secondary)',
              marginBottom: 10,
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Location
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <MapPin size={14} color="var(--accent-red)" style={{ position: 'absolute', left: 14 }} />
              <select
                value={loc}
                onChange={handleLocationChange}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 38px',
                  borderRadius: 4,
                  border: '2px solid var(--border-default)',
                  background: 'var(--bg-secondary)',
                  fontSize: 13,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="all">All Locations</option>
                <option value="Samastipur">Samastipur</option>
                <option value="Nawabganj">Nawabganj</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
