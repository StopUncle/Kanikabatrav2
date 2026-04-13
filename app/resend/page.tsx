"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import { Mail, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function ResendPage() {
  const [email, setEmail] = useState("");
  const [sendToEmail, setSendToEmail] = useState("");
  const [useDifferentEmail, setUseDifferentEmail] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/resend-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          sendToEmail: useDifferentEmail && sendToEmail.trim() ? sendToEmail.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error);
        return;
      }

      setStatus("success");
      setMessage(
        useDifferentEmail && sendToEmail.trim()
          ? `If a purchase was found, a fresh download link has been sent to ${sendToEmail.trim()}.`
          : "If a purchase was found for this email, a fresh download link has been sent. Check your inbox and spam folder.",
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please contact Kanika@kanikarose.com");
    }
  };

  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <Mail className="w-16 h-16 text-accent-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              <span className="gradient-text">Resend Download Link</span>
            </h1>
            <p className="text-text-gray text-lg">
              Didn&apos;t receive your book? Enter the email you used on PayPal
              and we&apos;ll send a fresh download link.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8"
          >
            {status === "success" ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-text-light text-lg mb-6">{message}</p>
                <p className="text-text-gray text-sm mb-6">
                  Still nothing? Contact{" "}
                  <a
                    href="mailto:Kanika@kanikarose.com"
                    className="text-accent-gold hover:underline"
                  >
                    Kanika@kanikarose.com
                  </a>
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                    setSendToEmail("");
                    setUseDifferentEmail(false);
                  }}
                  className="text-accent-gold hover:underline text-sm"
                >
                  Try another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-text-light text-sm font-medium mb-2"
                  >
                    PayPal Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="The email linked to your PayPal account"
                    required
                    className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setUseDifferentEmail(!useDifferentEmail)}
                    className="text-sm text-accent-gold hover:underline"
                  >
                    {useDifferentEmail
                      ? "Use same email for delivery"
                      : "Send to a different email instead?"}
                  </button>
                </div>

                {useDifferentEmail && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="sendToEmail"
                      className="block text-text-light text-sm font-medium mb-2"
                    >
                      Send Download Link To
                    </label>
                    <input
                      id="sendToEmail"
                      type="email"
                      value={sendToEmail}
                      onChange={(e) => setSendToEmail(e.target.value)}
                      placeholder="Your preferred email address"
                      className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder:text-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                    />
                  </m.div>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 bg-red-950/30 border border-red-800/30 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full btn-primary rounded-full text-white py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Resend Download Link
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-text-gray text-sm mb-4">
              If you continue to have issues, email{" "}
              <a
                href="mailto:Kanika@kanikarose.com"
                className="text-accent-gold hover:underline"
              >
                Kanika@kanikarose.com
              </a>{" "}
              with your PayPal transaction ID and we&apos;ll get you sorted.
            </p>
            <Link href="/" className="text-accent-gold hover:underline text-sm">
              &larr; Back to Home
            </Link>
          </m.div>
        </div>
      </div>
    </>
  );
}
