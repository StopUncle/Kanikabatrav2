import { redirect } from "next/navigation";
import { optionalServerAuth } from "@/lib/auth/server-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  BookOpen,
  Mic,
  Shield,
  Users,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "The Inner Circle | Kanika Batra",
  description:
    "Private community for dark psychology education — courses, voice notes, and a community of people who see through the bullshit",
};

export default async function InnerCircleLanding() {
  const userId = await optionalServerAuth();

  if (userId) {
    const membership = await prisma.communityMembership.findUnique({
      where: { userId },
      select: { status: true },
    });

    if (membership?.status === "ACTIVE") {
      redirect("/inner-circle/feed");
    }
  }

  const features = [
    {
      icon: BookOpen,
      title: "Full Course Library",
      description:
        "Dark psychology foundations, pattern recognition, career power dynamics — learn at your own pace",
    },
    {
      icon: Mic,
      title: "Voice Notes from Kanika",
      description:
        "Raw, unfiltered insights dropped when something needs to be said — not on a schedule",
    },
    {
      icon: Shield,
      title: "Troll-Free Zone",
      description:
        "Every member is vetted. Every comment is reviewed. This space is protected",
    },
    {
      icon: Users,
      title: "People Who Get It",
      description:
        "Connect with others navigating the same power dynamics — in relationships, career, and life",
    },
    {
      icon: Zap,
      title: "Dark Mirror AI",
      description:
        "24/7 AI trained on Kanika's frameworks — ask questions, get personalized insights (coming soon)",
    },
    {
      icon: Lock,
      title: "Private & Exclusive",
      description:
        "Application required. Not everyone gets in. That's the point",
    },
  ];

  const benefits = [
    "Full access to the course library — dark psychology, pattern recognition, career strategy",
    "Voice notes from Kanika — raw insights you won't hear anywhere else",
    "Community feed — discuss, react, connect with other members",
    "Dark Mirror AI — your 24/7 psychology assistant (coming soon)",
    "New courses and content added regularly",
    "The Sociopathic Dating Bible (premium edition) included",
  ];

  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* Hero */}
          <div className="text-center mb-20">
            <p className="text-accent-gold uppercase tracking-[0.3em] text-sm mb-4">
              Private Community
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider uppercase mb-6 gradient-text">
              The Inner Circle
            </h1>
            <div className="w-16 h-px bg-accent-gold/40 mx-auto mb-6" />
            <p className="text-xl text-text-gray max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              A private community for people who are done being the ones who get
              played. Courses. Voice notes. A space that&apos;s actually safe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle/apply"
                className="inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full text-text-light font-medium text-lg tracking-wider uppercase transition-all hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #720921, #6366f1)",
                  boxShadow: "0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)",
                }}
              >
                Apply to Join — $29/month
                <ArrowRight size={20} />
              </Link>
            </div>

            <p className="text-text-gray/50 text-sm mt-4">
              Cancel anytime. No contracts. No bullshit.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/10 rounded-2xl p-6 hover:border-accent-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="text-text-light font-light text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-text-gray font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* What's Inside */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-accent-gold text-sm uppercase tracking-[0.3em] mb-3">Everything Included</p>
              <h2 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
                What&apos;s Inside
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="p-8 bg-gradient-to-br from-deep-navy/60 to-deep-burgundy/60 backdrop-blur-sm border border-accent-sapphire/15 rounded-2xl">
                <div className="space-y-4">
                  {benefits.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-accent-gold mt-0.5 flex-shrink-0" />
                      <p className="text-text-gray font-light">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Anchor */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center p-10 bg-deep-black/50 border border-accent-gold/20 rounded-2xl">
              <p className="text-text-gray text-sm uppercase tracking-wider mb-4">The Math</p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-extralight text-accent-gold">$29</span>
                <span className="text-text-gray font-light">/month</span>
              </div>
              <p className="text-text-gray font-light mb-6">
                Less than a single coaching session ($297). Full community access.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-accent-gold text-xl font-light">$297</div>
                  <div className="text-text-gray text-xs">1 Coaching Session</div>
                </div>
                <div className="text-center">
                  <div className="text-accent-gold text-xl font-light">$24.99</div>
                  <div className="text-text-gray text-xs">Book (Included)</div>
                </div>
                <div className="text-center border border-accent-gold/30 rounded-lg py-2">
                  <div className="text-accent-gold text-xl font-light">$29</div>
                  <div className="text-text-gray text-xs">Inner Circle</div>
                </div>
              </div>
              <Link
                href="/inner-circle/apply"
                className="inline-flex items-center justify-center gap-2 py-4 px-10 bg-accent-gold text-deep-black font-medium tracking-wider uppercase rounded-full transition-all hover:bg-accent-gold/90 hover:shadow-lg hover:shadow-accent-gold/20"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>
              <p className="text-text-gray/40 text-xs mt-4">
                Applications are reviewed within 24 hours.
              </p>
            </div>
          </div>

          {/* Coaching Upgrade */}
          <div className="mb-16 text-center">
            <p className="text-text-gray font-light mb-2">Want direct 1:1 access?</p>
            <Link
              href="/coaching"
              className="text-accent-gold hover:text-accent-gold/80 transition-colors"
            >
              Explore Private Coaching →
            </Link>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-text-gray font-light mb-6">
              Have questions?{" "}
              <Link href="/contact" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
