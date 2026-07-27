"use client";

import { useRouter } from "next/navigation";
import { COACHING_PACKAGES } from "@/lib/constants";
import CoachingTiers from "../CoachingTiers";

export default function CoachingV2() {
  const router = useRouter();

  const handlePackageSelect = (packageId: string) => {
    router.push(`/coaching#${packageId}`);
  };

  // Reframe the retainer tier: "Limited" → real scarcity ("3 spots open").
  // Same package, same price — the tier just earns its top position.
  const packages = COACHING_PACKAGES.map((pkg) =>
    pkg.id === "retainer"
      ? {
          ...pkg,
          badge: "3 Spots Open",
          description:
            "Weekly 60-minute calls plus direct voice note access. Application required — capped at 12 active retainer clients.",
          features: [
            "Weekly 60-minute calls",
            "Direct voice note access between sessions",
            "Covers everything — personal, professional, family",
            "Ongoing — capped at 12 active clients",
            "Includes the Sociopathic Dating Bible",
          ],
        }
      : pkg,
  );

  return (
    <section id="coaching" className="py-24 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
            1:1 Coaching
          </p>
          <h2 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl mb-5 tracking-tight">
            <span className="gradient-text">I Tell You What I See</span>
          </h2>
          <p className="text-text-gray text-base sm:text-lg max-w-2xl mx-auto">
            No softening. No filtering. Pick the depth of work that matches the problem.
          </p>
        </div>

        <CoachingTiers onSelect={handlePackageSelect} packages={packages} />

        <div className="text-center mt-12">
          <p className="text-text-gray mb-6 text-sm sm:text-base">
            Works with men and women. Not sure where to start? Book a single session.
          </p>
          <a
            href="/coaching"
            className="btn-primary rounded-full inline-block text-white px-8 py-4"
          >
            See All Options
          </a>
        </div>
      </div>
    </section>
  );
}
