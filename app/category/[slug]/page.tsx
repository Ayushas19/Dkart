import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Filter, SlidersHorizontal, Zap, Leaf, MapPin, Heart, Clock, Check, Truck, Store } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export const revalidate = 0; // Disable cache for live seeds

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);

  // 1. Find the MainCategory
  const mainCategory = await prisma.mainCategory.findFirst({
    where: { name: { equals: decodedSlug } },
  });

  // 2. Find active products under this main category
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      shop: {
        status: "APPROVED",
        isActive: true
      },
      ...(mainCategory
        ? { subCategory: { mainCategoryId: mainCategory.id } }
        : { subCategory: { name: { contains: decodedSlug } } }),
    },
    include: {
      shop: { include: { vendor: true } },
      subCategory: true,
    },
  });

  const displayName = mainCategory?.name ?? decodedSlug;

  // Custom styling helper for category banner background based on category
  const getBannerStyle = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("sweet")) return { bg: "bg-[#FFF2F2]", border: "border-[#FBC2C2]", text: "text-[#E1306C]" };
    if (n.includes("cake")) return { bg: "bg-[#FDF2F8]", border: "border-[#FBCFE8]", text: "text-[#DB2777]" };
    if (n.includes("cloth")) return { bg: "bg-[#EBF7EE]", border: "border-[#BBF7D0]", text: "text-[#16A34A]" };
    if (n.includes("restau")) return { bg: "bg-[#FFF7ED]", border: "border-[#FFEDD5]", text: "text-[#EA580C]" };
    if (n.includes("cosme")) return { bg: "bg-[#FAF5FF]", border: "border-[#F3E8FF]", text: "text-[#9333EA]" };
    return { bg: "bg-[#F8FAFC]", border: "border-[#E2E8F0]", text: "text-[#475569]" };
  };

  const themeStyle = getBannerStyle(displayName);

  const getCategoryIconImage = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("sweet")) return "/images/categories/sweets.png";
    if (n.includes("cake")) return "/images/categories/cake.png";
    if (n.includes("cloth")) return "/images/categories/clothing.png";
    if (n.includes("restau")) return "/images/categories/restaurant.png";
    if (n.includes("cosme")) return "/images/categories/cosmetics.png";
    if (n.includes("hotel")) return "/images/categories/hotels.png";
    if (n.includes("pharm")) return "/images/categories/pharmacy.png";
    return "/images/categories/sweets.png";
  };

  const getSweetsInfo = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("rasgulla")) return { sub: "Soft & spongy rasgulla", rating: "4.5", count: "128", time: "30-40 mins" };
    if (n.includes("kaju")) return { sub: "Premium kaju katli", rating: "4.7", count: "96", time: "25-35 mins" };
    if (n.includes("laddu") || n.includes("laddu")) return { sub: "Traditional motichoor laddus", rating: "4.6", count: "74", time: "40-50 mins" };
    if (n.includes("jamun")) return { sub: "Soft & juicy gulab jamun", rating: "4.4", count: "58", time: "30-40 mins" };
    return { sub: "Delicious fresh sweets", rating: "4.5", count: "48", time: "30-40 mins" };
  };

  const sweetsInfo = getSweetsInfo(displayName);

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-16 lg:pb-0">
      <Header />

      <div className="max-w-[768px] mx-auto px-4 py-4 flex flex-col gap-4">
        
        {/* 1. CATEGORY TITLE BANNER (Image 3 Top-Left) */}
        <div className={`rounded-2xl p-6 border ${themeStyle.border} ${themeStyle.bg} flex items-center justify-between relative overflow-hidden shadow-sm`}>
          <div className="flex flex-col gap-1.5 z-10">
            <h1 className="font-extrabold text-2xl text-[#1E293B] tracking-tight">
              {displayName}
            </h1>
            <p className="text-xs font-semibold text-[#64748B] max-w-[260px] leading-relaxed">
              Fresh &amp; delicious {displayName.toLowerCase()} from trusted stores.
            </p>
          </div>

          {/* Right Floating Circle representation of sweet bowl / category icon */}
          <div className="w-[84px] h-[84px] rounded-full bg-[#E05315]/10 border border-[#E05315]/20 flex items-center justify-center p-3.5 shadow-inner overflow-hidden animate-bounce">
            <img 
              src={getCategoryIconImage(displayName)} 
              alt={displayName} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 2. HORIZONTAL SCROLLING FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-width-none py-1">
          <button className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-full text-xs font-extrabold text-[#1E293B] shadow-sm hover:bg-[#FAF9F6] transition-colors shrink-0">
            <Filter size={13} className="text-[#475569]" />
            <span>Filters</span>
          </button>
          
          <button className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-full text-xs font-extrabold text-[#1E293B] shadow-sm hover:bg-[#FAF9F6] transition-colors shrink-0">
            <SlidersHorizontal size={13} className="text-[#475569]" />
            <span>Sort</span>
          </button>

          <button className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-full text-xs font-extrabold text-[#1E293B] shadow-sm hover:bg-[#FAF9F6] transition-colors shrink-0">
            <Zap size={13} className="text-[#E05315]" fill="#E05315" />
            <span>Fast Delivery</span>
          </button>

          <button className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-full text-xs font-extrabold text-[#1E293B] shadow-sm hover:bg-[#FAF9F6] transition-colors shrink-0">
            <Leaf size={13} className="text-[#10B981]" fill="#10B981" />
            <span>Pure Veg</span>
          </button>
        </div>

        {/* 3. MOBILE DELIVERY TIMELINE CARD */}
        <div className="bg-[#FFF8F3] border border-[#FFEDD5] rounded-xl p-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E05315]/10 flex items-center justify-center text-xl shrink-0">
              <Truck size={18} className="text-[#E05315]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-[#1E293B]">
                Delivering to <span className="text-[#E05315]">Patna, Bihar</span>
              </span>
              <span className="text-[10px] font-bold text-[#64748B] mt-0.5">
                Within 30-45 mins
              </span>
            </div>
          </div>
          <button className="text-xs font-black text-[#E05315] hover:underline px-2.5 py-1">
            Change
          </button>
        </div>

        {/* 4. PRODUCT TWO-COLUMN GRID LISTING */}
        <div className="grid grid-cols-2 gap-4 mt-1">
          {products.length > 0 ? (
            products.map((prod) => {
              const sweetsInfo = getSweetsInfo(prod.name);
              
              return (
                <div key={prod.id} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow relative">
                  
                  {/* Heart Like Toggle Icon */}
                  <button className="absolute top-3 right-3 z-10 w-7.5 h-7.5 rounded-full bg-white/90 shadow-md border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-red-500 hover:scale-105 active:scale-95 transition-all">
                    <Heart size={14} />
                  </button>

                  {/* Bestseller Badge */}
                  {prod.name.includes("Rasgulla") && (
                    <span className="absolute top-3 left-3 z-10 bg-[#0F5A31] text-white text-[9px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}

                  {/* Product Thumbnail image */}
                  <Link href={`/product/${prod.id}`} className="block relative aspect-square bg-[#F8FAFC] overflow-hidden border-b border-[#E2E8F0]">
                    {prod.imageUrl ? (
                      <img 
                        src={prod.imageUrl} 
                        alt={prod.name}
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8] font-bold text-xs">
                        No Image
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-3.5 flex flex-col flex-grow gap-1">
                    
                    {/* Title */}
                    <Link href={`/product/${prod.id}`}>
                      <h3 className="font-extrabold text-[#1E293B] text-sm hover:text-[#0F5A31] transition-colors leading-tight truncate">
                        {prod.name}
                      </h3>
                    </Link>

                    {/* Subtext description */}
                    <span className="text-[11px] font-medium text-[#64748B] leading-tight line-clamp-1">
                      {sweetsInfo.sub}
                    </span>

                    {/* Rating, Vendor & Duration Metrics */}
                    <div className="flex flex-col gap-1 mt-1.5">
                      {/* Price Row */}
                      <span className="font-black text-[#1E293B] text-base leading-none">
                        ₹{prod.price}
                      </span>

                      {/* Ratings Badge count */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#1E293B]">
                        <span className="bg-[#FAF9F6] border border-[#CBD5E1] px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                          <span>{sweetsInfo.rating}</span>
                          <span className="text-[#FBBF24]">★</span>
                        </span>
                        <span className="text-[#64748B]">({sweetsInfo.count})</span>
                      </div>

                      {/* Shop vendor verified title */}
                      <Link href={`/shop/${prod.shop.id}`} className="flex items-center gap-1 text-[11px] font-extrabold text-[#0F5A31] hover:underline truncate mt-0.5">
                        <span className="truncate">{prod.shop.name}</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#EBF7EE] border border-[#BBF7D0] flex items-center justify-center text-[7px] text-[#0F5A31] font-black scale-90 shrink-0">✓</span>
                      </Link>

                      {/* Time clock duration */}
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#64748B] mt-0.5">
                        <Clock size={11} className="text-[#94A3B8]" />
                        <span>{sweetsInfo.time}</span>
                      </div>
                    </div>

                    {/* Action Bottom Add Button */}
                    <div className="mt-3.5 pt-2.5 border-t border-[#E2E8F0] flex justify-end">
                      <Link href={`/product/${prod.id}`} className="bg-white border border-[#E05315] hover:bg-[#FFF7ED] text-[#E05315] font-extrabold text-xs px-4 py-1.5 rounded-lg shadow-sm transition-colors text-center">
                        Add
                      </Link>
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-2 py-16 text-center text-[#64748B] font-medium bg-white rounded-2xl border border-[#E2E8F0]">
              <Store size={36} className="text-[#94A3B8] mx-auto mb-3" />
              No products found under {displayName} category in Patna.
            </div>
          )}
        </div>

      </div>

      <Footer />
    </main>
  );
}
