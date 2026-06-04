"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { ShoppingBag, Check } from "lucide-react";

export default function ProductAddToCartButton({ productId, productName }: { productId: string; productName: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (isAdding || justAdded) return;

    setIsAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
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
      toast(`${productName} added to cart!`, "success");
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error(err);
      toast("Could not add to cart. Please try again.", "error");
    } finally {
      setIsAdding(false);
    }
  }, [isAdding, justAdded, productId, productName, router, toast]);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E2E8F0] shadow-lg flex items-center gap-4 h-[74px] px-5 py-3">
      {/* Shopping Bag icon outline */}
      <button 
        onClick={() => router.push("/cart")}
        className="w-12 h-12 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-[#E05315] hover:bg-[#FAF9F6] transition-colors relative"
      >
        <ShoppingBag size={20} />
        <span className="absolute -top-1.5 -right-1.5 bg-[#E05315] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black leading-none">
          2
        </span>
      </button>

      {/* Main CTA button */}
      <button 
        onClick={handleAddToCart}
        disabled={isAdding}
        className="flex-1 bg-[#E05315] hover:bg-[#EA580C] disabled:bg-[#CBD5E1] text-white font-extrabold text-sm h-12 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
      >
        {justAdded ? (
          <>
            <Check size={18} className="text-white animate-bounce" />
            <span>Added successfully!</span>
          </>
        ) : isAdding ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Adding to Cart...</span>
          </>
        ) : (
          <span>Add to Cart</span>
        )}
      </button>
    </div>
  );
}
