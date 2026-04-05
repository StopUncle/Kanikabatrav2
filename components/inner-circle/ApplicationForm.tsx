"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, Clock } from "lucide-react";

const schema = z.object({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-deep-black/50 backdrop-blur-sm border border-accent-gold/20 rounded-2xl p-8 shadow-2xl space-y-8"
    >
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
    </motion.form>
  );
}
