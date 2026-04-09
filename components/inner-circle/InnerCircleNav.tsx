import Link from "next/link";

interface InnerCircleNavProps {
  active: "feed" | "voice-notes" | "classroom";
}

const tabs = [
  { href: "/inner-circle/feed", label: "Feed", key: "feed" as const },
  { href: "/inner-circle/voice-notes", label: "Voice Notes", key: "voice-notes" as const },
  { href: "/inner-circle/classroom", label: "Classroom", key: "classroom" as const },
];

export default function InnerCircleNav({ active }: InnerCircleNavProps) {
  return (
    <div className="flex justify-center gap-2 mb-10">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`px-5 py-2 rounded-full text-sm transition-colors ${
            active === tab.key
              ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
              : "text-text-gray hover:text-accent-gold border border-white/10 hover:border-accent-gold/30"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
