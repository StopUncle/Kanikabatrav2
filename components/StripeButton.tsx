"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Loader2 } from "lucide-react";

interface StripeButtonProps {
  priceKey: string;
  email?: string;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
  label?: string;
  price?: string;
  className?: string;
  icon?: "cart" | "card" | "none";
}

export default function StripeButton({
  priceKey,
  email,
  metadata,
  successUrl,
  cancelUrl,
  label = "Buy Now",
  price,
  className,
  icon = "card",
}: StripeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceKey,
          email,
          metadata,
          successUrl,
          cancelUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const IconComponent =
    icon === "cart" ? ShoppingCart : icon === "card" ? CreditCard : null;

  const defaultClassName =
    "w-full py-4 px-8 rounded-full text-text-light font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3";
  const defaultStyle = {
    background: "linear-gradient(135deg, #720921, #6366f1)",
    boxShadow:
      "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)",
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        disabled={loading}
        className={className || defaultClassName}
        style={className ? undefined : defaultStyle}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {IconComponent && <IconComponent className="w-5 h-5" />}
            <span>{label}</span>
            {price && <span className="opacity-80">— {price}</span>}
          </>
        )}
      </motion.button>

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
