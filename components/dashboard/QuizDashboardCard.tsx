"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, Lock } from "lucide-react";

interface QuizPreview {
  primaryType: string;
  secondaryType: string;
  completedAt: string;
}

interface QuizFullResult {
  primaryType: string;
  secondaryType: string;
  scores: Record<string, number>;
  completedAt: string;
}

interface QuizApiResponse {
  unlocked: boolean;
  preview?: QuizPreview;
  result?: QuizFullResult;
}

function formatType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function QuizDashboardCard() {
  const [data, setData] = useState<QuizApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quiz/my-results")
      .then((res) => {
        if (res.status === 404) return null;
        return res.json();
      })
      .then((result) => setData(result))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 text-accent-gold animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-text-gray mb-4">
          Discover which personality type drives your behavior.
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold text-deep-black rounded-full font-medium hover:bg-accent-gold/90 transition-all"
        >
          Take The Assessment
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (!data.unlocked) {
    const preview = data.preview;
    return (
      <div className="text-center py-6">
        <p className="text-accent-gold text-lg font-light mb-1">Your Type</p>
        <p className="text-text-light text-2xl font-extralight tracking-wider uppercase mb-4">
          {preview ? formatType(preview.primaryType) : "Unknown"}
        </p>
        <div className="flex items-center justify-center gap-2 text-text-gray text-sm mb-4">
          <Lock size={14} />
          <span>Full results locked</span>
        </div>
        <Link
          href="/quiz/results"
          className="inline-flex items-center gap-2 px-6 py-2 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full text-sm hover:bg-accent-gold/20 transition-all"
        >
          Unlock Full Profile
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const result = data.result;
  return (
    <div className="text-center py-6">
      <p className="text-accent-gold text-sm uppercase tracking-wider mb-1">
        Your Primary Type
      </p>
      <p className="text-text-light text-2xl font-extralight tracking-wider uppercase mb-2">
        {result ? formatType(result.primaryType) : "Unknown"}
      </p>
      {result?.secondaryType && (
        <p className="text-text-gray text-sm mb-4">
          Secondary: {formatType(result.secondaryType)}
        </p>
      )}
      <Link
        href="/quiz/results"
        className="inline-flex items-center gap-2 text-accent-gold text-sm hover:underline"
      >
        View Full Profile
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
