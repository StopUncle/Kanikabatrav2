"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, Youtube, Mail, Heart } from "lucide-react";
import KanikaroseLogo from "./KanikaroseLogo";
import NewsletterForm from "./NewsletterForm";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Open by default so the footer is complete before hydration and with JS
     off. The observer corrects it on mount, while the footer is still below
     the fold, so the collapse is never seen as a jump. */
  const [expanded, setExpanded] = useState(true);

  /* Two observers on a sentinel pinned to the footer's top edge, one for each
     direction, with a deliberate gap between the two trigger lines. A single
     line oscillates: opening changes the page height, the browser's scroll
     anchoring nudges the scroll position to compensate, that nudge crosses the
     line again, and the footer flickers open and shut forever. Opening at 6%
     above the fold and closing only once the footer sits 60% of a screen below
     it leaves far more slack than any anchor correction. */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const open = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setExpanded(true);
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    const close = new IntersectionObserver(
      ([entry]) => {
        /* Only when the footer is below the viewport. Once it is taller than
           the screen its top edge scrolls off above, which is not a reason to
           close it under the reader. */
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setExpanded(false);
        }
      },
      { rootMargin: "0px 0px 60% 0px" },
    );

    open.observe(sentinel);
    close.observe(sentinel);

    return () => {
      open.disconnect();
      close.disconnect();
    };
  }, []);

  /* Each block rises on its own beat, so the unfold reads as three things
     arriving rather than one box changing size. */
  const reveal = (delay: string) =>
    `transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
      expanded ? `opacity-100 translate-y-0 ${delay}` : "opacity-0 translate-y-5"
    }`;

  const footerLinks = {
    explore: [
      { name: "About", href: "/about" },
      { name: "The Book", href: "/#book" },
      { name: "Quiz", href: "/quiz" },
      // Free Receipts shipped in June as the top-of-funnel lead magnet and
      // was then linked from nowhere: not the header, not here, not the
      // sitemap. Seven weeks, zero uses, which is a discoverability number
      // rather than a demand one.
      { name: "Free Receipts", href: "/receipts" },
      { name: "Coaching", href: "/coaching" },
      { name: "The Consilium", href: "/consilium" },
      { name: "Content", href: "/content" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Donate", href: "/donate" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund" },
    ],
    social: [
      {
        name: "Instagram",
        href: "https://instagram.com/kanikabatra",
        icon: Instagram,
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/@KanikaBatra",
        icon: Youtube,
      },
      {
        name: "TikTok",
        href: "https://tiktok.com/@ogkanikabatra",
        icon: TikTokIcon,
      },
      { name: "Email", href: "mailto:Kanika@kanikarose.com", icon: Mail },
    ],
  };

  return (
    // [overflow-anchor:none] keeps the browser from anchoring the scroll
    // position to content that is mid-animation.
    <footer className="relative z-20 bg-gradient-to-b from-deep-black to-burgundy-dark/10 border-t border-gold/10 [overflow-anchor:none]">
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The spine. Always visible, so the footer announces itself as a slim
            bar the moment it comes into view, then opens. `fullName` swaps the
            "KR" monogram for the wordmark so this doesn't echo the fixed
            header's "KR" when the two meet at the bottom of the page. */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 sm:py-8">
          <KanikaroseLogo size="lg" fullName />
          <div className="flex space-x-4 sm:space-x-5">
            {footerLinks.social.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="text-text-muted hover:text-gold transition-colors duration-300"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Everything below opens on scroll. The 0fr to 1fr grid row is the
            cheapest way to animate an unknown height without measuring it.

            It opens over a slow beat on purpose. The trigger has to fire
            early, roughly a screen-tenth before the footer's top edge would
            come to rest on a fully scrolled page, or on tall displays it
            would never fire at all. Fired that early at 700ms, the whole
            thing was over before anyone arrived to see it: the footer read
            as though it had always been open. Length is the only dial left,
            so the unfold takes its time and the three blocks land in
            sequence rather than together. */}
        <div
          className={`grid transition-[grid-template-rows] duration-[850ms] ease-out motion-reduce:transition-none ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className={`overflow-hidden ${expanded ? "" : "invisible"}`}>
            <div aria-hidden={!expanded}>
              {/* Newsletter band. Free real estate on every page, the footer
                  renders site-wide. Source-tagged "footer" so capture from
                  here is attributable separately from the homepage / blog
                  forms. */}
              <div className={`${reveal("delay-[120ms]")} pt-8 sm:pt-10 mb-8 sm:mb-10 pb-8 sm:pb-10 border-t border-b border-gold/10 grid gap-5 lg:grid-cols-2 lg:items-center`}>
                <div>
                  <h4 className="text-gold text-sm font-medium tracking-wider mb-2">
                    THE LETTERS
                  </h4>
                  <p className="text-text-muted text-xs sm:text-sm max-w-md leading-relaxed">
                    The psychology of power, red flags, and the patterns most
                    people miss, from a diagnosed sociopath. No fluff,
                    unsubscribe any time.
                  </p>
                </div>
                <NewsletterForm source="footer" />
              </div>

              <div className={`${reveal("delay-[260ms]")} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8`}>
                {/* Brand Section */}
                <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
                  <p className="text-text-muted text-xs sm:text-sm">
                    Diagnosed Sociopath. Author. Psychology of Power Expert.
                  </p>
                  <p className="text-gold text-xs">
                    Stop being the victim. Start being the villain.
                  </p>
                </div>

                {/* Explore Links */}
                <div className="col-span-1">
                  <h4 className="text-gold text-xs sm:text-sm font-medium tracking-wider mb-3 sm:mb-4">
                    EXPLORE
                  </h4>
                  <ul className="space-y-1">
                    {footerLinks.explore.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="block py-1.5 text-text-muted hover:text-gold transition-colors duration-300 text-xs sm:text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div className="col-span-1">
                  <h4 className="text-gold text-xs sm:text-sm font-medium tracking-wider mb-3 sm:mb-4">
                    LEGAL
                  </h4>
                  <ul className="space-y-1">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="block py-1.5 text-text-muted hover:text-gold transition-colors duration-300 text-xs sm:text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className={`${reveal("delay-[400ms]")} mt-6 sm:mt-8 pt-6 sm:pt-8 pb-8 sm:pb-12 border-t border-gold/10`}>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <p className="text-text-muted text-xs sm:text-sm text-center sm:text-left">
                    © {currentYear} Kanika Batra. All rights reserved.
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm flex items-center">
                    Crafted with{" "}
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 mx-1 text-burgundy" />{" "}
                    and strategy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
