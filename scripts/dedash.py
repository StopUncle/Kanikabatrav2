"""
One-shot script to reduce em-dash usage in scenario files. AI-style
tell removal: replaces " — " with contextually appropriate
punctuation (comma, period, or dropped entirely for conjunctions).

Usage:  python scripts/dedash.py <files...>
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


# Order matters: more specific patterns first.
# Each tuple is (regex pattern, replacement).
PATTERNS = [
    # Conjunctions: drop the dash entirely.
    (r" — and ", " and "),
    (r" — but ", " but "),
    (r" — or ", " or "),
    (r" — so ", " so "),
    (r" — yet ", " yet "),
    (r" — nor ", " nor "),

    # Relative clauses: comma.
    (r" — which ", ", which "),
    (r" — that ", ", that "),
    (r" — who ", ", who "),
    (r" — whose ", ", whose "),
    (r" — where ", ", where "),
    (r" — when ", ", when "),
    (r" — while ", ", while "),
    (r" — because ", ", because "),

    # Lowercase new-thought starters: period + capitalize.
    (r" — most ", ". Most "),
    (r" — almost ", ". Almost "),
    (r" — this is ", ". This is "),
    (r" — this ", ". This "),
    (r" — these ", ". These "),
    (r" — those ", ". Those "),
    (r" — each ", ". Each "),
    (r" — every ", ". Every "),
    (r" — across ", ". Across "),
    (r" — over ", ". Over "),
    (r" — by the ", ". By the "),
    (r" — at the ", ". At the "),
    (r" — in the ", ". In the "),
    (r" — on the ", ". On the "),
    (r" — same ", ". Same "),
    (r" — different ", ". Different "),
    (r" — partly ", ". Partly "),
    (r" — mostly ", ". Mostly "),
    (r" — usually ", ". Usually "),
    (r" — often ", ". Often "),
    (r" — sometimes ", ". Sometimes "),
    (r" — once ", ". Once "),
    (r" — twice ", ". Twice "),
    (r" — three ", ". Three "),
    (r" — four ", ". Four "),
    (r" — five ", ". Five "),
    (r" — both ", ". Both "),
    (r" — all ", ". All "),
    (r" — none ", ". None "),
    (r" — neither ", ". Neither "),
    (r" — either ", ". Either "),

    # Sentence-already-starts-capitalized: period (no capitalize needed).
    (r" — ([A-Z])", r". \1"),

    # Fall-through: comma.
    (r" — ", ", "),
]


# Cleanup passes after the main replacements.
CLEANUP = [
    (r", , ", ", "),         # Double commas from chained patterns
    (r",  ", ", "),          # Stray double space after comma
    (r"\.\. ", ". "),        # Double period
    (r"\. ([a-z])", lambda m: ". " + m.group(1).upper()),  # Capitalize after period
]


def process_file(path: Path) -> tuple[int, int]:
    """Process one file. Returns (em-dashes-before, em-dashes-after)."""
    text = path.read_text(encoding="utf-8")
    before = text.count(" — ")

    for pattern, replacement in PATTERNS:
        text = re.sub(pattern, replacement, text)

    for pattern, replacement in CLEANUP:
        text = re.sub(pattern, replacement, text)

    after = text.count(" — ")
    path.write_text(text, encoding="utf-8")
    return before, after


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python scripts/dedash.py <files...>")
        return 1

    total_before = 0
    total_after = 0

    for arg in argv[1:]:
        path = Path(arg)
        if not path.exists():
            print(f"SKIP (missing): {arg}")
            continue
        before, after = process_file(path)
        total_before += before
        total_after += after
        print(f"  {before:4d} -> {after:4d}  {path}")

    print()
    print(f"TOTAL: {total_before} -> {total_after}  ({total_before - total_after} removed)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
