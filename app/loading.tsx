import KanikaroseLogo from "@/components/KanikaroseLogo";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-deep-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <KanikaroseLogo size="xl" animate />
        </div>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent mx-auto animate-pulse" />
      </div>
    </div>
  );
}
