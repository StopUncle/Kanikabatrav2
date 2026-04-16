"use client";

import { m } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import { SITE_CONFIG } from "@/lib/constants";

export default function TermsPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="text-text-gray text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </m.div>

          {/* Terms Content */}
          <div className="space-y-8">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4">
                  <p className="text-text-gray leading-relaxed">
                    By accessing and using this website, you accept and agree to
                    be bound by the terms and provision of this agreement. If
                    you do not agree to abide by the above, please do not use
                    this service.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    These terms apply to all visitors, users, and others who
                    access or use the service provided by {SITE_CONFIG.name}.
                  </p>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  2. Services and Content
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Educational Purpose
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      All content, including books, coaching sessions, and
                      educational materials, is provided for informational and
                      educational purposes only. This content is not intended as
                      medical, psychological, or therapeutic advice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Coaching Services
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      Coaching services are not therapy or medical treatment.{" "}
                      {SITE_CONFIG.name} is not a licensed therapist, counselor,
                      or medical professional. Coaching is intended for
                      high-functioning individuals seeking personal development
                      and strategic thinking enhancement.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Content Disclaimer
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      Content may include discussion of dark psychology,
                      manipulation tactics, and antisocial personality traits.
                      This content is presented for educational understanding
                      and self-protection, not for causing harm to others.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  3. Payment and Refunds
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Payment Terms
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      All payments must be made in advance of receiving
                      services. We process payments via Stripe. Prices are
                      subject to change without notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Subscription Billing (The Consilium)
                    </h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      The Consilium is a paid monthly subscription at
                      $29/month. Your subscription will automatically renew each
                      month until you cancel. You can cancel anytime from your
                      dashboard or by emailing Kanika@kanikarose.com — your
                      access continues until the end of the paid period.
                    </p>
                    <p className="text-text-gray leading-relaxed mb-4">
                      Book purchasers may receive a 30-day free trial to The
                      Consilium via email. The trial includes full access;
                      at the end of the trial your access expires unless you
                      subscribe. No charges are made during the trial.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Community Rules & Content
                    </h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      Posts, comments, forum threads, and chat messages you
                      create in The Consilium remain your own content. By
                      posting, you grant us a license to display that content
                      within the community. We may remove content that
                      violates the community guidelines (harassment, doxxing,
                      explicit content, spam) and suspend or ban accounts at
                      our sole discretion.
                    </p>
                    <p className="text-text-gray leading-relaxed">
                      Members must use a pseudonym (display name) and are
                      expected to protect the privacy of other members. Sharing
                      another member&apos;s real identity, screenshots, or
                      private messages outside the community is grounds for
                      immediate ban without refund.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Refund Policy
                    </h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      For coaching services: Full refund available if requested
                      within 24 hours of first session completion and you are
                      not satisfied. After 24 hours, no refunds will be
                      provided.
                    </p>
                    <p className="text-text-gray leading-relaxed">
                      For digital products: Due to the nature of digital
                      products, all sales are final unless otherwise specified.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  4. User Responsibilities
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Prohibited Uses
                    </h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      You agree not to use our services or content to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-text-gray ml-4">
                      <li>Harm, harass, or manipulate others</li>
                      <li>Engage in illegal activities</li>
                      <li>Violate the rights of others</li>
                      <li>Distribute malicious software or spam</li>
                      <li>Impersonate any person or entity</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Ethical Use
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      You agree to use all information and strategies learned
                      for ethical purposes, self-protection, and legitimate
                      personal development goals only.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  5. Coaching Session Conduct
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Professional Boundaries
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      All coaching sessions are strictly professional in nature.
                      By booking a session, you agree to maintain appropriate
                      conduct at all times. Coaching is a professional service
                      focused on personal development, strategy, and mindset
                      transformation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Zero-Tolerance Policy
                    </h3>
                    <p className="text-text-gray leading-relaxed mb-4">
                      Any behaviour that is sexual in nature, sexually
                      suggestive, or that violates professional boundaries will
                      result in the immediate termination of the session. This
                      includes, but is not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-text-gray ml-4">
                      <li>Sexual comments, advances, or innuendo</li>
                      <li>Requests for personal or romantic interaction</li>
                      <li>Sharing unsolicited explicit or inappropriate content</li>
                      <li>Any form of harassment or intimidation</li>
                      <li>Persistent boundary-testing or inappropriate familiarity</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Consequences
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      If a session is terminated due to a violation of this
                      policy, no refund will be issued — no exceptions. You may
                      also be permanently banned from all future services. We
                      reserve the right to report any illegal conduct to the
                      relevant authorities.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  6. Disclaimers and Limitations
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      No Guarantees
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      We make no guarantees about specific outcomes or results.
                      Individual results may vary based on personal
                      circumstances, effort, and application of provided
                      strategies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Limitation of Liability
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      {SITE_CONFIG.name} shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages
                      resulting from your use of our services or content.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Mental Health
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      If you are experiencing mental health issues, suicidal
                      thoughts, or psychological distress, please seek immediate
                      professional help from qualified mental health
                      professionals.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  7. Privacy and Confidentiality
                </h2>
                <div className="space-y-4">
                  <p className="text-text-gray leading-relaxed">
                    We respect your privacy and maintain strict confidentiality
                    regarding all coaching sessions and personal information
                    shared.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    Personal information collected is used solely for providing
                    services and will not be shared with third parties without
                    your consent, except as required by law.
                  </p>
                  <p className="text-text-gray leading-relaxed">
                    For detailed information about how we collect, use, and
                    protect your data, please refer to our Privacy Policy.
                  </p>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="bg-deep-black/30 backdrop-blur-sm border border-accent-gold/10 rounded-lg p-8">
                <h2 className="text-2xl font-light gradient-text-gold mb-6">
                  8. Modifications and Contact
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Changes to Terms
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      We reserve the right to modify these terms at any time.
                      Changes will be posted on this page with an updated
                      &ldquo;Last modified&rdquo; date.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-light text-accent-gold mb-3">
                      Contact Information
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      For questions about these terms, please contact us at:{" "}
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-accent-gold hover:text-accent-gold/80 transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </>
  );
}
