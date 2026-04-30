"""
Pass 2: Replace UNSPACED em-dashes (word—word) that the spaced
dedash missed. Common in MDX blog posts and prose where the typo-
graphically correct unspaced form is used.

Rules:
  - word—and / word—but / word—or / word—so / word—yet → drop dash, use space
  - word—which / word—that / word—who / word—where / word—when → comma
  - word—X (capital) → period + space (X already capital)
  - word—word (lowercase) → comma + space
  - "—" (standalone em-dash inside quotes, used as UI separator) → leave alone
  - " — " patterns already handled by dedash.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


# Patterns: each is (regex, replacement). Order matters.
PATTERNS = [
    # Skip standalone em-dashes inside quotes — leave alone.
    # We use a sentinel character to protect them, then restore at end.
    # Actually simpler: just match patterns that aren't standalone.

    # Conjunctions: word—and → word and
    (r"([a-zA-Z\)\]])—(and|but|or|so|yet|nor)\b", r"\1 \2"),

    # Relative clauses: word—which → word, which
    (r"([a-zA-Z\)\]])—(which|that|who|whose|where|when|while|because)\b",
     r"\1, \2"),

    # Sentence-starting capitalized: word—X → word. X (already capital)
    (r"([a-zA-Z\)\]])—([A-Z])", r"\1. \2"),

    # Lowercase continuation: word—word → word, word
    (r"([a-zA-Z\)\]])—([a-z])", r"\1, \2"),

    # Number—word: 1—X → 1, X
    (r"(\d)—([a-zA-Z])", r"\1, \2"),
]


def process_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    original = text

    for pattern, replacement in PATTERNS:
        text = re.sub(pattern, replacement, text)

    if text != original:
        path.write_text(text, encoding="utf-8")

    # Count remaining em-dashes for reporting.
    return original.count("—") - text.count("—")


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python scripts/dedash-unspaced.py <files...>")
        return 1

    grand_total = 0
    for arg in argv[1:]:
        path = Path(arg)
        if not path.exists():
            continue
        count = process_file(path)
        grand_total += count
        if count > 0:
            print(f"  {count:4d}  {path}")

    print()
    print(f"TOTAL: {grand_total} unspaced em-dashes replaced")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
