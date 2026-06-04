import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, Heart, Share2, Star, Clock, ShoppingBag, Check 
} from "lucide-react";
import Link from "next/link";
import ProductAddToCartButton from "./ProductAddToCartButton";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return { title: "Product Not Found | District Kart" };
  }

  return {
    title: `${product.name} | Shop Local on District Kart`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      shop: { include: { vendor: true } },
      subCategory: true,
    },
  });

  if (!product) notFound();

  // Sweets-specific mock values matching reference
  const isRasgulla = product.name.toLowerCase().includes("rasgulla");
  const mockRating = isRasgulla ? "4.5" : "4.6";
  const mockRatingsCount = isRasgulla ? "128" : "85";
  const vendorSince = isRasgulla ? "2015" : "2018";
  const deliveryDuration = isRasgulla ? "30-40 mins" : "25-35 mins";

  // Product description bullet details
  const detailsList = [
    `${product.description}`,
    "100% Pure & Fresh",
    "No Added Preservatives",
    "Hygienically Packed"
  ];

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-20 lg:pb-0">
      
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="max-w-[768px] mx-auto bg-white min-h-screen flex flex-col relative shadow-sm">
        
        {/* 1. HEADER ICONS BLOCK */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#E2E8F0] bg-white sticky top-0 z-30">
          <Link href={`/category/Sweets`} className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
            <ArrowLeft size={18} className="text-[#1E293B]" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors text-red-500">
              <Heart size={16} fill="currentColor" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F1F5F9] transition-colors">
              <Share2 size={16} className="text-[#475569]" />
            </button>
          </div>
        </div>

        {/* 2. LARGE PRODUCT IMAGE CAROUSEL */}
        <div className="relative w-full aspect-[1.1/1] bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#94A3B8] font-bold text-lg bg-[#FAF9F6]">
              No Image
            </div>
          )}

          {/* Carousel indicators dots */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
            <span className="w-2 h-2 rounded-full bg-[#E05315]" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="w-2 h-2 rounded-full bg-white/60" />
          </div>
        </div>

        {/* 3. PRODUCT INFO SECTION */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="font-black text-[#1E293B] text-[22px] tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs font-semibold text-[#64748B] mt-0.5 leading-relaxed">
              Soft &amp; spongy sweets made from premium chhena.
            </p>
          </div>

          {/* Price & Rating Row */}
          <div className="flex items-center justify-between py-2 border-y border-[#E2E8F0]">
            <span className="font-black text-[#1E293B] text-[24px]">
              ₹{product.price}
            </span>

            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1E293B]">
              <span className="bg-[#FAF9F6] border border-[#CBD5E1] px-2 py-0.5 rounded flex items-center gap-0.5 text-[#E05315]">
                <span>{mockRating}</span>
                <span className="text-[#FBBF24]">★</span>
              </span>
              <span className="text-[#64748B] font-medium">({mockRatingsCount} ratings)</span>
            </div>
          </div>

          {/* 4. VENDOR CARD */}
          <div className="border border-[#E2E8F0] rounded-xl p-4 bg-[#FAF9F6] flex items-center gap-3.5 mt-2">
            <div className="w-12 h-12 rounded-full bg-[#0F5A31] text-white font-extrabold text-xl flex items-center justify-center shrink-0">
              {product.shop.name.charAt(0)}
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">From</span>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-[#1E293B] text-sm truncate leading-none">
                  {product.shop.name}
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#EBF7EE] border border-[#BBF7D0] flex items-center justify-center text-[7px] text-[#0F5A31] font-black scale-90 shrink-0">✓</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#64748B] mt-1.5">
                <span>Since {vendorSince}</span>
                <span className="text-[#94A3B8]">•</span>
                <div className="flex items-center gap-0.5">
                  <Clock size={11} className="text-[#94A3B8]" />
                  <span>{deliveryDuration}</span>
                </div>
              </div>
            </div>

            <Link href={`/shop/${product.shop.id}`} className="border border-[#E05315] hover:bg-[#FFF7ED] text-[#E05315] text-[11px] font-black px-3.5 py-1.8 rounded-lg transition-colors text-center shrink-0">
              View Shop
            </Link>
          </div>

          {/* 5. PRODUCT DETAILS */}
          <div className="flex flex-col gap-3 mt-4">
            <h4 className="font-extrabold text-[#1E293B] text-sm">
              Product Details
            </h4>
            <ul className="flex flex-col gap-2 pl-1.5 text-xs text-[#475569] font-medium leading-relaxed">
              {detailsList.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0F5A31] mt-0.5 shrink-0">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. SELECT QUANTITY */}
          <div className="flex flex-col gap-3 mt-4 mb-4">
            <h4 className="font-extrabold text-[#1E293B] text-sm">
              Select Quantity
            </h4>
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white border border-[#E2E8F0] px-4 py-3.5 rounded-xl text-center cursor-pointer hover:bg-[#FAF9F6] transition-colors flex flex-col items-center">
                <span className="text-[13px] font-extrabold text-[#1E293B]">250gm</span>
                <span className="text-[11px] font-bold text-[#64748B] mt-0.5">₹70</span>
              </button>

              <button className="flex-1 bg-white border border-[#E2E8F0] px-4 py-3.5 rounded-xl text-center cursor-pointer hover:bg-[#FAF9F6] transition-colors flex flex-col items-center">
                <span className="text-[13px] font-extrabold text-[#1E293B]">500gm</span>
                <span className="text-[11px] font-bold text-[#64748B] mt-0.5">₹130</span>
              </button>

              <button className="flex-1 bg-[#FFF7ED] border-2 border-[#E05315] px-4 py-3.5 rounded-xl text-center cursor-pointer transition-colors flex flex-col items-center shadow-sm">
                <span className="text-[13px] font-black text-[#E05315]">1kg</span>
                <span className="text-[11px] font-black text-[#E05315]/80 mt-0.5">₹{product.price}</span>
              </button>
            </div>
          </div>

        </div>

        {/* 7. FIXED BOTTOM ADD TO CART BAR */}
        <ProductAddToCartButton productId={product.id} productName={product.name} />

      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <Footer />
      </div>
    </main>
  );
}
