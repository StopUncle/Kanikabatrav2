"""Diagnostic: survey remaining em-dash patterns."""
import glob, re, os
from collections import Counter
import random

include_globs = [
    'app/**/*.ts', 'app/**/*.tsx',
    'lib/simulator/scenarios/**/*.ts',
    'content/**/*.mdx',
    'prisma/seeds/**/*.ts',
]
exclude = ['node_modules', '.next', 'reference', 'research', 'docs',
           'loving-mira', 'anxiety']
files = set()
for g in include_globs:
    for f in glob.glob(g, recursive=True):
        if any(ex in f for ex in exclude):
            continue
        files.add(f)

samples = []
for f in sorted(files):
    with open(f, encoding='utf-8') as fh:
        text = fh.read()
    for m in re.finditer('—', text):
        start = max(0, m.start() - 30)
        end = min(len(text), m.end() + 30)
        ctx = text[start:end].replace('\n', r'\n')
        samples.append((os.path.basename(f), ctx))

patterns = Counter()
for fname, ctx in samples:
    m = re.search(r'(.{4}—.{4})', ctx)
    if m:
        pat = m.group(1)
        generalized = re.sub(r'[a-z]', 'a', pat)
        generalized = re.sub(r'[A-Z]', 'A', generalized)
        generalized = re.sub(r'\d', 'd', generalized)
        patterns[generalized] += 1

print(f'Total em-dashes: {len(samples)}')
print('\n=== Top patterns (- = em-dash) ===')
for pat, count in patterns.most_common(20):
    print(f'  {count:4d}  {repr(pat)}')

random.seed(42)
print('\n=== Sample contexts ===')
for fname, ctx in random.sample(samples, min(30, len(samples))):
    print(f'  {fname}: ...{ctx}...')
