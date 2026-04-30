"""
Fix broken ellipsis introduced by dedash.py's cleanup regex. The
cleanup pattern `\\.\\.  -> \\.` collapsed "... " to ".. " in
dialogue lines and similar text. Then the capitalize-after-period
pattern further mangled them to ".. X" (capital X) instead of
"... x" (lowercase x continuation).

This script:
  1. Finds ".. [A-Z]" patterns (the corruption signature).
  2. Replaces with "... [a-z]" (lowercase the capital).
  3. Skips range-notation patterns like "1 .. 6" where digits
     surround the dots (legitimate code-comment usage).

Also handles the case ".. [a-z]" (no capital, just collapsed) by
restoring the ellipsis: ".. " -> "... ".
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


# Pattern 1: ".. " preceded by a non-dot, non-digit, non-equals
# character, followed by a capital letter. Restores ellipsis and
# lowercases the capital.
PATTERN_CAP = re.compile(r"(?<![\.\d=])(\.\. )([A-Z])")

# Pattern 2: ".. " preceded by a non-dot, non-digit, non-equals
# character, followed by a non-letter or lowercase. Just restores
# ellipsis.
PATTERN_LOWER = re.compile(r"(?<![\.\d=])\.\. (?![A-Z\.\d=])")


def process_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    original = text

    # First, fix ".. [A-Z]" -> "... [a-z]"
    text, count1 = PATTERN_CAP.subn(
        lambda m: "... " + m.group(2).lower(),
        text,
    )

    # Second, restore ".. " (collapsed ellipsis) where no capital follows.
    text, count2 = PATTERN_LOWER.subn("... ", text)

    if text != original:
        path.write_text(text, encoding="utf-8")

    return count1 + count2


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python scripts/fix-ellipsis.py <files...>")
        return 1

    grand_total = 0
    for arg in argv[1:]:
        path = Path(arg)
        if not path.exists():
            print(f"SKIP (missing): {arg}")
            continue
        count = process_file(path)
        grand_total += count
        if count > 0:
            print(f"  {count:4d}  {path}")

    print()
    print(f"TOTAL: {grand_total} ellipsis repairs")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
