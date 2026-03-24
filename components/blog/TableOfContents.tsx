"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].startsWith("###") ? 3 : 2;
    const text = match[1].replace(/\*\*/g, "").replace(/\*/g, "").trim();
    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <div className="sticky top-32">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-gold mb-4">
            In this article
          </p>
          <ul className="space-y-2 border-l border-white/10">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block text-sm leading-relaxed transition-all duration-200 ${
                    level === 3 ? "pl-6" : "pl-4"
                  } -ml-px border-l ${
                    activeId === id
                      ? "border-accent-gold text-accent-gold"
                      : "border-transparent text-text-gray hover:text-text-light hover:border-white/30"
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile collapsible */}
      <div className="lg:hidden mb-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 text-sm text-text-gray hover:text-accent-gold transition-colors w-full py-3 border-b border-white/10"
        >
          <List className="w-4 h-4" />
          <span className="uppercase tracking-wider text-xs font-medium">
            Table of Contents
          </span>
          <svg
            className={`w-3 h-3 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-1 pt-3 pb-4"
          >
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block text-sm py-1.5 text-text-gray hover:text-accent-gold transition-colors ${
                    level === 3 ? "pl-6" : "pl-3"
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </>
  );
}

export { slugify };
