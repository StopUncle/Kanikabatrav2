import type { CSSProperties, ReactNode } from "react";

/**
 * Header logo concepts, round three: twenty marks, all typography and
 * plain geometry. No illustration. Every luxury house that lasts settles
 * on letters, hairlines, and at most one geometric device, because those
 * are the only things that stay beautiful at 24 pixels.
 *
 * The rose throughout is rose gold, a metal not a flower.
 */

const ROSE = "#b76e79";
const ROSE_DEEP = "#8e4a56";
const ROSE_LIGHT = "#eec9bd";
const GOLD = "#d4af37";
const BONE = "#e7ddd3";
const INK = "#0a0908";

const roseMetal: CSSProperties = {
  backgroundImage: `linear-gradient(135deg, ${ROSE_DEEP} 0%, ${ROSE} 38%, ${ROSE_LIGHT} 52%, ${ROSE} 66%, ${ROSE_DEEP} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const sweep: CSSProperties = {
  backgroundImage: `linear-gradient(90deg, ${BONE} 0%, ${BONE} 45%, ${ROSE_LIGHT} 65%, ${ROSE} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const display: CSSProperties = { fontFamily: "var(--font-display), serif" };
const italic: CSSProperties = { ...display, fontStyle: "italic" };

function HeaderMock({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--app-line-soft)] bg-[#0a0908] px-4 py-3.5">
      <div className="flex items-center">{children}</div>
      <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.22em] text-[#4a443f]">
        <span>Book</span>
        <span>Quiz</span>
        <span className="rounded-full border border-[#332d29] px-2.5 py-1">
          Consilium
        </span>
      </div>
    </div>
  );
}

function Concept({
  n,
  name,
  children,
}: {
  n: number;
  name: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-4">
      <div className="mb-1.5 flex items-baseline gap-2 px-1">
        <span className="text-[11px] tabular-nums text-[var(--app-gold)]">
          {n}
        </span>
        <span className="text-[12px] text-[var(--app-muted)]">{name}</span>
      </div>
      {children}
    </section>
  );
}

/* The mask slipping, as pure geometry: a rose ring with a dark disc
   sliding across it. What remains visible is a crescent. */
function Eclipse({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="12" r="7.5" stroke={color} strokeWidth="1.4" />
      <circle
        cx="15.5"
        cy="12"
        r="7.5"
        fill={INK}
        stroke={color}
        strokeWidth="1.1"
        opacity="0.95"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

/* Two identities occupying the same space, almost aligned. */
function DoubleRing({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle
        cx="10"
        cy="12"
        r="7.5"
        stroke={BONE}
        strokeWidth="1.1"
        opacity="0.35"
      />
      <circle cx="14" cy="12" r="7.5" stroke={ROSE} strokeWidth="1.4" />
    </svg>
  );
}

/* A cut stone. The only ornament in the set, and it is a gem, not a
   flower. */
function Facet({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="facet-rose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={ROSE_LIGHT} />
          <stop offset="0.5" stopColor={ROSE} />
          <stop offset="1" stopColor={ROSE_DEEP} />
        </linearGradient>
      </defs>
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        transform="rotate(45 12 12)"
        fill="url(#facet-rose)"
      />
      <path d="M12 4.2v15.6M4.2 12h15.6" stroke={INK} strokeWidth="0.7" />
    </svg>
  );
}

/* A rose from directly above, as one continuous spiral line. Built from
   chained semicircular arcs, so it is symmetric by construction and
   cannot come out lopsided. */
function CleanSpiralRose({
  size,
  color,
  strokeWidth = 1.3,
}: {
  size: number;
  color: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 0-18 0a7 7 0 1 0 14 0a5 5 0 1 0-10 0a3.2 3.2 0 1 0 6.4 0a1.7 1.7 0 1 0-3.4 0" />
    </svg>
  );
}

/* The spiral inside a hairline ring: the rose as a seal. */
function RoseSeal({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12.8" stroke={color} strokeWidth="1" />
      <g
        transform="translate(14 14) scale(0.6) translate(-12 -12)"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 0-18 0a7 7 0 1 0 14 0a5 5 0 1 0-10 0a3.2 3.2 0 1 0 6.4 0a1.7 1.7 0 1 0-3.4 0" />
      </g>
    </svg>
  );
}

/* The full flower: the same clean spiral as the bloom, on a stem with
   one leaf. The bloom stays symmetric because it is the spiral, not a
   freehand drawing. */
function RoseBud({ size, color }: { size: number; color: string }) {
  const h = (size * 32) / 24;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 24 32"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(12 10) scale(0.78) translate(-12 -12)">
        <path
          d="M21 12a9 9 0 1 0-18 0a7 7 0 1 0 14 0a5 5 0 1 0-10 0a3.2 3.2 0 1 0 6.4 0a1.7 1.7 0 1 0-3.4 0"
          strokeWidth="1.8"
        />
      </g>
      <path d="M12 17.4V30" />
      <path
        d="M12 24.5c2.9-.3 4.7 1 5.3 3.3-2.9.3-4.7-1-5.3-3.3Z"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export default function LogoGallery() {
  return (
    <div className="px-5 pb-16 pt-8">
      <h1 className="text-[24px] font-light" style={display}>
        Header logo
      </h1>
      <p className="mb-7 mt-1 text-[12.5px] leading-relaxed text-[var(--app-muted)]">
        The clean rose first, then twenty marks in letters, hairlines, and
        geometry. Rose gold against the dark throughout.
      </p>

      <p className="mb-4 mt-2 text-[10.5px] uppercase tracking-[0.24em] text-[var(--app-gold-soft)]">
        The clean rose
      </p>

      <Concept n={1} name="The spiral rose, one continuous line">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <CleanSpiralRose size={26} color={ROSE} />
            <span
              className="text-[14px] font-light tracking-[0.2em]"
              style={display}
            >
              <span style={{ color: BONE }}>kanika</span>
              <span style={roseMetal}>rose</span>
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={2} name="The spiral alone, bigger">
        <HeaderMock>
          <CleanSpiralRose size={30} color={ROSE} strokeWidth={1.2} />
        </HeaderMock>
      </Concept>

      <Concept n={3} name="The rose seal">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <RoseSeal size={34} color={ROSE} />
            <span
              className="text-[12px] font-light tracking-[0.3em]"
              style={{ ...display, color: BONE }}
            >
              KANIKA ROSE
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={4} name="The rosebud, in profile">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <RoseBud size={20} color={ROSE} />
            <span
              className="text-[14px] font-light tracking-[0.2em]"
              style={display}
            >
              <span style={{ color: BONE }}>kanika</span>
              <span style={roseMetal}>rose</span>
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <p className="mb-4 mt-7 text-[10.5px] uppercase tracking-[0.24em] text-[var(--app-gold-soft)]">
        Letters and geometry
      </p>

      <Concept n={5} name="KR, tight serif, rose metal">
        <HeaderMock>
          <span
            className="text-[22px] font-medium tracking-[-0.04em]"
            style={{ ...display, ...roseMetal }}
          >
            KR
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={6} name="K diamond R">
        <HeaderMock>
          <span className="flex items-center gap-[7px]">
            <span
              className="text-[19px] font-light"
              style={{ ...display, color: BONE }}
            >
              K
            </span>
            <span
              className="h-[5px] w-[5px] rotate-45"
              style={{ backgroundColor: ROSE }}
            />
            <span
              className="text-[19px] font-light"
              style={{ ...display, color: BONE }}
            >
              R
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={7} name="The cartouche">
        <HeaderMock>
          <span
            className="border px-3 py-1 text-[15px] font-light tracking-[0.18em]"
            style={{
              ...display,
              ...roseMetal,
              borderColor: "rgba(183,110,121,0.55)",
            }}
          >
            KR
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={8} name="Kr, italic, like a signature">
        <HeaderMock>
          <span
            className="text-[23px] font-light tracking-[-0.02em]"
            style={{ ...italic, ...roseMetal }}
          >
            Kr
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={9} name="K full stop">
        <HeaderMock>
          <span className="flex items-baseline gap-[2px]">
            <span
              className="text-[24px] font-medium"
              style={{ ...display, color: BONE }}
            >
              K
            </span>
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ backgroundColor: ROSE }}
            />
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={10} name="K, hairline, R">
        <HeaderMock>
          <span className="flex items-center gap-[9px]">
            <span
              className="text-[19px] font-light"
              style={{ ...display, color: BONE }}
            >
              K
            </span>
            <span
              className="h-[22px] w-px"
              style={{ backgroundColor: ROSE, opacity: 0.7 }}
            />
            <span
              className="text-[19px] font-light"
              style={{ ...display, ...roseMetal }}
            >
              R
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={11} name="The chop: stacked in a square">
        <HeaderMock>
          <span
            className="flex h-[42px] w-[42px] flex-col items-center justify-center border leading-none"
            style={{ borderColor: "rgba(183,110,121,0.55)" }}
          >
            <span
              className="text-[15px] font-light"
              style={{ ...display, color: BONE }}
            >
              K
            </span>
            <span
              className="mt-[1px] text-[15px] font-light"
              style={{ ...display, ...roseMetal }}
            >
              R
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={12} name="The overlap: R behind the K">
        <HeaderMock>
          <span className="relative inline-block">
            <span
              className="absolute left-[11px] top-[3px] text-[22px] font-light"
              style={{ ...display, color: ROSE, opacity: 0.55 }}
            >
              R
            </span>
            <span
              className="relative text-[24px] font-medium"
              style={{ ...display, color: BONE }}
            >
              K
            </span>
            <span className="inline-block w-[24px]" />
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={13} name="kanikarose, split colour">
        <HeaderMock>
          <span
            className="text-[15px] font-light tracking-[0.24em]"
            style={display}
          >
            <span style={{ color: BONE }}>kanika</span>
            <span style={roseMetal}>rose</span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={14} name="KANIKAROSE, one word, bone into rose">
        <HeaderMock>
          <span
            className="text-[13px] font-light tracking-[0.28em]"
            style={{ ...display, ...sweep }}
          >
            KANIKAROSE
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={15} name="Kanika Rose, the Rose in italic">
        <HeaderMock>
          <span className="flex items-baseline gap-[7px]">
            <span
              className="text-[17px] font-light tracking-[0.04em]"
              style={{ ...display, color: BONE }}
            >
              Kanika
            </span>
            <span
              className="text-[17px] font-light tracking-[0.04em]"
              style={{ ...italic, ...roseMetal }}
            >
              Rose
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={16} name="The O as a ring">
        <HeaderMock>
          <span
            className="flex items-baseline text-[13px] font-light tracking-[0.3em]"
            style={{ ...display, color: BONE }}
          >
            KANIKA&nbsp;&nbsp;R
            <span
              className="mx-[2px] inline-block h-[10px] w-[10px] self-center rounded-full border-[1.5px]"
              style={{ borderColor: ROSE }}
            />
            SE
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={17} name="The signature, with an underline">
        <HeaderMock>
          <span className="flex flex-col items-start">
            <span
              className="text-[17px] font-light"
              style={{ ...italic, color: BONE }}
            >
              Kanika Rose
            </span>
            <svg
              width="104"
              height="6"
              viewBox="0 0 104 6"
              fill="none"
              className="mt-[1px]"
            >
              <path
                d="M2 4C30 6 70 0 102 3"
                stroke={ROSE}
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={18} name="Stacked lowercase, rose dimmed">
        <HeaderMock>
          <span className="flex flex-col items-start leading-[1.05]">
            <span
              className="text-[15px] font-light tracking-[0.2em]"
              style={{ ...display, color: BONE }}
            >
              kanika
            </span>
            <span
              className="text-[15px] font-light tracking-[0.2em]"
              style={{ ...display, ...roseMetal }}
            >
              rose
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={19} name="The masthead, hairline between">
        <HeaderMock>
          <span className="flex flex-col items-center leading-none">
            <span
              className="text-[13px] font-light tracking-[0.34em]"
              style={{ ...display, color: BONE }}
            >
              KANIKA
            </span>
            <span
              className="my-[3px] h-px w-full"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, ${ROSE}, transparent)`,
              }}
            />
            <span
              className="text-[10px] font-light tracking-[0.52em]"
              style={{ ...display, ...roseMetal }}
            >
              ROSE
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={20} name="The seal">
        <HeaderMock>
          <span className="relative flex h-11 w-11 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: ROSE }}
            />
            <span
              className="absolute inset-[3.5px] rounded-full border opacity-40"
              style={{ borderColor: ROSE }}
            />
            <span
              className="text-[15px] font-medium tracking-[-0.03em]"
              style={{ ...display, ...roseMetal }}
            >
              KR
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={21} name="The diamond frame">
        <HeaderMock>
          <span className="relative flex h-11 w-11 items-center justify-center">
            <span
              className="absolute inset-[5px] rotate-45 border"
              style={{ borderColor: "rgba(183,110,121,0.6)" }}
            />
            <span
              className="text-[13px] font-medium tracking-[-0.03em]"
              style={{ ...display, ...roseMetal }}
            >
              KR
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={22} name="The eclipse: the slip, as geometry">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <Eclipse size={26} color={ROSE} />
            <span
              className="text-[14px] font-light tracking-[0.2em]"
              style={display}
            >
              <span style={{ color: BONE }}>kanika</span>
              <span style={roseMetal}>rose</span>
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={23} name="The double: two rings, almost aligned">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <DoubleRing size={26} />
            <span
              className="text-[12px] font-light tracking-[0.3em]"
              style={{ ...display, color: BONE }}
            >
              KANIKA ROSE
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <Concept n={24} name="The facet: a cut stone, not a flower">
        <HeaderMock>
          <span className="flex items-center gap-2.5">
            <Facet size={20} />
            <span
              className="text-[14px] font-light tracking-[0.2em]"
              style={display}
            >
              <span style={{ color: BONE }}>kanika</span>
              <span style={roseMetal}>rose</span>
            </span>
          </span>
        </HeaderMock>
      </Concept>

      <div className="mt-6 rounded-xl border border-[var(--app-line-soft)] bg-[var(--app-card)] px-4 py-3.5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--app-gold-soft)]">
          The palette
        </p>
        <div className="mt-2.5 flex items-center gap-4">
          {[
            { c: ROSE, l: "rose gold" },
            { c: ROSE_DEEP, l: "deep rose" },
            { c: "#722139", l: "burgundy" },
            { c: GOLD, l: "gold" },
            { c: BONE, l: "bone" },
          ].map((s) => (
            <span key={s.l} className="flex flex-col items-center gap-1.5">
              <span
                className="h-7 w-7 rounded-full border border-black/40"
                style={{ backgroundColor: s.c }}
              />
              <span className="text-[9px] tracking-[0.08em] text-[var(--app-dim)]">
                {s.l}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
