#!/usr/bin/env node
// Adds <script src="/js/loadComponents.js" defer></script> before </body> in HTML files that don't have it.
// Run from repository root: node scripts/add_loader_to_html.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IGNORED_DIRS = ['components', 'server', '.git', 'scripts', 'node_modules', 'verified'];
const LOADER_SNIPPET = '<script src="/js/loadComponents.js" defer></script>';
// Variants we want to replace/remove when canonicalizing
const LOADER_VARIANTS = [
  'src="js/loadComponents.js"',
  "src='js/loadComponents.js'",
  'src="/js/loadComponents.js"',
  "src='/js/loadComponents.js'",
  'src="../js/loadComponents.js"',
  "src='../js/loadComponents.js'",
  'src="./js/loadComponents.js"',
  "src='./js/loadComponents.js'"
];

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
  // skip component files explicitly
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.startsWith('components/')) return false;

  // If file already contains the canonical loader snippet exactly once and no other variants, skip
  const hasCanonical = (txt.match(new RegExp(escapeRegExp(LOADER_SNIPPET), 'g')) || []).length;
  // Count any variant occurrences
  let variantCount = 0;
  for (const v of LOADER_VARIANTS) {
    const re = new RegExp(escapeRegExp(v), 'g');
    const m = txt.match(re);
    if (m) variantCount += m.length;
  }

  // If canonical snippet present and no other variants exist, nothing to do
  if (hasCanonical === 1 && variantCount === 0) return false;

  // Backup original file before changes
  try {
    const bakPath = file + '.bak.' + Date.now();
    fs.copyFileSync(file, bakPath);
  } catch (e) {
    console.error('Warning: failed to write backup for', file, e.message);
  }

  // Remove all variant script tags (keep other scripts untouched)
  for (const v of LOADER_VARIANTS) {
    // Replace any <script ...> that contains the variant with an empty string
    // Use a forgiving regex to match optional attributes and optional defer/async
    const regex = new RegExp('<script[^>]*' + v.replace(/"/g, '(["\'])') + '[^>]*>(?:<\/script>)?', 'gi');
    txt = txt.replace(regex, '');
  }

  // Ensure canonical loader is present before </body>
  const idx = txt.lastIndexOf('</body>');
  if (idx === -1) {
    // If no </body> tag, append at end as last resort
    txt = txt + '\n' + LOADER_SNIPPET + '\n';
  } else {
    const before = txt.slice(0, idx);
    const after = txt.slice(idx);
    // Remove any stray whitespace duplicates and then insert canonical loader
    txt = before + '\n' + LOADER_SNIPPET + '\n' + after;
  }

  fs.writeFileSync(file, txt, 'utf8');
  return true;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
