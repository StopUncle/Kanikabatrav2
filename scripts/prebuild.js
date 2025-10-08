#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to remove that cause App Router conflicts
const filesToRemove = [
  'app/document.tsx',
  'app/_document.tsx',
  'document.tsx',
  '_document.tsx'
];

console.log('🧹 Cleaning up document files before build...');

filesToRemove.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✅ Removed: ${file}`);
  }
});

console.log('✨ Cleanup complete!');