"""
Fix over-capitalization introduced by dedash.py's cleanup regex.
The cleanup capitalized any letter after ". " including after
abbreviations like "p.m.", "a.m.", "Mr.", "Dr.", "Mrs.", "etc."
which produces incorrect output like "9 p.m. You" instead of
"9 p.m. you".

Strategy: for each abbreviation pattern, find capitalized words and
lowercase them UNLESS the word is a known proper noun (character
name, day, month, place name).
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

# Proper nouns that should remain capitalized after an abbreviation.
# Anything not in this set will be lowercased.
PROPER_NOUNS = {
    # Character names (Loving Mira)
    "Mira", "Vee", "Reyes", "Cameron", "Alana",
    # Character names (Anxiety)
    "Sam", "Mia", "Lin", "Yoon", "Eli", "Lauren", "Maeve", "Ellen",
    "Maya", "Patel", "David", "Park", "Aisha", "Theo", "Nico",
    "Beatriz",
    # Days
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
    "Saturday",
    # Months
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
    # Places / proper nouns
    "Brooklyn", "Manhattan", "Williamsburg", "Greenpoint", "Bushwick",
    "Court", "Connecticut", "Stamford", "Greenwich", "Austin",
    "Hudson", "Phoenix", "Lisbon", "Trader", "Slack", "Reddit",
    "Glassdoor", "Wikipedia", "Henderson", "TikTok", "Instagram",
    "Pratt", "MFA", "Ezra", "Sade", "Pepper", "Hockney", "Maya",
    "Russian", "American", "Korean", "Asian", "Mexican", "Indian",
    "Sri", "Lankan", "DBT", "CBT", "ACT", "GAD", "OCD", "PTSD",
    "BPD", "FP", "DEAR", "MAN", "GIVE", "TIPP", "NSSI", "EKG",
    "ER", "ERs", "DSM", "HPA", "GABA", "BDNF", "MBSR", "MBCT",
    "SSRIs", "SNRIs", "Anya", "Maddie", "Beatriz", "Craske",
    "Linehan", "Hofmann", "Otto", "Stein", "Sareen", "Foa", "Kozak",
    "Kabat-Zinn", "Twenge", "Stossel", "Wilson", "Petersen", "Smith",
    "BoJack", "Bird", "Lady", "NEJM", "WHO", "NIMH", "Apr", "Lyme",
    "Outside", "Inside", "POV", "I'd", "I'm", "I've", "I'll", "I",
    "Plymouth", "F", "J", "L", "Lin's", "Reyes's", "Mia's", "Sam's",
    "David's", "Cameron's", "Mira's", "Eli's", "Vee's", "Maya's",
    "Theo's", "Aisha's", "Ellen's", "Lauren's", "Maeve's",
    "Nico's", "Anya's", "Maddie's", "Cameron's", "Beatriz's",
    "Pepper's", "Honey", "Bunches", "Oats",
    "Carroll", "Smith-9th", "York", "Bergen", "DUMBO", "LaGuardia",
    "ALEJANDRO", "REYES", "SCOTT",
    "English", "Breakfast", "Persian",  # tea names
    "Christmas", "Thanksgiving", "Easter", "Hanukkah",
    "Anya", "Halperin", "Halloran",
}

ABBREVIATIONS_PATTERN = (
    # a.m. / p.m. / i.e. / e.g. / etc. / vs.
    r"\b([ap]\.m\.|i\.e\.|e\.g\.|etc\.|vs\.|Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|St\.) "
    r"([A-Z][a-zA-Z']*)\b"
)


def fix_match(m: re.Match) -> str:
    """Lowercase the capitalized word unless it's a proper noun."""
    abbrev = m.group(1)
    word = m.group(2)
    # Strip trailing apostrophe-s for matching: "Lin's" → "Lin"
    base = word.rstrip("s'").rstrip("'")
    if word in PROPER_NOUNS or base in PROPER_NOUNS:
        return m.group(0)  # Leave alone
    return f"{abbrev} {word[0].lower()}{word[1:]}"


def process_file(path: Path) -> int:
    """Process one file. Returns the number of replacements made."""
    text = path.read_text(encoding="utf-8")
    original = text

    new_text, count = re.subn(ABBREVIATIONS_PATTERN, fix_match, text)
    text = new_text

    if text != original:
        path.write_text(text, encoding="utf-8")

    return count


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: python scripts/fix-overcap.py <files...>")
        return 1

    grand_total = 0
    for arg in argv[1:]:
        path = Path(arg)
        if not path.exists():
            print(f"SKIP (missing): {arg}")
            continue
        count = process_file(path)
        grand_total += count
        print(f"  {count:4d}  {path}")

    print()
    print(f"TOTAL: {grand_total} fixes")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
