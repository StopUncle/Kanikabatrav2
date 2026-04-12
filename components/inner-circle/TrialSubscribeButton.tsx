"use client";

import { useState } from "react";

export default function TrialSubscribeButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/inner-circle/subscription/create", {
        method: "POST",
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      alert(data.error || "Unable to start checkout. Please try again.");
    } catch {
      alert("Unable to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="text-accent-gold underline hover:text-accent-gold/80 ml-1 disabled:opacity-60"
    >
      {loading ? "Loading..." : "Subscribe to keep access"}
    </button>
  );
}
