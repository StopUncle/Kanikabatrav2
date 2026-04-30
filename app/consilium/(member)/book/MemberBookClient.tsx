"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Download, Mail, Check, Loader2 } from "lucide-react";
import StripeButton from "@/components/StripeButton";

interface Props {
  ownsBook: boolean;
  downloadToken: string | null;
  downloadExpired: boolean;
  memberEmail: string;
}

export default function MemberBookClient({
  ownsBook,
  downloadToken,
  downloadExpired,
  memberEmail,
}: Props) {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const resendDownloadLinks = async () => {
    setResending(true);
    setResendError(null);
    try {
      const res = await fetch("/api/book/resend-download", {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to resend");
      }
      setResent(true);
    } catch (err) {
      setResendError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setResending(false);
    }
  };

  const epubUrl = downloadToken
    ? `/api/download?token=${downloadToken}&format=epub`
    : null;
  const pdfUrl = downloadToken
    ? `/api/download?token=${downloadToken}&format=pdf`
    : null;
  const narcUrl = downloadToken
    ? `/api/download?token=${downloadToken}&format=bonus-narcissists`
    : null;
  const avoidUrl = downloadToken
    ? `/api/download?token=${downloadToken}&format=bonus-avoidants`
    : null;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase gradient-text-gold mb-2">
          The Sociopathic Dating Bible
        </h1>
        <div className="w-12 h-px bg-warm-gold/40 mb-3" />
        <p className="text-text-gray text-sm">
          Member-exclusive access to the 70,000-word premium edition.
        </p>
      </div>

      {/* Case 1: Member already owns the book with a live download window */}
      {ownsBook && !downloadExpired && downloadToken && (
        <>
          <div className="p-6 rounded-xl border border-accent-gold/30 bg-accent-gold/[0.04] mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Check size={20} className="text-accent-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-light text-lg mb-1">
                  You own the book
                </p>
                <p className="text-text-gray text-sm">
                  Download the files directly, or have Kanika&apos;s system
                  email fresh links to {memberEmail}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              <a
                href={epubUrl!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-gold text-deep-black font-medium text-sm uppercase tracking-wider hover:bg-accent-gold/90 transition-all"
              >
                <Download size={16} strokeWidth={1.5} />
                EPUB
              </a>
              <a
                href={pdfUrl!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-gold text-deep-black font-medium text-sm uppercase tracking-wider hover:bg-accent-gold/90 transition-all"
              >
                <Download size={16} strokeWidth={1.5} />
                PDF
              </a>
            </div>

            <p className="text-accent-gold/70 text-xs uppercase tracking-[0.3em] mb-2">
              Addendum chapters
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={narcUrl!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-accent-gold/40 bg-deep-burgundy/40 text-accent-gold font-light text-xs tracking-wide hover:bg-deep-burgundy/60 transition-all"
              >
                Understanding Narcissists
              </a>
              <a
                href={avoidUrl!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-accent-gold/40 bg-deep-burgundy/40 text-accent-gold font-light text-xs tracking-wide hover:bg-deep-burgundy/60 transition-all"
              >
                The Avoidant Playbook
              </a>
            </div>
          </div>

          <button
            onClick={resendDownloadLinks}
            disabled={resending || resent}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-accent-gold/30 text-accent-gold/80 text-sm font-light hover:bg-accent-gold/5 hover:border-accent-gold/60 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : resent ? (
              <Check size={16} />
            ) : (
              <Mail size={16} strokeWidth={1.5} />
            )}
            {resent
              ? `Fresh links sent to ${memberEmail}`
              : resending
                ? "Sending…"
                : "Email me a fresh set of download links"}
          </button>
          {resendError && (
            <p className="text-red-400/80 text-xs text-center mt-2">
              {resendError}
            </p>
          )}
        </>
      )}

      {/* Case 2: Member owns the book but the 30-day download window expired */}
      {ownsBook && downloadExpired && (
        <div className="p-6 rounded-xl border border-accent-gold/30 bg-deep-black/60 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <BookOpen size={20} className="text-accent-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-light text-lg mb-1">
                You own the book, download window closed
              </p>
              <p className="text-text-gray text-sm">
                Your original 30-day download window has expired. Request a
                fresh set of links and we&apos;ll email them to {memberEmail}.
              </p>
            </div>
          </div>
          <button
            onClick={resendDownloadLinks}
            disabled={resending || resent}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-gold text-deep-black font-medium text-sm uppercase tracking-wider hover:bg-accent-gold/90 transition-all disabled:opacity-60"
          >
            {resending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : resent ? (
              <Check size={16} />
            ) : (
              <Mail size={16} strokeWidth={1.5} />
            )}
            {resent ? "Sent. Check your inbox." : "Email me fresh download links"}
          </button>
          {resendError && (
            <p className="text-red-400/80 text-xs text-center mt-2">
              {resendError}
            </p>
          )}
        </div>
      )}

      {/* Case 3: Member doesn't own the book yet, member-price claim CTA */}
      {!ownsBook && (
        <>
          <div className="p-6 sm:p-8 rounded-xl border border-accent-gold/40 bg-gradient-to-br from-deep-burgundy/30 to-deep-black mb-6">
            <div className="mb-5">
              <p className="text-accent-gold/70 uppercase tracking-[0.35em] text-[10px] mb-2">
                Member-exclusive price
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-extralight text-white">
                  $9.99
                </span>
                <span className="text-text-gray/60 text-lg line-through">
                  $24.99
                </span>
              </div>
              <p className="text-accent-gold/80 text-sm font-light mt-1">
                A $15 discount held for Consilium members only
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-text-gray text-sm">
                <Check size={16} className="text-accent-gold/80 mt-0.5 shrink-0" />
                <span>15 chapters + 2 bonus addendum chapters (Understanding Narcissists, The Avoidant Playbook)</span>
              </li>
              <li className="flex items-start gap-2 text-text-gray text-sm">
                <Check size={16} className="text-accent-gold/80 mt-0.5 shrink-0" />
                <span>70,000 words, the full premium edition, not the Kindle cut</span>
              </li>
              <li className="flex items-start gap-2 text-text-gray text-sm">
                <Check size={16} className="text-accent-gold/80 mt-0.5 shrink-0" />
                <span>EPUB + PDF, read on any device</span>
              </li>
              <li className="flex items-start gap-2 text-text-gray text-sm">
                <Check size={16} className="text-accent-gold/80 mt-0.5 shrink-0" />
                <span>30-day download window, 10 downloads, fresh links via the Consilium anytime</span>
              </li>
            </ul>

            <StripeButton
              priceKey="BOOK"
              email={memberEmail}
              label="Claim your member price"
              price="$9.99"
              icon="cart"
            />
            <p className="text-text-gray/60 text-xs text-center mt-3 italic">
              Member discount applied automatically at checkout
            </p>
          </div>

          <p className="text-text-gray/60 text-xs text-center">
            Already purchased but not seeing it here? Contact{" "}
            <Link
              href="mailto:Kanika@kanikarose.com"
              className="text-accent-gold/80 hover:text-accent-gold underline underline-offset-2"
            >
              Kanika@kanikarose.com
            </Link>{" "}
           , she&apos;ll restore your access.
          </p>
        </>
      )}
    </div>
  );
}
