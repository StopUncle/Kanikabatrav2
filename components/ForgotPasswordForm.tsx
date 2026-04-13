"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { Mail, KeyRound } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl rounded-2xl border border-accent-sapphire/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-deep-burgundy to-royal-sapphire rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <KeyRound className="w-8 h-8 text-white" />
          </m.div>
          <h2 className="text-2xl font-light gradient-text mb-2">
            Forgot Password
          </h2>
          <p className="text-text-gray">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {isSubmitted ? (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
              <p className="text-green-200 text-sm">
                If an account exists with that email, you&apos;ll receive a
                reset link.
              </p>
            </div>
            <p className="text-text-gray text-sm">
              Check your inbox and spam folder.
            </p>
          </m.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm"
              >
                {error}
              </m.div>
            )}

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray w-5 h-5" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-12 pr-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-full text-text-light font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{ background: 'linear-gradient(135deg, #720921, #6366f1)', boxShadow: '0 8px 20px rgba(114,9,33,0.3), 0 8px 20px rgba(99,102,241,0.3)' }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  <span>Send Reset Link</span>
                </>
              )}
            </m.button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-text-gray">
            Remember your password?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-accent-gold hover:text-accent-gold/80 font-light transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </m.div>
  );
}
