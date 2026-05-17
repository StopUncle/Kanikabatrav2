import { ALL_SCENARIOS } from "@/lib/simulator/scenarios";
import AdventureForm, {
  EMPTY_INITIAL,
} from "@/components/admin/AdventureForm";

export const dynamic = "force-dynamic";

export default function NewAdventurePage() {
  const scenarios = ALL_SCENARIOS.map((s) => ({
    id: s.id,
    title: s.title,
    track: s.track ?? "female",
  }));

  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <p className="text-accent-gold/70 text-[10px] uppercase tracking-[0.4em] mb-2">
          New
        </p>
        <h1 className="text-3xl font-extralight tracking-wider uppercase text-text-light">
          Create adventure
        </h1>
      </header>
      <AdventureForm mode="new" initial={EMPTY_INITIAL} scenarios={scenarios} />
    </div>
  );
}
