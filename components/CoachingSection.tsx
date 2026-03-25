"use client";

import { useRouter } from "next/navigation";
import CoachingTiers from "./CoachingTiers";

export default function CoachingSection() {
  const router = useRouter();

  const handlePackageSelect = (packageId: string) => {
    router.push(`/coaching#${packageId}`);
  };

  return (
    <section id="coaching" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            <span className="gradient-text">I Tell You What I See</span>
          </h2>
          <p className="text-text-gray text-lg md:text-xl max-w-3xl mx-auto">
            1:1 coaching. No softening, no filtering.
          </p>
        </div>

        {/* Coaching Tiers Component */}
        <CoachingTiers onSelect={handlePackageSelect} />

        {/* CTA for Coaching */}
        <div className="text-center mt-12">
          <p className="text-text-gray mb-6">Not sure which one? Start with One Situation.</p>
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
