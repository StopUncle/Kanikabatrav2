"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, ElementType, CSSProperties } from "react";

/**
 * FocusReveal — v3's entrance. Content arrives slightly low, dim, and a
 * touch small, then settles up on a long, weighty ease.
 *
 * Deliberately NOT framer-motion. An earlier framer version SSR'd a
 * hidden `initial` state whose transform serialized differently on the
 * server than the client, so hydration refused to patch it and reveals
 * stuck invisible. Here the hidden state is a CSS class (`.v3-reveal`) —
 * identical bytes on both sides, so there is nothing to mismatch — and JS
 * only adds `.is-visible`. `immediate` reveals on mount (use it above the
 * fold, where a missed observer would hide the first thing a visitor
 * sees); otherwise an IntersectionObserver reveals on scroll. Reduced
 * motion is handled in CSS.
 */
type Tag = "div" | "section" | "span" | "li" | "p" | "h1" | "h2" | "h3";

interface FocusRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger position among siblings. Each step adds 110ms. */
  index?: number;
  /** Extra delay in seconds. */
  delay?: number;
  /** Vertical travel in px. Default 26. */
  y?: number;
  /** Reveal on mount instead of on scroll-into-view. */
  immediate?: boolean;
  as?: Tag;
}

export default function FocusReveal({
  children,
  className = "",
  index = 0,
  delay = 0,
  y = 26,
  immediate = false,
  as = "div",
}: FocusRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const Tag = as as ElementType;
  const style = {
    "--rv-y": `${y}px`,
    "--rv-delay": `${index * 0.11 + delay}s`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      style={style}
      className={`v3-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
