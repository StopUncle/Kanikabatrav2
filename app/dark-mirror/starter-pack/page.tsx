import Header from "@/components/Header";
import BackgroundEffects from "@/components/BackgroundEffects";
import StarterPackForm from "@/components/dark-mirror/StarterPackForm";

export const metadata = {
  title: "The Pattern Recognition Starter Pack | Kanika Batra",
  description:
    "Five named manipulator tactics, each with a clinical definition and three concrete examples. Free. In your inbox in 60 seconds.",
};

export default function StarterPackPage() {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <div className="min-h-screen pt-28 pb-16 relative z-10">
        <div className="max-w-xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-warm-gold/70 text-[11px] uppercase tracking-[0.4em] mb-4">
              The Starter Pack
            </p>
            <h1
              className="text-4xl sm:text-5xl font-extralight tracking-wider uppercase leading-tight mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #f3d98a 0%, #d4af37 50%, #9c7a1f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Five tactics. Named.
            </h1>
            <p className="text-text-gray text-base font-light leading-relaxed">
              Read once, recognise forever.
            </p>
          </div>
          <StarterPackForm />
        </div>
      </div>
    </>
  );
}
