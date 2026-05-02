"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { migrateLocalStreakIfPresent } from "@/lib/tells/migrate-streak-client";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Accept both param names, server-auth redirects send ?redirect=…,
  // the profile/quiz-results pages send ?returnTo=…, and some legacy
  // components use ?redirect=… too. Without this dual read, anyone
  // hitting a protected page while logged out landed on /dashboard
  // after login instead of being sent back to where they were going.
  // Prefer returnTo when both are present (explicit > implicit).
  const returnTo =
    searchParams.get("returnTo") || searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      // Carry an anonymous Tells streak forward onto this account.
      // Fire-and-forget, never blocks the redirect.
      migrateLocalStreakIfPresent();

      // Login successful, redirect to returnTo or dashboard
      router.push(returnTo || "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
      <div className="bg-gradient-to-br from-deep-navy/80 to-deep-burgundy/80 backdrop-blur-xl rounded-2xl border border-accent-sapphire/20 p-8 shadow-2xl shadow-accent-sapphire/5">
        <div className="text-center mb-8">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-r from-deep-burgundy to-royal-sapphire rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <LogIn className="w-8 h-8 text-white" />
          </m.div>
          <h2 className="text-2xl font-light gradient-text mb-2">
            Welcome Back
          </h2>
          <p className="text-text-gray">Enter the darkness</p>
        </div>

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

          <div>
            <label className="block text-sm font-light text-text-gray mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-gray w-5 h-5" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-gray hover:text-accent-gold transition-colors z-10 cursor-pointer"
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

          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-text-gray hover:text-accent-gold transition-colors"
            >
              Forgot your password?
            </button>
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
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </m.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-text-gray">
            Don&apos;t have an account?{" "}
            <button
              onClick={() =>
                router.push(
                  returnTo
                    ? `/register?returnTo=${encodeURIComponent(returnTo)}`
                    : "/register",
                )
              }
              className="text-accent-gold hover:text-accent-gold/80 font-light transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </m.div>
  );
}
