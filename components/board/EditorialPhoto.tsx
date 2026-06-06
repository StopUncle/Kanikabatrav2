import Image from "next/image";

/**
 * Uniform editorial portrait treatment for every figure. Monochrome +
 * a single burgundy duotone wash, applied identically to all figures so
 * the board reads as commentary/analysis rather than a raw celebrity grid.
 * When no photo exists we render an initials monogram in the same frame.
 */

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

const SIZES = {
  sm: "h-11 w-11",
  md: "h-16 w-16",
  lg: "h-28 w-28",
} as const;

const PX = { sm: 44, md: 64, lg: 112 } as const;

export default function EditorialPhoto({
  name,
  photoUrl,
  size = "md",
}: {
  name: string;
  photoUrl: string | null;
  size?: keyof typeof SIZES;
}) {
  return (
    <div
      className={`relative ${SIZES[size]} shrink-0 overflow-hidden rounded-sm ring-1 ring-white/10`}
    >
      {photoUrl ? (
        <>
          <Image
            src={photoUrl}
            alt={name}
            width={PX[size]}
            height={PX[size]}
            className="h-full w-full object-cover grayscale contrast-[1.05]"
          />
          {/* Single-accent duotone wash, uniform across every figure. */}
          <div className="pointer-events-none absolute inset-0 bg-accent-burgundy/30 mix-blend-color" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent" />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-accent-burgundy/15 font-serif text-text-gray">
          <span className={size === "sm" ? "text-xs" : "text-base"}>
            {initials(name) || "?"}
          </span>
        </div>
      )}
    </div>
  );
}
