const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const ignoreDirs = ['.git', 'node_modules', '.github', 'dist', 'build', '.venv', 'venv', 'env', '__pycache__', 'webapp-dist'];
const patterns = [
  { name: 'Google API key (AIza...)', re: /AIza[0-9A-Za-z\-_]{35}/g },
  { name: 'OpenAI secret (sk-)', re: /(?:\b|^)(sk-[0-9A-Za-z-_]{20,})\b/g },
  { name: 'Private key block', re: /-----BEGIN (RSA |)PRIVATE KEY-----/g },
  { name: 'GitHub token (ghp_)', re: /ghp_[0-9A-Za-z_]{36}/g }
];
const maxFileSize = 200 * 1024; // skip files larger than 200 KB

let findings = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (ignoreDirs.includes(e.name)) continue;
      walk(full);
      continue;
    }
    if (e.name.endsWith('.png') || e.name.endsWith('.jpg') || e.name.endsWith('.jpeg') || e.name.endsWith('.gif') || e.name.endsWith('.bin')) continue;
    // read file
    try {
      const txt = fs.readFileSync(full, 'utf8');
      for (const p of patterns) {
        const m = txt.match(p.re);
        if (m) {
          findings.push({ file: full.replace(repoRoot + path.sep, ''), pattern: p.name, matches: Array.from(new Set(m)).slice(0,5) });
        }
      }
    } catch (e) {
      // ignore binary or unreadable
    }
  }
}

walk(repoRoot);

if (findings.length) {
  console.error('SECRET SCAN: found potential secrets in the repo:');
  for (const f of findings) {
    console.error(` - ${f.file}: ${f.pattern} -> ${f.matches.join(', ')}`);
  }
  console.error('\nIf these are false positives, review and suppress them explicitly in the script.');
  process.exit(2);
}
console.log('SECRET SCAN: no obvious secrets found.');
process.exit(0);
