"use client";

import { m } from "framer-motion";
import { MEMBERSHIP } from "@/lib/constants";
import { PACT_PRICING } from "@/lib/pact/presets";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

export default function RefundPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              <span className="gradient-text">Refund Policy</span>
            </h1>
            <p className="text-text-gray text-lg">Last updated: April 8, 2026</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none space-y-8"
          >
            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Overview</h2>
              <p className="text-text-gray leading-relaxed">
                We want you to be completely satisfied with your purchase. This Refund Policy outlines the terms for refunds across all products and services offered through kanikarose.com.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Digital Products (Books &amp; Assessments)</h2>

              <h3 className="text-lg font-light text-text-light mt-4 mb-3">Sociopathic Dating Bible</h3>
              <p className="text-text-gray leading-relaxed mb-4">
                We offer a <strong className="text-text-light">30-day money-back guarantee</strong> on the Sociopathic Dating Bible. If you&apos;re not satisfied with the book, contact us within 30 days of purchase for a full refund, no questions asked.
              </p>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>Refund requests must be made within 30 days of the original purchase date</li>
                <li>Refunds are processed to the original payment method within 5-10 business days</li>
                <li>Download access will be revoked upon refund</li>
              </ul>

              <h3 className="text-lg font-light text-text-light mt-6 mb-3">Dark Mirror Assessment</h3>
              <p className="text-text-gray leading-relaxed">
                Due to the instant delivery nature of quiz results, refunds for the Dark Mirror Assessment are handled on a case-by-case basis. If you experience a technical issue preventing you from accessing your results, contact us and we will resolve the issue or issue a full refund.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Coaching Services</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                All coaching packages (Single Session, Intensive, Career Coaching, and Retainer) are subject to the following refund terms:
              </p>
              <ul className="text-text-gray space-y-3 list-disc list-inside">
                <li><strong className="text-text-light">Before scheduling:</strong> Full refund available if no session has been scheduled yet</li>
                <li><strong className="text-text-light">Rescheduling:</strong> Sessions may be rescheduled with at least 24 hours&apos; notice at no charge</li>
                <li><strong className="text-text-light">Cancellation with less than 24 hours&apos; notice:</strong> The session is forfeited and no refund is issued</li>
                <li><strong className="text-text-light">No-shows:</strong> If you do not attend a scheduled session without prior notice, the session is forfeited</li>
                <li><strong className="text-text-light">Partial packages:</strong> For multi-session packages (Intensive, Career, Retainer), unused sessions may be refunded at the per-session rate if you wish to discontinue</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">The Consilium (Subscription)</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                The Consilium is a monthly subscription at {MEMBERSHIP.monthly}. <strong className="text-text-light">Your subscription renews automatically each month until you cancel.</strong>
              </p>
              <ul className="text-text-gray space-y-3 list-disc list-inside">
                <li><strong className="text-text-light">Auto-renewal:</strong> Billing is charged to your payment method on the same day each month. You&apos;ll receive a renewal confirmation email each time it renews successfully</li>
                <li><strong className="text-text-light">Cancellation:</strong> Cancel anytime from your dashboard, or email Kanika@kanikarose.com. Access continues until the end of your current billing period</li>
                <li><strong className="text-text-light">Pause:</strong> You may pause your membership for 30, 60 or 90 days instead of cancelling, and resume whenever you want</li>
                <li><strong className="text-text-light">Refunds:</strong> We do not offer partial-month refunds for subscription cancellations. If you cancel mid-cycle, you retain access until the end of the period you&apos;ve already paid for</li>
                <li><strong className="text-text-light">First 7 days:</strong> If you cancel within 7 days of your first subscription payment, we will issue a full refund. This used to carry an &quot;and have not accessed community content&quot; condition, which was never measured and is not applied</li>
                <li><strong className="text-text-light">Free trial (book buyers):</strong> If you received a 30-day free trial via the book purchase email sequence, no payment is taken during the trial. At the end of the 30 days your access expires unless you subscribe, nothing is auto-charged</li>
                <li><strong className="text-text-light">Payment failures:</strong> If we can&apos;t charge your card on renewal, your membership is paused and you&apos;ll be emailed to update your payment method. No grace period access after suspension</li>
              </ul>
            </section>

            {/* The Blood Pact went live in August 2026 and this page never
                learned about it: a recurring subscription with no stated
                terms, no refund policy and no cancellation statement, while
                the public app page advertised a 7-day guarantee on it. The
                guarantee below honours that advertised promise rather than
                withdrawing something buyers may have relied on. */}
            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">The Blood Pact (Subscription)</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                The Blood Pact is a training subscription at {PACT_PRICING.weeklyDisplay} or {PACT_PRICING.annualDisplay}. <strong className="text-text-light">It renews automatically until you break the pact.</strong>
              </p>
              <ul className="text-text-gray space-y-3 list-disc list-inside">
                <li><strong className="text-text-light">Auto-renewal:</strong> Weekly plans are charged every week, annual plans once a year, to the payment method you signed with</li>
                <li><strong className="text-text-light">Cancellation:</strong> Break the pact from your profile in the app, or from the pact record. Breaking it stops the billing immediately, and your access runs to the end of the week or year you have already paid for</li>
                <li><strong className="text-text-light">What breaking does:</strong> the pact is sealed as broken and that record is permanent. You may sign a new pact at any time, and it stands beside the old one rather than replacing it</li>
                <li><strong className="text-text-light">First 7 days:</strong> If you break the pact within 7 days of your first payment, we will issue a full refund of that payment</li>
                <li><strong className="text-text-light">Refunds:</strong> Beyond the first 7 days we do not offer partial-week or partial-year refunds. Breaking the pact stops the next charge rather than refunding the current one</li>
                <li><strong className="text-text-light">Consilium members:</strong> The Pact is included with a Consilium membership at no extra charge. Breaking it does not touch your membership or its billing</li>
                <li><strong className="text-text-light">Payment failures:</strong> If a renewal fails, the pact is suspended rather than broken, and your weeks are held while you update your card</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Ask Kanika question packs (paid)</h2>
              <p className="text-text-gray leading-relaxed">
                This covers the paid question packs bought as a one-off, not the question a day included with a Consilium membership. Paid pack responses (written or voice) are delivered within 48 hours of purchase. Due to the personalised nature of this service, refunds are only available if a response has not been delivered within 5 business days. If you experience delivery issues, contact us and we will either deliver your response or issue a full refund.
              </p>
              <p className="text-text-gray leading-relaxed mt-4">
                The member question included with the Consilium works differently: you may submit one every 24 hours, members vote, and Kanika answers the most-voted by voice or video. There is no delivery guarantee on an individual member question, and it is part of the membership rather than a separate purchase.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Donations</h2>
              <p className="text-text-gray leading-relaxed">
                Donations are voluntary and non-refundable. By making a donation, you acknowledge that it is a gift and not a payment for goods or services.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">How to Request a Refund</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                To request a refund, contact us with:
              </p>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>Your name and email address used for the purchase</li>
                <li>The product or service you are requesting a refund for</li>
                <li>The date of purchase</li>
                <li>The reason for your refund request (optional but helpful)</li>
              </ul>
              <p className="text-text-gray leading-relaxed mt-4">
                <strong className="text-accent-gold">Email:</strong>{" "}
                <a href="mailto:Kanika@kanikarose.com" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                  Kanika@kanikarose.com
                </a>
              </p>
              <p className="text-text-gray leading-relaxed mt-2">
                We aim to respond to all refund requests within 2 business days. Approved refunds are processed within 5-10 business days to the original payment method.
              </p>
            </section>
          </m.div>
        </div>
      </div>
    </>
  );
}
