"use client";

import { m } from "framer-motion";
import { CreditCard, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { getPayhipCheckoutUrl } from "@/lib/payhip";

interface PayhipButtonProps {
  productCode: string;
  email?: string;
  label?: string;
  price?: string;
  className?: string;
  icon?: "cart" | "card" | "none";
}

export default function PayhipButton({
  productCode,
  email,
  label = "Buy Now",
  price,
  className,
  icon = "card",
}: PayhipButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!productCode) {
      return;
    }
    setLoading(true);
    const url = getPayhipCheckoutUrl(productCode, { email });
    window.location.href = url;
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
    <m.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      disabled={loading || !productCode}
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
    </m.button>
  );
}
