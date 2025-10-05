// sync-locales-from-pages.js
// Usage: node sync-locales-from-pages.js
// Scans the specified HTML pages for data-lang-key attributes and their values
// Then updates lang/vi.json with Vietnamese source strings and ensures en.json/zh.json have TODO placeholders

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [
  path.join(root, 'Pages', 'ivscelestech-tcnoithat.html'),
  path.join(root, 'gallery.html'),
  path.join(root, 'Pages', 'apps', 'story-repository.html'),
  path.join(root, 'Pages', 'apps', 'ivsapps.html'),
  path.join(root, 'Pages', 'games', 'ivsgames.html')
];
const locales = {
  vi: path.join(root, 'lang', 'vi.json'),
  en: path.join(root, 'lang', 'en.json'),
  zh: path.join(root, 'lang', 'zh.json')
};

function extractKeysFromHtml(content) {
  const map = {}; // key -> value (raw HTML/text)

  // meta tags with content="..."
  const metaRegex = /<meta[^>]*data-lang-key\s*=\s*"([^"]+)"[^>]*content\s*=\s*"([^"]*)"[^>]*>/gi;
  let m;
  while ((m = metaRegex.exec(content)) !== null) {
    const key = m[1].trim();
    const val = m[2].trim();
    if (key && val) map[key] = val;
  }

  // generic elements: find data-lang-key="key" ...>innerHTML</tag>
  const tagRegex = /data-lang-key\s*=\s*"([^"]+)"[^>]*>([\s\S]*?)<\/([a-zA-Z0-9\-]+)>/gi;
  while ((m = tagRegex.exec(content)) !== null) {
    const key = m[1].trim();
    let val = m[2].trim();
    // remove surrounding whitespace/newlines
    if (val) {
      // normalize whitespace
      val = val.replace(/\r?\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
      if (key && val) map[key] = val;
    }
  }

  // placeholders like <span ... data-lang-key="key" /> are rare; try a self-closing regex
  const selfCloseRegex = /data-lang-key\s*=\s*"([^"]+)"[^>]*\/\s*>/gi;
  while ((m = selfCloseRegex.exec(content)) !== null) {
    const key = m[1].trim();
    if (key && !(key in map)) map[key] = '';
  }

  return map;
}

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse JSON:', filePath, e.message);
    process.exit(1);
  }
}

function writeJson(filePath, obj) {
  const text = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(filePath, text, 'utf8');
}

// Build master map from pages
const master = {};
for (const p of pages) {
  if (!fs.existsSync(p)) {
    console.warn('Page not found, skipping:', p);
    continue;
  }
  const content = fs.readFileSync(p, 'utf8');
  const extracted = extractKeysFromHtml(content);
  for (const k of Object.keys(extracted)) {
    // prefer existing value (first seen) if present, else set
    if (!(k in master) || (master[k] === '' && extracted[k])) master[k] = extracted[k];
  }
}

const keys = Object.keys(master).sort();
console.log('Collected', keys.length, 'keys from pages. Sample:', keys.slice(0,20));

// Load locales
const viObj = loadJson(locales.vi);
const enObj = loadJson(locales.en);
const zhObj = loadJson(locales.zh);

let viAdded = 0, enAdded = 0, zhAdded = 0;

for (const k of keys) {
  const viVal = master[k];
  // VI: insert or update if missing or empty
  if (!(k in viObj) || (typeof viObj[k] === 'string' && viObj[k].trim() === '')) {
    viObj[k] = viVal;
    viAdded++;
  }
  // EN: if missing, add TODO placeholder
  if (!(k in enObj) || (typeof enObj[k] === 'string' && enObj[k].trim() === '')) {
    enObj[k] = `TODO: translate (en): ${k}`;
    enAdded++;
  }
  // ZH: same
  if (!(k in zhObj) || (typeof zhObj[k] === 'string' && zhObj[k].trim() === '')) {
    zhObj[k] = `TODO: translate (zh): ${k}`;
    zhAdded++;
  }
}

// Write back locales (JSON.parse+stringify removes duplicates)
writeJson(locales.vi, viObj);
writeJson(locales.en, enObj);
writeJson(locales.zh, zhObj);

console.log('Done. vi added:', viAdded, 'en added:', enAdded, 'zh added:', zhAdded);
console.log('Wrote:', locales.vi, locales.en, locales.zh);
