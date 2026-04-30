"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { Send, CheckCircle, Clock, XCircle, RefreshCcw } from "lucide-react";

// Calculates age in whole years from an ISO date string. Returns -1 for
// anything that doesn't parse, so the refine() below rejects bad input.
function calculateAge(isoDate: string): number {
  const birth = new Date(isoDate);
  if (isNaN(birth.getTime())) return -1;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthdayThisYear) age--;
  return age;
}

const schema = z.object({
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select your gender" }),
  }),
  // Stored as ISO date (YYYY-MM-DD) inside applicationData. The Consilium
  // is an adults-only community, we enforce 18+ here on the client and
  // re-check on the server.
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter your date of birth")
    .refine((s) => {
      const age = calculateAge(s);
      return age >= 18 && age <= 100;
    }, "You must be 18 or older to join The Consilium"),
  // Pseudonym the member uses inside the community. Real names are never
  // shown to other members, only this. 2-30 chars keeps it usable as a
  // display handle while avoiding empty/abusive names.
  displayName: z
    .string()
    .trim()
    .min(2, "Must be at least 2 characters")
    .max(30, "Keep it under 30 characters")
    .regex(/^[a-zA-Z0-9_.\- ]+$/, "Letters, numbers, spaces, hyphens, and underscores only"),
  whyJoin: z.string().min(20, "Tell us a bit more (at least 20 characters)").max(1000),
  whatHope: z.string().min(20, "Tell us a bit more (at least 20 characters)").max(1000),
  howFound: z.string().min(1, "Required").max(500),
  // Explicit attestation that everything submitted is true. Captured on
  // the application for audit purposes, giving false info is grounds for
  // removal. Must be ticked to submit.
  confirmTruthful: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm the information you've provided is true",
    }),
  }),
  agreeToGuidelines: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the community guidelines" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface ApplicationFormProps {
  existingStatus?: string | null;
  /** True if a CANCELLED row was set by an admin rejection (not a member-
   *  initiated cancellation). Drives the "not accepted" message vs the
   *  "welcome back" reactivation prompt. */
  wasRejected?: boolean;
  /** True if the row has activatedAt set, meaning this user actually paid
   *  at some point. Distinguishes EXPIRED-after-paid (renew) from
   *  EXPIRED-after-approval (must reapply). */
  wasFormerlyPaid?: boolean;
}

