"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Store, MessageCircle, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

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
    subCategory?: { name: string };
  };
  shop: {
    id: string;
    name: string;
    vendor?: {
      phone: string | null;
    };
  };
  priority?: boolean;
}

export default function ProductCard({ product, shop, priority = false }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const hasDiscount   = (product.discount ?? 0) > 0;
  const displayPrice  = hasDiscount ? (product.sellingPrice ?? product.price) : product.price;

  const vendorPhone = shop.vendor?.phone;
  const whatsappUrl = vendorPhone 
    ? `https://wa.me/${vendorPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`I want to buy ${product.name} from ${shop.name} listed on District Kart.`)}`
    : null;

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
      
      // Show success state on button briefly
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

  return (
    <div className="bg-[var(--bg-card)] rounded-sm border-2 border-[var(--border-default)] overflow-hidden hover:border-[var(--border-accent)] transition-all duration-300 group shadow-[4px_4px_0px_var(--border-default)] hover:shadow-[6px_6px_0px_var(--accent-red)] hover:-translate-y-0.5">
      {/* Image Container with Hover Overlay */}
      <div className="aspect-square bg-[var(--bg-secondary)] relative overflow-hidden border-b-2 border-[var(--border-default)] group-hover:border-[var(--border-accent)] transition-colors">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)] font-bold text-azeret">No Image</div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center border-2 border-[var(--border-default)] hover:scale-105 transition-transform shadow-[3px_3px_0px_var(--border-default)] hover:shadow-[4px_4px_0px_#10b981]"
              title="Order via WhatsApp"
              aria-label={`Order ${product.name} via WhatsApp`}
            >
              <MessageCircle size={18} />
            </a>
          )}
          <Link
            href={`/shop/${shop.id}`}
            className="w-12 h-12 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center border-2 border-[var(--border-default)] hover:scale-105 transition-transform shadow-[3px_3px_0px_var(--border-default)] hover:shadow-[4px_4px_0px_var(--accent-red)]"
            title="Visit Shop"
            aria-label={`Visit ${shop.name} shop`}
          >
            <Store size={18} />
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-12 h-12 rounded-full text-[var(--text-inverse)] flex items-center justify-center border-2 border-[var(--border-default)] hover:scale-105 transition-all shadow-[3px_3px_0px_var(--border-default)] hover:shadow-[4px_4px_0px_var(--accent-red)] disabled:opacity-50 ${
              justAdded ? "bg-green-500" : "bg-[var(--accent-cream)]"
            }`}
            title={justAdded ? "Added!" : "Add to Cart"}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <Check size={18} className="animate-bounce" />
            ) : isAdding ? (
              <span className="w-5 h-5 border-2 border-[var(--text-inverse)] border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart size={18} color="var(--bg-primary)" />
            )}
          </button>
        </div>

        {/* Category Badge (Visible always) */}
        <div className="absolute top-4 left-4">
          <span className="bg-[var(--bg-secondary)] px-3 py-1.5 rounded-sm text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-primary)] border-2 border-[var(--border-default)] shadow-[2px_2px_0px_var(--border-default)] text-azeret">
            {product.subCategory?.name || "Product"}
          </span>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4">
            <span className="bg-[var(--accent-red)] text-[var(--accent-cream)] text-[9px] font-black px-2 py-1 rounded-sm border-2 border-[var(--border-default)] shadow-[2px_2px_0px_var(--border-default)] text-azeret">
              {product.discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="mb-2">
            <Link href={`/shop/${shop.id}`} className="text-[10px] font-extrabold text-[var(--accent-red)] uppercase tracking-widest hover:underline text-azeret">
                {shop.name}
            </Link>
        </div>
        <h3 className="font-extrabold text-azeret text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-red)] transition-colors line-clamp-1 text-sm md:text-base" data-testid="product-name">{product.name}</h3>
        <p className="text-xs text-[var(--text-secondary)] mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-azeret text-[var(--text-primary)] tracking-tighter" data-testid="product-price">
                    ₹{displayPrice}
                  </span>
                  <span className="text-[9px] font-extrabold text-[var(--accent-cream)] bg-[var(--accent-red)] border border-[var(--border-default)] px-1 rounded-sm text-azeret">
                    {product.discount}% OFF
                  </span>
                </div>
                <span className="text-[11px] text-[var(--text-tertiary)] line-through">₹{product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-azeret text-[var(--text-primary)] tracking-tighter" data-testid="product-price">₹{product.price}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
            className={`text-[11px] font-extrabold uppercase tracking-wider text-azeret flex items-center gap-1.5 group/btn transition-colors ${
              justAdded
                ? "text-green-500"
                : "text-[var(--text-primary)] hover:text-[var(--accent-red)]"
            }`}
          >
            {justAdded ? (
              <>
                Added <Check size={12} />
              </>
            ) : isAdding ? (
              <>
                Adding
                <span className="inline-block w-3 h-3 border-2 border-[var(--text-primary)] border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                Quick Add
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
