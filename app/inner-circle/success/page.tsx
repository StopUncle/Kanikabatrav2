"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";

function SuccessContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscription_id");
  const [activating, setActivating] = useState(true);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!subscriptionId) {
      setActivating(false);
      return;
    }

    fetch("/api/inner-circle/subscription/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setActivated(data.success);
        setActivating(false);
      })
      .catch(() => setActivating(false));
  }, [subscriptionId]);

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
        <motion.div
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
                Welcome to The Inner Circle
              </h1>
              <p className="text-text-gray font-light mb-8 leading-relaxed">
                Your membership is active. The courses, feed, and community are yours.
              </p>
              <Link
                href="/inner-circle/feed"
                className="inline-flex items-center gap-2 py-4 px-10 rounded-full text-deep-black font-medium tracking-wider uppercase transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #720921, #6366f1)",
                  boxShadow: "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)",
                }}
              >
                Enter The Inner Circle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-3xl font-extralight text-text-light mb-4 tracking-wider uppercase">
                Something Went Wrong
              </h1>
              <p className="text-text-gray font-light mb-8">
                We couldn&apos;t activate your membership. Please contact{" "}
                <a href="mailto:Kanika@kanikarose.com" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                  Kanika@kanikarose.com
                </a>{" "}
                for help.
              </p>
              <Link
                href="/inner-circle"
                className="text-text-gray text-sm hover:text-accent-gold transition-colors"
              >
                &larr; Back to Inner Circle
              </Link>
            </>
          )}
        </motion.div>
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
