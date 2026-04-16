"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { m } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";

function SuccessContent() {
  const [activating, setActivating] = useState(true);
  const [activated, setActivated] = useState(false);
  const attemptsRef = useRef(0);

  // Lemon Squeezy redirects here after checkout. The webhook activates
  // the membership asynchronously, so we poll until it's active.
  useEffect(() => {
    const MAX_ATTEMPTS = 30;
    const POLL_INTERVAL = 2000;

    function checkActivation() {
      fetch("/api/inner-circle/subscription/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.status === "ACTIVE") {
            setActivated(true);
            setActivating(false);
          } else {
            attemptsRef.current += 1;
            if (attemptsRef.current >= MAX_ATTEMPTS) {
              setActivating(false);
            } else {
              setTimeout(checkActivation, POLL_INTERVAL);
            }
          }
        })
        .catch(() => {
          attemptsRef.current += 1;
          if (attemptsRef.current >= MAX_ATTEMPTS) {
            setActivating(false);
          } else {
            setTimeout(checkActivation, POLL_INTERVAL);
          }
        });
    }

    checkActivation();
  }, []);

  if (activating) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-accent-gold animate-spin mx-auto mb-4" />
          <p className="text-text-gray font-light">Activating your membership...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 pt-28 pb-16 relative z-10">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          {activated ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extralight text-text-light mb-4 tracking-wider uppercase">
                Welcome to The Consilium
              </h1>
              <p className="text-text-gray font-light mb-8 leading-relaxed">
                Your seat is confirmed. The courses, feed, and council are yours.
              </p>
              <Link
                href="/inner-circle/feed"
                className="inline-flex items-center gap-2 py-4 px-10 rounded-full text-deep-black font-medium tracking-wider uppercase transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #720921, #6366f1)",
                  boxShadow: "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)",
                }}
              >
                Enter The Consilium
                <ArrowRight className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-accent-gold" />
              </div>
              <h1 className="text-3xl font-extralight text-text-light mb-4 tracking-wider uppercase">
                Payment Received
              </h1>
              <p className="text-text-gray font-light mb-4">
                Your payment went through successfully. Your membership is being activated &mdash; this can take up to a minute.
              </p>
              <p className="text-text-gray font-light mb-8">
                Check your email for a confirmation, or try accessing The Consilium in a moment. If you need help, contact{" "}
                <a href="mailto:Kanika@kanikarose.com" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                  Kanika@kanikarose.com
                </a>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/inner-circle/feed"
                  className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold font-medium hover:bg-accent-gold/20 transition-colors"
                >
                  Try Entering <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="text-text-gray text-sm hover:text-accent-gold transition-colors py-3 px-6"
                >
                  Go to Dashboard
                </Link>
              </div>
            </>
          )}
        </m.div>
      </main>
    </>
  );
}

export default function InnerCircleSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-deep-black flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-accent-gold animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
