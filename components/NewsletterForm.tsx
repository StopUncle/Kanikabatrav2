"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "newsletter",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(
          data.isNew ? "Welcome to the edge." : "You're already one of us.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-4"
          >
            <div className="text-accent-gold text-lg mb-2">{message}</div>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm text-text-gray hover:text-white transition-colors"
            >
              Subscribe another email
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === "loading"}
              className="flex-1 px-6 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-full text-text-light placeholder-text-gray focus:outline-none focus:border-accent-gold/50 transition-colors disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary rounded-full text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <m.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Joining...
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <m.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center mt-3"
        >
          {message}
        </m.p>
      )}
    </div>
  );
}
