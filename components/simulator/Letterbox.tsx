"use client";

import { m } from "framer-motion";

/**
 * Cinematic top + bottom black bars. Slide in on mount to signal
 * "you're now in story mode."
 */
export default function Letterbox() {
  return (
    <>
      <m.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 0.95] }}
        className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-black z-40 pointer-events-none"
      />
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.3, 0.95] }}
        className="fixed bottom-0 left-0 right-0 h-14 sm:h-16 bg-black z-40 pointer-events-none"
      />
    </>
  );
}
