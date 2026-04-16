"use client";

import { m } from "framer-motion";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";

export default function PrivacyPage() {
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
              <span className="gradient-text">Privacy Policy</span>
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
              <h2 className="text-2xl font-light text-accent-gold mb-4">1. Introduction</h2>
              <p className="text-text-gray leading-relaxed">
                Kanika Batra (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website kanikarose.com (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site, purchase our products, use our services, or participate in our community. By using the Site, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-light text-text-light mt-6 mb-3">Personal Information You Provide</h3>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>Name and email address (when you create an account, purchase a product, or subscribe to our newsletter)</li>
                <li>Payment information (processed securely through our payment processors — we do not store card details)</li>
                <li>Quiz and assessment responses (when you take the Dark Mirror Assessment)</li>
                <li>Community posts, comments, and messages (when you participate in The Consilium)</li>
                <li>Coaching session notes and questionnaire responses</li>
                <li>Contact form submissions</li>
              </ul>

              <h3 className="text-lg font-light text-text-light mt-6 mb-3">Information Collected Automatically</h3>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>IP address, browser type, and device information</li>
                <li>Pages visited, time spent on pages, and navigation patterns</li>
                <li>Referring URL and search terms used to find our Site</li>
                <li>Cookies and similar tracking technologies (see Section 6)</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">3. How We Use Your Information</h2>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>To process purchases and deliver digital products (books, quiz results, course access)</li>
                <li>To manage your account and community membership</li>
                <li>To provide coaching services and schedule sessions</li>
                <li>To send transactional emails (purchase confirmations, download links, password resets)</li>
                <li>To send marketing emails (newsletter, product announcements) — only with your consent</li>
                <li>To personalise your experience based on your quiz results and preferences</li>
                <li>To improve our Site, products, and services</li>
                <li>To prevent fraud and ensure platform security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">4. How We Share Your Information</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                We do not sell your personal information. We share your data only with:
              </p>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li><strong className="text-text-light">Payment processor</strong> — Stripe (stripe.com) handles all payments and stores card details on our behalf</li>
                <li><strong className="text-text-light">Email providers</strong> — Resend and Nodemailer SMTP deliver transactional and marketing emails; open/click tracking may be enabled</li>
                <li><strong className="text-text-light">Real-time chat</strong> — Pusher (pusher.com) powers Consilium chat rooms and receives message content in transit</li>
                <li><strong className="text-text-light">Media storage</strong> — Cloudflare R2 stores voice notes and member avatars</li>
                <li><strong className="text-text-light">Analytics</strong> — Google Analytics (anonymised IP) tracks aggregate site usage</li>
                <li><strong className="text-text-light">Error tracking</strong> — Sentry captures application errors (personal data masked by default)</li>
                <li><strong className="text-text-light">Hosting</strong> — Railway serves the application and database</li>
                <li><strong className="text-text-light">Legal authorities</strong> — if required by law, court order, or to protect our rights</li>
              </ul>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">5. Data Retention</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                We retain your personal information for as long as your account is active or as needed to provide services. Purchase records are retained for 7 years for accounting and tax compliance. You may request deletion of your account and associated data at any time by emailing Kanika@kanikarose.com.
              </p>
              <p className="text-text-gray leading-relaxed">
                If you cancel your Consilium subscription, your posts, comments, and chat messages remain visible to other members under your pseudonym. If you request full deletion, your content is either removed or anonymised at our discretion. Voice note files you received continue to be accessible via your original email delivery links until they expire.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">6. Cookies and Tracking</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li><strong className="text-text-light">Essential cookies</strong> — authentication tokens, session management (required for the Site to function)</li>
                <li><strong className="text-text-light">Analytics cookies</strong> — Google Analytics to understand how visitors use our Site</li>
                <li><strong className="text-text-light">Preference cookies</strong> — to remember your settings and choices</li>
              </ul>
              <p className="text-text-gray leading-relaxed mt-4">
                You can disable cookies through your browser settings, though this may affect Site functionality.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">7. Your Rights</h2>
              <p className="text-text-gray leading-relaxed mb-4">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="text-text-gray space-y-2 list-disc list-inside">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability — receive your data in a structured format</li>
                <li>Withdraw consent for marketing communications at any time</li>
                <li>Lodge a complaint with your local data protection authority</li>
              </ul>
              <p className="text-text-gray leading-relaxed mt-4">
                To exercise any of these rights, contact us at Kanika@kanikarose.com.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">8. Security</h2>
              <p className="text-text-gray leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal information, including encrypted data transmission (SSL/TLS), secure password hashing, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-text-gray leading-relaxed">
                Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately at Kanika@kanikarose.com.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">10. Changes to This Policy</h2>
              <p className="text-text-gray leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the Site after changes are posted constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="bg-deep-black/50 border border-accent-gold/10 rounded-2xl p-8">
              <h2 className="text-2xl font-light text-accent-gold mb-4">11. Contact Us</h2>
              <p className="text-text-gray leading-relaxed">
                For questions about this Privacy Policy or your personal data, contact us at:
              </p>
              <p className="text-text-gray mt-4">
                <strong className="text-accent-gold">Email:</strong>{" "}
                <a href="mailto:Kanika@kanikarose.com" className="text-accent-gold hover:text-accent-gold/80 transition-colors">
                  Kanika@kanikarose.com
                </a>
              </p>
            </section>
          </m.div>
        </div>
      </div>
    </>
  );
}
