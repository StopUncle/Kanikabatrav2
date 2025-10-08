#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up before build...');

// Remove .next cache
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ Removed .next cache');
}

// Files to remove that cause App Router conflicts
const filesToRemove = [
  'app/document.tsx',
  'app/_document.tsx',
  'app/document.js',
  'app/_document.js',
  'document.tsx',
  '_document.tsx'
];

filesToRemove.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✅ Removed: ${file}`);
  }
});

console.log('✨ Cleanup complete!');