export default function ApplicationForm({
  existingStatus,
  wasRejected = false,
  wasFormerlyPaid = false,
}: ApplicationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (existingStatus === "ACTIVE") {
    return (
      <div className="text-center p-8">
        <p className="text-accent-gold">You&apos;re already a member!</p>
        <a href="/consilium/feed" className="text-text-gray hover:text-accent-gold mt-4 inline-block">Go to Feed &rarr;</a>
      </div>
    );
  }

  if (existingStatus === "APPROVED") {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-accent-gold mx-auto mb-6" />
        <h2 className="text-2xl font-light gradient-text-gold mb-4">You&apos;ve Been Approved!</h2>
        <p className="text-text-gray mb-8">Complete your subscription to enter The Consilium.</p>
        <button
          onClick={async () => {
            setIsSubmitting(true);
            const res = await fetch("/api/consilium/subscription/create", { method: "POST" });
            const data = await res.json();
            if (data.checkoutUrl) window.location.href = data.checkoutUrl;
            setIsSubmitting(false);
          }}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-full text-text-light font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #720921, #6366f1)', boxShadow: '0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)' }}
        >
          {isSubmitting ? "Redirecting..." : "Subscribe \u2014 $29/month"}
        </button>
      </div>
    );
  }

  if (existingStatus === "PENDING") {
    return (
      <div className="text-center py-16">
        <Clock className="w-16 h-16 text-accent-gold mx-auto mb-4" />
        <h2 className="text-2xl font-light text-text-light mb-2">Application Under Review</h2>
        <p className="text-text-gray">We&apos;ll notify you by email once your application is reviewed.</p>
      </div>
    );
  }

  // Rejected applicant. No CTA, they need to wait and submit a fresh
  // application later if their circumstances change. Showing the form
  // again immediately would feel like the rejection didn't land.
  if (existingStatus === "CANCELLED" && wasRejected) {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <XCircle className="w-12 h-12 text-text-gray/60 mx-auto mb-5" />
        <h2 className="text-xl font-light text-text-light mb-3">
          Application Not Accepted
        </h2>
        <p className="text-text-gray font-light max-w-md mx-auto leading-relaxed">
          We&apos;ve reviewed your application and aren&apos;t able to extend
          a place in The Consilium at this time. If your circumstances
          change, you&apos;re welcome to apply again later.
        </p>
      </div>
    );
  }

  // Former paid member who cancelled their subscription. Welcome them
  // back with a one-click reactivate flow rather than making them
  // resubmit the application form.
  if (existingStatus === "CANCELLED" && wasFormerlyPaid) {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <RefreshCcw className="w-12 h-12 text-accent-gold mx-auto mb-5" />
        <h2 className="text-2xl font-light gradient-text-gold mb-3">Welcome Back</h2>
        <p className="text-text-gray font-light mb-7 max-w-md mx-auto">
          Your seat is still recognised. Reactivate your subscription to
          step back into The Consilium.
        </p>
        <button
          onClick={async () => {
            setIsSubmitting(true);
            const res = await fetch("/api/consilium/subscription/create", { method: "POST" });
            const data = await res.json();
            if (data.checkoutUrl) window.location.href = data.checkoutUrl;
            setIsSubmitting(false);
          }}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-full text-text-light font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #720921, #6366f1)', boxShadow: '0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)' }}
        >
          {isSubmitting ? "Redirecting..." : "Reactivate \u2014 $29/month"}
        </button>
      </div>
    );
  }

  // Approved-but-never-paid window lapsed. They have to reapply through
  // the form (which Kanika re-reviews), we can't let them buy past the
  // expired approval since the original review may be stale.
  if (existingStatus === "EXPIRED" && !wasFormerlyPaid) {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <Clock className="w-12 h-12 text-text-gray/60 mx-auto mb-5" />
        <h2 className="text-xl font-light text-text-light mb-3">
          Approval Window Lapsed
        </h2>
        <p className="text-text-gray font-light max-w-md mx-auto leading-relaxed">
          Your application was approved but the activation window passed
          without payment. Submit a fresh application below, we review
          each one personally.
        </p>
      </div>
    );
    // Note: we deliberately don't fall through to the form here. A new
    // entry below this card would be confusing, the user has to scroll
    // to find it. If a UX iteration wants both the explanation AND the
    // form on one page, render them together; right now the cleanest
    // path is to show this card only and let the user click "Apply"
    // from the consilium landing page if they want to retry.
  }

  // Former paid member whose subscription expired (not approval window).
  // Same comeback flow as CANCELLED + wasFormerlyPaid above.
  if (existingStatus === "EXPIRED" && wasFormerlyPaid) {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <RefreshCcw className="w-12 h-12 text-accent-gold mx-auto mb-5" />
        <h2 className="text-2xl font-light gradient-text-gold mb-3">Welcome Back</h2>
        <p className="text-text-gray font-light mb-7 max-w-md mx-auto">
          Your subscription expired. Reactivate to pick up where you
          left off.
        </p>
        <button
          onClick={async () => {
            setIsSubmitting(true);
            const res = await fetch("/api/consilium/subscription/create", { method: "POST" });
            const data = await res.json();
            if (data.checkoutUrl) window.location.href = data.checkoutUrl;
            setIsSubmitting(false);
          }}
          disabled={isSubmitting}
          className="px-8 py-4 rounded-full text-text-light font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #720921, #6366f1)', boxShadow: '0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)' }}
        >
          {isSubmitting ? "Redirecting..." : "Reactivate \u2014 $29/month"}
        </button>
      </div>
    );
  }

  if (submitStatus === "success") {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-16 h-16 text-accent-gold mx-auto mb-4" />
        <h2 className="text-2xl font-light text-text-light mb-2">Application Submitted</h2>
        <p className="text-text-gray">We review applications within 24 hours. Check your email.</p>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/consilium/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || "Something went wrong");
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setSubmitStatus("error");
    }
  };

  return (
    <m.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 shadow-2xl space-y-8"
    >
      <div>
        <label className="block text-sm font-light text-text-gray mb-3">
          I am
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative flex items-center justify-center gap-2 px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg cursor-pointer hover:border-accent-gold/50 transition-all has-[:checked]:border-accent-gold has-[:checked]:bg-accent-gold/10">
            <input
              type="radio"
              {...register("gender")}
              value="FEMALE"
              className="sr-only"
            />
            <span className="text-text-light text-sm tracking-wide">Female</span>
          </label>
          <label className="relative flex items-center justify-center gap-2 px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg cursor-pointer hover:border-accent-gold/50 transition-all has-[:checked]:border-accent-gold has-[:checked]:bg-accent-gold/10">
            <input
              type="radio"
              {...register("gender")}
              value="MALE"
              className="sr-only"
            />
            <span className="text-text-light text-sm tracking-wide">Male</span>
          </label>
        </div>
        {errors.gender && (
          <p className="mt-2 text-sm text-red-400">{errors.gender.message}</p>
        )}
        <p className="mt-2 text-xs text-text-gray/60">
          The community is split into two groups. You&apos;ll only see messages from members who share your gender.
        </p>
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          Date of birth
        </label>
        <input
          type="date"
          {...register("dateOfBirth")}
          // Upper bound: today (no future dates). Lower bound: 120 years ago
          // (rejects silly input before zod even fires).
          max={new Date().toISOString().split("T")[0]}
          min={
            new Date(Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          }
          className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/40 focus:border-accent-gold/60 focus:outline-none transition-colors [color-scheme:dark]"
          autoComplete="bday"
        />
        {errors.dateOfBirth && (
          <p className="mt-2 text-sm text-red-400">{errors.dateOfBirth.message}</p>
        )}
        <p className="mt-2 text-xs text-text-gray/60">
          The Consilium is for adults only. You must be 18 or older to join.
          Your date of birth is kept private, only the admin reviewing your
          application can see it.
        </p>
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          Your display name
        </label>
        <input
          type="text"
          {...register("displayName")}
          placeholder="What members will see (not your real name)"
          className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/40 focus:border-accent-gold/60 focus:outline-none transition-colors"
          autoComplete="off"
        />
        {errors.displayName && (
          <p className="mt-2 text-sm text-red-400">{errors.displayName.message}</p>
        )}
        <p className="mt-2 text-xs text-text-gray/60">
          This is what other members see on your posts, comments, and chat messages. Pick something anonymous, your real name is never shown to other members.
        </p>
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          Why do you want to join The Consilium?
        </label>
        <textarea
          {...register("whyJoin")}
          rows={4}
          className="w-full bg-deep-black/50 border border-accent-gold/20 rounded-lg px-4 py-3 text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all resize-none"
          placeholder="What brought you here? What are you going through?"
        />
        {errors.whyJoin && (
          <p className="mt-1 text-sm text-red-400">{errors.whyJoin.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          What do you hope to get out of this community?
        </label>
        <textarea
          {...register("whatHope")}
          rows={4}
          className="w-full bg-deep-black/50 border border-accent-gold/20 rounded-lg px-4 py-3 text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all resize-none"
          placeholder="What would make this worth it for you?"
        />
        {errors.whatHope && (
          <p className="mt-1 text-sm text-red-400">{errors.whatHope.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          How did you find Kanika?
        </label>
        <input
          {...register("howFound")}
          className="w-full bg-deep-black/50 border border-accent-gold/20 rounded-lg px-4 py-3 text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all"
          placeholder="TikTok, Instagram, YouTube, a friend..."
        />
        {errors.howFound && (
          <p className="mt-1 text-sm text-red-400">{errors.howFound.message}</p>
        )}
      </div>

      <div className="space-y-4 pt-2 border-t border-accent-gold/10">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("confirmTruthful")}
            id="truthful"
            className="mt-1 h-4 w-4 rounded border-accent-gold/20 bg-deep-black/50 text-accent-gold focus:ring-accent-gold"
          />
          <label htmlFor="truthful" className="text-sm text-text-gray">
            I confirm that all the information I&apos;ve provided above is true
            and accurate. I understand that submitting false information is
            grounds for removal without refund.
          </label>
        </div>
        {errors.confirmTruthful && (
          <p className="text-sm text-red-400 -mt-2">
            {errors.confirmTruthful.message}
          </p>
        )}

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("agreeToGuidelines")}
            id="guidelines"
            className="mt-1 h-4 w-4 rounded border-accent-gold/20 bg-deep-black/50 text-accent-gold focus:ring-accent-gold"
          />
          <label htmlFor="guidelines" className="text-sm text-text-gray">
            I agree to the community guidelines. I understand this is a safe space and
            trolling, harassment, or manipulation of other members results in immediate
            removal with no refund.
          </label>
        </div>
        {errors.agreeToGuidelines && (
          <p className="text-sm text-red-400 -mt-2">
            {errors.agreeToGuidelines.message}
          </p>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={submitStatus === "submitting"}
        className="w-full bg-gradient-to-r from-deep-burgundy to-royal-sapphire text-white font-light py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {submitStatus === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
    </m.form>
  );
}
