"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/Toast";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  discount?: number;
  sellingPrice?: number;
  imageUrl?: string;
  shop: { id: string; name: string; logoUrl?: string };
  subCategory: { id: string; name: string };
}

interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (res.ok) setItems(await res.json());
    } catch {
      toast("Failed to load cart", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (status === "authenticated") fetchCart();
    if (status === "unauthenticated") setLoading(false);
  }, [status, fetchCart]);

  const updateQty = useCallback(async (productId: string, delta: number, currentQty: number) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return removeItem(productId);

    // Optimistic update — update UI immediately
    const previousItems = [...items];
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: newQty } : i
      )
    );
    setUpdatingId(productId);

    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQty }),
      });

      if (!res.ok) throw new Error("Failed to update");
    } catch {
      // Rollback on failure
      setItems(previousItems);
      toast("Failed to update quantity", "error");
    } finally {
      setUpdatingId(null);
    }
  }, [items, toast]);

  const removeItem = useCallback(async (productId: string) => {
    // Optimistic: remove from UI immediately
    const previousItems = [...items];
    const removedItem = items.find((i) => i.product.id === productId);
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    setUpdatingId(productId);

    try {
      const res = await fetch(`/api/cart?productId=${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove");
      toast(`${removedItem?.product.name ?? "Item"} removed from cart`, "info");
    } catch {
      // Rollback on failure
      setItems(previousItems);
      toast("Failed to remove item", "error");
    } finally {
      setUpdatingId(null);
    }
  }, [items, toast]);

  const effectivePrice = (p: CartProduct) => (p.discount ?? 0) > 0 ? (p.sellingPrice ?? p.price) : p.price;
  const subtotal = items.reduce((acc, i) => acc + effectivePrice(i.product) * i.quantity, 0);
  const deliveryFee = items.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[var(--accent-red)] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-sm w-full bg-[var(--bg-card)] border-2 border-[var(--border-default)] shadow-[4px_4px_0px_var(--border-default)] rounded-sm p-10 text-center">
            <div className="w-16 h-16 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-sm flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-[var(--accent-red)]" />
            </div>
            <h2 className="text-lg font-bold text-azeret text-[var(--text-primary)] mb-2">Sign in to see cart</h2>
            <p className="text-[var(--text-secondary)] text-xs mb-6">You must be logged in to view your cart items.</p>
            <Link
              href="/auth/login"
              className="btn btn-primary w-full"
            >
              Sign In <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-sm w-full bg-[var(--bg-card)] border-2 border-[var(--border-default)] shadow-[4px_4px_0px_var(--border-default)] rounded-sm p-10 text-center">
            <div className="w-16 h-16 bg-[var(--bg-secondary)] border-2 border-[var(--border-default)] rounded-sm flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-[var(--accent-red)]" />
            </div>
            <h2 className="text-lg font-bold text-azeret text-[var(--text-primary)] mb-2">Your cart is empty</h2>
            <p className="text-[var(--text-secondary)] text-xs mb-6">Looks like you haven&apos;t added any local drops yet.</p>
            <Link
              href="/"
              className="btn btn-primary w-full"
            >
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-xl sm:text-2xl font-bold text-azeret text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-[var(--accent-red)]" />
          Your Cart
          <span className="text-xs font-bold text-[var(--text-tertiary)]">({items.length} item{items.length !== 1 ? "s" : ""})</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[var(--bg-card)] rounded-sm border-2 border-[var(--border-default)] p-4 sm:p-5 flex gap-4 shadow-[3px_3px_0px_var(--border-default)]"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[var(--border-default)] rounded-sm overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)] relative">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
                        <Package size={24} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-azeret text-[var(--text-primary)] text-xs sm:text-sm leading-tight truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-[10px] text-azeret text-[var(--accent-red)] font-extrabold mt-0.5">{item.product.shop.name}</p>
                    <p className="text-[var(--text-primary)] font-bold text-azeret text-sm sm:text-base mt-1">
                      ₹{(effectivePrice(item.product) * item.quantity).toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-[10px] text-[var(--text-tertiary)]">
                        ₹{effectivePrice(item.product).toLocaleString("en-IN")} each
                      </p>
                      {(item.product.discount ?? 0) > 0 && (
                        <>
                          <span className="text-[10px] text-[var(--text-tertiary)] line-through">₹{item.product.price.toLocaleString("en-IN")}</span>
                          <span className="text-[9px] font-extrabold text-[var(--accent-cream)] bg-[var(--accent-red)] border border-[var(--border-default)] px-1 rounded-sm text-azeret">{item.product.discount}% OFF</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      disabled={updatingId === item.product.id}
                      className="text-[var(--text-tertiary)] hover:text-[var(--accent-red)] transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="flex items-center gap-1 bg-[var(--bg-secondary)] rounded-sm border-2 border-[var(--border-default)] p-1">
                      <button
                        onClick={() => updateQty(item.product.id, -1, item.quantity)}
                        disabled={updatingId === item.product.id}
                        className="w-6 h-6 rounded-sm bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition disabled:opacity-40"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-6 text-center font-bold text-xs tabular-nums text-azeret">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, 1, item.quantity)}
                        disabled={updatingId === item.product.id}
                        className="w-6 h-6 rounded-sm bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition disabled:opacity-40"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:w-72 xl:w-80">
            <div className="bg-[var(--bg-card)] rounded-sm border-2 border-[var(--border-default)] p-6 shadow-[4px_4px_0px_var(--border-default)] sticky top-24">
              <h2 className="font-bold text-azeret text-[var(--text-primary)] text-sm mb-5">Order Summary</h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-bold text-azeret">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-azeret">₹{deliveryFee}</span>
                </div>
                <div className="border-t-2 border-[var(--border-light)] pt-3 flex justify-between text-[var(--text-primary)] font-bold text-azeret text-sm">
                  <span>Total</span>
                  <span style={{ color: "var(--accent-red)", fontSize: 16 }}>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 btn btn-primary flex items-center justify-center gap-2"
                style={{ padding: "12px" }}
              >
                Checkout <ArrowRight size={14} />
              </button>
              <Link
                href="/"
                className="mt-3 w-full flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--accent-red)] font-bold uppercase tracking-wider text-azeret transition"
              >
                ← Keep Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
