"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

/* ─── Context ────────────────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

/* ─── Single Toast Item ──────────────────────────────────────────────── */
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = toast.duration ?? 3000;
    const exitTimer = setTimeout(() => setExiting(true), duration - 300);
    const removeTimer = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast, onDismiss]);

  const config = {
    success: {
      bg: "#10b981",
      icon: <CheckCircle2 size={16} color="#ffffe3" />,
    },
    error: {
      bg: "#ea301f",
      icon: <XCircle size={16} color="#ffffe3" />,
    },
    info: {
      bg: "#1a1a1a",
      icon: <Info size={16} color="#ffffe3" />,
    },
  }[toast.type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 4,
        background: config.bg,
        color: "var(--text-primary)",
        fontFamily: "var(--font-display)",
        fontSize: 12,
        fontWeight: 800,
        textTransform: "uppercase",
        border: "2px solid var(--border-default)",
        boxShadow: "4px 4px 0px var(--border-default)",
        animation: exiting ? "toastSlideOut 0.3s ease forwards" : "toastSlideIn 0.35s cubic-bezier(0.21,1.02,0.73,1) forwards",
        pointerEvents: "auto",
        maxWidth: 380,
        lineHeight: 1.4,
      }}
    >
      <span style={{ flexShrink: 0, display: "flex" }}>{config.icon}</span>
      <span style={{ flex: 1, letterSpacing: "0.02em" }}>{toast.message}</span>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1.5px solid var(--border-default)",
          borderRadius: 4,
          padding: 4,
          cursor: "pointer",
          display: "flex",
          color: "var(--text-primary)",
          flexShrink: 0,
          transition: "background 0.2s",
        }}
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}

/* ─── Provider ───────────────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = "success", duration = 3000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast keyframes */}
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(40px) scale(0.95); }
        }
      `}</style>

      {/* Toast container */}
      {toasts.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column-reverse",
            gap: 10,
            pointerEvents: "none",
          }}
          aria-live="polite"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
