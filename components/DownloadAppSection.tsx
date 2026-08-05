import AppQr from "@/components/AppQr";
import DownloadAppButton from "@/components/DownloadAppButton";

const FEATURES = [
  { label: "The Simulator", hook: "Live scenarios, scored." },
  { label: "Receipts", hook: "Paste a message. Get the read." },
  { label: "Daily Tell", hook: "One tell a day. Keep the streak." },
  { label: "The Mark", hook: "A training record, not a diagnosis." },
];

export default function DownloadAppSection() {
  return (
    <section id="app" className="px-4 pt-10 pb-2">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-accent-gold/20 bg-deep-black/60 p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div>
              <p className="text-accent-gold/90 uppercase tracking-[0.3em] text-[11px] mb-2">
                The Consilium App
              </p>
              <h2 className="text-xl md:text-2xl font-extralight text-text-light mb-2 tracking-wide">
                Download the app
              </h2>
              <p className="text-text-gray text-sm font-light leading-relaxed mb-4 max-w-lg">
                The training ground, on your home screen. Scan the code with
                your phone camera, create an account, and train before you
                spend a dollar.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {FEATURES.map((f) => (
                  <div key={f.label}>
                    <p className="text-accent-gold/80 uppercase tracking-[0.18em] text-[10px] mb-0.5">
                      {f.label}
                    </p>
                    <p className="text-text-gray text-xs font-light">
                      {f.hook}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="rounded-lg bg-[#f3ecdb] p-2 ring-1 ring-accent-gold/40">
                <AppQr className="h-24 w-24" />
              </div>
              <p className="text-text-gray/60 text-[10px] uppercase tracking-[0.2em]">
                Point your camera here
              </p>
              <div className="md:hidden mt-2">
                <DownloadAppButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
