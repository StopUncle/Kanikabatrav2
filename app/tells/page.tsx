import type { Metadata } from "next";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import TellPlayer from "@/components/tells/TellPlayer";
import { getTodaysTellRow } from "@/lib/tells/db";
import { getTodaysTell as getTodaysSeed } from "@/lib/tells/seed-tells";

// Always render fresh, the schedule changes daily.
export const dynamic = "force-dynamic";

/**
 * /tells, the public daily Tell. The funnel front door for the
 * "Train Your Instincts" platform.
 *
 * Anonymous-friendly. No auth required to play. The whole point is
 * a 60-second exercise a cold visitor can complete and share before
 * they have any reason to sign up. Score and streak get layered on
 * once the format proves itself in the spike.
 *
 * The Tell shown today is a deterministic pick from the seed pool
 * keyed on UTC date, so every visitor today plays the same Tell
 * (same as Wordle, same as the NYT mini). Once the schema lands,
 * this becomes a real schedule lookup against PUBLISHED Tells.
 */

export const metadata: Metadata = {
  title: "Today's Tell | Train Your Instincts | Kanika Batra",
  description:
    "Sixty seconds. One artifact, one question, one read. Train the instincts no one taught you, dark psychology, red flags, manipulation, power. New Tell every day.",
  alternates: {
    canonical: "https://kanikarose.com/tells",
  },
  openGraph: {
    title: "Today's Tell · Train Your Instincts",
    description:
      "Sixty seconds. One artifact, one question, one read. Train your instincts daily.",
    url: "https://kanikarose.com/tells",
    type: "website",
    images: [
      {
        url: "/api/og?title=Today%27s%20Tell&subtitle=Train%20Your%20Instincts",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Today's Tell · Train Your Instincts",
    description:
      "Sixty seconds. One artifact, one question, one read. Train your instincts daily.",
    images: [
      "/api/og?title=Today%27s%20Tell&subtitle=Train%20Your%20Instincts",
    ],
  },
};

export default async function TellsPage() {
  // Try the DB schedule first, fall back to the seed pool until the
  // first PUBLISHED Tell rows exist.
  const tell = (await getTodaysTellRow()) ?? getTodaysSeed();

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="relative z-10 min-h-screen pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 mb-10">
          <p className="text-accent-gold/60 text-[10px] uppercase tracking-[0.5em] mb-3 text-center">
            Train Your Instincts
          </p>
          <p className="text-text-gray text-center text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
            Sixty seconds. One artifact, one question, one read. The instincts
            no one taught you, sharpened daily.
          </p>
        </div>

        <TellPlayer tell={tell} />
      </main>
    </>
  );
}
