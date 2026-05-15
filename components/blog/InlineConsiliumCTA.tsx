import Link from "next/link";

interface Props {
  slug?: string;
}

export default function InlineConsiliumCTA({ slug }: Props) {
  const params = new URLSearchParams({
    utm_source: "blog",
    utm_medium: "organic",
    utm_campaign: "consilium-blog-2026",
    utm_content: slug ? `inline-${slug}` : "inline",
  });
  return (
    <div className="my-10 pl-6 border-l-4 border-accent-gold bg-gradient-to-r from-accent-gold/[0.06] to-transparent rounded-r-lg py-6 pr-6">
      <p className="text-accent-gold uppercase tracking-[0.22em] text-[10px] font-medium mb-2">
        The Consilium
      </p>
      <p className="text-white font-light text-lg mb-2">
        Want this in your blood, not your bookmarks?
      </p>
      <p className="text-text-gray text-base mb-4 leading-relaxed">
        Daily voice notes, the simulator, the forum, and the women who think
        like this. $29/mo. The cheapest tuition you&rsquo;ll ever pay.
      </p>
      <Link
        href={`/consilium?${params.toString()}`}
        className="inline-block text-sm text-accent-gold hover:text-accent-gold/80 underline underline-offset-4 decoration-accent-gold/50 transition-colors tracking-wider uppercase"
      >
        See what&rsquo;s inside
      </Link>
    </div>
  );
}
