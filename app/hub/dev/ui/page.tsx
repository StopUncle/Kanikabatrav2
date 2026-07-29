import {
  Card,
  EmptyState,
  PressableRow,
  SectionHeader,
  Skeleton,
  SkeletonCard,
  SkeletonText,
} from "@/components/app-shell/ui";

export const metadata = {
  title: "Primitives | Dev",
};

const SCALE = [
  { cls: "text-app-hero", name: "app-hero", px: "28px", use: "One number, once a screen" },
  { cls: "text-app-display", name: "app-display", px: "22px", use: "Screen title" },
  { cls: "text-app-title", name: "app-title", px: "19px", use: "Card title" },
  { cls: "text-app-lead", name: "app-lead", px: "15px", use: "Opening sentence" },
  { cls: "text-app-body", name: "app-body", px: "13px", use: "Everything else" },
  { cls: "text-app-caption", name: "app-caption", px: "12px", use: "Sublabels" },
  { cls: "text-app-eyebrow", name: "app-eyebrow", px: "11px", use: "Uppercase labels" },
  { cls: "text-app-tiny", name: "app-tiny", px: "10px", use: "Tab labels" },
  { cls: "text-app-micro", name: "app-micro", px: "9px", use: "Badge digits" },
];

/**
 * Dev-only: every shared primitive on one screen, in the real shell.
 *
 * The point is comparison. A card looks fine on its own page and wrong beside
 * the card it is meant to match, and until these sat together nobody could
 * see that the app had grown five corner radii and thirty-two font sizes.
 */
export default function PrimitivesPage() {
  return (
    <div className="space-y-9 px-4 pb-16 pt-6">
      <header>
        <h1 className="text-app-display font-light text-[var(--app-text)]">
          Primitives
        </h1>
        <p className="mt-1.5 text-app-body text-[var(--app-muted)]">
          The shared decisions. If a surface needs something that is not here,
          it belongs here before it belongs there.
        </p>
      </header>

      <section className="space-y-3">
        <SectionHeader
          eyebrow="Type scale"
          title="Nine sizes, replacing thirty-two"
        />
        <Card pad="roomy">
          <div className="space-y-3.5">
            {SCALE.map((s) => (
              <div key={s.name}>
                <span className="block text-app-micro uppercase tracking-app-wide text-[var(--app-dim)]">
                  {s.name} &middot; {s.px} &middot; {s.use}
                </span>
                <span className={`${s.cls} block text-[var(--app-text)]`}>
                  Read the room
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <SectionHeader eyebrow="Card" title="Four tones" tone="gold" />
        <Card>
          <p className="text-app-body text-[var(--app-text)]">Default</p>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">
            The one you want unless you have a reason.
          </p>
        </Card>
        <Card tone="raised">
          <p className="text-app-body text-[var(--app-text)]">Raised</p>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">
            A card sitting on another card.
          </p>
        </Card>
        <Card tone="gold">
          <p className="text-app-body text-[var(--app-text)]">Gold</p>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">
            The one card on a screen that is asking for something.
          </p>
        </Card>
        <Card tone="quiet">
          <p className="text-app-body text-[var(--app-text)]">Quiet</p>
          <p className="mt-1 text-app-caption text-[var(--app-dim)]">
            Grouping without claiming attention.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <SectionHeader eyebrow="Pressable row" title="Link or button, never both" />
        <PressableRow href="/app/train" label="Train" sublabel="Every way to practise" />
        <PressableRow
          href="/app/measure"
          label="The Mark"
          sublabel="Your last reading"
          right={
            <span className="text-app-eyebrow uppercase tracking-app-wide text-[var(--app-gold-soft)]">
              New
            </span>
          }
          tone="raised"
        />
      </section>

      <section className="space-y-3">
        <SectionHeader eyebrow="Empty state" title="What a screen says with nothing to show" />
        <EmptyState line="No readings yet." />
        <EmptyState
          line="No readings yet."
          hint="The Baseline Read takes about four minutes and gives you something to measure against."
          action={{ label: "Take the baseline", href: "/app/measure/baseline" }}
        />
      </section>

      <section className="space-y-3">
        <SectionHeader eyebrow="Loading" title="A wait that says what is coming" />
        <SkeletonCard />
        <Card>
          <Skeleton className="mb-3 h-8 w-8 rounded-full" />
          <SkeletonText lines={2} />
        </Card>
      </section>
    </div>
  );
}
