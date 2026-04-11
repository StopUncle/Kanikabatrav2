import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function parseShortFormIdeas(content: string) {
  const ideas: Array<{
    title: string;
    hook: string;
    format: string;
    category: string;
  }> = [];

  // Match patterns like: **1.** **"Title"** — Hook: description
  // Or: **65.** **React to: "Title"**\nURL: ...\nAngle: ...
  const lines = content.split("\n");

  let currentSection = "";
  let currentFormat = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect section headers
    if (line.startsWith("## SECTION")) {
      if (line.includes("Single-Revelation")) {
        currentSection = "Single-Revelation";
        currentFormat = "reveal";
      } else if (line.includes("Confessional")) {
        currentSection = "Confessional";
        currentFormat = "confessional";
      } else if (line.includes("Sociopath Cheat Codes")) {
        currentSection = "Cheat Codes";
        currentFormat = "cheat-code";
      } else if (line.includes("Sociopath Tests")) {
        currentSection = "Audience Test";
        currentFormat = "test";
      } else if (line.includes("Contrarian")) {
        currentSection = "Contrarian";
        currentFormat = "debunk";
      } else if (line.includes("Reaction Shorts")) {
        currentSection = "Reaction";
        currentFormat = "reaction";
      } else if (line.includes("Honeytrap")) {
        currentSection = "Honeytrap";
        currentFormat = "book-tie-in";
      } else if (line.includes("Dating POV")) {
        currentSection = "Dating Experiment";
        currentFormat = "experiment";
      }
      continue;
    }

    // Match numbered ideas: **1.** **"Title"** — Hook text
    const ideaMatch = line.match(
      /^\*\*(\d+)\.\*\*\s+\*\*(?:React to:?\s*)?[""]?([^"*]+?)[""]?\*\*\s*(?:—|–)\s*(.*)/,
    );
    if (ideaMatch) {
      let hook = ideaMatch[3].trim();

      // Check next lines for URL and Angle (reaction format)
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== "" && !lines[j].match(/^\*\*/)) {
        const urlMatch = lines[j].match(/URL:\s*(https?:\/\/\S+)/);
        const angleMatch = lines[j].match(/Angle:\s*(.*)/);
        if (urlMatch) hook += ` | URL: ${urlMatch[1]}`;
        if (angleMatch) hook += ` | Angle: ${angleMatch[1]}`;
        j++;
      }

      ideas.push({
        title: ideaMatch[2].trim(),
        hook: hook.replace(/^Hook:\s*/i, ""),
        format: currentFormat,
        category: currentSection,
      });
    }
  }

  return ideas;
}

function parseBookIdeas(content: string) {
  const ideas: Array<{
    title: string;
    hook: string;
    format: string;
    category: string;
  }> = [];

  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match: ## 1. Title text
    const ideaMatch = line.match(/^## (\d+)\.\s+(.+)/);
    if (ideaMatch) {
      const title = ideaMatch[2].trim();

      // Collect sub-points as hook/description
      const subPoints: string[] = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].match(/^## \d+\./)) {
        const bulletMatch = lines[j].match(/^- (.+)/);
        if (bulletMatch) subPoints.push(bulletMatch[1].trim());
        j++;
      }

      ideas.push({
        title,
        hook: subPoints.slice(0, 2).join(" | "),
        format: "book-extract",
        category: "Book Content",
      });
    }
  }

  return ideas;
}

async function seedContentIdeas() {
  // Check if already seeded
  const existing = await prisma.contentIdea.count();
  if (existing > 0) {
    console.log(`Already have ${existing} content ideas. Skipping seed.`);
    return;
  }

  const docsDir = path.join(process.cwd(), "docs");
  const rootDir = process.cwd();

  // Parse short-form ideas
  const shortFormPath = path.join(docsDir, "100-short-form-ideas.md");
  const shortFormContent = fs.readFileSync(shortFormPath, "utf-8");
  const shortFormIdeas = parseShortFormIdeas(shortFormContent);

  // Parse book ideas
  const bookPath = path.join(rootDir, "CONTENT-IDEAS.md");
  const bookContent = fs.readFileSync(bookPath, "utf-8");
  const bookIdeas = parseBookIdeas(bookContent);

  console.log(`Parsed ${shortFormIdeas.length} short-form ideas`);
  console.log(`Parsed ${bookIdeas.length} book ideas`);

  // Insert short-form ideas
  for (let i = 0; i < shortFormIdeas.length; i++) {
    const idea = shortFormIdeas[i];
    await prisma.contentIdea.create({
      data: {
        title: idea.title,
        hook: idea.hook,
        format: idea.format,
        source: "short-form",
        category: idea.category,
        sortOrder: i + 1,
      },
    });
  }

  // Insert book ideas
  for (let i = 0; i < bookIdeas.length; i++) {
    const idea = bookIdeas[i];
    await prisma.contentIdea.create({
      data: {
        title: idea.title,
        hook: idea.hook,
        format: idea.format,
        source: "book",
        category: idea.category,
        sortOrder: i + 1,
      },
    });
  }

  const total = await prisma.contentIdea.count();
  console.log(`Seeded ${total} content ideas total.`);
}

seedContentIdeas()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
