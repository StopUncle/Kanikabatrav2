import { redirect } from "next/navigation";
import { requireServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import ApplicationForm from "@/components/consilium/ApplicationForm";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";

export const metadata = {
  title: "Apply — The Consilium | Kanika Batra",
  description: "Apply to join The Consilium — a private council for dark psychology and power dynamics.",
};

export default async function ApplyPage() {
  const userId = await requireServerAuth("/consilium/apply");

  const membership = await prisma.communityMembership.findUnique({
    where: { userId },
    select: {
      status: true,
      activatedAt: true,
      applicationData: true,
    },
  });

  if (membership?.status === "ACTIVE") {
    redirect("/consilium/feed");
  }

  // Derive context flags so the form can render the right CTA without
  // re-querying. CANCELLED + EXPIRED both have two distinct histories
  // (rejected vs former paid member, abandoned-approval vs lapsed
  // subscription) and the right message depends on which branch they're on.
  const data = membership?.applicationData as Record<string, unknown> | null;
  const wasRejected = !!(data && (data.rejectedAt || data.rejectionNote));
  const wasFormerlyPaid = !!membership?.activatedAt;

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />
      <Header />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <span className="text-accent-gold text-xs tracking-[0.3em] uppercase font-medium">The Consilium</span>
          <h1 className="text-4xl font-extralight tracking-wider uppercase mt-3 mb-2">
            <span className="gradient-text-gold">Apply to Join</span>
          </h1>
          <div className="w-16 h-px bg-accent-gold/30 mx-auto mt-4 mb-4" />
          <p className="text-text-gray max-w-lg mx-auto">
            The Consilium is a private council. We review every application
            to keep this space safe and valuable for everyone inside.
          </p>
        </div>

        <ApplicationForm
          existingStatus={membership?.status || null}
          wasRejected={wasRejected}
          wasFormerlyPaid={wasFormerlyPaid}
        />
      </div>
    </div>
  );
}
