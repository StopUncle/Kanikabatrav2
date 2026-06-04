"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FocusReveal from "./FocusReveal";

/**
 * The Tell — the remade demo. The old version was an autoplaying
 * scene-runner with choice cards and an XP pop; it felt busy. This is the
 * opposite: a single tense message sits in a quiet DM panel, and after a
 * beat the trained-eye "read" surfaces over it, naming what the message
 * actually means. Three scenes cycle on soft blur crossfades; hovering
 * pauses the advance; the dashes let you scrub. Nothing pops, nothing
 * chases the cursor. It sells the product by doing the product once.
 */
interface Scene {
  from: string;
  time: string;
  message: string;
  read: string;
}

const SCENES: Scene[] = [
  {
    from: "Him",
    time: "11:48 PM",
    message: "I don't even know why I'm texting you this late.",
    read: "He knows exactly why. This is a test of whether you'll still answer. Don't reward the midnight audition.",
  },
  {
    from: "Your boss",
    time: "Mon · 8:02 AM",
    message: "Quick one before standup — can you redo the deck? thanks so much!!",
    read: "The exclamation points are managing you, not thanking you. 'Quick' and 'thanks' are pre-loading your compliance before you've agreed.",
  },
  {
    from: "Her",
    time: "2:14 AM",
    message: "It's fine. Do whatever you want.",
    read: "It is not fine. 'Whatever you want' is a trap that punishes you for taking it. The move is to surface the real ask, not defend yourself.",
  },
];

const REVEAL_MS = 1500;
const CYCLE_MS = 6200;

export default function TheTell({ sceneCount }: { sceneCount: number }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);

  // Reveal the read 1.5s after each scene lands. Keyed on the scene only,
  // so pausing never resets it.
  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), REVEAL_MS);
    return () => clearTimeout(t);
  }, [index]);

  // Advance to the next scene, unless the visitor is hovering.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % SCENES.length),
      CYCLE_MS,
    );
    return () => clearTimeout(t);
  }, [index, paused]);

  const scene = SCENES[index];

  return (
    <section className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <FocusReveal className="mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.4em] text-slate-400/80">
          <span className="font-serif text-base italic text-warm-gold/80">II</span>
          <span className="h-px w-8 bg-slate-400/30" />
          The Method
        </FocusReveal>
        <FocusReveal
          as="h2"
          delay={0.08}
          className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-text-light sm:text-5xl"
        >
          Every message has a tell
        </FocusReveal>
        <FocusReveal
          as="p"
          delay={0.16}
          className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-text-gray"
        >
          Books tell you what manipulation looks like. Inside, you read it live,
          one scene at a time, and learn what a trained eye would have caught.
        </FocusReveal>
      </div>

      <FocusReveal delay={0.1} className="mx-auto mt-12 max-w-md">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="rounded-2xl border border-white/10 bg-[#0b0b13]/80 p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-6"
        >
          {/* Conversation header */}
          <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-full bg-gradient-to-br from-warm-gold/30 to-deep-burgundy/50" />
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={scene.from}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-slate-200"
                >
                  {scene.from}
                </m.span>
              </AnimatePresence>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              {scene.time}
            </span>
          </div>

          {/* Message + read */}
          <div className="min-h-[170px]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-left text-[15px] leading-relaxed text-slate-100">
                  {scene.message}
                </div>

                <AnimatePresence>
                  {revealed && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 rounded-xl border-l-2 border-warm-gold/70 bg-warm-gold/[0.05] px-4 py-3.5 text-left"
                    >
                      <p className="mb-1.5 text-[10px] uppercase tracking-[0.3em] text-warm-gold/80">
                        The read
                      </p>
                      <p className="text-sm italic leading-relaxed text-slate-200/90">
                        {scene.read}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Scrub dashes */}
          <div className="mt-5 flex items-center gap-2">
            {SCENES.map((s, i) => (
              <button
                key={s.from}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show read ${i + 1}`}
                className="group h-1 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <span
                  className={`block h-full rounded-full transition-colors ${
                    i === index ? "bg-warm-gold/80" : "bg-transparent group-hover:bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </FocusReveal>

      <FocusReveal
        delay={0.2}
        className="mx-auto mt-10 flex max-w-md flex-col items-center gap-5 text-center"
      >
        <p className="text-sm font-light text-slate-300/80">
          One read. The Dark Mirror Simulator runs{" "}
          <span className="text-warm-gold">
            {sceneCount.toLocaleString("en-US")}
          </span>{" "}
          of them.
        </p>
        <div className="flex items-center gap-7">
          <Link
            href="/try"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-warm-gold"
          >
            <span className="v3-link">Try it free</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/consilium"
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-300"
          >
            <span className="v3-link">Step inside</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </FocusReveal>
    </section>
  );
}
