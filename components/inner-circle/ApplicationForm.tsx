"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { Send, CheckCircle, Clock } from "lucide-react";

const schema = z.object({
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select your gender" }),
  }),
  // Pseudonym the member uses inside the community. Real names are never
  // shown to other members — only this. 2-30 chars keeps it usable as a
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
  agreeToGuidelines: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the community guidelines" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface ApplicationFormProps {
  existingStatus?: string | null;
}

export default function ApplicationForm({ existingStatus }: ApplicationFormProps) {
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
        <a href="/inner-circle/feed" className="text-text-gray hover:text-accent-gold mt-4 inline-block">Go to Feed &rarr;</a>
      </div>
    );
  }

  if (existingStatus === "APPROVED") {
    return (
      <div className="bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-accent-gold mx-auto mb-6" />
        <h2 className="text-2xl font-light gradient-text-gold mb-4">You&apos;ve Been Approved!</h2>
        <p className="text-text-gray mb-8">Complete your subscription to access The Inner Circle.</p>
        <button
          onClick={async () => {
            setIsSubmitting(true);
            const res = await fetch("/api/inner-circle/subscription/create", { method: "POST" });
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
      const res = await fetch("/api/inner-circle/apply", {
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
          This is what other members see on your posts, comments, and chat messages. Pick something anonymous — your real name is never shown to other members.
        </p>
      </div>

      <div>
        <label className="block text-sm font-light text-text-gray mb-2">
          Why do you want to join The Inner Circle?
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
        <p className="text-sm text-red-400">{errors.agreeToGuidelines.message}</p>
      )}

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
