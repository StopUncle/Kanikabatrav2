"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const submit = useCallback(
    async (pin: string) => {
      if (submitting) return;
      setSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin }),
        });

        if (res.ok) {
          router.push("/admin");
        } else {
          setError("Invalid code");
          setShaking(true);
          setTimeout(() => {
            setShaking(false);
            setDigits(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
          }, 500);
        }
      } catch {
        setError("Connection error");
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, router],
  );

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const char = value.slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);
    setError("");

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (char && index === 5) {
      const pin = updated.join("");
      if (pin.length === 6) {
        submit(pin);
      }
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const updated = [...digits];
    for (let i = 0; i < 6; i++) {
      updated[i] = pasted[i] || "";
    }
    setDigits(updated);

    if (pasted.length === 6) {
      submit(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  }

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-light uppercase tracking-[0.2em] text-accent-gold mb-2">
            Admin Access
          </h1>
          <p className="text-sm font-light text-text-gray tracking-wide">
            Enter your 6-digit code
          </p>
        </div>

        <div
          className={`flex justify-center gap-3 mb-6 ${shaking ? "animate-shake" : ""}`}
          onPaste={handlePaste}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={submitting}
              className={`w-12 h-14 text-center text-xl font-light rounded-lg border transition-all duration-200 focus:outline-none ${
                error
                  ? "border-red-500/50 bg-red-500/5 text-red-400"
                  : digit
                    ? "border-accent-gold/40 bg-accent-gold/5 text-accent-gold"
                    : "border-white/10 bg-white/[0.03] text-text-light focus:border-accent-gold/40"
              } disabled:opacity-50`}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm font-light text-red-400 mb-4 animate-fade-in">
            {error}
          </p>
        )}

        {submitting && (
          <div className="flex items-center justify-center gap-2 text-text-gray text-sm font-light">
            <div className="w-4 h-4 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
            Verifying...
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
