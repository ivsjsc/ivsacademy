#!/usr/bin/env node
// Adds <script src="/js/loadComponents.js" defer></script> before </body> in HTML files that don't have it.
// Run from repository root: node scripts/add_loader_to_html.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = ['components', 'server', '.git', 'scripts', 'node_modules', 'verified'];
const LOADER_SNIPPET = '<script src="/js/loadComponents.js" defer></script>';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (IGNORED_DIRS.includes(e.name)) continue;
      files = files.concat(walk(full));
    } else if (e.isFile() && e.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function processFile(file) {
  let txt = fs.readFileSync(file, 'utf8');
  if (txt.includes(LOADER_SNIPPET)) return false;
  // skip component files explicitly
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.startsWith('components/')) return false;

  const idx = txt.lastIndexOf('</body>');
  if (idx === -1) return false;
  // Insert loader just before that closing tag
  const before = txt.slice(0, idx);
  const after = txt.slice(idx);
  const newTxt = before + '\n' + LOADER_SNIPPET + '\n' + after;
  fs.writeFileSync(file, newTxt, 'utf8');
  return true;
}

function main() {
  console.log('Scanning HTML files...');
  const files = walk(ROOT);
  console.log(`Found ${files.length} HTML files to check.`);
  let changed = 0;
  for (const f of files) {
    try {
      const ok = processFile(f);
      if (ok) {
        console.log('Updated:', path.relative(ROOT, f));
        changed++;
      }
    } catch (err) {
      console.error('Error processing', f, err.message);
    }
  }
  console.log(`Done. Updated ${changed} files.`);
}

main();
