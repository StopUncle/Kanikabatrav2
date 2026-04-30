import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Thank you. Kanika Batra",
  description: "Thank you for supporting Kanika's work.",
  robots: { index: false, follow: false }, // post-purchase page; no SEO value
};

/**
 * Lightweight static thanks page. Stripe redirects here with
 * ?session_id=cs_... but we don't actually need the id, the receipt
 * email is sent by the webhook (server-side, retry-safe), not by
 * polling the session here. This page is just the breath-out moment.
 */
export default function DonateThanksPage() {
  return (
    <main className="min-h-screen bg-deep-black text-text-light flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-warm-gold/40 bg-warm-gold/10 mb-8"
          aria-hidden
        >
          <Heart
            size={32}
            fill="#d4af37"
            color="#d4af37"
            style={{ filter: "drop-shadow(0 0 18px rgba(212,175,55,0.45))" }}
          />
        </div>

        <h1 className="text-4xl font-extralight tracking-wide text-white mb-5">
          Thank you.
        </h1>

        <p className="text-text-gray leading-relaxed mb-3">
          Your donation came through. Stripe will email you a receipt
          shortly.
        </p>
        <p className="text-text-gray/80 text-sm leading-relaxed mb-10 italic">
          Genuinely. This kind of support is what keeps the writing,
          the simulator, and the community going. Kanika reads every
          message that comes in.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-warm-gold/40 text-warm-gold hover:bg-warm-gold/10 transition text-sm tracking-wider uppercase"
        >
          <ArrowLeft size={14} />
          Back to the site
        </Link>
      </div>
    </main>
  );
}
