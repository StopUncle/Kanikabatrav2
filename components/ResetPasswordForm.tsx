"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl rounded-2xl border border-accent-sapphire/20 p-8 shadow-2xl text-center">
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm mb-6">
            Invalid or missing reset token. Please request a new reset link.
          </div>
          <button
            onClick={() => router.push("/forgot-password")}
            className="text-accent-gold hover:text-accent-gold/80 font-light transition-colors"
          >
            Request new reset link
          </button>
        </div>
      </motion.div>
    );
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to reset password",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl rounded-2xl border border-accent-sapphire/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-deep-burgundy to-royal-sapphire rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-light gradient-text mb-2">
            Reset Password
          </h2>
          <p className="text-text-gray">Choose a new password</p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
              <p className="text-green-200 text-sm">
                Password reset successfully. Redirecting to login...
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray w-5 h-5" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all duration-200"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-gray hover:text-accent-gold transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray w-5 h-5" />
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all duration-200"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-gray hover:text-accent-gold transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.button
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
                  <ShieldCheck className="w-5 h-5" />
                  <span>Reset Password</span>
                </>
              )}
            </motion.button>
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
    </motion.div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl rounded-2xl border border-accent-sapphire/20 p-8 shadow-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <ResetPasswordFormInner />
    </Suspense>
  );
}
