"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";
import { Star, Check, Plus } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    sellingPrice?: number;
    imageUrl: string | null;
    subCategoryId: string;
    subCategory?: { name: string } | null;
  };
  shop: {
    id: string;
    name: string;
    vendor?: {
      phone: string | null;
    } | null;
  };
  priority?: boolean;
}

export default function ProductCard({ product, shop, priority = false }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || justAdded) return;

    setIsAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast("Please sign in to add items to your cart", "info");
          router.push("/auth/login");
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add to cart");
      }
      
      setJustAdded(true);
      toast(`${product.name} added to cart!`, "success");
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error(err);
      toast("Could not add to cart. Please try again.", "error");
    } finally {
      setIsAdding(false);
    }
  }, [isAdding, justAdded, product.id, product.name, router, toast]);

  // Realistic rating fallback based on product name
  const getMockRating = (name: string) => {
    if (name.includes("Cake")) return { r: "4.6", c: "128" };
    if (name.includes("Rasgulla")) return { r: "4.5", c: "96" };
    if (name.includes("Shirt")) return { r: "4.3", c: "74" };
    if (name.includes("Paneer")) return { r: "4.4", c: "108" };
    if (name.includes("Lakme")) return { r: "4.2", c: "55" };
    return { r: "4.5", c: "32" };
  };

  const ratingInfo = getMockRating(product.name);
  const categoryTag = product.subCategory?.name || "Sweet";

  return (
    <div className="product-showcase-card">
      
      {/* Product Image Area */}
      <Link href={`/product/${product.id}`} className="product-card-image-container group">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="product-card-image"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F1F5F9] text-[#94A3B8] font-bold text-xs">
            No Image
          </div>
        )}

        {/* Bestseller Tag for Rasgulla / Cake */}
        {(product.name.includes("Rasgulla") || product.name.includes("Cake")) && (
          <span className="product-card-bestseller">
            Bestseller
          </span>
        )}
      </Link>

      {/* Info Section */}
      <div className="product-card-info">
        {/* Category & Shop Row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase text-[#E05315] tracking-wider">
            {categoryTag}
          </span>
          <Link href={`/shop/${shop.id}`} className="text-[11px] font-bold text-[#475569] hover:text-[#E05315] hover:underline transition-colors max-w-[120px] truncate">
            {shop.name}
          </Link>
        </div>

        {/* Product Title */}
        <Link href={`/product/${product.id}`} className="hover:text-[#0F5A31] transition-colors">
          <h3 className="product-card-title text-sm md:text-base text-[#1E293B]">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-3 mt-1.5 flex-grow">
          {product.description}
        </p>

        {/* Rating Row */}
        <div className="product-card-rating">
          <Star size={13} fill="#FBBF24" className="text-[#FBBF24]" />
          <span>{ratingInfo.r}</span>
          <span className="text-[#64748B] font-medium text-[11px] ml-0.5">
            ({ratingInfo.c})
          </span>
        </div>

        {/* Footer: Price + Add Button */}
        <div className="product-card-footer">
          <div className="product-card-price text-[#1E293B]">
            ₹{product.price}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="product-card-add-btn flex items-center justify-center gap-1 min-w-[76px]"
          >
            {justAdded ? (
              <Check size={14} className="text-green-600 animate-pulse" />
            ) : (
              <>
                <Plus size={14} className="text-[#0F5A31]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
