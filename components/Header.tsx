"use client";

import LinkNext from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { 
  User, MapPin, Menu, X, ShoppingCart, Bell, Search, Mic, 
  Home, ShoppingBag, Folder, Heart, Tag, Gift, Settings, 
  PhoneCall, HelpCircle, LogOut, ChevronDown, Check,
  Truck, Store, Flame
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeContext";

export default function Header() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderInner />
    </Suspense>
  );
}

function HeaderSkeleton() {
  return (
    <header style={{ height: "70px", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }} />
  );
}

function HeaderInner() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLoc = searchParams?.get("loc") || "Patna";
  const { data: session } = useSession();
  const sessionUser = session?.user as any;
  const userName = sessionUser?.name || "Ankit";

  const handleLocationChange = (locName: string) => {
    if (locName === "all") {
      router.push("/");
    } else {
      router.push(`/?loc=${locName}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: "Clothing", href: "/category/Clothing" },
    { name: "Sweet", href: "/category/Sweets" },
    { name: "Cake", href: "/category/Cake" },
    { name: "Restaurant", href: "/category/Restaurant" },
    { name: "Cosmetics", href: "/category/Cosmetics" },
    { name: "Hotels", href: "/category/Hotels" },
    { name: "Pharmacy", href: "/category/Pharmacy" },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR (Desktop) */}
      <div className="hidden lg:flex justify-between items-center px-8 py-2.5 bg-[#FAF9F6] border-b border-[#E2E8F0] text-xs font-semibold text-[#475569]">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-[#0F5A31]" />
          <span>Same Day Delivery in Your District</span>
        </div>
        <div className="flex items-center gap-2">
          <Store size={14} className="text-[#0F5A31]" />
          <span>Support Local Shops, Build Your District</span>
        </div>
        <div className="flex items-center gap-2 text-[#E05315]">
          <Flame size={14} className="text-[#E05315]" fill="currentColor" />
          <span>First Order? Get Flat 10% OFF</span>
        </div>
      </div>

      {/* 2. MAIN HEADER (Desktop & Mobile) */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-[64px] flex items-center justify-between gap-3">
          
          {/* Left Area: Hamburger (All Screens) & Logo */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="p-1 text-[#1E293B] hover:bg-[#F1F5F9] rounded-md transition-colors"
              aria-label="Open navigation drawer"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <LinkNext href="/" className="flex items-center gap-1.5 group">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-[#0F5A31] rounded-lg flex items-center justify-center text-white font-extrabold text-lg md:text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl tracking-tight text-[#1E293B] leading-none">
                  DISTRICT<span className="text-[#E05315]">KART</span>
                </span>
                <span className="text-[9px] md:text-[10px] font-medium text-[#475569] mt-0.5 tracking-wide leading-none">
                  Har District Ka Apna Online Bazaar
                </span>
              </div>
            </LinkNext>

            {/* Location Selector (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4 bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-full text-xs font-bold text-[#1E293B]">
              <MapPin size={13} className="text-[#E05315]" />
              <span>{currentLoc}</span>
              <select 
                value={currentLoc}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-xs font-bold text-[#475569] ml-1 pr-1"
              >
                <option value="Patna">Patna</option>
                <option value="Samastipur">Samastipur</option>
                <option value="Nawabganj">Nawabganj</option>
              </select>
            </div>
          </div>

          {/* Center Search Area (Desktop Only) */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-[500px] relative">
            <input 
              type="text"
              placeholder="Search for products, shops, cakes, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E2E8F0] rounded-l-lg py-2 pl-4 pr-12 text-sm text-[#1E293B] outline-none focus:border-[#CBD5E1] focus:bg-white transition-all font-medium h-[38px]"
            />
            <button 
              type="submit"
              className="bg-[#E05315] hover:bg-[#EA580C] text-white px-5 h-[38px] rounded-r-lg font-bold text-sm tracking-wide transition-colors flex items-center justify-center"
            >
              Search
            </button>
          </form>

          {/* Right Action Controls (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-4 text-sm font-bold text-[#475569]">
            {session ? (
              <LinkNext href="/dashboard" className="flex items-center gap-1.5 hover:text-[#1E293B] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#0F5A31] text-white flex items-center justify-center text-xs font-black">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>{userName}</span>
              </LinkNext>
            ) : (
              <LinkNext href="/auth/login" className="flex flex-col items-center gap-0.5 hover:text-[#1E293B] transition-colors text-center">
                <User size={18} className="text-[#1E293B]" />
                <span className="text-[11px] font-semibold">Login / Register</span>
              </LinkNext>
            )}

            <LinkNext href="/dashboard" className="flex flex-col items-center gap-0.5 hover:text-[#1E293B] transition-colors text-center">
              <ShoppingBag size={18} className="text-[#1E293B]" />
              <span className="text-[11px] font-semibold">Orders</span>
            </LinkNext>

            <LinkNext href="/dashboard" className="flex flex-col items-center gap-0.5 hover:text-[#1E293B] transition-colors text-center">
              <Heart size={18} className="text-[#1E293B]" />
              <span className="text-[11px] font-semibold">Wishlist</span>
            </LinkNext>

            <LinkNext href="/cart" className="flex flex-col items-center gap-0.5 hover:text-[#1E293B] transition-colors text-center relative">
              <div className="relative">
                <ShoppingCart size={18} className="text-[#1E293B]" />
                <span className="absolute -top-1.5 -right-2 bg-[#E05315] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black leading-none">
                  2
                </span>
              </div>
              <span className="text-[11px] font-semibold">Cart</span>
            </LinkNext>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-1 text-[#1E293B] relative" aria-label="Notifications">
              <Bell size={22} />
              <span className="absolute top-0 right-0 bg-[#E05315] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-black leading-none">
                3
              </span>
            </button>

            <LinkNext href="/cart" className="p-1 text-[#1E293B] relative" aria-label="Cart">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-[#E05315] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-black leading-none">
                2
              </span>
            </LinkNext>
          </div>

        </div>

        {/* 3. SUB-NAVBAR CATEGORIES (Desktop Only) */}
        <div className="hidden lg:block border-t border-[#E2E8F0] bg-white">
          <div className="max-w-[1280px] mx-auto px-8 h-[48px] flex items-center gap-6">
            
            {/* All Categories Button */}
            <button className="bg-[#E05315] hover:bg-[#EA580C] text-white px-5 h-[48px] font-bold text-sm tracking-wide transition-colors flex items-center gap-2">
              <Menu size={16} />
              <span>All Categories</span>
            </button>

            {/* Quick Links */}
            <nav className="flex items-center gap-6 text-sm font-semibold text-[#475569]">
              {categories.map((cat) => (
                <LinkNext 
                  key={cat.name} 
                  href={cat.href} 
                  className="hover:text-[#1E293B] hover:underline underline-offset-4 decoration-2 decoration-[#0F5A31] transition-colors py-2"
                >
                  {cat.name}
                </LinkNext>
              ))}
              <div className="flex items-center gap-1 cursor-pointer hover:text-[#1E293B] transition-colors py-2">
                <span>More</span>
                <ChevronDown size={14} />
              </div>
            </nav>

          </div>
        </div>

        {/* 4. MOBILE SUB-ROW: Location & Search (Image 2) */}
        <div className="lg:hidden border-t border-[#E2E8F0] px-4 py-2.5 bg-white flex flex-col gap-2.5">
          {/* Mobile Location Selector */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
            <MapPin size={14} className="text-[#E05315]" />
            <span>Patna, Bihar</span>
            <ChevronDown size={12} className="text-[#475569]" />
          </div>

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-[#FAF9F6] border border-[#E2E8F0] rounded-lg px-3 py-2.5 relative">
            <Search size={18} className="text-[#94A3B8] mr-2" />
            <input 
              type="text"
              placeholder="Search for products, shops, cakes, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium"
            />
            <Mic size={18} className="text-[#475569] ml-2 cursor-pointer" />
          </form>
        </div>

      </header>

      {/* 5. SIDE DRAWER NAVIGATION PANEL (Image 5) */}
      <div className={`slide-drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)}>
        <div className="slide-drawer-panel" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="slide-drawer-header">
            <div className="flex justify-between items-start">
              <div className="slide-drawer-avatar-row">
                <div className="slide-drawer-avatar">
                  <User size={32} className="text-white opacity-90" />
                </div>
                <div>
                  <h3 className="slide-drawer-name">Hello, {userName}</h3>
                  <div className="slide-drawer-location">
                    <MapPin size={13} className="text-[#E05315]" />
                    <span>Patna, Bihar</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Menu Items */}
          <div className="slide-drawer-menu">
            <LinkNext href="/" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <Home size={18} className="text-[#0F5A31]" />
              <span>Home</span>
            </LinkNext>

            <LinkNext href="/shop" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <ShoppingBag size={18} className="text-[#E05315]" />
              <span>Local Shops</span>
            </LinkNext>

            <LinkNext href="/#categories" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <Folder size={18} className="text-[#0F5A31]" />
              <span>Categories</span>
            </LinkNext>

            <LinkNext href="/dashboard" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <ShoppingBag size={18} className="text-[#0F5A31]" />
              <span>My Orders</span>
            </LinkNext>

            <LinkNext href="/dashboard" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <Heart size={18} className="text-red-500" />
              <span>Wishlist</span>
            </LinkNext>

            <LinkNext href="/dashboard" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <Tag size={18} className="text-[#0F5A31]" />
              <span>Offers</span>
            </LinkNext>

            <LinkNext href="/dashboard" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <Gift size={18} className="text-[#0F5A31]" />
              <span>Refer & Earn</span>
            </LinkNext>

            <div className="slide-drawer-divider" />

            <div className="slide-drawer-item" onClick={() => { setIsDrawerOpen(false); router.push("/?loc=Patna"); }}>
              <MapPin size={18} className="text-[#0F5A31]" />
              <span>Change District</span>
            </div>

            <LinkNext href="/vendor/login" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <div className="w-[18px] h-[18px] bg-[#0F5A31] rounded-sm flex items-center justify-center text-[7px] text-white font-extrabold">V</div>
              <span>Become a Seller</span>
            </LinkNext>

            <div className="slide-drawer-divider" />

            <a href="tel:+919142717690" className="slide-drawer-item">
              <PhoneCall size={18} className="text-[#0F5A31]" />
              <span>Support</span>
            </a>

            <LinkNext href="/#help" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
              <HelpCircle size={18} className="text-[#0F5A31]" />
              <span>Help Center</span>
            </LinkNext>

            <div className="slide-drawer-divider" />

            {session ? (
              <button 
                onClick={() => { signOut(); setIsDrawerOpen(false); }}
                className="slide-drawer-item text-red-500 hover:bg-red-50"
                style={{ width: "100%", textAlign: "left" }}
              >
                <LogOut size={18} className="text-red-500" />
                <span>Logout</span>
              </button>
            ) : (
              <LinkNext href="/auth/login" onClick={() => setIsDrawerOpen(false)} className="slide-drawer-item">
                <User size={18} className="text-[#0F5A31]" />
                <span>Login</span>
              </LinkNext>
            )}

          </div>
        </div>
      </div>

      {/* 6. MOBILE BOTTOM NAVIGATION BAR (Image 2) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-lg flex items-center justify-around h-[60px] px-2 text-[10px] font-bold text-[#475569]">
        <LinkNext href="/" className="flex flex-col items-center gap-0.5 text-[#0F5A31]">
          <Home size={20} fill="#0F5A31" className="text-[#0F5A31]" />
          <span>Home</span>
        </LinkNext>

        <LinkNext href="/#categories" className="flex flex-col items-center gap-0.5 hover:text-[#0F5A31] transition-colors">
          <Folder size={20} />
          <span>Categories</span>
        </LinkNext>

        <LinkNext href="/shop" className="flex flex-col items-center gap-0.5 hover:text-[#0F5A31] transition-colors">
          <ShoppingBag size={20} />
          <span>Shops</span>
        </LinkNext>

        <LinkNext href="/dashboard" className="flex flex-col items-center gap-0.5 hover:text-[#0F5A31] transition-colors">
          <ShoppingCart size={20} />
          <span>Orders</span>
        </LinkNext>

        <LinkNext href="/dashboard" className="flex flex-col items-center gap-0.5 hover:text-[#0F5A31] transition-colors">
          <User size={20} />
          <span>Profile</span>
        </LinkNext>
      </div>
    </>
  );
}
