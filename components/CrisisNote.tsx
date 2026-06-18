// A short, genuine crisis-resource note for clinical / personality-disorder
// pages. This is the responsible thing to do, and it also raises trust and
// citability with AI search, which preferentially surfaces health-adjacent
// content that signposts professional help.
export default function CrisisNote() {
  return (
    <aside
      role="note"
      className="mt-12 rounded-lg border border-gray-800 bg-deep-black/40 p-5 text-sm text-text-gray leading-relaxed"
    >
      This guide is educational and is not medical advice or a substitute for
      professional care. If you are struggling or in crisis, you deserve real
      support. Contact your local emergency services or a crisis line. In the US,
      call or text{" "}
      <a
        href="tel:988"
        className="text-accent-gold hover:underline"
      >
        988
      </a>{" "}
      (Suicide and Crisis Lifeline). Anywhere else, find a helpline at{" "}
      <a
        href="https://findahelpline.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-gold hover:underline"
      >
        findahelpline.com
      </a>
      .
    </aside>
  );
}
