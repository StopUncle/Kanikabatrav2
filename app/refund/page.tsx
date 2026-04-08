"use client";

import { motion } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

export default function RefundPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-32 pb-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              <span className="gradient-text">Refund Policy</span>
            </h1>
            <p className="text-text-gray text-lg">Last updated: April 8, 2026</p>
          </motion.div>

          <motion.div
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
                We offer a <strong className="text-text-light">30-day money-back guarantee</strong> on the Sociopathic Dating Bible. If you&apos;re not satisfied with the book, contact us within 30 days of purchase for a full refund — no questions asked.
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
              <h2 className="text-2xl font-light text-accent-gold mb-4">The Inner Circle (Subscription)</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                The Inner Circle is a monthly subscription at $29/month.
              </p>
              <ul className="text-text-gray space-y-3 list-disc list-inside">
                <li><strong className="text-text-light">Cancellation:</strong> You may cancel your subscription at any time. Access continues until the end of your current billing period</li>
                <li><strong className="text-text-light">Pause:</strong> You may pause your membership for up to 30 days instead of cancelling</li>
                <li><strong className="text-text-light">Refunds:</strong> We do not offer partial-month refunds for subscription cancellations. If you cancel mid-cycle, you retain access until the end of the period you&apos;ve already paid for</li>
                <li><strong className="text-text-light">First month:</strong> If you cancel within 7 days of your first subscription payment and have not accessed community content, we will issue a full refund</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">Ask Kanika</h2>
              <p className="text-text-gray leading-relaxed">
                Ask Kanika question responses (written or voice) are delivered within 48 hours of purchase. Due to the personalised nature of this service, refunds are only available if a response has not been delivered within 5 business days. If you experience delivery issues, contact us and we will either deliver your response or issue a full refund.
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
          </motion.div>
        </div>
      </div>
    </>
  );
}
