"use client";

import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Choice } from "@/lib/simulator/types";

type Props = {
  choices: Choice[];
  onPick: (choice: Choice) => void;
};

export default function ChoiceCards({ choices, onPick }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`max-w-4xl mx-auto w-full px-4 grid gap-4 ${
        choices.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      } grid-cols-1`}
    >
      {choices.map((c, i) => (
        <m.button
          key={c.id}
          onClick={() => onPick(c)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group relative text-left p-6 rounded-xl border border-accent-gold/25 bg-deep-black/70 backdrop-blur-sm hover:border-accent-gold/70 hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.35)] transition-all"
        >
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-accent-gold/5 to-transparent" />
          <p className="relative text-white font-light text-base sm:text-lg leading-snug mb-3">
            {c.text}
          </p>
          {c.tactic && (
            <p className="relative text-text-gray/60 text-xs italic leading-relaxed border-t border-accent-gold/10 pt-3">
              <Sparkles
                size={10}
                className="inline-block mr-1.5 text-accent-gold/70"
                strokeWidth={1.5}
              />
              {c.tactic}
            </p>
          )}
        </m.button>
      ))}
    </m.div>
  );
}
