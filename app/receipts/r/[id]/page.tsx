import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import ReceiptBody from "@/components/receipts/ReceiptBody";
import { getPublicReceipt } from "@/lib/receipts/public";

export const dynamic = "force-dynamic";

interface PageParams {
  params: Promise<{ id: string }>;
}

/** First-section teaser for the link preview description. */
function teaser(read: string): string {
  const afterFirstHeading = read.replace(/^[\s\S]*?##[^\n]*\n/, "");
  const body = afterFirstHeading.split(/\n##\s/)[0] ?? read;
  const cleaned = body.replace(/\s+/g, " ").trim();
  return cleaned.length <= 160 ? cleaned : `${cleaned.slice(0, 157).trimEnd()}...`;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const receipt = await getPublicReceipt(id);
  const title = "The Receipt | Read in Kanika's voice";
  const description = receipt
    ? teaser(receipt.response)
    : "Paste a text. Get the read nobody around you will give you. Free.";
  const ogImage = `/api/og/receipts/${id}`;

  return {
    title,
    description,
    alternates: { canonical: `https://kanikarose.com/receipts/r/${id}` },
    openGraph: {
      title,
      description,
      url: `https://kanikarose.com/receipts/r/${id}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SharedReceiptPage({ params }: PageParams) {
  const { id } = await params;
  const receipt = await getPublicReceipt(id);

  return (
    <>
      <Header />
      <BackgroundEffects />
      <main className="relative min-h-screen px-4 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <header className="mb-8 text-center">
            <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
              The Receipt
            </p>
            <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase text-text-light">
              Read in Kanika&rsquo;s voice
            </h1>
          </header>

          {receipt ? (
            <article className="rounded-lg border border-accent-gold/40 bg-accent-gold/5 p-6 sm:p-8">
              <ReceiptBody markdown={receipt.response} />
            </article>
          ) : (
            <div className="rounded-lg border border-gray-800 bg-deep-black/40 p-10 text-center">
              <p className="text-text-gray font-light text-sm">
                This read is no longer available.
              </p>
            </div>
          )}

          <div className="mt-10 rounded-lg border border-gray-800 bg-deep-black/40 p-8 text-center">
            <p className="text-text-light text-base font-light mb-2">
              Got a text you cannot read?
            </p>
            <p className="text-text-gray text-sm font-light mb-5 max-w-md mx-auto leading-relaxed">
              Paste it, or drop the screenshot. Get what they&rsquo;re doing,
              what they want, and your clean move. Your first read is free.
            </p>
            <Link
              href="/receipts"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent-gold text-deep-black font-medium tracking-wider uppercase text-xs hover:bg-accent-gold/90 transition-all"
            >
              Get your own read
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="text-text-gray/50 text-xs mt-10 leading-relaxed text-center max-w-xl mx-auto">
            Receipts is pattern recognition training. It reads the situation and
            your options, never a verdict on another person. Not medical, legal,
            or therapeutic advice.
          </p>
        </div>
      </main>
    </>
  );
}
