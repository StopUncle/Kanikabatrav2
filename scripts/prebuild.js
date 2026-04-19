#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🧹 Cleaning up before build...");

// Remove .next directory except cache (which is mounted)
const nextDir = path.join(process.cwd(), ".next");
if (fs.existsSync(nextDir)) {
  try {
    const items = fs.readdirSync(nextDir);
    items.forEach((item) => {
      if (item !== "cache") {
        const itemPath = path.join(nextDir, item);
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`✅ Removed .next/${item}`);
      }
    });
  } catch (err) {
    console.log("⚠️  Could not clean .next directory:", err.message);
  }
}

// Files to remove that cause App Router conflicts
const filesToRemove = [
  "app/document.tsx",
  "app/_document.tsx",
  "app/document.js",
  "app/_document.js",
  "document.tsx",
  "_document.tsx",
];

filesToRemove.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
    }
  } catch (err) {
    console.log(`⚠️  Could not remove ${file}:`, err.message);
  }
});

console.log("✨ Cleanup complete!");

// Scenario data audit — fails the build on dangling/missing scene refs.
// Warns (but doesn't block) on one-click endings, since some scenarios
// use them deliberately as a "you took the bait" teaching beat.
const { spawnSync } = require("child_process");
console.log("🔎 Auditing simulator scenarios...");
const audit = spawnSync(
  "npx",
  ["tsx", "scripts/check-scenario-shortcuts.ts"],
  { stdio: "inherit", shell: true },
);
if (audit.status !== 0) {
  process.exit(audit.status ?? 1);
}
