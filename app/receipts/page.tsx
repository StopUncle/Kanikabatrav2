import type { Metadata } from "next";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import FreeReceiptsClient from "@/components/receipts/FreeReceiptsClient";

export const metadata: Metadata = {
  title: "Receipts | Read the text in Kanika's voice",
  description:
    "Paste a message or drop a screenshot. Get the read nobody around you will give you: what they are doing, what they want, and your clean move. Free.",
  alternates: { canonical: "https://kanikarose.com/receipts" },
  openGraph: {
    title: "Receipts | Read the text in Kanika's voice",
    description:
      "Paste a text. Get the read: what they are doing, what they want, your clean move. Free.",
    url: "https://kanikarose.com/receipts",
    type: "website",
    images: [{ url: "/api/og/try", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Receipts | Read the text in Kanika's voice",
    description:
      "Paste a text. Get the read: what they are doing, what they want, your clean move. Free.",
    images: ["/api/og/try"],
  },
};

export default function ReceiptsLandingPage() {
  return (
    <>
      <Header />
      <BackgroundEffects />
      <main className="relative min-h-screen px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center">
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
              Receipts
            </p>
            <h1 className="text-3xl sm:text-5xl font-extralight tracking-wider uppercase text-text-light mb-5">
              Paste it. Read it.
            </h1>
            <p className="text-text-gray text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              Paste a message, or drop the screenshot. You get a 3-section read
              in Kanika&rsquo;s voice: what they&rsquo;re doing, what they want,
              and the structurally clean response. The read nobody around you
              will give you. First one is free.
            </p>
          </header>

          <FreeReceiptsClient />

          <p className="text-text-gray/50 text-xs mt-12 leading-relaxed text-center max-w-xl mx-auto">
            Receipts is pattern recognition training. It reads the situation and
            your options, never a verdict on another person. Not medical, legal,
            or therapeutic advice. If you are in immediate distress, call 988
            (US) or your local crisis line.
          </p>
        </div>
      </main>
    </>
  );
}
