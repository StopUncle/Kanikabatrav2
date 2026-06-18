/**
 * Tiny markdown renderer for the 3-section receipts read. We only need:
 *   - ## headings
 *   - paragraph text
 * Anything else falls through as plain text. Keeps the bundle lean.
 *
 * Shared by the public free tool and the public share page. The member
 * ReceiptsClient keeps its own inline copy so this extraction cannot
 * destabilize the paid surface.
 */
export default function ReceiptBody({ markdown }: { markdown: string }) {
  const lines = markdown.split(/\r?\n/);
  const blocks: Array<{ kind: "h2" | "p"; text: string }> = [];
  let buffer: string[] = [];

  function flush() {
    if (buffer.length === 0) return;
    blocks.push({ kind: "p", text: buffer.join(" ").trim() });
    buffer = [];
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
    } else if (line.length === 0) {
      flush();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return (
    <div className="space-y-4">
      {blocks.map((b, i) =>
        b.kind === "h2" ? (
          <h3
            key={i}
            className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/70 mt-2"
          >
            {b.text}
          </h3>
        ) : (
          <p
            key={i}
            className="text-text-light text-sm sm:text-base font-light leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {b.text}
          </p>
        ),
      )}
    </div>
  );
}
