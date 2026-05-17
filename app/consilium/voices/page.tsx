import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import TestimonialCard from "@/components/consilium/TestimonialCard";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Voices from inside, The Consilium | Kanika Batra",
  description:
    "What members of The Consilium say, in their own words. Voice notes and quotes from people running the work.",
};

export const revalidate = 300;

export default async function VoicesPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <div className="min-h-screen bg-deep-black text-text-light">
      <BackgroundEffects />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-14">
          <span className="text-warm-gold text-xs tracking-[0.3em] uppercase font-medium">
            Voices from inside
          </span>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-wider uppercase mt-3 mb-3">
            <span className="gradient-text-gold">In Their Words</span>
          </h1>
          <div className="w-16 h-px bg-warm-gold/30 mx-auto mt-4 mb-6" />
          <p className="text-text-gray font-light max-w-xl mx-auto leading-relaxed">
            We do not script these. Members talk about what changed for
            them after spending real time inside The Consilium. No
            interviews, no leading questions, no edits.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="max-w-md mx-auto text-center p-10 bg-deep-black/40 border border-warm-gold/10 rounded-2xl">
            <p className="text-text-gray font-light">
              First voices are still being recorded. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} variant="wall" />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/consilium/apply"
            className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-warm-gold text-deep-black font-medium text-base tracking-wider uppercase transition-all hover:bg-warm-gold/90"
          >
            Join The Consilium
            <ArrowRight size={18} />
          </Link>
          <p className="text-text-gray/70 text-xs mt-3">
            Instant access · cancel anytime · 7-day refund
          </p>
        </div>
      </div>
    </div>
  );
}
